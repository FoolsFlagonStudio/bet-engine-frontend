import { useState } from "react";
import { Button, Input, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const { Title } = Typography;

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
      style={{
        maxWidth: 400,
        margin: "120px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Admin Login
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
    </div>
  );
}
