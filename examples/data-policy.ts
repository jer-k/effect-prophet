import { Effect } from "effect";
import {
  fit,
  predict,
  prophetFittingBackendLayer,
  type EncodedObservation,
  type EncodedPredictionRow,
} from "effect-prophet";

// The application's source parser distinguishes a complete observation from a missing target.
// It does not pass the latter to the library as a partial observation.
type SourceRow =
  | { readonly kind: "observed"; readonly row: EncodedObservation }
  | { readonly kind: "missing-target"; readonly timestamp: string };

const sourceRows: ReadonlyArray<SourceRow> = [
  {
    kind: "observed",
    row: { timestamp: "2025-01-01T00:00:00.000Z", value: 2, regressors: { promotion: 0 } },
  },
  {
    kind: "observed",
    row: { timestamp: "2025-01-02T00:00:00.000Z", value: 5, regressors: { promotion: 1 } },
  },
  {
    kind: "observed",
    row: { timestamp: "2025-01-03T00:00:00.000Z", value: 4, regressors: { promotion: 0 } },
  },
  { kind: "missing-target", timestamp: "2025-01-04T00:00:00.000Z" },
  {
    kind: "observed",
    row: { timestamp: "2025-01-05T00:00:00.000Z", value: 8, regressors: { promotion: 0 } },
  },
  {
    kind: "observed",
    row: { timestamp: "2025-01-06T00:00:00.000Z", value: 11, regressors: { promotion: 1 } },
  },
  {
    kind: "observed",
    row: { timestamp: "2025-01-07T00:00:00.000Z", value: 10, regressors: { promotion: 0 } },
  },
  {
    kind: "observed",
    row: { timestamp: "2025-01-08T00:00:00.000Z", value: 13, regressors: { promotion: 1 } },
  },
  {
    kind: "observed",
    row: { timestamp: "2025-01-09T00:00:00.000Z", value: 12, regressors: { promotion: 0 } },
  },
];

const omittedCount = sourceRows.filter((row) => row.kind === "missing-target").length;

const completeRows = sourceRows.flatMap((row) => (row.kind === "observed" ? [row.row] : []));

// The supplied source data is already in canonical UTC order. A real source adapter owns
// validation, sorting, deduplication, aggregation and exclusion before this projection.
const training = completeRows.slice(0, -2);

const holdout = completeRows.slice(-2);

const futureRows: ReadonlyArray<EncodedPredictionRow> = holdout.map((row) => ({
  timestamp: row.timestamp,
  regressors: row.regressors,
}));

const program = Effect.gen(function* () {
  const model = yield* fit(training, {
    regressors: [{ name: "promotion", priorScale: 10 }],
  });

  return yield* predict(model, futureRows);
}).pipe(Effect.provide(prophetFittingBackendLayer));

const forecasts = await Effect.runPromise(program);

console.log(
  `Omitted ${omittedCount} incomplete source row; predicted ${forecasts.length} held-out rows.`,
);
