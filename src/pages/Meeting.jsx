import "../styles/meeting.css";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import MeetingRoom from "../components/MeetingRoom";
import LiveTranslationCard from "../components/LiveTranslationCard";
import useMicrophone from "../hooks/useMicrophone";
import useMeetingAI from "../hooks/useMeetingAI";
import {
  FileText,
  ClipboardCheck,
  CheckCircle2,
  ScrollText,
} from "lucide-react";

export default function Meeting() {
  const [selectedLanguage, setSelectedLanguage] = useState("Tamil");
  const [transcripts, setTranscripts] = useState([]);
  const [duration, setDuration] = useState(0);
  const [lastSpoken, setLastSpoken] = useState("");

  const voicesLoaded = useRef(false);

  const { recording, startRecording, stopRecording } =
    useMicrophone(selectedLanguage);

  const ai = useMeetingAI();

  useEffect(() => {
    const loadVoices = () => {
      speechSynthesis.getVoices();
      voicesLoaded.current = true;
    };

    loadVoices();

    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (!recording) return;

    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [recording]);

  useEffect(() => {
    if (!ai.transcript) return;

    setTranscripts((prev) => [
      ...prev,
      {
        text: ai.transcript,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }, [ai.transcript]);

  useEffect(() => {
    const list = document.querySelector(".transcript-list");

    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [transcripts]);

  const speakTranslation = (text, language) => {
    if (!text || !voicesLoaded.current) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const languageMap = {
      Tamil: "ta-IN",
      English: "en-US",
      Hindi: "hi-IN",
      Telugu: "te-IN",
      Malayalam: "ml-IN",
    };

    utterance.lang = languageMap[language] || "en-US";

    const voices = speechSynthesis.getVoices();

    const voice =
      voices.find((v) => v.lang === utterance.lang) ||
      voices.find((v) => v.lang.startsWith(utterance.lang.split("-")[0]));

    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!ai.translation) return;

    if (ai.translation === lastSpoken) return;

    setLastSpoken(ai.translation);

    speakTranslation(ai.translation, selectedLanguage);
  }, [ai.translation, selectedLanguage]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar />

      <div className="meeting-page">
        <div className="meeting-header">
          <div className="header-left">
            <h1>VOXLATE Meeting Assistant</h1>
            <p>Real-time AI Meeting Intelligence</p>
          </div>

          <div className="header-right">
            <select
              className="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="Tamil">🇮🇳 Tamil</option>
              <option value="English">🇺🇸 English</option>
              <option value="Hindi">🇮🇳 Hindi</option>
              <option value="Telugu">🇮🇳 Telugu</option>
              <option value="Malayalam">🇮🇳 Malayalam</option>
            </select>

            <button
              className="mic-button"
              onClick={recording ? stopRecording : startRecording}
            >
              {recording ? "🛑 Stop Meeting" : "🎤 Start Meeting"}
            </button>

            <div className="live-badge">
              {recording ? `🔴 Live • ${formatTime(duration)}` : "⚪ Offline"}
            </div>
          </div>
        </div>

        <div className="meeting-layout">
          <div>
            <div className="meeting-stats">
              <div className="stat-card">
                <h2>{transcripts.length}</h2>
                <span>Transcripts</span>
              </div>

              <div className="stat-card">
                <h2>{ai.decision ? 1 : 0}</h2>
                <span>Decisions</span>
              </div>

              <div className="stat-card">
                <h2>{ai.task ? 1 : 0}</h2>
                <span>Tasks</span>
              </div>

              <div className="stat-card">
                <h2>4</h2>
                <span>Participants</span>
              </div>
            </div>

            <MeetingRoom />
          </div>

          <div className="ai-sidebar">
            <LiveTranslationCard
              language={selectedLanguage}
              translation={ai.translation}
            />

            <div className="ai-debug-card">
              <div className="card-title">
                <FileText size={18} />
                <h3>Live Transcript</h3>
              </div>

              <div className="transcript-list">
                {transcripts.length === 0 ? (
                  <p className="waiting-text">
                    Waiting for participants to speak...
                  </p>
                ) : (
                  transcripts.map((item, index) => (
                    <div className="transcript-item" key={index}>
                      <span>{item.time}</span>
                      <p>{item.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="ai-debug-card">
              <div className="card-title">
                <ClipboardCheck size={18} />
                <h3>Decision</h3>
              </div>

              <div className="debug-item">
                <p>{ai.decision || "No decisions identified yet."}</p>
              </div>
            </div>

            <div className="ai-debug-card">
              <div className="card-title">
                <CheckCircle2 size={18} />
                <h3>Tasks</h3>
              </div>

              <div className="debug-item">
                <p>{ai.task || "No action items assigned yet."}</p>
              </div>
            </div>

            <div className="ai-debug-card">
              <div className="card-title">
                <ScrollText size={18} />
                <h3>Meeting Summary</h3>
              </div>

              <div className="debug-item">
                <p>
                  {ai.summary ||
                    "Summary will appear as the meeting progresses."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
