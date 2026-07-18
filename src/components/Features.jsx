import "../styles/features.css";
import { Languages, Volume2, CheckCircle2, ClipboardList } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Languages size={34} />,
      title: "AI Voice Translation",
      desc: "Hear every meeting in your preferred language with natural AI-generated voice.",
    },
    {
      icon: <Volume2 size={34} />,
      title: "Live Audio",
      desc: "Listen to translated conversations in real time instead of reading subtitles.",
    },
    {
      icon: <CheckCircle2 size={34} />,
      title: "Decision Detection",
      desc: "Automatically capture important decisions, approvals and commitments.",
    },
    {
      icon: <ClipboardList size={34} />,
      title: "Task Extraction",
      desc: "Identify owners, deadlines and action items from every meeting.",
    },
  ];

  return (
    <section className="features" id="features">
      <h2>Why VOXLATE?</h2>
      <p>Everything you need to understand and remember every meeting.</p>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
