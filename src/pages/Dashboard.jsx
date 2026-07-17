import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Mic, MicOff, Monitor, PhoneOff } from "lucide-react";

import AISidebar from "../components/Sidebar/AISidebar";
import useMicrophone from "../hooks/useMicrophone";
import socket from "../services/socket";
import "./Dashboard.css";

const Dashboard = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { isRecording, stop } = useMicrophone(roomId, {
    speaker: "You",
    targetLang: "ta",
  });

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-meeting", roomId);

    return () => {
      socket.emit("leave-meeting", roomId);
    };
  }, [roomId]);

  const handleLeave = () => {
    socket.emit("leave-meeting", roomId);
    stop();
    navigate(`/summary/${roomId}`);
  };

  return (
    <div className="dashboard-page">
      <div className="meeting-area">
        <div className="meeting-header">
          <div>
            <h1>Google Meet</h1>
            <p>Connected with Voxlate AI • Room {roomId}</p>
          </div>

          <div className="meeting-live">
            <span></span>
            {isRecording ? "Live" : "Connecting..."}
          </div>
        </div>

        <div className="participants-grid">
          <div className={`participant-card ${isRecording ? "active" : ""}`}>
            <Users size={50} />
            <h3>You</h3>
            <p>{isRecording ? "Speaking..." : "Listening..."}</p>
          </div>

          <div className="participant-card">
            <Users size={50} />
            <h3>Aakash</h3>
            <p>Listening</p>
          </div>

          <div className="participant-card">
            <Users size={50} />
            <h3>Priya</h3>
            <p>Listening</p>
          </div>

          <div className="participant-card muted">
            <Users size={50} />
            <h3>Arjun</h3>
            <p>Muted</p>
          </div>
        </div>

        <div className="meeting-controls">
          <button disabled={isRecording} title="Microphone is recording">
            <Mic size={20} />
          </button>

          <button onClick={stop} title="Stop Recording">
            <MicOff size={20} />
          </button>

          <button title="Share Screen">
            <Monitor size={20} />
          </button>

          <button
            className="leave-btn"
            onClick={handleLeave}
            title="Leave Meeting"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>

      <AISidebar roomId={roomId} targetLangLabel="Tamil" />
    </div>
  );
};

export default Dashboard;
