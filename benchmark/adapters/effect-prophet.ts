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
  getRegressorCoefficients,
  predict,
  prophetFittingBackendLayer,
  type FittedProphet,
  type ForecastComponent,
  type Forecasts,
} from "effect-prophet";

import {
  parseBenchmarkCases,
  parseBenchmarkDataset,
  type BenchmarkCase,
  type BenchmarkDataset,
  type BenchmarkPhase,
} from "../case.ts";
import { effectOptionsForCase } from "../effect-case.ts";
import {
  BenchmarkMeasurementSchema,
  CorrectnessProjectionSchema,
  parseImplementationResult,
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
  correctness: Schema.optionalKey(CorrectnessProjectionSchema),
});

type WorkerOutput = typeof WorkerOutputSchema.Type;

interface PreparedInput {
  readonly observations: ReadonlyArray<{
    readonly timestamp: string;
    readonly value: number;
    readonly regressors?: Readonly<Record<string, number>>;
    readonly conditions?: Readonly<Record<string, boolean>>;
  }>;
  readonly predictionRows: ReadonlyArray<{
    readonly timestamp: string;
    readonly regressors?: Readonly<Record<string, number>>;
    readonly conditions?: Readonly<Record<string, boolean>>;
  }>;
}

let measurementSink: unknown;

const loadCases = async (): Promise<ReadonlyArray<BenchmarkCase>> => {
  const path = process.env.BENCHMARK_CASES_PATH ?? defaultCasesPath;
  const input: unknown = JSON.parse(await readFile(path, "utf8"));

  return Effect.runPromise(parseBenchmarkCases(input));
};

