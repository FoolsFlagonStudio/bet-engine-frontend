export type PlayerProfileResponse = {
  player_id: number;
  player_name: string;
  trust_score: number | null;
  overall: {
    total_straights: number;
    wins: number;
    win_rate: string;
  };
  markets: {
    [market: string]: {
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
