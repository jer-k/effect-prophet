import { Effect } from "effect";

import { PredictionError } from "../errors";
import type { FittedFlatMapProphet } from "../fitted-model";
import { targetScalingModeCode } from "../target-scaling";
import { loadProphetWasmModule, type FlatMapWasmBindings } from "./prophet-wasm-module";
import {
  attemptWasmPrediction,
  decodeSeasonalPredictions,
  packSeasonalitiesForPrediction,
  type WasmSeasonalPredictionBatch,
  wasmPredictSpanOptions,
} from "./wasm-backend";

/** Lazy loader for checked Rust/WASM flat MAP bindings. */
export type WasmFlatMapLoader = () => FlatMapWasmBindings;

/** One checked row-major flat MAP prediction batch. */
export type FlatMapPredictionBatch = WasmSeasonalPredictionBatch;

/** Narrow flat MAP prediction backed by one WASM loader. */
export interface WasmFlatMapAdapter {
  /** Predict only from complete flat MAP state. */
  readonly predict: (
    model: FittedFlatMapProphet,
    timestamps: ReadonlyArray<number>,
  ) => Effect.Effect<FlatMapPredictionBatch, PredictionError>;
}

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
 * @returns Flat MAP prediction using the supplied boundary.
 */
export const makeWasmFlatMapAdapter = (loadModule: WasmFlatMapLoader): WasmFlatMapAdapter => {
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
          module.predict_flat_map_with_scaling(
            new Float64Array(timestamps),
            targetScalingModeCode(model.targetScaling.mode),
            model.targetScaling.offset,
            model.targetScaling.scale,
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
        wasmPredictSpanOptions(
          "flat-map",
          timestamps.length,
          componentCount,
          model.targetScaling.mode,
        ),
        { captureStackTrace: false },
      ),
    );
  };

  return { predict };
};

const defaultWasmFlatMapAdapter = makeWasmFlatMapAdapter(loadProphetWasmModule);

/** Evaluate a flat MAP model through the default coarse Rust/WASM operation. */
export const predictFlatMapWithWasm = defaultWasmFlatMapAdapter.predict;
