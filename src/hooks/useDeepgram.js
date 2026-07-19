import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { startAudioCapture } from "../utils/audioCapture";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: true,
});

export default function useDeepgram(language = "Tamil") {
  const [aiData, setAiData] = useState({
    transcript: "",
    translation: "",
    decision: "",
    task: "",
    summary: "",
  });

  const audioSession = useRef(null);

  useEffect(() => {
    console.log("🌍 Target Language:", language);

    const handleConnect = () => {
      console.log("🟢 Socket Connected:", socket.id);

      socket.emit("join-meeting", {
        language,
      });
    };

    const handleDisconnect = () => {
      console.log("🔴 Socket Disconnected");
    };

    const handleAIUpdate = (data) => {
      console.log("================================");
      console.log("🔥 AI UPDATE RECEIVED");
      console.log(data);
      console.log("================================");

      setAiData({
        transcript: data.transcript || "",
        translation: data.translation || "",
        decision: data.decision || "",
        task: data.task || "",
        summary: data.summary || "",
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("ai-update", handleAIUpdate);

    if (socket.connected) {
      socket.emit("change-language", {
        language,
      });
    }

    const initAudio = async () => {
      try {
        if (!audioSession.current) {
          audioSession.current = await startAudioCapture(socket);
          console.log("🎤 Audio Capture Started");
        }
      } catch (err) {
        console.error(err);
      }
    };

    initAudio();

    return async () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("ai-update", handleAIUpdate);

      if (audioSession.current) {
        try {
          audioSession.current.processor.disconnect();

          audioSession.current.stream
            .getTracks()
            .forEach((track) => track.stop());

          await audioSession.current.audioContext.close();
        } catch (err) {
          console.error(err);
        }

        audioSession.current = null;
      }
    };
  }, [language]);

  return aiData;
}
