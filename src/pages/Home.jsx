import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import About from "../components/About";

export default function Home() {
  const navigate = useNavigate();

  const createMeeting = () => {
    const meetingId = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/meeting/${meetingId}`);
  };

  const joinMeeting = () => {
    const meetingId = prompt("Enter Meeting ID");
    if (meetingId) {
      navigate(`/meeting/${meetingId.toUpperCase()}`);
    }
  };

  return (
    <>
      <Navbar onCreateMeeting={createMeeting} />
      <Hero onCreateMeeting={createMeeting} onJoinMeeting={joinMeeting} />
      <Features />
      <HowItWorks />
      <About />
    </>
  );
}
