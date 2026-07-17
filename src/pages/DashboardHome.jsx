import { motion } from "framer-motion";
import {
  Search,
  Plus,
  BrainCircuit,
  CalendarDays,
  Clock3,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import "./DashboardHome.css";

const meetings = [
  {
    id: 1,
    title: "Product Sprint Planning",
    date: "Today",
    duration: "32 mins",
    participants: 5,
    summary: "Homepage redesign approved and authentication flow finalized.",
    decisions: 3,
    tasks: 5,
  },
  {
    id: 2,
    title: "Client Discussion",
    date: "Yesterday",
    duration: "18 mins",
    participants: 3,
    summary: "Budget approved and deployment scheduled for Friday.",
    decisions: 2,
    tasks: 4,
  },
  {
    id: 3,
    title: "Daily Standup",
    date: "Yesterday",
    duration: "11 mins",
    participants: 7,
    summary: "Frontend nearing completion while backend testing continues.",
    decisions: 1,
    tasks: 2,
  },
];

function DashboardHome() {
  return (
    <div className="dashboard-home">
      <nav className="dashboard-navbar">
        <div className="logo">
          <BrainCircuit size={30} />

          <div>
            <h2>VOXLATE</h2>

            <span>AI Workspace</span>
          </div>
        </div>

        <button className="new-meeting-btn">
          <Plus size={18} />
          New Meeting
        </button>
      </nav>

      <section className="dashboard-hero">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>
            Meetings.
            <br />
            Remembered.
            <br />
            Automatically.
          </h1>

          <p>
            AI powered meeting assistant that transcribes, summarizes and
            extracts action items instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="search-box"
        >
          <Search size={20} />

          <input placeholder="Search meetings..." />
        </motion.div>
      </section>

      <section className="stats-grid">
        <motion.div whileHover={{ y: -6 }} className="stat-card">
          <CalendarDays size={30} />

          <h2>48</h2>

          <p>Total Meetings</p>
        </motion.div>

        <motion.div whileHover={{ y: -6 }} className="stat-card">
          <Clock3 size={30} />

          <h2>38 hrs</h2>

          <p>Hours Saved</p>
        </motion.div>

        <motion.div whileHover={{ y: -6 }} className="stat-card">
          <Sparkles size={30} />

          <h2>104</h2>

          <p>Decisions</p>
        </motion.div>

        <motion.div whileHover={{ y: -6 }} className="stat-card">
          <CheckCircle2 size={30} />

          <h2>212</h2>

          <p>Action Items</p>
        </motion.div>
      </section>

      <section className="recent-meetings">
        <div className="section-title">
          <h2>Recent Meetings</h2>

          <button>
            View All
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="meeting-grid">
          {meetings.map((meeting) => (
            <motion.div
              key={meeting.id}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                duration: 0.25,
              }}
              className="meeting-card"
            >
              <div className="meeting-header">
                <div>
                  <h3>{meeting.title}</h3>
                  <span>{meeting.date}</span>
                </div>

                <div className="meeting-badge">AI</div>
              </div>

              <p className="meeting-summary">{meeting.summary}</p>

              <div className="meeting-info">
                <div>
                  <Users size={16} />
                  <span>{meeting.participants}</span>
                </div>

                <div>
                  <Clock3 size={16} />
                  <span>{meeting.duration}</span>
                </div>
              </div>

              <div className="meeting-stats">
                <div>
                  <Sparkles size={18} />
                  <div>
                    <h4>{meeting.decisions}</h4>
                    <span>Decisions</span>
                  </div>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <div>
                    <h4>{meeting.tasks}</h4>
                    <span>Tasks</span>
                  </div>
                </div>
              </div>

              <button className="open-report-btn">
                Open Report
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="insights-section"
      >
        <div className="insights-header">
          <BrainCircuit size={32} />

          <div>
            <h2>AI Workspace Insights</h2>
            <p>A quick overview of your meeting productivity.</p>
          </div>
        </div>

        <div className="insight-cards">
          <div className="insight-card">
            <h3>Most Active Day</h3>
            <p>Tuesday</p>
          </div>

          <div className="insight-card">
            <h3>Average Meeting</h3>
            <p>24 Minutes</p>
          </div>

          <div className="insight-card">
            <h3>Top Speaker</h3>
            <p>Aakash</p>
          </div>

          <div className="insight-card">
            <h3>AI Accuracy</h3>
            <p>98%</p>
          </div>
        </div>
      </motion.section>

      <footer className="dashboard-footer">
        <p>Built with ❤️ using React, Socket.IO, Deepgram & Gemini AI.</p>
      </footer>
    </div>
  );
}

export default DashboardHome;
