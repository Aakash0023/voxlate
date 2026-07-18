import "../styles/hero.css";

export default function Hero() {
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
          using AI voice while automatically detecting decisions, tasks, and
          meeting summaries in real time.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Start Meeting</button>
          <button className="secondary-btn">Watch Demo</button>
        </div>
      </div>
    </section>
  );
}
