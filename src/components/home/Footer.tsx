import { Typography, Space } from "antd";

const { Text } = Typography;

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-inner">
        <Space
          direction="horizontal"
          size="large"
          style={{ width: "100%", justifyContent: "space-between" }}
          wrap
        >
          {/* Brand */}
          <Space direction="vertical" size={4}>
            <Text strong style={{ fontSize: 16 }}>
              EdgeForge
            </Text>
            <Text type="secondary">Model-driven sports betting analytics.</Text>
          </Space>

          {/* Links */}
          {/* <Space direction="vertical" size={6}>
            <Text className="footer-link">Free Picks</Text>
            <Text className="footer-link">How It Works</Text>
            <Text className="footer-link">Transparency</Text>
            <Text className="footer-link">Coming Soon</Text>
            <Text className="footer-link">Login</Text>
          </Space> */}

          {/* Legal */}
          <Space direction="vertical" size={2}>
            <Text type="secondary">© {new Date().getFullYear()} EdgeForge</Text>
            <Text type="secondary">For entertainment purposes only.</Text>
            <Text type="secondary">No guarantees. Bet responsibly.</Text>
          </Space>
        </Space>
      </div>
    </div>
  );
}
