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
    assert.deepEqual(invalid(5, 1), [1]);
    assert.deepEqual(invalid(24, 2 ** 32), [1]);
    assert.deepEqual(invalid(25, 2_049), [3]);

    const explicit: Array<number | Float64Array> = [...args];
    explicit[2] = new Float64Array([2, 3]);
    explicit[5] = 1;
    const bounded = wasm.simulate_logistic_map_with_features(...explicit);
    const bands = wasm.simulate_logistic_map_with_features(...explicit.slice(0, -1), 0);

    assert.deepEqual(Array.from(bounded.slice(0, 4)), [0, 1, 2, 16]);
    assert.deepEqual(Array.from(bands.slice(0, 4)), [0, 0, 2, 16]);
    assert.equal(bounded.length, 4 + 2 * 2 * 16);
    assert.equal(bands.length, 4 + 2 * 4);

    for (let sample = 0; sample < 16; sample++) {
      const first = ((bounded[4 + sample] ?? NaN) - 2) / 8;
      const second = ((bounded[20 + sample] ?? NaN) - 3) / 17;
      assert.ok(Math.abs(first - second) < 1e-14);
    }

    for (let row = 0; row < 2; row++) {
      const floor = row === 0 ? 2 : 3;
      const capacity = row === 0 ? 10 : 20;

      for (let sample = 0; sample < 16; sample++) {
        const trend = bounded[4 + row * 16 + sample] ?? NaN;

        assert.ok(trend >= floor && trend <= capacity);
      }

      assert.ok((bands[4 + row * 4] ?? NaN) >= floor);
      assert.ok((bands[5 + row * 4] ?? NaN) <= capacity);
    }

    const halfWidth = wasm.simulate_logistic_map_with_features(...explicit.slice(0, -2), 0.5, 1);
    assert.deepEqual(Array.from(halfWidth), Array.from(bounded));
    assert.deepEqual(
      Array.from(
        wasm.simulate_logistic_map_with_features(...explicit.slice(0, -2), 0.5, 0).slice(0, 4),
      ),
      [0, 0, 2, 16],
    );

    const withExplicitChange = (index: number, value: number | Float64Array) => {
      const modified = [...explicit];
      modified[index] = value;

      return Array.from(wasm.simulate_logistic_map_with_features(...modified));
    };

    assert.deepEqual(withExplicitChange(2, new Float64Array([2])), [1]);
    assert.deepEqual(withExplicitChange(2, new Float64Array([2, 20])), [1]);
    assert.deepEqual(withExplicitChange(6, 1), [2]);
    assert.deepEqual(invalid(2, new Float64Array([2, 3])), [1]);
    assert.deepEqual(invalid(1, new Float64Array([10])), [1]);
    assert.deepEqual(invalid(26, 0), [1]);
    assert.deepEqual(invalid(27, 2), [1]);
  });

  it("reduces the same seeded saturated logistic samples to ordered finite intervals", () => {
    const args: Array<number | Float64Array> = [...logisticRequest()];
    args[0] = Float64Array.from({ length: 64 }, (_, index) => 20 + index);
    args[1] = Float64Array.from({ length: 64 }, (_, index) => 90 + index * 0.12);
    args[8] = 15;
    args[24] = 19;
    args[25] = 128;

    const samples = wasm.simulate_logistic_map_with_features(...args);
    const bands = wasm.simulate_logistic_map_with_features(...args.slice(0, -1), 0);

    assert.deepEqual(Array.from(samples.slice(0, 4)), [0, 1, 64, 128]);
    assert.deepEqual(Array.from(bands.slice(0, 4)), [0, 0, 64, 128]);

    const quantile = (sorted: ReadonlyArray<number>, probability: number): number => {
      const position = (sorted.length - 1) * probability;
      const lower = Math.floor(position);
      const upper = Math.ceil(position);
      const first = sorted[lower] ?? NaN;
      const last = sorted[upper] ?? NaN;

      return first + (last - first) * (position - lower);
    };

    for (let row = 0; row < 64; row++) {
      for (let column = 0; column < 2; column++) {
        const sorted = Array.from(
          samples.slice(4 + (column * 64 + row) * 128, 4 + (column * 64 + row + 1) * 128),
        ).sort((left, right) => left - right);

        const lower = bands[4 + row * 4 + column * 2] ?? NaN;
        const upper = bands[5 + row * 4 + column * 2] ?? NaN;

        assert.ok(Number.isFinite(lower) && Number.isFinite(upper) && lower <= upper);
        assert.ok(Math.abs(lower - quantile(sorted, 0.1)) < 1e-12);
        assert.ok(Math.abs(upper - quantile(sorted, 0.9)) < 1e-12);
      }
    }
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
