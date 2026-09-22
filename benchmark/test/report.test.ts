import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases } from "../case.ts";
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
