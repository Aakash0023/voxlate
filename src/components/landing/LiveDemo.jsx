import { motion } from "framer-motion";
import { Mic, Languages, BrainCircuit, CheckCircle2 } from "lucide-react";

const LiveDemo = () => {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 font-semibold tracking-widest uppercase">
            Live Demo
          </span>

          <h2 className="text-5xl font-black mt-4">
            Experience Voxlate in Action
          </h2>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            Speak naturally. Hear every participant in your preferred language.
            Voxlate translates conversations in real time while detecting
            important meeting decisions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Mic className="text-violet-400" />
              <h3 className="text-xl font-semibold">Live Conversation</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 rounded-2xl p-5">
                <p className="text-sm text-gray-400 mb-2">🇬🇧 Rahul</p>

                <p className="text-lg">Let's launch the platform on Friday.</p>
              </div>

              <div className="flex justify-center text-4xl">↓</div>

              <div className="bg-violet-600 rounded-2xl p-5">
                <p className="text-sm mb-2 opacity-80">🇮🇳 தமிழ்</p>

                <p className="text-lg">
                  வெள்ளிக்கிழமை platform-ஐ launch செய்வோம்.
                </p>
              </div>

              <div className="bg-cyan-600 rounded-2xl p-5">
                <p className="text-sm mb-2 opacity-80">🇮🇳 हिन्दी</p>

                <p className="text-lg">शुक्रवार को प्लेटफ़ॉर्म लॉन्च करेंगे।</p>
              </div>

              <div className="bg-emerald-600 rounded-2xl p-5">
                <p className="text-sm mb-2 opacity-80">🇮🇳 తెలుగు</p>

                <p className="text-lg">
                  శుక్రవారం ప్లాట్‌ఫారమ్‌ను ప్రారంభిద్దాం.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px]">
              <div className="rounded-3xl bg-[#111827] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BrainCircuit className="text-violet-400" />
                  <h3 className="text-2xl font-bold">
                    AI Decision Intelligence
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Decision</span>
                    <span>Launch on Friday</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner</span>
                    <span>Rahul</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>

                    <span className="text-green-400 flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      Confirmed
                    </span>
                  </div>

                  <div className="pt-4">
                    <p className="mb-3 text-gray-400">Confidence</p>

                    <div className="h-3 rounded-full bg-gray-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "96%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                      />
                    </div>

                    <p className="mt-2 text-green-400">96%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex gap-4">
              <Languages className="text-cyan-400 mt-1" />

              <div>
                <h4 className="font-semibold text-lg">
                  Supports Multiple Indian Languages
                </h4>

                <p className="text-gray-400 mt-2">
                  English, Hindi, Tamil, Telugu and Kannada with real-time AI
                  translation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
