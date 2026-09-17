import { Effect } from "effect";

import { FittingError, PredictionError, type WasmFailurePhase } from "../errors";
import {
  parseFlatMapModel,
  type FittedFlatMapProphet,
  type FlatMapParameters,
} from "../fitted-model";
import type { SeasonalityLayout } from "../seasonality";
import type { TrainingInput } from "./fitting-backend";
import { loadProphetWasmModule, type FlatMapWasmBindings } from "./prophet-wasm-module";

/** Lazy loader for checked Rust/WASM flat MAP bindings. */
export type WasmFlatMapLoader = () => FlatMapWasmBindings;

/** One checked row-major flat MAP prediction batch. */
export interface FlatMapPredictionBatch {
  /** Number of timestamp rows represented by `values`. */
  readonly rowCount: number;

  /** Number of named seasonal component values in each row. */
  readonly componentCount: number;

  /** Rows encoded as `[trend, additive, value, ...components]`. */
  readonly values: Float64Array;
}

/** Narrow flat MAP fitting and prediction operations backed by one WASM loader. */
export interface WasmFlatMapAdapter {
  /** Fit only a reduced flat MAP configuration. */
  readonly fit: (
    input: TrainingInput,
    seasonalities: SeasonalityLayout,
  ) => Effect.Effect<FlatMapParameters, FittingError>;

  /** Predict only from complete flat MAP state. */
  readonly predict: (
    model: FittedFlatMapProphet,
    timestamps: ReadonlyArray<number>,
  ) => Effect.Effect<FlatMapPredictionBatch, PredictionError>;
}

const fitStatus = {
  success: 0,
  insufficientObservations: 1,
  lengthMismatch: 2,
  invalidObservation: 3,
  invalidConfiguration: 4,
  sizeOverflow: 5,
  nonFiniteResult: 6,
  noiseCollapse: 7,
  nonConvergence: 8,
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

  return left > Number.MAX_SAFE_INTEGER - right ? undefined : left + right;
};

const checkedMultiply = (left: number, right: number): number | undefined => {
  if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
    return undefined;
  }

  return left !== 0 && right > Math.floor(Number.MAX_SAFE_INTEGER / left)
    ? undefined
    : left * right;
};

const makeFittingError = (
  observationCount: number,
  fields: {
    readonly reason:
      | "insufficient-observations"
      | "non-finite-result"
      | "noise-collapse"
      | "non-convergence"
      | "backend-failure";
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
    message: "WASM flat MAP fitting backend returned a malformed protocol result",
  });

