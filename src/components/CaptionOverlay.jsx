import { motion, AnimatePresence } from "framer-motion";

const CaptionOverlay = ({ transcript = [] }) => {
  const recent = transcript.slice(-4);

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-6">
      <AnimatePresence>
        {recent.map((line, index) => (
          <motion.div
            key={`${line.timestamp || Date.now()}-${index}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="mb-3 rounded-2xl border border-cyan-400/20 bg-black/55 px-5 py-3 backdrop-blur-xl"
          >
            <p className="text-lg">
              <span className="font-semibold text-cyan-400">
                {line.speaker}:
              </span>{" "}
              <span className="text-white">{line.original}</span>
            </p>

            {line.translated && (
              <p className="mt-1 text-sm italic text-gray-300">
                🌐 {line.translated}
              </p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CaptionOverlay;
