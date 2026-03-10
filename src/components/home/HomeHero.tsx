import { Typography, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <Space direction="vertical" size="large">
        <Title level={2}>
          Model-Driven Sports Analytics & Betting Insights
        </Title>

        <Title level={4}>
          Data-driven sports analytics built on transparent historical tracking
          and repeatable model evaluation.
        </Title>

        <Paragraph>
          We use recent performance data, historical hit rates, and market
          context to surface structured, high-confidence betting opportunities —
          built around transparency, sample size, and repeatability.
        </Paragraph>

        <Paragraph>
          Each day, player and team markets are filtered through consistency
          models and ranked across alt lines and core markets. Every pick is
          backed by visible performance data — not hype.
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
