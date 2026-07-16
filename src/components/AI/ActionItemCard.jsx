import React from 'react';

function ActionItemCard({ item }) {
  return (
    <div className="action-item-card">
      <p>{item?.description}</p>
      <span>Owner: {item?.owner || 'Unassigned'}</span>
    </div>
  );
}

export default ActionItemCard;
