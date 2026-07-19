import "../styles/howItWorks.css";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <h2>How It Works</h2>

      <div className="steps">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Create a Meeting</h3>
          <p>Start a meeting instantly and share the meeting link.</p>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Join Together</h3>
          <p>Participants join from anywhere using the meeting ID.</p>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <h3>AI Listens</h3>
          <p>VOXLATE transcribes and translates conversations in real time.</p>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <h3>Get Insights</h3>
          <p>
            Receive AI summaries, decisions, action items, and export them as a
            PDF.
          </p>
        </div>
      </div>
    </section>
  );
}
