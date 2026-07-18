import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { startAudioCapture } from "../utils/audioCapture";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: false,
});

export default function useDeepgram(language = "English") {
  const [aiData, setAiData] = useState({
    transcript: "",
    translation: "",
    decision: "",
    task: "",
    summary: "",
  });

  const audioSession = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log("🟢 Joining Meeting");

    const handleConnect = () => {
      console.log("🟢 Socket Connected:", socket.id);
      socket.emit("join-meeting", { language });
    };

    const handleDisconnect = () => {
      console.log("🔴 Socket Disconnected");
    };

    const handleAIUpdate = (data) => {
      console.log("🔥 AI UPDATE");
      console.log(data);
      setAiData(data);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("ai-update", handleAIUpdate);

    const init = async () => {
      try {
        audioSession.current = await startAudioCapture(socket);
        console.log("🎤 Audio Capture Started");
      } catch (err) {
        console.error(err);
      }
    };

    init();

    return async () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("ai-update", handleAIUpdate);

      socket.emit("leave-meeting");

      if (audioSession.current) {
        audioSession.current.processor.disconnect();
        audioSession.current.stream
          .getTracks()
          .forEach((track) => track.stop());

        await audioSession.current.audioContext.close();
      }

      initialized.current = false;
    };
  }, []);

  return aiData;
}
