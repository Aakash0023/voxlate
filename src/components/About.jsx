import "../styles/about.css";

export default function About() {
  return (
    <section id="about" className="about">
      <h2>About VOXLATE</h2>

      <p>
        VOXLATE is an AI-powered multilingual meeting assistant that breaks
        language barriers with live translation, real-time transcription,
        intelligent summaries, decision tracking, and actionable insights.
      </p>

      <div className="about-stats">
        <div className="stat">
          <h3>5+</h3>
          <span>Languages</span>
        </div>

        <div className="stat">
          <h3>AI</h3>
          <span>Powered Summaries</span>
        </div>

        <div className="stat">
          <h3>PDF</h3>
          <span>Meeting Reports</span>
        </div>
      </div>
    </section>
  );
}
