import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, CheckCircle2, ClipboardList, Mic } from "lucide-react";

const icons = {
  decision: <Sparkles size={22} />,
  task: <ClipboardList size={22} />,
  speaker: <Mic size={22} />,
  success: <CheckCircle2 size={22} />,
};

const colors = {
  decision: "border-cyan-500 bg-cyan-500/10",
  task: "border-violet-500 bg-violet-500/10",
  speaker: "border-green-500 bg-green-500/10",
  success: "border-orange-500 bg-orange-500/10",
};

const AINotification = ({ notification }) => {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{
            x: 350,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: 350,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className={`fixed top-6 right-6 z-50 w-96 rounded-2xl border p-5 backdrop-blur-xl shadow-2xl ${
            colors[notification.type]
          }`}
        >
          <div className="flex gap-4">
            <div className="mt-1">{icons[notification.type]}</div>

            <div>
              <h3 className="font-bold text-lg">{notification.title}</h3>

              <p className="text-gray-300 mt-2">{notification.message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AINotification;
