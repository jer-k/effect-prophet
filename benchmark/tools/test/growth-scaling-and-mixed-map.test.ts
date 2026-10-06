import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import { pathToFileURL } from "node:url";

import { Effect } from "effect";
import { defaultLinearOptimizer } from "effect-prophet";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";
import { growthScalingAndMixedMapCases } from "../../cases/growth/mixed-map.ts";
import { effectOptionsForCase } from "../effect-case.ts";
import { generateBenchmarkData } from "../generate-data.ts";

const evidencePath = new URL("../../evidence/comparisons.json", import.meta.url);

describe("growth, scaling, and mixed-component MAP benchmark workloads", () => {
  it("maps only supported, nonempty-point equivalent MAP cases to the public API", async () => {
    const cases = await Effect.runPromise(parseBenchmarkCases(growthScalingAndMixedMapCases));
    const evidence = JSON.parse(await readFile(evidencePath, "utf8"));
    const ids = new Set(evidence.evidence.map((entry: { id: string }) => entry.id));

    expect(cases).toHaveLength(11);

    for (const benchmarkCase of cases) {
      const workload = benchmarkCase.workload;
      expect(workload.kind).toBe("stage-f-map");

      if (workload.kind !== "stage-f-map") continue;

      expect(ids.has(workload.comparison.evidenceId)).toBe(true);
      expect(benchmarkCase.phases).toContain("fresh-process-restored-predict");
      expect(effectOptionsForCase(benchmarkCase)?.growth).toBe(workload.configuration.growth);

      if (workload.configuration.growth === "logistic") {
        const points = workload.configuration.changepoints;

        expect(points.mode === "auto" ? points.count : points.timestamps.length).toBeGreaterThan(0);
      }
    }
  });

  it("admits empty logistic points for investigation but rejects flat changepoints", async () => {
    const logistic = growthScalingAndMixedMapCases.find(
      (benchmarkCase) => benchmarkCase.id === "logistic-implicit-floor-auto-changepoints",
    );

    const flat = growthScalingAndMixedMapCases.find(
      (benchmarkCase) => benchmarkCase.id === "flat-mixed-components",
    );

    if (logistic?.workload.kind !== "stage-f-map" || flat?.workload.kind !== "stage-f-map") {
      throw new Error("Missing growth and mixed-component MAP cases");
    }

    const noPoints = await Effect.runPromise(
      parseBenchmarkCases([
        {
          ...logistic,
          workload: {
            ...logistic.workload,
            configuration: {
              ...logistic.workload.configuration,
              changepoints: { mode: "explicit", timestamps: [] },
            },
          },
        },
      ]).pipe(Effect.exit),
    );

    const flatOptimizer = await Effect.runPromise(
      parseBenchmarkCases([
        {
          ...flat,
          workload: {
            ...flat.workload,
            effectOptimizer: defaultLinearOptimizer,
          },
        },
      ]).pipe(Effect.exit),
    );

    const flatChangepoints = await Effect.runPromise(
      parseBenchmarkCases([
        {
          ...flat,
          workload: {
            ...flat.workload,
            configuration: {
              ...flat.workload.configuration,
              changepoints: { mode: "auto", count: 25, range: 0.8 },
            },
          },
        },
      ]).pipe(Effect.exit),
    );

    expect(noPoints._tag).toBe("Success");
    expect(flatOptimizer._tag).toBe("Success");
    expect(flatChangepoints._tag).toBe("Failure");
  });

  it("generates complete, deterministic shared growth and mixed-component rows", async () => {
    const directory = await mkdtemp(join(tmpdir(), "effect-prophet-benchmark-data-"));
    const outputRoot = pathToFileURL(`${directory}${sep}`);

    try {
      await Effect.runPromise(generateBenchmarkData(outputRoot));

      for (const benchmarkCase of growthScalingAndMixedMapCases) {
        const input = JSON.parse(
          await readFile(new URL(benchmarkCase.dataset.replace(/^v1\//u, ""), outputRoot), "utf8"),
        );

        const dataset = await Effect.runPromise(parseBenchmarkDataset(input));
        const workload = benchmarkCase.workload;

        if (workload.kind !== "stage-f-map") continue;

        expect(dataset.observations.length).toBeGreaterThan(20);
        expect(dataset.predictionRows.length).toBeGreaterThan(0);
        expect(dataset.observations.every((row) => Number.isFinite(row.value))).toBe(true);

        if (workload.configuration.growth === "logistic") {
          expect(
            [...dataset.observations, ...dataset.predictionRows].every(
              (row) => row.capacity !== undefined && row.capacity > (row.floor ?? 0),
            ),
          ).toBe(true);
          expect(
            dataset.predictionRows.every(
              (row) => (row.floor !== undefined) === benchmarkCase.id.includes("explicit"),
            ),
          ).toBe(true);
        }

        if (workload.configuration.regressors.length > 0) {
          expect(
            [...dataset.observations, ...dataset.predictionRows].every((row) =>
              workload.configuration.regressors.every(
                (regressor) => row.regressors?.[regressor.name] !== undefined,
              ),
            ),
          ).toBe(true);
        }
      }
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
