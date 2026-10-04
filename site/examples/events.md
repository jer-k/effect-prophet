# Holidays and events

Some days don't follow the usual pattern: holidays, sales, launches, outages. List them as
**events**, and the model learns how much each one moves your data.

<<< @/snippets/events.ts

```txt [Output]
2024-12-12 673 0
2024-12-13 974 300
```

The model learned that a flash sale adds about 300, and applied it to the upcoming sale on
December 13.

## Things to know

- **List every date, past and future.** The model learns from past dates and only applies the
  effect to future dates you list. Nothing is assumed to repeat on its own.
- **Use the same `name` for repeats.** All occurrences with the same name share one learned
  effect.
- **Dates are calendar days** in `YYYY-MM-DD` form.
- **Windows:** `lowerWindowDays: -2` also covers the two days before, and `upperWindowDays: 1`
  also covers the day after. Each day in the window gets its own learned effect.
- **`priorScale`** (default `10`) limits how large an event's effect can be. Lower it if an event
  has only a few past occurrences.
- Set `holidaysMode: "multiplicative"` if event effects should be percentages instead of fixed
  amounts.

## Country holidays

Built-in country holiday calendars, like Python Prophet's `add_country_holidays`, are not
available yet. For now, list the holidays you care about as events.
