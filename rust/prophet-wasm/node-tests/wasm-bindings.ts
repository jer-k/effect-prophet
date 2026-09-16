import { createRequire } from "node:module";

import { Predicate } from "effect";

interface AdditiveFitStatuses {
  readonly Success: number;
  readonly InsufficientObservations: number;
  readonly LengthMismatch: number;
  readonly InvalidObservation: number;
  readonly InvalidConfiguration: number;
  readonly ZeroTimeRange: number;
  readonly RankDeficient: number;
  readonly SizeOverflow: number;
  readonly NonFiniteResult: number;
}

interface AdditivePredictionStatuses {
  readonly Success: number;
  readonly InvalidTimestamp: number;
  readonly InvalidModel: number;
  readonly InvalidConfiguration: number;
  readonly LengthMismatch: number;
  readonly SizeOverflow: number;
  readonly NonFiniteResult: number;
}

interface LinearTrendFitStatuses {
  readonly Success: number;
  readonly InsufficientObservations: number;
  readonly LengthMismatch: number;
  readonly NonFiniteTimestamp: number;
  readonly NonFiniteValue: number;
  readonly ZeroTimeVariance: number;
  readonly NonFiniteResult: number;
}

/** Generated Rust/WASM exports exercised directly by the Node boundary tests. */
export interface ProphetWasmNodeBindings {
  readonly AdditiveFitStatus: AdditiveFitStatuses;
  readonly AdditivePredictionStatus: AdditivePredictionStatuses;
  readonly LinearTrendFitStatus: LinearTrendFitStatuses;
  readonly fit_additive_ridge: (
    timestamps: Float64Array,
    values: Float64Array,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    priorScales: Float64Array,
  ) => Float64Array;
  readonly predict_additive_ridge: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;
  readonly fit_linear_trend: (timestamps: Float64Array, values: Float64Array) => Float64Array;
  readonly predict_linear_trend: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
  ) => Float64Array;
  readonly mean: (values: Float64Array) => number;
}

const require = createRequire(import.meta.url);

const requiredFunctionExports = [
  "fit_additive_ridge",
  "predict_additive_ridge",
  "fit_linear_trend",
  "predict_linear_trend",
  "mean",
] as const;

const requiredStatusMembers = {
  AdditiveFitStatus: [
    "Success",
    "InsufficientObservations",
    "LengthMismatch",
    "InvalidObservation",
    "InvalidConfiguration",
    "ZeroTimeRange",
    "RankDeficient",
    "SizeOverflow",
    "NonFiniteResult",
  ],
  AdditivePredictionStatus: [
    "Success",
    "InvalidTimestamp",
    "InvalidModel",
    "InvalidConfiguration",
    "LengthMismatch",
    "SizeOverflow",
    "NonFiniteResult",
  ],
  LinearTrendFitStatus: [
    "Success",
    "InsufficientObservations",
    "LengthMismatch",
    "NonFiniteTimestamp",
    "NonFiniteValue",
    "ZeroTimeVariance",
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
 * Load and check the generated Node-target WASM bindings.
 *
 * @returns The complete bindings used by the direct Node tests.
 * @throws TypeError when a required generated export is missing or has the wrong runtime kind.
 */
export const loadProphetWasmNodeBindings = (): ProphetWasmNodeBindings => {
  const loaded: unknown = require("../pkg/prophet_wasm.js");

  assertProphetWasmNodeBindings(loaded);

  return loaded;
};
