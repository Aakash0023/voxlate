import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  Globe,
  FileText,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Clock3,
  Users,
  Languages,
} from "lucide-react";
import "../styles/meetingRoom.css";

export default function MeetingRoom() {
  const participants = [
    {
      name: "Aakash",
      role: "Host",
      speaking: true,
      mic: true,
      camera: true,
      color: "#2563eb",
    },
    {
      name: "Rahul",
      role: "Developer",
      speaking: false,
      mic: true,
      camera: true,
      color: "#9333ea",
    },
    {
      name: "Priya",
      role: "Designer",
      speaking: false,
      mic: false,
      camera: true,
      color: "#ec4899",
    },
    {
      name: "Arun",
      role: "Product",
      speaking: false,
      mic: true,
      camera: false,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="meeting-room">
      <div className="meeting-topbar">
        <div className="meeting-title">
          <h2>VOXLATE</h2>
          <span>AI Powered Multilingual Meeting Assistant</span>
        </div>

        <div className="meeting-meta">
          <div className="meta-item">
            <Users size={16} />
            <span>4 Participants</span>
          </div>

          <div className="meta-item">
            <Clock3 size={16} />
            <span>00:18:42</span>
          </div>

          <div className="meta-item">
            <Languages size={16} />
            <span>English → Tamil</span>
          </div>

          <div className="meeting-status">
            <span className="status-dot"></span>
            Recording
          </div>
        </div>
      </div>

      <div className="meeting-body">
        <div className="video-section">
          <div className="participants-grid">
            {participants.map((user, index) => (
              <div
                key={index}
                className={`participant-card ${
                  user.speaking ? "speaking" : ""
                }`}
              >
                <div
                  className="video-background"
                  style={{
                    background: `linear-gradient(135deg, ${user.color}, #0f172a)`,
                  }}
                >
                  <div className="video-overlay"></div>

                  <div className="live-indicator">
                    <span className="live-dot"></span>
                    LIVE
                  </div>

                  <div className="participant-avatar">
                    {user.name.charAt(0)}
                  </div>

                  {user.speaking && (
                    <div className="voice-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}

                  <div className="participant-gradient"></div>
                </div>

                <div className="participant-footer">
                  <div className="participant-left">
                    <h3>{user.name}</h3>
                    <span>{user.role}</span>
                  </div>

                  <div className="participant-right">
                    {user.mic ? <Mic size={18} /> : <MicOff size={18} />}

                    {user.camera ? <Video size={18} /> : <VideoOff size={18} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="ai-sidebar">
          <div className="ai-header">
            <div className="ai-title">
              <div className="ai-icon">
                <Sparkles size={20} />
              </div>

              <div>
                <h3>VOXLATE AI</h3>
                <span>Listening to your meeting...</span>
              </div>
            </div>

            <div className="ai-listening">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="ai-card">
            <div className="card-title">
              <Globe size={18} />
              <span>Live Translation</span>
            </div>

            <div className="translation-box">
              <p className="language-label">English</p>
              <p className="primary-text">
                Hello everyone, welcome to today's sprint planning meeting.
              </p>

              <div className="translation-divider"></div>

              <p className="language-label">தமிழ்</p>
              <p className="secondary-text">
                அனைவருக்கும் வணக்கம். இன்றைய ஸ்பிரிண்ட் திட்டமிடல் கூட்டத்திற்கு
                வரவேற்கிறோம்.
              </p>
            </div>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <FileText size={18} />
              <span>Live Transcript</span>
            </div>

            <div className="transcript-feed">
              <div className="transcript-item">
                <strong>Rahul</strong>
                <p>Let's deploy the backend this Friday after testing.</p>
              </div>

              <div className="transcript-item">
                <strong>Aakash</strong>
                <p>I'll finish the Deepgram integration before deployment.</p>
              </div>

              <div className="transcript-item active">
                <strong>VOXLATE AI</strong>
                <p>Listening...</p>
              </div>
            </div>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <Sparkles size={18} />
              <span>AI Summary</span>
            </div>

            <ul className="summary-list">
              <li>Backend deployment discussed.</li>
              <li>Translation pipeline reviewed.</li>
              <li>Hackathon demo preparation ongoing.</li>
            </ul>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <CheckCircle2 size={18} />
              <span>Key Decisions</span>
            </div>

            <ul className="decision-list">
              <li>Deploy on Friday.</li>
              <li>Continue with Deepgram STT.</li>
              <li>Gemini will generate summaries.</li>
            </ul>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <ClipboardList size={18} />
              <span>Action Items</span>
            </div>

            <div className="task-list">
              <div className="task">
                <input type="checkbox" />
                <span>Aakash — Fix audio pipeline</span>
              </div>

              <div className="task">
                <input type="checkbox" />
                <span>Rahul — Deploy backend</span>
              </div>

              <div className="task">
                <input type="checkbox" />
                <span>Priya — Finish UI polish</span>
              </div>

              <div className="task">
                <input type="checkbox" />
                <span>Arun — Prepare final presentation</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="meeting-controls">
        <button title="Microphone">
          <Mic size={22} />
        </button>

        <button title="Camera">
          <Video size={22} />
        </button>

        <button title="Share Screen">
          <Monitor size={22} />
        </button>

        <button title="AI Assistant">
          <Sparkles size={22} />
        </button>

        <button className="end-call" title="Leave Meeting">
          <PhoneOff size={22} />
        </button>
      </div>
    </div>
  );
}
