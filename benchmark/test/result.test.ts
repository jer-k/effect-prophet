import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseImplementationResult } from "../result.ts";

const environment = {
  runtime: "node",
  runtimeVersion: "v26",
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

const correctness = {
  caseId: "case-a",
  run: 0,
  status: "locally-passed",
  modelKind: "linear-piecewise-map",
  changepointTimestamps: [1_704_067_200_000],
  seasonalities: [{ name: "weekly", conditionName: "active" }],
  events: [
    {
      name: "launch",
      dates: ["2024-01-01"],
      lowerWindowDays: -1,
      upperWindowDays: 1,
      priorScale: 10,
    },
  ],
  regressors: [
    {
      name: "promotion",
      priorScale: 10,
      standardization: "never",
      transform: { mode: "identity", reason: "disabled" },
      coefficient: 2,
      center: 0,
    },
  ],
  forecasts: [
    {
      timestamp: 1_704_153_600_000,
      value: 5,
      trend: 3,
      additive: 2,
      seasonalities: [{ name: "weekly", value: 0 }],
      events: [{ name: "launch", value: 0 }],
      regressors: [{ name: "promotion", value: 2 }],
    },
  ],
  noiseScale: 0.1,
  fitQuality: [{ name: "objective", value: 1 }],
  persistenceMaximumAbsoluteError: 0,
};

describe("benchmark result parsing", () => {
  it("retains raw samples and complete structured correctness", async () => {
    const result = await Effect.runPromise(
      parseImplementationResult({
        schemaVersion: 1,
        implementation: "effect-prophet",
        generatedAt: "2024-01-01T00:00:00.000Z",
        environment,
        measurements: [
          {
            caseId: "case-a",
            implementation: "effect-prophet",
            phase: "fresh-process-restored-predict",
            comparison: "equivalent-objective",
            evidenceId: "feature-map-v1",
            run: 0,
            samplesNanoseconds: [10, 20, 30],
            correctness: "locally-passed",
          },
        ],
        failures: [],
        correctness: [correctness],
      }),
    );

    expect(result.measurements[0]?.samplesNanoseconds).toEqual([10, 20, 30]);
    expect(result.correctness[0]?.forecasts[0]?.regressors).toEqual([
      { name: "promotion", value: 2 },
    ]);
  });

  it("rejects successful measurements without samples", async () => {
    const result = await Effect.runPromise(
      parseImplementationResult({
        schemaVersion: 1,
        implementation: "effect-prophet",
        generatedAt: "2024-01-01T00:00:00.000Z",
        environment,
        measurements: [
          {
            caseId: "case-a",
            implementation: "effect-prophet",
            phase: "warm-predict",
            comparison: "equivalent-objective",
            evidenceId: "feature-map-v1",
            run: 0,
            samplesNanoseconds: [],
            correctness: "locally-passed",
          },
        ],
        failures: [],
        correctness: [correctness],
      }).pipe(Effect.exit),
    );

    expect(result._tag).toBe("Failure");
  });
});
