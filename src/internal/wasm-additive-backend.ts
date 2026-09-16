import { Effect } from "effect";

import { FittingError, PredictionError, type WasmFailurePhase } from "../errors";
import {
  parseLinearAdditiveModel,
  type FittedLinearAdditiveProphet,
  type LinearAdditiveParameters,
} from "../fitted-model";
import type { TrainingInput } from "./fitting-backend";
import type { SeasonalityLayout } from "../seasonality";
import { loadProphetWasmModule, type AdditiveRidgeWasmBindings } from "./prophet-wasm-module";

/** Lazy loader for checked Rust/WASM additive ridge bindings. */
export type WasmAdditiveLoader = () => AdditiveRidgeWasmBindings;

/** One checked row-major additive prediction batch. */
export interface AdditivePredictionBatch {
  /** Number of timestamp rows represented by `values`. */
  readonly rowCount: number;

  /** Number of named seasonal component values in each row. */
  readonly componentCount: number;

  /** Rows encoded as `[trend, additive, value, ...components]`. */
  readonly values: Float64Array;
}

/** Internal additive fitting and prediction operations backed by one WASM loader. */
export interface WasmAdditiveAdapter {
  /** Fit a linear trend and non-empty additive layout through the configured WASM boundary. */
  readonly fit: (
    input: TrainingInput,
    seasonalities: SeasonalityLayout,
  ) => Effect.Effect<LinearAdditiveParameters, FittingError>;

  /** Predict through the configured WASM boundary. */
  readonly predict: (
    model: FittedLinearAdditiveProphet,
    timestamps: ReadonlyArray<number>,
  ) => Effect.Effect<AdditivePredictionBatch, PredictionError>;
}

const fitStatus = {
  success: 0,
  insufficientObservations: 1,
  lengthMismatch: 2,
  invalidObservation: 3,
  invalidConfiguration: 4,
  zeroTimeRange: 5,
  rankDeficient: 6,
  sizeOverflow: 7,
  nonFiniteResult: 8,
} as const;

const predictionStatus = {
  success: 0,
  invalidTimestamp: 1,
  invalidModel: 2,
  invalidConfiguration: 3,
  lengthMismatch: 4,
  sizeOverflow: 5,
  nonFiniteResult: 6,
} as const;

const checkedAdd = (left: number, right: number): number | undefined => {
  if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
    return undefined;
  }

  if (left > Number.MAX_SAFE_INTEGER - right) {
    return undefined;
  }

  return left + right;
};

const checkedMultiply = (left: number, right: number): number | undefined => {
  if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
    return undefined;
  }

  if (left !== 0 && right > Math.floor(Number.MAX_SAFE_INTEGER / left)) {
    return undefined;
  }

  return left * right;
};

const makeFittingError = (
  observationCount: number,
  fields: {
    readonly reason:
      | "insufficient-observations"
      | "degenerate-observations"
      | "rank-deficient"
      | "non-finite-result"
      | "backend-failure";
    readonly message: string;
    readonly parameterCount?: number;
    readonly backendPhase?: WasmFailurePhase;
  },
  cause?: unknown,
): FittingError => {
  const schemaFields = {
    ...fields,
    observationCount,
  };

  return cause === undefined
    ? new FittingError(schemaFields)
    : new FittingError(schemaFields, { cause });
};

const fittingFailure = (
  observationCount: number,
  fields: Parameters<typeof makeFittingError>[1],
): Effect.Effect<never, FittingError> => Effect.fail(makeFittingError(observationCount, fields));

const fittingProtocolFailure = (
  observationCount: number,
  parameterCount: number,
): Effect.Effect<never, FittingError> =>
  fittingFailure(observationCount, {
    reason: "backend-failure",
    parameterCount,
    backendPhase: "protocol",
    message: "WASM additive fitting backend returned a malformed protocol result",
  });

