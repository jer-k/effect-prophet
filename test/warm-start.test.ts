import { Effect, Exit, Match, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  crossValidate,
  fit,
  prophetFittingBackendLayer,
  warmStartParameters,
  type EncodedMapOptions,
  type EncodedProphetOptions,
  type FittedProphet,
  type Growth,
  type WarmStartParameters,
} from "../src/index";
import { expectInputValidationError } from "./helpers/input-validation-error";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const day = (offset: number) => new Date(Date.UTC(2025, 0, 1 + offset)).toISOString();

const weeklyOnly = { daily: "off", weekly: { mode: "on" }, yearly: "off" } as const;

const history = (length: number) =>
  Array.from({ length }, (_, offset) => ({
    timestamp: day(offset),
    value:
      50 +
      0.4 * offset +
      (offset > length / 2 ? 0.3 * (offset - length / 2) : 0) +
      4 * Math.sin((2 * Math.PI * offset) / 7) +
      Math.sin(offset * 12.9898),
  }));

const logisticHistory = (length: number) =>
  history(length).map((row, offset) => ({
    ...row,
    value: 80 / (1 + Math.exp(-(offset - length / 2) / 8)) + Math.sin(offset * 12.9898),
    capacity: 90,
  }));

const fitModel = (
  rows: Parameters<typeof fit>[0],
  options: EncodedProphetOptions,
): Promise<FittedProphet> =>
  Effect.runPromise(fit(rows, options).pipe(Effect.provide(prophetFittingBackendLayer)));

const traceFit = async (rows: Parameters<typeof fit>[0], options: EncodedProphetOptions) => {
  const { spans, tracer } = collectTestSpans();

  const exit = await Effect.runPromiseExit(
    fit(rows, options).pipe(
      Effect.provide(prophetFittingBackendLayer),
      Effect.withSpan("warm-start.job"),
      Effect.withTracer(tracer),
    ),
  );

  return { exit, spans };
};

const withWarmStart = (
  options: EncodedProphetOptions,
  warmStart: WarmStartParameters,
): EncodedProphetOptions => ({ ...options, map: { ...options.map, warmStart } });

const growthOptions = (growth: Growth, map: EncodedMapOptions = {}): EncodedProphetOptions =>
  Match.value(growth).pipe(
    Match.when("flat", (flat): EncodedProphetOptions => ({
      growth: flat,
      builtInSeasonalities: weeklyOnly,
      map,
    })),
    Match.when("logistic", (logistic): EncodedProphetOptions => ({
      growth: logistic,
      builtInSeasonalities: weeklyOnly,
      map,
    })),
    Match.when("linear", (linear): EncodedProphetOptions => ({
      growth: linear,
      builtInSeasonalities: weeklyOnly,
      map,
    })),
    Match.exhaustive,
  );

const warmStartAttributes = [
  "effect_prophet.optimizer.initialization",
  "effect_prophet.optimizer.warm_start.delta",
  "effect_prophet.optimizer.warm_start.beta",
];

