import {
  Globe2,
  Users,
  BrainCircuit,
  Languages,
  PhoneOff,
  Sparkles,
} from "lucide-react";
import TranscriptPanel from "../components/meeting/TranscriptPanel";
import AICore from "../components/meeting/AICore";
import ActivityFeed from "../components/meeting/ActivityFeed";

const participants = [
  {
    id: 1,
    name: "Rahul",
    language: "English",
    status: "Speaking",
    color: "bg-green-500",
  },
  {
    id: 2,
    name: "Aakash",
    language: "Tamil",
    status: "Listening",
    color: "bg-gray-500",
  },
  {
    id: 3,
    name: "Priya",
    language: "Hindi",
    status: "Listening",
    color: "bg-gray-500",
  },
];

const MeetingRoom = () => {
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

              <p className="text-sm text-gray-400">Meeting ID • VX-48392</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </div>

            <button className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl flex items-center gap-2">
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
            <TranscriptPanel />
          </div>

          {/* AI */}

          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-violet-400" />

                <h2 className="text-xl font-semibold">AI Insights</h2>
              </div>

              <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-5">
                <Sparkles className="text-green-400 mb-4" />

                <h3 className="font-semibold mb-4">Decision Detected</h3>

                <p className="text-gray-300">
                  Deploy platform tomorrow morning.
                </p>

                <div className="mt-6">
                  <p className="text-gray-400 text-sm">Confidence</p>

                  <div className="mt-2 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-[96%] h-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  </div>

                  <p className="text-green-400 mt-2">96%</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <Languages className="text-cyan-400" />

                <h2 className="text-lg font-semibold">Translation</h2>
              </div>

              <p className="text-gray-400">English → Tamil → Hindi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
