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
