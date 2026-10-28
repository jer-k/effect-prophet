import { Effect } from "effect";
import { fit, prophetFittingBackendLayer, residuals } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const sales = Array.from({ length: 104 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 4 * Math.sin(day * 12.9898),
}));

// Hold back the last two weeks; the model never sees them.
const training = sales.slice(0, 90);

const heldOut = sales.slice(90);

const meanAbsolute = (rows: ReadonlyArray<{ readonly residual: number }>) =>
  rows.reduce((total, row) => total + Math.abs(row.residual), 0) / rows.length;

const [inSample, outOfSample] = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(training);

    return [yield* residuals(model, training), yield* residuals(model, heldOut)] as const;
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(`training days: mean absolute residual ${meanAbsolute(inSample).toFixed(2)}`);

console.log(`held-out days: mean absolute residual ${meanAbsolute(outOfSample).toFixed(2)}`);
