import { readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";
import { defaultLinearOptimizer } from "effect-prophet";
import { describe, expect, it } from "vitest";

import { outputFirstQuality } from "../../cases/prophet-defaults.ts";
import { loadCaseCatalog } from "../catalog.ts";

const ScenarioSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  capability: Schema.NonEmptyString,
  pythonCall: Schema.NonEmptyString,
  effectCall: Schema.NonEmptyString,
  comparison: Schema.Literals([
    "known-difference",
    "equivalent-equation",
    "equivalent-objective",
    "selection-policy",
    "input-policy",
  ]),
  timingCase: Schema.optionalKey(Schema.NonEmptyString),
  timingEligible: Schema.Boolean,
  pythonBehavior: Schema.optionalKey(Schema.NonEmptyString),
  effectBehavior: Schema.optionalKey(Schema.NonEmptyString),
  evidence: Schema.Array(Schema.NonEmptyString),
});

const ScenariosSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  scenarios: Schema.Array(ScenarioSchema),
});

describe("linear-growth benchmark scenario catalog", () => {
  it("fits every linear case with both libraries' default optimizers and the output-first policy", async () => {
    const catalog = await Effect.runPromise(loadCaseCatalog());

    const fitted = catalog.filter(
      (benchmarkCase) =>
        benchmarkCase.workload.kind === "linear-map" ||
        (benchmarkCase.workload.kind === "stage-f-map" &&
          benchmarkCase.workload.configuration.growth === "linear"),
    );

    expect(fitted.length).toBeGreaterThan(0);
    expect(catalog.some((benchmarkCase) => benchmarkCase.id.endsWith("-stan-v2"))).toBe(false);

    for (const benchmarkCase of fitted) {
      if (
        benchmarkCase.workload.kind === "fixed-linear-prediction" ||
        benchmarkCase.workload.kind === "evaluation"
      ) {
        throw new Error("Expected a fitted linear workload");
      }

      if (
        benchmarkCase.workload.kind === "stage-f-map" &&
        benchmarkCase.workload.fitRequest === "growth-only"
      ) {
        // Default probes pass no options at all, so neither library's settings are overridden.
        expect(benchmarkCase.workload.effectOptimizer).toBeUndefined();
        expect(benchmarkCase.workload.pythonOptimizer).toEqual({
          algorithm: "Auto",
          maxIterations: 10_000,
          newtonFallback: true,
        });
      } else {
        expect(benchmarkCase.workload.effectOptimizer).toEqual(defaultLinearOptimizer);
        expect(benchmarkCase.workload.pythonOptimizer).toEqual({
          algorithm: "Auto",
          maxIterations: 10_000,
          newtonFallback: true,
          sigFigs: 12,
        });
      }

      expect(benchmarkCase.workload.comparison.evidenceId).toBe("linear-output-first-v4");
      expect(benchmarkCase.optimizerQuality).toEqual(outputFirstQuality);
    }
  });

  it("keeps timing scenarios linked to declared public API cases", async () => {
    const scenarioBytes = await readFile(
      new URL("../../cases/growth/linear/scenarios.json", import.meta.url),
      "utf8",
    );

    const catalog = Schema.decodeUnknownSync(ScenariosSchema)(JSON.parse(scenarioBytes));

    const benchmarkCases = await Effect.runPromise(loadCaseCatalog());

    const benchmarkCaseIds = new Set(benchmarkCases.map((benchmarkCase) => benchmarkCase.id));
    const scenarioIds = new Set(catalog.scenarios.map((scenario) => scenario.id));

    expect(scenarioIds.size).toBe(catalog.scenarios.length);

    for (const scenario of catalog.scenarios) {
      if (scenario.timingEligible) {
        expect(scenario.timingCase).toBeDefined();
      }

      if (scenario.timingCase !== undefined) {
        expect(benchmarkCaseIds.has(scenario.timingCase)).toBe(true);
      }
    }
  });
});
