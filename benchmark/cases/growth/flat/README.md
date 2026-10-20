# Flat growth cases

Flat growth means a constant **trend**, not a constant forecast: seasonalities, events and
regressors still move the forecast. Effect's flat options have no changepoint settings, so the
Python adapter leaves Prophet's default changepoint grid and prior in place: both Stan states keep
those prior-only coordinates. Cases without `effectOptimizer` use both libraries' default optimizer
policy (Newton below 100 rows, otherwise L-BFGS with a Newton fallback).

| File                                     | Cases                                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `../defaults.ts`                         | `fit(history, { growth: "flat" })` against `Prophet(growth="flat").fit(df)`, nothing else set                      |
| `public-api.ts`                          | Noisy, constant and negative levels; weekly patterns; mixed models at full length and as cross-validation prefixes |
| `../mixed-map.ts`                        | The original mixed-component flat models                                                                           |
| `../linear/edge-cases.ts`                | Zero-span probes: every row on one timestamp                                                                       |
| `../../uncertainty`, `../../diagnostics` | Uncertainty and cross-validation cases built from the mixed models                                                 |

Additive-only flat requests with events, regressors or switchable seasonalities are rejected, so
every feature case includes a multiplicative component.

Python Prophet's cross-validation drops the parent model's scaling for each fold. Effect's
cross-validation defaults to absmax independently, with an explicit minmax override.

The docs site renders the retained `flat-growth` baseline at `/benchmarks/flat`.
