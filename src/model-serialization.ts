import { Effect, Schema } from "effect";

import {
  ModelSerializationError,
  modelSerializationErrorFromIssue,
  type ValidationIssue,
} from "./errors";
import {
  parseFlatMapModel,
  parseLinearAdditiveModel,
  parseLinearModel,
  type FittedFlatMapProphet,
  type FittedLinearAdditiveProphet,
  type FittedLinearProphet,
  type FlatMapParameters,
  type InvalidFittedModel,
  type LinearAdditiveParameters,
  type LinearParameters,
} from "./fitted-model";
import * as Seasonality from "./seasonality";

/** The legacy portable representation of a fitted ordinary linear model. */
export interface EncodedLinearModel {
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

/** Portable representation of a fitted linear-plus-additive ridge model. */
export interface EncodedLinearAdditiveModel {
  /** Identifies the normalized additive ridge prediction equation. */
  readonly modelKind: "linear-additive-ridge";

  /** Trend and ordered seasonal coefficients in observation units. */
  readonly coefficients: {
    readonly intercept: number;
    readonly slope: number;
    readonly seasonal: ReadonlyArray<number>;
  };

  /** Scaling learned for the linear trend coordinate. */
  readonly timeScaling: {
    readonly origin: number;
    readonly scale: number;
  };

  /** Ordered definitions from which coefficient offsets are reconstructed. */
  readonly seasonalities: ReadonlyArray<{
    readonly name: string;
    readonly periodDays: number;
    readonly fourierOrder: number;
    readonly priorScale: number;
  }>;

  /** Finite diagnostics for the fitted normalized ridge objective. */
  readonly fitSummary: LinearAdditiveParameters["fitSummary"];
}

/** Portable representation of a reduced flat MAP model. */
export interface EncodedFlatMapModel {
  /** Identifies the reduced flat MAP prediction equation. */
  readonly modelKind: "flat-map";

  /** Constant trend level and ordered seasonal coefficients in observation units. */
  readonly coefficients: {
    readonly level: number;
    readonly seasonal: ReadonlyArray<number>;
  };

  /** Ordered definitions from which coefficient offsets are reconstructed. */
  readonly seasonalities: ReadonlyArray<{
    readonly name: string;
    readonly periodDays: number;
    readonly fourierOrder: number;
    readonly priorScale: number;
  }>;

  /** Positive fitted observation noise in observation units. */
  readonly noiseScale: number;

  /** Finite diagnostics for the reduced flat MAP objective. */
  readonly fitSummary: FlatMapParameters["fitSummary"];
}

/** Every currently supported JSON-compatible fitted-model payload. */
export type EncodedFittedModel =
  | EncodedLinearModel
  | EncodedLinearAdditiveModel
  | EncodedFlatMapModel;

/** Fitted models with complete portable prediction state. */
export type SerializableFittedModel =
  | FittedLinearProphet
  | FittedLinearAdditiveProphet
  | FittedFlatMapProphet;

const EncodedLinearModelSchema = Schema.Struct({
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

const EncodedLinearAdditiveModelSchema = Schema.Struct({
  modelKind: Schema.Literal("linear-additive-ridge"),
  coefficients: Schema.Struct({
    intercept: Schema.Number,
    slope: Schema.Number,
    seasonal: Schema.Array(Schema.Number),
  }),
  timeScaling: Schema.Struct({
    origin: Schema.Number,
    scale: Schema.Number,
  }),
  seasonalities: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      periodDays: Schema.Number,
      fourierOrder: Schema.Number,
      priorScale: Schema.Number,
    }),
  ),
  fitSummary: Schema.Struct({
    method: Schema.Literal("normalized-ridge-v1"),
    valueScale: Schema.Number,
    observationCount: Schema.Number,
    numericalRank: Schema.Number,
    normalizedResidualSumSquares: Schema.Number,
    penalizedObjective: Schema.Number,
  }),
});

const EncodedFlatMapModelSchema = Schema.Struct({
  modelKind: Schema.Literal("flat-map"),
  coefficients: Schema.Struct({
    level: Schema.Number,
    seasonal: Schema.Array(Schema.Number),
  }),
  seasonalities: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      periodDays: Schema.Number,
      fourierOrder: Schema.Number,
      priorScale: Schema.Number,
    }),
  ),
  noiseScale: Schema.Number,
  fitSummary: Schema.Struct({
    method: Schema.Literal("flat-map-coordinate-v1"),
    termination: Schema.Literals(["converged", "constant-target-shortcut"]),
    valueScale: Schema.Number,
    observationCount: Schema.Number,
    iterations: Schema.Number,
    objective: Schema.Number,
    stationarityResidual: Schema.Number,
  }),
});

const EncodedModelDiscriminantSchema = Schema.Struct({
  modelKind: Schema.Literals(["linear-trend", "linear-additive-ridge", "flat-map"]),
});

