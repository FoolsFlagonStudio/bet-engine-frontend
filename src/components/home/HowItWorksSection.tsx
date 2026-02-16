import { Typography, Row, Col, Card } from "antd";
import {
  FilterOutlined,
  LineChartOutlined,
  HistoryOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function HowItWorksSection() {
  return (
    <div style={{ padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 48 }}>
          How the Model Works
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>
                {" "}
                <FilterOutlined
                  style={{ fontSize: 22, marginBottom: 12 }}
                />{" "}
                Player Qualification
              </Title>
              <Paragraph>
                Only players averaging 18+ minutes across their last 5 games are
                eligible — filtering out low-usage volatility.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>
                {" "}
                <LineChartOutlined
                  style={{ fontSize: 22, marginBottom: 12 }}
                />{" "}
                Alt Line Confidence Scoring
              </Title>
              <Paragraph>
                FanDuel-based alt lines for points, rebounds, assists, and
                threes are ranked 1–5 based on recent hit frequency.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>
                {" "}
                <HistoryOutlined
                  style={{ fontSize: 22, marginBottom: 12 }}
                />{" "}
                Historical Line Tracking
              </Title>
              <Paragraph>
                Every generated line is tracked long term with win rates, market
                breakdowns, and visible sample sizes.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>
                {" "}
                <FundProjectionScreenOutlined
                  style={{ fontSize: 22, marginBottom: 12 }}
                />{" "}
                Team & Moneyline Modeling
              </Title>
              <Paragraph>
                Team scoring trends, turnovers, efficiency, and home/away impact
                are analyzed to generate structured projections.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
