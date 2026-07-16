import { motion } from "framer-motion";
import {
  Mic,
  FileAudio,
  Languages,
  BrainCircuit,
  FileText,
  Volume2,
} from "lucide-react";

import "./Pipeline.css";

const steps = [
  {
    icon: <Mic size={34} />,
    title: "Speak",
    desc: "Users speak naturally in their preferred language.",
  },
  {
    icon: <FileAudio size={34} />,
    title: "Speech to Text",
    desc: "Deepgram converts speech into accurate text instantly.",
  },
  {
    icon: <Languages size={34} />,
    title: "Translation",
    desc: "Gemini translates into multiple Indian languages.",
  },
  {
    icon: <BrainCircuit size={34} />,
    title: "Decision AI",
    desc: "Important decisions and action items are detected automatically.",
  },
  {
    icon: <FileText size={34} />,
    title: "Summary",
    desc: "Generate an AI-powered meeting summary in seconds.",
  },
  {
    icon: <Volume2 size={34} />,
    title: "Voice Output",
    desc: "Deepgram Aura speaks the translated response naturally.",
  },
];

const Pipeline = () => {
  return (
    <section className="pipeline-section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pipeline-header"
      >
        <span>HOW IT WORKS</span>

        <h2>
          AI Workflow That
          <span> Understands Every Conversation</span>
        </h2>

        <p>
          Voxlate captures conversations, translates them in real time, extracts
          decisions, generates summaries and speaks back in your preferred
          language.
        </p>
      </motion.div>

      <div className="pipeline-grid">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="pipeline-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
            viewport={{ once: true }}
          >
            <div className="pipeline-icon">{step.icon}</div>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>

            {index !== steps.length - 1 && (
              <div className="pipeline-arrow">↓</div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pipeline;
