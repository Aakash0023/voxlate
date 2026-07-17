import { Mic, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @param {{ speaker: string, original: string, translated: string }[]} messages
 * @param {string} targetLangLabel display name for the translation target, e.g. "Tamil"
 */
const TranscriptPanel = ({ messages = [], targetLangLabel = "Translation" }) => {
  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 p-6 h-[700px] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <Mic className="text-cyan-400" />
        <h2 className="text-xl font-semibold">Live Transcript</h2>
      </div>

      <div className="space-y-6 overflow-y-auto h-[600px] pr-2">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">
            Start speaking — your words will appear here as Voxlate
            transcribes and translates them live.
          </p>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
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

              {msg.translated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-2xl bg-violet-600 p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Languages size={18} />
                    {targetLangLabel} Translation
                  </div>

                  <p>{msg.translated}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TranscriptPanel;