const decodeFittedParameters = (
  packed: Float64Array,
  observationCount: number,
  seasonalities: LinearAdditiveParameters["seasonalities"],
): Effect.Effect<LinearAdditiveParameters, FittingError> => {
  const parameterCount = seasonalities.coefficientCount + 2;
  const expectedLength = checkedAdd(9, seasonalities.coefficientCount);

  if (expectedLength === undefined) {
    return fittingFailure(observationCount, {
      reason: "backend-failure",
      parameterCount,
      message: "Additive fitting result dimensions exceed safe integer arithmetic",
    });
  }

  if (!(packed instanceof Float64Array) || packed.length === 0) {
    return fittingProtocolFailure(observationCount, parameterCount);
  }

  const status = packed[0];

  if (status === undefined || !Number.isFinite(status) || !Number.isInteger(status)) {
    return fittingProtocolFailure(observationCount, parameterCount);
  }

  if (status === fitStatus.success) {
    if (packed.length !== expectedLength) {
      return fittingProtocolFailure(observationCount, parameterCount);
    }

    return parseLinearAdditiveModel({
      model: "linear-additive-ridge",
      intercept: packed[1],
      slope: packed[2],
      timeOrigin: packed[3],
      timeScale: packed[4],
      seasonalities,
      coefficients: Array.from(packed.slice(9)),
      fitSummary: {
        method: "normalized-ridge-v1",
        valueScale: packed[5],
        observationCount,
        numericalRank: packed[6],
        normalizedResidualSumSquares: packed[7],
        penalizedObjective: packed[8],
      },
    }).pipe(
      Effect.mapError(() =>
        makeFittingError(observationCount, {
          reason: "backend-failure",
          parameterCount,
          backendPhase: "protocol",
          message: "WASM additive fitting backend returned invalid fitted parameters",
        }),
      ),
    );
  }

  if (packed.length !== 1) {
    return fittingProtocolFailure(observationCount, parameterCount);
  }

  switch (status) {
    case fitStatus.insufficientObservations:
      return fittingFailure(observationCount, {
        reason: "insufficient-observations",
        parameterCount,
        message: "At least two observations are required to fit an additive model",
      });

    case fitStatus.zeroTimeRange:
      return fittingFailure(observationCount, {
        reason: "degenerate-observations",
        parameterCount,
        message: "An additive trend requires at least two distinct timestamps",
      });

    case fitStatus.rankDeficient:
      return fittingFailure(observationCount, {
        reason: "rank-deficient",
        parameterCount,
        message: "The augmented additive design is numerically rank deficient",
      });

    case fitStatus.nonFiniteResult:
      return fittingFailure(observationCount, {
        reason: "non-finite-result",
        parameterCount,
        message: "Additive ridge fitting produced a non-finite numerical result",
      });

    case fitStatus.sizeOverflow:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "Additive fitting dimensions exceed the WASM dense-buffer policy",
      });

    case fitStatus.lengthMismatch:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "Training timestamps and values must have equal lengths",
      });

    case fitStatus.invalidObservation:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "Training observations supplied to the additive backend must be finite",
      });

    case fitStatus.invalidConfiguration:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "The additive backend rejected resolved seasonality metadata",
      });

    default:
      return fittingProtocolFailure(observationCount, parameterCount);
  }
};

const makePredictionError = (
  timestamp: number,
  fields: {
    readonly reason: "invalid-model" | "non-finite-forecast" | "backend-failure";
    readonly message: string;
    readonly backendPhase?: WasmFailurePhase;
  },
  cause?: unknown,
): PredictionError => {
  const schemaFields = {
    ...fields,
    timestamp,
  };

  return cause === undefined
    ? new PredictionError(schemaFields)
    : new PredictionError(schemaFields, { cause });
};

const predictionFailure = (
  timestamp: number,
  fields: Parameters<typeof makePredictionError>[1],
): Effect.Effect<never, PredictionError> => Effect.fail(makePredictionError(timestamp, fields));

const predictionProtocolFailure = (timestamp: number): Effect.Effect<never, PredictionError> =>
  predictionFailure(timestamp, {
    reason: "backend-failure",
    backendPhase: "protocol",
    message: "WASM additive prediction backend returned a malformed protocol result",
  });

