import { Effect } from "effect";

import { FittingError, PredictionError } from "../errors";
import {
  parsePiecewiseMapModel,
  type FittedPiecewiseMapProphet,
  type PiecewiseMapParameters,
} from "../fitted-model";
import type { ChangepointSetting, MapOptimizerControls } from "../options";
import type { SeasonalityLayout } from "../seasonality";
import type { TrainingInput } from "./fitting-backend";
import { loadProphetWasmModule, type PiecewiseMapWasmBindings } from "./prophet-wasm-module";
import {
  attemptWasmFitting,
  attemptWasmPrediction,
  decodeSeasonalPredictions,
  failWasmFitting,
  packSeasonalitiesForFit,
  packSeasonalitiesForPrediction,
  readWasmStatus,
  type WasmSeasonalPredictionBatch,
  wasmFitSpanOptions,
  wasmFittingError,
  wasmPredictSpanOptions,
} from "./wasm-backend";

/** Lazy loader for checked linear piecewise MAP bindings. */
export type WasmPiecewiseMapLoader = () => PiecewiseMapWasmBindings;

/** One checked row-major linear piecewise MAP prediction batch. */
export type PiecewiseMapPredictionBatch = WasmSeasonalPredictionBatch;

/** Narrow linear piecewise MAP fitting and prediction operations. */
export interface WasmPiecewiseMapAdapter {
  /** Fit one resolved linear MAP request. */
  readonly fit: (
    input: TrainingInput,
    seasonalities: SeasonalityLayout,
    changepoints: ChangepointSetting,
    changepointPriorScale: number,
    optimizer: MapOptimizerControls,
  ) => Effect.Effect<PiecewiseMapParameters, FittingError>;

  /** Predict from complete trusted linear MAP state. */
  readonly predict: (
    model: FittedPiecewiseMapProphet,
    timestamps: ReadonlyArray<number>,
  ) => Effect.Effect<PiecewiseMapPredictionBatch, PredictionError>;
}

const fitStatus = {
  success: 0,
  insufficientObservations: 1,
  lengthMismatch: 2,
  invalidObservation: 3,
  invalidConfiguration: 4,
  zeroTimeRange: 5,
  sizeOverflow: 6,
  nonFiniteResult: 7,
  noiseCollapse: 8,
  nonConvergence: 9,
} as const;

const protocolFailure = (
  observationCount: number,
  parameterCount?: number,
): Effect.Effect<never, FittingError> =>
  failWasmFitting(
    observationCount,
    parameterCount === undefined
      ? {
          reason: "backend-failure",
          backendPhase: "protocol",
          message: "WASM linear MAP fitting backend returned a malformed protocol result",
        }
      : {
          reason: "backend-failure",
          parameterCount,
          backendPhase: "protocol",
          message: "WASM linear MAP fitting backend returned a malformed protocol result",
        },
  );

const decodeFittedParameters = (
  packed: Float64Array,
  observationCount: number,
  seasonalities: SeasonalityLayout,
  changepointPriorScale: number,
): Effect.Effect<PiecewiseMapParameters, FittingError> => {
  const status = readWasmStatus(packed);

  if (status === undefined) {
    return protocolFailure(observationCount);
  }

  if (status === fitStatus.success) {
    const changepointCount = packed[1];

    if (
      changepointCount === undefined ||
      !Number.isSafeInteger(changepointCount) ||
      changepointCount < 0
    ) {
      return protocolFailure(observationCount);
    }

    const parameterCount = 2 + changepointCount + seasonalities.coefficientCount;
    const expectedLength = 13 + changepointCount * 2 + seasonalities.coefficientCount;

    if (!Number.isSafeInteger(expectedLength) || packed.length !== expectedLength) {
      return protocolFailure(observationCount, parameterCount);
    }

    const terminationCode = packed[12];
    let termination: "converged" | "constant-target-shortcut" | undefined;

    if (terminationCode === 0) {
      termination = "converged";
    }

    if (terminationCode === 1) {
      termination = "constant-target-shortcut";
    }

    if (termination === undefined || packed[8] !== observationCount) {
      return protocolFailure(observationCount, parameterCount);
    }

    const changepointStart = 13;
    const deltaStart = changepointStart + changepointCount;
    const coefficientStart = deltaStart + changepointCount;

    return parsePiecewiseMapModel({
      model: "linear-piecewise-map",
      intercept: packed[2],
      slope: packed[3],
      timeOrigin: packed[4],
      timeScale: packed[5],
      changepointTimestamps: Array.from(packed.slice(changepointStart, deltaStart)),
      deltas: Array.from(packed.slice(deltaStart, coefficientStart)),
      seasonalities,
      coefficients: Array.from(packed.slice(coefficientStart)),
      noiseScale: packed[7],
      fitSummary: {
        method: "piecewise-map-coordinate-v1",
        termination,
        valueScale: packed[6],
        observationCount: packed[8],
        iterations: packed[9],
        objective: packed[10],
        stationarityResidual: packed[11],
        changepointPriorScale,
      },
    }).pipe(
      Effect.mapError(() =>
        wasmFittingError(observationCount, {
          reason: "backend-failure",
          parameterCount,
          backendPhase: "protocol",
          message: "WASM linear MAP fitting backend returned invalid fitted parameters",
        }),
      ),
    );
  }

  if (packed.length !== 1) {
    return protocolFailure(observationCount);
  }

  switch (status) {
    case fitStatus.insufficientObservations:
      return failWasmFitting(observationCount, {
        reason: "insufficient-observations",
        message: "At least two observations are required to fit a linear MAP model",
      });

    case fitStatus.zeroTimeRange:
      return failWasmFitting(observationCount, {
        reason: "degenerate-observations",
        message: "Linear MAP fitting requires a positive training time range",
      });

    case fitStatus.noiseCollapse:
      return failWasmFitting(observationCount, {
        reason: "noise-collapse",
        message: "Linear MAP fitting found no reliable finite interior noise optimum",
      });

    case fitStatus.nonConvergence:
      return failWasmFitting(observationCount, {
        reason: "non-convergence",
        message: "Linear MAP fitting exhausted its deterministic iteration budget",
      });

    case fitStatus.nonFiniteResult:
      return failWasmFitting(observationCount, {
        reason: "non-finite-result",
        message: "Linear MAP fitting produced a non-finite numerical result",
      });

    case fitStatus.lengthMismatch:
    case fitStatus.invalidObservation:
    case fitStatus.invalidConfiguration:
    case fitStatus.sizeOverflow:
      return failWasmFitting(observationCount, {
        reason: "backend-failure",
        message: "Linear MAP backend rejected resolved numerical input",
      });

    default:
      return protocolFailure(observationCount);
  }
};