const EncodedFittedModelSchema = Schema.Union([
  EncodedLinearModelSchema,
  EncodedLinearAdditiveModelSchema,
  EncodedFlatMapModelSchema,
]);

const decodeEncodedModelDiscriminant = Schema.decodeUnknownEffect(EncodedModelDiscriminantSchema, {
  errors: "all",
});

const decodeEncodedFittedModel = Schema.decodeUnknownEffect(EncodedFittedModelSchema, {
  errors: "all",
});

const portablePathFromModelPath = (
  modelKind: EncodedFittedModel["modelKind"],
  path: ReadonlyArray<PropertyKey>,
): ReadonlyArray<PropertyKey> => {
  const [field, ...rest] = path;

  switch (field) {
    case "model":
      return ["modelKind", ...rest];

    case "intercept":
      return ["coefficients", "intercept", ...rest];

    case "level":
      return ["coefficients", "level", ...rest];

    case "slope":
      return ["coefficients", "slope", ...rest];

    case "coefficients":
      return modelKind === "linear-additive-ridge" || modelKind === "flat-map"
        ? ["coefficients", "seasonal", ...rest]
        : ["coefficients", ...rest];

    case "timeOrigin":
      return ["timeScaling", "origin", ...rest];

    case "timeScale":
      return ["timeScaling", "scale", ...rest];

    case "seasonalities": {
      if (modelKind !== "linear-additive-ridge" && modelKind !== "flat-map") {
        return path;
      }

      const [layoutField, componentIndex, definitionField, ...definitionRest] = rest;

      if (layoutField === "components" && definitionField === "definition") {
        return ["seasonalities", componentIndex ?? 0, ...definitionRest];
      }

      return ["seasonalities"];
    }

    default:
      return path;
  }
};

const portableIssueFromModelIssue = (
  modelKind: EncodedFittedModel["modelKind"],
  issue: ValidationIssue,
): ValidationIssue => {
  if (issue.path === undefined) {
    return { message: issue.message };
  }

  return {
    message: issue.message,
    path: portablePathFromModelPath(modelKind, issue.path),
  };
};

const serializationErrorFromInvalidModel = (
  operation: "encode" | "decode",
  modelKind: EncodedFittedModel["modelKind"],
  error: InvalidFittedModel,
): ModelSerializationError =>
  new ModelSerializationError({
    operation,
    issues:
      operation === "decode"
        ? error.issues.map((issue) => portableIssueFromModelIssue(modelKind, issue))
        : error.issues,
    message: error.message,
  });

const serializationErrorFromInvalidSeasonality = (
  error: Seasonality.InvalidSeasonality,
): ModelSerializationError =>
  new ModelSerializationError({
    operation: "decode",
    issues: error.issues.map((issue) => ({
      message: issue.message,
      path: ["seasonalities", ...(issue.path ?? [])],
    })),
    message: error.message,
  });

const linearParametersFromEncoded = (encoded: EncodedLinearModel): LinearParameters => ({
  model: "linear-trend",
  intercept: encoded.coefficients.intercept,
  slope: encoded.coefficients.slope,
  timeOrigin: encoded.timeScaling.origin,
  timeScale: encoded.timeScaling.scale,
});

