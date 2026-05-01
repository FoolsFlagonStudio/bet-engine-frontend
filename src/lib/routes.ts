export const API_ROUTES = {
  // --------------------
  // Bets
  // --------------------
  todaysBets: "/api/public/bets/today",

  // --------------------
  // Free Picks
  // --------------------
  freePicks: (date: "today" | "yesterday") => `/api/free-picks?date=${date}`,

  // --------------------
  // Public – Snapshot
  // --------------------
  snapshot: "/api/public/snapshot",

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
  // Analytics – props performance
  // --------------------
  propsBySport: "/api/analytics/props/by-sport",

  // --------------------
  // Analytics – rolling / ROI / top players
  // --------------------
  rolling: (days: number, sport?: string) =>
    `/api/analytics/rolling?days=${days}${sport ? `&sport=${sport}` : ""}`,

  roi: (sport?: string) =>
    `/api/analytics/roi${sport ? `?sport=${sport}` : ""}`,

  topPlayers: (days: number, minSamples?: number, sport?: string) => {
    const params = new URLSearchParams({ days: String(days) });
    if (minSamples != null) params.set("min_samples", String(minSamples));
    if (sport) params.set("sport", sport);
    return `/api/analytics/top-players?${params.toString()}`;
  },

  // --------------------
  // Auth / Billing
  // --------------------
  me: "/api/me",
  billingCheckout: "/api/billing/checkout",
  billingPortal: "/api/billing/portal",

  // --------------------
  // Players
  // --------------------
  playerProfile: (playerId: number) =>
    `/api/public/players/${playerId}/profile`,

  playersSearch: `/api/public/players/search`,
  players: () => `/api/public/players`,
};
