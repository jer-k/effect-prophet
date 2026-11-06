import { Match, Predicate, Schema, SchemaIssue } from "effect";

import type { CountryHolidayError } from "./country-holidays";
import type { BaselineForecastError } from "./evaluation-baseline";
import { AnyMetricNameSchema } from "./internal/metric-names";
import { maximumSearchCandidates } from "./internal/search-limits";

/** Runtime schema for one structured validation issue. */
export const ValidationIssueSchema = Schema.Struct({
  message: Schema.String,
  path: Schema.optionalKey(Schema.Array(Schema.PropertyKey)),
});

/** Why a country calendar could not be selected, resolved or combined with a model's features. */
export const CountryHolidayFailureReasonSchema = Schema.Literals([
  "unknown-country",
  "invalid-selection",
  "outside-snapshot-horizon",
  "known-coverage-restriction",
  "snapshot-unavailable",
  "corrupt-snapshot",
  "unsupported-snapshot-version",
  "conflicting-event-prior",
  "conflicting-feature-name",
  "event-column-limit",
]);

const FittingFailureReasonSchema = Schema.Literals([
  "insufficient-observations",
  "degenerate-observations",
  "rank-deficient",
  "non-finite-result",
  "non-convergence",
  "memory-limit",
  "sampling-limit",
  "backend-failure",
]);

const PredictionFailureReasonSchema = Schema.Literals([
  "invalid-model",
  "non-finite-forecast",
  "backend-failure",
  "simulation-limit",
]);

const MetricAggregationKindSchema = Schema.Literals(["rows", "horizons", "rolling", "overall"]);

const MetricFailureReasonSchema = Schema.Literals([
  "unavailable",
  "zero-actual",
  "zero-denominator",
  "non-finite",
  "misaligned",
]);

const MetricFailureStageSchema = Schema.Literals([
  "input",
  "score",
  "difference",
  "square",
  "division",
  "sum",
  "mean",
  "median",
  "quantile",
  "finalize",
]);

const ModelSerializationOperationSchema = Schema.Literals(["encode", "decode"]);

const WasmFailurePhaseSchema = Schema.Literals(["load", "execute", "protocol"]);

export type CountryHolidayFailureReason = typeof CountryHolidayFailureReasonSchema.Type;

export type FittingFailureReason =
  | "insufficient-observations"
  | "degenerate-observations"
  | "rank-deficient"
  | "non-finite-result"
  | "non-convergence"
  | "memory-limit"
  | "sampling-limit"
  | "backend-failure";

export type PredictionFailureReason =
  | "invalid-model"
  | "non-finite-forecast"
  | "backend-failure"
  | "simulation-limit";

/** The WASM adapter phase that failed. */
export type WasmFailurePhase = "load" | "execute" | "protocol";

/** The portable model operation that failed schema validation. */
export type ModelSerializationOperation = "encode" | "decode";

/** One schema validation issue with a machine-readable path. */
export interface ValidationIssue {
  readonly message: string;
  readonly path?: ReadonlyArray<PropertyKey>;
}

interface RuntimeCauseOptions {
  readonly cause?: unknown;
}

const defineRuntimeCause = (target: Error, options: RuntimeCauseOptions | undefined): void => {
  if (options === undefined || !("cause" in options)) {
    return;
  }

  Object.defineProperty(target, "cause", {
    value: options.cause,
    configurable: true,
    writable: true,
    enumerable: false,
  });
};

const rowFields = ["timestamp", "value", "capacity", "floor", "regressors", "conditions"] as const;

/** The row field an observation or prediction-row failure is about. */
export const RowFieldSchema = Schema.Literals(rowFields);

/** The row field an observation or prediction-row failure is about. */
export type RowField = typeof RowFieldSchema.Type;

/** Why an observation history was rejected. */
export const ObservationFailureReasonSchema = Schema.Literals([
  "empty",
  "invalid-shape",
  "missing-capacity",
  "inconsistent-floor",
  "capacity-not-above-floor",
  "bound-on-non-logistic",
  "missing-regressor",
  "unexpected-regressor",
  "unrepresentable-regressor",
  "missing-condition",
  "unexpected-condition",
]);

