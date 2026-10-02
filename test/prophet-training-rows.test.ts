import { Effect, Exit, Option, Predicate, Result, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  predictUncertainty,
  prophetFittingBackendLayer,
  FittingError,
  type EncodedProphetOptions,
} from "../src/index";

const origin = Date.parse("2024-01-01T00:00:00.000Z");

const at = (day: number) => new Date(origin + day * 86400000).toISOString();

const automatic = { changepoints: { mode: "auto", count: 25, range: 0.8 } } as const;

const seasonalities = [{ name: "weekly-custom", periodDays: 7, fourierOrder: 1 }] as const;

const conditional = [{ ...seasonalities[0], conditionName: "active" }] as const;

const regressors = [{ name: "promotion", standardization: "never" }] as const;

const cases: ReadonlyArray<{
  readonly name: string;
  readonly features: "none" | "conditional" | "logistic";
  readonly options: EncodedProphetOptions;
}> = [
  { name: "OLS", features: "none", options: {} },
  { name: "featureless MAP", features: "none", options: { map: automatic } },
  {
    name: "additive seasonal MAP",
    features: "none",
    options: { map: automatic, seasonalities, builtInSeasonalities: { weekly: "auto" } },
  },
  {
    name: "additional-feature MAP",
    features: "conditional",
    options: { map: automatic, seasonalities: conditional, regressors },
  },
  {
    name: "mixed MAP",
    features: "conditional",
    options: {
      map: automatic,
      seasonalityMode: "multiplicative",
      seasonalities: conditional,
      regressors,
    },
  },
  { name: "reduced flat MAP", features: "none", options: { growth: "flat", seasonalities } },
  {
    name: "mixed flat MAP",
    features: "conditional",
    options: {
      growth: "flat",
      seasonalityMode: "multiplicative",
      seasonalities: conditional,
      regressors,
    },
  },
  { name: "logistic MAP", features: "logistic", options: { growth: "logistic", map: automatic } },
];

