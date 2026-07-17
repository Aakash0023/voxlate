import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Globe2,
  Users,
  BrainCircuit,
  Languages,
  PhoneOff,
  Sparkles,
  FileText,
  CheckCircle2,
} from "lucide-react";
import TranscriptPanel from "../components/Meeting/TranscriptPanel";
import AICore from "../components/Meeting/AICore";
import ActivityFeed from "../components/Meeting/ActivityFeed";
import AIPipeline from "../components/Meeting/AIPipeline";
import LanguageSelector from "../components/Meeting/LanguageSelector";
import useSocket from "../hooks/useSocket";
import useMicrophone from "../hooks/useMicrophone";
import { LANGUAGES } from "../utils/constants";

const participants = [
  { id: 1, name: "Rahul", language: "English", status: "Speaking", color: "bg-green-500" },
  { id: 2, name: "Aakash", language: "Tamil", status: "Listening", color: "bg-gray-500" },
  { id: 3, name: "Priya", language: "Hindi", status: "Listening", color: "bg-gray-500" },
];

const MeetingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [targetLang, setTargetLang] = useState("ta");

  const { connected, transcript, summary, decisions, actionItems } =
    useSocket(roomId);
  const { isRecording } = useMicrophone(roomId, { speaker: "You", targetLang });

  const latestDecision = decisions[decisions.length - 1];
  const targetLangLabel =
    LANGUAGES.find((l) => l.code === targetLang)?.label || targetLang;

  const handleEndMeeting = () => navigate(`/summary/${roomId}`);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center">
              <Globe2 />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Vox<span className="text-violet-400">late</span>
              </h1>

              <p className="text-sm text-gray-400">Meeting ID • {roomId}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector value={targetLang} onChange={setTargetLang} />

            <div
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                connected && isRecording
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  connected && isRecording ? "bg-green-400" : "bg-yellow-400"
                }`}
              />
              {connected && isRecording ? "LIVE" : "CONNECTING"}
            </div>

            <button
              onClick={handleEndMeeting}
              className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <PhoneOff size={18} />
              End
            </button>
          </div>
        </div>
      </header>
      <div className="py-12 flex justify-center">
        <AICore />
      </div>
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <ActivityFeed />
      </div>
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <AIPipeline />
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Participants */}

          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-violet-400" />
                <h2 className="text-xl font-semibold">Participants</h2>
              </div>

              <div className="space-y-4">
                {participants.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-2xl bg-[#1F2937] p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>

                      <p className="text-sm text-gray-400">{user.language}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${user.color}`} />

                      <span className="text-xs text-gray-300">
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transcript */}

          <div className="lg:col-span-6">
            <TranscriptPanel messages={transcript} targetLangLabel={targetLangLabel} />
          </div>

          {/* AI */}

          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-violet-400" />

                <h2 className="text-xl font-semibold">AI Insights</h2>
              </div>

              {latestDecision ? (
                <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-5">
                  <Sparkles className="text-green-400 mb-4" />

                  <h3 className="font-semibold mb-4">Decision Detected</h3>

                  <p className="text-gray-300">{latestDecision.text}</p>

                  <div className="mt-6">
                    <p className="text-gray-400 text-sm">Confidence</p>

                    <div className="mt-2 h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{
                          width: `${Math.round(
                            (latestDecision.confidence || 0) * 100
                          )}%`,
                        }}
                      />
                    </div>

                    <p className="text-green-400 mt-2">
                      {Math.round((latestDecision.confidence || 0) * 100)}%
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No decisions detected yet — keep talking.
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="text-orange-400" />
                <h2 className="text-lg font-semibold">Meeting Summary</h2>
              </div>

              <p className="text-gray-400 text-sm">
                {summary || "Summary will appear here as the meeting progresses."}
              </p>
            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="text-emerald-400" />
                <h2 className="text-lg font-semibold">Action Items</h2>
              </div>

              {actionItems.length ? (
                <ul className="space-y-3">
                  {actionItems.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-xl bg-[#1F2937] p-3 text-sm"
                    >
                      <p className="text-gray-200">{item.description}</p>
                      <p className="text-gray-500 mt-1">
                        Owner: {item.owner || "Unassigned"}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No action items detected yet.
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <Languages className="text-cyan-400" />
                <h2 className="text-lg font-semibold">Translation</h2>
              </div>

              <p className="text-gray-400">English → {targetLangLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
