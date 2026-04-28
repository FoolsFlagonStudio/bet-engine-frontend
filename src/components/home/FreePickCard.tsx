import { Card, Typography, Divider, List, Tag, Space } from "antd";
import {
  BarChartOutlined,
  TrophyOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export type FreePicksResponse = {
  date: string;
  count: number;
  picks: FreePick[];
};

export type FreePick = {
  date: string;
  pick_type: "moneyline" | "straight";
  player_name: string | null;
  sport: string;
  result: string | null;
  market: string;
  line: number | null;
  comparator: string | null;
  confidence: number | null;
  tier_label: string | null;
  matchup: string | null;
  pick: string | null;
  implied_prob: number | null;
  model_prob: number | null;
  edge: number | null;
  market_label: string | null;
  display_text: string;
};

function renderResultTag(result: string | null) {
  if (!result) return null;

  const map: Record<string, { label: string; color: string }> = {
    win: { label: "WIN", color: "success" },
    loss: { label: "LOSS", color: "error" },
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

  const hasContent = moneylines.length > 0 || props.length > 0;

  return (
    <Card
      className="card-wrapper"
      title={
        <Space>
          <BarChartOutlined />
          <Title level={4} style={{ margin: 0 }}>
            Free Picks — {formattedDate}
          </Title>
        </Space>
      }
    >
      {!hasContent ? (
        <>
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center", padding: "24px 0" }}
          >
            No picks for this date.
          </Text>
          <Divider />
        </>
      ) : (
        <>
          {moneylines.length > 0 && (
            <>
              <Space style={{ marginBottom: 12 }}>
                <TrophyOutlined />
                <Title level={5} style={{ margin: 0 }}>
                  Moneyline
                </Title>
              </Space>

              <List
                dataSource={moneylines}
                renderItem={(pick) => (
                  <List.Item>
                    <Space direction="vertical" size={2}>
                      <Space>
                        <Tag>{pick.sport}</Tag>
                        <Text strong>
                          {pick.display_text}
                          {renderResultTag(pick.result)}
                        </Text>
                      </Space>

                      {(pick.model_prob != null || pick.implied_prob != null) && (
                        <Text type="secondary">
                          {pick.model_prob != null && (
                            <>{(pick.model_prob * 100).toFixed(1)}% model</>
                          )}
                          {pick.implied_prob != null && (
                            <> · {(pick.implied_prob * 100).toFixed(1)}% implied</>
                          )}
                          {pick.edge != null && (
                            <>
                              {" "}·{" "}
                              <Tag color="green">
                                +{(pick.edge * 100).toFixed(1)}% edge
                              </Tag>
                            </>
                          )}
                        </Text>
                      )}
                    </Space>
                  </List.Item>
                )}
              />
              <Divider />
            </>
          )}

          {props.length > 0 && (
            <>
              <Space style={{ marginBottom: 12 }}>
                <LineChartOutlined />
                <Title level={5} style={{ margin: 0 }}>
                  Player Props
                </Title>
              </Space>

              <List
                dataSource={props}
                renderItem={(pick) => (
                  <List.Item>
                    <Space direction="vertical" size={2}>
                      <Space>
                        <Tag>{pick.sport}</Tag>
                        <Text>
                          {pick.display_text}
                          {renderResultTag(pick.result)}
                        </Text>
                      </Space>
                      {pick.tier_label && (
                        <Tag className={`risk-tag risk-${pick.tier_label}`}>
                          {pick.tier_label}
                        </Tag>
                      )}
                    </Space>
                  </List.Item>
                )}
              />
              <Divider />
            </>
          )}
        </>
      )}

      <Text type="secondary" style={{ fontSize: 12 }}>
        For entertainment purposes only. No guarantees. Always bet responsibly.
      </Text>
    </Card>
  );
}
