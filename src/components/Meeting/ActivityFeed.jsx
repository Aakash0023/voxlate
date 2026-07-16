import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Mic,
  Languages,
  Volume2,
  BrainCircuit,
  FileText,
  CheckCircle2,
} from "lucide-react";

const events = [
  {
    icon: <Mic size={18} />,
    title: "Rahul started speaking",
    color: "text-violet-400",
    time: "09:41:22",
  },
  {
    icon: <Languages size={18} />,
    title: "Tamil translation completed",
    color: "text-cyan-400",
    time: "09:41:23",
  },
  {
    icon: <Volume2 size={18} />,
    title: "Translated voice generated",
    color: "text-blue-400",
    time: "09:41:24",
  },
  {
    icon: <BrainCircuit size={18} />,
    title: "Decision detected",
    color: "text-green-400",
    time: "09:41:26",
  },
  {
    icon: <FileText size={18} />,
    title: "Meeting summary updated",
    color: "text-orange-400",
    time: "09:41:28",
  },
  {
    icon: <CheckCircle2 size={18} />,
    title: "Everyone confirmed the decision",
    color: "text-emerald-400",
    time: "09:41:30",
  },
];

const ActivityFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setFeed((prev) => {
        const updated = [...prev, events[i % events.length]];
        return updated.slice(-6);
      });

      i++;
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 h-[500px] overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">AI Activity Feed</h2>

          <p className="text-gray-400 text-sm">Live AI processing timeline</p>
        </div>

        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/10" />

        <AnimatePresence>
          {feed.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -50,
              }}
              transition={{
                duration: 0.45,
              }}
              className="relative flex gap-5 mb-8"
            >
              <div
                className={`w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center ${item.color}`}
              >
                {item.icon}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>

                <p className="text-sm text-gray-500 mt-1">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityFeed;
