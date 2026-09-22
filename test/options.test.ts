import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { emptyEventCalendar } from "../src/event";
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
      seasonalityMode: "additive",
      holidaysMode: "additive",
      seasonalities: [],
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
      events: emptyEventCalendar,
      regressors: [],
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
        seasonalityMode: "additive",
        holidaysMode: "additive",
        seasonalities: [],
        builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
        events: emptyEventCalendar,
        regressors: [],
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
      seasonalityMode: "additive",
      holidaysMode: "additive",
      seasonalities: [
        {
          name: "work-week",
          periodDays: 7,
          fourierOrder: 3,
          priorScale: 10,
          mode: "additive",
        },
      ],
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
      events: emptyEventCalendar,
      regressors: [],
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
      seasonalityMode: "additive",
      holidaysMode: "additive",
      seasonalities: [
        {
          name: "work-week",
          periodDays: 7,
          fourierOrder: 3,
          priorScale: 10,
          mode: "additive",
        },
        {
          name: "quarter",
          periodDays: 91.25,
          fourierOrder: 2,
          priorScale: 4,
          mode: "additive",
        },
      ],
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
      events: emptyEventCalendar,
      regressors: [],
    });
    expect(Object.isFrozen(options.seasonalities)).toBe(true);
  });

  it("resolves global modes and per-component overrides", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalityMode: "multiplicative",
        holidaysMode: "additive",
        seasonalities: [
          { name: "inherited", periodDays: 7, fourierOrder: 1 },
          { name: "override", periodDays: 3, fourierOrder: 1, mode: "additive" },
        ],
        events: [{ name: "launch", date: "2025-01-01" }],
        regressors: [
          { name: "inherited-regressor" },
          { name: "override-regressor", mode: "additive" },
        ],
      }),
    );

    expect(options.seasonalityMode).toBe("multiplicative");
    expect(options.holidaysMode).toBe("additive");
    expect(options.seasonalities.map((seasonality) => seasonality.mode)).toEqual([
      "multiplicative",
      "additive",
    ]);
    expect(options.events.mode).toBe("additive");
    expect(options.regressors.map((regressor) => regressor.mode)).toEqual([
      "multiplicative",
      "additive",
    ]);
  });

  it("lets holidays inherit the global seasonality mode", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalityMode: "multiplicative",
        events: [{ name: "launch", date: "2025-01-01" }],
      }),
    );

    expect(options.holidaysMode).toBe("multiplicative");
    expect(options.events.mode).toBe("multiplicative");
    expect(options.events.layout.components[0]?.mode).toBe("multiplicative");
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

  it("parses conditional seasonalities and enforces condition-name collisions", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalities: [
          {
            name: "weekly-on-season",
            periodDays: 7,
            fourierOrder: 2,
            conditionName: "onSeason",
          },
          {
            name: "daily-on-season",
            periodDays: 1,
            fourierOrder: 1,
            conditionName: "onSeason",
          },
        ],
      }),
    );

    expect(options.seasonalities.map((seasonality) => seasonality.conditionName)).toEqual([
      "onSeason",
      "onSeason",
    ]);

    for (const invalid of [
      {
        seasonalities: [
          {
            name: "onSeason",
            periodDays: 3,
            fourierOrder: 1,
          },
          {
            name: "weekly-on-season",
            periodDays: 7,
            fourierOrder: 1,
            conditionName: "onSeason",
          },
        ],
      },
      {
        seasonalities: [
          {
            name: "weekly-on-season",
            periodDays: 7,
            fourierOrder: 1,
            conditionName: "onSeason",
          },
        ],
        events: [{ name: "onSeason", date: "2025-01-01" }],
      },
      {
        seasonalities: [
          {
            name: "weekly-on-season",
            periodDays: 7,
            fourierOrder: 1,
            conditionName: "onSeason",
          },
        ],
        regressors: [{ name: "onSeason" }],
      },
    ]) {
      const error = await expectOptionsFailure(invalid);

      expect(error.issues.some((issue) => issue.message.includes("collides"))).toBe(true);
    }
  });

  it("parses ordered regressors and enforces global feature names", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        regressors: [
          { name: "price" },
          { name: "promotion", priorScale: 3, standardization: "never" },
        ],
      }),
    );

    expect(options.regressors).toEqual([
      { name: "price", priorScale: 10, standardization: "auto", mode: "additive" },
      { name: "promotion", priorScale: 3, standardization: "never", mode: "additive" },
    ]);
    expect(Object.isFrozen(options.regressors)).toBe(true);

    const error = await expectOptionsFailure({
      seasonalities: [{ name: "price", periodDays: 7, fourierOrder: 1 }],
      regressors: [{ name: "price" }],
    });

    expect(error.issues).toContainEqual({
      path: ["regressors", 0, "name"],
      message: "Feature name 'price' collides with a seasonality",
    });
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

  it("uses convergence controls suitable for nonlinear logistic MAP fits", async () => {
    const defaults = await Effect.runPromise(decodeOptions({ growth: "logistic" }));

    const partial = await Effect.runPromise(
      decodeOptions({
        growth: "logistic",
        map: {
          optimizer: { maxIterations: 250 },
        },
      }),
    );

    if (defaults.growth !== "logistic" || partial.growth !== "logistic") {
      throw new Error("Expected logistic options");
    }

    expect(defaults.map.optimizer).toEqual({
      maxIterations: 10_000,
      relativeTolerance: 1e-7,
      absoluteTolerance: 1e-9,
    });
    expect(partial.map.optimizer).toEqual({
      maxIterations: 250,
      relativeTolerance: 1e-7,
      absoluteTolerance: 1e-9,
    });
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

  it.each(["absmax", "minmax"] as const)("parses %s target scaling", async (scaling) => {
    const linear = await Effect.runPromise(decodeOptions({ scaling }));
    const flat = await Effect.runPromise(decodeOptions({ growth: "flat", scaling }));

    expect(linear.scaling).toBe(scaling);
    expect(flat.scaling).toBe(scaling);
  });

  it("rejects unknown target scaling before fitting", async () => {
    const error = await expectOptionsFailure({ scaling: "standardize" });

    expect(error.issues.some((issue) => issue.path?.includes("scaling"))).toBe(true);
  });

  it("rejects invalid growth values at the options boundary", async () => {
    const error = await expectOptionsFailure({ growth: "constant" });

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
