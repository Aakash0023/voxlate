import React from 'react';

function ParticipantCard({ participant }) {
  return (
    <div className="participant-card">
      <span>{participant?.name || 'Guest'}</span>
      <span className="participant-card__lang">{participant?.language || 'en'}</span>
    </div>
  );
}

export default ParticipantCard;
