import { useState, useEffect } from "react";
import { supabase } from "./../lib/supabase";
import { Button, Input, Typography } from "antd";

const { Title, Text } = Typography;

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // This initializes the recovery session from the URL hash
    supabase.auth.getSession().then(() => {
      setReady(true);
    });
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Password set successfully. You can now log in.");
    }
  };

  if (!ready) return null;

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <Title level={3}>Set Password</Title>
      <Text>Choose a password for your account.</Text>

      <Input.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        style={{ marginTop: 16 }}
      />

      <Button
        type="primary"
        block
        loading={loading}
        onClick={handleUpdate}
        style={{ marginTop: 16 }}
      >
        Set Password
      </Button>
    </div>
  );
}
