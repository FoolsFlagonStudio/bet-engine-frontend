export type PlayerProfileResponse = {
  player_id: number;
  player_name: string;
  trust_score: number | null;
  overall: {
    total_straights: number;
    base_total: number;
    combo_total: number;
    wins: number;
    win_rate: string;
  };
  markets: {
    [market: string]: {
      label: string;
      group: "base" | "combo";
      total: number;
      wins: number;
      win_rate: string;
      lines: {
        line: number;
        total: number;
        wins: number;
        win_rate: string;
      }[];
    };
  };
};
