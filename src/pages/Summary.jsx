import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

import {
  FileText,
  CheckCircle2,
  Sparkles,
  Mic,
  Users,
  Clock,
  Download,
  BrainCircuit,
} from "lucide-react";

import api from "../services/api.js";

function Summary() {
  const { roomId } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data: result } = await api.get(`/meeting/${roomId}/summary`);

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      }
    }

    load();

    const interval = setInterval(load, 4000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [roomId]);

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(24);
    pdf.text("VOXLATE AI", 20, 20);

    pdf.setFontSize(16);
    pdf.text("Meeting Report", 20, 32);

    let y = 50;

    pdf.setFontSize(18);
    pdf.text("Summary", 20, y);

    y += 10;

    pdf.setFontSize(12);

    pdf.text(data?.summary || "No summary available.", 20, y, {
      maxWidth: 170,
    });

    y += 40;

    pdf.setFontSize(18);
    pdf.text("Decisions", 20, y);

    y += 10;

    if (data?.decisions?.length) {
      data.decisions.forEach((decision) => {
        pdf.text(`• ${decision.text}`, 20, y);
        y += 8;
      });
    }

    y += 10;

    pdf.setFontSize(18);
    pdf.text("Action Items", 20, y);

    y += 10;

    if (data?.actionItems?.length) {
      data.actionItems.forEach((item) => {
        pdf.text(
          `• ${item.description} (${item.owner || "Unassigned"})`,
          20,
          y
        );

        y += 8;
      });
    }

    pdf.save("Voxlate-Meeting-Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#09111f] to-[#050816] text-white px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400">Meeting ID • {roomId}</p>

          <h1 className="text-5xl font-black mt-2">Meeting Report</h1>

          <p className="text-gray-400 mt-4">
            AI generated report powered by Voxlate
          </p>
        </motion.div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            Couldn't reach the backend.
            <br />
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-5">
            <BrainCircuit size={36} className="text-cyan-400" />

            <div>
              <h2 className="text-2xl font-bold">AI Analysis Completed</h2>

              <p className="text-gray-400 mt-1">
                Voxlate has analyzed the meeting and extracted insights.
              </p>
            </div>
          </div>

          <button
            onClick={downloadPDF}
            className="bg-cyan-500 hover:bg-cyan-400 transition-all px-6 py-3 rounded-xl flex items-center gap-3 font-semibold"
          >
            <Download size={18} />
            Download PDF
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        >
          <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
            <Users className="text-blue-400 mb-4" />

            <h2 className="text-4xl font-bold">
              {data?.participants?.length || 1}
            </h2>

            <p className="text-gray-400 mt-2">Participants</p>
          </div>

          <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
            <Clock className="text-orange-400 mb-4" />

            <h2 className="text-4xl font-bold">{data?.duration || "15m"}</h2>

            <p className="text-gray-400 mt-2">Duration</p>
          </div>

          <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
            <Sparkles className="text-green-400 mb-4" />

            <h2 className="text-4xl font-bold">
              {data?.decisions?.length || 0}
            </h2>

            <p className="text-gray-400 mt-2">Decisions</p>
          </div>

          <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
            <CheckCircle2 className="text-violet-400 mb-4" />

            <h2 className="text-4xl font-bold">
              {data?.actionItems?.length || 0}
            </h2>

            <p className="text-gray-400 mt-2">Tasks</p>
          </div>
        </motion.div>

        <div className="mt-10 space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-cyan-400" />
              <h2 className="text-2xl font-bold">AI Meeting Summary</h2>
            </div>

            <p className="text-gray-300 leading-8 text-lg">
              {data?.summary ||
                "The AI summary will appear here once analysis has completed."}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-green-400" />
              <h2 className="text-2xl font-bold">Key Decisions</h2>
            </div>

            {data?.decisions?.length ? (
              <div className="space-y-4">
                {data.decisions.map((decision, index) => (
                  <motion.div
                    key={decision.id || index}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-[#1F2937] border border-green-500/20 p-5"
                  >
                    <p className="text-lg text-white">{decision.text}</p>

                    <div className="mt-3 h-2 bg-[#2a3444] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-400 rounded-full"
                        style={{
                          width: `${Math.round(
                            (decision.confidence || 0) * 100
                          )}%`,
                        }}
                      />
                    </div>

                    <p className="text-sm text-gray-400 mt-2">
                      Confidence {Math.round((decision.confidence || 0) * 100)}%
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No decisions detected yet.</p>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-violet-400" />
              <h2 className="text-2xl font-bold">Action Items</h2>
            </div>

            {data?.actionItems?.length ? (
              <div className="space-y-4">
                {data.actionItems.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    whileHover={{ x: 5 }}
                    className="rounded-2xl bg-[#1F2937] border border-violet-500/20 p-5"
                  >
                    <h3 className="font-semibold text-lg">
                      {item.description}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      👤 {item.owner || "Unassigned"}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No action items found.</p>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Mic className="text-cyan-400" />
              <h2 className="text-2xl font-bold">Meeting Timeline</h2>
            </div>

            {data?.transcript?.length ? (
              <div className="space-y-6">
                {data.transcript.map((line, index) => (
                  <motion.div
                    key={line.id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-2 top-2 w-3 h-3 rounded-full bg-cyan-400" />

                    <div className="rounded-2xl bg-[#1F2937] p-5 border border-white/5">
                      <h3 className="font-semibold text-cyan-400 mb-2">
                        {line.speaker}
                      </h3>

                      <p className="text-gray-200 leading-7">{line.original}</p>

                      {line.translated && (
                        <p className="mt-3 text-sm italic text-gray-500">
                          🌐 {line.translated}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No transcript available.</p>
            )}
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center pt-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all px-8 py-4 font-semibold text-black"
            >
              Start New Meeting
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
