import React, { useEffect, useState, useRef } from "react";
import { useUserMedia } from "../hooks/useUserMedia";
import rgbToHsv from "../utility/rgb-to-hsv";
// import Caman from 'caman'

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: "environment",
    width: { ideal: 4096 },
    height: { ideal: 2160 }
  }
};

export default function PhotoTest() {

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
            const [h, s, v] = rgbToHsv(red, green, blue);

            if (i === 1000) {
              console.log("HSV : ")
              console.log(h, s, v)
            }
          }
        }
      }
      console.log("done")

      // var x = (i / 4) % this.el.width;
      // var y = Math.floor((i / 4) / this.el.width);
    }

  }

  const loadImage = () => {

    if (imgRef.current) {
      let ctx = cRef.current?.getContext('2d');
      if (cRef.current) {
        cRef.current.height = imgRef.current.height;
        cRef.current.width = imgRef.current.width;
        cRef.current.setAttribute("style", "background-color: red");
      }
      if (ctx) {
        ctx.drawImage(imgRef.current, 0, 0, imgRef.current.width, imgRef.current.height)
        // set the composite operation
        ctx.globalCompositeOperation = 'saturation';
        ctx.fillStyle = "red";
        ctx.globalAlpha = .5;  // alpha 0 = no effect 1 = full effect
        ctx.fillRect(0, 0, imgRef.current.width,imgRef.current.height);
      }

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
    {full && <img style={{ height: "100px" }} src={full} />}
    {cropped && <img ref={imgRef} onLoad={loadImage} style={{ height: "100px" }} src={cropped} />}
    <button onClick={clearState}>Reset</button>
    <button onClick={analyzeImage}>Analyze</button>
    <canvas
      ref={cRef}
    />
  </div>)
}

interface CameraProps {
  handleOutput: (full: string, cropped: string) => void
}

function Camera({ handleOutput }: CameraProps) { //From https://blog.logrocket.com/responsive-camera-component-react-hooks/

  const videoOpen = useState(false);

  // const [blob, setBlob] = useState<any>(null);
  // const [fullBlob, setFullBlob] = useState<any>(null);

  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null)
  const rotatedCanvasRef = useRef<HTMLCanvasElement>(null)

  const [n, setN] = useState(0);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [playing, setPlaying] = useState(false);

  const [ciWidth, setCiWidth] = useState(0);
  const [ciHeight, setCiHeight] = useState(0);

  const base_image = new Image();
  base_image.src = 'img/overlay.png';

  // useEffect(() => {
  //   if (playing) {
  //     setBoxWidth(videoRef.current.videoWidth / 5)
  //   }
  // }, [playing])

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
      const boxHeight = boxWidth * 2;

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
    setPlaying(true);
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
      <button onClick={handleCapture}>Handle capture</button>
      {<canvas
        ref={canvasRef}
        style={{
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
      <button onClick={handleCapture} style={{ position: "fixed", zIndex: 1, bottom: "1em", left: "50%" }}>Click</button>
      {/* {blob && <button onClick={clearImage}>Redo</button>} */}
    </>
  );
}