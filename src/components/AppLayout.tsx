import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={220}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
          overflow: "auto",
        }}
      >
        <div style={{ color: "#fff", padding: 16, fontWeight: 600 }}>
          Bet Engine
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/analytics",
              label: <Link to="/analytics">Analytics</Link>,
            },
            { key: "/billing", label: <Link to="/billing">Billing</Link> },
          ]}
        />
      </Sider>

      <Layout style={{ flex: 1 }}>
        <Content className="app-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
