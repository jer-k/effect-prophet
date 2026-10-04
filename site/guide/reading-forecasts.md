# Reading a forecast

`predict` returns one forecast for each row you asked about. Each forecast contains:

| Field            | Meaning                                                                     |
| ---------------- | --------------------------------------------------------------------------- |
| `timestamp`      | The date as a number of milliseconds. Use `new Date(timestamp)` to read it. |
| `value`          | The forecast itself                                                         |
| `trend`          | The long-term trend's share of the value                                    |
| `seasonalities`  | One entry per seasonal pattern, such as `weekly` or `yearly`                |
| `events`         | One entry per holiday or event                                              |
| `regressors`     | One entry per extra factor                                                  |
| `additive`       | All additive pieces added up                                                |
| `multiplicative` | All multiplicative pieces added up, as a fraction (0.1 means +10%)          |

## Example

<<< @/snippets/reading-forecast.ts

```txt [Output]
date: 2025-04-01T00:00:00.000Z
forecast: 137.18
trend: 145.00
weekly: -7.82
```

On this day the trend alone predicts 145. Tuesday is a quiet day of the week, so the weekly
pattern takes away 7.82, leaving a forecast of 137.18.

## Additive and multiplicative pieces

Most pieces are **additive**: they add or subtract a fixed amount, like "+20 sales on Saturdays".
Their entries have a `value`.

A piece can also be **multiplicative**: it changes the value by a percentage, like "+15% on
Saturdays". Their entries have a `factor` (0.15 means +15%) and a `contribution`, which is the
same effect converted into your data's units. See
[Seasonality](../examples/seasonality#effects-that-grow-with-the-trend).

The pieces always add back up:

```txt
value = trend × (1 + multiplicative) + additive
```
