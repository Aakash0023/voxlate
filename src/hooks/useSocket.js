import { useEffect, useState, useCallback } from "react";
import socket from "../services/socket";

const useSocket = (roomId) => {
  const [connected, setConnected] = useState(socket.connected);

  const [transcript, setTranscript] = useState([]);
  const [summary, setSummary] = useState("");
  const [decisions, setDecisions] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-meeting", roomId);

    const onConnect = () => {
      setConnected(true);
      socket.emit("join-meeting", roomId);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    const onTranscript = (line) => {
      const separator = line.indexOf(":");

      const speaker =
        separator !== -1 ? line.substring(0, separator) : "Speaker";

      const original =
        separator !== -1 ? line.substring(separator + 1).trim() : line;

      setTranscript((prev) => [
        ...prev,
        {
          id: Date.now(),
          speaker,
          original,
          translated: "",
          timestamp: new Date(),
        },
      ]);
    };

    const onSummary = (value) => {
      setSummary(value);
    };

    const onDecision = (value) => {
      if (Array.isArray(value)) {
        setDecisions(value);
      } else {
        setDecisions([
          {
            id: Date.now(),
            text: value,
          },
        ]);
      }
    };

    const onActionItems = (items) => {
      if (Array.isArray(items)) {
        setActionItems(
          items.map((item, index) =>
            typeof item === "string"
              ? {
                  id: index,
                  description: item,
                  owner: "",
                }
              : {
                  id: index,
                  ...item,
                }
          )
        );
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("transcript", onTranscript);
    socket.on("summary", onSummary);
    socket.on("decision", onDecision);
    socket.on("actionItems", onActionItems);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.off("transcript", onTranscript);
      socket.off("summary", onSummary);
      socket.off("decision", onDecision);
      socket.off("actionItems", onActionItems);
    };
  }, [roomId]);

  const sendAudioChunk = useCallback(
    (buffer, { speaker = "You", targetLang = "ta" } = {}) => {
      socket.emit("audio-chunk", {
        roomId,
        buffer,
        speaker,
        targetLang,
      });
    },
    [roomId]
  );

  return {
    connected,
    transcript,
    summary,
    decisions,
    actionItems,
    sendAudioChunk,
  };
};

export default useSocket;
