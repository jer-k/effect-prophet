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

## Things to know

- **Every row needs every regressor**, in both the history and the future rows. If you don't know
  the future value, you need your own forecast of it, such as a weather forecast.
- **Regressors are numbers.** Use `1` and `0` for yes/no factors.
- **`getRegressorCoefficients(model)`** shows what the model learned: how much the forecast
  changes per one unit of each regressor, in your data's units.
- **Options for each regressor:**

| Option            | Default              | Meaning                                                                                     |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| `priorScale`      | `holidaysPriorScale` | Lower values keep the effect small unless the data clearly supports it                      |
| `mode`            | `"additive"`         | `"multiplicative"` makes the effect a percentage of the trend                               |
| `standardization` | `"auto"`             | Rescales the values internally for a stable fit. `"auto"` leaves yes/no (0/1) values alone. |

As in Python Prophet, a regressor without its own `priorScale` uses the model's
`holidaysPriorScale` (default `10`), not `seasonalityPriorScale`. Changing `holidaysPriorScale`
therefore changes those regressors too. To tune holidays alone, give each regressor its own
`priorScale`.
