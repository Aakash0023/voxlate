import React from 'react';
import TranscriptCard from './TranscriptCard.jsx';

function LiveTranscript({ entries = [] }) {
  return (
    <div className="live-transcript">
      {entries.map((entry) => (
        <TranscriptCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default LiveTranscript;
