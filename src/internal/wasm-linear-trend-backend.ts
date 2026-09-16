import { Effect, Layer } from "effect";

import {
  FittingError,
  PredictionError,
  UnsupportedConfigurationError,
  type WasmFailurePhase,
} from "../errors";
import { parseLinearModel, type FittedLinearProphet, type LinearParameters } from "../fitted-model";
import { FittingBackend } from "./fitting-backend";
import { loadProphetWasmModule, type LinearTrendWasmBindings } from "./prophet-wasm-module";

/** Lazy loader for checked Rust/WASM linear-trend bindings. */
export type WasmLinearTrendLoader = () => LinearTrendWasmBindings;

/** Internal fitting and prediction operations backed by one WASM module loader. */
export interface WasmLinearTrendAdapter {
  /** Fit through the configured WASM boundary. */
  readonly fit: FittingBackend["fit"];

  /** Predict through the configured WASM boundary. */
  readonly predict: (
    model: FittedLinearProphet,
    timestamps: ReadonlyArray<number>,
  ) => Effect.Effect<ReadonlyArray<number>, PredictionError>;
}

const status = {
  success: 0,
  insufficientObservations: 1,
  lengthMismatch: 2,
  nonFiniteTimestamp: 3,
  nonFiniteValue: 4,
  zeroTimeVariance: 5,
  nonFiniteResult: 6,
} as const;

const makeFittingError = (
  observationCount: number,
  fields: {
    readonly reason: "insufficient-observations" | "degenerate-observations" | "backend-failure";
    readonly message: string;
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

const fittingProtocolFailure = (observationCount: number): Effect.Effect<never, FittingError> =>
  fittingFailure(observationCount, {
    reason: "backend-failure",
    backendPhase: "protocol",
    message: "WASM fitting backend returned a malformed protocol result",
  });

const decodeFittedParameters = (
  packed: Float64Array,
  observationCount: number,
): Effect.Effect<LinearParameters, FittingError> => {
  if (!(packed instanceof Float64Array) || packed.length === 0) {
    return fittingProtocolFailure(observationCount);
  }

  const resultStatus = packed[0];

  if (
    resultStatus === undefined ||
    !Number.isFinite(resultStatus) ||
    !Number.isInteger(resultStatus)
  ) {
    return fittingProtocolFailure(observationCount);
  }

  if (resultStatus === status.success) {
    if (packed.length !== 5) {
      return fittingProtocolFailure(observationCount);
    }

    const intercept = packed[1];
    const slope = packed[2];
    const timeOrigin = packed[3];
    const timeScale = packed[4];

    return parseLinearModel({
      model: "linear-trend",
      intercept,
      slope,
      timeOrigin,
      timeScale,
    }).pipe(
      Effect.mapError(() =>
        makeFittingError(observationCount, {
          reason: "backend-failure",
          backendPhase: "protocol",
          message: "WASM fitting backend returned invalid linear-trend parameters",
        }),
      ),
    );
  }

  if (packed.length !== 1) {
    return fittingProtocolFailure(observationCount);
  }

  switch (resultStatus) {
    case status.insufficientObservations:
      return fittingFailure(observationCount, {
        reason: "insufficient-observations",
        message: "At least two observations are required to fit a linear trend",
      });

    case status.zeroTimeVariance:
      return fittingFailure(observationCount, {
        reason: "degenerate-observations",
        message: "A linear trend requires at least two distinct timestamps",
      });

    case status.nonFiniteResult:
      return fittingFailure(observationCount, {
        reason: "degenerate-observations",
        message: "Training observations did not produce finite linear-trend parameters",
      });

    case status.lengthMismatch:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        message: "Training timestamps and values must have equal lengths",
      });

    case status.nonFiniteTimestamp:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        message: "Training timestamps must be finite",
      });

    case status.nonFiniteValue:
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        message: "Training values must be finite",
      });

    default:
      return fittingProtocolFailure(observationCount);
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
    message: "WASM prediction backend returned a malformed protocol result",
  });

