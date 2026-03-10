import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function Privacy() {
  return (
    <div className="section">
      <div className="container">
        <Title>Privacy Policy</Title>

        <Paragraph>
          EdgeForge respects your privacy. This policy explains what information
          we collect and how it is used.
        </Paragraph>

        <Title level={4}>Information We Collect</Title>

        <Paragraph>
          When creating an account we may collect your email address. Account
          authentication and management are handled through Supabase.
        </Paragraph>

        <Title level={4}>Payments</Title>

        <Paragraph>
          Payments are processed securely through Stripe. EdgeForge does not
          store or have access to your payment methods.
        </Paragraph>

        <Title level={4}>Third-Party Services</Title>

        <Paragraph>
          EdgeForge relies on third-party infrastructure providers including
          Supabase, Stripe, Vercel, and Render to operate the platform.
        </Paragraph>

        <Title level={4}>Contact</Title>

        <Paragraph>
          For privacy questions please contact support@edgeforge.co.
        </Paragraph>
      </div>
    </div>
  );
}