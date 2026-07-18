import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
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
    <GridLayout
      tracks={tracks}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

function AudioCapture() {
  const { microphoneTrack } = useLocalParticipant();

  useEffect(() => {
    if (!microphoneTrack) return;

    console.log("🎤 Microphone Track Found");
    console.log(microphoneTrack);

    return () => {
      console.log("🎤 Audio Capture Stopped");
    };
  }, [microphoneTrack]);

  return null;
}

export default function VideoRoom() {
  const [token, setToken] = useState("");

  const ai = useDeepgram("English");

  useEffect(() => {
    const fetchToken = async () => {
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
    };

    fetchToken();
  }, []);

  if (!token) {
    return <div className="video-loading">Connecting...</div>;
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

      <div className="voxlate-layout">
        <div className="video-section">
          <VideoGrid />
        </div>

        <div className="ai-sidebar">
          <h2>VOXLATE AI</h2>

          <div className="ai-card">
            <h3>🎤 Live Transcript</h3>
            <p>{ai.transcript || "Waiting for speech..."}</p>
          </div>

          <div className="ai-card">
            <h3>🌍 Translation</h3>
            <p>{ai.translation || "Waiting..."}</p>
          </div>

          <div className="ai-card">
            <h3>✅ Decisions</h3>
            <p>{ai.decision || "No decisions detected."}</p>
          </div>

          <div className="ai-card">
            <h3>📋 Action Items</h3>
            <p>{ai.task || "No tasks detected."}</p>
          </div>

          <div className="ai-card">
            <h3>📝 Meeting Summary</h3>
            <p>{ai.summary || "Waiting..."}</p>
          </div>
        </div>
      </div>
    </LiveKitRoom>
  );
}
