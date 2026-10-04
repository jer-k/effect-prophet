import { readFile } from "node:fs/promises";

import { Cause, Effect, Exit, Option, Schema, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, InputValidationError, ModelSerializationError } from "../src/errors";
import { fit, predict, predictUncertainty } from "../src/prophet";
import { crossValidate } from "../src/evaluation";
import { decodeFittedModel, encodeFittedModel } from "../src/model-serialization";
import { prophetFittingBackendLayer } from "../src/internal/prophet-fitting-backend";
import { type EncodedLogisticOptimizer } from "../src/logistic-optimizer";
import { builtInSeasonalitiesOff } from "./helpers/built-in-seasonalities";
import { requireEndedSpan } from "./internal/tracing-test-helpers";

const day = 86_400_000;

const epoch = Date.parse("2020-01-01T00:00:00.000Z");

const rows = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    timestamp: new Date(epoch + index * day).toISOString(),
    value: 100 / (1 + Math.exp(-6 * (index / (count - 1) - 0.45))) + 0.13 * Math.sin(index * 1.731),
    capacity: 100,
  }));

const options = {
  growth: "logistic",
  builtInSeasonalities: builtInSeasonalitiesOff,
  map: { changepoints: { mode: "explicit", timestamps: [] } },
} as const;

const OracleSchema = Schema.Struct({
  cases: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      scaling: Schema.Literals(["absmax", "minmax"]),
      fitted: Schema.optionalKey(
        Schema.Struct({
          observations: Schema.Array(
            Schema.Struct({
              timestamp: Schema.String,
              value: Schema.Finite,
              capacity: Schema.Finite,
            }),
          ),
          scale: Schema.Finite,
          objective: Schema.Finite,
          stationarityResidual: Schema.Finite,
          normalizedNoise: Schema.Finite,
          rate: Schema.Finite,
          offset: Schema.Finite,
          predictionTimes: Schema.Array(Schema.Finite),
          predictionCapacities: Schema.Array(Schema.Finite),
          trend: Schema.Array(Schema.Finite),
        }),
      ),
    }),
  ),
});

const oracle = async () => {
  const input: unknown = JSON.parse(
    await readFile(
      new URL(
        "../integration/fixtures/prophet-1.4.0/stan-logistic-objective.json",
        import.meta.url,
      ),
      "utf8",
    ),
  );

  return Effect.runPromise(Schema.decodeUnknownEffect(OracleSchema)(input));
};