describe("Prophet training-row policy through generated WASM", () => {
  it.each(cases)(
    "preserves aligned duplicate rows through $name, prediction, persistence and uncertainty",
    async ({ features, options }) => {
      const history = Array.from({ length: 96 }, (_, index) => {
        const day = Math.floor(index / 4);
        const promotion = index % 4 === 0 ? 1 : 0;
        const active = index % 4 !== 1;

        const trend =
          features === "logistic" ? 100 / (1 + Math.exp(-6 * (day / 23 - 0.45))) : 12 + day * 0.15;

        const value =
          trend +
          0.15 * Math.sin(index * 1.73) +
          (features === "conditional"
            ? 0.5 * promotion + (active ? 0.7 * Math.sin((2 * Math.PI * day) / 7) : 0)
            : 0);

        const row = { timestamp: at(day), value };

        if (features === "conditional")
          return { ...row, regressors: { promotion }, conditions: { active } };

        if (features === "logistic") return { ...row, capacity: 100, floor: 0 };

        return row;
      });

      // Reverse timestamp groups without reversing ties, so stable order is identical.
      const shuffled = Array.from({ length: 24 }, (_, index) =>
        history.slice((23 - index) * 4, (24 - index) * 4),
      ).flat();

      const before = JSON.stringify(shuffled);

      const model = await Effect.runPromise(
        fit(shuffled, options).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      const sortedModel = await Effect.runPromise(
        fit(history, options).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(model).toEqual(sortedModel);
      expect(JSON.stringify(shuffled)).toBe(before);

      if (model.model !== "linear-trend") expect(model.fitSummary.observationCount).toBe(96);

      if (model.model === "linear-piecewise-map" || model.model === "logistic-piecewise-map") {
        expect(model.changepointTimestamps).toHaveLength(25);
        expect(new Set(model.changepointTimestamps).size).toBeLessThan(25);
      }

      const future = [34, 32, 32].map((day, index) => {
        const row = { timestamp: at(day) };

        if (features === "conditional")
          return {
            ...row,
            regressors: { promotion: index % 2 },
            conditions: { active: index !== 2 },
          };

        if (features === "logistic") return { ...row, capacity: 100 + index * 10, floor: 0 };

        return row;
      });

      const forecasts = await Effect.runPromise(predict(model, future));
      const encoded = await Effect.runPromise(encodeFittedModel(model));

      const restored = await Effect.runPromise(
        decodeFittedModel(JSON.parse(JSON.stringify(encoded))),
      );

      expect(await Effect.runPromise(predict(restored, future))).toEqual(forecasts);
      expect(forecasts.map((row) => row.timestamp)).toEqual(
        future.map((row) => Date.parse(row.timestamp)),
      );
      expect(forecasts.every((row) => Number.isFinite(row.value))).toBe(true);

      if (model.model !== "linear-trend") {
        const controls = { seed: 42, samples: 16, output: "samples" } as const;
        const samples = await Effect.runPromise(predictUncertainty(model, future, controls));
        const replay = await Effect.runPromise(predictUncertainty(restored, future, controls));

        expect(replay).toEqual(samples);
        expect(samples.kind).toBe("samples");

        if (samples.kind === "samples")
          expect(Array.from(samples.value).every(Number.isFinite)).toBe(true);
      }
    },
  );

  it("counts repeated target rows independently in OLS rather than deduplicating or averaging dates", async () => {
    const model = await Effect.runPromise(
      fit([
        { timestamp: at(2), value: 2 },
        { timestamp: at(1), value: 1 },
        { timestamp: at(0), value: 0 },
        { timestamp: at(1), value: 5 },
      ]).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const forecasts = await Effect.runPromise(predict(model, [at(0), at(1), at(2)]));

    expect(forecasts.map((row) => row.value)).toEqual([1, 2, 3]);
  });

  it.each([
    { growth: "linear", options: { growth: "linear", map: automatic } },
    { growth: "flat", options: { growth: "flat", seasonalities: [] } },
    { growth: "logistic", options: { growth: "logistic", map: automatic } },
  ] satisfies ReadonlyArray<{ growth: string; options: EncodedProphetOptions }>)(
    "handles zero-span $growth histories without manufacturing a successful NaN model",
    async ({ growth, options }) => {
      const history = [2, 4, 7].map((value) =>
        growth === "logistic"
          ? { timestamp: at(0), value, capacity: 10 }
          : { timestamp: at(0), value },
      );

      const result = await Effect.runPromise(
        Effect.result(fit(history, options).pipe(Effect.provide(prophetFittingBackendLayer))),
      );

      if (growth === "flat") {
        expect(result._tag).toBe("Success");

        if (Result.isSuccess(result)) {
          const forecasts = await Effect.runPromise(predict(result.success, [at(0), at(1)]));
          expect(forecasts.every((row) => Number.isFinite(row.value))).toBe(true);
        }
      } else {
        expect(result._tag).toBe("Failure");

        if (Result.isFailure(result)) {
          expect(result.failure).toBeInstanceOf(FittingError);

          if (result.failure instanceof FittingError)
            expect(result.failure.reason).toBe("degenerate-observations");
        }
      }
    },
  );

  it("retains explicit duplicate-changepoint rejection before WASM and traces valid duplicate fits", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const history = [0, 1, 1, 2, 3].map((day, index) => ({
      timestamp: at(day),
      value: 2 + day + index * 0.1,
    }));

    const invalid = await Effect.runPromise(
      Effect.flip(
        fit(history, {
          map: { changepoints: { mode: "explicit", timestamps: [at(1), at(1)] } },
        }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(invalid._tag).toBe("InputValidationError");
    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
    spans.length = 0;

    await Effect.runPromise(
      fit(history).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("training.job"),
        Effect.withTracer(tracer),
      ),
    );
    const boundary = spans.find((span) => span.name === "effect-prophet.wasm.fit");
    const operation = spans.find((span) => span.name === "Prophet.fit");
    const job = spans.find((span) => span.name === "training.job");

    if (boundary === undefined || operation === undefined || job === undefined)
      throw new Error("Expected complete fit tracing");

    if (
      !Predicate.isTagged("Ended")(boundary.status) ||
      !Predicate.isTagged("Ended")(operation.status) ||
      !Predicate.isTagged("Ended")(job.status)
    )
      throw new Error("Expected ended spans");
    expect(Exit.isSuccess(boundary.status.exit)).toBe(true);
    expect(Exit.isSuccess(operation.status.exit)).toBe(true);
    expect(boundary.traceId).toBe(job.traceId);
    expect(operation.traceId).toBe(job.traceId);
    expect(Option.isSome(boundary.parent) && boundary.parent.value.spanId).toBe(operation.spanId);
    expect(Option.isSome(operation.parent) && operation.parent.value.spanId).toBe(job.spanId);
    expect(boundary.status.startTime >= operation.status.startTime).toBe(true);
    expect(boundary.status.endTime <= operation.status.endTime).toBe(true);
    expect(operation.status.startTime >= job.status.startTime).toBe(true);
    expect(operation.status.endTime <= job.status.endTime).toBe(true);
    expect(boundary.attributes.get("effect_prophet.observation.count")).toBe(5);
  });
});
