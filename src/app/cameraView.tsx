import React, { useRef, useEffect, useState } from 'react';

const CameraView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    getVideo();
  }, []);

  const handleStartRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const options = { mimeType: 'video/webm; codecs=vp8,opus' };
      const mediaRecorder = new MediaRecorder(videoRef.current.srcObject as MediaStream, options);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, {
            type: 'video/webm'
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = 'recording.webm';
          a.click();
          window.URL.revokeObjectURL(url);
          setRecordedChunks([]);
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} className="camera-video" />
      <div className="controls">
        {!isRecording ? (
          <button onClick={handleStartRecording}>Start Recording</button>
        ) : (
          <button onClick={handleStopRecording}>Stop Recording</button>
        )}
      </div>
    </div>
  );
};

export default CameraView;