/** Why an observation history was rejected. */
export type ObservationFailureReason = typeof ObservationFailureReasonSchema.Type;

/** Why prediction timestamps or rows were rejected. */
export const PredictionInputFailureReasonSchema = Schema.Literals([
  "invalid-shape",
  "missing-capacity",
  "missing-floor",
  "unexpected-floor",
  "capacity-not-above-floor",
  "bound-on-non-logistic",
  "missing-regressor",
  "unexpected-regressor",
  "unrepresentable-regressor",
  "missing-condition",
  "unexpected-condition",
]);

/** Why prediction timestamps or rows were rejected. */
export type PredictionInputFailureReason = typeof PredictionInputFailureReasonSchema.Type;

/** Why model options were rejected. */
export const OptionsFailureReasonSchema = Schema.Literals([
  "invalid-shape",
  "invalid-value",
  "name-collision",
  "changepoint-out-of-range",
  "conflicting-options",
  "limit-exceeded",
]);

/** Why model options were rejected. */
export type OptionsFailureReason = typeof OptionsFailureReasonSchema.Type;

/** Why a future-timestamp request was rejected. */
export const FutureTimestampsFailureReasonSchema = Schema.Literals([
  "invalid-shape",
  "timestamp-overflow",
]);

/** Why a future-timestamp request was rejected. */
export type FutureTimestampsFailureReason = typeof FutureTimestampsFailureReasonSchema.Type;

/** Why uncertainty simulation options were rejected. */
export const UncertaintyOptionsFailureReasonSchema = Schema.Literals([
  "invalid-shape",
  "unsupported-output",
]);

/** Why uncertainty simulation options were rejected. */
export type UncertaintyOptionsFailureReason = typeof UncertaintyOptionsFailureReasonSchema.Type;

/** Why a rolling-origin evaluation plan was rejected. */
export const EvaluationPlanFailureReasonSchema = Schema.Literals([
  "invalid-shape",
  "horizon-exceeds-history",
  "insufficient-data-after-initial",
  "cutoff-out-of-range",
  "empty-assessment",
  "summary-mismatch",
  "limit-exceeded",
  "timestamp-overflow",
]);

/** Why a rolling-origin evaluation plan was rejected. */
export type EvaluationPlanFailureReason = typeof EvaluationPlanFailureReasonSchema.Type;

/** Why metric, baseline or scaled-error options were rejected. */
export const MetricOptionsFailureReasonSchema = Schema.Literals([
  "invalid-shape",
  "row-count-out-of-range",
  "window-exceeds-rows",
]);

/** Why metric, baseline or scaled-error options were rejected. */
export type MetricOptionsFailureReason = typeof MetricOptionsFailureReasonSchema.Type;

/** Why a model search or parameter grid was rejected. */
export const SearchOptionsFailureReasonSchema = Schema.Literals([
  "invalid-shape",
  "invalid-candidate-options",
  "invalid-base-options",
  "invalid-mode",
  "cutoff-mismatch",
  "duplicate-choice",
  "limit-exceeded",
]);

/** Why a model search or parameter grid was rejected. */
export type SearchOptionsFailureReason = typeof SearchOptionsFailureReasonSchema.Type;

/** Why a holdout evaluation request was rejected. */
export const HoldoutInputFailureReasonSchema = Schema.Literals([
  "empty",
  "invalid-shape",
  "partition-not-later",
  "limit-exceeded",
  "unsupported-objective",
  "receipt-mismatch",
  "objective-dropped",
  "baselines-need-point-metric",
  "duplicate-baseline",
  "unsupported-uncertainty",
  "coverage-needs-intervals",
]);

/** Why a holdout evaluation request was rejected. */
export type HoldoutInputFailureReason = typeof HoldoutInputFailureReasonSchema.Type;

/** The holdout evaluation partition a failure is about. */
export type HoldoutPartition = "development" | "holdout";

const issueFields = {
  /** Every problem with the same `reason`, with paths relative to the rejected input. */
  issues: Schema.Array(ValidationIssueSchema),
  message: Schema.String,
};

const rowContextFields = {
  /** The first rejected row, in input order. */
  rowIndex: Schema.optionalKey(Schema.Natural),
  field: Schema.optionalKey(RowFieldSchema),

  /** The regressor or condition name, when `field` is `regressors` or `conditions`. */
  name: Schema.optionalKey(Schema.String),
};