describe("warmStartParameters", () => {
  it("reads linear MAP state in Stan's scaled units", async () => {
    const rows = history(60).map((row, offset) => ({
      ...row,
      regressors: { promotion: offset % 5 === 0 ? 1 : 0 },
    }));

    const model = await fitModel(rows, {
      builtInSeasonalities: weeklyOnly,
      events: [{ name: "launch", date: "2025-01-13" }],
      regressors: [{ name: "promotion", standardization: "never" }],
      map: { changepoints: { mode: "auto", count: 4 } },
    });

    if (model.model !== "linear-piecewise-map") throw new Error("Expected a linear model");

    const scale = model.targetScaling.scale;
    const parameters = warmStartParameters(model);

    expect(parameters).toEqual({
      k: model.slope / scale,
      m: model.intercept / scale,
      sigmaObs: model.noiseScale / scale,
      delta: model.deltas.map((delta) => delta / scale),
      beta: [
        ...model.coefficients,
        ...model.eventCoefficients,
        ...model.regressors.map((regressor) => regressor.coefficient),
      ].map((coefficient) => coefficient / scale),
    });
    expect(parameters.delta).toHaveLength(4);
    expect(parameters.beta).toHaveLength(8);
    expect(Object.isFrozen(parameters)).toBe(true);
    expect(Object.isFrozen(parameters.delta)).toBe(true);
    expect(Object.isFrozen(parameters.beta)).toBe(true);
  });

  it("keeps Stan's single zero delta and beta when a model has no changepoints or features", async () => {
    const model = await fitModel(history(30), {
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
      map: { changepoints: { mode: "explicit", timestamps: [] } },
    });

    expect(warmStartParameters(model)).toMatchObject({ delta: [0], beta: [0] });
  });

  it("leaves multiplicative coefficients dimensionless", async () => {
    const rows = history(60).map((row, offset) => ({ ...row, regressors: { price: offset % 3 } }));

    const model = await fitModel(rows, {
      seasonalityMode: "multiplicative",
      builtInSeasonalities: weeklyOnly,
      regressors: [{ name: "price", mode: "additive", standardization: "never" }],
    });

    const regressor = model.regressors[0];

    if (model.model !== "linear-piecewise-map" || regressor === undefined) {
      throw new Error("Expected a linear model with one regressor");
    }

    // Weekly factors are multiplicative; the additive regressor carries the target scale.
    expect(warmStartParameters(model).beta).toEqual([
      ...model.coefficients,
      regressor.coefficient / model.targetScaling.scale,
    ]);
  });

  it("reads flat models without the prior-only rate state they do not keep", async () => {
    const model = await fitModel(history(60), { growth: "flat", builtInSeasonalities: weeklyOnly });

    if (model.model !== "flat-map") throw new Error("Expected a flat model");

    const scale = model.targetScaling.scale;

    expect(warmStartParameters(model)).toEqual({
      k: 0,
      m: model.level / scale,
      sigmaObs: model.noiseScale / scale,
      delta: [],
      beta: model.coefficients.map((coefficient) => coefficient / scale),
    });
  });

  it("reads logistic rates and offsets, which are already dimensionless", async () => {
    const model = await fitModel(logisticHistory(60), {
      growth: "logistic",
      builtInSeasonalities: weeklyOnly,
      map: { changepoints: { mode: "auto", count: 3 } },
    });

    if (model.model !== "logistic-piecewise-map") throw new Error("Expected a logistic model");

    const scale = model.targetScaling.scale;

    expect(warmStartParameters(model)).toEqual({
      k: model.rate,
      m: model.offset,
      sigmaObs: model.noiseScale / scale,
      delta: model.deltas,
      beta: model.coefficients.map((coefficient) => coefficient / scale),
    });
  });
});

describe("map.warmStart", () => {
  it.each([
    { growth: "linear", rows: 60 },
    { growth: "linear", rows: 150 },
    { growth: "flat", rows: 60 },
    { growth: "logistic", rows: 60 },
  ] as const)(
    "refits $growth histories of $rows rows from their own optimum at once",
    async ({ growth, rows }) => {
      const observations = growth === "logistic" ? logisticHistory(rows) : history(rows);
      const options = growthOptions(growth);

      const cold = await fitModel(observations, options);
      const warmStart = warmStartParameters(cold);

      // Options are plain data, so a warm start survives a JSON round trip.
      const serialized: WarmStartParameters = JSON.parse(JSON.stringify(warmStart));
      const warm = await fitModel(observations, withWarmStart(options, serialized));

      expect(warm.fitSummary.iterations).toBeLessThan(cold.fitSummary.iterations);
      expect(warm.fitSummary.objective).toBeLessThanOrEqual(cold.fitSummary.objective + 1e-6);
      expect(Math.abs(warm.noiseScale - cold.noiseScale)).toBeLessThanOrEqual(
        1e-3 * cold.noiseScale,
      );
    },
  );

  it("changes where a budget-limited fit ends", async () => {
    const options = {
      builtInSeasonalities: weeklyOnly,
      map: { optimizer: { algorithm: "newton", maxIterations: 2 } },
    } as const;

    const converged = await fitModel(history(60), { builtInSeasonalities: weeklyOnly });
    const cold = await fitModel(history(60), options);

    const warm = await fitModel(
      history(60),
      withWarmStart(options, warmStartParameters(converged)),
    );

    expect(cold.fitSummary.termination).toBe("iteration-limit");
    expect(warm.fitSummary.objective).toBeLessThan(cold.fitSummary.objective);
    expect(Math.abs(warm.noiseScale - converged.noiseScale)).toBeLessThan(
      Math.abs(cold.noiseScale - converged.noiseScale),
    );
  });

  it("ignores the warm start for a constant history, as Python does", async () => {
    const rows = Array.from({ length: 20 }, (_, offset) => ({ timestamp: day(offset), value: 7 }));

    const options = {
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
    } as const;

    const warmStart = { k: 3, m: -2, sigmaObs: 0.5, delta: [], beta: [] };

    const cold = await fitModel(rows, options);
    const { exit, spans } = await traceFit(rows, withWarmStart(options, warmStart));

    expect(Exit.isSuccess(exit) ? exit.value : undefined).toEqual(cold);

    const boundary = spans.find((span) => span.name === "effect-prophet.wasm.fit");
    const attributes = Object.fromEntries(boundary?.attributes ?? []);

    expect(attributes).toMatchObject({
      "effect_prophet.optimizer.initialization": "warm-start",
      "effect_prophet.optimizer.termination": "constant-target-shortcut",
    });
    expect(attributes).not.toHaveProperty("effect_prophet.optimizer.warm_start.delta");
    expect(attributes).not.toHaveProperty("effect_prophet.optimizer.warm_start.beta");
  });

  it.each([
    { field: "sigmaObs", value: 0 },
    { field: "sigmaObs", value: -1 },
    { field: "k", value: Number.NaN },
    { field: "delta", value: [Number.POSITIVE_INFINITY] },
    { field: "beta", value: "0" },
  ])("rejects $field $value before fitting", async ({ field, value }) => {
    const warmStart = { k: 0, m: 0, sigmaObs: 1, delta: [], beta: [], [field]: value };

    const { exit, spans } = await traceFit(history(30), {
      // SAFETY: deliberately malformed input, typed as callers' untyped JSON would arrive.
      map: { warmStart: warmStart as WarmStartParameters },
    });

    if (!Exit.isFailure(exit)) throw new Error("Expected a validation failure");

    const failure = expectInputValidationError(Option.getOrThrow(Exit.findErrorOption(exit)));

    expect(failure.input).toBe("options");
    expect(failure.issues[0]?.path?.slice(0, 3)).toEqual(["map", "warmStart", field]);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });
});

