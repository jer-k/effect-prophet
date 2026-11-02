import { describe, expect, it } from "vitest";

import {
  assertProphetWasmModule,
  loadProphetWasmModule,
  makeProphetWasmModuleLoader,
  type ProphetWasmHost,
  type ProphetWasmModule,
} from "../../src/internal/prophet-wasm-module";

const validModule: ProphetWasmModule = {
  fit_piecewise_map_with_features: () => new Float64Array([0]),
  fit_piecewise_map_with_features_and_scaling: () => new Float64Array([0]),
  predict_piecewise_map_with_features: () => new Float64Array([0]),
  predict_piecewise_map_with_features_and_scaling: () => new Float64Array([0]),
  predict_flat_map: () => new Float64Array([0, 2, 0, 2]),
  predict_flat_map_with_scaling: () => new Float64Array([0]),
  fit_piecewise_map: () => new Float64Array([0, 0, 1, 1, 0, 1, 2, 0.5, 4, 3, 1, 0, 0]),
  fit_piecewise_map_with_scaling: () => new Float64Array([0]),
  predict_piecewise_map: () => new Float64Array([0, 2, 0, 2]),
  predict_piecewise_map_with_scaling: () => new Float64Array([0]),
  fit_mixed_linear_map: () => new Float64Array([0]),
  fit_mixed_flat_map: () => new Float64Array([0]),
  predict_mixed_linear_map: () => new Float64Array([0]),
  predict_mixed_flat_map: () => new Float64Array([0]),
  fit_logistic_map_with_features: () => new Float64Array([0]),
  predict_logistic_map_with_features: () => new Float64Array([0]),
  simulate_map_with_features: () => new Float64Array([0]),
  simulate_logistic_map_with_features: () => new Float64Array([0]),
};

describe("Prophet WASM module boundary", () => {
  it("does not ship the removed OLS numerical exports", async () => {
    const module = await loadProphetWasmModule();

    expect(module).not.toHaveProperty("fit_linear_trend");
    expect(module).not.toHaveProperty("predict_linear_trend");
    expect(module).not.toHaveProperty("LinearTrendFitStatus");
  });

  it("accepts the complete callable export contract", () => {
    assertProphetWasmModule(validModule);

    expect(validModule).toBe(validModule);
  });

  it.each([
    ["a non-object module", null, "Prophet WASM module must be an object"],
    [
      "a missing fit export",
      { predict_piecewise_map_with_features: validModule.predict_piecewise_map_with_features },
      "Prophet WASM module export fit_piecewise_map_with_features must be a function",
    ],
    [
      "a non-callable fit export",
      { ...validModule, fit_piecewise_map_with_features: 1 },
      "Prophet WASM module export fit_piecewise_map_with_features must be a function",
    ],
    [
      "a missing prediction export",
      { ...validModule, predict_piecewise_map_with_features: undefined },
      "Prophet WASM module export predict_piecewise_map_with_features must be a function",
    ],
  ])("rejects %s", (_label, loaded, message) => {
    expect(() => assertProphetWasmModule(loaded)).toThrowError(message);
  });
});

/** A promise with its settle functions exposed. */
const pendingPromise = () => {
  let resolve = (): void => {};

  let reject = (_cause: Error): void => {};

  const promise = new Promise<void>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });

  return { promise, resolve, reject };
};

/** A host whose operations are counted, with a pending asynchronous initialization. */
const countingHost = (binary: Uint8Array | undefined) => {
  const calls = { read: 0, initializeSync: 0, initialize: 0 };
  let initialization = pendingPromise();

  const host: ProphetWasmHost = {
    readBinarySync: () => {
      calls.read += 1;

      return binary;
    },
    initializeSync: () => {
      calls.initializeSync += 1;
    },
    initialize: () => {
      calls.initialize += 1;

      return initialization.promise;
    },
  };

  const settle = {
    resolve: () => initialization.resolve(),
    reject: (cause: Error) => initialization.reject(cause),
    reset: () => {
      initialization = pendingPromise();
    },
  };

  return { host, calls, settle };
};

describe("Prophet WASM module loader", () => {
  it("initializes once, synchronously, when the host can read the binary", () => {
    const { host, calls } = countingHost(new Uint8Array([0]));
    const loader = makeProphetWasmModuleLoader(host, () => validModule);

    expect(loader.hasLoadStarted()).toBe(false);
    expect(loader.load()).toBe(validModule);
    expect(loader.load()).toBe(validModule);
    expect(loader.isInitialized()).toBe(true);
    expect(calls).toEqual({ read: 1, initializeSync: 1, initialize: 0 });
  });

  it("shares one asynchronous initialization between concurrent callers", async () => {
    const { host, calls, settle } = countingHost(undefined);
    const loader = makeProphetWasmModuleLoader(host, () => validModule);

    const first = loader.load();
    const second = loader.load();

    expect(first).toBe(second);
    expect(loader.hasLoadStarted()).toBe(true);
    expect(loader.isInitialized()).toBe(false);

    settle.resolve();

    await expect(first).resolves.toBe(validModule);
    expect(loader.isInitialized()).toBe(true);
    expect(loader.load()).toBe(validModule);
    expect(calls).toEqual({ read: 1, initializeSync: 0, initialize: 1 });
  });

  it("retries after a failed asynchronous initialization", async () => {
    const { host, calls, settle } = countingHost(undefined);
    const loader = makeProphetWasmModuleLoader(host, () => validModule);
    const cause = new Error("fetch failed");

    const failed = loader.load();

    settle.reject(cause);

    await expect(failed).rejects.toBe(cause);
    expect(loader.hasLoadStarted()).toBe(false);

    settle.reset();

    const retried = loader.load();

    settle.resolve();

    await expect(retried).resolves.toBe(validModule);
    expect(calls.initialize).toBe(2);
  });

  it("retries after the initialized module fails its contract check", () => {
    const { host } = countingHost(new Uint8Array([0]));
    let checks = 0;

    const loader = makeProphetWasmModuleLoader(host, () => {
      checks += 1;

      if (checks === 1) throw new TypeError("missing export");

      return validModule;
    });

    expect(() => loader.load()).toThrowError("missing export");
    expect(loader.hasLoadStarted()).toBe(false);
    expect(loader.load()).toBe(validModule);
  });
});