/** The first rejected location, relative to the rejected input. */
const pathField = { path: Schema.optionalKey(Schema.Array(Schema.PropertyKey)) };

/**
 * An observation history was rejected by `fit`, cross-validation, baselines or another operation
 * that takes observations.
 */
export class ObservationError extends Schema.TaggedError<ObservationError>()("ObservationError", {
  reason: ObservationFailureReasonSchema,
  ...rowContextFields,
  ...issueFields,
}) {}

/** Prediction timestamps or rows were rejected by a prediction operation. */
export class PredictionInputError extends Schema.TaggedError<PredictionInputError>()(
  "PredictionInputError",
  {
    reason: PredictionInputFailureReasonSchema,
    ...rowContextFields,
    ...issueFields,
  },
) {}

/** Model options were rejected, either on their own or against the observations they fit. */
export class OptionsError extends Schema.TaggedError<OptionsError>()("OptionsError", {
  reason: OptionsFailureReasonSchema,
  ...pathField,
  ...issueFields,
}) {}

/** A `makeFutureTimestamps` anchor or its options were rejected. */
export class FutureTimestampsError extends Schema.TaggedError<FutureTimestampsError>()(
  "FutureTimestampsError",
  {
    reason: FutureTimestampsFailureReasonSchema,
    ...pathField,
    ...issueFields,
  },
) {}

/** Uncertainty simulation options were rejected. */
export class UncertaintyOptionsError extends Schema.TaggedError<UncertaintyOptionsError>()(
  "UncertaintyOptionsError",
  {
    reason: UncertaintyOptionsFailureReasonSchema,
    ...pathField,
    ...issueFields,
  },
) {}

/** A rolling-origin plan, plan summary or cross-validation control was rejected. */
export class EvaluationPlanError extends Schema.TaggedError<EvaluationPlanError>()(
  "EvaluationPlanError",
  {
    reason: EvaluationPlanFailureReasonSchema,
    ...pathField,
    ...issueFields,
  },
) {}

/** Metric, baseline or scaled-error options, or the forecast rows they score, were rejected. */
export class MetricOptionsError extends Schema.TaggedError<MetricOptionsError>()(
  "MetricOptionsError",
  {
    reason: MetricOptionsFailureReasonSchema,
    ...pathField,
    ...issueFields,
  },
) {}

/** A failure inside a search candidate's options or the search's cross-validation controls. */
export type SearchOptionsCause = OptionsError | EvaluationPlanError | UncertaintyOptionsError;

/** A model search or parameter grid was rejected before any candidate was evaluated. */
export class SearchOptionsError extends Schema.TaggedError<SearchOptionsError>()(
  "SearchOptionsError",
  {
    reason: SearchOptionsFailureReasonSchema,
    candidateIndex: Schema.optionalKey(
      Schema.Int.check(
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThan(maximumSearchCandidates),
      ),
    ),
    ...pathField,
    ...issueFields,
  },
) {
  /** The candidate options or controls failure, retained in memory but never encoded. */
  declare readonly cause?: SearchOptionsCause;

  /** Construct a search failure with its optional nested input failure. */
  // @effect-diagnostics-next-line overriddenSchemaConstructor:off -- Optional runtime cause only; decoding is covered in test/errors.test.ts.
  constructor(
    fields: {
      readonly reason: SearchOptionsFailureReason;
      readonly candidateIndex?: number;
      readonly path?: ReadonlyArray<PropertyKey>;
      readonly issues: ReadonlyArray<ValidationIssue>;
      readonly message: string;
    },
    options?: { readonly cause?: SearchOptionsCause },
  ) {
    super(fields);
    defineRuntimeCause(this, options);
  }
}

/** A holdout evaluation's partitions, search receipt or assessment options were rejected. */
export class HoldoutInputError extends Schema.TaggedError<HoldoutInputError>()(
  "HoldoutInputError",
  {
    reason: HoldoutInputFailureReasonSchema,
    partition: Schema.optionalKey(Schema.Literals(["development", "holdout"])),

    /** The first rejected row of `partition`. */
    rowIndex: Schema.optionalKey(Schema.Natural),
    ...pathField,
    ...issueFields,
  },
) {}

