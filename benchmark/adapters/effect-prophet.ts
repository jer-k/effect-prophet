import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { cpus, platform, release, totalmem } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect, Schema } from "effect";
import {
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  prophetFittingBackendLayer,
  type EncodedProphetOptions,
  type FittedProphet,
  type Forecasts,
} from "effect-prophet";

import {
  parseBenchmarkCases,
  parseBenchmarkDataset,
  type BenchmarkCase,
  type BenchmarkDataset,
  type BenchmarkPhase,
} from "../case.ts";
import {
  BenchmarkMeasurementSchema,
  CorrectnessProjectionSchema,
  type BenchmarkEnvironment,
  type BenchmarkFailure,
  type BenchmarkMeasurement,
  type CorrectnessProjection,
  type ForecastProjection,
  type ImplementationResult,
} from "../result.ts";

const protocolPrefix = "EFFECT_PROPHET_BENCHMARK_RESULT=";

const adapterPath = fileURLToPath(import.meta.url);

const defaultCasesPath = fileURLToPath(new URL("../cases/public-api.json", import.meta.url));

const defaultDataRoot = fileURLToPath(new URL("../data/", import.meta.url));

const defaultOutputPath = fileURLToPath(
  new URL("../results/runs/effect-prophet.json", import.meta.url),
);

const WorkerOutputSchema = Schema.Struct({
  measurements: Schema.Array(BenchmarkMeasurementSchema),
  correctness: CorrectnessProjectionSchema,
});

type WorkerOutput = typeof WorkerOutputSchema.Type;

interface PreparedInput {
  readonly observations: ReadonlyArray<{ readonly timestamp: string; readonly value: number }>;
  readonly predictionTimestamps: ReadonlyArray<string>;
}

let measurementSink: unknown;

const loadCases = async (): Promise<ReadonlyArray<BenchmarkCase>> => {
  const path = process.env.BENCHMARK_CASES_PATH ?? defaultCasesPath;
  const input: Parameters<typeof parseBenchmarkCases>[0] = JSON.parse(await readFile(path, "utf8"));

  return Effect.runPromise(parseBenchmarkCases(input));
};

const loadDataset = async (benchmarkCase: BenchmarkCase): Promise<BenchmarkDataset> => {
  const root = process.env.BENCHMARK_DATA_ROOT ?? defaultDataRoot;
  const path = resolve(root, benchmarkCase.dataset);

  const input: Parameters<typeof parseBenchmarkDataset>[0] = JSON.parse(
    await readFile(path, "utf8"),
  );

  return Effect.runPromise(parseBenchmarkDataset(input));
};

const selectCases = (cases: ReadonlyArray<BenchmarkCase>): ReadonlyArray<BenchmarkCase> => {
  const selection = process.env.BENCHMARK_CASE_IDS;

  if (selection === undefined || selection.trim() === "") {
    return cases;
  }

  const ids = new Set(selection.split(",").map((value) => value.trim()));

  return cases.filter((benchmarkCase) => ids.has(benchmarkCase.id));
};

const prepareInput = (dataset: BenchmarkDataset): PreparedInput => ({
  observations: dataset.observations.map((observation) => ({
    timestamp: observation.timestamp,
    value: observation.value,
  })),
  predictionTimestamps: Array.from(dataset.predictionTimestamps),
});

const optionsForCase = (benchmarkCase: BenchmarkCase): EncodedProphetOptions | undefined => {
  if (benchmarkCase.workload.kind !== "explicit-linear-map") {
    return undefined;
  }

  const configuration = benchmarkCase.workload.configuration;
  const firstSeasonality = configuration.seasonalities[0];

  const common = {
    growth: "linear" as const,
    builtInSeasonalities: { daily: "off" as const, weekly: "off" as const, yearly: "off" as const },
    map: {
      changepoints: {
        mode: "explicit" as const,
        timestamps: configuration.changepointTimestamps,
      },
      changepointPriorScale: configuration.changepointPriorScale,
      optimizer: benchmarkCase.workload.effectOptimizer,
    },
  };

  if (firstSeasonality === undefined) {
    return { ...common, seasonalities: [] };
  }

  return {
    ...common,
    seasonalities: [firstSeasonality, ...configuration.seasonalities.slice(1)],
  };
};

