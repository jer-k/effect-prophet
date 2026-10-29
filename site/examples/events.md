# Holidays and events

Some days don't follow the usual pattern: holidays, sales, launches, outages. List them as
**events**, and the model learns how much each one moves your data.

::: tip Verified against Python Prophet
Events match Python Prophet 1.4.0 on all three trend types. The
[seasonality, events and regressors benchmarks](/benchmarks/features) show every case side by side.
:::

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
- **`priorScale`** limits how large an event's effect can be. Lower it if an event has only a few
  past occurrences. It defaults to the model's `holidaysPriorScale`, which defaults to `10`.
- Set `holidaysMode: "multiplicative"` if event effects should be percentages instead of fixed
  amounts.

## Country holidays

Add `countryHolidays: { country: "US" }` to fitting options to supplement custom events with
an offline country calendar. It works with linear, flat and logistic growth and uses `holidaysMode`.
Country dates have zero-day windows and a default prior of 10. Shared country/custom names must
use the same prior.

Fitting freezes the represented training years' feature layout; future predictions and uncertainty
use the selected country's embedded snapshot without changing columns. Saved models retain that
snapshot, so installing updated calendars never silently changes restored predictions.

Use `inspectCountryHolidays` to inspect known limitations before fitting. Known gaps are rejected
by default; `coverage: "allow-known-gaps"` explicitly accepts the provider's partial/empty result,
not a completeness promise. See [Country holiday calendars](/guide/holiday-calendars)
for the runnable example, pinned provider versions and 1995–2060 outer horizon.
