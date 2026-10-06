# Flat trends

If your data moves around a steady level, with no long-term growth or decline, use
`growth: "flat"`. The trend becomes a single constant, and all the movement comes from seasonal
patterns, events and regressors.

<<< @/snippets/flat-trend.ts

```txt [Output]
[ '40.1 (trend 40.1)', '49.5 (trend 40.1)', '51.8 (trend 40.1)' ]
```

::: tip Verified against Python Prophet
Flat trends match Python Prophet 1.4.0. The [flat growth benchmarks](/benchmarks/flat) show every
case side by side.
:::

## When to use it

- The data has no real trend, and you don't want the model to invent one from a few unusual
  weeks.
- You are forecasting far ahead and would rather assume "same as now" than extend a slope.
