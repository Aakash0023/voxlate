import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MeetingHeader from '../components/Meeting/MeetingHeader.jsx';
import Participants from '../components/Meeting/Participants.jsx';
import LanguageSelector from '../components/Meeting/LanguageSelector.jsx';
import AudioControls from '../components/Meeting/AudioControls.jsx';
import LiveTranscript from '../components/Meeting/LiveTranscript.jsx';
import AIStatus from '../components/AI/AIStatus.jsx';
import { useSocket } from '../hooks/useSocket.js';
import { useAudio } from '../hooks/useAudio.js';

function MeetingRoom() {
  const { roomId } = useParams();
  const [language, setLanguage] = useState('en');
  const { isMuted, toggleMute } = useAudio();
  const { participants, transcript } = useSocket(roomId);

  return (
    <div className="meeting-room">
      <MeetingHeader roomId={roomId} />
      <AIStatus status="listening" />
      <LanguageSelector value={language} onChange={setLanguage} />
      <Participants participants={participants} />
      <LiveTranscript entries={transcript} />
      <AudioControls isMuted={isMuted} onToggleMute={toggleMute} onLeave={() => {}} />
    </div>
  );
}

export default MeetingRoom;
