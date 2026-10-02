import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import { pathToFileURL } from "node:url";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";
import { evaluationCases } from "../../cases/diagnostics/evaluation.ts";
import { flatGrowthCases } from "../../cases/growth/flat/public-api.ts";
import { growthScalingAndMixedMapCases } from "../../cases/growth/mixed-map.ts";
import { effectOptionsForCase } from "../effect-case.ts";
import { generateBenchmarkData } from "../generate-data.ts";

const loadDataset = async (root: URL, file: string) =>
  Effect.runPromise(parseBenchmarkDataset(JSON.parse(await readFile(new URL(file, root), "utf8"))));

describe("flat-growth reconciliation catalog", () => {
  it("parses unique flat cases without pretending to expose Effect flat optimizer controls", async () => {
    const cases = await Effect.runPromise(parseBenchmarkCases(flatGrowthCases));

    expect(cases).toHaveLength(20);
    expect(new Set(cases.map((item) => item.id)).size).toBe(cases.length);

    for (const item of cases) {
      expect(effectOptionsForCase(item)?.growth).toBe("flat");

      if (item.workload.kind === "stage-f-map" || item.workload.kind === "evaluation") {
        expect(item.workload.effectOptimizer).toBeUndefined();
        expect(item.workload.configuration.changepoints).toEqual({
          mode: "explicit",
          timestamps: [],
        });
      }
    }

    await Effect.runPromise(
      parseBenchmarkCases([
        ...growthScalingAndMixedMapCases,
        ...evaluationCases,
        ...flatGrowthCases,
      ]),
    );
  });

  it("uses canonical evaluation cases without duplicates and covers both constant scaling modes", () => {
    const evaluations = evaluationCases.filter(
      (item) =>
        item.workload.kind === "evaluation" && item.workload.configuration.growth === "flat",
    );

    expect(evaluations.map(({ id }) => id)).toEqual([
      "evaluation-flat-mixed-point",
      "evaluation-flat-mixed-intervals",
      "evaluation-flat-mixed-search",
      "evaluation-flat-large-point",
      "evaluation-flat-large-intervals",
    ]);

    expect(flatGrowthCases.some(({ id }) => id.endsWith("-absmax-control"))).toBe(false);
    expect(flatGrowthCases.some(({ id }) => id === "flat-constant-minmax")).toBe(true);
    expect(flatGrowthCases.some(({ id }) => id === "flat-constant-absmax")).toBe(true);
    expect(flatGrowthCases.some(({ workload }) => workload.kind === "evaluation")).toBe(false);
  });

  it("uses exact source prefixes and target-free assessment rows without rewriting original recipes", async () => {
    const directory = await mkdtemp(join(tmpdir(), "effect-prophet-flat-catalog-"));
    const root = pathToFileURL(`${directory}${sep}`);

    try {
      await Effect.runPromise(generateBenchmarkData(root));

      for (const source of ["flat-mixed-components", "flat-mixed-components-large"]) {
        const original = await loadDataset(root, `${source}.json`);
        const counts = source.endsWith("large") ? [225, 232] : [63, 70, 77];

        for (const count of counts) {
          const prefix = await loadDataset(root, `${source}-prefix-${count}.json`);

          expect(prefix.observations).toEqual(original.observations.slice(0, count));
          expect(prefix.predictionRows).toEqual(
            original.observations.slice(count, count + 7).map((row) => ({
              timestamp: row.timestamp,
              conditions: row.conditions,
              regressors: row.regressors,
            })),
          );
          expect(prefix.predictionRows.every((row) => !Object.hasOwn(row, "value"))).toBe(true);
        }
      }

      for (const item of flatGrowthCases) {
        await loadDataset(root, item.dataset.replace("v1/", ""));
      }

      const before = await readFile(new URL("manifest.json", root), "utf8");
      await Effect.runPromise(generateBenchmarkData(root));
      expect(await readFile(new URL("manifest.json", root), "utf8")).toBe(before);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
