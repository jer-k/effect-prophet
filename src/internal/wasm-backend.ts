import { Effect } from "effect";

import {
  FittingError,
  PredictionError,
  type FittingFailureReason,
  type PredictionFailureReason,
  type WasmFailurePhase,
} from "../errors";
import type { SeasonalityLayout } from "../seasonality";
import type { KnownAdditiveFeatures, SeasonalityMaskMatrix } from "./additional-features";

/** One checked row-major prediction batch with seasonal component values. */
export interface WasmSeasonalPredictionBatch {
  /** Number of timestamp rows represented by `values`. */
  readonly rowCount: number;

  /** Number of named seasonal component values in each row. */
  readonly componentCount: number;

  /** Rows encoded as `[trend, additive, value, ...components]`. */
  readonly values: Float64Array;
}

/** Status codes shared by seasonal WASM prediction operations. */
export const seasonalPredictionStatus = {
  success: 0,
  invalidTimestamp: 1,
  invalidModel: 2,
  invalidConfiguration: 3,
  lengthMismatch: 4,
  sizeOverflow: 5,
  nonFiniteResult: 6,
} as const;

/** Add two safe integers, returning `undefined` when the result is not safe. */
export const checkedAdd = (left: number, right: number): number | undefined => {
  if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
    return undefined;
  }

  const result = left + right;

  return Number.isSafeInteger(result) ? result : undefined;
};

/** Multiply two safe integers, returning `undefined` when the result is not safe. */
export const checkedMultiply = (left: number, right: number): number | undefined => {
  if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
    return undefined;
  }

  const result = left * right;

  return Number.isSafeInteger(result) ? result : undefined;
};

/** Construct a fitting error with common WASM boundary context. */
export const wasmFittingError = (
  observationCount: number,
  fields: {
    readonly reason: FittingFailureReason;
    readonly message: string;
    readonly parameterCount?: number;
    readonly backendPhase?: WasmFailurePhase;
  },
  cause?: unknown,
): FittingError => {
  const schemaFields = { ...fields, observationCount };

  return cause === undefined
    ? new FittingError(schemaFields)
    : new FittingError(schemaFields, { cause });
};

/** Fail with a fitting error carrying common WASM boundary context. */
export const failWasmFitting = (
  observationCount: number,
  fields: Parameters<typeof wasmFittingError>[1],
): Effect.Effect<never, FittingError> => Effect.fail(wasmFittingError(observationCount, fields));

/** Construct a prediction error with common WASM boundary context. */
export const wasmPredictionError = (
  timestamp: number,
  fields: {
    readonly reason: PredictionFailureReason;
    readonly message: string;
    readonly backendPhase?: WasmFailurePhase;
  },
  cause?: unknown,
): PredictionError => {
  const schemaFields = { ...fields, timestamp };

  return cause === undefined
    ? new PredictionError(schemaFields)
    : new PredictionError(schemaFields, { cause });
};

/** Fail with a prediction error carrying common WASM boundary context. */
export const failWasmPrediction = (
  timestamp: number,
  fields: Parameters<typeof wasmPredictionError>[1],
): Effect.Effect<never, PredictionError> => Effect.fail(wasmPredictionError(timestamp, fields));

/** Run one WASM fitting step and classify a thrown boundary failure. */
export const attemptWasmFitting = <Result>(
  operation: () => Result,
  observationCount: number,
  context: {
    readonly phase: "load" | "execute";
    readonly message: string;
    readonly parameterCount?: number;
  },
): Effect.Effect<Result, FittingError> =>
  Effect.try({
    try: operation,
    catch: (cause) => {
      const fields = {
        reason: "backend-failure",
        backendPhase: context.phase,
        message: context.message,
      } as const;

      return context.parameterCount === undefined
        ? wasmFittingError(observationCount, fields, cause)
        : wasmFittingError(
            observationCount,
            { ...fields, parameterCount: context.parameterCount },
            cause,
          );
    },
  });