/** Every typed failure for rejected caller input. */
export type InputError =
  | ObservationError
  | PredictionInputError
  | OptionsError
  | FutureTimestampsError
  | UncertaintyOptionsError
  | EvaluationPlanError
  | MetricOptionsError
  | SearchOptionsError
  | HoldoutInputError;

const inputErrorClasses = [
  ObservationError,
  PredictionInputError,
  OptionsError,
  FutureTimestampsError,
  UncertaintyOptionsError,
  EvaluationPlanError,
  MetricOptionsError,
  SearchOptionsError,
  HoldoutInputError,
] as const;

/** Whether a value is any of the typed failures for rejected caller input. */
export const isInputError = (value: unknown): value is InputError =>
  inputErrorClasses.some((errorClass) => value instanceof errorClass);

const inputErrorTags = [
  "ObservationError",
  "PredictionInputError",
  "OptionsError",
  "FutureTimestampsError",
  "UncertaintyOptionsError",
  "EvaluationPlanError",
  "MetricOptionsError",
  "SearchOptionsError",
  "HoldoutInputError",
] as const satisfies ReadonlyArray<InputError["_tag"]>;

const inputErrorReasonSchemas = [
  ObservationFailureReasonSchema,
  PredictionInputFailureReasonSchema,
  OptionsFailureReasonSchema,
  FutureTimestampsFailureReasonSchema,
  UncertaintyOptionsFailureReasonSchema,
  EvaluationPlanFailureReasonSchema,
  MetricOptionsFailureReasonSchema,
  SearchOptionsFailureReasonSchema,
  HoldoutInputFailureReasonSchema,
] as const;

const portableInputFailureSchemas = [
  Schema.Struct({
    tag: Schema.Literal("ObservationError"),
    reason: ObservationFailureReasonSchema,
  }),
  Schema.Struct({
    tag: Schema.Literal("PredictionInputError"),
    reason: PredictionInputFailureReasonSchema,
  }),
  Schema.Struct({ tag: Schema.Literal("OptionsError"), reason: OptionsFailureReasonSchema }),
  Schema.Struct({
    tag: Schema.Literal("FutureTimestampsError"),
    reason: FutureTimestampsFailureReasonSchema,
  }),
  Schema.Struct({
    tag: Schema.Literal("UncertaintyOptionsError"),
    reason: UncertaintyOptionsFailureReasonSchema,
  }),
  Schema.Struct({
    tag: Schema.Literal("EvaluationPlanError"),
    reason: EvaluationPlanFailureReasonSchema,
  }),
  Schema.Struct({
    tag: Schema.Literal("MetricOptionsError"),
    reason: MetricOptionsFailureReasonSchema,
  }),
  Schema.Struct({
    tag: Schema.Literal("SearchOptionsError"),
    reason: SearchOptionsFailureReasonSchema,
  }),
  Schema.Struct({
    tag: Schema.Literal("HoldoutInputError"),
    reason: HoldoutInputFailureReasonSchema,
  }),
] as const;

/** An expected failure while fitting a model. */
export class FittingError extends Schema.TaggedError<FittingError>()("FittingError", {
  reason: FittingFailureReasonSchema,
  observationCount: Schema.Natural,
  parameterCount: Schema.optionalKey(Schema.Natural),
  memoryLimitBytes: Schema.optionalKey(Schema.Natural),
  backendPhase: Schema.optionalKey(WasmFailurePhaseSchema),

  /** The regressor whose own model failed to fit, when the failure came from that model. */
  regressor: Schema.optionalKey(Schema.String),
  message: Schema.String,
}) {
  /** Original runtime failure, retained in memory but excluded from the portable schema. */
  declare readonly cause?: unknown;

  /** Construct a fitting failure with optional runtime-only diagnostic context. */
  // @effect-diagnostics-next-line overriddenSchemaConstructor:off -- Optional runtime cause only; decoding is covered in test/errors.test.ts.
  constructor(
    fields: {
      readonly reason: FittingFailureReason;
      readonly observationCount: number;
      readonly parameterCount?: number;
      readonly memoryLimitBytes?: number;
      readonly backendPhase?: WasmFailurePhase;
      readonly regressor?: string;
      readonly message: string;
    },
    options?: RuntimeCauseOptions,
  ) {
    super(fields);
    defineRuntimeCause(this, options);
  }
}

