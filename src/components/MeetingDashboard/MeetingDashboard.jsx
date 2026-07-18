import { motion } from "framer-motion";
import { PhoneOff, Clock3, Wifi, ShieldCheck } from "lucide-react";

import "./MeetingDashboard.css";

import TranscriptPanel from "./TranscriptPanel";
import AICorePanel from "./AICorePanel";
import ParticipantsPanel from "./ParticipantsPanel";
import SummaryPanel from "./SummaryPanel";

const MeetingDashboard = () => {
  return (
    <div className="meeting-dashboard">
      <motion.div
        className="meeting-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="meeting-left">
          <div className="meeting-status">
            <span className="live-dot"></span>
            LIVE
          </div>

          <div className="meeting-title">Product Sprint Review</div>
        </div>

        <div className="meeting-center">
          <div className="header-chip">
            <Clock3 size={16} />
            00:26:18
          </div>

          <div className="header-chip">
            <Wifi size={16} />
            Stable
          </div>

          <div className="header-chip">
            <ShieldCheck size={16} />
            AI Protected
          </div>
        </div>

        <button className="end-meeting">
          <PhoneOff size={18} />
          End Meeting
        </button>
      </motion.div>

      <div className="dashboard-grid">
        <div className="left-column">
          <TranscriptPanel />
        </div>

        <div className="right-column">
          <AICorePanel />
        </div>
      </div>

      <div className="bottom-grid">
        <ParticipantsPanel />

        <SummaryPanel />
      </div>
    </div>
  );
};

export default MeetingDashboard;
