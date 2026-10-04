# Extra factors (regressors)

Sometimes you know something that helps explain your data: the temperature, how much you spent
on ads, whether a promotion was running. Add these as **regressors**.

<<< @/snippets/regressors.ts

```txt [Output]
temperature additive 4.00
160.0, 160.0, 160.0
```

The model learned the real relationship: 4 extra sales for every degree.

## Things to know

- **Every row needs every regressor**, in both the history and the future rows. If you don't know
  the future value, you need your own forecast of it, such as a weather forecast.
- **Regressors are numbers.** Use `1` and `0` for yes/no factors.
- **`getRegressorCoefficients(model)`** shows what the model learned: how much the forecast
  changes per one unit of each regressor, in your data's units.
- **Options for each regressor:**

| Option            | Default      | Meaning                                                                                     |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------- |
| `priorScale`      | `10`         | Lower values keep the effect small unless the data clearly supports it                      |
| `mode`            | `"additive"` | `"multiplicative"` makes the effect a percentage of the trend                               |
| `standardization` | `"auto"`     | Rescales the values internally for a stable fit. `"auto"` leaves yes/no (0/1) values alone. |
