import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const empty = new Float64Array();

describe("generated target-scaling bindings", () => {
  it("predicts minmax flat MAP state with one trend offset", () => {
    const prediction = wasm.predict_flat_map_with_scaling(
      new Float64Array([4]),
      1,
      10,
      3,
      0.5,
      0.1,
      empty,
      empty,
      empty,
    );

    assert.equal(prediction[0], wasm.FlatMapPredictionStatus.Success);
    assert.equal(prediction[1], 10.5);
    assert.equal(prediction[2], 0);
    assert.equal(prediction[3], prediction[1]);
  });

  it("rejects invalid stored scaling without non-finite diagnostics", () => {
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
      new Float64Array([2, 1, 2_000]),
    );

    assert.equal(fit[0], wasm.PiecewiseMapFitStatus.Success);
    assert.equal(fit[1], 1);
    assert.equal(fit[2], 20);
    assert.equal(fit[3], 5);
    assert.equal(fit[4], 1);
    assert.equal(fit[9], 5);
    assert.equal(fit.length, 24);
  });
});
