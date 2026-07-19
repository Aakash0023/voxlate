import { useEffect, useMemo, useState } from "react";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  useLocalParticipant,
  useRoomContext,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { jsPDF } from "jspdf";

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
  Share2,
  Download,
  Copy,
} from "lucide-react";

import useDeepgram from "../hooks/useDeepgram";

import "@livekit/components-styles";
import "../styles/videoRoom.css";
import MeetingControls from "./MeetingControls";

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

export default function VideoRoom({ meetingId }) {
  const [token, setToken] = useState("");
  const [seconds, setSeconds] = useState(0);

  const [targetLanguage, setTargetLanguage] = useState("Tamil");

  const ai = useDeepgram(targetLanguage);

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

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

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Meeting link copied!");
    } catch (err) {
      console.error(err);
    }
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(ai.summary || "");
      alert("Summary copied!");
    } catch (err) {
      console.error(err);
    }
  };

  const downloadSummary = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFillColor(24, 24, 40);
    doc.rect(0, 0, pageWidth, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("VOXLATE", 20, 20);

    doc.setFontSize(11);
    doc.text("AI Meeting Intelligence Report", 20, 28);

    doc.setTextColor(0, 0, 0);

    let y = 50;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Meeting Information", 20, y);

    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Meeting ID: ${meetingId}`, 20, y);

    y += 8;

    doc.text(`Duration: ${meetingTime}`, 20, y);

    y += 8;

    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, y);

    y += 18;

    const addSection = (title, content) => {
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(title, 20, y);

      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      const lines = doc.splitTextToSize(
        content || "No information available.",
        170
      );

      doc.text(lines, 20, y);

      y += lines.length * 7 + 12;
    };

    addSection("AI Summary", ai.summary);
    addSection("Live Transcript", ai.transcript);
    addSection("Key Decisions", ai.decision);
    addSection("Action Items", ai.task);

    doc.setDrawColor(220);
    doc.line(20, 280, 190, 280);

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text("Generated automatically by VOXLATE AI", 20, 287);

    doc.save(`VOXLATE-${meetingId}.pdf`);
  };

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("http://localhost:5000/api/livekit/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: meetingId,
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
  }, [meetingId]);

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
              <span>{meetingId}</span>
            </div>

            <div className="header-chip">
              <Languages size={16} />

              <select
                className="language-select"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="Tamil">Tamil</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
              </select>
            </div>
            <div className="header-chip">
              <Timer size={16} />
              <span>{meetingTime}</span>
            </div>

            <button className="header-chip" onClick={copyMeetingLink}>
              <Share2 size={16} />
              <span>Share</span>
            </button>

            <button className="header-chip" onClick={copySummary}>
              <Copy size={16} />
              <span>Copy</span>
            </button>

            <button className="header-chip" onClick={downloadSummary}>
              <Download size={16} />
              <span>PDF</span>
            </button>

            <div className="recording">
              <Circle size={10} fill="currentColor" />
              Recording
            </div>
          </div>
        </header>

        <main className="meeting-content">
          <section className="video-section">
            <div className="video-wrapper">
              <VideoGrid />
            </div>
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
                <span>Key Decisions</span>
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

        <MeetingControls
          copySummary={copySummary}
          downloadSummary={downloadSummary}
        />
      </div>
    </LiveKitRoom>
  );
}
