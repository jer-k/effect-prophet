import { readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { PredictionError } from "../../../src/errors";
import { emptyEventCalendar } from "../../../src/event";
import { parseLogisticMapModel } from "../../../src/fitted-model";
import { decodeFittedModel, encodeFittedModel } from "../../../src/model-serialization";
import { predict, predictUncertainty } from "../../../src/prophet";
import { makeSeasonalityLayout } from "../../../src/seasonality";

const FixtureSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(
    Schema.Struct({
      id: Schema.String,
      scaling: Schema.Literals(["absmax", "minmax"]),
      scale: Schema.Finite,
      times: Schema.Array(Schema.Finite),
      capacities: Schema.Array(Schema.Finite),
      floors: Schema.Array(Schema.Finite),
      parameters: Schema.Struct({
        rate: Schema.Finite,
        offset: Schema.Finite,
        changepoints: Schema.Array(Schema.Finite),
        deltas: Schema.Array(Schema.Finite),
      }),
      expected: Schema.Array(
        Schema.Union([
          Schema.Struct({ kind: Schema.Literal("finite"), trend: Schema.Finite }),
          Schema.Struct({ kind: Schema.Literal("non-finite") }),
        ]),
      ),
    }),
  ),
  toleranceAbsolute: Schema.Finite,
});

const input: unknown = JSON.parse(
  await readFile(
    new URL("../../fixtures/prophet-1.4.0/logistic-prediction-state.json", import.meta.url),
    "utf8",
  ),
);

const fixture = Schema.decodeUnknownSync(FixtureSchema)(input);

const layout = await Effect.runPromise(makeSeasonalityLayout([]));

const origin = Date.parse("2020-01-01T00:00:00.000Z");

const span = 4 * 86_400_000;

const timestamp = (time: number) => new Date(origin + time * span).toISOString();

const makeModel = (reference: (typeof FixtureSchema.Type)["cases"][number]) =>
  parseLogisticMapModel({
    model: "logistic-piecewise-map",
    targetScaling: {
      mode: reference.scaling,
      scale: reference.scale,
      floorPolicy: { kind: "explicit" },
    },
    rate: reference.parameters.rate,
    offset: reference.parameters.offset,
    timeOrigin: origin,
    timeScale: span,
    changepointTimestamps: reference.parameters.changepoints.map((point) => origin + point * span),
    deltas: reference.parameters.deltas,
    seasonalities: layout,
    coefficients: [],
    events: emptyEventCalendar,
    eventCoefficients: [],
    regressors: [],
    noiseScale: 1,
    fitSummary: {
      method: "logistic-piecewise-map-stan-v2",
      termination: "iteration-limit",
      optimization: {
        algorithm: "newton",
        attemptCount: 1,
        failedAttemptIterations: null,
        hessianResets: 0,
      },
      valueScale: reference.scale,
      observationCount: 2,
      iterations: 1,
      objective: 0,
      stationarityResidual: 0,
      changepointPriorScale: 0.05,
    },
  });

describe("Prophet 1.4.0 fixed public logistic prediction states", () => {
  it.each(fixture.cases)(
    "matches finite rows and reports nonfinite rows for $id",
    async (reference) => {
      const model = await Effect.runPromise(makeModel(reference));

      const restored = await Effect.runPromise(
        encodeFittedModel(model).pipe(Effect.flatMap(decodeFittedModel)),
      );

      const rows = reference.times.map((time, row) => ({
        timestamp: timestamp(time),
        capacity: reference.capacities[row],
        floor: reference.floors[row],
      }));

      expect(restored).toEqual(model);
      expect(rows).toHaveLength(reference.expected.length);

      for (const [row, expected] of reference.expected.entries()) {
        const requested = rows[row];

        if (requested === undefined) throw new Error("Missing aligned prediction row");
        const request = [requested];

        if (expected.kind === "finite") {
          const forecasts = await Effect.runPromise(predict(model, request));
          expect(
            Math.abs((forecasts[0]?.trend ?? Number.NaN) - expected.trend),
          ).toBeLessThanOrEqual(fixture.toleranceAbsolute);
          expect(await Effect.runPromise(predict(restored, request))).toEqual(forecasts);
        } else {
          for (const state of [model, restored]) {
            const failure = await Effect.runPromise(Effect.flip(predict(state, request)));
            expect(failure).toBeInstanceOf(PredictionError);
            expect(failure).toMatchObject({
              reason: "non-finite-forecast",
              timestamp: Date.parse(requested.timestamp),
            });

            const simulationFailure = await Effect.runPromise(
              Effect.flip(predictUncertainty(state, request, { seed: 19, samples: 2 })),
            );

            expect(simulationFailure).toBeInstanceOf(PredictionError);
            expect(simulationFailure).toMatchObject({ reason: "non-finite-forecast" });
          }
        }
      }

      const firstNonfinite = reference.expected.findIndex(
        (expected) => expected.kind === "non-finite",
      );

      if (firstNonfinite >= 0) {
        const requested = rows[firstNonfinite];

        if (requested === undefined) throw new Error("Missing aligned singular row");
        const failure = await Effect.runPromise(Effect.flip(predict(model, rows)));
        expect(failure).toMatchObject({
          reason: "non-finite-forecast",
          timestamp: Date.parse(requested.timestamp),
        });
        expect(await Effect.runPromise(predict(model, rows.slice(0, firstNonfinite)))).toHaveLength(
          firstNonfinite,
        );
      }
    },
  );
});
