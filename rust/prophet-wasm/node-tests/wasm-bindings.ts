import { readFileSync } from "node:fs";

import { Predicate } from "effect";

import * as generatedModule from "../../../wasm/prophet_wasm.js";

interface FlatMapPredictionStatuses {
  readonly Success: number;
  readonly InvalidTimestamp: number;
  readonly InvalidModel: number;
  readonly InvalidConfiguration: number;
  readonly LengthMismatch: number;
  readonly SizeOverflow: number;
  readonly NonFiniteResult: number;
}

interface PiecewiseMapFitStatuses {
  readonly Success: number;
  readonly InsufficientObservations: number;
  readonly LengthMismatch: number;
  readonly InvalidObservation: number;
  readonly InvalidConfiguration: number;
  readonly ZeroTimeRange: number;
  readonly SizeOverflow: number;
  readonly NonFiniteResult: number;
  readonly NonConvergence: number;
  readonly NonRepresentableScaling: number;
}

interface PiecewiseMapPredictionStatuses {
  readonly Success: number;
  readonly InvalidTimestamp: number;
  readonly InvalidModel: number;
  readonly InvalidConfiguration: number;
  readonly SizeOverflow: number;
  readonly NonFiniteResult: number;
}

/** Generated Rust/WASM exports exercised directly by the Node boundary tests. */
export interface ProphetWasmNodeBindings {
  readonly FlatMapPredictionStatus: FlatMapPredictionStatuses;
  readonly PiecewiseMapFitStatus: PiecewiseMapFitStatuses;
  readonly PiecewiseMapPredictionStatus: PiecewiseMapPredictionStatuses;
  readonly predict_flat_map: (
    timestamps: Float64Array,
    level: number,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;
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
    optimizer: Float64Array,
  ) => Float64Array;
  readonly fit_piecewise_map_with_scaling: (...args: ReadonlyArray<unknown>) => Float64Array;
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
  readonly predict_piecewise_map_with_scaling: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly fit_piecewise_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly fit_piecewise_map_with_features_and_scaling: (
    ...args: ReadonlyArray<unknown>
  ) => Float64Array;
  readonly predict_piecewise_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly predict_piecewise_map_with_features_and_scaling: (
    ...args: ReadonlyArray<unknown>
  ) => Float64Array;
  readonly fit_mixed_linear_map: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly fit_mixed_flat_map: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly predict_mixed_linear_map: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly predict_mixed_flat_map: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly fit_logistic_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly predict_logistic_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly simulate_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly simulate_logistic_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly fit_mixed_linear_mcmc: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly fit_mixed_flat_mcmc: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly simulate_mcmc_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
  readonly posterior_component_ranges: (...args: ReadonlyArray<unknown>) => Float64Array;
}

const wasmBinaryUrl = new URL("../../../wasm/prophet_wasm_bg.wasm", import.meta.url);

const requiredFunctionExports = [
  "fit_piecewise_map_with_features",
  "fit_piecewise_map_with_features_and_scaling",
  "predict_piecewise_map_with_features",
  "predict_piecewise_map_with_features_and_scaling",
  "fit_mixed_linear_map",
  "fit_mixed_flat_map",
  "predict_mixed_linear_map",
  "predict_mixed_flat_map",
  "fit_logistic_map_with_features",
  "predict_logistic_map_with_features",
  "simulate_map_with_features",
  "simulate_logistic_map_with_features",
  "fit_mixed_linear_mcmc",
  "fit_mixed_flat_mcmc",
  "simulate_mcmc_with_features",
  "posterior_component_ranges",
  "predict_flat_map",
  "predict_flat_map_with_scaling",
  "fit_piecewise_map",
  "fit_piecewise_map_with_scaling",
  "predict_piecewise_map",
  "predict_piecewise_map_with_scaling",
] as const;

const requiredStatusMembers = {
  FlatMapPredictionStatus: [
    "Success",
    "InvalidTimestamp",
    "InvalidModel",
    "InvalidConfiguration",
    "LengthMismatch",
    "SizeOverflow",
    "NonFiniteResult",
  ],
  PiecewiseMapFitStatus: [
    "Success",
    "InsufficientObservations",
    "LengthMismatch",
    "InvalidObservation",
    "InvalidConfiguration",
    "ZeroTimeRange",
    "SizeOverflow",
    "NonFiniteResult",
    "NonConvergence",
    "NonRepresentableScaling",
  ],
  PiecewiseMapPredictionStatus: [
    "Success",
    "InvalidTimestamp",
    "InvalidModel",
    "InvalidConfiguration",
    "SizeOverflow",
    "NonFiniteResult",
  ],
} as const;

const assertProphetWasmNodeBindings: (
  input: unknown,
) => asserts input is ProphetWasmNodeBindings = (input) => {
  if (!Predicate.isObjectKeyword(input)) {
    throw new TypeError("Prophet WASM module must be an object");
  }

  for (const exportName of requiredFunctionExports) {
    if (!Predicate.hasProperty(input, exportName) || !Predicate.isFunction(input[exportName])) {
      throw new TypeError(`Prophet WASM module export ${exportName} must be a function`);
    }
  }

  for (const [exportName, memberNames] of Object.entries(requiredStatusMembers)) {
    if (!Predicate.hasProperty(input, exportName)) {
      throw new TypeError(`Prophet WASM module export ${exportName} must be an object`);
    }

    const statusExport = input[exportName];

    if (!Predicate.isObjectKeyword(statusExport)) {
      throw new TypeError(`Prophet WASM module export ${exportName} must be an object`);
    }

    for (const memberName of memberNames) {
      if (
        !Predicate.hasProperty(statusExport, memberName) ||
        !Predicate.isNumber(statusExport[memberName])
      ) {
        throw new TypeError(
          `Prophet WASM module export ${exportName}.${memberName} must be a number`,
        );
      }
    }
  }
};

/**
 * Initialize and check the generated WASM bindings from the binary on disk.
 *
 * @returns The complete bindings used by the direct Node tests.
 * @throws TypeError when a required generated export is missing or has the wrong runtime kind.
 */
export const loadProphetWasmNodeBindings = (): ProphetWasmNodeBindings => {
  generatedModule.initSync({ module: readFileSync(wasmBinaryUrl) });

  const loaded: unknown = generatedModule;

  assertProphetWasmNodeBindings(loaded);

  return loaded;
};
