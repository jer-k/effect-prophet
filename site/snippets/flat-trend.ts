import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// Daily support tickets: a steady level with a weekly pattern, no long-term growth.
const history = Array.from({ length: 84 }, (_, day) => ({
  timestamp: date(day),
  value: 40 + 12 * Math.sin((2 * Math.PI * day) / 7) + 2 * Math.sin(day * 12.9898),
}));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history, { growth: "flat" });

    return yield* predict(model, [date(84), date(85), date(86)]);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(forecast.map((row) => `${row.value.toFixed(1)} (trend ${row.trend.toFixed(1)})`));
