import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const timestamps = new Float64Array([0, 1, 2, 3, 4, 5]);

const values = new Float64Array([1, 1.9, 3.1, 3.2, 3.4, 3.5]);

const empty = new Float64Array();

const fit = (
  mode: number,
  explicit: Float64Array,
  automaticCount: number,
  automaticRange: number,
) =>
  wasm.fit_piecewise_map(
    timestamps,
    values,
    mode,
    explicit,
    automaticCount,
    automaticRange,
    empty,
    empty,
    empty,
    0.5,
    2_000,
    1e-10,
    1e-12,
  );

describe("linear piecewise MAP WASM boundary", () => {
  it("fits explicit state and predicts through coarse calls", () => {
    const result = fit(0, new Float64Array([2]), 0, 0);

    assert.equal(result[0], wasm.PiecewiseMapFitStatus.Success);
    assert.equal(result[1], 1);
    assert.equal(result.length, 15);

    const prediction = wasm.predict_piecewise_map(
      new Float64Array([2, 6]),
      result[2] ?? Number.NaN,
      result[3] ?? Number.NaN,
      result[4] ?? Number.NaN,
      result[5] ?? Number.NaN,
      result.slice(13, 14),
      result.slice(14, 15),
      result[7] ?? Number.NaN,
      empty,
      empty,
      empty,
    );

    assert.equal(prediction[0], wasm.PiecewiseMapPredictionStatus.Success);
    assert.equal(prediction.length, 7);
  });

  it("returns resolved automatic timestamps in fitted state", () => {
    const result = fit(1, empty, 2, 1);

    assert.equal(result[0], wasm.PiecewiseMapFitStatus.Success);
    assert.equal(result[1], 2);
    assert.deepEqual(Array.from(result.slice(13, 15)), [2, 5]);
  });

  it("rejects malformed controls and reports indexed prediction failures", () => {
    assert.deepEqual(Array.from(fit(1, empty, 1.5, 0.8)), [
      wasm.PiecewiseMapFitStatus.InvalidConfiguration,
    ]);
    assert.deepEqual(
      Array.from(
        wasm.predict_piecewise_map(
          new Float64Array([0, Number.NaN]),
          1,
          1,
          0,
          5,
          empty,
          empty,
          0.1,
          empty,
          empty,
          empty,
        ),
      ),
      [wasm.PiecewiseMapPredictionStatus.InvalidTimestamp, 1],
    );
  });
});
