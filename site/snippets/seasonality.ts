import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2024, 0, 1 + day)).toISOString();

// Two years of daily data with a weekly rhythm and a monthly billing cycle.
const history = Array.from({ length: 730 }, (_, day) => ({
  timestamp: date(day),
  value:
    200 +
    day * 0.1 +
    15 * Math.sin((2 * Math.PI * day) / 7) +
    8 * Math.cos((2 * Math.PI * day) / 30.5),
}));

const model = fit(history, {
  // Built-in patterns: "auto" (the default), "off", or "on" with your own settings.
  builtInSeasonalities: {
    weekly: { mode: "on", fourierOrder: 5 },
    yearly: "auto",
    daily: "off",
  },
  // Add any repeating pattern you know about.
  seasonalities: [{ name: "monthly", periodDays: 30.5, fourierOrder: 5 }],
});

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    return yield* predict(yield* model, [date(731)]);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const seasonality of forecast[0]?.seasonalities ?? []) {
  if (seasonality.mode === "additive") {
    console.log(seasonality.name, seasonality.value.toFixed(2));
  }
}
