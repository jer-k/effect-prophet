import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  fit,
  makeFutureTimestamps,
  maximumFuturePeriods,
  predict,
  prophetFittingBackendLayer,
  type FutureTimestampOptions,
} from "../src/index";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const generate = (
  anchor: Parameters<typeof makeFutureTimestamps>[0],
  options: FutureTimestampOptions,
) => Effect.runPromise(makeFutureTimestamps(anchor, options));

const fail = (...args: Parameters<typeof makeFutureTimestamps>) =>
  Effect.runPromise(Effect.flip(makeFutureTimestamps(...args)));

describe("makeFutureTimestamps", () => {
  // Expected values come from pandas 2 date_range inside Prophet 1.4.0's make_future_dataframe.
  it.each([
    ["h", "2025-01-15T12:30:00.000Z", ["2025-01-15T13:30:00.000Z", "2025-01-15T14:30:00.000Z"]],
    ["D", "2025-01-15T12:30:00.000Z", ["2025-01-16T12:30:00.000Z", "2025-01-17T12:30:00.000Z"]],
    ["W", "2025-01-15T12:30:00.000Z", ["2025-01-19T12:30:00.000Z", "2025-01-26T12:30:00.000Z"]],
    ["W", "2025-01-19T00:00:00.000Z", ["2025-01-26T00:00:00.000Z", "2025-02-02T00:00:00.000Z"]],
    ["W-MON", "2025-01-15T12:30:00.000Z", ["2025-01-20T12:30:00.000Z", "2025-01-27T12:30:00.000Z"]],
    ["MS", "2025-01-15T12:30:00.000Z", ["2025-02-01T12:30:00.000Z", "2025-03-01T12:30:00.000Z"]],
    ["MS", "2025-02-01T06:00:00.000Z", ["2025-03-01T06:00:00.000Z", "2025-04-01T06:00:00.000Z"]],
    ["ME", "2025-01-15T12:30:00.000Z", ["2025-01-31T12:30:00.000Z", "2025-02-28T12:30:00.000Z"]],
    ["ME", "2025-01-31T18:00:00.000Z", ["2025-02-28T18:00:00.000Z", "2025-03-31T18:00:00.000Z"]],
  ] as const)("matches pandas %s after %s", async (frequency, anchor, expected) => {
    await expect(generate(anchor, { periods: 2, frequency })).resolves.toEqual(expected);
  });

  it("defaults to daily steps like make_future_dataframe", async () => {
    await expect(generate("2025-01-15T00:00:00.000Z", { periods: 1 })).resolves.toEqual([
      "2025-01-16T00:00:00.000Z",
    ]);
  });

  it("follows month ends through leap years without drifting", async () => {
    await expect(
      generate("2024-01-31T00:00:00.000Z", { periods: 4, frequency: "ME" }),
    ).resolves.toEqual([
      "2024-02-29T00:00:00.000Z",
      "2024-03-31T00:00:00.000Z",
      "2024-04-30T00:00:00.000Z",
      "2024-05-31T00:00:00.000Z",
    ]);

    await expect(
      generate("2023-12-31T00:00:00.000Z", { periods: 14, frequency: "ME" }),
    ).resolves.toContain("2024-12-31T00:00:00.000Z");
  });

  it("crosses year boundaries and the epoch", async () => {
    await expect(
      generate("1969-11-20T23:00:00.000Z", { periods: 3, frequency: "MS" }),
    ).resolves.toEqual([
      "1969-12-01T23:00:00.000Z",
      "1970-01-01T23:00:00.000Z",
      "1970-02-01T23:00:00.000Z",
    ]);
  });

  it("returns no timestamps for zero periods", async () => {
    await expect(
      generate("2025-01-15T00:00:00.000Z", { periods: 0, frequency: "MS" }),
    ).resolves.toEqual([]);
  });

  it("anchors on the latest timestamp of an unsorted history without changing it", async () => {
    const history = [
      { timestamp: "2025-01-05T00:00:00.000Z", value: 1 },
      { timestamp: "2025-01-07T00:00:00.000Z", value: 3 },
      { timestamp: "2025-01-06T00:00:00.000Z", value: 2 },
    ] as const;

    const snapshot = structuredClone(history);

    await expect(generate(history, { periods: 2, includeHistory: false })).resolves.toEqual([
      "2025-01-08T00:00:00.000Z",
      "2025-01-09T00:00:00.000Z",
    ]);
    expect(history).toEqual(snapshot);
  });

  it("puts a history's distinct sorted timestamps first by default, like Python", async () => {
    const history = [
      { timestamp: "2025-01-07T00:00:00.000Z", value: 3 },
      { timestamp: "2025-01-05T00:00:00.000Z", value: 1 },
      { timestamp: "2025-01-07T00:00:00.000Z", value: 4 },
    ] as const;

    await expect(generate(history, { periods: 1 })).resolves.toEqual([
      "2025-01-05T00:00:00.000Z",
      "2025-01-07T00:00:00.000Z",
      "2025-01-08T00:00:00.000Z",
    ]);

    await expect(generate(history, { periods: 0 })).resolves.toEqual([
      "2025-01-05T00:00:00.000Z",
      "2025-01-07T00:00:00.000Z",
    ]);
  });

  it("has no history to include after a lone timestamp", async () => {
    await expect(
      generate("2025-01-15T00:00:00.000Z", { periods: 1, includeHistory: true }),
    ).resolves.toEqual(["2025-01-16T00:00:00.000Z"]);
  });

  it("returns a frozen list that predict accepts unchanged", async () => {
    const history = Array.from({ length: 30 }, (_, day) => ({
      timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
      value: 10 + day,
    }));

    const forecasts = await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(history, {
          builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
        });

        const future = yield* makeFutureTimestamps(history, { periods: 3, includeHistory: false });

        expect(Object.isFrozen(future)).toBe(true);

        return yield* predict(model, future);
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(forecasts.map((row) => new Date(row.timestamp).toISOString())).toEqual([
      "2025-01-31T00:00:00.000Z",
      "2025-02-01T00:00:00.000Z",
      "2025-02-02T00:00:00.000Z",
    ]);
  });

  it.each([
    ["a non-canonical anchor", "2025-01-15", { periods: 1 }, []],
    [
      "a malformed history",
      [{ timestamp: "2025-01-15T00:00:00.000Z", value: "x" }],
      { periods: 1 },
      [0, "value"],
    ],
    ["an empty history", [], { periods: 1 }, [0]],
    ["negative periods", "2025-01-15T00:00:00.000Z", { periods: -1 }, ["periods"]],
    ["fractional periods", "2025-01-15T00:00:00.000Z", { periods: 1.5 }, ["periods"]],
    [
      "too many periods",
      "2025-01-15T00:00:00.000Z",
      { periods: maximumFuturePeriods + 1 },
      ["periods"],
    ],
    [
      "an unknown frequency",
      "2025-01-15T00:00:00.000Z",
      { periods: 1, frequency: "M" },
      ["frequency"],
    ],
    ["an unknown option", "2025-01-15T00:00:00.000Z", { periods: 1, freq: "D" }, ["freq"]],
    [
      "a non-boolean includeHistory",
      "2025-01-15T00:00:00.000Z",
      { periods: 1, includeHistory: 1 },
      ["includeHistory"],
    ],
  ])("rejects %s", async (_, anchor, options, path) => {
    // @ts-expect-error -- Malformed input exercises the untyped runtime boundary.
    const error = await fail(anchor, options);

    expect(error).toBeInstanceOf(InputValidationError);
    expect(error.input).toBe("future-timestamps");
    expect(
      error.issues.some((issue) => JSON.stringify(issue.path ?? []) === JSON.stringify(path)),
    ).toBe(true);
  });

  it.each([
    ["D", "+275760-09-12T00:00:00.000Z"],
    ["MS", "+275760-08-12T00:00:00.000Z"],
    ["ME", "+275760-08-31T00:00:00.000Z"],
    ["W", "+275760-09-12T00:00:00.000Z"],
  ] as const)("rejects %s timestamps past the supported range", async (frequency, anchor) => {
    const error = await fail(anchor, { periods: 2, frequency });

    expect(error).toBeInstanceOf(InputValidationError);
    expect(error.issues).toEqual([
      {
        path: ["periods"],
        message: "Future timestamps must stay inside the supported timestamp range",
      },
    ]);
  });

  it("allows the last representable timestamp", async () => {
    await expect(generate("+275760-09-12T00:00:00.000Z", { periods: 1 })).resolves.toEqual([
      "+275760-09-13T00:00:00.000Z",
    ]);
  });
});

