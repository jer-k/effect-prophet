import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const empty = new Float64Array();

describe("generated target-scaling bindings", () => {
  it("fits and predicts minmax flat MAP state with one trend offset", () => {
    const timestamps = new Float64Array([0, 1, 2, 3]);
    const values = new Float64Array([10, 12, 11, 13]);
    const originalValues = Array.from(values);
    const fit = wasm.fit_flat_map_with_scaling(timestamps, values, 1, empty, empty, empty);

    assert.equal(fit[0], wasm.FlatMapFitStatus.Success);
    assert.equal(fit[1], 1);
    assert.equal(fit[2], 10);
    assert.equal(fit[3], 3);
    assert.equal(fit[6], 3);
    assert.equal(fit.length, 12);
    assert.deepEqual(Array.from(values), originalValues);

    const prediction = wasm.predict_flat_map_with_scaling(
      new Float64Array([4]),
      fit[1] ?? Number.NaN,
      fit[2] ?? Number.NaN,
      fit[3] ?? Number.NaN,
      fit[4] ?? Number.NaN,
      fit[5] ?? Number.NaN,
      empty,
      empty,
      empty,
    );

    assert.equal(prediction[0], wasm.FlatMapPredictionStatus.Success);
    assert.equal(prediction[1], (fit[2] ?? 0) + (fit[4] ?? 0));
    assert.equal(prediction[2], 0);
    assert.equal(prediction[3], prediction[1]);
  });

  it("returns explicit scaling failures without non-finite diagnostics", () => {
    const invalidMode = wasm.fit_flat_map_with_scaling(
      new Float64Array([0, 1]),
      new Float64Array([1, 2]),
      2,
      empty,
      empty,
      empty,
    );

    const overflowingRange = wasm.fit_flat_map_with_scaling(
      new Float64Array([0, 1]),
      new Float64Array([-Number.MAX_VALUE, Number.MAX_VALUE]),
      1,
      empty,
      empty,
      empty,
    );

    const invalidStoredScale = wasm.predict_flat_map_with_scaling(
      new Float64Array(),
      1,
      0,
      0,
      0,
      1,
      empty,
      empty,
      empty,
    );

    assert.deepEqual(Array.from(invalidMode), [wasm.FlatMapFitStatus.InvalidConfiguration]);
    assert.deepEqual(Array.from(overflowingRange), [wasm.FlatMapFitStatus.NonRepresentableScaling]);
    assert.deepEqual(Array.from(invalidStoredScale), [wasm.FlatMapPredictionStatus.InvalidModel]);
  });

  it("packs minmax metadata for featureless linear MAP", () => {
    const fit = wasm.fit_piecewise_map_with_scaling(
      new Float64Array([0, 1, 2, 3, 4, 5]),
      new Float64Array([20, 21.5, 23, 23.2, 24, 25]),
      1,
      0,
      new Float64Array([2]),
      0,
      0,
      empty,
      empty,
      empty,
      0.2,
      2_000,
      1e-10,
      1e-12,
    );

    assert.equal(fit[0], wasm.PiecewiseMapFitStatus.Success);
    assert.equal(fit[1], 1);
    assert.equal(fit[2], 20);
    assert.equal(fit[3], 5);
    assert.equal(fit[4], 1);
    assert.equal(fit[9], 5);
    assert.equal(fit.length, 18);
  });
});
