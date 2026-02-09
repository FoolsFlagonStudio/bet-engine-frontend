import { Tabs, Typography } from "antd";
import AnalyticsOverview from "../components/analytics/AnalyticsOverview";
import HistoricalOverview from "../components/analytics/HistoricalOverview"
const { Title } = Typography;

export default function Analytics() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Analytics</Title>
      <Tabs
        defaultActiveKey="overview"
        items={[
          {
            key: "overview",
            label: "Overview",
            children: <AnalyticsOverview />,
          },
          {
            key: "historical",
            label: "Historical",
            children: <HistoricalOverview />,
          },
          {
            key: "moneyline",
            label: "Moneylines",
            children: <div>Coming next</div>,
          },
          {
            key: "players",
            label: "Players",
            children: <div>Coming later</div>,
          },
        ]}
      />
    </div>
  );
}
