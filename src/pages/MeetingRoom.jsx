import { useState } from "react";
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
} from "lucide-react";

import TranscriptPanel from "../components/Meeting/TranscriptPanel";
import AICore from "../components/Meeting/AICore";
import ActivityFeed from "../components/Meeting/ActivityFeed";
import AIPipeline from "../components/Meeting/AIPipeline";
import LanguageSelector from "../components/Meeting/LanguageSelector";
import VideoTile from "../components/Meeting/VideoTile";
import CaptionOverlay from "../components/CaptionOverlay";

import useSocket from "../hooks/useSocket";
import useMicrophone from "../hooks/useMicrophone";

import { LANGUAGES } from "../utils/constants";

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

  const { connected, transcript, summary, decisions, actionItems } =
    useSocket(roomId);

  const { isRecording, stop } = useMicrophone(roomId, {
    speaker: "You",
    targetLang,
  });

  const latestDecision = decisions[decisions.length - 1];

  const targetLangLabel =
    LANGUAGES.find((lang) => lang.code === targetLang)?.label || targetLang;

  const handleEndMeeting = () => {
    stop();
    navigate(`/summary/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Globe2 size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Vox
                <span className="text-cyan-400">late</span>
              </h1>

              <p className="text-gray-400 text-sm">AI Meeting Workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector value={targetLang} onChange={setTargetLang} />

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

            <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
              <Monitor size={20} />
            </button>

            <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
              <Mic size={20} />
            </button>

            <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
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

      <div className="max-w-7xl mx-auto px-8 mb-10">
        <AIPipeline />
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Participants</h2>

                <span className="text-sm text-gray-400">
                  {participants.length}
                </span>
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

          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-cyan-400" />

                <h2 className="text-xl font-semibold">AI Insights</h2>
              </div>

              {latestDecision ? (
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                  <Sparkles className="text-cyan-400 mb-4" />

                  <h3 className="font-semibold mb-3">Decision Detected</h3>

                  <p className="text-gray-300">{latestDecision.text}</p>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Confidence</span>

                      <span className="text-cyan-400">
                        {Math.round((latestDecision.confidence || 0) * 100)}%
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{
                          width: `${Math.round(
                            (latestDecision.confidence || 0) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#1f2937] p-5">
                  <p className="text-gray-500">
                    AI is listening...
                    <br />
                    Decisions will appear automatically.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="text-orange-400" />

                <h2 className="text-lg font-semibold">Live Summary</h2>
              </div>

              <p className="text-gray-400 leading-7">
                {summary ||
                  "The AI will generate a live meeting summary here as participants speak."}
              </p>
            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="text-green-400" />

                <h2 className="text-lg font-semibold">Action Items</h2>
              </div>

              {actionItems.length ? (
                <div className="space-y-3">
                  {actionItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="rounded-xl bg-[#1f2937] p-4"
                    >
                      <p className="text-gray-200">{item.description}</p>

                      <p className="mt-2 text-sm text-gray-500">
                        Owner: {item.owner || "Unassigned"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No action items yet.</p>
              )}
            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <Languages className="text-violet-400" />

                <h2 className="text-lg font-semibold">Translation</h2>
              </div>

              <div className="space-y-2 text-gray-300">
                <p>English</p>

                <p className="text-cyan-400 text-xl">↓</p>

                <p>{targetLangLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
