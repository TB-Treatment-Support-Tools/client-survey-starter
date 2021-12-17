import { useState, useRef } from "react";
import { useUserMedia } from "../hooks/useUserMedia";
import rgbToHsl from "../utility/rgb-to-hsl";
import OptionButton from "../components/Buttons/OptionButton";
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid'
import { IconButton } from "@mui/material";
import { CameraAlt, Autorenew, Insights, Clear } from "@mui/icons-material";
import classes from './styles.module.scss';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: "environment",
    width: { ideal: 4096 },
    height: { ideal: 2160 }
  }
};

interface TestCapture{
  fullImage: string,
  croppedImage: string
}

interface Props{
  setImages: (tests : TestCapture) => void,
  closeCamera: () => void
}

export default function CroppableCamera({ setImages, closeCamera }: Props) {

  const [full, setFull] = useState("");
  const [cropped, setCropped] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleNext = () => {
    setImages({fullImage: full,croppedImage: cropped})
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
    {!!!full && <Camera closeCamera={closeCamera} handleOutput={handleOutput} />}
    <Box padding="1em 0">
      {full && <img style={{ height: "100px" }} src={full} />}
      {cropped && <img ref={imageRef} style={{ height: "100px" }} src={cropped} />}
    </Box>
    <Grid container direction="column" alignItems="flex-start">
      <OptionButton onClick={clearState}> <Autorenew style={{fontSize: "1.25em", marginRight: ".5em"}} />Capture Again</OptionButton>
      <Box height=".5em" />
      <OptionButton onClick={handleNext}>Continue</OptionButton>
    </Grid>
    <canvas ref={canvasRef} />
  </div>)
}

interface CameraProps {
  handleOutput: (full: string, cropped: string) => void,
  closeCamera: () => void
}

function Camera({ handleOutput, closeCamera }: CameraProps) { //From https://blog.logrocket.com/responsive-camera-component-react-hooks/

  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null)
  const rotatedCanvasRef = useRef<HTMLCanvasElement>(null)

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  const [ciWidth, setCiWidth] = useState(0);
  const [ciHeight, setCiHeight] = useState(0);

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

    var video = videoRef
    var canvas = canvasRef
    if (canvas.current) {
      var ctx = canvas.current.getContext('2d');

      setCaptureCanvasParameters()

      canvas.current.width = video.current.videoWidth;
      canvas.current.height = video.current.videoHeight;

      const boxWidth = video.current.videoWidth / 12;

      ctx.drawImage(video.current, 0, 0);
      var pX = canvas.current.width / 2 - boxWidth / 2;
      var pY = canvas.current.height / 4;

      if (!skipBox) {
        ctx.rect(pX, pY, boxWidth, (canvas.current.height - (pY * 2)));
        ctx.lineWidth = "6";
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      setTimeout(drawImge, 100)
    }
  }

  function handleOnPlay() {
    setTimeout(drawImge, 300)
  }

  const handleCapture = async () => {

    const boxWidth = videoRef.current.videoWidth / 12;

    var pX = canvasRef.current.width / 2 - boxWidth / 2;
    var pY = (canvasRef.current.height / 4)

    const boxHeight = (canvasRef.current.height - (pY * 2))

    if (displayCanvasRef.current) {

      //Draw cropped image to hidden canvas
      const context = displayCanvasRef.current.getContext("2d");
      displayCanvasRef.current.height = boxHeight;
      displayCanvasRef.current.width = boxWidth;
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
      <div className={classes.exit}>
      <IconButton onClick={closeCamera} className={classes.cameraButton}>
          <Clear />
        </IconButton>
      </div>
      <video style={{ visibility: "hidden", width: "100%", height: "1px" }} ref={videoRef} onPlay={handleOnPlay} onCanPlay={handleCanPlay} autoPlay playsInline muted />
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