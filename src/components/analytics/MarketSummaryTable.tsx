import { Table, Progress } from "antd";
import LineBreakdownTable from "./LineBreakdownTable";

type Props = {
  markets: Record<string, any>;
};

export default function MarketSummaryTable({ markets }: Props) {
  const data = Object.entries(markets)
    .map(([market, stats]) => ({
      key: market,
      market,
      ...stats,
    }))
    .sort((a, b) => Number(b.win_rate) - Number(a.win_rate));

  return (
    <Table
      dataSource={data}
      pagination={false}
      expandable={{
        expandedRowRender: (row) => <LineBreakdownTable lines={row.lines} />,
      }}
      columns={[
        {
          title: "Market",
          dataIndex: "market",
          render: (m) => m.toUpperCase(),
        },
        {
          title: "Record",
          render: (_, r) => `${r.wins} / ${r.total}`,
        },
        {
          title: "Win Rate",
          render: (_, r) => (
            <Progress percent={Number(r.win_rate) * 100} size="small" />
          ),
        },
      ]}
    />
  );
}
