import { useEffect, useRef } from "react";
import { Mic, Languages, User, Clock3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TranscriptPanel = ({
  messages = [],
  targetLangLabel = "Translation",
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 overflow-hidden h-[760px] flex flex-col">
      <div className="px-7 py-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Mic className="text-cyan-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Live Transcript</h2>

            <p className="text-sm text-gray-400">
              Real-time AI transcription & translation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

          <span className="text-green-400 text-sm">LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-7 py-6 space-y-8">
        {!messages.length && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <Mic size={60} className="text-cyan-500 mb-6" />

            <h3 className="text-2xl font-bold mb-3">
              Waiting for conversation...
            </h3>

            <p className="text-gray-500 max-w-md">
              Start speaking and Voxlate AI will transcribe, translate and
              understand your meeting in real time.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id || index}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <div className="rounded-3xl bg-[#1F2937] border border-white/5 p-6">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                      <User size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{msg.speaker}</h3>

                      <div className="flex items-center gap-2 text-sm text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Speaking
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock3 size={14} />

                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <p className="text-lg leading-8 text-gray-100">
                  {msg.original}
                </p>

                {msg.translated && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600/30 to-cyan-500/20 border border-cyan-500/20 p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Languages size={18} className="text-cyan-400" />

                      <span className="font-medium text-cyan-300">
                        {targetLangLabel}
                      </span>
                    </div>

                    <p className="leading-8 text-gray-100">{msg.translated}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TranscriptPanel;
