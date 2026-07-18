import { useEffect, useState } from "react";
import socket from "../socket/socket";

export default function useMeetingAI() {
  const [meetingData, setMeetingData] = useState({
    transcript: "",
    translation: "",
    decision: "",
    task: "",
    summary: "",
  });

  useEffect(() => {
    socket.on("ai-update", (data) => {
      setMeetingData(data);
    });

    return () => {
      socket.off("ai-update");
    };
  }, []);

  return meetingData;
}
