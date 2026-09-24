import { Effect, Exit, Match, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predictUncertainty,
  prophetFittingBackendLayer,
  simulationIdentity,
} from "../src/index";

const history = [
  { timestamp: "2025-01-01T00:00:00.000Z", value: 1 },
  { timestamp: "2025-01-02T00:00:00.000Z", value: 2.1 },
  { timestamp: "2025-01-03T00:00:00.000Z", value: 3.2 },
  { timestamp: "2025-01-04T00:00:00.000Z", value: 3.3 },
  { timestamp: "2025-01-05T00:00:00.000Z", value: 3.5 },
  { timestamp: "2025-01-06T00:00:00.000Z", value: 3.6 },
] as const;

const future = ["2025-01-08T00:00:00.000Z", "2025-01-03T00:00:00.000Z", "2025-01-08T00:00:00.000Z"];

const linearModel = () =>
  Effect.runPromise(
    fit(history, {
      map: { changepoints: { mode: "explicit", timestamps: ["2025-01-03T00:00:00.000Z"] } },
    }).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

describe("predictUncertainty", () => {
  it("parses required bounded options, even for empty prediction", async () => {
    const model = await linearModel();
    const empty = await Effect.runPromise(predictUncertainty(model, [], { seed: 0 }));

    expect(empty).toEqual({
      kind: "intervals",
      simulation: simulationIdentity,
      sampleCount: 1000,
      intervalWidth: 0.8,
      rows: [],
    });

    const missingSeed = await Effect.runPromise(
      Effect.flip(predictUncertainty(model, [], JSON.parse("{}"))),
    );

    expect(missingSeed).toBeInstanceOf(InputValidationError);

    for (const options of [
      { seed: -1 },
      { seed: 2 ** 32 },
      { seed: 1, samples: 0 },
      { seed: 1, intervalWidth: 1 },
      { seed: 1, typo: true },
    ]) {
      const error = await Effect.runPromise(Effect.flip(predictUncertainty(model, [], options)));

      expect(error).toBeInstanceOf(InputValidationError);

      if (error instanceof InputValidationError) {
        expect(error.input).toBe("uncertainty-options");
      }
    }
  });

  it("replays exact ordered samples after JSON save/reload and preserves independent ownership", async () => {
    const model = await linearModel();

    const restored = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(model)))),
      ),
    );

    const request = { seed: 42, samples: 64, output: "samples" } as const;

    const first = await Effect.runPromise(predictUncertainty(model, future, request));
    const again = await Effect.runPromise(predictUncertainty(restored, future, request));

    expect(first.kind).toBe("samples");
    expect(again).toEqual(first);

    if (first.kind !== "samples" || again.kind !== "samples") {
      throw new Error("Expected sample buffers");
    }

    expect(first.trend).toHaveLength(future.length * request.samples);
    expect(first.value).toHaveLength(future.length * request.samples);
    expect(first.trend[0]).toBe(first.trend[request.samples * 2]);
    expect(first.value[0]).not.toBe(first.value[request.samples * 2]);
    first.value[0] = Number.NaN;

    const replay = await Effect.runPromise(predictUncertainty(model, future, request));
    expect(replay).toEqual(again);

    const changedWidth = await Effect.runPromise(
      predictUncertainty(model, future, {
        ...request,
        intervalWidth: 0.5,
      }),
    );

    expect(changedWidth).toEqual(again);

    const wide = await Effect.runPromise(
      predictUncertainty(model, future, {
        seed: request.seed,
        samples: request.samples,
        intervalWidth: 0.8,
      }),
    );

    const narrow = await Effect.runPromise(
      predictUncertainty(model, future, {
        seed: request.seed,
        samples: request.samples,
        intervalWidth: 0.5,
      }),
    );

    if (wide.kind !== "intervals" || narrow.kind !== "intervals") {
      throw new Error("Expected ordered interval results");
    }

    for (const [index, wideRow] of wide.rows.entries()) {
      const narrowRow = narrow.rows[index];
      expect(wideRow.trend.lower).toBeLessThanOrEqual(narrowRow?.trend.lower ?? NaN);
      expect(narrowRow?.trend.upper ?? NaN).toBeLessThanOrEqual(wideRow.trend.upper);
      expect(wideRow.value.lower).toBeLessThanOrEqual(narrowRow?.value.lower ?? NaN);
      expect(narrowRow?.value.upper ?? NaN).toBeLessThanOrEqual(wideRow.value.upper);
    }
  });

  it("replays resolved automatic candidate counts after JSON reload", async () => {
    const model = await Effect.runPromise(
      fit(history, {
        map: { changepoints: { mode: "auto", count: 2, range: 0.8 } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected resolved automatic linear MAP state");
    }

    expect(model.changepointTimestamps).toHaveLength(2);

    const restored = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(model)))),
      ),
    );

    const request = { seed: 29, samples: 32, output: "samples" } as const;
    const before = await Effect.runPromise(predictUncertainty(model, future, request));
    const after = await Effect.runPromise(predictUncertainty(restored, future, request));

    expect(after).toEqual(before);
  });

  it("uses identical draws for flat samples and intervals, retaining a fixed trend", async () => {
    const model = await Effect.runPromise(
      fit(history, { growth: "flat" }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const samples = await Effect.runPromise(
      predictUncertainty(model, future, { seed: 0, samples: 1, output: "samples" }),
    );

    const bands = await Effect.runPromise(
      predictUncertainty(model, future, { seed: 0, samples: 1 }),
    );

    if (samples.kind !== "samples" || bands.kind !== "intervals") {
      throw new Error("Expected distinct sample and interval results");
    }

    expect(samples.trend[0]).toBe(samples.trend[1]);
    expect(samples.value[0]).not.toBe(samples.value[2]);
    expect(bands.rows[0]?.trend.lower).toBe(samples.trend[0]);
    expect(bands.rows[0]?.value.upper).toBe(samples.value[0]);
  });

  it("replays minmax no-point linear history and preserves a constant-target noise shortcut", async () => {
    const linear = await Effect.runPromise(
      fit(history, {
        scaling: "minmax",
        map: { changepoints: { mode: "explicit", timestamps: [] } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (linear.model !== "linear-piecewise-map") {
      throw new Error("Expected minmax linear MAP state");
    }

    expect(linear.targetScaling.offset).not.toBe(0);
    expect(linear.deltas).toHaveLength(0);

    const restored = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(linear)))),
      ),
    );

    const request = { seed: 7, samples: 32, output: "samples" } as const;
    const original = await Effect.runPromise(predictUncertainty(linear, future, request));
    const replay = await Effect.runPromise(predictUncertainty(restored, future, request));

    expect(replay).toEqual(original);

    if (original.kind !== "samples") {
      throw new Error("Expected no-point sample buffers");
    }

    for (const row of future.keys()) {
      const trend = original.trend.slice(row * request.samples, (row + 1) * request.samples);
      expect(trend.every((value) => value === trend[0])).toBe(true);
    }

    expect(original.trend[0]).toBe(original.trend[2 * request.samples]);
    expect(original.value[0]).not.toBe(original.value[2 * request.samples]);

    const constant = await Effect.runPromise(
      fit(
        [
          { timestamp: "2024-01-01T00:00:00.000Z", value: -4 },
          { timestamp: "2024-01-02T00:00:00.000Z", value: -4 },
        ],
        { growth: "flat", scaling: "minmax" },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (constant.model !== "flat-map") {
      throw new Error("Expected constant flat MAP state");
    }

    expect(constant.noiseScale).toBe(1e-9);

    const draws = await Effect.runPromise(
      predictUncertainty(constant, ["2024-01-03T00:00:00.000Z"], {
        seed: 7,
        samples: 32,
        output: "samples",
      }),
    );

    if (draws.kind !== "samples") {
      throw new Error("Expected constant-target samples");
    }

    expect(draws.trend.every((value) => value === -4)).toBe(true);
    expect(draws.value.some((value) => value !== -4)).toBe(true);

    const restoredConstant = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(constant)))),
      ),
    );

    expect(
      await Effect.runPromise(
        predictUncertainty(restoredConstant, ["2024-01-03T00:00:00.000Z"], {
          seed: 7,
          samples: 32,
          output: "samples",
        }),
      ),
    ).toEqual(draws);
  });

  it("simulates complete mixed flat features through the real WASM seam", async () => {
    const observations = Array.from({ length: 21 }, (_, index) => ({
      timestamp: new Date(Date.UTC(2025, 0, index + 1)).toISOString(),
      value: 30 * (1 + 0.12 * Math.cos((2 * Math.PI * index) / 7) + (index % 2) * 0.04),
      regressors: { promotion: index % 2 },
    }));

    const model = await Effect.runPromise(
      fit(observations, {
        growth: "flat",
        seasonalityMode: "multiplicative",
        seasonalities: [{ name: "weekly-relative", periodDays: 7, fourierOrder: 2 }],
        regressors: [{ name: "promotion", standardization: "never" }],
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const rows = [
      { timestamp: "2025-01-22T00:00:00.000Z", regressors: { promotion: 0 } },
      { timestamp: "2025-01-22T00:00:00.000Z", regressors: { promotion: 1 } },
    ];

    const result = await Effect.runPromise(
      predictUncertainty(model, rows, { seed: 11, samples: 16, output: "samples" }),
    );

    if (result.kind !== "samples") {
      throw new Error("Expected mixed sample buffers");
    }

    expect(result.trend[0]).toBe(result.trend[16]);
    expect(result.value.every(Number.isFinite)).toBe(true);
    expect(result.value[0]).not.toBe(result.value[16]);

    const missing = await Effect.runPromise(
      Effect.flip(
        predictUncertainty(model, [{ timestamp: "2025-01-22T00:00:00.000Z" }], { seed: 11 }),
      ),
    );

    expect(missing).toBeInstanceOf(InputValidationError);

    const incompleteOversizedRows = Array.from({ length: 500 }, () => ({
      timestamp: "2025-01-22T00:00:00.000Z",
    }));

    const alignment = await Effect.runPromise(
      Effect.flip(predictUncertainty(model, incompleteOversizedRows, { seed: 11, samples: 2048 })),
    );

    expect(alignment).toBeInstanceOf(InputValidationError);
  });

  it("simulates logistic paths with row-specific capacities and saved-model replay", async () => {
    const observations = [1.2, 2.2, 4.2, 6.1, 7.6, 8.9].map((value, index) => ({
      timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
      value,
      capacity: 10,
    }));

    const model = await Effect.runPromise(
      fit(observations, {
        growth: "logistic",
        map: { changepoints: { mode: "explicit", timestamps: ["2024-01-03T00:00:00.000Z"] } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const restored = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(model)))),
      ),
    );

    const rows = [
      { timestamp: "2024-01-08T00:00:00.000Z", capacity: 10 },
      { timestamp: "2024-01-08T00:00:00.000Z", capacity: 20 },
    ];

    const request = { seed: 9, samples: 64, output: "samples" } as const;
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const first = await Effect.runPromise(
      predictUncertainty(model, rows, request).pipe(
        Effect.withSpan("logistic.forecast"),
        Effect.withTracer(tracer),
      ),
    );

    const replay = await Effect.runPromise(predictUncertainty(restored, rows, request));

    expect(replay).toEqual(first);

    const parent = spans.find((span) => span.name === "Prophet.predictUncertainty");
    const boundary = spans.find((span) => span.name === "effect-prophet.wasm.simulate");

    if (
      parent === undefined ||
      boundary === undefined ||
      !Predicate.isTagged("Ended")(parent.status) ||
      !Predicate.isTagged("Ended")(boundary.status)
    ) {
      throw new Error("Expected complete logistic simulation trace");
    }

    expect(boundary.traceId).toBe(parent.traceId);
    expect(boundary.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
    expect(boundary.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
    expect(boundary.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
    expect(Exit.isSuccess(boundary.status.exit)).toBe(true);
    expect(Object.fromEntries(boundary.attributes)["effect_prophet.model.type"]).toBe(
      "logistic-piecewise-map",
    );

    if (first.kind !== "samples") {
      throw new Error("Expected logistic samples");
    }

    for (let sample = 0; sample < request.samples; sample++) {
      expect(first.trend[request.samples + sample]).toBeCloseTo(
        2 * (first.trend[sample] ?? NaN),
        11,
      );
    }

    expect(first.value[0]).not.toBe(first.value[request.samples]);

    spans.length = 0;

    const missing = await Effect.runPromise(
      Effect.flip(
        predictUncertainty(model, [{ timestamp: "2024-01-08T00:00:00.000Z" }], { seed: 9 }),
      ).pipe(Effect.withTracer(tracer)),
    );

    expect(missing).toBeInstanceOf(InputValidationError);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.simulate")).toBe(false);
  });

  it("requires every explicit logistic floor and preserves row-specific logit fractions", async () => {
    const observations = [1.2, 2.2, 4.2, 6.1, 7.6, 8.9].map((value, index) => ({
      timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
      value,
      capacity: 10,
      floor: -2,
    }));

    const model = await Effect.runPromise(
      fit(observations, {
        growth: "logistic",
        map: { changepoints: { mode: "explicit", timestamps: ["2024-01-03T00:00:00.000Z"] } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const rows = [
      { timestamp: "2024-01-08T00:00:00.000Z", capacity: 10, floor: -2 },
      { timestamp: "2024-01-08T00:00:00.000Z", capacity: 20, floor: -1 },
    ];

    const result = await Effect.runPromise(
      predictUncertainty(model, rows, {
        seed: 17,
        samples: 32,
        output: "samples",
      }),
    );

    if (result.kind !== "samples") {
      throw new Error("Expected logistic samples");
    }

    for (let sample = 0; sample < 32; sample++) {
      const first = ((result.trend[sample] ?? NaN) + 2) / 12;
      const second = ((result.trend[32 + sample] ?? NaN) + 1) / 21;
      expect(first).toBeCloseTo(second, 11);
    }

    const missingFloor = await Effect.runPromise(
      Effect.flip(
        predictUncertainty(model, [{ timestamp: "2024-01-08T00:00:00.000Z", capacity: 10 }], {
          seed: 17,
        }),
      ),
    );

    expect(missingFloor).toBeInstanceOf(InputValidationError);
  });

  it("replays minmax logistic mixed features and complete changing-bound rows", async () => {
    const start = Date.parse("2024-01-01T00:00:00.000Z");
    const timestamp = (day: number): string => new Date(start + day * 86_400_000).toISOString();

    const observations = Array.from({ length: 21 }, (_, index) => {
      const promotion = index % 2;
      const trend = 100 / (1 + Math.exp(-6 * (index / 20 - 0.45)));

      return {
        timestamp: timestamp(index),
        value:
          trend * (1 + 0.08 * Math.sin((2 * Math.PI * index) / 7)) +
          1.5 * promotion +
          (index === 8 ? 2 : 0),
        capacity: 100,
        regressors: { promotion },
      };
    });

    const model = await Effect.runPromise(
      fit(observations, {
        growth: "logistic",
        scaling: "minmax",
        seasonalityMode: "multiplicative",
        seasonalities: [{ name: "weekly-wave", periodDays: 7, fourierOrder: 1 }],
        events: [{ name: "launch", date: timestamp(8).slice(0, 10) }],
        regressors: [{ name: "promotion", standardization: "never" }],
        map: { changepoints: { mode: "auto", count: 2, range: 0.8 } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "logistic-piecewise-map") {
      throw new Error("Expected logistic MAP model");
    }

    const restored = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(model)))),
      ),
    );

    const rows = [
      { timestamp: timestamp(22), capacity: 110, regressors: { promotion: 1 } },
      { timestamp: timestamp(18), capacity: 100, regressors: { promotion: 0 } },
      { timestamp: timestamp(22), capacity: 140, regressors: { promotion: 0 } },
    ];

    const request = { seed: 0, samples: 64, output: "samples" } as const;
    const samples = await Effect.runPromise(predictUncertainty(model, rows, request));
    const replay = await Effect.runPromise(predictUncertainty(restored, rows, request));

    const intervals = await Effect.runPromise(
      predictUncertainty(restored, rows, { seed: 0, samples: 64 }),
    );

    expect(replay).toEqual(samples);
    expect(samples.kind).toBe("samples");
    expect(intervals.kind).toBe("intervals");

    if (samples.kind !== "samples" || intervals.kind !== "intervals") {
      throw new Error("Expected logistic sample and interval results");
    }

    expect(samples.trend).toHaveLength(rows.length * 64);
    expect(samples.value).toHaveLength(rows.length * 64);
    expect(samples.timestamps).toEqual(rows.map((row) => Date.parse(row.timestamp)));

    for (const [row, input] of rows.entries()) {
      const trend = samples.trend.slice(row * 64, (row + 1) * 64);

      expect(trend.every((value) => value >= 0 && value <= input.capacity)).toBe(true);
      expect(intervals.rows[row]?.trend.lower).toBeGreaterThanOrEqual(0);
      expect(intervals.rows[row]?.trend.upper).toBeLessThanOrEqual(input.capacity);
    }

    const incomplete = await Effect.runPromise(
      Effect.flip(
        predictUncertainty(restored, [{ timestamp: timestamp(22), capacity: 110 }], { seed: 0 }),
      ),
    );

    expect(incomplete).toBeInstanceOf(InputValidationError);

    if (incomplete instanceof InputValidationError) {
      expect(incomplete.issues[0]?.path).toContain("promotion");
    }
  });

  it("returns ordered seeded intervals on saturated implicit-floor logistic forecasts", async () => {
    const origin = Date.UTC(2020, 0, 1);

    const timestamp = (day: number): string => new Date(origin + day * 86_400_000).toISOString();
    const capacity = (day: number): number => Number((60 + day * 0.12).toPrecision(12));

    const observations = Array.from({ length: 256 }, (_, day) => ({
      timestamp: timestamp(day),
      capacity: capacity(day),
      value: Number(
        (
          capacity(day) / (1 + Math.exp(-(-2 + day * 0.045))) +
          0.45 * Math.sin((2 * Math.PI * day) / 7) +
          0.08 * Math.sin(day * 1.731) +
          0.035 * Math.cos(day * 0.417)
        ).toPrecision(12),
      ),
    }));

    const rows = Array.from({ length: 64 }, (_, index) => ({
      timestamp: timestamp(256 + index),
      capacity: capacity(256 + index),
    }));

    const model = await Effect.runPromise(
      fit(observations, {
        growth: "logistic",
        scaling: "minmax",
        seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 2, priorScale: 10 }],
        map: {
          changepoints: { mode: "explicit", timestamps: [timestamp(40)] },
          changepointPriorScale: 0.2,
          optimizer: { maxIterations: 10_000, relativeTolerance: 1e-7, absoluteTolerance: 1e-9 },
        },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const samples = await Effect.runPromise(
      predictUncertainty(model, rows, { seed: 19, samples: 128, output: "samples" }),
    );

    const intervals = await Effect.runPromise(
      predictUncertainty(model, rows, { seed: 19, samples: 128 }),
    );

    const replay = await Effect.runPromise(
      predictUncertainty(model, rows, { seed: 19, samples: 128 }),
    );

    if (samples.kind !== "samples" || intervals.kind !== "intervals") {
      throw new Error("Expected saturated logistic samples and intervals");
    }

    expect(replay).toEqual(intervals);
    expect(samples.trend).toHaveLength(rows.length * 128);

    for (const [index, interval] of intervals.rows.entries()) {
      const sorted = Array.from(samples.trend.slice(index * 128, (index + 1) * 128)).sort(
        (left, right) => left - right,
      );

      const low = sorted[Math.floor(127 * 0.1)] ?? NaN;
      const high = sorted[Math.ceil(127 * 0.9)] ?? NaN;

      expect(Number.isFinite(interval.trend.lower)).toBe(true);
      expect(interval.trend.lower).toBeGreaterThanOrEqual(low);
      expect(interval.trend.upper).toBeLessThanOrEqual(high);
      expect(interval.trend.lower).toBeLessThanOrEqual(interval.trend.upper);
      expect(interval.value.lower).toBeLessThanOrEqual(interval.value.upper);
    }
  });

  it("checks flat conditional Gaussian moments and quantiles through the public replay seam", async () => {
    const model = await Effect.runPromise(
      fit(history, { growth: "flat" }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "flat-map") {
      throw new Error("Expected a flat MAP model with output-unit noise");
    }

    const restored = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(model)))),
      ),
    );

    const rows = ["2025-01-08T00:00:00.000Z", "2025-01-09T00:00:00.000Z"];
    const options = { seed: 19, samples: 2048, output: "samples" } as const;

    const samples = await Effect.runPromise(predictUncertainty(restored, rows, options));

    const bands = await Effect.runPromise(
      predictUncertainty(model, rows, { seed: 19, samples: 2048 }),
    );

    if (samples.kind !== "samples" || bands.kind !== "intervals") {
      throw new Error("Expected conditional Gaussian samples and intervals");
    }

    const sigma = model.noiseScale;
    const normalQuantile = 1.281_551_565_545;

    for (const [row, band] of bands.rows.entries()) {
      const trend = samples.trend[row * options.samples];
      const values = samples.value.slice(row * options.samples, (row + 1) * options.samples);

      const mean = values.reduce((sum, value) => sum + value, 0) / options.samples;

      const variance =
        values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / options.samples;

      expect(
        samples.trend
          .slice(row * options.samples, (row + 1) * options.samples)
          .every((value) => value === trend),
      ).toBe(true);
      expect(Math.abs(mean - (trend ?? NaN))).toBeLessThanOrEqual(0.08 * sigma);
      expect(Math.abs(variance - sigma ** 2)).toBeLessThanOrEqual(0.15 * sigma ** 2);
      expect(
        Math.abs(band.value.lower - ((trend ?? NaN) - normalQuantile * sigma)),
      ).toBeLessThanOrEqual(0.15 * sigma);
      expect(
        Math.abs(band.value.upper - ((trend ?? NaN) + normalQuantile * sigma)),
      ).toBeLessThanOrEqual(0.15 * sigma);
    }

    expect(samples.value[0]).not.toBe(samples.value[options.samples]);
  });

  it("reports replicate-level fitted holdouts without dropping failed fits", async () => {
    const start = Date.parse("2025-03-01T00:00:00.000Z");
    const seriesSeeds = [101, 211, 307, 401];
    const cases = ["stable", "changing", "flat", "logistic-mixed", "shock"] as const;

    const summary: Array<{
      case: (typeof cases)[number];
      attempts: number;
      successes: number;
      failures: ReadonlyArray<string>;
      coverage: number | null;
      coverageSE: number | null;
      width: number | null;
      widthSE: number | null;
    }> = [];

    for (const scenario of cases) {
      const coverages: Array<number> = [];
      const widths: Array<number> = [];
      const failures: Array<string> = [];

      for (const seriesSeed of seriesSeeds) {
        let state = seriesSeed;

        const normal = (): number => {
          state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
          const first = (state + 0.5) / 2 ** 32;
          state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
          const second = (state + 0.5) / 2 ** 32;

          return Math.sqrt(-2 * Math.log(first)) * Math.cos(2 * Math.PI * second);
        };

        const synthetic = Array.from({ length: 23 }, (_, day) => {
          const timestamp = new Date(start + day * 86_400_000).toISOString();
          const promotion = day % 2;
          const seasonal = 0.3 * Math.sin((2 * Math.PI * day) / 7);

          const mean = Match.value(scenario).pipe(
            Match.when("flat", () => 4 + seasonal),
            Match.when(
              "logistic-mixed",
              () => -2 + 102 / (1 + Math.exp(-6 * (day / 20 - 0.45))) + 1.5 * promotion,
            ),
            Match.when("changing", () => 4 + 0.15 * day + 0.25 * Math.max(0, day - 10)),
            Match.when("shock", () => 4 + 0.15 * day + seasonal + (day >= 21 ? 3 : 0)),
            Match.when("stable", () => 4 + 0.15 * day + seasonal),
            Match.exhaustive,
          );

          return { timestamp, value: mean + 0.2 * normal(), promotion };
        });

        const training = synthetic.slice(0, 21).map((row) =>
          scenario === "logistic-mixed"
            ? {
                timestamp: row.timestamp,
                value: row.value,
                capacity: 100,
                regressors: { promotion: row.promotion },
              }
            : { timestamp: row.timestamp, value: row.value },
        );

        const holdout = synthetic.slice(21);

        const rows = holdout.map((row) =>
          scenario === "logistic-mixed"
            ? { timestamp: row.timestamp, capacity: 100, regressors: { promotion: row.promotion } }
            : { timestamp: row.timestamp },
        );

        const map = {
          changepoints: {
            mode: "explicit" as const,
            timestamps: [new Date(start + 10 * 86_400_000).toISOString()],
          },
        };

        const weekly = [{ name: "weekly-wave", periodDays: 7, fourierOrder: 1 }] as const;

        const fitEffect = Match.value(scenario).pipe(
          Match.when("flat", () => fit(training, { growth: "flat", seasonalities: weekly })),
          Match.when("logistic-mixed", () =>
            fit(training, {
              growth: "logistic",
              scaling: "minmax",
              regressors: [{ name: "promotion", standardization: "never" }],
              map,
            }),
          ),
          Match.when("changing", () => fit(training, { map })),
          Match.when("shock", () => fit(training, { map, seasonalities: weekly })),
          Match.when("stable", () => fit(training, { map, seasonalities: weekly })),
          Match.exhaustive,
        );

        const fitted = await Effect.runPromise(
          fitEffect.pipe(
            Effect.match({
              onFailure: (error) => ({
                kind: "failed" as const,
                reason: error instanceof FittingError ? error.reason : error._tag,
              }),
              onSuccess: (model) => ({ kind: "fitted" as const, model }),
            }),
            Effect.provide(prophetFittingBackendLayer),
          ),
        );

        if (fitted.kind === "failed") {
          failures.push(`${seriesSeed}:${fitted.reason}`);
          continue;
        }

        const restored = await Effect.runPromise(
          decodeFittedModel(
            JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(fitted.model)))),
          ),
        );

        const options = { seed: 9_000 + seriesSeed, samples: 512 };
        const bands = await Effect.runPromise(predictUncertainty(fitted.model, rows, options));
        const replay = await Effect.runPromise(predictUncertainty(restored, rows, options));

        expect(replay).toEqual(bands);

        if (bands.kind !== "intervals") {
          throw new Error("Expected fitted holdout intervals");
        }

        expect(bands.rows).toHaveLength(2);

        const covered = bands.rows.map((band, index) => {
          const value = holdout[index]?.value ?? NaN;

          return Number(value >= band.value.lower && value <= band.value.upper);
        });

        coverages.push(covered.reduce((sum, value) => sum + value, 0) / 2);
        widths.push(
          bands.rows.reduce((sum, band) => sum + band.value.upper - band.value.lower, 0) / 2,
        );
      }

      const summarize = (values: ReadonlyArray<number>): [number | null, number | null] => {
        if (values.length === 0) return [null, null];

        const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

        if (values.length === 1) return [mean, null];

        const variance =
          values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1);

        return [mean, Math.sqrt(variance / values.length)];
      };

      const [coverage, coverageSE] = summarize(coverages);
      const [width, widthSE] = summarize(widths);

      summary.push({
        case: scenario,
        attempts: seriesSeeds.length,
        successes: coverages.length,
        failures,
        coverage,
        coverageSE,
        width,
        widthSE,
      });
    }

    const recorded = [
      { case: "stable", coverage: 0.375, coverageSE: 0.125, width: 0.5083, widthSE: 0.0188 },
      { case: "changing", coverage: 0.375, coverageSE: 0.125, width: 0.5587, widthSE: 0.0106 },
      { case: "flat", coverage: 0.5, coverageSE: 0.2041, width: 0.5221, widthSE: 0.0318 },
      { case: "logistic-mixed", coverage: 1, coverageSE: 0, width: 3.6851, widthSE: 0.0731 },
      { case: "shock", coverage: 0, coverageSE: 0, width: 0.5083, widthSE: 0.0188 },
    ];

    expect(summary).toHaveLength(recorded.length);

    for (const [index, result] of summary.entries()) {
      const expected = recorded[index];

      expect(result.case).toBe(expected?.case);
      expect(result.attempts).toBe(4);
      expect(result.successes).toBe(4);
      expect(result.failures).toEqual([]);
      expect(result.coverage).toBe(expected?.coverage);
      expect(result.coverageSE).toBeCloseTo(expected?.coverageSE ?? NaN, 3);
      expect(result.width).toBeCloseTo(expected?.width ?? NaN, 2);
      expect(result.widthSE).toBeCloseTo(expected?.widthSE ?? NaN, 3);
    }
  });

  it("rejects malformed rows before options; skips unsupported and empty runtime paths", async () => {
    const model = await linearModel();

    const rowError = await Effect.runPromise(
      Effect.flip(predictUncertainty(model, ["bad"], { seed: -1 })),
    );

    expect(rowError).toBeInstanceOf(InputValidationError);

    if (rowError instanceof InputValidationError) {
      expect(rowError.input).toBe("prediction-timestamps");
    }

    const ols = await Effect.runPromise(
      fit(history).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const unsupported = await Effect.runPromise(
      Effect.flip(predictUncertainty(ols, future, { seed: 1 })),
    );

    expect(unsupported).toBeInstanceOf(PredictionError);

    if (unsupported instanceof PredictionError) {
      expect(unsupported.reason).toBe("unsupported-uncertainty");
    }

    const oversizedRows = Array.from({ length: 500 }, () => future[0] ?? "");

    const budget = await Effect.runPromise(
      Effect.flip(predictUncertainty(model, oversizedRows, { seed: 1, samples: 2048 })),
    );

    expect(budget).toBeInstanceOf(PredictionError);

    if (budget instanceof PredictionError) {
      expect(budget.reason).toBe("simulation-limit");
    }
  });

  it("keeps option, model, support, alignment and budget failure precedence", async () => {
    const model = await linearModel();

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    const invalidModel = { ...model, noiseScale: -1 };
    const empty = await Effect.runPromise(predictUncertainty(invalidModel, [], { seed: 1 }));

    expect(empty.kind).toBe("intervals");

    const badOptions = await Effect.runPromise(
      Effect.flip(predictUncertainty(invalidModel, future, { seed: -1 })),
    );

    expect(badOptions).toBeInstanceOf(InputValidationError);

    const invalid = await Effect.runPromise(
      Effect.flip(
        predictUncertainty(
          invalidModel,
          [{ timestamp: "2025-01-08T00:00:00.000Z", regressors: { absent: 1 } }],
          { seed: 1 },
        ),
      ),
    );

    expect(invalid).toBeInstanceOf(PredictionError);

    if (invalid instanceof PredictionError) {
      expect(invalid.reason).toBe("invalid-model");
    }

    const missingNoise = JSON.parse(JSON.stringify(model));
    delete missingNoise.noiseScale;

    const legacy = await Effect.runPromise(
      Effect.flip(predictUncertainty(missingNoise, future, { seed: 1 })),
    );

    expect(legacy).toBeInstanceOf(PredictionError);

    if (legacy instanceof PredictionError) {
      expect(legacy.reason).toBe("invalid-model");
    }

    const ols = await Effect.runPromise(
      fit(history).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const unsupported = await Effect.runPromise(
      Effect.flip(
        predictUncertainty(ols, [{ timestamp: "2025-01-08T00:00:00.000Z", capacity: 10 }], {
          seed: 1,
        }),
      ),
    );

    expect(unsupported).toBeInstanceOf(PredictionError);

    if (unsupported instanceof PredictionError) {
      expect(unsupported.reason).toBe("unsupported-uncertainty");
    }
  });

  it("ends one safe public/child trace through real generated WASM", async () => {
    const model = await linearModel();

    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      predictUncertainty(model, future, { seed: 42, samples: 8 }).pipe(
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    const publicSpan = spans.find((span) => span.name === "Prophet.predictUncertainty");
    const boundary = spans.find((span) => span.name === "effect-prophet.wasm.simulate");

    if (
      publicSpan === undefined ||
      boundary === undefined ||
      !Predicate.isTagged("Ended")(publicSpan.status) ||
      !Predicate.isTagged("Ended")(boundary.status)
    ) {
      throw new Error("Expected complete uncertainty trace");
    }

    expect(boundary.traceId).toBe(publicSpan.traceId);
    expect(boundary.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicSpan.spanId);
    expect(Exit.isSuccess(boundary.status.exit)).toBe(true);
    expect(boundary.status.startTime).toBeGreaterThanOrEqual(publicSpan.status.startTime);
    expect(boundary.status.endTime).toBeLessThanOrEqual(publicSpan.status.endTime);
    expect(Object.fromEntries(boundary.attributes)).toEqual({
      "effect_prophet.operation": "simulate",
      "effect_prophet.backend.type": "rust-wasm",
      "effect_prophet.model.type": "linear-piecewise-map",
      "effect_prophet.output.kind": "intervals",
      "effect_prophet.prediction.count": 3,
      "effect_prophet.sample.count": 8,
    });

    spans.length = 0;

    await Effect.runPromise(
      predictUncertainty(model, [], { seed: 42 }).pipe(Effect.withTracer(tracer)),
    );
    await Effect.runPromise(
      predictUncertainty(model, future, { seed: -1 }).pipe(Effect.withTracer(tracer), Effect.exit),
    );

    const excessiveRows = Array.from({ length: 500 }, () => future[0] ?? "");
    await Effect.runPromise(
      predictUncertainty(model, excessiveRows, { seed: 1, samples: 2048 }).pipe(
        Effect.withTracer(tracer),
        Effect.exit,
      ),
    );

    if (model.model === "linear-piecewise-map") {
      await Effect.runPromise(
        predictUncertainty({ ...model, noiseScale: -1 }, future, { seed: 1 }).pipe(
          Effect.withTracer(tracer),
          Effect.exit,
        ),
      );
    }

    expect(spans.some((span) => span.name === "effect-prophet.wasm.simulate")).toBe(false);
  });
});
