import React, { useEffect, useState, useRef } from "react";

const faceArea = 300;


const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: "environment",
    width: { ideal: 4096 },
    height: { ideal: 2160 }
  }
};


export default function PhotoTest() {
  return (<div>
    <Camera />
  </div>)
}

function Camera() { //From https://blog.logrocket.com/responsive-camera-component-react-hooks/
  const videoRef = useRef<any>();
  const canvasRef = useRef<any>();
  const displayCanvasRef = useRef<any>();
  const [blob, setBlob] = useState<any>(null);
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [playing, setPlaying] = useState(false);

  const [boxWidth, setBoxWidth] = useState(0);

  const base_image = new Image();
  base_image.src = 'img/overlay.png';

  useEffect(() => {
    if (playing) {
      setBoxWidth(videoRef.current.videoWidth / 5)
    }
  }, [playing])

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  function drawImge(){
    var video = videoRef
    var canvas = canvasRef
    var ctx = canvas.current.getContext('2d');

    canvas.current.width = video.current.videoWidth;
    canvas.current.height = video.current.videoHeight;

    const boxWidth = video.current.videoWidth / 5;
    const boxHeight = boxWidth * 2;


    ctx.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);
    var pX = canvas.current.width / 2 - boxWidth / 2;
    var pY = canvas.current.height / 2 - boxHeight /2;
    // ctx.rect(pX, pY, boxWidth, boxWidth * 3);
    // ctx.lineWidth = "6";
    // ctx.strokeStyle = "red";
    // ctx.stroke();
    
    ctx.drawImage(base_image, 0, 0, base_image.width, base_image.height, 0, 0, canvas.current.width, canvas.current.height);
    setTimeout(drawImge,100)
  }

  function hOnPlay(){
    setTimeout(drawImge,300)
    setPlaying(true);
  }

  const handleCapture = () => {

    const boxWidth = videoRef.current.videoWidth / 5;
    const boxHeight = boxWidth * 2;

    var pX = canvasRef.current.width / 2 - boxWidth /2;
    var pY = canvasRef.current.height / 2 - boxHeight/2;

    const context = displayCanvasRef.current.getContext("2d");

    context.drawImage(
      canvasRef.current, pX, pY, boxWidth, boxHeight, 0, 0, boxWidth, boxHeight
    );

    displayCanvasRef.current.toBlob((blob: any) => setBlob(blob), "image/jpeg", 1);
  }

  return (
    <>
      <video style={{ visibility: "hidden", width: "100%", height: "1px" }} ref={videoRef} onPlay={hOnPlay} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      <button onClick={handleCapture}>Handle capture</button>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "500px"}}
      />
      <canvas
        hidden
        ref={displayCanvasRef}
        width={boxWidth}
        height={boxWidth * 2}
      />
      {blob && <img src={window.URL.createObjectURL(blob)} />}
    </>
  );
}

export function useUserMedia(requestedMedia: any) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch (err) {
        // Removed for brevity
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}