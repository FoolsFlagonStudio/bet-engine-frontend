import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function Terms() {
  return (
    <div className="section">
      <div className="container">
        <Title>Terms of Service</Title>

        <Paragraph>
          By using EdgeForge you agree to the following terms.
        </Paragraph>

        <Title level={4}>Service Description</Title>

        <Paragraph>
          EdgeForge provides model-driven sports analytics and statistical
          insights related to sports betting markets.
        </Paragraph>

        <Title level={4}>No Guarantees</Title>

        <Paragraph>
          All information provided by EdgeForge is for informational and
          entertainment purposes only. EdgeForge does not guarantee outcomes,
          winnings, or profitability.
        </Paragraph>

        <Title level={4}>User Responsibility</Title>

        <Paragraph>
          Users are responsible for their own betting decisions and must comply
          with all applicable laws in their jurisdiction.
        </Paragraph>

        <Title level={4}>Account Access</Title>

        <Paragraph>
          Accounts may be created using an email address. Authentication and
          account management are handled through Supabase.
        </Paragraph>
      </div>
    </div>
  );
}