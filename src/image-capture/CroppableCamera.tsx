import { useState, useRef } from "react";
import { useUserMedia } from "../hooks/useUserMedia";
import rgbToHsl from "../utility/rgb-to-hsl";
import OptionButton from "../components/Buttons/OptionButton";
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid'
import { IconButton } from "@mui/material";
import { CameraAlt, Autorenew, Insights } from "@mui/icons-material";
import classes from './styles.module.scss';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: "environment",
    width: { ideal: 4096 },
    height: { ideal: 2160 }
  }
};

export default function CroppableCamera({ }) {

  const [full, setFull] = useState("");
  const [cropped, setCropped] = useState("");

  const cRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const analyzeImage = () => {

    if (cRef.current) {
      let canvas = cRef.current.getContext("2d");
      let imageData = canvas?.getImageData(0, 0, cRef.current.width, cRef.current.height);
      var data = imageData?.data

      if (data) {
        for (var i = data.length; i >= 0; i -= 4) {
          if (data[i + 3] > 0) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            const [h, s, l] = rgbToHsl(red, green, blue);

            if (i === 1000) {
              console.log("HSL : ")
              console.log(h, s, l)
            }
          }
        }
      }
      console.log("done")

      // var x = (i / 4) % this.el.width;
      // var y = Math.floor((i / 4) / this.el.width);
    }

  }

  const handleOutput = (full: string, cropped: string) => {
    setFull(full);
    setCropped(cropped);
  }

  const clearState = () => {
    setFull("");
    setCropped("");
  }

  return (<div>
    {!!!full && <Camera handleOutput={handleOutput} />}
    <Box padding="1em 0">
      {full && <img style={{ height: "100px" }} src={full} />}
      {cropped && <img ref={imgRef} style={{ height: "100px" }} src={cropped} />}
    </Box>
    <Grid container direction="column" alignItems="flex-start">
      <OptionButton onClick={clearState}> <Autorenew style={{fontSize: "1.25em", marginRight: ".5em"}} /> Capture Again</OptionButton>
      <Box height=".5em" />
      <OptionButton onClick={analyzeImage}> <Insights style={{fontSize: "1.25em", marginRight: ".5em"}} /> Analyze</OptionButton>
    </Grid>
    <canvas ref={cRef} />
  </div>)
}

interface CameraProps {
  handleOutput: (full: string, cropped: string) => void
}

function Camera({ handleOutput }: CameraProps) { //From https://blog.logrocket.com/responsive-camera-component-react-hooks/

  const videoOpen = useState(false);

  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null)
  const rotatedCanvasRef = useRef<HTMLCanvasElement>(null)

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  const [ciWidth, setCiWidth] = useState(0);
  const [ciHeight, setCiHeight] = useState(0);

  const base_image = new Image();
  base_image.src = 'img/overlay.png';

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  const setCaptureCanvasParameters = () => {
    if (ciWidth === 0 || ciHeight === 0) {
      setCiWidth(videoRef.current.videoWidth / 5);
      setCiHeight(canvasRef.current.height - ((canvasRef.current.height / 10) * 2))
    }
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  function drawImge(skipBox = false) {

    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage


    var video = videoRef
    var canvas = canvasRef
    if (canvas.current) {
      var ctx = canvas.current.getContext('2d');

      setCaptureCanvasParameters()

      canvas.current.width = video.current.videoWidth;
      canvas.current.height = video.current.videoHeight;

      const boxWidth = video.current.videoWidth / 5;

      ctx.drawImage(video.current, 0, 0);
      var pX = canvas.current.width / 2 - boxWidth / 2;
      var pY = canvas.current.height / 10

      if (!skipBox) {
        ctx.rect(pX, pY, boxWidth, (canvas.current.height - (pY * 2)));
        ctx.lineWidth = "6";
        ctx.strokeStyle = "white";
        ctx.stroke();
      }


      // ctx.drawImage(base_image, 0, 0, base_image.width, base_image.height, 0, 0, canvas.current.width, canvas.current.height);
      setTimeout(drawImge, 100)
    }
  }

  function hOnPlay() {
    setTimeout(drawImge, 300)
  }

  const handleCapture = async () => {

    const boxWidth = videoRef.current.videoWidth / 5;

    var pX = canvasRef.current.width / 2 - boxWidth / 2;
    var pY = (canvasRef.current.height / 10)

    const boxHeight = (canvasRef.current.height - ((canvasRef.current.height / 10) * 2))

    if (displayCanvasRef.current) {

      //Draw cropped image to hidden canvas
      const context = displayCanvasRef.current.getContext("2d");

      context?.drawImage(canvasRef.current, pX, pY, boxWidth, boxHeight, 0, 0, boxWidth, boxHeight);

      const newContext = rotatedCanvasRef.current?.getContext("2d");
      newContext?.drawImage(displayCanvasRef.current, boxWidth, boxHeight);
      newContext?.rotate(Math.PI / 2);

      let croppedBlob: Blob | null = await new Promise(resolve => displayCanvasRef.current?.toBlob((blob: any) => { resolve(blob) }, "image/jpeg"))
      let fullBlob: Blob | null = await new Promise(resolve => canvasRef.current?.toBlob((blob: any) => { resolve(blob) }, "image/jpeg"))
      handleOutput(window.URL.createObjectURL(fullBlob), window.URL.createObjectURL(croppedBlob))
    }

  }
  return (
    <>
      <video style={{ visibility: "hidden", width: "100%", height: "1px" }} ref={videoRef} onPlay={hOnPlay} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      {<canvas
        ref={canvasRef}
        style={{
          zIndex: 2,
          height: "100vh", position: "fixed", top: 0, left: "50%",
          transform: "translate(-50%, 0)"
        }}
      />}
      <canvas
        hidden
        ref={displayCanvasRef}
        width={ciWidth}
        height={ciHeight}
      />
      <canvas
        //Rotated
        hidden
        ref={rotatedCanvasRef}
        width={ciHeight}
        height={ciWidth}
      />
      <div className={classes.cameraButtons}>
        <IconButton onClick={handleCapture} className={classes.cameraButton}>
          <CameraAlt />
        </IconButton>
      </div>
    </>
  );
}

// HSL graph might be more apporpriate
// Possible good hsv filter colors: (hMin = 0 , sMin = 17, vMin = 0), (hMax = 14 , sMax = 255, vMax = 255)
// SMIN 18 
// Bump image contrast? https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
