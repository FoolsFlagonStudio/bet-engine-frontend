import { Row, Col, Card, Statistic, Typography, Space, Spin, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { API_ROUTES } from "../../lib/routes";
import type { SnapshotResponse } from "../../types/moneylines";

const { Title, Text } = Typography;

export default function SnapshotSection() {
  const { data, isLoading, error } = useQuery<SnapshotResponse>({
    queryKey: ["snapshot"],
    queryFn: () => apiFetch(API_ROUTES.snapshot),
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "48px 24px" }}>
        <Spin />
      </div>
    );
  }

  if (error || !data) return null;

  const streakColor = data.current_streak.result === "win" ? "#52c41a" : "#ff4d4f";
  const sportKeys = Object.keys(data.today.props_by_sport);

  return (
    <div className="section">
      <div className="container">
        <Title level={3} className="center mb-48">
          System Performance
        </Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Graded"
                  value={data.headline.total_graded}
                  formatter={(v) => Number(v).toLocaleString()}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="All-Time Win Rate"
                  value={(data.headline.overall_win_rate * 100).toFixed(1)}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title={`${data.top_tier.label} (Conf ${data.top_tier.confidence}) Win Rate`}
                  value={(data.top_tier.win_rate * 100).toFixed(1)}
                  suffix="%"
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {data.top_tier.total.toLocaleString()} picks graded
                </Text>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Card>
                <Statistic
                  title={`Last ${data.recent_form.days} Days`}
                  value={(data.recent_form.win_rate * 100).toFixed(1)}
                  suffix="%"
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {data.recent_form.wins}W — {data.recent_form.losses}L
                </Text>
              </Card>
            </Col>
            {/* <Col xs={24} sm={12}>
              <Card>
                <Statistic
                  title="Current Streak"
                  value={data.current_streak.length}
                  suffix={`-pick ${data.current_streak.result}`}
                  valueStyle={{ color: streakColor }}
                />
              </Card>
            </Col> */}
          </Row>

          <Card title="Today's Available Picks">
            <Row gutter={[24, 16]}>
              <Col xs={12} sm={6}>
                <Statistic title="Props" value={data.today.props_available} />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Moneylines"
                  value={data.today.moneylines_available}
                />
              </Col>
              {sportKeys.length > 0 && (
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
                    Props by sport
                  </Text>
                  <Space wrap>
                    {sportKeys.map((sport) => (
                      <Tag key={sport}>
                        {sport.toUpperCase()}: {data.today.props_by_sport[sport]}
                      </Tag>
                    ))}
                  </Space>
                </Col>
              )}
            </Row>
          </Card>
        </Space>
      </div>
    </div>
  );
}
