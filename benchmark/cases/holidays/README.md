# Country-calendar benchmark contract

[`country-calendars.ts`](country-calendars.ts) declares 25 new country/control cases through the
existing public-API harness. Declarations are coverage, not release evidence. The snapshot/provider
identity is frozen into each run's `cases.json`; its manifest, coverage inventory and compiled
catalog are hashed with the gate sources. Python uses real `add_country_holidays` with Prophet
1.4.0 and `holidays` 0.104, never Effect's generated calendars as its oracle.

## Frozen groups

- US plus custom January events: all three trends and both holiday modes, with six exactly
  corresponding explicit-event controls. Simultaneous custom/country dates remain separate effects.
- A 2010 history and sparse 2021/2060 forecasts: observed New Year's Day spillovers and unseen
  Juneteenth names. These are point forecasts, not a simulation-budget exception.
- Singapore's 2024-to-2028 estimated-name transition; deliberately empty Bouvet Island and its
  no-calendar control; India's 2036/2037 partial output with explicit `allow-known-gaps`.
- US country/custom events with conditional weekly seasonality and a regressor; seeded scalar
  uncertainty through the existing uncertainty owner and evidence class.
- Sweden's occurrence-heavy and China's name-rich calendars: 730/2,190 daily training rows and
  512-row prediction batches, plus Sweden's identical long history with 32 future rows.

The eight `v5` datasets and one `v6` smaller-batch dataset have immutable bytes and checksum
manifests. Observations are analytic, seedless signals with bounded noise, not synthesized from
Effect or Python fitted coefficients. Country fixtures separately establish pinned Prophet parity.

```sh
npm run benchmark:setup -- v5
npm run benchmark:setup -- v6
npm run benchmark:catalog
npm run benchmark -- --case country-us-linear-additive --case country-explicit-us-linear-additive
```

The original explicit-event quantity tolerances are reused unchanged. Linear/logistic cases retain
the established default optimizers and output-first policy. Flat cases do not invent optimizer
controls. Failed cases remain visible and receive no accepted timing.

## Correctness and work boundaries

Before timing, both adapters check represented training years, ordered frozen holiday columns,
binary training/prediction activations, exact names and priors, ignored future names, grouped
effects, reconstructed forecasts, JSON round trips and fresh-process restoration. Effect's
untimed semantic indicators are checked against actual public grouped forecasts; Python's
indicators come from actual Prophet holiday features. No private feature kernel is timed.

Country fitting must await real filesystem lookup, integrity checking, decoding and copying.
The clock includes asynchronous completion. No snapshot is cached or secretly preloaded into
measured fits. Warm and restored prediction use embedded country data; model JSON includes the
complete compact selected-country horizon. Explicit controls include future dates only for names
already in their training-year layout, and use identical priors and modes.

The existing cold/public lifecycle phases are reused. Reports retain raw repetitions, medians,
p90, extrema/counts, worker RSS high-water and UTF-8 serialized-model byte counts. RSS includes
imports and prior operations, excludes Python CmdStan children, and is not per-call allocation
or a process-tree peak. The bounded Node worker protocol permits up to 64 MiB because name-rich
correctness records exceed Node's default 1 MiB buffer; this changes transport capacity, not
numerical tolerances or feature budgets.

[`coverage-policy.json`](coverage-policy.json) declares reviewed-gap and outer-horizon rejections
as intentional semantic differences, exercised by Effect and real pinned-Python tests. They are
not ordinary cross-language timing workloads. Nonempty opt-in partial output does not establish
complete or officially confirmed holiday coverage.

## Release gate

Local native dirty-tree diagnostics are not retained release baselines. After review and a clean
implementation commit, run the complete linear, flat and logistic suites sequentially, review
regressions and package/model sizes, retain through the established commands, and regenerate the
results/site pages. Replaying an older baseline does not cover newly declared country cases.
See [retention and baseline refresh](../../README.md#refresh-release-baselines).
