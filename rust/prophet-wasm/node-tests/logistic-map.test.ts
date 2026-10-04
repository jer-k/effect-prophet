import assert from "node:assert/strict";
import { test } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const fit = (optimizer = new Float64Array([2, 1, 10_000])) =>
  wasm.fit_logistic_map_with_features(
    new Float64Array([0, 1, 2, 3, 4, 5]),
    new Float64Array([1.2, 2.2, 4.2, 6.1, 7.6, 8.9]),
    new Float64Array([10, 10, 10, 10, 10, 10]),
    0,
    new Float64Array(),
    0,
    0,
    new Float64Array(),
    0,
    0,
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
    0.05,
    optimizer,
  );

test("generated bindings fit and predict logistic MAP rows", () => {
  const fitted = fit();

  assert.equal(fitted[0], 0);
  assert.equal(fitted.length, 20);
  assert.equal(fitted[16], 1);
  assert.equal(fitted[17], 1);

  const predicted = wasm.predict_logistic_map_with_features(
    new Float64Array([6, 6]),
    new Float64Array([10, 20]),
    new Float64Array(),
    fitted[1],
    fitted[2],
    fitted[3],
    fitted[4],
    fitted[5],
    fitted[6],
    fitted[7],
    fitted[8],
    new Float64Array(),
    new Float64Array(),
    fitted[9],
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
    0,
  );

  assert.equal(predicted[0], 0);
  assert.equal(predicted.length, 9);
  assert.ok((predicted[1] ?? 0) > 0 && (predicted[1] ?? 0) < 10);
  assert.ok((predicted[5] ?? 0) > (predicted[1] ?? 0));
});

test("generated bindings retain explicit proximal framing and honest Stan budget completion", () => {
  const proximal = fit(new Float64Array([1, 10_000, 1e-7, 1e-9]));
  assert.equal(proximal[0], 0);
  assert.equal(proximal.length, 20);
  assert.deepEqual(Array.from(proximal.slice(15, 20)), [0, 0, 0, -1, 0]);

  const limited = fit(new Float64Array([2, 1, 1]));
  assert.equal(limited[0], 0);
  assert.equal(limited[12], 1);
  assert.deepEqual(Array.from(limited.slice(15, 20)), [9, 1, 1, -1, 0]);
});

test("generated bindings reject malformed logistic controls instead of silently selecting a policy", () => {
  for (const controls of [
    [],
    [2, 1, 0],
    [2, 1, 1.5],
    [2, 1, 10, 0],
    [2, 3, 10],
    [1, 10, 0, 1e-9],
    [1, 10, 1e-7, Number.NaN],
  ]) {
    assert.deepEqual(Array.from(fit(new Float64Array(controls))), [4]);
  }
});

test("generated prediction bindings require a policy and retain singular row indexes", () => {
  const args = [
    new Float64Array([0, 0.5, 1]),
    new Float64Array([10, 10, 10]),
    new Float64Array(),
    0,
    10,
    0,
    0,
    2,
    0.4,
    0,
    1,
    new Float64Array([0.5]),
    new Float64Array([-2]),
    1,
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
  ] as const;

  assert.deepEqual(Array.from(wasm.predict_logistic_map_with_features(...args, 0)), [5, 1]);
  const historical = wasm.predict_logistic_map_with_features(...args, 1);
  assert.equal(historical[0], 0);
  assert.equal(historical.length, 13);
  assert.ok(Array.from(historical).every(Number.isFinite));

  for (const policy of [2, -1, 0.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.deepEqual(Array.from(wasm.predict_logistic_map_with_features(...args, policy)), [3]);
  }

  assert.deepEqual(Array.from(wasm.predict_logistic_map_with_features(...args)), [3]);
});

test("generated bindings reject malformed logistic floor framing", () => {
  const fitted = wasm.fit_logistic_map_with_features(
    new Float64Array([0, 1]),
    new Float64Array([1, 2]),
    new Float64Array([10, 10]),
    1,
    new Float64Array(),
    0,
    0,
    new Float64Array(),
    0,
    0,
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
    0.05,
    new Float64Array([2, 1, 10]),
  );

  assert.deepEqual(Array.from(fitted), [2]);
});
