import { Predicate } from "effect";

import * as generatedModule from "../../wasm/prophet_wasm.js";

/** Rust/WASM bindings for masked seasonalities and known additive MAP columns. */
export interface AdditiveFeatureWasmBindings {
  readonly fit_piecewise_map_with_features: (
    timestamps: Float64Array,
    values: Float64Array,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalPriorScales: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalPriorScales: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
    changepointPriorScale: number,
    optimizer: Float64Array,
  ) => Float64Array;

  readonly fit_piecewise_map_with_features_and_scaling: (
    timestamps: Float64Array,
    values: Float64Array,
    scalingMode: number,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalPriorScales: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalPriorScales: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
    changepointPriorScale: number,
    optimizer: Float64Array,
  ) => Float64Array;

  readonly predict_piecewise_map_with_features: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalCoefficients: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalCoefficients: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
  ) => Float64Array;

  readonly predict_piecewise_map_with_features_and_scaling: (
    timestamps: Float64Array,
    scalingMode: number,
    targetOffset: number,
    targetScale: number,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalCoefficients: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalCoefficients: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
  ) => Float64Array;
}

/** Rust/WASM bindings for the packed flat MAP prediction protocol. */
export interface FlatMapWasmBindings {
  /** Evaluate one complete flat MAP prediction batch. */
  readonly predict_flat_map: (
    timestamps: Float64Array,
    level: number,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;

  /** Evaluate one complete scaled flat MAP prediction batch. */
  readonly predict_flat_map_with_scaling: (
    timestamps: Float64Array,
    scalingMode: number,
    targetOffset: number,
    targetScale: number,
    level: number,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;
}

/** Rust/WASM bindings for linear piecewise MAP fitting and prediction. */
export interface PiecewiseMapWasmBindings {
  /** Fit one complete explicit or automatic linear piecewise MAP model. */
  readonly fit_piecewise_map: (
    timestamps: Float64Array,
    values: Float64Array,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    priorScales: Float64Array,
    changepointPriorScale: number,
    optimizer: Float64Array,
  ) => Float64Array;

  /** Fit one scaled explicit or automatic linear piecewise MAP model. */
  readonly fit_piecewise_map_with_scaling: (
    timestamps: Float64Array,
    values: Float64Array,
    scalingMode: number,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    priorScales: Float64Array,
    changepointPriorScale: number,
    optimizer: Float64Array,
  ) => Float64Array;

  /** Evaluate one complete linear piecewise MAP prediction batch. */
  readonly predict_piecewise_map: (
    timestamps: Float64Array,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;

  /** Evaluate one complete scaled linear piecewise MAP prediction batch. */
  readonly predict_piecewise_map_with_scaling: (
    timestamps: Float64Array,
    scalingMode: number,
    targetOffset: number,
    targetScale: number,
    intercept: number,
    slope: number,
    timeOrigin: number,
    timeScale: number,
    changepointTimestamps: Float64Array,
    deltas: Float64Array,
    noiseScale: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    coefficients: Float64Array,
  ) => Float64Array;
}

/** Rust/WASM bindings for explicit mixed linear and flat MAP operations. */
export interface MixedMapWasmBindings {
  /** Fit one mixed linear MAP request and return a packed protocol frame. */
  readonly fit_mixed_linear_map: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Fit one mixed reduced-flat MAP request and return a packed protocol frame. */
  readonly fit_mixed_flat_map: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Predict one mixed linear MAP batch and return a packed protocol frame. */
  readonly predict_mixed_linear_map: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Predict one mixed reduced-flat MAP batch and return a packed protocol frame. */
  readonly predict_mixed_flat_map: (...args: ReadonlyArray<unknown>) => Float64Array;
}

/** Rust/WASM binding for coarse seeded MAP prediction. */
export interface MapUncertaintyWasmBindings {
  /** Simulate one complete linear/flat batch and return tagged samples or intervals. */
  readonly simulate_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Simulate one complete floor-aware logistic batch through the same protocol. */
  readonly simulate_logistic_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
}

/** Rust/WASM bindings for posterior sampling, simulation and component ranges. */
export interface McmcWasmBindings {
  /** Sample one mixed linear posterior and return a packed protocol frame. */
  readonly fit_mixed_linear_mcmc: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Sample one flat posterior and return a packed protocol frame. */
  readonly fit_mixed_flat_mcmc: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Sample one floor-aware logistic posterior and return a packed protocol frame. */
  readonly fit_logistic_mcmc_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Simulate one logistic posterior batch and return tagged samples or intervals. */
  readonly simulate_logistic_mcmc_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Simulate one linear/flat posterior batch and return tagged samples or intervals. */
  readonly simulate_mcmc_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;

  /** Each row's posterior ranges for the component totals and named components. */
  readonly posterior_component_ranges: (...args: ReadonlyArray<unknown>) => Float64Array;
}

/** Rust/WASM bindings for floor-aware logistic MAP operations. */
export interface LogisticMapWasmBindings {
  /** Fit one complete logistic MAP request. */
  readonly fit_logistic_map_with_features: (
    timestamps: Float64Array,
    values: Float64Array,
    capacities: Float64Array,
    floorPolicy: number,
    explicitFloors: Float64Array,
    scalingMode: number,
    changepointMode: number,
    explicitChangepoints: Float64Array,
    automaticCount: number,
    automaticRange: number,
    periodsDays: Float64Array,
    fourierOrders: Float64Array,
    seasonalPriorScales: Float64Array,
    seasonalityMasks: Float64Array,
    additionalColumnCount: number,
    additionalValues: Float64Array,
    additionalPriorScales: Float64Array,
    additionalComponentOffsets: Float64Array,
    additionalComponentCounts: Float64Array,
    columnModes: Float64Array,
    changepointPriorScale: number,
    optimizer: Float64Array,
  ) => Float64Array;

  /** Predict one complete logistic MAP batch. */
  readonly predict_logistic_map_with_features: (...args: ReadonlyArray<unknown>) => Float64Array;
}

/** Complete generated Rust/WASM module contract required by this package version. */
export type ProphetWasmModule = AdditiveFeatureWasmBindings &
  FlatMapWasmBindings &
  PiecewiseMapWasmBindings &
  MixedMapWasmBindings &
  LogisticMapWasmBindings &
  MapUncertaintyWasmBindings &
  McmcWasmBindings;

/**
 * Lazy loader for checked Rust/WASM bindings.
 *
 * A loader may return the bindings directly or settle them asynchronously, so hosts that must
 * fetch and compile the engine can share the same boundary as hosts that read it synchronously.
 */
export type WasmBindingsLoader<Bindings> = () => Bindings | PromiseLike<Bindings>;

/** Lazy loader that returns a checked Rust/WASM module. */
export type ProphetWasmModuleLoader = WasmBindingsLoader<ProphetWasmModule>;

/** Host operations that make the generated module usable. */
export interface ProphetWasmHost {
  /** Read the engine binary synchronously, or return `undefined` when this host cannot. */
  readonly readBinarySync: () => Uint8Array | undefined;

  /** Initialize the generated module synchronously from the engine binary. */
  readonly initializeSync: (binary: Uint8Array) => void;

  /** Fetch, compile and initialize the generated module asynchronously. */
  readonly initialize: () => PromiseLike<void>;
}

/** One lazily initialized module and the state tracing reads to mark the initializing call. */
export interface ProphetWasmModuleLoaderState {
  readonly load: ProphetWasmModuleLoader;
  readonly isInitialized: () => boolean;
  readonly hasLoadStarted: () => boolean;
}

// Bundlers rewrite this URL to the emitted binary, so the synchronous read also works in a bundle.
const wasmBinaryUrl = new URL("../../wasm/prophet_wasm_bg.wasm", import.meta.url);

/** Return Node's file system when the host exposes it without a static `node:` import. */
const nodeFileSystem = (): typeof import("node:fs") | undefined => {
  const host: { readonly process?: Partial<Pick<NodeJS.Process, "getBuiltinModule">> } = globalThis;

  return host.process?.getBuiltinModule?.("node:fs");
};

/**
 * Node reads the binary from disk. Other hosts let the generated glue fetch the binary that sits
 * beside it, which bundlers emit as an asset.
 */
const defaultHost: ProphetWasmHost = {
  readBinarySync: () =>
    wasmBinaryUrl.protocol === "file:" ? nodeFileSystem()?.readFileSync(wasmBinaryUrl) : undefined,
  initializeSync: (binary) => {
    generatedModule.initSync({ module: binary });
  },
  initialize: async () => {
    await generatedModule.default();
  },
};

const requiredFunctionExports = [
  "fit_piecewise_map_with_features",
  "fit_piecewise_map_with_features_and_scaling",
  "predict_piecewise_map_with_features",
  "predict_piecewise_map_with_features_and_scaling",
  "predict_flat_map",
  "predict_flat_map_with_scaling",
  "fit_piecewise_map",
  "fit_piecewise_map_with_scaling",
  "predict_piecewise_map",
  "predict_piecewise_map_with_scaling",
  "fit_mixed_linear_map",
  "fit_mixed_flat_map",
  "predict_mixed_linear_map",
  "predict_mixed_flat_map",
  "fit_logistic_map_with_features",
  "predict_logistic_map_with_features",
  "simulate_map_with_features",
  "simulate_logistic_map_with_features",
  "fit_mixed_linear_mcmc",
  "fit_mixed_flat_mcmc",
  "fit_logistic_mcmc_with_features",
  "simulate_mcmc_with_features",
  "simulate_logistic_mcmc_with_features",
  "posterior_component_ranges",
] as const;

/**
 * Refine an unchecked JavaScript module value into the required Prophet WASM contract.
 *
 * Future generated exports required by the TypeScript package must be added to
 * `ProphetWasmModule` and the required-export check in this function.
 *
 * @param input - Unchecked value obtained directly from a JavaScript module loader.
 * @throws TypeError when the value does not provide every required callable export.
 */
export function assertProphetWasmModule(input: unknown): asserts input is ProphetWasmModule {
  if (!Predicate.isObjectKeyword(input)) {
    throw new TypeError("Prophet WASM module must be an object");
  }

  for (const exportName of requiredFunctionExports) {
    if (!Predicate.hasProperty(input, exportName) || !Predicate.isFunction(input[exportName])) {
      throw new TypeError(`Prophet WASM module export ${exportName} must be a function`);
    }
  }
}

/** Check the generated module's exports once it has been initialized. */
const checkGeneratedModule = (): ProphetWasmModule => {
  const loaded: unknown = generatedModule;

  assertProphetWasmModule(loaded);

  return loaded;
};

/**
 * Build a lazy loader that initializes the generated module once.
 *
 * A host that can read the binary synchronously initializes it on the first call, so operations
 * that never wait on anything else still run under `Effect.runSync`. Other hosts share one
 * asynchronous initialization between concurrent callers, and a failed attempt can be retried.
 *
 * @param host - Operations that read or fetch the engine binary.
 * @param check - Contract check applied to the initialized module.
 */
export const makeProphetWasmModuleLoader = (
  host: ProphetWasmHost,
  check: () => ProphetWasmModule = checkGeneratedModule,
): ProphetWasmModuleLoaderState => {
  let checkedModule: ProphetWasmModule | undefined;
  let pending: Promise<ProphetWasmModule> | undefined;

  const load: ProphetWasmModuleLoader = () => {
    if (checkedModule !== undefined) {
      return checkedModule;
    }

    if (pending !== undefined) {
      return pending;
    }

    const binary = host.readBinarySync();

    if (binary !== undefined) {
      host.initializeSync(binary);
      checkedModule = check();

      return checkedModule;
    }

    pending = Promise.resolve(host.initialize())
      .then(() => {
        checkedModule = check();

        return checkedModule;
      })
      .finally(() => {
        pending = undefined;
      });

    return pending;
  };

  return {
    load,
    isInitialized: () => checkedModule !== undefined,
    hasLoadStarted: () => checkedModule !== undefined || pending !== undefined,
  };
};

const defaultLoader = makeProphetWasmModuleLoader(defaultHost);

/** The generated Prophet WASM module's load state in this process. */
export const prophetWasmModuleLoadState: ProphetWasmModuleLoaderState = defaultLoader;

/** Report whether this process has already loaded and checked the generated Prophet WASM module. */
export const isProphetWasmModuleInitialized = defaultLoader.isInitialized;

/**
 * Lazily initialize and check the generated Prophet WASM module.
 *
 * Node reads and compiles the engine synchronously on first use. Browsers and other hosts fetch
 * it once, asynchronously.
 *
 * @returns The checked bindings required by this package version, or a promise of them.
 * @throws Error when the engine binary cannot be read or instantiated, or
 * TypeError when the loaded module does not satisfy the required export contract.
 */
export const loadProphetWasmModule: ProphetWasmModuleLoader = defaultLoader.load;
