import { Typography, Card, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

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
          <Space direction="vertical" size="middle">
            <Space>
              <CheckCircleOutlined />
              <Text>Historical straight prop performance</Text>
            </Space>

            <Space>
              <CheckCircleOutlined />
              <Text>Moneyline performance tracking</Text>
            </Space>

            <Space>
              <CheckCircleOutlined />
              <Text>Player-specific betting breakdowns</Text>
            </Space>

            <Space>
              <CheckCircleOutlined />
              <Text>Market-by-market win rates</Text>
            </Space>

            <Space>
              <CheckCircleOutlined />
              <Text>Stat combo tracking (coming soon)</Text>
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
}
