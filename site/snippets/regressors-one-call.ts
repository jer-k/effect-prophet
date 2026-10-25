import { Effect } from "effect";
import { forecast, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const temperature = (day: number) => 15 + 10 * Math.sin((2 * Math.PI * day) / 365);

const history = Array.from({ length: 200 }, (_, day) => ({
  timestamp: date(day),
  value: 40 + 4 * temperature(day),
  regressors: { temperature: temperature(day) },
}));

// Full rows: each future date carries the regressor value the model needs.
const future = [20, 25, 30].map((degrees, offset) => ({
  timestamp: date(200 + offset),
  regressors: { temperature: degrees },
}));

const rows = await Effect.runPromise(
  forecast(history, future, { regressors: [{ name: "temperature" }] }).pipe(
    Effect.provide(prophetFittingBackendLayer),
  ),
);

console.log(rows.map((row) => row.value.toFixed(1)).join(", "));
