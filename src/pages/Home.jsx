import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import LiveDemo from "../components/landing/LiveDemo";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <LiveDemo />
    </main>
  );
};

export default Home;
