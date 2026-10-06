import type { CaseDescription } from "./suite.ts";

/** Reader-facing groups for the linear growth benchmark page, in display order. */
export const linearGroups = [
  {
    id: "defaults",
    title: "Default settings",
    intro:
      "`fit(history)` against `Prophet().fit(df)` with no options on either side. Each library decides on its own which seasonal patterns to use.",
  },
  {
    id: "trend",
    title: "Trends and changepoints",
    intro:
      "Straight-line and bending trends with automatic or hand-picked changepoints, plus unsorted rows, repeated timestamps and both target scalings.",
  },
  {
    id: "features",
    title: "Seasonality, events and regressors",
    intro:
      "Custom and switchable seasonal patterns, events with windows, extra regressors, and additive and multiplicative effects mixed together.",
  },
  {
    id: "uncertainty",
    title: "Uncertainty ranges",
    intro:
      "Both libraries simulate possible futures with random draws, so individual simulated values never match. Each range must still match Python's within the variation expected from that many draws.",
  },
  {
    id: "evaluation",
    title: "Cross-validation and choosing settings",
    intro:
      "Rolling-origin cross-validation, metrics, baselines, settings search and a final holdout check.",
  },
  {
    id: "differences",
    title: "Intentional differences",
    intro:
      "Inputs where we deliberately behave differently from Python Prophet. These cases are expected to fail the comparison.",
  },
] as const;

const trainingRows =
  "96 daily rows with a slope change. Effect and Python fit the same rows; prediction covers 8 days.";

