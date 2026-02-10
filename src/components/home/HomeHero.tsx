import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "48px auto",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <Title level={2}>Model-Driven NBA Betting Analytics</Title>

      <Paragraph>
        This platform analyzes recent player performance, historical hit rates,
        and market context to surface high-confidence betting opportunities. The
        focus is on transparency, sample size, and trust — not volume.
      </Paragraph>

      <Paragraph>
        Free picks are published daily. Full analytics access is currently
        limited while the platform is in active development.
      </Paragraph>

      <Button type="primary" size="large" onClick={() => navigate("/login")}>
        Login to View Picks / Analytics
      </Button>
    </div>
  );
}
