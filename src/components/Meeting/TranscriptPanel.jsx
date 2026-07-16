import { useEffect, useState } from "react";
import { Mic, Languages, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const transcript = [
  {
    speaker: "Rahul",
    original: "Let's deploy the platform tomorrow morning.",
    translated: "நாளை காலை platform-ஐ deploy செய்வோம்.",
    decision: "Deployment scheduled for tomorrow.",
  },
  {
    speaker: "Priya",
    original: "I'll finish the frontend tonight.",
    translated: "இன்று இரவே frontend-ஐ முடித்துவிடுகிறேன்.",
    decision: "Frontend deadline confirmed.",
  },
  {
    speaker: "Aakash",
    original: "Let's review everything before deployment.",
    translated: "Deploy செய்வதற்கு முன் அனைத்தையும் review செய்வோம்.",
    decision: "Final review required.",
  },
];

const TranscriptPanel = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      if (index >= transcript.length) {
        clearInterval(timer);
        return;
      }

      setMessages((prev) => [...prev, transcript[index]]);
      index++;
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 p-6 h-[700px] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <Mic className="text-cyan-400" />
        <h2 className="text-xl font-semibold">Live Transcript</h2>
      </div>

      <div className="space-y-6 overflow-y-auto h-[600px] pr-2">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="rounded-2xl bg-[#1F2937] p-5">
                <div className="flex justify-between mb-3">
                  <p className="font-semibold text-violet-400">{msg.speaker}</p>

                  <div className="flex items-center gap-2 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Speaking
                  </div>
                </div>

                <p className="text-lg">{msg.original}</p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl bg-violet-600 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Languages size={18} />
                  Tamil Translation
                </div>

                <p>{msg.translated}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl bg-green-500/10 border border-green-500/30 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BrainCircuit className="text-green-400" />
                  AI Decision
                </div>

                <p>{msg.decision}</p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TranscriptPanel;
