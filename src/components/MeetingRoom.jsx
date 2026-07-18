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
        <div>
          <h2>Team Sprint Planning</h2>
          <span>4 Participants • AI Assistant Active</span>
        </div>

        <div className="meeting-status">
          <span className="status-dot"></span>
          Recording
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
                  className="participant-avatar"
                  style={{ background: user.color }}
                >
                  {user.name.charAt(0)}
                </div>

                <div className="participant-info">
                  <h3>{user.name}</h3>
                  <span>{user.role}</span>
                </div>

                <div className="participant-icons">
                  {user.mic ? <Mic size={16} /> : <MicOff size={16} />}
                  {user.camera ? <Video size={16} /> : <VideoOff size={16} />}
                </div>

                {user.speaking && (
                  <div className="speaking-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="ai-sidebar">
          <div className="ai-header">
            <Sparkles size={20} />
            <h3>AI Meeting Assistant</h3>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <Globe size={18} />
              Live Translation
            </div>

            <p className="primary-text">
              Hello everyone, welcome to today's sprint meeting.
            </p>

            <p className="secondary-text">
              அனைவருக்கும் வணக்கம். இன்றைய ஸ்பிரிண்ட் கூட்டத்திற்கு
              வரவேற்கிறோம்.
            </p>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <FileText size={18} />
              Live Transcript
            </div>

            <p>
              Let's discuss the deployment timeline and assign the remaining
              backend tasks.
            </p>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <CheckCircle2 size={18} />
              Decisions
            </div>

            <ul>
              <li>Deploy on Friday</li>
              <li>Use Gemini for AI analysis</li>
              <li>Deepgram for speech recognition</li>
            </ul>
          </div>

          <div className="ai-card">
            <div className="card-title">
              <ClipboardList size={18} />
              Action Items
            </div>

            <ul>
              <li>Aakash → Fix audio pipeline</li>
              <li>Rahul → Deploy backend</li>
              <li>Priya → Finish UI polish</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="meeting-controls">
        <button>
          <Mic size={20} />
        </button>

        <button>
          <Video size={20} />
        </button>

        <button>
          <Monitor size={20} />
        </button>

        <button className="end-call">
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  );
}
