import { Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { apiFetch } from "../lib/api";
import { API_ROUTES } from "../lib/routes";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardTable from "../components/dashboard/DashboardTable";
import PlayerProfileModal from "../components/analytics/PlayerProfileModal";

const { Title } = Typography;

export default function Dashboard() {
  const [betType, setBetType] = useState<"straight" | "moneylines">(
    "straight",
  );
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const { data: todaysBets = [], isLoading } = useQuery<any[]>({
    queryKey: ["bets", "today", betType],
    queryFn: () => apiFetch(`${API_ROUTES.todaysBets}?type=${betType}`),
  });

  if (isLoading) return <div>Loading…</div>;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard</Title>

      <DashboardHeader betType={betType} onChange={setBetType} />

      <DashboardTable
        betType={betType}
        data={todaysBets ?? []}
        onPlayerClick={setSelectedPlayerId}
      />

      <PlayerProfileModal
        playerId={selectedPlayerId}
        onClose={() => setSelectedPlayerId(null)}
      />
    </div>
  );
}
