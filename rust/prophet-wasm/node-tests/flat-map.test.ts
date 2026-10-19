import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const DAY = 86_400_000;

describe("flat MAP WASM boundary", () => {
  it("predicts a seasonal flat model in one coarse call", () => {
    const prediction = wasm.predict_flat_map(
      new Float64Array([0, DAY / 4]),
      1.5,
      0.2,
      new Float64Array([1]),
      new Float64Array([1]),
      new Float64Array([0.4, -1.1]),
    );

    assert.equal(prediction[0], wasm.FlatMapPredictionStatus.Success);
    assert.equal(prediction.length, 9);
    assert.equal(prediction[1], prediction[5]);
    assert.notEqual(prediction[2], prediction[6]);
    assert.ok(
      Math.abs((prediction[3] ?? 0) - ((prediction[1] ?? 0) + (prediction[2] ?? 0))) < 1e-12,
    );
  });

  it("returns owned output", () => {
    const empty = new Float64Array();
    const prediction = wasm.predict_flat_map(new Float64Array([0]), -4, 4e-9, empty, empty, empty);
    const copy = Array.from(prediction);

    wasm.predict_flat_map(new Float64Array([0, 1]), 2, 0.5, empty, empty, empty);

    assert.deepEqual(Array.from(prediction), copy);
    assert.deepEqual(copy, [wasm.FlatMapPredictionStatus.Success, -4, 0, -4]);
  });

  it("rejects malformed configuration and reports indexed prediction failures", () => {
    const malformed = wasm.predict_flat_map(
      new Float64Array([0]),
      1,
      0.1,
      new Float64Array([7]),
      new Float64Array(),
      new Float64Array(),
    );

    const prediction = wasm.predict_flat_map(
      new Float64Array([0, Number.NaN]),
      1,
      0.1,
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
    );

    assert.deepEqual(Array.from(malformed), [wasm.FlatMapPredictionStatus.LengthMismatch]);
    assert.deepEqual(Array.from(prediction), [wasm.FlatMapPredictionStatus.InvalidTimestamp, 1]);
  });
});
