import { Effect } from "effect";

import { componentModeCode } from "../component-mode";
import { FittingError, PredictionError } from "../errors";
import { emptyEventCalendar, type EventCalendar } from "../event";
import {
  parseFlatMapModel,
  parsePiecewiseMapModel,
  type FittedFlatMapProphet,
  type FittedPiecewiseMapProphet,
  type FlatMapParameters,
  type PiecewiseMapParameters,
} from "../fitted-model";
import type { ChangepointSetting, MapOptimizerControls } from "../options";
import type { ResolvedRegressor } from "../regressor";
import type { SeasonalityLayout } from "../seasonality";
import { targetScalingModeCode, type TargetScalingMode } from "../target-scaling";
import type { KnownAdditiveFeatures, SeasonalityMaskMatrix } from "./additional-features";
import type { TrainingInput } from "./fitting-backend";
import { loadProphetWasmModule, type MixedMapWasmBindings } from "./prophet-wasm-module";
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

/** One checked mixed prediction batch encoded as trend, totals, and named effects. */
export interface MixedMapPredictionBatch {
  readonly rowCount: number;
  readonly componentCount: number;
  readonly values: Float64Array;
  readonly contributions: Float64Array;
}

/** Lazy loader for checked mixed MAP WASM bindings. */
export type WasmMixedMapLoader = () => MixedMapWasmBindings;

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

export const modesFor = (
  seasonalities: SeasonalityLayout,
  features: KnownAdditiveFeatures,
): Float64Array => {
  const modes = new Float64Array(seasonalities.coefficientCount + features.layout.coefficientCount);
  let offset = 0;

  for (const component of seasonalities.components) {
    modes.fill(
      componentModeCode(component.definition.mode),
      offset,
      offset + component.coefficientCount,
    );
    offset += component.coefficientCount;
  }

  for (const component of features.layout.components) {
    modes.fill(componentModeCode(component.mode), offset, offset + component.coefficientCount);
    offset += component.coefficientCount;
  }

  return modes;
};

const terminationFrom = (code: number | undefined) => {
  if (code === 0) {
    return "converged" as const;
  }

  if (code === 1) {
    return "constant-target-shortcut" as const;
  }

  return undefined;
};

