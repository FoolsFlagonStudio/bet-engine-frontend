import { Modal, Spin, Typography, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { API_ROUTES } from "../../lib/routes";
import type { PlayerProfileResponse } from "./../../types/players";
import MarketSummaryTable from "./MarketSummaryTable";
const { Title, Text } = Typography;

type Props = {
  playerId: number | null;
  onClose: () => void;
};

export default function PlayerProfileModal({ playerId, onClose }: Props) {
  const { data, isLoading } = useQuery<PlayerProfileResponse>({
    enabled: !!playerId,
    queryKey: ["player-profile", playerId],
    queryFn: () => apiFetch(API_ROUTES.playerProfile(playerId!)),
  });
  
  return (
    <Modal open={!!playerId} onCancel={onClose} footer={null} width={800}>
      {isLoading || !data ? (
        <Spin />
      ) : (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <Title level={4}>{data.player_name}</Title>

          <Text>
            Trust Score:{" "}
            {data.trust_score !== null
              ? `${(data.trust_score * 100).toFixed(1)}%`
              : "Insufficient data"}
          </Text>

          <Text type="secondary">
            {data.overall.wins} / {data.overall.total_straights} wins ·{" "}
            {(Number(data.overall.win_rate) * 100).toFixed(1)}%
          </Text>

          <MarketSummaryTable markets={data.markets} />
        </Space>
      )}
    </Modal>
  );
}
