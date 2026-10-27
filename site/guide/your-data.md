# Preparing your data

## The history

Your history is an array of rows. Each row needs:

| Field       | Type   | Notes                                                        |
| ----------- | ------ | ------------------------------------------------------------ |
| `timestamp` | string | UTC, in the exact form `2025-01-31T00:00:00.000Z`            |
| `value`     | number | Any finite number. `NaN`, `Infinity` and `null` are refused. |

```ts
const history = [
  { timestamp: "2025-01-01T00:00:00.000Z", value: 120 },
  { timestamp: "2025-01-02T00:00:00.000Z", value: 135 },
  { timestamp: "2025-01-03T00:00:00.000Z", value: 128 },
];
```

Some features need extra fields on every row:

| Field        | Used for                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `capacity`   | [Growth with a ceiling](../examples/saturating-growth)                                          |
| `floor`      | [Growth with a ceiling](../examples/saturating-growth)                                          |
| `regressors` | [Extra factors](../examples/regressors)                                                         |
| `conditions` | [Seasonality that switches on and off](../examples/seasonality#patterns-that-switch-on-and-off) |

## Timestamps

Timestamps must be strings exactly like the ones `Date.prototype.toISOString()` produces. The
easiest way to get them right is to build them with `Date`:

```ts
new Date(Date.UTC(2025, 0, 31)).toISOString(); // "2025-01-31T00:00:00.000Z"
```

Strings like `"2025-01-31"` or `"2025-01-31T00:00:00+02:00"` are refused rather than guessed at.
That keeps time zones from silently shifting your data by a day.

::: tip Dates in your own time zone
For daily data, use midnight UTC for each calendar day, whatever your local time zone is. What
matters is that every row uses the same rule.
:::

## Missing values

Leave out rows that have no value. Don't pass `null`, `NaN` or `0`:

```ts
const history = rawRows
  .filter((row) => row.sales !== null)
  .map((row) => ({ timestamp: row.date, value: row.sales }));
```

The model handles gaps in the dates without any trouble.

If rows carry extra columns such as regressors, drop the whole row, not just the value. This
example removes a row with no target, holds out the last two rows, and predicts them using
their known regressor values:

<<< @/snippets/missing-values.ts

## Order and duplicates

Rows can be in any order, because the model sorts them. Two rows with the same timestamp are both
kept and treated as two separate measurements.

## How much history?

- At least two rows are required, but a useful forecast needs much more.
- Weekly patterns are detected automatically once you have **two weeks** of data.
- Yearly patterns are detected automatically once you have **two years** of data.

## Future rows

To forecast, pass the timestamps you want:

```ts
predict(model, ["2025-02-01T00:00:00.000Z", "2025-02-02T00:00:00.000Z"]);
```

`makeFutureTimestamps` lists them for you, like Python's `make_future_dataframe`. It starts after
the latest timestamp in a history, or after a timestamp you give it:

```ts
makeFutureTimestamps(history, { periods: 14 }); // the history's dates, then the next 14 days
makeFutureTimestamps(history, { periods: 14, includeHistory: false }); // only the next 14 days
makeFutureTimestamps(history, { periods: 24, frequency: "h", includeHistory: false }); // 24 hours
makeFutureTimestamps("2025-01-15T00:00:00.000Z", { periods: 6, frequency: "ME" }); // month ends
```

As in Python, a history's own timestamps come first by default, each once and in order, so one
`predict` call also shows how the model fits the past. Pass `includeHistory: false` for only the
future dates. A single timestamp has no history, so it gives only future dates.

`frequency` takes pandas' names and defaults to `"D"`:

| `frequency`            | Dates                                                    |
| ---------------------- | -------------------------------------------------------- |
| `h`, `D`               | Every hour or every day after the last timestamp         |
| `W`, `W-MON` … `W-SAT` | Every Sunday (`W` is `W-SUN`), or every Monday, Tuesday… |
| `MS`                   | The first day of each following month                    |
| `ME`                   | The last day of each month, including February 29        |

As in pandas, every date keeps the last timestamp's UTC time of day, and none is on or before it.
Dates are always UTC, so a schedule never shifts for daylight saving time. `periods` can be at
most 100,000 (`maximumFuturePeriods`).

If your model uses `capacity`, `floor`, `regressors` or `conditions`, pass full rows instead,
because the model needs those values for the future too:

```ts
predict(model, [{ timestamp: "2025-02-01T00:00:00.000Z", regressors: { temperature: 21 } }]);
```

Forecasts come back in the same order as the rows you passed.
