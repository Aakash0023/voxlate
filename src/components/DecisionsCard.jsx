export default function DecisionsCard() {
  const decisions = [
    {
      title: "Demo Scheduled",
      value: "Friday • 3:00 PM",
      speaker: "Aakash",
    },
    {
      title: "Frontend Framework",
      value: "React",
      speaker: "Rahul",
    },
  ];

  return (
    <div className="ai-card">
      <div className="card-header">
        <h3>📌 Decisions</h3>
        <span>{decisions.length}</span>
      </div>

      <div className="decision-list">
        {decisions.map((decision, index) => (
          <div className="decision-item" key={index}>
            <h4>{decision.title}</h4>

            <p>{decision.value}</p>

            <small>By {decision.speaker}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
