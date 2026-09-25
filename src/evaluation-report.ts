import { Effect, Schema } from "effect";

import {
  BaselineForecastError,
  forecastHoldoutBaseline,
  type BaselineDefinition,
} from "./evaluation-baseline";
import { evaluationSeedSchedule } from "./evaluation-seed";
import { performanceMetrics, type MetricOptions, type MetricReport } from "./evaluation-metrics";
import type { CrossValidationIntervalRow, CrossValidationPointRow } from "./evaluation";
import {
  CandidateIdSchema,
  EvaluationMetricError,
  EvaluationReportError,
  HoldoutEvaluationError,
  InputValidationError,
  PortableEvaluationFailureSchema,
  inputValidationErrorFromIssue,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import type { FittedProphet } from "./fitted-model";
import type { FittingBackend } from "./internal/fitting-backend";
import { copyFrozen, freezeOwned } from "./internal/owned-input";
import { checkedAdd } from "./internal/safe-arithmetic";
import { isValidTimestamp, TimestampSchema } from "./internal/timestamp";
import type { ModelSearchResult, SearchCandidateResult } from "./model-search";
import { decodeObservations, type EncodedObservations, type Observation } from "./observation";
import {
  checkExplicitChangepointBounds,
  decodeOptions,
  isFeaturelessOls,
  type EncodedProphetOptions,
} from "./options";
import { fit, predict, predictUncertainty } from "./prophet";
import {
  simulationIdentity,
  parseUncertaintyOptions,
  type EncodedUncertaintyOptions,
} from "./uncertainty";

const policyVersion = "effect-prophet-evaluation-v1" as const;

const maximumRows = 10_000;

const EpochSchema = Schema.Int.check(Schema.makeFilter(isValidTimestamp));

const FiniteScore = Schema.Struct({
  metric: Schema.Literals(["mae", "mse", "rmse", "smape", "coverage"]),
  value: Schema.Finite,
});

const PercentageScore = Schema.Struct({
  metric: Schema.Literals(["mape", "mdape"]),
  value: Schema.Finite,
  includedCount: Schema.Natural,
  excludedCount: Schema.Natural,
});

const BucketSchema = Schema.Struct({
  rowCount: Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(maximumRows)),
  scores: Schema.NonEmptyArray(Schema.Union([FiniteScore, PercentageScore])),
});

const OverallMetricsSchema = Schema.Struct({
  source: Schema.Literals(["point", "intervals", "baseline"]),
  kind: Schema.Literal("overall"),
  bucket: BucketSchema,
});

const BaselineSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("last-observation") }),
  Schema.Struct({ kind: Schema.Literal("training-mean") }),
  Schema.Struct({
    kind: Schema.Literal("seasonal-naive"),
    lagMs: Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(315_360_000_000)),
  }),
]);

const MetricOptionsSchema = Schema.Struct({
  metrics: Schema.NonEmptyArray(
    Schema.Literals(["mae", "mse", "rmse", "mape", "mdape", "smape", "coverage"]),
  ).check(
    Schema.makeFilter((metrics) =>
      new Set(metrics).size === metrics.length
        ? undefined
        : {
            path: [],
            issue: "Metric names must be unique",
          },
    ),
  ),
  aggregation: Schema.Struct({ kind: Schema.Literal("overall") }),
  mapeZeroActual: Schema.optionalKey(Schema.Literals(["error", "exclude"])),
});

const ObjectiveSchema = Schema.Struct({
  metric: Schema.Literals(["mae", "mse", "rmse", "mape", "mdape", "smape"]),
  aggregation: Schema.Struct({ kind: Schema.Literal("overall") }),
  direction: Schema.Literal("minimize"),
  mapeZeroActual: Schema.optionalKey(Schema.Literals(["error", "exclude"])),
});

const PointSchema = Schema.Struct({
  timestamp: EpochSchema,
  actual: Schema.Finite,
  predicted: Schema.Finite,
});

const IntervalSchema = Schema.Struct({
  timestamp: EpochSchema,
  actual: Schema.Finite,
  predicted: Schema.Finite,
  lower: Schema.Finite,
  upper: Schema.Finite,
});

