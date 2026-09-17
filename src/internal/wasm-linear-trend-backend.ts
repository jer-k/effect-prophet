import { Effect } from "effect";

import { FittingError, PredictionError } from "../errors";
import { parseLinearModel, type FittedLinearProphet, type LinearParameters } from "../fitted-model";
import type { TrainingInput } from "./fitting-backend";
import { loadProphetWasmModule, type LinearTrendWasmBindings } from "./prophet-wasm-module";
import {
  attemptWasmFitting,
  attemptWasmPrediction,
  failWasmFitting as fittingFailure,
  failWasmPrediction as predictionFailure,
  indexedFailureTimestamp,
  readWasmStatus,
  wasmFitSpanOptions,
  wasmFittingError as makeFittingError,
  wasmPredictSpanOptions,
} from "./wasm-backend";

/** Lazy loader for checked Rust/WASM linear-trend bindings. */
export type WasmLinearTrendLoader = () => LinearTrendWasmBindings;

/** Internal fitting and prediction operations backed by one WASM module loader. */
export interface WasmLinearTrendAdapter {
  /** Fit a linear trend through the configured WASM boundary. */
  readonly fit: (input: TrainingInput) => Effect.Effect<LinearParameters, FittingError>;

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
  const resultStatus = readWasmStatus(packed);

  if (resultStatus === undefined) {
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

  const resultStatus = readWasmStatus(packed);

  if (resultStatus === undefined) {
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

  const failedTimestamp = indexedFailureTimestamp(packed, timestamps);

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
  const fit: WasmLinearTrendAdapter["fit"] = (input) => {
    const observationCount = input.values.length;

    return Effect.gen(function* () {
      const module = yield* attemptWasmFitting(loadModule, observationCount, {
        phase: "load",
        message: "Failed to load the WASM fitting backend",
      });

      const packed = yield* attemptWasmFitting(
        () => module.fit_linear_trend(input.timestamps, input.values),
        observationCount,
        {
          phase: "execute",
          message: "Failed to execute the WASM fitting backend",
        },
      );

      return yield* decodeFittedParameters(packed, observationCount);
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.fit",
        wasmFitSpanOptions({ type: "linear-trend", growth: "linear" }, observationCount),
        { captureStackTrace: false },
      ),
    );
  };

  const predict: WasmLinearTrendAdapter["predict"] = (model, timestamps) => {
    const firstTimestamp = timestamps[0];

    if (firstTimestamp === undefined) {
      return Effect.succeed([]);
    }

    const predictionCount = timestamps.length;

    return Effect.gen(function* () {
      const module = yield* attemptWasmPrediction(loadModule, firstTimestamp, {
        phase: "load",
        message: "Failed to load the WASM prediction backend",
      });

      const packedTimestamps = new Float64Array(timestamps);

      const packed = yield* attemptWasmPrediction(
        () =>
          module.predict_linear_trend(
            packedTimestamps,
            model.intercept,
            model.slope,
            model.timeOrigin,
            model.timeScale,
          ),
        firstTimestamp,
        {
          phase: "execute",
          message: "Failed to execute the WASM prediction backend",
        },
      );

      return yield* decodePredictions(packed, timestamps);
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.predict",
        wasmPredictSpanOptions("linear-trend", predictionCount),
        { captureStackTrace: false },
      ),
    );
  };

  return { fit, predict };
};

const defaultWasmLinearTrendAdapter = makeWasmLinearTrendAdapter(loadProphetWasmModule);

/** Fit a linear trend through the default coarse Rust/WASM operation. */
export const fitLinearTrendWithWasm = defaultWasmLinearTrendAdapter.fit;

/**
 * Evaluate all requested timestamps through one coarse Rust/WASM operation.
 *
 * @param model - Fitted coefficients and scaling metadata.
 * @param timestamps - Validated epoch-millisecond prediction timestamps.
 * @returns Ordered point predictions or a typed WASM/prediction failure.
 */
export const predictLinearTrendWithWasm = defaultWasmLinearTrendAdapter.predict;
