import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";

const loadCases = async () => {
  const input: unknown = JSON.parse(
    await readFile(new URL("../cases/public-api.json", import.meta.url), "utf8"),
  );

  return Effect.runPromise(parseBenchmarkCases(input));
};

const GeneratedManifestSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  files: Schema.Array(
    Schema.Struct({
      file: Schema.String,
      recipe: Schema.String,
      sha256: Schema.String,
    }),
  ),
});

const loadDataset = async (file: string) => {
  const input: unknown = JSON.parse(
    await readFile(new URL(`../data/${file}`, import.meta.url), "utf8"),
  );

  return Effect.runPromise(parseBenchmarkDataset(input));
};

describe("generated feature benchmark data", () => {
  it("matches required row and feature shapes with complete future rows", async () => {
    const cases = await loadCases();

    const expected = new Map([
      ["map-events-small", { n: 96, h: 28, ks: 0, ka: 6 }],
      ["map-regressors-medium", { n: 256, h: 64, ks: 0, ka: 4 }],
      ["map-conditional-seasonalities-medium", { n: 256, h: 64, ks: 12, ka: 0 }],
      ["map-mixed-features-automatic-large", { n: 768, h: 128, ks: 10, ka: 10 }],
    ]);

    for (const [id, expectedCounts] of expected) {
      const benchmarkCase = cases.find((candidate) => candidate.id === id);

      if (benchmarkCase === undefined || benchmarkCase.workload.kind !== "linear-map") {
        throw new Error(`Expected linear MAP case ${id}`);
      }

      const dataset = await loadDataset(benchmarkCase.dataset);
      const configuration = benchmarkCase.workload.configuration;

      const ks = configuration.seasonalities.reduce(
        (count, seasonality) => count + seasonality.fourierOrder * 2,
        0,
      );

      const eventColumns = new Set(
        configuration.events.flatMap((event) =>
          Array.from(
            { length: event.upperWindowDays - event.lowerWindowDays + 1 },
            (_, offset) => `${event.name}:${event.lowerWindowDays + offset}`,
          ),
        ),
      ).size;

      const ka = eventColumns + configuration.regressors.length;

      expect(dataset.observations).toHaveLength(expectedCounts.n);
      expect(dataset.predictionRows).toHaveLength(expectedCounts.h);
      expect(ks).toBe(expectedCounts.ks);
      expect(ka).toBe(expectedCounts.ka);

      for (const row of dataset.predictionRows) {
        expect(Object.keys(row.regressors ?? {})).toHaveLength(configuration.regressors.length);

        const conditionNames = new Set(
          configuration.seasonalities.flatMap((seasonality) =>
            seasonality.conditionName === undefined ? [] : [seasonality.conditionName],
          ),
        );

        expect(Object.keys(row.conditions ?? {})).toHaveLength(conditionNames.size);
      }
    }
  });

  it("retains future event occurrences, overlaps, and dense/sparse masks", async () => {
    const cases = await loadCases();
    const eventCase = cases.find((candidate) => candidate.id === "map-events-small");

    const conditionCase = cases.find(
      (candidate) => candidate.id === "map-conditional-seasonalities-medium",
    );

    if (
      eventCase === undefined ||
      eventCase.workload.kind !== "linear-map" ||
      conditionCase === undefined ||
      conditionCase.workload.kind !== "linear-map"
    ) {
      throw new Error("Expected event and conditional-seasonality cases");
    }

    const eventConfiguration = eventCase.workload.configuration;
    const eventDataset = await loadDataset(eventCase.dataset);
    const lastTraining = Date.parse(eventDataset.observations.at(-1)?.timestamp ?? "");

    const futureEvents = eventConfiguration.events.filter(
      (event) => Date.parse(`${event.date}T00:00:00.000Z`) > lastTraining,
    );

    const activeNames = (timestamp: string): ReadonlyArray<string> => {
      const day = Date.parse(timestamp) / 86_400_000;

      return Array.from(
        new Set(
          eventConfiguration.events
            .filter((event) => {
              const eventDay = Date.parse(`${event.date}T00:00:00.000Z`) / 86_400_000;

              return (
                day >= eventDay + event.lowerWindowDays && day <= eventDay + event.upperWindowDays
              );
            })
            .map((event) => event.name),
        ),
      );
    };

    expect(futureEvents.length).toBeGreaterThanOrEqual(2);
    expect(
      [...eventDataset.observations, ...eventDataset.predictionRows].some(
        (row) => activeNames(row.timestamp).length === 2,
      ),
    ).toBe(true);

    const conditionDataset = await loadDataset(conditionCase.dataset);

    const denseCount = conditionDataset.observations.filter(
      (row) => row.conditions?.dense === true,
    ).length;

    const sparseCount = conditionDataset.observations.filter(
      (row) => row.conditions?.sparse === true,
    ).length;

    expect(denseCount).toBeGreaterThan(sparseCount);
    expect(sparseCount).toBeGreaterThan(0);
  });

  it("records stable recipe identities and hashes for every generated dataset", async () => {
    const manifestInput: unknown = JSON.parse(
      await readFile(new URL("../data/generated/manifest.json", import.meta.url), "utf8"),
    );

    const manifest = Schema.decodeUnknownSync(GeneratedManifestSchema)(manifestInput);

    for (const entry of manifest.files) {
      const contents = await readFile(new URL(`../data/generated/${entry.file}`, import.meta.url));

      const dataset = await Effect.runPromise(
        parseBenchmarkDataset(JSON.parse(contents.toString())),
      );

      expect(createHash("sha256").update(contents).digest("hex")).toBe(entry.sha256);
      expect(dataset.recipe).toBe(entry.recipe);
    }
  });
});
