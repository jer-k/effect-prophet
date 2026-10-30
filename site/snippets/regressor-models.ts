import { Effect } from "effect";
import { fit, makeFutureTimestamps, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// Foot traffic grows and peaks once a week, and sales follow it.
const traffic = (day: number) => 100 + 0.5 * day + 20 * Math.sin((2 * Math.PI * day) / 7);

const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: 50 + 2 * traffic(day),
  regressors: { traffic: traffic(day) },
}));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    // Traffic gets its own model, fitted to its history, like Python's regressor_predictor.
    const model = yield* fit(history, { regressors: [{ name: "traffic", predictor: true }] });

    // The future rows need no traffic values: the traffic model forecasts them.
    const future = yield* makeFutureTimestamps(history, { periods: 5, includeHistory: false });

    return yield* predict(model, future);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log("forecast", forecast.map((row) => row.value.toFixed(1)).join(", "));

console.log(
  "actual  ",
  [120, 121, 122, 123, 124].map((day) => (50 + 2 * traffic(day)).toFixed(1)).join(", "),
);
