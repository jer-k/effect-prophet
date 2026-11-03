import { Effect, Match } from "effect";

import { coefficientModeCodes } from "../component-mode";
import type { FittingError, PredictionError } from "../errors";
import type { EventCalendar } from "../event";
import { parseFittedModel, isMcmcModel, type FittedMcmcProphet } from "../fitted-model";
import type { McmcDiagnostics, McmcOptions } from "../mcmc";
import type { ChangepointSetting } from "../options";
import type { ResolvedRegressor } from "../regressor";
import type { SeasonalityLayout } from "../seasonality";
import { targetScalingModeCode, type TargetScalingMode } from "../target-scaling";
import {
  expectedSimulation,
  type UncertaintyOptions,
  type UncertaintyResult,
} from "../uncertainty";
import type { WarmStartParameters } from "../warm-start";
import type { KnownAdditiveFeatures, SeasonalityMaskMatrix } from "./additional-features";
import type { TrainingInput } from "./fitting-backend";
import {
  loadProphetWasmModule,
  type McmcWasmBindings,
  type WasmBindingsLoader,
} from "./prophet-wasm-module";
import { encodeWarmStart } from "./stan-map-protocol";
import {
  annotateFittedDimensions,
  attemptWasmFitting,
  attemptWasmPrediction,
  failWasmFitting,
  loadWasmForFitting,
  loadWasmForPrediction,
  packChangepointsForFit,
  packKnownAdditiveFeatures,
  packSeasonalitiesForFit,
  packSeasonalitiesForPrediction,
  readWasmStatus,
  wasmFitSpanOptions,
  wasmFittingError,
  wasmPredictionError,
} from "./wasm-backend";
import { decodeSimulationFrame, type SimulationOffsets } from "./wasm-map-uncertainty-backend";
import { fittingFailure as mixedFittingFailure } from "./wasm-mixed-map-backend";

/** Lazy loader for the posterior bindings. */
export type WasmMcmcLoader = WasmBindingsLoader<McmcWasmBindings>;

const defaultLoader: WasmMcmcLoader = loadProphetWasmModule;

/** Values before the step sizes in a successful fit frame. */
const fitHeader = 20;

const samplingLimitStatus = 12;

const samplerFailureStatus = 13;

/** Everything a posterior fit needs besides the training rows. */
export interface McmcFitRequest {
  readonly growth: "flat" | "linear";
  readonly scaling: TargetScalingMode;
  readonly seasonalities: SeasonalityLayout;
  readonly changepoints: ChangepointSetting;
  readonly changepointPriorScale: number;
  readonly mcmc: McmcOptions;
  readonly masks: SeasonalityMaskMatrix;
  readonly features: KnownAdditiveFeatures;
  readonly events: EventCalendar;
  readonly regressors: ReadonlyArray<ResolvedRegressor>;
  readonly warmStart?: WarmStartParameters;
}

const fitFailure = (
  packed: Float64Array,
  observationCount: number,
  growth: "flat" | "linear",
): Effect.Effect<never, FittingError> => {
  const status = readWasmStatus(packed);

  if (status === samplingLimitStatus && packed.length === 1) {
    return failWasmFitting(observationCount, {
      reason: "sampling-limit",
      message: "Posterior sampling would keep more draws or values than its limits allow",
    });
  }

  if (status === samplerFailureStatus && packed.length === 2) {
    switch (packed[1]) {
      case 3:
        return failWasmFitting(observationCount, {
          reason: "non-finite-result",
          message: "The posterior density is not finite at the sampler's starting point",
        });
      case 4:
        return failWasmFitting(observationCount, {
          reason: "non-convergence",
          message: "The sampler found no usable step size: the posterior looks improper",
        });
      case 5:
        return failWasmFitting(observationCount, {
          reason: "non-convergence",
          message: "The sampler found no step size small enough to move",
        });
      case 6:
        return failWasmFitting(observationCount, {
          reason: "non-finite-result",
          message: "The sampler's metric adaptation overflowed",
        });
      default:
        return failWasmFitting(observationCount, {
          reason: "backend-failure",
          message: "The sampler rejected its configuration or density",
        });
    }
  }

  return mixedFittingFailure(packed, observationCount, growth);
};

