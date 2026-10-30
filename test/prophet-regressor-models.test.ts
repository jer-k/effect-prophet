import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  FittingError,
  InputValidationError,
  PredictionError,
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
  type EncodedRegressorModelOptions,
  type FittedProphet,
} from "../src/index";
import { FittingBackend } from "../src/internal/fitting-backend";
import { deriveRegressorModelSeed } from "../src/uncertainty";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const day = 86_400_000;

const start = Date.UTC(2025, 0, 1);

const timestamp = (index: number) => new Date(start + index * day).toISOString();

// A regressor with a trend and a weekly cycle, and a target that depends on it.
const history = Array.from({ length: 70 }, (_, index) => {
  const price = 10 + 0.05 * index + 2 * Math.sin((2 * Math.PI * index) / 7) + 0.1 * Math.sin(index);

  return {
    timestamp: timestamp(index),
    value: 40 + 0.1 * index + 1.5 * price + 0.2 * Math.cos(index * 1.3),
    regressors: { price, promotion: index % 3 === 0 ? 1 : 0 },
  };
});

const lastIndex = history.length - 1;

const futureTimestamps = Array.from({ length: 10 }, (_, index) => timestamp(lastIndex + 1 + index));

const builtInSeasonalities = { yearly: "off", daily: "off" } as const;

const predictorOptions = { builtInSeasonalities, map: { changepointPriorScale: 0.1 } } as const;

const options = {
  builtInSeasonalities,
  regressors: [{ name: "price", predictor: predictorOptions }, { name: "promotion" }],
} satisfies EncodedProphetOptions;

const fitModel = (input: EncodedProphetOptions = options) =>
  Effect.runPromise(fit(history, input).pipe(Effect.provide(prophetFittingBackendLayer)));

const failFit = (input: EncodedProphetOptions) =>
  Effect.runPromise(
    Effect.flip(fit(history, input).pipe(Effect.provide(prophetFittingBackendLayer))),
  );

