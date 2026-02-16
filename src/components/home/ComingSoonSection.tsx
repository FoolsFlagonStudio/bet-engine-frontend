import { Typography, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

export default function ComingSoonSection() {
  return (
    <div style={{ padding: "64px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 48 }}>
          Coming Soon
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>Stat Combo Predictions</Title>
              <Paragraph>
                PRA, PR, PA, and other combo markets modeled using the same
                performance engine powering straight props.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>Full Analytics Dashboard</Title>
              <Paragraph>
                Expanded tracking of model performance, player history, and
                long-term profitability metrics.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>MLB Support</Title>
              <Paragraph>
                Baseball modeling launching late March / early April.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>NHL & NFL</Title>
              <Paragraph>
                Multi-sport expansion planned for next season rollouts.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