describe("warm start tracing", () => {
  it("records which parts of the warm start each growth used", async () => {
    for (const growth of ["linear", "flat", "logistic"] as const) {
      const rows = growth === "logistic" ? logisticHistory(60) : history(60);
      const options = growthOptions(growth, { changepoints: { mode: "auto", count: 3 } });

      const warmStart = warmStartParameters(await fitModel(rows, options));
      const { exit, spans } = await traceFit(rows, withWarmStart(options, warmStart));

      const job = spans.find((span) => span.name === "warm-start.job");
      const publicFit = spans.find((span) => span.name === "Prophet.fit");
      const boundary = spans.find((span) => span.name === "effect-prophet.wasm.fit");

      if (job === undefined || publicFit === undefined || boundary === undefined) {
        throw new Error("Expected the complete warm-started fit trace");
      }

      const status = requireEndedSpan(boundary);
      const parentStatus = requireEndedSpan(publicFit);

      expect(Exit.isSuccess(exit)).toBe(true);
      expect(Exit.isSuccess(status.exit)).toBe(true);
      expect(boundary.traceId).toBe(job.traceId);
      expect(Option.getOrUndefined(boundary.parent)?.spanId).toBe(publicFit.spanId);
      expect(status.startTime).toBeGreaterThanOrEqual(parentStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(parentStatus.endTime);

      // A flat model keeps no deltas, so its next fit starts them at Prophet's default.
      expect(Object.fromEntries(boundary.attributes)).toMatchObject({
        "effect_prophet.optimizer.initialization": "warm-start",
        "effect_prophet.optimizer.warm_start.delta": growth === "flat" ? "default" : "warm-start",
        "effect_prophet.optimizer.warm_start.beta": "warm-start",
      });
    }
  });

  it("falls back to Prophet's default for each vector whose length differs", async () => {
    const options = {
      builtInSeasonalities: weeklyOnly,
      map: { changepoints: { mode: "auto", count: 3 } },
    } as const;

    const warmStart = warmStartParameters(await fitModel(history(60), options));

    const { spans } = await traceFit(
      history(60),
      withWarmStart(
        { ...options, map: { changepoints: { mode: "auto", count: 5 } } },
        { ...warmStart, beta: [...warmStart.beta, 0] },
      ),
    );

    const boundary = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    expect(Object.fromEntries(boundary?.attributes ?? [])).toMatchObject({
      "effect_prophet.optimizer.warm_start.delta": "default",
      "effect_prophet.optimizer.warm_start.beta": "default",
    });
  });

  it("adds no warm-start attributes to a cold fit", async () => {
    const { spans } = await traceFit(history(60), { builtInSeasonalities: weeklyOnly });
    const boundary = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    expect(boundary).toBeDefined();

    for (const key of warmStartAttributes) {
      expect(boundary?.attributes.has(key)).toBe(false);
    }
  });

  it("starts every cross-validation fold from the same warm start, as Python's cutoffs do", async () => {
    const rows = history(90);
    const options = { builtInSeasonalities: weeklyOnly } as const;
    const warmStart = warmStartParameters(await fitModel(rows, options));
    const { spans, tracer } = collectTestSpans();

    const result = await Effect.runPromise(
      crossValidate(rows, withWarmStart(options, warmStart), {
        horizonMs: 7 * 86_400_000,
        cutoffs: { mode: "explicit", timestamps: [day(60), day(70)] },
      }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
    );

    const folds = spans.filter((span) => span.name === "effect-prophet.wasm.fit");

    expect(result.folds).toHaveLength(2);
    expect(folds).toHaveLength(2);

    for (const fold of folds) {
      expect(fold.attributes.get("effect_prophet.optimizer.initialization")).toBe("warm-start");
    }
  });
});
