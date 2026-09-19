import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "./case.ts";

const validCase = {
  id: "linear-small",
  dataset: "generated/linear-small.json",
  workload: {
    kind: "linear-fit",
    comparison: {
      kind: "different-objective",
      effectObjective: "ols",
      pythonObjective: "map",
      explanation: "The fitting objectives differ.",
    },
  },
  phases: ["warm-fit"],
  warmupIterations: 1,
  measuredIterations: 2,
  independentRuns: 1,
  timeoutSeconds: 60,
  correctnessTolerance: { absolute: 0.001, relative: 0.001 },
};

describe("benchmark case parsing", () => {
  it("parses a valid case contract", async () => {
    const cases = await Effect.runPromise(parseBenchmarkCases([validCase]));

    expect(cases).toHaveLength(1);
    expect(cases[0]?.id).toBe("linear-small");
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

  it("rejects an equivalent-objective no-changepoint MAP case", async () => {
    const result = await Effect.runPromise(
      parseBenchmarkCases([
        {
          ...validCase,
          id: "invalid-map",
          workload: {
            kind: "explicit-linear-map",
            comparison: { kind: "equivalent-objective", evidenceId: "unsupported" },
            configuration: {
              changepointTimestamps: [],
              changepointPriorScale: 0.05,
              seasonalities: [],
            },
            effectOptimizer: {
              maxIterations: 100,
              relativeTolerance: 1e-8,
              absoluteTolerance: 1e-10,
            },
            pythonOptimizer: {
              algorithm: "Newton",
              maxIterations: 100,
              newtonFallback: false,
            },
          },
        },
      ]).pipe(Effect.exit),
    );

    expect(result._tag).toBe("Failure");
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
        predictionTimestamps: [],
      }).pipe(Effect.exit),
    );

    expect(result._tag).toBe("Failure");
  });
});
