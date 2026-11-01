# Effect Prophet benchmark — 2026-11-01T040906-363Z-d257017e

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
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 23.813 | 25.376 | 23.339 | 25.376 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 198.884 | 209.474 | 195.460 | 209.474 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.343 | 9.362 | 6.829 | 9.362 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 29.515 | 30.291 | 29.191 | 30.291 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 12.913 | 13.097 | 12.783 | 13.097 | 149.0 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 170.236 | 179.988 | 165.905 | 179.988 | 129.8 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.017 | 0.010 | 0.017 | 130.6 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.480 | 0.741 | 0.451 | 0.741 | 147.8 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 179.539 | 191.981 | 176.377 | 191.981 | 147.2 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1623.993 | 1667.922 | 1611.378 | 1667.922 | 147.8 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 163.453 | 172.322 | 162.565 | 172.322 | 150.2 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1588.100 | 1654.558 | 1587.662 | 1654.558 | 147.8 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.787 | 0.903 | 0.736 | 0.903 | 147.3 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.375 | 3.454 | 3.199 | 3.454 | 147.8 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.080 | 0.103 | 0.076 | 0.103 | 147.2 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.507 | 0.590 | 0.490 | 0.590 | 147.8 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.047 | 5.164 | 4.951 | 5.164 | 145.1 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 30.150 | 33.142 | 27.961 | 33.142 | 147.8 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.357 | 5.431 | 5.238 | 5.431 | 143.3 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.793 | 30.396 | 26.647 | 30.396 | 147.8 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.577 | 7.259 | 5.505 | 7.259 | 141.7 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 21.262 | 21.974 | 21.095 | 21.974 | 147.8 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.239 | 0.291 | 0.208 | 0.291 | 142.1 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.379 | 5.506 | 5.305 | 5.506 | 147.8 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.012 | 0.020 | 129.1 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.451 | 0.465 | 0.440 | 0.465 | 128.4 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 178.742 | 185.535 | 174.085 | 185.535 | 145.1 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1446.186 | 1496.743 | 1437.345 | 1496.743 | 128.4 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 161.684 | 191.396 | 160.828 | 191.396 | 145.3 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1434.721 | 1465.991 | 1429.850 | 1465.991 | 128.4 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.399 | 0.479 | 0.380 | 0.479 | 145.1 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.989 | 4.113 | 3.927 | 4.113 | 128.4 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.024 | 0.030 | 0.017 | 0.030 | 145.1 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.709 | 0.761 | 0.688 | 0.761 | 128.4 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.695 | 3.839 | 3.613 | 3.839 | 144.9 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.904 | 24.040 | 22.702 | 24.040 | 128.4 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.067 | 6.101 | 3.940 | 6.101 | 141.4 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.163 | 22.629 | 21.795 | 22.629 | 128.4 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.717 | 6.283 | 4.674 | 6.283 | 140.8 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.452 | 17.571 | 17.020 | 17.571 | 128.4 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.149 | 0.403 | 0.138 | 0.403 | 141.0 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.671 | 4.831 | 4.633 | 4.831 | 128.4 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.018 | 0.013 | 0.018 | 134.9 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.458 | 0.486 | 0.443 | 0.486 | 128.4 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 177.184 | 179.335 | 174.862 | 179.335 | 151.7 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1454.325 | 1502.997 | 1442.985 | 1502.997 | 128.4 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 160.486 | 165.516 | 157.336 | 165.516 | 152.0 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1433.391 | 1513.505 | 1431.087 | 1513.505 | 128.4 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.386 | 0.465 | 0.378 | 0.465 | 152.0 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.993 | 4.272 | 3.869 | 4.272 | 128.4 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.035 | 0.018 | 0.035 | 151.7 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.699 | 0.723 | 0.693 | 0.723 | 128.4 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.003 | 4.295 | 3.948 | 4.295 | 151.5 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.683 | 24.089 | 23.443 | 24.089 | 128.4 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.164 | 4.259 | 4.089 | 4.259 | 151.2 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 23.063 | 25.023 | 22.843 | 25.023 | 128.4 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 4.773 | 5.695 | 4.754 | 5.695 | 144.1 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.688 | 18.913 | 18.556 | 18.913 | 128.4 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.196 | 0.231 | 0.174 | 0.231 | 146.6 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.733 | 4.937 | 4.626 | 4.937 | 128.4 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.048 | 0.058 | 0.047 | 0.058 | 136.7 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.528 | 0.555 | 0.517 | 0.555 | 148.4 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 180.714 | 181.766 | 177.944 | 181.766 | 159.1 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1627.856 | 1642.840 | 1622.967 | 1642.840 | 148.4 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 166.373 | 176.948 | 164.713 | 176.948 | 165.6 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1624.105 | 1679.389 | 1586.153 | 1679.389 | 148.4 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 0.800 | 0.864 | 0.786 | 0.864 | 165.5 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.476 | 4.707 | 4.298 | 4.707 | 148.4 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.135 | 0.157 | 0.119 | 0.157 | 163.2 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.728 | 0.739 | 0.697 | 0.739 | 148.4 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.159 | 6.977 | 4.940 | 6.977 | 155.5 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 34.171 | 35.483 | 33.659 | 35.483 | 148.4 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 5.664 | 6.311 | 5.117 | 6.311 | 150.3 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 33.663 | 33.957 | 33.036 | 33.957 | 148.4 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.943 | 6.577 | 5.553 | 6.577 | 147.6 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 27.111 | 30.025 | 26.832 | 30.025 | 148.4 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.227 | 0.236 | 0.220 | 0.236 | 148.1 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.511 | 6.749 | 6.295 | 6.749 | 148.4 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.048 | 0.057 | 0.045 | 0.057 | 139.1 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.546 | 0.717 | 0.512 | 0.717 | 148.5 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 181.517 | 203.769 | 178.857 | 203.769 | 160.5 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1648.333 | 1707.818 | 1630.393 | 1707.818 | 148.5 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 163.569 | 181.275 | 162.737 | 181.275 | 167.0 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1597.755 | 1608.163 | 1591.393 | 1608.163 | 148.5 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 0.820 | 0.873 | 0.762 | 0.873 | 166.8 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.460 | 5.049 | 4.369 | 5.049 | 148.5 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.135 | 0.171 | 0.116 | 0.171 | 164.4 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.733 | 0.763 | 0.721 | 0.763 | 148.5 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.259 | 6.343 | 5.018 | 6.343 | 156.8 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 34.935 | 44.822 | 34.436 | 44.822 | 148.5 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.449 | 5.897 | 5.280 | 5.897 | 151.8 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 34.229 | 50.896 | 33.343 | 50.896 | 148.5 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 6.106 | 6.610 | 5.703 | 6.610 | 149.6 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 28.514 | 34.176 | 27.073 | 34.176 | 148.5 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.219 | 0.233 | 0.213 | 0.233 | 149.8 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.502 | 9.014 | 6.322 | 9.014 | 148.5 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.027 | 0.015 | 0.027 | 135.0 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.475 | 0.450 | 0.475 | 148.3 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 177.735 | 185.053 | 174.458 | 185.053 | 152.0 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1628.647 | 1739.217 | 1618.940 | 1739.217 | 148.3 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 168.106 | 186.157 | 163.719 | 186.157 | 152.6 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1594.821 | 1640.336 | 1590.737 | 1640.336 | 148.3 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.816 | 0.850 | 0.775 | 0.850 | 152.0 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.920 | 4.125 | 3.828 | 4.125 | 148.3 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.095 | 0.114 | 0.085 | 0.114 | 152.0 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.717 | 0.926 | 0.669 | 0.926 | 148.3 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.623 | 4.715 | 4.514 | 4.715 | 150.7 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.739 | 27.043 | 26.710 | 27.043 | 148.3 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.714 | 4.861 | 4.684 | 4.861 | 148.9 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 26.741 | 26.945 | 25.673 | 26.945 | 148.3 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.141 | 5.284 | 5.001 | 5.284 | 144.6 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.613 | 32.443 | 20.384 | 32.443 | 148.3 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.266 | 0.287 | 0.231 | 0.287 | 147.1 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.516 | 5.721 | 5.461 | 5.721 | 148.3 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 134.4 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.454 | 0.480 | 0.441 | 0.480 | 148.4 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 179.778 | 184.581 | 176.633 | 184.581 | 151.7 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1607.306 | 1638.478 | 1600.424 | 1638.478 | 148.4 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 167.167 | 191.890 | 165.087 | 191.890 | 154.9 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1607.146 | 1712.359 | 1595.948 | 1712.359 | 148.4 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.799 | 0.862 | 0.765 | 0.862 | 152.0 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.877 | 3.954 | 3.843 | 3.954 | 148.4 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.098 | 0.140 | 0.088 | 0.140 | 151.7 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.679 | 0.694 | 0.667 | 0.694 | 148.4 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.871 | 4.888 | 4.851 | 4.888 | 150.7 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.745 | 28.425 | 27.581 | 28.425 | 148.4 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.057 | 5.203 | 4.962 | 5.203 | 149.1 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 27.439 | 28.689 | 27.320 | 28.689 | 148.4 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.412 | 6.118 | 5.292 | 6.118 | 144.7 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.574 | 22.230 | 21.408 | 22.230 | 148.4 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.280 | 0.307 | 0.268 | 0.307 | 147.2 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.526 | 5.717 | 5.442 | 5.717 | 148.4 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 18.411 | 19.129 | 18.186 | 19.129 | 148.7 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 155.186 | 168.835 | 148.414 | 168.835 | 128.4 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 21.325 | 22.898 | 20.221 | 22.898 | 148.0 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 148.860 | 149.487 | 145.472 | 149.487 | 128.4 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 5.918 | 6.275 | 5.818 | 6.275 | 153.2 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.701 | 31.405 | 30.617 | 31.405 | 128.4 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.183 | 0.809 | 0.167 | 0.809 | 154.0 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.005 | 0.004 | 0.005 | 128.4 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.269 | 0.271 | 0.266 | 0.271 | 153.6 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.009 | 0.012 | 128.4 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 21.146 | 21.747 | 21.014 | 21.747 | 152.6 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 154.074 | 159.381 | 153.706 | 159.381 | 128.4 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 10.126 | 11.092 | 10.045 | 11.092 | 143.7 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 80.280 | 85.930 | 79.394 | 85.930 | 128.4 |
| evaluation-linear-long-history-parallel | evaluation-intervals-processes | python-prophet | 4 | 2485.531 | 2562.556 | 2481.916 | 2562.556 | 139.4 |
| evaluation-linear-long-history-parallel | evaluation-intervals-threads | python-prophet | 4 | 1103.327 | 1138.738 | 1097.185 | 1138.738 | 139.4 |
| evaluation-linear-long-history-parallel | evaluation-intervals | effect-prophet | 4 | 950.741 | 954.962 | 949.376 | 954.962 | 198.9 |
| evaluation-linear-long-history-parallel | evaluation-intervals | python-prophet | 4 | 2666.648 | 2787.724 | 2660.688 | 2787.724 | 138.2 |
| evaluation-linear-long-history-parallel | evaluation-point-processes | python-prophet | 4 | 2503.914 | 2552.385 | 2455.536 | 2552.385 | 137.7 |
| evaluation-linear-long-history-parallel | evaluation-point-threads | python-prophet | 4 | 1057.934 | 1134.888 | 1040.559 | 1134.888 | 137.7 |
| evaluation-linear-long-history-parallel | evaluation-point | effect-prophet | 4 | 959.427 | 964.998 | 955.414 | 964.998 | 189.0 |
| evaluation-linear-long-history-parallel | evaluation-point | python-prophet | 4 | 2632.605 | 2639.362 | 2610.325 | 2639.362 | 128.4 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 182.449 | 187.340 | 181.620 | 187.340 | 144.0 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1523.627 | 1525.409 | 1496.235 | 1525.409 | 128.4 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.055 | 1.233 | 1.020 | 1.233 | 143.9 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.102 | 1.172 | 1.075 | 1.172 | 128.4 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.008 | 0.009 | 0.007 | 0.009 | 125.7 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.414 | 0.455 | 0.388 | 0.455 | 128.4 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.053 | 0.089 | 0.052 | 0.089 | 143.7 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.411 | 5.497 | 5.391 | 5.497 | 128.4 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 0.931 | 1.062 | 0.898 | 1.062 | 128.3 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.654 | 0.677 | 0.646 | 0.677 | 128.4 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 10.481 | 11.102 | 10.271 | 11.102 | 143.5 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 73.305 | 77.830 | 72.147 | 77.830 | 128.4 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 52.761 | 54.581 | 51.752 | 54.581 | 151.5 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 249.263 | 266.372 | 248.516 | 266.372 | 128.4 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 235.755 | 251.595 | 235.347 | 251.595 | 152.9 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1613.910 | 1692.933 | 1610.149 | 1692.933 | 128.4 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 2.550 | 3.144 | 2.540 | 3.144 | 152.5 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.427 | 1.492 | 1.383 | 1.492 | 128.4 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.152 | 0.185 | 0.148 | 0.185 | 128.6 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.547 | 0.578 | 0.532 | 0.578 | 128.4 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.060 | 0.103 | 0.058 | 0.103 | 151.7 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.480 | 5.490 | 5.479 | 5.490 | 128.4 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.172 | 2.430 | 2.000 | 2.430 | 137.9 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.827 | 0.852 | 0.796 | 0.852 | 128.4 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 52.493 | 53.225 | 50.554 | 53.225 | 151.1 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 181.281 | 181.798 | 179.857 | 181.798 | 128.4 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.227 | 6.459 | 5.995 | 6.459 | 151.7 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 30.476 | 30.661 | 30.373 | 30.661 | 128.4 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.220 | 0.297 | 0.191 | 0.297 | 152.7 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.007 | 0.004 | 0.007 | 128.4 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.248 | 0.292 | 0.211 | 0.292 | 152.2 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.008 | 0.012 | 128.4 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.277 | 24.104 | 20.259 | 24.104 | 150.2 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 154.021 | 158.307 | 152.307 | 158.307 | 128.4 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 0.983 | 2.563 | 0.977 | 2.563 | 148.9 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.399 | 1.467 | 1.391 | 1.467 | 128.4 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.783 | 3.868 | 3.749 | 3.868 | 152.9 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 21.949 | 23.534 | 21.843 | 23.534 | 128.4 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.874 | 1.119 | 0.797 | 1.119 | 129.2 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.928 | 0.968 | 0.889 | 0.968 | 128.4 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.870 | 6.532 | 5.852 | 6.532 | 143.6 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 51.562 | 53.086 | 51.315 | 53.086 | 128.4 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.186 | 0.202 | 0.168 | 0.202 | 153.7 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.004 | 0.004 | 0.004 | 128.4 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.254 | 0.330 | 0.235 | 0.330 | 153.6 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.007 | 0.009 | 0.007 | 0.009 | 128.4 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 6.208 | 6.566 | 6.150 | 6.566 | 152.7 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 53.731 | 54.034 | 53.628 | 54.034 | 128.4 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.020 | 0.056 | 0.006 | 0.123 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.561 | 0.578 | 0.538 | 0.590 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.451 | 0.572 | 0.399 | 0.775 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.651 | 2.718 | 2.592 | 2.763 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.034 | 0.039 | 0.031 | 0.039 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.527 | 0.541 | 0.510 | 0.541 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 174.101 | 176.029 | 172.713 | 176.029 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1457.486 | 1500.676 | 1451.255 | 1500.676 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 160.926 | 173.501 | 160.422 | 173.501 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1433.946 | 1456.433 | 1427.874 | 1456.433 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.140 | 0.254 | 0.131 | 0.254 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.275 | 2.420 | 2.227 | 2.420 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.027 | 0.041 | 0.023 | 0.041 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.529 | 0.557 | 0.516 | 0.557 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.192 | 6.672 | 6.155 | 6.672 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.509 | 30.056 | 17.302 | 30.056 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 7.043 | 7.213 | 6.398 | 7.213 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.958 | 18.033 | 16.305 | 18.033 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.887 | 8.836 | 6.358 | 8.836 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.393 | 13.853 | 13.355 | 13.853 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.256 | 0.270 | 0.237 | 0.270 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.089 | 3.148 | 3.015 | 3.148 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.047 | 0.064 | 0.040 | 0.064 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.563 | 0.589 | 0.544 | 0.589 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 198.297 | 205.218 | 193.966 | 205.218 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1521.160 | 1533.146 | 1511.531 | 1533.146 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 159.889 | 162.763 | 158.174 | 162.763 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1429.742 | 1447.685 | 1419.256 | 1447.685 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.129 | 0.150 | 0.127 | 0.150 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.355 | 2.630 | 2.330 | 2.630 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.027 | 0.052 | 0.024 | 0.052 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.590 | 0.628 | 0.575 | 0.628 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 26.072 | 26.606 | 25.918 | 26.606 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 91.017 | 96.918 | 90.933 | 96.918 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 26.101 | 26.585 | 25.749 | 26.585 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 90.226 | 96.716 | 88.871 | 96.716 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.841 | 27.920 | 25.777 | 27.920 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 87.098 | 91.485 | 86.599 | 91.485 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.323 | 0.389 | 0.312 | 0.389 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.164 | 3.243 | 3.130 | 3.243 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.006 | 0.004 | 0.006 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.434 | 0.460 | 0.426 | 0.460 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 187.008 | 192.634 | 181.855 | 192.634 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1485.838 | 1491.661 | 1479.276 | 1491.661 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 160.016 | 169.891 | 158.783 | 169.891 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1423.912 | 1531.349 | 1415.679 | 1531.349 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.133 | 0.137 | 0.127 | 0.137 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.081 | 2.219 | 1.990 | 2.219 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.029 | 0.040 | 0.024 | 0.040 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.390 | 0.416 | 0.350 | 0.416 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.206 | 19.487 | 18.173 | 19.487 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 65.347 | 68.516 | 64.516 | 68.516 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.317 | 18.527 | 18.039 | 18.527 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 63.859 | 65.203 | 63.451 | 65.203 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.188 | 18.333 | 18.048 | 18.333 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 61.336 | 62.586 | 60.605 | 62.586 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.229 | 0.237 | 0.196 | 0.237 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.161 | 3.265 | 3.110 | 3.265 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.038 | 0.044 | 0.038 | 0.044 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.541 | 0.571 | 0.520 | 0.571 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 177.842 | 180.776 | 176.702 | 180.776 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1471.437 | 1495.293 | 1451.936 | 1495.293 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 162.713 | 165.082 | 162.700 | 165.082 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1448.525 | 1452.283 | 1429.581 | 1452.283 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.121 | 0.163 | 0.116 | 0.163 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.634 | 3.764 | 3.616 | 3.764 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.038 | 0.030 | 0.038 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.654 | 0.675 | 0.643 | 0.675 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.803 | 5.536 | 4.704 | 5.536 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.046 | 28.214 | 27.881 | 28.214 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.861 | 4.958 | 4.850 | 4.958 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.349 | 27.968 | 27.302 | 27.968 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.487 | 5.654 | 5.478 | 5.654 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.726 | 22.943 | 22.425 | 22.943 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.274 | 0.306 | 0.269 | 0.306 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.770 | 4.846 | 4.767 | 4.846 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.017 | 0.012 | 0.017 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.456 | 0.474 | 0.442 | 0.474 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 177.506 | 177.691 | 175.658 | 177.691 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1461.117 | 1479.654 | 1460.468 | 1479.654 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.663 | 163.816 | 158.732 | 163.816 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1426.615 | 1446.833 | 1422.874 | 1446.833 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.131 | 0.112 | 0.131 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.170 | 2.234 | 2.118 | 2.234 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.026 | 0.022 | 0.026 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.433 | 0.446 | 0.418 | 0.446 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.697 | 4.751 | 4.646 | 4.751 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 27.250 | 28.459 | 27.035 | 28.459 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.214 | 6.321 | 4.947 | 6.321 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.222 | 27.069 | 25.933 | 27.069 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.223 | 5.542 | 5.125 | 5.542 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.800 | 24.610 | 23.706 | 24.610 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.240 | 0.274 | 0.239 | 0.274 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 2.993 | 3.120 | 2.992 | 3.120 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.013 | 0.024 | 0.012 | 0.024 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.489 | 0.514 | 0.434 | 0.514 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 172.655 | 180.977 | 172.285 | 180.977 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1452.869 | 1472.320 | 1442.553 | 1472.320 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.756 | 172.768 | 161.448 | 172.768 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1432.078 | 1442.779 | 1428.456 | 1442.779 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.111 | 0.132 | 0.108 | 0.132 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.141 | 2.245 | 2.092 | 2.245 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.030 | 0.022 | 0.030 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.401 | 0.417 | 0.386 | 0.417 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.699 | 4.813 | 4.670 | 4.813 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.650 | 27.400 | 26.397 | 27.400 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.122 | 7.221 | 4.918 | 7.221 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.818 | 29.294 | 26.652 | 29.294 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.235 | 5.438 | 5.094 | 5.438 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.777 | 24.367 | 23.183 | 24.367 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.253 | 0.290 | 0.250 | 0.290 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.067 | 3.940 | 2.996 | 3.940 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.148 | 1.533 | 0.146 | 1.533 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.724 | 0.740 | 0.700 | 0.740 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 209.043 | 220.684 | 206.722 | 220.684 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1555.412 | 1596.503 | 1550.986 | 1596.503 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 28.091 | 28.928 | 27.866 | 28.928 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 118.343 | 124.664 | 117.733 | 124.664 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 27.942 | 28.216 | 27.742 | 28.216 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 118.842 | 131.842 | 117.753 | 131.842 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 28.972 | 30.100 | 28.850 | 30.100 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 104.822 | 107.243 | 100.664 | 107.243 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.671 | 0.716 | 0.649 | 0.716 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 16.720 | 16.854 | 16.610 | 16.854 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.098 | 0.135 | 0.091 | 0.135 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.637 | 0.661 | 0.633 | 0.661 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 173.914 | 204.725 | 171.571 | 204.725 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1447.434 | 1518.186 | 1444.762 | 1518.186 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 167.194 | 208.601 | 164.105 | 208.601 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1424.296 | 1428.019 | 1417.932 | 1428.019 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.114 | 0.135 | 0.100 | 0.135 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.679 | 2.931 | 2.658 | 2.931 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.024 | 0.203 | 0.016 | 0.203 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.638 | 0.655 | 0.634 | 0.655 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.774 | 8.253 | 2.546 | 8.253 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.683 | 17.272 | 16.587 | 17.272 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.735 | 3.323 | 2.657 | 3.323 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 16.217 | 16.392 | 15.958 | 16.392 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.778 | 3.235 | 2.646 | 3.235 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 11.934 | 12.126 | 11.880 | 12.126 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.411 | 0.921 | 0.400 | 0.921 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.912 | 4.528 | 3.840 | 4.528 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.024 | 0.016 | 0.024 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.474 | 0.462 | 0.474 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 177.153 | 182.094 | 174.667 | 182.094 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1459.868 | 1476.703 | 1456.004 | 1476.703 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 166.400 | 242.921 | 164.130 | 242.921 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1445.166 | 1605.668 | 1429.620 | 1605.668 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.170 | 0.232 | 0.145 | 0.232 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.314 | 3.459 | 3.283 | 3.459 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.019 | 0.028 | 0.015 | 0.028 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.596 | 0.617 | 0.568 | 0.617 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.535 | 7.178 | 6.405 | 7.178 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.345 | 35.724 | 34.075 | 35.724 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.659 | 6.834 | 6.603 | 6.834 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.602 | 34.303 | 33.492 | 34.303 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.302 | 7.700 | 7.225 | 7.700 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.789 | 30.057 | 29.572 | 30.057 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.262 | 0.284 | 0.238 | 0.284 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.367 | 4.533 | 4.212 | 4.533 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.007 | 0.004 | 0.007 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.479 | 0.446 | 0.479 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 176.404 | 200.495 | 171.530 | 200.495 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1440.028 | 1467.007 | 1438.174 | 1467.007 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 162.682 | 176.504 | 159.009 | 176.504 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1446.459 | 1520.112 | 1426.146 | 1520.112 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.101 | 0.129 | 0.092 | 0.129 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.003 | 2.054 | 1.952 | 2.054 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.023 | 0.036 | 0.015 | 0.036 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.357 | 0.378 | 0.344 | 0.378 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.010 | 3.374 | 1.744 | 3.374 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.269 | 14.767 | 14.174 | 14.767 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.925 | 2.126 | 1.823 | 2.126 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.751 | 13.983 | 13.674 | 13.983 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 2.081 | 3.002 | 1.784 | 3.002 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.850 | 11.520 | 10.668 | 11.520 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.214 | 0.300 | 0.190 | 0.300 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.690 | 2.731 | 2.660 | 2.731 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.193 | 0.202 | 0.180 | 0.202 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.122 | 1.133 | 1.115 | 1.133 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 196.208 | 199.181 | 193.159 | 199.181 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1475.795 | 1489.509 | 1462.727 | 1489.509 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 168.640 | 172.384 | 167.397 | 172.384 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1434.960 | 1458.994 | 1434.922 | 1458.994 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.298 | 0.349 | 0.288 | 0.349 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.641 | 5.723 | 5.585 | 5.723 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.029 | 0.036 | 0.025 | 0.036 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.714 | 1.740 | 1.711 | 1.740 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.107 | 11.754 | 11.074 | 11.754 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 45.118 | 45.552 | 45.099 | 45.552 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.861 | 12.213 | 11.350 | 12.213 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.570 | 45.074 | 43.284 | 45.074 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.121 | 12.227 | 10.929 | 12.227 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.370 | 37.790 | 37.310 | 37.790 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.873 | 1.193 | 0.811 | 1.193 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.110 | 6.147 | 6.103 | 6.147 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.019 | 0.009 | 0.019 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.483 | 0.500 | 0.469 | 0.500 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 172.264 | 198.905 | 168.452 | 198.905 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1449.584 | 1488.002 | 1433.615 | 1488.002 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 160.854 | 165.918 | 159.277 | 165.918 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1426.553 | 1449.213 | 1420.713 | 1449.213 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.143 | 0.223 | 0.132 | 0.223 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.574 | 3.783 | 3.497 | 3.783 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.024 | 0.028 | 0.017 | 0.028 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.600 | 0.650 | 0.579 | 0.650 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.715 | 3.179 | 1.422 | 3.179 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 17.119 | 19.302 | 16.447 | 19.302 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.766 | 1.832 | 1.704 | 1.832 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 16.089 | 16.666 | 15.943 | 16.666 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.875 | 2.623 | 1.751 | 2.623 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.195 | 11.707 | 11.067 | 11.707 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.159 | 0.184 | 0.154 | 0.184 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.900 | 5.022 | 4.838 | 5.022 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.124 | 0.161 | 0.103 | 0.161 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.692 | 0.726 | 0.664 | 0.726 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 175.012 | 176.053 | 172.231 | 176.053 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1447.540 | 1468.957 | 1434.549 | 1468.957 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 166.224 | 170.126 | 161.236 | 170.126 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1426.834 | 1482.572 | 1419.468 | 1482.572 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.139 | 0.192 | 0.120 | 0.192 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.005 | 3.161 | 2.967 | 3.161 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.025 | 0.035 | 0.020 | 0.035 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.726 | 0.781 | 0.703 | 0.781 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.547 | 3.019 | 2.488 | 3.019 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.782 | 15.201 | 14.694 | 15.201 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.645 | 3.187 | 2.624 | 3.187 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 14.068 | 17.023 | 13.836 | 17.023 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.947 | 3.743 | 2.452 | 3.743 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.423 | 11.814 | 10.182 | 11.814 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.466 | 1.230 | 0.448 | 1.230 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.622 | 5.956 | 3.550 | 5.956 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.031 | 0.033 | 0.028 | 0.033 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.529 | 0.560 | 0.516 | 0.560 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 159.223 | 169.068 | 157.068 | 169.068 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1431.260 | 1465.557 | 1421.675 | 1465.557 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.097 | 0.116 | 0.080 | 0.116 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.240 | 2.321 | 2.216 | 2.321 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.020 | 0.021 | 0.014 | 0.021 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.525 | 0.543 | 0.514 | 0.543 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.377 | 1.396 | 1.330 | 1.396 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.755 | 12.122 | 11.549 | 12.122 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.980 | 2.172 | 1.615 | 2.172 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.080 | 11.726 | 10.999 | 11.726 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.119 | 3.416 | 1.596 | 3.416 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.124 | 8.294 | 7.954 | 8.294 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.251 | 0.333 | 0.236 | 0.333 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.089 | 3.226 | 3.026 | 3.226 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 161.054 | 164.613 | 156.798 | 164.613 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1425.052 | 1451.127 | 1422.735 | 1451.127 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.208 | 0.346 | 0.189 | 0.346 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.412 | 2.464 | 2.382 | 2.464 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.020 | 0.022 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.450 | 0.454 | 0.441 | 0.454 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 31.502 | 32.388 | 31.377 | 32.388 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 111.160 | 112.374 | 111.138 | 112.374 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.315 | 0.354 | 0.249 | 0.354 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.419 | 3.835 | 3.361 | 3.835 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 157.559 | 158.991 | 157.084 | 158.991 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1424.080 | 1442.722 | 1423.432 | 1442.722 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.183 | 0.205 | 0.173 | 0.205 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.079 | 2.155 | 2.078 | 2.155 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.032 | 0.049 | 0.023 | 0.049 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.409 | 0.440 | 0.384 | 0.440 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.209 | 26.957 | 25.967 | 26.957 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 84.745 | 85.527 | 84.716 | 85.527 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.181 | 0.260 | 0.162 | 0.260 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.642 | 2.685 | 2.641 | 2.685 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 160.730 | 162.038 | 160.053 | 162.038 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1433.788 | 1449.562 | 1422.657 | 1449.562 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.166 | 0.228 | 0.150 | 0.228 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.047 | 2.114 | 2.038 | 2.114 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.027 | 0.050 | 0.027 | 0.050 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.390 | 0.408 | 0.386 | 0.408 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.951 | 4.305 | 3.679 | 4.305 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.902 | 20.718 | 19.618 | 20.718 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.171 | 0.317 | 0.164 | 0.317 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.696 | 2.702 | 2.686 | 2.702 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 159.239 | 163.978 | 158.456 | 163.978 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1427.184 | 1507.626 | 1427.028 | 1507.626 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.189 | 0.227 | 0.187 | 0.227 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.072 | 2.140 | 2.050 | 2.140 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.023 | 0.048 | 0.020 | 0.048 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.421 | 0.442 | 0.404 | 0.442 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.913 | 31.351 | 30.886 | 31.351 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 108.532 | 108.974 | 106.960 | 108.974 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.177 | 0.307 | 0.163 | 0.307 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.674 | 2.727 | 2.654 | 2.727 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 159.879 | 161.201 | 159.619 | 161.201 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1422.162 | 1461.159 | 1420.523 | 1461.159 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.153 | 0.221 | 0.148 | 0.221 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.075 | 2.107 | 2.024 | 2.107 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.029 | 0.042 | 0.023 | 0.042 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.410 | 0.426 | 0.380 | 0.426 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.335 | 4.660 | 4.221 | 4.660 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.496 | 21.806 | 20.288 | 21.806 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.158 | 0.305 | 0.155 | 0.305 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.694 | 2.860 | 2.692 | 2.860 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.280 | 168.360 | 159.253 | 168.360 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1429.575 | 1431.591 | 1422.586 | 1431.591 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.179 | 0.214 | 0.178 | 0.214 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.125 | 2.168 | 2.063 | 2.168 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.028 | 0.051 | 0.022 | 0.051 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.417 | 0.433 | 0.404 | 0.433 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 30.871 | 32.631 | 30.698 | 32.631 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 108.643 | 108.824 | 107.086 | 108.824 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.158 | 0.231 | 0.135 | 0.231 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.804 | 4.466 | 2.731 | 4.466 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 158.427 | 161.935 | 156.347 | 161.935 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1446.962 | 1490.852 | 1442.492 | 1490.852 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.189 | 0.227 | 0.165 | 0.227 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.147 | 2.217 | 2.064 | 2.217 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.028 | 0.041 | 0.021 | 0.041 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.405 | 0.439 | 0.401 | 0.439 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.184 | 4.513 | 3.997 | 4.513 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 21.286 | 23.693 | 20.362 | 23.693 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.162 | 0.182 | 0.159 | 0.182 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.745 | 3.358 | 2.705 | 3.358 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 191.842 | 194.415 | 190.674 | 194.415 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1609.671 | 1643.976 | 1599.829 | 1643.976 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 176.121 | 259.559 | 174.811 | 259.559 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1597.150 | 1652.000 | 1585.850 | 1652.000 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.169 | 0.389 | 0.147 | 0.389 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.402 | 2.577 | 2.282 | 2.577 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.023 | 0.031 | 0.022 | 0.031 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.550 | 0.609 | 0.535 | 0.609 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.055 | 0.086 | 0.042 | 0.086 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.599 | 0.621 | 0.581 | 0.621 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.692 | 13.641 | 11.444 | 13.641 | 145.3 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 158.503 | 176.332 | 156.423 | 176.332 | 128.4 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 350.818 | 368.525 | 346.847 | 368.525 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2128.888 | 2239.255 | 2120.439 | 2239.255 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 245.064 | 247.887 | 242.556 | 247.887 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1834.116 | 1849.177 | 1806.874 | 1849.177 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.225 | 0.282 | 0.199 | 0.282 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.513 | 3.692 | 3.469 | 3.692 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.028 | 0.079 | 0.018 | 0.079 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.431 | 1.495 | 1.425 | 1.495 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.055 | 0.068 | 0.054 | 0.068 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.410 | 1.431 | 1.393 | 1.431 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 69.008 | 69.640 | 68.715 | 69.640 | 155.9 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 373.410 | 385.216 | 370.666 | 385.216 | 162.8 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 191.870 | 220.516 | 179.727 | 220.516 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1473.381 | 1495.515 | 1468.578 | 1495.515 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 200.793 | 229.872 | 166.118 | 229.872 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1472.549 | 1526.415 | 1446.435 | 1526.415 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.213 | 0.409 | 0.188 | 0.409 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.667 | 3.847 | 3.604 | 3.847 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.030 | 0.041 | 0.024 | 0.041 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.652 | 0.667 | 0.632 | 0.667 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.160 | 0.029 | 0.160 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.530 | 0.554 | 0.510 | 0.554 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.695 | 2.521 | 0.547 | 2.521 | 137.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.273 | 38.988 | 24.871 | 38.988 | 128.4 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 183.299 | 214.478 | 178.382 | 214.478 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1517.815 | 1659.226 | 1507.509 | 1659.226 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.856 | 208.938 | 164.472 | 208.938 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1502.058 | 1543.775 | 1498.929 | 1543.775 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.209 | 0.321 | 0.197 | 0.321 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.765 | 5.129 | 3.649 | 5.129 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.033 | 0.064 | 0.024 | 0.064 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.675 | 0.796 | 0.642 | 0.796 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.067 | 0.032 | 0.067 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.526 | 0.546 | 0.503 | 0.546 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.784 | 1.293 | 0.703 | 1.293 | 134.4 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 67.770 | 69.031 | 67.497 | 69.031 | 128.4 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 179.213 | 188.230 | 173.893 | 188.230 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1467.718 | 1488.694 | 1455.329 | 1488.694 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.235 | 168.412 | 161.040 | 168.412 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1442.890 | 1520.148 | 1429.851 | 1520.148 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.168 | 0.208 | 0.154 | 0.208 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.201 | 2.414 | 2.146 | 2.414 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.029 | 0.018 | 0.029 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.411 | 0.429 | 0.403 | 0.429 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.017 | 0.044 | 0.013 | 0.044 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.461 | 0.478 | 0.437 | 0.478 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.343 | 0.402 | 0.283 | 0.402 | 134.6 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.575 | 19.989 | 19.548 | 19.989 | 128.4 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 174.242 | 177.234 | 172.999 | 177.234 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1483.023 | 1499.382 | 1457.596 | 1499.382 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.074 | 160.780 | 159.138 | 160.780 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1481.409 | 1713.454 | 1450.065 | 1713.454 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.178 | 0.211 | 0.172 | 0.211 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.178 | 2.438 | 2.138 | 2.438 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.023 | 0.030 | 0.019 | 0.030 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.455 | 0.504 | 0.429 | 0.504 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.010 | 0.011 | 0.010 | 0.011 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.474 | 0.528 | 0.462 | 0.528 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.203 | 0.754 | 0.180 | 0.754 | 136.5 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 17.061 | 18.806 | 16.791 | 18.806 | 128.4 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 221.604 | 295.636 | 219.817 | 295.636 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1795.677 | 1808.855 | 1792.826 | 1808.855 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.160 | 1.405 | 0.144 | 1.405 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.683 | 0.716 | 0.653 | 0.716 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 9.333 | 10.681 | 8.732 | 10.681 | 160.1 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 247.399 | 263.005 | 244.874 | 263.005 | 128.4 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 158.667 | 176.700 | 158.149 | 176.700 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1444.006 | 1522.146 | 1442.258 | 1522.146 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.407 | 0.536 | 0.355 | 0.536 | 133.2 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.886 | 17.186 | 16.728 | 17.186 | 128.4 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 26.890 | 28.038 | 26.141 | 28.038 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 86.795 | 87.760 | 86.597 | 87.760 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 7.966 | 8.995 | 7.830 | 8.995 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.773 | 28.918 | 21.226 | 28.918 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 26.074 | 28.731 | 25.681 | 28.731 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 86.831 | 92.057 | 86.415 | 92.057 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 27.004 | 27.360 | 26.251 | 27.360 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.363 | 77.736 | 72.895 | 77.736 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:13:05 - cmdstanpy - INFO - Chain [1] start processing<br>04:13:05 - cmdstanpy - INFO - Chain [1] done processing<br>04:13:05 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=38511 data file=/tmp/tmpf5ppyher/q0ctllzm.json init=/tmp/tmpf5ppyher/1esbi0y0.json output file=/tmp/tmpf5ppyher/prophet_modelg7qyupvc/prophet_model-20261101041305.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpf5ppyher/q0ctllzm.json<br>init = /tmp/tmpf5ppyher/1esbi0y0.json<br>random<br>  seed = 38511<br>output<br>  file = /tmp/tmpf5ppyher/prophet_modelg7qyupvc/prophet_model-20261101041305.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=38511 data file=/tmp/tmpf5ppyher/q0ctllzm.json init=/tmp/tmpf5ppyher/1esbi0y0.json output file=/tmp/tmpf5ppyher/prophet_modelg7qyupvc/prophet_model-20261101041305.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:13:07 - cmdstanpy - INFO - Chain [1] start processing<br>04:13:07 - cmdstanpy - INFO - Chain [1] done processing<br>04:13:07 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=61422 data file=/tmp/tmpw6fkp0sx/3l9iiqys.json init=/tmp/tmpw6fkp0sx/e4yat53s.json output file=/tmp/tmpw6fkp0sx/prophet_model2jawtckg/prophet_model-20261101041307.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpw6fkp0sx/3l9iiqys.json<br>init = /tmp/tmpw6fkp0sx/e4yat53s.json<br>random<br>  seed = 61422<br>output<br>  file = /tmp/tmpw6fkp0sx/prophet_model2jawtckg/prophet_model-20261101041307.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=61422 data file=/tmp/tmpw6fkp0sx/3l9iiqys.json init=/tmp/tmpw6fkp0sx/e4yat53s.json output file=/tmp/tmpw6fkp0sx/prophet_model2jawtckg/prophet_model-20261101041307.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `d257017e74eed1851f8b417b13292b5664bceab4`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:f392e6fb56de40f0d00e5ccc66468444dc556abc02d29cfa10ba0de95202ccfc`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:e0c58934a5fdcefc8fde2f0c0c67c85982d6e9862c3d3165b724a767a8143ce7`

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