const runFit = (input: PreparedInput, benchmarkCase: BenchmarkCase): FittedProphet =>
  Effect.runSync(
    fit(input.observations, optionsForCase(benchmarkCase)).pipe(
      Effect.provide(prophetFittingBackendLayer),
    ),
  );

const fixedPredictionModel = (benchmarkCase: BenchmarkCase): FittedProphet => {
  if (benchmarkCase.workload.kind !== "fixed-linear-prediction") {
    throw new Error(`Benchmark case ${benchmarkCase.id} is not a fixed prediction workload`);
  }

  const parameters = benchmarkCase.workload.parameters;

  return Effect.runSync(
    decodeFittedModel({
      modelKind: "linear-trend",
      coefficients: { intercept: parameters.intercept, slope: parameters.slope },
      timeScaling: { origin: parameters.timeOrigin, scale: parameters.timeScale },
    }),
  );
};

const setupModel = (input: PreparedInput, benchmarkCase: BenchmarkCase): FittedProphet =>
  benchmarkCase.workload.kind === "fixed-linear-prediction"
    ? fixedPredictionModel(benchmarkCase)
    : runFit(input, benchmarkCase);

const runPredict = (model: FittedProphet, input: PreparedInput): Forecasts =>
  Effect.runSync(predict(model, input.predictionTimestamps));

const forecastProjection = (forecasts: Forecasts): ReadonlyArray<ForecastProjection> =>
  forecasts.map((forecast) => ({
    timestamp: forecast.timestamp,
    value: forecast.value,
    trend: forecast.trend,
    additive: forecast.additive,
    seasonalities: forecast.seasonalities.map((component) => ({ ...component })),
  }));

const assertFiniteForecasts = (
  forecasts: Forecasts,
  benchmarkCase: BenchmarkCase,
  expectedCount: number,
): void => {
  if (forecasts.length !== expectedCount) {
    throw new Error(
      `Case ${benchmarkCase.id} returned ${forecasts.length} forecasts instead of ${expectedCount}`,
    );
  }

  for (const forecast of forecasts) {
    const reconstructed = forecast.trend + forecast.additive;

    const tolerance =
      benchmarkCase.correctnessTolerance.absolute +
      benchmarkCase.correctnessTolerance.relative * Math.abs(forecast.value);

    if (
      !Number.isFinite(forecast.value) ||
      !Number.isFinite(forecast.trend) ||
      !Number.isFinite(forecast.additive) ||
      Math.abs(forecast.value - reconstructed) > tolerance
    ) {
      throw new Error(`Case ${benchmarkCase.id} returned an invalid forecast decomposition`);
    }
  }
};

const assertFixedEquation = (forecasts: Forecasts, benchmarkCase: BenchmarkCase): void => {
  if (benchmarkCase.workload.kind !== "fixed-linear-prediction") {
    return;
  }

  const parameters = benchmarkCase.workload.parameters;

  for (const forecast of forecasts) {
    const expected =
      parameters.intercept +
      parameters.slope * ((forecast.timestamp - parameters.timeOrigin) / parameters.timeScale);

    const tolerance =
      benchmarkCase.correctnessTolerance.absolute +
      benchmarkCase.correctnessTolerance.relative * Math.abs(expected);

    if (Math.abs(forecast.value - expected) > tolerance) {
      throw new Error(`Case ${benchmarkCase.id} failed its fixed-equation correctness check`);
    }
  }
};

