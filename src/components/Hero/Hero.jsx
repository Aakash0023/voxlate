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
        <div className="integration-flow">
          <div className="platform-card">
            <img
              src="https://cdn.simpleicons.org/googlemeet"
              alt="Google Meet"
            />
            <span>Google Meet</span>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="voxlate-core">
            <div className="core-circle">VOXLATE</div>
          </div>

          <div className="flow-grid">
            <div className="flow-box">Transcript</div>
            <div className="flow-box">Translation</div>
            <div className="flow-box">Decisions</div>
            <div className="flow-box">Summary</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
