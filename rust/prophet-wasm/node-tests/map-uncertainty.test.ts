import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const request = () =>
  [
    new Float64Array([20, 5, 20]),
    0,
    0,
    10,
    2,
    2,
    4,
    0,
    10,
    new Float64Array([5]),
    new Float64Array([0.5]),
    0.2,
    new Float64Array(),
    new Float64Array(),
    new Float64Array(),
    new Float64Array(),
    1,
    new Float64Array([1, 0, 2]),
    new Float64Array([0.1]),
    new Float64Array([0]),
    new Float64Array([1]),
    new Float64Array([1]),
    42,
    16,
    0.8,
    1,
  ] as const;

const logisticRequest = () =>
  [
    new Float64Array([20, 20]),
    new Float64Array([10, 20]),
    new Float64Array(),
    0,
    10,
    0,
    0,
    1,
    0.5,
    0,
    10,
    new Float64Array([5]),
    new Float64Array([0.2]),
    0.2,
    new Float64Array(),
    new Float64Array(),
    new Float64Array(),
    new Float64Array(),
    0,
    new Float64Array(),
    new Float64Array(),
    new Float64Array(),
    new Float64Array(),
    new Float64Array(),
    42,
    16,
    0.8,
    1,
  ] as const;

describe("seeded MAP simulation generated WASM boundary", () => {
  it("returns exact shapes, shared paths and owned replay with mixed factors", () => {
    const args = request();
    const first = wasm.simulate_map_with_features(...args);
    const saved = Array.from(first);
    const repeat = wasm.simulate_map_with_features(...args);

    assert.deepEqual(Array.from(first), saved);
    assert.deepEqual(Array.from(repeat), saved);
    assert.deepEqual(Array.from(first.slice(0, 4)), [0, 1, 3, 16]);
    assert.equal(first.length, 4 + 2 * 3 * 16);
    assert.equal(first[4], first[4 + 2 * 16]);
    assert.notEqual(first[4 + 3 * 16], first[4 + 5 * 16]);
    assert.deepEqual(Array.from(args[0]), [20, 5, 20]);
    first[4] = Number.NaN;
    assert.deepEqual(Array.from(repeat), saved);
    assert.deepEqual(Array.from(wasm.simulate_map_with_features(...args)), saved);

    const bands = wasm.simulate_map_with_features(...args.slice(0, -1), 0);
    assert.deepEqual(Array.from(bands.slice(0, 4)), [0, 0, 3, 16]);
    assert.equal(bands.length, 4 + 3 * 4);
    assert.ok((bands[4] ?? NaN) <= (bands[5] ?? NaN));

    const narrowerSamples = wasm.simulate_map_with_features(...args.slice(0, -2), 0.5, 1);
    const narrowerBands = wasm.simulate_map_with_features(...args.slice(0, -2), 0.5, 0);
    assert.deepEqual(Array.from(narrowerSamples), saved);

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 4; column += 2) {
        const index = 4 + row * 4 + column;
        assert.ok((bands[index] ?? NaN) <= (narrowerBands[index] ?? NaN));
        assert.ok((narrowerBands[index + 1] ?? NaN) <= (bands[index + 1] ?? NaN));
      }
    }

    const one = wasm.simulate_map_with_features(...args.slice(0, -3), 1, 0.8, 1);
    const oneBand = wasm.simulate_map_with_features(...args.slice(0, -3), 1, 0.8, 0);
    assert.deepEqual(Array.from(one.slice(0, 4)), [0, 1, 3, 1]);
    assert.deepEqual(Array.from(oneBand.slice(0, 4)), [0, 0, 3, 1]);
    assert.deepEqual(Array.from(oneBand.slice(4, 8)), [one[4], one[4], one[7], one[7]]);
  });

  it("simulates logistic changing capacities and checks bounded failure frames", () => {
    const args = logisticRequest();
    const samples = wasm.simulate_logistic_map_with_features(...args);
    const repeat = wasm.simulate_logistic_map_with_features(...args);

    assert.deepEqual(Array.from(samples), Array.from(repeat));
    assert.deepEqual(Array.from(samples.slice(0, 4)), [0, 1, 2, 16]);

    for (let sample = 0; sample < 16; sample++) {
      assert.ok(Math.abs((samples[4 + sample] ?? NaN) * 2 - (samples[20 + sample] ?? NaN)) < 1e-10);
    }

    const invalid = (index: number, value: number | Float64Array) => {
      const modified: Array<number | Float64Array> = [...args];
      modified[index] = value;

      return Array.from(wasm.simulate_logistic_map_with_features(...modified));
    };

    assert.deepEqual(invalid(0, new Float64Array([Number.NaN, 20])), [1]);
    assert.deepEqual(invalid(1, new Float64Array([0, 20])), [1]);
    assert.deepEqual(invalid(5, 1), [2]);
    assert.deepEqual(invalid(24, 2 ** 32), [1]);
    assert.deepEqual(invalid(25, 2_049), [3]);
  });

  it("rejects invalid seeds, sample counts, flags, masks and sizes before drawing", () => {
    const args = request();

    const withChange = (index: number, value: number | Float64Array) => {
      const modified: Array<number | Float64Array> = [...args];
      modified[index] = value;

      return wasm.simulate_map_with_features(...modified);
    };

    for (const seed of [-1, 2 ** 32, 0.5, Number.NaN]) {
      assert.deepEqual(Array.from(withChange(22, seed)), [1]);
    }

    assert.deepEqual(Array.from(withChange(22, 0).slice(0, 4)), [0, 1, 3, 16]);
    assert.deepEqual(Array.from(withChange(22, 2 ** 32 - 1).slice(0, 4)), [0, 1, 3, 16]);
    assert.deepEqual(Array.from(withChange(23, 0)), [1]);
    assert.deepEqual(Array.from(withChange(23, -1)), [1]);
    assert.deepEqual(Array.from(withChange(23, 1.5)), [1]);
    assert.deepEqual(Array.from(withChange(23, 2_049)), [3]);
    assert.deepEqual(Array.from(withChange(24, 0)), [1]);
    assert.deepEqual(Array.from(withChange(24, 1)), [1]);
    assert.deepEqual(Array.from(withChange(25, 2)), [1]);
    assert.deepEqual(Array.from(withChange(0, new Float64Array([Number.NaN, 5, 20]))), [1]);
    assert.deepEqual(Array.from(withChange(21, new Float64Array([0.5]))), [1]);
    assert.deepEqual(Array.from(withChange(17, new Float64Array([1, 0]))), [1]);
    assert.deepEqual(Array.from(withChange(19, new Float64Array([2]))), [1]);
    assert.deepEqual(Array.from(withChange(16, Number.NaN)), [1]);
    assert.deepEqual(Array.from(withChange(11, Number.NaN)), [2]);
    assert.deepEqual(Array.from(withChange(4, Number.POSITIVE_INFINITY)), [2]);
    assert.deepEqual(Array.from(withChange(5, Number.MAX_VALUE)), [4, 0, 0]);

    const empty: Array<number | Float64Array> = [...args];
    empty[0] = new Float64Array();
    empty[17] = new Float64Array();
    assert.deepEqual(Array.from(wasm.simulate_map_with_features(...empty)), [0, 1, 0, 16]);
  });
});
