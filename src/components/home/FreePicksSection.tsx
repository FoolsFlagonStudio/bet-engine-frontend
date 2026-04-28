import { Typography, Space, Row, Col, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "../../lib/api";
import { API_ROUTES } from "../../lib/routes";
import { FreePicksCard } from "./FreePickCard";
import type { FreePicksResponse } from "./FreePickCard";

const { Title } = Typography;

export default function FreePicksSection() {
  const todayQuery = useQuery<FreePicksResponse>({
    queryKey: ["free-picks", "today"],
    queryFn: () => apiFetch(API_ROUTES.freePicks("today")),
    staleTime: 60 * 60 * 1000,
  });

  const yesterdayQuery = useQuery<FreePicksResponse>({
    queryKey: ["free-picks", "yesterday"],
    queryFn: () => apiFetch(API_ROUTES.freePicks("yesterday")),
    staleTime: 60 * 60 * 1000,
  });

  if (todayQuery.isLoading || yesterdayQuery.isLoading) {
    return (
      <div
        className="section-elevated"
        style={{ textAlign: "center", padding: "64px 24px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section-elevated">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]} align="top">
          <Col xs={24} md={12}>
            <div className="center">
              <Title level={3}>Yesterday's Results</Title>
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
            <div className="center">
              <Title level={3}>Today's Free Picks</Title>
              <div className="flex-center mt-24">
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
