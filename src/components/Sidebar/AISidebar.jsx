import {
  BrainCircuit,
  Languages,
  FileText,
  CheckCircle2,
  Mic,
} from "lucide-react";

import "./AISidebar.css";

const AISidebar = () => {
  return (
    <aside className="ai-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <BrainCircuit size={22} />
          <div>
            <h2>VOXLATE AI</h2>
            <p>Meeting Assistant</p>
          </div>
        </div>

        <div className="live-chip">
          <span></span>
          Listening
        </div>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <Mic size={18} />
          Live Transcript
        </div>

        <p>
          Good morning everyone. Let's finalize the deployment tomorrow and
          assign testing today.
        </p>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <Languages size={18} />
          Tamil Translation
        </div>

        <p>அனைவருக்கும் காலை வணக்கம். நாளை வெளியீட்டை முடிப்போம்.</p>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <BrainCircuit size={18} />
          AI Decision
        </div>

        <div className="decision-box">
          Deploy the platform tomorrow morning.
        </div>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <FileText size={18} />
          Meeting Summary
        </div>

        <ul>
          <li>Deployment scheduled.</li>
          <li>Testing assigned.</li>
          <li>Team agreed on release plan.</li>
        </ul>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <CheckCircle2 size={18} />
          Action Items
        </div>

        <ul>
          <li>Rahul → Deploy Platform</li>
          <li>Aakash → Verify Build</li>
          <li>Priya → Complete Testing</li>
        </ul>
      </div>
    </aside>
  );
};

export default AISidebar;