const RangeSchema = Schema.Struct({
  firstTimestamp: EpochSchema,
  lastTimestamp: EpochSchema,
  rowCount: Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(maximumRows)),
});

const ProvenanceLabelSchema = Schema.String.check(
  Schema.makeFilter(
    (value) => value.length > 0 && value.length <= 128 && /^[\x20-\x7e]+$/.test(value),
    { message: "Expected 1 to 128 printable ASCII characters" },
  ),
);

const ProvenanceSchema = Schema.Struct({
  build: ProvenanceLabelSchema,
  environment: ProvenanceLabelSchema,
});

const ModelSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("linear-trend") }),
  Schema.Struct({
    kind: Schema.Literals(["flat-map", "linear-piecewise-map", "logistic-piecewise-map"]),
    fitSummary: Schema.Struct({
      method: Schema.Literals([
        "flat-map-coordinate-v1",
        "mixed-flat-map-coordinate-v1",
        "piecewise-map-coordinate-v1",
        "mixed-piecewise-map-coordinate-v1",
        "logistic-piecewise-map-proximal-v1",
      ]),
      termination: Schema.Literals(["converged", "constant-target-shortcut"]),
      observationCount: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
      iterations: Schema.Natural,
      objective: Schema.Finite,
      stationarityResidual: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
    }),
  }),
]);

const CommonReportSchema = {
  reportKind: Schema.Literal("effect-prophet-evaluation"),
  policyVersion: Schema.Literal(policyVersion),
  seedSchedule: Schema.Literal(evaluationSeedSchedule),
  development: RangeSchema,
  holdout: RangeSchema,
  selected: Schema.Struct({
    id: CandidateIdSchema,
    candidateIndex: Schema.Natural.check(Schema.isLessThan(32)),
    options: Schema.Unknown,
    searchObjective: ObjectiveSchema,
    developmentScore: Schema.Finite,
  }),
  candidates: Schema.NonEmptyArray(
    Schema.Union([
      Schema.Struct({
        kind: Schema.Literal("success"),
        id: CandidateIdSchema,
        candidateIndex: Schema.Natural.check(Schema.isLessThan(32)),
        score: Schema.Finite,
      }),
      Schema.Struct({
        kind: Schema.Literal("failure"),
        id: CandidateIdSchema,
        candidateIndex: Schema.Natural.check(Schema.isLessThan(32)),
        failure: PortableEvaluationFailureSchema,
      }),
    ]),
  ).check(Schema.isMaxLength(32)),
  searchPlan: Schema.Struct({
    horizonMs: Schema.Int.check(
      Schema.isGreaterThan(0),
      Schema.isLessThanOrEqualTo(315_360_000_000),
    ),
    cutoffs: Schema.NonEmptyArray(EpochSchema).check(Schema.isMaxLength(128)),
    folds: Schema.NonEmptyArray(
      Schema.Struct({
        index: Schema.Natural,
        cutoff: EpochSchema,
        trainingCount: Schema.Natural,
        assessmentCount: Schema.Natural,
      }),
    ).check(Schema.isMaxLength(128)),
  }),
  model: ModelSchema,
  metricPolicy: MetricOptionsSchema,
  metrics: OverallMetricsSchema,
  baselines: Schema.Array(
    Schema.Struct({
      definition: BaselineSchema,
      forecasts: Schema.NonEmptyArray(Schema.Finite).check(Schema.isMaxLength(maximumRows)),
      metrics: OverallMetricsSchema,
    }),
  ).check(Schema.isMaxLength(16)),
  provenance: ProvenanceSchema,
};

const ReportSchema = Schema.Union([
  Schema.Struct({
    ...CommonReportSchema,
    kind: Schema.Literal("point"),
    forecasts: Schema.NonEmptyArray(PointSchema).check(Schema.isMaxLength(maximumRows)),
  }),
  Schema.Struct({
    ...CommonReportSchema,
    kind: Schema.Literal("intervals"),
    forecasts: Schema.NonEmptyArray(IntervalSchema).check(Schema.isMaxLength(maximumRows)),
    simulation: Schema.Struct({
      algorithm: Schema.Literal(simulationIdentity),
      seed: Schema.Int.check(
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(4_294_967_295),
      ),
      samples: Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(2_048)),
      intervalWidth: Schema.Finite.check(Schema.isGreaterThan(0), Schema.isLessThan(1)),
    }),
  }),
]);

