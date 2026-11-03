import { Effect, Exit, Option, Predicate } from "effect";
import { describe, expect, it } from "vitest";

import {
  FittingError,
  InputValidationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  getRegressorCoefficients,
  predict,
  predictUncertainty,
  predictWithIntervals,
  prophetFittingBackendLayer,
  warmStartParameters,
  type EncodedProphetOptions,
  type FittedProphet,
} from "../src/index";
import { isMcmcModel, type FittedMcmcProphet } from "../src/fitted-model";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const day = 86_400_000;

const history = Array.from({ length: 60 }, (_, index) => {
  const promotion = index % 3 === 0 ? 1 : 0;

  return {
    timestamp: new Date(Date.UTC(2025, 0, 1) + index * day).toISOString(),
    value:
      20 +
      index * 0.15 +
      2 * Math.sin((2 * Math.PI * index) / 7) +
      3 * promotion +
      (((index * 37) % 11) - 5) * 0.08,
    regressors: { promotion },
  };
});

const plainHistory = history.map(({ timestamp, value }) => ({ timestamp, value }));

const future = Array.from({ length: 4 }, (_, index) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1) + (60 + index * 5) * day).toISOString(),
  regressors: { promotion: index % 2 },
}));

const options = {
  builtInSeasonalities: { daily: "off", weekly: "auto", yearly: "off" },
  regressors: [{ name: "promotion" }],
  mcmc: { samples: 120, seed: 7 },
} as const satisfies EncodedProphetOptions;

const run = <A, E>(effect: Effect.Effect<A, E, never>) => Effect.runPromise(effect);

const fitModel = (input: EncodedProphetOptions = options): Promise<FittedProphet> =>
  run(fit(history, input).pipe(Effect.provide(prophetFittingBackendLayer)));

const requireMcmc = (model: FittedProphet): FittedMcmcProphet => {
  if (!isMcmcModel(model)) throw new Error(`Expected a posterior, got ${model.model}`);

  return model;
};

const mean = (values: ReadonlyArray<number>) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

