import assert from "node:assert/strict";
import test from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const {
  LinearTrendFitStatus,
  fit_linear_trend: fitLinearTrend,
  predict_linear_trend: predictLinearTrend,
} = loadProphetWasmNodeBindings();

const numberAt = (values: Float64Array, index: number): number => {
  const value = values[index];

  if (value === undefined) {
    assert.fail(`expected a number at index ${index}`);
  }

  return value;
};

const unpackSuccessfulFit = (packed: Float64Array) => {
  assert.equal(packed.length, 5);
  assert.equal(numberAt(packed, 0), LinearTrendFitStatus.Success);

  return {
    intercept: numberAt(packed, 1),
    slope: numberAt(packed, 2),
    timeOrigin: numberAt(packed, 3),
    timeScale: numberAt(packed, 4),
  };
};

const unpackSuccessfulPredictions = (packed: Float64Array): Float64Array => {
  assert.equal(numberAt(packed, 0), LinearTrendFitStatus.Success);

  return packed.slice(1);
};

test("fits and evaluates an exact line through the WASM boundary", () => {
  const base = 1_704_067_200_000;
  const timestamps = new Float64Array([base, base + 1_000, base + 2_000]);
  const values = new Float64Array([2, 5, 8]);

  const parameters = unpackSuccessfulFit(fitLinearTrend(timestamps, values));

  assert.deepEqual(parameters, {
    intercept: 2,
    slope: 6,
    timeOrigin: base,
    timeScale: 2_000,
  });

  const predictions = predictLinearTrend(
    new Float64Array([base + 3_000, base + 4_000]),
    parameters.intercept,
    parameters.slope,
    parameters.timeOrigin,
    parameters.timeScale,
  );

  assert.deepEqual(unpackSuccessfulPredictions(predictions), new Float64Array([11, 14]));
  assert.deepEqual(timestamps, new Float64Array([base, base + 1_000, base + 2_000]));
  assert.deepEqual(values, new Float64Array([2, 5, 8]));
});

test("fits deterministic noisy observations", () => {
  const packed = fitLinearTrend(
    new Float64Array([0, 1, 2, 3]),
    new Float64Array([1.1, 2.9, 5.2, 6.8]),
  );

  const parameters = unpackSuccessfulFit(packed);

  assert.ok(Math.abs(parameters.intercept - 1.09) <= 1e-12);
  assert.ok(Math.abs(parameters.slope - 5.82) <= 1e-12);
});

test("returns a packed prediction failure instead of non-finite forecasts", () => {
  const packed = predictLinearTrend(new Float64Array([2]), 0, Number.MAX_VALUE, 0, 1);

  assert.deepEqual(packed, new Float64Array([LinearTrendFitStatus.NonFiniteResult, 0]));
});

test("returns packed structured failures instead of non-finite parameters", () => {
  const cases = [
    {
      timestamps: [],
      values: [],
      status: LinearTrendFitStatus.InsufficientObservations,
    },
    {
      timestamps: [1, 2],
      values: [1, 2, 3],
      status: LinearTrendFitStatus.LengthMismatch,
    },
    {
      timestamps: [1, Number.POSITIVE_INFINITY],
      values: [1, 2],
      status: LinearTrendFitStatus.NonFiniteTimestamp,
    },
    {
      timestamps: [1, 2],
      values: [1, Number.NaN],
      status: LinearTrendFitStatus.NonFiniteValue,
    },
    {
      timestamps: [1, 1],
      values: [1, 2],
      status: LinearTrendFitStatus.ZeroTimeVariance,
    },
    {
      timestamps: [-Number.MAX_VALUE, Number.MAX_VALUE],
      values: [1, 2],
      status: LinearTrendFitStatus.NonFiniteResult,
    },
  ];

  for (const { timestamps, values, status } of cases) {
    const packed = fitLinearTrend(new Float64Array(timestamps), new Float64Array(values));

    assert.deepEqual(packed, new Float64Array([status]));
  }
});