/** Run one WASM prediction step and classify a thrown boundary failure. */
export const attemptWasmPrediction = <Result>(
  operation: () => Result,
  timestamp: number,
  context: { readonly phase: "load" | "execute"; readonly message: string },
): Effect.Effect<Result, PredictionError> =>
  Effect.try({
    try: operation,
    catch: (cause) =>
      wasmPredictionError(
        timestamp,
        {
          reason: "backend-failure",
          backendPhase: context.phase,
          message: context.message,
        },
        cause,
      ),
  });

/** Read an integral status code from a non-empty packed WASM frame. */
export const readWasmStatus = (packed: Float64Array): number | undefined => {
  if (!(packed instanceof Float64Array) || packed.length === 0) {
    return undefined;
  }

  const status = packed[0];

  return status !== undefined && Number.isFinite(status) && Number.isInteger(status)
    ? status
    : undefined;
};

/** Resolve the timestamp selected by a two-value indexed WASM failure frame. */
export const indexedFailureTimestamp = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
): number | undefined => {
  if (packed.length !== 2) {
    return undefined;
  }

  const failedIndex = packed[1];

  if (
    failedIndex === undefined ||
    !Number.isSafeInteger(failedIndex) ||
    failedIndex < 0 ||
    failedIndex >= timestamps.length
  ) {
    return undefined;
  }

  return timestamps[failedIndex];
};

/** Resolve the parameter and packed-frame sizes shared by seasonal fitting protocols. */
export const seasonalFitDimensions = (coefficientCount: number) => {
  const parameterCount = checkedAdd(2, coefficientCount);
  const packedLength = checkedAdd(9, coefficientCount);

  return parameterCount === undefined || packedLength === undefined
    ? undefined
    : { parameterCount, packedLength };
};

/** Pack periods and Fourier orders for a seasonal prediction call. */
export const packSeasonalitiesForPrediction = (seasonalities: SeasonalityLayout) => {
  const componentCount = seasonalities.components.length;
  const periods = new Float64Array(componentCount);
  const orders = new Float64Array(componentCount);

  for (const [index, component] of seasonalities.components.entries()) {
    periods[index] = component.definition.periodDays;
    orders[index] = component.definition.fourierOrder;
  }

  return { periods, orders };
};

/** Pack periods, Fourier orders, and prior scales for a seasonal fitting call. */
export const packSeasonalitiesForFit = (seasonalities: SeasonalityLayout) => {
  const { periods, orders } = packSeasonalitiesForPrediction(seasonalities);
  const priors = new Float64Array(seasonalities.components.length);

  for (const [index, component] of seasonalities.components.entries()) {
    priors[index] = component.definition.priorScale;
  }

  return { periods, orders, priors };
};

/** Pack checked masks, feature values, priors, and component ranges for the numeric ABI. */
export const packKnownAdditiveFeatures = (
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
) => {
  const packedMasks = new Float64Array(masks.values);
  const values = new Float64Array(features.matrix.values);
  const priors = new Float64Array(features.layout.priorScales);
  const offsets = new Float64Array(features.layout.components.length);
  const counts = new Float64Array(features.layout.components.length);

  for (const [index, component] of features.layout.components.entries()) {
    offsets[index] = component.coefficientOffset;
    counts[index] = component.coefficientCount;
  }

  return { packedMasks, values, priors, offsets, counts };
};

type WasmModelType = "flat-map" | "linear-piecewise-map" | "linear-trend";

type SeasonalPredictionStatuses = {
  readonly success: number;
  readonly invalidTimestamp: number;
  readonly invalidModel: number;
  readonly invalidConfiguration: number;
  readonly lengthMismatch?: number;
  readonly sizeOverflow: number;
  readonly nonFiniteResult: number;
};

type SeasonalPredictionMessages = {
  readonly arithmeticOverflow: string;
  readonly malformedProtocol: string;
  readonly invalidModel: string;
  readonly sizeOverflow: string;
  readonly invalidTimestamp: string;
  readonly nonFiniteResult: string;
};

