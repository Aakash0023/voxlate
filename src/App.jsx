import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MeetingRoom from "./pages/MeetingRoom";
import Summary from "./pages/Summary";
import NewMeetingRedirect from "./pages/NewMeetingRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/dashboard"
          element={<NewMeetingRedirect base="/dashboard" />}
        />
        <Route path="/meeting/:roomId" element={<MeetingRoom />} />
        <Route
          path="/meeting"
          element={<NewMeetingRedirect base="/meeting" />}
        />
        <Route path="/meeting/:roomId" element={<MeetingRoom />} />

        <Route path="/summary/:roomId" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