describe("makeFutureTimestamps tracing", () => {
  it("records one ended operation span under the caller's span", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      makeFutureTimestamps("2025-01-15T00:00:00.000Z", { periods: 3, frequency: "MS" }).pipe(
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    const job = spans.find((span) => span.name === "forecast.job");
    const operation = spans.find((span) => span.name === "Prophet.makeFutureTimestamps");

    expect(job).toBeDefined();
    expect(operation).toBeDefined();

    if (job === undefined || operation === undefined) {
      return;
    }

    const child = requireEndedSpan(operation);
    const parent = requireEndedSpan(job);

    expect(spans.map(({ name }) => name)).toEqual(["forecast.job", "Prophet.makeFutureTimestamps"]);
    expect(operation.traceId).toBe(job.traceId);
    expect(operation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(job.spanId);
    expect(Exit.isSuccess(child.exit)).toBe(true);
    expect(child.startTime >= parent.startTime).toBe(true);
    expect(child.endTime <= parent.endTime).toBe(true);
    expect(Object.fromEntries(operation.attributes)).toEqual({
      "effect_prophet.frequency": "MS",
      "effect_prophet.timestamp.count": 3,
    });
  });

  it("counts included history timestamps on the operation span", async () => {
    const { spans, tracer } = collectTestSpans();

    const history = [
      { timestamp: "2025-01-01T00:00:00.000Z", value: 1 },
      { timestamp: "2025-01-02T00:00:00.000Z", value: 2 },
    ] as const;

    await Effect.runPromise(
      makeFutureTimestamps(history, { periods: 3 }).pipe(Effect.withTracer(tracer)),
    );

    const operation = spans.find((span) => span.name === "Prophet.makeFutureTimestamps");

    expect(operation?.attributes.get("effect_prophet.timestamp.count")).toBe(5);
  });

  it("ends the operation span as failed without attributes on invalid input", async () => {
    const { spans, tracer } = collectTestSpans();

    const exit = await Effect.runPromiseExit(
      makeFutureTimestamps("2025-01-15T00:00:00.000Z", { periods: -1 }).pipe(
        Effect.withTracer(tracer),
      ),
    );

    const operation = spans.find((span) => span.name === "Prophet.makeFutureTimestamps");

    expect(Exit.isFailure(exit)).toBe(true);
    expect(operation).toBeDefined();

    if (operation === undefined) {
      return;
    }

    expect(Exit.isFailure(requireEndedSpan(operation).exit)).toBe(true);
    expect(Object.fromEntries(operation.attributes)).toEqual({});
  });
});
