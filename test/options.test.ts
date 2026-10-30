import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { emptyEventCalendar } from "../src/event";
import { defaultLinearOptimizer } from "../src/linear-optimizer";
import {
  CountryHolidayError,
  decodeOptions,
  defaultAutomaticMapOptions,
  defaultProphetOptions,
  type EncodedProphetOptions,
} from "../src/index";
import { expectInputValidationError } from "./helpers/input-validation-error";

const expectOptionsFailure = async (input: Parameters<typeof decodeOptions>[0]) => {
  const error = expectInputValidationError(
    await Effect.runPromise(Effect.flip(decodeOptions(input))),
  );

  expect(error._tag).toBe("InputValidationError");
  expect(error.input).toBe("options");

  return error;
};

describe("decodeOptions", () => {
  it.each([
    [{ country: "NA-X" }, "unknown-country"],
    [{ country: "US", priorScale: 0 }, "invalid-selection"],
    [{ country: "US", subdivision: "CA" }, "invalid-selection"],
  ] as const)("fails country selection %j with CountryHolidayError", async (selection, reason) => {
    const error = await Effect.runPromise(
      Effect.flip(decodeOptions(JSON.parse(JSON.stringify({ countryHolidays: selection })))),
    );

    expect(error).toBeInstanceOf(CountryHolidayError);
    expect(error).toMatchObject({ reason, coverageIssues: [] });
  });

  it("applies defaults when options are omitted", async () => {
    const options = await Effect.runPromise(decodeOptions());

    expect(options).toEqual(defaultProphetOptions);
    expect(options).toEqual({
      growth: "linear",
      seasonalityMode: "additive",
      holidaysMode: "additive",
      seasonalityPriorScale: 10,
      holidaysPriorScale: 10,
      seasonalities: [],
      builtInSeasonalities: { daily: "auto", weekly: "auto", yearly: "auto" },
      events: emptyEventCalendar,
      regressors: [],
      regressorModels: [],
      map: defaultAutomaticMapOptions,
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

      const expected = {
        growth,
        seasonalityMode: "additive",
        holidaysMode: "additive",
        seasonalityPriorScale: 10,
        holidaysPriorScale: 10,
        seasonalities: [],
        builtInSeasonalities: { daily: "auto", weekly: "auto", yearly: "auto" },
        events: emptyEventCalendar,
        regressors: [],
        regressorModels: [],
      };

      const { optimizer: _optimizer, ...flatMap } = defaultAutomaticMapOptions;

      expect(options).toEqual({
        ...expected,
        map: growth === "linear" ? defaultAutomaticMapOptions : flatMap,
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
      seasonalityPriorScale: 10,
      holidaysPriorScale: 10,
      seasonalities: [
        {
          name: "work-week",
          periodDays: 7,
          fourierOrder: 3,
          priorScale: 10,
          mode: "additive",
        },
      ],
      builtInSeasonalities: { daily: "auto", weekly: "auto", yearly: "auto" },
      events: emptyEventCalendar,
      regressors: [],
      regressorModels: [],
      map: {
        changepoints: defaultAutomaticMapOptions.changepoints,
        changepointPriorScale: defaultAutomaticMapOptions.changepointPriorScale,
      },
    });
  });

  it("parses ordered explicit seasonalities and applies prior defaults", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalities: [
          { name: "work-week", periodDays: 7, fourierOrder: 3 },
          {
            name: "quarter",
            periodDays: 91.25,
            fourierOrder: 2,
            priorScale: 4,
          },
        ],
      }),
    );

    expect(options).toEqual({
      growth: "linear",
      seasonalityMode: "additive",
      holidaysMode: "additive",
      seasonalityPriorScale: 10,
      holidaysPriorScale: 10,
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
      builtInSeasonalities: { daily: "auto", weekly: "auto", yearly: "auto" },
      events: emptyEventCalendar,
      regressors: [],
      regressorModels: [],
      map: defaultAutomaticMapOptions,
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
          {
            name: "override",
            periodDays: 3,
            fourierOrder: 1,
            mode: "additive",
          },
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
      optimizer: defaultLinearOptimizer,
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
      {
        name: "price",
        priorScale: 10,
        standardization: "auto",
        mode: "additive",
      },
      {
        name: "promotion",
        priorScale: 3,
        standardization: "never",
        mode: "additive",
      },
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

  it.each(["linear", "logistic"] as const)(
    "keeps automatic changepoints when %s MAP controls are partial",
    async (growth) => {
      for (const map of [
        {},
        { changepointPriorScale: 0.5 },
        { optimizer: { maxIterations: 250 } },
      ]) {
        const options = await Effect.runPromise(decodeOptions({ growth, map }));

        if (options.growth === "flat") throw new Error("Expected a MAP trend request");

        expect(options.map.changepoints).toEqual({ mode: "auto", count: 25, range: 0.8 });
        expect(Object.isFrozen(options.map.changepoints)).toBe(true);
      }

      const disabled = await Effect.runPromise(
        decodeOptions({ growth, map: { changepoints: { mode: "explicit", timestamps: [] } } }),
      );

      expect(disabled).toMatchObject({
        map: { changepoints: { mode: "explicit", timestamps: [] } },
      });
    },
  );

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
        optimizer: defaultLinearOptimizer,
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
      {
        mode: "explicit",
        timestamps: ["2024-01-02T00:00:00.000Z", "2024-01-02T00:00:00.000Z"],
      },
    ],
    ["invalid automatic count", { mode: "auto", count: -1 }],
    ["invalid automatic range", { mode: "auto", range: 0 }],
  ])("rejects %s", async (_label, changepoints) => {
    const error = await expectOptionsFailure({ map: { changepoints } });

    expect(error.issues.some((issue) => issue.path?.includes("changepoints"))).toBe(true);
  });

  it("uses shared Stan controls for logistic MAP fits", async () => {
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

    expect(defaults.map.optimizer).toEqual(defaultLinearOptimizer);
    expect(partial.map.optimizer).toEqual({
      ...defaultLinearOptimizer,
      maxIterations: 250,
    });
  });

  it("accepts Prophet's changepoint options with flat growth", async () => {
    const configured = await Effect.runPromise(
      decodeOptions({
        growth: "flat",
        map: { changepoints: { mode: "explicit", timestamps: [] }, changepointPriorScale: 0.5 },
      }),
    );

    if (configured.growth !== "flat") {
      throw new Error("Expected flat options");
    }

    expect(configured.map).toEqual({
      changepoints: { mode: "explicit", timestamps: [] },
      changepointPriorScale: 0.5,
    });
    expect(Object.isFrozen(configured.map)).toBe(true);
    expect(Object.isFrozen(configured.map.changepoints)).toBe(true);
  });

  it("accepts an explicit flat-growth optimizer and defaults flat changepoints like Prophet", async () => {
    const requested = await Effect.runPromise(
      decodeOptions({ growth: "flat", map: { optimizer: { algorithm: "newton" } } }),
    );

    const unrequested = await Effect.runPromise(decodeOptions({ growth: "flat", map: {} }));

    if (requested.growth !== "flat" || unrequested.growth !== "flat") {
      throw new Error("Expected flat options");
    }

    expect(requested.map.optimizer?.algorithm).toBe("newton");
    expect(Object.isFrozen(requested.map)).toBe(true);
    expect(unrequested.map).toEqual({
      changepoints: defaultAutomaticMapOptions.changepoints,
      changepointPriorScale: defaultAutomaticMapOptions.changepointPriorScale,
    });
    expect(unrequested.map.optimizer).toBeUndefined();
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

  it("gives every component without its own prior scale the matching global one", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalityPriorScale: 0.5,
        holidaysPriorScale: 0.25,
        countryHolidays: { country: "US" },
        builtInSeasonalities: {
          daily: "auto",
          weekly: { mode: "on" },
          yearly: { mode: "on", fourierOrder: 6 },
        },
        seasonalities: [{ name: "quarter", periodDays: 91.25, fourierOrder: 2 }],
        events: [{ name: "launch", date: "2025-01-01" }],
        regressors: [{ name: "promotion" }],
      }),
    );

    expect(options.seasonalityPriorScale).toBe(0.5);
    expect(options.holidaysPriorScale).toBe(0.25);
    expect(options.builtInSeasonalities).toEqual({
      daily: "auto",
      weekly: { mode: "on", fourierOrder: 3, priorScale: 0.5 },
      yearly: { mode: "on", fourierOrder: 6, priorScale: 0.5 },
    });
    expect(options.seasonalities.map((seasonality) => seasonality.priorScale)).toEqual([0.5]);
    expect(options.events.occurrences.map((occurrence) => occurrence.priorScale)).toEqual([0.25]);
    expect(options.events.layout.priorScales).toEqual([0.25]);
    expect(options.countryHolidays?.priorScale).toBe(0.25);

    // Python's add_regressor falls back to holidays_prior_scale.
    expect(options.regressors.map((regressor) => regressor.priorScale)).toEqual([0.25]);
  });

  it("keeps every explicit per-component prior scale over the global ones", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalityPriorScale: 0.5,
        holidaysPriorScale: 0.25,
        countryHolidays: { country: "US", priorScale: 4 },
        builtInSeasonalities: {
          daily: "off",
          weekly: { mode: "on", priorScale: 2 },
          yearly: "off",
        },
        seasonalities: [{ name: "quarter", periodDays: 91.25, fourierOrder: 2, priorScale: 3 }],
        events: [{ name: "launch", date: "2025-01-01", priorScale: 5 }],
        regressors: [{ name: "promotion", priorScale: 6 }],
      }),
    );

    expect(options.builtInSeasonalities.weekly).toEqual({
      mode: "on",
      fourierOrder: 3,
      priorScale: 2,
    });
    expect(options.seasonalities.map((seasonality) => seasonality.priorScale)).toEqual([3]);
    expect(options.events.layout.priorScales).toEqual([5]);
    expect(options.countryHolidays?.priorScale).toBe(4);
    expect(options.regressors.map((regressor) => regressor.priorScale)).toEqual([6]);
  });

  it("checks event prior conflicts after filling in holidaysPriorScale", async () => {
    const events = [
      { name: "launch", date: "2025-01-01" },
      { name: "launch", date: "2026-01-01", priorScale: 3 },
    ];

    const matching = await Effect.runPromise(decodeOptions({ holidaysPriorScale: 3, events }));

    expect(matching.events.layout.priorScales).toEqual([3]);

    const error = await expectOptionsFailure({ events });

    expect(error.issues).toEqual([
      {
        path: ["events", 1, "priorScale"],
        message: "Event 'launch' must use one consistent prior scale",
      },
    ]);
  });

  it.each(["seasonalityPriorScale", "holidaysPriorScale"] as const)(
    "rejects a non-positive or non-finite %s at its path",
    async (key) => {
      for (const value of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, "10"]) {
        const error = await expectOptionsFailure({ [key]: value });

        expect(error.issues.length).toBeGreaterThan(0);
        expect(error.issues.every((issue) => issue.path?.join() === key)).toBe(true);
      }
    },
  );

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

  it("parses each regressor model's options with the main model's fit settings", async () => {
    const warmStart = { k: 0.1, m: 0.2, sigmaObs: 0.3, delta: [], beta: [] };

    const options = await Effect.runPromise(
      decodeOptions({
        map: { optimizer: { algorithm: "newton" }, warmStart },
        regressors: [
          { name: "price", predictor: { growth: "flat", seasonalityPriorScale: 2 } },
          { name: "promotion" },
          { name: "temperature", predictor: true },
        ],
      }),
    );

    expect(options.regressors.map((regressor) => regressor.name)).toEqual([
      "price",
      "promotion",
      "temperature",
    ]);
    expect(options.regressorModels.map((request) => request.name)).toEqual([
      "price",
      "temperature",
    ]);

    const [price, temperature] = options.regressorModels;

    expect(price?.options.growth).toBe("flat");
    expect(price?.options.seasonalityPriorScale).toBe(2);
    expect(price?.options.map.optimizer).toEqual({ algorithm: "newton", maxIterations: 10_000 });
    expect(price?.options.map.warmStart).toEqual(warmStart);
    expect(temperature?.options.growth).toBe("linear");
    expect(temperature?.options.regressorModels).toEqual([]);
    expect(Object.isFrozen(options.regressorModels)).toBe(true);
  });

  it("keeps Prophet's optimizer policy for a regressor model when none is requested", async () => {
    const options = await Effect.runPromise(
      decodeOptions({ regressors: [{ name: "price", predictor: { growth: "flat" } }] }),
    );

    expect(options.regressorModels[0]?.options.map.optimizer).toBeUndefined();
    expect(options.regressorModels[0]?.options.map.warmStart).toBeUndefined();
  });

  it("reports regressor model option failures under the regressor's predictor", async () => {
    const error = await expectOptionsFailure({
      regressors: [
        { name: "price" },
        { name: "promotion", predictor: { seasonalityPriorScale: 0 } },
      ],
    });

    expect(error.issues[0]?.path).toEqual(["regressors", 1, "predictor", "seasonalityPriorScale"]);
  });
});
