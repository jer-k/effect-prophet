import { Effect, Schema } from "effect";

import { ComponentModeSchema, type ComponentMode } from "./component-mode";
import {
  ModelSerializationError,
  modelSerializationErrorFromIssue,
  type ValidationIssue,
} from "./errors";
import {
  parseEventCalendar,
  type EncodedEventOccurrence,
  type InvalidEventCalendar,
} from "./event";
import {
  parseFlatMapModel,
  parseLinearModel,
  parsePiecewiseMapModel,
  type FittedFlatMapProphet,
  type FittedLinearProphet,
  type FittedPiecewiseMapProphet,
  type FlatMapParameters,
  type InvalidFittedModel,
  type LinearParameters,
  type PiecewiseMapParameters,
} from "./fitted-model";
import type {
  EncodedRegressorStandardization,
  FittedRegressor,
  RegressorTransform,
} from "./regressor";
import * as Seasonality from "./seasonality";
import { TargetScalingSchema, type TargetScaling } from "./target-scaling";

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

/** Portable training-derived metadata for one fitted additive regressor. */
export interface EncodedFittedRegressor {
  readonly name: string;
  readonly priorScale: number;
  readonly standardization: EncodedRegressorStandardization;
  readonly transform: RegressorTransform;
  readonly mode?: ComponentMode;
}

/** Portable representation of a reduced flat MAP model. */
export interface EncodedFlatMapModel {
  /** Identifies the reduced flat MAP prediction equation. */
  readonly modelKind: "flat-map";

  /** Complete train-derived target scaling; absent only in legacy payloads. */
  readonly targetScaling?: TargetScaling;

  /** Constant trend level and ordered seasonal coefficients in observation units. */
  readonly coefficients: {
    readonly level: number;
    readonly seasonal: ReadonlyArray<number>;
    readonly events?: ReadonlyArray<number>;
    readonly regressors?: ReadonlyArray<number>;
  };

  readonly holidaysMode?: ComponentMode;
  readonly events?: ReadonlyArray<EncodedEventOccurrence>;
  readonly regressors?: ReadonlyArray<EncodedFittedRegressor>;

  /** Ordered definitions from which coefficient offsets are reconstructed. */
  readonly seasonalities: ReadonlyArray<{
    readonly name: string;
    readonly periodDays: number;
    readonly fourierOrder: number;
    readonly priorScale: number;
    readonly conditionName?: string;
    readonly mode?: ComponentMode;
  }>;

  /** Positive fitted observation noise in observation units. */
  readonly noiseScale: number;

  /** Finite diagnostics for the reduced flat MAP objective. */
  readonly fitSummary: FlatMapParameters["fitSummary"];
}

/** Portable representation of a linear piecewise MAP model. */
export interface EncodedPiecewiseMapModel {
  readonly modelKind: "linear-piecewise-map";
  readonly targetScaling?: TargetScaling;
  readonly coefficients: {
    readonly intercept: number;
    readonly slope: number;
    readonly deltas: ReadonlyArray<number>;
    readonly seasonal: ReadonlyArray<number>;
    readonly events: ReadonlyArray<number>;
    readonly regressors?: ReadonlyArray<number>;
  };
  readonly events: ReadonlyArray<EncodedEventOccurrence>;
  readonly holidaysMode?: ComponentMode;
  readonly regressors?: ReadonlyArray<EncodedFittedRegressor>;
  readonly timeScaling: {
    readonly origin: number;
    readonly scale: number;
  };
  readonly changepointTimestamps: ReadonlyArray<number>;
  readonly seasonalities: ReadonlyArray<{
    readonly name: string;
    readonly periodDays: number;
    readonly fourierOrder: number;
    readonly priorScale: number;
    readonly conditionName?: string;
    readonly mode?: ComponentMode;
  }>;
  readonly noiseScale: number;
  readonly fitSummary: PiecewiseMapParameters["fitSummary"];
}

/** Every currently supported JSON-compatible fitted-model payload. */
export type EncodedFittedModel =
  | EncodedLinearModel
  | EncodedFlatMapModel
  | EncodedPiecewiseMapModel;

/** Fitted models with complete portable prediction state. */
export type SerializableFittedModel =
  | FittedLinearProphet
  | FittedFlatMapProphet
  | FittedPiecewiseMapProphet;

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

const EncodedEventOccurrencesSchema = Schema.Array(
  Schema.Struct({
    name: Schema.String,
    date: Schema.String,
    lowerWindowDays: Schema.optionalKey(Schema.Number),
    upperWindowDays: Schema.optionalKey(Schema.Number),
    priorScale: Schema.optionalKey(Schema.Number),
  }),
);

