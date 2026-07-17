import { useEffect, useRef, useState } from "react";
import socket from "../services/socket";

const SEGMENT_MS = 5000; // record in 5s self-contained clips

/**
 * Captures microphone audio and streams it to the backend in short,
 * self-contained segments (each one a complete, valid webm/opus file)
 * so the server can transcribe each segment independently.
 *
 * @param {string} roomId
 * @param {{ speaker?: string, targetLang?: string, autoStart?: boolean }} options
 */
const useMicrophone = (
  roomId,
  { speaker = "You", targetLang = "en", autoStart = true } = {}
) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    if (!roomId || !autoStart) return;
    stoppedRef.current = false;

    const recordSegment = (stream) => {
      if (stoppedRef.current) return;

      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        if (chunks.length) {
          const blob = new Blob(chunks, { type: "audio/webm" });
          const buffer = await blob.arrayBuffer();
          socket.emit("audio-chunk", { roomId, speaker, targetLang, buffer });
        }
        if (!stoppedRef.current) recordSegment(stream);
      };

      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);

      setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, SEGMENT_MS);
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream;
        recordSegment(stream);
      })
      .catch((err) => {
        console.error("[useMicrophone] mic access failed:", err);
        setError(err.message);
      });

    return () => {
      stoppedRef.current = true;
      setIsRecording(false);
      recorderRef.current?.state !== "inactive" &&
        recorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, autoStart]);

  const stop = () => {
    stoppedRef.current = true;
    setIsRecording(false);
    if (recorderRef.current?.state !== "inactive") recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  return { isRecording, error, stop };
};

export default useMicrophone;