const protocolFailure = (observationCount: number): Effect.Effect<never, FittingError> =>
  failWasmFitting(observationCount, {
    reason: "backend-failure",
    backendPhase: "protocol",
    message: "WASM posterior fitting backend returned a malformed protocol result",
  });

const finiteOrNull = (value: number | undefined): number | null =>
  value !== undefined && Number.isFinite(value) ? value : null;

/** Split a row-major draw block into rows of `width` values starting at `offset`. */
const drawRows = (
  draws: Float64Array,
  drawCount: number,
  width: number,
  offset: number,
  count: number,
): Array<Array<number>> =>
  Array.from({ length: drawCount }, (_, draw) =>
    Array.from(draws.subarray(draw * width + offset, draw * width + offset + count)),
  );

const drawColumn = (
  draws: Float64Array,
  drawCount: number,
  width: number,
  offset: number,
): Array<number> =>
  Array.from({ length: drawCount }, (_, draw) => draws[draw * width + offset] ?? Number.NaN);

const decodeFit = (
  packed: Float64Array,
  input: TrainingInput,
  request: McmcFitRequest,
): Effect.Effect<FittedMcmcProphet, FittingError> =>
  Effect.gen(function* () {
    const observationCount = input.values.length;

    if (readWasmStatus(packed) !== 0) {
      return yield* fitFailure(packed, observationCount, request.growth);
    }

    const header = Array.from(packed.subarray(0, fitHeader));
    const [, scalingCode, offset, scale, changepointCount, drawCount, width] = header;
    const [timeOrigin, timeScale, observations, termination] = header.slice(7, 11);
    const chainCount = header[18];
    const { seasonalities, events, regressors, growth } = request;
    const seasonalCount = seasonalities.coefficientCount;
    const eventCount = events.layout.coefficientCount;
    const featureCount = seasonalCount + eventCount + regressors.length;

    if (
      changepointCount === undefined ||
      drawCount === undefined ||
      width === undefined ||
      chainCount === undefined ||
      !Number.isSafeInteger(changepointCount) ||
      !Number.isSafeInteger(drawCount) ||
      !Number.isSafeInteger(chainCount) ||
      drawCount < 1 ||
      scalingCode !== targetScalingModeCode(request.scaling) ||
      observations !== observationCount ||
      (termination !== 0 && termination !== 1) ||
      width !== (growth === "linear" ? 3 + changepointCount : 2) + featureCount
    ) {
      return yield* protocolFailure(observationCount);
    }

    const stepStart = fitHeader;
    const changepointStart = stepStart + chainCount;
    const meanStart = changepointStart + changepointCount;
    const drawStart = meanStart + width;

    if (packed.length !== drawStart + drawCount * width) {
      return yield* protocolFailure(observationCount);
    }

    const means = packed.subarray(meanStart, drawStart);
    const draws = packed.subarray(drawStart);
    const trendWidth = growth === "linear" ? 2 + changepointCount : 1;
    const noiseIndex = trendWidth;
    const coefficientStart = trendWidth + 1;
    const eventStart = coefficientStart + seasonalCount;
    const regressorStart = eventStart + eventCount;

    const meanSlice = (start: number, count: number) =>
      Array.from(means.subarray(start, start + count));

    const diagnostics: McmcDiagnostics | null =
      termination === 1
        ? null
        : {
            divergences: header[11] ?? Number.NaN,
            warmupDivergences: header[12] ?? Number.NaN,
            maxTreeDepthHits: header[13] ?? Number.NaN,
            meanAcceptStat: header[14] ?? Number.NaN,
            maxRhat: finiteOrNull(header[15]),
            minBulkEss: finiteOrNull(header[16]),
            minTailEss: finiteOrNull(header[17]),
            stepSizes: Array.from(packed.subarray(stepStart, changepointStart)),
          };

    const fitSummary = {
      method: "stan-nuts-v1",
      termination: termination === 1 ? "constant-target-shortcut" : "sampled",
      valueScale: scale,
      observationCount,
      sampler: {
        chains: request.mcmc.chains,
        warmup: request.mcmc.warmup,
        drawsPerChain: request.mcmc.drawsPerChain,
        seed: request.mcmc.seed,
      },
      diagnostics,
    } as const;

    const shared = {
      targetScaling: { mode: request.scaling, offset, scale },
      seasonalities,
      coefficients: meanSlice(coefficientStart, seasonalCount),
      events,
      eventCoefficients: meanSlice(eventStart, eventCount),
      regressors: regressors.map((regressor, index) => ({
        ...regressor,
        coefficient: means[regressorStart + index] ?? Number.NaN,
      })),
      noiseScale: means[noiseIndex],
    };

    const featureDraws = {
      noiseScale: drawColumn(draws, drawCount, width, noiseIndex),
      coefficients: drawRows(draws, drawCount, width, coefficientStart, seasonalCount),
      eventCoefficients: drawRows(draws, drawCount, width, eventStart, eventCount),
      regressorCoefficients: drawRows(draws, drawCount, width, regressorStart, regressors.length),
    };

    const parameters =
      growth === "linear"
        ? {
            model: "linear-piecewise-mcmc",
            ...shared,
            intercept: means[0],
            slope: means[1],
            timeOrigin,
            timeScale,
            changepointTimestamps: Array.from(packed.subarray(changepointStart, meanStart)),
            deltas: meanSlice(2, changepointCount),
            fitSummary: { ...fitSummary, changepointPriorScale: request.changepointPriorScale },
            posterior: {
              intercept: drawColumn(draws, drawCount, width, 0),
              slope: drawColumn(draws, drawCount, width, 1),
              deltas: drawRows(draws, drawCount, width, 2, changepointCount),
              ...featureDraws,
            },
          }
        : {
            model: "flat-mcmc",
            ...shared,
            level: means[0],
            fitSummary,
            posterior: { level: drawColumn(draws, drawCount, width, 0), ...featureDraws },
          };

    const parsed = yield* parseFittedModel(parameters).pipe(
      Effect.mapError(() =>
        wasmFittingError(observationCount, {
          reason: "backend-failure",
          backendPhase: "protocol",
          message: "WASM posterior fitting backend returned invalid fitted parameters",
        }),
      ),
    );

    if (!isMcmcModel(parsed)) {
      return yield* protocolFailure(observationCount);
    }

    return parsed;
  });

