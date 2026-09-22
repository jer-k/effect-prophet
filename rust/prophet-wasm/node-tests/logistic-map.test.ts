import assert from "node:assert/strict";
import { test } from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const wasm = loadProphetWasmNodeBindings();

const fit = () =>
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
    10_000,
    1e-10,
    1e-12,
  );

test("generated bindings fit and predict logistic MAP rows", () => {
  const fitted = fit();

  assert.equal(fitted[0], 0);
  assert.equal(fitted.length, 16);

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
  );

  assert.equal(predicted[0], 0);
  assert.equal(predicted.length, 9);
  assert.ok((predicted[1] ?? 0) > 0 && (predicted[1] ?? 0) < 10);
  assert.ok((predicted[5] ?? 0) > (predicted[1] ?? 0));
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
    10,
    1e-7,
    1e-9,
  );

  assert.deepEqual(Array.from(fitted), [2]);
});
