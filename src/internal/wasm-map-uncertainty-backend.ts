import { Effect } from "effect";

import { PredictionError } from "../errors";
import type {
  FittedFlatMapProphet,
  FittedLogisticMapProphet,
  FittedPiecewiseMapProphet,
} from "../fitted-model";
import type { LogisticPredictionBounds } from "../logistic";
import type { UncertaintyOptions, UncertaintyResult } from "../uncertainty";
import { simulationIdentity } from "../uncertainty";
import { targetScalingModeCode } from "../target-scaling";
import type { KnownAdditiveFeatures, SeasonalityMaskMatrix } from "./additional-features";
import { modesFor } from "./wasm-mixed-map-backend";
import { loadProphetWasmModule, type MapUncertaintyWasmBindings } from "./prophet-wasm-module";
import {
  attemptWasmPrediction,
  checkedAdd,
  checkedMultiply,
  packKnownAdditiveFeatures,
  packSeasonalitiesForPrediction,
  readWasmStatus,
  wasmPredictionError,
} from "./wasm-backend";

/** Injectable production-used lazy loader for real generated-binding and failure tests. */
export type WasmMapUncertaintyLoader = () => MapUncertaintyWasmBindings;

const protocolFailure = (timestamp: number): PredictionError =>
  wasmPredictionError(timestamp, {
    reason: "backend-failure",
    backendPhase: "protocol",
    message: "WASM MAP simulation returned a malformed protocol frame",
  });

