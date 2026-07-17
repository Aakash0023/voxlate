import { motion } from "framer-motion";
import { User, Mic, MicOff } from "lucide-react";
import "./VideoTile.css";

const VideoTile = ({
  name,
  speaking = false,
  muted = false,
  language = "English",
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      animate={
        speaking
          ? {
              boxShadow: [
                "0 0 0px rgba(34,211,238,.2)",
                "0 0 30px rgba(34,211,238,.5)",
                "0 0 0px rgba(34,211,238,.2)",
              ],
            }
          : {}
      }
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className={`video-tile ${speaking ? "speaking" : ""}`}
    >
      <div className="avatar-container">
        <div className="avatar">
          <User size={70} />
        </div>
      </div>

      <h3>{name}</h3>

      <p>{language}</p>

      <div className="tile-status">
        {muted ? (
          <>
            <MicOff size={16} />
            Muted
          </>
        ) : speaking ? (
          <>
            <Mic size={16} />
            Speaking...
          </>
        ) : (
          <>
            <Mic size={16} />
            Listening
          </>
        )}
      </div>

      {speaking && (
        <div className="voice-bars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </motion.div>
  );
};

export default VideoTile;
