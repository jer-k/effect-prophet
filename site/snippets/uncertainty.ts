import { Effect } from "effect";
import { fit, predictWithIntervals, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 4 * Math.sin(day * 12.9898),
}));

const nextWeek = Array.from({ length: 7 }, (_, offset) => date(90 + offset));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    // The seed makes the simulation repeatable: same seed, same ranges.
    return yield* predictWithIntervals(model, nextWeek, {
      seed: 42,
      samples: 1000,
      intervalWidth: 0.8,
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const row of forecast.rows) {
  console.log(
    new Date(row.timestamp).toISOString().slice(0, 10),
    `${row.value.toFixed(1)}  (80% range ${row.valueInterval.lower.toFixed(1)} to ${row.valueInterval.upper.toFixed(1)})`,
  );
}
