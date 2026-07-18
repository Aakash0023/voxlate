import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff } from "lucide-react";
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
          <h2>Live Meeting</h2>
          <span>AI is monitoring this conversation</span>
        </div>

        <div className="meeting-status">
          <span className="status-dot"></span>
          Connected
        </div>
      </div>

      <div className="participants-grid">
        {participants.map((user, index) => (
          <div
            key={index}
            className={`participant-card ${user.speaking ? "speaking" : ""}`}
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
