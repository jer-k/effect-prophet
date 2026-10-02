# Linear-growth cases

Canonical shared Python/TypeScript benchmark declarations: [`public-api.json`](public-api.json) and [`edge-cases.ts`](edge-cases.ts).

| Case                                   | Scenario                                                         | Evidence               |
| -------------------------------------- | ---------------------------------------------------------------- | ---------------------- |
| `fixed-linear-prediction-medium`       | Predict from the same stored straight-line equation              | `equivalent-equation`  |
| `map-explicit-break-small`             | Linear MAP with an explicit trend break                          | `equivalent-objective` |
| `map-seasonal-breaks-irregular-medium` | Linear MAP, weekly seasonality, explicit breaks, irregular dates | `equivalent-objective` |
| `map-events-small`                     | Event windows and future event occurrences                       | `equivalent-objective` |
| `map-regressors-medium`                | Standardized and unstandardized regressors                       | `equivalent-objective` |
| `map-conditional-seasonalities-medium` | Seasonal features gated by boolean conditions                    | `equivalent-objective` |
| `map-mixed-features-explicit-small`    | Combined seasonality, event, regressor and explicit break        | `equivalent-objective` |
| `map-mixed-features-automatic-large`   | Combined features with automatic changepoints                    | `equivalent-objective` |

These are correctness-gated performance cases. They compare equivalent equations or objectives before recording timings.

## Not represented by a timing case

- Featureless default fit: Python Prophet uses MAP; effect-prophet currently uses OLS. These are different fitting objectives and must not be reported as a matched-fit timing comparison.
- Python's built-in-seasonality defaults versus effect-prophet's defaults: current timed cases turn built-ins off on both sides.
- Remaining input-policy differences: missing targets and timestamp parsing. Training sorting and duplicate retention are covered by the edge cases below.
- No-changepoint fit is not a dedicated timing scenario here. Stan-aligned linear fitting now uses Prophet's private dummy delta and retains pre-fold diagnostics; see the [alignment plan](../../../docs/decisions/linear-map-stan-alignment-plan.md).

Only promote scenarios to accepted timings when comparable work passes correctness gates.

## Migration edge cases (EP-096)

`edge-cases.ts` adds unsorted unique histories with explicit/automatic points, four observations per date with differing targets, duplicate rows with differing regressors and condition masks, repeated generated candidates through uncertainty/save-reload, duplicate-aware rolling evaluation/baselines/search/holdout/report persistence, and featureless zero-span linear/flat histories with varied/constant targets.

Every adapter receives the same complete source rows. The dataset parser does not sort or deduplicate them. Temporal evaluation partitions are application-owned and stably sorted before splitting, with entire timestamp groups kept on one side. The numerical gate compares trend, named components, forecasts, noise and persistence; rejected fits, NaN forecasts and mismatches remain failures with no accepted timings. Zero-span linear cases intentionally probe failure behavior, not a claim that two invalid fitting domains yield equivalent usable models. Baseline tie rules are explicit application policies: all-row mean and stable-last last-observation/exact-lag values; Python has no corresponding baseline API.

Run the edge comparison set using the IDs exported by `edge-cases.ts`, for example:

```sh
npm run benchmark -- --case map-training-duplicates-auto --case map-training-duplicate-features-auto --case evaluation-training-duplicates
```

## Recorded outcomes

The [original native migration run](../../results/baselines/linear-growth-training-rows-native-arm64/README.md) covers 13 cases: nine pass, two zero-span linear diagnostics yield no usable fit, and two ordered/unsorted automatic-MAP controls expose the former coordinate-optimizer exhaustion. That evidence is unchanged.

`stan-aligned.ts` supplies the current `-stan-v2` counterparts with the same datasets, priors, forecast bounds and 10,000-step per-attempt budgets. The [approved fit-quality policy](../../../docs/decisions/linear-map-benchmark-acceptance.md) uses evidence `linear-stan-map-fit-quality-v3`: objective/noise and all other quantity/lifecycle gates remain required; stationarity is finite, nonnegative and explicitly diagnostic-only under EP-097.

The [native-arm64 closeout](../../results/baselines/linear-map-stan-fit-quality-native-arm64/README.md) runs all 13 edge cases plus original feature, large automatic, scaling and mixed workloads: 22 of 24 cases pass; two zero-span linear comparisons retain failures and no timing. Historical stationarity-equality failures remain preserved separately. The new result is local dirty-tree, correctness-qualified evidence, not near-stationarity certification or universal compatibility.

The recorded quantities and per-case tolerances bound this evidence. They do not guarantee identical optimizer coefficients, uncertainty draws, or forecasts on every production history; featureless default OLS versus Python default MAP remains a documented migration difference.