const encodeLinearModel = (model: FittedLinearProphet): EncodedLinearModel => ({
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

const encodeLinearAdditiveModel = (
  model: FittedLinearAdditiveProphet,
): EncodedLinearAdditiveModel => ({
  modelKind: "linear-additive-ridge",
  coefficients: {
    intercept: model.intercept,
    slope: model.slope,
    seasonal: Array.from(model.coefficients),
  },
  timeScaling: {
    origin: model.timeOrigin,
    scale: model.timeScale,
  },
  seasonalities: model.seasonalities.components.map((component) => ({
    name: component.definition.name,
    periodDays: component.definition.periodDays,
    fourierOrder: component.definition.fourierOrder,
    priorScale: component.definition.priorScale,
  })),
  fitSummary: {
    method: model.fitSummary.method,
    valueScale: model.fitSummary.valueScale,
    observationCount: model.fitSummary.observationCount,
    numericalRank: model.fitSummary.numericalRank,
    normalizedResidualSumSquares: model.fitSummary.normalizedResidualSumSquares,
    penalizedObjective: model.fitSummary.penalizedObjective,
  },
});

const encodeFlatMapModel = (model: FittedFlatMapProphet): EncodedFlatMapModel => ({
  modelKind: "flat-map",
  coefficients: {
    level: model.level,
    seasonal: Array.from(model.coefficients),
  },
  seasonalities: model.seasonalities.components.map((component) => ({
    name: component.definition.name,
    periodDays: component.definition.periodDays,
    fourierOrder: component.definition.fourierOrder,
    priorScale: component.definition.priorScale,
  })),
  noiseScale: model.noiseScale,
  fitSummary: {
    method: model.fitSummary.method,
    termination: model.fitSummary.termination,
    valueScale: model.fitSummary.valueScale,
    observationCount: model.fitSummary.observationCount,
    iterations: model.fitSummary.iterations,
    objective: model.fitSummary.objective,
    stationarityResidual: model.fitSummary.stationarityResidual,
  },
});

const decodeLinearAdditiveModel = Effect.fn("decodeLinearAdditiveModel")(function* (
  encoded: EncodedLinearAdditiveModel,
): Effect.fn.Return<FittedLinearAdditiveProphet, ModelSerializationError> {
  const definitions = yield* Seasonality.parseSeasonalityDefinitions(encoded.seasonalities).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  const seasonalities = yield* Seasonality.makeSeasonalityLayout(definitions).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  return yield* parseLinearAdditiveModel({
    model: "linear-additive-ridge",
    intercept: encoded.coefficients.intercept,
    slope: encoded.coefficients.slope,
    timeOrigin: encoded.timeScaling.origin,
    timeScale: encoded.timeScaling.scale,
    seasonalities,
    coefficients: encoded.coefficients.seasonal,
    fitSummary: encoded.fitSummary,
  }).pipe(
    Effect.mapError((error) =>
      serializationErrorFromInvalidModel("decode", "linear-additive-ridge", error),
    ),
  );
});

const decodeFlatMapModel = Effect.fn("decodeFlatMapModel")(function* (
  encoded: EncodedFlatMapModel,
): Effect.fn.Return<FittedFlatMapProphet, ModelSerializationError> {
  const definitions = yield* Seasonality.parseSeasonalityDefinitions(encoded.seasonalities).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  const seasonalities = yield* Seasonality.makeSeasonalityLayout(definitions).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  return yield* parseFlatMapModel({
    model: "flat-map",
    level: encoded.coefficients.level,
    seasonalities,
    coefficients: encoded.coefficients.seasonal,
    noiseScale: encoded.noiseScale,
    fitSummary: encoded.fitSummary,
  }).pipe(
    Effect.mapError((error) => serializationErrorFromInvalidModel("decode", "flat-map", error)),
  );
});

/**
 * Encode a supported fitted model into the current JSON-compatible portable format.
 *
 * @param model - A fitted linear or linear-additive model.
 * @returns The portable payload or a typed serialization failure.
 */
export const encodeFittedModel = Effect.fn("Prophet.encodeFittedModel")(function* (
  model: SerializableFittedModel,
): Effect.fn.Return<EncodedFittedModel, ModelSerializationError> {
  if (model.model === "linear-trend") {
    const parsedModel = yield* parseLinearModel(model).pipe(
      Effect.mapError((error) =>
        serializationErrorFromInvalidModel("encode", "linear-trend", error),
      ),
    );

    return encodeLinearModel(parsedModel);
  }

  if (model.model === "linear-additive-ridge") {
    const parsedModel = yield* parseLinearAdditiveModel(model).pipe(
      Effect.mapError((error) =>
        serializationErrorFromInvalidModel("encode", "linear-additive-ridge", error),
      ),
    );

    return encodeLinearAdditiveModel(parsedModel);
  }

  if (model.model === "flat-map") {
    const parsedModel = yield* parseFlatMapModel(model).pipe(
      Effect.mapError((error) => serializationErrorFromInvalidModel("encode", "flat-map", error)),
    );

    return encodeFlatMapModel(parsedModel);
  }

  return yield* Effect.fail(
    new ModelSerializationError({
      operation: "encode",
      issues: [{ path: ["model"], message: "Expected a serializable fitted model kind" }],
      message: "The fitted model kind cannot be serialized",
    }),
  );
});

/**
 * Decode an untrusted portable payload into a validated fitted model.
 *
 * No fitting backend is selected or acquired while decoding.
 *
 * @param input - The untrusted JSON-compatible value to decode.
 * @returns A fitted model or a typed serialization failure.
 */
export const decodeFittedModel = Effect.fn("Prophet.decodeFittedModel")(function* (
  input: Parameters<typeof decodeEncodedFittedModel>[0],
): Effect.fn.Return<SerializableFittedModel, ModelSerializationError> {
  yield* decodeEncodedModelDiscriminant(input).pipe(
    Effect.mapError((error) => modelSerializationErrorFromIssue("decode", error.issue)),
  );

  const encoded = yield* decodeEncodedFittedModel(input).pipe(
    Effect.mapError((error) => modelSerializationErrorFromIssue("decode", error.issue)),
  );

  if (encoded.modelKind === "linear-trend") {
    return yield* parseLinearModel(linearParametersFromEncoded(encoded)).pipe(
      Effect.mapError((error) =>
        serializationErrorFromInvalidModel("decode", "linear-trend", error),
      ),
    );
  }

  return encoded.modelKind === "flat-map"
    ? yield* decodeFlatMapModel(encoded)
    : yield* decodeLinearAdditiveModel(encoded);
});
