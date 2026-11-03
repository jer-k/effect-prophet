import { Effect } from "effect";
import { fit, prophetFittingBackendLayer, warmStartParameters } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// A year of daily sales: growth that slows mid-year, a weekly pattern and four one-off spikes.
const sales = Array.from({ length: 365 }, (_, day) => ({
  timestamp: date(day),
  value:
    100 +
    (day < 180 ? day * 0.5 : 90 - (day - 180) * 0.2) +
    10 * Math.sin((2 * Math.PI * day) / 7) +
    3 * Math.sin(day * 12.9898) +
    ([50, 120, 230, 300].includes(day) ? 40 : 0),
}));

const report = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(sales);
    const warmStart = warmStartParameters(model);

    // One Newton step from where the fit stopped, on the same history.
    const step = yield* fit(sales, {
      map: { warmStart, optimizer: { algorithm: "newton", maxIterations: 1 } },
    });

    // Finish the fit with Newton, starting from the same place.
    const finished = yield* fit(sales, { map: { warmStart, optimizer: { algorithm: "newton" } } });

    return { model, step, finished };
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const { model, step, finished } = report;

console.log(`stopped by:      ${model.fitSummary.termination}`);

console.log(
  `one step gains:  ${(model.fitSummary.objective - step.fitSummary.objective).toFixed(3)}`,
);

console.log(
  `Newton gains:    ${(model.fitSummary.objective - finished.fitSummary.objective).toFixed(3)}`,
);
