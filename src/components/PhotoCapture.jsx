import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PhotoCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let stream;
    // Start webcam
    navigator.mediaDevices.getUserMedia({ video: true }).then((s) => {
      stream = s;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        setIsStreamReady(true);
      }
    });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isStreamReady) {
      captureNextPhoto();
    }
  }, [isStreamReady]);

  useEffect(() => {
    if (photos.length === 8) {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }

      localStorage.setItem("capturedPhotos", JSON.stringify(photos));
      navigate("/filters");
    }
  }, [photos]);

  const captureNextPhoto = () => {
    //start countdown whenever a new photo needs to be taken

    let count = 3;
    setCountdown(count);

    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count === 0) {
        clearInterval(countdownInterval);
        takePhoto();
      }
    }, 1000);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/jpeg", 0.6);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
    setPhotos((prev) => [...prev, imageDataURL]);
    captureNextPhoto();
  };
  return (
    <div>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-white relative ">
        <h1 className="text-2xl font-bold text-black">Capturing Photos</h1>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-lg shadow-md max-w-md"
        />
        <canvas ref={canvasRef} className="hidden" />
        <p className="text-lg text-[#0378b5] font-semibold">
          {photos.length < 8
            ? `Photo ${photos.length + 1} in ${countdown}...`
            : "All photos captured!"}
        </p>
        {isFlashing && (
          <div className="fixed top-0 left-0 h-full w-full bg-white opacity-80 z-50 animate-flash"></div>
        )}
      </div>
    </div>
  );
};

export default PhotoCapture;
