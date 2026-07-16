import React from 'react';
import { useParams } from 'react-router-dom';
import SummaryCard from '../components/AI/SummaryCard.jsx';
import DecisionCard from '../components/AI/DecisionCard.jsx';
import ActionItemCard from '../components/AI/ActionItemCard.jsx';

function Summary() {
  const { roomId } = useParams();

  // Placeholder data — replace with API call to fetch generated summary
  const summary = 'Summary will appear here once the meeting ends.';
  const decisions = [];
  const actionItems = [];

  return (
    <div className="summary-page">
      <h2>Meeting Summary — {roomId}</h2>
      <SummaryCard summary={summary} />
      {decisions.map((d, i) => (
        <DecisionCard key={i} decision={d} />
      ))}
      {actionItems.map((a, i) => (
        <ActionItemCard key={i} item={a} />
      ))}
    </div>
  );
}

export default Summary;
