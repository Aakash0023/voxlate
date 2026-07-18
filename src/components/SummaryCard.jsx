export default function SummaryCard() {
  return (
    <div className="ai-card">
      <div className="card-header">
        <h3>📝 AI Meeting Summary</h3>
      </div>

      <div className="summary-content">
        <p>
          The meeting focused on the Voxlate hackathon MVP. The team agreed to
          use React for the frontend and scheduled the demo for Friday.
        </p>

        <ul>
          <li>React selected for frontend.</li>
          <li>Backend assigned to Rahul.</li>
          <li>Demo scheduled for Friday.</li>
          <li>Presentation assigned to Aakash.</li>
        </ul>

        <button className="summary-btn">Generate New Summary</button>
      </div>
    </div>
  );
}