const EncodedFittedRegressorSchema = Schema.Struct({
  name: Schema.String,
  priorScale: Schema.Number,
  standardization: Schema.Literals(["auto", "always", "never"]),
  mode: Schema.optionalKey(ComponentModeSchema),
  transform: Schema.Union([
    Schema.Struct({
      mode: Schema.Literal("identity"),
      reason: Schema.Literals(["disabled", "binary", "constant"]),
    }),
    Schema.Struct({
      mode: Schema.Literal("standardized"),
      mean: Schema.Number,
      sampleStandardDeviation: Schema.Number,
    }),
  ]),
});

const EncodedFlatMapModelSchema = Schema.Struct({
  modelKind: Schema.Literal("flat-map"),
  targetScaling: Schema.optionalKey(TargetScalingSchema),
  coefficients: Schema.Struct({
    level: Schema.Number,
    seasonal: Schema.Array(Schema.Number),
    events: Schema.Array(Schema.Number).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
    regressors: Schema.Array(Schema.Number).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  }),
  holidaysMode: ComponentModeSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("additive"))),
  events: EncodedEventOccurrencesSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  regressors: Schema.Array(EncodedFittedRegressorSchema).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed([])),
  ),
  seasonalities: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      periodDays: Schema.Number,
      fourierOrder: Schema.Number,
      priorScale: Schema.Number,
      conditionName: Schema.optionalKey(Schema.String),
      mode: ComponentModeSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("additive"))),
    }),
  ),
  noiseScale: Schema.Number,
  fitSummary: Schema.Struct({
    method: Schema.Literals(["flat-map-coordinate-v1", "mixed-flat-map-coordinate-v1"]),
    termination: Schema.Literals(["converged", "constant-target-shortcut"]),
    valueScale: Schema.Number,
    observationCount: Schema.Number,
    iterations: Schema.Number,
    objective: Schema.Number,
    stationarityResidual: Schema.Number,
  }),
});

const EncodedPiecewiseMapModelSchema = Schema.Struct({
  modelKind: Schema.Literal("linear-piecewise-map"),
  targetScaling: Schema.optionalKey(TargetScalingSchema),
  coefficients: Schema.Struct({
    intercept: Schema.Number,
    slope: Schema.Number,
    deltas: Schema.Array(Schema.Number),
    seasonal: Schema.Array(Schema.Number),
    events: Schema.Array(Schema.Number).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
    regressors: Schema.Array(Schema.Number).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  }),
  regressors: Schema.Array(EncodedFittedRegressorSchema).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed([])),
  ),
  events: EncodedEventOccurrencesSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  holidaysMode: ComponentModeSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("additive"))),
  timeScaling: Schema.Struct({
    origin: Schema.Number,
    scale: Schema.Number,
  }),
  changepointTimestamps: Schema.Array(Schema.Number),
  seasonalities: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      periodDays: Schema.Number,
      fourierOrder: Schema.Number,
      priorScale: Schema.Number,
      conditionName: Schema.optionalKey(Schema.String),
      mode: ComponentModeSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("additive"))),
    }),
  ),
  noiseScale: Schema.Number,
  fitSummary: Schema.Struct({
    method: Schema.Literals(["piecewise-map-coordinate-v1", "mixed-piecewise-map-coordinate-v1"]),
    termination: Schema.Literals(["converged", "constant-target-shortcut"]),
    valueScale: Schema.Number,
    observationCount: Schema.Number,
    iterations: Schema.Number,
    objective: Schema.Number,
    stationarityResidual: Schema.Number,
    changepointPriorScale: Schema.Number,
  }),
});

const EncodedModelDiscriminantSchema = Schema.Struct({
  modelKind: Schema.Literals(["linear-trend", "flat-map", "linear-piecewise-map"]),
});

