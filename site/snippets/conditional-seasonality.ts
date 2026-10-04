import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day));

// A campus coffee shop: the weekly pattern only exists while classes are in session.
const inSession = (day: number) => {
  const month = date(day).getUTCMonth();

  return month < 5 || month > 7;
};

const history = Array.from({ length: 365 }, (_, day) => ({
  timestamp: date(day).toISOString(),
  value: 80 + (inSession(day) ? 25 * Math.sin((2 * Math.PI * day) / 7) : 0),
  // Every row says whether the condition is true on that day.
  conditions: { inSession: inSession(day) },
}));

const model = fit(history, {
  builtInSeasonalities: { weekly: "off" },
  seasonalities: [
    { name: "school-week", periodDays: 7, fourierOrder: 3, conditionName: "inSession" },
  ],
});

// Future rows need the condition too.
const future = Array.from({ length: 7 }, (_, offset) => ({
  timestamp: date(365 + offset).toISOString(),
  conditions: { inSession: inSession(365 + offset) },
}));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    return yield* predict(yield* model, future);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(forecast.map((row) => row.value.toFixed(1)).join(", "));
