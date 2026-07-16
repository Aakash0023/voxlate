import React from 'react';

function ConfidenceMeter({ score = 0 }) {
  return (
    <div className="confidence-meter">
      <div
        className="confidence-meter__fill"
        style={{ width: `${Math.round(score * 100)}%` }}
      />
    </div>
  );
}

export default ConfidenceMeter;
