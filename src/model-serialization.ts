import { Effect, Schema } from "effect";

import {
  ModelSerializationError,
  modelSerializationErrorFromIssue,
  type ValidationIssue,
} from "./errors";
import {
  parseLinearModel,
  type FittedLinearProphet,
  type InvalidFittedModel,
  type LinearParameters,
} from "./fitted-model";

/** The portable representation of a fitted linear model. */
export interface EncodedFittedModel {
  /** Identifies the prediction equation independently of the fitting backend. */
  readonly modelKind: "linear-trend";

  /** Coefficients of the trend equation over scaled time. */
  readonly coefficients: {
    /** Predicted value at scaled time zero. */
    readonly intercept: number;

    /** Change in the prediction over one scaled time unit. */
    readonly slope: number;
  };

  /** Scaling learned during fitting and required to evaluate future timestamps. */
  readonly timeScaling: {
    /** Timestamp mapped to scaled time zero. */
    readonly origin: number;

    /** Positive timestamp interval mapped to one scaled time unit. */
    readonly scale: number;
  };
}

const EncodedFittedModelSchema: Schema.Codec<EncodedFittedModel> = Schema.Struct({
  modelKind: Schema.Literal("linear-trend"),
  coefficients: Schema.Struct({
    intercept: Schema.Number,
    slope: Schema.Number,
  }),
  timeScaling: Schema.Struct({
    origin: Schema.Number,
    scale: Schema.Number,
  }),
});

const decodeEncodedFittedModel = Schema.decodeUnknownEffect(EncodedFittedModelSchema, {
  errors: "all",
});

const portablePathFromModelPath = (
  path: ReadonlyArray<PropertyKey>,
): ReadonlyArray<PropertyKey> => {
  const [field, ...rest] = path;

  switch (field) {
    case "model":
      return ["modelKind", ...rest];

    case "intercept":
      return ["coefficients", "intercept", ...rest];

    case "slope":
      return ["coefficients", "slope", ...rest];

    case "timeOrigin":
      return ["timeScaling", "origin", ...rest];

    case "timeScale":
      return ["timeScaling", "scale", ...rest];

    default:
      return path;
  }
};

const portableIssueFromModelIssue = (issue: ValidationIssue): ValidationIssue => {
  if (issue.path === undefined) {
    return { message: issue.message };
  }

  return {
    message: issue.message,
    path: portablePathFromModelPath(issue.path),
  };
};

const serializationErrorFromInvalidModel = (
  operation: "encode" | "decode",
  error: InvalidFittedModel,
): ModelSerializationError =>
  new ModelSerializationError({
    operation,
    issues: operation === "decode" ? error.issues.map(portableIssueFromModelIssue) : error.issues,
    message: error.message,
  });

const linearParametersFromEncoded = (encoded: EncodedFittedModel): LinearParameters => ({
  model: "linear-trend",
  intercept: encoded.coefficients.intercept,
  slope: encoded.coefficients.slope,
  timeOrigin: encoded.timeScaling.origin,
  timeScale: encoded.timeScaling.scale,
});

const encodeLinearModel = (model: FittedLinearProphet): EncodedFittedModel => ({
  modelKind: "linear-trend",
  coefficients: {
    intercept: model.intercept,
    slope: model.slope,
  },
  timeScaling: {
    origin: model.timeOrigin,
    scale: model.timeScale,
  },
});

/**
 * Encode a fitted linear model into the current JSON-compatible portable format.
 *
 * Only prediction state is retained. Backend identities, handles, services, and
 * other implementation resources are not part of the encoded schema.
 *
 * @param model - The fitted linear model to encode.
 * @returns The portable payload or a typed serialization failure.
 */
export const encodeFittedModel = Effect.fn("Prophet.encodeFittedModel")(function* (
  model: FittedLinearProphet,
): Effect.fn.Return<EncodedFittedModel, ModelSerializationError> {
  const parsedModel = yield* parseLinearModel(model).pipe(
    Effect.mapError((error) => serializationErrorFromInvalidModel("encode", error)),
  );

  return encodeLinearModel(parsedModel);
});

/**
 * Decode an untrusted portable payload into a validated fitted linear model.
 *
 * Only the `linear-trend` model kind is currently supported. No backend is
 * selected or acquired while decoding.
 *
 * @param input - The untrusted JSON-compatible value to decode.
 * @returns A fitted linear model or a typed serialization failure.
 */
export const decodeFittedModel = Effect.fn("Prophet.decodeFittedModel")(function* (
  input: Parameters<typeof decodeEncodedFittedModel>[0],
): Effect.fn.Return<FittedLinearProphet, ModelSerializationError> {
  const encoded = yield* decodeEncodedFittedModel(input).pipe(
    Effect.mapError((error) => modelSerializationErrorFromIssue("decode", error.issue)),
  );

  return yield* parseLinearModel(linearParametersFromEncoded(encoded)).pipe(
    Effect.mapError((error) => serializationErrorFromInvalidModel("decode", error)),
  );
});
