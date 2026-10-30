# Effect Prophet benchmark — 2026-10-29T230816-711Z-c8e0ac69

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence fixed-linear-equation-v1. |
| map-explicit-break-small | equivalent-objective | passed | 1.018e-11 | 0.000e+0 | 0.000e+0 | 1.018e-11 | 4.041e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 6.301e-5 | 1.686e-5 | 1.686e-5 | 6.877e-5 | 1.344e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-explicit-small | equivalent-objective | passed | 7.887e-13 | 1.212e-12 | 1.281e-12 | 1.020e-12 | 1.101e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-automatic-large | equivalent-objective | passed | 6.238e-3 | 1.135e-2 | 1.318e-2 | 1.804e-2 | 4.515e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-events-small | equivalent-objective | passed | 7.304e-12 | 2.315e-12 | 2.315e-12 | 7.304e-12 | 5.540e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-regressors-medium | equivalent-objective | passed | 4.291e-3 | 1.333e-4 | 2.226e-4 | 4.248e-3 | 3.923e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| map-conditional-seasonalities-medium | equivalent-objective | passed | 2.682e-3 | 7.941e-4 | 7.454e-4 | 2.722e-3 | 2.397e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| country-us-linear-additive | equivalent-objective | passed | 6.775e-12 | 1.065e-12 | 1.065e-12 | 6.835e-12 | 1.652e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-linear-additive | equivalent-objective | passed | 6.775e-12 | 1.065e-12 | 1.065e-12 | 6.835e-12 | 1.652e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-us-linear-multiplicative | equivalent-objective | passed | 4.270e-12 | 1.024e-12 | 0.000e+0 | 6.022e-12 | 2.594e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-linear-multiplicative | equivalent-objective | passed | 4.270e-12 | 1.024e-12 | 0.000e+0 | 6.022e-12 | 2.594e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-boundary-linear | equivalent-objective | passed | 1.866e-9 | 3.610e-12 | 3.610e-12 | 1.862e-9 | 6.639e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-global-priors-linear | equivalent-objective | passed | 3.432e-12 | 1.109e-12 | 1.346e-12 | 4.526e-12 | 7.392e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-global-priors-overrides-linear | equivalent-objective | passed | 9.491e-11 | 1.356e-11 | 1.777e-11 | 9.300e-11 | 3.510e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-small | equivalent-objective | passed | 2.104e-8 | 3.465e-8 | 3.465e-8 | 4.443e-8 | 3.800e-9 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-medium | equivalent-objective | passed | 1.776e-3 | 2.078e-5 | 2.078e-5 | 1.783e-3 | 3.358e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-irregular | equivalent-objective | passed | 7.782e-2 | 6.977e-3 | 6.977e-3 | 7.881e-2 | 9.079e-3 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in objective. |
| map-training-ordered-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-ordered-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-explicit | equivalent-objective | passed | 1.690e-11 | 0.000e+0 | 0.000e+0 | 1.690e-11 | 5.818e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-auto | equivalent-objective | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicate-features-auto | equivalent-objective | passed | 8.106e-4 | 1.475e-4 | 1.620e-4 | 9.252e-4 | 7.159e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-training-duplicates-auto | scalar-process-different-public-work | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | 0.313 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| map-training-zero-span-linear-varied | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-linear-constant | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| evaluation-training-duplicates | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.211e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| linear-offset-scaling-absmax | equivalent-objective | passed | 1.226e-11 | 1.420e-13 | 1.420e-13 | 1.236e-11 | 1.023e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-offset-scaling-minmax | equivalent-objective | passed | 6.111e-13 | 2.905e-13 | 2.905e-13 | 8.527e-13 | 4.503e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-mixed-components | equivalent-objective | passed | 1.561e-10 | 2.705e-11 | 0.000e+0 | 1.790e-10 | 1.565e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-defaults-long-history-intervals-1000 | scalar-process-different-public-work | passed | 5.708e-2 | 1.814e-2 | 1.818e-2 | 4.692e-2 | 2.608e-4 | 0.394 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-linear-defaults-irregular-intervals-1000 | scalar-process-different-public-work | passed | 1.096e-1 | 6.977e-3 | 6.977e-3 | 1.070e-1 | 9.079e-3 | 0.483 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective. |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | scalar-process-different-public-work | passed | 1.194e-11 | 1.420e-13 | 1.420e-13 | 1.208e-11 | 1.023e-14 | 0.013 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | scalar-process-different-public-work | passed | 1.197e-11 | 4.310e-14 | 4.310e-14 | 1.201e-11 | 1.023e-14 | 0.005 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-intervals-128 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | 0.016 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-samples-512 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | 0.010 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| anomalies-linear-defaults-99 | scalar-process-different-public-work | passed | 1.547e-1 | 6.235e-4 | 6.235e-4 | 1.542e-1 | 1.974e-3 | 0.579 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Both libraries flagged all 4 injected outliers. Effect flagged at most 4 rows and Python 4; 0 were flagged by only one library, each between the two libraries' bounds. Output-first: investigate internal fit differences in objective. |
| warm-start-linear-defaults-30-new-rows | equivalent-objective | passed | 2.365e-3 | 1.342e-5 | 1.342e-5 | 2.376e-3 | 4.792e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Each library refit from its own fit of the first 226 rows; their starting parameters differed by at most 0.00531 in scaled units. Output-first: investigate internal fit differences in objective. |
| warm-start-linear-defaults-1-new-row | equivalent-objective | passed | 1.175e-3 | 5.353e-5 | 5.353e-5 | 1.169e-3 | 1.041e-3 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Each library refit from its own fit of the first 255 rows; their starting parameters differed by at most 0.00456 in scaled units. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| evaluation-linear-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-custom-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. Absolute times only. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2010 | 13 | 11765 | 23981 |
| country-global-priors-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12854 | 29669 |
| country-global-priors-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12854 | 29669 |
| country-global-priors-overrides-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12827 | 29665 |
| country-global-priors-overrides-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12827 | 29665 |

## Stationarity diagnostics

Constrained normalized infinity-norm residuals at independently fitted endpoints, not a same-point gradient comparison. Deltas within the Laplace kink tolerance use the subgradient interval on both sides. Equality-gate rows bound the absolute difference. Output-first rows never gate eligibility; they are flagged for investigation when Effect's residual exceeds Python's by more than the declared threshold. Diagnostic-only rows do not certify near-stationarity; EP-097 owns that deferred requirement. Forecast, component, metadata, persistence and applicable uncertainty gates always apply; density and normalized noise also gate except under output-first.

