import { useEffect, useRef } from "react";
import socket from "../services/socket";

const useMicrophone = () => {
  const mediaRecorder = useRef(null);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaRecorder.current = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });

        mediaRecorder.current.ondataavailable = async (event) => {
          if (event.data.size > 0) {
            const buffer = await event.data.arrayBuffer();
            socket.emit("audio-chunk", buffer);
          }
        };

        mediaRecorder.current.start(250);
      } catch (err) {
        console.error(err);
      }
    };

    startRecording();

    return () => {
      mediaRecorder.current?.stop();
    };
  }, []);
};

export default useMicrophone;
