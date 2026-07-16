import React from 'react';

function MeetingHeader({ roomId }) {
  return (
    <div className="meeting-header">
      <h2>Meeting Room: {roomId}</h2>
    </div>
  );
}

export default MeetingHeader;
