import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MeetingRoom from './pages/MeetingRoom.jsx';
import Summary from './pages/Summary.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meeting/:roomId" element={<MeetingRoom />} />
      <Route path="/summary/:roomId" element={<Summary />} />
    </Routes>
  );
}

export default AppRoutes;
