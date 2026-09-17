import { Effect } from "effect";

import { FittingError, PredictionError } from "../errors";
import {
  parseFlatMapModel,
  type FittedFlatMapProphet,
  type FlatMapParameters,
} from "../fitted-model";
import type { SeasonalityLayout } from "../seasonality";
import type { TrainingInput } from "./fitting-backend";
import { loadProphetWasmModule, type FlatMapWasmBindings } from "./prophet-wasm-module";
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

/** Lazy loader for checked Rust/WASM flat MAP bindings. */
export type WasmFlatMapLoader = () => FlatMapWasmBindings;

/** One checked row-major flat MAP prediction batch. */
export type FlatMapPredictionBatch = WasmSeasonalPredictionBatch;

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
  const dimensions = seasonalFitDimensions(seasonalities.coefficientCount);

  if (dimensions === undefined) {
    return fittingFailure(observationCount, {
      reason: "backend-failure",
      message: "Flat MAP fitting result dimensions exceed safe integer arithmetic",
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

const predictionMessages = {
  arithmeticOverflow: "Flat MAP prediction dimensions exceed safe integer arithmetic",
  malformedProtocol: "WASM flat MAP prediction backend returned a malformed protocol result",
  invalidModel: "WASM flat MAP prediction backend rejected fitted model metadata",
  sizeOverflow: "Flat MAP prediction dimensions exceed the WASM dense-buffer policy",
  invalidTimestamp: "WASM flat MAP prediction backend rejected a prediction timestamp",
  nonFiniteResult: "Flat MAP evaluation produced a non-finite forecast",
} as const;

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
    const dimensions = seasonalFitDimensions(coefficientCount);

    if (dimensions === undefined) {
      return fittingFailure(observationCount, {
        reason: "backend-failure",
        message: "Flat MAP fitting dimensions exceed safe integer arithmetic",
      });
    }

    const { parameterCount } = dimensions;

    return Effect.gen(function* () {
      const module = yield* attemptWasmFitting(loadModule, observationCount, {
        phase: "load",
        parameterCount,
        message: "Failed to load the WASM flat MAP fitting backend",
      });

      const { periods, orders, priors } = packSeasonalitiesForFit(seasonalities);

      const packed = yield* attemptWasmFitting(
        () => module.fit_flat_map(input.timestamps, input.values, periods, orders, priors),
        observationCount,
        {
          phase: "execute",
          parameterCount,
          message: "Failed to execute the WASM flat MAP fitting backend",
        },
      );

      return yield* decodeFittedParameters(packed, observationCount, seasonalities);
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.fit",
        wasmFitSpanOptions({ type: "flat-map", growth: "flat" }, observationCount, {
          components: componentCount,
          coefficients: coefficientCount,
        }),
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
      const module = yield* attemptWasmPrediction(loadModule, firstTimestamp, {
        phase: "load",
        message: "Failed to load the WASM flat MAP prediction backend",
      });

      const { periods, orders } = packSeasonalitiesForPrediction(model.seasonalities);

      const packed = yield* attemptWasmPrediction(
        () =>
          module.predict_flat_map(
            new Float64Array(timestamps),
            model.level,
            model.noiseScale,
            periods,
            orders,
            new Float64Array(model.coefficients),
          ),
        firstTimestamp,
        {
          phase: "execute",
          message: "Failed to execute the WASM flat MAP prediction backend",
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
        wasmPredictSpanOptions("flat-map", timestamps.length, componentCount),
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
