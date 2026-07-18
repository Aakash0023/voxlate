import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  GridLayout,
  ParticipantTile,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
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
        height: "100%",
        width: "100%",
      }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

export default function VideoRoom() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
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

      <div className="voxlate-layout">
        <div className="video-section">
          <VideoGrid />
        </div>

        <div className="ai-sidebar">
          <h2>VOXLATE AI</h2>

          <div className="ai-card">Live Transcript</div>

          <div className="ai-card">Translation</div>

          <div className="ai-card">Decisions</div>

          <div className="ai-card">Action Items</div>

          <div className="ai-card">Meeting Summary</div>
        </div>
      </div>
    </LiveKitRoom>
  );
}
