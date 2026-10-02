import { readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases } from "../case.ts";
import { linearGrowthEdgeCases } from "../cases/linear-growth/edge-cases.ts";
import { stanAlignedCases } from "../cases/linear-growth/stan-aligned.ts";

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
  it("changes only the declared stationarity acceptance, not the fitting problem or other bounds", async () => {
    const source = structuredClone(linearGrowthEdgeCases);

    const aligned = await Effect.runPromise(parseBenchmarkCases(stanAlignedCases(source)));

    const ordered = aligned.find(
      (benchmarkCase) => benchmarkCase.id === "map-training-ordered-auto-stan-v2",
    );

    const original = source.find(
      (benchmarkCase) => benchmarkCase.id === "map-training-ordered-auto",
    );

    if (
      ordered === undefined ||
      original === undefined ||
      ordered.workload.kind !== "stage-f-map" ||
      original.workload.kind !== "stage-f-map"
    ) {
      throw new Error("Expected ordered migration control");
    }

    expect(source).toEqual(linearGrowthEdgeCases);
    expect(ordered.dataset).toBe(original.dataset);
    expect(ordered.workload.configuration).toEqual(original.workload.configuration);
    expect(ordered.correctnessTolerances).toEqual(original.correctnessTolerances);
    expect(ordered.workload.effectOptimizer?.maxIterations).toBe(10_000);
    expect(ordered.workload.pythonOptimizer).toEqual({
      algorithm: "Auto",
      maxIterations: 10_000,
      newtonFallback: true,
      sigFigs: 12,
    });
    expect(ordered.workload.comparison.evidenceId).toBe("linear-stan-map-fit-quality-v3");
    expect(ordered.optimizerQuality).toEqual({
      objectiveAbsolute: 0.01,
      normalizedNoiseAbsolute: 0.0002,
      stationarity: { kind: "diagnostic-only", followUp: "EP-097" },
    });
  });

  it("keeps timing scenarios linked to declared public API cases", async () => {
    const [scenarioBytes, caseBytes] = await Promise.all([
      readFile(new URL("../cases/linear-growth/scenarios.json", import.meta.url), "utf8"),
      readFile(new URL("../cases/linear-growth/public-api.json", import.meta.url), "utf8"),
    ]);

    const catalog = Schema.decodeUnknownSync(ScenariosSchema)(JSON.parse(scenarioBytes));

    const benchmarkCases = await Effect.runPromise(
      parseBenchmarkCases([...JSON.parse(caseBytes), ...linearGrowthEdgeCases]),
    );

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
