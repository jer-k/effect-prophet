import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { emptyEventCalendar } from "../../../src/event";
import { parseLogisticMapModel } from "../../../src/fitted-model";
import { prophetFittingBackendLayer } from "../../../src/internal/prophet-fitting-backend";
import { fit, predict } from "../../../src/prophet";
import { makeSeasonalityLayout } from "../../../src/seasonality";

const RowSchema = Schema.Struct({
  timestamp: Schema.String,
  value: Schema.optionalKey(Schema.Finite),
  capacity: Schema.Finite,
  floor: Schema.optionalKey(Schema.Finite),
});

const LogisticFixtureSchema = Schema.Struct({
  fixedCases: Schema.NonEmptyArray(
    Schema.Struct({
      id: Schema.String,
      scaling: Schema.Literals(["absmax", "minmax"]),
      training: Schema.NonEmptyArray(RowSchema),
      predictionRows: Schema.Array(RowSchema),
      parameters: Schema.Struct({
        rate: Schema.Finite,
        offset: Schema.Finite,
        changepoints: Schema.Array(Schema.Finite),
        deltas: Schema.Array(Schema.Finite),
      }),
      expected: Schema.Struct({
        scale: Schema.Finite,
        scaledTime: Schema.Array(Schema.Finite),
        scaledCapacity: Schema.Array(Schema.Finite),
        trend: Schema.Array(Schema.Finite),
      }),
      tolerance: Schema.Struct({ absolute: Schema.Finite, relative: Schema.Finite }),
    }),
  ),
  fittedCases: Schema.NonEmptyArray(
    Schema.Struct({
      id: Schema.String,
      scaling: Schema.Literals(["absmax", "minmax"]),
      observations: Schema.NonEmptyArray(RowSchema),
      predictionRows: Schema.Array(RowSchema),
      settings: Schema.Struct({
        algorithm: Schema.String,
        changepointPriorScale: Schema.Finite,
        changepointTimestamp: Schema.String,
        scale: Schema.Finite,
      }),
      expected: Schema.Struct({
        rate: Schema.Finite,
        offset: Schema.Finite,
        deltas: Schema.Array(Schema.Finite),
        noiseScale: Schema.Finite,
        trend: Schema.Array(Schema.Finite),
        value: Schema.Array(Schema.Finite),
      }),
      tolerance: Schema.Struct({
        forecastAbsolute: Schema.Finite,
        parameterAbsolute: Schema.Finite,
      }),
    }),
  ),
});

const fixturePath = fileURLToPath(
  new URL("../../fixtures/prophet-1.4.0/logistic-map.json", import.meta.url),
);

const fixtureInput: unknown = JSON.parse(await readFile(fixturePath, "utf8"));

const fixture = Schema.decodeUnknownSync(LogisticFixtureSchema)(fixtureInput);

const emptyLayout = await Effect.runPromise(makeSeasonalityLayout([]));

const closeTo = (actual: number, expected: number, absolute: number, relative: number) => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(absolute + relative * Math.abs(expected));
};

describe("Prophet 1.4.0 logistic MAP compatibility", () => {
  it("matches fixed explicit/minmax and implicit/absmax logistic trends", async () => {
    for (const reference of fixture.fixedCases) {
      const first = reference.training[0];
      const last = reference.training.at(-1);

      if (first === undefined || last === undefined) {
        throw new Error("Fixture requires nonempty training rows");
      }

      const origin = Date.parse(first.timestamp);
      const scale = Date.parse(last.timestamp) - origin;

      const floorPolicy =
        first.floor === undefined
          ? ({ kind: "implicit", floor: 0 } as const)
          : ({ kind: "explicit" } as const);

      const model = await Effect.runPromise(
        parseLogisticMapModel({
          model: "logistic-piecewise-map",
          targetScaling: {
            mode: reference.scaling,
            scale: reference.expected.scale,
            floorPolicy,
          },
          rate: reference.parameters.rate,
          offset: reference.parameters.offset,
          timeOrigin: origin,
          timeScale: scale,
          changepointTimestamps: reference.parameters.changepoints.map(
            (point) => origin + point * scale,
          ),
          deltas: reference.parameters.deltas,
          seasonalities: emptyLayout,
          coefficients: [],
          events: emptyEventCalendar,
          eventCoefficients: [],
          regressors: [],
          noiseScale: 1,
          fitSummary: {
            method: "logistic-piecewise-map-proximal-v1",
            termination: "converged",
            valueScale: reference.expected.scale,
            observationCount: reference.training.length,
            iterations: 1,
            objective: 0,
            stationarityResidual: 0,
            changepointPriorScale: 0.05,
          },
        }),
      );

      const forecasts = await Effect.runPromise(predict(model, reference.predictionRows));

      for (const [index, forecast] of forecasts.entries()) {
        closeTo(
          forecast.trend,
          reference.expected.trend[index] ?? Number.NaN,
          reference.tolerance.absolute,
          reference.tolerance.relative,
        );
      }
    }
  });

  it("agrees with a fitted Prophet Newton forecast within cross-optimizer tolerance", async () => {
    const reference = fixture.fittedCases[0];

    const model = await Effect.runPromise(
      fit(reference.observations, {
        growth: "logistic",
        scaling: reference.scaling,
        map: {
          changepoints: {
            mode: "explicit",
            timestamps: [reference.settings.changepointTimestamp],
          },
          changepointPriorScale: reference.settings.changepointPriorScale,
        },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "logistic-piecewise-map") {
      throw new Error("Expected logistic model");
    }

    const forecasts = await Effect.runPromise(predict(model, reference.predictionRows));

    expect(Math.abs(model.rate - reference.expected.rate)).toBeLessThan(
      reference.tolerance.parameterAbsolute,
    );
    expect(Math.abs(model.offset - reference.expected.offset)).toBeLessThan(
      reference.tolerance.parameterAbsolute,
    );

    for (const [index, forecast] of forecasts.entries()) {
      expect(
        Math.abs(forecast.trend - (reference.expected.trend[index] ?? Number.NaN)),
      ).toBeLessThan(reference.tolerance.forecastAbsolute);
      expect(
        Math.abs(forecast.value - (reference.expected.value[index] ?? Number.NaN)),
      ).toBeLessThan(reference.tolerance.forecastAbsolute);
    }
  });
});
