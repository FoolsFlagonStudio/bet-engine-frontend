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
      tableLayout="fixed"
      expandable={{
        expandedRowRender: (row) => <LineBreakdownTable lines={row.lines} />,
      }}
      columns={[
        {
          title: "Market",
          dataIndex: "market",
          width: "50%",
          render: (m) => m.toUpperCase(),
        },
        {
          title: "Record",
          width: "20%",
          render: (_, r) => `${r.wins} / ${r.total}`,
        },
        {
          title: "Win Rate",
          width: "30%",
          render: (_, r) => (
            <Progress
              className="progress-bar"
              percent={Number((r.win_rate * 100).toFixed(1))}
              size="small"
            />
          ),
        },
      ]}
    />
  );
}
