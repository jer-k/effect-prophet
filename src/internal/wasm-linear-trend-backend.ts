import { createRequire } from "node:module";

import { Effect, Layer } from "effect";

import { FittingError, PredictionError } from "../errors";
import { FittingBackend, type FittedLinearParameters, type TrainingInput } from "./fitting-backend";

interface WasmLinearTrendModule {
  readonly fit_linear_trend: (timestamps: Float64Array, values: Float64Array) => Float64Array;
  readonly predict_linear_trend: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
  ) => Float64Array;
}

const require = createRequire(import.meta.url);

const status = {
  success: 0,
  insufficientObservations: 1,
  lengthMismatch: 2,
  nonFiniteTimestamp: 3,
  nonFiniteValue: 4,
  zeroTimeVariance: 5,
  nonFiniteResult: 6,
} as const;

// SAFETY: This interface mirrors wasm-pack's generated declaration. Loading or calling missing bindings is caught and translated at each Effect boundary.
const loadWasmLinearTrendModule = (): WasmLinearTrendModule =>
  require("../../rust/prophet-wasm/pkg/prophet_wasm.js");

const fittingFailure = (
  reason: "insufficient-observations" | "degenerate-observations" | "backend-failure",
  observationCount: number,
  message: string,
): Effect.Effect<never, FittingError> =>
  Effect.fail(new FittingError({ reason, observationCount, message }));

const decodeFittedParameters = (
  packed: Float64Array,
  observationCount: number,
): Effect.Effect<FittedLinearParameters, FittingError> => {
  if (packed.length === 0) {
    return fittingFailure(
      "backend-failure",
      observationCount,
      "WASM fitting backend returned a malformed result",
    );
  }

  const resultStatus = packed[0];

  if (resultStatus === status.success) {
    const intercept = packed[1];
    const slope = packed[2];
    const timeOrigin = packed[3];
    const timeScale = packed[4];

    if (
      packed.length !== 5 ||
      intercept === undefined ||
      slope === undefined ||
      timeOrigin === undefined ||
      timeScale === undefined ||
      !Number.isFinite(intercept) ||
      !Number.isFinite(slope) ||
      !Number.isFinite(timeOrigin) ||
      !Number.isFinite(timeScale) ||
      timeScale <= 0
    ) {
      return fittingFailure(
        "backend-failure",
        observationCount,
        "WASM fitting backend returned invalid linear-trend parameters",
      );
    }

    return Effect.succeed({
      model: "linear-trend",
      intercept,
      slope,
      timeOrigin,
      timeScale,
    });
  }

  switch (resultStatus) {
    case status.insufficientObservations:
      return fittingFailure(
        "insufficient-observations",
        observationCount,
        "At least two observations are required to fit a linear trend",
      );

    case status.zeroTimeVariance:
      return fittingFailure(
        "degenerate-observations",
        observationCount,
        "A linear trend requires at least two distinct timestamps",
      );

    case status.nonFiniteResult:
      return fittingFailure(
        "degenerate-observations",
        observationCount,
        "Training observations did not produce finite linear-trend parameters",
      );

    case status.lengthMismatch:
      return fittingFailure(
        "backend-failure",
        observationCount,
        "Training timestamps and values must have equal lengths",
      );

    case status.nonFiniteTimestamp:
      return fittingFailure(
        "backend-failure",
        observationCount,
        "Training timestamps must be finite",
      );

    case status.nonFiniteValue:
      return fittingFailure("backend-failure", observationCount, "Training values must be finite");

    default:
      return fittingFailure(
        "backend-failure",
        observationCount,
        "WASM fitting backend returned an unknown status",
      );
  }
};

const runWasmFit = (input: TrainingInput): Effect.Effect<FittedLinearParameters, FittingError> => {
  const observationCount = input.values.length;

  return Effect.try({
    try: () => loadWasmLinearTrendModule().fit_linear_trend(input.timestamps, input.values),
    catch: () =>
      new FittingError({
        reason: "backend-failure",
        observationCount,
        message: "Failed to load or execute the WASM fitting backend",
      }),
  }).pipe(
    Effect.flatMap((packed) => decodeFittedParameters(packed, observationCount)),
    Effect.withSpan(
      "effect-prophet.wasm.fit",
      {
        attributes: {
          "effect_prophet.backend.type": "rust-wasm",
          "effect_prophet.operation": "fit",
          "effect_prophet.model.type": "linear-trend",
          "effect_prophet.growth": "linear",
          "effect_prophet.observation.count": observationCount,
        },
      },
      { captureStackTrace: false },
    ),
  );
};