/** A selected success receipt checked against the entire development search result. */
export interface SelectedCandidateReceipt {
  readonly id: SearchCandidateResult["id"];
  readonly candidateIndex: number;
  readonly options: EncodedProphetOptions;
  readonly score: number;
}

/** Caller-owned, bounded, non-secret environment/build labels (not tracing attributes). */
export interface EvaluationProvenance {
  readonly build: string;
  readonly environment: string;
}

/** Input to the separate, one-time final holdout operation. */
export interface HoldoutEvaluationInput {
  readonly development: EncodedObservations;
  readonly holdout: EncodedObservations;
  readonly search: ModelSearchResult;
  readonly selectedCandidate: SelectedCandidateReceipt;
  readonly metrics: MetricOptions & { readonly aggregation: { readonly kind: "overall" } };
  readonly baselines?: ReadonlyArray<BaselineDefinition>;
  readonly uncertainty?: EncodedUncertaintyOptions;
  readonly provenance: EvaluationProvenance;
}

/** Schema-backed experimental JSON-compatible holdout report. */
export type HoldoutEvaluationReport = typeof ReportSchema.Type & {
  readonly selected: { readonly options: EncodedProphetOptions };
};

const invalid = (path: ReadonlyArray<PropertyKey>, message: string): InputValidationError =>
  new InputValidationError({ input: "evaluation-holdout", issues: [{ path, message }], message });

const reportError = (
  operation: "encode" | "decode",
  path: ReadonlyArray<PropertyKey>,
  message: string,
) => new EvaluationReportError({ operation, issues: [{ path, message }], message });

