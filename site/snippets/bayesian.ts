import { Effect } from "effect";
import { fit, isMcmcModel, predictWithIntervals, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 4 * Math.sin(day * 12.9898),
}));

const nextWeek = Array.from({ length: 3 }, (_, offset) => date(90 + offset));

const { model, forecast } = await Effect.runPromise(
  Effect.gen(function* () {
    // Like Python's `mcmc_samples=300`: 4 chains, each with 150 warmup and 150 kept draws.
    const model = yield* fit(history, { mcmc: { samples: 300, seed: 7 } });
    const forecast = yield* predictWithIntervals(model, nextWeek, { seed: 42 });

    return { model, forecast };
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const diagnostics = isMcmcModel(model) ? model.fitSummary.diagnostics : null;

console.log(
  `${model.model}: ${diagnostics?.divergences} divergences, max R-hat ${diagnostics?.maxRhat?.toFixed(2)}`,
);

console.log(`${forecast.sampleCount} simulated paths`);

for (const row of forecast.rows) {
  const weekly = row.componentIntervals?.seasonalities.find(({ name }) => name === "weekly");

  console.log(
    new Date(row.timestamp).toISOString().slice(0, 10),
    `${row.value.toFixed(1)} (80% range ${row.valueInterval.lower.toFixed(1)} to ${row.valueInterval.upper.toFixed(1)})`,
    `weekly ${weekly?.interval.lower.toFixed(2)} to ${weekly?.interval.upper.toFixed(2)}`,
  );
}
