import { Predicate, Schema, SchemaIssue } from "effect";

const ValidationIssueSchema = Schema.Struct({
  message: Schema.String,
  path: Schema.optionalKey(Schema.Array(Schema.PropertyKey)),
});

const ValidationInputSchema = Schema.Literals(["observations", "options", "prediction-timestamps"]);

const FittingFailureReasonSchema = Schema.Literals([
  "insufficient-observations",
  "degenerate-observations",
  "backend-failure",
]);

const PredictionFailureReasonSchema = Schema.Literals([
  "invalid-model",
  "non-finite-forecast",
  "backend-failure",
]);

const ModelSerializationOperationSchema = Schema.Literals(["encode", "decode"]);

export type ValidationInput = "observations" | "options" | "prediction-timestamps";

export type FittingFailureReason =
  | "insufficient-observations"
  | "degenerate-observations"
  | "backend-failure";

export type PredictionFailureReason = "invalid-model" | "non-finite-forecast" | "backend-failure";

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

/** An expected failure while fitting a model. */
export class FittingError extends Schema.TaggedError<FittingError>()("FittingError", {
  reason: FittingFailureReasonSchema,
  observationCount: Schema.Natural,
  message: Schema.String,
}) {}

/** An expected failure while evaluating a fitted model. */
export class PredictionError extends Schema.TaggedError<PredictionError>()("PredictionError", {
  reason: PredictionFailureReasonSchema,
  timestamp: Schema.Int,
  message: Schema.String,
}) {}

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

const validationIssuesFromIssue = (issue: SchemaIssue.Issue): ReadonlyArray<ValidationIssue> => {
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

/** Preserve structured Schema issues while translating them to the public error channel. */
export const inputValidationErrorFromIssue = (
  input: ValidationInput,
  issue: SchemaIssue.Issue,
): InputValidationError =>
  new InputValidationError({
    input,
    issues: validationIssuesFromIssue(issue),
    message: formatValidationMessage(issue),
  });

/** Preserve structured Schema issues for a portable model operation. */
export const modelSerializationErrorFromIssue = (
  operation: ModelSerializationOperation,
  issue: SchemaIssue.Issue,
): ModelSerializationError =>
  new ModelSerializationError({
    operation,
    issues: validationIssuesFromIssue(issue),
    message: formatValidationMessage(issue),
  });
