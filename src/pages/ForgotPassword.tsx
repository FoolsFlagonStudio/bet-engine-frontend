import { useState } from "react";
import { Alert, Button, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const { Title, Text } = Typography;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://edgeforge.co/reset-password",
    });
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="branded-form">
        <Title level={3} style={{ textAlign: "center" }}>
          Check your email
        </Title>
        <Alert
          type="success"
          message="If an account exists for that email, you'll receive a password reset link shortly."
          showIcon
        />
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="branded-form">
      <Title level={3} style={{ textAlign: "center" }}>
        Reset your password
      </Title>

      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Enter your email and we'll send you a reset link.
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Button type="primary" block loading={loading} onClick={handleSubmit}>
        Send reset link
      </Button>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
}
