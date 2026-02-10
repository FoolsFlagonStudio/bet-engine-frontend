import { Table, Tag } from "antd";

type Props = {
  data: any[];
};

export default function MoneylinesTable({ data }: Props) {
    console.log(data)
  const columns = [
    {
      title: "Matchup",
      dataIndex: "matchup",
      sorter: (a: any, b: any) =>
        (a.matchup ?? "").localeCompare(b.matchup ?? ""),
    },
    {
      title: "Pick",
      dataIndex: "pick",
      render: (v: string) => <strong>{v}</strong>,
    },
    {
      title: "Model %",
      dataIndex: "model_prob",
      sorter: (a: any, b: any) => (a.model_prob ?? 0) - (b.model_prob ?? 0),
      render: (v: number) => (v != null ? `${(v * 100).toFixed(1)}%` : "—"),
    },
    {
      title: "Implied %",
      dataIndex: "implied_prob",
      sorter: (a: any, b: any) => (a.implied_prob ?? 0) - (b.implied_prob ?? 0),
      render: (v: number) => (v != null ? `${(v * 100).toFixed(1)}%` : "—"),
    },
    {
      title: "Edge",
      dataIndex: "edge",
      sorter: (a: any, b: any) => (a.edge ?? 0) - (b.edge ?? 0),
      render: (v: number) => {
        if (v == null) return "—";

        const pct = v * 100;
        const color = pct >= 5 ? "green" : pct >= 2 ? "blue" : "default";

        return <Tag color={color}>{pct.toFixed(1)}%</Tag>;
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   filters: [
    //     { text: "Pending", value: "pending" },
    //     { text: "Win", value: "win" },
    //     { text: "Loss", value: "loss" },
    //   ],
    //   onFilter: (value: any, r: any) => r.status === value,
    //   render: (s: string) => (
    //     <Tag color={s === "pending" ? "blue" : s === "win" ? "green" : "red"}>
    //       {s}
    //     </Tag>
    //   ),
    // },
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