const persistenceMaximumError = (
  model: FittedProphet,
  input: PreparedInput,
  forecasts: Forecasts,
): number => {
  const encoded = Effect.runSync(encodeFittedModel(model));
  const serialized = JSON.stringify(encoded);
  const decodedInput: unknown = JSON.parse(serialized);
  const restored = Effect.runSync(decodeFittedModel(decodedInput));
  const restoredForecasts = runPredict(restored, input);
  let maximum = 0;

  for (const [index, forecast] of forecasts.entries()) {
    const restoredForecast = restoredForecasts[index];

    if (restoredForecast === undefined) {
      throw new Error("Persistence round trip omitted a forecast");
    }

    maximum = Math.max(maximum, Math.abs(forecast.value - restoredForecast.value));
  }

  return maximum;
};

const correctnessProjection = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  run: number,
): CorrectnessProjection => {
  const input = prepareInput(dataset);
  const model = setupModel(input, benchmarkCase);
  const forecasts = runPredict(model, input);

  assertFiniteForecasts(forecasts, benchmarkCase, input.predictionTimestamps.length);
  assertFixedEquation(forecasts, benchmarkCase);

  const persistenceError = persistenceMaximumError(model, input, forecasts);

  const common = {
    caseId: benchmarkCase.id,
    run,
    status: "locally-passed" as const,
    modelKind: model.model,
    forecasts: forecastProjection(forecasts),
    persistenceMaximumAbsoluteError: persistenceError,
  };

  if (model.model === "linear-piecewise-map" || model.model === "flat-map") {
    return {
      ...common,
      noiseScale: model.noiseScale,
      fitQuality: [
        { name: "objective", value: model.fitSummary.objective },
        { name: "stationarity-residual", value: model.fitSummary.stationarityResidual },
        { name: "iterations", value: model.fitSummary.iterations },
      ],
    };
  }

  return common;
};

const measure = <Value>(
  benchmarkCase: BenchmarkCase,
  operation: () => Value,
): ReadonlyArray<number> => {
  for (let index = 0; index < benchmarkCase.warmupIterations; index += 1) {
    measurementSink = operation();
  }

  const samples: Array<number> = [];

  for (let index = 0; index < benchmarkCase.measuredIterations; index += 1) {
    const started = process.hrtime.bigint();
    const value = operation();
    const ended = process.hrtime.bigint();

    measurementSink = value;
    samples.push(Number(ended - started));
  }

  return samples;
};

const coldSamples = (benchmarkCase: BenchmarkCase): ReadonlyArray<number> => {
  const samples: Array<number> = [];

  for (let index = 0; index < benchmarkCase.measuredIterations; index += 1) {
    const started = process.hrtime.bigint();

    const child = spawnSync(process.execPath, [adapterPath, "--cold", benchmarkCase.id], {
      encoding: "utf8",
      env: process.env,
      timeout: benchmarkCase.timeoutSeconds * 1_000,
    });

    const ended = process.hrtime.bigint();

    if (child.status !== 0 || !child.stdout.includes(protocolPrefix)) {
      throw new Error(child.stderr || child.stdout || "Cold Effect Prophet worker failed");
    }

    samples.push(Number(ended - started));
  }

  return samples;
};

