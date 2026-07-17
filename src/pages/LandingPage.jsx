import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Pipeline from "../components/Pipeline/Pipeline";
import DashboardPreview from "../components/DashboardPreview/DashboardPreview";
import Integration from "../components/Integration/Integration";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Pipeline />
      <DashboardPreview />
      <Integration />
    </>
  );
};

export default LandingPage;
