import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <div className="home-header">
      <Title level={4} style={{ margin: 0 }}>
        EdgeForge
      </Title>

      <Space>
        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Space>
    </div>
  );
}
