import HomeHeader from "../components/home/HomeHeader";
import HomeHero from "../components/home/HomeHero";
import FreePicksSection from "../components/home/FreePicksSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TransparencySection from "../components/home/TransparencySection";
import ComingSoonSection from "../components/home/ComingSoonSection";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <HomeHero />
      <FreePicksSection />
      <HowItWorksSection />
      <TransparencySection />
      <ComingSoonSection />
    </>
  );
}
