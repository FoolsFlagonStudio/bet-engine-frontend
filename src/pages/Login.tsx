import { useState } from "react";
import { Button, Input, Typography, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="branded-form"
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Login
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Button type="primary" block loading={loading} onClick={handleLogin}>
        Login
      </Button>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>

      <div style={{ marginTop: 8, textAlign: "center" }}>
        <Text type="secondary">Don't have an account? </Text>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
}
