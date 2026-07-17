import { Users, Mic, MicOff, Monitor, PhoneOff } from "lucide-react";

import AISidebar from "../components/Sidebar/AISidebar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="meeting-area">
        <div className="meeting-header">
          <div>
            <h1>Google Meet</h1>
            <p>Connected with Voxlate AI</p>
          </div>

          <div className="meeting-live">
            <span></span>
            Live
          </div>
        </div>

        <div className="participants-grid">
          <div className="participant-card active">
            <Users size={50} />
            <h3>Rahul</h3>
            <p>Speaking...</p>
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
          <button>
            <Mic size={20} />
          </button>

          <button>
            <MicOff size={20} />
          </button>

          <button>
            <Monitor size={20} />
          </button>

          <button className="leave-btn">
            <PhoneOff size={20} />
          </button>
        </div>
      </div>

      <AISidebar />
    </div>
  );
};

export default Dashboard;
