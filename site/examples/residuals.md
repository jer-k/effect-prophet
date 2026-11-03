---
description: "Check a fitted model with residuals, and check whether the L-BFGS optimizer stopped before the best fit."
---

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

## Did the optimizer finish?

For histories of 100 rows or more, `fit` uses the L-BFGS optimizer, as Python Prophet does. On
some histories, often ones with outliers or growth that changes sharply, it stops before it
reaches the best fit. Python Prophet 1.4.0 stops short on the same histories, by about as much,
but not at exactly the same point, so the two libraries agree less closely there.

To check a fit, take one Newton step from where it stopped:

<<< @/snippets/optimizer-check.ts

```txt [Output]
stopped by:      relative-gradient
one step gains:  0.418
Newton gains:    0.713
```

- `fitSummary.objective` measures how badly the model fits its history and priors: lower is
  better. Compare it only between models fitted to the same history with the same settings.
- A gain above `0.01` means L-BFGS stopped early. In our tests, every fit that stopped more than
  1 short of the best gained more than `0.02` from one step. Fits that finished usually gained
  less than `0.0001`, though a few that stopped within `0.1` of the best gained up to `0.03`.
  Finishing the fit with Newton from the same `warmStart`, as above, came within `0.2` of the best
  fit every time.
- `fitSummary.termination` can't tell you this. Fits that stop early end with the same reasons,
  usually `relative-gradient`, as fits that finish. Tighter L-BFGS tolerances in
  `map.optimizer.lbfgs` rarely help: the optimizer is creeping along, not giving up too soon.
- Stopping early rarely matters much for fits from scratch. In our tests it left the objective up
  to 22 short, which moved fitted values by at most a tenth of the history's standard deviation,
  and usually by less than 4%. A warm start after many new rows can do far worse; see
  [Updating a model with new data](./saving-models#updating-a-model-with-new-data).
- The check costs one Newton step: 1 to 50 milliseconds on our histories of up to six years of
  daily data. Newton itself is much slower than L-BFGS: finishing a fit, or fitting from scratch
  with Newton, took 2 to more than 100 times as long as the L-BFGS fit. Check first, and finish
  only the fits that need it. Newton is also subject to [a memory limit](../python/differences)
  on very large models.
- `fit` keeps L-BFGS and its tolerances by default so that results match Python Prophet's.