/** Annotate the sampler's settings and health on the current fit span. */
const annotateSampling = (model: FittedMcmcProphet) => {
  const diagnostics = model.fitSummary.diagnostics;

  const completion = Effect.annotateCurrentSpan({
    "effect_prophet.mcmc.termination": model.fitSummary.termination,
    "effect_prophet.mcmc.draw.count": model.posterior.noiseScale.length,
  });

  if (diagnostics === null) {
    return completion;
  }

  return Effect.andThen(
    completion,
    Effect.annotateCurrentSpan({
      "effect_prophet.mcmc.divergence.count": diagnostics.divergences,
      "effect_prophet.mcmc.max_tree_depth.count": diagnostics.maxTreeDepthHits,
    }),
  );
};

/** Sample a linear or flat posterior through one coarse Rust/WASM call. */
export const fitMcmcWithWasm = (
  input: TrainingInput,
  request: McmcFitRequest,
  loader: WasmMcmcLoader = defaultLoader,
): Effect.Effect<FittedMcmcProphet, FittingError> => {
  const observationCount = input.values.length;
  const { seasonalities, features, mcmc } = request;
  const componentCount = seasonalities.components.length + features.layout.components.length;
  const coefficientCount = seasonalities.coefficientCount + features.layout.coefficientCount;

  return Effect.gen(function* () {
    yield* Effect.annotateCurrentSpan({
      "effect_prophet.mcmc.chains": mcmc.chains,
      "effect_prophet.mcmc.samples": mcmc.samples,
      "effect_prophet.mcmc.warmup": mcmc.warmup,
      "effect_prophet.mcmc.initialization":
        request.warmStart === undefined ? "default" : "warm-start",
    });

    const module = yield* loadWasmForFitting(
      loader,
      observationCount,
      "Failed to load the WASM posterior fitting backend",
    );

    const seasonal = packSeasonalitiesForFit(seasonalities);
    const additional = packKnownAdditiveFeatures(request.masks, features);
    const changepoints = packChangepointsForFit(request.changepoints);

    const fit =
      request.growth === "linear" ? module.fit_mixed_linear_mcmc : module.fit_mixed_flat_mcmc;

    const packed = yield* attemptWasmFitting(
      () =>
        fit(
          input.timestamps,
          input.values,
          targetScalingModeCode(request.scaling),
          changepoints.mode,
          changepoints.timestamps,
          changepoints.count,
          changepoints.range,
          seasonal.periods,
          seasonal.orders,
          seasonal.priors,
          additional.packedMasks,
          features.matrix.columnCount,
          additional.values,
          additional.priors,
          additional.offsets,
          additional.counts,
          coefficientModeCodes(seasonalities, features),
          request.changepointPriorScale,
          new Float64Array([mcmc.chains, mcmc.warmup, mcmc.drawsPerChain, mcmc.seed]),
          new Float64Array(encodeWarmStart(request.warmStart)),
        ),
      observationCount,
      { message: "Failed to execute the WASM posterior fitting backend" },
    );

    const model = yield* decodeFit(packed, input, request);

    yield* annotateSampling(model);
    yield* annotateFittedDimensions(model, packed[19] ?? 0);

    return model;
  }).pipe(
    Effect.withSpan(
      "effect-prophet.wasm.fit",
      wasmFitSpanOptions(
        {
          type: request.growth === "linear" ? "linear-piecewise-mcmc" : "flat-mcmc",
          growth: request.growth,
        },
        observationCount,
        { components: componentCount, coefficients: coefficientCount },
        request.scaling,
      ),
      { captureStackTrace: false },
    ),
  );
};