const predictionFailure = (
  reason: "invalid-model" | "non-finite-forecast" | "backend-failure",
  timestamp: number,
  message: string,
): Effect.Effect<never, PredictionError> =>
  Effect.fail(new PredictionError({ reason, timestamp, message }));

const predictionFailureTimestamp = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
): number => {
  const firstTimestamp = timestamps[0];

  if (firstTimestamp === undefined) {
    return 0;
  }

  const index = packed[1];

  if (index === undefined || !Number.isSafeInteger(index)) {
    return firstTimestamp;
  }

  return timestamps[index] ?? firstTimestamp;
};

const decodePredictions = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
): Effect.Effect<ReadonlyArray<number>, PredictionError> => {
  const firstTimestamp = timestamps[0] ?? 0;

  if (packed.length === 0) {
    return predictionFailure(
      "backend-failure",
      firstTimestamp,
      "WASM prediction backend returned a malformed result",
    );
  }

  const resultStatus = packed[0];

  if (resultStatus === status.success) {
    if (packed.length !== timestamps.length + 1) {
      return predictionFailure(
        "backend-failure",
        firstTimestamp,
        "WASM prediction backend returned the wrong number of forecasts",
      );
    }

    const predictions = packed.slice(1);

    for (const [index, prediction] of predictions.entries()) {
      if (!Number.isFinite(prediction)) {
        return predictionFailure(
          "non-finite-forecast",
          timestamps[index] ?? firstTimestamp,
          "WASM prediction backend returned a non-finite forecast",
        );
      }
    }

    return Effect.succeed(Array.from(predictions));
  }

  const failedTimestamp = predictionFailureTimestamp(packed, timestamps);

  if (resultStatus === status.zeroTimeVariance) {
    return predictionFailure(
      "invalid-model",
      failedTimestamp,
      "Fitted model contains an invalid time scale",
    );
  }

  if (resultStatus === status.nonFiniteResult) {
    return predictionFailure(
      "non-finite-forecast",
      failedTimestamp,
      "Linear-trend evaluation produced a non-finite forecast",
    );
  }

  return predictionFailure(
    "backend-failure",
    failedTimestamp,
    "WASM prediction backend rejected the prediction input",
  );
};

/** Rust/WASM fitting Layer backed by one coarse linear-trend fit operation. */
export const wasmLinearTrendFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input, options) => {
      if (options.growth !== "linear") {
        return fittingFailure(
          "backend-failure",
          input.values.length,
          `The WASM linear-trend backend does not support ${options.growth} growth`,
        );
      }

      return runWasmFit(input);
    },
  },
);

/**
 * Evaluate all requested timestamps through one coarse Rust/WASM operation.
 *
 * @param model - Fitted coefficients and scaling metadata.
 * @param timestamps - Validated epoch-millisecond prediction timestamps.
 * @returns Ordered point predictions or a typed WASM/prediction failure.
 */
export const predictLinearTrendWithWasm = (
  model: FittedLinearParameters,
  timestamps: ReadonlyArray<number>,
): Effect.Effect<ReadonlyArray<number>, PredictionError> => {
  const predictionCount = timestamps.length;

  if (predictionCount === 0) {
    return Effect.succeed([]);
  }

  return Effect.try({
    try: () =>
      loadWasmLinearTrendModule().predict_linear_trend(
        new Float64Array(timestamps),
        model.intercept,
        model.slope,
        model.timeOrigin,
        model.timeScale,
      ),
    catch: () =>
      new PredictionError({
        reason: "backend-failure",
        timestamp: timestamps[0] ?? 0,
        message: "Failed to load or execute the WASM prediction backend",
      }),
  }).pipe(
    Effect.flatMap((packed) => decodePredictions(packed, timestamps)),
    Effect.withSpan(
      "effect-prophet.wasm.predict",
      {
        attributes: {
          "effect_prophet.backend.type": "rust-wasm",
          "effect_prophet.operation": "predict",
          "effect_prophet.model.type": "linear-trend",
          "effect_prophet.prediction.count": predictionCount,
        },
      },
      { captureStackTrace: false },
    ),
  );
};
