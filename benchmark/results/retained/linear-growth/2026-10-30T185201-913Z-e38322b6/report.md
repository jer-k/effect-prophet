# Effect Prophet benchmark — 2026-10-30T185201-913Z-e38322b6

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

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |
| evaluation-linear-custom-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-regressor-model-point | map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64 / 804afd5985e47268a8ddae3301fffcdaaf9a2afca3f3cdbdab8e3d028286f525 | linear | 0 | 2 | 481 | 14 | 4 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-linear-regressor-model-intervals | map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64 / 804afd5985e47268a8ddae3301fffcdaaf9a2afca3f3cdbdab8e3d028286f525 | linear | 0 | 2 | 481 | 14 | 4 | 25 | 128 | 19 / 0.8 | horizons | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 24.227 | 24.993 | 23.688 | 24.993 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 204.129 | 221.208 | 203.540 | 221.208 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.339 | 9.945 | 6.766 | 9.945 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 30.897 | 32.824 | 30.660 | 32.824 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 12.838 | 13.297 | 12.715 | 13.297 | 151.8 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 179.520 | 202.405 | 168.834 | 202.405 | 129.9 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.030 | 0.013 | 0.030 | 141.3 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.486 | 0.696 | 0.451 | 0.696 | 147.7 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 195.083 | 209.666 | 182.338 | 209.666 | 157.0 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1804.640 | 2236.388 | 1743.432 | 2236.388 | 147.7 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 169.785 | 194.292 | 165.139 | 194.292 | 160.0 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1650.641 | 1956.439 | 1643.636 | 1956.439 | 147.7 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.897 | 0.957 | 0.843 | 0.957 | 157.1 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.505 | 3.834 | 3.340 | 3.834 | 147.7 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.100 | 0.131 | 0.082 | 0.131 | 157.0 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.564 | 0.597 | 0.531 | 0.597 | 147.7 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.280 | 6.008 | 5.115 | 6.008 | 156.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 31.069 | 31.927 | 29.952 | 31.927 | 147.7 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 6.080 | 6.997 | 5.309 | 6.997 | 154.0 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.835 | 31.151 | 26.808 | 31.151 | 147.7 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.962 | 7.926 | 5.698 | 7.926 | 149.8 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 21.859 | 31.224 | 21.562 | 31.224 | 147.7 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.366 | 0.421 | 0.294 | 0.421 | 150.8 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.471 | 6.679 | 5.302 | 6.679 | 147.7 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.015 | 0.010 | 0.015 | 138.6 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.477 | 0.453 | 0.477 | 128.0 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 181.424 | 204.649 | 173.457 | 204.649 | 152.7 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1484.059 | 1661.360 | 1446.224 | 1661.360 | 128.0 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 167.775 | 173.569 | 159.733 | 173.569 | 153.0 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1476.179 | 1563.475 | 1455.689 | 1563.475 | 128.0 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.493 | 0.551 | 0.401 | 0.551 | 152.8 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.933 | 5.434 | 3.864 | 5.434 | 128.0 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.023 | 0.034 | 0.017 | 0.034 | 152.7 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.696 | 0.934 | 0.678 | 0.934 | 128.0 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.282 | 5.286 | 3.846 | 5.286 | 152.5 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 23.690 | 25.037 | 23.138 | 25.037 | 128.0 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.133 | 4.640 | 3.941 | 4.640 | 152.2 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.540 | 29.055 | 22.314 | 29.055 | 128.0 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.749 | 5.228 | 4.538 | 5.228 | 146.6 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.671 | 18.590 | 17.502 | 18.590 | 128.0 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.146 | 0.185 | 0.131 | 0.185 | 151.9 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.702 | 4.779 | 4.665 | 4.779 | 128.0 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.322 | 0.014 | 0.322 | 136.1 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.507 | 0.455 | 0.507 | 128.0 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 189.033 | 230.218 | 179.328 | 230.218 | 157.4 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1503.218 | 1549.466 | 1454.638 | 1549.466 | 128.0 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 167.669 | 176.414 | 161.665 | 176.414 | 157.5 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1536.573 | 2069.981 | 1479.454 | 2069.981 | 128.0 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.429 | 0.628 | 0.412 | 0.628 | 157.4 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 4.148 | 4.475 | 4.014 | 4.475 | 128.0 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.031 | 0.044 | 0.018 | 0.044 | 157.4 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.716 | 0.762 | 0.711 | 0.762 | 128.0 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.078 | 5.982 | 4.306 | 5.982 | 157.3 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 24.742 | 26.896 | 24.117 | 26.896 | 128.0 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.816 | 6.080 | 4.254 | 6.080 | 157.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 24.336 | 28.583 | 23.081 | 28.583 | 128.0 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 6.660 | 16.890 | 6.152 | 16.890 | 150.9 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 20.354 | 22.628 | 18.718 | 22.628 | 128.0 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.223 | 0.415 | 0.175 | 0.415 | 157.0 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.889 | 6.378 | 4.867 | 6.378 | 128.0 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.039 | 0.066 | 0.023 | 0.066 | 137.7 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.517 | 0.569 | 0.507 | 0.569 | 148.3 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 181.165 | 189.552 | 179.179 | 189.552 | 158.7 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1716.101 | 1938.035 | 1693.866 | 1938.035 | 148.3 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 166.825 | 193.923 | 165.496 | 193.923 | 172.8 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1664.108 | 1704.837 | 1609.845 | 1704.837 | 148.3 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 1.304 | 2.093 | 1.198 | 2.093 | 172.8 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.445 | 6.353 | 4.354 | 6.353 | 148.3 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.150 | 0.155 | 0.115 | 0.155 | 162.7 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.753 | 0.836 | 0.749 | 0.836 | 148.3 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.149 | 6.763 | 5.112 | 6.763 | 155.0 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 34.548 | 42.036 | 34.016 | 42.036 | 148.3 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 6.096 | 10.813 | 5.051 | 10.813 | 150.9 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 35.393 | 40.935 | 33.587 | 40.935 | 148.3 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.558 | 5.779 | 5.540 | 5.779 | 147.3 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 27.590 | 32.029 | 27.491 | 32.029 | 148.3 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.226 | 0.253 | 0.215 | 0.253 | 149.1 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 7.040 | 8.686 | 6.430 | 8.686 | 148.3 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.043 | 0.059 | 0.025 | 0.059 | 143.7 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.515 | 1.283 | 0.488 | 1.283 | 148.3 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 182.106 | 192.134 | 175.090 | 192.134 | 162.4 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1723.796 | 1998.900 | 1700.604 | 1998.900 | 148.3 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 169.688 | 176.838 | 166.917 | 176.838 | 176.2 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1703.364 | 1989.497 | 1634.914 | 1989.497 | 148.3 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 0.957 | 2.028 | 0.853 | 2.028 | 176.2 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.472 | 5.340 | 4.300 | 5.340 | 148.3 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.137 | 0.172 | 0.129 | 0.172 | 166.4 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.770 | 0.832 | 0.765 | 0.832 | 148.3 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.834 | 7.719 | 5.334 | 7.719 | 158.7 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 35.852 | 39.850 | 35.122 | 39.850 | 148.3 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.974 | 7.456 | 5.467 | 7.456 | 156.5 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 40.797 | 47.449 | 35.575 | 47.449 | 148.3 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 6.335 | 8.421 | 5.699 | 8.421 | 152.9 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 28.452 | 30.482 | 27.971 | 30.482 | 148.3 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.234 | 0.244 | 0.223 | 0.244 | 154.7 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.497 | 6.872 | 6.241 | 6.872 | 148.3 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.168 | 0.011 | 0.168 | 137.0 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.540 | 0.605 | 0.489 | 0.605 | 148.3 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 192.645 | 220.584 | 180.036 | 220.584 | 152.1 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1735.033 | 1858.504 | 1720.269 | 1858.504 | 148.3 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 173.142 | 212.212 | 170.430 | 212.212 | 157.1 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1669.949 | 1820.816 | 1667.062 | 1820.816 | 148.3 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.912 | 1.302 | 0.796 | 1.302 | 154.2 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 4.059 | 4.911 | 4.008 | 4.911 | 148.3 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.116 | 0.156 | 0.101 | 0.156 | 152.1 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.712 | 0.756 | 0.679 | 0.756 | 148.3 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.076 | 5.863 | 4.849 | 5.863 | 151.0 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 27.243 | 31.811 | 27.059 | 31.811 | 148.3 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 5.223 | 6.167 | 4.943 | 6.167 | 149.1 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 27.670 | 28.302 | 26.920 | 28.302 | 148.3 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.512 | 7.243 | 5.362 | 7.243 | 146.5 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 22.628 | 23.547 | 21.989 | 23.547 | 148.3 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.237 | 0.312 | 0.212 | 0.312 | 146.9 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.929 | 6.551 | 5.505 | 6.551 | 148.3 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.028 | 0.013 | 0.028 | 140.6 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.514 | 0.688 | 0.478 | 0.688 | 148.2 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 193.982 | 223.038 | 184.879 | 223.038 | 163.2 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1796.981 | 2215.287 | 1641.993 | 2215.287 | 148.2 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 177.095 | 197.749 | 166.486 | 197.749 | 166.1 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1680.206 | 1837.803 | 1625.200 | 1837.803 | 148.2 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.998 | 1.130 | 0.952 | 1.130 | 163.2 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 4.159 | 4.485 | 4.069 | 4.485 | 148.2 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.135 | 0.163 | 0.100 | 0.163 | 163.2 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.758 | 0.828 | 0.712 | 0.828 | 148.2 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.974 | 6.702 | 4.910 | 6.702 | 161.9 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 28.755 | 32.792 | 27.541 | 32.792 | 148.2 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.723 | 8.138 | 5.602 | 8.138 | 160.1 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 27.642 | 31.795 | 27.216 | 31.795 | 148.2 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 6.386 | 7.737 | 5.405 | 7.737 | 154.3 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 26.050 | 46.703 | 23.881 | 46.703 | 148.2 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.311 | 0.385 | 0.268 | 0.385 | 155.3 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.533 | 8.955 | 5.378 | 8.955 | 148.2 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 18.309 | 18.587 | 18.041 | 18.587 | 153.1 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 170.909 | 187.183 | 153.841 | 187.183 | 128.0 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 19.700 | 24.537 | 19.617 | 24.537 | 152.3 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 158.243 | 176.536 | 153.732 | 176.536 | 128.0 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.270 | 7.298 | 6.030 | 7.298 | 155.0 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.875 | 32.788 | 30.802 | 32.788 | 128.0 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.194 | 0.231 | 0.170 | 0.231 | 155.5 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 128.0 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.261 | 0.318 | 0.249 | 0.318 | 155.1 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.012 | 0.010 | 0.012 | 128.0 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 22.137 | 24.096 | 20.964 | 24.096 | 154.4 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 171.613 | 176.518 | 160.128 | 176.518 | 128.0 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 11.019 | 11.746 | 10.793 | 11.746 | 149.4 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 85.054 | 89.578 | 82.007 | 89.578 | 128.0 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 193.518 | 195.768 | 185.864 | 195.768 | 155.5 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1635.222 | 2033.710 | 1618.091 | 2033.710 | 128.0 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.092 | 1.161 | 1.039 | 1.161 | 155.3 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.107 | 1.167 | 1.105 | 1.167 | 128.0 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.008 | 0.036 | 0.008 | 0.036 | 133.5 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.403 | 0.448 | 0.393 | 0.448 | 128.0 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.058 | 0.084 | 0.054 | 0.084 | 155.2 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.516 | 6.335 | 5.439 | 6.335 | 128.0 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 0.922 | 1.549 | 0.825 | 1.549 | 135.7 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.668 | 0.700 | 0.666 | 0.700 | 128.0 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.973 | 10.540 | 9.548 | 10.540 | 149.6 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 76.909 | 83.486 | 72.471 | 83.486 | 128.0 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 51.979 | 53.903 | 51.654 | 53.903 | 154.0 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 250.839 | 276.969 | 248.618 | 276.969 | 128.0 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 233.183 | 238.686 | 230.767 | 238.686 | 158.2 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1610.620 | 1660.619 | 1607.654 | 1660.619 | 128.0 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 2.559 | 3.328 | 2.554 | 3.328 | 157.6 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.381 | 1.415 | 1.364 | 1.415 | 128.0 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.144 | 0.163 | 0.137 | 0.163 | 134.5 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.574 | 0.590 | 0.565 | 0.590 | 128.0 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.062 | 0.087 | 0.056 | 0.087 | 157.1 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.309 | 5.537 | 5.288 | 5.537 | 128.0 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.174 | 2.576 | 1.916 | 2.576 | 141.9 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.803 | 0.846 | 0.793 | 0.846 | 128.0 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 51.597 | 53.647 | 50.559 | 53.647 | 156.6 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 180.905 | 192.338 | 180.714 | 192.338 | 128.0 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.025 | 6.307 | 5.973 | 6.307 | 153.0 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 30.340 | 32.817 | 30.159 | 32.817 | 128.0 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.186 | 0.243 | 0.170 | 0.243 | 155.5 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 128.0 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.209 | 0.243 | 0.207 | 0.243 | 153.2 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.009 | 0.012 | 128.0 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 18.964 | 23.403 | 18.814 | 23.403 | 152.5 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 153.558 | 178.311 | 152.749 | 178.311 | 128.0 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.128 | 5.320 | 1.004 | 5.320 | 149.6 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.422 | 1.756 | 1.383 | 1.756 | 128.0 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.953 | 4.221 | 3.853 | 4.221 | 153.5 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.001 | 22.158 | 21.932 | 22.158 | 128.0 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 1.047 | 1.209 | 0.920 | 1.209 | 132.2 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.952 | 1.092 | 0.906 | 1.092 | 128.0 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 7.514 | 9.029 | 6.677 | 9.029 | 142.5 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 53.084 | 55.590 | 52.305 | 55.590 | 128.0 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.228 | 0.427 | 0.186 | 0.427 | 153.9 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.0 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.258 | 0.313 | 0.238 | 0.313 | 153.8 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.007 | 0.009 | 0.007 | 0.009 | 128.0 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 6.882 | 7.690 | 6.746 | 7.690 | 151.4 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 54.471 | 56.899 | 53.890 | 56.899 | 128.0 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.033 | 0.061 | 0.007 | 0.096 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.559 | 0.692 | 0.534 | 0.783 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.569 | 0.791 | 0.340 | 0.888 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.793 | 3.033 | 2.632 | 3.314 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.026 | 0.029 | 0.025 | 0.029 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.541 | 0.623 | 0.520 | 0.623 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 213.669 | 235.834 | 187.381 | 235.834 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1503.789 | 1525.089 | 1481.276 | 1525.089 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 170.487 | 274.624 | 160.895 | 274.624 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1462.230 | 1560.226 | 1451.544 | 1560.226 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.144 | 0.214 | 0.133 | 0.214 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.422 | 3.380 | 2.307 | 3.380 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.032 | 0.040 | 0.024 | 0.040 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.537 | 0.606 | 0.530 | 0.606 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.563 | 6.729 | 6.480 | 6.729 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 19.009 | 20.549 | 17.639 | 20.549 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.790 | 7.077 | 6.715 | 7.077 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.790 | 18.156 | 16.714 | 18.156 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 7.679 | 8.467 | 7.487 | 8.467 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.896 | 14.524 | 13.617 | 14.524 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.273 | 0.304 | 0.239 | 0.304 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.149 | 4.224 | 3.101 | 4.224 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.032 | 0.096 | 0.029 | 0.096 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.557 | 0.586 | 0.541 | 0.586 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 228.751 | 326.661 | 213.832 | 326.661 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1599.439 | 1696.520 | 1550.066 | 1696.520 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 165.758 | 198.744 | 159.521 | 198.744 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1555.733 | 2161.507 | 1503.912 | 2161.507 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.174 | 0.274 | 0.125 | 0.274 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.373 | 2.564 | 2.350 | 2.564 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.041 | 0.097 | 0.031 | 0.097 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.641 | 0.654 | 0.593 | 0.654 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 27.249 | 31.011 | 26.426 | 31.011 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 92.039 | 97.492 | 90.593 | 97.492 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 27.628 | 28.105 | 27.080 | 28.105 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 96.089 | 100.806 | 90.464 | 100.806 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 27.465 | 29.238 | 26.599 | 29.238 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 91.015 | 93.024 | 87.606 | 93.024 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.323 | 0.398 | 0.316 | 0.398 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.341 | 3.899 | 3.201 | 3.899 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.021 | 0.006 | 0.021 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.431 | 0.447 | 0.421 | 0.447 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 190.816 | 202.042 | 188.032 | 202.042 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1555.171 | 1608.749 | 1522.066 | 1608.749 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 163.243 | 193.647 | 157.360 | 193.647 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1501.484 | 1624.039 | 1472.383 | 1624.039 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.169 | 1.976 | 0.149 | 1.976 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.067 | 2.244 | 1.995 | 2.244 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.038 | 0.058 | 0.032 | 0.058 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.391 | 0.420 | 0.384 | 0.420 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.624 | 20.304 | 18.461 | 20.304 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 68.516 | 79.471 | 67.557 | 79.471 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.798 | 19.090 | 18.450 | 19.090 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 65.412 | 68.837 | 64.422 | 68.837 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.891 | 20.877 | 18.588 | 20.877 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 61.713 | 62.884 | 60.166 | 62.884 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.172 | 0.287 | 0.159 | 0.287 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.204 | 3.305 | 3.157 | 3.305 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.043 | 0.047 | 0.040 | 0.047 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.563 | 0.619 | 0.532 | 0.619 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 188.471 | 216.287 | 187.173 | 216.287 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1511.513 | 1536.733 | 1470.913 | 1536.733 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 173.722 | 190.968 | 171.656 | 190.968 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1488.788 | 1499.024 | 1485.655 | 1499.024 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.160 | 0.209 | 0.126 | 0.209 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.712 | 4.617 | 3.588 | 4.617 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.037 | 0.054 | 0.031 | 0.054 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.630 | 0.739 | 0.626 | 0.739 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.740 | 6.182 | 4.986 | 6.182 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.301 | 30.316 | 28.174 | 30.316 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 5.354 | 5.639 | 5.214 | 5.639 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 28.466 | 35.067 | 27.846 | 35.067 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.726 | 7.087 | 5.572 | 7.087 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 23.016 | 28.088 | 22.986 | 28.088 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.489 | 2.262 | 0.419 | 2.262 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 6.484 | 6.940 | 5.641 | 6.940 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.020 | 0.015 | 0.020 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.488 | 0.526 | 0.478 | 0.526 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 179.262 | 184.756 | 177.596 | 184.756 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1541.038 | 1550.601 | 1475.640 | 1550.601 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 168.348 | 223.580 | 158.148 | 223.580 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1488.922 | 1523.894 | 1443.201 | 1523.894 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.110 | 0.157 | 0.103 | 0.157 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.173 | 3.417 | 2.169 | 3.417 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.029 | 0.022 | 0.029 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.443 | 0.725 | 0.388 | 0.725 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.786 | 5.015 | 4.728 | 5.015 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 27.230 | 31.311 | 26.932 | 31.311 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.096 | 5.991 | 4.914 | 5.991 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 28.445 | 28.578 | 26.593 | 28.578 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.390 | 6.005 | 5.314 | 6.005 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 24.055 | 25.077 | 23.466 | 25.077 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.253 | 0.277 | 0.249 | 0.277 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.078 | 3.137 | 3.028 | 3.137 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.018 | 0.013 | 0.018 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.453 | 0.499 | 0.450 | 0.499 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 175.453 | 193.528 | 173.273 | 193.528 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1540.226 | 1715.107 | 1500.082 | 1715.107 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.781 | 222.707 | 154.653 | 222.707 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1520.075 | 1533.363 | 1456.110 | 1533.363 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.174 | 0.119 | 0.174 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.172 | 2.417 | 2.146 | 2.417 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.032 | 0.023 | 0.032 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.455 | 0.540 | 0.413 | 0.540 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.457 | 5.647 | 5.360 | 5.647 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 28.645 | 30.683 | 28.256 | 30.683 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 6.193 | 7.610 | 6.077 | 7.610 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 30.428 | 33.720 | 30.211 | 33.720 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.638 | 5.958 | 5.285 | 5.958 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 25.215 | 26.673 | 23.723 | 26.673 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.273 | 0.279 | 0.254 | 0.279 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.119 | 3.466 | 3.065 | 3.466 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.145 | 0.149 | 0.139 | 0.149 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.671 | 0.934 | 0.670 | 0.934 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 232.620 | 236.402 | 218.585 | 236.402 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1627.785 | 1942.196 | 1599.948 | 1942.196 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 28.254 | 29.169 | 28.237 | 29.169 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 128.362 | 197.350 | 119.749 | 197.350 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 28.497 | 30.622 | 28.399 | 30.622 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 127.212 | 144.828 | 125.049 | 144.828 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 28.639 | 29.795 | 27.782 | 29.795 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 106.859 | 109.689 | 103.100 | 109.689 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.634 | 1.111 | 0.631 | 1.111 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 16.767 | 21.530 | 16.428 | 21.530 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.073 | 0.085 | 0.066 | 0.085 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.648 | 0.656 | 0.631 | 0.656 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 194.478 | 282.781 | 181.019 | 282.781 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1591.528 | 1670.693 | 1528.211 | 1670.693 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 170.054 | 215.429 | 161.366 | 215.429 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1583.229 | 2188.141 | 1471.889 | 2188.141 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.154 | 0.223 | 0.132 | 0.223 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.906 | 5.877 | 2.656 | 5.877 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.023 | 0.051 | 0.014 | 0.051 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.683 | 1.927 | 0.654 | 1.927 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.082 | 7.757 | 2.581 | 7.757 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 20.477 | 33.706 | 19.634 | 33.706 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 3.299 | 17.950 | 2.783 | 17.950 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 17.726 | 17.912 | 17.303 | 17.912 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 6.466 | 14.083 | 2.633 | 14.083 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.695 | 13.996 | 12.173 | 13.996 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.527 | 1.425 | 0.412 | 1.425 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.834 | 3.872 | 3.776 | 3.872 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.029 | 0.016 | 0.029 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.547 | 0.575 | 0.502 | 0.575 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 186.590 | 203.622 | 176.145 | 203.622 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1643.547 | 2256.266 | 1596.011 | 2256.266 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 173.663 | 185.320 | 155.394 | 185.320 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1634.674 | 1748.032 | 1524.463 | 1748.032 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.187 | 0.287 | 0.158 | 0.287 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.860 | 4.555 | 3.553 | 4.555 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.021 | 0.031 | 0.016 | 0.031 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.744 | 1.323 | 0.645 | 1.323 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.572 | 8.756 | 6.392 | 8.756 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 39.047 | 43.565 | 37.151 | 43.565 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.704 | 6.778 | 6.577 | 6.778 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 37.831 | 39.021 | 36.724 | 39.021 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.136 | 7.494 | 6.947 | 7.494 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 33.882 | 35.397 | 33.470 | 35.397 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.254 | 0.353 | 0.245 | 0.353 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 5.524 | 5.874 | 4.770 | 5.874 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.008 | 0.005 | 0.008 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.452 | 0.492 | 0.435 | 0.492 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 184.965 | 194.859 | 171.581 | 194.859 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1504.258 | 2179.450 | 1450.507 | 2179.450 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 173.491 | 184.332 | 161.420 | 184.332 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1552.912 | 1629.889 | 1473.578 | 1629.889 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.114 | 0.127 | 0.083 | 0.127 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.189 | 2.772 | 2.003 | 2.772 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.023 | 0.033 | 0.022 | 0.033 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.382 | 0.406 | 0.360 | 0.406 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.795 | 1.850 | 1.719 | 1.850 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.338 | 15.011 | 14.091 | 15.011 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.929 | 2.111 | 1.868 | 2.111 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.677 | 14.195 | 13.589 | 14.195 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.958 | 3.019 | 1.935 | 3.019 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.993 | 13.908 | 10.892 | 13.908 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.157 | 0.169 | 0.155 | 0.169 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.655 | 2.737 | 2.648 | 2.737 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.196 | 0.208 | 0.190 | 0.208 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.154 | 2.246 | 1.126 | 2.246 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 195.721 | 199.099 | 191.606 | 199.099 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1663.588 | 2301.819 | 1507.789 | 2301.819 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 168.810 | 179.063 | 166.583 | 179.063 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1621.940 | 1833.918 | 1544.498 | 1833.918 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.309 | 0.387 | 0.305 | 0.387 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 6.086 | 7.070 | 6.005 | 7.070 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.024 | 0.032 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.915 | 2.597 | 1.895 | 2.597 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.135 | 11.740 | 11.014 | 11.740 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 48.012 | 50.550 | 47.085 | 50.550 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.863 | 12.441 | 11.570 | 12.441 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 44.662 | 50.641 | 44.187 | 50.641 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 12.561 | 14.461 | 11.195 | 14.461 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 39.481 | 53.864 | 38.288 | 53.864 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.838 | 0.908 | 0.831 | 0.908 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.485 | 7.730 | 6.332 | 7.730 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.090 | 0.011 | 0.090 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.484 | 0.516 | 0.466 | 0.516 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 183.569 | 202.411 | 166.738 | 202.411 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1587.438 | 1691.312 | 1482.903 | 1691.312 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 161.071 | 178.852 | 158.000 | 178.852 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1510.948 | 1657.799 | 1478.840 | 1657.799 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.161 | 0.247 | 0.143 | 0.247 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.705 | 4.856 | 3.510 | 4.856 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.029 | 0.042 | 0.017 | 0.042 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.602 | 0.676 | 0.590 | 0.676 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.872 | 1.976 | 1.717 | 1.976 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 18.359 | 21.118 | 17.987 | 21.118 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.771 | 1.986 | 1.681 | 1.986 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 17.130 | 22.008 | 17.058 | 22.008 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.878 | 3.874 | 1.706 | 3.874 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 13.402 | 14.804 | 11.915 | 14.804 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.158 | 0.217 | 0.147 | 0.217 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 5.574 | 6.594 | 5.391 | 6.594 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.131 | 0.159 | 0.104 | 0.159 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.691 | 0.718 | 0.675 | 0.718 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 173.947 | 195.509 | 167.747 | 195.509 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1579.038 | 1965.269 | 1546.884 | 1965.269 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 163.036 | 169.584 | 159.337 | 169.584 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1664.561 | 1948.327 | 1569.948 | 1948.327 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.139 | 0.182 | 0.124 | 0.182 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.153 | 3.704 | 3.004 | 3.704 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.027 | 0.029 | 0.019 | 0.029 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.763 | 0.921 | 0.746 | 0.921 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.686 | 3.381 | 2.530 | 3.381 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 17.490 | 18.947 | 16.617 | 18.947 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.778 | 3.404 | 2.695 | 3.404 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 14.769 | 17.315 | 14.296 | 17.315 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.858 | 4.239 | 2.706 | 4.239 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 11.407 | 12.672 | 11.047 | 12.672 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.471 | 0.862 | 0.459 | 0.862 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.892 | 6.243 | 3.637 | 6.243 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.023 | 0.026 | 0.021 | 0.026 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.538 | 0.584 | 0.516 | 0.584 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 163.418 | 175.313 | 161.183 | 175.313 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1812.474 | 2828.387 | 1602.048 | 2828.387 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.115 | 0.239 | 0.105 | 0.239 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.326 | 3.150 | 2.243 | 3.150 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.020 | 0.026 | 0.016 | 0.026 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.558 | 0.699 | 0.535 | 0.699 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.374 | 1.653 | 1.355 | 1.653 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.066 | 17.006 | 12.529 | 17.006 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.571 | 2.323 | 1.433 | 2.323 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 12.598 | 13.350 | 11.724 | 13.350 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.301 | 2.397 | 2.107 | 2.397 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.417 | 8.624 | 8.235 | 8.624 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.256 | 0.343 | 0.238 | 0.343 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.218 | 3.463 | 3.147 | 3.463 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 172.261 | 184.420 | 168.986 | 184.420 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1488.873 | 1557.376 | 1445.969 | 1557.376 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.235 | 0.286 | 0.213 | 0.286 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.436 | 2.518 | 2.435 | 2.518 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.024 | 0.029 | 0.022 | 0.029 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.481 | 0.941 | 0.456 | 0.941 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.892 | 33.137 | 32.193 | 33.137 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 113.463 | 114.123 | 111.762 | 114.123 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.248 | 0.529 | 0.243 | 0.529 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.513 | 4.500 | 3.376 | 4.500 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 170.031 | 209.301 | 168.168 | 209.301 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1511.677 | 1598.511 | 1504.497 | 1598.511 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.195 | 0.494 | 0.172 | 0.494 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.103 | 2.182 | 2.063 | 2.182 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.043 | 0.112 | 0.021 | 0.112 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.430 | 0.520 | 0.427 | 0.520 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.715 | 28.544 | 26.664 | 28.544 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 87.219 | 91.670 | 87.038 | 91.670 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.312 | 0.368 | 0.221 | 0.368 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.705 | 3.585 | 2.633 | 3.585 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 171.053 | 201.556 | 164.399 | 201.556 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1580.190 | 1763.425 | 1498.835 | 1763.425 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.163 | 0.204 | 0.151 | 0.204 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.040 | 2.104 | 2.029 | 2.104 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.022 | 0.053 | 0.021 | 0.053 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.394 | 0.453 | 0.390 | 0.453 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.753 | 6.061 | 3.457 | 6.061 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 20.781 | 22.705 | 20.349 | 22.705 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.186 | 0.271 | 0.154 | 0.271 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.776 | 2.786 | 2.706 | 2.786 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 161.758 | 179.699 | 161.167 | 179.699 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1587.025 | 2102.873 | 1519.112 | 2102.873 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.197 | 0.240 | 0.174 | 0.240 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.072 | 2.104 | 2.068 | 2.104 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.023 | 0.049 | 0.022 | 0.049 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.418 | 0.448 | 0.402 | 0.448 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 31.744 | 33.328 | 30.904 | 33.328 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 108.733 | 111.037 | 108.393 | 111.037 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.200 | 0.465 | 0.185 | 0.465 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.725 | 2.772 | 2.608 | 2.772 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 164.383 | 173.054 | 157.878 | 173.054 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1441.711 | 1479.880 | 1434.339 | 1479.880 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.162 | 0.186 | 0.146 | 0.186 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.151 | 2.308 | 2.086 | 2.308 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.032 | 0.300 | 0.030 | 0.300 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.420 | 0.511 | 0.390 | 0.511 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.009 | 5.699 | 3.969 | 5.699 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 21.298 | 22.854 | 21.163 | 22.854 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.162 | 0.181 | 0.160 | 0.181 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.696 | 2.885 | 2.660 | 2.885 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 168.604 | 241.553 | 167.247 | 241.553 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1509.976 | 1576.177 | 1504.413 | 1576.177 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.258 | 0.361 | 0.225 | 0.361 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.199 | 3.075 | 2.135 | 3.075 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.057 | 0.162 | 0.023 | 0.162 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.473 | 0.491 | 0.417 | 0.491 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 32.265 | 36.779 | 30.799 | 36.779 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 111.674 | 114.885 | 108.621 | 114.885 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.276 | 0.397 | 0.180 | 0.397 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.812 | 4.467 | 2.711 | 4.467 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 167.545 | 190.115 | 162.906 | 190.115 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1526.916 | 1542.369 | 1498.419 | 1542.369 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.212 | 0.243 | 0.192 | 0.243 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.151 | 2.474 | 2.031 | 2.474 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.034 | 0.045 | 0.031 | 0.045 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.425 | 0.448 | 0.416 | 0.448 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.443 | 6.347 | 4.109 | 6.347 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 22.735 | 23.897 | 22.730 | 23.897 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.216 | 0.424 | 0.198 | 0.424 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 3.075 | 4.047 | 2.905 | 4.047 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 194.426 | 211.443 | 194.036 | 211.443 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1675.744 | 1735.037 | 1623.243 | 1735.037 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 183.025 | 291.013 | 174.524 | 291.013 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1665.169 | 1893.017 | 1627.862 | 1893.017 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.165 | 0.198 | 0.147 | 0.198 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.442 | 3.094 | 2.232 | 3.094 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.023 | 0.044 | 0.019 | 0.044 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.571 | 0.609 | 0.555 | 0.609 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.085 | 0.048 | 0.085 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.605 | 0.982 | 0.575 | 0.982 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 12.373 | 13.157 | 11.563 | 13.157 | 151.3 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 160.050 | 175.020 | 157.544 | 175.020 | 128.0 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 358.935 | 395.761 | 353.263 | 395.761 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2232.436 | 2342.953 | 2206.533 | 2342.953 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 255.305 | 268.373 | 249.171 | 268.373 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1914.565 | 2159.954 | 1890.584 | 2159.954 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.217 | 0.299 | 0.191 | 0.299 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.573 | 3.810 | 3.547 | 3.810 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.028 | 0.037 | 0.023 | 0.037 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.444 | 1.485 | 1.411 | 1.485 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.064 | 0.093 | 0.043 | 0.093 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.385 | 2.560 | 1.354 | 2.560 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 70.662 | 72.576 | 69.455 | 72.576 | 156.2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 394.680 | 480.110 | 371.005 | 480.110 | 162.7 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 198.804 | 281.652 | 185.628 | 281.652 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1620.713 | 1719.712 | 1591.401 | 1719.712 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.685 | 191.678 | 169.545 | 191.678 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1567.004 | 1599.045 | 1528.693 | 1599.045 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.240 | 0.429 | 0.231 | 0.429 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.755 | 4.615 | 3.615 | 4.615 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.034 | 0.064 | 0.024 | 0.064 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.659 | 0.890 | 0.637 | 0.890 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.040 | 0.162 | 0.033 | 0.162 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.573 | 0.841 | 0.540 | 0.841 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.535 | 1.437 | 0.472 | 1.437 | 146.6 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 27.330 | 47.258 | 25.481 | 47.258 | 128.0 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 190.798 | 232.323 | 179.904 | 232.323 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1549.266 | 1624.995 | 1522.976 | 1624.995 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 173.329 | 195.971 | 164.593 | 195.971 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1626.758 | 1829.203 | 1533.385 | 1829.203 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.245 | 2.279 | 0.194 | 2.279 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.668 | 3.987 | 3.519 | 3.987 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.025 | 0.040 | 0.019 | 0.040 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.652 | 0.729 | 0.635 | 0.729 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.034 | 0.059 | 0.027 | 0.059 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.545 | 0.559 | 0.524 | 0.559 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.915 | 1.059 | 0.681 | 1.059 | 144.3 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 67.912 | 69.854 | 66.856 | 69.854 | 128.0 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 193.790 | 227.459 | 176.048 | 227.459 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1571.539 | 1636.326 | 1489.908 | 1636.326 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.586 | 194.495 | 158.434 | 194.495 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1493.165 | 1588.706 | 1462.747 | 1588.706 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.196 | 0.290 | 0.174 | 0.290 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.195 | 2.436 | 2.166 | 2.436 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.032 | 0.041 | 0.020 | 0.041 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.428 | 0.680 | 0.420 | 0.680 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.016 | 0.025 | 0.012 | 0.025 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.444 | 0.472 | 0.420 | 0.472 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.327 | 0.465 | 0.282 | 0.465 | 142.1 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 20.430 | 23.162 | 19.558 | 23.162 | 128.0 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 177.423 | 224.956 | 171.439 | 224.956 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1512.260 | 1665.907 | 1479.311 | 1665.907 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.538 | 215.887 | 159.616 | 215.887 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1498.950 | 2057.931 | 1446.067 | 2057.931 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.181 | 0.222 | 0.164 | 0.222 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.204 | 2.660 | 2.129 | 2.660 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.039 | 0.020 | 0.039 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.429 | 0.496 | 0.414 | 0.496 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.048 | 0.013 | 0.048 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.515 | 0.719 | 0.479 | 0.719 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.357 | 1.855 | 0.213 | 1.855 | 139.6 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.985 | 17.947 | 16.599 | 17.947 | 128.0 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 228.274 | 232.265 | 225.578 | 232.265 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1811.762 | 1852.964 | 1793.719 | 1852.964 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.129 | 0.202 | 0.114 | 0.202 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.670 | 0.700 | 0.657 | 0.700 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 9.475 | 10.619 | 8.279 | 10.619 | 165.8 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 252.618 | 269.624 | 245.978 | 269.624 | 128.0 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 181.191 | 183.326 | 175.917 | 183.326 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1512.905 | 1575.696 | 1455.072 | 1575.696 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.487 | 0.668 | 0.409 | 0.668 | 141.8 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.995 | 17.340 | 16.955 | 17.340 | 128.0 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 27.498 | 27.971 | 26.646 | 27.971 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 87.971 | 91.567 | 86.484 | 91.567 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 7.944 | 8.477 | 7.679 | 8.477 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.422 | 23.476 | 21.191 | 23.476 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 27.157 | 28.013 | 26.881 | 28.013 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 88.398 | 130.739 | 87.419 | 130.739 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 26.583 | 26.993 | 26.404 | 26.993 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.800 | 80.114 | 73.273 | 80.114 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>18:55:50 - cmdstanpy - INFO - Chain [1] start processing<br>18:55:50 - cmdstanpy - INFO - Chain [1] done processing<br>18:55:50 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=91741 data file=/tmp/tmp8kocgkjk/hbnxj44s.json init=/tmp/tmp8kocgkjk/8s7g9s6r.json output file=/tmp/tmp8kocgkjk/prophet_modelrlxit5ed/prophet_model-20261030185550.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp8kocgkjk/hbnxj44s.json<br>init = /tmp/tmp8kocgkjk/8s7g9s6r.json<br>random<br>  seed = 91741<br>output<br>  file = /tmp/tmp8kocgkjk/prophet_modelrlxit5ed/prophet_model-20261030185550.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1353, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1330, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=91741 data file=/tmp/tmp8kocgkjk/hbnxj44s.json init=/tmp/tmp8kocgkjk/8s7g9s6r.json output file=/tmp/tmp8kocgkjk/prophet_modelrlxit5ed/prophet_model-20261030185550.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>18:55:52 - cmdstanpy - INFO - Chain [1] start processing<br>18:55:52 - cmdstanpy - INFO - Chain [1] done processing<br>18:55:52 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=95284 data file=/tmp/tmpoo729hzk/gwpu1a36.json init=/tmp/tmpoo729hzk/12vh02o7.json output file=/tmp/tmpoo729hzk/prophet_modelhf22r_m0/prophet_model-20261030185552.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpoo729hzk/gwpu1a36.json<br>init = /tmp/tmpoo729hzk/12vh02o7.json<br>random<br>  seed = 95284<br>output<br>  file = /tmp/tmpoo729hzk/prophet_modelhf22r_m0/prophet_model-20261030185552.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1353, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1330, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=95284 data file=/tmp/tmpoo729hzk/gwpu1a36.json init=/tmp/tmpoo729hzk/12vh02o7.json output file=/tmp/tmpoo729hzk/prophet_modelhf22r_m0/prophet_model-20261030185552.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1353, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1330, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1353, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1330, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `e38322b64aa058247a89e2197cd98ad9ea44f2f5`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `country-global-priors-linear`, `country-global-priors-overrides-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `anomalies-linear-defaults-99`, `warm-start-linear-defaults-30-new-rows`, `warm-start-linear-defaults-1-new-row`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`, `evaluation-linear-custom-search`, `linear-regressor-model`, `uncertainty-linear-regressor-model-intervals-1000`, `evaluation-linear-regressor-model-point`, `evaluation-linear-regressor-model-intervals`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:cd8988251fd7923096182d824ed43a8c3f0f87f9df88dacf371f852210b2b070`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:2fab6886e0c60430dea9af2941531e60a69de9161b2f5de67a7e17206490660e`

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

