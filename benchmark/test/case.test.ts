import { readFile } from "node:fs/promises";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";

const tolerances = {
  trend: { absolute: 0.001, relative: 0.001 },
  component: { absolute: 0.001, relative: 0.001 },
  additive: { absolute: 0.001, relative: 0.001 },
  forecast: { absolute: 0.001, relative: 0.001 },
  noiseScale: { absolute: 0.001, relative: 0.001 },
  persistence: { absolute: 1e-10, relative: 0 },
};

const validCase = {
  id: "fixed",
  dataset: "generated/linear-medium.json",
  workload: {
    kind: "fixed-linear-prediction",
    comparison: { kind: "equivalent-equation", evidenceId: "fixed-v1" },
    parameters: { intercept: 1, slope: 2, timeOrigin: 1, timeScale: 1 },
  },
  phases: ["warm-predict"],
  warmupIterations: 1,
  measuredIterations: 2,
  independentRuns: 1,
  timeoutSeconds: 60,
  correctnessTolerances: tolerances,
};

const omittedMapCase = {
  ...validCase,
  id: "automatic",
  workload: {
    kind: "linear-map",
    comparison: { kind: "equivalent-objective", evidenceId: "automatic-v1" },
    configuration: {
      effectMap: "omitted",
      changepoints: { mode: "auto", count: 25, range: 0.8 },
      changepointPriorScale: 0.05,
      seasonalities: [
        {
          name: "weekly-on",
          periodDays: 7,
          fourierOrder: 3,
          priorScale: 10,
          conditionName: "active",
        },
      ],
      events: [],
      regressors: [],
    },
    effectOptimizer: {
      maxIterations: 10_000,
      relativeTolerance: 1e-10,
      absoluteTolerance: 1e-12,
    },
    pythonOptimizer: {
      algorithm: "LBFGS",
      maxIterations: 10_000,
      newtonFallback: false,
    },
  },
  phases: ["warm-fit", "fresh-process-restored-predict"],
};

describe("benchmark case parsing", () => {
  it("parses equivalent cases and the omitted-map automatic defaults", async () => {
    const cases = await Effect.runPromise(parseBenchmarkCases([validCase, omittedMapCase]));

    expect(cases.map((benchmarkCase) => benchmarkCase.id)).toEqual(["fixed", "automatic"]);
  });

  it("rejects duplicate ids and dataset traversal", async () => {
    const duplicate = await Effect.runPromise(
      parseBenchmarkCases([validCase, validCase]).pipe(Effect.exit),
    );

    const traversal = await Effect.runPromise(
      parseBenchmarkCases([{ ...validCase, id: "traversal", dataset: "../secret.json" }]).pipe(
        Effect.exit,
      ),
    );

    expect(duplicate._tag).toBe("Failure");
    expect(traversal._tag).toBe("Failure");
  });

  it("rejects omitted map with non-default Python changepoints", async () => {
    const invalid = {
      ...omittedMapCase,
      workload: {
        ...omittedMapCase.workload,
        configuration: {
          ...omittedMapCase.workload.configuration,
          changepoints: { mode: "auto", count: 10, range: 0.8 },
        },
      },
    };

    const result = await Effect.runPromise(parseBenchmarkCases([invalid]).pipe(Effect.exit));

    expect(result._tag).toBe("Failure");
  });

  it("contains every feature workload and no different-objective branch", async () => {
    const input: unknown = JSON.parse(
      await readFile(new URL("../cases/public-api.json", import.meta.url), "utf8"),
    );

    const cases = await Effect.runPromise(parseBenchmarkCases(input));
    const ids = new Set(cases.map((benchmarkCase) => benchmarkCase.id));

    for (const id of [
      "map-events-small",
      "map-regressors-medium",
      "map-conditional-seasonalities-medium",
      "map-mixed-features-explicit-small",
      "map-mixed-features-automatic-large",
    ]) {
      expect(ids.has(id)).toBe(true);
    }

    expect(JSON.stringify(cases)).not.toContain("different-objective");
  });
});

describe("benchmark dataset parsing", () => {
  it("requires strictly ordered observations", async () => {
    const result = await Effect.runPromise(
      parseBenchmarkDataset({
        id: "unordered",
        recipe: "test-v1",
        observations: [
          { timestamp: "2024-01-02T00:00:00.000Z", value: 2 },
          { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
        ],
        predictionRows: [],
      }).pipe(Effect.exit),
    );

    expect(result._tag).toBe("Failure");
  });

  it("parses complete future regressor and condition rows", async () => {
    const dataset = await Effect.runPromise(
      parseBenchmarkDataset({
        id: "complete",
        recipe: "test-v1",
        observations: [
          {
            timestamp: "2024-01-01T00:00:00.000Z",
            value: 1,
            regressors: { promotion: 0 },
            conditions: { active: false },
          },
          {
            timestamp: "2024-01-02T00:00:00.000Z",
            value: 2,
            regressors: { promotion: 1 },
            conditions: { active: true },
          },
        ],
        predictionRows: [
          {
            timestamp: "2024-01-03T00:00:00.000Z",
            regressors: { promotion: 1 },
            conditions: { active: true },
          },
        ],
      }),
    );

    expect(dataset.predictionRows[0]?.regressors?.promotion).toBe(1);
    expect(dataset.predictionRows[0]?.conditions?.active).toBe(true);
  });
});
