import { Typography, Spin, Alert, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { API_ROUTES } from "../../lib/routes";
import OverviewStats from "../analytics/OverviewStats";
const { Title } = Typography;

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
    total: number;
    voids: number;
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

export default function AnalyticsOVerview() {
  const {
    data: historical,
    isLoading: historicalLoading,
    error: historicalError,
  } = useQuery<HistoricalAnalytics>({
    queryKey: ["historical-analytics"],
    queryFn: () => apiFetch(API_ROUTES.historicalAnalytics),
  });

  const {
    data: modelTrust,
    isLoading: trustLoading,
    error: trustError,
  } = useQuery({
    queryKey: ["model-trust"],
    queryFn: () => apiFetch(API_ROUTES.modelTrust),
  });

  if (historicalLoading || trustLoading) {
    return <Spin />;
  }

  if (historicalError || trustError) {
    return (
      <Alert
        type="error"
        message="Failed to load analytics"
        description="One or more analytics endpoints failed."
      />
    );
  }

  return (
    <>
      <Title level={3}>Overview</Title>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <OverviewStats
          overall={historical?.overall}
          confidenceWeighted={historical?.confidence_weighted}
        />

        {/* <Card title="Confidence vs Win Rate">
          <ConfidenceWinRateChart />
        </Card>

        <Card title="Market Performance">
          <MarketPerformanceTable />
        </Card>

        <Card title="Model Trust Over Time">
          <ModelTrustChart />
        </Card> */}
      </Space>
    </>
  );
}
