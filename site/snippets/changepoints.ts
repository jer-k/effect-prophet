import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// Sales grow slowly, then speed up after a product launch on day 60.
const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: day < 60 ? 50 + day * 0.2 : 62 + (day - 60) * 1.5,
}));

const nextWeek = Array.from({ length: 7 }, (_, offset) => date(120 + offset));

// Let the model look for changes on its own, with more freedom to bend.
const automatic = fit(history, {
  map: {
    changepoints: { mode: "auto", count: 25, range: 0.9 },
    changepointPriorScale: 0.5,
  },
});

// Or tell it exactly when the trend changed.
const explicit = fit(history, {
  map: {
    changepoints: { mode: "explicit", timestamps: [date(60)] },
  },
});

const forecasts = await Effect.runPromise(
  Effect.gen(function* () {
    const automaticForecast = yield* predict(yield* automatic, nextWeek);
    const explicitForecast = yield* predict(yield* explicit, nextWeek);

    return { automaticForecast, explicitForecast };
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(
  "automatic:",
  forecasts.automaticForecast.map((row) => row.value.toFixed(1)).join(", "),
);

console.log("explicit: ", forecasts.explicitForecast.map((row) => row.value.toFixed(1)).join(", "));
