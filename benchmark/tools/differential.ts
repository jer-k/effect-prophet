import { Schema } from "effect";

import { BenchmarkDatasetSchema, MapWorkloadSchema, type BenchmarkDataset } from "./case.ts";
import { compareForecast, emptyDifferences, type QuantityDifferences } from "./report.ts";
import { ForecastProjectionSchema, type ForecastProjection } from "./result.ts";

const NonNegativeFinite = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** One generated input, replayable on its own from `seed`. */
export const DifferentialCaseSchema = Schema.Struct({
  id: Schema.String,
  seed: Schema.Int,
  traits: Schema.Array(Schema.String),
  workload: MapWorkloadSchema,
  dataset: BenchmarkDatasetSchema,
});

/** One generated input, replayable on its own from `seed`. */
export type DifferentialCase = typeof DifferentialCaseSchema.Type;

const FittedOutcomeSchema = Schema.Struct({
  caseId: Schema.String,
  status: Schema.Literal("fitted"),
  forecasts: Schema.Array(ForecastProjectionSchema),
  noiseScale: Schema.Finite,
  seconds: NonNegativeFinite,
});

const FailedOutcomeSchema = Schema.Struct({
  caseId: Schema.String,
  status: Schema.Literal("failed"),
  stage: Schema.Literals(["fit", "predict"]),
  error: Schema.String,
  reason: Schema.optionalKey(Schema.String),
  message: Schema.String,
  seconds: NonNegativeFinite,
});

/** A failed fit or prediction, with its error tag, typed reason and bounded message. */
export type DifferentialFailure = typeof FailedOutcomeSchema.Type;

/** What one implementation returned for one case. */
export const DifferentialOutcomeSchema = Schema.Union([FittedOutcomeSchema, FailedOutcomeSchema]);

/** What one implementation returned for one case. */
export type DifferentialOutcome = typeof DifferentialOutcomeSchema.Type;

/** Decode one JSON-lines outcome file written by an implementation runner. */
export const parseOutcomeLines = (contents: string): ReadonlyArray<DifferentialOutcome> =>
  contents
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => Schema.decodeUnknownSync(DifferentialOutcomeSchema)(JSON.parse(line)));

/** Forecast differences are measured in units of the training target's span. */
type ForecastQuantity = Exclude<keyof QuantityDifferences, "noiseScale">;

const forecastQuantities: ReadonlyArray<ForecastQuantity> = [
  "forecast",
  "trend",
  "additive",
  "component",
];

/** Allowed normalized forecast differences, and the noise-scale gap below which fits tie. */
export interface DifferentialTolerances {
  readonly forecast: Readonly<Record<ForecastQuantity, number>>;
  readonly noise: number;
}

/**
 * Tolerances in units of the training target span. Agreeing cases stay below 1e-3 for both
 * forecasts and noise scales on the first 200-case run (root seed 60).
 */
export const defaultDifferentialTolerances: DifferentialTolerances = {
  forecast: { forecast: 1e-3, trend: 1e-3, additive: 1e-3, component: 1e-3 },
  noise: 1e-3,
};

/**
 * How a case was judged. Only `mismatch`, `incomparable` and `effect-failed` count as parity
 * failures; the rest are agreement or triaged divergence.
 *
 * When forecasts differ, the fitted noise scales decide. Both are MAP estimates of the residual
 * scale in target units, so equal noise means both libraries explain the training data equally
 * well and differ only where the data does not determine the model: extrapolation from an
 * ill-conditioned design, or how a fit is split into components. Objectives are not compared:
 * near-noiseless fits make them dominated by `log σ`, which moves by hundreds while forecasts
 * agree to 1e-12.
 *
 * - `match`: forecasts agree within tolerance.
 * - `equivalent-fit`: forecasts differ, but both fits have the same noise scale.
 * - `python-worse-fit`: forecasts differ, and Python's fit has the larger noise scale.
 * - `neither-fits`: both noise scales exceed the target span, so neither fit resolves the data.
 * - `mismatch`: forecasts differ, and Effect's fit has the larger noise scale.
 * - `incomparable`: both fitted, but rows, component names or component modes differ.
 * - `effect-failed`: Python fitted and Effect failed for a reason other than input validation.
 * - `effect-rejected`: Python fitted and Effect rejected the input as invalid.
 * - `python-failed`: Effect fitted and Python failed.
 * - `both-failed`: neither implementation fitted.
 */
