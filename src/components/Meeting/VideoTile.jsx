import { motion } from "framer-motion";
import { Mic, MicOff, User } from "lucide-react";

export default function VideoTile({ name, language, speaking, muted }) {
  return (
    <motion.div
      animate={
        speaking
          ? {
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 0 0px rgba(34,211,238,0)",
                "0 0 35px rgba(34,211,238,.45)",
                "0 0 0px rgba(34,211,238,0)",
              ],
            }
          : {}
      }
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className={`relative overflow-hidden rounded-3xl border p-5 transition-all ${
        speaking
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-white/10 bg-[#1a2332]"
      }`}
    >
      {speaking && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10"
        />
      )}

      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              speaking ? "bg-cyan-500" : "bg-[#2d3748]"
            }`}
          >
            <User />
          </div>

          {speaking && (
            <motion.div
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="absolute inset-0 rounded-full border-2 border-cyan-400"
            />
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">{name}</h3>

            {muted ? (
              <MicOff className="text-red-400" size={18} />
            ) : (
              <Mic
                className={speaking ? "text-cyan-400" : "text-gray-500"}
                size={18}
              />
            )}
          </div>

          <p className="text-sm text-gray-400 mt-1">{language}</p>

          {speaking ? (
            <div className="flex items-end gap-1 mt-4 h-6">
              {[8, 16, 12, 20, 14, 10, 18].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [h, h + 8, h - 4, h],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.08,
                  }}
                  className="w-1 rounded-full bg-cyan-400"
                />
              ))}
            </div>
          ) : (
            <p className="text-xs mt-4 text-gray-500">Listening...</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
