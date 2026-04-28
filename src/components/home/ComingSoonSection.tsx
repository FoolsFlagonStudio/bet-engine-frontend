import { Typography, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

export default function ComingSoonSection() {
  return (
    <div className="section">
      <div className="container">
        <Title className="center mb-48">Coming Soon</Title>

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

        </Row>
      </div>
    </div>
  );
}
