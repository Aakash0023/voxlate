import { motion } from "framer-motion";
import {
  Mic,
  Languages,
  BrainCircuit,
  FileText,
  CheckCircle2,
} from "lucide-react";

import "./DashboardPreview.css";

const activities = [
  {
    icon: <Mic size={18} />,
    title: "Rahul is speaking...",
    color: "#22C55E",
  },
  {
    icon: <Languages size={18} />,
    title: "Tamil translation generated",
    color: "#06B6D4",
  },
  {
    icon: <Languages size={18} />,
    title: "Hindi translation generated",
    color: "#06B6D4",
  },
  {
    icon: <BrainCircuit size={18} />,
    title: "Decision detected",
    color: "#7C3AED",
  },
  {
    icon: <FileText size={18} />,
    title: "Meeting summary updated",
    color: "#F59E0B",
  },
];

const DashboardPreview = () => {
  return (
    <section className="dashboard-preview">
      <motion.div
        className="dashboard-left"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-tag">LIVE AI DASHBOARD</span>

        <h2>
          Watch Voxlate
          <span> Think in Real Time.</span>
        </h2>

        <p>
          Every spoken sentence is transformed into transcripts, multilingual
          translations, AI decisions and meeting summaries within seconds.
        </p>

        <div className="dashboard-features">
          <div>
            <CheckCircle2 />
            Live Speech Recognition
          </div>

          <div>
            <CheckCircle2 />
            AI Translation
          </div>

          <div>
            <CheckCircle2 />
            Decision Intelligence
          </div>

          <div>
            <CheckCircle2 />
            Instant Summary
          </div>
        </div>
      </motion.div>

      <motion.div
        className="dashboard-card"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="dashboard-header">
          <div className="live-status">
            <span></span>
            Live Meeting
          </div>

          <p>Meeting ID : VX-48392</p>
        </div>

        <div className="activity-list">
          {activities.map((item, index) => (
            <motion.div
              key={index}
              className="activity-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: index * 0.3,
              }}
            >
              <div
                className="activity-icon"
                style={{
                  background: item.color,
                }}
              >
                {item.icon}
              </div>

              <div>
                <h4>{item.title}</h4>

                <span>Completed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DashboardPreview;