/** Decode the packed prediction protocol shared by seasonal WASM models. */
export const decodeSeasonalPredictions = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
  componentCount: number,
  messages: SeasonalPredictionMessages,
  statuses: SeasonalPredictionStatuses = seasonalPredictionStatus,
): Effect.Effect<WasmSeasonalPredictionBatch, PredictionError> => {
  const firstTimestamp = timestamps[0];

  if (firstTimestamp === undefined) {
    return Effect.succeed({ rowCount: 0, componentCount, values: new Float64Array() });
  }

  const rowWidth = checkedAdd(3, componentCount);

  const valueCount =
    rowWidth === undefined ? undefined : checkedMultiply(timestamps.length, rowWidth);

  const expectedLength = valueCount === undefined ? undefined : checkedAdd(1, valueCount);

  if (expectedLength === undefined) {
    return failWasmPrediction(firstTimestamp, {
      reason: "backend-failure",
      message: messages.arithmeticOverflow,
    });
  }

  const status = readWasmStatus(packed);

  const protocolFailure = (): Effect.Effect<never, PredictionError> =>
    failWasmPrediction(firstTimestamp, {
      reason: "backend-failure",
      backendPhase: "protocol",
      message: messages.malformedProtocol,
    });

  if (status === undefined) {
    return protocolFailure();
  }

  if (status === statuses.success) {
    if (packed.length !== expectedLength) {
      return protocolFailure();
    }

    const values = packed.slice(1);

    if (values.some((value) => !Number.isFinite(value))) {
      return protocolFailure();
    }

    return Effect.succeed({ rowCount: timestamps.length, componentCount, values });
  }

  if (
    status === statuses.invalidModel ||
    status === statuses.invalidConfiguration ||
    status === statuses.lengthMismatch
  ) {
    return packed.length === 1
      ? failWasmPrediction(firstTimestamp, {
          reason: "invalid-model",
          message: messages.invalidModel,
        })
      : protocolFailure();
  }

  if (status === statuses.sizeOverflow) {
    return packed.length === 1
      ? failWasmPrediction(firstTimestamp, {
          reason: "backend-failure",
          message: messages.sizeOverflow,
        })
      : protocolFailure();
  }

  const failedTimestamp = indexedFailureTimestamp(packed, timestamps);

  if (failedTimestamp === undefined) {
    return protocolFailure();
  }

  if (status === statuses.invalidTimestamp) {
    return failWasmPrediction(failedTimestamp, {
      reason: "backend-failure",
      message: messages.invalidTimestamp,
    });
  }

  if (status === statuses.nonFiniteResult) {
    return failWasmPrediction(failedTimestamp, {
      reason: "non-finite-forecast",
      message: messages.nonFiniteResult,
    });
  }

  return protocolFailure();
};

/** Build stable span options for a WASM fitting boundary. */
export const wasmFitSpanOptions = (
  model: { readonly type: WasmModelType; readonly growth: "flat" | "linear" },
  observationCount: number,
  seasonalCounts?: { readonly components: number; readonly coefficients: number },
) => {
  const attributes = {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "fit",
    "effect_prophet.model.type": model.type,
    "effect_prophet.growth": model.growth,
    "effect_prophet.observation.count": observationCount,
  };

  if (seasonalCounts === undefined) {
    return { attributes };
  }

  return {
    attributes: {
      ...attributes,
      "effect_prophet.seasonality.count": seasonalCounts.components,
      "effect_prophet.coefficient.count": seasonalCounts.coefficients,
    },
  };
};

/** Build stable span options for a WASM prediction boundary. */
export const wasmPredictSpanOptions = (
  modelType: WasmModelType,
  predictionCount: number,
  componentCount?: number,
) => {
  const attributes = {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "predict",
    "effect_prophet.model.type": modelType,
    "effect_prophet.prediction.count": predictionCount,
  };

  if (componentCount === undefined) {
    return { attributes };
  }

  return {
    attributes: {
      ...attributes,
      "effect_prophet.seasonality.count": componentCount,
    },
  };
};