/** One entry per benchmarked case ID. The site build fails if a run contains a case without one. */
export const linearCaseDescriptions = {
  "linear-defaults-small": {
    group: "defaults",
    title: "Defaults, one month of daily data",
    summary: "32 days of history. Weekly seasonality switches on automatically.",
  },
  "linear-defaults-medium": {
    group: "defaults",
    title: "Defaults, eight months of daily data",
    summary:
      "256 days of history. Over 100 rows, so both libraries fit with L-BFGS instead of Newton.",
  },
  "linear-defaults-irregular": {
    group: "defaults",
    title: "Defaults, irregular dates",
    summary: "192 rows spread unevenly over 228 days with two real trend breaks.",
  },
  "fixed-linear-prediction-medium": {
    group: "trend",
    title: "Predicting from a known straight line",
    summary:
      "No fitting: both libraries evaluate the same stored line on 64 dates. Checks the prediction math on its own.",
  },
  "map-explicit-break-small": {
    group: "trend",
    title: "One hand-picked changepoint",
    summary: "32 daily rows with a changepoint on 13 January and a looser prior scale of 0.2.",
  },
  "map-training-ordered-explicit": {
    group: "trend",
    title: "Sorted rows, hand-picked changepoint",
    summary: trainingRows,
  },
  "map-training-ordered-auto": {
    group: "trend",
    title: "Sorted rows, automatic changepoints",
    summary: trainingRows,
  },
  "map-training-unsorted-explicit": {
    group: "trend",
    title: "Shuffled rows, hand-picked changepoint",
    summary: "The same history in a scrambled order. Both libraries must sort it the same way.",
  },
  "map-training-unsorted-auto": {
    group: "trend",
    title: "Shuffled rows, automatic changepoints",
    summary:
      "Scrambled order with automatic changepoints, whose positions depend on the sorted rows.",
  },
  "map-training-duplicates-explicit": {
    group: "trend",
    title: "Repeated timestamps, hand-picked changepoint",
    summary:
      "Some dates appear several times with different values. Every row counts as its own measurement.",
  },
  "map-training-duplicates-auto": {
    group: "trend",
    title: "Repeated timestamps, automatic changepoints",
    summary: "Repeated dates also repeat the automatic changepoint candidates, as in Prophet.",
  },
  "linear-offset-scaling-absmax": {
    group: "trend",
    title: "Values far from zero, absmax scaling",
    summary: "96 daily rows offset well above zero, with weekly seasonality and one changepoint.",
  },
  "linear-offset-scaling-minmax": {
    group: "trend",
    title: "Values far from zero, minmax scaling",
    summary: "The same data scaled to the 0–1 range using its minimum and maximum.",
  },
  "map-seasonal-breaks-irregular-medium": {
    group: "features",
    title: "Weekly pattern on irregular dates",
    summary: "192 unevenly spaced rows with a custom weekly seasonality and two changepoints.",
  },
  "map-conditional-seasonalities-medium": {
    group: "features",
    title: "Two switchable weekly patterns",
    summary: "256 daily rows. One weekly pattern applies on dense days, another on sparse days.",
  },
  "map-events-small": {
    group: "features",
    title: "Events with windows",
    summary: "96 daily rows with six event dates, including days before and after each one.",
  },
  "map-regressors-medium": {
    group: "features",
    title: "Four regressors",
    summary:
      "256 daily rows with a yes/no regressor and three numeric ones, each standardized differently.",
  },
  "map-mixed-features-explicit-small": {
    group: "features",
    title: "Everything at once, small",
    summary:
      "24 rows with a switchable weekly pattern, a three-day cycle, an event and a regressor.",
  },
  "map-mixed-features-automatic-large": {
    group: "features",
    title: "Everything at once, two years",
    summary:
      "768 daily rows with automatic changepoints, two seasonal patterns, six events and four regressors.",
  },
  "linear-mixed-components": {
    group: "features",
    title: "Additive and multiplicative together",
    summary:
      "A multiplicative switchable weekly pattern with an additive event and regressor, on 96 daily rows.",
  },
  "map-training-duplicate-features-auto": {
    group: "features",
    title: "Repeated timestamps with features",
    summary: "Repeated dates whose regressor and condition values differ from row to row.",
  },
  "uncertainty-linear-defaults-long-history-intervals-1000": {
    group: "uncertainty",
    title: "Defaults, three years of ranges",
    summary:
      "80% ranges from 1,000 simulated paths, Python's default, on all 1,460 past and future dates of a three-year daily history.",
  },
  "uncertainty-linear-defaults-irregular-intervals-1000": {
    group: "uncertainty",
    title: "Defaults, ranges on irregular dates",
    summary:
      "80% ranges from 1,000 simulated paths on the unevenly spaced history and its 48 forecast dates.",
  },
  "uncertainty-training-duplicates-auto": {
    group: "uncertainty",
    title: "Samples with repeated timestamps",
    summary: "128 simulated futures from a model fitted on rows with repeated dates.",
  },
  "uncertainty-linear-offset-scaling-absmax-historical-intervals-128": {
    group: "uncertainty",
    title: "Ranges over past dates",
    summary: "80% ranges from 128 simulated paths on 8 dates inside the history.",
  },
  "uncertainty-linear-offset-scaling-absmax-one-future-samples-128": {
    group: "uncertainty",
    title: "Samples for one future date",
    summary: "128 raw simulated values for a single date after the history.",
  },
  "uncertainty-linear-mixed-components-mixed-intervals-128": {
    group: "uncertainty",
    title: "Ranges with mixed effects",
    summary:
      "80% ranges on past and future dates for a model with multiplicative and additive pieces.",
  },
  "uncertainty-linear-mixed-components-mixed-samples-512": {
    group: "uncertainty",
    title: "Samples with mixed effects",
    summary: "512 raw simulated values per date for the same mixed model.",
  },
  "evaluation-linear-point": {
    group: "evaluation",
    title: "Cross-validation and metrics",
    summary: "Two rolling cutoffs, a 7-day horizon, all metrics and a baseline comparison.",
  },
  "evaluation-linear-intervals": {
    group: "evaluation",
    title: "Cross-validation with ranges",
    summary: "The same folds with 64 simulated futures per fold for interval coverage.",
  },
  "evaluation-linear-search": {
    group: "evaluation",
    title: "Choosing settings and a final holdout",
    summary: "Two candidate settings compared on the same folds, then a one-time holdout check.",
  },
  "evaluation-linear-failure-search": {
    group: "evaluation",
    title: "Search with a failing candidate",
    summary:
      "Three candidates, one of which is designed to fail. The search records it and continues.",
  },
  "evaluation-training-duplicates": {
    group: "evaluation",
    title: "Cross-validation with repeated timestamps",
    summary: "Folds over rows with repeated dates. Each repeated row is scored separately.",
  },
  "map-training-zero-span-linear-varied": {
    group: "differences",
    title: "Every row on the same date, different values",
    summary:
      "Three rows sharing one timestamp. A trend over zero time is undefined. Python Prophet's optimizer crashes on a NaN starting value; we return a FittingError before fitting.",
    outcomes: { effect: "FittingError", python: "Optimizer crash" },
  },
  "map-training-zero-span-linear-constant": {
    group: "differences",
    title: "Every row on the same date, same value",
    summary:
      "Three identical rows. Python Prophet reports success but forecasts NaN; we return a FittingError instead.",
    outcomes: { effect: "FittingError", python: "NaN forecast" },
  },
} satisfies Record<string, CaseDescription>;
