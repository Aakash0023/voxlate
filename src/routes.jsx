import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MeetingRoom from "./pages/MeetingRoom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting" element={<MeetingRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
