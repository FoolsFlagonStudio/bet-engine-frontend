import { Typography } from "antd";
import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "../lib/api";
import { API_ROUTES } from "../lib/routes";

import { FreePicksCard } from "../components/home/FreePickCard";
import type {
  FreePick,
  FreePicksResponse,
} from "../components/home/FreePickCard";

const { Title } = Typography;

export default function Dashboard() {
  // Today’s bets (existing dashboard data)
  const {
    data: todaysBets,
    isLoading: betsLoading,
    error: betsError,
  } = useQuery({
    queryKey: ["bets", "today"],
    queryFn: () => apiFetch(API_ROUTES.todaysBets),
  });

  // Free picks (temporary preview)
  const {
    data: freePicksData,
    isLoading: freePicksLoading,
    error: freePicksError,
  } = useQuery<FreePicksResponse>({
    queryKey: ["free-picks", "today"],
    queryFn: () => apiFetch("/api/free-picks?date=today"),
  });

  if (betsLoading || freePicksLoading) {
    return <div>Loading…</div>;
  }

  if (betsError || freePicksError) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard</Title>

      {/* Free Picks preview (temporary) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 32,
          background: "#fff",
        }}
      >
        <FreePicksCard
          picks={freePicksData?.picks ?? []}
          date={freePicksData?.date}
        />
      </div>

      {/* Existing dashboard content */}
      <pre style={{ marginTop: 24 }}>{JSON.stringify(todaysBets, null, 2)}</pre>
    </div>
  );
}
