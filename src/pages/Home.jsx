import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-hidden">
      <Navbar />
      <Hero />
    </main>
  );
};

export default Home;
