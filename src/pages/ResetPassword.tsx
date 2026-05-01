import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./../lib/supabase";
import { Alert, Button, Input, Typography } from "antd";

const { Title, Text } = Typography;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // onAuthStateChange reliably detects the PASSWORD_RECOVERY event from the URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    // Also handle the case where the session is already established (e.g. page refresh)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  if (!ready) return null;

  return (
    <div className="branded-form">
      <Title level={3} style={{ textAlign: "center" }}>
        Set new password
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Choose a new password for your account.
      </Text>

      {error && (
        <Alert type="error" message={error} style={{ marginBottom: 16 }} />
      )}
      {success && (
        <Alert
          type="success"
          message="Password updated! Redirecting to login..."
          style={{ marginBottom: 16 }}
        />
      )}

      <Input.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password (min 8 characters)"
        style={{ marginBottom: 16 }}
        disabled={success}
      />

      <Button
        type="primary"
        block
        loading={loading}
        onClick={handleUpdate}
        disabled={success}
      >
        Set password
      </Button>
    </div>
  );
}