describe("public logistic Stan optimizer lifecycle", () => {
  it.each([
    "implicit-empty-loose",
    "implicit-empty-loose-benchmark-absmax",
    "implicit-empty-loose-benchmark-minmax",
  ])("fits the frozen private score and actual public fold for %s", async (id) => {
    const selected = (await oracle()).cases.find((candidate) => candidate.id === id);
    const fixture = selected?.fitted;

    if (selected === undefined || fixture === undefined)
      throw new Error(`Missing frozen logistic fit ${id}`);

    const model = await Effect.runPromise(
      fit(fixture.observations, {
        ...options,
        scaling: selected.scaling,
        map: { ...options.map, changepointPriorScale: 10 },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "logistic-piecewise-map") throw new Error("Expected logistic MAP");

    expect(model.fitSummary.method).toBe("logistic-piecewise-map-stan-v2");
    expect(model.deltas).toEqual([]);
    expect(model.changepointTimestamps).toEqual([]);
    expect(model.coefficients).toEqual([]);
    expect(Math.abs(model.fitSummary.objective - fixture.objective)).toBeLessThanOrEqual(0.01);
    expect(
      Math.abs(model.fitSummary.stationarityResidual - fixture.stationarityResidual),
    ).toBeLessThanOrEqual(0.01);
    expect(
      Math.abs(model.noiseScale / fixture.scale - fixture.normalizedNoise),
    ).toBeLessThanOrEqual(0.0002);
    expect(Math.abs(model.rate - fixture.rate)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(model.offset - fixture.offset)).toBeLessThanOrEqual(0.01);

    const first = fixture.observations[0];
    const last = fixture.observations.at(-1);

    if (first === undefined || last === undefined) throw new Error("Expected frozen history");
    const origin = Date.parse(first.timestamp);
    const span = Date.parse(last.timestamp) - origin;

    const predictionRows = fixture.predictionTimes.map((time, index) => ({
      timestamp: new Date(origin + Math.round(time * span)).toISOString(),
      capacity: fixture.predictionCapacities[index],
    }));

    const forecasts = await Effect.runPromise(predict(model, predictionRows));
    forecasts.forEach((forecast, index) =>
      expect(Math.abs(forecast.trend - (fixture.trend[index] ?? Number.NaN))).toBeLessThanOrEqual(
        0.01,
      ),
    );

    const restored = await Effect.runPromise(
      encodeFittedModel(model).pipe(Effect.flatMap(decodeFittedModel)),
    );

    expect(restored).toEqual(model);
    expect(await Effect.runPromise(predict(restored, predictionRows))).toEqual(forecasts);
    expect(
      await Effect.runPromise(
        predictUncertainty(restored, predictionRows, {
          seed: 19,
          samples: 32,
        }),
      ),
    ).toEqual(
      await Effect.runPromise(predictUncertainty(model, predictionRows, { seed: 19, samples: 32 })),
    );
  });

  it.each([
    [99, false, "auto", "newton"],
    [100, false, "auto", "lbfgs"],
    [99, true, "auto", "lbfgs"],
    [100, false, "newton", "newton"],
    [99, false, "lbfgs", "lbfgs"],
  ] as const)(
    "counts retained rows and reports honest one-step completion (%i, duplicate=%s, %s)",
    async (count, duplicate, algorithm, actual) => {
      const observations = rows(count);
      const last = observations.at(-1);

      if (duplicate && last !== undefined) observations.push({ ...last, value: last.value + 0.03 });

      const optimizer: EncodedLogisticOptimizer =
        algorithm === "newton"
          ? { algorithm, maxIterations: 1 }
          : { algorithm, maxIterations: 1, fallback: "none" };

      const model = await Effect.runPromise(
        fit(observations, {
          ...options,
          map: { ...options.map, optimizer },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      if (
        model.model !== "logistic-piecewise-map" ||
        model.fitSummary.method !== "logistic-piecewise-map-stan-v2"
      )
        throw new Error("Expected logistic Stan fit");
      expect(model.fitSummary).toMatchObject({
        iterations: 1,
        observationCount: observations.length,
        termination: "iteration-limit",
        optimization: {
          algorithm: actual,
          attemptCount: 1,
          failedAttemptIterations: null,
          hessianResets: 0,
        },
      });
      const encoded = await Effect.runPromise(encodeFittedModel(model));
      expect(await Effect.runPromise(decodeFittedModel(encoded))).toEqual(model);

      const failure = await Effect.runPromise(
        Effect.flip(
          decodeFittedModel({
            ...encoded,
            fitSummary: {
              ...model.fitSummary,
              termination: actual === "newton" ? "absolute-gradient" : "objective-change",
            },
          }),
        ),
      );

      expect(failure).toBeInstanceOf(ModelSerializationError);
    },
  );

  it("restores historical proximal models without pretending they used Stan", async () => {
    const model = await Effect.runPromise(
      fit(rows(12), {
        ...options,
        map: { ...options.map, optimizer: { algorithm: "proximal" } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "logistic-piecewise-map") throw new Error("Expected logistic MAP");
    expect(model.fitSummary.method).toBe("logistic-piecewise-map-proximal-v1");
    expect(model.fitSummary).not.toHaveProperty("optimization");

    const restored = await Effect.runPromise(
      encodeFittedModel(model).pipe(Effect.flatMap(decodeFittedModel)),
    );

    expect(restored).toEqual(model);
    const future = [{ timestamp: new Date(epoch + 13 * day).toISOString(), capacity: 100 }];
    expect(await Effect.runPromise(predict(restored, future))).toEqual(
      await Effect.runPromise(predict(model, future)),
    );
  });

  it.each(["newton", "lbfgs"] as const)(
    "preserves %s controls and public fold state across CV",
    async (algorithm) => {
      const observations = rows(24);

      const optimizer: EncodedLogisticOptimizer =
        algorithm === "newton"
          ? { algorithm, maxIterations: 1 }
          : { algorithm, maxIterations: 1, fallback: "none" };

      const changepoint = new Date(epoch + 7 * day).toISOString();

      const requested = {
        ...options,
        map: { optimizer, changepoints: { mode: "explicit" as const, timestamps: [changepoint] } },
      };

      const result = await Effect.runPromise(
        crossValidate(observations, requested, {
          horizonMs: 2 * day,
          cutoffs: {
            mode: "explicit",
            timestamps: [changepoint, new Date(epoch + 12 * day).toISOString()],
          },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(result.folds.map((fold) => fold.model)).toEqual([
        "logistic-piecewise-map",
        "logistic-piecewise-map",
      ]);

      for (const [fold, lastIndex] of [7, 12].entries()) {
        const model = await Effect.runPromise(
          fit(observations.slice(0, lastIndex + 1), {
            ...requested,
            map: {
              optimizer,
              changepoints: { mode: "explicit", timestamps: lastIndex === 7 ? [] : [changepoint] },
            },
          }).pipe(Effect.provide(prophetFittingBackendLayer)),
        );

        if (
          model.model !== "logistic-piecewise-map" ||
          model.fitSummary.method !== "logistic-piecewise-map-stan-v2"
        )
          throw new Error("Expected logistic Stan fit");
        expect(model.fitSummary.optimization.algorithm).toBe(algorithm);
        expect(model.deltas).toHaveLength(lastIndex === 7 ? 0 : 1);

        const forecasts = await Effect.runPromise(
          predict(
            model,
            observations
              .slice(lastIndex + 1, lastIndex + 3)
              .map((row) => ({ timestamp: row.timestamp, capacity: row.capacity })),
          ),
        );

        expect(result.rows.filter((row) => row.fold === fold).map((row) => row.predicted)).toEqual(
          forecasts.map((row) => row.value),
        );
      }
    },
  );

  it("reduces automatic candidates for minimal histories and preserves repeated generated candidates", async () => {
    for (const observations of [
      rows(2),
      [rows(3)[0], rows(3)[1], rows(3)[1], rows(3)[2]].filter((row) => row !== undefined),
    ]) {
      const model = await Effect.runPromise(
        fit(observations, {
          ...options,
          map: {
            changepoints: { mode: "auto", count: 25, range: 1 },
            optimizer: { algorithm: "newton", maxIterations: 1 },
          },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      if (model.model !== "logistic-piecewise-map") throw new Error("Expected logistic MAP");
      expect(model.changepointTimestamps).toHaveLength(observations.length - 1);
      expect(model.deltas).toHaveLength(model.changepointTimestamps.length);
      expect(model.fitSummary.observationCount).toBe(observations.length);
      expect(model.changepointTimestamps).toEqual(
        observations.slice(1).map((row) => Date.parse(row.timestamp)),
      );
    }
  });

  it("sorts irregular subdaily histories stably without merging prediction instances", async () => {
    const observations = rows(12).map((row, index) => ({
      ...row,
      timestamp: new Date(epoch + (index * index * day) / 24).toISOString(),
    }));

    const requested = {
      ...options,
      map: { ...options.map, optimizer: { algorithm: "newton" as const, maxIterations: 1 } },
    };

    const model = await Effect.runPromise(
      fit(observations, requested).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(
      await Effect.runPromise(
        fit(observations.slice().reverse(), requested).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      ),
    ).toEqual(model);

    const forecasts = await Effect.runPromise(
      predict(model, [
        { timestamp: new Date(epoch + 9 * day).toISOString(), capacity: 100 },
        { timestamp: new Date(epoch + 8 * day).toISOString(), capacity: 100 },
        { timestamp: new Date(epoch + 9 * day).toISOString(), capacity: 200 },
      ]),
    );

    expect(forecasts.map((row) => row.timestamp)).toEqual([
      epoch + 9 * day,
      epoch + 8 * day,
      epoch + 9 * day,
    ]);
    expect(forecasts[2]?.trend).toBeCloseTo(2 * (forecasts[0]?.trend ?? Number.NaN), 12);
  });

  it("preserves parentage and safe completion/failure evidence across real fallback boundaries", async () => {
    const run = async (fallback: "newton" | "none") => {
      const spans: Array<Tracer.Span> = [];

      const tracer = Tracer.make({
        span: (input) => {
          const span = new Tracer.NativeSpan(input);
          spans.push(span);

          return span;
        },
      });

      const result = await Effect.runPromise(
        fit(rows(99), {
          ...options,
          map: {
            ...options.map,
            optimizer: {
              algorithm: "lbfgs",
              fallback,
              lbfgs: { initAlpha: 1e300 },
            },
          },
        }).pipe(
          Effect.provide(prophetFittingBackendLayer),
          Effect.withSpan("logistic.job"),
          Effect.withTracer(tracer),
          Effect.match({
            onFailure: (error) => error,
            onSuccess: (model) => model,
          }),
        ),
      );

      const parent = spans.find((span) => span.name === "Prophet.fit");
      const boundary = spans.find((span) => span.name === "effect-prophet.wasm.fit");
      const optionsSpan = spans.find((span) => span.name === "decodeOptions");
      const optimizerSpan = spans.find((span) => span.name === "decodeLogisticOptimizer");

      if (optionsSpan === undefined || optimizerSpan === undefined)
        throw new Error("Missing optimizer parsing spans");
      const optionsStatus = requireEndedSpan(optionsSpan);
      const optimizerStatus = requireEndedSpan(optimizerSpan);
      expect(optimizerSpan.traceId).toBe(optionsSpan.traceId);
      expect(Option.getOrUndefined(optimizerSpan.parent)?.spanId).toBe(optionsSpan.spanId);
      expect(optimizerStatus.startTime).toBeGreaterThanOrEqual(optionsStatus.startTime);
      expect(optimizerStatus.endTime).toBeLessThanOrEqual(optionsStatus.endTime);
      expect(Exit.isSuccess(optimizerStatus.exit)).toBe(true);

      if (parent === undefined || boundary === undefined) throw new Error("Missing logistic spans");
      const parentStatus = requireEndedSpan(parent);
      const status = requireEndedSpan(boundary);
      expect(boundary.traceId).toBe(parent.traceId);
      expect(Option.getOrUndefined(boundary.parent)?.spanId).toBe(parent.spanId);
      expect(status.startTime).toBeGreaterThanOrEqual(parentStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(parentStatus.endTime);
      expect(Object.fromEntries(boundary.attributes)).toMatchObject({
        "effect_prophet.optimizer.requested_algorithm": "lbfgs",
        "effect_prophet.optimizer.fallback": fallback,
        "effect_prophet.optimizer.max_iterations": 10_000,
      });

      const safeKeys = new Set([
        "effect_prophet.backend.type",
        "effect_prophet.operation",
        "effect_prophet.model.type",
        "effect_prophet.growth",
        "effect_prophet.observation.count",
        "effect_prophet.seasonality.count",
        "effect_prophet.coefficient.count",
        "effect_prophet.scaling.mode",
        "effect_prophet.component.mode",
        "effect_prophet.optimizer.requested_algorithm",
        "effect_prophet.optimizer.max_iterations",
        "effect_prophet.optimizer.fallback",
        "effect_prophet.optimizer.algorithm",
        "effect_prophet.optimizer.termination",
        "effect_prophet.optimizer.iteration.count",
        "effect_prophet.optimizer.attempt.count",
        "effect_prophet.optimizer.hessian_reset.count",
        "effect_prophet.optimizer.failed_attempt.iteration.count",
      ]);

      expect([...boundary.attributes.keys()].every((key) => safeKeys.has(key))).toBe(true);

      return { result, status, boundary };
    };

    const failed = await run("none");
    expect(failed.result).toBeInstanceOf(FittingError);
    expect(Exit.isFailure(failed.status.exit)).toBe(true);

    if (Exit.isFailure(failed.status.exit)) {
      expect(Option.getOrUndefined(Cause.findErrorOption(failed.status.exit.cause))).toBe(
        failed.result,
      );
    }

    if (!(failed.result instanceof FittingError))
      throw new Error("Expected optimizer failure evidence");
    expect(failed.result.cause).toMatchObject({
      first: { reason: "line-search-failure" },
      fallback: null,
    });
    expect(failed.boundary.attributes.has("effect_prophet.optimizer.termination")).toBe(false);

    const completed = await run("newton");

    if (completed.result instanceof Error || completed.result.model !== "logistic-piecewise-map")
      throw new Error("Expected fallback fit");
    expect(completed.result.fitSummary).toMatchObject({
      optimization: { algorithm: "newton", attemptCount: 2 },
    });
    expect(Exit.isSuccess(completed.status.exit)).toBe(true);
    expect(Object.fromEntries(completed.boundary.attributes)).toMatchObject({
      "effect_prophet.optimizer.algorithm": "newton",
      "effect_prophet.optimizer.attempt.count": 2,
    });

    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (input) => {
        const span = new Tracer.NativeSpan(input);
        spans.push(span);

        return span;
      },
    });

    const invalid = await Effect.runPromise(
      Effect.flip(
        fit(rows(12), {
          ...options,
          map: { optimizer: { algorithm: "newton", maxIterations: 0 } },
        }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(invalid).toBeInstanceOf(InputValidationError);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });
});