const predictionMessages = {
  arithmeticOverflow: "Linear MAP prediction dimensions exceed safe integer arithmetic",
  malformedProtocol: "WASM linear MAP prediction backend returned a malformed protocol result",
  invalidModel: "WASM linear MAP prediction backend rejected fitted model metadata",
  sizeOverflow: "Linear MAP prediction dimensions exceed the WASM dense-buffer policy",
  invalidTimestamp: "WASM linear MAP prediction backend rejected a prediction timestamp",
  nonFiniteResult: "Linear MAP evaluation produced a non-finite forecast",
} as const;

/** Construct a linear piecewise MAP adapter around an explicit binding loader. */
export const makeWasmPiecewiseMapAdapter = (
  loadModule: WasmPiecewiseMapLoader,
): WasmPiecewiseMapAdapter => {
  const fit: WasmPiecewiseMapAdapter["fit"] = (
    input,
    seasonalities,
    changepoints,
    changepointPriorScale,
    optimizer,
  ) => {
    const observationCount = input.values.length;
    const componentCount = seasonalities.components.length;
    const coefficientCount = seasonalities.coefficientCount;
    const explicit = changepoints.mode === "explicit";

    const explicitTimestamps = explicit
      ? new Float64Array(changepoints.timestamps)
      : new Float64Array();

    const automaticCount = explicit ? 0 : changepoints.count;
    const automaticRange = explicit ? 0 : changepoints.range;

    return Effect.gen(function* () {
      const module = yield* attemptWasmFitting(loadModule, observationCount, {
        phase: "load",
        message: "Failed to load the WASM linear MAP fitting backend",
      });

      const { periods, orders, priors } = packSeasonalitiesForFit(seasonalities);

      const packed = yield* attemptWasmFitting(
        () =>
          module.fit_piecewise_map(
            input.timestamps,
            input.values,
            explicit ? 0 : 1,
            explicitTimestamps,
            automaticCount,
            automaticRange,
            periods,
            orders,
            priors,
            changepointPriorScale,
            optimizer.maxIterations,
            optimizer.relativeTolerance,
            optimizer.absoluteTolerance,
          ),
        observationCount,
        {
          phase: "execute",
          message: "Failed to execute the WASM linear MAP fitting backend",
        },
      );

      return yield* decodeFittedParameters(
        packed,
        observationCount,
        seasonalities,
        changepointPriorScale,
      );
    }).pipe(
      Effect.withSpan(
        "effect-prophet.wasm.fit",
        wasmFitSpanOptions({ type: "linear-piecewise-map", growth: "linear" }, observationCount, {
          components: componentCount,
          coefficients: coefficientCount,
        }),
        { captureStackTrace: false },
      ),
    );
  };

  const predict: WasmPiecewiseMapAdapter["predict"] = (model, timestamps) => {
    const firstTimestamp = timestamps[0];
    const componentCount = model.seasonalities.components.length;

    if (firstTimestamp === undefined) {
      return Effect.succeed({ rowCount: 0, componentCount, values: new Float64Array() });
    }

    return Effect.gen(function* () {
      const module = yield* attemptWasmPrediction(loadModule, firstTimestamp, {
        phase: "load",
        message: "Failed to load the WASM linear MAP prediction backend",
      });

      const { periods, orders } = packSeasonalitiesForPrediction(model.seasonalities);

      const packed = yield* attemptWasmPrediction(
        () =>
          module.predict_piecewise_map(
            new Float64Array(timestamps),
            model.intercept,
            model.slope,
            model.timeOrigin,
            model.timeScale,
            new Float64Array(model.changepointTimestamps),
            new Float64Array(model.deltas),
            model.noiseScale,
            periods,
            orders,
            new Float64Array(model.coefficients),
          ),
        firstTimestamp,
        {
          phase: "execute",
          message: "Failed to execute the WASM linear MAP prediction backend",
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
        wasmPredictSpanOptions("linear-piecewise-map", timestamps.length, componentCount),
        { captureStackTrace: false },
      ),
    );
  };

  return { fit, predict };
};

const defaultAdapter = makeWasmPiecewiseMapAdapter(loadProphetWasmModule);

/** Fit a linear piecewise MAP model through the default Rust/WASM operation. */
export const fitPiecewiseMapWithWasm = defaultAdapter.fit;

/** Evaluate a linear piecewise MAP model through the default Rust/WASM operation. */
export const predictPiecewiseMapWithWasm = defaultAdapter.predict;
