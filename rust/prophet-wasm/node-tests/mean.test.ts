import assert from "node:assert/strict";
import test from "node:test";

import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const { mean } = loadProphetWasmNodeBindings();

test("calls the Rust mean export through generated WASM bindings", () => {
  const values = new Float64Array([1, 2, 6, 7]);

  assert.equal(mean(values), 4);
  assert.deepEqual(values, new Float64Array([1, 2, 6, 7]));
});

test("preserves the Rust empty-slice result across the WASM boundary", () => {
  assert.equal(Number.isNaN(mean(new Float64Array())), true);
});
