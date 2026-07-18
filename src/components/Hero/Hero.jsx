import { motion } from "framer-motion";
import { ArrowRight, Play, BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          <BrainCircuit size={18} />
          AI Meeting Assistant
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your AI Layer
          <br />
          <span>For Every Meeting.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Works seamlessly with Google Meet, Zoom and Microsoft Teams to
          translate conversations, detect decisions, generate summaries and
          provide multilingual voice assistance in real time.
        </motion.p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Connect Meeting
            <ArrowRight size={18} />
          </button>

          <button className="secondary-btn">
            <Play size={18} />
            Watch Demo
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <h2>4+</h2>
            <p>Platforms</p>
          </div>

          <div>
            <h2>98%</h2>
            <p>Accuracy</p>
          </div>

          <div>
            <h2>6+</h2>
            <p>Languages</p>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="meeting-preview"
        >
          <div className="preview-header">
            <div className="live-dot" />

            <span>Meeting Live</span>

            <span className="time">00:24:31</span>
          </div>

          <div className="speaker-card">
            <div className="avatar">R</div>

            <div className="speaker-info">
              <h3>Rahul</h3>

              <p>Speaking...</p>

              <div className="voice-bars">
                {[1, 2, 3, 4, 5, 6].map((bar) => (
                  <motion.div
                    key={bar}
                    animate={{
                      height: [10, 26 + bar * 2, 14],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: bar * 0.08,
                    }}
                    className="bar"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="translation-card">
            <h4>🌍 Live Translation</h4>

            <p>Let's deploy on Friday.</p>

            <span>↓</span>

            <p className="translated">வெள்ளிக்கிழமை வெளியிடலாம்</p>
          </div>

          <div className="decision-card">
            <h4>🤖 AI Decision</h4>

            <p>Product launch approved</p>

            <div className="confidence">
              <div className="progress" />
            </div>
          </div>

          <div className="summary-card">
            <h4>📝 AI Summary</h4>

            <p>
              Voxlate generated a live summary while participants discussed
              release planning and assigned tasks.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
