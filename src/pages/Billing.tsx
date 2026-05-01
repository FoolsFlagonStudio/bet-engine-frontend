import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Card, Space, Spin, Tag, Typography } from "antd";
import { apiFetch } from "../lib/api";
import { API_ROUTES } from "../lib/routes";

const { Title, Text } = Typography;

interface Subscription {
  status: "active" | "trialing" | "canceled" | "past_due";
  plan_id: string;
  stripe_customer_id: string | null;
  expires_at: string | null;
}

interface MeResponse {
  id: string;
  email: string;
  role: string;
  subscription: Subscription | null;
}

const STATUS_TAG: Record<string, { color: string; label: string }> = {
  active: { color: "green", label: "Active" },
  trialing: { color: "blue", label: "Trial" },
  canceled: { color: "red", label: "Canceled" },
  past_due: { color: "orange", label: "Past Due" },
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Billing() {
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const { data: me, isLoading } = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: () => apiFetch<MeResponse>(API_ROUTES.me),
  });

  const handlePortal = async () => {
    setPortalLoading(true);
    setActionError(null);
    try {
      const { url } = await apiFetch<{ url: string }>(API_ROUTES.billingPortal, {
        method: "POST",
      });
      window.location.href = url;
    } catch (e: unknown) {
      setActionError(e instanceof Error ? e.message : "Something went wrong.");
      setPortalLoading(false);
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setActionError(null);
    try {
      const { url } = await apiFetch<{ url: string }>(API_ROUTES.billingCheckout, {
        method: "POST",
      });
      window.location.href = url;
    } catch (e: unknown) {
      setActionError(e instanceof Error ? e.message : "Something went wrong.");
      setCheckoutLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  const sub = me?.subscription;
  const statusInfo = sub ? STATUS_TAG[sub.status] : null;
  const hasStripeCustomer = !!sub?.stripe_customer_id;
  const isActive = sub?.status === "active" || sub?.status === "trialing";

  return (
    <div style={{ padding: 24, maxWidth: 560 }}>
      <Title level={2}>Billing</Title>

      {actionError && (
        <Alert type="error" message={actionError} style={{ marginBottom: 16 }} />
      )}

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">Plan</Text>
          <div style={{ marginTop: 4 }}>
            <Text strong>{sub ? "EdgeForge Pro" : "No active plan"}</Text>
            {statusInfo && (
              <Tag color={statusInfo.color} style={{ marginLeft: 8 }}>
                {statusInfo.label}
              </Tag>
            )}
          </div>
        </div>

        {sub?.expires_at && (
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary">
              {sub.status === "trialing" ? "Trial ends" : "Renews"}
            </Text>
            <div style={{ marginTop: 4 }}>
              <Text strong>{formatDate(sub.expires_at)}</Text>
            </div>
          </div>
        )}

        <Space direction="vertical" style={{ width: "100%" }}>
          {hasStripeCustomer && (
            <Button block loading={portalLoading} onClick={handlePortal}>
              Manage subscription
            </Button>
          )}
          {!isActive && (
            <Button type="primary" block loading={checkoutLoading} onClick={handleCheckout}>
              {sub?.status === "canceled" || sub?.status === "past_due"
                ? "Reactivate subscription"
                : "Subscribe — $5/month"}
            </Button>
          )}
        </Space>
      </Card>
    </div>
  );
}
