import { Effect, Schema, SchemaGetter } from "effect";

import { ModelSerializationError, modelSerializationErrorFromIssue } from "./errors";
import type { FittedLinearProphet } from "./prophet";

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

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const EncodedFittedModelSchema: Schema.Codec<EncodedFittedModel> = Schema.Struct({
  modelKind: Schema.Literal("linear-trend"),
  coefficients: Schema.Struct({
    intercept: Schema.Finite,
    slope: Schema.Finite,
  }),
  timeScaling: Schema.Struct({
    origin: Schema.Finite,
    scale: PositiveFinite,
  }),
});

const FittedLinearProphetSchema: Schema.Codec<FittedLinearProphet> = Schema.Struct({
  model: Schema.Literal("linear-trend"),
  intercept: Schema.Finite,
  slope: Schema.Finite,
  timeOrigin: Schema.Finite,
  timeScale: PositiveFinite,
});

const FittedModelSerializationSchema: Schema.Codec<FittedLinearProphet, EncodedFittedModel> =
  EncodedFittedModelSchema.pipe(
    Schema.decodeTo(FittedLinearProphetSchema, {
      decode: SchemaGetter.transform((encoded): FittedLinearProphet => ({
        model: "linear-trend",
        intercept: encoded.coefficients.intercept,
        slope: encoded.coefficients.slope,
        timeOrigin: encoded.timeScaling.origin,
        timeScale: encoded.timeScaling.scale,
      })),
      encode: SchemaGetter.transform((model): EncodedFittedModel => ({
        modelKind: "linear-trend",
        coefficients: {
          intercept: model.intercept,
          slope: model.slope,
        },
        timeScaling: {
          origin: model.timeOrigin,
          scale: model.timeScale,
        },
      })),
    }),
  );

const encodeFittedModelSchema = Schema.encodeEffect(FittedModelSerializationSchema, {
  errors: "all",
});

const decodeFittedModelSchema = Schema.decodeUnknownEffect(FittedModelSerializationSchema, {
  errors: "all",
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
  return yield* encodeFittedModelSchema(model).pipe(
    Effect.mapError((error) => modelSerializationErrorFromIssue("encode", error.issue)),
  );
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
  input: Parameters<typeof decodeFittedModelSchema>[0],
): Effect.fn.Return<FittedLinearProphet, ModelSerializationError> {
  return yield* decodeFittedModelSchema(input).pipe(
    Effect.mapError((error) => modelSerializationErrorFromIssue("decode", error.issue)),
  );
});
