import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

import { Effect, Schema } from "effect";
import {
  fit,
  getRegressorCoefficients,
  predict,
  predictUncertainty,
  predictWithIntervals,
  forecast,
  anomalies,
  detectAnomalies,
  planRollingOrigin,
  crossValidate,
  crossValidateBaseline,
  comparePerformance,
  performanceMetrics,
  prophetFittingBackendLayer,
  searchModels,
  inspectCountryHolidays,
  warmStartParameters,
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
  "dist/anomaly.d.ts",
  "dist/component-mode.d.ts",
  "dist/country-holidays.d.ts",
  "dist/errors.d.ts",
  "dist/evaluation.d.ts",
  "dist/evaluation-baseline.d.ts",
  "dist/evaluation-metrics.d.ts",
  "dist/evaluation-report.d.ts",
  "dist/event.d.ts",
  "dist/feature-name.d.ts",
  "dist/fitted-model.d.ts",
  "dist/forecast.d.ts",
  "dist/index.d.ts",
  "dist/internal/additional-features.d.ts",
  "dist/internal/cross-validation-options.d.ts",
  "dist/internal/country-holiday-snapshot.d.ts",
  "dist/internal/country-holiday-model.d.ts",
  "dist/internal/fitting-backend.d.ts",
  "dist/internal/prophet-fitting-backend.d.ts",
  "dist/linear-optimizer.d.ts",
  "dist/logistic.d.ts",
  "dist/model-search.d.ts",
  "dist/model-serialization.d.ts",
  "dist/observation.d.ts",
  "dist/options.d.ts",
  "dist/predict-with-intervals.d.ts",
  "dist/prediction-row.d.ts",
  "dist/prophet.d.ts",
  "dist/regressor.d.ts",
  "dist/seasonality.d.ts",
  "dist/target-scaling.d.ts",
  "dist/uncertainty.d.ts",
  "dist/warm-start.d.ts",
];

const thirdPartyRoot = new URL("rust/prophet-wasm/third-party/", projectRoot);

const thirdPartyFiles = await collectFiles(thirdPartyRoot);

const expectedWasmFiles = [
  "wasm/package.json",
  "wasm/prophet_wasm.d.ts",
  "wasm/prophet_wasm.js",
  "wasm/prophet_wasm_bg.wasm",
  "wasm/prophet_wasm_bg.wasm.d.ts",
  ...thirdPartyFiles.map((filename) => `wasm/third-party/${filename}`),
];

const pack = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  cwd: projectRoot,
  encoding: "utf8",
});

assert.equal(pack.status, 0, pack.stderr || pack.stdout);

const PackageManifestSchema = Schema.Struct({
  dependencies: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  peerDependencies: Schema.Record(Schema.String, Schema.String),
});

const packageManifest = Schema.decodeUnknownSync(PackageManifestSchema)(
  JSON.parse(await readFile(new URL("package.json", projectRoot), "utf8")),
);

assert.equal(
  packageManifest.peerDependencies["effect"],
  "^4.0.0",
  "effect must be a peer dependency so applications share one copy",
);

assert.equal(
  packageManifest.dependencies?.["effect"],
  undefined,
  "effect must not also be a regular dependency",
);

const PackResultsSchema = Schema.Array(
  Schema.Struct({
    filename: Schema.String,
    size: Schema.Natural,
    unpackedSize: Schema.Natural,
    files: Schema.Array(Schema.Struct({ path: Schema.String })),
  }),
);

const packResults = Schema.decodeUnknownSync(PackResultsSchema)(JSON.parse(pack.stdout));

assert.equal(packResults.length, 1);

const packResult = packResults.at(0);

assert.ok(packResult);

const packedFiles = packResult.files.map(({ path }) => path).sort();

const calendarManifest = Schema.decodeUnknownSync(
  Schema.Struct({
    snapshotId: Schema.String,
    files: Schema.Record(
      Schema.String,
      Schema.Struct({ sha256: Schema.String, bytes: Schema.Natural }),
    ),
  }),
)(JSON.parse(await readFile(new URL("calendars/manifest.json", projectRoot), "utf8")));

const expectedCalendarFiles = ["calendars/manifest.json", ...Object.keys(calendarManifest.files)];

for (const [filename, identity] of Object.entries(calendarManifest.files)) {
  const bytes = await readFile(new URL(filename, projectRoot));

  assert.equal(bytes.length, identity.bytes, `Calendar artifact byte count: ${filename}`);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    identity.sha256,
    `Calendar artifact hash: ${filename}`,
  );
}

const expectedPackedFiles = [
  "LICENSE",
  "README.md",
  "package.json",
  ...expectedDeclarationFiles,
  ...expectedJavaScriptFiles,
  ...expectedWasmFiles,
  ...expectedCalendarFiles,
].sort();

