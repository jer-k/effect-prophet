import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    return yield* predict(model, ["2025-04-01T00:00:00.000Z"]);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const [row] = forecast;

if (row !== undefined) {
  console.log("date:", new Date(row.timestamp).toISOString());
  console.log("forecast:", row.value.toFixed(2));
  console.log("trend:", row.trend.toFixed(2));

  for (const seasonality of row.seasonalities) {
    if (seasonality.mode === "additive") {
      console.log(`${seasonality.name}:`, seasonality.value.toFixed(2));
    }
  }
}
