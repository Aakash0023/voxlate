import { motion } from "framer-motion";
import {
  Languages,
  BrainCircuit,
  ArrowDown,
  XCircle,
  CheckCircle2,
} from "lucide-react";

const Problem = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[180px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-violet-400 uppercase tracking-[4px] font-semibold">
            The Problem
          </span>

          <h2 className="text-6xl lg:text-7xl font-black leading-tight mt-6">
            Language
            <br />
            should never
            <br />
            be a barrier.
          </h2>

          <p className="text-gray-400 text-lg leading-9 mt-10 max-w-xl">
            Millions of online meetings happen every day. Even when people
            understand each other's language, they often leave with different
            interpretations, forgotten action items, and missed decisions.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex gap-4 items-center">
              <XCircle className="text-red-400" />
              <p className="text-gray-300">Language barriers</p>
            </div>

            <div className="flex gap-4 items-center">
              <XCircle className="text-red-400" />
              <p className="text-gray-300">Miscommunication</p>
            </div>

            <div className="flex gap-4 items-center">
              <XCircle className="text-red-400" />
              <p className="text-gray-300">Missed action items</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <div className="space-y-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Languages className="text-violet-400" />
                  <h3 className="text-xl font-semibold">Typical Meeting</h3>
                </div>

                <span className="text-red-400">Before Voxlate</span>
              </div>

              <div className="bg-slate-900 rounded-2xl p-5">
                🇬🇧
                <p className="mt-3">Let's finish the deployment by Friday.</p>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="text-gray-500" />
              </div>

              <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="text-red-400" />
                  Misunderstanding
                </div>

                <p className="text-gray-300">
                  Different participants interpret the decision differently.
                </p>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="text-gray-500" />
              </div>

              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <BrainCircuit className="text-green-400" />
                  Voxlate
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-green-400 mt-1" size={18} />
                    <p>Live Voice Translation</p>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="text-green-400 mt-1" size={18} />
                    <p>AI Decision Detection</p>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="text-green-400 mt-1" size={18} />
                    <p>Shared Understanding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
