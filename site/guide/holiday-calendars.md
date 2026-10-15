# Country holiday calendars

Country calendars can help a forecast account for recurring holidays. They are not a guarantee
that every holiday date is known, especially far into the future.

::: warning Coverage is not a completeness guarantee
Use `countryHolidays` to add one offline country calendar to any trend type, alongside optional
[custom events](/examples/events). Known missing/provider-limited coverage is rejected by default.
Neither the default nor an explicit opt-in guarantees officially complete or confirmed future dates.
:::

## Inspect, fit and restore a calendar

<<< @/snippets/country-holidays.ts

Inspection uses packaged files, with no Python, network access, or additional Effect services.
Years are deduplicated and sorted. Occurrences preserve exact provider names, zero-day windows,
and a default prior of 10; `priorScale` accepts a positive finite override. Results include the
canonical country, snapshot/provider identities, outer horizon, and machine-readable coverage
issues. Inspection does not fit a model or claim that coverage is officially complete.

Known missing/provider-limited coverage fails by default with `CountryHolidayError` and reason
`known-coverage-restriction`. Explicit `coverage: "allow-known-gaps"` returns the provider's actual
partial or empty result **and retains its issues**. Estimates and deliberately empty calendars are
advisory, not automatically treated as missing tables. Neither policy permits years outside
1995–2060. Unknown codes, malformed selections, out-of-range years, and missing/corrupt packaged
data are typed failures. Codes are case-sensitive registered codes/aliases, not arbitrary Python
class names; names such as `UnitedStates` and silently normalized inputs are rejected.

## Model behavior

`countryHolidays: { country: "US" }` selects country-level provider defaults. Registered aliases
such as `USA`, `UK` and `TU` resolve to canonical codes. Optional `priorScale` defaults to 10;
`coverage` defaults to `"reject-known-gaps"`. Country occurrences have zero-day windows and use
`holidaysMode` (which defaults to `seasonalityMode`). Custom events retain their own priors/windows;
a shared name must have one consistent prior. Names must remain distinct from seasonalities,
conditions and regressors.

Fitting resolves full calendar years represented by training observations—not only observed days
and not all 66 snapshot years. A holiday column may therefore be all-zero in training. Prediction
and uncertainty resolve their requested years against the **embedded selected-country snapshot**,
with the same coverage policy. New future holiday names absent from training are ignored, while
trained names absent in a future year keep their all-zero columns. Exact observed/estimated suffixes
identify distinct effects.

The fitted model retains selection, custom-event provenance, training years/issues and the complete
compact selected-country payload. `encodeFittedModel` / `decodeFittedModel` need no calendar lookup;
restored forecasts never replace embedded data with the installed package's newer snapshot. Refit
to adopt an update. Each cross-validation fold resolves its own training years; model search and
final holdout fitting preserve the selection/policy.

Empty predictions remain successful without calendar resolution. Only fitting and inspection read
bundled calendar files; restored prediction requires neither those files, Python nor network
access.

## Errors

Every calendar failure, from `inspectCountryHolidays`, `decodeOptions`, `fit`, `predict` or
`predictUncertainty`, is a `CountryHolidayError`. Branch on its `reason`:

| `reason`                       | When                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `unknown-country`              | The code or alias is not registered (codes are case-sensitive)                   |
| `invalid-selection`            | The selection or requested years are malformed, e.g. a non-positive `priorScale` |
| `outside-snapshot-horizon`     | A training or prediction year falls outside 1995–2060                            |
| `known-coverage-restriction`   | A year has reviewed missing coverage and `coverage` is `"reject-known-gaps"`     |
| `snapshot-unavailable`         | The packaged calendar file can't be read                                         |
| `corrupt-snapshot`             | The packaged calendar file fails its integrity or content checks                 |
| `unsupported-snapshot-version` | The packaged calendar file uses an unknown format version                        |
| `conflicting-event-prior`      | A custom event shares a country holiday's name but not its prior scale           |
| `conflicting-feature-name`     | A country holiday name matches a seasonality, condition or regressor name        |
| `event-column-limit`           | Country holidays and custom events together exceed the event column limit        |

`coverageIssues` lists the reviewed limitations behind a `known-coverage-restriction`, and
`issues` points at the offending field. A conflicting prior can surface at prediction time too:
a name trained only as a custom event may first appear as a country holiday in a later year.
Cross-validation reports a fold's calendar failure as an `EvaluationError` whose `cause` is the
`CountryHolidayError`. Model search fails with `EvaluationSearchError` reason `invalid-candidate`,
naming the candidate, when a candidate's selection is invalid.

## Why both past and future dates matter

The model learns a holiday's effect from historical observations. Future holiday dates tell it
when to apply that learned effect. For example, past Christmas sales can teach the model a
Christmas effect; listing the next Christmas lets the forecast apply it again.

For custom events, list the relevant dates in **both the training period and forecast period**.
Use the same name for repeats. Dates do not repeat automatically, and a holiday without historical
observations has little evidence from which to learn an effect.

