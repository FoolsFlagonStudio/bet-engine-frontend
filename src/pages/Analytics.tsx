import { Tabs, Typography } from "antd";
import AnalyticsOverview from "../components/analytics/AnalyticsOverview";
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
            children: <div>Coming next</div>,
          },
          {
            key: "model",
            label: "Model",
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