const measurementForPhase = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  run: number,
  phase: BenchmarkPhase,
): BenchmarkMeasurement => {
  const prepared = prepareInput(dataset);
  const model = setupModel(prepared, benchmarkCase);
  const forecasts = runPredict(model, prepared);
  const encodedJson = JSON.stringify(Effect.runSync(encodeFittedModel(model)));
  let samples: ReadonlyArray<number>;

  switch (phase) {
    case "input-preparation":
      samples = measure(benchmarkCase, () => prepareInput(dataset));
      break;

    case "warm-fit":
      samples = measure(benchmarkCase, () => runFit(prepared, benchmarkCase));
      break;

    case "warm-predict":
      samples = measure(benchmarkCase, () => runPredict(model, prepared));
      break;

    case "warm-fit-predict":
      samples = measure(benchmarkCase, () => {
        const fitted = runFit(prepared, benchmarkCase);

        return runPredict(fitted, prepared);
      });
      break;

    case "warm-fit-predict-with-conversion":
      samples = measure(benchmarkCase, () => {
        const converted = prepareInput(dataset);
        const fitted = runFit(converted, benchmarkCase);

        return runPredict(fitted, converted);
      });
      break;

    case "cold-first-forecast":
      samples = coldSamples(benchmarkCase);
      break;

    case "model-json-encode":
      samples = measure(benchmarkCase, () =>
        JSON.stringify(Effect.runSync(encodeFittedModel(model))),
      );
      break;

    case "model-json-decode":
      samples = measure(benchmarkCase, () => {
        const decodedInput: unknown = JSON.parse(encodedJson);

        return Effect.runSync(decodeFittedModel(decodedInput));
      });
      break;
  }

  measurementSink = forecasts;

  const common = {
    caseId: benchmarkCase.id,
    implementation: "effect-prophet" as const,
    phase,
    comparison: benchmarkCase.workload.comparison.kind,
    run,
    samplesNanoseconds: samples,
    correctness: "locally-passed" as const,
  };

  return benchmarkCase.workload.comparison.kind === "different-objective"
    ? common
    : { ...common, evidenceId: benchmarkCase.workload.comparison.evidenceId };
};

const runWorker = async (caseId: string, run: number): Promise<WorkerOutput> => {
  const cases = await loadCases();
  const benchmarkCase = cases.find((candidate) => candidate.id === caseId);

  if (benchmarkCase === undefined) {
    throw new Error(`Unknown benchmark case: ${caseId}`);
  }

  const dataset = await loadDataset(benchmarkCase);
  const correctness = correctnessProjection(benchmarkCase, dataset, run);

  const measurements = benchmarkCase.phases.map((phase) =>
    measurementForPhase(benchmarkCase, dataset, run, phase),
  );

  return { measurements, correctness };
};

const runColdWorker = async (caseId: string): Promise<void> => {
  const cases = await loadCases();
  const benchmarkCase = cases.find((candidate) => candidate.id === caseId);

  if (benchmarkCase === undefined) {
    throw new Error(`Unknown benchmark case: ${caseId}`);
  }

  const dataset = await loadDataset(benchmarkCase);
  const input = prepareInput(dataset);
  const model = runFit(input, benchmarkCase);
  const forecasts = runPredict(model, input);

  if (forecasts.length !== input.predictionTimestamps.length) {
    throw new Error("Cold forecast did not materialize every requested row");
  }

  process.stdout.write(`${protocolPrefix}{"status":"passed"}\n`);
};

const commandVersion = (command: string, args: ReadonlyArray<string>): string => {
  const result = spawnSync(command, args, { encoding: "utf8" });

  return result.status === 0 ? result.stdout.trim() || result.stderr.trim() : "unavailable";
};

const sha256File = async (path: string): Promise<string> => {
  const contents = await readFile(path);

  return createHash("sha256").update(contents).digest("hex");
};

const readResource = async (path: string): Promise<string> => {
  try {
    return (await readFile(path, "utf8")).trim();
  } catch {
    return "unavailable";
  }
};

const collectEnvironment = async (): Promise<BenchmarkEnvironment> => {
  const wasmPath = resolve(process.cwd(), "wasm/prophet_wasm_bg.wasm");
  const lockPath = resolve(process.cwd(), "package-lock.json");
  const cpu = cpus()[0]?.model ?? "unavailable";

  return {
    runtime: "node",
    runtimeVersion: process.version,
    operatingSystem: `${platform()} ${release()}`,
    architecture: process.arch,
    processor: cpu,
    containerPlatform: process.env.BENCHMARK_CONTAINER_PLATFORM ?? "unavailable",
    versions: [
      { name: "effect-prophet", value: "0.0.0" },
      {
        name: "effect",
        value: commandVersion("node", [
          "-p",
          "require('./node_modules/effect/package.json').version",
        ]),
      },
      { name: "rustc", value: commandVersion("rustc", ["--version"]) },
      { name: "wasm-pack", value: commandVersion("wasm-pack", ["--version"]) },
      { name: "wasm-build-profile", value: "release" },
    ],
    artifactHashes: [
      { name: "wasm/prophet_wasm_bg.wasm", value: await sha256File(wasmPath) },
      { name: "package-lock.json", value: await sha256File(lockPath) },
    ],
    numericalThreads: ["OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS"].map(
      (name) => ({ name, value: process.env[name] ?? "unset" }),
    ),
    resources: [
      { name: "logical-cpu-count", value: String(cpus().length) },
      { name: "runtime-total-memory-bytes", value: String(totalmem()) },
      { name: "cgroup-memory-max", value: await readResource("/sys/fs/cgroup/memory.max") },
      { name: "collection-method", value: "node:os and cgroup-v2" },
    ],
    memoryMeasurement: "unsupported; timings do not report a process-tree peak RSS",
  };
};

