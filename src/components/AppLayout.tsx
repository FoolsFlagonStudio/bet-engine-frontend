import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

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
          display: "flex",
          flexDirection: "column",
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
            {
              key: "/billing",
              label: <Link to="/billing">Billing</Link>,
            },
          ]}
        />

        <div style={{ marginTop: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: "logout",
                label: "Logout",
                danger: true,
                onClick: handleLogout,
              },
            ]}
          />
        </div>
      </Sider>

      <Layout style={{ flex: 1 }}>
        <Content className="app-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
