import { Effect } from "effect";
import type { WarmStartParameters } from "effect-prophet";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, type BenchmarkCase } from "../case.ts";
import { linearGrowthEdgeCases } from "../../cases/growth/linear/edge-cases.ts";
import { warmStartCases } from "../../cases/growth/warm-start.ts";
import { anomalyCases } from "../../cases/uncertainty/anomalies.ts";
import { uncertaintyCases } from "../../cases/uncertainty/public-api.ts";
import { buildBenchmarkReport, renderBenchmarkMarkdown } from "../report.ts";
import {
  parseImplementationResult,
  parseRunManifest,
  type CorrectnessProjection,
} from "../result.ts";

const environment = {
  runtime: "test",
  runtimeVersion: "1",
  operatingSystem: "linux",
  architecture: "arm64",
  processor: "test-cpu",
  containerPlatform: "linux/arm64",
  versions: [],
  artifactHashes: [],
  numericalThreads: [],
  resources: [],
  memoryMeasurement: "unsupported",
};

const tolerances = {
  trend: { absolute: 1e-9, relative: 1e-9 },
  component: { absolute: 1e-9, relative: 1e-9 },
  additive: { absolute: 1e-9, relative: 1e-9 },
  forecast: { absolute: 1e-9, relative: 1e-9 },
  noiseScale: { absolute: 1e-9, relative: 1e-9 },
  persistence: { absolute: 1e-12, relative: 0 },
};

const forecast = {
  timestamp: 1_704_067_200_000,
  value: 3,
  trend: 3,
  additive: 0,
  multiplicative: 0,
  seasonalities: [],
  events: [],
  regressors: [],
};

const correctness = {
  caseId: "fixed",
  run: 0,
  status: "locally-passed",
  modelKind: "linear-trend",
  changepointTimestamps: [],
  seasonalities: [],
  events: [],
  regressors: [],
  forecasts: [forecast],
  persistenceMaximumAbsoluteError: 0,
};

const makeResultInput = (implementation: "effect-prophet" | "python-prophet", value: number) => ({
  schemaVersion: 1,
  implementation,
  generatedAt: "2024-01-01T00:00:00.000Z",
  environment,
  measurements: [
    {
      caseId: "fixed",
      implementation,
      phase: "warm-predict",
      comparison: "equivalent-equation",
      evidenceId: "fixed-v1",
      run: 0,
      samplesNanoseconds: [value, value * 2, value * 3],
      correctness: "locally-passed",
    },
  ],
  failures: [],
  correctness: [structuredClone(correctness)],
});

const caseInput = {
  id: "fixed",
  dataset: "generated/fixed.json",
  workload: {
    kind: "fixed-linear-prediction",
    comparison: { kind: "equivalent-equation", evidenceId: "fixed-v1" },
    parameters: { intercept: 1, slope: 2, timeOrigin: 1, timeScale: 1 },
  },
  phases: ["warm-predict"],
  warmupIterations: 1,
  measuredIterations: 3,
  independentRuns: 1,
  timeoutSeconds: 60,
  correctnessTolerances: tolerances,
};

const manifestInput = {
  schemaVersion: 1,
  runId: "test-run",
  createdAt: "2024-01-01T00:00:00.000Z",
  gitRevision: "abc123",
  gitDirty: false,
  hostPlatform: "darwin",
  hostRelease: "25.0.0",
  hostArchitecture: "arm64",
  hostProcessor: "Apple M4 Pro",
  containerPlatform: "linux/arm64",
  emulated: false,
  selectedCases: ["fixed"],
  commands: ["BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose run"],
  inputHashes: [],
  containerImages: [],
};

const optimizerCase = linearGrowthEdgeCases.find(
  (benchmarkCase) => benchmarkCase.id === "map-training-ordered-auto",
);

const optimizerEvidence = optimizerCase?.workload.comparison.evidenceId ?? "";

/** The retired linear policy: objective and noise gate, stationarity reported only. */
const deferredStationarity = {
  objectiveAbsolute: 0.01,
  normalizedNoiseAbsolute: 0.0002,
  stationarity: { kind: "diagnostic-only", followUp: "EP-097" },
} as const;

const optimizerQualityEntries = [
  { name: "objective", value: -550.96916 },
  { name: "stationarity-residual", value: 161.287 },
  { name: "normalized-noise", value: 0.00182925 },
];