export type DifferentialVerdict =
  | "match"
  | "equivalent-fit"
  | "python-worse-fit"
  | "neither-fits"
  | "mismatch"
  | "incomparable"
  | "effect-failed"
  | "effect-rejected"
  | "python-failed"
  | "both-failed";

/** Verdicts that indicate an Effect parity gap rather than agreement or triaged divergence. */
export const failingVerdicts: ReadonlySet<DifferentialVerdict> = new Set([
  "mismatch",
  "incomparable",
  "effect-failed",
]);

const verdictOrder: ReadonlyArray<DifferentialVerdict> = [
  "mismatch",
  "incomparable",
  "effect-failed",
  "effect-rejected",
  "python-failed",
  "both-failed",
  "neither-fits",
  "equivalent-fit",
  "python-worse-fit",
  "match",
];

/** A compact summary of one implementation's outcome. */
export type OutcomeSummary =
  | { readonly status: "fitted"; readonly seconds: number }
  | Omit<DifferentialFailure, "caseId">;

/** The judged comparison for one case. */
export interface DifferentialCaseResult {
  readonly caseId: string;
  readonly seed: number;
  readonly growth: string;
  readonly traits: ReadonlyArray<string>;
  readonly verdict: DifferentialVerdict;
  /** Largest normalized difference per forecast quantity, when both fitted comparable rows. */
  readonly differences?: Readonly<Record<ForecastQuantity, number>>;
  /** Effect's noise scale minus Python's, over the target span; positive means Effect fits worse. */
  readonly noiseGap?: number;
  readonly effect: OutcomeSummary;
  readonly python: OutcomeSummary;
}

/** Largest minus smallest training target, or 1 when every target is equal. */
export const targetSpan = (dataset: BenchmarkDataset): number => {
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;

  for (const observation of dataset.observations) {
    minimum = Math.min(minimum, observation.value);
    maximum = Math.max(maximum, observation.value);
  }

  const span = maximum - minimum;

  return Number.isFinite(span) && span > 0 ? span : 1;
};

type Component = ForecastProjection["seasonalities"][number];

const normalizeComponent = (component: Component, span: number): Component =>
  component.mode === "additive"
    ? { ...component, value: component.value / span }
    : { ...component, contribution: component.contribution / span };

/** Divide every target-unit quantity by the span; multiplicative factors are already unitless. */
const normalizeForecast = (forecast: ForecastProjection, span: number): ForecastProjection => ({
  ...forecast,
  value: forecast.value / span,
  trend: forecast.trend / span,
  additive: forecast.additive / span,
  seasonalities: forecast.seasonalities.map((component) => normalizeComponent(component, span)),
  events: forecast.events.map((component) => normalizeComponent(component, span)),
  regressors: forecast.regressors.map((component) => normalizeComponent(component, span)),
});

/** Largest normalized differences across aligned rows, or undefined when rows do not align. */
const forecastDifferences = (
  effect: ReadonlyArray<ForecastProjection>,
  python: ReadonlyArray<ForecastProjection>,
  span: number,
): Readonly<Record<ForecastQuantity, number>> | undefined => {
  if (effect.length !== python.length) {
    return undefined;
  }

  const differences = emptyDifferences();

  for (const [index, effectForecast] of effect.entries()) {
    const pythonForecast = python[index];

    if (
      pythonForecast === undefined ||
      !compareForecast(
        normalizeForecast(effectForecast, span),
        normalizeForecast(pythonForecast, span),
        differences,
      )
    ) {
      return undefined;
    }
  }

  return {
    forecast: differences.forecast,
    trend: differences.trend,
    additive: differences.additive,
    component: differences.component,
  };
};

