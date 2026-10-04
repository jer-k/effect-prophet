import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import { pathToFileURL } from "node:url";

import { Effect, Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { logisticReconciliationCases } from "../../cases/growth/logistic/public-api.ts";
import { parseBenchmarkCases } from "../case.ts";
import { effectOptionsForCase } from "../effect-case.ts";
import { generateBenchmarkData, logisticReconciliationDatasets } from "../generate-data.ts";
import { loadInputDataset } from "../inputs.ts";

const parsedCases = () => Effect.runPromise(parseBenchmarkCases(logisticReconciliationCases));

describe("logistic Python reconciliation catalog", () => {
  it("admits defaults, empty points, and omitted controls rather than excluding differences", async () => {
    const cases = await parsedCases();
    expect(cases).toHaveLength(28);

    for (const item of cases) {
      if (item.workload.kind !== "stage-f-map") throw new Error("Expected Stage F workload");
      expect(item.workload.pythonOptimizer).toEqual({
        algorithm: "Auto",
        maxIterations: 10_000,
        newtonFallback: true,
        sigFigs: 12,
      });
      expect(item.workload.effectOptimizer).toBeUndefined();
      expect(item.phases).toContain("fresh-process-restored-predict");
      expect(item.optimizerQuality).toEqual({
        kind: "output-first",
        investigate: {
          objectiveAbsolute: 0.01,
          normalizedNoiseAbsolute: 0.0002,
          stationarityExcess: 0.01,
        },
      });

      const options = effectOptionsForCase(item);

      if (options?.growth !== "logistic") throw new Error("Expected logistic public options");

      if (item.workload.fitRequest === "growth-only") {
        expect(options).toEqual({ growth: "logistic" });
      } else {
        expect(options?.map).toMatchObject({
          changepoints: item.workload.configuration.changepoints,
        });
        expect(options?.map?.optimizer).toBeUndefined();
      }
    }

    expect(cases.filter((item) => item.id.includes("empty-"))).toHaveLength(4);
    expect(cases.filter((item) => item.id.includes("defaults-"))).toHaveLength(2);
  });

  it("ties the defaults-256 solver oracle to the unchanged weekly dataset and gates", async () => {
    const item = (await parsedCases()).find((candidate) => candidate.id.endsWith("defaults-256"));

    if (item === undefined) throw new Error("Missing defaults-256 case");

    const fixture = Schema.decodeUnknownSync(
      Schema.fromJsonString(
        Schema.Struct({
          cases: Schema.NonEmptyArray(
            Schema.Struct({
              id: Schema.String,
              sourceDataset: Schema.Struct({ path: Schema.String, sha256: Schema.String }),
              maxIterations: Schema.Finite,
            }),
          ),
          tolerances: Schema.Struct({
            fitObjectiveAbsolute: Schema.Finite,
            normalizedNoiseAbsolute: Schema.Finite,
          }),
        }),
      ),
    )(
      await readFile(
        new URL(
          "../../../integration/fixtures/prophet-1.4.0/stan-logistic-lbfgs.json",
          import.meta.url,
        ),
        "utf8",
      ),
    );

    const oracle = fixture.cases[0];
    const bytes = await readFile(new URL(`../../inputs/${item.dataset}`, import.meta.url));

    expect(oracle.id).toBe(item.id);
    expect(oracle.sourceDataset.path).toBe(`benchmark/inputs/${item.dataset}`);
    expect(oracle.sourceDataset.sha256).toBe(createHash("sha256").update(bytes).digest("hex"));
    expect(oracle.maxIterations).toBe(10_000);
    const quality = item.optimizerQuality;

    if (quality === undefined || !("kind" in quality)) {
      throw new Error("Expected output-first logistic fit quality");
    }

    // The numerical regression asserts what the public case only flags for investigation.
    expect(fixture.tolerances.fitObjectiveAbsolute).toBe(quality.investigate.objectiveAbsolute);
    expect(fixture.tolerances.normalizedNoiseAbsolute).toBe(
      quality.investigate.normalizedNoiseAbsolute,
    );
  });

  it("rejects hidden overrides in growth-only requests", async () => {
    const item = (await parsedCases()).find((candidate) => candidate.id.endsWith("defaults-96"));

    if (item?.workload.kind !== "stage-f-map") throw new Error("Missing default case");

    for (const configuration of [
      { ...item.workload.configuration, scaling: "minmax" },
      { ...item.workload.configuration, changepoints: { mode: "explicit", timestamps: [] } },
    ]) {
      const result = await Effect.runPromise(
        parseBenchmarkCases([{ ...item, workload: { ...item.workload, configuration } }]).pipe(
          Effect.exit,
        ),
      );

      expect(Exit.isFailure(result)).toBe(true);
    }
  });

  it("freezes complete v2 rows/checksums and leaves v1 bytes unchanged", async () => {
    const directory = await mkdtemp(join(tmpdir(), "logistic-inputs-"));
    const v1Manifest = await readFile(new URL("../../inputs/v1/manifest.json", import.meta.url));
    const root = pathToFileURL(`${join(directory, "v2")}${sep}`);

    try {
      await Effect.runPromise(generateBenchmarkData(root, logisticReconciliationDatasets));
      const manifest = await readFile(new URL("manifest.json", root));
      expect(await readFile(new URL("../../inputs/v2/manifest.json", import.meta.url))).toEqual(
        manifest,
      );

      await Effect.runPromise(generateBenchmarkData(root, logisticReconciliationDatasets));
      expect(await readFile(new URL("manifest.json", root))).toEqual(manifest);

      for (const item of await parsedCases()) {
        const { dataset, bytes, sha256 } = await Effect.runPromise(
          loadInputDataset(directory, item),
        );

        expect(sha256).toBe(createHash("sha256").update(bytes).digest("hex"));
        expect(await readFile(new URL(`../../inputs/${item.dataset}`, import.meta.url))).toEqual(
          bytes,
        );
        expect(dataset.predictionRows.length).toBe(dataset.observations.length + 24);
        expect(dataset.predictionRows.every((row) => row.capacity !== undefined)).toBe(true);
        expect(dataset.observations.every((row) => Number.isFinite(row.value))).toBe(true);
      }

      expect(await readFile(new URL("../../inputs/v1/manifest.json", import.meta.url))).toEqual(
        v1Manifest,
      );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("retains endpoint duplicates, reversed source order and the 99/100 boundary", () => {
    const dataset = (variant: string) => {
      const found = logisticReconciliationDatasets.find((item) => item.id === variant);

      if (found === undefined) throw new Error(`Missing dataset ${variant}`);

      return found;
    };

    expect(dataset("logistic-basic-99").observations).toHaveLength(99);
    expect(dataset("logistic-basic-100").observations).toHaveLength(100);
    expect(
      Date.parse(dataset("logistic-unsorted-96").observations[0]?.timestamp ?? ""),
    ).toBeGreaterThan(
      Date.parse(dataset("logistic-unsorted-96").observations.at(-1)?.timestamp ?? ""),
    );

    const duplicates = dataset("logistic-duplicates-96").observations.slice(-2);
    expect(duplicates[0]?.timestamp).toBe(duplicates[1]?.timestamp);
    expect(duplicates[0]?.value).not.toBe(duplicates[1]?.value);
    const outside = dataset("logistic-out-of-bounds-96").observations;
    expect(outside[0]?.value).toBeLessThan(0);
    expect(outside.at(-1)?.value).toBeGreaterThan(outside.at(-1)?.capacity ?? Number.NaN);
  });
});