/** Simulate fixed-feature MAP uncertainty within one complete traced WASM boundary. */
export const simulateMapWithWasm = (
  model: FittedPiecewiseMapProphet | FittedFlatMapProphet | FittedLogisticMapProphet,
  timestamps: ReadonlyArray<number>,
  masks: SeasonalityMaskMatrix,
  features: KnownAdditiveFeatures,
  options: UncertaintyOptions,
  loader: WasmMapUncertaintyLoader = loadProphetWasmModule,
  logisticBounds?: LogisticPredictionBounds,
): Effect.Effect<UncertaintyResult, PredictionError> => {
  if (model.model === "logistic-piecewise-map" && logisticBounds === undefined) {
    return Effect.fail(
      wasmPredictionError(timestamps[0] ?? 0, {
        reason: "invalid-model",
        message: "Logistic simulation requires resolved prediction bounds",
      }),
    );
  }

  let interceptOrLevel = 0;

  if (model.model === "linear-piecewise-map") {
    interceptOrLevel = model.intercept;
  } else if (model.model === "flat-map") {
    interceptOrLevel = model.level;
  }

  return Effect.gen(function* () {
    const firstTimestamp = timestamps[0];

    if (firstTimestamp === undefined) {
      return yield* Effect.fail(protocolFailure(0));
    }

    const seasonal = packSeasonalitiesForPrediction(model.seasonalities);
    const additional = packKnownAdditiveFeatures(masks, features);

    const coefficients = new Float64Array([
      ...model.eventCoefficients,
      ...model.regressors.map((regressor) => regressor.coefficient),
    ]);

    const module = yield* attemptWasmPrediction(loader, firstTimestamp, {
      phase: "load",
      message: "Failed to load the WASM MAP simulation backend",
    });

    const packed = yield* attemptWasmPrediction(
      () =>
        model.model === "logistic-piecewise-map" && logisticBounds !== undefined
          ? module.simulate_logistic_map_with_features(
              new Float64Array(timestamps),
              logisticBounds.capacities,
              logisticBounds.explicitFloors,
              targetScalingModeCode(model.targetScaling.mode),
              model.targetScaling.scale,
              model.targetScaling.floorPolicy.kind === "implicit" ? 0 : 1,
              model.targetScaling.floorPolicy.kind === "implicit"
                ? model.targetScaling.floorPolicy.floor
                : 0,
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
              coefficients,
              additional.offsets,
              additional.counts,
              modesFor(model.seasonalities, features),
              options.seed,
              options.samples,
              options.intervalWidth,
              options.output === "intervals" ? 0 : 1,
            )
          : module.simulate_map_with_features(
              new Float64Array(timestamps),
              model.model === "linear-piecewise-map" ? 0 : 1,
              targetScalingModeCode(model.targetScaling.mode),
              model.model === "logistic-piecewise-map" ? 0 : model.targetScaling.offset,
              model.targetScaling.scale,
              interceptOrLevel,
              model.model === "linear-piecewise-map" ? model.slope : 0,
              model.model === "linear-piecewise-map" ? model.timeOrigin : 0,
              model.model === "linear-piecewise-map" ? model.timeScale : 0,
              new Float64Array(
                model.model === "linear-piecewise-map" ? model.changepointTimestamps : [],
              ),
              new Float64Array(model.model === "linear-piecewise-map" ? model.deltas : []),
              model.noiseScale,
              seasonal.periods,
              seasonal.orders,
              new Float64Array(model.coefficients),
              additional.packedMasks,
              features.matrix.columnCount,
              additional.values,
              coefficients,
              additional.offsets,
              additional.counts,
              modesFor(model.seasonalities, features),
              options.seed,
              options.samples,
              options.intervalWidth,
              options.output === "intervals" ? 0 : 1,
            ),
      firstTimestamp,
      { phase: "execute", message: "Failed to execute the WASM MAP simulation backend" },
    );

    const status = readWasmStatus(packed);

    if (status === undefined) {
      return yield* Effect.fail(protocolFailure(firstTimestamp));
    }

    if (status !== 0) {
      const indexed = status === 4 && packed.length === 3;
      const row = indexed ? packed[1] : undefined;
      const sample = indexed ? packed[2] : undefined;

      if (
        ![1, 2, 3, 4].includes(status) ||
        (status === 4 &&
          (!Number.isSafeInteger(row) ||
            row === undefined ||
            row < 0 ||
            row >= timestamps.length ||
            !Number.isSafeInteger(sample) ||
            sample === undefined ||
            sample < 0 ||
            sample >= options.samples)) ||
        (status !== 4 && packed.length !== 1)
      ) {
        return yield* Effect.fail(protocolFailure(firstTimestamp));
      }

      let reason: "simulation-limit" | "non-finite-forecast" | "invalid-model" | "backend-failure";

      switch (status) {
        case 2:
          reason = "invalid-model";
          break;
        case 3:
          reason = "simulation-limit";
          break;
        case 4:
          reason = "non-finite-forecast";
          break;
        default:
          reason = "backend-failure";
      }

      return yield* Effect.fail(
        wasmPredictionError(
          status === 4 ? (timestamps[row ?? 0] ?? firstTimestamp) : firstTimestamp,
          {
            reason,
            message: "WASM MAP simulation rejected the request",
          },
        ),
      );
    }

    const outputCode = options.output === "intervals" ? 0 : 1;
    const cells = checkedMultiply(timestamps.length, options.samples);
    const valuesLength = cells === undefined ? undefined : checkedMultiply(cells, 2);
    const intervalsLength = checkedMultiply(timestamps.length, 4);
    const dataLength = outputCode === 0 ? intervalsLength : valuesLength;
    const expectedLength = dataLength === undefined ? undefined : checkedAdd(4, dataLength);

    if (
      packed.length !== expectedLength ||
      packed[1] !== outputCode ||
      packed[2] !== timestamps.length ||
      packed[3] !== options.samples
    ) {
      return yield* Effect.fail(protocolFailure(firstTimestamp));
    }

    if (outputCode === 1 && cells !== undefined) {
      const trend = new Float64Array(packed.slice(4, 4 + cells));
      const value = new Float64Array(packed.slice(4 + cells));

      if (
        trend.some((entry) => !Number.isFinite(entry)) ||
        value.some((entry) => !Number.isFinite(entry))
      ) {
        return yield* Effect.fail(protocolFailure(firstTimestamp));
      }

      return {
        kind: "samples" as const,
        simulation: simulationIdentity,
        sampleCount: options.samples,
        timestamps: Object.freeze([...timestamps]),
        trend,
        value,
      };
    }

    const rows: Array<{
      timestamp: number;
      trend: { lower: number; upper: number };
      value: { lower: number; upper: number };
    }> = [];

    for (const [row, timestamp] of timestamps.entries()) {
      const index = 4 + row * 4;
      const [trendLower, trendUpper, valueLower, valueUpper] = packed.slice(index, index + 4);

      if (
        trendLower === undefined ||
        trendUpper === undefined ||
        valueLower === undefined ||
        valueUpper === undefined ||
        ![trendLower, trendUpper, valueLower, valueUpper].every(Number.isFinite) ||
        trendLower > trendUpper ||
        valueLower > valueUpper
      ) {
        return yield* Effect.fail(protocolFailure(timestamp));
      }

      rows.push({
        timestamp,
        trend: { lower: trendLower, upper: trendUpper },
        value: { lower: valueLower, upper: valueUpper },
      });
    }

    return {
      kind: "intervals" as const,
      simulation: simulationIdentity,
      sampleCount: options.samples,
      intervalWidth: options.intervalWidth,
      rows,
    };
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
          "effect_prophet.sample.count": options.samples,
        },
      },
      { captureStackTrace: false },
    ),
  );
};
