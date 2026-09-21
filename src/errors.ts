import { Predicate, Schema, SchemaIssue } from "effect";

/** Runtime schema for one structured validation issue. */
export const ValidationIssueSchema = Schema.Struct({
  message: Schema.String,
  path: Schema.optionalKey(Schema.Array(Schema.PropertyKey)),
});

const ValidationInputSchema = Schema.Literals(["observations", "options", "prediction-timestamps"]);

const FittingFailureReasonSchema = Schema.Literals([
  "insufficient-observations",
  "degenerate-observations",
  "rank-deficient",
  "non-finite-result",
  "noise-collapse",
  "non-convergence",
  "backend-failure",
]);

const PredictionFailureReasonSchema = Schema.Literals([
  "invalid-model",
  "non-finite-forecast",
  "backend-failure",
]);

const ModelSerializationOperationSchema = Schema.Literals(["encode", "decode"]);

const UnsupportedOptionSchema = Schema.Literals([
  "events",
  "regressors",
  "conditional-seasonalities",
]);

const WasmFailurePhaseSchema = Schema.Literals(["load", "execute", "protocol"]);

export type ValidationInput = "observations" | "options" | "prediction-timestamps";

export type FittingFailureReason =
  | "insufficient-observations"
  | "degenerate-observations"
  | "rank-deficient"
  | "non-finite-result"
  | "noise-collapse"
  | "non-convergence"
  | "backend-failure";

export type PredictionFailureReason = "invalid-model" | "non-finite-forecast" | "backend-failure";

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

/** A valid configuration that the selected model family cannot execute. */
export class UnsupportedConfigurationError extends Schema.TaggedError<UnsupportedConfigurationError>()(
  "UnsupportedConfigurationError",
  {
    option: UnsupportedOptionSchema,
    model: Schema.String,
    message: Schema.String,
  },
) {}

/** An expected failure while fitting a model. */
export class FittingError extends Schema.TaggedError<FittingError>()("FittingError", {
  reason: FittingFailureReasonSchema,
  observationCount: Schema.Natural,
  parameterCount: Schema.optionalKey(Schema.Natural),
  backendPhase: Schema.optionalKey(WasmFailurePhaseSchema),
  message: Schema.String,
}) {
  /** Original runtime failure, retained in memory but excluded from the portable schema. */
  declare readonly cause?: unknown;

  /** Construct a fitting failure with optional runtime-only diagnostic context. */
  constructor(
    fields: {
      readonly reason: FittingFailureReason;
      readonly observationCount: number;
      readonly parameterCount?: number;
      readonly backendPhase?: WasmFailurePhase;
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
  message: Schema.String,
}) {
  /** Original runtime failure, retained in memory but excluded from the portable schema. */
  declare readonly cause?: unknown;

  /** Construct a prediction failure with optional runtime-only diagnostic context. */
  constructor(
    fields: {
      readonly reason: PredictionFailureReason;
      readonly timestamp: number;
      readonly backendPhase?: WasmFailurePhase;
      readonly message: string;
    },
    options?: RuntimeCauseOptions,
  ) {
    super(fields);
    defineRuntimeCause(this, options);
  }
}

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