const decodePredictions = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
  componentCount: number,
): Effect.Effect<AdditivePredictionBatch, PredictionError> => {
  const firstTimestamp = timestamps[0];

  if (firstTimestamp === undefined) {
    return Effect.succeed({ rowCount: 0, componentCount, values: new Float64Array() });
  }

  const rowWidth = checkedAdd(3, componentCount);

  const valueCount =
    rowWidth === undefined ? undefined : checkedMultiply(timestamps.length, rowWidth);

  const expectedLength = valueCount === undefined ? undefined : checkedAdd(1, valueCount);

  if (expectedLength === undefined) {
    return predictionFailure(firstTimestamp, {
      reason: "backend-failure",
      message: "Additive prediction dimensions exceed safe integer arithmetic",
    });
  }

  if (!(packed instanceof Float64Array) || packed.length === 0) {
    return predictionProtocolFailure(firstTimestamp);
  }

  const status = packed[0];

  if (status === undefined || !Number.isFinite(status) || !Number.isInteger(status)) {
    return predictionProtocolFailure(firstTimestamp);
  }

  if (status === predictionStatus.success) {
    if (packed.length !== expectedLength) {
      return predictionProtocolFailure(firstTimestamp);
    }

    const values = packed.slice(1);

    for (const value of values) {
      if (!Number.isFinite(value)) {
        return predictionProtocolFailure(firstTimestamp);
      }
    }

    return Effect.succeed({
      rowCount: timestamps.length,
      componentCount,
      values,
    });
  }

  if (
    status === predictionStatus.invalidModel ||
    status === predictionStatus.invalidConfiguration ||
    status === predictionStatus.lengthMismatch
  ) {
    if (packed.length !== 1) {
      return predictionProtocolFailure(firstTimestamp);
    }

    return predictionFailure(firstTimestamp, {
      reason: "invalid-model",
      message: "WASM additive prediction backend rejected fitted model metadata",
    });
  }

  if (status === predictionStatus.sizeOverflow) {
    if (packed.length !== 1) {
      return predictionProtocolFailure(firstTimestamp);
    }

    return predictionFailure(firstTimestamp, {
      reason: "backend-failure",
      message: "Additive prediction dimensions exceed the WASM dense-buffer policy",
    });
  }

  if (packed.length !== 2) {
    return predictionProtocolFailure(firstTimestamp);
  }

  const failedIndex = packed[1];

  if (
    failedIndex === undefined ||
    !Number.isSafeInteger(failedIndex) ||
    failedIndex < 0 ||
    failedIndex >= timestamps.length
  ) {
    return predictionProtocolFailure(firstTimestamp);
  }

  const failedTimestamp = timestamps[failedIndex];

  if (failedTimestamp === undefined) {
    return predictionProtocolFailure(firstTimestamp);
  }

  switch (status) {
    case predictionStatus.invalidTimestamp:
      return predictionFailure(failedTimestamp, {
        reason: "backend-failure",
        message: "WASM additive prediction backend rejected a prediction timestamp",
      });

    case predictionStatus.nonFiniteResult:
      return predictionFailure(failedTimestamp, {
        reason: "non-finite-forecast",
        message: "Additive model evaluation produced a non-finite forecast",
      });

    default:
      return predictionProtocolFailure(firstTimestamp);
  }
};

const fitSpanOptions = (
  observationCount: number,
  componentCount: number,
  coefficientCount: number,
) => ({
  attributes: {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "fit",
    "effect_prophet.model.type": "linear-additive-ridge",
    "effect_prophet.growth": "linear",
    "effect_prophet.observation.count": observationCount,
    "effect_prophet.seasonality.count": componentCount,
    "effect_prophet.coefficient.count": coefficientCount,
  },
});

const predictSpanOptions = (predictionCount: number, componentCount: number) => ({
  attributes: {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "predict",
    "effect_prophet.model.type": "linear-additive-ridge",
    "effect_prophet.prediction.count": predictionCount,
    "effect_prophet.seasonality.count": componentCount,
  },
});

/**
 * Construct a lazy additive WASM adapter around an explicit host-binding loader.
 *
 * @param loadModule - Lazy loader for generated or in-memory additive bindings.
 * @returns Fitting and prediction operations using the supplied boundary.
 */
