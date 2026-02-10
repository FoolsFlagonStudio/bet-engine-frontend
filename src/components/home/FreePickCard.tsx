import { Card, Typography, Divider, List, Tag, Space } from "antd";

const { Title, Text } = Typography;

export type FreePicksResponse = {
  date: string;
  count: number;
  picks: FreePick[];
};

export type FreePick = {
  display_text: string;
  pick_type: "moneyline" | "straight";
  market: string;
  player_name: string | null;
  matchup: string | null;
  model_prob: string | null;
  edge: string | null;
  result: string | null;
};

function renderResultTag(result: string | null) {
  if (!result) return null;

  const map: Record<string, { label: string; color: string }> = {
    win: { label: "WIN", color: "green" },
    loss: { label: "LOSS", color: "red" },
    void: { label: "VOID", color: "default" },
  };

  const config = map[result];

  if (!config) return null;

  return (
    <Tag color={config.color} style={{ marginLeft: 8 }}>
      {config.label}
    </Tag>
  );
}

export function FreePicksCard({
  picks,
  date,
}: {
  picks: FreePick[];
  date?: string;
}) {
  const moneylines = picks.filter((p) => p.pick_type === "moneyline");
  const props = picks.filter((p) => p.pick_type === "straight");
  const formattedDate = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Today";



  return (
    <Card
      style={{ maxWidth: 520 }}
      title={<Title level={4}>📊 Free Picks — {formattedDate}</Title>}
    >
      {moneylines.length > 0 && (
        <>
          <Title level={5}>🏀 Moneyline</Title>
          <List
            dataSource={moneylines}
            renderItem={(pick) => (
              <List.Item>
                <Space orientation="vertical">
                  <Text strong>
                    {pick.display_text} {renderResultTag(pick.result)}
                  </Text>

                  {pick.model_prob && pick.edge && (
                    <Text type="secondary">
                      {(Number(pick.model_prob) * 100).toFixed(1)}% model prob ·{" "}
                      <Tag color="green">
                        +{(Number(pick.edge) * 100).toFixed(1)}% edge
                      </Tag>
                    </Text>
                  )}
                </Space>
              </List.Item>
            )}
          />
          <Divider />
        </>
      )}

      <Title level={5}>📈 Player Props</Title>
      <List
        dataSource={props}
        renderItem={(pick) => (
          <List.Item>
            <Text>
              {pick.display_text} {renderResultTag(pick.result)}
            </Text>
          </List.Item>
        )}
      />

      <Divider />

      <Text type="secondary" style={{ fontSize: 12 }}>
        For entertainment purposes only. No guarantees. Always bet responsibly.
      </Text>
    </Card>
  );
}
