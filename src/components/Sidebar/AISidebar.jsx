import {
  BrainCircuit,
  Languages,
  FileText,
  CheckCircle2,
  Mic,
} from "lucide-react";
import { useEffect, useRef } from "react";

import useSocket from "../../hooks/useSocket";

const AISidebar = ({ roomId, targetLangLabel = "Tamil" }) => {
  const { connected, transcript, summary, decisions, actionItems } =
    useSocket(roomId);

  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

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

        <div className="transcript-box" ref={transcriptRef}>
          {transcript.length ? (
            transcript.slice(-10).map((line, index) => (
              <div key={index} className="transcript-item">
                <strong>{line.speaker}</strong>
                <p>{line.original}</p>
              </div>
            ))
          ) : (
            <p>Waiting for transcript...</p>
          )}
        </div>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <Languages size={18} />
          {targetLangLabel} Translation
        </div>

        <div className="transcript-box" ref={transcriptRef}>
          {transcript.length ? (
            transcript.slice(-10).map((line, index) => (
              <div key={index} className="transcript-item">
                <p>{line.translated || "Translation unavailable"}</p>
              </div>
            ))
          ) : (
            <p>Waiting for translation...</p>
          )}
        </div>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <BrainCircuit size={18} />
          AI Decisions
        </div>

        {decisions.length ? (
          <ul className="decision-list">
            {decisions.map((decision, index) => (
              <li key={index}>{decision.text}</li>
            ))}
          </ul>
        ) : (
          <div className="decision-box">Waiting for AI decisions...</div>
        )}
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <FileText size={18} />
          Meeting Summary
        </div>

        <p>{summary || "Meeting summary will appear here..."}</p>
      </div>

      <div className="sidebar-card">
        <div className="card-title">
          <CheckCircle2 size={18} />
          Action Items
        </div>

        {actionItems.length ? (
          <ul>
            {actionItems.map((item, index) => (
              <li key={index}>
                <strong>{item.owner || "Unassigned"}</strong>
                {" → "}
                {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>Waiting for action items...</li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default AISidebar;
