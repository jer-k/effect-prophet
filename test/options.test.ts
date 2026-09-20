import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  decodeOptions,
  defaultAutomaticMapOptions,
  defaultProphetOptions,
  type EncodedProphetOptions,
} from "../src/index";

const expectOptionsFailure = async (input: Parameters<typeof decodeOptions>[0]) => {
  const error = await Effect.runPromise(Effect.flip(decodeOptions(input)));

  expect(error).toBeInstanceOf(InputValidationError);
  expect(error._tag).toBe("InputValidationError");
  expect(error.input).toBe("options");

  return error;
};

describe("decodeOptions", () => {
  it("applies defaults when options are omitted", async () => {
    const options = await Effect.runPromise(decodeOptions());

    expect(options).toEqual(defaultProphetOptions);
    expect(options).toEqual({
      growth: "linear",
      seasonalities: [],
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
    });
  });

  it("applies defaults to an empty options object", async () => {
    const options = await Effect.runPromise(decodeOptions({}));

    expect(options).toEqual(defaultProphetOptions);
  });

  it.each(["flat", "linear"] as const)(
    "accepts supported featureless %s growth",
    async (growth) => {
      const options = await Effect.runPromise(decodeOptions({ growth }));

      expect(options).toEqual({
        growth,
        seasonalities: [],
        builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
      });
    },
  );

  it("represents supported public configurations as a union", () => {
    const flat: EncodedProphetOptions = { growth: "flat" };
    const linear: EncodedProphetOptions = {};

    const additive: EncodedProphetOptions = {
      seasonalities: [{ name: "work-week", periodDays: 7, fourierOrder: 3 }],
    };

    const flatAdditive: EncodedProphetOptions = {
      growth: "flat",
      seasonalities: [{ name: "work-week", periodDays: 7, fourierOrder: 3 }],
    };

    expect([flat, linear, additive, flatAdditive]).toHaveLength(4);
  });

  it("accepts and parses flat seasonalities", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        growth: "flat",
        seasonalities: [{ name: "work-week", periodDays: 7, fourierOrder: 3 }],
      }),
    );

    expect(options).toEqual({
      growth: "flat",
      seasonalities: [{ name: "work-week", periodDays: 7, fourierOrder: 3, priorScale: 10 }],
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
    });
  });

  it("parses ordered explicit seasonalities and applies prior defaults", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalities: [
          { name: "work-week", periodDays: 7, fourierOrder: 3 },
          { name: "quarter", periodDays: 91.25, fourierOrder: 2, priorScale: 4 },
        ],
      }),
    );

    expect(options).toEqual({
      growth: "linear",
      seasonalities: [
        { name: "work-week", periodDays: 7, fourierOrder: 3, priorScale: 10 },
        { name: "quarter", periodDays: 91.25, fourierOrder: 2, priorScale: 4 },
      ],
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
    });
    expect(Object.isFrozen(options.seasonalities)).toBe(true);
  });

  it("defines automatic additive MAP defaults separately from explicit map decoding", () => {
    expect(defaultAutomaticMapOptions).toEqual({
      changepoints: { mode: "auto", count: 25, range: 0.8 },
      changepointPriorScale: 0.05,
      optimizer: {
        maxIterations: 10_000,
        relativeTolerance: 1e-10,
        absoluteTolerance: 1e-12,
      },
    });
    expect(Object.isFrozen(defaultAutomaticMapOptions)).toBe(true);
  });

  it("parses explicit and automatic linear MAP controls", async () => {
    const explicit = await Effect.runPromise(
      decodeOptions({
        map: {
          changepoints: {
            mode: "explicit",
            timestamps: ["2024-01-02T00:00:00.000Z"],
          },
        },
      }),
    );

    const automatic = await Effect.runPromise(
      decodeOptions({ map: { changepoints: { mode: "auto" } } }),
    );

    expect(explicit).toMatchObject({
      map: {
        changepoints: { mode: "explicit", timestamps: [1_704_153_600_000] },
        changepointPriorScale: 0.05,
        optimizer: {
          maxIterations: 10_000,
          relativeTolerance: 1e-10,
          absoluteTolerance: 1e-12,
        },
      },
    });
    expect(automatic).toMatchObject({
      map: { changepoints: { mode: "auto", count: 25, range: 0.8 } },
    });
    expect("map" in explicit && Object.isFrozen(explicit.map)).toBe(true);
  });

  it.each([
    [
      "duplicate explicit points",
      { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z", "2024-01-02T00:00:00.000Z"] },
    ],
    ["invalid automatic count", { mode: "auto", count: -1 }],
    ["invalid automatic range", { mode: "auto", range: 0 }],
  ])("rejects %s", async (_label, changepoints) => {
    const error = await expectOptionsFailure({ map: { changepoints } });

    expect(error.issues.some((issue) => issue.path?.includes("changepoints"))).toBe(true);
  });

  it("rejects linear MAP options with flat growth", async () => {
    const error = await expectOptionsFailure({ growth: "flat", map: {} });

    expect(error.issues).toContainEqual({
      path: ["map"],
      message: "Linear MAP options require linear growth",
    });
  });

  it("parses built-in controls and applies per-component defaults", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        builtInSeasonalities: {
          daily: "auto",
          weekly: { mode: "on", priorScale: 2 },
          yearly: { mode: "on", fourierOrder: 6 },
        },
      }),
    );

    expect(options.builtInSeasonalities).toEqual({
      daily: "auto",
      weekly: { mode: "on", fourierOrder: 3, priorScale: 2 },
      yearly: { mode: "on", fourierOrder: 6, priorScale: 10 },
    });
    expect(Object.isFrozen(options.builtInSeasonalities)).toBe(true);
    expect(Object.isFrozen(options.builtInSeasonalities.weekly)).toBe(true);
  });

  it.each([
    ["unknown setting", { daily: "sometimes" }, "daily"],
    ["unknown key", { hourly: "auto" }, "hourly"],
    ["zero order", { weekly: { mode: "on", fourierOrder: 0 } }, "fourierOrder"],
    ["fractional order", { weekly: { mode: "on", fourierOrder: 1.5 } }, "fourierOrder"],
    ["invalid prior", { yearly: { mode: "on", priorScale: 0 } }, "priorScale"],
    ["unknown on key", { daily: { mode: "on", extra: true } }, "extra"],
  ])("rejects %s in built-in controls", async (_label, builtInSeasonalities, path) => {
    const error = await expectOptionsFailure({ builtInSeasonalities });

    expect(error.issues.some((issue) => issue.path?.includes(path))).toBe(true);
  });

  it("reports nested seasonality failures at option-relative paths", async () => {
    const error = await expectOptionsFailure({
      seasonalities: [
        { name: "duplicate", periodDays: 7, fourierOrder: 1 },
        { name: "duplicate", periodDays: 30, fourierOrder: 2 },
      ],
    });

    expect(error.issues).toContainEqual({
      message: expect.stringContaining("duplicated"),
      path: ["seasonalities", 1, "name"],
    });
  });

  it("rejects invalid growth values at the options boundary", async () => {
    const error = await expectOptionsFailure({ growth: "logistic" });

    expect(error.issues).toContainEqual({
      message: expect.stringContaining("flat"),
      path: ["growth"],
    });
  });

  it("rejects unknown options rather than silently dropping them", async () => {
    const error = await expectOptionsFailure({ seasonality: true });

    expect(error.issues).toContainEqual({
      message: "Expected no excess property",
      path: ["seasonality"],
    });
  });
});
