import { createRequire } from "node:module";

import { Predicate } from "effect";

/** Rust/WASM bindings required by the linear-trend adapter. */
export interface LinearTrendWasmBindings {
  /** Fit one complete linear trend and return the packed Rust protocol result. */
  readonly fit_linear_trend: (timestamps: Float64Array, values: Float64Array) => Float64Array;

  /** Evaluate one complete timestamp batch and return the packed Rust protocol result. */
  readonly predict_linear_trend: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
  ) => Float64Array;
}

/** Rust/WASM bindings for masked seasonalities and known additive MAP columns. */
export interface AdditiveFeatureWasmBindings {
  readonly fit_piecewise_map_with_features: (
    timestamps: Float64Array,
    values: Float64Array,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalPriorScales: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalPriorScales: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
    changepointPriorScale: number,
    maxIterations: number,
    relativeTolerance: number,
    absoluteTolerance: number,
  ) => Float64Array;

  readonly fit_piecewise_map_with_features_and_scaling: (
    timestamps: Float64Array,
    values: Float64Array,
    scalingMode: number,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalPriorScales: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalPriorScales: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
    changepointPriorScale: number,
    maxIterations: number,
    relativeTolerance: number,
    absoluteTolerance: number,
  ) => Float64Array;

  readonly predict_piecewise_map_with_features: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalCoefficients: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalCoefficients: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
  ) => Float64Array;

  readonly predict_piecewise_map_with_features_and_scaling: (
    timestamps: Float64Array,
    scalingMode: number,
    targetOffset: number,
    targetScale: number,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalCoefficients: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalCoefficients: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
  ) => Float64Array;
}

/** Rust/WASM bindings for the packed reduced flat MAP protocol. */
export interface FlatMapWasmBindings {
  /** Fit one complete flat MAP model and return its packed protocol frame. */
  readonly fit_flat_map: (
    timestamps: Float64Array,
    values: Float64Array,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    priorScales: Float64Array,
  ) => Float64Array;

  /** Fit one complete scaled flat MAP model and return its packed protocol frame. */
  readonly fit_flat_map_with_scaling: (
    timestamps: Float64Array,
    values: Float64Array,
    scalingMode: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    priorScales: Float64Array,
  ) => Float64Array;

  /** Evaluate one complete flat MAP prediction batch. */
  readonly predict_flat_map: (
    timestamps: Float64Array,
    level: number,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;

  /** Evaluate one complete scaled flat MAP prediction batch. */
  readonly predict_flat_map_with_scaling: (
    timestamps: Float64Array,
    scalingMode: number,
    targetOffset: number,
    targetScale: number,
    level: number,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;
}

/** Rust/WASM bindings for linear piecewise MAP fitting and prediction. */
export interface PiecewiseMapWasmBindings {
  /** Fit one complete explicit or automatic linear piecewise MAP model. */
  readonly fit_piecewise_map: (
    timestamps: Float64Array,
    values: Float64Array,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    priorScales: Float64Array,
    changepointPriorScale: number,
    maxIterations: number,
    relativeTolerance: number,
    absoluteTolerance: number,
  ) => Float64Array;

  /** Fit one scaled explicit or automatic linear piecewise MAP model. */
  readonly fit_piecewise_map_with_scaling: (
    timestamps: Float64Array,
    values: Float64Array,
    scalingMode: number,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    priorScales: Float64Array,
    changepointPriorScale: number,
    maxIterations: number,
    relativeTolerance: number,
    absoluteTolerance: number,
  ) => Float64Array;

  /** Evaluate one complete linear piecewise MAP prediction batch. */
  readonly predict_piecewise_map: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;

  /** Evaluate one complete scaled linear piecewise MAP prediction batch. */
  readonly predict_piecewise_map_with_scaling: (
    timestamps: Float64Array,
    scalingMode: number,
    targetOffset: number,
    targetScale: number,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;
}

/** Rust/WASM bindings for explicit mixed linear and flat MAP operations. */
export interface MixedMapWasmBindings {
  /** Fit one mixed linear MAP request and return a packed protocol frame. */
  readonly fit_mixed_linear_map: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Fit one mixed reduced-flat MAP request and return a packed protocol frame. */
  readonly fit_mixed_flat_map: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Predict one mixed linear MAP batch and return a packed protocol frame. */
  readonly predict_mixed_linear_map: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Predict one mixed reduced-flat MAP batch and return a packed protocol frame. */
  readonly predict_mixed_flat_map: (...args: ReadonlyArray<unknown>) => Float64Array;
}

/** Rust/WASM bindings for floor-aware logistic MAP operations. */
export interface LogisticMapWasmBindings {
  /** Fit one complete logistic MAP request. */
  readonly fit_logistic_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Predict one complete logistic MAP batch. */
  readonly predict_logistic_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
}

/** Complete generated Rust/WASM module contract required by this package version. */
export type ProphetWasmModule = LinearTrendWasmBindings &
  AdditiveFeatureWasmBindings &
  FlatMapWasmBindings &
  PiecewiseMapWasmBindings &
  MixedMapWasmBindings &
  LogisticMapWasmBindings;

/** Lazy loader that returns a checked Rust/WASM module. */
export type ProphetWasmModuleLoader = () => ProphetWasmModule;

const require = createRequire(import.meta.url);

const requiredFunctionExports = [
  "fit_linear_trend",
  "predict_linear_trend",
  "fit_piecewise_map_with_features",
  "fit_piecewise_map_with_features_and_scaling",
  "predict_piecewise_map_with_features",
  "predict_piecewise_map_with_features_and_scaling",
  "fit_flat_map",
  "fit_flat_map_with_scaling",
  "predict_flat_map",
  "predict_flat_map_with_scaling",
  "fit_piecewise_map",
  "fit_piecewise_map_with_scaling",
  "predict_piecewise_map",
  "predict_piecewise_map_with_scaling",
  "fit_mixed_linear_map",
  "fit_mixed_flat_map",
  "predict_mixed_linear_map",
  "predict_mixed_flat_map",
  "fit_logistic_map_with_features",
  "predict_logistic_map_with_features",
] as const;

/**
 * Refine an unchecked JavaScript module value into the required Prophet WASM contract.
 *
 * Future generated exports required by the TypeScript package must be added to
 * `ProphetWasmModule` and the required-export check in this function.
 *
 * @param input - Unchecked value obtained directly from a JavaScript module loader.
 * @throws TypeError when the value does not provide every required callable export.
 */
export function assertProphetWasmModule(input: unknown): asserts input is ProphetWasmModule {
  if (!Predicate.isObjectKeyword(input)) {
    throw new TypeError("Prophet WASM module must be an object");
  }

  for (const exportName of requiredFunctionExports) {
    if (!Predicate.hasProperty(input, exportName) || !Predicate.isFunction(input[exportName])) {
      throw new TypeError(`Prophet WASM module export ${exportName} must be a function`);
    }
  }
}

/**
 * Lazily load and check the generated Node-target Prophet WASM module.
 *
 * @returns The checked bindings required by this package version.
 * @throws Error when Node cannot load or initialize the generated module, or
 * TypeError when the loaded module does not satisfy the required export contract.
 */
export const loadProphetWasmModule: ProphetWasmModuleLoader = () => {
  const loaded: unknown = require("../../wasm/prophet_wasm.js");

  assertProphetWasmModule(loaded);

  return loaded;
};
