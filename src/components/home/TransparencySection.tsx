import { Typography, Card } from "antd";

const { Title, Paragraph } = Typography;

export default function TransparencySection() {
  return (
    <div style={{ background: "#fafafa", padding: "64px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Title level={2}>Transparency Over Volume</Title>

        <Paragraph>
          We prioritize sample size, repeatability, and long-term tracking over
          high-volume daily picks.
        </Paragraph>

        <Card style={{ marginTop: 32 }}>
          <Paragraph>
            Every generated bet is logged, graded, and added to historical
            performance dashboards.
          </Paragraph>

          <Paragraph>
            ✔ Historical straight prop performance ✔ Moneyline performance
            tracking ✔ Player-specific betting breakdowns ✔ Market-by-market win
            rates ✔ Stat combo tracking (coming soon)
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}
