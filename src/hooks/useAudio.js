import { useState, useRef } from 'react';

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const streamRef = useRef(null);

  async function startCapture() {
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
  }

  function toggleMute() {
    setIsMuted((prev) => {
      const next = !prev;
      streamRef.current?.getAudioTracks().forEach((track) => {
        track.enabled = !next;
      });
      return next;
    });
  }

  return { isMuted, toggleMute, startCapture };
}
