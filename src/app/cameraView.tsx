import React, { useRef, useEffect } from 'react';

const CameraView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };
    
    getVideo();
  }, [videoRef]);

  return (
    <div className="camera-container">
      <video ref={videoRef} className="camera-video" />
    </div>
  );
};

export default CameraView;
