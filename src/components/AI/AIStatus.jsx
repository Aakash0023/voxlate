import React from 'react';

function AIStatus({ status = 'idle' }) {
  return <div className="ai-status">AI: {status}</div>;
}

export default AIStatus;
