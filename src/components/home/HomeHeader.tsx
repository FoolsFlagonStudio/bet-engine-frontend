import { Button, Space, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <div className="home-header">
      <Title
        level={4}
        style={{ margin: 0, cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        EdgeForge
      </Title>

      <Space>
        <Link to="/pricing">
          <Button type="text"
          className="ant-typography">Pricing</Button>
        </Link>

        <Button type="primary" onClick={() => navigate("/login")}>
          Admin Login
        </Button>
      </Space>
    </div>
  );
}
