import React, { createContext, useContext, useState } from 'react';

const MeetingContext = createContext(null);

export function MeetingProvider({ children }) {
  const [meeting, setMeeting] = useState({
    roomId: null,
    participants: [],
    transcript: [],
  });

  return (
    <MeetingContext.Provider value={{ meeting, setMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeeting() {
  const ctx = useContext(MeetingContext);
  if (!ctx) throw new Error('useMeeting must be used within MeetingProvider');
  return ctx;
}