// The workflow Python's regressor_predictor replaces: fit the regressor alone, then the main
// model without a predictor, and feed the regressor's forecast in.
const fitByHand = async () => {
  const regressorModel = await Effect.runPromise(
    fit(
      history.map(({ timestamp, regressors }) => ({ timestamp, value: regressors.price })),
      predictorOptions,
    ).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

  const main = await fitModel({
    builtInSeasonalities,
    regressors: [{ name: "price" }, { name: "promotion" }],
  });

  return { regressorModel, main };
};

const optimizerOf = (model: FittedProphet) =>
  "optimization" in model.fitSummary ? model.fitSummary.optimization.algorithm : undefined;

const regressorModelOf = (model: FittedProphet) => {
  const regressorModel = model.regressorModels?.[0];

  if (regressorModel === undefined) {
    throw new Error("Expected a regressor model");
  }

  return regressorModel;
};

describe("regressor models", () => {
  it("fits the main model unchanged and the regressor model to the regressor's history", async () => {
    const model = await fitModel();
    const byHand = await fitByHand();
    const { regressorModels, ...main } = model;

    expect(main).toEqual(byHand.main);
    expect(regressorModels).toHaveLength(1);

    const regressorModel = regressorModelOf(model);

    expect(regressorModel.name).toBe("price");
    expect(regressorModel.model).toEqual(byHand.regressorModel);
    expect(regressorModel.timestamps).toEqual(history.map((row) => Date.parse(row.timestamp)));
    expect(regressorModel.values).toEqual(history.map((row) => row.regressors.price));
    expect(Object.isFrozen(regressorModel)).toBe(true);
  });

  it("forecasts future regressor values exactly as fitting both models by hand", async () => {
    const model = await fitModel();
    const byHand = await fitByHand();

    const prices = await Effect.runPromise(predict(byHand.regressorModel, futureTimestamps));

    const expected = await Effect.runPromise(
      predict(
        byHand.main,
        futureTimestamps.map((timestamp, index) => ({
          timestamp,
          regressors: { price: prices[index]?.value ?? Number.NaN, promotion: 1 },
        })),
      ),
    );

    const forecasts = await Effect.runPromise(
      predict(
        model,
        futureTimestamps.map((timestamp) => ({ timestamp, regressors: { promotion: 1 } })),
      ),
    );

    expect(forecasts).toEqual(expected);
  });

  it("replaces supplied future values with the regressor model's forecast, as Python does", async () => {
    const model = await fitModel();
    const rows = futureTimestamps.map((timestamp) => ({ timestamp, regressors: { promotion: 0 } }));

    const supplied = rows.map((row) => ({
      ...row,
      regressors: { ...row.regressors, price: 999 },
    }));

    const forecasts = await Effect.runPromise(predict(model, rows));

    expect(await Effect.runPromise(predict(model, supplied))).toEqual(forecasts);
  });

  it("keeps supplied history values and fills missing ones from the training history", async () => {
    const model = await fitModel();
    const byHand = await fitByHand();
    const indexes = [0, 5, 10, lastIndex];

    const forecasts = await Effect.runPromise(
      predict(
        model,
        indexes.map((index, position) => ({
          timestamp: timestamp(index),
          regressors: position === 1 ? { price: 0, promotion: 1 } : { promotion: 1 },
        })),
      ),
    );

    const expected = await Effect.runPromise(
      predict(
        byHand.main,
        indexes.map((index, position) => ({
          timestamp: timestamp(index),
          regressors: {
            price: position === 1 ? 0 : (history[index]?.regressors.price ?? 0),
            promotion: 1,
          },
        })),
      ),
    );

    expect(forecasts).toEqual(expected);
  });

  it("rejects a missing history value whose timestamp is not in the training history", async () => {
    const model = await fitModel();
    const between = new Date(start + 2.5 * day).toISOString();

    const error = await Effect.runPromise(
      Effect.flip(predict(model, [{ timestamp: between, regressors: { promotion: 0 } }])),
    );

    expect(error).toBeInstanceOf(InputValidationError);
    expect(error).toMatchObject({
      input: "prediction-rows",
      issues: [
        {
          path: [0, "regressors", "price"],
          message: "Regressor 'price' is missing, and its timestamp is not in the training history",
        },
      ],
    });
  });

  it("rejects looking up a history value when training timestamps repeat, as Python does", async () => {
    const repeated = [...history, { ...history[lastIndex], timestamp: timestamp(lastIndex) }];

    const model = await Effect.runPromise(
      fit(repeated, options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const error = await Effect.runPromise(
      Effect.flip(predict(model, [{ timestamp: timestamp(3), regressors: { promotion: 0 } }])),
    );

    expect(error).toMatchObject({
      input: "prediction-rows",
      issues: [{ path: [0, "regressors", "price"] }],
    });

    // Future rows need no lookup, and supplied history values none either.
    const forecasts = await Effect.runPromise(
      predict(model, [
        { timestamp: futureTimestamps[0] ?? "", regressors: { promotion: 0 } },
        { timestamp: timestamp(3), regressors: { price: 10, promotion: 0 } },
      ]),
    );

    expect(forecasts).toHaveLength(2);
  });

  it("still requires regressors without a model", async () => {
    const model = await fitModel();
    const error = await Effect.runPromise(Effect.flip(predict(model, futureTimestamps)));

    expect(error).toMatchObject({
      input: "prediction-rows",
      issues: expect.arrayContaining([
        { path: [0, "regressors", "promotion"], message: "Missing required regressor 'promotion'" },
      ]),
    });
  });

  it("uses default options for predictor: true", async () => {
    const model = await fitModel({
      regressors: [{ name: "price", predictor: true }, { name: "promotion" }],
    });

    const byHand = await Effect.runPromise(
      fit(
        history.map(({ timestamp, regressors }) => ({ timestamp, value: regressors.price })),
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(regressorModelOf(model).model).toEqual(byHand);
  });

  it("passes a requested optimizer on to the regressor model, as Python passes its fit arguments", async () => {
    const model = await fitModel({
      ...options,
      map: { optimizer: { algorithm: "newton" } },
    });

    expect(optimizerOf(regressorModelOf(model).model)).toBe("newton");

    // Seventy rows select Newton anyway, so L-BFGS shows the setting is used.
    const lbfgs = await fitModel({ ...options, map: { optimizer: { algorithm: "lbfgs" } } });

    expect(optimizerOf(regressorModelOf(lbfgs).model)).toBe("lbfgs");
  });

  it.each([
    ["custom seasonalities", { seasonalities: [] }, ["seasonalities"]],
    ["regressors", { regressors: [] }, ["regressors"]],
    ["country holidays", { countryHolidays: { country: "US" } }, ["countryHolidays"]],
    ["an optimizer", { map: { optimizer: { algorithm: "newton" } } }, ["map", "optimizer"]],
    ["its own warm start", { map: { warmStart: {} } }, ["map", "warmStart"]],
    ["logistic growth", { growth: "logistic" }, ["growth"]],
  ])("rejects %s in regressor model options", async (_, predictor, path) => {
    const error = await failFit({
      // SAFETY: deliberately unsupported options, typed as callers' untyped JSON would arrive.
      regressors: [{ name: "price", predictor: predictor as EncodedRegressorModelOptions }],
    });

    expect(error).toBeInstanceOf(InputValidationError);
    expect(error).toMatchObject({
      input: "options",
      issues: [{ path: ["regressors", 0, "predictor", ...path] }],
    });
  });

  it("validates regressor model option values under the predictor's path", async () => {
    const error = await failFit({
      regressors: [
        { name: "promotion" },
        { name: "price", predictor: { map: { changepointPriorScale: -1 } } },
      ],
    });

    expect(error).toMatchObject({
      input: "options",
      issues: [{ path: ["regressors", 1, "predictor", "map", "changepointPriorScale"] }],
    });
  });

  it("passes a warm start on to the regressor model, as Python passes its init", async () => {
    const base = await fitModel();

    if (base.model === "logistic-piecewise-map") {
      throw new Error("Expected a linear model");
    }

    // Two capped Newton steps leave each fit where its start led it.
    const map = {
      optimizer: { algorithm: "newton", maxIterations: 2 },
      warmStart: warmStartParameters(base),
    } as const;

    const warmed = regressorModelOf(await fitModel({ ...options, map })).model;

    const cold = regressorModelOf(
      await fitModel({ ...options, map: { optimizer: map.optimizer } }),
    ).model;

    const byHand = await Effect.runPromise(
      fit(
        history.map(({ timestamp, regressors }) => ({ timestamp, value: regressors.price })),
        { ...predictorOptions, map: { ...predictorOptions.map, ...map } },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(warmed).toEqual(byHand);
    expect(warmed).not.toEqual(cold);
  });

  it("names the regressor and moves fit-time option issues under its predictor", async () => {
    const error = await failFit({
      regressors: [
        {
          name: "price",
          predictor: {
            map: { changepoints: { mode: "explicit", timestamps: ["2030-01-01T00:00:00.000Z"] } },
          },
        },
        { name: "promotion" },
      ],
    });

    expect(error).toMatchObject({
      input: "options",
      issues: [{ path: ["regressors", 0, "predictor", "map", "changepoints", "timestamps", 0] }],
    });
  });

  it("labels a regressor model's fitting failure with the regressor's name", async () => {
    // The memory budget a regressor's model would need is never smaller than the main model's,
    // so a failure only the regressor model hits needs a backend that fails the second fit.
    const error = await Effect.runPromise(
      Effect.flip(
        Effect.gen(function* () {
          const real = yield* FittingBackend;
          let calls = 0;

          return yield* fit(history, options).pipe(
            Effect.provideService(FittingBackend, {
              fit: (input, plan) => {
                calls += 1;

                return calls === 1
                  ? Effect.fail(
                      new FittingError({
                        reason: "non-convergence",
                        observationCount: input.values.length,
                        message: "Optimizer did not converge",
                      }),
                    )
                  : real.fit(input, plan);
              },
            }),
          );
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(error).toBeInstanceOf(FittingError);
    expect(error).toMatchObject({
      reason: "non-convergence",
      regressor: "price",
      message: "The model for regressor 'price' failed to fit: Optimizer did not converge",
    });
  });

  it("widens future samples with the regressor model's draws, as Python's predictive samples do", async () => {
    const model = await fitModel();
    const byHand = await fitByHand();
    const regressorModel = regressorModelOf(model);
    const coefficient = getRegressorCoefficients(model)[0]?.coefficient ?? Number.NaN;
    const samples = 64;

    const prices = await Effect.runPromise(predict(regressorModel.model, futureTimestamps));
    const rows = futureTimestamps.map((timestamp) => ({ timestamp, regressors: { promotion: 1 } }));

    const pointRows = futureTimestamps.map((timestamp, index) => ({
      timestamp,
      regressors: { price: prices[index]?.value ?? Number.NaN, promotion: 1 },
    }));

    const simulate = (fitted: FittedProphet, input: Parameters<typeof predict>[1], seed: number) =>
      Effect.runPromise(predictUncertainty(fitted, input, { seed, samples, output: "samples" }));

    const widened = await simulate(model, rows, 7);
    const plain = await simulate(byHand.main, pointRows, 7);

    const draws = await simulate(
      regressorModel.model,
      futureTimestamps,
      deriveRegressorModelSeed(7, 0),
    );

    if (widened.kind !== "samples" || plain.kind !== "samples" || draws.kind !== "samples") {
      throw new Error("Expected samples");
    }

    // The same seed gives the same trend paths and noise; only the regressor's draws differ.
    expect(widened.trend).toEqual(plain.trend);

    for (const [row, price] of prices.entries()) {
      for (let sample = 0; sample < samples; sample += 1) {
        const cell = row * samples + sample;
        const shift = coefficient * ((draws.value[cell] ?? Number.NaN) - price.value);

        expect(widened.value[cell]).toBeCloseTo((plain.value[cell] ?? Number.NaN) + shift, 9);
      }
    }
  });

  it("keeps history-only intervals equal to supplying the values, as Python tiles them", async () => {
    const model = await fitModel();
    const byHand = await fitByHand();
    const indexes = [3, 30, lastIndex];

    const intervals = (fitted: FittedProphet, withPrice: boolean) =>
      Effect.runPromise(
        predictWithIntervals(
          fitted,
          indexes.map((index) => ({
            timestamp: timestamp(index),
            regressors: withPrice
              ? { price: history[index]?.regressors.price ?? Number.NaN, promotion: 0 }
              : { promotion: 0 },
          })),
          { seed: 3, samples: 200 },
        ),
      );

    expect(await intervals(model, false)).toEqual(await intervals(byHand.main, true));
  });

  it("gives wider future intervals than the regressor's point forecast alone", async () => {
    const model = await fitModel();
    const byHand = await fitByHand();

    const prices = await Effect.runPromise(
      predict(regressorModelOf(model).model, futureTimestamps),
    );

    const width = async (fitted: FittedProphet, rows: Parameters<typeof predict>[1]) => {
      const forecasts = await Effect.runPromise(
        predictWithIntervals(fitted, rows, { seed: 11, samples: 1_000 }),
      );

      const widths = forecasts.rows.map(
        ({ valueInterval }) => valueInterval.upper - valueInterval.lower,
      );

      return widths.reduce((sum, value) => sum + value, 0) / widths.length;
    };

    const widened = await width(
      model,
      futureTimestamps.map((timestamp) => ({ timestamp, regressors: { promotion: 0 } })),
    );

    const plain = await width(
      byHand.main,
      futureTimestamps.map((timestamp, index) => ({
        timestamp,
        regressors: { price: prices[index]?.value ?? Number.NaN, promotion: 0 },
      })),
    );

    expect(widened).toBeGreaterThan(plain * 1.05);
  });

  it("bounds regressor model draws like sample output", async () => {
    const model = await fitModel();

    const error = await Effect.runPromise(
      Effect.flip(
        predictUncertainty(
          model,
          Array.from({ length: 500 }, (_, index) => ({
            timestamp: new Date(start + (lastIndex + 1) * day + index * 3_600_000).toISOString(),
            regressors: { promotion: 0 },
          })),
          { seed: 1, samples: 2_048 },
        ),
      ),
    );

    expect(error).toBeInstanceOf(PredictionError);
    expect(error).toMatchObject({ reason: "simulation-limit" });
  });

  it("saves and restores the regressor models, giving exactly the same forecasts", async () => {
    const model = await fitModel();

    const encoded = await Effect.runPromise(encodeFittedModel(model));

    const restored = await Effect.runPromise(
      decodeFittedModel(JSON.parse(JSON.stringify(encoded))),
    );

    const rows = futureTimestamps.map((timestamp) => ({ timestamp, regressors: { promotion: 1 } }));

    expect(restored).toEqual(model);
    expect(await Effect.runPromise(predict(restored, rows))).toEqual(
      await Effect.runPromise(predict(model, rows)),
    );
  });

  it("traces each regressor model inside the public fit and predict spans", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(history, options);

        // History rows only: no regressor model forecast, so no span for one.
        yield* predict(model, [{ timestamp: timestamp(1), regressors: { promotion: 0 } }]);
        yield* predict(
          model,
          futureTimestamps.map((timestamp) => ({ timestamp, regressors: { promotion: 0 } })),
        );
      }).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    const named = (name: string) => spans.filter((span) => span.name === name);
    const [root] = named("forecast.job");
    const [publicFit] = named("Prophet.fit");
    const [regressorFit] = named("Prophet.fitRegressorModel");
    const predicts = named("Prophet.predict");
    const regressorPredicts = named("Prophet.predictRegressorModel");

    expect(named("Prophet.fit")).toHaveLength(1);
    expect(named("Prophet.fitRegressorModel")).toHaveLength(1);
    expect(predicts).toHaveLength(2);
    expect(regressorPredicts).toHaveLength(1);

    if (root === undefined || publicFit === undefined || regressorFit === undefined) {
      throw new Error("Expected complete regressor model spans");
    }

    const [historyPredict, futurePredict] = predicts;
    const [regressorPredict] = regressorPredicts;

    if (
      historyPredict === undefined ||
      futurePredict === undefined ||
      regressorPredict === undefined
    ) {
      throw new Error("Expected complete regressor model prediction spans");
    }

    const wasmFits = named("effect-prophet.wasm.fit");

    expect(wasmFits).toHaveLength(2);
    expect(wasmFits.map((span) => Option.getOrUndefined(span.parent)?.spanId)).toEqual([
      regressorFit.spanId,
      publicFit.spanId,
    ]);

    expect(Option.getOrUndefined(regressorFit.parent)?.spanId).toBe(publicFit.spanId);
    expect(Option.getOrUndefined(regressorPredict.parent)?.spanId).toBe(futurePredict.spanId);

    for (const span of [publicFit, regressorFit, historyPredict, futurePredict, regressorPredict]) {
      expect(span.traceId).toBe(root.traceId);
      expect(Exit.isSuccess(requireEndedSpan(span).exit)).toBe(true);
    }

    for (const [child, parent] of [
      [regressorFit, publicFit],
      [regressorPredict, futurePredict],
    ] as const) {
      expect(child.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
      expect(requireEndedSpan(child).endTime).toBeLessThanOrEqual(requireEndedSpan(parent).endTime);
    }

    expect(publicFit.attributes.get("effect_prophet.regressor_model.count")).toBe(1);
    expect(publicFit.attributes.get("effect_prophet.regressor.count")).toBe(2);
    expect(regressorFit.attributes.has("effect_prophet.regressor_model.count")).toBe(false);
  });

  it("traces each regressor model's draws inside the uncertainty span", async () => {
    const model = await fitModel();
    const { spans, tracer } = collectTestSpans();
    const options = { seed: 5, samples: 100 };

    await Effect.runPromise(
      Effect.gen(function* () {
        // History rows only: no regressor model draws, so no span for them.
        yield* predictUncertainty(
          model,
          [{ timestamp: timestamp(1), regressors: { promotion: 0 } }],
          options,
        );

        yield* predictUncertainty(
          model,
          futureTimestamps.map((timestamp) => ({ timestamp, regressors: { promotion: 0 } })),
          options,
        );
      }).pipe(Effect.withSpan("forecast.job"), Effect.withTracer(tracer)),
    );

    const named = (name: string) => spans.filter((span) => span.name === name);
    const [historyCall, futureCall] = named("Prophet.predictUncertainty");
    const regressorDraws = named("Prophet.simulateRegressorModel");
    const simulations = named("effect-prophet.wasm.simulate");

    expect(regressorDraws).toHaveLength(1);
    expect(simulations).toHaveLength(3);

    const [draws] = regressorDraws;

    if (historyCall === undefined || futureCall === undefined || draws === undefined) {
      throw new Error("Expected complete regressor model simulation spans");
    }

    expect(Option.getOrUndefined(draws.parent)?.spanId).toBe(futureCall.spanId);

    expect(simulations.map((span) => Option.getOrUndefined(span.parent)?.spanId)).toEqual([
      historyCall.spanId,
      draws.spanId,
      futureCall.spanId,
    ]);

    expect(simulations[1]?.attributes.get("effect_prophet.output.kind")).toBe("samples");
    expect(Exit.isSuccess(requireEndedSpan(draws).exit)).toBe(true);
    expect(draws.traceId).toBe(futureCall.traceId);
    expect(requireEndedSpan(draws).endTime).toBeLessThanOrEqual(
      requireEndedSpan(futureCall).endTime,
    );
  });

  it("does not open a regressor model span when options are rejected first", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      Effect.flip(
        fit(history, {
          regressors: [
            {
              name: "price",
              // SAFETY: deliberately unsupported options, typed as callers' untyped JSON would arrive.
              predictor: { seasonalities: [] } as EncodedRegressorModelOptions,
            },
          ],
        }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(spans.some((span) => span.name === "Prophet.fitRegressorModel")).toBe(false);
  });

  it("ends the regressor model span as failed when that model fails", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      Effect.flip(
        fit(history, {
          regressors: [
            {
              name: "price",
              predictor: {
                map: {
                  changepoints: { mode: "explicit", timestamps: ["2030-01-01T00:00:00.000Z"] },
                },
              },
            },
            { name: "promotion" },
          ],
        }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    const regressorFit = spans.find((span) => span.name === "Prophet.fitRegressorModel");

    expect(regressorFit).toBeDefined();

    if (regressorFit === undefined) {
      throw new Error("Expected a regressor model span");
    }

    expect(Exit.isFailure(requireEndedSpan(regressorFit).exit)).toBe(true);
    expect(spans.filter((span) => span.name === "effect-prophet.wasm.fit")).toHaveLength(0);
  });
});
