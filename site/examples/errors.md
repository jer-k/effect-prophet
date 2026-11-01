# Handling errors

Every operation can fail in a few specific, named ways. Each error has a `_tag`, so you can
handle the ones you care about and let the rest through.

<<< @/snippets/errors.ts

```txt [Output]
Bad input (observations): Expected a valid canonical UTC timestamp (for example, 2024-01-01T00:00:00.000Z)
  at [0]["timestamp"]
```

## The errors you may see

| Error                         | Meaning                                                                                                                                                                                                                                                                                             | Typical fix                                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `InputValidationError`        | The data or options are malformed: a bad timestamp, a missing field, an unknown option                                                                                                                                                                                                              | The message and `issues` point to the exact field                                                                                                 |
| `FittingError`                | The model couldn't be fitted to this data. `reason` says why, e.g. `insufficient-observations` or `memory-limit`. When a regressor's own model failed, `regressor` names it.                                                                                                                        | Check for too few rows or all-identical timestamps; see [limits](/python/differences#small-behavior-differences)                                  |
| `PredictionError`             | A forecast couldn't be computed for a row. `reason` says why, e.g. `simulation-limit`, or `non-finite-forecast` when a residual overflows. When a regressor's own model failed, `regressor` names it.                                                                                               | Check that future rows have every field the model needs                                                                                           |
| `CountryHolidayError`         | A country calendar couldn't be used. `reason` says why, e.g. `known-coverage-restriction`.                                                                                                                                                                                                          | See [calendar errors](/guide/holiday-calendars#errors)                                                                                            |
| `ModelSerializationError`     | Saved model data couldn't be read                                                                                                                                                                                                                                                                   | Make sure it was saved by the same version                                                                                                        |
| `EvaluationMetricError`       | A score couldn't be computed. `reason` says why, e.g. `zero-actual` when `mape` meets an actual near zero, `zero-denominator` when a custom ratio divides by zero, or `non-finite` when a custom `score` returns something other than a finite number.                                              | See [actual values of zero](/examples/cross-validation#actual-values-of-zero) and [your own metrics](/examples/cross-validation#your-own-metrics) |
| `MetricScaleError`            | A scaled error like `mase` couldn't get a scale for one round. `reason` is `insufficient-history` when the round's training rows have no pairs for the lag, `zero-scale` when its training values never change, or `non-finite` when the naive errors overflow. `fold` and `cutoff` name the round. | See [scaled errors](/examples/cross-validation#scaled-errors)                                                                                     |
| `EvaluationError` and friends | Cross-validation, search or holdout checks failed                                                                                                                                                                                                                                                   | `reason` and the wrapped `cause` explain which step                                                                                               |

## Without Effect

If you just `await Effect.runPromise(...)` and an error happens, the promise rejects with that
error, so a normal `try`/`catch` works:

```ts
try {
  const model = await Effect.runPromise(
    fit(history).pipe(Effect.provide(prophetFittingBackendLayer)),
  );
} catch (error) {
  console.error(error);
}
```
