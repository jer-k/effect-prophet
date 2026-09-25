import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";

import { Effect, Schema } from "effect";
import {
  fit,
  getRegressorCoefficients,
  predict,
  predictUncertainty,
  planRollingOrigin,
  crossValidate,
  crossValidateBaseline,
  comparePerformance,
  performanceMetrics,
  prophetFittingBackendLayer,
  searchModels,
} from "effect-prophet";

const projectRoot = new URL("../", import.meta.url);

const collectFiles = async (directory: URL, prefix = ""): Promise<Array<string>> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: Array<string> = [];

  for (const entry of entries) {
    const relativePath = prefix === "" ? entry.name : `${prefix}/${entry.name}`;

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(new URL(`${entry.name}/`, directory), relativePath)));
    } else {
      files.push(relativePath);
    }
  }

  return files;
};

const sourceFiles = await collectFiles(new URL("src/", projectRoot));

const expectedJavaScriptFiles = sourceFiles.flatMap((sourceFile) => {
  assert.match(sourceFile, /\.ts$/u);

  const outputBase = sourceFile.slice(0, -3);
  const outputFiles = [`dist/${outputBase}.js`];

  if (sourceFile !== "index.ts") {
    outputFiles.push(`dist/${outputBase}.js.map`);
  }

  return outputFiles;
});

const expectedDeclarationFiles = [
  "dist/component-mode.d.ts",
  "dist/errors.d.ts",
  "dist/evaluation.d.ts",
  "dist/evaluation-baseline.d.ts",
  "dist/evaluation-metrics.d.ts",
  "dist/evaluation-report.d.ts",
  "dist/event.d.ts",
  "dist/feature-name.d.ts",
  "dist/fitted-model.d.ts",
  "dist/index.d.ts",
  "dist/internal/additional-features.d.ts",
  "dist/internal/fitting-backend.d.ts",
  "dist/internal/prophet-fitting-backend.d.ts",
  "dist/logistic.d.ts",
  "dist/model-search.d.ts",
  "dist/model-serialization.d.ts",
  "dist/observation.d.ts",
  "dist/options.d.ts",
  "dist/prediction-row.d.ts",
  "dist/prophet.d.ts",
  "dist/regressor.d.ts",
  "dist/seasonality.d.ts",
  "dist/target-scaling.d.ts",
  "dist/uncertainty.d.ts",
];

const expectedWasmFiles = [
  "wasm/package.json",
  "wasm/prophet_wasm.d.ts",
  "wasm/prophet_wasm.js",
  "wasm/prophet_wasm_bg.wasm",
  "wasm/prophet_wasm_bg.wasm.d.ts",
];

const pack = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  cwd: projectRoot,
  encoding: "utf8",
});

assert.equal(pack.status, 0, pack.stderr || pack.stdout);

const PackResultsSchema = Schema.Array(
  Schema.Struct({
    files: Schema.Array(Schema.Struct({ path: Schema.String })),
  }),
);

const packResults = Schema.decodeUnknownSync(PackResultsSchema)(JSON.parse(pack.stdout));

assert.equal(packResults.length, 1);

const packResult = packResults.at(0);

assert.ok(packResult);

const packedFiles = packResult.files.map(({ path }) => path).sort();

const expectedPackedFiles = [
  "README.md",
  "package.json",
  ...expectedDeclarationFiles,
  ...expectedJavaScriptFiles,
  ...expectedWasmFiles,
].sort();

assert.deepEqual(
  packedFiles,
  expectedPackedFiles,
  "the npm artifact contains missing or stale files",
);

for (const declarationFile of expectedDeclarationFiles) {
  const declaration = await readFile(new URL(declarationFile, projectRoot), "utf8");

  const relativeImports = declaration.matchAll(
    /\b(?:from\s+|import\()\s*["'](\.{1,2}\/[^"']+)["']/gu,
  );

  for (const relativeImport of relativeImports) {
    assert.match(relativeImport[1] ?? "", /\.js$/u);
  }
}

const declarationTypecheck = spawnSync(
  "node",
  [
    "node_modules/typescript/bin/tsc",
    "--ignoreConfig",
    "--noEmit",
    "--strict",
    "--skipLibCheck",
    "true",
    "--target",
    "ES2022",
    "--module",
    "NodeNext",
    "--moduleResolution",
    "NodeNext",
    "tools/package-consumer.ts",
  ],
  {
    cwd: projectRoot,
    encoding: "utf8",
  },
);

assert.equal(
  declarationTypecheck.status,
  0,
  declarationTypecheck.stderr || declarationTypecheck.stdout,
);

const plan = await Effect.runPromise(
  planRollingOrigin(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 3 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 4 },
    ],
    {},
    {
      horizonMs: 86_400_000,
      cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
    },
  ),
);

assert.equal(plan.folds[0]?.assessmentCount, 1);

