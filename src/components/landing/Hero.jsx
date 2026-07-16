import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute w-96 h-96 bg-violet-700/30 blur-[140px] rounded-full top-24 left-16" />

      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 blur-[150px] rounded-full bottom-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-7">
            <Sparkles size={16} />
            AI Meeting Intelligence
          </div>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">
            Break
            <span className="block text-violet-400">Language.</span>
            Keep
            <span className="block text-cyan-400">Meaning.</span>
          </h1>

          <p className="mt-8 text-xl text-gray-400 leading-9 max-w-xl">
            Voxlate translates conversations into your preferred language in
            real time while detecting decisions, action items and ensuring
            everyone leaves the meeting with the same understanding.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 flex items-center gap-3 font-semibold">
              Start Meeting
              <ArrowRight size={20} />
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="space-y-7">
              <div>
                <p className="text-gray-400 mb-2">🇬🇧 Rahul</p>

                <div className="bg-slate-800 rounded-xl p-4">
                  Let's deploy the platform tomorrow morning.
                </div>
              </div>

              <div>
                <p className="text-gray-400 mb-2">🇮🇳 Tamil Translation</p>

                <div className="bg-violet-600 rounded-xl p-4">
                  நாளை காலை platform-ஐ deploy செய்வோம்.
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h3 className="text-green-400 font-semibold mb-3">
                  AI Decision Detected
                </h3>

                <ul className="space-y-2 text-gray-300">
                  <li>✅ Deployment scheduled</li>

                  <li>👤 Owner : Rahul</li>

                  <li>📅 Tomorrow Morning</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
