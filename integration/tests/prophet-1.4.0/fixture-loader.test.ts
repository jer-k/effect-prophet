import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  FixtureLoadError,
  decodeFixtureManifest,
  decodeLinearTrendReference,
  loadProphetFixtureBundle,
} from "../../helpers/prophet-fixture";

const validCase = () => ({
  id: "valid-case",
  kind: "fixed-linear-trend",
  observations: [
    { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
    { timestamp: "2024-01-02T00:00:00.000Z", value: 2 },
  ],
  predictionTimestamps: ["2024-01-03T00:00:00.000Z"],
  parameters: {
    intercept: 1,
    slope: 1,
    timeOrigin: 1_704_067_200_000,
    timeScale: 86_400_000,
  },
  expected: {
    scaledTrainingTimes: [0, 1],
    scaledPredictionTimes: [2],
    trend: [3],
  },
  tolerance: { absolute: 1e-12, relative: 1e-12 },
});

describe("Prophet fixture loader", () => {
  it("loads committed fixtures and verifies their digests", async () => {
    const bundle = await Effect.runPromise(loadProphetFixtureBundle());

    expect(bundle.manifest.prophetVersion).toBe("1.4.0");
    expect(bundle.linearTrend.cases.map((referenceCase) => referenceCase.id)).toEqual([
      "irregular-positive-extrapolation",
      "constant-negative-trend",
      "irregular-negative-slope",
    ]);
  });

  it("rejects misaligned expected arrays", async () => {
    const referenceCase = validCase();
    referenceCase.expected.trend = [];

    const error = await Effect.runPromise(
      Effect.flip(decodeLinearTrendReference({ cases: [referenceCase] })),
    );

    expect(error).toBeInstanceOf(FixtureLoadError);
    expect(error.operation).toBe("schema");
    expect(error.message).toContain("Trend values must align");
  });

  it("rejects negative tolerances", async () => {
    const referenceCase = validCase();
    referenceCase.tolerance.absolute = -1;

    const error = await Effect.runPromise(
      Effect.flip(decodeLinearTrendReference({ cases: [referenceCase] })),
    );

    expect(error).toBeInstanceOf(FixtureLoadError);
    expect(error.message).toContain("greater than or equal to 0");
  });

  it("rejects duplicate case IDs", async () => {
    const error = await Effect.runPromise(
      Effect.flip(decodeLinearTrendReference({ cases: [validCase(), validCase()] })),
    );

    expect(error).toBeInstanceOf(FixtureLoadError);
    expect(error.message).toContain("Reference case IDs must be unique");
  });

  it("rejects non-canonical timestamps", async () => {
    const referenceCase = validCase();
    referenceCase.predictionTimestamps = ["2024-01-03"];

    const error = await Effect.runPromise(
      Effect.flip(decodeLinearTrendReference({ cases: [referenceCase] })),
    );

    expect(error).toBeInstanceOf(FixtureLoadError);
    expect(error.message).toContain("canonical UTC timestamp");
  });

  it("rejects manifest paths that escape the fixture folder", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        decodeFixtureManifest({
          prophetVersion: "1.4.0",
          prophetSourceCommit: "abf69a215604afcaa7ecb4359f592d13bf6dea9f",
          pythonVersion: "3.12.11",
          generatorRevision: "a".repeat(64),
          dependencyLockSha256: "b".repeat(64),
          executionEnvironment: {
            baseImage: "python@example",
            platform: "linux/amd64",
            uvVersion: "0.8.15",
          },
          numericalEnvironment: [],
          backendArtifacts: [],
          artifacts: [{ path: "../linear-trend.json", sha256: "c".repeat(64) }],
        }),
      ),
    );

    expect(error).toBeInstanceOf(FixtureLoadError);
    expect(error.message).toContain("fixture-folder-relative path");
  });
});
