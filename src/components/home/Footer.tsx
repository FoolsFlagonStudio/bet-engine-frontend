import { Typography, Space } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-inner">
        <Space
          orientation="horizontal"
          size="large"
          style={{ width: "100%", justifyContent: "space-between" }}
          wrap
        >
          {/* Brand */}
          <Space orientation="vertical" size={4}>
            <Text strong style={{ fontSize: 16 }}>
              EdgeForge
            </Text>
            <Text type="secondary">Model-driven sports betting analytics.</Text>
          </Space>

          {/* Links */}
          <Space orientation="vertical" size={6}>
            <Link to="/pricing">
              <Text className="footer-link">Pricing</Text>
            </Link>

            <Link to="/privacy">
              <Text className="footer-link">Privacy Policy</Text>
            </Link>

            <Link to="/terms">
              <Text className="footer-link">Terms of Service</Text>
            </Link>

            <Link to="/disclaimer">
              <Text className="footer-link">Disclaimer</Text>
            </Link>
          </Space>

          {/* Legal */}
          <Space orientation="vertical" size={2}>
            <Text type="secondary">© {new Date().getFullYear()} EdgeForge</Text>
            <Text type="secondary">For entertainment purposes only.</Text>
            <Text type="secondary">No guarantees. Bet responsibly.</Text>
          </Space>
        </Space>
      </div>
    </div>
  );
}
