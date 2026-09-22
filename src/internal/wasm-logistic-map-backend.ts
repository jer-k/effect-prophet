import { Effect } from "effect";

import { FittingError, PredictionError } from "../errors";
import type { EventCalendar } from "../event";
import {
  parseLogisticMapModel,
  type FittedLogisticMapProphet,
  type LogisticMapParameters,
} from "../fitted-model";
import type { LogisticPredictionBounds, LogisticTrainingBounds } from "../logistic";
import type { ChangepointSetting, MapOptimizerControls } from "../options";
import type { ResolvedRegressor } from "../regressor";
import type { SeasonalityLayout } from "../seasonality";
import { targetScalingModeCode, type TargetScalingMode } from "../target-scaling";
import type { KnownAdditiveFeatures, SeasonalityMaskMatrix } from "./additional-features";
import type { TrainingInput } from "./fitting-backend";
import { loadProphetWasmModule } from "./prophet-wasm-module";
import {
  attemptWasmFitting,
  attemptWasmPrediction,
  checkedAdd,
  checkedMultiply,
  failWasmFitting,
  failWasmPrediction,
  indexedFailureTimestamp,
  packKnownAdditiveFeatures,
  packSeasonalitiesForFit,
  packSeasonalitiesForPrediction,
  readWasmStatus,
  wasmFitSpanOptions,
  wasmFittingError,
  wasmPredictSpanOptions,
} from "./wasm-backend";
import { modesFor, type MixedMapPredictionBatch } from "./wasm-mixed-map-backend";

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
  nonRepresentableScaling: 10,
} as const;

const predictionStatus = {
  success: 0,
  invalidTimestamp: 1,
  invalidModel: 2,
  invalidConfiguration: 3,
  sizeOverflow: 4,
  nonFiniteResult: 5,
} as const;

const fittingFailure = (
  packed: Float64Array,
  observationCount: number,
): Effect.Effect<never, FittingError> => {
  const status = readWasmStatus(packed);

  if (status === undefined || packed.length !== 1) {
    return failWasmFitting(observationCount, {
      reason: "backend-failure",
      backendPhase: "protocol",
      message: "WASM logistic MAP fitting backend returned a malformed protocol result",
    });
  }

  switch (status) {
    case fitStatus.insufficientObservations:
      return failWasmFitting(observationCount, {
        reason: "insufficient-observations",
        message: "At least two observations are required to fit a logistic MAP model",
      });
    case fitStatus.zeroTimeRange:
      return failWasmFitting(observationCount, {
        reason: "degenerate-observations",
        message: "Logistic MAP fitting requires a positive training time range",
      });
    case fitStatus.noiseCollapse:
      return failWasmFitting(observationCount, {
        reason: "noise-collapse",
        message: "Logistic MAP fitting found no reliable finite interior noise optimum",
      });
    case fitStatus.nonConvergence:
      return failWasmFitting(observationCount, {
        reason: "non-convergence",
        message: "Logistic MAP fitting exhausted its deterministic iteration budget",
      });
    case fitStatus.nonFiniteResult:
    case fitStatus.nonRepresentableScaling:
      return failWasmFitting(observationCount, {
        reason: "non-finite-result",
        message: "Logistic MAP fitting produced a non-finite numerical result",
      });
    default:
      return failWasmFitting(observationCount, {
        reason: "backend-failure",
        message: "Logistic MAP backend rejected resolved numerical input",
      });
  }
};

const fittedRegressors = (
  regressors: ReadonlyArray<ResolvedRegressor>,
  packed: Float64Array,
  start: number,
) =>
  regressors.map((regressor, index) => ({
    ...regressor,
    coefficient: packed[start + index] ?? Number.NaN,
  }));