| Case | Run | Effect residual | Python residual | Absolute difference | Policy | Follow-up |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| map-explicit-break-small | 0 | 3.070796e-2 | 3.070796e-2 | 5.727387e-11 | output-first | n/a |
| map-explicit-break-small | 1 | 3.070796e-2 | 3.070796e-2 | 5.727387e-11 | output-first | n/a |
| map-seasonal-breaks-irregular-medium | 0 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | output-first | n/a |
| map-seasonal-breaks-irregular-medium | 1 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | output-first | n/a |
| map-mixed-features-explicit-small | 0 | 2.483610e-2 | 2.483610e-2 | 1.594271e-9 | output-first | n/a |
| map-mixed-features-explicit-small | 1 | 2.483610e-2 | 2.483610e-2 | 1.594271e-9 | output-first | n/a |
| map-mixed-features-automatic-large | 0 | 1.719064e+2 | 1.734560e+2 | 1.549680e+0 | output-first | n/a |
| map-mixed-features-automatic-large | 1 | 1.719064e+2 | 1.734560e+2 | 1.549680e+0 | output-first | n/a |
| map-events-small | 0 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-events-small | 1 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-regressors-medium | 0 | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | output-first | n/a |
| map-regressors-medium | 1 | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | output-first | n/a |
| map-conditional-seasonalities-medium | 0 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | output-first | n/a |
| map-conditional-seasonalities-medium | 1 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | output-first | n/a |
| country-us-linear-additive | 0 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-us-linear-additive | 1 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-explicit-us-linear-additive | 0 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-explicit-us-linear-additive | 1 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-us-linear-multiplicative | 0 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-us-linear-multiplicative | 1 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-explicit-us-linear-multiplicative | 0 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-explicit-us-linear-multiplicative | 1 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-boundary-linear | 0 | 1.622527e+0 | 1.622527e+0 | 1.016670e-8 | output-first | n/a |
| country-boundary-linear | 1 | 1.622527e+0 | 1.622527e+0 | 1.016670e-8 | output-first | n/a |
| country-global-priors-linear | 0 | 1.793950e-3 | 1.794420e-3 | 4.695097e-7 | output-first | n/a |
| country-global-priors-linear | 1 | 1.793950e-3 | 1.794420e-3 | 4.695097e-7 | output-first | n/a |
| country-global-priors-overrides-linear | 0 | 4.334321e-3 | 4.335292e-3 | 9.704204e-7 | output-first | n/a |
| country-global-priors-overrides-linear | 1 | 4.334321e-3 | 4.335292e-3 | 9.704204e-7 | output-first | n/a |
| linear-defaults-small | 0 | 2.798504e+1 | 2.797839e+1 | 6.650479e-3 | output-first | n/a |
| linear-defaults-small | 1 | 2.798504e+1 | 2.797839e+1 | 6.650479e-3 | output-first | n/a |
| linear-defaults-medium | 0 | 3.399954e+3 | 9.062191e+3 | 5.662238e+3 | output-first | n/a |
| linear-defaults-medium | 1 | 3.399954e+3 | 9.062191e+3 | 5.662238e+3 | output-first | n/a |
| linear-defaults-irregular | 0 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| linear-defaults-irregular | 1 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| map-training-ordered-explicit | 0 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-ordered-explicit | 1 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-ordered-auto | 0 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-ordered-auto | 1 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-unsorted-explicit | 0 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-unsorted-explicit | 1 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-unsorted-auto | 0 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-unsorted-auto | 1 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-duplicates-explicit | 0 | 1.044064e+0 | 1.044064e+0 | 5.043985e-8 | output-first | n/a |
| map-training-duplicates-explicit | 1 | 1.044064e+0 | 1.044064e+0 | 5.043985e-8 | output-first | n/a |
| map-training-duplicates-auto | 0 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| map-training-duplicates-auto | 1 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| map-training-duplicate-features-auto | 0 | 4.784026e+1 | 1.075811e+2 | 5.974084e+1 | output-first | n/a |
| map-training-duplicate-features-auto | 1 | 4.784026e+1 | 1.075811e+2 | 5.974084e+1 | output-first | n/a |
| uncertainty-training-duplicates-auto | 0 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| uncertainty-training-duplicates-auto | 1 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| linear-offset-scaling-absmax | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| linear-offset-scaling-absmax | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| linear-offset-scaling-minmax | 0 | 4.443357e-1 | 4.443357e-1 | 2.258696e-8 | output-first | n/a |
| linear-offset-scaling-minmax | 1 | 4.443357e-1 | 4.443357e-1 | 2.258696e-8 | output-first | n/a |
| linear-mixed-components | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| linear-mixed-components | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | output-first | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | output-first | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | 0 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | 1 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| anomalies-linear-defaults-99 | 0 | 9.725647e+1 | 2.103162e+2 | 1.130598e+2 | output-first | n/a |
| anomalies-linear-defaults-99 | 1 | 9.725647e+1 | 2.103162e+2 | 1.130598e+2 | output-first | n/a |
| warm-start-linear-defaults-30-new-rows | 0 | 1.674684e+4 | 2.256474e+4 | 5.817903e+3 | output-first | n/a |
| warm-start-linear-defaults-30-new-rows | 1 | 1.674684e+4 | 2.256474e+4 | 5.817903e+3 | output-first | n/a |
| warm-start-linear-defaults-1-new-row | 0 | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | output-first | n/a |
| warm-start-linear-defaults-1-new-row | 1 | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | output-first | n/a |

## Output-first investigation flags

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's. Warm-start parameters are flagged when the two libraries' base fits start their refits further apart than the case allows.

| Case | Run | Quantity | Effect | Python | Effect - Python | Threshold |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| map-regressors-medium | 0 | stationarity-residual | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | 1.000e-2 |
| map-regressors-medium | 1 | stationarity-residual | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | 1.000e-2 |
| map-conditional-seasonalities-medium | 0 | stationarity-residual | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | 1.000e-2 |
| map-conditional-seasonalities-medium | 1 | stationarity-residual | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | 1.000e-2 |
| linear-defaults-irregular | 0 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| linear-defaults-irregular | 1 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | objective | -5.819508e+3 | -5.819647e+3 | 1.389642e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | stationarity-residual | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | objective | -5.819508e+3 | -5.819647e+3 | 1.389642e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | stationarity-residual | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | 1.000e-2 |
| uncertainty-linear-defaults-irregular-intervals-1000 | 0 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| uncertainty-linear-defaults-irregular-intervals-1000 | 1 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| anomalies-linear-defaults-99 | 0 | objective | -1.465484e+3 | -1.466453e+3 | 9.685886e-1 | 1.000e-2 |
| anomalies-linear-defaults-99 | 1 | objective | -1.465484e+3 | -1.466453e+3 | 9.685886e-1 | 1.000e-2 |
| warm-start-linear-defaults-30-new-rows | 0 | objective | -1.762230e+3 | -1.762152e+3 | -7.891521e-2 | 1.000e-2 |
| warm-start-linear-defaults-30-new-rows | 1 | objective | -1.762230e+3 | -1.762152e+3 | -7.891521e-2 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 0 | objective | -1.762038e+3 | -1.762258e+3 | 2.199214e-1 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 0 | stationarity-residual | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 1 | objective | -1.762038e+3 | -1.762258e+3 | 2.199214e-1 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 1 | stationarity-residual | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | 1.000e-2 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

