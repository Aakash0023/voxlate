import { motion } from "framer-motion";
import {
  Video,
  MonitorSmartphone,
  Building2,
  Globe,
  BrainCircuit,
  Languages,
  FileText,
  CheckCircle2,
} from "lucide-react";

import "./Integration.css";

const platforms = [
  {
    name: "Google Meet",
    icon: <Video size={26} />,
  },
  {
    name: "Zoom",
    icon: <MonitorSmartphone size={26} />,
  },
  {
    name: "Microsoft Teams",
    icon: <Building2 size={26} />,
  },
  {
    name: "Cisco Webex",
    icon: <Globe size={26} />,
  },
];

const outputs = [
  {
    title: "Live Translation",
    icon: <Languages size={22} />,
  },
  {
    title: "Meeting Summary",
    icon: <FileText size={22} />,
  },
  {
    title: "Decision Detection",
    icon: <BrainCircuit size={22} />,
  },
  {
    title: "Action Items",
    icon: <CheckCircle2 size={22} />,
  },
];

const Integration = () => {
  return (
    <section className="integration">
      <div className="integration-heading">
        <span>WORKS WITH EVERY PLATFORM</span>

        <h2>
          Connect Your Meeting.
          <span> Voxlate Handles The Rest.</span>
        </h2>

        <p>
          Continue using your favourite meeting platform while Voxlate
          translates conversations, detects decisions and generates intelligent
          summaries in real time.
        </p>
      </div>

      <div className="integration-container">
        <div className="platform-column">
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              className="platform-item"
              whileHover={{
                scale: 1.05,
              }}
            >
              {platform.icon}

              <span>{platform.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="center-flow">
          <div className="line"></div>

          <div className="voxlate-core">
            <BrainCircuit size={48} />

            <h3>VOXLATE AI</h3>

            <p>AI Assistant</p>
          </div>

          <div className="line"></div>
        </div>

        <div className="output-column">
          {outputs.map((item) => (
            <motion.div
              key={item.title}
              className="output-item"
              whileHover={{
                scale: 1.05,
              }}
            >
              {item.icon}

              <span>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integration;
