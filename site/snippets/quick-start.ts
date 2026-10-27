import { Effect } from "effect";
import { fit, makeFutureTimestamps, predict, prophetFittingBackendLayer } from "effect-prophet";

// 1. Your history: one row per day, each with a timestamp and a value.
const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

// 2. Describe the work: fit a model to the history, list the next seven days, then predict.
const program = Effect.gen(function* () {
  const model = yield* fit(history);
  const nextWeek = yield* makeFutureTimestamps(history, { periods: 7, includeHistory: false });

  return yield* predict(model, nextWeek);
});

// 3. Run it. The layer plugs in the forecasting engine.
const forecast = await Effect.runPromise(program.pipe(Effect.provide(prophetFittingBackendLayer)));

for (const row of forecast) {
  console.log(new Date(row.timestamp).toISOString().slice(0, 10), row.value.toFixed(1));
}
