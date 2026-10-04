# Flat trends

If your data moves around a steady level, with no long-term growth or decline, use
`growth: "flat"`. The trend becomes a single constant, and all the movement comes from seasonal
patterns, events and regressors.

<<< @/snippets/flat-trend.ts

```txt [Output]
[ '40.1 (trend 40.1)', '49.5 (trend 40.1)', '51.8 (trend 40.1)' ]
```

## When to use it

- The data has no real trend, and you don't want the model to invent one from a few unusual
  weeks.
- You are forecasting far ahead and would rather assume "same as now" than extend a slope.

::: warning Current limitation
With a flat trend, events, regressors and switchable patterns only work if the model also has at
least one multiplicative piece. Otherwise `fit` fails with an `UnsupportedConfigurationError`.
:::
