import type { CaseDescription } from "./suite.ts";

/** Reader-facing groups for the logistic growth benchmark page, in display order. */
export const logisticGroups = [
  {
    id: "defaults",
    title: "Default settings",
    intro:
      '`fit(history, { growth: "logistic" })` against `Prophet(growth="logistic").fit(df)` with nothing else set. Each library decides on its own which seasonal patterns, changepoints and optimizer to use.',
  },
  {
    id: "trend",
    title: "Growth curves and changepoints",
    intro:
      "An S-shaped curve rising toward a slowly changing ceiling, with no changepoints, one hand-picked changepoint or automatic ones, under both target scalings. Three cases sit either side of 100 rows, where both libraries switch from Newton to L-BFGS.",
  },
  {
    id: "bounds",
    title: "Floors and ceilings",
    intro:
      "Histories with an explicit floor as well as a ceiling, both changing over time. Values are measured from the floor, as in Prophet.",
  },
  {
    id: "features",
    title: "Seasonality, events and regressors",
    intro:
      "Each supported effect on its own, then all of them together: a weekly pattern, a switchable weekly pattern, an event with a window, and additive and multiplicative regressors.",
  },
  {
    id: "data",
    title: "Unusual data",
    intro:
      "Shuffled rows, repeated dates, a falling curve, a curve pinned at its ceiling, a perfectly constant series and values outside the bounds.",
  },
  {
    id: "uncertainty",
    title: "Uncertainty ranges",
    intro:
      "Both libraries simulate possible futures with random draws, so individual simulated values never match. These cases compare the fitted model behind the simulation and time the work.",
  },
  {
    id: "evaluation",
    title: "Cross-validation and choosing settings",
    intro:
      "Rolling-origin cross-validation, metrics, baselines, settings search and a final holdout check on logistic models.",
  },
] as const;

const basic =
  "96 daily rows rising toward a ceiling of about 100, with a little noise. Prediction covers the history and 24 more days.";

const older =
  "96 daily rows rising toward a ceiling of about 60, with a custom weekly pattern and one changepoint.";

const scaled = (scaling: "absmax" | "minmax", detail: string): string =>
  `${detail} ${scaling === "absmax" ? "Values are divided by their largest distance from the floor." : "Values are scaled between the lowest floor and the highest ceiling."}`;

