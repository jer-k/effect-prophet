import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  decodeOptions,
  makeParameterGrid,
  maximumSearchCandidates,
  prophetFittingBackendLayer,
  searchModels,
  type ParameterGridInput,
} from "../src/index";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const run = (input: ParameterGridInput) => Effect.runPromise(makeParameterGrid(input));

const failure = (input: ParameterGridInput) =>
  Effect.runPromise(Effect.flip(makeParameterGrid(input)));

const monthly = { name: "monthly", periodDays: 30.5, fourierOrder: 5 } as const;

describe("makeParameterGrid", () => {
  it("expands every combination in a fixed axis order, the first axis slowest", async () => {
    const candidates = await run({
      base: {
        builtInSeasonalities: { daily: "off" },
        map: { changepoints: { mode: "auto", range: 0.9 } },
      },
      // Written last-axis first: the order of keys here doesn't matter.
      axes: {
        seasonalityMode: ["additive", "multiplicative"],
        changepointPriorScale: [0.01, 0.1, 0.5],
      },
    });

    expect(candidates.map((candidate) => candidate.id)).toEqual([
      "grid-0-0",
      "grid-0-1",
      "grid-1-0",
      "grid-1-1",
      "grid-2-0",
      "grid-2-1",
    ]);

    expect(candidates[3]?.options).toEqual({
      builtInSeasonalities: { daily: "off" },
      map: { changepoints: { mode: "auto", range: 0.9 }, changepointPriorScale: 0.1 },
      seasonalityMode: "multiplicative",
    });

    expect(
      candidates.map((candidate) => [
        candidate.options.map?.changepointPriorScale,
        candidate.options.seasonalityMode,
      ]),
    ).toEqual([
      [0.01, "additive"],
      [0.01, "multiplicative"],
      [0.1, "additive"],
      [0.1, "multiplicative"],
      [0.5, "additive"],
      [0.5, "multiplicative"],
    ]);
  });

  it("varies the global prior scales after changepoints and before the modes", async () => {
    const candidates = await run({
      base: { events: [{ name: "launch", date: "2025-01-10" }] },
      axes: {
        seasonalityMode: ["additive", "multiplicative"],
        holidaysPriorScale: [0.1, 10],
        seasonalityPriorScale: [0.01, 1],
        changepoints: [{ mode: "auto", count: 10 }],
      },
    });

    expect(candidates).toHaveLength(8);
    expect(candidates[5]).toEqual({
      id: "grid-0-1-0-1",
      options: {
        events: [{ name: "launch", date: "2025-01-10" }],
        map: { changepoints: { mode: "auto", count: 10 } },
        seasonalityPriorScale: 1,
        holidaysPriorScale: 0.1,
        seasonalityMode: "multiplicative",
      },
    });

    expect(
      candidates.map(({ options }) => [
        options.seasonalityPriorScale,
        options.holidaysPriorScale,
        options.seasonalityMode,
      ]),
    ).toEqual([
      [0.01, 0.1, "additive"],
      [0.01, 0.1, "multiplicative"],
      [0.01, 10, "additive"],
      [0.01, 10, "multiplicative"],
      [1, 0.1, "additive"],
      [1, 0.1, "multiplicative"],
      [1, 10, "additive"],
      [1, 10, "multiplicative"],
    ]);

    const decoded = await Effect.runPromise(decodeOptions(candidates[5]?.options));

    expect(decoded.events.layout.priorScales).toEqual([0.1]);
  });

  it("returns the base alone when there are no axes", async () => {
    expect(await run({ base: { growth: "flat" }, axes: {} })).toEqual([
      { id: "grid", options: { growth: "flat" } },
    ]);

    expect(await run({ axes: {} })).toEqual([{ id: "grid", options: {} }]);
  });

  it("treats structured values as single choices that replace the base's", async () => {
    const candidates = await run({
      base: {
        builtInSeasonalities: { daily: "off", weekly: "off" },
        seasonalities: [{ name: "quarterly", periodDays: 91.25, fourierOrder: 3 }],
        map: { changepoints: { mode: "auto", count: 10 } },
      },
      axes: {
        changepoints: [{ mode: "explicit", timestamps: [] }],
        builtInSeasonalities: [{ yearly: { mode: "on", priorScale: 1 } }],
        seasonalities: [[], [monthly]],
      },
    });

    expect(candidates.map((candidate) => candidate.options)).toEqual([
      {
        builtInSeasonalities: { yearly: { mode: "on", priorScale: 1 } },
        seasonalities: [],
        map: { changepoints: { mode: "explicit", timestamps: [] } },
      },
      {
        builtInSeasonalities: { yearly: { mode: "on", priorScale: 1 } },
        seasonalities: [monthly],
        map: { changepoints: { mode: "explicit", timestamps: [] } },
      },
    ]);

    const logistic = await run({
      base: { growth: "logistic" },
      axes: { seasonalities: [[monthly]] },
    });

    expect(logistic[0]?.options).toEqual({ growth: "logistic", seasonalities: [monthly] });
  });

  it("returns candidates every options check accepts, without touching its input", async () => {
    const input = {
      base: { regressors: [{ name: "promotion" }] },
      axes: { seasonalities: [[monthly]], scaling: ["absmax", "minmax"] },
    } as const satisfies ParameterGridInput;

    const before = structuredClone(input);
    const candidates = await run(input);

    expect(input).toEqual(before);
    expect(Object.isFrozen(candidates)).toBe(true);

    for (const candidate of candidates) {
      expect(Object.isFrozen(candidate)).toBe(true);
      expect(Object.isFrozen(candidate.options)).toBe(true);
      expect(Object.isFrozen(candidate.options.seasonalities?.[0])).toBe(true);
      expect(candidate.options.seasonalities?.[0]).not.toBe(monthly);
      expect(candidate.options.regressors).not.toBe(input.base.regressors);

      await Effect.runPromise(decodeOptions(candidate.options));
    }

    expect(await run(input)).toEqual(candidates);
  });

  it("feeds searchModels directly", async () => {
    const dayMs = 86_400_000;
    const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

    const history = Array.from({ length: 60 }, (_, day) => ({
      timestamp: date(day),
      value: 50 + day * 0.4 + 3 * Math.sin(day * 12.9898),
    }));

    const candidates = await run({
      base: { builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" } },
      axes: { changepointPriorScale: [0.01, 0.5], seasonalityMode: ["additive"] },
    });

    const result = await Effect.runPromise(
      searchModels(history, {
        candidates,
        plan: {
          horizonMs: 7 * dayMs,
          cutoffs: { mode: "generated", initialMs: 40 * dayMs, periodMs: 7 * dayMs },
        },
        objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
        failurePolicy: "fail-fast",
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(result.candidates.map((candidate) => [candidate.id, candidate.kind])).toEqual([
      ["grid-0-0", "success"],
      ["grid-1-0", "success"],
    ]);
  });

  it("rejects malformed, empty and repeated axes", async () => {
    const cases: ReadonlyArray<readonly [string, ReadonlyArray<PropertyKey>]> = [
      ['{"axes":{"seasonalityMode":[]}}', ["axes", "seasonalityMode"]],
      ['{"axes":{"seasonalityMode":"additive"}}', ["axes", "seasonalityMode"]],
      ['{"axes":{"growth":["flat"]}}', ["axes", "growth"]],
      ['{"axes":{},"typo":1}', ["typo"]],
      ['{"base":{}}', ["axes"]],
      ['{"axes":{"changepointPriorScale":[0.1,0.5,0.1]}}', ["axes", "changepointPriorScale", 2]],
      ['{"axes":{"seasonalityPriorScale":[1,1]}}', ["axes", "seasonalityPriorScale", 1]],
      ['{"axes":{"holidaysPriorScale":[0.1,10,0.1]}}', ["axes", "holidaysPriorScale", 2]],
      ['{"axes":{"holidaysPriorScale":[]}}', ["axes", "holidaysPriorScale"]],
      [
        JSON.stringify({ axes: { seasonalities: [[monthly], [{ ...monthly }]] } }),
        ["axes", "seasonalities", 1],
      ],
      [
        // Equal regardless of key order.
        '{"axes":{"changepoints":[{"mode":"auto","count":5,"range":0.9},{"range":0.9,"count":5,"mode":"auto"}]}}',
        ["axes", "changepoints", 1],
      ],
    ];

    for (const [json, path] of cases) {
      const error = await failure(JSON.parse(json));

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "parameter-grid" });
      expect(error.issues?.[0]?.path).toEqual(path);
    }
  });

  it("rejects grids over the search limit, or past the integer range, before reading values", async () => {
    expect(maximumSearchCandidates).toBe(32);

    const atLimit = await run({
      axes: {
        changepointPriorScale: [0.01, 0.02, 0.05, 0.1],
        seasonalityMode: ["additive", "multiplicative"],
        scaling: ["absmax", "minmax"],
        holidaysMode: ["additive", "multiplicative"],
      },
    });

    expect(atLimit).toHaveLength(32);

    // Repeated and invalid values would fail later checks; the count fails first.
    const repeated = Array.from({ length: 200 }, () => -1);

    for (const input of [
      { axes: { changepointPriorScale: Array.from({ length: 33 }, (_, index) => index + 1) } },
      {
        axes: {
          changepointPriorScale: repeated,
          seasonalityPriorScale: repeated,
          holidaysPriorScale: repeated,
          seasonalityMode: Array.from({ length: 200 }, () => "additive" as const),
          holidaysMode: Array.from({ length: 200 }, () => "additive" as const),
          scaling: Array.from({ length: 200 }, () => "absmax" as const),
          changepoints: Array.from({ length: 200 }, () => ({ mode: "auto" as const })),
          builtInSeasonalities: Array.from({ length: 200 }, () => ({})),
          seasonalities: Array.from({ length: 200 }, () => []),
        },
      },
    ] satisfies ReadonlyArray<ParameterGridInput>) {
      const error = await failure(input);

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({
        input: "parameter-grid",
        issues: [{ path: ["axes"], message: "Parameter grid exceeds 32 candidates" }],
      });
    }
  });

  it("names the axis value, base or candidate behind invalid options", async () => {
    const value = await failure({
      axes: { seasonalityMode: ["additive"], changepointPriorScale: [0.1, -1] },
    });

    expect(value).toBeInstanceOf(InputValidationError);
    expect(value.message).toBe("Parameter grid candidate grid-1-0 has invalid options");
    expect(value.issues).toEqual([
      { path: ["axes", "changepointPriorScale", 1], message: "Expected a value greater than 0" },
    ]);

    const nested = await failure({
      axes: { seasonalities: [[monthly], [{ ...monthly, fourierOrder: 0 }]] },
    });

    expect(nested.issues?.[0]?.path).toEqual(["axes", "seasonalities", 1, 0, "fourierOrder"]);

    for (const axis of ["seasonalityPriorScale", "holidaysPriorScale"] as const) {
      const prior = await failure({ axes: { [axis]: [1, 0] } });

      expect(prior.message).toBe("Parameter grid candidate grid-1 has invalid options");
      expect(prior.issues).toEqual([
        { path: ["axes", axis, 1], message: "Expected a value greater than 0" },
      ]);
    }

    // A default-filled event prior only conflicts with an explicit one under some global values.
    const conflict = await failure({
      base: {
        holidaysPriorScale: 3,
        events: [
          { name: "launch", date: "2025-01-10" },
          { name: "launch", date: "2026-01-10", priorScale: 3 },
        ],
      },
      axes: { holidaysPriorScale: [3, 10] },
    });

    expect(conflict.message).toBe("Parameter grid candidate grid-1 has invalid options");
    expect(conflict.issues?.[0]?.path).toEqual([
      "candidates",
      1,
      "options",
      "events",
      1,
      "priorScale",
    ]);

    const base = await failure({
      base: { map: { changepointPriorScale: 0 } },
      axes: { seasonalityMode: ["additive"] },
    });

    expect(base).toMatchObject({ input: "parameter-grid", message: "Invalid base options" });
    expect(base.issues?.[0]?.path).toEqual(["base", "map", "changepointPriorScale"]);

    // A seasonality name only clashes with the base's regressor once they are combined.
    const combined = await failure({
      base: { regressors: [{ name: "monthly" }] },
      axes: { scaling: ["absmax"], seasonalities: [[], [monthly]] },
    });

    expect(combined).toMatchObject({
      input: "parameter-grid",
      message: "Parameter grid candidate grid-1-0 has invalid options",
    });

    expect(combined.issues?.[0]?.path).toEqual([
      "candidates",
      1,
      "options",
      "regressors",
      0,
      "name",
    ]);
  });

  it("ends one safe span around the options checks", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      makeParameterGrid({
        axes: { changepointPriorScale: [0.01, 0.1, 0.5], seasonalityMode: ["additive"] },
      }).pipe(Effect.withSpan("tuning.job"), Effect.withTracer(tracer)),
    );

    const job = spans.find((span) => span.name === "tuning.job");
    const operation = spans.find((span) => span.name === "Prophet.makeParameterGrid");

    if (job === undefined || operation === undefined) {
      throw new Error("Expected job and grid spans");
    }

    const status = requireEndedSpan(operation);
    const decodes = spans.filter((span) => span.name === "Prophet.decodeOptions");

    expect(operation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(job.spanId);
    expect(operation.traceId).toBe(job.traceId);
    expect(Exit.isSuccess(status.exit)).toBe(true);

    expect(Object.fromEntries(operation.attributes)).toEqual({
      "effect_prophet.axis.count": 2,
      "effect_prophet.candidate.count": 3,
    });

    // The base, then each candidate.
    expect(decodes).toHaveLength(4);

    for (const decode of decodes) {
      const decodeStatus = requireEndedSpan(decode);

      expect(decode.parent.pipe(Option.getOrUndefined)?.spanId).toBe(operation.spanId);
      expect(decodeStatus.startTime).toBeGreaterThanOrEqual(status.startTime);
      expect(decodeStatus.endTime).toBeLessThanOrEqual(status.endTime);
    }

    expect(spans.some((span) => span.name.startsWith("effect-prophet."))).toBe(false);
  });

  it("ends a failed span, and checks no options when the grid's shape fails", async () => {
    const { spans, tracer } = collectTestSpans();

    for (const input of [
      { axes: { seasonalityMode: [] } },
      { axes: { changepointPriorScale: Array.from({ length: 33 }, (_, index) => index + 1) } },
      { axes: { seasonalityMode: ["additive", "additive"] } },
    ] satisfies ReadonlyArray<ParameterGridInput>) {
      spans.length = 0;

      const exit = await Effect.runPromise(
        makeParameterGrid(input).pipe(Effect.withTracer(tracer), Effect.exit),
      );

      const operation = spans.find((span) => span.name === "Prophet.makeParameterGrid");
      const status = operation === undefined ? undefined : requireEndedSpan(operation);

      expect(Exit.isFailure(exit)).toBe(true);
      expect(status !== undefined && Exit.isFailure(status.exit)).toBe(true);
      expect(
        operation === undefined ? undefined : Object.fromEntries(operation.attributes),
      ).toEqual({});

      expect(spans.some((span) => span.name === "Prophet.decodeOptions")).toBe(false);
    }

    spans.length = 0;

    await Effect.runPromise(
      makeParameterGrid({ axes: { changepointPriorScale: [-1] } }).pipe(
        Effect.withTracer(tracer),
        Effect.exit,
      ),
    );

    const failedDecode = spans.filter((span) => span.name === "Prophet.decodeOptions").at(-1);

    expect(
      failedDecode === undefined ? undefined : Exit.isFailure(requireEndedSpan(failedDecode).exit),
    ).toBe(true);
  });
});
