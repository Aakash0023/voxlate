import React from 'react';
import ParticipantCard from './ParticipantCard.jsx';

function Participants({ participants = [] }) {
  return (
    <div className="participants">
      {participants.map((p) => (
        <ParticipantCard key={p.id} participant={p} />
      ))}
    </div>
  );
}

export default Participants;
