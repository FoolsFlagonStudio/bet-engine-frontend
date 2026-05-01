import { useState } from "react";
import { Alert, Button, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const { Title, Text } = Typography;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleRegister = async () => {
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: "https://edgeforge.co/subscribe" },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="branded-form">
        <Title level={3} style={{ textAlign: "center" }}>
          Check your email
        </Title>
        <Alert
          type="success"
          message="Confirmation email sent"
          description="Click the link in your email to confirm your account and start your free trial."
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
        Create an account
      </Title>

      {error && (
        <Alert type="error" message={error} style={{ marginBottom: 16 }} />
      )}

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <Input.Password
        placeholder="Password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <Input.Password
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Button type="primary" block loading={loading} onClick={handleRegister}>
        Sign up
      </Button>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Text type="secondary">Already have an account? </Text>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}
