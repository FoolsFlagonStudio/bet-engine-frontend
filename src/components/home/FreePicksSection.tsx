import { Typography, Space, Row, Col } from "antd";
import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "../../lib/api";
import { FreePicksCard } from "./FreePickCard";
import type { FreePicksResponse } from "./FreePickCard";

const { Title, Text } = Typography;

export default function FreePicksSection() {
  const todayQuery = useQuery<FreePicksResponse>({
    queryKey: ["free-picks", "today"],
    queryFn: () => apiFetch("/api/free-picks?date=today"),
  });

  const yesterdayQuery = useQuery<FreePicksResponse>({
    queryKey: ["free-picks", "yesterday"],
    queryFn: () => apiFetch("/api/free-picks?date=yesterday"),
  });

  if (todayQuery.isLoading || yesterdayQuery.isLoading) return null;

  return (
    <div
      style={{
        background: "#fafafa",
        padding: "48px 24px",
        marginTop: 64,
      }}
    >
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]} align="top">
          <Col xs={24} md={12}>
            <div style={{ textAlign: "center" }}>
              <Title level={3}>Yesterday’s Results</Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 24,
                }}
              >
                <FreePicksCard
                  picks={yesterdayQuery.data?.picks ?? []}
                  date={yesterdayQuery.data?.date}
                />
              </div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div style={{ textAlign: "center" }}>
              <Title level={3}>Today’s Free Picks</Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 24,
                }}
              >
                <FreePicksCard
                  picks={todayQuery.data?.picks ?? []}
                  date={todayQuery.data?.date}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
