# Seasonality

Seasonality is any pattern that repeats on a schedule: busier weekends, a summer peak, a spike at
the start of each month.

::: tip Verified against Python Prophet
Seasonal patterns match Python Prophet 1.4.0 on all three trend types. The
[seasonality, events and regressors benchmarks](/benchmarks/features) show every case side by side.
:::

## Built-in patterns

There are three built-in patterns. Each one switches on automatically once you have enough data
for it:

| Pattern  | Turns on when the history covers                   |
| -------- | -------------------------------------------------- |
| `daily`  | At least 2 days, with several rows per day         |
| `weekly` | At least 2 weeks, with rows less than a week apart |
| `yearly` | At least 2 years                                   |

You can override each one with `"off"`, or with `{ mode: "on" }` plus optional settings.

## Adding your own patterns

Add any repeating cycle you know about with `seasonalities`. Give it a `name`, a length in days
(`periodDays`) and a `fourierOrder`.

<<< @/snippets/seasonality.ts

```txt [Output]
monthly 7.83
weekly 6.51
```

::: tip What is `fourierOrder`?
It controls how detailed the pattern can be. Low values (3 to 5) give smooth, gentle curves.
Higher values (10 or more) can capture sharp shapes, like a spike on one specific day, but are
more likely to chase noise. The built-in defaults are 3 for weekly, 10 for yearly and 4 for
daily.
:::

Each pattern also accepts a `priorScale`, default `10`. Lower it to keep a pattern's effect small
unless the data strongly supports it.

## Effects that grow with the trend

By default, a pattern adds a fixed amount: "+20 on Saturdays". If the swings grow as your data
grows, use `seasonalityMode: "multiplicative"` so the pattern acts as a percentage instead:
"+15% on Saturdays".

<<< @/snippets/multiplicative.ts

```txt [Output]
weekly 19.5% 66.7
```

You can also set `mode` on a single pattern, event or regressor to mix the two kinds in one
model.

## Patterns that switch on and off

Sometimes a pattern only exists part of the time. A campus coffee shop has a weekly rhythm during
the school year, but not in summer. Give the pattern a `conditionName`, and put a matching
true/false value in `conditions` on every row, past and future.

<<< @/snippets/conditional-seasonality.ts