const fittingFailure = (
  packed: Float64Array,
  observationCount: number,
  model: "flat" | "linear",
): Effect.Effect<never, FittingError> => {
  const status = readWasmStatus(packed);
  const label = model === "flat" ? "Mixed flat MAP" : "Mixed linear MAP";

  if (status === undefined || packed.length !== 1) {
    return failWasmFitting(observationCount, {
      reason: "backend-failure",
      backendPhase: "protocol",
      message: `WASM ${label.toLowerCase()} fitting backend returned a malformed protocol result`,
    });
  }

  switch (status) {
    case fitStatus.insufficientObservations:
      return failWasmFitting(observationCount, {
        reason: "insufficient-observations",
        message: `At least two observations are required to fit a ${label.toLowerCase()} model`,
      });
    case fitStatus.zeroTimeRange:
      return failWasmFitting(observationCount, {
        reason: "degenerate-observations",
        message: `${label} fitting requires a positive training time range`,
      });
    case fitStatus.noiseCollapse:
      return failWasmFitting(observationCount, {
        reason: "noise-collapse",
        message: `${label} fitting found no reliable finite interior noise optimum`,
      });
    case fitStatus.nonConvergence:
      return failWasmFitting(observationCount, {
        reason: "non-convergence",
        message: `${label} fitting exhausted its deterministic iteration budget`,
      });
    case fitStatus.nonFiniteResult:
    case fitStatus.nonRepresentableScaling:
      return failWasmFitting(observationCount, {
        reason: "non-finite-result",
        message: `${label} fitting produced a non-finite numerical result`,
      });
    default:
      return failWasmFitting(observationCount, {
        reason: "backend-failure",
        message: `${label} backend rejected resolved numerical input`,
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

const decodeLinearFit = (
  packed: Float64Array,
  observationCount: number,
  scaling: TargetScalingMode,
  seasonalities: SeasonalityLayout,
  events: EventCalendar,
  regressors: ReadonlyArray<ResolvedRegressor>,
  changepointPriorScale: number,
): Effect.Effect<PiecewiseMapParameters, FittingError> => {
  if (readWasmStatus(packed) !== fitStatus.success) {
    return fittingFailure(packed, observationCount, "linear");
  }

  const changepointCount = packed[4];
  const additionalCount = events.layout.coefficientCount + regressors.length;

  if (
    changepointCount === undefined ||
    !Number.isSafeInteger(changepointCount) ||
    changepointCount < 0
  ) {
    return fittingFailure(new Float64Array(), observationCount, "linear");
  }

  const expectedLength =
    16 + changepointCount * 2 + seasonalities.coefficientCount + additionalCount;

  const termination = terminationFrom(packed[15]);

  if (
    packed.length !== expectedLength ||
    termination === undefined ||
    packed[1] !== targetScalingModeCode(scaling) ||
    packed[11] !== observationCount
  ) {
    return fittingFailure(new Float64Array(), observationCount, "linear");
  }

  const changepointStart = 16;
  const deltaStart = changepointStart + changepointCount;
  const coefficientStart = deltaStart + changepointCount;
  const eventStart = coefficientStart + seasonalities.coefficientCount;
  const regressorStart = eventStart + events.layout.coefficientCount;

  return parsePiecewiseMapModel({
    model: "linear-piecewise-map",
    targetScaling: { mode: scaling, offset: packed[2], scale: packed[3] },
    intercept: packed[5],
    slope: packed[6],
    timeOrigin: packed[7],
    timeScale: packed[8],
    changepointTimestamps: Array.from(packed.slice(changepointStart, deltaStart)),
    deltas: Array.from(packed.slice(deltaStart, coefficientStart)),
    seasonalities,
    coefficients: Array.from(packed.slice(coefficientStart, eventStart)),
    events,
    eventCoefficients: Array.from(packed.slice(eventStart, regressorStart)),
    regressors: fittedRegressors(regressors, packed, regressorStart),
    noiseScale: packed[10],
    fitSummary: {
      method: "mixed-piecewise-map-coordinate-v1",
      termination,
      valueScale: packed[9],
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
        message: "WASM mixed linear MAP fitting backend returned invalid fitted parameters",
      }),
    ),
  );
};

const decodeFlatFit = (
  packed: Float64Array,
  observationCount: number,
  scaling: TargetScalingMode,
  seasonalities: SeasonalityLayout,
  events: EventCalendar,
  regressors: ReadonlyArray<ResolvedRegressor>,
): Effect.Effect<FlatMapParameters, FittingError> => {
  if (readWasmStatus(packed) !== fitStatus.success) {
    return fittingFailure(packed, observationCount, "flat");
  }

  const eventStart = 12 + seasonalities.coefficientCount;
  const regressorStart = eventStart + events.layout.coefficientCount;
  const expectedLength = regressorStart + regressors.length;
  const termination = terminationFrom(packed[11]);

  if (
    packed.length !== expectedLength ||
    termination === undefined ||
    packed[1] !== targetScalingModeCode(scaling) ||
    packed[7] !== observationCount
  ) {
    return fittingFailure(new Float64Array(), observationCount, "flat");
  }

  return parseFlatMapModel({
    model: "flat-map",
    targetScaling: { mode: scaling, offset: packed[2], scale: packed[3] },
    level: packed[4],
    seasonalities,
    coefficients: Array.from(packed.slice(12, eventStart)),
    events,
    eventCoefficients: Array.from(packed.slice(eventStart, regressorStart)),
    regressors: fittedRegressors(regressors, packed, regressorStart),
    noiseScale: packed[5],
    fitSummary: {
      method: "mixed-flat-map-coordinate-v1",
      termination,
      valueScale: packed[6],
      observationCount: packed[7],
      iterations: packed[8],
      objective: packed[9],
      stationarityResidual: packed[10],
    },
  }).pipe(
    Effect.mapError(() =>
      wasmFittingError(observationCount, {
        reason: "backend-failure",
        backendPhase: "protocol",
        message: "WASM mixed flat MAP fitting backend returned invalid fitted parameters",
      }),
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
  const valueCount = width === undefined ? undefined : checkedMultiply(width, timestamps.length);
  const expected = valueCount === undefined ? undefined : checkedAdd(1, valueCount);
  const status = readWasmStatus(packed);

  if (
    expected === undefined ||
    status === undefined ||
    (status === 0 && packed.length !== expected)
  ) {
    return failWasmPrediction(firstTimestamp, {
      reason: "backend-failure",
      backendPhase: "protocol",
      message: "WASM mixed MAP prediction backend returned a malformed protocol result",
    });
  }

  if (status === predictionStatus.success) {
    return Effect.succeed({
      rowCount: timestamps.length,
      componentCount,
      values: packed.slice(1),
      contributions: new Float64Array(timestamps.length * componentCount),
    });
  }

  if (status === predictionStatus.invalidTimestamp || status === predictionStatus.nonFiniteResult) {
    const failedTimestamp = indexedFailureTimestamp(packed, timestamps);

    if (failedTimestamp === undefined) {
      return failWasmPrediction(firstTimestamp, {
        reason: "backend-failure",
        backendPhase: "protocol",
        message: "WASM mixed MAP prediction backend returned a malformed indexed failure",
      });
    }

    return failWasmPrediction(failedTimestamp, {
      reason:
        status === predictionStatus.nonFiniteResult ? "non-finite-forecast" : "backend-failure",
      message:
        status === predictionStatus.nonFiniteResult
          ? "Mixed MAP evaluation produced a non-finite forecast"
          : "WASM mixed MAP prediction backend rejected a prediction timestamp",
    });
  }

  if (packed.length !== 1) {
    return failWasmPrediction(firstTimestamp, {
      reason: "backend-failure",
      backendPhase: "protocol",
      message: "WASM mixed MAP prediction backend returned a malformed failure frame",
    });
  }

  return failWasmPrediction(firstTimestamp, {
    reason: "backend-failure",
    message: "WASM mixed MAP prediction backend rejected fitted model metadata",
  });
};

const defaultLoader: WasmMixedMapLoader = loadProphetWasmModule;

/** Fit a mixed linear MAP model through one coarse Rust/WASM call. */
export const fitMixedLinearMapWithWasm = (
  input: TrainingInput,
  scaling: TargetScalingMode,
  seasonalities: SeasonalityLayout,
  changepoints: ChangepointSetting,
  changepointPriorScale: number,
  optimizer: MapOptimizerControls,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
  events: EventCalendar,
  regressors: ReadonlyArray<ResolvedRegressor>,
): Effect.Effect<PiecewiseMapParameters, FittingError> => {
  const observationCount = input.values.length;
  const explicit = changepoints.mode === "explicit";
  const componentCount = seasonalities.components.length + features.layout.components.length;
  const coefficientCount = seasonalities.coefficientCount + features.layout.coefficientCount;

  return Effect.gen(function* () {
    yield* Effect.annotateCurrentSpan({ "effect_prophet.component.mode": "mixed" });

    const module = yield* attemptWasmFitting(defaultLoader, observationCount, {
      phase: "load",
      message: "Failed to load the WASM mixed linear MAP fitting backend",
    });

    const seasonal = packSeasonalitiesForFit(seasonalities);
    const additional = packKnownAdditiveFeatures(masks, features);
    const modes = modesFor(seasonalities, features);

    const packed = yield* attemptWasmFitting(
      () =>
        module.fit_mixed_linear_map(
          input.timestamps,
          input.values,
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
          modes,
          changepointPriorScale,
          optimizer.maxIterations,
          optimizer.relativeTolerance,
          optimizer.absoluteTolerance,
        ),
      observationCount,
      { phase: "execute", message: "Failed to execute the WASM mixed linear MAP fitting backend" },
    );

    return yield* decodeLinearFit(
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
        { type: "linear-piecewise-map", growth: "linear" },
        observationCount,
        { components: componentCount, coefficients: coefficientCount },
        scaling,
      ),
      { captureStackTrace: false },
    ),
  );
};

/** Fit a mixed flat MAP model through one coarse Rust/WASM call. */
export const fitMixedFlatMapWithWasm = (
  input: TrainingInput,
  scaling: TargetScalingMode,
  seasonalities: SeasonalityLayout,
  optimizer: MapOptimizerControls,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
  events: EventCalendar = emptyEventCalendar,
  regressors: ReadonlyArray<ResolvedRegressor> = [],
): Effect.Effect<FlatMapParameters, FittingError> => {
  const observationCount = input.values.length;
  const componentCount = seasonalities.components.length + features.layout.components.length;
  const coefficientCount = seasonalities.coefficientCount + features.layout.coefficientCount;

  return Effect.gen(function* () {
    yield* Effect.annotateCurrentSpan({ "effect_prophet.component.mode": "mixed" });

    const module = yield* attemptWasmFitting(defaultLoader, observationCount, {
      phase: "load",
      message: "Failed to load the WASM mixed flat MAP fitting backend",
    });

    const seasonal = packSeasonalitiesForFit(seasonalities);
    const additional = packKnownAdditiveFeatures(masks, features);

    const packed = yield* attemptWasmFitting(
      () =>
        module.fit_mixed_flat_map(
          input.timestamps,
          input.values,
          targetScalingModeCode(scaling),
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
          optimizer.maxIterations,
          optimizer.relativeTolerance,
          optimizer.absoluteTolerance,
        ),
      observationCount,
      { phase: "execute", message: "Failed to execute the WASM mixed flat MAP fitting backend" },
    );

    return yield* decodeFlatFit(
      packed,
      observationCount,
      scaling,
      seasonalities,
      events,
      regressors,
    );
  }).pipe(
    Effect.withSpan(
      "effect-prophet.wasm.fit",
      wasmFitSpanOptions(
        { type: "flat-map", growth: "flat" },
        observationCount,
        { components: componentCount, coefficients: coefficientCount },
        scaling,
      ),
      { captureStackTrace: false },
    ),
  );
};

const predictMixed = (
  model: FittedFlatMapProphet | FittedPiecewiseMapProphet,
  timestamps: ReadonlyArray<number>,
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
    yield* Effect.annotateCurrentSpan({ "effect_prophet.component.mode": "mixed" });

    const module = yield* attemptWasmPrediction(defaultLoader, firstTimestamp, {
      phase: "load",
      message: "Failed to load the WASM mixed MAP prediction backend",
    });

    const seasonal = packSeasonalitiesForPrediction(model.seasonalities);
    const additional = packKnownAdditiveFeatures(masks, features);

    const additionalCoefficients = new Float64Array([
      ...model.eventCoefficients,
      ...model.regressors.map((regressor) => regressor.coefficient),
    ]);

    const shared = [
      new Float64Array(timestamps),
      targetScalingModeCode(model.targetScaling.mode),
      model.targetScaling.offset,
      model.targetScaling.scale,
    ] as const;

    const tail = [
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
    ] as const;

    const packed = yield* attemptWasmPrediction(
      () =>
        model.model === "linear-piecewise-map"
          ? module.predict_mixed_linear_map(
              ...shared,
              model.intercept,
              model.slope,
              model.timeOrigin,
              model.timeScale,
              new Float64Array(model.changepointTimestamps),
              new Float64Array(model.deltas),
              ...tail,
            )
          : module.predict_mixed_flat_map(...shared, model.level, ...tail),
      firstTimestamp,
      { phase: "execute", message: "Failed to execute the WASM mixed MAP prediction backend" },
    );

    const batch = yield* decodePredictions(packed, timestamps, componentCount);

    const componentModes = [
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
          message: "WASM mixed MAP prediction omitted a trend value",
        });
      }

      for (let component = 0; component < componentCount; component += 1) {
        const effect = batch.values[row * rowWidth + 4 + component];

        if (effect === undefined) {
          return yield* failWasmPrediction(timestamps[row] ?? firstTimestamp, {
            reason: "backend-failure",
            backendPhase: "protocol",
            message: "WASM mixed MAP prediction omitted a component value",
          });
        }

        const contribution =
          componentModes[component] === "multiplicative" ? trend * effect : effect;

        if (!Number.isFinite(contribution)) {
          return yield* failWasmPrediction(timestamps[row] ?? firstTimestamp, {
            reason: "non-finite-forecast",
            message: "A mixed MAP component contribution is not finite",
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
        model.model,
        timestamps.length,
        componentCount,
        model.targetScaling.mode,
      ),
      { captureStackTrace: false },
    ),
  );
};

/** Predict mixed linear MAP rows through one coarse Rust/WASM call. */
export const predictMixedLinearMapWithWasm = (
  model: FittedPiecewiseMapProphet,
  timestamps: ReadonlyArray<number>,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
): Effect.Effect<MixedMapPredictionBatch, PredictionError> =>
  predictMixed(model, timestamps, masks, features);

/** Predict mixed flat MAP rows through one coarse Rust/WASM call. */
export const predictMixedFlatMapWithWasm = (
  model: FittedFlatMapProphet,
  timestamps: ReadonlyArray<number>,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
): Effect.Effect<MixedMapPredictionBatch, PredictionError> =>
  predictMixed(model, timestamps, masks, features);
