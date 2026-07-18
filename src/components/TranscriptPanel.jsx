import "../styles/TranscriptPanel.css";

export default function TranscriptPanel({ transcripts }) {
  return (
    <div className="transcript-panel">
      <h2>Live Transcript</h2>

      <div className="transcript-list">
        {transcripts.length === 0 ? (
          <p className="empty">Start speaking...</p>
        ) : (
          transcripts.map((item, index) => (
            <div className="transcript-item" key={index}>
              <span className="time">{item.time}</span>

              <p>{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