const summarize = (outcome: DifferentialOutcome): OutcomeSummary => {
  if (outcome.status === "fitted") {
    return { status: "fitted", seconds: outcome.seconds };
  }

  const { caseId: _caseId, ...summary } = outcome;

  return summary;
};

/** Judge forecasts that both implementations produced for comparable rows. */
const forecastVerdict = (
  differences: Readonly<Record<ForecastQuantity, number>>,
  effectNoise: number,
  pythonNoise: number,
  tolerances: DifferentialTolerances,
): DifferentialVerdict => {
  if (
    forecastQuantities.every((quantity) => differences[quantity] <= tolerances.forecast[quantity])
  ) {
    return "match";
  }

  if (Math.min(effectNoise, pythonNoise) > 1) {
    return "neither-fits";
  }

  const gap = effectNoise - pythonNoise;

  if (gap > tolerances.noise) {
    return "mismatch";
  }

  return gap < -tolerances.noise ? "python-worse-fit" : "equivalent-fit";
};

/** Judge one case from both implementations' outcomes. */
export const judgeCase = (
  differentialCase: DifferentialCase,
  effect: DifferentialOutcome,
  python: DifferentialOutcome,
  tolerances: DifferentialTolerances = defaultDifferentialTolerances,
): DifferentialCaseResult => {
  const base = {
    caseId: differentialCase.id,
    seed: differentialCase.seed,
    growth: differentialCase.workload.configuration.growth,
    traits: differentialCase.traits,
    effect: summarize(effect),
    python: summarize(python),
  };

  if (effect.status === "failed" || python.status === "failed") {
    const verdict: DifferentialVerdict =
      effect.status === "failed" && python.status === "failed"
        ? "both-failed"
        : python.status === "failed"
          ? "python-failed"
          : effect.status === "failed" && effect.error === "InputValidationError"
            ? "effect-rejected"
            : "effect-failed";

    return { ...base, verdict };
  }

  const span = targetSpan(differentialCase.dataset);
  const differences = forecastDifferences(effect.forecasts, python.forecasts, span);

  if (differences === undefined) {
    return { ...base, verdict: "incomparable" };
  }

  const effectNoise = effect.noiseScale / span;
  const pythonNoise = python.noiseScale / span;

  return {
    ...base,
    verdict: forecastVerdict(differences, effectNoise, pythonNoise, tolerances),
    differences,
    noiseGap: effectNoise - pythonNoise,
  };
};

/** The complete machine-readable result of one differential run. */
export interface DifferentialReport {
  readonly schemaVersion: 1;
  readonly runId: string;
  readonly rootSeed: number | undefined;
  readonly tolerances: DifferentialTolerances;
  readonly counts: Readonly<Record<DifferentialVerdict, number>>;
  readonly results: ReadonlyArray<DifferentialCaseResult>;
}

/** Judge every case; a case missing from either outcome file fails the whole run. */
export const buildDifferentialReport = (
  runId: string,
  rootSeed: number | undefined,
  cases: ReadonlyArray<DifferentialCase>,
  effectOutcomes: ReadonlyArray<DifferentialOutcome>,
  pythonOutcomes: ReadonlyArray<DifferentialOutcome>,
  tolerances: DifferentialTolerances = defaultDifferentialTolerances,
): DifferentialReport => {
  const effectById = new Map(effectOutcomes.map((outcome) => [outcome.caseId, outcome]));
  const pythonById = new Map(pythonOutcomes.map((outcome) => [outcome.caseId, outcome]));

  const results = cases.map((differentialCase) => {
    const effect = effectById.get(differentialCase.id);
    const python = pythonById.get(differentialCase.id);

    if (effect === undefined || python === undefined) {
      throw new Error(`Case ${differentialCase.id} is missing an implementation outcome`);
    }

    return judgeCase(differentialCase, effect, python, tolerances);
  });

  const counts: Record<DifferentialVerdict, number> = {
    match: 0,
    "equivalent-fit": 0,
    "python-worse-fit": 0,
    "neither-fits": 0,
    mismatch: 0,
    incomparable: 0,
    "effect-failed": 0,
    "effect-rejected": 0,
    "python-failed": 0,
    "both-failed": 0,
  };

  for (const result of results) {
    counts[result.verdict] += 1;
  }

  return { schemaVersion: 1, runId, rootSeed, tolerances, counts, results };
};

