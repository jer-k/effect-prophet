import { Effect } from "effect";

import { FittingError, PredictionError } from "../errors";
import {
  parseLinearAdditiveModel,
  type FittedLinearAdditiveProphet,
  type LinearAdditiveParameters,
} from "../fitted-model";
import type { TrainingInput } from "./fitting-backend";
import type { SeasonalityLayout } from "../seasonality";
import { loadProphetWasmModule, type AdditiveRidgeWasmBindings } from "./prophet-wasm-module";
import {
  attemptWasmFitting,
  attemptWasmPrediction,
  decodeSeasonalPredictions,
  failWasmFitting as fittingFailure,
  packSeasonalitiesForFit,
  packSeasonalitiesForPrediction,
  readWasmStatus,
  seasonalFitDimensions,
  type WasmSeasonalPredictionBatch,
  wasmFitSpanOptions,
  wasmFittingError as makeFittingError,
  wasmPredictSpanOptions,
} from "./wasm-backend";

/** Lazy loader for checked Rust/WASM additive ridge bindings. */
export type WasmAdditiveLoader = () => AdditiveRidgeWasmBindings;

/** One checked row-major additive prediction batch. */
export type AdditivePredictionBatch = WasmSeasonalPredictionBatch;

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
  const dimensions = seasonalFitDimensions(seasonalities.coefficientCount);

  if (dimensions === undefined) {
    return fittingFailure(observationCount, {
      reason: "backend-failure",
      message: "Additive fitting result dimensions exceed safe integer arithmetic",
    });
  }

  const { packedLength, parameterCount } = dimensions;

  const status = readWasmStatus(packed);

  if (status === undefined) {
    return fittingProtocolFailure(observationCount, parameterCount);
  }

  if (status === fitStatus.success) {
    if (packed.length !== packedLength) {
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

const predictionMessages = {
  arithmeticOverflow: "Additive prediction dimensions exceed safe integer arithmetic",
  malformedProtocol: "WASM additive prediction backend returned a malformed protocol result",
  invalidModel: "WASM additive prediction backend rejected fitted model metadata",
  sizeOverflow: "Additive prediction dimensions exceed the WASM dense-buffer policy",
  invalidTimestamp: "WASM additive prediction backend rejected a prediction timestamp",
  nonFiniteResult: "Additive model evaluation produced a non-finite forecast",
} as const;

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
    const dimensions = seasonalFitDimensions(coefficientCount);

    if (dimensions === undefined) {
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        message: "Additive fitting dimensions exceed safe integer arithmetic",
      });
    }

    const { parameterCount } = dimensions;

    return Effect.gen(function* () {
      const module = yield* attemptWasmFitting(loadModule, observationCount, {
        phase: "load",
        parameterCount,
        message: "Failed to load the WASM additive fitting backend",
      });

      const { periods, orders, priors } = packSeasonalitiesForFit(seasonalities);

      const packed = yield* attemptWasmFitting(
        () => module.fit_additive_ridge(input.timestamps, input.values, periods, orders, priors),
        observationCount,
        {
          phase: "execute",
          parameterCount,
          message: "Failed to execute the WASM additive fitting backend",
        },
      );

      return yield* decodeFittedParameters(packed, observationCount, seasonalities);
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.fit",
        wasmFitSpanOptions({ type: "linear-additive-ridge", growth: "linear" }, observationCount, {
          components: componentCount,
          coefficients: coefficientCount,
        }),
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
      const module = yield* attemptWasmPrediction(loadModule, firstTimestamp, {
        phase: "load",
        message: "Failed to load the WASM additive prediction backend",
      });

      const packedTimestamps = new Float64Array(timestamps);
      const { periods, orders } = packSeasonalitiesForPrediction(model.seasonalities);
      const coefficients = new Float64Array(model.coefficients);

      const packed = yield* attemptWasmPrediction(
        () =>
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
        firstTimestamp,
        {
          phase: "execute",
          message: "Failed to execute the WASM additive prediction backend",
        },
      );

      return yield* decodeSeasonalPredictions(
        packed,
        timestamps,
        componentCount,
        predictionMessages,
      );
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.predict",
        wasmPredictSpanOptions("linear-additive-ridge", predictionCount, componentCount),
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