/** One entry per benchmarked case ID. The site build fails if a run contains a case without one. */
export const logisticCaseDescriptions = {
  "logistic-reconcile-defaults-96": {
    group: "defaults",
    title: "Defaults, three months of daily data",
    summary:
      "96 days with a weekly pattern. Weekly seasonality and 25 automatic changepoints switch on by default.",
  },
  "logistic-reconcile-defaults-256": {
    group: "defaults",
    title: "Defaults, eight months of daily data",
    summary: "256 days with a weekly pattern. Over 100 rows, so both libraries fit with L-BFGS.",
  },
  "logistic-reconcile-basic-96-empty-absmax": {
    group: "trend",
    title: "No changepoints, absmax scaling",
    summary: scaled("absmax", `${basic} The curve's rate never changes.`),
  },
  "logistic-reconcile-basic-96-explicit-absmax": {
    group: "trend",
    title: "One hand-picked changepoint, absmax scaling",
    summary: scaled("absmax", `${basic} The rate may change on 8 February.`),
  },
  "logistic-reconcile-basic-96-auto-absmax": {
    group: "trend",
    title: "Three automatic changepoints, absmax scaling",
    summary: scaled(
      "absmax",
      `${basic} Changepoints are spread over the first 80% of the history.`,
    ),
  },
  "logistic-reconcile-basic-96-empty-minmax": {
    group: "trend",
    title: "No changepoints, minmax scaling",
    summary: scaled("minmax", `${basic} The curve's rate never changes.`),
  },
  "logistic-reconcile-basic-96-explicit-minmax": {
    group: "trend",
    title: "One hand-picked changepoint, minmax scaling",
    summary: scaled("minmax", `${basic} The rate may change on 8 February.`),
  },
  "logistic-reconcile-basic-96-auto-minmax": {
    group: "trend",
    title: "Three automatic changepoints, minmax scaling",
    summary: scaled(
      "minmax",
      `${basic} Changepoints are spread over the first 80% of the history.`,
    ),
  },
  "logistic-reconcile-empty-loose-prior-absmax": {
    group: "trend",
    title: "No changepoints, loose prior, absmax scaling",
    summary:
      "No changepoints but a changepoint prior scale of 10. Prophet adds a hidden placeholder changepoint here; the forecasts must still agree.",
  },
  "logistic-reconcile-empty-loose-prior-minmax": {
    group: "trend",
    title: "No changepoints, loose prior, minmax scaling",
    summary: "The same loose-prior fit, scaled between the lowest floor and the highest ceiling.",
  },
  "logistic-reconcile-basic-99": {
    group: "trend",
    title: "99 rows: just under the optimizer switch",
    summary: "One row short of 100, so both libraries fit with Newton's method.",
  },
  "logistic-reconcile-basic-100": {
    group: "trend",
    title: "100 rows: just over the optimizer switch",
    summary: "Exactly 100 rows, so both libraries switch to L-BFGS.",
  },
  "logistic-reconcile-basic-256": {
    group: "trend",
    title: "Eight months of daily data",
    summary: "256 daily rows on the same curve, fitted with L-BFGS.",
  },
  "logistic-implicit-floor-absmax": {
    group: "trend",
    title: "Weekly pattern, absmax scaling",
    summary: scaled("absmax", older),
  },
  "logistic-implicit-floor-minmax": {
    group: "trend",
    title: "Weekly pattern, minmax scaling",
    summary: scaled("minmax", older),
  },
  "logistic-implicit-floor-auto-changepoints": {
    group: "trend",
    title: "Weekly pattern, automatic changepoints",
    summary: "The same history with two automatic changepoints instead of a hand-picked one.",
  },
  "logistic-implicit-floor-large": {
    group: "trend",
    title: "Weekly pattern, eight months",
    summary: "256 daily rows approaching the ceiling, with 64 days of forecast.",
  },
  "logistic-reconcile-explicit-floor-absmax": {
    group: "bounds",
    title: "Explicit floor, absmax scaling",
    summary: "96 daily rows between a floor of about 12 and a ceiling of about 100.",
  },
  "logistic-reconcile-explicit-floor-minmax": {
    group: "bounds",
    title: "Explicit floor, minmax scaling",
    summary: "The same bounds, scaled between the lowest floor and the highest ceiling.",
  },
  "logistic-explicit-floor-absmax": {
    group: "bounds",
    title: "Explicit floor with a regressor, absmax scaling",
    summary:
      "96 daily rows between a floor of about 12 and a ceiling of about 60, with a weekly pattern and a multiplicative promotion regressor.",
  },
  "logistic-explicit-floor-minmax": {
    group: "bounds",
    title: "Explicit floor with a regressor, minmax scaling",
    summary: "The same floor, regressor and weekly pattern under minmax scaling.",
  },
  "logistic-reconcile-weekly": {
    group: "features",
    title: "Weekly pattern",
    summary: "A custom weekly seasonality on the basic curve.",
  },
  "logistic-reconcile-conditional": {
    group: "features",
    title: "Switchable weekly pattern",
    summary: "A weekly pattern that only applies on rows marked active.",
  },
  "logistic-reconcile-event": {
    group: "features",
    title: "Event with a window",
    summary: "A campaign on two dates, each affecting the day before and the day after too.",
  },
  "logistic-reconcile-regressor-additive": {
    group: "features",
    title: "Additive regressor",
    summary: "A promotion regressor that adds to the forecast.",
  },
  "logistic-reconcile-regressor-multiplicative": {
    group: "features",
    title: "Multiplicative regressor",
    summary: "A promotion regressor that scales the trend.",
  },
  "logistic-reconcile-mixed-absmax": {
    group: "features",
    title: "Everything at once, absmax scaling",
    summary:
      "A switchable weekly pattern, a campaign event and a multiplicative regressor between an explicit floor and ceiling.",
  },
  "logistic-reconcile-mixed-minmax": {
    group: "features",
    title: "Everything at once, minmax scaling",
    summary: "The same combination, scaled between the lowest floor and the highest ceiling.",
  },
  "logistic-reconcile-unsorted": {
    group: "data",
    title: "Shuffled rows",
    summary: "The basic history in a scrambled order. Both libraries must sort it the same way.",
  },
  "logistic-reconcile-duplicates": {
    group: "data",
    title: "Repeated dates",
    summary:
      "96 rows over 48 dates, each appearing twice with different values. Every row counts as its own measurement.",
  },
  "logistic-reconcile-declining": {
    group: "data",
    title: "Falling curve",
    summary: "Values fall from about 86 to 11 under a fixed ceiling.",
  },
  "logistic-reconcile-saturated": {
    group: "data",
    title: "Pinned at the ceiling",
    summary: "Starts near zero and spends its last third at or above the ceiling.",
  },
  "logistic-reconcile-constant": {
    group: "data",
    title: "Perfectly constant",
    summary: "Every value is exactly 50, halfway to the ceiling.",
  },
  "logistic-reconcile-out-of-bounds": {
    group: "data",
    title: "Values outside the bounds",
    summary: "Noisy targets that go below zero and above the ceiling.",
  },
  "uncertainty-logistic-implicit-floor-minmax-full-samples-512": {
    group: "uncertainty",
    title: "Samples, weekly pattern",
    summary: "512 raw simulated values per date over the history and forecast.",
  },
  "uncertainty-logistic-implicit-floor-large-full-intervals-128": {
    group: "uncertainty",
    title: "Ranges, eight months",
    summary: "80% ranges from 128 simulated paths on the 256-day history and 64 forecast days.",
  },
  "uncertainty-logistic-explicit-floor-minmax-full-intervals-512": {
    group: "uncertainty",
    title: "Ranges with an explicit floor",
    summary: "80% ranges from 512 simulated paths for a model bounded by a floor and ceiling.",
  },
  "uncertainty-logistic-explicit-floor-minmax-full-samples-128": {
    group: "uncertainty",
    title: "Samples with an explicit floor",
    summary: "128 raw simulated values per date for the same bounded model.",
  },
  "uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128": {
    group: "uncertainty",
    title: "Ranges with mixed effects",
    summary:
      "80% ranges for a bounded model with a switchable weekly pattern, events and a regressor.",
  },
  "uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128": {
    group: "uncertainty",
    title: "Samples with mixed effects",
    summary: "128 raw simulated values per date for the same mixed model.",
  },
  "evaluation-logistic-point": {
    group: "evaluation",
    title: "Cross-validation and metrics",
    summary: "One cutoff, a 7-day horizon, all metrics and a baseline comparison.",
  },
  "evaluation-logistic-intervals": {
    group: "evaluation",
    title: "Cross-validation with ranges",
    summary: "The same fold with 256 simulated futures for interval coverage.",
  },
  "evaluation-logistic-search": {
    group: "evaluation",
    title: "Choosing settings and a final holdout",
    summary: "Two candidate settings compared on the same fold, then a one-time holdout check.",
  },
  "evaluation-logistic-large-point": {
    group: "evaluation",
    title: "Cross-validation, eight months",
    summary: "Two rolling cutoffs on the 256-day history, with rolling-window metrics.",
  },
  "evaluation-logistic-large-intervals": {
    group: "evaluation",
    title: "Cross-validation with ranges, eight months",
    summary: "The same long folds with simulated futures for interval coverage.",
  },
} satisfies Record<string, CaseDescription>;