/** An expected failure while evaluating a fitted model. */
export class PredictionError extends Schema.TaggedError<PredictionError>()("PredictionError", {
  reason: PredictionFailureReasonSchema,
  timestamp: Schema.Int,
  backendPhase: Schema.optionalKey(WasmFailurePhaseSchema),

  /** The regressor whose own model failed to forecast, when the failure came from that model. */
  regressor: Schema.optionalKey(Schema.String),
  message: Schema.String,
}) {
  /** Original runtime failure, retained in memory but excluded from the portable schema. */
  declare readonly cause?: unknown;

  /** Construct a prediction failure with optional runtime-only diagnostic context. */
  // @effect-diagnostics-next-line overriddenSchemaConstructor:off -- Optional runtime cause only; decoding is covered in test/errors.test.ts.
  constructor(
    fields: {
      readonly reason: PredictionFailureReason;
      readonly timestamp: number;
      readonly backendPhase?: WasmFailurePhase;
      readonly regressor?: string;
      readonly message: string;
    },
    options?: RuntimeCauseOptions,
  ) {
    super(fields);
    defineRuntimeCause(this, options);
  }
}

/** A failed evaluation fold with its original typed cause retained in memory. */
export class EvaluationError extends Schema.TaggedError<EvaluationError>()("EvaluationError", {
  fold: Schema.Int.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(127)),
  cutoff: Schema.Int,
  stage: Schema.Literals([
    "fit",
    "predict",
    "result",
    "uncertainty",
    "interval-result",
    "baseline",
  ]),
  reason: Schema.Literals([
    "fit-failed",
    "prediction-failed",
    "result-mismatch",
    "uncertainty-failed",
    "interval-result-mismatch",
    "baseline-unavailable",
    "non-finite",
  ]),
  rowIndex: Schema.optionalKey(Schema.Natural.check(Schema.isLessThan(1_000_000))),
  message: Schema.String,
}) {
  /** The original typed failure, never encoded or enumerated. */
  declare readonly cause?: InputError | FittingError | PredictionError | CountryHolidayError;

  /** Construct fold context without flattening the underlying expected failure. */
  // @effect-diagnostics-next-line overriddenSchemaConstructor:off -- Optional runtime cause only; decoding is covered in test/errors.test.ts.
  constructor(
    fields: {
      readonly fold: number;
      readonly cutoff: number;
      readonly stage: "fit" | "predict" | "result" | "uncertainty" | "interval-result" | "baseline";
      readonly reason:
        | "fit-failed"
        | "prediction-failed"
        | "result-mismatch"
        | "uncertainty-failed"
        | "interval-result-mismatch"
        | "baseline-unavailable"
        | "non-finite";
      readonly rowIndex?: number;
      readonly message: string;
    },
    options?: {
      readonly cause?: InputError | FittingError | PredictionError | CountryHolidayError;
    },
  ) {
    super(fields);
    defineRuntimeCause(this, options);
  }
}

/** A failed final holdout operation with its original typed cause retained only in memory. */
export class HoldoutEvaluationError extends Schema.TaggedError<HoldoutEvaluationError>()(
  "HoldoutEvaluationError",
  {
    step: Schema.Literals(["fit", "predict", "uncertainty", "result", "report", "baseline"]),
    reason: Schema.Literals([
      "operation-failed",
      "result-mismatch",
      "baseline-unavailable",
      "non-finite",
    ]),
    rowIndex: Schema.optionalKey(Schema.Natural.check(Schema.isLessThan(10_000))),
    message: Schema.String,
  },
) {
  /** Original expected failure, excluded from the report. */
  declare readonly cause?:
    | InputError
    | FittingError
    | PredictionError
    | CountryHolidayError
    | EvaluationMetricError
    | EvaluationError
    | EvaluationReportError
    | BaselineForecastError;

  /** Construct holdout context without exposing runtime causes in JSON. */
  // @effect-diagnostics-next-line overriddenSchemaConstructor:off -- Optional runtime cause only; decoding is covered in test/errors.test.ts.
  constructor(
    fields: {
      readonly step: "fit" | "predict" | "uncertainty" | "result" | "report" | "baseline";
      readonly reason:
        | "operation-failed"
        | "result-mismatch"
        | "baseline-unavailable"
        | "non-finite";
      readonly rowIndex?: number;
      readonly message: string;
    },
    options?: {
      readonly cause?:
        | InputError
        | FittingError
        | PredictionError
        | CountryHolidayError
        | EvaluationMetricError
        | EvaluationError
        | EvaluationReportError
        | BaselineForecastError;
    },
  ) {
    super(fields);
    defineRuntimeCause(this, options);
  }
}