/** A posterior's draws laid out as the Rust simulation reads them, row-major. */
const packDraws = (model: FittedMcmcProphet): Float64Array => {
  const { posterior } = model;
  const rows: Array<number> = [];

  for (let draw = 0; draw < posterior.noiseScale.length; draw += 1) {
    if (model.model === "linear-piecewise-mcmc") {
      rows.push(
        model.posterior.intercept[draw] ?? Number.NaN,
        model.posterior.slope[draw] ?? Number.NaN,
        ...(model.posterior.deltas[draw] ?? []),
      );
    } else {
      rows.push(model.posterior.level[draw] ?? Number.NaN);
    }

    rows.push(
      posterior.noiseScale[draw] ?? Number.NaN,
      ...(posterior.coefficients[draw] ?? []),
      ...(posterior.eventCoefficients[draw] ?? []),
      ...(posterior.regressorCoefficients[draw] ?? []),
    );
  }

  return new Float64Array(rows);
};

/** The trend and draw arguments both posterior prediction calls share. */
const posteriorArguments = (
  model: FittedMcmcProphet,
  timestamps: ReadonlyArray<number>,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
) => {
  const linear = model.model === "linear-piecewise-mcmc";
  const seasonal = packSeasonalitiesForPrediction(model.seasonalities);
  const additional = packKnownAdditiveFeatures(masks, features);

  return [
    new Float64Array(timestamps),
    linear ? 0 : 1,
    targetScalingModeCode(model.targetScaling.mode),
    model.targetScaling.offset,
    model.targetScaling.scale,
    linear ? model.timeOrigin : 0,
    linear ? model.timeScale : 0,
    new Float64Array(linear ? model.changepointTimestamps : []),
    model.posterior.noiseScale.length,
    packDraws(model),
    seasonal.periods,
    seasonal.orders,
    additional.packedMasks,
    features.matrix.columnCount,
    additional.values,
    additional.offsets,
    additional.counts,
    coefficientModeCodes(model.seasonalities, features),
  ] as const;
};

const noOffsets: SimulationOffsets = {
  rows: new Float64Array(),
  additive: new Float64Array(),
  multiplicative: new Float64Array(),
};

