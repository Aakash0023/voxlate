import { motion } from "framer-motion";
import { Users, Mic, Languages, FileText, Sparkles } from "lucide-react";

const StatCard = ({ icon, value, label, color }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="rounded-2xl bg-[#111827] border border-white/10 p-5"
  >
    <div className={`mb-4 ${color}`}>{icon}</div>

    <h2 className="text-3xl font-bold">{value}</h2>

    <p className="text-gray-400 mt-2">{label}</p>
  </motion.div>
);

export default function MeetingStats({
  participants,
  transcript,
  decisions,
  targetLanguage,
}) {
  const speaking =
    transcript.length > 0
      ? transcript[transcript.length - 1]?.speaker || "-"
      : "-";

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">
      <StatCard
        icon={<Users />}
        value={participants}
        label="Participants"
        color="text-cyan-400"
      />

      <StatCard
        icon={<Mic />}
        value={speaking}
        label="Current Speaker"
        color="text-green-400"
      />

      <StatCard
        icon={<Languages />}
        value={targetLanguage}
        label="Translation"
        color="text-violet-400"
      />

      <StatCard
        icon={<FileText />}
        value={transcript.length}
        label="Transcript Lines"
        color="text-orange-400"
      />

      <StatCard
        icon={<Sparkles />}
        value={decisions.length}
        label="AI Decisions"
        color="text-pink-400"
      />
    </div>
  );
}