const formatNumber = (value: number | undefined): string =>
  value === undefined ? "–" : value === 0 ? "0" : value.toPrecision(3);

const escapeCell = (value: string): string =>
  value.replaceAll("|", "\\|").replaceAll("\n", " ").slice(0, 160);

const outcomeCell = (summary: OutcomeSummary): string =>
  summary.status === "fitted"
    ? "fitted"
    : escapeCell(
        `${summary.stage}: ${summary.error}${summary.reason === undefined ? "" : ` (${summary.reason})`}`,
      );

const quantile = (sorted: ReadonlyArray<number>, probability: number): number | undefined =>
  sorted.length === 0
    ? undefined
    : sorted[Math.min(sorted.length - 1, Math.floor(probability * sorted.length))];

const resultTable = (results: ReadonlyArray<DifferentialCaseResult>): ReadonlyArray<string> => [
  "| Case | Growth | Verdict | Forecast diff | Noise gap | Effect | Python | Traits |",
  "| --- | --- | --- | ---: | ---: | --- | --- | --- |",
  ...results.map(
    (result) =>
      `| \`${result.caseId}\` | ${result.growth} | ${result.verdict} | ${formatNumber(result.differences?.forecast)} | ${formatNumber(result.noiseGap)} | ${outcomeCell(result.effect)} | ${outcomeCell(result.python)} | ${result.traits.join(", ")} |`,
  ),
];

/** Render the human-readable report, which doubles as the CI job summary. */
export const renderDifferentialMarkdown = (report: DifferentialReport): string => {
  const failing = report.results.filter((result) => failingVerdicts.has(result.verdict));

  const triaged = report.results.filter(
    (result) => !failingVerdicts.has(result.verdict) && result.verdict !== "match",
  );

  const compared = report.results
    .flatMap((result) => (result.differences === undefined ? [] : [result.differences.forecast]))
    .sort((left, right) => left - right);

  const seedLine =
    report.rootSeed === undefined
      ? "Cases were selected by their own seeds."
      : `Root seed \`${report.rootSeed}\`; rerun every case with \`npm run differential -- --seed ${report.rootSeed} --cases ${report.results.length}\`.`;

  const lines = [
    "# Differential comparison against Python Prophet",
    "",
    `Run \`${report.runId}\`: ${report.results.length} generated cases. ${seedLine}`,
    "",
    "Forecast differences are the largest absolute difference across prediction rows, divided by",
    "the training target's span. Noise gaps are Effect's fitted noise scale minus Python's, over",
    "the same span, so a positive gap means Effect fits the training data worse.",
    "",
    "| Verdict | Cases |",
    "| --- | ---: |",
    ...verdictOrder.map((verdict) => `| ${verdict} | ${report.counts[verdict]} |`),
    "",
    `Tolerances: forecast quantities ${formatNumber(report.tolerances.forecast.forecast)} of the target span; noise scales tie within ${formatNumber(report.tolerances.noise)} of it.`,
    "",
    `Normalized forecast differences across ${compared.length} comparable cases: median ${formatNumber(quantile(compared, 0.5))}, p90 ${formatNumber(quantile(compared, 0.9))}, p99 ${formatNumber(quantile(compared, 0.99))}, max ${formatNumber(compared.at(-1))}.`,
    "",
    "## Parity failures",
    "",
  ];

  if (failing.length === 0) {
    lines.push("None.");
  } else {
    lines.push(
      "Each case's full input and both outcomes are saved under `mismatches/`. Replay one case with",
      "`npm run differential -- --case-seed <seed>`.",
      "",
      ...resultTable(failing),
    );
  }

  lines.push("", "## Triaged divergence", "");

  if (triaged.length === 0) {
    lines.push("None.");
  } else {
    lines.push(...resultTable(triaged));
  }

  return `${lines.join("\n")}\n`;
};