describe("fit with mcmc", () => {
  it("samples a linear posterior with Python's chain and draw counts", async () => {
    const model = requireMcmc(await fitModel());

    expect(model.model).toBe("linear-piecewise-mcmc");
    expect(model.fitSummary.method).toBe("stan-nuts-v1");
    expect(model.fitSummary.termination).toBe("sampled");
    expect(model.fitSummary.sampler).toEqual({ chains: 4, warmup: 60, drawsPerChain: 60, seed: 7 });
    expect(model.posterior.noiseScale).toHaveLength(240);

    if (model.model !== "linear-piecewise-mcmc") throw new Error("Expected linear growth");

    expect(model.posterior.deltas.every((row) => row.length === model.deltas.length)).toBe(true);
    expect(model.slope).toBeCloseTo(mean(model.posterior.slope), 9);
    expect(model.noiseScale).toBeCloseTo(mean(model.posterior.noiseScale), 9);

    const diagnostics = model.fitSummary.diagnostics;

    expect(diagnostics?.stepSizes).toHaveLength(4);
    expect(diagnostics?.maxRhat).toBeLessThan(1.2);
    expect(diagnostics?.minBulkEss).toBeGreaterThan(20);
  });

  it("repeats a fit for the same seed and changes it for another", async () => {
    const first = requireMcmc(await fitModel());
    const second = requireMcmc(await fitModel());
    const other = requireMcmc(await fitModel({ ...options, mcmc: { samples: 120, seed: 8 } }));

    expect(second.posterior).toEqual(first.posterior);
    expect(other.posterior.noiseScale).not.toEqual(first.posterior.noiseScale);
  });

  it("samples flat growth with only a level, noise and coefficients", async () => {
    const model = requireMcmc(
      await fitModel({ ...options, growth: "flat", mcmc: { samples: 60, seed: 3, chains: 2 } }),
    );

    expect(model.model).toBe("flat-mcmc");
    expect(model.posterior.noiseScale).toHaveLength(60);
    expect(model).not.toHaveProperty("posterior.slope");
  });

  it("keeps Prophet's single shortcut draw for a constant history", async () => {
    const constant = history.map(({ timestamp }) => ({ timestamp, value: 4 }));

    const model = requireMcmc(
      await run(
        fit(constant, { mcmc: { samples: 40, seed: 1 } }).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      ),
    );

    expect(model.fitSummary.termination).toBe("constant-target-shortcut");
    expect(model.fitSummary.diagnostics).toBeNull();
    expect(model.posterior.noiseScale).toHaveLength(1);

    const intervals = await run(
      predictWithIntervals(model, [future[0]?.timestamp ?? ""], { seed: 2, samples: 16 }),
    );

    expect(intervals.sampleCount).toBe(16);
  });

  it("starts chains from a warm start and reads posterior means back as one", async () => {
    const model = requireMcmc(await fitModel());
    const start = warmStartParameters(model);

    expect(start.sigmaObs).toBeCloseTo(model.noiseScale / model.targetScaling.scale, 12);

    const warm = requireMcmc(await fitModel({ ...options, map: { warmStart: start } }));

    expect(warm.posterior.noiseScale).not.toEqual(model.posterior.noiseScale);
  });

  it("rejects settings that don't apply to sampling or aren't supported yet", async () => {
    const failures = [
      { ...options, map: { optimizer: { algorithm: "newton" } } },
      { ...options, growth: "logistic" },
      { ...options, mcmc: { samples: 1, seed: 1 } },
      { ...options, mcmc: { samples: 100, seed: 1, chains: 17 } },
      { ...options, mcmc: { samples: 20_000, seed: 1, chains: 4 } },
      { ...options, mcmc: { samples: 100, seed: -1 } },
      {
        ...options,
        regressors: [{ name: "promotion", predictor: true }],
      },
      {
        regressors: [{ name: "promotion", predictor: { mcmc: { samples: 20, seed: 1 } } }],
      },
    ];

    for (const input of failures) {
      const error = await run(
        Effect.flip(
          // SAFETY: deliberately invalid options, typed as callers' untyped JSON would arrive.
          fit(history, input as EncodedProphetOptions).pipe(
            Effect.provide(prophetFittingBackendLayer),
          ),
        ),
      );

      expect(error).toBeInstanceOf(InputValidationError);
    }
  });

  it("fails with a sampling limit when the draws would be too large to keep", async () => {
    const error = await run(
      Effect.flip(
        fit(plainHistory, {
          builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
          seasonalities: [{ name: "wide", periodDays: 30, fourierOrder: 200 }],
          mcmc: { samples: 10_000, seed: 1, chains: 4, warmup: 0 },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("sampling-limit");
    }
  });
});

describe("predictions from a posterior", () => {
  it("forecasts from the posterior means, as Python does", async () => {
    const model = requireMcmc(await fitModel());

    if (model.model !== "linear-piecewise-mcmc") throw new Error("Expected linear growth");

    const forecasts = await run(predict(model, future));
    const { model: _kind, fitSummary: _summary, posterior: _posterior, ...means } = model;

    // The same means as a MAP model forecast the same values.
    const mapLike = await run(
      predict(
        // SAFETY: a MAP model built from the posterior's own validated mean fields; `predict`
        // parses it before use.
        {
          ...means,
          model: "linear-piecewise-map",
          fitSummary: {
            method: "piecewise-map-stan-v2",
            termination: "absolute-objective",
            optimization: {
              algorithm: "lbfgs",
              attemptCount: 1,
              failedAttemptIterations: null,
              hessianResets: 0,
            },
            valueScale: model.fitSummary.valueScale,
            observationCount: model.fitSummary.observationCount,
            iterations: 1,
            objective: 0,
            stationarityResidual: 0,
            changepointPriorScale: model.fitSummary.changepointPriorScale,
          },
        } as never,
        future,
      ),
    );

    expect(forecasts).toHaveLength(4);

    for (const [index, forecast] of forecasts.entries()) {
      expect(forecast.value).toBeCloseTo(mapLike[index]?.value ?? Number.NaN, 9);
      expect(forecast.trend).toBeCloseTo(mapLike[index]?.trend ?? Number.NaN, 9);
    }
  });

  it("runs Python's paths per draw and reports component ranges", async () => {
    const model = requireMcmc(await fitModel());
    const result = await run(predictWithIntervals(model, future, { seed: 3, samples: 1_000 }));
    const draws = model.posterior.noiseScale.length;

    expect(result.simulation).toBe("prophet-mcmc-scalar-xoshiro128ss-v1");
    expect(result.sampleCount).toBe(Math.ceil(1_000 / draws) * draws);

    for (const row of result.rows) {
      const components = row.componentIntervals;

      expect(components).toBeDefined();
      expect(row.valueInterval.lower).toBeLessThan(row.value);
      expect(row.valueInterval.upper).toBeGreaterThan(row.value);

      if (components === undefined) continue;

      expect(components.seasonalities.map(({ name }) => name)).toEqual(["weekly"]);
      expect(components.regressors.map(({ name }) => name)).toEqual(["promotion"]);
      expect(components.multiplicative).toEqual({ lower: 0, upper: 0 });
      expect(components.additive.lower).toBeLessThanOrEqual(row.additive + 1e-9);
      expect(components.additive.upper).toBeGreaterThanOrEqual(row.additive - 1e-9);
    }

    const again = await run(predictWithIntervals(model, future, { seed: 3, samples: 1_000 }));

    expect(again).toEqual(result);
  });

  it("returns every path as samples, bounded by the draws actually run", async () => {
    const model = requireMcmc(await fitModel());
    const draws = model.posterior.noiseScale.length;

    const result = await run(
      predictUncertainty(model, future, { seed: 4, samples: 10, output: "samples" }),
    );

    if (result.kind !== "samples") throw new Error("Expected samples");

    expect(result.sampleCount).toBe(draws);
    expect(result.value).toHaveLength(draws * future.length);

    const empty = await run(predictUncertainty(model, [], { seed: 4, samples: 10 }));

    expect(empty.sampleCount).toBe(draws);
  });

  it("gives regressor coefficients Python's 80% posterior range", async () => {
    const model = requireMcmc(await fitModel());
    const [coefficient] = getRegressorCoefficients(model);

    expect(coefficient?.coefficientInterval).toBeDefined();
    expect(coefficient?.coefficient).toBeGreaterThan(coefficient?.coefficientInterval?.lower ?? 0);
    expect(coefficient?.coefficient).toBeLessThan(
      coefficient?.coefficientInterval?.upper ?? Number.POSITIVE_INFINITY,
    );
    expect(coefficient?.coefficient).toBeGreaterThan(2);
    expect(coefficient?.coefficient).toBeLessThan(4);
  });

  it("round-trips a posterior through the saved-model format", async () => {
    const model = requireMcmc(await fitModel());
    const encoded = await run(encodeFittedModel(model));

    if (encoded.modelKind !== "linear-piecewise-mcmc") throw new Error("Expected a posterior");

    const decoded = await run(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));

    expect(await run(predict(decoded, future))).toEqual(await run(predict(model, future)));
    expect(await run(predictWithIntervals(decoded, future, { seed: 9 }))).toEqual(
      await run(predictWithIntervals(model, future, { seed: 9 })),
    );

    const tampered = {
      ...encoded,
      posterior: { ...encoded.posterior, slope: encoded.posterior.slope.slice(1) },
    };

    const error = await run(Effect.flip(decodeFittedModel(tampered)));

    expect(error._tag).toBe("ModelSerializationError");
  });
});

describe("posterior tracing", () => {
  it("records sampling, simulation and component boundaries under the public spans", async () => {
    const { spans, tracer } = collectTestSpans();

    await run(
      Effect.gen(function* () {
        const model = yield* fit(history, options);
        yield* predictWithIntervals(model, future, { seed: 1, samples: 100 });
      }).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    const find = (name: string) => {
      const span = spans.find((candidate) => candidate.name === name);

      if (span === undefined) throw new Error(`Missing span ${name}`);

      return span;
    };

    const root = find("forecast.job");
    const publicFit = find("Prophet.fit");
    const publicIntervals = find("Prophet.predictWithIntervals");
    const wasmFit = find("effect-prophet.wasm.fit");
    const simulate = find("effect-prophet.wasm.simulate");
    const ranges = find("effect-prophet.wasm.componentRanges");
    const fitAttributes = Object.fromEntries(wasmFit.attributes);

    expect(fitAttributes).toMatchObject({
      "effect_prophet.model.type": "linear-piecewise-mcmc",
      "effect_prophet.mcmc.chains": 4,
      "effect_prophet.mcmc.samples": 120,
      "effect_prophet.mcmc.warmup": 60,
      "effect_prophet.mcmc.initialization": "default",
      "effect_prophet.mcmc.termination": "sampled",
      "effect_prophet.mcmc.draw.count": 240,
    });
    expect(Predicate.isNumber(fitAttributes["effect_prophet.mcmc.divergence.count"])).toBe(true);
    expect(Object.fromEntries(simulate.attributes)["effect_prophet.sample.count"]).toBe(240);
    expect(Object.fromEntries(ranges.attributes)["effect_prophet.mcmc.draw.count"]).toBe(240);

    for (const span of [wasmFit, simulate, ranges]) {
      expect(span.traceId).toBe(root.traceId);
    }

    expect(wasmFit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);

    for (const [span, parent] of [
      [wasmFit, publicFit],
      [simulate, publicIntervals],
      [ranges, publicIntervals],
    ] as const) {
      const status = requireEndedSpan(span);
      const parentStatus = requireEndedSpan(parent);

      expect(Exit.isSuccess(status.exit)).toBe(true);
      expect(status.startTime).toBeGreaterThanOrEqual(parentStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(parentStatus.endTime);
    }
  });

  it("validates sampling options before entering fitting WASM", async () => {
    const { spans, tracer } = collectTestSpans();

    await run(
      Effect.flip(
        fit(history, { ...options, mcmc: { samples: 0, seed: 1 } }).pipe(
          Effect.provide(prophetFittingBackendLayer),
          Effect.withTracer(tracer),
        ),
      ),
    );

    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });
});