assert.deepEqual(
  packedFiles,
  expectedPackedFiles,
  "the npm artifact contains missing or stale files",
);

for (const filename of thirdPartyFiles) {
  const source = await readFile(new URL(filename, thirdPartyRoot));

  const shipped = await readFile(new URL(`wasm/third-party/${filename}`, projectRoot));

  assert.deepEqual(shipped, source, `the npm artifact must preserve ${filename}`);
}

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
    // Disabling built-ins still exercises Python-default automatic linear MAP CV.
    { builtInSeasonalities: { yearly: "off", weekly: "off", daily: "off" } },
    {
      horizonMs: 86_400_000,
      cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

assert.equal(evaluated.kind, "point");

assert.equal(evaluated.rows[0]?.actual, 4);

assert.ok(Number.isFinite(evaluated.rows[0]?.predicted));

assert.equal(evaluated.folds[0]?.model, "linear-piecewise-map");

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
    { mode: "intervals", scaling: "minmax", uncertainty: { seed: 19, samples: 32 } },
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

const regressorHistory = [
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
];

const regressorOptions = { regressors: [{ name: "promotion", priorScale: 100 }] };

const regressorModel = await Effect.runPromise(
  fit(regressorHistory, regressorOptions).pipe(Effect.provide(prophetFittingBackendLayer)),
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

const [oneCallForecast] = await Effect.runPromise(
  forecast(
    regressorHistory,
    [{ timestamp: "2024-01-01T00:00:04.000Z", regressors: { promotion: 1 } }],
    regressorOptions,
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

assert.equal(oneCallForecast?.value, regressorForecast?.value);

assert.equal(getRegressorCoefficients(regressorModel)[0]?.name, "promotion");

const warmStarted = await Effect.runPromise(
  fit(regressorHistory, {
    ...regressorOptions,
    map: { warmStart: warmStartParameters(regressorModel) },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

assert.equal(warmStarted.model, regressorModel.model);

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

const withIntervals = await Effect.runPromise(
  predictWithIntervals(
    regressorModel,
    [{ timestamp: "2024-01-01T00:00:04.000Z", regressors: { promotion: 1 } }],
    { seed: 42, samples: 4 },
  ),
);

assert.equal(withIntervals.rows[0]?.value, regressorForecast?.value);

assert.ok(
  (withIntervals.rows[0]?.valueInterval.lower ?? NaN) <=
    (withIntervals.rows[0]?.valueInterval.upper ?? NaN),
);

const assessed = await Effect.runPromise(
  detectAnomalies(
    regressorModel,
    [{ timestamp: "2024-01-01T00:00:04.000Z", value: 1_000, regressors: { promotion: 1 } }],
    { seed: 42, samples: 4 },
  ),
);

assert.equal(assessed.intervalWidth, 0.99);

assert.equal(assessed.rows[0]?.predicted, regressorForecast?.value);

assert.equal(assessed.anomalies[0]?.position, "above");

const flagged = await Effect.runPromise(
  anomalies(
    Array.from({ length: 20 }, (_, offset) => ({
      timestamp: new Date(Date.UTC(2024, 0, 1 + offset)).toISOString(),
      value: offset + (offset === 10 ? 50 : ((offset * 7) % 5) / 5),
    })),
    { seed: 42, samples: 100 },
    { builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" } },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

assert.deepEqual(flagged, [Date.UTC(2024, 0, 11)]);

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

const calendar = await Effect.runPromise(inspectCountryHolidays({ country: "UK" }, [2060]));

assert.equal(calendar.country, "GB");

assert.equal(calendar.snapshotId, calendarManifest.snapshotId);

assert.ok(calendar.occurrences.length > 0);

// Exercise the actual packed artifact, not self-reference resolution in the source tree.
// Reuse only the application's installed peer Effect; all library code/data come from the tarball.
const application = await mkdtemp(join(tmpdir(), "effect-prophet-packed-"));

try {
  const actualPack = spawnSync(
    "npm",
    ["pack", "--json", "--ignore-scripts", "--pack-destination", application],
    {
      cwd: projectRoot,
      encoding: "utf8",
    },
  );

  assert.equal(actualPack.status, 0, actualPack.stderr || actualPack.stdout);

  const artifact = Schema.decodeUnknownSync(PackResultsSchema)(JSON.parse(actualPack.stdout)).at(0);

  assert.ok(artifact);
  assert.deepEqual(artifact.files.map(({ path }) => path).sort(), expectedPackedFiles);

  const installed = join(application, "node_modules/effect-prophet");

  await mkdir(installed, { recursive: true });
  await symlink(
    fileURLToPath(new URL("node_modules/effect", projectRoot)),
    join(application, "node_modules/effect"),
    "dir",
  );

  const extract = spawnSync(
    "tar",
    ["-xzf", join(application, artifact.filename), "--strip-components=1", "-C", installed],
    { encoding: "utf8" },
  );

  assert.equal(extract.status, 0, extract.stderr || extract.stdout);

  for (const [filename, identity] of Object.entries(calendarManifest.files)) {
    const bytes = await readFile(join(installed, filename));

    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      identity.sha256,
      `Packed calendar/notice hash: ${filename}`,
    );
  }

  const fresh = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
    import assert from "node:assert/strict";
    import { rm, writeFile } from "node:fs/promises";
    import { Effect } from "effect";
    import { CountryHolidayError, inspectCountryHolidays, fit, predict, predictUncertainty, encodeFittedModel, prophetFittingBackendLayer } from "effect-prophet";

    const calendar = await Effect.runPromise(inspectCountryHolidays({ country: "USA" }, [2021, 2060]));
    assert.equal(calendar.country, "US");
    assert.equal(calendar.provider.holidays, "0.104");
    assert.ok(calendar.occurrences.some((event) => event.date === "2060-12-25"));
    assert.ok(calendar.occurrences.some((event) => event.date === "2021-12-31" && event.name === "New Year's Day (observed)"));

    const rejected = await Effect.runPromise(Effect.flip(inspectCountryHolidays({ country: "LK" }, [2027])));
    assert.ok(rejected instanceof CountryHolidayError);
    assert.equal(rejected.reason, "known-coverage-restriction");
    const allowed = await Effect.runPromise(inspectCountryHolidays({ country: "LK", coverage: "allow-known-gaps" }, [2027]));
    assert.deepEqual(allowed.occurrences, []);
    assert.deepEqual(allowed.issues, rejected.coverageIssues);

    const rows = Array.from({ length: 80 }, (_, index) => ({
      timestamp: new Date(Date.UTC(2024, 0, index + 1, 12)).toISOString(),
      value: 20 + index * 0.03 + Math.sin(index) * 0.15 + (index === 0 ? 5 : 0),
    }));
    const model = await Effect.runPromise(fit(rows, {
      countryHolidays: { country: "US" },
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
    }).pipe(Effect.provide(prophetFittingBackendLayer)));
    const future = ["2025-01-01T12:00:00.000Z", "2025-01-02T12:00:00.000Z"];
    const forecasts = await Effect.runPromise(predict(model, future));
    const uncertainty = await Effect.runPromise(predictUncertainty(model, future, { seed: 19, samples: 8 }));
    const encoded = await Effect.runPromise(encodeFittedModel(model));
    assert.equal(encoded.countryHolidays.selection.country, "US");
    await writeFile("saved-calendar-model.json", JSON.stringify({ encoded, future, forecasts, uncertainty }));

    const path = "node_modules/effect-prophet/calendars/countries/US.json";
    await writeFile(path, '{"schemaVersion":2}');
    const version = await Effect.runPromise(Effect.flip(inspectCountryHolidays({ country: "US" }, [2024])));
    assert.ok(version instanceof CountryHolidayError);
    assert.equal(version.reason, "unsupported-snapshot-version");
    await rm(path);
    const missing = await Effect.runPromise(Effect.flip(inspectCountryHolidays({ country: "US" }, [2024])));
    assert.ok(missing instanceof CountryHolidayError);
    assert.equal(missing.reason, "snapshot-unavailable");
    const fitting = await Effect.runPromise(Effect.flip(fit(rows, { countryHolidays: { country: "US" } }).pipe(Effect.provide(prophetFittingBackendLayer))));
    assert.ok(fitting instanceof CountryHolidayError);
    assert.equal(fitting.reason, "snapshot-unavailable");
  `,
    ],
    { cwd: application, encoding: "utf8" },
  );

  assert.equal(fresh.status, 0, fresh.stderr || fresh.stdout);

  const restored = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
    import assert from "node:assert/strict";
    import { readFile } from "node:fs/promises";
    import { Effect } from "effect";
    import { decodeFittedModel, predict, predictUncertainty } from "effect-prophet";
    const saved = JSON.parse(await readFile("saved-calendar-model.json", "utf8"));
    const model = await Effect.runPromise(decodeFittedModel(saved.encoded));
    assert.deepEqual(await Effect.runPromise(predict(model, saved.future)), saved.forecasts);
    assert.deepEqual(await Effect.runPromise(predictUncertainty(model, saved.future, { seed: 19, samples: 8 })), saved.uncertainty);
  `,
    ],
    { cwd: application, encoding: "utf8" },
  );

  assert.equal(restored.status, 0, restored.stderr || restored.stdout);
  console.log(
    `Packed calendar lookup passed (${artifact.size} packed bytes / ${artifact.unpackedSize} unpacked bytes)`,
  );
} finally {
  await rm(application, { recursive: true, force: true });
}

console.log(`Package artifact smoke test passed (${packedFiles.length} files)`);