/** A requested evaluation metric cannot be computed for the given bucket. */
export class EvaluationMetricError extends Schema.TaggedError<EvaluationMetricError>()(
  "EvaluationMetricError",
  {
    metric: AnyMetricNameSchema,
    aggregation: MetricAggregationKindSchema,
    bucket: Schema.Natural,
    reason: MetricFailureReasonSchema,
    stage: MetricFailureStageSchema,
    message: Schema.String,
  },
) {}

/**
 * A scaled-error metric's in-sample scale for one fold: the fold's training history has no lag
 * pairs, its naive errors average to zero, or their sum overflows.
 */
export class MetricScaleError extends Schema.TaggedError<MetricScaleError>()("MetricScaleError", {
  metric: AnyMetricNameSchema,
  fold: Schema.Natural,
  cutoff: Schema.Int,
  reason: Schema.Literals(["insufficient-history", "zero-scale", "non-finite"]),
  message: Schema.String,
}) {}

/** A bounded ASCII identity for one declared search candidate. */
export const CandidateIdSchema = Schema.String.check(
  Schema.makeFilter((id) => /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(id), {
    message: "Expected an ASCII candidate ID of 1 to 64 characters",
  }),
).pipe(Schema.brand("effect-prophet/CandidateId"));

/** A parsed candidate label, never suitable for telemetry attributes. */
export type CandidateId = typeof CandidateIdSchema.Type;

/** Strict portable projection for expected candidate-local failures. */
export const PortableEvaluationFailureSchema = Schema.Union([
  Schema.Struct({
    tag: Schema.Literal("EvaluationError"),
    fold: Schema.Int.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(127)),
    stage: Schema.Literals([
      "fit",
      "predict",
      "result",
      "uncertainty",
      "interval-result",
      "baseline",
    ]),
    reason: Schema.Literals([
      "fit-failed",
      "prediction-failed",
      "result-mismatch",
      "uncertainty-failed",
      "interval-result-mismatch",
      "baseline-unavailable",
      "non-finite",
    ]),
    rowIndex: Schema.optionalKey(Schema.Natural.check(Schema.isLessThan(1_000_000))),
    causeTag: Schema.optionalKey(
      Schema.Literals([
        ...inputErrorTags,
        "FittingError",
        "PredictionError",
        "CountryHolidayError",
      ]),
    ),
    causeReason: Schema.optionalKey(
      Schema.Union([
        ...inputErrorReasonSchemas,
        FittingFailureReasonSchema,
        PredictionFailureReasonSchema,
        CountryHolidayFailureReasonSchema,
      ]),
    ),
  }),
  Schema.Struct({
    tag: Schema.Literal("EvaluationMetricError"),
    metric: AnyMetricNameSchema,
    aggregation: MetricAggregationKindSchema,
    bucket: Schema.Natural,
    reason: MetricFailureReasonSchema,
    stage: MetricFailureStageSchema,
  }),
  ...portableInputFailureSchemas,
  Schema.Struct({
    tag: Schema.Literal("CountryHolidayError"),
    reason: CountryHolidayFailureReasonSchema,
  }),
]);

/** Bounded expected-failure fields safe for caller-controlled result serialization. */
export type PortableEvaluationFailure = typeof PortableEvaluationFailureSchema.Type;

