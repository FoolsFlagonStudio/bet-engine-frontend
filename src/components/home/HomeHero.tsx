import { Typography, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "64px auto",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <Space direction="vertical" size="large">
        <Title level={2}>Model-Driven NBA Betting Analytics</Title>

        <Paragraph>
          We use recent performance data, historical hit rates, and market
          context to surface structured, high-confidence NBA betting
          opportunities — built around transparency, sample size, and trust.
        </Paragraph>

        <Paragraph>
          Each day, players are filtered by minutes consistency and ranked
          across alt prop ladders for points, rebounds, assists, and threes.
          Every pick is backed by visible performance data — not hype.
        </Paragraph>

        <Text type="secondary">
          Free picks are published daily (typically ~11AM EST).
        </Text>

        <Button type="primary" size="large" onClick={() => navigate("/login")}>
          View Today’s Picks
        </Button>
      </Space>
    </div>
  );
}
