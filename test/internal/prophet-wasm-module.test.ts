import { describe, expect, it } from "vitest";

import {
  assertProphetWasmModule,
  type ProphetWasmModule,
} from "../../src/internal/prophet-wasm-module";

const validModule: ProphetWasmModule = {
  fit_linear_trend: () => new Float64Array([0, 2, 6, 100, 200]),
  predict_linear_trend: () => new Float64Array([0, 11]),
  fit_piecewise_map_with_features: () => new Float64Array([0]),
  fit_piecewise_map_with_features_and_scaling: () => new Float64Array([0]),
  predict_piecewise_map_with_features: () => new Float64Array([0]),
  predict_piecewise_map_with_features_and_scaling: () => new Float64Array([0]),
  fit_flat_map: () => new Float64Array([0, 2, 0.5, 2, 4, 3, 1, 0, 0]),
  fit_flat_map_with_scaling: () => new Float64Array([0]),
  predict_flat_map: () => new Float64Array([0, 2, 0, 2]),
  predict_flat_map_with_scaling: () => new Float64Array([0]),
  fit_piecewise_map: () => new Float64Array([0, 0, 1, 1, 0, 1, 2, 0.5, 4, 3, 1, 0, 0]),
  fit_piecewise_map_with_scaling: () => new Float64Array([0]),
  predict_piecewise_map: () => new Float64Array([0, 2, 0, 2]),
  predict_piecewise_map_with_scaling: () => new Float64Array([0]),
  fit_mixed_linear_map: () => new Float64Array([0]),
  fit_mixed_flat_map: () => new Float64Array([0]),
  predict_mixed_linear_map: () => new Float64Array([0]),
  predict_mixed_flat_map: () => new Float64Array([0]),
  fit_logistic_map_with_features: () => new Float64Array([0]),
  predict_logistic_map_with_features: () => new Float64Array([0]),
};

describe("Prophet WASM module boundary", () => {
  it("accepts the complete callable export contract", () => {
    assertProphetWasmModule(validModule);

    expect(validModule).toBe(validModule);
  });

  it.each([
    ["a non-object module", null, "Prophet WASM module must be an object"],
    [
      "a missing fit export",
      { predict_linear_trend: validModule.predict_linear_trend },
      "Prophet WASM module export fit_linear_trend must be a function",
    ],
    [
      "a non-callable fit export",
      { ...validModule, fit_linear_trend: 1 },
      "Prophet WASM module export fit_linear_trend must be a function",
    ],
    [
      "a missing prediction export",
      { fit_linear_trend: validModule.fit_linear_trend },
      "Prophet WASM module export predict_linear_trend must be a function",
    ],
  ])("rejects %s", (_label, loaded, message) => {
    expect(() => assertProphetWasmModule(loaded)).toThrowError(message);
  });
});
