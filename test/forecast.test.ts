import { Cause, Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  CountryHolidayError,
  FittingError,
  fit,
  forecast,
  predict,
  prophetFittingBackendLayer,
  type EncodedProphetOptions,
} from "../src/index";
import type { FittingBackend } from "../src/internal/fitting-backend";
import { expectInputValidationError } from "./helpers/input-validation-error";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const day = (offset: number) => new Date(Date.UTC(2025, 0, 1 + offset)).toISOString();

const off = { daily: "off", weekly: "off", yearly: "off" } as const;

const history = Array.from({ length: 60 }, (_, offset) => ({
  timestamp: day(offset),
  value: 100 + offset * 0.5 + 6 * Math.sin((2 * Math.PI * offset) / 7) + Math.sin(offset * 12.9898),
}));

const future = Array.from({ length: 5 }, (_, offset) => day(60 + offset));

// A promotion regressor and a weekend condition, both required again on every future row.
const covariateHistory = history.map((row, offset) => ({
  ...row,
  value: row.value + (offset % 5 === 0 ? 8 : 0),
  regressors: { promotion: offset % 5 === 0 ? 1 : 0 },
  conditions: { weekend: offset % 7 >= 5 },
}));

const covariateOptions = {
  builtInSeasonalities: off,
  seasonalityMode: "multiplicative",
  seasonalities: [
    { name: "weekend_weekly", periodDays: 7, fourierOrder: 2, conditionName: "weekend" },
    { name: "monthly", periodDays: 30.5, fourierOrder: 3, mode: "additive" },
  ],
  regressors: [{ name: "promotion", mode: "additive" }],
} as const satisfies EncodedProphetOptions;

const covariateFuture = Array.from({ length: 5 }, (_, offset) => ({
  timestamp: day(60 + offset),
  regressors: { promotion: offset % 2 },
  conditions: { weekend: (60 + offset) % 7 >= 5 },
}));

const run = <A, E>(effect: Effect.Effect<A, E, FittingBackend>) =>
  Effect.runPromise(effect.pipe(Effect.provide(prophetFittingBackendLayer)));

const manual = (...[observations, rows, options]: Parameters<typeof forecast>) =>
  run(
    Effect.gen(function* () {
      const model = yield* fit(observations, options);

      return yield* predict(model, rows);
    }),
  );

const fail = (...args: Parameters<typeof forecast>) => run(Effect.flip(forecast(...args)));

const failManually = (...args: Parameters<typeof forecast>) =>
  run(
    Effect.flip(
      Effect.gen(function* () {
        const model = yield* fit(args[0], args[2]);

        return yield* predict(model, args[1]);
      }),
    ),
  );

