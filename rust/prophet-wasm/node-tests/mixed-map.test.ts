import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

/** Newton through the shared Stan optimizer wire format, version two. */
const newton = new Float64Array([2, 1, 10_000]);

describe("mixed MAP WASM boundary", () => {
  it("fits and predicts dimensionless flat multiplicative effects", () => {
    const fit = wasm.fit_mixed_flat_map(
      new Float64Array([0, 1, 2, 3, 4, 5]),
      new Float64Array([11, 8, 10.5, 11, 9.5, 10]),
      0,
      0,
      new Float64Array(),
      0,
      0,
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
      1,
      new Float64Array([1, -1, 0.5, 1, -0.5, 0]),
      new Float64Array([10]),
      new Float64Array([0]),
      new Float64Array([1]),
      new Float64Array([1]),
      0.05,
      newton,
    );

    assert.equal(fit[0], wasm.PiecewiseMapFitStatus.Success);
    assert.equal(fit.length, 20);
    assert.equal(fit[18], 0, "explicit [] changepoints add no prior-only deltas");

    const prediction = wasm.predict_mixed_flat_map(
      new Float64Array([6]),
      fit[1],
      fit[2],
      fit[3],
      fit[4],
      fit[5],
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
      1,
      new Float64Array([2]),
      new Float64Array([fit[19] ?? Number.NaN]),
      new Float64Array([0]),
      new Float64Array([1]),
      new Float64Array([1]),
    );

    assert.equal(prediction[0], wasm.PiecewiseMapPredictionStatus.Success);
    assert.equal(prediction.length, 6);
    assert.equal(prediction[2], 0);
    assert.equal(prediction[3], prediction[5]);
    assert.ok(
      Math.abs(
        (prediction[4] ?? 0) -
          ((prediction[1] ?? 0) * (1 + (prediction[3] ?? 0)) + (prediction[2] ?? 0)),
      ) < 1e-10,
    );
  });

  it("rejects fractional, unknown, and non-finite modes", () => {
    for (const mode of [0.5, 2, Number.NaN, Number.POSITIVE_INFINITY]) {
      const fit = wasm.fit_mixed_flat_map(
        new Float64Array([0, 1]),
        new Float64Array([1, 2]),
        0,
        0,
        new Float64Array(),
        0,
        0,
        new Float64Array(),
        new Float64Array(),
        new Float64Array(),
        new Float64Array(),
        1,
        new Float64Array([1, 1]),
        new Float64Array([10]),
        new Float64Array([0]),
        new Float64Array([1]),
        new Float64Array([mode]),
        0.05,
        newton,
      );

      assert.deepEqual(Array.from(fit), [wasm.PiecewiseMapFitStatus.InvalidConfiguration]);
    }
  });

  it("returns owned fit frames", () => {
    const arguments_ = [
      new Float64Array([0, 1, 2, 3, 4, 5]),
      new Float64Array([11, 8, 10.5, 11, 9.5, 10]),
      0,
      0,
      new Float64Array(),
      0,
      0,
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
      1,
      new Float64Array([1, -1, 0.5, 1, -0.5, 0]),
      new Float64Array([10]),
      new Float64Array([0]),
      new Float64Array([1]),
      new Float64Array([1]),
      0.05,
      newton,
    ] as const;

    const first = wasm.fit_mixed_flat_map(...arguments_);
    const retained = Array.from(first);

    wasm.fit_mixed_flat_map(...arguments_);

    assert.deepEqual(Array.from(first), retained);
  });
});
