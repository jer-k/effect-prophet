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

/** Complete generated Rust/WASM module contract required by this package version. */
export type ProphetWasmModule = LinearTrendWasmBindings;

/** Lazy loader that returns a checked Rust/WASM module. */
export type ProphetWasmModuleLoader = () => ProphetWasmModule;

const require = createRequire(import.meta.url);

const requiredFunctionExports = ["fit_linear_trend", "predict_linear_trend"] as const;

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
  const loaded: unknown = require("../../rust/prophet-wasm/pkg/prophet_wasm.js");

  assertProphetWasmModule(loaded);

  return loaded;
};
