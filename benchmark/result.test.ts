import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseImplementationResult } from "./result.ts";

const environment = {
  runtime: "node",
  runtimeVersion: "v26",
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

describe("benchmark result parsing", () => {
  it("retains raw samples and structured correctness", async () => {
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
            comparison: "equivalent-equation",
            evidenceId: "fixed-v1",
            run: 0,
            samplesNanoseconds: [10, 20, 30],
            correctness: "locally-passed",
          },
        ],
        failures: [],
        correctness: [
          {
            caseId: "case-a",
            run: 0,
            status: "locally-passed",
            modelKind: "linear-trend",
            forecasts: [],
            persistenceMaximumAbsoluteError: 0,
          },
        ],
      }),
    );

    expect(result.measurements[0]?.samplesNanoseconds).toEqual([10, 20, 30]);
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
            comparison: "different-objective",
            run: 0,
            samplesNanoseconds: [],
            correctness: "locally-passed",
          },
        ],
        failures: [],
        correctness: [],
      }).pipe(Effect.exit),
    );

    expect(result._tag).toBe("Failure");
  });
});
