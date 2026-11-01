# Testing forecast accuracy

How good are your forecasts? The honest way to find out is to pretend it's the past: fit the model
on older data, forecast the next few weeks, and compare against what actually happened. Repeat
this at several points in time and average the errors. This is called **cross-validation**.

::: tip Verified against Python Prophet
Cross-validation forecasts match Python Prophet 1.4.0 on all three trend types. The
[cross-validation benchmarks](/benchmarks/cross-validation) show every case side by side.
:::

<<< @/snippets/cross-validation.ts

```txt [Output]
4 rounds, 56 forecasts checked
mae 1.882
rmse 2.102
mape 0.013
```

## Setting up the rounds

The third argument describes the rounds:

| Setting     | Meaning                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizonMs` | How far ahead each round forecasts                                                                                                           |
| `initialMs` | How much history the first round trains on. Defaults to three times the horizon, or longer if needed to cover your longest seasonal pattern. |
| `periodMs`  | How far apart the rounds start. Defaults to half the horizon.                                                                                |

All durations are in milliseconds. Multiply days by `86_400_000`.

To choose the exact dates yourself, use `cutoffs: { mode: "explicit", timestamps: [...] }`.

## The scores

| Metric     | What it measures                                                   |
| ---------- | ------------------------------------------------------------------ |
| `mae`      | Average size of the error, in your data's units                    |
| `rmse`     | Like `mae`, but big misses count extra                             |
| `mse`      | `rmse` squared                                                     |
| `mape`     | Average error as a fraction of the actual value (`0.05` = 5%)      |
| `mdape`    | Like `mape`, but the median, so a few bad days matter less         |
| `smape`    | A version of `mape` that treats over- and under-forecasting evenly |
| `coverage` | How often the actual value fell inside the uncertainty range       |

`coverage` needs uncertainty ranges. Pass `{ mode: "intervals", uncertainty: { seed: 1 } }` as a
fourth argument to `crossValidate`.

## Grouping the scores

`aggregation` decides which forecasts each score covers. Each choice matches a value of Python's
`rolling_window`:

| `aggregation`                                                   | Python                     | Scores                                                   |
| --------------------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| `{ kind: "overall" }`                                           | `rolling_window=1`         | One score over every forecast                            |
| `{ kind: "horizons" }`                                          | `rolling_window=0`         | One score per horizon, to see how accuracy drops off     |
| `{ kind: "rolling", window: { kind: "fraction", value: 0.1 } }` | `rolling_window=0.1`       | Python's default: each score covers 10% of the forecasts |
| `{ kind: "rolling", window: { kind: "count", rows: 30 } }`      | `rolling_window=30 / rows` | Each score covers exactly 30 forecasts                   |
| `{ kind: "rows" }`                                              | `rolling_window=-1`        | One score per forecast, from the shortest horizon up     |

A rolling score sits at the longest horizon in its window, and covers exactly the window's number
of forecasts, as in Python:

- Averages start at that horizon and add shorter ones until the window is full. When the last
  horizon added has more forecasts than the window still needs, the score takes just that share
  of their total. A horizon with more forecasts than the window on its own uses all of them.
- `mdape` takes every forecast at the horizon when there are at least as many as the window.
  Otherwise it fills the window with the forecasts just before them.
- Horizons too short to fill a window get no score.

The scores match Python Prophet's to the last digit.

## Grouping by calendar month

Horizons are exact durations by default, so forecasts 30 and 31 days out land in different
groups. To group them by calendar month instead, as Python's `monthly=True` does, pass
`horizon: "calendar-month"`:

```ts
performanceMetrics(result, {
  metrics: ["mae", "mape"],
  aggregation: { kind: "horizons" },
  horizon: "calendar-month",
});
```

A forecast's horizon is then the number of UTC calendar months between its round's cutoff and its
own timestamp. A forecast in the same month as the cutoff has horizon `0`, so a cutoff of
December 30 puts December 31 at `0` and January 1 at `1`. Every `aggregation` works the same way
on these month counts.

Each score carries `horizonMonths` instead of `horizonMs`, `rows` scores carry both, and the
report's `horizon` field says which unit it uses. An `overall` score covers every forecast in
either unit, so it has no `horizon` field. Its last digit can still differ between units, because
forecasts are totalled month by month instead of horizon by horizon, as in Python.

`comparePerformance` takes the same option and groups the model and every baseline the same way.

## Your own metrics

Python adds a metric with `register_performance_metric`. Here you pass a definition in `metrics`,
next to the built-in names:

<<< @/snippets/custom-metrics.ts

```txt [Output]
mae 1.882
wape 0.013
p90_error 2.982
pinball75 0.943
```

`score` gives each forecast a number, and `reduce` combines a group's numbers using the same
windows as the built-in metrics:

| `reduce`                            | Each score is                                                                                  | Like                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| `"mean"`                            | The average of the forecasts' numbers                                                          | `mae`, `mse`, `mape` |
| `"median"`                          | Their median                                                                                   | `mdape`              |
| `{ kind: "quantile", probability }` | numpy's `np.quantile` of them, from `0` (the smallest) to `1` (the largest)                    |                      |
| `"ratio-of-means"`                  | `score` returns `[numerator, denominator]`; the average numerator over the average denominator | WAPE                 |

`finalize` changes each combined score, the way `rmse` is the square root of `mse`:

```ts
const rootSquaredError = {
  name: "root_squared_error",
  reduce: "mean",
  score: (row) => (row.actual - row.predicted) ** 2,
  finalize: Math.sqrt,
} as const satisfies CustomMetric;
```

Writing `as const satisfies CustomMetric` checks the definition and keeps its name in the
report's types.

Some rules:

- A name is 1 to 64 letters, digits and underscores, not starting with a digit, as a Python
  function name would be. It can't repeat another metric's name or reuse a built-in one.
- `score` gets a frozen copy of the forecast: `fold`, `cutoff`, `timestamp`, `horizonMs`,
  `actual` and `predicted`, plus `lower` and `upper` when the result has uncertainty ranges.
- A `score` or `finalize` that returns something other than a finite number fails with an
  `EvaluationMetricError` whose `reason` is `"non-finite"`. A `"ratio-of-means"` whose average
  denominator is zero fails with `"zero-denominator"`. If `score` throws, the error isn't
  caught.
- The same definitions work in `comparePerformance`, and as the `objective` of `searchModels`.
  `evaluateHoldout` needs a built-in objective, because its saved report can't store a
  function.

A metric that needs more than one forecast at a time doesn't fit these shapes. Compute it from
`result.rows`, which lists every forecast with its round, cutoff and horizon. To choose settings
by such a score, run `searchModels` with `includeCrossValidation: true` and rank the candidates'
`crossValidation` rows yourself. For a metric scaled by the data each round trained on, see the
next section.

## Scaled errors

`mae` is in the data's own units, so it can't tell you whether 2.1 is good, or compare series of
different sizes. `mape` divides by each actual value, so it fails near zero. Mean absolute scaled
error (MASE) does neither. It divides each forecast's error by how far off a naive rule was on
the days that round trained on. Python Prophet doesn't have it.

<<< @/snippets/scaled-errors.ts

```txt [Output]
mae 2.063
mase 0.366
mase_weekly 0.475
```

Below 1, the model beat the naive rule; above 1, the naive rule did better. Here the model's
errors are about a third of repeating yesterday's value, and under half of repeating last week's.

`scaledErrorMetric(history, plan, options)` returns a definition for `metrics`, like your own
metrics above, so it also works in `comparePerformance` and as the `objective` of
`searchModels`. Pass the same history and plan the results came from: `result.plan`, or
`planRollingOrigin` before a search.

- **The naive rule.** By default, `lag: { kind: "previous-row" }` repeats the row before, however
  far back it is. `lag: { kind: "duration", lagMs }` repeats the value exactly `lagMs` earlier,
  matched the way the [seasonal-naive rule](./tuning#comparing-against-simple-rules) matches it.
  Rows with no value at that time are skipped, never filled in.
- **One scale per round.** Each round's scale is the average naive error over its own training
  rows, so a later round's data never affects an earlier score.
- **The name.** It's `mase` unless you pass `name`, which follows the rules for your own metrics.
  Give each scaled metric a different name to use more than one at a time.
- **Failures.** A round whose training rows have no pairs for the lag fails with a
  `MetricScaleError` whose `reason` is `"insufficient-history"`. Training values that never
  change fail with `"zero-scale"`, and naive errors too large to add up with `"non-finite"`. The
  error's `fold` and `cutoff` say which round. A result from a different plan fails when scored,
  with an `EvaluationMetricError` whose `reason` is `"non-finite"`.

## Actual values of zero

`mape` and `mdape` divide by the actual value, so they fail with an `EvaluationMetricError` whose
`reason` is `"zero-actual"`:

- `mape` fails if any actual is within `1e-8` of zero. That is where Python drops `mape` from its
  result.
- `mdape` fails only for an actual of exactly zero.

To score the remaining forecasts, leave those rows out:

```ts
performanceMetrics(
  { ...result, rows: result.rows.filter((row) => Math.abs(row.actual) >= 1e-8) },
  { metrics: ["mape"], aggregation: { kind: "overall" } },
);
```

## Is that good?

A score on its own is hard to judge. Compare it with simple rules of thumb on the same days. See
[Choosing settings](./tuning#comparing-against-simple-rules).