const decodeFit = (
  packed: Float64Array,
  observationCount: number,
  scaling: TargetScalingMode,
  seasonalities: SeasonalityLayout,
  events: EventCalendar,
  regressors: ReadonlyArray<ResolvedRegressor>,
  changepointPriorScale: number,
): Effect.Effect<LogisticMapParameters, FittingError> => {
  if (readWasmStatus(packed) !== fitStatus.success) {
    return fittingFailure(packed, observationCount);
  }

  const changepointCount = packed[10];

  if (
    changepointCount === undefined ||
    !Number.isSafeInteger(changepointCount) ||
    changepointCount < 0
  ) {
    return fittingFailure(new Float64Array(), observationCount);
  }

  const additionalCount = events.layout.coefficientCount + regressors.length;

  const expectedLength =
    16 + changepointCount * 2 + seasonalities.coefficientCount + additionalCount;

  if (
    packed.length !== expectedLength ||
    packed[1] !== targetScalingModeCode(scaling) ||
    packed[11] !== observationCount ||
    packed[15] !== 0 ||
    (packed[3] !== 0 && packed[3] !== 1)
  ) {
    return fittingFailure(new Float64Array(), observationCount);
  }

  const floorPolicy =
    packed[3] === 0
      ? { kind: "implicit" as const, floor: packed[4] ?? Number.NaN }
      : { kind: "explicit" as const };

  const changepointStart = 16;
  const deltaStart = changepointStart + changepointCount;
  const coefficientStart = deltaStart + changepointCount;
  const eventStart = coefficientStart + seasonalities.coefficientCount;
  const regressorStart = eventStart + events.layout.coefficientCount;

  return parseLogisticMapModel({
    model: "logistic-piecewise-map",
    targetScaling: { mode: scaling, scale: packed[2], floorPolicy },
    rate: packed[5],
    offset: packed[6],
    timeOrigin: packed[7],
    timeScale: packed[8],
    changepointTimestamps: Array.from(packed.slice(changepointStart, deltaStart)),
    deltas: Array.from(packed.slice(deltaStart, coefficientStart)),
    seasonalities,
    coefficients: Array.from(packed.slice(coefficientStart, eventStart)),
    events,
    eventCoefficients: Array.from(packed.slice(eventStart, regressorStart)),
    regressors: fittedRegressors(regressors, packed, regressorStart),
    noiseScale: packed[9],
    fitSummary: {
      method: "logistic-piecewise-map-proximal-v1",
      termination: "converged",
      valueScale: packed[2],
      observationCount: packed[11],
      iterations: packed[12],
      objective: packed[13],
      stationarityResidual: packed[14],
      changepointPriorScale,
    },
  }).pipe(
    Effect.mapError(() =>
      wasmFittingError(observationCount, {
        reason: "backend-failure",
        backendPhase: "protocol",
        message: "WASM logistic MAP backend returned invalid fitted parameters",
      }),
    ),
  );
};

