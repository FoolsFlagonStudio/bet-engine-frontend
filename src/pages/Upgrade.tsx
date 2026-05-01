import { useState } from "react";
import { Button, Card, Space, Typography, Alert } from "antd";
import { apiFetch } from "../lib/api";
import { API_ROUTES } from "../lib/routes";

const { Title, Text } = Typography;

export default function Upgrade() {
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReactivate = async () => {
    setLoadingCheckout(true);
    setError(null);
    try {
      const { url } = await apiFetch<{ url: string }>(API_ROUTES.billingCheckout, {
        method: "POST",
      });
      window.location.href = url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setLoadingCheckout(false);
    }
  };

  const handlePortal = async () => {
    setLoadingPortal(true);
    setError(null);
    try {
      const { url } = await apiFetch<{ url: string }>(API_ROUTES.billingPortal, {
        method: "POST",
      });
      window.location.href = url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setLoadingPortal(false);
    }
  };

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
      <Card style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
        <Title level={2}>Subscription inactive</Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          Your subscription has ended. Reactivate to regain full access to
          EdgeForge Pro.
        </Text>

        {error && (
          <Alert type="error" message={error} style={{ marginBottom: 16 }} />
        )}

        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Button
            type="primary"
            block
            size="large"
            loading={loadingCheckout}
            onClick={handleReactivate}
          >
            Reactivate — $5/month
          </Button>
          <Button
            block
            loading={loadingPortal}
            onClick={handlePortal}
          >
            Manage subscription
          </Button>
        </Space>
      </Card>
    </div>
  );
}
