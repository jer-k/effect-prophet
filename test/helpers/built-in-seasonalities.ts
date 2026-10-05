/** Explicit no-built-in configuration for featureless MAP or custom-only model tests. */
export const builtInSeasonalitiesOff = Object.freeze({
  daily: "off",
  weekly: "off",
  yearly: "off",
} as const);