/** Fit a floor-aware logistic MAP model through one coarse Rust/WASM call. */
export const fitLogisticMapWithWasm = (
  input: TrainingInput,
  bounds: LogisticTrainingBounds,
  scaling: TargetScalingMode,
  seasonalities: SeasonalityLayout,
  changepoints: ChangepointSetting,
  changepointPriorScale: number,
  optimizer: MapOptimizerControls,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
  events: EventCalendar,
  regressors: ReadonlyArray<ResolvedRegressor>,
): Effect.Effect<LogisticMapParameters, FittingError> => {
  const observationCount = input.values.length;
  const explicit = changepoints.mode === "explicit";
  const componentCount = seasonalities.components.length + features.layout.components.length;
  const coefficientCount = seasonalities.coefficientCount + features.layout.coefficientCount;

  return Effect.gen(function* () {
    yield* Effect.annotateCurrentSpan({ "effect_prophet.component.mode": "mixed" });

    const module = yield* attemptWasmFitting(loadProphetWasmModule, observationCount, {
      phase: "load",
      message: "Failed to load the WASM logistic MAP fitting backend",
    });

    const seasonal = packSeasonalitiesForFit(seasonalities);
    const additional = packKnownAdditiveFeatures(masks, features);

    const packed = yield* attemptWasmFitting(
      () =>
        module.fit_logistic_map_with_features(
          input.timestamps,
          input.values,
          bounds.capacities,
          bounds.floorPolicy === "implicit" ? 0 : 1,
          bounds.explicitFloors,
          targetScalingModeCode(scaling),
          explicit ? 0 : 1,
          explicit ? new Float64Array(changepoints.timestamps) : new Float64Array(),
          explicit ? 0 : changepoints.count,
          explicit ? 0 : changepoints.range,
          seasonal.periods,
          seasonal.orders,
          seasonal.priors,
          additional.packedMasks,
          features.matrix.columnCount,
          additional.values,
          additional.priors,
          additional.offsets,
          additional.counts,
          modesFor(seasonalities, features),
          changepointPriorScale,
          optimizer.maxIterations,
          optimizer.relativeTolerance,
          optimizer.absoluteTolerance,
        ),
      observationCount,
      { phase: "execute", message: "Failed to execute the WASM logistic MAP fitting backend" },
    );

    return yield* decodeFit(
      packed,
      observationCount,
      scaling,
      seasonalities,
      events,
      regressors,
      changepointPriorScale,
    );
  }).pipe(
    Effect.withSpan(
      "effect-prophet.wasm.fit",
      wasmFitSpanOptions(
        { type: "logistic-piecewise-map", growth: "logistic" },
        observationCount,
        { components: componentCount, coefficients: coefficientCount },
        scaling,
      ),
      { captureStackTrace: false },
    ),
  );
};

const decodePredictions = (
  packed: Float64Array,
  timestamps: ReadonlyArray<number>,
  componentCount: number,
): Effect.Effect<MixedMapPredictionBatch, PredictionError> => {
  const firstTimestamp = timestamps[0];

  if (firstTimestamp === undefined) {
    return Effect.succeed({
      rowCount: 0,
      componentCount,
      values: new Float64Array(),
      contributions: new Float64Array(),
    });
  }

  const width = checkedAdd(4, componentCount);
  const count = width === undefined ? undefined : checkedMultiply(width, timestamps.length);
  const expected = count === undefined ? undefined : checkedAdd(1, count);
  const status = readWasmStatus(packed);

  if (
    expected === undefined ||
    status === undefined ||
    (status === 0 && packed.length !== expected)
  ) {
    return failWasmPrediction(firstTimestamp, {
      reason: "backend-failure",
      backendPhase: "protocol",
      message: "WASM logistic MAP prediction backend returned a malformed protocol result",
    });
  }

  if (status === predictionStatus.success) {
    const values = packed.slice(1);

    return values.some((value) => !Number.isFinite(value))
      ? failWasmPrediction(firstTimestamp, {
          reason: "backend-failure",
          backendPhase: "protocol",
          message: "WASM logistic MAP prediction backend returned non-finite success values",
        })
      : Effect.succeed({
          rowCount: timestamps.length,
          componentCount,
          values,
          contributions: new Float64Array(timestamps.length * componentCount),
        });
  }

  if (status === predictionStatus.invalidTimestamp || status === predictionStatus.nonFiniteResult) {
    const timestamp = indexedFailureTimestamp(packed, timestamps);

    return timestamp === undefined
      ? failWasmPrediction(firstTimestamp, {
          reason: "backend-failure",
          backendPhase: "protocol",
          message: "WASM logistic MAP returned a malformed indexed failure",
        })
      : failWasmPrediction(timestamp, {
          reason:
            status === predictionStatus.nonFiniteResult ? "non-finite-forecast" : "backend-failure",
          message:
            status === predictionStatus.nonFiniteResult
              ? "Logistic MAP evaluation produced a non-finite forecast"
              : "Logistic MAP rejected a prediction timestamp",
        });
  }

  return packed.length === 1
    ? failWasmPrediction(firstTimestamp, {
        reason: "invalid-model",
        message: "WASM logistic MAP rejected model or row metadata",
      })
    : failWasmPrediction(firstTimestamp, {
        reason: "backend-failure",
        backendPhase: "protocol",
        message: "WASM logistic MAP returned a malformed failure frame",
      });
};

