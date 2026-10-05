import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, type BenchmarkCase } from "../case.ts";
import { linearGrowthEdgeCases } from "../../cases/growth/linear/edge-cases.ts";
import { uncertaintyCases } from "../../cases/uncertainty/public-api.ts";
import { buildBenchmarkReport, renderBenchmarkMarkdown } from "../report.ts";
import { parseImplementationResult, parseRunManifest } from "../result.ts";

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
      selected.workload.kind !== "stage-f-map" ||
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

    const checks = {
      algorithm: "scalar",
      output: selected.workload.uncertainty.output,
      rows: 8,
      samples: selected.workload.uncertainty.samples,
      replay: "passed",
      reduction: "passed",
      finite: "passed",
    };

    const accepted = buildBenchmarkReport(
      manifest,
      cases,
      await Effect.runPromise(
        parseImplementationResult({
          ...effectInput,
          correctness: [{ ...effectInput.correctness[0], uncertainty: checks }],
        }),
      ),
      await Effect.runPromise(
        parseImplementationResult({
          ...pythonInput,
          correctness: [{ ...pythonInput.correctness[0], uncertainty: checks }],
        }),
      ),
      evidence,
    );

    expect(accepted.correctness[0]?.status).toBe("passed");
    expect(accepted.correctness[0]?.comparison).toBe("scalar-process-different-public-work");
    expect(accepted.timings).toHaveLength(2);
    expect(accepted.timings[0]?.peakRssBytes).toBe(100_000);
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
