import { readFile } from "node:fs/promises";

import { Cause, Effect, Exit, Predicate, Schema } from "effect";
import { fit, prophetFittingBackendLayer } from "effect-prophet";
import { describe, expect, it } from "vitest";

import { DifferentialCaseSchema } from "../differential.ts";
import { caseSeeds, generateCase } from "../differential-generate.ts";
import { effectOptionsForCase } from "../effect-case.ts";

const seeds = caseSeeds(60, 200);

const cases = seeds.map(generateCase);

describe("differential case generation", () => {
  it("regenerates the same case from the same seed", () => {
    expect(caseSeeds(60, 200)).toEqual(seeds);
    expect(new Set(seeds).size).toBe(200);

    for (const seed of seeds.slice(0, 20)) {
      expect(generateCase(seed)).toStrictEqual(generateCase(seed));
    }
  });

  it("writes cases that decode at the container boundary", () => {
    const decoded = Schema.decodeUnknownSync(Schema.Array(DifferentialCaseSchema))(
      JSON.parse(JSON.stringify(cases)),
    );

    expect(decoded).toEqual(cases);
  });

  it("covers every generated trait and growth across a default-sized run", () => {
    const labels = new Set(
      cases.flatMap((item) => [...item.traits, item.workload.configuration.growth]),
    );

    for (const label of [
      "linear",
      "flat",
      "logistic",
      "defaults",
      "hourly",
      "daily",
      "weekly",
      "short",
      "long",
      "gaps",
      "duplicates",
      "unsorted",
      "outliers",
      "noiseless",
      "minmax",
      "seasonalities",
      "conditional",
      "events",
      "regressors",
      "explicit-changepoints",
      "multiplicative",
      "floor",
      "ill-posed",
    ]) {
      expect(labels).toContain(label);
    }
  });

  it("gives every row the covariates its configuration requires", () => {
    for (const item of cases) {
      const configuration = item.workload.configuration;
      const regressorNames = configuration.regressors.map((regressor) => regressor.name).sort();
      const conditional = configuration.seasonalities.some((item) => item.conditionName);
      const rows = [...item.dataset.observations, ...item.dataset.predictionRows];

      for (const row of rows) {
        expect(Object.keys(row.regressors ?? {}).sort()).toEqual(regressorNames);
        expect(row.conditions !== undefined).toBe(conditional);

        if (configuration.growth === "logistic") {
          expect(row.capacity).toBeGreaterThan(row.floor ?? 0);
        } else {
          expect(row.capacity).toBeUndefined();
        }
      }

      const changepoints = configuration.changepoints;

      if (changepoints.mode === "explicit") {
        const times = item.dataset.observations.map((row) => Date.parse(row.timestamp));

        for (const timestamp of changepoints.timestamps) {
          expect(Date.parse(timestamp)).toBeGreaterThan(Math.min(...times));
          expect(Date.parse(timestamp)).toBeLessThan(Math.max(...times));
        }
      }
    }
  });

  it("generates inputs Effect accepts rather than rejecting during validation", async () => {
    for (const item of cases.slice(0, 12)) {
      const exit = await Effect.runPromiseExit(
        fit(item.dataset.observations, effectOptionsForCase(item)).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      );

      if (Exit.isFailure(exit)) {
        const rejected = exit.cause.reasons.some(
          (reason) =>
            Cause.isFailReason(reason) && Predicate.isTagged(reason.error, "InputValidationError"),
        );

        expect(rejected, `${item.id} was rejected as invalid input`).toBe(false);
      }
    }
  }, 60_000);

  it("matches the frozen cases the Prophet fixture generator pins Stan evidence for", async () => {
    const frozen: unknown = JSON.parse(
      await readFile(
        new URL("../../../tools/prophet/differential-cases.json", import.meta.url),
        "utf8",
      ),
    );

    const decoded = Schema.decodeUnknownSync(
      Schema.Struct({ cases: Schema.Array(DifferentialCaseSchema) }),
    )(frozen);

    expect(decoded.cases.length).toBeGreaterThan(0);

    for (const frozenCase of decoded.cases) {
      expect(frozenCase).toStrictEqual(generateCase(frozenCase.seed));
    }
  });
});
