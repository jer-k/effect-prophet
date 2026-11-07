---
description: "The typed errors each operation can fail with, their reason values, and handling them with or without Effect."
---

# Handling errors

Every operation can fail in a few specific, named ways. Each error has a `_tag`, so you can
handle the ones you care about and let the rest through.

<<< @/snippets/errors.ts

```txt [Output]
Bad row 0 (invalid-shape, timestamp)
```

## The errors you may see

| Error                         | Meaning                                                                                                                                                                                                                                                                                             | Typical fix                                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input errors                  | The data or options were rejected before any fitting: a bad timestamp, a missing field, an unknown option, or an option past its limit such as `mcmc.chains`. Each kind of input has its own error; see [below](#input-errors).                                                                     | `reason` says what's wrong, and the location fields and `issues` point to the exact row or option                                                 |
| `FittingError`                | The model couldn't be fitted to this data. `reason` says why, e.g. `insufficient-observations`, `memory-limit` or `sampling-limit`. When a regressor's own model failed, `regressor` names it.                                                                                                      | Check for too few rows or all-identical timestamps; see [limits](/python/differences#small-behavior-differences)                                  |
| `PredictionError`             | A forecast couldn't be computed for a row. `reason` says why, e.g. `simulation-limit`, or `non-finite-forecast` when a residual overflows. When a regressor's own model failed, `regressor` names it.                                                                                               | Check that future rows have every field the model needs                                                                                           |
| `CountryHolidayError`         | A country calendar couldn't be used. `reason` says why, e.g. `known-coverage-restriction`.                                                                                                                                                                                                          | See [calendar errors](/guide/holiday-calendars#errors)                                                                                            |
| `ModelSerializationError`     | Saved model data couldn't be read                                                                                                                                                                                                                                                                   | Make sure it was saved by the same version                                                                                                        |
| `EvaluationMetricError`       | A score couldn't be computed. `reason` says why, e.g. `zero-actual` when `mape` meets an actual near zero, `zero-denominator` when a custom ratio divides by zero, or `non-finite` when a custom `score` returns something other than a finite number.                                              | See [actual values of zero](/examples/cross-validation#actual-values-of-zero) and [your own metrics](/examples/cross-validation#your-own-metrics) |
| `MetricScaleError`            | A scaled error like `mase` couldn't get a scale for one round. `reason` is `insufficient-history` when the round's training rows have no pairs for the lag, `zero-scale` when its training values never change, or `non-finite` when the naive errors overflow. `fold` and `cutoff` name the round. | See [scaled errors](/examples/cross-validation#scaled-errors)                                                                                     |
| `EvaluationError` and friends | Cross-validation, search or holdout checks failed                                                                                                                                                                                                                                                   | `reason` and the wrapped `cause` explain which step                                                                                               |

In a browser, a `FittingError` or `PredictionError` with `reason: "backend-failure"` and
`backendPhase: "load"` means the engine binary couldn't be downloaded, and a `CountryHolidayError`
with `reason: "snapshot-unavailable"` means a calendar file couldn't be. See
[Browsers and bundlers](/guide/browsers#serving-the-files).

## Input errors

Each kind of input has its own error, so you can catch exactly the one you expect. Every input
error has:

- `reason`: what's wrong, one of a fixed list for that error.
- `issues`: every problem with that `reason`, each with a `message` and a `path` relative to the
  input, such as `[3, "regressors", "price"]` for row 3's `price` regressor.
- `message`: a readable summary.

Errors about rows also name the first rejected row: `rowIndex`, the `field` (`timestamp`,
`value`, `capacity`, `floor`, `regressors` or `conditions`) and, for a regressor or condition,
its `name`. The other input errors have `path`, the first rejected location.

When the input has several kinds of problems, the error reports the first kind found. Once
that's fixed, the next kind shows up.

| Error                     | Input                                                                                                                                                                            | `reason` values                                                                                                                                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ObservationError`        | A history of observations, as `fit`, `forecast`, `crossValidate`, `planRollingOrigin`, `searchModels`, `residuals`, `detectAnomalies`, `anomalies` and the baseline helpers take | `empty`, `invalid-shape`, `missing-capacity`, `inconsistent-floor`, `capacity-not-above-floor`, `bound-on-non-logistic`, `missing-regressor`, `unexpected-regressor`, `unrepresentable-regressor`, `missing-condition`, `unexpected-condition`       |
| `PredictionInputError`    | Timestamps or rows to predict, including the rows `residuals` and `detectAnomalies` build from your observations                                                                 | `invalid-shape`, `missing-capacity`, `missing-floor`, `unexpected-floor`, `capacity-not-above-floor`, `bound-on-non-logistic`, `missing-regressor`, `unexpected-regressor`, `unrepresentable-regressor`, `missing-condition`, `unexpected-condition` |
| `OptionsError`            | Model options, checked alone and against the history they fit                                                                                                                    | `invalid-shape`, `invalid-value`, `name-collision`, `changepoint-out-of-range`, `conflicting-options`, `limit-exceeded`                                                                                                                              |
| `FutureTimestampsError`   | `makeFutureTimestamps`'s anchor and options                                                                                                                                      | `invalid-shape`, `timestamp-overflow`                                                                                                                                                                                                                |
| `UncertaintyOptionsError` | Simulation options for `predictUncertainty`, `predictWithIntervals`, anomaly detection, interval cross-validation and holdout checks                                             | `invalid-shape`, `unsupported-output`                                                                                                                                                                                                                |
| `EvaluationPlanError`     | A cross-validation plan, plan summary or cross-validation controls                                                                                                               | `invalid-shape`, `horizon-exceeds-history`, `insufficient-data-after-initial`, `cutoff-out-of-range`, `empty-assessment`, `summary-mismatch`, `limit-exceeded`, `timestamp-overflow`                                                                 |
| `MetricOptionsError`      | Metric options for `performanceMetrics` and `comparePerformance`, baseline definitions and `scaledErrorMetric` options                                                           | `invalid-shape`, `row-count-out-of-range`, `window-exceeds-rows`                                                                                                                                                                                     |
| `SearchOptionsError`      | A `searchModels` request or a `makeParameterGrid` grid                                                                                                                           | `invalid-shape`, `invalid-candidate-options`, `invalid-base-options`, `invalid-mode`, `cutoff-mismatch`, `duplicate-choice`, `limit-exceeded`                                                                                                        |
| `HoldoutInputError`       | An `evaluateHoldout` request                                                                                                                                                     | `empty`, `invalid-shape`, `partition-not-later`, `limit-exceeded`, `unsupported-objective`, `receipt-mismatch`, `objective-dropped`, `baselines-need-point-metric`, `duplicate-baseline`, `unsupported-uncertainty`, `coverage-needs-intervals`      |

`invalid-shape` means the input doesn't have the expected form, such as a wrong type, a missing
or unknown key, or a number out of its allowed range. `issues` then lists each problem.

A few errors carry more context:

- `SearchOptionsError` names the candidate with `candidateIndex`. When a candidate's options
  or the search's `mode` are the problem, `cause` holds the original `OptionsError`,
  `EvaluationPlanError` or `UncertaintyOptionsError`.
- `HoldoutInputError` names the `partition`, `development` or `holdout`, when one is the
  problem, and its first rejected row in `rowIndex`.
- Options for a regressor's own model are reported as an `OptionsError` under
  `["regressors", index, "predictor", ...]`.
- An operation that takes several inputs reports each with its own error, with paths relative to
  that input. `searchModels` reports its `plan` with an `EvaluationPlanError`, and
  `evaluateHoldout` reports the selected options and `uncertainty` with an `OptionsError` and an
  `UncertaintyOptionsError`.
- A search candidate that fails with `failurePolicy: "record"` keeps only its error's `tag` and
  `reason` in the result, so the result can be saved without the issues' messages.

To handle any input problem the same way, use `isInputError`, which matches every error above.
The `InputError` type is their union:

```ts
import { Effect } from "effect";
import { fit, isInputError, prophetFittingBackendLayer } from "effect-prophet";

const result = fit(history).pipe(
  Effect.catchIf(isInputError, (error) => Effect.succeed(`Bad input: ${error.message}`)),
  Effect.provide(prophetFittingBackendLayer),
);
```

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
