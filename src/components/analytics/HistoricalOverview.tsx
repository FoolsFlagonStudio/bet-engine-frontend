import { Typography, Space, Spin, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./../../lib/api";
import { API_ROUTES } from "./../../lib/routes";

import ConfidencePerformanceTable from "./ConfidencePerformanceTable";
import MarketConfidenceTable from "./MarketConfidenceTable";

type HistoricalAnalytics = {
  overall: {
    wins: number;
    losses: number;
    total: number;
    voided: number;
    win_rate: string;
  } | null;

  confidence: {
    confidence: number;
    wins: number;
    losses: number;
    voids: number;
    total: number;
    win_rate: string;
  }[];

  confidence_weighted: string | null;

  markets: {
    market: string;
    wins: number;
    losses: number;
    total: number;
    voids: number;
    win_rate: string;
  }[];

  market_confidence: {
    market: string;
    confidence: number;
    wins: number;
    total: number;
    win_rate: string;
    low_sample: boolean;
  }[];
};

const { Title, Text } = Typography;

export default function HistoricalOverview() {
  const { data, isLoading, error } = useQuery<HistoricalAnalytics>({
    queryKey: ["historical-analytics"],
    queryFn: () => apiFetch(API_ROUTES.historicalAnalytics),
  });

  if (isLoading) return <Spin />;
  if (error || !data) {
    return <Alert type="error" message="Failed to load historical analytics" />;
  }

  return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      <Title level={3}>Historical Performance</Title>

      <ConfidencePerformanceTable data={data.confidence ?? []} />

      <MarketConfidenceTable data={data.market_confidence ?? []} />

      <Text type="secondary" style={{ fontSize: 12 }}>
        All historical analytics are based on resolved bets only. Player props
        shown here reflect straight bets only.
      </Text>
    </Space>
  );
}