const parseWorkerOutput = (stdout: string): WorkerOutput => {
  let line: string | undefined;

  for (const candidate of stdout.split("\n")) {
    if (candidate.startsWith(protocolPrefix)) {
      line = candidate;
    }
  }

  if (line === undefined) {
    throw new Error("Effect Prophet worker did not emit its result protocol");
  }

  return Schema.decodeUnknownSync(WorkerOutputSchema)(
    JSON.parse(line.slice(protocolPrefix.length)),
  );
};

const runCoordinator = async (): Promise<void> => {
  const cases = selectCases(await loadCases());
  const measurements: Array<BenchmarkMeasurement> = [];
  const correctness: Array<CorrectnessProjection> = [];
  const failures: Array<BenchmarkFailure> = [];

  for (const benchmarkCase of cases) {
    for (let run = 0; run < benchmarkCase.independentRuns; run += 1) {
      const worker = spawnSync(
        process.execPath,
        [adapterPath, "--worker", benchmarkCase.id, String(run)],
        {
          encoding: "utf8",
          env: process.env,
          timeout: benchmarkCase.timeoutSeconds * 1_000,
        },
      );

      if (worker.error?.name === "ETIMEDOUT") {
        failures.push({
          caseId: benchmarkCase.id,
          implementation: "effect-prophet",
          run,
          stage: "timeout",
          message: `Worker exceeded ${benchmarkCase.timeoutSeconds} seconds`,
        });
        continue;
      }

      if (worker.status !== 0) {
        failures.push({
          caseId: benchmarkCase.id,
          implementation: "effect-prophet",
          run,
          stage: "runtime",
          message: (worker.stderr || worker.stdout || "Worker failed").trim().slice(0, 4_000),
        });
        continue;
      }

      try {
        const output = parseWorkerOutput(worker.stdout);

        measurements.push(...output.measurements);
        correctness.push(output.correctness);
      } catch (error) {
        failures.push({
          caseId: benchmarkCase.id,
          implementation: "effect-prophet",
          run,
          stage: "runtime",
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }

  const result: ImplementationResult = {
    schemaVersion: 1,
    implementation: "effect-prophet",
    generatedAt: new Date().toISOString(),
    environment: await collectEnvironment(),
    measurements,
    failures,
    correctness,
  };

  const outputPath = process.env.BENCHMARK_OUTPUT_PATH ?? defaultOutputPath;

  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
};

const mode = process.argv[2];

try {
  if (mode === "--worker") {
    const caseId = process.argv[3];
    const run = Number(process.argv[4]);

    if (caseId === undefined || !Number.isSafeInteger(run) || run < 0) {
      throw new Error("Worker requires a case id and nonnegative run index");
    }

    const output = await runWorker(caseId, run);

    process.stdout.write(`${protocolPrefix}${JSON.stringify(output)}\n`);
  } else if (mode === "--cold") {
    const caseId = process.argv[3];

    if (caseId === undefined) {
      throw new Error("Cold worker requires a case id");
    }

    await runColdWorker(caseId);
  } else {
    await runCoordinator();
  }
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
  );
  process.exitCode = 1;
}

void measurementSink;
