import { useRef, useState } from "react";
import socket from "../socket/socket";
import { floatTo16BitPCM } from "../utils/audioProcessor";

export default function useMicrophone(selectedLanguage = "English") {
  const [recording, setRecording] = useState(false);

  const audioContext = useRef(null);
  const source = useRef(null);
  const processor = useRef(null);
  const stream = useRef(null);

  const startRecording = async () => {
    if (recording) return;

    stream.current = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    socket.emit("join-meeting", {
      language: selectedLanguage,
    });

    audioContext.current = new AudioContext({
      sampleRate: 16000,
    });

    source.current = audioContext.current.createMediaStreamSource(
      stream.current
    );

    processor.current = audioContext.current.createScriptProcessor(4096, 1, 1);

    processor.current.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);

      const pcm = floatTo16BitPCM(input);

      socket.emit("audio-data", pcm);
    };

    source.current.connect(processor.current);
    processor.current.connect(audioContext.current.destination);

    setRecording(true);
  };

  const stopRecording = () => {
    processor.current?.disconnect();
    source.current?.disconnect();

    audioContext.current?.close();

    stream.current?.getTracks().forEach((track) => track.stop());

    socket.emit("leave-meeting");

    setRecording(false);
  };

  return {
    recording,
    startRecording,
    stopRecording,
  };
}