## The versioned snapshot

The packaged data is a versioned **1995–2060 inclusive** country-level snapshot generated using
**Python Prophet 1.4.0 and `holidays` 0.104**, pinned to the project's reference environment.
Python Prophet uses the same [`holidays` provider](https://github.com/vacanza/holidays/tree/v0.104).

The generation follows Prophet's defaults:

- Country-level calendars, **without a state, province, or other subdivision**.
- The provider's default holiday categories and observed-day behavior.
- `en_US` names, falling back to the provider's original language where necessary.
- Original holiday names and all returned dates, including overlapping holidays.

The snapshot contains 250 canonical country calendars. **245 return at least one date in every
year from 2026 through 2060. That does not mean 245 complete calendars.** A calendar can continue
returning some dates while silently omitting other holidays.

The range is an outer data horizon, not a promise of uniform coverage. The findings below apply
specifically to `holidays` 0.104; a provider update may change dates, names, and limitations.

## Known coverage gaps

| Calendar                                                                                     | Limitation in the researched provider version                                                                                                                                           |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sri Lanka (`LK`)                                                                             | The provider stops at **2026**. It returns no dates from 2027 onward because Poya calendars require annual approval.                                                                    |
| India (`IN`)                                                                                 | Many Hindu date tables stop at **2035**. Holi, India-specific Diwali, Dussehra, and other holidays disappear afterward, while other dates continue.                                     |
| Nepal (`NP`)                                                                                 | Several local tables stop in **2032/2033**, and many Hindu tables stop in **2035**. The calendar becomes substantially incomplete without an availability warning.                      |
| Bhutan, Fiji, Guyana, Mauritius, Suriname (`BT`, `FJ`, `GY`, `MU`, `SR`)                     | Some holidays depend on the same Hindu tables ending in **2035**. The affected holidays differ by country.                                                                              |
| Indonesia (`ID`)                                                                             | Nyepi / Day of Silence is table-backed only through **2050** and is absent afterward. Other holidays continue.                                                                          |
| Ukraine (`UA`)                                                                               | The default public-holiday calendar carries martial-law suspension forward and returns no future dates. This is provider policy, not proof that there will be no holidays through 2060. |
| Bouvet Island, Heard and McDonald Islands, British Indian Ocean Territory (`BV`, `HM`, `IO`) | These recognized country codes return empty calendars throughout the requested range.                                                                                                   |

Historical restrictions matter too: India has Hindu table gaps before 2001, and 41 providers
start after 1995 (including Spain in 2008 and Guinea-Bissau in 2023). Inspection retains those
source-backed restrictions. Provider bounds describe implementation coverage, not when a country
or its legal holidays began to exist.

::: warning Warnings do not identify every gap
Only India emitted an availability warning in this experiment. Neither a nonempty calendar nor
an absence of warnings proves that all holidays are present. The provider's declared year bounds
also do not guarantee that every underlying date table covers those years.
:::

US, UK, Germany, Canada, and Japan generated dates throughout 2026–2060 without provider warnings.
That checks rule generation, not the completeness of every statutory or regional holiday.
The research is not an exhaustive country-by-country accuracy audit.

## Future dates can change

Some dates can be calculated from recurring rules. Others depend on government announcements,
special proclamations, or local calendar decisions. Generating a date for 2060 does not make it
an officially confirmed holiday.

Examples documented by the provider:

- **China:** official holiday arrangements need annual checks.
- **Thailand:** some holidays and arrangements are announced annually.
- **Singapore:** the provider documents estimated moving holidays from 2028 onward.

Even a complete calendar under today's rules cannot anticipate future changes in legislation.
Check important dates against the relevant government or local authority, and refresh calendars
when announcements change.

## Names affect the model

Event names identify learned effects. Renaming a holiday can therefore change which effect is
used, even when the date is unchanged.

For example, Turkey's Eid dates continue beyond the provider's confirmed range ending in 2032,
but their names gain an `(estimated)` suffix. A disappearing name is not necessarily a missing
date. Likewise, an observed-day name may disappear for several years while the base holiday
continues.

When supplying custom events, use consistent names for occurrences that should share an effect.
When comparing with Python Prophet, preserve the provider's names rather than silently stripping
suffixes or merging distinct holidays.

## Choosing dates for your forecast

- Check **which holidays are included**, not just whether each year has dates.
- Check whether your data needs **regional holidays** or different holiday categories.
- Distinguish **missing data**, **estimated dates**, and a **deliberately empty calendar**.
- Supply verified [custom events](/examples/events) where the provider is incomplete or where your
  business follows a different calendar. Include relevant past and future occurrences.
- Keep the calendar version and assumptions with your forecasting inputs so updates are deliberate.

For the reproducible generator, measurements, and source-review details, see the
[country-calendar experiment](https://github.com/jer-k/effect-prophet/blob/main/tools/prophet/README.md#country-calendar-size-experiment-69).
