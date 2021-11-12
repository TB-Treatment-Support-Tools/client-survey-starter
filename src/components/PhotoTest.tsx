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
  const [fullBlob, setFullBlob] = useState<any>(null);


  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [playing, setPlaying] = useState(false);

  const [ciWidth, setCiWidth] = useState(0);
  const [ciHeight, setCiHeight] = useState(0);



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
    //https://stackoverflow.com/questions/31778559/how-do-i-proportionally-resize-a-video-in-canvas/31778788


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

  const handleCapture = () => {
    
    // drawImge(true);

    const boxWidth = videoRef.current.videoWidth / 5;

    var pX = canvasRef.current.width / 2 - boxWidth / 2;
    var pY = (canvasRef.current.height / 10)

    const boxHeight = (canvasRef.current.height - ((canvasRef.current.height / 10) * 2))



    const context = displayCanvasRef.current.getContext("2d");

    context.drawImage(
      canvasRef.current, pX, pY, boxWidth, boxHeight, 0, 0, boxWidth, boxHeight
    );
    

    displayCanvasRef.current.toBlob((blob: any) => setBlob(blob), "image/jpeg", 1);
    canvasRef.current.toBlob((blob: any) => setFullBlob(blob), "image/jpeg", 1);
  }

  return (
    <>
      <video style={{ visibility: "hidden", width: "100%", height: "1px" }} ref={videoRef} onPlay={hOnPlay} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      <button onClick={handleCapture}>Handle capture</button>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "500px" }}
      />
      <canvas
        hidden
        ref={displayCanvasRef}
        width={ciWidth}
        height={ciHeight}
      />
      {fullBlob && <img style={{ height: "100px" }} src={window.URL.createObjectURL(fullBlob)} />}
      {blob && <img style={{ height: "100px" }} src={window.URL.createObjectURL(blob)} />}
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