# Checking the fit

How well does a model follow your data? `residuals` predicts each of your measurements with a
fitted model and returns how far off it was. A good fit leaves residuals that bounce around zero;
a pattern in them shows something the model missed.

<<< @/snippets/residuals.ts

```txt [Output]
[
  { date: '2025-01-01', residual: 4.2 },
  { date: '2025-01-02', residual: 5.8 },
  { date: '2025-01-03', residual: 7.1 }
]
days 0-29: mean residual 1.2
days 30-59: mean residual -5.0
days 60-89: mean residual 3.7
```

This model has no changepoints, so its straight trend can't follow the jump on day 60. The
residuals show it: the model predicts too high in the weeks before the jump, so they turn negative,
and too low after it. Fitted with Prophet's automatic changepoints instead, the trend bends toward
the jump and the drift shrinks to under 2 either way.

## What you get back

One row per measurement, sorted by date. Measurements with the same timestamp keep the order you
passed them in.

| Field       | Meaning                                                               |
| ----------- | --------------------------------------------------------------------- |
| `actual`    | The value you measured                                                |
| `predicted` | The model's forecast for that moment, exactly as `predict` returns it |
| `residual`  | `actual - predicted`: positive when the model predicted too low       |

Each measurement is predicted from its own row, so it needs whatever the model needs to forecast
it: a `capacity` for growth with a ceiling, regressor values, and conditions for conditional
seasonalities. Rows are never matched by timestamp, so two measurements on the same date with
different regressor values each get their own prediction.

`residuals` never refits the model, and doesn't need a fitting backend. If a residual is too large
to represent, which only happens with values near the limits of a JavaScript number, it fails with
a `PredictionError` whose reason is `non-finite-forecast`.

## Measurements the model hasn't seen

Residuals on the history a model was fitted on are always a little flattering: the model has
already adjusted to those values. To see how it does on new data, hold some back:

<<< @/snippets/residuals-held-out.ts

```txt [Output]
training days: mean absolute residual 2.47
held-out days: mean absolute residual 2.64
```

`residuals` can't tell which measurements the model was trained on; that's up to you. For a
proper accuracy estimate over several periods, use
[cross-validation](./cross-validation).