const EncodedFittedModelSchema = Schema.Union([
  EncodedLinearModelSchema,
  EncodedFlatMapModelSchema,
  EncodedPiecewiseMapModelSchema,
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
      return modelKind === "flat-map" || modelKind === "linear-piecewise-map"
        ? ["coefficients", "seasonal", ...rest]
        : ["coefficients", ...rest];

    case "timeOrigin":
      return ["timeScaling", "origin", ...rest];

    case "timeScale":
      return ["timeScaling", "scale", ...rest];

    case "seasonalities": {
      if (modelKind !== "flat-map" && modelKind !== "linear-piecewise-map") {
        return path;
      }

      const [layoutField, componentIndex, definitionField, ...definitionRest] = rest;

      if (layoutField === "components" && definitionField === "definition") {
        return ["seasonalities", componentIndex ?? 0, ...definitionRest];
      }

      return ["seasonalities"];
    }

    case "regressors": {
      const [regressorIndex, regressorField, ...regressorRest] = rest;

      if (regressorField === "definition") {
        return ["regressors", regressorIndex ?? 0, ...regressorRest];
      }

      if (regressorField === "coefficient") {
        return ["coefficients", "regressors", regressorIndex ?? 0];
      }

      return ["regressors", regressorIndex ?? 0, regressorField ?? "transform", ...regressorRest];
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

const serializationErrorFromInvalidEvent = (error: InvalidEventCalendar): ModelSerializationError =>
  new ModelSerializationError({
    operation: "decode",
    issues: error.issues.map((issue) => ({
      message: issue.message,
      path: ["events", ...(issue.path ?? [])],
    })),
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

const encodeFittedRegressors = (
  regressors: ReadonlyArray<FittedRegressor>,
): ReadonlyArray<EncodedFittedRegressor> =>
  regressors.map((regressor) => ({
    name: regressor.definition.name,
    priorScale: regressor.definition.priorScale,
    standardization: regressor.definition.standardization,
    transform: { ...regressor.transform },
    mode: regressor.definition.mode,
  }));

const encodeSeasonalityDefinition = (
  component: FittedPiecewiseMapProphet["seasonalities"]["components"][number],
): EncodedPiecewiseMapModel["seasonalities"][number] => {
  const definition = {
    name: component.definition.name,
    periodDays: component.definition.periodDays,
    fourierOrder: component.definition.fourierOrder,
    priorScale: component.definition.priorScale,
    mode: component.definition.mode,
  };

  if (component.definition.conditionName === undefined) {
    return definition;
  }

  return { ...definition, conditionName: component.definition.conditionName };
};

const encodeFlatMapModel = (model: FittedFlatMapProphet): EncodedFlatMapModel => ({
  modelKind: "flat-map",
  targetScaling: { ...model.targetScaling },
  coefficients: {
    level: model.level,
    seasonal: Array.from(model.coefficients),
    events: Array.from(model.eventCoefficients),
    regressors: model.regressors.map((regressor) => regressor.coefficient),
  },
  holidaysMode: model.events.mode,
  events: model.events.occurrences.map((occurrence) => ({
    name: occurrence.name,
    date: occurrence.date,
    lowerWindowDays: occurrence.lowerWindowDays,
    upperWindowDays: occurrence.upperWindowDays,
    priorScale: occurrence.priorScale,
  })),
  regressors: encodeFittedRegressors(model.regressors),
  seasonalities: model.seasonalities.components.map(encodeSeasonalityDefinition),
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

const encodePiecewiseMapModel = (model: FittedPiecewiseMapProphet): EncodedPiecewiseMapModel => ({
  modelKind: "linear-piecewise-map",
  targetScaling: { ...model.targetScaling },
  coefficients: {
    intercept: model.intercept,
    slope: model.slope,
    deltas: Array.from(model.deltas),
    seasonal: Array.from(model.coefficients),
    events: Array.from(model.eventCoefficients),
    regressors: model.regressors.map((regressor) => regressor.coefficient),
  },
  regressors: encodeFittedRegressors(model.regressors),
  holidaysMode: model.events.mode,
  events: model.events.occurrences.map((occurrence) => ({
    name: occurrence.name,
    date: occurrence.date,
    lowerWindowDays: occurrence.lowerWindowDays,
    upperWindowDays: occurrence.upperWindowDays,
    priorScale: occurrence.priorScale,
  })),
  timeScaling: { origin: model.timeOrigin, scale: model.timeScale },
  changepointTimestamps: Array.from(model.changepointTimestamps),
  seasonalities: model.seasonalities.components.map(encodeSeasonalityDefinition),
  noiseScale: model.noiseScale,
  fitSummary: { ...model.fitSummary },
});

const fittedRegressorsFromEncoded = (
  metadata: ReadonlyArray<EncodedFittedRegressor> | undefined,
  coefficients: ReadonlyArray<number> | undefined,
): Effect.Effect<
  ReadonlyArray<{
    readonly definition: {
      readonly name: string;
      readonly priorScale: number;
      readonly standardization: EncodedRegressorStandardization;
    };
    readonly transform: RegressorTransform;
    readonly coefficient: number;
  }>,
  ModelSerializationError
> => {
  const resolvedMetadata = metadata ?? [];
  const resolvedCoefficients = coefficients ?? [];

  if (resolvedMetadata.length !== resolvedCoefficients.length) {
    return Effect.fail(
      new ModelSerializationError({
        operation: "decode",
        issues: [
          {
            path: ["coefficients", "regressors"],
            message: `Expected exactly ${resolvedMetadata.length} regressor coefficients`,
          },
        ],
        message: "Persisted regressor metadata and coefficients must align",
      }),
    );
  }

  return Effect.succeed(
    resolvedMetadata.map((regressor, index) => ({
      definition: {
        name: regressor.name,
        priorScale: regressor.priorScale,
        standardization: regressor.standardization,
        mode: regressor.mode ?? "additive",
      },
      transform: regressor.transform,
      coefficient: resolvedCoefficients[index] ?? Number.NaN,
    })),
  );
};

const decodeFlatMapModel = Effect.fn("decodeFlatMapModel")(function* (
  encoded: EncodedFlatMapModel,
): Effect.fn.Return<FittedFlatMapProphet, ModelSerializationError> {
  const definitions = yield* Seasonality.parseSeasonalityDefinitions(encoded.seasonalities).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  const seasonalities = yield* Seasonality.makeSeasonalityLayout(definitions).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  const events = yield* parseEventCalendar(encoded.events, encoded.holidaysMode).pipe(
    Effect.mapError(serializationErrorFromInvalidEvent),
  );

  const regressors = yield* fittedRegressorsFromEncoded(
    encoded.regressors,
    encoded.coefficients.regressors,
  );

  const targetScaling = encoded.targetScaling ?? {
    mode: "absmax" as const,
    offset: 0,
    scale: encoded.fitSummary.valueScale,
  };

  return yield* parseFlatMapModel({
    model: "flat-map",
    targetScaling,
    level: encoded.coefficients.level,
    seasonalities,
    coefficients: encoded.coefficients.seasonal,
    events,
    eventCoefficients: encoded.coefficients.events,
    regressors,
    noiseScale: encoded.noiseScale,
    fitSummary: encoded.fitSummary,
  }).pipe(
    Effect.mapError((error) => serializationErrorFromInvalidModel("decode", "flat-map", error)),
  );
});

const decodePiecewiseMapModel = Effect.fn("decodePiecewiseMapModel")(function* (
  encoded: EncodedPiecewiseMapModel,
): Effect.fn.Return<FittedPiecewiseMapProphet, ModelSerializationError> {
  const definitions = yield* Seasonality.parseSeasonalityDefinitions(encoded.seasonalities).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  const seasonalities = yield* Seasonality.makeSeasonalityLayout(definitions).pipe(
    Effect.mapError(serializationErrorFromInvalidSeasonality),
  );

  const events = yield* parseEventCalendar(encoded.events, encoded.holidaysMode).pipe(
    Effect.mapError(serializationErrorFromInvalidEvent),
  );

  const regressors = yield* fittedRegressorsFromEncoded(
    encoded.regressors,
    encoded.coefficients.regressors,
  );

  const targetScaling = encoded.targetScaling ?? {
    mode: "absmax" as const,
    offset: 0,
    scale: encoded.fitSummary.valueScale,
  };

  return yield* parsePiecewiseMapModel({
    model: "linear-piecewise-map",
    targetScaling,
    intercept: encoded.coefficients.intercept,
    slope: encoded.coefficients.slope,
    timeOrigin: encoded.timeScaling.origin,
    timeScale: encoded.timeScaling.scale,
    changepointTimestamps: encoded.changepointTimestamps,
    deltas: encoded.coefficients.deltas,
    seasonalities,
    coefficients: encoded.coefficients.seasonal,
    events,
    eventCoefficients: encoded.coefficients.events,
    regressors,
    noiseScale: encoded.noiseScale,
    fitSummary: encoded.fitSummary,
  }).pipe(
    Effect.mapError((error) =>
      serializationErrorFromInvalidModel("decode", "linear-piecewise-map", error),
    ),
  );
});

/**
 * Encode a supported fitted model into the current JSON-compatible portable format.
 *
 * @param model - A supported fitted model.
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

  if (model.model === "flat-map") {
    const parsedModel = yield* parseFlatMapModel(model).pipe(
      Effect.mapError((error) => serializationErrorFromInvalidModel("encode", "flat-map", error)),
    );

    return encodeFlatMapModel(parsedModel);
  }

  if (model.model === "linear-piecewise-map") {
    const parsedModel = yield* parsePiecewiseMapModel(model).pipe(
      Effect.mapError((error) =>
        serializationErrorFromInvalidModel("encode", "linear-piecewise-map", error),
      ),
    );

    return encodePiecewiseMapModel(parsedModel);
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

  if (encoded.modelKind === "flat-map") {
    return yield* decodeFlatMapModel(encoded);
  }

  return yield* decodePiecewiseMapModel(encoded);
});
