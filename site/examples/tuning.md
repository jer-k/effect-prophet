# Choosing settings

The defaults work well for a lot of data, but you can often do better by trying a few settings
and keeping the one that forecasts best.

::: tip Benchmarked against Python Prophet
Settings search and the final holdout check are benchmarked on all three trend types. See
the [cross-validation and choosing settings benchmarks](/benchmarks/cross-validation).
:::

## Comparing settings

`searchModels` runs [cross-validation](./cross-validation) for each set of options you give it,
on exactly the same rounds, and picks the one with the lowest error.

<<< @/snippets/model-search.ts

```txt [Output]
stiff-trend 12.556
default-trend 3.459
flexible-trend 2.907
best: flexible-trend
```

This data has a sudden change in growth, so the most flexible trend wins. Good settings to try
first:

- `changepointPriorScale`: try `0.01`, `0.05`, `0.1`, `0.5`
- `seasonalityPriorScale`: try `0.01`, `0.1`, `1`, `10`
- `holidaysPriorScale`: try `0.01`, `0.1`, `1`, `10`, if you have events, country holidays or
  regressors
- `seasonalityMode`: `"additive"` or `"multiplicative"`

`seasonalityPriorScale` and `holidaysPriorScale` set the prior for every seasonality, or every
event, country holiday and regressor, that doesn't set its own `priorScale`. Lower values keep
those effects small. As in Python Prophet, regressors follow `holidaysPriorScale`, so give each
regressor its own `priorScale` if you want to tune holidays alone.

You can compare up to 32 candidates in one search (`maximumSearchCandidates`).

To pick the winner by a score of your own, pass a
[custom metric](./cross-validation#your-own-metrics) as `objective.metric`. The final holdout
check below needs a built-in metric.

## Trying every combination

Rather than writing out each candidate, give `makeParameterGrid` the options every candidate
shares and the values to try for each setting. It returns one candidate per combination, ready
for `searchModels`:

<<< @/snippets/parameter-grid.ts

```txt [Output]
grid-0-0 0.01 additive 7.236
grid-0-1 0.01 multiplicative 5.006
grid-1-0 0.1 additive 2.946
grid-1-1 0.1 multiplicative 1.822
grid-2-0 0.5 additive 2.773
grid-2-1 0.5 multiplicative 1.685
best: grid-2-1
```

These settings can be varied:

| Setting                 | Replaces                    | Example values                                                   |
| ----------------------- | --------------------------- | ---------------------------------------------------------------- |
| `changepointPriorScale` | `map.changepointPriorScale` | `[0.01, 0.1, 0.5]`                                               |
| `changepoints`          | `map.changepoints`          | `[{ mode: "auto", range: 0.8 }, { mode: "auto", range: 0.95 }]`  |
| `seasonalityPriorScale` | `seasonalityPriorScale`     | `[0.01, 0.1, 1, 10]`                                             |
| `holidaysPriorScale`    | `holidaysPriorScale`        | `[0.01, 0.1, 1, 10]`                                             |
| `seasonalityMode`       | `seasonalityMode`           | `["additive", "multiplicative"]`                                 |
| `holidaysMode`          | `holidaysMode`              | `["additive", "multiplicative"]`                                 |
| `builtInSeasonalities`  | `builtInSeasonalities`      | `[{ yearly: { mode: "on", priorScale: 1 } }, {}]`                |
| `seasonalities`         | `seasonalities`             | `[[], [{ name: "monthly", periodDays: 30.5, fourierOrder: 5 }]]` |
| `scaling`               | `scaling`                   | `["absmax", "minmax"]`                                           |

Each value replaces the base's setting outright. A list or object, such as a set of seasonalities,
counts as one value; it isn't combined any further. To try one seasonality's own prior scale
instead of `seasonalityPriorScale`, give each version of the whole `seasonalities` list as a value.

Candidates come out in the order of the table, with the first setting changing slowest, whatever
order you write the axes in. Each ID is `grid` followed by the position of its value in each
setting you gave: `grid-2-1` above is the third `changepointPriorScale` and the second
`seasonalityMode`. With no axes, the one candidate is the base, with the ID `grid`.

`makeParameterGrid` checks the whole grid before you start a search, and fails with an
`InputValidationError` whose `input` is `"parameter-grid"` when:

- the grid has more than 32 combinations (checked before any value is read),
- a setting has no values, or the same value twice, or isn't in the table,
- the base options are invalid (the issue's path starts with `base`),
- a combination is invalid. When the problem is in one value, the issue's path points at it,
  such as `["axes", "changepointPriorScale", 1]`. When it comes from how values combine, such as a
  seasonality named like a base regressor, the path points at the candidate:
  `["candidates", 3, "options", ...]`.

It fits nothing and needs no fitting backend.

## Comparing against simple rules

Before trusting a model, check that it beats the obvious guesses:

- **Last observation:** tomorrow will be the same as today.
- **Training mean:** tomorrow will be the average of everything so far.
- **Seasonal naive:** tomorrow will be the same as this day last week.

<<< @/snippets/baselines.ts

```txt [Output]
effect-prophet 2.06
last-observation 6.34
seasonal-naive 4.23
```

If a simple rule does about as well as the model, the model isn't adding much.

## A final, honest check

If you try many settings, the winner can look better than it really is, simply because it got
lucky on those particular rounds. To get an honest score, lock away the most recent data before
you start, choose settings using only the rest, then test the winner once on the locked-away
part.

<<< @/snippets/holdout.ts

`evaluateHoldout` fits the selected settings once on all the development data and scores them
on the held-out rows. The report is plain data, so you can save it with
`encodeEvaluationReport` and load it again with `decodeEvaluationReport`. Loading recomputes the
scores, so a report saved by an earlier version of Effect Prophet may be rejected with an
`EvaluationReportError`. Rerun the check after upgrading.
