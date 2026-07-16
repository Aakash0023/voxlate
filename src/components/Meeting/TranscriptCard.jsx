import React from 'react';

function TranscriptCard({ entry }) {
  return (
    <div className="transcript-card">
      <strong>{entry.speaker}:</strong> {entry.translatedText}
    </div>
  );
}

export default TranscriptCard;
