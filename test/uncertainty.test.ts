import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
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
