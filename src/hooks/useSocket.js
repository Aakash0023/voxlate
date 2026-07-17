import { useEffect, useState, useCallback } from "react";
import socket from "../services/socket";

/**
 * Connects to the meeting room's real-time channel and keeps local state
 * in sync with transcript/translation/summary/decision/action-item events
 * coming from the backend AI pipeline.
 *
 * @param {string} roomId
 */
const useSocket = (roomId) => {
  const [transcript, setTranscript] = useState([]); // [{id, speaker, original, translated, targetLang, timestamp}]
  const [summary, setSummary] = useState("");
  const [decisions, setDecisions] = useState([]); // [{id, text, confidence}]
  const [actionItems, setActionItems] = useState([]); // [{id, description, owner}]
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-meeting", roomId);

    const onConnect = () => {
      setConnected(true);
      socket.emit("join-meeting", roomId);
    };
    const onDisconnect = () => setConnected(false);
    const onTranscriptEntry = (entry) =>
      setTranscript((prev) => [...prev, entry]);
    const onSummary = (value) => setSummary(value);
    const onDecisions = (value) => setDecisions(value);
    const onActionItems = (value) => setActionItems(value);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("transcript-entry", onTranscriptEntry);
    socket.on("summary-update", onSummary);
    socket.on("decisions-update", onDecisions);
    socket.on("actionItems-update", onActionItems);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("transcript-entry", onTranscriptEntry);
      socket.off("summary-update", onSummary);
      socket.off("decisions-update", onDecisions);
      socket.off("actionItems-update", onActionItems);
    };
  }, [roomId]);

  const sendAudioChunk = useCallback(
    (buffer, { speaker, targetLang } = {}) => {
      socket.emit("audio-chunk", { roomId, buffer, speaker, targetLang });
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
