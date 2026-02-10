import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../../lib/api";
import { API_ROUTES } from "../../lib/routes";

type PlayerRow = {
  player_id: number;
  player_name: string;
  total_straights: number;
  wins: number;
  win_rate: string;
};

type PlayersResponse = {
  data: PlayerRow[];
  page: number;
  limit: number;
  total: number;
};

type Props = {
  search: string;
  onSelectPlayer: (playerId: number) => void;
};

export default function PlayerTable({ search, onSelectPlayer }: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery<PlayersResponse>({
    queryKey: ["players", search, page],
    queryFn: () =>
      apiFetch(
        `${API_ROUTES.players()}?page=${page}&limit=25&min_samples=20${
          search ? `&q=${encodeURIComponent(search)}` : ""
        }`,
      ),
    placeholderData: (prev) => prev,
  });

  return (
    <Table
      loading={isLoading}
      rowKey="player_id"
      dataSource={data?.data ?? []}
      onRow={(row) => ({
        onClick: () => onSelectPlayer(row.player_id),
      })}
      columns={[
        {
          title: "Player",
          dataIndex: "player_name",
        },
        {
          title: "Win Rate",
          dataIndex: "win_rate",
          render: (v) => `${(Number(v) * 100).toFixed(1)}%`,
        },
        {
          title: "Total Bets",
          dataIndex: "total_straights",
        },
      ]}
      pagination={{
        current: page,
        pageSize: data?.limit ?? 25,
        total: data?.total ?? 0,
        onChange: (p) => setPage(p),
        showSizeChanger: false,
      }}
    />
  );
}
