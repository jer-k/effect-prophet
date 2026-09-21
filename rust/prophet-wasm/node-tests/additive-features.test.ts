import assert from "node:assert/strict";
import test from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const empty = new Float64Array();

const fitWithFeatures = (
  additionalValues: Float64Array,
  additionalComponentCounts = new Float64Array([1]),
) =>
  wasm.fit_piecewise_map_with_features(
    new Float64Array([0, 1, 2, 3]),
    new Float64Array([1, 5, 1, 1]),
    0,
    empty,
    0,
    0,
    empty,
    empty,
    empty,
    empty,
    1,
    additionalValues,
    new Float64Array([100]),
    new Float64Array([0]),
    additionalComponentCounts,
    0.5,
    2_000,
    1e-10,
    1e-12,
  );

test("fits and predicts grouped known additive columns through generated bindings", () => {
  const fit = fitWithFeatures(new Float64Array([0, 1, 0, 0]));

  assert.equal(fit[0], wasm.PiecewiseMapFitStatus.Success);
  assert.equal(fit.length, 14);

  const prediction = wasm.predict_piecewise_map_with_features(
    new Float64Array([4]),
    fit[2] ?? Number.NaN,
    fit[3] ?? Number.NaN,
    fit[4] ?? Number.NaN,
    fit[5] ?? Number.NaN,
    empty,
    empty,
    fit[7] ?? Number.NaN,
    empty,
    empty,
    empty,
    empty,
    1,
    new Float64Array([1]),
    new Float64Array([fit[13] ?? Number.NaN]),
    new Float64Array([0]),
    new Float64Array([1]),
  );

  assert.equal(prediction[0], wasm.PiecewiseMapPredictionStatus.Success);
  assert.equal(prediction.length, 5);
  assert.equal(prediction[2], prediction[4]);
});

test("rejects malformed feature metadata before numerical execution", () => {
  const packed = fitWithFeatures(new Float64Array([1]));

  assert.deepEqual(Array.from(packed), [wasm.PiecewiseMapFitStatus.InvalidConfiguration]);
});
