import { Predicate, Schema, SchemaIssue } from "effect";

import type { CountryHolidayError } from "./country-holidays";
import type { BaselineForecastError } from "./evaluation-baseline";
import { AnyMetricNameSchema } from "./internal/metric-names";
import { maximumSearchCandidates } from "./internal/search-limits";

/** Runtime schema for one structured validation issue. */
export const ValidationIssueSchema = Schema.Struct({
  message: Schema.String,
  path: Schema.optionalKey(Schema.Array(Schema.PropertyKey)),
});

const ValidationInputSchema = Schema.Literals([
  "observations",
  "options",
  "prediction-timestamps",
  "prediction-rows",
  "future-timestamps",
  "uncertainty-options",
  "evaluation-plan",
  "evaluation-metrics",
  "evaluation-baseline",
  "evaluation-search",
  "evaluation-holdout",
  "parameter-grid",
]);

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

export type ValidationInput =
  | "observations"
  | "options"
  | "prediction-timestamps"
  | "prediction-rows"
  | "future-timestamps"
  | "uncertainty-options"
  | "evaluation-plan"
  | "evaluation-metrics"
  | "evaluation-baseline"
  | "evaluation-search"
  | "evaluation-holdout"
  | "parameter-grid";

export type CountryHolidayFailureReason = typeof CountryHolidayFailureReasonSchema.Type;

export type FittingFailureReason =
  | "insufficient-observations"
  | "degenerate-observations"
  | "rank-deficient"
  | "non-finite-result"
  | "non-convergence"
  | "memory-limit"
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

/** An expected failure while validating input at a public API boundary. */
export class InputValidationError extends Schema.TaggedError<InputValidationError>()(
  "InputValidationError",
  {
    input: ValidationInputSchema,
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

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
  declare readonly cause?:
    | InputValidationError
    | FittingError
    | PredictionError
    | CountryHolidayError;

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
      readonly cause?: InputValidationError | FittingError | PredictionError | CountryHolidayError;
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
    | InputValidationError
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
        | InputValidationError
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
        "InputValidationError",
        "FittingError",
        "PredictionError",
        "CountryHolidayError",
      ]),
    ),
    causeReason: Schema.optionalKey(
      Schema.Union([
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
  Schema.Struct({ tag: Schema.Literal("InputValidationError"), input: ValidationInputSchema }),
  Schema.Struct({
    tag: Schema.Literal("CountryHolidayError"),
    reason: CountryHolidayFailureReasonSchema,
  }),
]);

/** Bounded expected-failure fields safe for caller-controlled result serialization. */
export type PortableEvaluationFailure = typeof PortableEvaluationFailureSchema.Type;

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
    | InputValidationError
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
      readonly cause?:
        | InputValidationError
        | EvaluationError
        | EvaluationMetricError
        | CountryHolidayError;
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

/** Preserve structured Schema issues while translating them to the public error channel. */
export const inputValidationErrorFromIssue = (
  input: ValidationInput,
  issue: SchemaIssue.Issue,
): InputValidationError =>
  new InputValidationError({
    input,
    issues: validationIssuesFromIssue(issue),
    message: validationMessageFromIssue(issue),
  });

/** Re-home a nested validation failure under a path within an enclosing public input. */
export const nestedInputValidationError = (
  input: ValidationInput,
  error: InputValidationError,
  path: ReadonlyArray<PropertyKey>,
  message: string,
): InputValidationError =>
  new InputValidationError({
    input,
    issues: error.issues.map((issue) => ({
      path: [...path, ...(issue.path ?? [])],
      message: issue.message,
    })),
    message,
  });

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