const evaluated = await Effect.runPromise(
  crossValidate(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 3 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 4 },
    ],
    {},
    {
      horizonMs: 86_400_000,
      cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

assert.equal(evaluated.kind, "point");

assert.equal(evaluated.rows[0]?.actual, 4);

assert.ok(Math.abs((evaluated.rows[0]?.predicted ?? NaN) - 4) < 1e-12);

assert.equal(evaluated.folds[0]?.model, "linear-trend");

const selection = await Effect.runPromise(
  searchModels(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 3 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 4 },
    ],
    {
      candidates: [
        { id: "one", options: {} },
        { id: "two", options: { growth: "linear" } },
      ],
      plan: {
        horizonMs: 86_400_000,
        cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
      },
      objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
      failurePolicy: "record",
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

assert.equal(selection.candidates.length, 2);

assert.equal(selection.selected.id, "one");

const baseline = await Effect.runPromise(
  crossValidateBaseline(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 3 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 4 },
    ],
    evaluated.plan,
    { kind: "last-observation" },
  ),
);

assert.equal(baseline.rows[0]?.predicted, 3);

const comparison = await Effect.runPromise(
  comparePerformance(evaluated, [baseline], {
    metrics: ["mae"],
    aggregation: { kind: "overall" },
  }),
);

assert.equal(comparison.baselines[0]?.metrics.source, "baseline");

const metricReport = await Effect.runPromise(
  performanceMetrics(evaluated, {
    metrics: ["mae", "mse", "rmse"],
    aggregation: { kind: "overall" },
  }),
);

assert.equal(metricReport.kind, "overall");

if (metricReport.kind === "overall") {
  assert.equal(metricReport.bucket.rowCount, 1);
  assert.ok(metricReport.bucket.scores.every(({ value }) => Number.isFinite(value)));
}

const evaluatedIntervals = await Effect.runPromise(
  crossValidate(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 3 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 4 },
    ],
    { map: { changepoints: { mode: "explicit", timestamps: [] } } },
    {
      horizonMs: 86_400_000,
      cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
    },
    { mode: "intervals", uncertainty: { seed: 19, samples: 32 } },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

assert.equal(evaluatedIntervals.kind, "intervals");

assert.equal(evaluatedIntervals.sampleCount, 32);

assert.ok(Number.isFinite(evaluatedIntervals.rows[0]?.lower));

assert.ok(Number.isFinite(evaluatedIntervals.rows[0]?.upper));

const intervalReport = await Effect.runPromise(
  performanceMetrics(evaluatedIntervals, {
    metrics: ["coverage"],
    aggregation: { kind: "overall" },
  }),
);

assert.equal(intervalReport.kind, "overall");

if (intervalReport.kind === "overall") {
  assert.equal(intervalReport.bucket.scores[0]?.metric, "coverage");
}

const model = await Effect.runPromise(
  fit([
    { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
    { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
    { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
  ]).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(predict(model, ["2024-01-01T00:00:03.000Z"]));

assert.equal(forecasts.length, 1);

assert.equal(forecasts[0]?.value, 11);

assert.equal(forecasts[0]?.trend, 11);

const regressorModel = await Effect.runPromise(
  fit(
    [
      {
        timestamp: "2024-01-01T00:00:00.000Z",
        value: 2,
        regressors: { promotion: 0 },
      },
      {
        timestamp: "2024-01-01T00:00:01.000Z",
        value: 6,
        regressors: { promotion: 1 },
      },
      {
        timestamp: "2024-01-01T00:00:02.000Z",
        value: 4,
        regressors: { promotion: 0 },
      },
      {
        timestamp: "2024-01-01T00:00:03.000Z",
        value: 8,
        regressors: { promotion: 1 },
      },
    ],
    { regressors: [{ name: "promotion", priorScale: 100 }] },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const [regressorForecast] = await Effect.runPromise(
  predict(regressorModel, [
    {
      timestamp: "2024-01-01T00:00:04.000Z",
      regressors: { promotion: 1 },
    },
  ]),
);

assert.equal(regressorForecast?.regressors[0]?.name, "promotion");

assert.equal(getRegressorCoefficients(regressorModel)[0]?.name, "promotion");

const samples = await Effect.runPromise(
  predictUncertainty(
    regressorModel,
    [{ timestamp: "2024-01-01T00:00:04.000Z", regressors: { promotion: 1 } }],
    { seed: 42, samples: 4, output: "samples" },
  ),
);

assert.equal(samples.kind, "samples");

if (samples.kind === "samples") {
  assert.equal(samples.value.length, 4);
}

const logisticModel = await Effect.runPromise(
  fit(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 1.2, capacity: 10 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 2.2, capacity: 10 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 4.2, capacity: 10 },
      { timestamp: "2024-01-04T00:00:00.000Z", value: 6.1, capacity: 10 },
      { timestamp: "2024-01-05T00:00:00.000Z", value: 7.6, capacity: 10 },
      { timestamp: "2024-01-06T00:00:00.000Z", value: 8.9, capacity: 10 },
    ],
    {
      growth: "logistic",
      map: { changepoints: { mode: "explicit", timestamps: [] } },
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const [logisticForecast] = await Effect.runPromise(
  predict(logisticModel, [{ timestamp: "2024-01-07T00:00:00.000Z", capacity: 12 }]),
);

assert.ok(logisticForecast !== undefined && logisticForecast.trend > 0);

assert.ok(logisticForecast.trend < 12);

console.log(`Package artifact smoke test passed (${packedFiles.length} files)`);
