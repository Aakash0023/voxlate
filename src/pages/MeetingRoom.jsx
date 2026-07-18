import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Globe2,
  BrainCircuit,
  Languages,
  PhoneOff,
  Sparkles,
  FileText,
  CheckCircle2,
  Mic,
  Monitor,
  Settings2,
  Clock3,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

import TranscriptPanel from "../components/Meeting/TranscriptPanel";
import AICore from "../components/Meeting/AICore";
import ActivityFeed from "../components/Meeting/ActivityFeed";
import AIPipeline from "../components/Meeting/AIPipeline";
import LanguageSelector from "../components/Meeting/LanguageSelector";
import VideoTile from "../components/Meeting/VideoTile";
import CaptionOverlay from "../components/CaptionOverlay";
import AINotification from "../components/Meeting/AINotification";
import MeetingStats from "../components/Meeting/MeetingStats";

import useSocket from "../hooks/useSocket";
import useMicrophone from "../hooks/useMicrophone";

import { LANGUAGES } from "../utils/constants";
import MeetingDashboard from "../components/MeetingDashboard/MeetingDashboard";

const participants = [
  {
    id: 1,
    name: "Rahul",
    language: "English",
    status: "Speaking",
  },
  {
    id: 2,
    name: "Aakash",
    language: "Tamil",
    status: "Listening",
  },
  {
    id: 3,
    name: "Priya",
    language: "Hindi",
    status: "Listening",
  },
  {
    id: 4,
    name: "Arjun",
    language: "English",
    status: "Muted",
  },
];

const MeetingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [targetLang, setTargetLang] = useState("ta");
  const [notification, setNotification] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const { connected, transcript, summary, decisions, actionItems } =
    useSocket(roomId);

  const { stop } = useMicrophone(roomId, {
    speaker: "You",
    targetLang,
  });

  const latestDecision = decisions[decisions.length - 1];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!latestDecision) return;

    setNotification({
      type: "decision",
      title: "AI Decision Detected",
      message: latestDecision.text,
    });

    const timeout = setTimeout(() => {
      setNotification(null);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [latestDecision]);

  const targetLangLabel =
    LANGUAGES.find((lang) => lang.code === targetLang)?.label || targetLang;

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  const handleEndMeeting = () => {
    stop();
    navigate(`/summary/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <AINotification notification={notification} />
      <MeetingDashboard />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
            >
              <Globe2 size={28} />
            </motion.div>

            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Vox<span className="text-cyan-400">late</span>
              </h1>

              <p className="text-gray-400 text-sm">
                AI Powered Meeting Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector value={targetLang} onChange={setTargetLang} />

            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2">
              <Clock3 size={18} className="text-cyan-400" />

              <span className="font-semibold">{formatTime()}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2">
              <Users size={18} className="text-violet-400" />

              <span>{participants.length}</span>
            </div>

            <div
              className={`px-5 py-2 rounded-full flex items-center gap-3 ${
                connected
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full animate-pulse ${
                  connected ? "bg-green-400" : "bg-yellow-400"
                }`}
              />

              {connected ? "LIVE" : "CONNECTING"}
            </div>

            <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
              <Monitor size={20} />
            </button>

            <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
              <Mic size={20} />
            </button>

            <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
              <Settings2 size={20} />
            </button>

            <button
              onClick={handleEndMeeting}
              className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition flex items-center gap-2"
            >
              <PhoneOff size={18} />
              End Meeting
            </button>
          </div>
        </div>
      </header>

      <CaptionOverlay transcript={transcript} />

      <div className="py-10 flex justify-center">
        <AICore />
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-8">
        <ActivityFeed />
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-8">
        <AIPipeline />
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-10">
        <MeetingStats
          participants={participants.length}
          transcript={transcript}
          decisions={decisions}
          targetLanguage={targetLangLabel}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-[#111827] p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Participants</h2>

                <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                  {participants.length} Online
                </div>
              </div>

              <div className="space-y-5">
                {participants.map((user) => (
                  <VideoTile
                    key={user.id}
                    name={user.name}
                    language={user.language}
                    speaking={user.status === "Speaking"}
                    muted={user.status === "Muted"}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <TranscriptPanel
              messages={transcript}
              targetLangLabel={targetLangLabel}
            />
          </div>

          <div className="space-y-6 lg:col-span-3">
            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-cyan-500/20 bg-[#111827] p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <BrainCircuit className="text-cyan-400" />
                <h2 className="text-xl font-semibold">AI Insights</h2>
              </div>

              {latestDecision ? (
                <>
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                    <Sparkles className="mb-4 text-cyan-400" />

                    <h3 className="font-semibold">Latest Decision</h3>

                    <p className="mt-3 leading-7 text-gray-300">
                      {latestDecision.text}
                    </p>

                    <div className="mt-6">
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-gray-400">Confidence</span>

                        <span className="text-cyan-400">
                          {Math.round((latestDecision.confidence || 0) * 100)}%
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-[#293142]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.round(
                              (latestDecision.confidence || 0) * 100
                            )}%`,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl bg-[#1f2937] p-5">
                  <p className="text-gray-500">
                    AI is analysing the conversation...
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-white/10 bg-[#111827] p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <FileText className="text-orange-400" />
                <h2 className="text-lg font-semibold">Live Summary</h2>
              </div>

              <p className="leading-7 text-gray-300">
                {summary ||
                  "Voxlate AI is generating a real-time summary as participants speak."}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-white/10 bg-[#111827] p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <CheckCircle2 className="text-green-400" />
                <h2 className="text-lg font-semibold">Action Items</h2>
              </div>

              {actionItems.length ? (
                <div className="space-y-4">
                  {actionItems.map((item, index) => (
                    <motion.div
                      key={item.id || index}
                      whileHover={{ x: 4 }}
                      className="rounded-2xl bg-[#1f2937] p-4"
                    >
                      <p className="font-medium">{item.description}</p>

                      <p className="mt-2 text-sm text-gray-400">
                        👤 {item.owner || "Unassigned"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No action items detected yet.</p>
              )}
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-white/10 bg-[#111827] p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <Languages className="text-violet-400" />
                <h2 className="text-lg font-semibold">Translation</h2>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl bg-[#1f2937] p-4">
                  <p className="text-sm text-gray-400">Source</p>

                  <p className="mt-1 font-semibold">English</p>
                </div>

                <div className="flex justify-center text-2xl text-cyan-400">
                  ↓
                </div>

                <div className="rounded-xl bg-cyan-500/10 p-4">
                  <p className="text-sm text-gray-400">Target</p>

                  <p className="mt-1 font-semibold text-cyan-400">
                    {targetLangLabel}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-6"
            >
              <h2 className="text-xl font-bold">Meeting Analytics</h2>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transcript</span>

                  <span>{transcript.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Decisions</span>

                  <span>{decisions.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Tasks</span>

                  <span>{actionItems.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>

                  <span>{formatTime()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