describe("forecast", () => {
  it.each<[string, ...Parameters<typeof forecast>]>([
    ["default linear", history, future, undefined],
    ["flat", history, future, { growth: "flat", builtInSeasonalities: off }],
    [
      "linear with explicit changepoints and Newton",
      history,
      future,
      {
        builtInSeasonalities: { daily: "off", weekly: "auto", yearly: "off" },
        map: {
          changepoints: { mode: "explicit", timestamps: [day(20), day(40)] },
          changepointPriorScale: 0.5,
          optimizer: { algorithm: "newton" },
        },
      },
    ],
    [
      "logistic with capacities and floors",
      history.map((row) => ({ ...row, capacity: 160, floor: 90 })),
      future.map((timestamp) => ({ timestamp, capacity: 170, floor: 90 })),
      { growth: "logistic", builtInSeasonalities: off },
    ],
    ["covariates and conditions", covariateHistory, covariateFuture, covariateOptions],
    [
      "events and country holidays",
      history,
      future,
      {
        builtInSeasonalities: off,
        countryHolidays: { country: "USA" },
        events: [{ name: "launch", date: "2025-03-03", upperWindowDays: 1 }],
        holidaysMode: "multiplicative",
      },
    ],
  ])("equals fit then predict for %s models", async (_, observations, rows, options) => {
    const result = await run(forecast(observations, rows, options));

    expect(result).toEqual(await manual(observations, rows, options));
  });

  it("fits an unsorted history exactly as the sorted one", async () => {
    const shuffled = [...covariateHistory.slice(30).reverse(), ...covariateHistory.slice(0, 30)];

    const result = await run(forecast(shuffled, covariateFuture, covariateOptions));

    expect(result).toEqual(await manual(covariateHistory, covariateFuture, covariateOptions));
  });

  it("keeps the requested row order, and each tied row's own inputs", async () => {
    const rows = [
      { timestamp: day(63), regressors: { promotion: 0 }, conditions: { weekend: false } },
      { timestamp: day(61), regressors: { promotion: 1 }, conditions: { weekend: false } },
      { timestamp: day(61), regressors: { promotion: 0 }, conditions: { weekend: false } },
      { timestamp: day(10), regressors: { promotion: 1 }, conditions: { weekend: true } },
    ];

    const result = await run(forecast(covariateHistory, rows, covariateOptions));

    expect(result.map((row) => row.timestamp)).toEqual(
      rows.map(({ timestamp }) => Date.parse(timestamp)),
    );
    expect(result).toEqual(await manual(covariateHistory, rows, covariateOptions));

    const [, promoted, plain] = result;

    expect(promoted?.regressors).not.toEqual(plain?.regressors);
    expect(promoted?.value).toBeGreaterThan(plain?.value ?? Infinity);
  });

  it("does not mutate its inputs", async () => {
    const observations = structuredClone(covariateHistory).reverse();
    const rows = structuredClone(covariateFuture).reverse();
    const options = structuredClone(covariateOptions);
    const before = structuredClone({ observations, rows, options });

    const first = await run(forecast(observations, rows, options));
    const again = await run(forecast(observations, rows, options));

    expect({ observations, rows, options }).toEqual(before);
    expect(again).toEqual(first);
  });

  it("fails like predict when future rows lack the inputs the model needs", async () => {
    const missing: Array<Parameters<typeof forecast>> = [
      [covariateHistory, future, covariateOptions],
      [
        covariateHistory,
        covariateFuture.map(({ timestamp, conditions }) => ({ timestamp, conditions })),
        covariateOptions,
      ],
      [
        covariateHistory,
        covariateFuture.map(({ timestamp, regressors }) => ({ timestamp, regressors })),
        covariateOptions,
      ],
      [
        history.map((row) => ({ ...row, capacity: 160 })),
        future,
        { growth: "logistic", builtInSeasonalities: off },
      ],
      [history, future.map((timestamp) => ({ timestamp, capacity: 160 })), undefined],
    ];

    for (const args of missing) {
      const error = expectInputValidationError(await fail(...args));

      expect(error).toEqual(await failManually(...args));
      expect(error.input).toBe("prediction-rows");
    }
  });

  it("checks the history, then the rows, then the model options", async () => {
    const badHistory = JSON.parse('[{"timestamp":"bad","value":1}]');
    const badRows = JSON.parse('["bad"]');
    const badOptions = { growth: JSON.parse('"sideways"') };

    const requests: Array<[Parameters<typeof forecast>, string]> = [
      [[badHistory, badRows, badOptions], "observations"],
      [[history, badRows, badOptions], "prediction-timestamps"],
      [[history, [{ timestamp: day(60), typo: 1 }], badOptions], "prediction-rows"],
      [[history, future, badOptions], "options"],
    ];

    for (const [args, input] of requests) {
      const error = expectInputValidationError(await fail(...args));

      expect(error.input).toBe(input);
    }

    const single = await fail([{ timestamp: day(0), value: 1 }], future);

    expect(single).toBeInstanceOf(FittingError);
    expect(single).toMatchObject({ reason: "insufficient-observations" });

    const outsideCalendar = await fail(history, [day(365 * 40)], {
      builtInSeasonalities: off,
      countryHolidays: { country: "USA" },
    });

    expect(outsideCalendar).toBeInstanceOf(CountryHolidayError);
    expect(outsideCalendar).toMatchObject({ reason: "outside-snapshot-horizon" });
  });

  it("fits a history even when there is nothing to forecast", async () => {
    expect(await run(forecast(history, []))).toEqual([]);

    const single = await fail([{ timestamp: day(0), value: 1 }], []);

    expect(single).toBeInstanceOf(FittingError);
  });

  it("ends one safe trace that fits once, then predicts", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      forecast(covariateHistory, covariateFuture, covariateOptions).pipe(
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
        Effect.provide(prophetFittingBackendLayer),
      ),
    );

    const span = (name: string) => {
      const found = spans.filter((candidate) => candidate.name === name);

      if (found.length !== 1 || found[0] === undefined) {
        throw new Error(`Expected exactly one ${name}`);
      }

      return found[0];
    };

    const parentOf = (child: ReturnType<typeof span>) =>
      child.parent.pipe(Option.getOrUndefined)?.spanId;

    const job = span("forecast.job");
    const operation = span("Prophet.forecast");
    const fitted = span("Prophet.fit");
    const predicted = span("Prophet.predict");
    const engineFit = span("effect-prophet.wasm.fit");
    const enginePredict = span("effect-prophet.wasm.predict");

    expect(parentOf(operation)).toBe(job.spanId);
    expect(parentOf(fitted)).toBe(operation.spanId);
    expect(parentOf(predicted)).toBe(operation.spanId);
    expect(parentOf(engineFit)).toBe(fitted.spanId);
    expect(parentOf(enginePredict)).toBe(predicted.spanId);

    expect(
      spans.filter((candidate) => parentOf(candidate) === operation.spanId).map(({ name }) => name),
    ).toEqual(["Prophet.decodeObservations", "Prophet.fit", "Prophet.predict"]);

    const operationStatus = requireEndedSpan(operation);

    for (const child of [fitted, predicted, engineFit, enginePredict]) {
      const status = requireEndedSpan(child);

      expect(child.traceId).toBe(job.traceId);
      expect(Exit.isSuccess(status.exit)).toBe(true);
      expect(status.startTime).toBeGreaterThanOrEqual(operationStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(operationStatus.endTime);
    }

    expect(requireEndedSpan(fitted).endTime).toBeLessThanOrEqual(
      requireEndedSpan(predicted).startTime,
    );

    expect(operation.traceId).toBe(job.traceId);
    expect(Exit.isSuccess(operationStatus.exit)).toBe(true);

    expect(Object.fromEntries(operation.attributes)).toEqual({
      "effect_prophet.observation.count": 60,
      "effect_prophet.prediction.count": 5,
    });
  });

  it("ends failed spans with the fit or prediction failure", async () => {
    const { spans, tracer } = collectTestSpans();

    const traced = (...args: Parameters<typeof forecast>) =>
      run(Effect.flip(forecast(...args).pipe(Effect.withTracer(tracer))));

    const status = (name: string) => {
      const found = spans.find((candidate) => candidate.name === name);

      if (found === undefined) {
        throw new Error(`Expected ${name}`);
      }

      return requireEndedSpan(found);
    };

    const failureOf = (name: string) => {
      const { exit } = status(name);

      return Exit.isFailure(exit) ? Option.getOrUndefined(Cause.findErrorOption(exit.cause)) : exit;
    };

    const fitFailure = await traced([{ timestamp: day(0), value: 1 }], future);

    expect(fitFailure).toBeInstanceOf(FittingError);
    expect(failureOf("Prophet.forecast")).toBe(fitFailure);
    expect(failureOf("Prophet.fit")).toBe(fitFailure);
    expect(spans.some((span) => span.name === "Prophet.predict")).toBe(false);

    expect(
      Object.fromEntries(spans.find((span) => span.name === "Prophet.forecast")?.attributes ?? []),
    ).toEqual({});

    spans.length = 0;

    const predictFailure = await traced(covariateHistory, future, covariateOptions);

    expectInputValidationError(predictFailure);
    expect(failureOf("Prophet.forecast")).toBe(predictFailure);
    expect(failureOf("Prophet.predict")).toBe(predictFailure);
    expect(Exit.isSuccess(status("Prophet.fit").exit)).toBe(true);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(true);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.predict")).toBe(false);
  });

  it("fits nothing when the history or the rows are malformed", async () => {
    const { spans, tracer } = collectTestSpans();

    for (const request of [
      forecast(JSON.parse("[]"), future),
      forecast(history, JSON.parse('["bad"]')),
      forecast(history, [{ timestamp: day(60), typo: 1 }]),
    ]) {
      await run(Effect.exit(request.pipe(Effect.withTracer(tracer))));
    }

    expect(spans.filter((span) => span.name === "Prophet.forecast")).toHaveLength(3);
    expect(spans.some((span) => span.name === "Prophet.fit")).toBe(false);
    expect(spans.filter((span) => span.name.startsWith("effect-prophet."))).toEqual([]);
  });
});
