import "../styles/hero.css";

export default function Hero({ onCreateMeeting, onJoinMeeting }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">🎧 AI Voice Translation for Meetings</span>

        <h1>
          Hear Every Meeting
          <br />
          In Your Own Language.
        </h1>

        <p>
          VOXLATE translates spoken conversations into your preferred language
          using AI voice while automatically detecting decisions, action items,
          and meeting summaries in real time.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={onCreateMeeting}>
            🚀 Create Meeting
          </button>

          <button className="secondary-btn" onClick={onJoinMeeting}>
            🔗 Join Meeting
          </button>
        </div>
      </div>
    </section>
  );
}
