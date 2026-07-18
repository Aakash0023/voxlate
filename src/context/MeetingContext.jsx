import { createContext, useContext, useEffect, useState } from "react";
import { speakers, decisions, tasks } from "../data/demoMeeting";

const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const speakerTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % speakers.length);
    }, 4000);

    const meetingTimer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(speakerTimer);
      clearInterval(meetingTimer);
    };
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  const value = {
    speaker: speakers[index],
    decision: decisions[index],
    task: tasks[index],
    timer: `${minutes.toString().padStart(2, "0")}:${remaining
      .toString()
      .padStart(2, "0")}`,
  };

  return (
    <MeetingContext.Provider value={value}>{children}</MeetingContext.Provider>
  );
};

export const useMeeting = () => useContext(MeetingContext);