const optimizerResultInput = (
  implementation: "effect-prophet" | "python-prophet",
  fitQuality: ReadonlyArray<{ readonly name: string; readonly value: number }>,
) => ({
  ...makeResultInput(implementation, 100),
  correctness: [{ ...correctness, modelKind: "linear-piecewise-map", noiseScale: 0.2, fitQuality }],
  measurements: [
    {
      ...makeResultInput(implementation, 100).measurements[0],
      comparison: "equivalent-objective",
      evidenceId: optimizerEvidence,
    },
  ],
});

const optimizerReport = async (
  left: ReadonlyArray<{ readonly name: string; readonly value: number }>,
  right: ReadonlyArray<{ readonly name: string; readonly value: number }>,
  quality?: BenchmarkCase["optimizerQuality"],
) => {
  if (optimizerCase === undefined) throw new Error("Expected frozen automatic linear case");

  const [cases, manifest, effectResult, pythonResult] = await Promise.all([
    Effect.runPromise(
      parseBenchmarkCases([
        {
          ...optimizerCase,
          id: "fixed",
          independentRuns: 1,
          measuredIterations: 3,
          phases: ["warm-predict"],
          optimizerQuality: quality ?? optimizerCase.optimizerQuality,
        },
      ]),
    ),
    Effect.runPromise(parseRunManifest(manifestInput)),
    Effect.runPromise(parseImplementationResult(optimizerResultInput("effect-prophet", left))),
    Effect.runPromise(parseImplementationResult(optimizerResultInput("python-prophet", right))),
  ]);

  return buildBenchmarkReport(
    manifest,
    cases,
    effectResult,
    pythonResult,
    new Set([optimizerEvidence]),
  );
};

