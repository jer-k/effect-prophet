import { Effect, Match } from "effect";
import { describe, expect, it } from "vitest";

import { prophetFittingBackendLayer } from "../src/internal/prophet-fitting-backend";
import { resolveSeasonalities } from "../src/internal/seasonality-resolution";
import { decodeObservations } from "../src/observation";
import { decodeOptions, type EncodedProphetOptions } from "../src/options";
import { fit, predict } from "../src/prophet";
import { planRollingOrigin } from "../src/evaluation";

const day = 86_400_000;

const epoch = Date.parse("2020-01-01T00:00:00.000Z");

const automatic = { yearly: "auto", weekly: "auto", daily: "auto" } as const;

const history = (count: number, spacing: number) =>
  Array.from({ length: count }, (_, index) => ({
    timestamp: new Date(epoch + index * spacing).toISOString(),
    value:
      20 + 0.15 * index + 2 * Math.sin((2 * Math.PI * index) / 7) + 0.13 * Math.cos(index * 1.731),
    capacity: 100,
  }));

describe("Python-default seasonality requests", () => {
  it.each(["linear", "flat", "logistic"] as const)(
    "defaults %s requests and partial controls to automatic",
    async (growth) => {
      const defaults = await Effect.runPromise(decodeOptions({ growth }));

      const partial = await Effect.runPromise(
        decodeOptions({ growth, builtInSeasonalities: { daily: "off" } }),
      );

      expect(defaults.builtInSeasonalities).toEqual(automatic);
      expect(partial.builtInSeasonalities).toEqual({
        ...automatic,
        daily: "off",
      });
    },
  );

  it.each([
    ["daily history", [0, day, 14 * day], ["weekly"]],
    ["weekly history", [0, 7 * day, 14 * day], []],
    ["irregular and duplicate history", [0, 0, day / 2, 14 * day, 14 * day], ["weekly", "daily"]],
    ["two-year history", [0, 730 * day], ["yearly"]],
  ] as const)("resolves omitted controls from %s", async (_label, offsets, expected) => {
    const observations = await Effect.runPromise(
      decodeObservations(
        offsets.map((offset, index) => ({
          timestamp: new Date(epoch + offset).toISOString(),
          value: index,
        })),
      ),
    );

    const options = await Effect.runPromise(decodeOptions({ growth: "logistic" }));
    const resolved = await Effect.runPromise(resolveSeasonalities(observations, options));
    expect(resolved.layout.components.map((component) => component.definition.name)).toEqual(
      expected,
    );
  });

  it.each([
    [64, day / 4, ["weekly", "daily"]],
    [732, day, ["yearly", "weekly"]],
  ] as const)(
    "fits omitted built-ins on %i rows at spacing %i",
    async (count, spacing, expected) => {
      const model = await Effect.runPromise(
        fit(history(count, spacing), {
          growth: "logistic",
          map: { optimizer: { maxIterations: 1 } },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      if (model.model !== "logistic-piecewise-map") throw new Error("Expected logistic MAP");
      expect(model.seasonalities.components.map((component) => component.definition.name)).toEqual(
        expected,
      );
      expect(
        model.seasonalities.components.map((component) => component.definition.fourierOrder),
      ).toEqual(expected.map((name) => ({ yearly: 10, weekly: 3, daily: 4 })[name]));
    },
  );

  it("uses full-history resolved seasons for Python's default CV initial window", async () => {
    const plan = await Effect.runPromise(
      planRollingOrigin(
        history(32, day),
        { growth: "logistic" },
        {
          horizonMs: 4 * day,
          cutoffs: { mode: "generated" },
        },
      ),
    );

    expect(plan.cutoffs).toEqual(
      [13, 15, 17, 19, 21, 23, 25, 27].map((index) => epoch + index * day),
    );
  });

  it.each(["linear", "flat", "logistic"] as const)(
    "fits %s growth-only requests exactly like explicit auto requests",
    async (growth) => {
      const observations = history(32, day).map((row) =>
        growth === "logistic" ? row : { timestamp: row.timestamp, value: row.value },
      );

      const requested: EncodedProphetOptions = Match.value(growth).pipe(
        Match.when("logistic", (growth) => ({ growth })),
        Match.when("flat", (growth) => ({ growth })),
        Match.when("linear", (growth) => ({ growth })),
        Match.exhaustive,
      );

      const implicit = await Effect.runPromise(
        fit(observations, requested).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      const explicit = await Effect.runPromise(
        fit(observations, {
          ...requested,
          builtInSeasonalities: automatic,
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(implicit).toEqual(explicit);

      if (implicit.model === "linear-trend") {
        throw new Error("Weekly history must use a seasonal model");
      }

      expect(
        implicit.seasonalities.components.map((component) => component.definition.name),
      ).toEqual(["weekly"]);

      const rows = history(35, day)
        .slice(32)
        .map((row) =>
          growth === "logistic"
            ? { timestamp: row.timestamp, capacity: row.capacity }
            : { timestamp: row.timestamp },
        );

      const forecasts = await Effect.runPromise(predict(implicit, rows));
      expect(forecasts.every((row) => Number.isFinite(row.value))).toBe(true);
    },
  );
});
