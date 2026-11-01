# Effect Prophet benchmark — 2026-10-30T220529-902Z-9f5b12f5

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
| evaluation-linear-long-history-parallel | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.154e-1 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| linear-regressor-model | equivalent-objective | passed | 4.485e-3 | 1.158e-3 | 1.177e-3 | 3.921e-3 | 4.498e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-linear-regressor-model-intervals-1000 | scalar-process-different-public-work | passed | 4.485e-3 | 1.158e-3 | 1.177e-3 | 3.921e-3 | 4.498e-4 | 0.076 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| evaluation-linear-regressor-model-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.397e-3 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-regressor-model-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.397e-3 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2010 | 13 | 11765 | 23981 |
| country-global-priors-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12854 | 29669 |
| country-global-priors-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12854 | 29669 |
| country-global-priors-overrides-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12827 | 29665 |
| country-global-priors-overrides-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12827 | 29665 |

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
| linear-regressor-model | 0 | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | output-first | n/a |
| linear-regressor-model | 1 | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | output-first | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | 0 | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | output-first | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | 1 | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | output-first | n/a |

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
| linear-regressor-model | 0 | objective | -1.758338e+3 | -1.758391e+3 | 5.336104e-2 | 1.000e-2 |
| linear-regressor-model | 0 | stationarity-residual | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | 1.000e-2 |
| linear-regressor-model | 1 | objective | -1.758338e+3 | -1.758391e+3 | 5.336104e-2 | 1.000e-2 |
| linear-regressor-model | 1 | stationarity-residual | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | 1.000e-2 |
| uncertainty-linear-regressor-model-intervals-1000 | 0 | objective | -1.758338e+3 | -1.758391e+3 | 5.336104e-2 | 1.000e-2 |
| uncertainty-linear-regressor-model-intervals-1000 | 0 | stationarity-residual | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | 1.000e-2 |
| uncertainty-linear-regressor-model-intervals-1000 | 1 | objective | -1.758338e+3 | -1.758391e+3 | 5.336104e-2 | 1.000e-2 |
| uncertainty-linear-regressor-model-intervals-1000 | 1 | stationarity-residual | 1.684844e+4 | 1.105642e+4 | 5.792011e+3 | 1.000e-2 |

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
| uncertainty-linear-regressor-model-intervals-1000 | 256 | 4 | 25 | 64 | 64 | 64 | 1000 | intervals | 67108864 | map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64 / 804afd5985e47268a8ddae3301fffcdaaf9a2afca3f3cdbdab8e3d028286f525 | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Effect runs folds one at a time. Python runs them sequentially too, except in `-threads` and `-processes` phases, which time `cross_validation(parallel=...)` with Prophet's default pools and must return the sequential point rows and search scores exactly. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |
| evaluation-linear-custom-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-long-history-parallel | long-history-v1:piecewise+weekly+yearly+bounded-noise-x20:n=1095:h=365 / 30f02c063165126f62a0964a83fef842d557b54fab6300c692ef69225bb94d41 | linear | 0 | 12 | 10764 | 360 | 26 | 25 | 256 | 19 / 0.8 | horizons | n/a |
| evaluation-linear-regressor-model-point | map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64 / 804afd5985e47268a8ddae3301fffcdaaf9a2afca3f3cdbdab8e3d028286f525 | linear | 0 | 2 | 481 | 14 | 4 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-linear-regressor-model-intervals | map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64 / 804afd5985e47268a8ddae3301fffcdaaf9a2afca3f3cdbdab8e3d028286f525 | linear | 0 | 2 | 481 | 14 | 4 | 25 | 128 | 19 / 0.8 | horizons | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 24.650 | 25.428 | 23.452 | 25.428 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 199.031 | 226.162 | 196.374 | 226.162 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.876 | 10.014 | 7.106 | 10.014 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 30.333 | 32.640 | 30.279 | 32.640 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 13.634 | 14.880 | 13.262 | 14.880 | 149.5 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 167.137 | 184.944 | 166.190 | 184.944 | 129.8 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.012 | 0.020 | 141.5 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.453 | 0.503 | 0.429 | 0.503 | 147.7 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 170.482 | 174.396 | 169.731 | 174.396 | 157.1 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1671.641 | 1939.895 | 1645.791 | 1939.895 | 147.7 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 158.179 | 164.464 | 154.053 | 164.464 | 160.2 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1642.867 | 1660.128 | 1599.860 | 1660.128 | 147.7 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.744 | 0.794 | 0.722 | 0.794 | 157.2 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.296 | 3.466 | 3.257 | 3.466 | 147.7 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.078 | 0.095 | 0.073 | 0.095 | 157.1 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.516 | 0.556 | 0.503 | 0.556 | 147.7 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.002 | 5.269 | 4.917 | 5.269 | 156.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 33.109 | 74.474 | 27.005 | 74.474 | 147.7 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.355 | 5.748 | 5.254 | 5.748 | 154.2 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.912 | 34.200 | 25.759 | 34.200 | 147.7 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.575 | 7.203 | 5.545 | 7.203 | 149.7 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 20.912 | 24.470 | 20.377 | 24.470 | 147.7 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.233 | 0.412 | 0.215 | 0.412 | 150.9 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.397 | 7.728 | 5.165 | 7.728 | 147.7 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.017 | 0.011 | 0.017 | 140.5 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.446 | 0.606 | 0.431 | 0.606 | 128.3 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 170.327 | 176.475 | 165.951 | 176.475 | 154.0 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1446.027 | 1587.640 | 1426.931 | 1587.640 | 128.3 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 158.124 | 167.819 | 155.000 | 167.819 | 154.1 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1490.948 | 1705.691 | 1417.176 | 1705.691 | 128.3 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.380 | 0.463 | 0.368 | 0.463 | 154.1 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 4.024 | 4.882 | 3.865 | 4.882 | 128.3 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.025 | 0.031 | 0.018 | 0.031 | 154.0 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.689 | 1.028 | 0.664 | 1.028 | 128.3 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.745 | 4.562 | 3.678 | 4.562 | 153.9 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.289 | 22.752 | 22.156 | 22.752 | 128.3 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.847 | 3.946 | 3.765 | 3.946 | 153.6 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.103 | 24.793 | 21.883 | 24.793 | 128.3 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.748 | 5.597 | 4.599 | 5.597 | 149.6 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.231 | 17.472 | 17.150 | 17.472 | 128.3 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.154 | 0.159 | 0.130 | 0.159 | 153.4 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.632 | 4.808 | 4.573 | 4.808 | 128.3 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.018 | 0.011 | 0.018 | 139.7 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.445 | 0.468 | 0.432 | 0.468 | 128.3 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 169.175 | 171.828 | 166.827 | 171.828 | 154.2 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1472.365 | 1490.799 | 1424.255 | 1490.799 | 128.3 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 156.165 | 159.608 | 154.855 | 159.608 | 154.4 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1430.611 | 1464.095 | 1422.964 | 1464.095 | 128.3 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.396 | 0.480 | 0.370 | 0.480 | 154.2 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.920 | 4.144 | 3.912 | 4.144 | 128.3 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.035 | 0.017 | 0.035 | 154.2 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.698 | 0.813 | 0.669 | 0.813 | 128.3 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.975 | 4.568 | 3.916 | 4.568 | 154.0 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.932 | 25.477 | 23.529 | 25.477 | 128.3 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.188 | 4.275 | 4.105 | 4.275 | 153.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 23.639 | 25.406 | 22.704 | 25.406 | 128.3 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 4.798 | 5.957 | 4.745 | 5.957 | 150.4 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.213 | 18.600 | 17.831 | 18.600 | 128.3 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.163 | 0.371 | 0.142 | 0.371 | 153.7 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.620 | 4.698 | 4.554 | 4.698 | 128.3 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.048 | 0.054 | 0.045 | 0.054 | 138.7 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.517 | 0.608 | 0.501 | 0.608 | 148.3 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 173.147 | 175.500 | 171.817 | 175.500 | 158.3 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1628.052 | 1723.662 | 1612.756 | 1723.662 | 148.3 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 158.256 | 165.042 | 157.431 | 165.042 | 172.1 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1621.958 | 1639.368 | 1611.624 | 1639.368 | 148.3 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 1.184 | 1.936 | 1.161 | 1.936 | 172.1 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.488 | 4.685 | 4.308 | 4.685 | 148.3 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.129 | 0.161 | 0.101 | 0.161 | 162.1 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.726 | 0.767 | 0.701 | 0.767 | 148.3 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.907 | 5.679 | 4.875 | 5.679 | 154.5 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 33.749 | 35.857 | 32.758 | 35.857 | 148.3 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 5.108 | 6.173 | 5.032 | 6.173 | 151.2 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 33.221 | 36.671 | 32.943 | 36.671 | 148.3 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.680 | 5.962 | 5.364 | 5.962 | 148.7 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 28.713 | 34.417 | 26.608 | 34.417 | 148.3 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.221 | 0.233 | 0.220 | 0.233 | 150.2 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.364 | 6.711 | 6.334 | 6.711 | 148.3 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.048 | 0.304 | 0.034 | 0.304 | 140.6 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.503 | 0.532 | 0.471 | 0.532 | 148.3 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 172.912 | 175.629 | 171.034 | 175.629 | 159.8 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1633.537 | 1727.118 | 1630.904 | 1727.118 | 148.3 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 158.609 | 165.786 | 156.200 | 165.786 | 174.1 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1626.436 | 1656.231 | 1598.470 | 1656.231 | 148.3 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 1.178 | 1.822 | 1.138 | 1.822 | 174.0 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.326 | 4.491 | 4.230 | 4.491 | 148.3 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.139 | 0.160 | 0.112 | 0.160 | 164.3 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.733 | 0.742 | 0.719 | 0.742 | 148.3 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.162 | 6.313 | 4.985 | 6.313 | 156.1 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 34.524 | 34.700 | 34.031 | 34.700 | 148.3 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.286 | 6.166 | 5.210 | 6.166 | 154.7 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 33.267 | 45.486 | 32.862 | 45.486 | 148.3 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 5.729 | 5.985 | 5.574 | 5.985 | 150.5 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 26.982 | 28.244 | 26.874 | 28.244 | 148.3 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.217 | 0.238 | 0.213 | 0.238 | 151.7 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.222 | 6.584 | 6.095 | 6.584 | 148.3 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.028 | 0.013 | 0.028 | 139.0 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.456 | 0.464 | 0.444 | 0.464 | 147.3 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 178.178 | 193.136 | 171.733 | 193.136 | 154.4 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1653.158 | 1854.919 | 1622.877 | 1854.919 | 147.3 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 160.423 | 176.663 | 157.445 | 176.663 | 157.5 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1600.526 | 1640.037 | 1581.283 | 1640.037 | 147.3 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.782 | 0.856 | 0.715 | 0.856 | 154.6 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.989 | 4.102 | 3.905 | 4.102 | 147.3 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.094 | 0.115 | 0.082 | 0.115 | 154.4 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.701 | 0.741 | 0.668 | 0.741 | 147.3 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.828 | 4.917 | 4.446 | 4.917 | 153.3 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.251 | 27.534 | 26.150 | 27.534 | 147.3 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 5.367 | 5.811 | 5.099 | 5.811 | 151.5 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 26.357 | 28.117 | 25.892 | 28.117 | 147.3 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.126 | 5.706 | 4.950 | 5.706 | 148.0 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 21.466 | 21.634 | 20.772 | 21.634 | 147.3 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.281 | 0.324 | 0.263 | 0.324 | 148.9 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.524 | 6.835 | 5.367 | 6.835 | 147.3 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.013 | 0.018 | 138.2 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.455 | 0.494 | 0.442 | 0.494 | 147.3 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 175.134 | 189.325 | 174.786 | 189.325 | 158.8 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1619.289 | 1678.943 | 1597.317 | 1678.943 | 147.3 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.794 | 175.243 | 157.010 | 175.243 | 161.6 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1592.929 | 1650.332 | 1576.034 | 1650.332 | 147.3 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.804 | 0.884 | 0.774 | 0.884 | 158.8 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.859 | 3.993 | 3.794 | 3.993 | 147.3 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.095 | 0.122 | 0.092 | 0.122 | 158.8 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.661 | 0.699 | 0.655 | 0.699 | 147.3 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.872 | 6.378 | 4.793 | 6.378 | 157.8 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.797 | 35.065 | 26.846 | 35.065 | 147.3 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.138 | 6.717 | 5.025 | 6.717 | 155.8 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 26.985 | 27.495 | 26.607 | 27.495 | 147.3 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.774 | 7.931 | 5.368 | 7.931 | 150.3 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.662 | 24.360 | 20.905 | 24.360 | 147.3 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.283 | 0.422 | 0.260 | 0.422 | 151.2 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.511 | 5.540 | 5.442 | 5.540 | 147.3 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 18.189 | 18.451 | 18.107 | 18.451 | 154.3 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 150.928 | 166.351 | 147.646 | 166.351 | 128.3 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 19.281 | 23.388 | 19.127 | 23.388 | 153.5 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 142.912 | 148.478 | 142.462 | 148.478 | 128.3 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.015 | 6.786 | 5.896 | 6.786 | 156.3 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.298 | 30.820 | 30.133 | 30.820 | 128.3 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.182 | 0.236 | 0.168 | 0.236 | 156.8 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.3 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.257 | 0.832 | 0.252 | 0.832 | 156.7 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 128.3 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 20.739 | 23.588 | 20.619 | 23.588 | 155.8 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 152.436 | 159.540 | 151.047 | 159.540 | 128.3 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 10.285 | 11.405 | 10.271 | 11.405 | 143.8 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 78.374 | 83.485 | 77.584 | 83.485 | 128.3 |
| evaluation-linear-long-history-parallel | evaluation-intervals-processes | python-prophet | 4 | 2476.562 | 2609.763 | 2446.476 | 2609.763 | 139.2 |
| evaluation-linear-long-history-parallel | evaluation-intervals-threads | python-prophet | 4 | 1129.494 | 1166.181 | 1109.619 | 1166.181 | 139.2 |
| evaluation-linear-long-history-parallel | evaluation-intervals | effect-prophet | 4 | 947.743 | 958.878 | 944.410 | 958.878 | 199.6 |
| evaluation-linear-long-history-parallel | evaluation-intervals | python-prophet | 4 | 2678.925 | 2749.602 | 2677.382 | 2749.602 | 138.4 |
| evaluation-linear-long-history-parallel | evaluation-point-processes | python-prophet | 4 | 2435.254 | 2467.290 | 2426.068 | 2467.290 | 138.1 |
| evaluation-linear-long-history-parallel | evaluation-point-threads | python-prophet | 4 | 1089.026 | 1189.454 | 1063.991 | 1189.454 | 137.9 |
| evaluation-linear-long-history-parallel | evaluation-point | effect-prophet | 4 | 943.651 | 966.583 | 943.565 | 966.583 | 190.1 |
| evaluation-linear-long-history-parallel | evaluation-point | python-prophet | 4 | 2597.375 | 2645.358 | 2568.777 | 2645.358 | 128.3 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 183.100 | 191.980 | 180.633 | 191.980 | 154.2 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1526.083 | 1542.162 | 1521.934 | 1542.162 | 128.3 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.018 | 1.629 | 1.012 | 1.629 | 154.1 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.125 | 1.194 | 1.094 | 1.194 | 128.3 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.008 | 0.014 | 0.007 | 0.014 | 132.0 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.428 | 0.472 | 0.423 | 0.472 | 128.3 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.079 | 1.578 | 0.053 | 1.578 | 154.1 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.396 | 5.518 | 5.359 | 5.518 | 128.3 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.016 | 1.182 | 0.857 | 1.182 | 136.2 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.683 | 0.713 | 0.669 | 0.713 | 128.3 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 10.823 | 11.669 | 10.353 | 11.669 | 149.3 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 74.670 | 87.840 | 72.759 | 87.840 | 128.3 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 51.795 | 52.978 | 51.334 | 52.978 | 155.0 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 249.338 | 279.571 | 249.137 | 279.571 | 128.3 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 237.571 | 274.833 | 233.849 | 274.833 | 159.0 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1620.872 | 1702.007 | 1609.983 | 1702.007 | 128.3 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 2.524 | 3.124 | 2.440 | 3.124 | 157.2 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.369 | 1.410 | 1.357 | 1.410 | 128.3 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.154 | 0.225 | 0.131 | 0.225 | 134.6 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.626 | 0.738 | 0.544 | 0.738 | 128.3 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.082 | 0.109 | 0.066 | 0.109 | 156.7 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.346 | 6.628 | 5.339 | 6.628 | 128.3 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.318 | 3.457 | 2.219 | 3.457 | 142.1 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.801 | 0.837 | 0.768 | 0.837 | 128.3 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 51.627 | 52.757 | 51.482 | 52.757 | 156.1 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 180.266 | 184.243 | 179.413 | 184.243 | 128.3 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.120 | 6.366 | 6.022 | 6.366 | 151.9 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 30.030 | 30.154 | 29.745 | 30.154 | 128.3 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.181 | 0.383 | 0.172 | 0.383 | 152.9 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 128.3 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.222 | 0.266 | 0.210 | 0.266 | 152.4 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 128.3 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 19.014 | 23.086 | 18.686 | 23.086 | 151.2 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 149.837 | 151.790 | 149.114 | 151.790 | 128.3 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 0.973 | 2.771 | 0.957 | 2.771 | 156.3 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.411 | 1.739 | 1.357 | 1.739 | 128.3 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.804 | 4.005 | 3.724 | 4.005 | 157.1 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.001 | 23.176 | 21.787 | 23.176 | 128.3 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 1.042 | 1.096 | 0.975 | 1.096 | 136.3 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.957 | 0.999 | 0.887 | 0.999 | 128.3 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 6.493 | 7.546 | 5.775 | 7.546 | 149.3 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 53.176 | 55.377 | 53.044 | 55.377 | 128.3 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.166 | 0.196 | 0.157 | 0.196 | 157.3 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.3 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.236 | 0.307 | 0.228 | 0.307 | 157.3 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.007 | 0.011 | 128.3 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 6.076 | 6.381 | 6.036 | 6.381 | 156.8 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 53.337 | 59.680 | 53.050 | 59.680 | 128.3 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.022 | 0.064 | 0.012 | 0.091 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.558 | 0.579 | 0.536 | 0.727 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.522 | 0.634 | 0.301 | 0.678 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.643 | 2.704 | 2.573 | 2.789 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.026 | 0.029 | 0.025 | 0.029 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.524 | 0.527 | 0.479 | 0.527 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 183.480 | 208.456 | 170.918 | 208.456 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1477.722 | 1673.823 | 1464.438 | 1673.823 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 156.331 | 195.386 | 153.014 | 195.386 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1463.874 | 1490.822 | 1448.490 | 1490.822 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.138 | 0.185 | 0.130 | 0.185 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.294 | 2.496 | 2.248 | 2.496 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.026 | 0.029 | 0.024 | 0.029 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.560 | 0.600 | 0.539 | 0.600 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.405 | 7.470 | 6.255 | 7.470 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.619 | 18.160 | 17.211 | 18.160 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.641 | 8.215 | 6.418 | 8.215 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 17.371 | 18.797 | 17.134 | 18.797 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 7.097 | 9.272 | 6.858 | 9.272 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.554 | 14.399 | 13.241 | 14.399 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.275 | 0.692 | 0.248 | 0.692 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.122 | 3.285 | 3.079 | 3.285 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.035 | 0.047 | 0.032 | 0.047 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.544 | 0.594 | 0.537 | 0.594 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 189.211 | 196.030 | 187.340 | 196.030 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1501.416 | 1528.622 | 1492.042 | 1528.622 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 156.649 | 193.282 | 150.564 | 193.282 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1419.393 | 1472.522 | 1415.174 | 1472.522 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.126 | 0.146 | 0.118 | 0.146 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.319 | 2.612 | 2.306 | 2.612 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.046 | 0.089 | 0.036 | 0.089 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.622 | 0.709 | 0.593 | 0.709 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.951 | 26.557 | 25.520 | 26.557 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 89.460 | 94.635 | 88.921 | 94.635 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 26.318 | 26.815 | 25.648 | 26.815 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 88.576 | 89.965 | 88.201 | 89.965 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.876 | 29.044 | 25.717 | 29.044 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 86.406 | 100.677 | 84.990 | 100.677 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.311 | 0.331 | 0.307 | 0.331 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.180 | 5.080 | 3.072 | 5.080 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.016 | 0.005 | 0.016 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.425 | 0.533 | 0.401 | 0.533 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 184.937 | 191.757 | 181.843 | 191.757 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1510.015 | 1558.485 | 1472.587 | 1558.485 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 154.154 | 163.635 | 151.032 | 163.635 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1437.859 | 1530.146 | 1425.959 | 1530.146 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.173 | 1.581 | 0.163 | 1.581 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.072 | 2.212 | 2.004 | 2.212 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.030 | 0.033 | 0.029 | 0.033 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.374 | 0.430 | 0.351 | 0.430 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.033 | 19.328 | 18.016 | 19.328 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 64.200 | 65.495 | 63.441 | 65.495 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.483 | 18.780 | 18.127 | 18.780 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 63.792 | 64.882 | 62.047 | 64.882 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.626 | 19.573 | 18.007 | 19.573 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 60.998 | 62.184 | 60.575 | 62.184 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.191 | 0.389 | 0.165 | 0.389 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.133 | 3.288 | 3.071 | 3.288 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.042 | 0.055 | 0.037 | 0.055 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.549 | 0.556 | 0.518 | 0.556 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 171.965 | 184.681 | 169.899 | 184.681 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1467.313 | 1768.746 | 1463.955 | 1768.746 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 155.512 | 159.169 | 154.556 | 159.169 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1451.660 | 1478.692 | 1451.596 | 1478.692 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.110 | 0.160 | 0.109 | 0.160 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.817 | 4.077 | 3.627 | 4.077 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.032 | 0.034 | 0.032 | 0.034 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.675 | 0.720 | 0.659 | 0.720 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.618 | 5.457 | 4.617 | 5.457 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.189 | 29.101 | 27.836 | 29.101 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.819 | 4.926 | 4.769 | 4.926 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.667 | 28.324 | 27.445 | 28.324 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.320 | 5.452 | 5.299 | 5.452 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 23.200 | 23.300 | 22.685 | 23.300 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.286 | 0.474 | 0.275 | 0.474 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.734 | 4.859 | 4.685 | 4.859 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.024 | 0.016 | 0.024 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.491 | 0.650 | 0.489 | 0.650 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 174.205 | 177.428 | 169.574 | 177.428 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1462.055 | 1469.112 | 1453.672 | 1469.112 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.781 | 156.486 | 152.075 | 156.486 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1437.654 | 1465.148 | 1428.900 | 1465.148 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.118 | 0.146 | 0.107 | 0.146 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.098 | 2.169 | 2.056 | 2.169 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.024 | 0.028 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.402 | 0.451 | 0.399 | 0.451 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.839 | 4.998 | 4.833 | 4.998 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 28.948 | 35.765 | 27.445 | 35.765 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.418 | 6.892 | 5.307 | 6.892 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.495 | 30.095 | 26.383 | 30.095 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.178 | 5.307 | 5.174 | 5.307 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 25.947 | 29.040 | 25.175 | 29.040 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.246 | 0.286 | 0.224 | 0.286 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.167 | 3.308 | 3.100 | 3.308 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.017 | 0.016 | 0.017 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.495 | 0.993 | 0.457 | 0.993 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 168.002 | 174.541 | 167.245 | 174.541 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1492.561 | 1575.697 | 1456.893 | 1575.697 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.797 | 168.345 | 154.469 | 168.345 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1443.020 | 1482.299 | 1434.883 | 1482.299 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.112 | 0.141 | 0.108 | 0.141 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.150 | 2.271 | 2.122 | 2.271 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.024 | 0.026 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.445 | 0.538 | 0.427 | 0.538 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.708 | 4.739 | 4.683 | 4.739 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.887 | 30.764 | 26.789 | 30.764 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.242 | 5.562 | 5.198 | 5.562 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.866 | 27.218 | 26.410 | 27.218 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.096 | 5.332 | 5.077 | 5.332 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.553 | 24.576 | 23.433 | 24.576 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.240 | 0.253 | 0.236 | 0.253 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.070 | 3.169 | 3.034 | 3.169 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.128 | 0.148 | 0.125 | 0.148 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.675 | 0.718 | 0.668 | 0.718 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 203.796 | 221.562 | 198.935 | 221.562 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1613.681 | 1650.402 | 1588.793 | 1650.402 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 28.904 | 29.307 | 28.393 | 29.307 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 121.636 | 126.996 | 118.999 | 126.996 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 28.082 | 29.157 | 27.585 | 29.157 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 123.686 | 139.503 | 118.182 | 139.503 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 28.581 | 29.490 | 27.854 | 29.490 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 105.730 | 115.418 | 104.010 | 115.418 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.695 | 1.121 | 0.657 | 1.121 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 16.797 | 18.697 | 16.702 | 18.697 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.071 | 0.098 | 0.069 | 0.098 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.630 | 0.642 | 0.607 | 0.642 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 167.265 | 169.650 | 163.791 | 169.650 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1456.789 | 1532.076 | 1434.365 | 1532.076 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 156.827 | 162.568 | 154.002 | 162.568 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1447.999 | 1457.547 | 1427.952 | 1457.547 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.106 | 0.147 | 0.092 | 0.147 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.709 | 3.041 | 2.579 | 3.041 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.021 | 0.027 | 0.016 | 0.027 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.636 | 0.680 | 0.628 | 0.680 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.528 | 2.860 | 2.489 | 2.860 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.523 | 17.698 | 16.109 | 17.698 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.733 | 2.998 | 2.622 | 2.998 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.616 | 16.039 | 15.433 | 16.039 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.698 | 4.862 | 2.475 | 4.862 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 11.786 | 12.041 | 11.674 | 12.041 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.415 | 0.763 | 0.390 | 0.763 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.765 | 3.788 | 3.728 | 3.788 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.018 | 0.014 | 0.018 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.447 | 0.465 | 0.422 | 0.465 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 169.462 | 170.611 | 165.357 | 170.611 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1425.920 | 1467.074 | 1423.942 | 1467.074 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 159.045 | 170.004 | 153.134 | 170.004 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1423.581 | 1469.862 | 1391.470 | 1469.862 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.166 | 0.240 | 0.137 | 0.240 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.249 | 3.557 | 3.209 | 3.557 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.021 | 0.025 | 0.020 | 0.025 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.600 | 0.628 | 0.566 | 0.628 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.627 | 7.075 | 6.466 | 7.075 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 33.559 | 34.190 | 33.312 | 34.190 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.728 | 6.850 | 6.561 | 6.850 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 32.981 | 33.106 | 32.863 | 33.106 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.050 | 7.227 | 6.846 | 7.227 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.234 | 29.900 | 28.994 | 29.900 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.339 | 0.389 | 0.323 | 0.389 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.181 | 4.200 | 4.153 | 4.200 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.007 | 0.005 | 0.007 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.427 | 0.463 | 0.411 | 0.463 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 169.362 | 176.456 | 165.601 | 176.456 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1470.836 | 1517.592 | 1417.662 | 1517.592 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 153.727 | 157.071 | 152.253 | 157.071 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1436.980 | 1506.298 | 1418.317 | 1506.298 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.106 | 0.116 | 0.094 | 0.116 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 1.991 | 2.165 | 1.912 | 2.165 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.023 | 0.036 | 0.015 | 0.036 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.351 | 0.387 | 0.328 | 0.387 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.751 | 1.812 | 1.692 | 1.812 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.047 | 15.039 | 13.905 | 15.039 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.811 | 1.901 | 1.722 | 1.901 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.904 | 16.019 | 13.376 | 16.019 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 2.190 | 3.278 | 1.802 | 3.278 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.757 | 10.966 | 10.512 | 10.966 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.156 | 0.171 | 0.154 | 0.171 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.702 | 2.865 | 2.665 | 2.865 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.200 | 0.707 | 0.196 | 0.707 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.119 | 1.167 | 1.094 | 1.167 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 187.118 | 191.469 | 187.027 | 191.469 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1445.754 | 1475.136 | 1432.742 | 1475.136 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 165.032 | 167.614 | 164.458 | 167.614 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1437.846 | 1458.217 | 1421.333 | 1458.217 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.306 | 0.325 | 0.300 | 0.325 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.830 | 6.120 | 5.624 | 6.120 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.034 | 0.026 | 0.034 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.686 | 1.932 | 1.637 | 1.932 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 10.582 | 11.686 | 10.526 | 11.686 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.099 | 44.824 | 43.719 | 44.824 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.341 | 11.989 | 11.080 | 11.989 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 42.957 | 43.435 | 42.956 | 43.435 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.783 | 14.693 | 11.710 | 14.693 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 36.801 | 40.665 | 36.398 | 40.665 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 1.379 | 1.615 | 1.327 | 1.615 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.011 | 6.343 | 5.972 | 6.343 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.019 | 0.009 | 0.019 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.458 | 0.546 | 0.425 | 0.546 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 165.401 | 178.866 | 161.051 | 178.866 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1447.083 | 1528.558 | 1418.666 | 1528.558 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 157.136 | 166.002 | 152.455 | 166.002 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1414.917 | 1429.772 | 1401.901 | 1429.772 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.141 | 0.171 | 0.128 | 0.171 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.537 | 3.742 | 3.466 | 3.742 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.024 | 0.029 | 0.018 | 0.029 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.601 | 0.639 | 0.565 | 0.639 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.657 | 3.029 | 1.406 | 3.029 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.439 | 16.835 | 16.209 | 16.835 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.723 | 1.779 | 1.647 | 1.779 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.867 | 16.388 | 15.742 | 16.388 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.682 | 3.236 | 1.615 | 3.236 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.045 | 11.355 | 10.846 | 11.355 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.155 | 0.165 | 0.141 | 0.165 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.808 | 4.979 | 4.747 | 4.979 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.136 | 0.155 | 0.096 | 0.155 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.650 | 0.683 | 0.637 | 0.683 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 168.285 | 169.929 | 164.647 | 169.929 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1411.242 | 1526.723 | 1404.451 | 1526.723 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 154.924 | 165.821 | 153.898 | 165.821 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1407.626 | 1703.810 | 1401.986 | 1703.810 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.117 | 0.198 | 0.110 | 0.198 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.967 | 3.170 | 2.945 | 3.170 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.024 | 0.031 | 0.019 | 0.031 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.765 | 0.794 | 0.708 | 0.794 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.588 | 2.877 | 2.448 | 2.877 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.452 | 14.666 | 14.235 | 14.666 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.735 | 3.033 | 2.672 | 3.033 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.751 | 13.868 | 13.558 | 13.868 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.607 | 2.758 | 2.501 | 2.758 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.125 | 10.862 | 10.020 | 10.862 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.465 | 0.497 | 0.447 | 0.497 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.532 | 3.561 | 3.490 | 3.561 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.027 | 1.590 | 0.023 | 1.590 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.549 | 0.571 | 0.524 | 0.571 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 155.091 | 174.136 | 154.217 | 174.136 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1475.704 | 1542.830 | 1432.927 | 1542.830 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.101 | 0.105 | 0.081 | 0.105 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.598 | 2.836 | 2.182 | 2.836 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.019 | 0.020 | 0.014 | 0.020 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.514 | 0.551 | 0.488 | 0.551 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.374 | 1.409 | 1.340 | 1.409 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 13.036 | 14.406 | 12.352 | 14.406 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.469 | 1.583 | 1.411 | 1.583 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.719 | 12.332 | 11.293 | 12.332 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.190 | 2.786 | 1.905 | 2.786 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.484 | 8.735 | 7.821 | 8.735 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.241 | 0.334 | 0.229 | 0.334 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.121 | 3.234 | 3.053 | 3.234 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.243 | 164.519 | 154.338 | 164.519 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1450.312 | 1472.163 | 1429.091 | 1472.163 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.200 | 0.215 | 0.192 | 0.215 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.504 | 2.650 | 2.429 | 2.650 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.024 | 0.057 | 0.022 | 0.057 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.457 | 0.467 | 0.448 | 0.467 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.584 | 34.277 | 32.424 | 34.277 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 110.843 | 112.393 | 110.144 | 112.393 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.248 | 0.584 | 0.238 | 0.584 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.371 | 3.483 | 3.347 | 3.483 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 165.728 | 200.481 | 154.949 | 200.481 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1459.312 | 1531.814 | 1449.881 | 1531.814 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.203 | 0.256 | 0.190 | 0.256 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.001 | 2.183 | 1.982 | 2.183 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.075 | 0.107 | 0.029 | 0.107 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.456 | 0.585 | 0.447 | 0.585 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.588 | 30.199 | 26.040 | 30.199 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 84.527 | 85.559 | 84.207 | 85.559 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.227 | 0.257 | 0.177 | 0.257 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.747 | 2.773 | 2.703 | 2.773 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 154.638 | 164.461 | 152.547 | 164.461 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1477.737 | 1487.073 | 1429.197 | 1487.073 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.152 | 0.195 | 0.148 | 0.195 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.013 | 2.088 | 2.002 | 2.088 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.036 | 0.020 | 0.036 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.384 | 0.394 | 0.369 | 0.394 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.398 | 5.116 | 3.383 | 5.116 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 20.111 | 25.806 | 19.070 | 25.806 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.163 | 0.174 | 0.152 | 0.174 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.641 | 2.699 | 2.627 | 2.699 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 152.055 | 156.237 | 151.233 | 156.237 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1455.072 | 1475.043 | 1427.607 | 1475.043 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.189 | 0.210 | 0.178 | 0.210 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.013 | 2.177 | 1.988 | 2.177 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.022 | 0.043 | 0.021 | 0.043 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.413 | 0.428 | 0.394 | 0.428 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 31.833 | 33.604 | 30.488 | 33.604 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 107.572 | 110.120 | 105.043 | 110.120 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.189 | 0.281 | 0.189 | 0.281 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.622 | 2.779 | 2.598 | 2.779 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 152.543 | 155.352 | 152.024 | 155.352 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1436.124 | 1464.687 | 1414.918 | 1464.687 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.160 | 0.193 | 0.154 | 0.193 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.011 | 2.034 | 1.983 | 2.034 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.030 | 0.037 | 0.019 | 0.037 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.404 | 0.465 | 0.378 | 0.465 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.957 | 6.601 | 3.871 | 6.601 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.377 | 22.830 | 20.244 | 22.830 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.147 | 0.179 | 0.142 | 0.179 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.589 | 5.063 | 2.567 | 5.063 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 155.117 | 160.440 | 154.041 | 160.440 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1435.384 | 1480.446 | 1428.092 | 1480.446 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.175 | 0.201 | 0.169 | 0.201 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.017 | 2.065 | 2.016 | 2.065 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.027 | 0.054 | 0.021 | 0.054 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.408 | 0.448 | 0.404 | 0.448 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 30.668 | 32.375 | 30.631 | 32.375 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 106.040 | 107.111 | 105.597 | 107.111 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.196 | 0.277 | 0.175 | 0.277 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.700 | 2.724 | 2.664 | 2.724 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 150.339 | 162.016 | 150.091 | 162.016 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1424.029 | 1469.042 | 1421.163 | 1469.042 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.151 | 0.187 | 0.141 | 0.187 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.034 | 2.253 | 2.003 | 2.253 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.039 | 0.019 | 0.039 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.397 | 0.472 | 0.390 | 0.472 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.781 | 5.545 | 3.598 | 5.545 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 20.861 | 26.561 | 20.396 | 26.561 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.163 | 0.179 | 0.159 | 0.179 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.672 | 2.864 | 2.630 | 2.864 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 186.252 | 199.675 | 180.571 | 199.675 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1631.969 | 1874.778 | 1623.493 | 1874.778 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.675 | 192.966 | 170.150 | 192.966 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1625.795 | 1640.332 | 1606.138 | 1640.332 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.168 | 0.176 | 0.159 | 0.176 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.258 | 2.370 | 2.205 | 2.370 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.019 | 0.028 | 0.018 | 0.028 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.528 | 0.567 | 0.526 | 0.567 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.058 | 0.040 | 0.058 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.642 | 0.677 | 0.637 | 0.677 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 12.367 | 15.206 | 11.589 | 15.206 | 152.5 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 167.205 | 207.816 | 156.178 | 207.816 | 128.3 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 342.419 | 347.312 | 341.678 | 347.312 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2156.134 | 2196.042 | 2123.992 | 2196.042 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 242.229 | 269.360 | 240.515 | 269.360 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1859.457 | 1936.042 | 1843.710 | 1936.042 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.213 | 0.308 | 0.201 | 0.308 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.581 | 3.740 | 3.523 | 3.740 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.027 | 0.039 | 0.021 | 0.039 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.437 | 1.616 | 1.429 | 1.616 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.055 | 0.064 | 0.054 | 0.064 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.420 | 1.589 | 1.400 | 1.589 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 70.071 | 70.636 | 68.562 | 70.636 | 158.5 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 377.303 | 385.193 | 372.652 | 385.193 | 162.7 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 171.431 | 175.356 | 167.456 | 175.356 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1493.400 | 1539.786 | 1481.409 | 1539.786 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.613 | 159.040 | 154.964 | 159.040 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1473.621 | 1509.257 | 1468.275 | 1509.257 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.191 | 0.328 | 0.180 | 0.328 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.626 | 3.858 | 3.539 | 3.858 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.029 | 0.038 | 0.023 | 0.038 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.681 | 0.736 | 0.664 | 0.736 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.036 | 0.043 | 0.025 | 0.043 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.524 | 0.542 | 0.513 | 0.542 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.524 | 1.605 | 0.472 | 1.605 | 138.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 24.731 | 38.688 | 24.624 | 38.688 | 128.3 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 172.718 | 186.093 | 170.093 | 186.093 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1534.901 | 1584.048 | 1509.556 | 1584.048 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.087 | 159.553 | 157.406 | 159.553 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1529.060 | 1556.818 | 1515.539 | 1556.818 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.235 | 2.133 | 0.232 | 2.133 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.716 | 4.101 | 3.641 | 4.101 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.028 | 0.035 | 0.027 | 0.035 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.672 | 0.697 | 0.634 | 0.697 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.037 | 0.057 | 0.024 | 0.057 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.518 | 0.558 | 0.504 | 0.558 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.803 | 0.984 | 0.740 | 0.984 | 145.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.431 | 72.084 | 67.762 | 72.084 | 128.3 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 168.239 | 182.578 | 165.928 | 182.578 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1516.967 | 1567.962 | 1486.126 | 1567.962 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.662 | 157.675 | 153.250 | 157.675 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1460.895 | 1482.881 | 1457.223 | 1482.881 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.172 | 0.194 | 0.157 | 0.194 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.217 | 2.586 | 2.148 | 2.586 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.027 | 0.018 | 0.027 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.439 | 0.488 | 0.412 | 0.488 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.019 | 0.010 | 0.019 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.459 | 0.552 | 0.427 | 0.552 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.315 | 1.590 | 0.253 | 1.590 | 138.7 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.911 | 21.892 | 19.550 | 21.892 | 128.3 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 169.288 | 172.401 | 165.276 | 172.401 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1485.995 | 1528.545 | 1464.581 | 1528.545 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.531 | 156.652 | 152.754 | 156.652 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1479.765 | 1505.634 | 1468.038 | 1505.634 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.143 | 0.171 | 0.141 | 0.171 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.240 | 2.636 | 2.133 | 2.636 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.034 | 0.018 | 0.034 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.439 | 0.466 | 0.409 | 0.466 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.468 | 0.519 | 0.452 | 0.519 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.232 | 1.209 | 0.182 | 1.209 | 136.6 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.706 | 17.045 | 16.457 | 17.045 | 128.3 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 219.755 | 335.846 | 213.377 | 335.846 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1868.795 | 2131.019 | 1820.435 | 2131.019 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.125 | 0.157 | 0.106 | 0.157 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.674 | 0.727 | 0.649 | 0.727 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 8.968 | 10.281 | 7.758 | 10.281 | 162.5 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 255.482 | 278.930 | 251.108 | 278.930 | 128.3 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 154.810 | 156.942 | 154.687 | 156.942 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1464.754 | 1515.977 | 1449.396 | 1515.977 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.508 | 0.615 | 0.396 | 0.615 | 141.0 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 17.070 | 24.339 | 16.771 | 24.339 | 128.3 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 27.486 | 29.605 | 25.775 | 29.605 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 87.625 | 91.616 | 85.896 | 91.616 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 8.784 | 9.974 | 7.825 | 9.974 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.490 | 22.464 | 21.043 | 22.464 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 26.473 | 29.227 | 25.926 | 29.227 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 87.368 | 93.779 | 87.056 | 93.779 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 27.747 | 29.405 | 26.342 | 29.405 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.445 | 74.166 | 72.483 | 74.166 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>22:09:10 - cmdstanpy - INFO - Chain [1] start processing<br>22:09:10 - cmdstanpy - INFO - Chain [1] done processing<br>22:09:10 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=67679 data file=/tmp/tmpgwezirjm/yssvvg2i.json init=/tmp/tmpgwezirjm/__8llta9.json output file=/tmp/tmpgwezirjm/prophet_model7d3uby9f/prophet_model-20261030220910.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpgwezirjm/yssvvg2i.json<br>init = /tmp/tmpgwezirjm/__8llta9.json<br>random<br>  seed = 67679<br>output<br>  file = /tmp/tmpgwezirjm/prophet_model7d3uby9f/prophet_model-20261030220910.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=67679 data file=/tmp/tmpgwezirjm/yssvvg2i.json init=/tmp/tmpgwezirjm/__8llta9.json output file=/tmp/tmpgwezirjm/prophet_model7d3uby9f/prophet_model-20261030220910.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>22:09:12 - cmdstanpy - INFO - Chain [1] start processing<br>22:09:12 - cmdstanpy - INFO - Chain [1] done processing<br>22:09:12 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=62164 data file=/tmp/tmp5k_pd7nx/2ihpvr7g.json init=/tmp/tmp5k_pd7nx/looaxbbu.json output file=/tmp/tmp5k_pd7nx/prophet_modelesob5vn1/prophet_model-20261030220912.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp5k_pd7nx/2ihpvr7g.json<br>init = /tmp/tmp5k_pd7nx/looaxbbu.json<br>random<br>  seed = 62164<br>output<br>  file = /tmp/tmp5k_pd7nx/prophet_modelesob5vn1/prophet_model-20261030220912.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=62164 data file=/tmp/tmp5k_pd7nx/2ihpvr7g.json init=/tmp/tmp5k_pd7nx/looaxbbu.json output file=/tmp/tmp5k_pd7nx/prophet_modelesob5vn1/prophet_model-20261030220912.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `9f5b12f53b9529aae2350a864e2c3c632a658951`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `country-global-priors-linear`, `country-global-priors-overrides-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `anomalies-linear-defaults-99`, `warm-start-linear-defaults-30-new-rows`, `warm-start-linear-defaults-1-new-row`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`, `evaluation-linear-custom-search`, `evaluation-linear-long-history-parallel`, `linear-regressor-model`, `uncertainty-linear-regressor-model-intervals-1000`, `evaluation-linear-regressor-model-point`, `evaluation-linear-regressor-model-intervals`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:ef20b2858f79a9dbdfa51029f7a079f79b53a70753cb01d859109a068f58850c`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:5a84d9680b8883e4107a99ca332320d8b42e431fe6e4e0f42b78b76b079484c7`

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
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `cross-validation-thread-workers=8`, `cross-validation-process-workers=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

