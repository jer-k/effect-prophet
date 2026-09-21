import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidSeasonality,
  defaultSeasonalityPriorScale,
  makeNonEmptySeasonalityLayout,
  makeSeasonalityLayout,
  parseSeasonalities,
  parseSeasonalityDefinitions,
  parseSeasonalityLayout,
  type EncodedSeasonality,
  type SeasonalityDefinition,
} from "../src/seasonality";

const encodedSeasonalities: ReadonlyArray<EncodedSeasonality> = [
  {
    name: "business-week",
    periodDays: 5,
    fourierOrder: 2,
  },
  {
    name: "lunar-ish",
    periodDays: 29.5,
    fourierOrder: 1,
    priorScale: 3,
  },
];

const expectInvalidSeasonality = async (
  parsing: Effect.Effect<unknown, InvalidSeasonality>,
  expectedPathSegment: PropertyKey,
): Promise<InvalidSeasonality> => {
  const error = await Effect.runPromise(Effect.flip(parsing));

  expect(error).toBeInstanceOf(InvalidSeasonality);
  expect(error.issues.some((issue) => issue.path?.includes(expectedPathSegment))).toBe(true);
  expect(error.message.length).toBeGreaterThan(0);

  return error;
};

describe("seasonality domain", () => {
  it("parses definitions in input order and applies the documented prior default", async () => {
    const firstInput = { ...encodedSeasonalities[0] };
    const secondInput = { ...encodedSeasonalities[1] };
    const input = [firstInput, secondInput];

    const definitions = await Effect.runPromise(parseSeasonalities(input));

    expect(definitions).toEqual([
      { ...firstInput, priorScale: defaultSeasonalityPriorScale },
      secondInput,
    ]);
    expect(definitions).not.toBe(input);
    expect(definitions[0]).not.toBe(firstInput);
    expect(Object.isFrozen(definitions)).toBe(true);
    expect(definitions.every(Object.isFrozen)).toBe(true);

    firstInput.name = "changed";

    expect(definitions[0]?.name).toBe("business-week");
  });

  it("uses exact case-sensitive names without normalization", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([
        { name: "Daily", periodDays: 1, fourierOrder: 1 },
        { name: "daily-custom", periodDays: 1, fourierOrder: 1 },
      ]),
    );

    expect(definitions.map((definition) => definition.name)).toEqual(["Daily", "daily-custom"]);
  });

  it("parses optional condition names without changing coefficient identity", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([
        {
          name: "weekly-on-season",
          periodDays: 7,
          fourierOrder: 2,
          conditionName: "onSeason",
        },
      ]),
    );

    const layout = await Effect.runPromise(makeSeasonalityLayout(definitions));

    expect(definitions[0]?.conditionName).toBe("onSeason");
    expect(layout.coefficientCount).toBe(4);
    expect(layout.components[0]?.coefficientOffset).toBe(0);

    await expectInvalidSeasonality(
      parseSeasonalities([
        {
          name: "weekly-on-season",
          periodDays: 7,
          fourierOrder: 2,
          conditionName: "conditions",
        },
      ]),
      "conditionName",
    );
  });

  it("constructs contiguous coefficients in definition order", async () => {
    const definitions = await Effect.runPromise(parseSeasonalities(encodedSeasonalities));
    const layout = await Effect.runPromise(makeSeasonalityLayout(definitions));

    expect(layout).toEqual({
      components: [
        {
          definition: definitions[0],
          coefficientOffset: 0,
          coefficientCount: 4,
        },
        {
          definition: definitions[1],
          coefficientOffset: 4,
          coefficientCount: 2,
        },
      ],
      coefficientCount: 6,
    });
    expect(Object.isFrozen(layout)).toBe(true);
    expect(Object.isFrozen(layout.components)).toBe(true);
    expect(layout.components.every(Object.isFrozen)).toBe(true);
    expect(layout.components.every((component) => Object.isFrozen(component.definition))).toBe(
      true,
    );
  });

  it("constructs a non-empty layout that retains its tuple evidence", async () => {
    const definitions = await Effect.runPromise(parseSeasonalities(encodedSeasonalities));
    const firstDefinition = definitions[0];

    expect(firstDefinition).toBeDefined();

    if (firstDefinition === undefined) {
      return;
    }

    const layout = await Effect.runPromise(
      makeNonEmptySeasonalityLayout([firstDefinition, ...definitions.slice(1)]),
    );

    const firstComponent = layout.components[0];

    expect(firstComponent.definition).toEqual(firstDefinition);
    expect(layout.components).toHaveLength(2);
    expect(Object.isFrozen(layout)).toBe(true);
    expect(Object.isFrozen(layout.components)).toBe(true);
  });

  it("constructs an empty frozen layout", async () => {
    const definitions = await Effect.runPromise(parseSeasonalities([]));
    const layout = await Effect.runPromise(makeSeasonalityLayout(definitions));

    expect(layout).toEqual({ components: [], coefficientCount: 0 });
    expect(Object.isFrozen(layout.components)).toBe(true);
  });

  it.each([
    "daily",
    "weekly",
    "yearly",
    "trend",
    "value",
    "timestamp",
    "additive",
    "seasonalities",
  ])("rejects the reserved name %s", async (name) => {
    await expectInvalidSeasonality(
      parseSeasonalities([{ name, periodDays: 7, fourierOrder: 2 }]),
      "name",
    );
  });

  it("accepts canonical resolved built-ins and rejects mismatched built-in periods", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalityDefinitions([
        { name: "yearly", periodDays: 365.25, fourierOrder: 6, priorScale: 2 },
        { name: "weekly", periodDays: 7, fourierOrder: 3, priorScale: 10 },
        { name: "daily", periodDays: 1, fourierOrder: 4, priorScale: 10 },
      ]),
    );

    expect(definitions.map((definition) => definition.name)).toEqual(["yearly", "weekly", "daily"]);

    await expectInvalidSeasonality(
      parseSeasonalityDefinitions([
        { name: "daily", periodDays: 2, fourierOrder: 4, priorScale: 10 },
      ]),
      "periodDays",
    );
  });

  it("rejects empty and duplicate names with structured paths", async () => {
    await expectInvalidSeasonality(
      parseSeasonalities([{ name: "", periodDays: 7, fourierOrder: 2 }]),
      "name",
    );
    await expectInvalidSeasonality(
      parseSeasonalities([
        { name: "custom", periodDays: 7, fourierOrder: 2 },
        { name: "custom", periodDays: 30, fourierOrder: 3 },
      ]),
      1,
    );
  });

  it.each([
    ["periodDays", 0],
    ["periodDays", -1],
    ["periodDays", Number.NaN],
    ["periodDays", Number.POSITIVE_INFINITY],
    ["fourierOrder", 0],
    ["fourierOrder", -1],
    ["fourierOrder", 1.5],
    ["fourierOrder", Number.MAX_SAFE_INTEGER],
    ["priorScale", 0],
    ["priorScale", -1],
    ["priorScale", Number.NaN],
    ["priorScale", Number.POSITIVE_INFINITY],
  ] as const)("rejects invalid %s value %s", async (field, value) => {
    await expectInvalidSeasonality(
      parseSeasonalities([
        {
          name: "custom",
          periodDays: 7,
          fourierOrder: 2,
          priorScale: 4,
          [field]: value,
        },
      ]),
      field,
    );
  });

  it("rejects aggregate coefficient-count overflow without coefficient-sized allocation", async () => {
    const maximumFourierOrder = Math.floor(Number.MAX_SAFE_INTEGER / 2);

    const definitions = await Effect.runPromise(
      parseSeasonalities([
        { name: "first", periodDays: 2, fourierOrder: maximumFourierOrder },
        { name: "second", periodDays: 3, fourierOrder: maximumFourierOrder },
      ]),
    );

    await expectInvalidSeasonality(makeSeasonalityLayout(definitions), "fourierOrder");
  });

  it.each([
    [
      "offset",
      { components: [{ coefficientOffset: 1 }], coefficientCount: 4 },
      "coefficientOffset",
    ],
    [
      "component count",
      { components: [{ coefficientCount: 3 }], coefficientCount: 4 },
      "coefficientCount",
    ],
    ["total count", { components: [{}], coefficientCount: 3 }, "coefficientCount"],
  ] as const)("rejects persisted layout with inconsistent %s", async (_case, replacement, path) => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([{ name: "custom", periodDays: 7, fourierOrder: 2 }]),
    );

    const component = {
      definition: definitions[0],
      coefficientOffset: 0,
      coefficientCount: 4,
      ...replacement.components[0],
    };

    await expectInvalidSeasonality(
      parseSeasonalityLayout({
        components: [component],
        coefficientCount: replacement.coefficientCount,
      }),
      path,
    );
  });

  it("rejects duplicate names in persisted layouts", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([{ name: "custom", periodDays: 7, fourierOrder: 1 }]),
    );

    const definition = definitions[0];

    await expectInvalidSeasonality(
      parseSeasonalityLayout({
        components: [
          { definition, coefficientOffset: 0, coefficientCount: 2 },
          { definition, coefficientOffset: 2, coefficientCount: 2 },
        ],
        coefficientCount: 4,
      }),
      "name",
    );
  });

  it("requires parsing before encoded definitions are trusted", () => {
    const requiresParsedDefinitions = (_definitions: ReadonlyArray<SeasonalityDefinition>): void =>
      undefined;

    // @ts-expect-error -- Encoded definitions do not carry the parsed-definition brand.
    requiresParsedDefinitions(encodedSeasonalities);
  });
});
