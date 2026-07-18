import { useEffect, useMemo, useState } from "react";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import {
  Bot,
  Languages,
  FileText,
  ClipboardCheck,
  CheckCircle2,
  Users,
  Mic,
  Video,
  PhoneOff,
  MonitorUp,
  Timer,
  Circle,
} from "lucide-react";
import useDeepgram from "../hooks/useDeepgram";
import "@livekit/components-styles";
import "../styles/videoRoom.css";

function VideoGrid() {
  const tracks = useTracks(
    [
      {
        source: Track.Source.Camera,
        withPlaceholder: true,
      },
    ],
    {
      onlySubscribed: false,
    }
  );

  return (
    <GridLayout tracks={tracks} className="video-grid">
      <ParticipantTile />
    </GridLayout>
  );
}

function AudioCapture() {
  const { microphoneTrack } = useLocalParticipant();

  useEffect(() => {
    if (!microphoneTrack) return;

    console.log("Microphone Ready");

    return () => {};
  }, [microphoneTrack]);

  return null;
}

export default function VideoRoom() {
  const [token, setToken] = useState("");
  const [seconds, setSeconds] = useState(0);

  const ai = useDeepgram("English");

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const meetingTime = useMemo(() => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [seconds]);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("http://localhost:5000/api/livekit/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: "voxlate-room",
            participantName: `User-${Math.floor(Math.random() * 10000)}`,
          }),
        });

        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error(err);
      }
    }

    fetchToken();
  }, []);

  if (!token) {
    return (
      <div className="video-loading">
        <div className="loader"></div>
        <h2>Joining Meeting...</h2>
        <p>Connecting to LiveKit Cloud</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://voxlate-tb6ff5to.livekit.cloud"
      connect
      video
      audio
      className="video-room"
    >
      <RoomAudioRenderer />
      <AudioCapture />

      <div className="meeting-container">
        <header className="meeting-header">
          <div className="header-left">
            <div className="logo-box">
              <Bot size={22} />
            </div>

            <div>
              <h1>VOXLATE</h1>
              <p>AI Meeting Workspace</p>
            </div>
          </div>

          <div className="header-right">
            <div className="header-chip">
              <Users size={16} />
              <span>Meeting</span>
            </div>

            <div className="header-chip">
              <Languages size={16} />
              <span>English → Tamil</span>
            </div>

            <div className="header-chip">
              <Timer size={16} />
              <span>{meetingTime}</span>
            </div>

            <div className="recording">
              <Circle size={10} fill="currentColor" />
              Recording
            </div>
          </div>
        </header>

        <main className="meeting-content">
          <section className="meeting-video">
            <VideoGrid />
          </section>
          <aside className="ai-sidebar">
            <div className="sidebar-header">
              <div className="sidebar-title">
                <Bot size={20} />
                <div>
                  <h2>VOXLATE AI</h2>
                  <span>Real-time Meeting Intelligence</span>
                </div>
              </div>

              <div className="ai-status">
                <span className="status-dot"></span>
                Listening
              </div>
            </div>

            <div className="ai-card">
              <div className="card-title">
                <Languages size={18} />
                <span>Live Translation</span>
              </div>

              <div className="card-content">
                {ai.translation || "Waiting for translated speech..."}
              </div>
            </div>

            <div className="ai-card">
              <div className="card-title">
                <FileText size={18} />
                <span>Live Transcript</span>
              </div>

              <div className="transcript-box">
                {ai.transcript || "Start speaking to generate transcript..."}
              </div>
            </div>

            <div className="ai-card">
              <div className="card-title">
                <ClipboardCheck size={18} />
                <span>Meeting Summary</span>
              </div>

              <div className="card-content">
                {ai.summary ||
                  "Summary will appear here as the meeting progresses."}
              </div>
            </div>

            <div className="ai-card">
              <div className="card-title">
                <CheckCircle2 size={18} />
                <span>Decisions</span>
              </div>

              <div className="card-content">
                {ai.decision || "No decisions detected yet."}
              </div>
            </div>

            <div className="ai-card">
              <div className="card-title">
                <CheckCircle2 size={18} />
                <span>Action Items</span>
              </div>

              <div className="card-content">
                {ai.task || "No action items assigned."}
              </div>
            </div>
          </aside>
        </main>

        <footer className="meeting-controls">
          <button className="control-btn">
            <Mic size={20} />
          </button>

          <button className="control-btn">
            <Video size={20} />
          </button>

          <button className="control-btn">
            <MonitorUp size={20} />
          </button>

          <button className="control-btn">
            <Languages size={20} />
          </button>

          <button className="end-call">
            <PhoneOff size={20} />
          </button>
        </footer>
      </div>
    </LiveKitRoom>
  );
}
