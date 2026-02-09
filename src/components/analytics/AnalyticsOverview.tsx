import { Typography, Spin, Alert, Space, Card } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { API_ROUTES } from "../../lib/routes";
import OverviewStats from "../analytics/OverviewStats";
import ConfidenceWinRateChart from "../analytics/ConfidenceWinRateChart";
import MarketPerformanceTable from "./MarketPerformanceTable";
import ModelTrustChart from "./ModelTrustChart";
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

type ModelTrustRow = {
  date: string;
  trust_all: number;
  trust_core: number;
  weights: {
    props: number;
    moneylines: number;
    parlays: number;
  };
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
  } = useQuery<ModelTrustRow[]>({
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

        <Card
          title={
            <>
              Confidence vs Win Rate
              <Typography.Text
                type="secondary"
                style={{ display: "block", fontSize: 12 }}
              >
                Based on generated straight player prop bets only. Parlays and
                moneylines are excluded.
              </Typography.Text>
            </>
          }
        >
          <ConfidenceWinRateChart confidence={historical?.confidence ?? []} />
        </Card>

        <Card title="Market Performance">
          <MarketPerformanceTable markets={historical?.markets ?? []} />
          <Typography.Text
            type="secondary"
            style={{ display: "block", fontSize: 12, marginTop: 8 }}
          >
            Market performance reflects historical straight player prop bets
            only. Parlays and moneylines are excluded.
          </Typography.Text>
        </Card>

        <Card
          title={
            <>
              Model Trust Over Time
              <Typography.Text
                type="secondary"
                style={{ display: "block", fontSize: 12 }}
              >
                Tracks model confidence and weighting adjustments across recent
                days.
              </Typography.Text>
            </>
          }
        >
          <ModelTrustChart data={modelTrust ?? []} />
          <Typography.Text
            type="secondary"
            style={{ display: "block", fontSize: 12, marginTop: 8 }}
          >
            Model trust trends stabilize as more days are recorded. The system
            is early in its tracking lifecycle, so the current time range is
            intentionally short.
          </Typography.Text>
        </Card>
      </Space>
    </>
  );
}