describe("linear fit-quality acceptance with deferred stationarity", () => {
  it("retains unequal residuals in JSON and Markdown without claiming stationarity", async () => {
    const report = await optimizerReport(
      optimizerQualityEntries,
      optimizerQualityEntries.map((entry) =>
        entry.name === "stationarity-residual" ? { ...entry, value: 161.266 } : entry,
      ),
      deferredStationarity,
    );

    expect(report.correctness[0]?.status).toBe("passed");
    expect(report.correctness[0]?.note).toContain(
      "near-stationarity acceptance is deferred to EP-097",
    );
    expect(report.timings).toHaveLength(2);
    expect(report.stationarity[0]).toMatchObject({
      effectResidual: 161.287,
      pythonResidual: 161.266,
      policy: "diagnostic-only",
      followUp: "EP-097",
    });
    expect(report.stationarity[0]?.absoluteDifference).toBeCloseTo(0.021, 12);
    expect(renderBenchmarkMarkdown(report)).toContain("## Stationarity diagnostics");
    expect(renderBenchmarkMarkdown(report)).toContain("diagnostic-only | EP-097");
  });

  it("still applies the original equality gate to historical case declarations", async () => {
    const report = await optimizerReport(
      optimizerQualityEntries,
      optimizerQualityEntries.map((entry) =>
        entry.name === "stationarity-residual" ? { ...entry, value: 161.266 } : entry,
      ),
      { objectiveAbsolute: 0.01, normalizedNoiseAbsolute: 0.0002, stationarityAbsolute: 0.01 },
    );

    expect(report.correctness[0]?.status).toBe("failed");
    expect(report.correctness[0]?.note).toContain("stationarity-residual");
    expect(report.stationarity[0]?.policy).toBe("equality-gate");
    expect(report.timings).toEqual([]);
  });

  const outputFirst = {
    kind: "output-first",
    investigate: {
      objectiveAbsolute: 0.01,
      normalizedNoiseAbsolute: 0.0002,
      stationarityExcess: 0.01,
    },
  } as const;

  const withValues = (values: Readonly<Record<string, number>>) =>
    optimizerQualityEntries.map((entry) => ({
      ...entry,
      value: values[entry.name] ?? entry.value,
    }));

  it("passes output-first cases with matching outputs and reports internal differences", async () => {
    const report = await optimizerReport(
      withValues({
        objective: -550.94,
        "stationarity-residual": 161.4,
        "normalized-noise": 0.0021,
      }),
      optimizerQualityEntries,
      outputFirst,
    );

    expect(report.correctness[0]?.status).toBe("passed");
    expect(report.timings).toHaveLength(2);
    expect(report.correctness[0]?.investigations?.map((item) => item.name)).toEqual([
      "objective",
      "stationarity-residual",
      "normalized-noise",
    ]);
    expect(report.correctness[0]?.investigations?.[0]).toMatchObject({
      run: 0,
      effectValue: -550.94,
      pythonValue: -550.96916,
      threshold: 0.01,
    });
    expect(report.correctness[0]?.note).toContain("investigate");
    expect(report.stationarity[0]?.policy).toBe("output-first");
    expect(renderBenchmarkMarkdown(report)).toContain("## Output-first investigation flags");
  });

  it("flags output-first stationarity only when Effect is less stationary than Python", async () => {
    const better = await optimizerReport(
      withValues({ "stationarity-residual": 0.00154 }),
      withValues({ "stationarity-residual": 0.03019 }),
      outputFirst,
    );

    const worse = await optimizerReport(
      withValues({ "stationarity-residual": 0.04119 }),
      withValues({ "stationarity-residual": 0.03019 }),
      outputFirst,
    );

    expect(better.correctness[0]?.investigations).toEqual([]);
    expect(worse.correctness[0]?.status).toBe("passed");
    expect(worse.correctness[0]?.investigations?.map((item) => item.name)).toEqual([
      "stationarity-residual",
    ]);
  });

  it.each([
    { name: "objective", value: -550.99 },
    { name: "normalized-noise", value: 0.0021 },
    { name: "normalized-noise", value: 0 },
    { name: "stationarity-residual", value: -1 },
  ])("withholds timing for invalid or out-of-bound $name=$value", async ({ name, value }) => {
    const report = await optimizerReport(
      optimizerQualityEntries,
      optimizerQualityEntries.map((entry) => (entry.name === name ? { ...entry, value } : entry)),
      deferredStationarity,
    );

    expect(report.correctness[0]?.status).toBe("failed");
    expect(report.timings).toEqual([]);
  });

  it.each(["objective", "stationarity-residual", "normalized-noise"])(
    "requires exactly one %s diagnostic from each implementation",
    async (name) => {
      const missing = optimizerQualityEntries.filter((entry) => entry.name !== name);
      const entry = optimizerQualityEntries.find((item) => item.name === name);

      if (entry === undefined) throw new Error("Expected named diagnostic");

      for (const malformed of [missing, [...optimizerQualityEntries, entry]]) {
        for (const [left, right] of [
          [malformed, optimizerQualityEntries],
          [optimizerQualityEntries, malformed],
        ]) {
          const report = await optimizerReport(left ?? [], right ?? []);

          expect(report.correctness[0]?.status).toBe("failed");
          expect(report.timings).toEqual([]);
        }
      }
    },
  );

  it("rejects nonfinite diagnostic payloads at the result boundary", async () => {
    for (const value of [Number.NaN, Number.POSITIVE_INFINITY]) {
      const failure = await Effect.runPromise(
        Effect.flip(
          parseImplementationResult(
            optimizerResultInput(
              "effect-prophet",
              optimizerQualityEntries.map((entry) =>
                entry.name === "stationarity-residual" ? { ...entry, value } : entry,
              ),
            ),
          ),
        ),
      );

      expect(failure._tag).toBe("BenchmarkResultError");
    }
  });

  it.each([
    { policy: "deferred stationarity", quality: deferredStationarity },
    { policy: "output-first", quality: outputFirst },
  ])("does not bypass forecasts, metadata or persistence under $policy", async ({ quality }) => {
    if (optimizerCase === undefined) throw new Error("Expected frozen automatic linear case");

    const cases = await Effect.runPromise(
      parseBenchmarkCases([
        {
          ...optimizerCase,
          id: "fixed",
          independentRuns: 1,
          measuredIterations: 3,
          phases: ["warm-predict"],
          optimizerQuality: quality ?? optimizerCase.optimizerQuality,
        },
      ]),
    );

    const manifest = await Effect.runPromise(parseRunManifest(manifestInput));

    const effectResult = await Effect.runPromise(
      parseImplementationResult(optimizerResultInput("effect-prophet", optimizerQualityEntries)),
    );

    for (const mismatch of [
      { forecasts: [{ ...forecast, value: 20, trend: 20 }] },
      { modelKind: "unexpected" },
      { persistenceMaximumAbsoluteError: 1 },
      { run: 1 },
    ]) {
      const input = optimizerResultInput("python-prophet", optimizerQualityEntries);

      const pythonResult = await Effect.runPromise(
        parseImplementationResult({
          ...input,
          correctness: [{ ...input.correctness[0], ...mismatch }],
        }),
      );

      const report = buildBenchmarkReport(
        manifest,
        cases,
        effectResult,
        pythonResult,
        new Set([optimizerEvidence]),
      );

      expect(report.correctness[0]?.status).toBe("failed");
      expect(report.timings).toEqual([]);
    }
  });
});

