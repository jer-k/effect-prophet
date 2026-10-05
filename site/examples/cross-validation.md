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

You can also group scores by how far ahead the forecast was, with
`aggregation: { kind: "horizons" }`, to see how accuracy drops off over time.

## Is that good?

A score on its own is hard to judge. Compare it with simple rules of thumb on the same days. See
[Choosing settings](./tuning#comparing-against-simple-rules).
