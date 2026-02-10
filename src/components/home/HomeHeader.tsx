import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        borderBottom: "1px solid #f0f0f0",
        background: "#fff",
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        Placeholder App Name
      </Title>

      <Space>
        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Space>
    </div>
  );
}
