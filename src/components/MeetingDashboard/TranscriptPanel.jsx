import { motion } from "framer-motion";
import { Mic, Languages, Volume2, CheckCircle2 } from "lucide-react";

const transcript = [
  {
    speaker: "Rahul",
    avatar: "R",
    original:
      "Good morning everyone. Today we need to finalize the sprint timeline.",
    translated:
      "காலை வணக்கம் அனைவருக்கும். இன்று sprint timeline-ஐ இறுதி செய்ய வேண்டும்.",
  },
  {
    speaker: "Aakash",
    avatar: "A",
    original:
      "The AI translation pipeline is already integrated with Deepgram.",
    translated:
      "AI translation pipeline ஏற்கனவே Deepgram உடன் இணைக்கப்பட்டுள்ளது.",
  },
  {
    speaker: "Priya",
    avatar: "P",
    original: "Let's finish testing before tomorrow's client demo.",
    translated: "நாளைய client demoக்கு முன் testing முடிப்போம்.",
  },
];

const TranscriptPanel = () => {
  return (
    <motion.div
      className="transcript-panel"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="panel-header">
        <div className="panel-title">
          <Mic size={20} />
          <h2>Live Transcript</h2>
        </div>

        <div className="live-chip">
          <span className="pulse"></span>
          Recording
        </div>
      </div>

      <div className="transcript-list">
        {transcript.map((item, index) => (
          <motion.div
            className="transcript-card"
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="speaker-row">
              <div className="speaker-avatar">{item.avatar}</div>

              <div>
                <h4>{item.speaker}</h4>

                <span>Speaking...</span>
              </div>

              <CheckCircle2
                size={18}
                color="#22c55e"
                style={{ marginLeft: "auto" }}
              />
            </div>

            <div className="speech-box">
              <Volume2 size={16} />
              <p>{item.original}</p>
            </div>

            <div className="translation-box">
              <Languages size={16} />

              <div>
                <small>Tamil Translation</small>

                <p>{item.translated}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TranscriptPanel;