/** Project an input failure onto its bounded portable tag and reason. */
export const portableInputFailure = (error: InputError): PortableEvaluationFailure =>
  Object.freeze(
    Match.value(error).pipe(
      Match.tagsExhaustive({
        ObservationError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        PredictionInputError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        OptionsError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        FutureTimestampsError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        UncertaintyOptionsError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        EvaluationPlanError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        MetricOptionsError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        SearchOptionsError: ({ _tag, reason }) => ({ tag: _tag, reason }),
        HoldoutInputError: ({ _tag, reason }) => ({ tag: _tag, reason }),
      }),
    ),
  );

const PortableCandidateOutcomeSchema = Schema.Struct({
  id: CandidateIdSchema,
  candidateIndex: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThan(maximumSearchCandidates),
  ),
  failure: PortableEvaluationFailureSchema,
});

/** A failed candidate retained when no configuration succeeded. */
export type PortableCandidateOutcome = typeof PortableCandidateOutcomeSchema.Type;

/** A search failure with original typed cause in memory or safe all-failed outcomes. */
export class EvaluationSearchError extends Schema.TaggedError<EvaluationSearchError>()(
  "EvaluationSearchError",
  {
    reason: Schema.Literals(["invalid-candidate", "candidate-failed", "no-success"]),
    candidateIndex: Schema.optionalKey(
      Schema.Int.check(
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThan(maximumSearchCandidates),
      ),
    ),
    candidateId: Schema.optionalKey(CandidateIdSchema),
    outcomes: Schema.optionalKey(Schema.Array(PortableCandidateOutcomeSchema)),
    message: Schema.String,
  },
) {
  /** Original expected candidate failure, omitted from portable encoding. */
  declare readonly cause?:
    | InputError
    | EvaluationError
    | EvaluationMetricError
    | CountryHolidayError;

  /** Construct search context without serializing a runtime cause. */
  // @effect-diagnostics-next-line overriddenSchemaConstructor:off -- Optional runtime cause only; decoding is covered in test/errors.test.ts.
  constructor(
    fields: {
      readonly reason: "invalid-candidate" | "candidate-failed" | "no-success";
      readonly candidateIndex?: number;
      readonly candidateId?: CandidateId;
      readonly outcomes?: ReadonlyArray<PortableCandidateOutcome>;
      readonly message: string;
    },
    options?: {
      readonly cause?: InputError | EvaluationError | EvaluationMetricError | CountryHolidayError;
    },
  ) {
    super(fields);
    defineRuntimeCause(this, options);
  }
}

