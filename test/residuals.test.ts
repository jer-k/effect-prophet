import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  PredictionError,
  fit,
  predict,
  prophetFittingBackendLayer,
  residuals,
  type EncodedObservation,
  type EncodedObservations,
  type FittedProphet,
} from "../src/index";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const day = (offset: number) => new Date(Date.UTC(2025, 0, 1 + offset)).toISOString();

// Scattered, non-periodic noise in [-1, 1] that no seasonality can fit.
const noise = (offset: number) => ((offset * 7_919) % 101) / 50 - 1;

const history = Array.from({ length: 30 }, (_, offset) => ({
  timestamp: day(offset),
  value: 100 + offset * 0.5 + noise(offset),
}));

const baselineOptions = {
  builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
} as const;

const fitModel = (
  input: Parameters<typeof fit>[0],
  options: Parameters<typeof fit>[1] = baselineOptions,
) => Effect.runPromise(fit(input, options).pipe(Effect.provide(prophetFittingBackendLayer)));

const predictedAt = async (model: FittedProphet, timestamp: string) => {
  const [forecast] = await Effect.runPromise(predict(model, [timestamp]));

  if (forecast === undefined) {
    throw new Error("Expected a forecast");
  }

  return forecast.value;
};

describe("residuals", () => {
  it("equals manual prediction and subtraction, in chronological order", async () => {
    const model = await fitModel(history);
    const exact = await predictedAt(model, day(32));

    // Held-out rows, deliberately out of order: one above, one exact, one below the forecast.
    const later = [
      { timestamp: day(33), value: 200 },
      { timestamp: day(32), value: exact },
      { timestamp: day(31), value: 0 },
    ] as const satisfies EncodedObservations;

    const rows = await Effect.runPromise(residuals(model, later));
    const manual = await Effect.runPromise(predict(model, [day(31), day(32), day(33)]));

    expect(rows).toEqual(
      [later[2], later[1], later[0]].map((row, index) => ({
        timestamp: Date.parse(row.timestamp),
        actual: row.value,
        predicted: manual[index]?.value,
        residual: row.value - (manual[index]?.value ?? Number.NaN),
      })),
    );

    expect(rows.map((row) => Math.sign(row.residual))).toEqual([-1, 0, 1]);

    const inSample = await Effect.runPromise(residuals(model, history));

    const fitted = await Effect.runPromise(
      predict(
        model,
        history.map((row) => row.timestamp),
      ),
    );

    expect(inSample.map((row) => row.residual)).toEqual(
      history.map((row, index) => row.value - (fitted[index]?.value ?? Number.NaN)),
    );
  });

  it("keeps tied observations' own regressors, capacities and conditions", async () => {
    const regressorHistory = Array.from({ length: 12 }, (_, offset) => {
      const promotion = offset % 3 === 0 ? 1 : 0;

      return {
        timestamp: day(offset),
        value: 5 + offset * 0.2 + promotion * 3 + noise(offset) * 0.1,
        regressors: { promotion },
      };
    });

    const logisticHistory = [1.2, 2.2, 4.2, 6.1, 7.6, 8.9].map((value, offset) => ({
      timestamp: day(offset),
      value,
      capacity: 10,
    }));

    const conditionalHistory = Array.from({ length: 14 }, (_, offset) => {
      const onSeason = offset % 3 !== 1;

      return {
        timestamp: day(offset),
        value: 10 + offset * 0.15 + (onSeason ? Math.sin((2 * Math.PI * offset) / 7) * 2 : 0),
        conditions: { onSeason },
      };
    });

    const [regressor, logistic, conditional] = await Effect.runPromise(
      Effect.all([
        fit(regressorHistory, { regressors: [{ name: "promotion", priorScale: 100 }] }),
        fit(logisticHistory, {
          growth: "logistic",
          map: { changepoints: { mode: "explicit", timestamps: [day(2)] } },
        }),
        fit(conditionalHistory, {
          map: { changepoints: { mode: "explicit", timestamps: [] } },
          seasonalities: [
            {
              name: "weekly-on-season",
              periodDays: 7,
              fourierOrder: 2,
              priorScale: 20,
              conditionName: "onSeason",
            },
          ],
        }),
      ]).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const cases: ReadonlyArray<{
      readonly model: FittedProphet;
      readonly tied: readonly [EncodedObservation, EncodedObservation];
    }> = [
      {
        model: regressor,
        tied: [
          { timestamp: day(13), value: 8, regressors: { promotion: 1 } },
          { timestamp: day(13), value: 8, regressors: { promotion: 0 } },
        ],
      },
      {
        model: logistic,
        tied: [
          { timestamp: day(7), value: 9, capacity: 20 },
          { timestamp: day(7), value: 9, capacity: 10 },
        ],
      },
      {
        model: conditional,
        tied: [
          { timestamp: day(16), value: 12, conditions: { onSeason: true } },
          { timestamp: day(16), value: 12, conditions: { onSeason: false } },
        ],
      },
    ];

    for (const { model, tied } of cases) {
      const earlier = { ...tied[1], timestamp: day(5) };
      const rows = await Effect.runPromise(residuals(model, [tied[0], earlier, tied[1]]));

      const manual = await Effect.runPromise(
        predict(
          model,
          [earlier, tied[0], tied[1]].map(({ value: _value, ...row }) => row),
        ),
      );

      expect(rows.map((row) => row.timestamp)).toEqual([
        Date.parse(day(5)),
        Date.parse(tied[0].timestamp),
        Date.parse(tied[1].timestamp),
      ]);

      expect(rows.map((row) => row.predicted)).toEqual(manual.map((row) => row.value));
      expect(rows[1]?.residual).not.toBe(rows[2]?.residual);
    }
  });

  it("predicts without refitting or mutating its inputs", async () => {
    const model = await fitModel(history);
    const input = history.slice(0, 5).map((row) => ({ ...row }));
    const before = structuredClone({ model, input });

    // No fitting backend is provided: residuals can only predict.
    const first = await Effect.runPromise(residuals(model, input));
    const again = await Effect.runPromise(residuals(model, input));

    expect(again).toEqual(first);
    expect({ model, input }).toEqual(before);

    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first[0])).toBe(true);
  });

  it("keeps observation, model and requirement failures typed", async () => {
    const model = await fitModel(history);

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    for (const input of [[], [{ timestamp: "bad", value: 1 }], [{ timestamp: day(40) }]]) {
      const error = await Effect.runPromise(
        Effect.flip(residuals(model, JSON.parse(JSON.stringify(input)))),
      );

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "observations" });
    }

    const invalidModel = await Effect.runPromise(
      Effect.flip(residuals({ ...model, noiseScale: -1 }, history)),
    );

    expect(invalidModel).toBeInstanceOf(PredictionError);
    expect(invalidModel).toMatchObject({ reason: "invalid-model" });

    const capacity = await Effect.runPromise(
      Effect.flip(residuals(model, [{ timestamp: day(40), value: 1, capacity: 5 }])),
    );

    expect(capacity).toBeInstanceOf(InputValidationError);

    const regressorModel = await fitModel(
      history.map((row, offset) => ({ ...row, regressors: { promotion: offset % 2 } })),
      { regressors: [{ name: "promotion" }] },
    );

    const missingRegressor = await Effect.runPromise(
      Effect.flip(residuals(regressorModel, [{ timestamp: day(40), value: 1 }])),
    );

    expect(missingRegressor).toBeInstanceOf(InputValidationError);
  });

  it("rejects a residual that overflows from finite values", async () => {
    const huge = history.map((row) => ({ ...row, value: row.value * 1e298 }));
    const model = await fitModel(huge);
    const predicted = await predictedAt(model, day(40));

    expect(Number.isFinite(predicted)).toBe(true);
    expect(Number.isFinite(-Number.MAX_VALUE - predicted)).toBe(false);

    const error = await Effect.runPromise(
      Effect.flip(
        residuals(model, [
          { timestamp: day(39), value: predicted },
          { timestamp: day(40), value: -Number.MAX_VALUE },
        ]),
      ),
    );

    expect(error).toBeInstanceOf(PredictionError);
    expect(error).toMatchObject({ reason: "non-finite-forecast", timestamp: Date.parse(day(40)) });
  });

  it("ends one safe trace that predicts and never fits", async () => {
    const model = await fitModel(history);
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      residuals(model, history).pipe(Effect.withSpan("diagnostics.job"), Effect.withTracer(tracer)),
    );

    const span = (name: string) => {
      const found = spans.find((candidate) => candidate.name === name);

      if (found === undefined) {
        throw new Error(`Expected ${name}`);
      }

      return found;
    };

    const parentOf = (child: ReturnType<typeof span>) =>
      child.parent.pipe(Option.getOrUndefined)?.spanId;

    const job = span("diagnostics.job");
    const operation = span("Prophet.residuals");
    const decode = span("Prophet.decodeObservations");
    const prediction = span("Prophet.predict");
    const engine = span("effect-prophet.wasm.predict");

    expect(parentOf(operation)).toBe(job.spanId);
    expect(parentOf(decode)).toBe(operation.spanId);
    expect(parentOf(prediction)).toBe(operation.spanId);

    const operationStatus = requireEndedSpan(operation);

    for (const child of [decode, prediction, engine]) {
      const status = requireEndedSpan(child);

      expect(child.traceId).toBe(job.traceId);
      expect(Exit.isSuccess(status.exit)).toBe(true);
      expect(status.startTime).toBeGreaterThanOrEqual(operationStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(operationStatus.endTime);
    }

    expect(Exit.isSuccess(operationStatus.exit)).toBe(true);

    expect(Object.fromEntries(operation.attributes)).toEqual({
      "effect_prophet.observation.count": history.length,
    });

    expect(spans.some((candidate) => candidate.name.includes("fit"))).toBe(false);
  });

  it("ends a failed span and starts no prediction on pre-boundary failures", async () => {
    const model = await fitModel(history);

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    const { spans, tracer } = collectTestSpans();

    const failed = await Effect.runPromise(
      residuals({ ...model, noiseScale: -1 }, history).pipe(Effect.withTracer(tracer), Effect.exit),
    );

    const operation = spans.find((span) => span.name === "Prophet.residuals");
    const status = operation === undefined ? undefined : requireEndedSpan(operation);

    expect(Exit.isFailure(failed)).toBe(true);
    expect(status !== undefined && Exit.isFailure(status.exit)).toBe(true);
    expect(operation === undefined ? undefined : Object.fromEntries(operation.attributes)).toEqual(
      {},
    );

    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toEqual([]);

    spans.length = 0;

    await Effect.runPromise(
      residuals(model, JSON.parse("[]")).pipe(Effect.withTracer(tracer), Effect.exit),
    );

    expect(spans.some((span) => span.name === "Prophet.predict")).toBe(false);
    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toEqual([]);
  });
});
