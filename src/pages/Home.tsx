import HomeHeader from "../components/home/HomeHeader";
import HomeHero from "../components/home/HomeHero";
import FreePicksSection from "../components/home/FreePicksSection";
import SnapshotSection from "../components/home/SnapshotSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TransparencySection from "../components/home/TransparencySection";
import ComingSoonSection from "../components/home/ComingSoonSection";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <HomeHero />
      <FreePicksSection />
      <SnapshotSection />
      <HowItWorksSection />
      <TransparencySection />
      <ComingSoonSection />
      <Footer />
    </>
  );
}
