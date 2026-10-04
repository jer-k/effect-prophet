import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// The weekly swing grows as the business grows: it is a percentage, not a fixed amount.
const history = Array.from({ length: 120 }, (_, day) => {
  const trend = 100 + day * 2;

  return {
    timestamp: date(day),
    value: trend * (1 + 0.2 * Math.sin((2 * Math.PI * day) / 7)),
  };
});

const model = fit(history, { seasonalityMode: "multiplicative" });

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    return yield* predict(yield* model, [date(121)]);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const seasonality of forecast[0]?.seasonalities ?? []) {
  if (seasonality.mode === "multiplicative") {
    // `factor` is the percentage effect; `contribution` is the same effect in your data's units.
    console.log(
      seasonality.name,
      `${(seasonality.factor * 100).toFixed(1)}%`,
      seasonality.contribution.toFixed(1),
    );
  }
}
