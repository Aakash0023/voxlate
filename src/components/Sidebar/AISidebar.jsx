import {
  BrainCircuit,
  Languages,
  FileText,
  CheckCircle2,
  Mic,
} from "lucide-react";

import "./AISidebar.css";
import useSocket from "../../hooks/useSocket";

const AISidebar = ({ roomId, targetLangLabel = "Tamil" }) => {
  const { connected, transcript, summary, decisions, actionItems } =
    useSocket(roomId);

  const latest = transcript[transcript.length - 1];
  const latestDecision = decisions[decisions.length - 1];

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
          {connected ? "Listening" : "Connecting..."}
        </div>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <Mic size={18} />
          Live Transcript
        </div>

        <p>{latest?.original || "Waiting for transcript..."}</p>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <Languages size={18} />
          {targetLangLabel} Translation
        </div>

        <p>{latest?.translated || "Waiting for translation..."}</p>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <BrainCircuit size={18} />
          AI Decision
        </div>

        <div className="decision-box">
          {latestDecision?.text || "Waiting for AI decision..."}
        </div>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <FileText size={18} />
          Meeting Summary
        </div>

        <p>{summary || "Waiting for meeting summary..."}</p>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <CheckCircle2 size={18} />
          Action Items
        </div>

        <ul>
          {actionItems.length > 0 ? (
            actionItems.map((item) => (
              <li key={item.id}>
                {item.description} — {item.owner || "Unassigned"}
              </li>
            ))
          ) : (
            <li>Waiting for action items...</li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default AISidebar;
