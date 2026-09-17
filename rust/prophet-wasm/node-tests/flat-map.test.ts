import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const DAY = 86_400_000;

describe("flat MAP WASM boundary", () => {
  it("fits and predicts a featureful flat model in coarse calls", () => {
    const fit = wasm.fit_flat_map(
      new Float64Array([0, DAY / 4, DAY / 2, (3 * DAY) / 4, DAY, DAY * 1.25]),
      new Float64Array([1.1, 3, 0.9, -1.2, 1.2, 2.9]),
      new Float64Array([1]),
      new Float64Array([1]),
      new Float64Array([10]),
    );

    assert.equal(fit[0], wasm.FlatMapFitStatus.Success);
    assert.equal(fit.length, 11);

    const prediction = wasm.predict_flat_map(
      new Float64Array([0, DAY / 4]),
      fit[1] ?? Number.NaN,
      fit[2] ?? Number.NaN,
      new Float64Array([1]),
      new Float64Array([1]),
      fit.slice(9),
    );

    assert.equal(prediction[0], wasm.FlatMapPredictionStatus.Success);
    assert.equal(prediction.length, 9);
    assert.equal(prediction[1], prediction[5]);
    assert.ok(
      Math.abs((prediction[3] ?? 0) - ((prediction[1] ?? 0) + (prediction[2] ?? 0))) < 1e-12,
    );
  });

  it("uses the constant-target shortcut and returns owned output", () => {
    const fit = wasm.fit_flat_map(
      new Float64Array([0, 1]),
      new Float64Array([-4, -4]),
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
    );

    const copy = Array.from(fit);

    wasm.fit_flat_map(
      new Float64Array([0, 1, 2, 3]),
      new Float64Array([1, 2, 1.5, 2.5]),
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
    );

    assert.equal(fit[0], wasm.FlatMapFitStatus.Success);
    assert.equal(fit[1], -4);
    assert.equal(fit[8], 1);
    assert.deepEqual(Array.from(fit), copy);
  });

  it("rejects malformed configuration and reports indexed prediction failures", () => {
    const malformed = wasm.fit_flat_map(
      new Float64Array([0, 1]),
      new Float64Array([1, 2]),
      new Float64Array([7]),
      new Float64Array(),
      new Float64Array([10]),
    );

    const prediction = wasm.predict_flat_map(
      new Float64Array([0, Number.NaN]),
      1,
      0.1,
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
    );

    assert.deepEqual(Array.from(malformed), [wasm.FlatMapFitStatus.LengthMismatch]);
    assert.deepEqual(Array.from(prediction), [wasm.FlatMapPredictionStatus.InvalidTimestamp, 1]);
  });
});
