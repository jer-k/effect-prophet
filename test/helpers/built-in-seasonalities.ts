/** Explicit no-built-in configuration for tests that intentionally exercise featureless/OLS or custom-only models. */
export const builtInSeasonalitiesOff = Object.freeze({
  daily: "off",
  weekly: "off",
  yearly: "off",
} as const);