/** An expected schema or consistency failure for a portable evaluation report. */
export class EvaluationReportError extends Schema.TaggedError<EvaluationReportError>()(
  "EvaluationReportError",
  {
    operation: Schema.Literals(["encode", "decode"]),
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

/** An expected schema failure while encoding or decoding a portable fitted model. */
export class ModelSerializationError extends Schema.TaggedError<ModelSerializationError>()(
  "ModelSerializationError",
  {
    operation: ModelSerializationOperationSchema,
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

const formatValidationIssues = SchemaIssue.makeFormatterStandardSchemaV1();

const formatValidationMessage = SchemaIssue.makeFormatterDefault();

/** Convert an Effect Schema issue tree into stable structured validation issues. */
export const validationIssuesFromIssue = (
  issue: SchemaIssue.Issue,
): ReadonlyArray<ValidationIssue> => {
  const formatted = formatValidationIssues(issue);

  return formatted.issues.map((formattedIssue): ValidationIssue => {
    if (formattedIssue.path === undefined) {
      return { message: formattedIssue.message };
    }

    const path = formattedIssue.path.map((segment) =>
      Predicate.isPropertyKey(segment) ? segment : segment.key,
    );

    return {
      message: formattedIssue.message,
      path,
    };
  });
};

/** Format an Effect Schema issue tree for human-readable error messages. */
export const validationMessageFromIssue = (issue: SchemaIssue.Issue): string =>
  formatValidationMessage(issue);

/** Structured issues and the formatted message of one Schema decoding failure. */
export const schemaIssueFields = (issue: SchemaIssue.Issue) => ({
  issues: validationIssuesFromIssue(issue),
  message: validationMessageFromIssue(issue),
});

/** Move every issue under a path within an enclosing input. */
export const prefixIssues = (
  issues: ReadonlyArray<ValidationIssue>,
  prefix: ReadonlyArray<PropertyKey>,
): ReadonlyArray<ValidationIssue> =>
  issues.map((issue) => ({ message: issue.message, path: [...prefix, ...(issue.path ?? [])] }));

/** The location fields of an observation or prediction-row failure. */
export interface RowContext {
  readonly rowIndex?: number;
  readonly field?: RowField;
  readonly name?: string;
}

const isRowField = (segment: PropertyKey | undefined): segment is RowField =>
  rowFields.some((field) => field === segment);

/** Read a row location from a row-relative path such as `[3, "regressors", "price"]`. */
export const rowContext = (path: ReadonlyArray<PropertyKey> | undefined): RowContext => {
  const segments = path ?? [];
  const [first] = segments;
  const context: { -readonly [Key in keyof RowContext]: RowContext[Key] } = {};

  if (Predicate.isNumber(first) && Number.isSafeInteger(first) && first >= 0) {
    context.rowIndex = first;
  } else if (Predicate.isNumber(first)) {
    return context;
  }

  const [field, name] = context.rowIndex === undefined ? segments : segments.slice(1);

  if (!isRowField(field)) {
    return context;
  }

  context.field = field;

  if ((field === "regressors" || field === "conditions") && Predicate.isString(name)) {
    context.name = name;
  }

  return context;
};

/** Fields of a row failure, located by its first issue. */
export const rowErrorFields = <Reason extends string>(
  reason: Reason,
  issues: ReadonlyArray<ValidationIssue>,
  message: string,
) => ({ reason, ...rowContext(issues[0]?.path), issues, message });

/** Fields of an options-like failure, located by its first issue. */
export const pathErrorFields = <Reason extends string>(
  reason: Reason,
  issues: ReadonlyArray<ValidationIssue>,
  message: string,
): {
  readonly reason: Reason;
  readonly path?: ReadonlyArray<PropertyKey>;
  readonly issues: ReadonlyArray<ValidationIssue>;
  readonly message: string;
} => {
  const path = issues[0]?.path;

  return path === undefined || path.length === 0
    ? { reason, issues, message }
    : { reason, path, issues, message };
};

/** Fields of a row failure for a Schema rejection, located by its first issue. */
export const schemaRowErrorFields = (issue: SchemaIssue.Issue) => {
  const { issues, message } = schemaIssueFields(issue);

  return rowErrorFields("invalid-shape", issues, message);
};

/** Fields of an options-like failure for a Schema rejection, located by its first issue. */
export const schemaPathErrorFields = (issue: SchemaIssue.Issue) => {
  const { issues, message } = schemaIssueFields(issue);

  return pathErrorFields("invalid-shape", issues, message);
};

/** Fields of an options-like failure with one issue, whose message is also the error's. */
export const singleIssueFields = <Reason extends string>(
  reason: Reason,
  path: ReadonlyArray<PropertyKey>,
  message: string,
) => pathErrorFields(reason, [{ path, message }], message);

/** A validation issue labelled with the failure reason it belongs to. */
export interface ReasonedIssue<Reason extends string> extends ValidationIssue {
  readonly reason: Reason;
}

/**
 * Keep the first issue's reason and every issue that shares it, so one failure has one reason.
 *
 * @returns `undefined` when there are no issues.
 */
export const firstReasonIssues = <Reason extends string>(
  issues: ReadonlyArray<ReasonedIssue<Reason>>,
): { readonly reason: Reason; readonly issues: ReadonlyArray<ValidationIssue> } | undefined => {
  const reason = issues[0]?.reason;

  if (reason === undefined) {
    return undefined;
  }

  return {
    reason,
    issues: issues.flatMap((issue) =>
      issue.reason === reason
        ? [
            issue.path === undefined
              ? { message: issue.message }
              : { path: issue.path, message: issue.message },
          ]
        : [],
    ),
  };
};

/** Preserve structured Schema issues for a portable model operation. */
export const modelSerializationErrorFromIssue = (
  operation: ModelSerializationOperation,
  issue: SchemaIssue.Issue,
): ModelSerializationError =>
  new ModelSerializationError({
    operation,
    issues: validationIssuesFromIssue(issue),
    message: validationMessageFromIssue(issue),
  });
