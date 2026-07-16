import React from 'react';

function DecisionCard({ decision }) {
  return (
    <div className="decision-card">
      <h4>Decision</h4>
      <p>{decision?.text}</p>
    </div>
  );
}

export default DecisionCard;