const loadDataset = async (benchmarkCase: BenchmarkCase): Promise<BenchmarkDataset> => {
  const root = process.env.BENCHMARK_DATA_ROOT ?? defaultDataRoot;
  const path = resolve(root, benchmarkCase.dataset);
  const input: unknown = JSON.parse(await readFile(path, "utf8"));

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

const copyRecord = <Value>(
  record: Readonly<Record<string, Value>>,
): Readonly<Record<string, Value>> => Object.fromEntries(Object.entries(record));

const prepareObservation = (
  observation: BenchmarkDataset["observations"][number],
): PreparedInput["observations"][number] => {
  const base = { timestamp: observation.timestamp, value: observation.value };
  const regressors = observation.regressors;
  const conditions = observation.conditions;

  if (regressors === undefined) {
    if (conditions === undefined) {
      return base;
    }

    return { ...base, conditions: copyRecord(conditions) };
  }

  if (conditions === undefined) {
    return { ...base, regressors: copyRecord(regressors) };
  }

  return {
    ...base,
    regressors: copyRecord(regressors),
    conditions: copyRecord(conditions),
  };
};

const preparePredictionRow = (
  row: BenchmarkDataset["predictionRows"][number],
): PreparedInput["predictionRows"][number] => {
  const base = { timestamp: row.timestamp };
  const regressors = row.regressors;
  const conditions = row.conditions;

  if (regressors === undefined) {
    if (conditions === undefined) {
      return base;
    }

    return { ...base, conditions: copyRecord(conditions) };
  }

  if (conditions === undefined) {
    return { ...base, regressors: copyRecord(regressors) };
  }

  return {
    ...base,
    regressors: copyRecord(regressors),
    conditions: copyRecord(conditions),
  };
};

const prepareInput = (dataset: BenchmarkDataset): PreparedInput => ({
  observations: dataset.observations.map(prepareObservation),
  predictionRows: dataset.predictionRows.map(preparePredictionRow),
});

const runFit = (input: PreparedInput, benchmarkCase: BenchmarkCase): FittedProphet =>
  Effect.runSync(
    fit(input.observations, effectOptionsForCase(benchmarkCase)).pipe(
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
  Effect.runSync(predict(model, input.predictionRows));

const additiveComponentProjection = (
  component: ForecastComponent,
): ForecastProjection["seasonalities"][number] => {
  if (component.mode !== "additive") {
    throw new Error("The current benchmark protocol supports additive components only");
  }

  return { name: component.name, value: component.value };
};

const forecastProjection = (forecasts: Forecasts): ReadonlyArray<ForecastProjection> =>
  forecasts.map((forecast) => ({
    timestamp: forecast.timestamp,
    value: forecast.value,
    trend: forecast.trend,
    additive: forecast.additive,
    seasonalities: forecast.seasonalities.map(additiveComponentProjection),
    events: forecast.events.map(additiveComponentProjection),
    regressors: forecast.regressors.map(additiveComponentProjection),
  }));

const sumComponents = (forecast: ForecastProjection): number =>
  [...forecast.seasonalities, ...forecast.events, ...forecast.regressors].reduce(
    (sum, component) => sum + component.value,
    0,
  );

const assertForecasts = (
  forecasts: ReadonlyArray<ForecastProjection>,
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
): void => {
  if (forecasts.length !== dataset.predictionRows.length) {
    throw new Error(`Case ${benchmarkCase.id} omitted prediction rows`);
  }

  const configuration =
    benchmarkCase.workload.kind === "linear-map" ? benchmarkCase.workload.configuration : undefined;

  for (const [index, forecast] of forecasts.entries()) {
    const row = dataset.predictionRows[index];

    if (row === undefined || Date.parse(row.timestamp) !== forecast.timestamp) {
      throw new Error(`Case ${benchmarkCase.id} changed prediction row order`);
    }

    const values = [forecast.value, forecast.trend, forecast.additive, sumComponents(forecast)];

    if (!values.every(Number.isFinite)) {
      throw new Error(`Case ${benchmarkCase.id} returned non-finite forecast values`);
    }

    if (Math.abs(forecast.value - forecast.trend - forecast.additive) > 1e-8) {
      throw new Error(`Case ${benchmarkCase.id} failed total forecast reconstruction`);
    }

    if (Math.abs(forecast.additive - sumComponents(forecast)) > 1e-8) {
      throw new Error(`Case ${benchmarkCase.id} failed additive component reconstruction`);
    }

    for (const component of forecast.seasonalities) {
      const seasonality = configuration?.seasonalities.find(
        (candidate) => candidate.name === component.name,
      );

      if (
        seasonality?.conditionName !== undefined &&
        row.conditions?.[seasonality.conditionName] === false &&
        component.value !== 0
      ) {
        throw new Error(`Case ${benchmarkCase.id} did not zero a condition-false component`);
      }
    }
  }
};

const assertFixedEquation = (
  forecasts: ReadonlyArray<ForecastProjection>,
  benchmarkCase: BenchmarkCase,
): void => {
  if (benchmarkCase.workload.kind !== "fixed-linear-prediction") {
    return;
  }

  const parameters = benchmarkCase.workload.parameters;
  const tolerance = benchmarkCase.correctnessTolerances.forecast;

  for (const forecast of forecasts) {
    const expected =
      parameters.intercept +
      parameters.slope * ((forecast.timestamp - parameters.timeOrigin) / parameters.timeScale);

    const allowed = tolerance.absolute + tolerance.relative * Math.abs(expected);

    if (Math.abs(forecast.value - expected) > allowed) {
      throw new Error(`Case ${benchmarkCase.id} failed its fixed equation`);
    }
  }
};

const eventMetadata = (model: FittedProphet): CorrectnessProjection["events"] => {
  if (model.model !== "linear-piecewise-map") {
    return [];
  }

  return model.events.layout.components.map((component) => {
    const occurrences = model.events.occurrences.filter(
      (occurrence) => occurrence.name === component.name,
    );

    const first = occurrences[0];

    if (first === undefined) {
      throw new Error(`Fitted event ${component.name} has no occurrence metadata`);
    }

    return {
      name: component.name,
      dates: occurrences.map((occurrence) => occurrence.date),
      lowerWindowDays: first.lowerWindowDays,
      upperWindowDays: first.upperWindowDays,
      priorScale: first.priorScale,
    };
  });
};

const regressorMetadata = (model: FittedProphet): CorrectnessProjection["regressors"] => {
  if (model.model !== "linear-piecewise-map") {
    return [];
  }

  const coefficients = getRegressorCoefficients(model);

  return model.regressors.map((regressor, index) => {
    const projected = coefficients[index];

    if (projected === undefined) {
      throw new Error(`Fitted regressor ${regressor.definition.name} omitted coefficient metadata`);
    }

    return {
      name: regressor.definition.name,
      priorScale: regressor.definition.priorScale,
      standardization: regressor.definition.standardization,
      transform: regressor.transform,
      coefficient: projected.coefficient,
      center: projected.center,
    };
  });
};

const seasonalityMetadata = (
  component: Exclude<
    FittedProphet,
    { readonly model: "linear-trend" }
  >["seasonalities"]["components"][number],
): CorrectnessProjection["seasonalities"][number] =>
  component.definition.conditionName === undefined
    ? { name: component.definition.name }
    : {
        name: component.definition.name,
        conditionName: component.definition.conditionName,
      };

const metadataProjection = (
  model: FittedProphet,
): Pick<
  CorrectnessProjection,
  "modelKind" | "changepointTimestamps" | "seasonalities" | "events" | "regressors"
> => ({
  modelKind: model.model,
  changepointTimestamps: model.model === "linear-piecewise-map" ? model.changepointTimestamps : [],
  seasonalities:
    model.model === "linear-trend" ? [] : model.seasonalities.components.map(seasonalityMetadata),
  events: eventMetadata(model),
  regressors: regressorMetadata(model),
});

const assertMetadata = (
  benchmarkCase: BenchmarkCase,
  metadata: ReturnType<typeof metadataProjection>,
): void => {
  if (benchmarkCase.workload.kind !== "linear-map") {
    return;
  }

  const configuration = benchmarkCase.workload.configuration;

  if (metadata.modelKind !== "linear-piecewise-map") {
    throw new Error(`Case ${benchmarkCase.id} did not fit the expected model kind`);
  }

  const expectedSeasonalities = configuration.seasonalities.map((seasonality) =>
    seasonality.conditionName === undefined
      ? { name: seasonality.name }
      : { name: seasonality.name, conditionName: seasonality.conditionName },
  );

  if (JSON.stringify(metadata.seasonalities) !== JSON.stringify(expectedSeasonalities)) {
    throw new Error(`Case ${benchmarkCase.id} changed seasonality metadata`);
  }

  const expectedRegressorNames = configuration.regressors.map((regressor) => regressor.name);

  if (
    JSON.stringify(metadata.regressors.map((regressor) => regressor.name)) !==
    JSON.stringify(expectedRegressorNames)
  ) {
    throw new Error(`Case ${benchmarkCase.id} changed regressor order`);
  }

  for (const regressor of metadata.regressors) {
    const configured = configuration.regressors.find(
      (candidate) => candidate.name === regressor.name,
    );

    if (
      configured === undefined ||
      configured.standardization !== regressor.standardization ||
      !Number.isFinite(regressor.coefficient) ||
      !Number.isFinite(regressor.center)
    ) {
      throw new Error(`Case ${benchmarkCase.id} returned invalid regressor metadata`);
    }

    const expectedMode =
      configured.standardization === "never" || regressor.name === "binary-auto"
        ? "identity"
        : "standardized";

    if (regressor.transform.mode !== expectedMode) {
      throw new Error(`Case ${benchmarkCase.id} resolved an unexpected regressor transform`);
    }
  }

  if (configuration.changepoints.mode === "explicit") {
    const expected = configuration.changepoints.timestamps.map(Date.parse);

    if (JSON.stringify(metadata.changepointTimestamps) !== JSON.stringify(expected)) {
      throw new Error(`Case ${benchmarkCase.id} changed explicit changepoints`);
    }
  } else if (metadata.changepointTimestamps.length !== configuration.changepoints.count) {
    throw new Error(`Case ${benchmarkCase.id} resolved the wrong automatic changepoint count`);
  }
};

const maximumProjectionDifference = (
  left: ReadonlyArray<ForecastProjection>,
  right: ReadonlyArray<ForecastProjection>,
): number => {
  let maximum = 0;

  for (const [index, leftForecast] of left.entries()) {
    const rightForecast = right[index];

    if (rightForecast === undefined || leftForecast.timestamp !== rightForecast.timestamp) {
      throw new Error("Persistence round trip changed forecast rows");
    }

    const leftValues = [
      leftForecast.value,
      leftForecast.trend,
      leftForecast.additive,
      ...leftForecast.seasonalities.map((component) => component.value),
      ...leftForecast.events.map((component) => component.value),
      ...leftForecast.regressors.map((component) => component.value),
    ];

    const rightValues = [
      rightForecast.value,
      rightForecast.trend,
      rightForecast.additive,
      ...rightForecast.seasonalities.map((component) => component.value),
      ...rightForecast.events.map((component) => component.value),
      ...rightForecast.regressors.map((component) => component.value),
    ];

    if (leftValues.length !== rightValues.length) {
      throw new Error("Persistence round trip changed component layout");
    }

    for (const [valueIndex, leftValue] of leftValues.entries()) {
      const rightValue = rightValues[valueIndex];

      if (rightValue === undefined) {
        throw new Error("Persistence round trip omitted a component value");
      }

      maximum = Math.max(maximum, Math.abs(leftValue - rightValue));
    }
  }

  return maximum;
};

const persistenceMaximumError = (
  model: FittedProphet,
  input: PreparedInput,
  forecasts: ReadonlyArray<ForecastProjection>,
): number => {
  const encoded = Effect.runSync(encodeFittedModel(model));
  const serialized = JSON.stringify(encoded);
  const decodedInput: unknown = JSON.parse(serialized);
  const restored = Effect.runSync(decodeFittedModel(decodedInput));
  const restoredForecasts = forecastProjection(runPredict(restored, input));

  return maximumProjectionDifference(forecasts, restoredForecasts);
};

const correctnessProjection = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  run: number,
): CorrectnessProjection => {
  const input = prepareInput(dataset);
  const model = setupModel(input, benchmarkCase);
  const forecasts = forecastProjection(runPredict(model, input));
  const metadata = metadataProjection(model);

  assertForecasts(forecasts, benchmarkCase, dataset);
  assertFixedEquation(forecasts, benchmarkCase);
  assertMetadata(benchmarkCase, metadata);

  const persistenceError = persistenceMaximumError(model, input, forecasts);

  const common = {
    caseId: benchmarkCase.id,
    run,
    status: "locally-passed" as const,
    ...metadata,
    forecasts,
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

const processSamples = (
  benchmarkCase: BenchmarkCase,
  mode: "--cold" | "--restored",
  serializedModel?: string,
): ReadonlyArray<number> => {
  const samples: Array<number> = [];

  for (let index = 0; index < benchmarkCase.measuredIterations; index += 1) {
    const started = process.hrtime.bigint();

    const child = spawnSync(process.execPath, [adapterPath, mode, benchmarkCase.id], {
      encoding: "utf8",
      env: process.env,
      input: serializedModel,
      timeout: benchmarkCase.timeoutSeconds * 1_000,
    });

    const ended = process.hrtime.bigint();

    if (child.status !== 0 || !child.stdout.includes(protocolPrefix)) {
      throw new Error(child.stderr || child.stdout || `Effect Prophet ${mode} worker failed`);
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
    case "adapter-input-conversion":
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
      samples = processSamples(benchmarkCase, "--cold");
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
    case "fresh-process-restored-predict":
      samples = processSamples(benchmarkCase, "--restored", encodedJson);
      break;
  }

  measurementSink = forecasts;

  return {
    caseId: benchmarkCase.id,
    implementation: "effect-prophet",
    phase,
    comparison: benchmarkCase.workload.comparison.kind,
    evidenceId: benchmarkCase.workload.comparison.evidenceId,
    run,
    samplesNanoseconds: samples,
    correctness: "locally-passed",
  };
};

const findCase = async (caseId: string): Promise<BenchmarkCase> => {
  const benchmarkCase = (await loadCases()).find((candidate) => candidate.id === caseId);

  if (benchmarkCase === undefined) {
    throw new Error(`Unknown benchmark case: ${caseId}`);
  }

  return benchmarkCase;
};

const runWorker = async (
  caseId: string,
  run: number,
  stage: "all" | "correctness" | "timing",
): Promise<WorkerOutput> => {
  const benchmarkCase = await findCase(caseId);
  const dataset = await loadDataset(benchmarkCase);

  const correctness =
    stage === "timing" ? undefined : correctnessProjection(benchmarkCase, dataset, run);

  const measurements =
    stage === "correctness"
      ? []
      : benchmarkCase.phases.map((phase) =>
          measurementForPhase(benchmarkCase, dataset, run, phase),
        );

  return correctness === undefined ? { measurements } : { measurements, correctness };
};

const runColdWorker = async (caseId: string): Promise<void> => {
  const benchmarkCase = await findCase(caseId);
  const dataset = await loadDataset(benchmarkCase);
  const input = prepareInput(dataset);
  const model = runFit(input, benchmarkCase);
  const forecasts = runPredict(model, input);

  if (forecasts.length !== input.predictionRows.length) {
    throw new Error("Cold forecast omitted requested rows");
  }

  process.stdout.write(`${protocolPrefix}{"status":"passed"}\n`);
};

const runRestoredWorker = async (caseId: string): Promise<void> => {
  const benchmarkCase = await findCase(caseId);
  const dataset = await loadDataset(benchmarkCase);

  const serialized = await new Promise<string>((resolveInput, reject) => {
    let input = "";

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk: string) => {
      input += chunk;
    });
    process.stdin.on("end", () => resolveInput(input));
    process.stdin.on("error", reject);
  });

  const encoded: unknown = JSON.parse(serialized);
  const model = Effect.runSync(decodeFittedModel(encoded));
  const input = prepareInput(dataset);
  const forecasts = runPredict(model, input);

  if (forecasts.length !== input.predictionRows.length) {
    throw new Error("Restored forecast omitted requested rows");
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
  const stageInput = process.env.BENCHMARK_STAGE ?? "all";

  if (stageInput !== "all" && stageInput !== "correctness" && stageInput !== "timing") {
    throw new Error(`Unsupported benchmark stage: ${stageInput}`);
  }

  const outputPath = process.env.BENCHMARK_OUTPUT_PATH ?? defaultOutputPath;

  const previous =
    stageInput === "timing"
      ? await Effect.runPromise(
          parseImplementationResult(JSON.parse(await readFile(outputPath, "utf8"))),
        )
      : undefined;

  const eligibilityPath = process.env.BENCHMARK_ELIGIBILITY_PATH;

  const eligibleIds =
    stageInput === "timing"
      ? new Set<string>(
          JSON.parse(
            await readFile(
              eligibilityPath ??
                (() => {
                  throw new Error("BENCHMARK_ELIGIBILITY_PATH is required for timing");
                })(),
              "utf8",
            ),
          ).caseIds,
        )
      : undefined;

  const selected = selectCases(await loadCases());

  const cases =
    eligibleIds === undefined
      ? selected
      : selected.filter((benchmarkCase) => eligibleIds.has(benchmarkCase.id));

  const measurements: Array<BenchmarkMeasurement> = [];

  const correctness: Array<CorrectnessProjection> =
    previous === undefined ? [] : Array.from(previous.correctness);

  const failures: Array<BenchmarkFailure> =
    previous === undefined ? [] : Array.from(previous.failures);

  for (const benchmarkCase of cases) {
    for (let run = 0; run < benchmarkCase.independentRuns; run += 1) {
      const worker = spawnSync(
        process.execPath,
        [adapterPath, "--worker", benchmarkCase.id, String(run), stageInput],
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

        if (output.correctness !== undefined) {
          correctness.push(output.correctness);
        }
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

  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
};

const mode = process.argv[2];

try {
  if (mode === "--worker") {
    const caseId = process.argv[3];
    const run = Number(process.argv[4]);
    const stage = process.argv[5] ?? "all";

    if (
      caseId === undefined ||
      !Number.isSafeInteger(run) ||
      run < 0 ||
      (stage !== "all" && stage !== "correctness" && stage !== "timing")
    ) {
      throw new Error("Worker requires a case id and nonnegative run index");
    }

    const output = await runWorker(caseId, run, stage);

    process.stdout.write(`${protocolPrefix}${JSON.stringify(output)}\n`);
  } else if (mode === "--cold" || mode === "--restored") {
    const caseId = process.argv[3];

    if (caseId === undefined) {
      throw new Error(`${mode} worker requires a case id`);
    }

    if (mode === "--cold") {
      await runColdWorker(caseId);
    } else {
      await runRestoredWorker(caseId);
    }
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
