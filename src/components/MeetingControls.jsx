import { useNavigate } from "react-router-dom";
import { useRoomContext, useLocalParticipant } from "@livekit/components-react";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MonitorOff,
  Copy,
  Download,
  PhoneOff,
} from "lucide-react";

export default function MeetingControls({ copySummary, downloadSummary }) {
  const navigate = useNavigate();

  const room = useRoomContext();

  const { localParticipant } = useLocalParticipant();

  const micEnabled = localParticipant?.isMicrophoneEnabled ?? false;

  const cameraEnabled = localParticipant?.isCameraEnabled ?? false;

  const screenEnabled = localParticipant?.isScreenShareEnabled ?? false;

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!micEnabled);
  };

  const toggleCamera = async () => {
    await localParticipant.setCameraEnabled(!cameraEnabled);
  };

  const toggleScreen = async () => {
    await localParticipant.setScreenShareEnabled(!screenEnabled);
  };

  const leaveMeeting = async () => {
    try {
      await room.disconnect();
    } catch {}

    navigate("/");
  };

  return (
    <footer className="meeting-controls">
      <button
        className={`meeting-action ${micEnabled ? "" : "danger"}`}
        onClick={toggleMic}
      >
        {micEnabled ? <Mic size={18} /> : <MicOff size={18} />}

        <span>{micEnabled ? "Mic On" : "Mic Off"}</span>
      </button>

      <button
        className={`meeting-action ${cameraEnabled ? "" : "danger"}`}
        onClick={toggleCamera}
      >
        {cameraEnabled ? <Video size={18} /> : <VideoOff size={18} />}

        <span>{cameraEnabled ? "Camera On" : "Camera Off"}</span>
      </button>

      <button
        className={`meeting-action ${screenEnabled ? "active" : ""}`}
        onClick={toggleScreen}
      >
        {screenEnabled ? <MonitorOff size={18} /> : <MonitorUp size={18} />}

        <span>{screenEnabled ? "Stop Sharing" : "Share Screen"}</span>
      </button>

      <button className="meeting-action" onClick={copySummary}>
        <Copy size={18} />
        <span>Copy</span>
      </button>

      <button className="meeting-action" onClick={downloadSummary}>
        <Download size={18} />
        <span>Export</span>
      </button>

      <button className="leave-btn" onClick={leaveMeeting}>
        <PhoneOff size={18} />
        <span>Leave Meeting</span>
      </button>
    </footer>
  );
}
