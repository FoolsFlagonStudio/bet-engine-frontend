import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, List, Typography, Alert } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { supabase } from "../lib/supabase";
import { apiFetch } from "../lib/api";
import { API_ROUTES } from "../lib/routes";

const { Title, Text } = Typography;

const FEATURES = [
  "Full NBA, MLB & NHL analytics dashboard",
  "Daily model-driven prop picks",
  "Moneyline edge analysis",
  "Player performance tracking",
  "Historical win rate data",
];

export default function Subscribe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/login", { replace: true });
      else setCheckingAuth(false);
    });
  }, [navigate]);

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await apiFetch<{ url: string }>(
        API_ROUTES.billingCheckout,
        {
          method: "POST",
        },
      );
      window.location.href = url;
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  if (checkingAuth) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Card style={{ maxWidth: 440, width: "100%" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 4 }}>
          EdgeForge Pro
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          Start your 3-day free trial — $5/month after
        </Text>

        {error && (
          <Alert type="error" message={error} style={{ marginBottom: 16 }} />
        )}

        <List
          dataSource={FEATURES}
          renderItem={(item) => (
            <List.Item style={{ border: "none", padding: "6px 0" }}>
              <CheckCircleOutlined
                style={{ color: "#52c41a", marginRight: 8 }}
              />
              {item}
            </List.Item>
          )}
          style={{ marginBottom: 24 }}
        />

        <Button
          type="primary"
          block
          size="large"
          loading={loading}
          onClick={handleSubscribe}
        >
          Start free trial
        </Button>

        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: 12,
            fontSize: 12,
          }}
        >
          No charge during your 3-day trial. Cancel anytime.
        </Text>
      </Card>
    </div>
  );
}
