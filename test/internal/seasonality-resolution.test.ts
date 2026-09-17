import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { resolveSeasonalities } from "../../src/internal/seasonality-resolution";
import { decodeObservations } from "../../src/observation";
import { decodeOptions, type EncodedBuiltInSeasonalities } from "../../src/options";

const DAY = 86_400_000;

const epoch = Date.parse("2020-01-01T00:00:00.000Z");

const resolve = async (
  offsets: ReadonlyArray<number>,
  builtInSeasonalities: EncodedBuiltInSeasonalities,
  seasonalities: ReadonlyArray<{
    readonly name: string;
    readonly periodDays: number;
    readonly fourierOrder: number;
    readonly priorScale?: number;
  }> = [],
) => {
  const observations = await Effect.runPromise(
    decodeObservations(
      offsets.map((offset, index) => ({
        timestamp: new Date(epoch + offset).toISOString(),
        value: index,
      })),
    ),
  );

  const options = await Effect.runPromise(
    decodeOptions({
      builtInSeasonalities,
      seasonalities,
    }),
  );

  return Effect.runPromise(resolveSeasonalities(observations, options));
};

const onlyAuto = (name: "daily" | "weekly" | "yearly"): EncodedBuiltInSeasonalities => ({
  daily: name === "daily" ? "auto" : "off",
  weekly: name === "weekly" ? "auto" : "off",
  yearly: name === "yearly" ? "auto" : "off",
});

const decisionFor = (
  resolved: Awaited<ReturnType<typeof resolve>>,
  name: "daily" | "weekly" | "yearly",
) => resolved.decisions.find((decision) => decision.name === name);

describe("seasonality resolution", () => {
  it.each([
    ["daily", 2, DAY / 2],
    ["weekly", 14, DAY],
    ["yearly", 730, 730 * DAY],
  ] as const)("applies the exact %s history threshold", async (name, days, cadence) => {
    const belowOffsets = name === "yearly" ? [0, days * DAY - 1] : [0, cadence, days * DAY - 1];
    const exactOffsets = name === "yearly" ? [0, days * DAY] : [0, cadence, days * DAY];
    const aboveOffsets = name === "yearly" ? [0, days * DAY + 1] : [0, cadence, days * DAY + 1];

    const below = await resolve(belowOffsets, onlyAuto(name));
    const exact = await resolve(exactOffsets, onlyAuto(name));
    const above = await resolve(aboveOffsets, onlyAuto(name));

    expect(decisionFor(below, name)).toEqual({
      name,
      enabled: false,
      reason: "insufficient-history",
    });
    expect(decisionFor(exact, name)).toEqual({
      name,
      enabled: true,
      reason: "automatic-enabled",
    });
    expect(decisionFor(above, name)).toEqual({
      name,
      enabled: true,
      reason: "automatic-enabled",
    });
  });

  it.each([
    ["daily", DAY, 2 * DAY],
    ["weekly", 7 * DAY, 14 * DAY],
  ] as const)(
    "requires the minimum %s gap to be strictly below its period",
    async (name, gap, span) => {
      const exact = await resolve([0, gap, span], onlyAuto(name));
      const justBelow = await resolve([0, gap - 1, span], onlyAuto(name));

      expect(decisionFor(exact, name)).toEqual({
        name,
        enabled: false,
        reason: "sampling-too-sparse",
      });
      expect(decisionFor(justBelow, name)).toEqual({
        name,
        enabled: true,
        reason: "automatic-enabled",
      });
    },
  );

  it("uses minimum positive gap rather than average cadence for irregular histories", async () => {
    const resolved = await resolve([0, DAY / 2, 20 * DAY], {
      daily: "auto",
      weekly: "auto",
      yearly: "off",
    });

    expect(decisionFor(resolved, "daily")?.enabled).toBe(true);
    expect(decisionFor(resolved, "weekly")?.enabled).toBe(true);
  });

  it("handles one-point, daily-only, weekly-only, and subdaily histories", async () => {
    const onePoint = await resolve([0], { daily: "auto", weekly: "auto", yearly: "auto" });

    const dailyOnly = await resolve(
      Array.from({ length: 15 }, (_, index) => index * DAY),
      { daily: "auto", weekly: "auto", yearly: "off" },
    );

    const weeklyOnly = await resolve([0, 7 * DAY, 14 * DAY], {
      daily: "auto",
      weekly: "auto",
      yearly: "off",
    });

    const subdaily = await resolve([0, DAY / 2, 2 * DAY], {
      daily: "auto",
      weekly: "off",
      yearly: "off",
    });

    expect(onePoint.decisions.every((decision) => !decision.enabled)).toBe(true);
    expect(decisionFor(dailyOnly, "daily")?.reason).toBe("sampling-too-sparse");
    expect(decisionFor(dailyOnly, "weekly")?.reason).toBe("automatic-enabled");
    expect(decisionFor(weeklyOnly, "daily")?.reason).toBe("sampling-too-sparse");
    expect(decisionFor(weeklyOnly, "weekly")?.reason).toBe("sampling-too-sparse");
    expect(decisionFor(subdaily, "daily")?.reason).toBe("automatic-enabled");
  });

  it("lets explicit controls bypass history and override order and prior", async () => {
    const resolved = await resolve([0], {
      yearly: { mode: "on", fourierOrder: 6, priorScale: 2 },
      weekly: { mode: "on" },
      daily: "off",
    });

    expect(resolved.decisions).toEqual([
      { name: "yearly", enabled: true, reason: "explicitly-enabled" },
      { name: "weekly", enabled: true, reason: "explicitly-enabled" },
      { name: "daily", enabled: false, reason: "explicitly-disabled" },
    ]);
    expect(resolved.layout.components.map((component) => component.definition)).toEqual([
      { name: "yearly", periodDays: 365.25, fourierOrder: 6, priorScale: 2 },
      { name: "weekly", periodDays: 7, fourierOrder: 3, priorScale: 10 },
    ]);
  });

  it("keeps custom order, allows overlapping periods, then appends built-ins", async () => {
    const resolved = await resolve(
      [0, DAY / 2, 14 * DAY],
      { yearly: "off", weekly: "auto", daily: "auto" },
      [
        { name: "weekly-custom", periodDays: 7, fourierOrder: 1 },
        { name: "daily-custom", periodDays: 1, fourierOrder: 2, priorScale: 4 },
      ],
    );

    expect(resolved.layout.components.map((component) => component.definition.name)).toEqual([
      "weekly-custom",
      "daily-custom",
      "weekly",
      "daily",
    ]);
    expect(resolved.layout.coefficientCount).toBe(2 + 4 + 6 + 8);
    expect(Object.isFrozen(resolved.decisions)).toBe(true);
    expect(Object.isFrozen(resolved.layout)).toBe(true);
  });
});
