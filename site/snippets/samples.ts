import { Effect } from "effect";
import { fit, predictUncertainty, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 4 * Math.sin(day * 12.9898),
}));

const nextThreeDays = [date(90), date(91), date(92)];

const result = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    return yield* predictUncertainty(model, nextThreeDays, {
      seed: 7,
      samples: 500,
      output: "samples",
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (result.kind === "samples") {
  // Samples are stored row by row: all of day 1's samples, then all of day 2's, and so on.
  const firstDay = result.value.subarray(0, result.sampleCount);
  const chanceAbove150 = firstDay.filter((value) => value > 150).length / result.sampleCount;

  console.log(`Chance tomorrow is above 150: ${(chanceAbove150 * 100).toFixed(0)}%`);
}
