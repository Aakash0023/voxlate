import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BrainCircuit,
  Mic,
  Languages,
  CheckCircle2,
  FileText,
  Sparkles,
} from "lucide-react";

const states = [
  {
    title: "Listening...",
    subtitle: "Capturing participant speech",
    color: "from-violet-600 via-fuchsia-500 to-cyan-500",
    glow: "bg-violet-500",
    icon: <Mic size={44} />,
  },
  {
    title: "Translating...",
    subtitle: "Generating live translations",
    color: "from-cyan-500 via-sky-500 to-blue-600",
    glow: "bg-cyan-500",
    icon: <Languages size={44} />,
  },
  {
    title: "Analyzing...",
    subtitle: "Detecting important decisions",
    color: "from-emerald-500 via-green-500 to-lime-500",
    glow: "bg-green-500",
    icon: <BrainCircuit size={44} />,
  },
  {
    title: "Summarizing...",
    subtitle: "Preparing meeting notes",
    color: "from-orange-500 via-amber-500 to-yellow-500",
    glow: "bg-orange-500",
    icon: <FileText size={44} />,
  },
  {
    title: "Decision Found",
    subtitle: "Everyone has the same understanding",
    color: "from-pink-500 via-violet-500 to-indigo-500",
    glow: "bg-pink-500",
    icon: <CheckCircle2 size={44} />,
  },
];

const features = [
  "Speech Recognition",
  "Translation",
  "Decision Detection",
  "Meeting Summary",
];

const bars = [1, 2, 3, 4, 5, 6, 7];

const AICore = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % states.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const current = states[index];

  return (
    <div className="relative flex flex-col items-center py-16">
      <motion.div
        animate={{
          scale: [1, 1.45, 1],
          opacity: [0.55, 0, 0.55],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className={`absolute w-80 h-80 rounded-full blur-3xl ${current.glow}`}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: "linear",
        }}
        className="absolute w-72 h-72 rounded-full border border-cyan-500/20"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute w-60 h-60 rounded-full border border-violet-500/20"
      />

      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${current.color}
        flex items-center justify-center shadow-[0_0_60px_rgba(0,255,255,.25)]`}
      >
        {current.icon}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.35,
          }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-xs uppercase tracking-[4px] text-gray-300">
              Voxlate AI Core
            </span>
          </div>

          <h2 className="text-5xl font-black">{current.title}</h2>

          <p className="text-gray-400 text-lg mt-4">{current.subtitle}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-end gap-2 h-14 mt-8">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            animate={{
              height: [12, 40 + bar * 2, 18, 48 - bar, 16],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              delay: bar * 0.08,
            }}
            className="w-2 rounded-full bg-gradient-to-t from-cyan-400 to-violet-500"
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-10 max-w-xl">
        {features.map((feature) => (
          <motion.div
            key={feature}
            whileHover={{
              scale: 1.05,
            }}
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg flex items-center gap-3"
          >
            <CheckCircle2 size={18} className="text-green-400" />

            <span className="text-sm text-gray-200">{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AICore;