export const makeWasmAdditiveAdapter = (loadModule: WasmAdditiveLoader): WasmAdditiveAdapter => {
  const fit: WasmAdditiveAdapter["fit"] = (input, seasonalities) => {
    const observationCount = input.values.length;
    const componentCount = seasonalities.components.length;
    const coefficientCount = seasonalities.coefficientCount;
    const parameterCount = checkedAdd(2, coefficientCount);
    const expectedLength = checkedAdd(9, coefficientCount);

    if (parameterCount === undefined || expectedLength === undefined) {
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        message: "Additive fitting dimensions exceed safe integer arithmetic",
      });
    }

    return Effect.gen(function* () {
      const module = yield* Effect.try({
        try: loadModule,
        catch: (cause) =>
          makeFittingError(
            observationCount,
            {
              reason: "backend-failure",
              parameterCount,
              backendPhase: "load",
              message: "Failed to load the WASM additive fitting backend",
            },
            cause,
          ),
      });

      const periods = new Float64Array(componentCount);
      const orders = new Float64Array(componentCount);
      const priors = new Float64Array(componentCount);

      for (const [index, component] of seasonalities.components.entries()) {
        periods[index] = component.definition.periodDays;
        orders[index] = component.definition.fourierOrder;
        priors[index] = component.definition.priorScale;
      }

      const packed = yield* Effect.try({
        try: () =>
          module.fit_additive_ridge(input.timestamps, input.values, periods, orders, priors),
        catch: (cause) =>
          makeFittingError(
            observationCount,
            {
              reason: "backend-failure",
              parameterCount,
              backendPhase: "execute",
              message: "Failed to execute the WASM additive fitting backend",
            },
            cause,
          ),
      });

      return yield* decodeFittedParameters(packed, observationCount, seasonalities);
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.fit",
        fitSpanOptions(observationCount, componentCount, coefficientCount),
        { captureStackTrace: false },
      ),
    );
  };

  const predict: WasmAdditiveAdapter["predict"] = (model, timestamps) => {
    const firstTimestamp = timestamps[0];
    const componentCount = model.seasonalities.components.length;

    if (firstTimestamp === undefined) {
      return Effect.succeed({ rowCount: 0, componentCount, values: new Float64Array() });
    }

    const predictionCount = timestamps.length;

    return Effect.gen(function* () {
      const module = yield* Effect.try({
        try: loadModule,
        catch: (cause) =>
          makePredictionError(
            firstTimestamp,
            {
              reason: "backend-failure",
              backendPhase: "load",
              message: "Failed to load the WASM additive prediction backend",
            },
            cause,
          ),
      });

      const packedTimestamps = new Float64Array(timestamps);
      const periods = new Float64Array(componentCount);
      const orders = new Float64Array(componentCount);

      for (const [index, component] of model.seasonalities.components.entries()) {
        periods[index] = component.definition.periodDays;
        orders[index] = component.definition.fourierOrder;
      }

      const coefficients = new Float64Array(model.coefficients);

      const packed = yield* Effect.try({
        try: () =>
          module.predict_additive_ridge(
            packedTimestamps,
            model.intercept,
            model.slope,
            model.timeOrigin,
            model.timeScale,
            periods,
            orders,
            coefficients,
          ),
        catch: (cause) =>
          makePredictionError(
            firstTimestamp,
            {
              reason: "backend-failure",
              backendPhase: "execute",
              message: "Failed to execute the WASM additive prediction backend",
            },
            cause,
          ),
      });

      return yield* decodePredictions(packed, timestamps, componentCount);
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.predict",
        predictSpanOptions(predictionCount, componentCount),
        { captureStackTrace: false },
      ),
    );
  };

  return { fit, predict };
};

const defaultWasmAdditiveAdapter = makeWasmAdditiveAdapter(loadProphetWasmModule);

/** Fit a linear trend with additive seasonalities through the default coarse Rust/WASM operation. */
export const fitAdditiveWithWasm = defaultWasmAdditiveAdapter.fit;

/**
 * Evaluate an additive model through one coarse Rust/WASM operation.
 *
 * @param model - Complete fitted additive model state.
 * @param timestamps - Validated epoch-millisecond prediction timestamps.
 * @returns Checked row-major predictions or a typed prediction failure.
 */
export const predictAdditiveWithWasm = defaultWasmAdditiveAdapter.predict;
