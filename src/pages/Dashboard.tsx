import { Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { API_ROUTES } from "../lib/routes";
const { Title } = Typography;

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bets", "today"],
    queryFn: () => apiFetch(API_ROUTES.todaysBets),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bets</div>;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard</Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
