import { Typography } from "antd";
import HomeHeader from "../components/home/HomeHeader";
import HomeHero from "../components/home/HomeHero";
import FreePicksSection from "../components/home/FreePicksSection";

const { Title } = Typography;

export default function Home() {
  return (
    <>
      <HomeHeader />
      <div style={{ padding: 24 }}>
        <HomeHero />
        <FreePicksSection />
      </div>
    </>
  );
}