describe("benchmark reporting", () => {
  it("requires country proof and pinned identity even when both adapters omit it", async () => {
    const snapshot = {
      snapshotId: `sha256:${"a".repeat(64)}`,
      prophet: "1.4.0",
      holidays: "0.104",
    };

    const proof: NonNullable<CorrectnessProjection["countryHolidays"]> = {
      country: "BV",
      coverage: "reject-known-gaps",
      priorScale: 10,
      provider: { prophet: "1.4.0", holidays: "0.104" },
      trainingYears: [2024],
      columns: [],
      trainingActivations: [],
      predictionActivations: [],
      ignoredPredictionNames: [],
    };

    const declarations = await Effect.runPromise(
      parseBenchmarkCases([
        {
          ...caseInput,
          calendarSnapshot: snapshot,
          workload: {
            kind: "map",
            comparison: { kind: "equivalent-objective", evidenceId: "country-calendar-public-v1" },
            configuration: {
              growth: "flat",
              scaling: "absmax",
              seasonalityMode: "additive",
              holidaysMode: "additive",
              changepoints: { mode: "explicit", timestamps: [] },
              changepointPriorScale: 0.05,
              seasonalities: [],
              events: [],
              regressors: [],
              countryHolidays: { country: "BV", coverage: "reject-known-gaps", priorScale: 10 },
            },
            pythonOptimizer: { algorithm: "Auto", maxIterations: 10000, newtonFallback: true },
          },
        },
      ]),
    );

    const manifest = await Effect.runPromise(parseRunManifest(manifestInput));
    const evidence = new Set(["country-calendar-public-v1"]);

    const result = async (
      implementation: "effect-prophet" | "python-prophet",
      metadata: Pick<
        CorrectnessProjection,
        "countryHolidays" | "calendarSnapshotId" | "eventColumnCount"
      >,
    ) => {
      const input = makeResultInput(implementation, 100);

      return Effect.runPromise(
        parseImplementationResult({
          ...input,
          measurements: input.measurements.map((entry) => ({
            ...entry,
            comparison: "equivalent-objective",
            evidenceId: "country-calendar-public-v1",
          })),
          correctness: [
            {
              ...correctness,
              modelKind: "flat-map",
              fitQuality: [{ name: "objective", value: 1 }],
              eventColumnCount: 0,
              serializedModelBytes: implementation === "effect-prophet" ? 2000 : 1000,
              ...metadata,
            },
          ],
        }),
      );
    };

    const python = await result("python-prophet", { countryHolidays: proof });

    const effect = await result("effect-prophet", {
      countryHolidays: proof,
      calendarSnapshotId: snapshot.snapshotId,
    });

    const passing = buildBenchmarkReport(manifest, declarations, effect, python, evidence);

    expect(passing.correctness[0], JSON.stringify(passing.correctness[0])).toMatchObject({
      status: "passed",
    });
    expect(passing.calendars[0]).toMatchObject({
      country: "BV",
      embedded: true,
      eventColumns: 0,
      effectModelBytes: 2000,
      pythonModelBytes: 1000,
    });
    expect(renderBenchmarkMarkdown(passing)).toContain("Effect model bytes");

    const omitted = buildBenchmarkReport(
      manifest,
      declarations,
      await result("effect-prophet", {}),
      await result("python-prophet", {}),
      evidence,
    );

    expect(omitted.correctness[0]?.status).toBe("failed");
    expect(omitted.timings).toEqual([]);

    for (const metadata of [
      { countryHolidays: proof, calendarSnapshotId: `sha256:${"b".repeat(64)}` },
      { countryHolidays: proof, calendarSnapshotId: snapshot.snapshotId, eventColumnCount: 1 },
      { countryHolidays: { ...proof, country: "US" }, calendarSnapshotId: snapshot.snapshotId },
      {
        countryHolidays: { ...proof, predictionActivations: [1] as const },
        calendarSnapshotId: snapshot.snapshotId,
      },
    ]) {
      const failed = buildBenchmarkReport(
        manifest,
        declarations,
        await result("effect-prophet", metadata),
        python,
        evidence,
      );

      expect(failed.correctness[0]?.status).toBe("failed");
      expect(failed.timings).toEqual([]);
    }
  });

  it("reports accepted absolute timings and native provenance without rankings", async () => {
    const [cases, manifest, effectResult, pythonResult] = await Promise.all([
      Effect.runPromise(parseBenchmarkCases([caseInput])),
      Effect.runPromise(parseRunManifest(manifestInput)),
      Effect.runPromise(parseImplementationResult(makeResultInput("effect-prophet", 10))),
      Effect.runPromise(parseImplementationResult(makeResultInput("python-prophet", 100))),
    ]);

    const report = buildBenchmarkReport(
      manifest,
      cases,
      effectResult,
      pythonResult,
      new Set(["fixed-v1"]),
    );

    const markdown = renderBenchmarkMarkdown(report);

    expect(report.correctness[0]?.status).toBe("passed");
    expect(report.correctness[0]?.note).toContain(
      "Verified equivalent behavior for this configuration",
    );
    expect(report.timings).toHaveLength(2);
    expect(markdown).toContain("Absolute timings");
    expect(markdown).toContain("native architecture");
    expect(markdown).toContain("Apple M4 Pro");
    expect(markdown.toLowerCase()).not.toContain("speedup");
    expect(markdown.toLowerCase()).not.toContain("winner");
  });

  it.each([
    { modelKind: "flat-map", status: "passed" },
    { modelKind: "linear-piecewise-map", status: "failed" },
  ])(
    "compares changepoints only when the trend uses them ($modelKind)",
    async ({ modelKind, status }) => {
      const withChangepoints = (
        implementation: "effect-prophet" | "python-prophet",
        changepointTimestamps: ReadonlyArray<number>,
      ) => {
        const input = makeResultInput(implementation, 10);

        return {
          ...input,
          correctness: input.correctness.map((entry) => ({
            ...entry,
            modelKind,
            changepointTimestamps,
          })),
        };
      };

      const [cases, manifest, effectResult, pythonResult] = await Promise.all([
        Effect.runPromise(parseBenchmarkCases([caseInput])),
        Effect.runPromise(parseRunManifest(manifestInput)),
        Effect.runPromise(parseImplementationResult(withChangepoints("effect-prophet", []))),
        Effect.runPromise(
          parseImplementationResult(withChangepoints("python-prophet", [1_704_067_200_000])),
        ),
      ]);

      const report = buildBenchmarkReport(
        manifest,
        cases,
        effectResult,
        pythonResult,
        new Set(["fixed-v1"]),
      );

      expect(report.correctness[0]?.status).toBe(status);
    },
  );

  it("suppresses all timings when a cross-language quantity fails", async () => {
    const [cases, manifest, effectResult] = await Promise.all([
      Effect.runPromise(parseBenchmarkCases([caseInput])),
      Effect.runPromise(parseRunManifest(manifestInput)),
      Effect.runPromise(parseImplementationResult(makeResultInput("effect-prophet", 10))),
    ]);

    const mismatched = makeResultInput("python-prophet", 100);
    const firstCorrectness = mismatched.correctness[0];

    if (firstCorrectness === undefined) {
      throw new Error("Expected correctness fixture");
    }

    firstCorrectness.forecasts[0] = { ...forecast, value: 4, trend: 4 };
    const pythonResult = await Effect.runPromise(parseImplementationResult(mismatched));

    const report = buildBenchmarkReport(
      manifest,
      cases,
      effectResult,
      pythonResult,
      new Set(["fixed-v1"]),
    );

    expect(report.correctness[0]?.status).toBe("failed");
    expect(report.timings).toEqual([]);
  });

  it("rejects mismatched multiplicative forecasts before accepting timings", async () => {
    const [cases, manifest, effectResult] = await Promise.all([
      Effect.runPromise(parseBenchmarkCases([caseInput])),
      Effect.runPromise(parseRunManifest(manifestInput)),
      Effect.runPromise(parseImplementationResult(makeResultInput("effect-prophet", 10))),
    ]);

    const mismatched = makeResultInput("python-prophet", 100);
    const projection = mismatched.correctness[0];

    if (projection === undefined) {
      throw new Error("Expected correctness fixture");
    }

    projection.forecasts[0] = { ...forecast, multiplicative: 0.1 };

    const pythonResult = await Effect.runPromise(parseImplementationResult(mismatched));

    const report = buildBenchmarkReport(
      manifest,
      cases,
      effectResult,
      pythonResult,
      new Set(["fixed-v1"]),
    );

    expect(report.correctness[0]?.status).toBe("failed");
    expect(report.timings).toEqual([]);
  });

  it("keeps uncertainty timings ineligible without matching reduction and replay evidence", async () => {
    const selected = uncertaintyCases[0];

    if (
      selected === undefined ||
      selected.workload.kind !== "map" ||
      selected.workload.uncertainty === undefined
    ) {
      throw new Error("Missing declared uncertainty case");
    }

    const [cases, manifest] = await Promise.all([
      Effect.runPromise(
        parseBenchmarkCases([{ ...selected, independentRuns: 1, measuredIterations: 3 }]),
      ),
      Effect.runPromise(parseRunManifest(manifestInput)),
    ]);

    const inputFor = (implementation: "effect-prophet" | "python-prophet") => ({
      ...makeResultInput(implementation, 100),
      correctness: [
        {
          ...correctness,
          caseId: selected.id,
          modelKind: "linear-piecewise-map",
          noiseScale: 0.2,
          fitQuality: optimizerQualityEntries,
        },
      ],
      measurements: [
        {
          ...makeResultInput(implementation, 100).measurements[0],
          caseId: selected.id,
          phase: "warm-uncertainty",
          comparison: "scalar-process-different-public-work",
          evidenceId: selected.workload.comparison.evidenceId,
          peakRssBytes: 100_000,
        },
      ],
    });

    const effectInput = inputFor("effect-prophet");
    const pythonInput = inputFor("python-prophet");
    const evidence = new Set([selected.workload.comparison.evidenceId]);

    const missing = buildBenchmarkReport(
      manifest,
      cases,
      await Effect.runPromise(parseImplementationResult(effectInput)),
      await Effect.runPromise(parseImplementationResult(pythonInput)),
      evidence,
    );

    expect(missing.correctness[0]?.status).toBe("failed");
    expect(missing.timings).toEqual([]);

    const intervals = Array.from({ length: 8 }, () => ({
      trendLower: 1,
      trendUpper: 1,
      valueLower: 0.5,
      valueUpper: 1.5,
    }));

    const checks = {
      algorithm: "scalar",
      output: selected.workload.uncertainty.output,
      rows: 8,
      samples: selected.workload.uncertainty.samples,
      replay: "passed",
      reduction: "passed",
      finite: "passed",
      intervals,
    };

    type Checks = Omit<typeof checks, "intervals"> & { readonly intervals?: typeof intervals };

    const reportWith = async (effectChecks: Checks, pythonChecks: Checks = checks) =>
      buildBenchmarkReport(
        manifest,
        cases,
        await Effect.runPromise(
          parseImplementationResult({
            ...effectInput,
            correctness: [{ ...effectInput.correctness[0], uncertainty: effectChecks }],
          }),
        ),
        await Effect.runPromise(
          parseImplementationResult({
            ...pythonInput,
            correctness: [{ ...pythonInput.correctness[0], uncertainty: pythonChecks }],
          }),
        ),
        evidence,
      );

    const accepted = await reportWith(checks);

    expect(accepted.correctness[0]?.status).toBe("passed");
    expect(accepted.correctness[0]?.comparison).toBe("scalar-process-different-public-work");
    expect(accepted.correctness[0]?.intervalBoundRatio).toBe(0);
    expect(accepted.timings).toHaveLength(2);
    expect(accepted.timings[0]?.peakRssBytes).toBe(100_000);

    const shifted = await reportWith({
      ...checks,
      intervals: intervals.map((row) => ({ ...row, valueUpper: 100 })),
    });

    expect(shifted.correctness[0]).toMatchObject({
      status: "failed",
      note: expect.stringContaining("interval bounds"),
    });
    expect(shifted.timings).toEqual([]);

    const { intervals: _omitted, ...withoutIntervals } = checks;
    const missingIntervals = await reportWith(withoutIntervals);

    expect(missingIntervals.correctness[0]?.note).toBe(
      "Uncertainty interval bounds are missing or misaligned.",
    );

    // Eight rows fit the sample budget, so they must be checked against reduced draws.
    const streamedSmall = await reportWith({ ...checks, reduction: "streamed" });

    expect(streamedSmall.correctness[0]?.status).toBe("failed");
  });

  it("passes anomaly cases only when both libraries flag the injected outliers consistently", async () => {
    const selected = anomalyCases[0];

    if (
      selected === undefined ||
      selected.workload.kind !== "map" ||
      selected.workload.uncertainty === undefined
    ) {
      throw new Error("Missing declared anomaly case");
    }

    const outlier = Date.UTC(2020, 0, 2);

    const [cases, manifest] = await Promise.all([
      Effect.runPromise(
        parseBenchmarkCases([
          {
            ...selected,
            workload: {
              ...selected.workload,
              anomalies: { expected: [new Date(outlier).toISOString()] },
            },
            independentRuns: 1,
          },
        ]),
      ),
      Effect.runPromise(parseRunManifest(manifestInput)),
    ]);

    const controls = selected.workload.uncertainty;

    const intervals = Array.from({ length: 4 }, () => ({
      trendLower: 1,
      trendUpper: 1,
      valueLower: 0.5,
      valueUpper: 1.5,
    }));

    const uncertainty = {
      algorithm: "scalar",
      output: controls.output,
      rows: 4,
      samples: controls.samples,
      replay: "passed",
      reduction: "passed",
      finite: "passed",
      intervals,
    };

    const row = (index: number, actual: number) => ({
      index,
      timestamp: Date.UTC(2020, 0, 1 + index),
      actual,
    });

    type Flags = {
      readonly rows: number;
      readonly ownIntervals: string;
      readonly flagged: ReadonlyArray<ReturnType<typeof row>>;
    };

    const flaggedOutlier: Flags = { rows: 4, ownIntervals: "passed", flagged: [row(1, 3)] };

    const inputFor = (
      implementation: "effect-prophet" | "python-prophet",
      anomalies: Flags | undefined,
      ownIntervals = intervals,
    ) => {
      const projection = {
        ...correctness,
        caseId: selected.id,
        modelKind: "linear-piecewise-map",
        noiseScale: 0.2,
        fitQuality: optimizerQualityEntries,
        uncertainty: { ...uncertainty, intervals: ownIntervals },
      };

      return {
        ...makeResultInput(implementation, 100),
        correctness: [anomalies === undefined ? projection : { ...projection, anomalies }],
        measurements: [
          {
            ...makeResultInput(implementation, 100).measurements[0],
            caseId: selected.id,
            phase: "warm-anomalies",
            comparison: "scalar-process-different-public-work",
            evidenceId: selected.workload.comparison.evidenceId,
          },
        ],
      };
    };

    const reportWith = async (
      effect: ReturnType<typeof inputFor>,
      python: ReturnType<typeof inputFor>,
    ) =>
      buildBenchmarkReport(
        manifest,
        cases,
        await Effect.runPromise(parseImplementationResult(effect)),
        await Effect.runPromise(parseImplementationResult(python)),
        new Set([selected.workload.comparison.evidenceId]),
      );

    const accepted = await reportWith(
      inputFor("effect-prophet", flaggedOutlier),
      inputFor("python-prophet", flaggedOutlier),
    );

    expect(accepted.correctness[0]).toMatchObject({
      status: "passed",
      anomalies: {
        expected: 1,
        effectFlagged: 1,
        pythonFlagged: 1,
        oneSided: 0,
        missedExpected: 0,
      },
      note: expect.stringContaining("flagged all 1 injected outliers"),
    });
    expect(accepted.timings.map((timing) => timing.phase)).toEqual([
      "warm-anomalies",
      "warm-anomalies",
    ]);

    // Row 2 sits between the two libraries' upper bounds, so only Effect flags it.
    const pythonIntervals = intervals.map((bounds, index) =>
      index === 2 ? { ...bounds, valueUpper: 1.55 } : bounds,
    );

    const oneSided = await reportWith(
      inputFor("effect-prophet", { ...flaggedOutlier, flagged: [row(1, 3), row(2, 1.52)] }),
      inputFor("python-prophet", flaggedOutlier, pythonIntervals),
    );

    expect(oneSided.correctness[0]).toMatchObject({
      status: "passed",
      anomalies: { effectFlagged: 2, pythonFlagged: 1, oneSided: 1 },
    });

    const missed = await reportWith(
      inputFor("effect-prophet", flaggedOutlier),
      inputFor("python-prophet", { ...flaggedOutlier, flagged: [] }),
    );

    expect(missed.correctness[0]).toMatchObject({
      status: "failed",
      note: expect.stringContaining("injected anomalies"),
    });
    expect(missed.timings).toEqual([]);

    // A flag inside its own interval contradicts strict exceedance.
    for (const [effect, python] of [
      [{ ...flaggedOutlier, flagged: [row(1, 3), row(3, 1)] }, flaggedOutlier],
      [flaggedOutlier, undefined],
    ]) {
      const rejected = await reportWith(
        inputFor("effect-prophet", effect),
        inputFor("python-prophet", python),
      );

      expect(rejected.correctness[0]).toMatchObject({
        status: "failed",
        note: "Anomaly flags are missing, misaligned, or not outside their own intervals.",
      });
    }
  });

  it("gates warm-start cases on both libraries' starting parameters", async () => {
    const [linear, flat] = [warmStartCases[0], warmStartCases[2]];

    if (linear === undefined || flat === undefined) {
      throw new Error("Missing declared warm-start cases");
    }

    const [cases, manifest] = await Promise.all([
      Effect.runPromise(
        parseBenchmarkCases([linear, flat].map((item) => ({ ...item, independentRuns: 1 }))),
      ),
      Effect.runPromise(parseRunManifest(manifestInput)),
    ]);

    const parameters = { k: 0.2, m: 0.4, sigmaObs: 0.05, delta: [0.01, -0.02], beta: [0.1, 0.2] };

    type Parameters = WarmStartParameters;

    const inputFor = (
      implementation: "effect-prophet" | "python-prophet",
      selected: BenchmarkCase,
      warmStart: Parameters | undefined,
    ) => {
      const projection = {
        ...correctness,
        caseId: selected.id,
        modelKind: "linear-piecewise-map",
        noiseScale: 0.2,
        fitQuality: optimizerQualityEntries,
      };

      const baseRows = selected.workload.kind === "map" ? selected.workload.warmStart?.baseRows : 0;

      return {
        ...makeResultInput(implementation, 100),
        correctness: [
          warmStart === undefined
            ? projection
            : { ...projection, warmStart: { baseRows, parameters: warmStart } },
        ],
        measurements: [
          {
            ...makeResultInput(implementation, 100).measurements[0],
            caseId: selected.id,
            phase: "warm-start-fit",
            comparison: "equivalent-objective",
            evidenceId: selected.workload.comparison.evidenceId,
          },
        ],
      };
    };

    const reportWith = async (
      selected: BenchmarkCase,
      effect: Parameters | undefined,
      python: Parameters | undefined,
    ) =>
      buildBenchmarkReport(
        manifest,
        cases.filter((item) => item.id === selected.id),
        await Effect.runPromise(
          parseImplementationResult(inputFor("effect-prophet", selected, effect)),
        ),
        await Effect.runPromise(
          parseImplementationResult(inputFor("python-prophet", selected, python)),
        ),
        new Set([selected.workload.comparison.evidenceId]),
      );

    const accepted = await reportWith(linear, { ...parameters, m: 0.4001 }, parameters);

    expect(accepted.correctness[0]).toMatchObject({
      status: "passed",
      warmStart: { baseRows: 226, maximumParameterDifference: expect.closeTo(1e-4, 12) },
      investigations: [],
      note: expect.stringContaining("own fit of the first 226 rows"),
    });
    expect(accepted.timings.map((timing) => timing.phase)).toEqual([
      "warm-start-fit",
      "warm-start-fit",
    ]);

    // Starting points further apart than the case allows are flagged; the refit's outputs gate.
    const apart = await reportWith(linear, { ...parameters, delta: [0.01, -0.05] }, parameters);

    expect(apart.correctness[0]).toMatchObject({
      status: "passed",
      investigations: [
        {
          name: "warm-start-parameters",
          effectValue: -0.05,
          pythonValue: -0.02,
          threshold: 0.01,
        },
      ],
    });
    expect(renderBenchmarkMarkdown(apart)).toContain("| warm-start-parameters |");

    // Flat models keep no rate state, so Effect's zero rate and empty deltas are not compared.
    const flatReport = await reportWith(flat, { ...parameters, k: 0, delta: [] }, parameters);

    expect(flatReport.correctness[0]).toMatchObject({
      status: "passed",
      warmStart: { maximumParameterDifference: 0 },
    });
    expect(flatReport.correctness[0]?.investigations).toBeUndefined();

    for (const [effect, python] of [
      [parameters, undefined],
      [{ ...parameters, beta: [0.1] }, parameters],
      [{ ...parameters, delta: [0.01] }, parameters],
    ] as const) {
      const rejected = await reportWith(linear, effect, python);

      expect(rejected.correctness[0]).toMatchObject({
        status: "failed",
        note: "Warm-start parameters are missing, misaligned, or shaped differently.",
      });
      expect(rejected.timings).toEqual([]);
    }
  });

  it("rejects metadata disagreement before accepting timing rows", async () => {
    const [cases, manifest, effectResult] = await Promise.all([
      Effect.runPromise(parseBenchmarkCases([caseInput])),
      Effect.runPromise(parseRunManifest(manifestInput)),
      Effect.runPromise(parseImplementationResult(makeResultInput("effect-prophet", 10))),
    ]);

    const mismatched = makeResultInput("python-prophet", 100);
    const firstCorrectness = mismatched.correctness[0];

    if (firstCorrectness === undefined) {
      throw new Error("Expected correctness fixture");
    }

    firstCorrectness.modelKind = "unexpected";
    const pythonResult = await Effect.runPromise(parseImplementationResult(mismatched));

    const report = buildBenchmarkReport(
      manifest,
      cases,
      effectResult,
      pythonResult,
      new Set(["fixed-v1"]),
    );

    expect(report.correctness[0]?.status).toBe("failed");
    expect(report.correctness[0]?.note).toContain("metadata");
    expect(report.timings).toEqual([]);
  });
});