const decodeFittedParameters = (
  packed: Float64Array,
  observationCount: number,
  seasonalities: SeasonalityLayout,
): Effect.Effect<FlatMapParameters, FittingError> => {
  const parameterCount = seasonalities.coefficientCount + 2;
  const expectedLength = checkedAdd(9, seasonalities.coefficientCount);

  if (expectedLength === undefined) {
    return fittingFailure(observationCount, {
      reason: "backend-failure",
      parameterCount,
      message: "Flat MAP fitting result dimensions exceed safe integer arithmetic",
    });
  }

  if (!(packed instanceof Float64Array) || packed.length === 0) {
    return fittingProtocolFailure(observationCount, parameterCount);
  }

  const status = packed[0];

  if (status === undefined || !Number.isInteger(status)) {
    return fittingProtocolFailure(observationCount, parameterCount);
  }

  if (status === fitStatus.success) {
    if (packed.length !== expectedLength) {
      return fittingProtocolFailure(observationCount, parameterCount);
    }

    const terminationCode = packed[8];
    let termination: "converged" | "constant-target-shortcut" | undefined;

    if (terminationCode === 0) {
      termination = "converged";
    }

    if (terminationCode === 1) {
      termination = "constant-target-shortcut";
    }

    if (termination === undefined || packed[4] !== observationCount) {
      return fittingProtocolFailure(observationCount, parameterCount);
    }

    return parseFlatMapModel({
      model: "flat-map",
      level: packed[1],
      noiseScale: packed[2],
      seasonalities,
      coefficients: Array.from(packed.slice(9)),
      fitSummary: {
        method: "flat-map-coordinate-v1",
        termination,
        valueScale: packed[3],
        observationCount: packed[4],
        iterations: packed[5],
        objective: packed[6],
        stationarityResidual: packed[7],
      },
    }).pipe(
      Effect.mapError(() =>
        makeFittingError(observationCount, {
          reason: "backend-failure",
          parameterCount,
          backendPhase: "protocol",
          message: "WASM flat MAP fitting backend returned invalid fitted parameters",
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
        message: "At least two observations are required to fit a flat MAP model",
      });

    case fitStatus.noiseCollapse:
      return fittingFailure(observationCount, {
        reason: "noise-collapse",
        parameterCount,
        message: "Flat MAP fitting found no reliable finite interior noise optimum",
      });

    case fitStatus.nonConvergence:
      return fittingFailure(observationCount, {
        reason: "non-convergence",
        parameterCount,
        message: "Flat MAP fitting exhausted its deterministic iteration budget",
      });

    case fitStatus.nonFiniteResult:
      return fittingFailure(observationCount, {
        reason: "non-finite-result",
        parameterCount,
        message: "Flat MAP fitting produced a non-finite numerical result",
      });

    case fitStatus.sizeOverflow:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "Flat MAP fitting dimensions exceed the WASM dense-buffer policy",
      });

    case fitStatus.lengthMismatch:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "Flat MAP timestamps and values must have equal lengths",
      });

    case fitStatus.invalidObservation:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "Flat MAP training inputs must be finite",
      });

    case fitStatus.invalidConfiguration:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        parameterCount,
        message: "Flat MAP backend rejected resolved seasonality metadata",
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
  const schemaFields = { ...fields, timestamp };

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
    message: "WASM flat MAP prediction backend returned a malformed protocol result",
  });

const decodePredictions = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
  componentCount: number,
): Effect.Effect<FlatMapPredictionBatch, PredictionError> => {
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
      message: "Flat MAP prediction dimensions exceed safe integer arithmetic",
    });
  }

  if (!(packed instanceof Float64Array) || packed.length === 0) {
    return predictionProtocolFailure(firstTimestamp);
  }

  const status = packed[0];

  if (status === predictionStatus.success) {
    if (packed.length !== expectedLength) {
      return predictionProtocolFailure(firstTimestamp);
    }

    const values = packed.slice(1);

    if (values.some((value) => !Number.isFinite(value))) {
      return predictionProtocolFailure(firstTimestamp);
    }

    return Effect.succeed({ rowCount: timestamps.length, componentCount, values });
  }

  if (
    status === predictionStatus.invalidModel ||
    status === predictionStatus.invalidConfiguration ||
    status === predictionStatus.lengthMismatch
  ) {
    return packed.length === 1
      ? predictionFailure(firstTimestamp, {
          reason: "invalid-model",
          message: "WASM flat MAP prediction backend rejected fitted model metadata",
        })
      : predictionProtocolFailure(firstTimestamp);
  }

  if (status === predictionStatus.sizeOverflow) {
    return packed.length === 1
      ? predictionFailure(firstTimestamp, {
          reason: "backend-failure",
          message: "Flat MAP prediction dimensions exceed the WASM dense-buffer policy",
        })
      : predictionProtocolFailure(firstTimestamp);
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

  if (status === predictionStatus.invalidTimestamp) {
    return predictionFailure(failedTimestamp, {
      reason: "backend-failure",
      message: "WASM flat MAP prediction backend rejected a prediction timestamp",
    });
  }

  if (status === predictionStatus.nonFiniteResult) {
    return predictionFailure(failedTimestamp, {
      reason: "non-finite-forecast",
      message: "Flat MAP evaluation produced a non-finite forecast",
    });
  }

  return predictionProtocolFailure(firstTimestamp);
};

const packSeasonalities = (seasonalities: SeasonalityLayout) => {
  const componentCount = seasonalities.components.length;
  const periods = new Float64Array(componentCount);
  const orders = new Float64Array(componentCount);
  const priors = new Float64Array(componentCount);

  for (const [index, component] of seasonalities.components.entries()) {
    periods[index] = component.definition.periodDays;
    orders[index] = component.definition.fourierOrder;
    priors[index] = component.definition.priorScale;
  }

  return { periods, orders, priors };
};