Anomaly workloads check the whole history in-sample. Effect's `warm-anomalies` times the public `anomalies` call, fit included; Python's times a fresh fit, `predict(history, vectorized=False)` and the strict `y < yhat_lower | y > yhat_upper` comparison. Each library's flags must be exactly the rows outside its own value intervals, and both must flag every declared outlier. Rows flagged by one library alone are counted, not failed.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-training-duplicates-auto | 96 | 0 | 25 | 8 | 8 | 8 | 128 | samples | 33554432 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | docs/validation/uncertainty.md |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1095 | 26 | 25 | 1460 | 365 | 365 | 1000 | intervals | 67108864 | long-history-v1:piecewise+weekly+yearly+bounded-noise-x20:n=1095:h=365 / 30f02c063165126f62a0964a83fef842d557b54fab6300c692ef69225bb94d41 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-defaults-irregular-intervals-1000 | 192 | 6 | 25 | 240 | 48 | 57 | 1000 | intervals | 67108864 | deterministic-piecewise-weekly-v2:n=192:h=48:irregular=true / 62f195edf2bc788b67f26471e00eee77ec55c61670a7c61be3c23230664418a1 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 96 | 4 | 1 | 8 | 0 | 0 | 128 | intervals | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 96 | 4 | 1 | 1 | 1 | 1 | 128 | samples | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 96 | 6 | 1 | 12 | 8 | 15 | 128 | intervals | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-samples-512 | 96 | 6 | 1 | 12 | 8 | 15 | 512 | samples | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |
| anomalies-linear-defaults-99 | 365 | 6 | 25 | 365 | 0 | 0 | 1000 | intervals | 67108864 | linear-anomalies-v1:piecewise+weekly+bounded-noise-x10+outliers@50(+15),120(-15),230(+12),300(-12):n=365:h=0 / 2b70250a026865e01f8ce95665c42641633fba309e791a7dc1e2996e67bd98ed | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |
| evaluation-linear-custom-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 23.942 | 24.475 | 23.316 | 24.475 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 200.276 | 215.653 | 193.652 | 215.653 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.503 | 10.346 | 6.905 | 10.346 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 29.302 | 31.643 | 29.077 | 31.643 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 12.951 | 13.459 | 12.598 | 13.459 | 150.5 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 166.614 | 179.933 | 166.418 | 179.933 | 129.8 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.022 | 0.013 | 0.022 | 139.8 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.453 | 0.472 | 0.440 | 0.472 | 147.4 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 178.831 | 192.565 | 171.380 | 192.565 | 154.8 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1585.639 | 1644.919 | 1577.711 | 1644.919 | 147.4 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 161.342 | 185.290 | 156.737 | 185.290 | 159.8 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1578.023 | 1602.009 | 1570.199 | 1602.009 | 147.4 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.797 | 0.908 | 0.736 | 0.908 | 156.9 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.282 | 3.369 | 3.228 | 3.369 | 147.4 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.091 | 0.128 | 0.077 | 0.128 | 154.8 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.499 | 0.538 | 0.484 | 0.538 | 147.4 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.103 | 5.490 | 4.972 | 5.490 | 153.5 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 26.803 | 37.097 | 26.496 | 37.097 | 147.4 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.534 | 6.108 | 5.295 | 6.108 | 151.6 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.111 | 26.252 | 25.863 | 26.252 | 147.4 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.875 | 6.441 | 5.611 | 6.441 | 147.6 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 20.627 | 21.830 | 20.543 | 21.830 | 147.4 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.288 | 0.444 | 0.266 | 0.444 | 148.8 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.311 | 5.389 | 5.253 | 5.389 | 147.4 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.026 | 0.011 | 0.026 | 139.0 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.445 | 0.460 | 0.438 | 0.460 | 127.1 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 175.513 | 189.860 | 173.460 | 189.860 | 152.9 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1422.507 | 1467.992 | 1418.786 | 1467.992 | 127.1 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.316 | 163.523 | 156.366 | 163.523 | 152.9 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1399.935 | 1401.114 | 1398.440 | 1401.114 | 127.1 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.402 | 0.555 | 0.367 | 0.555 | 152.9 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.862 | 3.913 | 3.803 | 3.913 | 127.1 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.027 | 0.039 | 0.017 | 0.039 | 152.9 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.663 | 0.696 | 0.640 | 0.696 | 127.1 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.964 | 5.138 | 3.747 | 5.138 | 152.6 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.176 | 22.521 | 22.159 | 22.521 | 127.1 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.888 | 4.699 | 3.806 | 4.699 | 152.5 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 21.602 | 21.737 | 21.537 | 21.737 | 127.1 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.637 | 5.321 | 4.509 | 5.321 | 146.5 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.056 | 17.390 | 16.904 | 17.390 | 127.1 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.136 | 0.158 | 0.134 | 0.158 | 152.2 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.622 | 4.700 | 4.608 | 4.700 | 127.1 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.028 | 0.012 | 0.028 | 142.7 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.444 | 0.476 | 0.418 | 0.476 | 127.1 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 170.769 | 177.102 | 168.172 | 177.102 | 157.2 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1422.072 | 1512.517 | 1416.029 | 1512.517 | 127.1 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.659 | 217.731 | 155.955 | 217.731 | 157.3 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1413.907 | 1461.101 | 1405.423 | 1461.101 | 127.1 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.370 | 0.430 | 0.368 | 0.430 | 157.2 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.913 | 4.030 | 3.843 | 4.030 | 127.1 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.026 | 0.037 | 0.017 | 0.037 | 157.2 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.673 | 0.696 | 0.666 | 0.696 | 127.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.377 | 6.382 | 3.928 | 6.382 | 157.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.009 | 23.794 | 22.860 | 23.794 | 127.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.221 | 6.367 | 4.125 | 6.367 | 156.9 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 22.542 | 24.754 | 22.502 | 24.754 | 127.1 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.436 | 7.236 | 4.867 | 7.236 | 151.2 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.022 | 18.467 | 17.736 | 18.467 | 127.1 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.150 | 0.182 | 0.140 | 0.182 | 156.7 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.626 | 4.674 | 4.585 | 4.674 | 127.1 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.050 | 0.060 | 0.025 | 0.060 | 138.3 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.499 | 0.521 | 0.477 | 0.521 | 148.3 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 175.838 | 189.984 | 174.074 | 189.984 | 159.1 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1594.173 | 1634.327 | 1586.236 | 1634.327 | 148.3 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 163.313 | 169.228 | 161.158 | 169.228 | 173.4 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1563.155 | 1618.643 | 1561.138 | 1618.643 | 148.3 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 1.267 | 2.228 | 1.175 | 2.228 | 173.3 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.379 | 5.209 | 4.279 | 5.209 | 148.3 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.127 | 0.163 | 0.110 | 0.163 | 163.0 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.729 | 0.742 | 0.725 | 0.742 | 148.3 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.143 | 6.500 | 4.895 | 6.500 | 153.4 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 33.097 | 33.364 | 32.873 | 33.364 | 148.3 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 5.404 | 6.622 | 5.183 | 6.622 | 151.5 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 32.516 | 33.085 | 32.437 | 33.085 | 148.3 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.874 | 6.273 | 5.630 | 6.273 | 148.4 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 26.425 | 27.582 | 26.171 | 27.582 | 148.3 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.227 | 0.258 | 0.221 | 0.258 | 150.5 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.223 | 6.344 | 6.215 | 6.344 | 148.3 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.047 | 0.279 | 0.030 | 0.279 | 137.4 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.563 | 0.487 | 0.563 | 148.2 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 172.654 | 177.912 | 171.969 | 177.912 | 154.5 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1597.333 | 1672.344 | 1581.613 | 1672.344 | 148.2 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 159.823 | 171.658 | 156.314 | 171.658 | 170.7 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1563.851 | 2652.472 | 1557.125 | 2652.472 | 148.2 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 1.203 | 2.066 | 1.128 | 2.066 | 170.4 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.333 | 6.348 | 4.204 | 6.348 | 148.2 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.157 | 0.185 | 0.121 | 0.185 | 158.4 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.723 | 0.766 | 0.698 | 0.766 | 148.2 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.165 | 5.718 | 5.065 | 5.718 | 150.9 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 33.493 | 33.512 | 33.168 | 33.512 | 148.2 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.370 | 6.553 | 5.222 | 6.553 | 149.2 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 33.025 | 33.869 | 32.837 | 33.869 | 148.2 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 5.856 | 6.195 | 5.775 | 6.195 | 146.5 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 28.794 | 29.832 | 28.066 | 29.832 | 148.2 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.233 | 0.266 | 0.218 | 0.266 | 148.2 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.187 | 6.415 | 6.174 | 6.415 | 148.2 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.016 | 0.011 | 0.016 | 136.3 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.490 | 0.447 | 0.490 | 148.3 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 173.544 | 175.110 | 171.036 | 175.110 | 151.8 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1613.993 | 1667.705 | 1607.282 | 1667.705 | 148.3 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 160.607 | 168.086 | 159.094 | 168.086 | 154.8 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1571.900 | 1610.266 | 1564.028 | 1610.266 | 148.3 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.824 | 0.924 | 0.720 | 0.924 | 151.8 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.987 | 4.164 | 3.918 | 4.164 | 148.3 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.093 | 0.112 | 0.086 | 0.112 | 151.8 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.700 | 0.718 | 0.665 | 0.718 | 148.3 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.537 | 4.777 | 4.511 | 4.777 | 150.7 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.525 | 27.666 | 26.251 | 27.666 | 148.3 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.712 | 5.529 | 4.664 | 5.529 | 148.7 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 25.502 | 32.889 | 25.321 | 32.889 | 148.3 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.043 | 7.124 | 4.865 | 7.124 | 145.0 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.145 | 20.739 | 19.899 | 20.739 | 148.3 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.224 | 0.296 | 0.214 | 0.296 | 146.0 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.468 | 5.696 | 5.422 | 5.696 | 148.3 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.016 | 0.011 | 0.016 | 139.3 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.510 | 0.426 | 0.510 | 148.2 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 181.483 | 183.910 | 173.620 | 183.910 | 156.6 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1613.047 | 1650.591 | 1582.273 | 1650.591 | 148.2 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 160.115 | 162.424 | 155.496 | 162.424 | 159.6 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1589.298 | 1923.198 | 1570.479 | 1923.198 | 148.2 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.763 | 0.820 | 0.750 | 0.820 | 156.8 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.894 | 4.116 | 3.799 | 4.116 | 148.2 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.087 | 0.120 | 0.084 | 0.120 | 156.6 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.691 | 0.717 | 0.669 | 0.717 | 148.2 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.904 | 5.055 | 4.830 | 5.055 | 155.5 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.002 | 27.254 | 26.951 | 27.254 | 148.2 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.071 | 5.581 | 4.953 | 5.581 | 153.9 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 26.667 | 28.148 | 26.439 | 28.148 | 148.2 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.471 | 8.346 | 5.205 | 8.346 | 150.8 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.303 | 23.885 | 21.098 | 23.885 | 148.2 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.234 | 0.307 | 0.219 | 0.307 | 150.9 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.470 | 5.809 | 5.377 | 5.809 | 148.2 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 17.813 | 17.975 | 17.749 | 17.975 | 153.4 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 152.671 | 167.315 | 148.843 | 167.315 | 127.1 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 18.971 | 23.226 | 18.776 | 23.226 | 152.2 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 143.440 | 149.376 | 143.359 | 149.376 | 127.1 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 5.872 | 6.526 | 5.871 | 6.526 | 156.0 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.124 | 31.250 | 29.976 | 31.250 | 127.1 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.175 | 0.177 | 0.173 | 0.177 | 158.7 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 127.1 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.255 | 0.268 | 0.247 | 0.268 | 156.5 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.013 | 0.008 | 0.013 | 127.1 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 21.601 | 23.782 | 20.665 | 23.782 | 155.4 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 151.578 | 171.547 | 151.010 | 171.547 | 127.1 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 10.306 | 10.837 | 10.003 | 10.837 | 145.0 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 77.112 | 81.884 | 76.725 | 81.884 | 127.1 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 187.196 | 197.537 | 175.416 | 197.537 | 151.3 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1488.166 | 1498.962 | 1482.795 | 1498.962 | 127.1 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 0.990 | 1.031 | 0.965 | 1.031 | 151.1 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.118 | 1.142 | 1.111 | 1.142 | 127.1 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.014 | 0.019 | 0.012 | 0.019 | 131.9 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.405 | 0.421 | 0.367 | 0.421 | 127.1 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.081 | 1.460 | 0.059 | 1.460 | 147.3 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.484 | 5.504 | 5.476 | 5.504 | 127.1 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.072 | 1.126 | 1.002 | 1.126 | 136.1 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.654 | 0.671 | 0.649 | 0.671 | 127.1 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.691 | 10.163 | 9.491 | 10.163 | 143.9 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 72.035 | 77.874 | 71.658 | 77.874 | 127.1 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.050 | 6.367 | 6.045 | 6.367 | 153.1 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.829 | 31.168 | 29.609 | 31.168 | 127.1 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.171 | 0.189 | 0.159 | 0.189 | 153.9 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 127.1 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.219 | 0.243 | 0.213 | 0.243 | 153.4 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.010 | 0.008 | 0.010 | 127.1 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 19.489 | 24.576 | 19.001 | 24.576 | 152.7 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 149.485 | 153.419 | 148.736 | 153.419 | 127.1 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 0.979 | 2.775 | 0.970 | 2.775 | 152.7 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.358 | 1.373 | 1.356 | 1.373 | 127.1 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.872 | 4.013 | 3.772 | 4.013 | 153.7 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 21.364 | 21.634 | 21.356 | 21.634 | 127.1 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.973 | 1.035 | 0.952 | 1.035 | 135.2 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.926 | 1.005 | 0.870 | 1.005 | 127.1 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 6.289 | 6.595 | 5.730 | 6.595 | 145.4 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 50.170 | 51.058 | 49.884 | 51.058 | 127.1 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.161 | 0.195 | 0.159 | 0.195 | 156.0 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 127.1 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.241 | 0.299 | 0.220 | 0.299 | 155.9 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.007 | 0.010 | 0.007 | 0.010 | 127.1 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 6.293 | 6.527 | 6.241 | 6.527 | 153.4 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 52.025 | 52.722 | 51.977 | 52.722 | 127.1 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.018 | 0.054 | 0.012 | 0.063 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.552 | 0.579 | 0.533 | 0.697 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.451 | 0.564 | 0.310 | 0.634 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.699 | 2.802 | 2.647 | 2.872 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.024 | 0.027 | 0.023 | 0.027 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.506 | 0.615 | 0.486 | 0.615 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 173.093 | 179.448 | 171.427 | 179.448 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1406.970 | 1597.302 | 1402.526 | 1597.302 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 155.227 | 159.447 | 153.833 | 159.447 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1389.271 | 1411.715 | 1385.878 | 1411.715 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.126 | 0.260 | 0.125 | 0.260 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.186 | 2.430 | 2.154 | 2.430 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.036 | 0.040 | 0.023 | 0.040 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.537 | 0.591 | 0.520 | 0.591 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.138 | 6.457 | 6.120 | 6.457 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 16.918 | 20.148 | 16.565 | 20.148 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.321 | 6.672 | 6.211 | 6.672 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.277 | 19.574 | 15.895 | 19.574 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.835 | 7.357 | 6.640 | 7.357 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.198 | 15.963 | 12.920 | 15.963 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.256 | 0.435 | 0.219 | 0.435 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.067 | 4.017 | 2.994 | 4.017 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.033 | 0.047 | 0.032 | 0.047 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.534 | 0.562 | 0.522 | 0.562 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 200.944 | 213.966 | 193.722 | 213.966 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1477.817 | 1530.403 | 1468.009 | 1530.403 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 158.352 | 184.625 | 155.192 | 184.625 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1393.462 | 1412.413 | 1386.746 | 1412.413 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.135 | 0.141 | 0.122 | 0.141 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.260 | 2.327 | 2.231 | 2.327 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.025 | 0.035 | 0.023 | 0.035 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.569 | 0.595 | 0.535 | 0.595 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.811 | 27.370 | 25.290 | 27.370 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 88.906 | 95.147 | 87.335 | 95.147 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.963 | 27.785 | 25.504 | 27.785 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 88.173 | 96.138 | 88.032 | 96.138 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.892 | 29.442 | 25.588 | 29.442 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 89.989 | 90.458 | 85.691 | 90.458 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.312 | 0.346 | 0.308 | 0.346 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.052 | 3.138 | 2.948 | 3.138 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.008 | 0.005 | 0.008 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.402 | 0.443 | 0.399 | 0.443 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 186.154 | 198.936 | 183.667 | 198.936 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1464.311 | 1507.715 | 1451.710 | 1507.715 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 160.858 | 167.008 | 153.786 | 167.008 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1406.809 | 1422.303 | 1395.469 | 1422.303 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.191 | 0.303 | 0.156 | 0.303 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.036 | 2.226 | 1.984 | 2.226 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.032 | 0.032 | 0.028 | 0.032 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.395 | 0.464 | 0.346 | 0.464 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.462 | 18.745 | 18.149 | 18.745 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 64.108 | 66.070 | 62.782 | 66.070 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.252 | 18.861 | 18.091 | 18.861 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 64.236 | 67.450 | 62.952 | 67.450 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 19.108 | 21.221 | 18.340 | 21.221 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 59.818 | 60.818 | 59.530 | 60.818 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.168 | 0.188 | 0.162 | 0.188 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.056 | 3.206 | 3.027 | 3.206 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.040 | 0.054 | 0.040 | 0.054 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.495 | 0.507 | 0.488 | 0.507 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 173.734 | 183.770 | 170.966 | 183.770 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1403.831 | 1434.598 | 1401.254 | 1434.598 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 157.864 | 181.161 | 154.514 | 181.161 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1389.849 | 1414.844 | 1380.103 | 1414.844 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.134 | 0.148 | 0.132 | 0.148 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.539 | 3.658 | 3.477 | 3.658 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.028 | 0.036 | 0.026 | 0.036 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.635 | 1.032 | 0.603 | 1.032 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.609 | 5.103 | 4.609 | 5.103 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 26.777 | 27.129 | 26.706 | 27.129 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.748 | 4.895 | 4.746 | 4.895 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 26.710 | 27.025 | 26.636 | 27.025 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.392 | 5.683 | 5.378 | 5.683 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.092 | 22.257 | 21.810 | 22.257 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.379 | 3.305 | 0.367 | 3.305 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.590 | 4.730 | 4.563 | 4.730 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.017 | 0.014 | 0.017 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.442 | 0.459 | 0.436 | 0.459 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 176.842 | 220.855 | 170.442 | 220.855 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1409.242 | 1462.151 | 1405.271 | 1462.151 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 181.949 | 190.123 | 162.054 | 190.123 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1387.333 | 1399.946 | 1380.902 | 1399.946 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.151 | 0.196 | 0.118 | 0.196 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.065 | 2.090 | 2.055 | 2.090 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.038 | 0.070 | 0.026 | 0.070 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.441 | 0.474 | 0.437 | 0.474 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.784 | 4.996 | 4.760 | 4.996 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.181 | 26.525 | 25.894 | 26.525 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.222 | 5.291 | 5.188 | 5.291 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 25.886 | 26.067 | 25.801 | 26.067 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.149 | 5.371 | 5.148 | 5.371 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 22.818 | 23.653 | 22.662 | 23.653 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.216 | 0.245 | 0.193 | 0.245 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 2.911 | 3.003 | 2.902 | 3.003 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.018 | 0.016 | 0.018 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.446 | 0.470 | 0.446 | 0.470 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 171.920 | 174.337 | 168.134 | 174.337 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1397.982 | 1434.118 | 1397.540 | 1434.118 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.030 | 158.234 | 155.211 | 158.234 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1378.962 | 1393.405 | 1378.333 | 1393.405 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.142 | 0.104 | 0.142 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.082 | 2.160 | 2.074 | 2.160 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.021 | 0.028 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.410 | 0.435 | 0.398 | 0.435 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.762 | 4.871 | 4.702 | 4.871 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.027 | 26.566 | 25.822 | 26.566 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.264 | 5.527 | 5.149 | 5.527 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 25.311 | 26.648 | 25.192 | 26.648 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.321 | 5.489 | 5.180 | 5.489 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 22.579 | 23.079 | 22.039 | 23.079 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.235 | 0.330 | 0.234 | 0.330 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 2.955 | 2.999 | 2.926 | 2.999 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.094 | 0.141 | 0.082 | 0.141 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.629 | 0.640 | 0.616 | 0.640 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 167.178 | 176.711 | 165.694 | 176.711 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1427.156 | 1518.897 | 1413.989 | 1518.897 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 157.463 | 163.554 | 156.207 | 163.554 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1405.838 | 1443.982 | 1402.308 | 1443.982 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.102 | 0.126 | 0.092 | 0.126 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.593 | 2.722 | 2.561 | 2.722 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.021 | 0.028 | 0.015 | 0.028 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.614 | 0.637 | 0.584 | 0.637 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.700 | 3.293 | 2.556 | 3.293 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.052 | 16.435 | 15.941 | 16.435 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.897 | 3.493 | 2.690 | 3.493 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.836 | 15.917 | 15.395 | 15.917 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.778 | 4.730 | 2.549 | 4.730 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.238 | 13.900 | 11.803 | 13.900 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.427 | 1.238 | 0.394 | 1.238 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.726 | 3.754 | 3.706 | 3.754 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.022 | 0.015 | 0.022 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.468 | 0.475 | 0.445 | 0.475 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 169.572 | 178.412 | 167.925 | 178.412 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1437.058 | 1554.056 | 1431.517 | 1554.056 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 154.250 | 161.813 | 153.753 | 161.813 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1415.849 | 1425.364 | 1409.379 | 1425.364 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.163 | 0.194 | 0.140 | 0.194 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.369 | 3.497 | 3.195 | 3.497 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.021 | 0.025 | 0.016 | 0.025 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.603 | 0.678 | 0.585 | 0.678 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.665 | 7.888 | 6.463 | 7.888 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 33.942 | 34.213 | 33.539 | 34.213 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.635 | 8.515 | 6.524 | 8.515 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 34.092 | 36.075 | 33.638 | 36.075 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.091 | 8.501 | 6.880 | 8.501 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.062 | 29.420 | 28.703 | 29.420 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.335 | 0.471 | 0.317 | 0.471 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.210 | 4.369 | 4.190 | 4.369 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.012 | 0.004 | 0.012 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.450 | 0.463 | 0.429 | 0.463 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 164.413 | 201.480 | 160.382 | 201.480 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1432.967 | 1477.746 | 1418.137 | 1477.746 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 155.761 | 162.621 | 152.420 | 162.621 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1428.173 | 1461.099 | 1407.358 | 1461.099 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.085 | 0.142 | 0.074 | 0.142 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.032 | 2.136 | 1.928 | 2.136 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.020 | 0.032 | 0.016 | 0.032 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.357 | 0.412 | 0.324 | 0.412 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.742 | 2.027 | 1.645 | 2.027 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.917 | 14.102 | 13.741 | 14.102 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.790 | 1.872 | 1.657 | 1.872 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.526 | 13.785 | 13.390 | 13.785 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 2.189 | 3.424 | 1.756 | 3.424 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.488 | 11.137 | 10.445 | 11.137 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.175 | 0.204 | 0.156 | 0.204 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.665 | 2.772 | 2.651 | 2.772 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.189 | 0.770 | 0.183 | 0.770 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.106 | 1.135 | 1.105 | 1.135 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 190.060 | 190.848 | 188.140 | 190.848 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1486.489 | 1513.636 | 1450.414 | 1513.636 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 168.336 | 218.022 | 165.291 | 218.022 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1445.398 | 1475.677 | 1425.776 | 1475.677 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.293 | 0.465 | 0.279 | 0.465 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.624 | 5.996 | 5.570 | 5.996 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.024 | 0.025 | 0.023 | 0.025 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.670 | 1.742 | 1.668 | 1.742 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.185 | 11.956 | 10.826 | 11.956 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.408 | 44.784 | 44.275 | 44.784 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.493 | 13.911 | 11.442 | 13.911 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.105 | 44.105 | 42.981 | 44.105 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.816 | 12.319 | 11.075 | 12.319 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 36.991 | 40.403 | 36.474 | 40.403 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 1.585 | 1.783 | 0.838 | 1.783 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 5.937 | 6.351 | 5.934 | 6.351 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.014 | 1.240 | 0.009 | 1.240 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.472 | 0.513 | 0.444 | 0.513 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 166.933 | 177.499 | 163.637 | 177.499 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1432.790 | 1449.577 | 1421.701 | 1449.577 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 154.392 | 163.260 | 152.785 | 163.260 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1423.018 | 1463.597 | 1410.033 | 1463.597 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.127 | 0.183 | 0.106 | 0.183 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.491 | 3.611 | 3.430 | 3.611 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.025 | 0.029 | 0.017 | 0.029 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.588 | 0.627 | 0.564 | 0.627 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.662 | 2.977 | 1.480 | 2.977 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.112 | 16.862 | 15.984 | 16.862 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.699 | 1.799 | 1.642 | 1.799 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.628 | 15.889 | 15.500 | 15.889 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.705 | 3.094 | 1.666 | 3.094 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.078 | 11.373 | 10.882 | 11.373 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.149 | 0.173 | 0.140 | 0.173 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.825 | 4.940 | 4.749 | 4.940 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.121 | 0.149 | 0.101 | 0.149 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.652 | 0.683 | 0.641 | 0.683 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 170.013 | 175.545 | 168.616 | 175.545 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1410.681 | 1436.530 | 1405.422 | 1436.530 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 158.034 | 161.203 | 155.278 | 161.203 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1416.107 | 1439.911 | 1402.558 | 1439.911 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.136 | 0.170 | 0.103 | 0.170 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.948 | 3.013 | 2.894 | 3.013 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.025 | 0.015 | 0.025 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.727 | 0.774 | 0.716 | 0.774 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.611 | 2.996 | 2.478 | 2.996 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.269 | 15.086 | 14.174 | 15.086 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.791 | 3.123 | 2.661 | 3.123 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.799 | 14.131 | 13.541 | 14.131 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.656 | 2.933 | 2.560 | 2.933 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 9.960 | 10.205 | 9.859 | 10.205 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.475 | 0.508 | 0.449 | 0.508 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.551 | 3.659 | 3.529 | 3.659 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.024 | 0.025 | 0.023 | 0.025 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.543 | 0.600 | 0.519 | 0.600 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 156.663 | 166.156 | 155.536 | 166.156 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1430.079 | 1560.690 | 1408.416 | 1560.690 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.111 | 0.309 | 0.075 | 0.309 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.288 | 2.412 | 2.193 | 2.412 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.019 | 0.028 | 0.016 | 0.028 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.508 | 0.574 | 0.503 | 0.574 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.336 | 1.421 | 1.312 | 1.421 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.556 | 13.365 | 11.449 | 13.365 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.540 | 2.508 | 1.391 | 2.508 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.048 | 12.881 | 10.939 | 12.881 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.007 | 2.202 | 1.844 | 2.202 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.166 | 9.196 | 7.945 | 9.196 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.259 | 0.409 | 0.232 | 0.409 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.090 | 3.208 | 3.050 | 3.208 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 159.792 | 168.358 | 156.638 | 168.358 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1385.588 | 1419.908 | 1375.066 | 1419.908 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.295 | 1.595 | 0.193 | 1.595 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.423 | 2.474 | 2.412 | 2.474 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.023 | 0.029 | 0.022 | 0.029 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.443 | 0.470 | 0.441 | 0.470 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.778 | 32.896 | 32.722 | 32.896 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 108.107 | 109.583 | 107.501 | 109.583 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.243 | 0.340 | 0.234 | 0.340 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.392 | 3.491 | 3.364 | 3.491 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.339 | 181.596 | 157.888 | 181.596 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1384.394 | 1384.737 | 1384.174 | 1384.737 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.174 | 0.192 | 0.165 | 0.192 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 1.902 | 1.938 | 1.899 | 1.938 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.021 | 0.031 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.392 | 0.414 | 0.388 | 0.414 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.223 | 27.832 | 25.858 | 27.832 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 82.236 | 83.425 | 81.890 | 83.425 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.171 | 0.293 | 0.171 | 0.293 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.602 | 2.611 | 2.562 | 2.611 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 157.669 | 161.710 | 154.596 | 161.710 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1379.985 | 1405.604 | 1378.448 | 1405.604 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.148 | 0.176 | 0.144 | 0.176 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.045 | 2.181 | 2.044 | 2.181 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.021 | 0.040 | 0.019 | 0.040 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.398 | 0.427 | 0.370 | 0.427 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.444 | 5.962 | 3.423 | 5.962 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.479 | 23.526 | 19.225 | 23.526 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.162 | 0.223 | 0.140 | 0.223 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.630 | 2.880 | 2.606 | 2.880 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 155.395 | 160.587 | 155.001 | 160.587 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1382.029 | 1394.983 | 1381.321 | 1394.983 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.196 | 0.242 | 0.188 | 0.242 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 1.984 | 2.021 | 1.961 | 2.021 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.025 | 0.027 | 0.019 | 0.027 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.399 | 0.429 | 0.398 | 0.429 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 31.518 | 35.531 | 31.006 | 35.531 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 105.487 | 107.033 | 105.457 | 107.033 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.205 | 0.226 | 0.149 | 0.226 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.696 | 3.341 | 2.660 | 3.341 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 156.818 | 157.506 | 154.034 | 157.506 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1392.946 | 1435.201 | 1390.738 | 1435.201 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.149 | 0.173 | 0.136 | 0.173 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.058 | 2.104 | 2.022 | 2.104 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.024 | 0.033 | 0.019 | 0.033 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.391 | 0.416 | 0.389 | 0.416 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.936 | 5.441 | 3.664 | 5.441 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 19.999 | 20.843 | 19.959 | 20.843 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.171 | 0.298 | 0.168 | 0.298 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.623 | 2.648 | 2.594 | 2.648 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 155.650 | 164.686 | 154.717 | 164.686 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1383.199 | 1401.208 | 1377.118 | 1401.208 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.179 | 0.202 | 0.165 | 0.202 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.033 | 2.073 | 2.011 | 2.073 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.022 | 0.028 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.406 | 0.436 | 0.403 | 0.436 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 30.486 | 32.423 | 30.472 | 32.423 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 104.983 | 107.377 | 104.896 | 107.377 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.172 | 0.258 | 0.149 | 0.258 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.530 | 2.681 | 2.514 | 2.681 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 156.721 | 161.013 | 156.269 | 161.013 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1390.790 | 1422.730 | 1388.048 | 1422.730 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.137 | 0.175 | 0.137 | 0.175 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.029 | 2.052 | 2.005 | 2.052 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.026 | 0.029 | 0.020 | 0.029 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.393 | 0.402 | 0.384 | 0.402 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.895 | 5.450 | 3.852 | 5.450 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 19.996 | 20.652 | 19.939 | 20.652 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.201 | 0.264 | 0.178 | 0.264 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.643 | 2.687 | 2.623 | 2.687 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 187.153 | 201.680 | 182.560 | 201.680 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1556.012 | 1566.849 | 1549.853 | 1566.849 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 173.520 | 190.812 | 166.340 | 190.812 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1551.290 | 1585.534 | 1543.610 | 1585.534 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.171 | 0.204 | 0.145 | 0.204 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.250 | 2.349 | 2.179 | 2.349 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.027 | 0.058 | 0.019 | 0.058 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.515 | 0.547 | 0.491 | 0.547 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.055 | 0.085 | 0.041 | 0.085 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.587 | 0.667 | 0.555 | 0.667 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 12.018 | 12.767 | 11.076 | 12.767 | 152.4 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 155.322 | 169.963 | 154.444 | 169.963 | 127.1 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 342.187 | 351.354 | 340.747 | 351.354 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2076.830 | 2478.987 | 2063.975 | 2478.987 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 239.459 | 246.089 | 238.376 | 246.089 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1760.090 | 1830.768 | 1753.706 | 1830.768 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.200 | 0.235 | 0.186 | 0.235 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.436 | 3.678 | 3.402 | 3.678 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.025 | 0.037 | 0.021 | 0.037 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.436 | 1.481 | 1.403 | 1.481 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.056 | 0.082 | 0.044 | 0.082 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.452 | 1.558 | 1.432 | 1.558 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 68.712 | 69.313 | 68.402 | 69.313 | 157.8 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 362.358 | 374.809 | 361.002 | 374.809 | 162.7 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 172.097 | 174.704 | 170.241 | 174.704 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1455.719 | 1518.972 | 1433.049 | 1518.972 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.983 | 159.503 | 154.951 | 159.503 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1435.623 | 1592.062 | 1415.863 | 1592.062 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.224 | 0.247 | 0.211 | 0.247 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.572 | 3.720 | 3.524 | 3.720 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.031 | 0.020 | 0.031 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.635 | 0.665 | 0.615 | 0.665 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.037 | 1.333 | 0.023 | 1.333 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.509 | 0.525 | 0.483 | 0.525 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.471 | 1.559 | 0.447 | 1.559 | 141.7 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 24.805 | 37.503 | 24.577 | 37.503 | 127.1 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 177.303 | 184.228 | 173.543 | 184.228 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1519.433 | 1523.013 | 1498.139 | 1523.013 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.807 | 162.361 | 156.169 | 162.361 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1496.560 | 1563.582 | 1481.935 | 1563.582 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.255 | 0.365 | 0.208 | 0.365 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.694 | 4.033 | 3.619 | 4.033 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.021 | 0.028 | 0.018 | 0.028 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.681 | 0.738 | 0.626 | 0.738 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 1.324 | 0.028 | 1.324 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.538 | 0.553 | 0.512 | 0.553 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.892 | 0.956 | 0.662 | 0.956 | 142.6 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.446 | 69.519 | 67.714 | 69.519 | 127.1 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 171.937 | 182.627 | 167.475 | 182.627 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1424.807 | 1452.841 | 1419.647 | 1452.841 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.221 | 169.342 | 151.493 | 169.342 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1409.187 | 1439.620 | 1408.992 | 1439.620 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.156 | 0.190 | 0.149 | 0.190 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.296 | 2.675 | 2.134 | 2.675 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.030 | 0.018 | 0.030 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.409 | 0.449 | 0.382 | 0.449 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.013 | 0.018 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.438 | 0.474 | 0.419 | 0.474 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.311 | 2.736 | 0.271 | 2.736 | 140.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.363 | 19.897 | 19.340 | 19.897 | 127.1 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 170.165 | 182.379 | 168.225 | 182.379 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1432.842 | 1453.948 | 1421.859 | 1453.948 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.453 | 165.280 | 154.217 | 165.280 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1409.334 | 1432.830 | 1396.028 | 1432.830 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.146 | 0.195 | 0.140 | 0.195 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.180 | 2.362 | 2.115 | 2.362 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.027 | 0.017 | 0.027 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.395 | 0.425 | 0.387 | 0.425 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.013 | 0.020 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.432 | 0.473 | 0.418 | 0.473 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.221 | 2.595 | 0.175 | 2.595 | 142.1 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.425 | 16.709 | 16.291 | 16.709 | 127.1 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 158.212 | 160.273 | 156.365 | 160.273 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1457.718 | 1535.753 | 1399.937 | 1535.753 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.382 | 0.526 | 0.370 | 0.526 | 138.9 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.665 | 26.859 | 16.575 | 26.859 | 127.1 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 26.687 | 27.195 | 26.378 | 27.195 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 86.768 | 93.636 | 86.195 | 93.636 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 7.651 | 8.262 | 7.597 | 8.262 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.087 | 21.610 | 21.065 | 21.610 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 26.681 | 27.665 | 26.466 | 27.665 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 87.471 | 92.367 | 85.773 | 92.367 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 26.689 | 27.174 | 26.595 | 27.174 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.606 | 78.683 | 72.240 | 78.683 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>23:12:00 - cmdstanpy - INFO - Chain [1] start processing<br>23:12:00 - cmdstanpy - INFO - Chain [1] done processing<br>23:12:00 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=68295 data file=/tmp/tmpac00cr1u/2fcfuxjg.json init=/tmp/tmpac00cr1u/k5mc5_71.json output file=/tmp/tmpac00cr1u/prophet_modelsddkhtbh/prophet_model-20261029231200.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpac00cr1u/2fcfuxjg.json<br>init = /tmp/tmpac00cr1u/k5mc5_71.json<br>random<br>  seed = 68295<br>output<br>  file = /tmp/tmpac00cr1u/prophet_modelsddkhtbh/prophet_model-20261029231200.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1339, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1316, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1082, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 860, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 319, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 248, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=68295 data file=/tmp/tmpac00cr1u/2fcfuxjg.json init=/tmp/tmpac00cr1u/k5mc5_71.json output file=/tmp/tmpac00cr1u/prophet_modelsddkhtbh/prophet_model-20261029231200.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>23:12:01 - cmdstanpy - INFO - Chain [1] start processing<br>23:12:01 - cmdstanpy - INFO - Chain [1] done processing<br>23:12:01 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=90168 data file=/tmp/tmpdq41azzb/bahd0s86.json init=/tmp/tmpdq41azzb/pt49j9uv.json output file=/tmp/tmpdq41azzb/prophet_modelmaxi1o15/prophet_model-20261029231201.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpdq41azzb/bahd0s86.json<br>init = /tmp/tmpdq41azzb/pt49j9uv.json<br>random<br>  seed = 90168<br>output<br>  file = /tmp/tmpdq41azzb/prophet_modelmaxi1o15/prophet_model-20261029231201.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1339, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1316, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1082, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 860, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 319, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 248, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=90168 data file=/tmp/tmpdq41azzb/bahd0s86.json init=/tmp/tmpdq41azzb/pt49j9uv.json output file=/tmp/tmpdq41azzb/prophet_modelmaxi1o15/prophet_model-20261029231201.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1339, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1316, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1082, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 863, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 426, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1339, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1316, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1082, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 863, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 426, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `c8e0ac696ab935429e6c9466a88935b409a8da6f`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `country-global-priors-linear`, `country-global-priors-overrides-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `anomalies-linear-defaults-99`, `warm-start-linear-defaults-30-new-rows`, `warm-start-linear-defaults-1-new-row`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`, `evaluation-linear-custom-search`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:bd623c697976c1db3281c474b5cd04635ebdee459563e4916ddc70ca4d297651`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:1590afe8612860fb938dcb91de6e620a3bbfa84ef7e3752109fe9fdb6a7de4f1`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.6`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

