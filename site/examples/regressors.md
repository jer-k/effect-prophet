# Extra factors (regressors)

Sometimes you know something that helps explain your data: the temperature, how much you spent
on ads, whether a promotion was running. Add these as **regressors**.

::: tip Verified against Python Prophet
Regressors match Python Prophet 1.4.0 on all three trend types. The
[seasonality, events and regressors benchmarks](/benchmarks/features) show every case side by side.
:::

<<< @/snippets/regressors.ts

```txt [Output]
temperature additive 3.99
159.9, 159.9, 159.9
```

The model learned the real relationship: about 4 extra sales for every degree.

## In one call

If you don't need the coefficients, `forecast` fits and predicts at once. Pass full rows, each
with its future regressor value:

<<< @/snippets/regressors-one-call.ts

```txt [Output]
120.0, 139.9, 159.9
```

## Forecasting a regressor

When you don't know a regressor's future values, give it its own model with `predictor`, like
Python's `regressor_predictor`. `fit` fits a second model to the regressor's history, and `predict`
uses that model's forecast for every row after the history:

<<< @/snippets/regressor-models.ts

```txt [Output]
forecast 401.3, 410.0, 389.4, 355.6, 335.0
actual   401.3, 410.0, 389.4, 355.6, 335.0
```

`predictor: true` uses the default settings. To change them, pass options instead, such as
`{ growth: "flat", builtInSeasonalities: { yearly: "off" } }`. As in Python, where these are
`Prophet` constructor arguments:

- The options are `growth` (`"linear"` or `"flat"`), `seasonalityMode`, `holidaysMode`,
  `seasonalityPriorScale`, `holidaysPriorScale`, `builtInSeasonalities`, `events`, `scaling`, and
  `map.changepoints` and `map.changepointPriorScale`. Custom seasonalities, regressors and country
  holidays aren't available, and logistic growth isn't either, because it needs a capacity no
  future row has.
- The regressor model doesn't inherit the main model's settings, except `map.optimizer` and
  `map.warmStart` when you set them, as Python passes its fit arguments on. A warm start's `delta`
  and `beta` are used only if their lengths match the regressor model's.
- In rows after the history, the forecast replaces any value you pass for that regressor. In
  earlier rows, a value you pass is used, and a missing one is the history's value at the same
  timestamp. If that timestamp isn't in the history, or the history repeats timestamps, `predict`
  fails and asks for the value.
- Regressors without a `predictor` still need a value in every row.
- Saved models keep the regressor models, so a loaded model forecasts the same way. Python's saved
  models drop them.
- `predictWithIntervals` and `predictUncertainty` don't support these models yet. Python widens
  the intervals with the regressor model's own uncertainty, which isn't implemented here yet.

## Things to know

- **Every row needs every regressor**, in both the history and the future rows, unless the
  regressor has its own model. If you don't know a future value, use your own forecast, such as a
  weather forecast, or [forecast it with its own model](#forecasting-a-regressor).
- **Regressors are numbers.** Use `1` and `0` for yes/no factors.
- **`getRegressorCoefficients(model)`** shows what the model learned: how much the forecast
  changes per one unit of each regressor, in your data's units.
- **Options for each regressor:**

| Option            | Default              | Meaning                                                                                     |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| `priorScale`      | `holidaysPriorScale` | Lower values keep the effect small unless the data clearly supports it                      |
| `mode`            | `"additive"`         | `"multiplicative"` makes the effect a percentage of the trend                               |
| `standardization` | `"auto"`             | Rescales the values internally for a stable fit. `"auto"` leaves yes/no (0/1) values alone. |
| `predictor`       | none                 | `true` or options to [forecast the regressor with its own model](#forecasting-a-regressor)  |

As in Python Prophet, a regressor without its own `priorScale` uses the model's
`holidaysPriorScale` (default `10`), not `seasonalityPriorScale`. Changing `holidaysPriorScale`
therefore changes those regressors too. To tune holidays alone, give each regressor its own
`priorScale`.
