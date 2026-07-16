import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Pipeline from "./components/Pipeline/Pipeline";
import DashboardPreview from "./components/DashboardPreview/DashboardPreview";
import Integration from "./components/Integration/Integration";
import AISidebar from "./components/Sidebar/AISidebar";

function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Pipeline />
      <DashboardPreview />
      <Integration />
      <AISidebar />
    </div>
  );
}

export default App;
