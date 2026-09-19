import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases } from "./case.ts";
import { buildBenchmarkReport, renderBenchmarkMarkdown } from "./report.ts";
import { parseImplementationResult, parseRunManifest } from "./result.ts";

const environment = {
  runtime: "test",
  runtimeVersion: "1",
  operatingSystem: "linux",
  architecture: "x64",
  processor: "test-cpu",
  containerPlatform: "linux/amd64",
  versions: [],
  artifactHashes: [],
  numericalThreads: [],
  resources: [],
  memoryMeasurement: "unsupported",
};

const forecast = {
  timestamp: 1_704_067_200_000,
  value: 3,
  trend: 3,
  additive: 0,
  seasonalities: [],
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
  correctness: [
    {
      caseId: "fixed",
      run: 0,
      status: "locally-passed",
      modelKind: "linear-trend",
      forecasts: [forecast],
      persistenceMaximumAbsoluteError: 0,
    },
  ],
});

describe("benchmark reporting", () => {
  it("reports accepted absolute timings without speedup language", async () => {
    const [cases, manifest, effectResult, pythonResult] = await Promise.all([
      Effect.runPromise(
        parseBenchmarkCases([
          {
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
            correctnessTolerance: { absolute: 1e-9, relative: 1e-9 },
          },
        ]),
      ),
      Effect.runPromise(
        parseRunManifest({
          schemaVersion: 1,
          runId: "test-run",
          createdAt: "2024-01-01T00:00:00.000Z",
          gitRevision: "abc123",
          gitDirty: false,
          hostPlatform: "linux",
          hostArchitecture: "x64",
          containerPlatform: "linux/amd64",
          emulated: false,
          selectedCases: ["fixed"],
          commands: ["docker compose run"],
          inputHashes: [],
          containerImages: [],
        }),
      ),
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
    expect(report.timings).toHaveLength(2);
    expect(markdown).toContain("Absolute timings");
    expect(markdown.toLowerCase()).not.toContain("speedup");
    expect(markdown.toLowerCase()).not.toContain("winner");
  });

  it("suppresses timings when equivalent projections fail correctness", async () => {
    const cases = await Effect.runPromise(
      parseBenchmarkCases([
        {
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
          correctnessTolerance: { absolute: 1e-9, relative: 1e-9 },
        },
      ]),
    );

    const manifest = await Effect.runPromise(
      parseRunManifest({
        schemaVersion: 1,
        runId: "test-run",
        createdAt: "2024-01-01T00:00:00.000Z",
        gitRevision: "abc123",
        gitDirty: false,
        hostPlatform: "linux",
        hostArchitecture: "x64",
        containerPlatform: "linux/amd64",
        emulated: false,
        selectedCases: ["fixed"],
        commands: [],
        inputHashes: [],
        containerImages: [],
      }),
    );

    const effectResult = await Effect.runPromise(
      parseImplementationResult(makeResultInput("effect-prophet", 10)),
    );

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
});