/** Simulate a posterior's paths within one traced WASM boundary. */
export const simulateMcmcWithWasm = (
  model: FittedMcmcProphet,
  timestamps: ReadonlyArray<number>,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
  options: UncertaintyOptions,
  loader: WasmMcmcLoader = defaultLoader,
  offsets: SimulationOffsets = noOffsets,
): Effect.Effect<UncertaintyResult, PredictionError> => {
  const expected = expectedSimulation(options.samples, model.posterior.noiseScale.length);
  const firstTimestamp = timestamps[0] ?? 0;

  return Effect.gen(function* () {
    const module = yield* loadWasmForPrediction(
      loader,
      firstTimestamp,
      "Failed to load the WASM posterior simulation backend",
    );

    const packed = yield* attemptWasmPrediction(
      () =>
        module.simulate_mcmc_with_features(
          ...posteriorArguments(model, timestamps, masks, features),
          offsets.rows,
          offsets.additive,
          offsets.multiplicative,
          options.seed,
          options.samples,
          options.intervalWidth,
          options.output === "intervals" ? 0 : 1,
        ),
      firstTimestamp,
      { message: "Failed to execute the WASM posterior simulation backend" },
    );

    return yield* decodeSimulationFrame(packed, timestamps, options, expected);
  }).pipe(
    Effect.withSpan(
      "effect-prophet.wasm.simulate",
      {
        attributes: {
          "effect_prophet.operation": "simulate",
          "effect_prophet.backend.type": "rust-wasm",
          "effect_prophet.model.type": model.model,
          "effect_prophet.output.kind": options.output,
          "effect_prophet.prediction.count": timestamps.length,
          "effect_prophet.sample.count": expected.sampleCount,
          "effect_prophet.mcmc.draw.count": model.posterior.noiseScale.length,
        },
      },
      { captureStackTrace: false },
    ),
  );
};

/**
 * Each row's posterior ranges, `[lower, upper]` pairs for the additive total, the
 * multiplicative total, then each seasonality, event and regressor component.
 */
export const posteriorComponentRangesWithWasm = (
  model: FittedMcmcProphet,
  timestamps: ReadonlyArray<number>,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
  intervalWidth: number,
  loader: WasmMcmcLoader = defaultLoader,
): Effect.Effect<Float64Array, PredictionError> => {
  const firstTimestamp = timestamps[0] ?? 0;
  const series = 2 + model.seasonalities.components.length + features.layout.components.length;

  return Effect.gen(function* () {
    const module = yield* loadWasmForPrediction(
      loader,
      firstTimestamp,
      "Failed to load the WASM posterior component backend",
    );

    const packed = yield* attemptWasmPrediction(
      () =>
        module.posterior_component_ranges(
          ...posteriorArguments(model, timestamps, masks, features),
          intervalWidth,
        ),
      firstTimestamp,
      { message: "Failed to execute the WASM posterior component backend" },
    );

    const status = readWasmStatus(packed);

    if (
      status !== 0 ||
      packed[1] !== timestamps.length ||
      packed[2] !== series ||
      packed.length !== 3 + timestamps.length * series * 2
    ) {
      if (status === 0 || status === undefined) {
        return yield* wasmPredictionError(firstTimestamp, {
          reason: "backend-failure",
          backendPhase: "protocol",
          message: "WASM posterior component backend returned a malformed protocol frame",
        });
      }

      const reason = Match.value(status).pipe(
        Match.when(2, () => "invalid-model" as const),
        Match.when(3, () => "simulation-limit" as const),
        Match.when(4, () => "non-finite-forecast" as const),
        Match.orElse(() => "backend-failure" as const),
      );

      return yield* wasmPredictionError(firstTimestamp, {
        reason,
        message: "WASM posterior component backend rejected the request",
      });
    }

    const values = packed.slice(3);

    if (values.some((value) => !Number.isFinite(value))) {
      return yield* wasmPredictionError(firstTimestamp, {
        reason: "backend-failure",
        backendPhase: "protocol",
        message: "WASM posterior component backend returned a non-finite range",
      });
    }

    return values;
  }).pipe(
    Effect.withSpan(
      "effect-prophet.wasm.componentRanges",
      {
        attributes: {
          "effect_prophet.operation": "component-ranges",
          "effect_prophet.backend.type": "rust-wasm",
          "effect_prophet.model.type": model.model,
          "effect_prophet.prediction.count": timestamps.length,
          "effect_prophet.mcmc.draw.count": model.posterior.noiseScale.length,
        },
      },
      { captureStackTrace: false },
    ),
  );
};
