export const API_ROUTES = {
  // --------------------
  // Bets
  // --------------------
  todaysBets: "/api/public/bets/today",

  // --------------------
  // Analytics – system / model
  // --------------------
  moneylineEdgeBuckets: "/api/analytics/moneylines/edge-buckets",
  moneylineCalibration: "/api/analytics/moneylines/calibration",
  moneylineBySport: "/api/analytics/moneylines/by-sport",
  modelTrust: "/api/analytics/model-trust",

  // --------------------
  // Analytics – historical
  // --------------------
  historicalAnalytics: "/api/public/historical/analytics",

  // --------------------
  // Players
  // --------------------
  playerProfile: (playerId: number) =>
    `/api/public/players/${playerId}/profile`,

  playersSearch: `/api/public/players/search`,
  players: () => `/api/public/players`,
};
