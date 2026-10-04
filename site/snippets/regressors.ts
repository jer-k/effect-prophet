import { Effect } from "effect";
import { fit, getRegressorCoefficients, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const temperature = (day: number) => 15 + 10 * Math.sin((2 * Math.PI * day) / 365);

// Ice cream sales follow the temperature: about 4 extra sales per degree.
const history = Array.from({ length: 200 }, (_, day) => ({
  timestamp: date(day),
  value: 40 + 4 * temperature(day),
  regressors: { temperature: temperature(day) },
}));

const model = fit(history, {
  regressors: [{ name: "temperature" }],
});

// You must supply the regressor for every future row, e.g. from a weather forecast.
const future = Array.from({ length: 3 }, (_, offset) => ({
  timestamp: date(200 + offset),
  regressors: { temperature: 30 },
}));

const result = await Effect.runPromise(
  Effect.gen(function* () {
    const fitted = yield* model;

    return { fitted, forecast: yield* predict(fitted, future) };
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const coefficient of getRegressorCoefficients(result.fitted)) {
  console.log(coefficient.name, coefficient.mode, coefficient.coefficient.toFixed(2));
}

console.log(result.forecast.map((row) => row.value.toFixed(1)).join(", "));