/** Predict floor-aware logistic rows through one coarse Rust/WASM call. */
export const predictLogisticMapWithWasm = (
  model: FittedLogisticMapProphet,
  timestamps: ReadonlyArray<number>,
  bounds: LogisticPredictionBounds,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
): Effect.Effect<MixedMapPredictionBatch, PredictionError> => {
  const firstTimestamp = timestamps[0];
  const componentCount = model.seasonalities.components.length + features.layout.components.length;

  if (firstTimestamp === undefined) {
    return Effect.succeed({
      rowCount: 0,
      componentCount,
      values: new Float64Array(),
      contributions: new Float64Array(),
    });
  }

  return Effect.gen(function* () {
    const module = yield* attemptWasmPrediction(loadProphetWasmModule, firstTimestamp, {
      phase: "load",
      message: "Failed to load the WASM logistic MAP prediction backend",
    });

    const seasonal = packSeasonalitiesForPrediction(model.seasonalities);
    const additional = packKnownAdditiveFeatures(masks, features);

    const additionalCoefficients = new Float64Array([
      ...model.eventCoefficients,
      ...model.regressors.map((regressor) => regressor.coefficient),
    ]);

    const floorPolicy = model.targetScaling.floorPolicy;

    const packed = yield* attemptWasmPrediction(
      () =>
        module.predict_logistic_map_with_features(
          new Float64Array(timestamps),
          bounds.capacities,
          bounds.explicitFloors,
          targetScalingModeCode(model.targetScaling.mode),
          model.targetScaling.scale,
          floorPolicy.kind === "implicit" ? 0 : 1,
          floorPolicy.kind === "implicit" ? floorPolicy.floor : 0,
          model.rate,
          model.offset,
          model.timeOrigin,
          model.timeScale,
          new Float64Array(model.changepointTimestamps),
          new Float64Array(model.deltas),
          model.noiseScale,
          seasonal.periods,
          seasonal.orders,
          new Float64Array(model.coefficients),
          additional.packedMasks,
          features.matrix.columnCount,
          additional.values,
          additionalCoefficients,
          additional.offsets,
          additional.counts,
          modesFor(model.seasonalities, features),
        ),
      firstTimestamp,
      { phase: "execute", message: "Failed to execute the WASM logistic MAP prediction backend" },
    );

    const batch = yield* decodePredictions(packed, timestamps, componentCount);

    const modes = [
      ...model.seasonalities.components.map((component) => component.definition.mode),
      ...features.layout.components.map((component) => component.mode),
    ];

    const rowWidth = 4 + componentCount;

    for (let row = 0; row < timestamps.length; row += 1) {
      const trend = batch.values[row * rowWidth];

      if (trend === undefined) {
        return yield* failWasmPrediction(timestamps[row] ?? firstTimestamp, {
          reason: "backend-failure",
          backendPhase: "protocol",
          message: "WASM logistic MAP omitted a trend value",
        });
      }

      for (let component = 0; component < componentCount; component += 1) {
        const effect = batch.values[row * rowWidth + 4 + component];

        if (effect === undefined) {
          return yield* failWasmPrediction(timestamps[row] ?? firstTimestamp, {
            reason: "backend-failure",
            backendPhase: "protocol",
            message: "WASM logistic MAP omitted a component value",
          });
        }

        const contribution = modes[component] === "multiplicative" ? trend * effect : effect;

        if (!Number.isFinite(contribution)) {
          return yield* failWasmPrediction(timestamps[row] ?? firstTimestamp, {
            reason: "non-finite-forecast",
            message: "A logistic MAP component contribution is not finite",
          });
        }

        batch.contributions[row * componentCount + component] = contribution;
      }
    }

    return batch;
  }).pipe(
    Effect.withSpan(
      "effect-prophet.wasm.predict",
      wasmPredictSpanOptions(
        "logistic-piecewise-map",
        timestamps.length,
        componentCount,
        model.targetScaling.mode,
      ),
      { captureStackTrace: false },
    ),
  );
};
