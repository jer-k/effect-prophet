# Choosing settings

The defaults work well for a lot of data, but you can often do better by trying a few settings
and keeping the one that forecasts best.

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
- `seasonalityMode`: `"additive"` or `"multiplicative"`
- `priorScale` on each seasonality: try `0.1`, `1`, `10`

You can compare up to 32 candidates in one search.

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
`encodeEvaluationReport` and load it again with `decodeEvaluationReport`.
