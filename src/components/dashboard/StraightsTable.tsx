import { Table, Tag } from "antd";

type Props = {
  data: any[];
  onPlayerClick: (id: number) => void;
};

export default function StraightsTable({ data, onPlayerClick }: Props) {
  const marketFilters = Array.from(new Set(data.map((d) => d.market))).map(
    (m) => ({
      text: m.toUpperCase(),
      value: m,
    }),
  );

  const columns = [
    {
      title: "Player",
      dataIndex: "player",
      sorter: (a: any, b: any) =>
        (a.player ?? "").localeCompare(b.player ?? ""),
      render: (_: any, r: any) =>
        r.player ? (
          <a onClick={() => onPlayerClick(r.player_id)}>{r.player}</a>
        ) : (
          "—"
        ),
    },
    {
      title: "Market",
      dataIndex: "market",
      filters: marketFilters,
      onFilter: (value: any, record: any) => record.market === value,
      render: (m: string) => m.toUpperCase(),
    },
    {
      title: "Line",
      dataIndex: "line",
      render: (v: number) => `${v}+`,
    },
    {
      title: "Confidence",
      dataIndex: "confidence",
      filters: [
        { text: "5", value: 5 },
        { text: "4", value: 4 },
        { text: "3", value: 3 },
        { text: "2", value: 2 },
        { text: "1", value: 1 },
      ],
      onFilter: (value: any, record: any) => record.confidence === value,
      sorter: (a: any, b: any) => a.confidence - b.confidence,
    },
    {
      title: "Trust",
      sorter: (a: any, b: any) =>
        (a.player_trust ?? -1) - (b.player_trust ?? -1),
      render: (_: any, r: any) => {

        if (r.player_trust == null) {
          return <Tag color="default">No data</Tag>;
        }

        return (
          <Tag
            color={
              r.trust_tier === "high"
                ? "green"
                : r.trust_tier === "medium"
                  ? "blue"
                  : "orange"
            }
          >
            {r.player_trust}%
          </Tag>
        );
      },
    },
    {
      title: "Risk",
      dataIndex: "risk",
      filters: [
        { text: "Core", value: "core" },
        { text: "Strong", value: "strong" },
        { text: "Acceptable", value: "acceptable" },
        { text: "Weak", value: "weak" },
        { text: "Speculative", value: "speculative" },
      ],
      onFilter: (value: any, record: any) => record.risk === value,
      render: (r: string) => (
        <Tag color={r === "core" ? "green" : "gold"}>{r}</Tag>
      ),
    },
    {
      title: "Flags",
      filters: [{ text: "Low sample", value: "low_sample" }],
      onFilter: (_: any, r: any) => r.low_sample === true,
      render: (_: any, r: any) =>
        r.low_sample ? <Tag color="orange">Low sample</Tag> : null,
    },
  ];

  return (
    <Table
      rowKey="bet_id"
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
}
