import { useEffect, useState } from "react";
import socket from "../services/socket";

const useSocket = () => {
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [summary, setSummary] = useState("");
  const [decision, setDecision] = useState("");
  const [actionItems, setActionItems] = useState([]);

  useEffect(() => {
    socket.emit("join-meeting", "meeting-1");

    socket.on("transcript", setTranscript);
    socket.on("translation", setTranslation);
    socket.on("summary", setSummary);
    socket.on("decision", setDecision);
    socket.on("actionItems", setActionItems);

    return () => {
      socket.off("transcript");
      socket.off("translation");
      socket.off("summary");
      socket.off("decision");
      socket.off("actionItems");
    };
  }, []);

  return {
    transcript,
    translation,
    summary,
    decision,
    actionItems,
  };
};

export default useSocket;