const fitSpanOptions = (
  observationCount: number,
  componentCount: number,
  coefficientCount: number,
) => ({
  attributes: {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "fit",
    "effect_prophet.model.type": "flat-map",
    "effect_prophet.growth": "flat",
    "effect_prophet.observation.count": observationCount,
    "effect_prophet.seasonality.count": componentCount,
    "effect_prophet.coefficient.count": coefficientCount,
  },
});

const predictSpanOptions = (predictionCount: number, componentCount: number) => ({
  attributes: {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "predict",
    "effect_prophet.model.type": "flat-map",
    "effect_prophet.prediction.count": predictionCount,
    "effect_prophet.seasonality.count": componentCount,
  },
});

/**
 * Construct a narrow flat MAP adapter around an explicit host-binding loader.
 *
 * @param loadModule - Lazy loader for generated or in-memory flat MAP bindings.
 * @returns Flat MAP fitting and prediction operations using the supplied boundary.
 */
export const makeWasmFlatMapAdapter = (loadModule: WasmFlatMapLoader): WasmFlatMapAdapter => {
  const fit: WasmFlatMapAdapter["fit"] = (input, seasonalities) => {
    const observationCount = input.values.length;
    const componentCount = seasonalities.components.length;
    const coefficientCount = seasonalities.coefficientCount;
    const parameterCount = checkedAdd(2, coefficientCount);
    const expectedLength = checkedAdd(9, coefficientCount);

    if (parameterCount === undefined || expectedLength === undefined) {
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        message: "Flat MAP fitting dimensions exceed safe integer arithmetic",
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
              message: "Failed to load the WASM flat MAP fitting backend",
            },
            cause,
          ),
      });

      const { periods, orders, priors } = packSeasonalities(seasonalities);

      const packed = yield* Effect.try({
        try: () => module.fit_flat_map(input.timestamps, input.values, periods, orders, priors),
        catch: (cause) =>
          makeFittingError(
            observationCount,
            {
              reason: "backend-failure",
              parameterCount,
              backendPhase: "execute",
              message: "Failed to execute the WASM flat MAP fitting backend",
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

  const predict: WasmFlatMapAdapter["predict"] = (model, timestamps) => {
    const firstTimestamp = timestamps[0];
    const componentCount = model.seasonalities.components.length;

    if (firstTimestamp === undefined) {
      return Effect.succeed({ rowCount: 0, componentCount, values: new Float64Array() });
    }

    return Effect.gen(function* () {
      const module = yield* Effect.try({
        try: loadModule,
        catch: (cause) =>
          makePredictionError(
            firstTimestamp,
            {
              reason: "backend-failure",
              backendPhase: "load",
              message: "Failed to load the WASM flat MAP prediction backend",
            },
            cause,
          ),
      });

      const { periods, orders } = packSeasonalities(model.seasonalities);

      const packed = yield* Effect.try({
        try: () =>
          module.predict_flat_map(
            new Float64Array(timestamps),
            model.level,
            model.noiseScale,
            periods,
            orders,
            new Float64Array(model.coefficients),
          ),
        catch: (cause) =>
          makePredictionError(
            firstTimestamp,
            {
              reason: "backend-failure",
              backendPhase: "execute",
              message: "Failed to execute the WASM flat MAP prediction backend",
            },
            cause,
          ),
      });

      return yield* decodePredictions(packed, timestamps, componentCount);
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.predict",
        predictSpanOptions(timestamps.length, componentCount),
        { captureStackTrace: false },
      ),
    );
  };

  return { fit, predict };
};

const defaultWasmFlatMapAdapter = makeWasmFlatMapAdapter(loadProphetWasmModule);

/** Fit a reduced flat MAP model through the default coarse Rust/WASM operation. */
export const fitFlatMapWithWasm = defaultWasmFlatMapAdapter.fit;

/** Evaluate a flat MAP model through the default coarse Rust/WASM operation. */
export const predictFlatMapWithWasm = defaultWasmFlatMapAdapter.predict;
