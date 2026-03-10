import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function Disclaimer() {
  return (
    <div className="section">
      <div className="container">
        <Title>Disclaimer</Title>

        <Paragraph>
          EdgeForge provides sports analytics and statistical modeling related
          to sports betting markets.
        </Paragraph>

        <Paragraph>
          All picks, projections, and model outputs are for informational and
          entertainment purposes only. No guarantees of accuracy or profitability
          are made.
        </Paragraph>

        <Paragraph>
          EdgeForge does not operate a sportsbook and does not accept wagers.
        </Paragraph>

        <Paragraph>
          If you or someone you know has a gambling problem, please contact
          1-800-GAMBLER or your local responsible gaming resource.
        </Paragraph>
      </div>
    </div>
  );
}