const decodePredictions = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
): Effect.Effect<ReadonlyArray<number>, PredictionError> => {
  const firstTimestamp = timestamps[0];

  if (firstTimestamp === undefined) {
    return Effect.succeed([]);
  }

  if (!(packed instanceof Float64Array) || packed.length === 0) {
    return predictionProtocolFailure(firstTimestamp);
  }

  const resultStatus = packed[0];

  if (
    resultStatus === undefined ||
    !Number.isFinite(resultStatus) ||
    !Number.isInteger(resultStatus)
  ) {
    return predictionProtocolFailure(firstTimestamp);
  }

  if (resultStatus === status.success) {
    if (packed.length !== timestamps.length + 1) {
      return predictionProtocolFailure(firstTimestamp);
    }

    const predictions = packed.slice(1);

    for (const prediction of predictions) {
      if (!Number.isFinite(prediction)) {
        return predictionProtocolFailure(firstTimestamp);
      }
    }

    return Effect.succeed(Array.from(predictions));
  }

  if (packed.length === 1) {
    switch (resultStatus) {
      case status.nonFiniteTimestamp:
      case status.zeroTimeVariance:
      case status.nonFiniteResult:
        return predictionFailure(firstTimestamp, {
          reason: "invalid-model",
          message: "WASM prediction backend rejected the fitted model metadata",
        });

      default:
        return predictionProtocolFailure(firstTimestamp);
    }
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

  switch (resultStatus) {
    case status.nonFiniteTimestamp:
      return predictionFailure(failedTimestamp, {
        reason: "backend-failure",
        message: "WASM prediction backend rejected a prediction timestamp",
      });

    case status.nonFiniteResult:
      return predictionFailure(failedTimestamp, {
        reason: "non-finite-forecast",
        message: "Linear-trend evaluation produced a non-finite forecast",
      });

    default:
      return predictionProtocolFailure(firstTimestamp);
  }
};

const fitSpanOptions = (observationCount: number) => ({
  attributes: {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "fit",
    "effect_prophet.model.type": "linear-trend",
    "effect_prophet.growth": "linear",
    "effect_prophet.observation.count": observationCount,
  },
});

const predictSpanOptions = (predictionCount: number) => ({
  attributes: {
    "effect_prophet.backend.type": "rust-wasm",
    "effect_prophet.operation": "predict",
    "effect_prophet.model.type": "linear-trend",
    "effect_prophet.prediction.count": predictionCount,
  },
});

/**
 * Construct a lazy WASM adapter around an explicit host-binding loader.
 *
 * Construction performs no loading. Each non-short-circuited operation parses
 * the loaded export shape, invokes one external binding, and decodes its packed
 * response inside the existing coarse WASM span.
 *
 * @param loadModule - Lazy loader for generated or in-memory WASM bindings.
 * @returns Fitting and prediction operations using the supplied boundary.
 */
export const makeWasmLinearTrendAdapter = (
  loadModule: WasmLinearTrendLoader,
): WasmLinearTrendAdapter => {
  const fit: WasmLinearTrendAdapter["fit"] = (input, options) => {
    if (options.growth !== "linear") {
      return Effect.fail(
        new UnsupportedConfigurationError({
          configuration: {
            option: "growth",
            received: options.growth,
            supported: ["linear"],
          },
          message: `The WASM linear-trend backend does not support ${options.growth} growth`,
        }),
      );
    }

    if (options.seasonalities.components.length > 0) {
      return Effect.fail(
        new UnsupportedConfigurationError({
          configuration: {
            option: "seasonalities",
            received: "configured",
            supported: ["none"],
          },
          message: "The WASM linear-trend backend does not support configured seasonalities",
        }),
      );
    }

    const observationCount = input.values.length;

    return Effect.gen(function* () {
      const module = yield* Effect.try({
        try: loadModule,
        catch: (cause) =>
          makeFittingError(
            observationCount,
            {
              reason: "backend-failure",
              backendPhase: "load",
              message: "Failed to load the WASM fitting backend",
            },
            cause,
          ),
      });

      const packed = yield* Effect.try({
        try: () => module.fit_linear_trend(input.timestamps, input.values),
        catch: (cause) =>
          makeFittingError(
            observationCount,
            {
              reason: "backend-failure",
              backendPhase: "execute",
              message: "Failed to execute the WASM fitting backend",
            },
            cause,
          ),
      });

      return yield* decodeFittedParameters(packed, observationCount);
    }).pipe(
      Effect.withSpan("effect-prophet.wasm.fit", fitSpanOptions(observationCount), {
        captureStackTrace: false,
      }),
    );
  };

  const predict: WasmLinearTrendAdapter["predict"] = (model, timestamps) => {
    const firstTimestamp = timestamps[0];

    if (firstTimestamp === undefined) {
      return Effect.succeed([]);
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
              message: "Failed to load the WASM prediction backend",
            },
            cause,
          ),
      });

      const packedTimestamps = new Float64Array(timestamps);

      const packed = yield* Effect.try({
        try: () =>
          module.predict_linear_trend(
            packedTimestamps,
            model.intercept,
            model.slope,
            model.timeOrigin,
            model.timeScale,
          ),
        catch: (cause) =>
          makePredictionError(
            firstTimestamp,
            {
              reason: "backend-failure",
              backendPhase: "execute",
              message: "Failed to execute the WASM prediction backend",
            },
            cause,
          ),
      });

      return yield* decodePredictions(packed, timestamps);
    }).pipe(
      Effect.withSpan("effect-prophet.wasm.predict", predictSpanOptions(predictionCount), {
        captureStackTrace: false,
      }),
    );
  };

  return { fit, predict };
};

const defaultWasmLinearTrendAdapter = makeWasmLinearTrendAdapter(loadProphetWasmModule);

/** Rust/WASM fitting Layer backed by one coarse linear-trend fit operation. */
export const wasmLinearTrendFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  { fit: defaultWasmLinearTrendAdapter.fit },
);

/**
 * Evaluate all requested timestamps through one coarse Rust/WASM operation.
 *
 * @param model - Fitted coefficients and scaling metadata.
 * @param timestamps - Validated epoch-millisecond prediction timestamps.
 * @returns Ordered point predictions or a typed WASM/prediction failure.
 */
export const predictLinearTrendWithWasm = defaultWasmLinearTrendAdapter.predict;
