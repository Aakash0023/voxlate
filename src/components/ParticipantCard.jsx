export default function ParticipantCard({ name, language, speaking = false }) {
  return (
    <div className={`participant-card ${speaking ? "speaking" : ""}`}>
      <div className="participant-avatar">{name.charAt(0).toUpperCase()}</div>

      <div className="participant-details">
        <h3>{name}</h3>

        <p>{language}</p>

        <span className={`participant-status ${speaking ? "active" : ""}`}>
          {speaking ? "Speaking..." : "Listening"}
        </span>
      </div>
    </div>
  );
}
