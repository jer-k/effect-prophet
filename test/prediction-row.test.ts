import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError, PredictionError } from "../src/errors";
import {
  decodePredictionRows,
  pairForecastsWithObservations,
  predictionRowFromObservation,
} from "../src/prediction-row";

describe("decodePredictionRows", () => {
  it("parses mixed timestamp and object rows without reordering duplicates", async () => {
    const rows = await Effect.runPromise(
      decodePredictionRows([
        "2025-01-01T00:00:00.000Z",
        {
          timestamp: "2025-01-01T00:00:00.000Z",
          regressors: { price: 3 },
          conditions: { onSeason: false },
        },
      ]),
    );

    expect(rows).toEqual([
      { timestamp: 1_735_689_600_000 },
      {
        timestamp: 1_735_689_600_000,
        regressors: { price: 3 },
        conditions: { onSeason: false },
      },
    ]);
    expect(Object.isFrozen(rows)).toBe(true);
    expect(Object.isFrozen(rows[1]?.regressors)).toBe(true);
    expect(Object.isFrozen(rows[1]?.conditions)).toBe(true);
  });

  it("retains legacy diagnostics for object-free invalid inputs", async () => {
    const error = await Effect.runPromise(Effect.flip(decodePredictionRows(["invalid"])));

    expect(error).toBeInstanceOf(InputValidationError);
    expect(error.input).toBe("prediction-timestamps");
  });

  it("uses row diagnostics for mixed batches and rejects unknown fields", async () => {
    for (const input of [
      ["invalid", { timestamp: "also-invalid" }],
      [{ timestamp: "2025-01-01T00:00:00.000Z", typo: true }],
      [{ timestamp: "2025-01-01T00:00:00.000Z", regressors: { price: true } }],
      [{ timestamp: "2025-01-01T00:00:00.000Z", conditions: { onSeason: 1 } }],
    ]) {
      const error = await Effect.runPromise(Effect.flip(decodePredictionRows(input)));

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error.input).toBe("prediction-rows");
    }
  });
});

describe("predictionRowFromObservation", () => {
  it("drops the observed value and keeps every known input", () => {
    const observation = {
      timestamp: Date.parse("2025-01-02T00:00:00.000Z"),
      value: 12,
      capacity: 20,
      floor: 1,
      regressors: { promotion: 1 },
      conditions: { onSeason: true },
    };

    const before = structuredClone(observation);
    const row = predictionRowFromObservation(observation);

    expect(row).toEqual({
      timestamp: "2025-01-02T00:00:00.000Z",
      capacity: 20,
      floor: 1,
      regressors: { promotion: 1 },
      conditions: { onSeason: true },
    });

    expect(Object.isFrozen(row)).toBe(true);
    expect(observation).toEqual(before);

    expect(predictionRowFromObservation({ timestamp: 0, value: 1 })).toEqual({
      timestamp: "1970-01-01T00:00:00.000Z",
    });
  });
});

describe("pairForecastsWithObservations", () => {
  const observations = [
    { timestamp: 1, value: 10, regressors: { promotion: 1 } },
    { timestamp: 1, value: 11, regressors: { promotion: 0 } },
    { timestamp: 2, value: 12 },
  ];

  it("pairs by position, keeping tied rows apart", async () => {
    const forecasts = [
      { timestamp: 1, value: 9 },
      { timestamp: 1, value: 8 },
      { timestamp: 2, value: 7 },
    ];

    const pairs = await Effect.runPromise(
      pairForecastsWithObservations(observations, forecasts, "misaligned"),
    );

    expect(pairs).toEqual(
      observations.map((observation, index) => [observation, forecasts[index]]),
    );
    expect(pairs[0]?.[0]).toBe(observations[0]);
    expect(pairs[1]?.[1]).toBe(forecasts[1]);
  });

  it("rejects reordered, short or long forecasts", async () => {
    for (const forecasts of [
      [{ timestamp: 2 }, { timestamp: 1 }, { timestamp: 1 }],
      [{ timestamp: 1 }, { timestamp: 1 }],
      [{ timestamp: 1 }, { timestamp: 1 }, { timestamp: 2 }, { timestamp: 3 }],
    ]) {
      const error = await Effect.runPromise(
        Effect.flip(pairForecastsWithObservations(observations, forecasts, "misaligned")),
      );

      expect(error).toBeInstanceOf(PredictionError);
      expect(error).toMatchObject({
        reason: "backend-failure",
        timestamp: 1,
        message: "misaligned",
      });
    }
  });
});
