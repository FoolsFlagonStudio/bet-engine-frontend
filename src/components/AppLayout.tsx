import { useState } from "react";
import { Layout, Menu, Drawer, Button, Grid, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { supabase } from "../lib/supabase";

const { Sider, Content, Header } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const navItems = (handleLogout: () => void, closeDrawer?: () => void) => [
  {
    key: "/dashboard",
    label: <Link to="/dashboard" onClick={closeDrawer}>Dashboard</Link>,
  },
  {
    key: "/analytics",
    label: <Link to="/analytics" onClick={closeDrawer}>Analytics</Link>,
  },
  {
    key: "/billing",
    label: <Link to="/billing" onClick={closeDrawer}>Billing</Link>,
  },
  {
    key: "logout",
    label: "Logout",
    danger: true,
    onClick: handleLogout,
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = !screens.md;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navMenu = (closeDrawer?: () => void) => (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={navItems(handleLogout, closeDrawer)}
      style={{ background: "transparent", border: "none" }}
    />
  );

  if (isMobile) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          className="mobile-header"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            padding: 0,
            height: 56,
            lineHeight: "56px",
          }}
        >
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "#fff", fontSize: 20 }} />}
            onClick={() => setDrawerOpen(true)}
            style={{ marginLeft: 8 }}
          />
          <Text strong style={{ color: "#fff", fontSize: 16, marginLeft: 8 }}>
            EdgeForge
          </Text>
        </Header>

        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={240}
          styles={{
            body: { padding: 0, background: "var(--bg-nav)" },
            header: { background: "var(--bg-nav)", borderBottom: "1px solid var(--border-subtle)" },
          }}
          title={
            <Text strong style={{ color: "#fff" }}>
              EdgeForge
            </Text>
          }
          closeIcon={<span style={{ color: "var(--muted-text)" }}>✕</span>}
        >
          {navMenu(() => setDrawerOpen(false))}
        </Drawer>

        <Content className="app-content">{children}</Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="sider">
        <div style={{ color: "#fff", padding: 16, fontWeight: 600 }}>
          EdgeForge
        </div>
        {navMenu()}
      </Sider>

      <Layout style={{ flex: 1 }}>
        <Content className="app-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
