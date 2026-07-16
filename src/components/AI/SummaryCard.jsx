import React from 'react';

function SummaryCard({ summary }) {
  return (
    <div className="summary-card">
      <h4>Summary</h4>
      <p>{summary}</p>
    </div>
  );
}

export default SummaryCard;
