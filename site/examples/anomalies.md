# Finding anomalies

Is today's number unusual? Fit a model on earlier data, then ask `detectAnomalies` how new
measurements compare with the range the model expected for them. Values outside the range are
anomalies. To look back over data you already have instead, see
[Looking back over a history](#looking-back-over-a-history).

<<< @/snippets/anomalies.ts

```txt [Output]
2025-04-01 138.8  (99% range 129.7 to 144.0) within
2025-04-02 148.5  (99% range 137.8 to 151.5) within
2025-04-03 117.6  (99% range 146.1 to 159.6) below
2025-04-04 160.2  (99% range 147.9 to 162.0) within
2025-04-05 154.8  (99% range 142.8 to 158.0) within
2025-04-06 175.5  (99% range 135.6 to 149.7) above
2025-04-07 139.0  (99% range 131.2 to 145.2) within
2 of 7 days outside the range
```

The model is never refitted, so the measurements you check can't pull the baseline toward
themselves. That makes this the right tool for monitoring: train on last quarter, check this week.

## What you get back

`rows` has one entry per measurement, sorted by date. Measurements with the same timestamp keep
the order you passed them in. `anomalies` holds just the rows outside their range.

| Field       | Meaning                                                                    |
| ----------- | -------------------------------------------------------------------------- |
| `actual`    | The value you measured                                                     |
| `predicted` | The model's forecast for that moment, exactly as `predict` returns it      |
| `lower`     | Bottom of the range                                                        |
| `upper`     | Top of the range                                                           |
| `position`  | `"below"`, `"within"` or `"above"`. A value exactly on a bound is `within` |

Each measurement needs whatever the model needs to forecast it: a `capacity` for growth with a
ceiling, regressor values, and conditions for conditional seasonalities. They use the same
format as your history, so you can pass rows straight from the same source.

## Options

`detectAnomalies` and `anomalies` take the same options as [uncertainty ranges](./uncertainty),
except that the range defaults to 99% wide:

| Option          | Default  | Meaning                                                         |
| --------------- | -------- | --------------------------------------------------------------- |
| `seed`          | required | Any whole number. The same seed always gives the same ranges.   |
| `samples`       | `1000`   | How many futures to simulate (up to 2,048)                      |
| `intervalWidth` | `0.99`   | How wide the range is. A narrower range flags more measurements |

`output: "samples"` is rejected with an `InputValidationError`. One call takes up to 10,000
measurements; past that, or past the forecast-length limit, it fails with a `PredictionError`
whose reason is `simulation-limit`.

## Looking back over a history

`anomalies` fits a model to a history, checks that same history against it, and returns the
timestamps outside their range:

<<< @/snippets/anomalies-in-sample.ts

```txt [Output]
2025-02-10
2025-03-12
```

Timestamps are epoch milliseconds, in date order. Each flagged row adds its timestamp once, so if
two rows share a timestamp and both are outside, it appears twice. Model options go in an
optional third argument, exactly as `fit` takes them:

```ts
anomalies(history, { seed: 42, intervalWidth: 0.95 }, { growth: "logistic" });
```

The whole history is simulated in one call, so `anomalies` takes up to 10,000 rows. A longer
history fails with a `PredictionError` whose reason is `simulation-limit`, before anything is
fitted. To check one anyway, fit it with `fit` and pass it to `detectAnomalies` in batches of up
to 10,000 rows.

### Which one to use

|                         | `detectAnomalies`                    | `anomalies`                      |
| ----------------------- | ------------------------------------ | -------------------------------- |
| Model                   | One you fitted earlier               | Fitted from the history you pass |
| Checks                  | Any measurements, usually later ones | The history it was fitted on     |
| Returns                 | Every row, with its range            | Timestamps of the flagged rows   |
| Needs a fitting backend | No                                   | Yes                              |

Use `detectAnomalies` for monitoring, where today is judged against what came before. Use
`anomalies` for a quick look back over a history, for example to find days to clean up before
fitting a forecast.

## Things to know

- **With `anomalies`, outliers can hide themselves.** The flagged days also shape the model. A
  large outlier pulls the trend toward itself and widens every range, so smaller outliers can go
  unflagged. Two big outliers in an otherwise quiet history can widen the ranges so much that even
  a 50% range flags nothing else. If a day matters, judge it with `detectAnomalies` against a
  model fitted without it.
- **A 99% range doesn't mean 1% false alarms.** The ranges come from simulated trend changes
  and noise, and don't account for uncertainty in the seasonal patterns. A model that fits its
  history too closely gives narrow ranges and flags ordinary values. Check a few weeks of known
  normal data before alerting on the results.
- **You decide what the model has seen.** `detectAnomalies` can't tell whether a measurement was
  part of the training data. If it was, the model has already partly adjusted to it.
- **No scores or probabilities.** Each measurement is inside or outside its range. How far
  outside is `actual` minus `upper` (or `lower` minus `actual`), in your data's own units.
  `anomalies` returns only timestamps; use `detectAnomalies` to see the ranges.