const decodeReportSchema = Schema.decodeUnknownEffect(ReportSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const decodeProvenance = Schema.decodeUnknownEffect(ProvenanceSchema, {
  onExcessProperty: "error",
});

const decodeBaseline = Schema.decodeUnknownEffect(BaselineSchema, { onExcessProperty: "error" });

const decodeMetricPolicy = Schema.decodeUnknownEffect(MetricOptionsSchema, {
  onExcessProperty: "error",
});

const encodeTimestamp = Schema.encodeSync(TimestampSchema);

// Inputs here are schema-parsed report fields or complete parsed fit options; compare owned JSON trees without depending on object key order.
const same = <Left, Right>(left: Left, right: Right): boolean => {
  if (Object.is(left, right)) return true;

  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((value, index) => same(value, right[index]));
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- A closed schema has already parsed both JSON-compatible fields; this only distinguishes leaves from records.
  if (left === null || right === null || typeof left !== "object" || typeof right !== "object")
    return false;

  const entries = Object.entries(left);
  const other = new Map(Object.entries(right));

  return (
    entries.length === other.size &&
    entries.every(([key, value]) => other.has(key) && same(value, other.get(key)))
  );
};

const range = (rows: ReadonlyArray<Observation>) => ({
  firstTimestamp: rows[0]?.timestamp ?? 0,
  lastTimestamp: rows[rows.length - 1]?.timestamp ?? 0,
  rowCount: rows.length,
});

const failure = (
  step: HoldoutEvaluationError["step"],
  reason: HoldoutEvaluationError["reason"],
  cause?: HoldoutEvaluationError["cause"],
  rowIndex?: number,
): HoldoutEvaluationError => {
  const fields = { step, reason, message: `Holdout ${step} failed: ${reason}` };
  const context = rowIndex === undefined ? fields : { ...fields, rowIndex };

  return new HoldoutEvaluationError(context, cause === undefined ? undefined : { cause });
};

const metricResult = (
  kind: "point" | "intervals" | "baseline",
  rows: ReadonlyArray<CrossValidationPointRow | CrossValidationIntervalRow>,
) => {
  if (kind !== "intervals") return { kind, rows };

  // SAFETY: The caller verifies every interval row has both finite bounds before scoring.
  return { kind, rows: rows as ReadonlyArray<CrossValidationIntervalRow> };
};

const reportConsistency = (
  report: typeof ReportSchema.Type,
  operation: "encode" | "decode",
): Effect.Effect<void, EvaluationReportError> =>
  Effect.gen(function* () {
    const { development, holdout, forecasts, selected, metrics, metricPolicy } = report;

    if (
      development.firstTimestamp > development.lastTimestamp ||
      holdout.firstTimestamp > holdout.lastTimestamp ||
      holdout.firstTimestamp <= development.lastTimestamp ||
      forecasts.length !== holdout.rowCount ||
      metrics.source !== report.kind ||
      metrics.bucket.rowCount !== forecasts.length ||
      !metricPolicy.metrics.includes(selected.searchObjective.metric) ||
      (metricPolicy.mapeZeroActual ?? "error") !==
        (selected.searchObjective.mapeZeroActual ?? "error") ||
      report.baselines.length > 16 ||
      report.baselines.some(
        (baseline) =>
          baseline.metrics.source !== "baseline" ||
          baseline.metrics.bucket.rowCount !== forecasts.length ||
          baseline.forecasts.length !== forecasts.length,
      )
    ) {
      return yield* Effect.fail(reportError(operation, [], "Inconsistent holdout report metadata"));
    }

    const options = yield* decodeOptions(selected.options).pipe(
      Effect.mapError(() =>
        reportError(operation, ["selected", "options"], "Invalid encoded fit options"),
      ),
    );

    if (
      (options.growth === "logistic" && report.model.kind !== "logistic-piecewise-map") ||
      (options.growth === "flat" && report.model.kind !== "flat-map") ||
      (options.growth === "linear" &&
        !["linear-trend", "linear-piecewise-map"].includes(report.model.kind)) ||
      (report.model.kind !== "linear-trend" &&
        (report.model.fitSummary.observationCount !== development.rowCount ||
          (report.model.kind === "logistic-piecewise-map" &&
            report.model.fitSummary.method !== "logistic-piecewise-map-proximal-v1") ||
          (report.model.kind === "flat-map" &&
            !["flat-map-coordinate-v1", "mixed-flat-map-coordinate-v1"].includes(
              report.model.fitSummary.method,
            )) ||
          (report.model.kind === "linear-piecewise-map" &&
            !["piecewise-map-coordinate-v1", "mixed-piecewise-map-coordinate-v1"].includes(
              report.model.fitSummary.method,
            ))))
    ) {
      return yield* Effect.fail(
        reportError(
          operation,
          ["model"],
          "Model summary disagrees with selected fit options or development count",
        ),
      );
    }

    const winner = report.candidates[selected.candidateIndex];

    if (
      winner?.kind !== "success" ||
      winner.id !== selected.id ||
      winner.score !== selected.developmentScore ||
      report.candidates.length > 32 ||
      report.candidates.some(
        (candidate, index) =>
          candidate.candidateIndex !== index ||
          (candidate.kind === "success" &&
            (candidate.score < selected.developmentScore ||
              (candidate.score === selected.developmentScore && index < selected.candidateIndex))),
      )
    ) {
      return yield* Effect.fail(
        reportError(operation, ["candidates"], "Inconsistent search candidate outcomes"),
      );
    }

    if (
      report.searchPlan.cutoffs.length !== report.searchPlan.folds.length ||
      report.searchPlan.cutoffs.some(
        (cutoff, index) =>
          (index > 0 && cutoff <= (report.searchPlan.cutoffs[index - 1] ?? cutoff)) ||
          report.searchPlan.folds[index]?.cutoff !== cutoff ||
          report.searchPlan.folds[index]?.index !== index,
      )
    ) {
      return yield* Effect.fail(reportError(operation, ["searchPlan"], "Inconsistent search plan"));
    }

    let previous = development.lastTimestamp;

    for (const [index, row] of forecasts.entries()) {
      const interval = report.kind === "intervals" ? report.forecasts[index] : undefined;

      if (
        row.timestamp <= previous ||
        (report.kind === "intervals" && (interval === undefined || interval.lower > interval.upper))
      ) {
        return yield* Effect.fail(
          reportError(
            operation,
            ["forecasts", index],
            "Invalid holdout forecast order or interval",
          ),
        );
      }

      previous = row.timestamp;
    }

    if (forecasts[0]?.timestamp !== holdout.firstTimestamp || previous !== holdout.lastTimestamp) {
      return yield* Effect.fail(
        reportError(operation, ["holdout"], "Holdout range differs from forecast rows"),
      );
    }

    const expected = yield* performanceMetrics(
      metricResult(
        report.kind,
        forecasts.map((row) => ({
          ...row,
          fold: 0,
          cutoff: development.lastTimestamp,
          horizonMs: row.timestamp - development.lastTimestamp,
        })),
      ),
      metricPolicy,
    ).pipe(Effect.mapError(() => reportError(operation, ["metrics"], "Invalid report metrics")));

    if (!same(expected, metrics)) {
      return yield* Effect.fail(
        reportError(operation, ["metrics"], "Holdout metrics do not match forecasts"),
      );
    }

    for (const [index, baseline] of report.baselines.entries()) {
      const pointMetrics = metricPolicy.metrics.filter((metric) => metric !== "coverage");
      const first = pointMetrics[0];

      if (first === undefined) {
        return yield* Effect.fail(
          reportError(operation, ["metricPolicy"], "Baseline needs point metrics"),
        );
      }

      const policy: MetricOptions = { ...metricPolicy, metrics: [first, ...pointMetrics.slice(1)] };

      const baseRows = forecasts.map((row, rowIndex) => ({
        fold: 0,
        cutoff: development.lastTimestamp,
        timestamp: row.timestamp,
        horizonMs: row.timestamp - development.lastTimestamp,
        actual: row.actual,
        predicted: baseline.forecasts[rowIndex] ?? NaN,
      }));

      const computed = yield* performanceMetrics(metricResult("baseline", baseRows), policy).pipe(
        Effect.mapError(() =>
          reportError(operation, ["baselines", index], "Invalid baseline metrics"),
        ),
      );

      if (!same(computed, baseline.metrics)) {
        return yield* Effect.fail(
          reportError(operation, ["baselines", index], "Baseline scores do not match forecasts"),
        );
      }
    }
  });

/** Decode a strict portable report without fitting, WASM or an Effect Layer. */
export const decodeEvaluationReport = Effect.fn("Prophet.decodeEvaluationReport")(function* (
  // oxlint-disable-next-line anti-slop/no-unknown-parameters -- The public decoder must parse an untrusted external JSON value.
  input: unknown,
): Effect.fn.Return<HoldoutEvaluationReport, EvaluationReportError> {
  const parsed = yield* decodeReportSchema(input).pipe(
    Effect.mapError(
      (error) =>
        new EvaluationReportError({
          operation: "decode",
          issues: validationIssuesFromIssue(error.issue),
          message: validationMessageFromIssue(error.issue),
        }),
    ),
  );

  yield* reportConsistency(parsed, "decode");

  // SAFETY: The strict report schema checked all fields; decodeOptions verified the unknown selected options are a closed valid EncodedProphetOptions object.
  return freezeOwned(parsed) as HoldoutEvaluationReport;
});

/** Verify and return a JSON-compatible owned report without I/O. */
export const encodeEvaluationReport = Effect.fn("Prophet.encodeEvaluationReport")(function* (
  // oxlint-disable-next-line anti-slop/no-unknown-parameters -- The public encoder checks an untrusted structural report before copying it into JSON.
  report: unknown,
): Effect.fn.Return<HoldoutEvaluationReport, EvaluationReportError> {
  const parsed = yield* decodeReportSchema(report).pipe(
    Effect.mapError(
      (error) =>
        new EvaluationReportError({
          operation: "encode",
          issues: validationIssuesFromIssue(error.issue),
          message: validationMessageFromIssue(error.issue),
        }),
    ),
  );

  yield* reportConsistency(parsed, "encode");

  // SAFETY: Strict schema and semantic checks established the report shape and selected options; JSON roundtrip removes caller-owned references.
  return freezeOwned(JSON.parse(JSON.stringify(parsed))) as HoldoutEvaluationReport;
});

/** Fit the selected development configuration once and assess untouched later holdout rows. */
export const evaluateHoldout = Effect.fn("Prophet.evaluateHoldout")(function* (
  input: HoldoutEvaluationInput,
): Effect.fn.Return<
  HoldoutEvaluationReport,
  InputValidationError | EvaluationMetricError | HoldoutEvaluationError,
  FittingBackend
> {
  const development = yield* decodeObservations(input.development);
  const holdout = yield* decodeObservations(input.holdout);
  const lastDevelopment = development.at(-1);
  const finalHoldout = holdout.at(-1);

  if (lastDevelopment === undefined || finalHoldout === undefined) {
    return yield* Effect.die(new Error("Nonempty parsed partition is missing its last row"));
  }

  const last = lastDevelopment.timestamp;
  const lastHoldout = finalHoldout.timestamp;
  const horizon = checkedAdd(lastHoldout, -last);

  if (
    development.length > maximumRows ||
    holdout.length > maximumRows ||
    holdout[0].timestamp <= last ||
    horizon === undefined ||
    horizon <= 0
  ) {
    return yield* Effect.fail(
      invalid(["holdout"], "Expected bounded, strictly later development and holdout partitions"),
    );
  }

  const { search, selectedCandidate } = input;
  const selected = search?.candidates?.[search.selected?.candidateIndex];

  if (
    !Array.isArray(search?.candidates) ||
    search.candidates.length === 0 ||
    search.candidates.length > 32 ||
    selected?.kind !== "success" ||
    selected.id !== search.selected.id ||
    selected.candidateIndex !== search.selected.candidateIndex ||
    selected.score !== search.selected.score ||
    selectedCandidate.id !== selected.id ||
    selectedCandidate.candidateIndex !== selected.candidateIndex ||
    selectedCandidate.score !== selected.score ||
    !same(selectedCandidate.options, selected.options) ||
    selected.metrics.kind !== "overall" ||
    selected.metrics.bucket.scores[0]?.value !== selected.score ||
    selected.metrics.bucket.scores[0]?.metric !== search.objective.metric ||
    !Number.isFinite(selected.score) ||
    search.candidates.some(
      (candidate, index) =>
        candidate.candidateIndex !== index ||
        (candidate.kind === "success" &&
          (candidate.score < selected.score ||
            (candidate.score === selected.score && index < selected.candidateIndex))),
    )
  ) {
    return yield* Effect.fail(
      invalid(["selectedCandidate"], "Selected receipt does not match development search"),
    );
  }

  const options = yield* decodeOptions(selectedCandidate.options);
  const ownedOptions = copyFrozen(selectedCandidate.options);
  yield* checkExplicitChangepointBounds(development, options);

  const metricPolicy = yield* decodeMetricPolicy(input.metrics).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-holdout", error.issue)),
  );

  if (
    !metricPolicy.metrics.includes(search.objective.metric) ||
    (metricPolicy.mapeZeroActual ?? "error") !== (search.objective.mapeZeroActual ?? "error")
  ) {
    return yield* Effect.fail(
      invalid(["metrics"], "Holdout metrics must retain the search objective and zero policy"),
    );
  }

  const provenance = yield* decodeProvenance(input.provenance).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-holdout", error.issue)),
  );

  const definitions = input.baselines ?? [];

  if (definitions.length > 16)
    return yield* Effect.fail(invalid(["baselines"], "At most 16 baselines are supported"));

  if (definitions.length > 0 && metricPolicy.metrics.every((metric) => metric === "coverage")) {
    return yield* Effect.fail(invalid(["metrics"], "Baselines require a point-error metric"));
  }

  for (const [index, baseline] of definitions.entries()) {
    yield* decodeBaseline(baseline).pipe(
      Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-holdout", error.issue)),
    );

    if (definitions.slice(0, index).some((previous) => same(previous, baseline))) {
      return yield* Effect.fail(
        invalid(["baselines", index], "Baseline definitions must be unique"),
      );
    }
  }

  const uncertainty =
    input.uncertainty === undefined ? undefined : yield* parseUncertaintyOptions(input.uncertainty);

  if (
    uncertainty?.output === "samples" ||
    (uncertainty !== undefined && holdout.length * uncertainty.samples > 1_000_000)
  ) {
    return yield* Effect.fail(
      invalid(["uncertainty"], "Holdout requires bounded interval-only simulation"),
    );
  }

  if (uncertainty !== undefined && isFeaturelessOls(options)) {
    return yield* Effect.fail(
      invalid(["uncertainty"], "Featureless OLS has no interval simulation"),
    );
  }

  if (uncertainty === undefined && metricPolicy.metrics.includes("coverage")) {
    return yield* Effect.fail(invalid(["metrics"], "Coverage requires interval simulation"));
  }

  const executed = yield* Effect.gen(function* () {
    const training = development.map(({ timestamp, ...observed }) => ({
      ...observed,
      timestamp: encodeTimestamp(timestamp),
    }));

    const model = yield* fit(training, ownedOptions).pipe(
      Effect.mapError((cause) => failure("fit", "operation-failed", cause)),
    );

    yield* Effect.annotateCurrentSpan({ "effect_prophet.model.type": model.model });

    const future = holdout.map(({ value: _actual, timestamp, ...known }) => ({
      ...known,
      timestamp: encodeTimestamp(timestamp),
    }));

    const forecasts = yield* predict(model, future).pipe(
      Effect.mapError((cause) => failure("predict", "operation-failed", cause)),
    );

    if (forecasts.length !== holdout.length) {
      return yield* Effect.fail(failure("result", "result-mismatch"));
    }

    const points: Array<CrossValidationPointRow> = [];

    for (const [index, row] of holdout.entries()) {
      const forecast = forecasts[index];

      if (forecast?.timestamp !== row.timestamp || !Number.isFinite(forecast.value)) {
        return yield* Effect.fail(failure("result", "result-mismatch", undefined, index));
      }

      points.push({
        fold: 0,
        cutoff: last,
        horizonMs: row.timestamp - last,
        timestamp: row.timestamp,
        actual: row.value,
        predicted: forecast.value,
      });
    }

    let rows: ReadonlyArray<CrossValidationPointRow | CrossValidationIntervalRow> = points;

    if (uncertainty !== undefined) {
      const intervals = yield* predictUncertainty(model, future, uncertainty).pipe(
        Effect.mapError((cause) => failure("uncertainty", "operation-failed", cause)),
      );

      if (
        intervals.kind !== "intervals" ||
        intervals.rows.length !== points.length ||
        intervals.sampleCount !== uncertainty.samples ||
        intervals.intervalWidth !== uncertainty.intervalWidth ||
        intervals.simulation !== simulationIdentity
      ) {
        return yield* Effect.fail(failure("result", "result-mismatch"));
      }

      const withIntervals: Array<CrossValidationIntervalRow> = [];

      for (const [index, point] of points.entries()) {
        const interval = intervals.rows[index];

        if (
          interval?.timestamp !== point.timestamp ||
          !Number.isFinite(interval.value.lower) ||
          !Number.isFinite(interval.value.upper) ||
          interval.value.lower > interval.value.upper
        ) {
          return yield* Effect.fail(failure("result", "result-mismatch", undefined, index));
        }

        withIntervals.push({ ...point, lower: interval.value.lower, upper: interval.value.upper });
      }

      rows = withIntervals;
    }

    const kind = uncertainty === undefined ? ("point" as const) : ("intervals" as const);
    const metrics = yield* performanceMetrics(metricResult(kind, rows), metricPolicy);

    if (metrics.kind !== "overall")
      return yield* Effect.die(new Error("Overall metric policy returned a non-overall report"));

    const baselines: Array<{
      definition: BaselineDefinition;
      forecasts: ReadonlyArray<number>;
      metrics: MetricReport;
    }> = [];

    for (const definition of definitions) {
      const values = yield* forecastHoldoutBaseline(development, holdout, definition).pipe(
        Effect.mapError((cause) =>
          failure(
            "baseline",
            cause instanceof BaselineForecastError ? cause.reason : "baseline-unavailable",
            cause,
            cause instanceof BaselineForecastError ? cause.rowIndex : undefined,
          ),
        ),
      );

      const baselineRows = points.map((point, index) => ({
        ...point,
        predicted: values[index] ?? NaN,
      }));

      const pointMetrics = metricPolicy.metrics.filter((metric) => metric !== "coverage");
      const first = pointMetrics[0];

      if (first === undefined) {
        return yield* Effect.fail(
          invalid(["metrics"], "Baselines require at least one point-error metric"),
        );
      }

      const baselinePolicy: MetricOptions = {
        ...metricPolicy,
        metrics: [first, ...pointMetrics.slice(1)],
      };

      const baselineMetrics = yield* performanceMetrics(
        metricResult("baseline", baselineRows),
        baselinePolicy,
      );

      baselines.push({ definition, forecasts: values, metrics: baselineMetrics });
    }

    const summary = modelSummary(model);

    const reportBase = {
      reportKind: "effect-prophet-evaluation" as const,
      policyVersion,
      seedSchedule: evaluationSeedSchedule,
      development: range(development),
      holdout: range(holdout),
      selected: {
        id: selected.id,
        candidateIndex: selected.candidateIndex,
        options: ownedOptions,
        searchObjective: search.objective,
        developmentScore: selected.score,
      },
      searchPlan: search.plan,
      candidates: search.candidates.map((candidate) =>
        candidate.kind === "success"
          ? {
              kind: candidate.kind,
              id: candidate.id,
              candidateIndex: candidate.candidateIndex,
              score: candidate.score,
            }
          : {
              kind: candidate.kind,
              id: candidate.id,
              candidateIndex: candidate.candidateIndex,
              failure: candidate.failure,
            },
      ),
      model: summary,
      metricPolicy,
      metrics,
      baselines,
      provenance,
      forecasts: rows.map((row) =>
        uncertainty === undefined
          ? { timestamp: row.timestamp, actual: row.actual, predicted: row.predicted }
          : {
              timestamp: row.timestamp,
              actual: row.actual,
              predicted: row.predicted,
              lower: "lower" in row ? row.lower : NaN,
              upper: "upper" in row ? row.upper : NaN,
            },
      ),
    };

    const report =
      uncertainty === undefined
        ? { ...reportBase, kind: "point" as const }
        : {
            ...reportBase,
            kind: "intervals" as const,
            simulation: {
              algorithm: simulationIdentity,
              seed: uncertainty.seed,
              samples: uncertainty.samples,
              intervalWidth: uncertainty.intervalWidth,
            },
          };

    return yield* encodeEvaluationReport(report).pipe(
      Effect.mapError((cause) => failure("report", "result-mismatch", cause)),
    );
  }).pipe(
    Effect.withSpan(
      "effect-prophet.evaluation.holdout",
      {
        attributes: {
          "effect_prophet.operation": "holdout",
          "effect_prophet.growth": options.growth,
          "effect_prophet.training.count": development.length,
          "effect_prophet.assessment.count": holdout.length,
          "effect_prophet.baseline.count": definitions.length,
          "effect_prophet.uncertainty.enabled": uncertainty !== undefined,
        },
      },
      { captureStackTrace: false },
    ),
  );

  return executed;
});

const modelSummary = (model: FittedProphet) => {
  if (model.model === "linear-trend") return { kind: model.model };

  const { method, termination, observationCount, iterations, objective, stationarityResidual } =
    model.fitSummary;

  return {
    kind: model.model,
    fitSummary: {
      method,
      termination,
      observationCount,
      iterations,
      objective,
      stationarityResidual,
    },
  };
};
