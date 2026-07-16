import { useEffect, useState } from 'react';
import { getSocket } from '../services/socket.js';

export function useSocket(roomId) {
  const [participants, setParticipants] = useState([]);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    socket.emit('join-room', { roomId });

    socket.on('participants-update', setParticipants);
    socket.on('transcript-entry', (entry) =>
      setTranscript((prev) => [...prev, entry])
    );

    return () => {
      socket.emit('leave-room', { roomId });
      socket.off('participants-update');
      socket.off('transcript-entry');
    };
  }, [roomId]);

  return { participants, transcript };
}
