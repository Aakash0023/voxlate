import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BrainCircuit,
  Mic,
  Languages,
  CheckCircle2,
  FileText,
} from "lucide-react";

const states = [
  {
    title: "Listening...",
    subtitle: "Capturing participant speech",
    color: "from-violet-600 to-fuchsia-500",
    glow: "bg-violet-500",
    icon: <Mic size={42} />,
  },
  {
    title: "Translating...",
    subtitle: "Generating live translations",
    color: "from-cyan-500 to-blue-600",
    glow: "bg-cyan-500",
    icon: <Languages size={42} />,
  },
  {
    title: "Analyzing...",
    subtitle: "Detecting important decisions",
    color: "from-emerald-500 to-green-600",
    glow: "bg-green-500",
    icon: <BrainCircuit size={42} />,
  },
  {
    title: "Summarizing...",
    subtitle: "Preparing meeting notes",
    color: "from-orange-500 to-amber-500",
    glow: "bg-orange-500",
    icon: <FileText size={42} />,
  },
  {
    title: "Decision Found",
    subtitle: "Everyone has the same understanding",
    color: "from-pink-500 to-violet-600",
    glow: "bg-pink-500",
    icon: <CheckCircle2 size={42} />,
  },
];

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
    <div className="relative flex flex-col items-center py-12">
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className={`absolute w-72 h-72 rounded-full blur-3xl ${current.glow}`}
      />

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
        className="absolute w-52 h-52 border border-white/10 rounded-full"
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
        className="absolute w-64 h-64 border border-white/5 rounded-full"
      />

      <motion.div
        key={index}
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className={`relative w-36 h-36 rounded-full bg-gradient-to-r ${current.color}
        flex items-center justify-center shadow-2xl`}
      >
        {current.icon}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.35,
          }}
          className="mt-10 text-center"
        >
          <p className="uppercase tracking-[6px] text-gray-400 text-xs mb-3">
            AI CORE
          </p>

          <h2 className="text-4xl font-black">{current.title}</h2>

          <p className="text-gray-400 mt-3 text-lg">{current.subtitle}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AICore;
