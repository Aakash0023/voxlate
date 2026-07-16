import { motion } from "framer-motion";
import { ArrowRight, Play, Mic, Languages, BrainCircuit } from "lucide-react";

import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-badge"
        >
          <BrainCircuit size={18} />
          AI Meeting Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Speak Once.
          <br />
          <span>Everyone Understands.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Real-time AI translation, multilingual voice synthesis, live meeting
          summaries and decision intelligence designed for modern teams.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="primary-btn">
            Launch Demo
            <ArrowRight size={18} />
          </button>

          <button className="secondary-btn">
            <Play size={18} />
            Watch Demo
          </button>
        </motion.div>

        <div className="hero-stats">
          <div>
            <h2>5+</h2>
            <p>Languages</p>
          </div>

          <div>
            <h2>98%</h2>
            <p>Accuracy</p>
          </div>

          <div>
            <h2>&lt;1s</h2>
            <p>Latency</p>
          </div>
        </div>
      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="network">
          <div className="center-ai">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="ai-core"
            >
              AI
            </motion.div>
          </div>

          <div className="node english">
            🇬🇧
            <span>English</span>
          </div>

          <div className="node tamil">
            🇮🇳
            <span>Tamil</span>
          </div>

          <div className="node hindi">
            🇮🇳
            <span>Hindi</span>
          </div>

          <div className="node telugu">
            🇮🇳
            <span>Telugu</span>
          </div>

          <div className="node kannada">
            🇮🇳
            <span>Kannada</span>
          </div>

          <svg>
            <line x1="50%" y1="50%" x2="15%" y2="18%" />

            <line x1="50%" y1="50%" x2="85%" y2="18%" />

            <line x1="50%" y1="50%" x2="18%" y2="78%" />

            <line x1="50%" y1="50%" x2="82%" y2="78%" />
          </svg>
        </div>

        <div className="console">
          <div className="console-header">
            <span className="live"></span>
            AI Processing
          </div>

          <div className="console-item">
            <Mic size={18} />
            Listening...
          </div>

          <div className="console-item">
            <Languages size={18} />
            Translating...
          </div>

          <div className="console-item">
            <BrainCircuit size={18} />
            Detecting Decisions...
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
