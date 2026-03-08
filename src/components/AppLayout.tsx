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
      <Sider className="sider">
        <div style={{ color: "#fff", padding: 16, fontWeight: 600 }}>
          EdgeForge
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
