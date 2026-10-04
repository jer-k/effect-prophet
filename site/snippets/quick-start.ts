import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

// 1. Your history: one row per day, each with a timestamp and a value.
const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

// 2. The dates you want a forecast for: the next seven days.
const nextWeek = Array.from({ length: 7 }, (_, offset) =>
  new Date(Date.UTC(2025, 0, 91 + offset)).toISOString(),
);

// 3. Describe the work: fit a model to the history, then predict.
const program = Effect.gen(function* () {
  const model = yield* fit(history);

  return yield* predict(model, nextWeek);
});

// 4. Run it. The layer plugs in the forecasting engine.
const forecast = await Effect.runPromise(program.pipe(Effect.provide(prophetFittingBackendLayer)));

for (const row of forecast) {
  console.log(new Date(row.timestamp).toISOString().slice(0, 10), row.value.toFixed(1));
}
