import { Effect } from "effect";
import { fit, makeFutureTimestamps, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// Python builds a dataframe with `ds` and `y` columns. Here each row is a plain object.
const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    // `Prophet(changepoint_prior_scale=0.5, weekly_seasonality=False).fit(df)`
    const model = yield* fit(history, {
      map: { changepointPriorScale: 0.5 },
      builtInSeasonalities: { weekly: "off" },
    });

    // `model.make_future_dataframe(periods=7, include_history=False)`
    const future = yield* makeFutureTimestamps(history, { periods: 7, includeHistory: false });

    // `model.predict(future)`
    return yield* predict(model, future);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const row of forecast) {
  console.log(new Date(row.timestamp).toISOString().slice(0, 10), row.value.toFixed(1));
}
