import HomeHero from "../components/home/HomeHero";
import FreePicksSection from "../components/home/FreePicksSection";
import SnapshotSection from "../components/home/SnapshotSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TransparencySection from "../components/home/TransparencySection";
import ComingSoonSection from "../components/home/ComingSoonSection";


export default function Home() {
  console.log("we're on home page");
  return (
    <>

      <HomeHero />
      <FreePicksSection />
      <SnapshotSection />
      <HowItWorksSection />
      <TransparencySection />
      <ComingSoonSection />

    </>
  );
}
