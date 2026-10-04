import { Effect } from "effect";
import { fit, predict, predictUncertainty, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 4 * Math.sin(day * 12.9898),
}));

const nextWeek = Array.from({ length: 7 }, (_, offset) => date(90 + offset));

const result = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);
    const forecast = yield* predict(model, nextWeek);

    // The seed makes the simulation repeatable: same seed, same intervals.
    const intervals = yield* predictUncertainty(model, nextWeek, {
      seed: 42,
      samples: 1000,
      intervalWidth: 0.8,
    });

    return { forecast, intervals };
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (result.intervals.kind === "intervals") {
  for (const [index, row] of result.intervals.rows.entries()) {
    const point = result.forecast[index]?.value ?? Number.NaN;

    console.log(
      new Date(row.timestamp).toISOString().slice(0, 10),
      `${point.toFixed(1)}  (80% range ${row.value.lower.toFixed(1)} to ${row.value.upper.toFixed(1)})`,
    );
  }
}
