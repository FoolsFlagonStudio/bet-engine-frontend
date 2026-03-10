import { Typography, Row, Col, Card, Button } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function Pricing() {
console.log("we're on pricing page")
  
  return (
    <div className="section">
      <div className="container">
        <Title className="center mb-48">Pricing</Title>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={10}>
            <Card>
              <Title level={3}>Free</Title>

              <Paragraph>Daily free picks and basic model insights.</Paragraph>

              <ul>
                <li>Daily free picks</li>
                {/* <li>Basic model transparency</li>
                <li>Limited historical results</li> */}
              </ul>

              <Text type="secondary">No account required</Text>
            </Card>
          </Col>

          <Col xs={24} md={10}>
            <Card>
              <Title level={3}>Pro</Title>

              <Paragraph>
                Full access to EdgeForge analytics and performance tracking.
              </Paragraph>

              <ul>
                <li>Full analytics dashboard</li>
                <li>Historical prop performance</li>
                <li>Player-specific tracking</li>
                <li>Market win-rate breakdowns</li>
              </ul>

              <Title level={2}>$5 / month</Title>

              <Button type="primary" className="ant-typography-secondary" disabled>
                Coming Soon
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
