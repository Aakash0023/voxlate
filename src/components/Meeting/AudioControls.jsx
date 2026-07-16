import React from 'react';

function AudioControls({ isMuted, onToggleMute, onLeave }) {
  return (
    <div className="audio-controls">
      <button onClick={onToggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
      <button onClick={onLeave}>Leave</button>
    </div>
  );
}

export default AudioControls;
