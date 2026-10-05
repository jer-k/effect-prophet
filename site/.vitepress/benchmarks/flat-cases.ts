import type { CaseDescription } from "./suite.ts";

/** Reader-facing groups for the flat growth benchmark page, in display order. */
export const flatGroups = [
  {
    id: "defaults",
    title: "Default settings",
    intro:
      '`fit(history, { growth: "flat" })` against `Prophet(growth="flat").fit(df)` with nothing else set. Each library decides on its own which seasonal patterns to use.',
  },
  {
    id: "level",
    title: "Steady levels",
    intro:
      "A single constant level with no seasonal patterns: noisy, perfectly constant, below zero, and every row on the same date. Each runs with both target scalings.",
  },
  {
    id: "features",
    title: "Seasonality, events and regressors",
    intro:
      "A switchable multiplicative weekly pattern, an event and a regressor on a flat trend, at full length and cut to the history lengths cross-validation uses.",
  },
  {
    id: "uncertainty",
    title: "Uncertainty ranges",
    intro:
      "Both libraries simulate possible futures with random draws, so individual simulated values never match. These cases compare the point forecast behind the simulation, check that it replays, and time the work.",
  },
  {
    id: "evaluation",
    title: "Cross-validation and choosing settings",
    intro:
      "Rolling-origin cross-validation, metrics, baselines, settings search and a final holdout check on flat models.",
  },
] as const;

const mixed =
  "96 daily rows with a switchable multiplicative weekly pattern, an event and a regressor.";

const prefix = (days: number, scaling: string, length: number): CaseDescription => ({
  group: "features",
  title: `First ${days} days, ${scaling} scaling`,
  summary: `The ${length}-day mixed-feature history cut to its first ${days} days: the training window of one cross-validation fold.`,
});

/** One entry per benchmarked case ID. The site build fails if a run contains a case without one. */
export const flatCaseDescriptions = {
  "flat-defaults-level": {
    group: "defaults",
    title: "Defaults, steady level",
    summary: "96 days hovering around one value. Weekly seasonality switches on automatically.",
  },
  "flat-defaults-seasonal": {
    group: "defaults",
    title: "Defaults, weekly pattern",
    summary: "96 days around one level with a clear weekly rhythm.",
  },
  "flat-defaults-negative": {
    group: "defaults",
    title: "Defaults, negative values",
    summary: "96 days around a level below zero.",
  },
  "flat-level-absmax": {
    group: "level",
    title: "Noisy level, absmax scaling",
    summary: "96 daily rows wobbling slightly around 35.",
  },
  "flat-level-minmax": {
    group: "level",
    title: "Noisy level, minmax scaling",
    summary: "The same rows scaled to the 0–1 range using their minimum and maximum.",
  },
  "flat-constant-absmax": {
    group: "level",
    title: "Perfectly constant, absmax scaling",
    summary: "96 identical values. Both libraries take Prophet's constant-series shortcut.",
  },
  "flat-constant-minmax": {
    group: "level",
    title: "Perfectly constant, minmax scaling",
    summary: "The same identical values, where minmax scaling has no range to divide by.",
  },
  "flat-negative-absmax": {
    group: "level",
    title: "Negative level, absmax scaling",
    summary: "96 daily rows wobbling around −35.",
  },
  "flat-negative-minmax": {
    group: "level",
    title: "Negative level, minmax scaling",
    summary: "The same negative rows with minmax scaling.",
  },
  "map-training-zero-span-flat-varied": {
    group: "level",
    title: "Every row on the same date, different values",
    summary:
      "Three rows sharing one timestamp. A flat trend needs no time range, so both libraries fit it.",
  },
  "map-training-zero-span-flat-constant": {
    group: "level",
    title: "Every row on the same date, same value",
    summary: "Three identical rows on one timestamp.",
  },
  "flat-seasonal-absmax": {
    group: "features",
    title: "Weekly pattern, absmax scaling",
    summary: "96 daily rows around one level with a custom weekly seasonality.",
  },
  "flat-seasonal-minmax": {
    group: "features",
    title: "Weekly pattern, minmax scaling",
    summary: "The same weekly data with minmax scaling.",
  },
  "flat-mixed-components": {
    group: "features",
    title: "Mixed effects, minmax scaling",
    summary: mixed,
  },
  "flat-mixed-components-absmax": {
    group: "features",
    title: "Mixed effects, absmax scaling",
    summary: mixed,
  },
  "flat-mixed-components-large": {
    group: "features",
    title: "Mixed effects, eight months, minmax scaling",
    summary: "The same features on 256 daily rows.",
  },
  "flat-mixed-components-large-absmax": {
    group: "features",
    title: "Mixed effects, eight months, absmax scaling",
    summary: "The same features on 256 daily rows with absmax scaling.",
  },
  "flat-prefix-63-absmax": prefix(63, "absmax", 96),
  "flat-prefix-63-minmax": prefix(63, "minmax", 96),
  "flat-prefix-70-absmax": prefix(70, "absmax", 96),
  "flat-prefix-70-minmax": prefix(70, "minmax", 96),
  "flat-prefix-77-absmax": prefix(77, "absmax", 96),
  "flat-prefix-77-minmax": prefix(77, "minmax", 96),
  "flat-prefix-225-absmax": prefix(225, "absmax", 256),
  "flat-prefix-225-minmax": prefix(225, "minmax", 256),
  "flat-prefix-232-absmax": prefix(232, "absmax", 256),
  "flat-prefix-232-minmax": prefix(232, "minmax", 256),
  "uncertainty-flat-mixed-components-full-intervals-512": {
    group: "uncertainty",
    title: "Ranges with mixed effects",
    summary: "80% ranges from 512 simulated paths for every past and future date.",
  },
  "uncertainty-flat-mixed-components-large-full-samples-128": {
    group: "uncertainty",
    title: "Samples, eight months",
    summary: "128 raw simulated values per date for the 256-day mixed model.",
  },
  "evaluation-flat-mixed-point": {
    group: "evaluation",
    title: "Cross-validation and metrics",
    summary: "Three rolling cutoffs, a 7-day horizon, all metrics and a baseline comparison.",
  },
  "evaluation-flat-mixed-intervals": {
    group: "evaluation",
    title: "Cross-validation with ranges",
    summary: "The same folds with simulated futures per fold for interval coverage.",
  },
  "evaluation-flat-mixed-search": {
    group: "evaluation",
    title: "Choosing settings and a final holdout",
    summary: "Three candidate settings compared on the same folds, then a one-time holdout check.",
  },
  "evaluation-flat-large-point": {
    group: "evaluation",
    title: "Cross-validation, eight months",
    summary: "Two rolling cutoffs on the 256-day history, with rolling-window metrics.",
  },
  "evaluation-flat-large-intervals": {
    group: "evaluation",
    title: "Cross-validation with ranges, eight months",
    summary: "The same long folds with simulated futures for interval coverage.",
  },
} satisfies Record<string, CaseDescription>;
