import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Mic,
  AudioLines,
  Languages,
  Volume2,
  BrainCircuit,
  FileText,
} from "lucide-react";

const stages = [
  {
    icon: Mic,
    title: "Voice Input",
    subtitle: "Capturing Speaker",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: AudioLines,
    title: "Speech-to-Text",
    subtitle: "Converting Audio",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Languages,
    title: "Translation",
    subtitle: "Generating Languages",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Volume2,
    title: "Voice Synthesis",
    subtitle: "Creating Natural Audio",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: BrainCircuit,
    title: "Decision AI",
    subtitle: "Finding Key Decisions",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: FileText,
    title: "Meeting Summary",
    subtitle: "Updating Notes",
    color: "from-pink-500 to-violet-500",
  },
];

const AIPipeline = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % stages.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">
      <div className="mb-10">
        <h2 className="text-2xl font-bold">AI Processing Pipeline</h2>

        <p className="text-gray-400 mt-2">
          Watch how Voxlate processes conversations in real time.
        </p>
      </div>

      <div className="grid md:grid-cols-6 gap-5">
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.title}
              animate={{
                scale: active === index ? 1.08 : 1,
                opacity: active === index ? 1 : 0.45,
              }}
              transition={{
                duration: 0.35,
              }}
              className="relative"
            >
              <div
                className={`rounded-3xl p-[1px] bg-gradient-to-r ${stage.color}`}
              >
                <div className="rounded-3xl bg-[#1F2937] p-5 h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stage.color}
                    flex items-center justify-center mb-5`}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="font-semibold">{stage.title}</h3>

                  <p className="text-sm text-gray-400 mt-2">{stage.subtitle}</p>
                </div>
              </div>

              {index !== stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-violet-500" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AIPipeline;
