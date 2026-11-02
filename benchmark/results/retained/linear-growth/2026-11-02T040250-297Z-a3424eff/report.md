# Effect Prophet benchmark — 2026-11-02T040250-297Z-a3424eff

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
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 23.936 | 24.904 | 23.497 | 24.904 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 199.410 | 214.602 | 195.537 | 214.602 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.220 | 7.472 | 6.695 | 7.472 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 29.552 | 30.377 | 29.163 | 30.377 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 12.861 | 13.108 | 12.763 | 13.108 | 150.4 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 174.321 | 184.645 | 165.209 | 184.645 | 130.0 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.026 | 0.014 | 0.026 | 138.5 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.456 | 0.473 | 0.450 | 0.473 | 147.8 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 178.949 | 183.928 | 174.537 | 183.928 | 153.6 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1610.782 | 1625.058 | 1594.562 | 1625.058 | 147.8 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 162.013 | 171.096 | 158.986 | 171.096 | 167.3 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1620.455 | 1637.500 | 1599.926 | 1637.500 | 147.8 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 1.210 | 1.312 | 1.155 | 1.312 | 164.1 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.235 | 3.616 | 3.175 | 3.616 | 147.8 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.108 | 0.125 | 0.106 | 0.125 | 155.1 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.510 | 0.552 | 0.504 | 0.552 | 147.8 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.959 | 5.166 | 4.728 | 5.166 | 153.3 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 27.396 | 42.383 | 26.721 | 42.383 | 147.8 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.083 | 5.326 | 4.944 | 5.326 | 152.4 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.586 | 29.763 | 26.420 | 29.763 | 147.8 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.525 | 5.745 | 5.259 | 5.745 | 148.7 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 20.959 | 21.719 | 20.827 | 21.719 | 147.8 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.236 | 0.310 | 0.207 | 0.310 | 149.1 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.327 | 5.592 | 5.290 | 5.592 | 147.8 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.015 | 0.011 | 0.015 | 135.3 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.472 | 0.498 | 0.438 | 0.498 | 128.5 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 172.830 | 181.825 | 172.650 | 181.825 | 150.8 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1440.445 | 1463.568 | 1434.317 | 1463.568 | 128.5 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 157.026 | 199.018 | 155.297 | 199.018 | 150.8 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1437.862 | 1509.589 | 1418.339 | 1509.589 | 128.5 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.446 | 0.550 | 0.390 | 0.550 | 150.8 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.925 | 4.033 | 3.863 | 4.033 | 128.5 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.024 | 0.037 | 0.019 | 0.037 | 150.8 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.680 | 0.734 | 0.661 | 0.734 | 128.5 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.730 | 4.571 | 3.629 | 4.571 | 150.6 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.462 | 22.840 | 22.272 | 22.840 | 128.5 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.856 | 3.936 | 3.743 | 3.936 | 146.8 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.251 | 22.637 | 21.956 | 22.637 | 128.5 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.517 | 5.592 | 4.459 | 5.592 | 145.1 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.504 | 18.937 | 17.213 | 18.937 | 128.5 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.145 | 0.153 | 0.122 | 0.153 | 146.7 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.724 | 4.932 | 4.688 | 4.932 | 128.5 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.025 | 0.038 | 0.015 | 0.038 | 139.1 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.454 | 0.479 | 0.450 | 0.479 | 128.5 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 181.779 | 185.381 | 175.901 | 185.381 | 155.2 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1447.793 | 1548.112 | 1433.845 | 1548.112 | 128.5 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 164.940 | 195.159 | 161.739 | 195.159 | 155.2 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1454.721 | 1504.321 | 1421.381 | 1504.321 | 128.5 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.396 | 0.674 | 0.361 | 0.674 | 155.2 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.936 | 4.275 | 3.833 | 4.275 | 128.5 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.031 | 0.017 | 0.031 | 155.2 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.687 | 0.774 | 0.672 | 0.774 | 128.5 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.481 | 5.282 | 4.201 | 5.282 | 155.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.602 | 23.953 | 23.247 | 23.953 | 128.5 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.223 | 5.663 | 4.132 | 5.663 | 152.0 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 23.160 | 25.613 | 22.940 | 25.613 | 128.5 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.525 | 7.169 | 4.855 | 7.169 | 151.6 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 19.114 | 20.746 | 18.279 | 20.746 | 128.5 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.144 | 0.186 | 0.132 | 0.186 | 151.6 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.693 | 5.011 | 4.609 | 5.011 | 128.5 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.046 | 0.069 | 0.044 | 0.069 | 140.8 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.519 | 0.543 | 0.494 | 0.543 | 148.5 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 184.281 | 192.956 | 174.559 | 192.956 | 159.2 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1639.164 | 1660.787 | 1607.644 | 1660.787 | 148.5 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 170.071 | 181.432 | 163.022 | 181.432 | 175.9 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1608.357 | 1839.122 | 1591.156 | 1839.122 | 148.5 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 1.911 | 4.562 | 1.267 | 4.562 | 172.8 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.555 | 8.358 | 4.342 | 8.358 | 148.5 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.146 | 0.338 | 0.128 | 0.338 | 163.0 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.762 | 0.817 | 0.732 | 0.817 | 148.5 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.675 | 5.101 | 4.560 | 5.101 | 158.8 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 33.444 | 33.781 | 33.004 | 33.781 | 148.5 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 4.922 | 5.771 | 4.865 | 5.771 | 157.9 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 33.322 | 34.068 | 33.042 | 34.068 | 148.5 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.471 | 6.349 | 5.183 | 6.349 | 152.1 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 26.708 | 28.485 | 26.339 | 28.485 | 148.5 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.215 | 0.231 | 0.208 | 0.231 | 156.8 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.394 | 6.773 | 6.311 | 6.773 | 148.5 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.052 | 0.067 | 0.036 | 0.067 | 136.7 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.508 | 0.545 | 0.495 | 0.545 | 147.5 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 178.905 | 192.812 | 175.650 | 192.812 | 155.7 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1633.493 | 1694.675 | 1611.946 | 1694.675 | 147.5 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 168.178 | 170.375 | 165.524 | 170.375 | 172.9 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1613.883 | 1648.822 | 1603.761 | 1648.822 | 147.5 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 1.222 | 1.523 | 1.165 | 1.523 | 169.4 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.352 | 4.512 | 4.305 | 4.512 | 147.5 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.139 | 0.152 | 0.117 | 0.152 | 159.5 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.752 | 0.797 | 0.724 | 0.797 | 147.5 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.877 | 5.006 | 4.820 | 5.006 | 155.4 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 34.087 | 35.631 | 33.799 | 35.631 | 147.5 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.302 | 5.982 | 5.155 | 5.982 | 154.5 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 33.355 | 34.235 | 33.191 | 34.235 | 147.5 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 5.713 | 6.407 | 5.378 | 6.407 | 148.6 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 28.218 | 38.659 | 27.723 | 38.659 | 147.5 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.219 | 0.239 | 0.214 | 0.239 | 151.2 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.335 | 6.814 | 6.204 | 6.814 | 147.5 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 141.6 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.496 | 0.456 | 0.496 | 148.4 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 176.700 | 181.227 | 175.064 | 181.227 | 158.2 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1609.256 | 1667.863 | 1600.390 | 1667.863 | 148.4 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 165.234 | 176.565 | 160.533 | 176.565 | 159.3 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1604.177 | 1618.252 | 1583.048 | 1618.252 | 148.4 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.816 | 0.874 | 0.765 | 0.874 | 159.3 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.953 | 4.042 | 3.899 | 4.042 | 148.4 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.110 | 0.130 | 0.100 | 0.130 | 159.3 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.714 | 0.735 | 0.697 | 0.735 | 148.4 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.207 | 4.324 | 4.161 | 4.324 | 158.1 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.885 | 27.559 | 26.468 | 27.559 | 148.4 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.471 | 4.702 | 4.364 | 4.702 | 156.8 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 26.056 | 34.066 | 25.953 | 34.066 | 148.4 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 4.797 | 6.409 | 4.737 | 6.409 | 152.3 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.410 | 21.494 | 20.315 | 21.494 | 148.4 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.203 | 0.217 | 0.202 | 0.217 | 152.6 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.564 | 5.755 | 5.478 | 5.755 | 148.4 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.021 | 0.045 | 0.014 | 0.045 | 140.6 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.481 | 0.535 | 0.469 | 0.535 | 148.4 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 200.077 | 244.655 | 191.093 | 244.655 | 159.1 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1612.633 | 1642.131 | 1597.997 | 1642.131 | 148.4 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 168.139 | 180.232 | 166.357 | 180.232 | 172.5 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1575.851 | 1596.523 | 1572.011 | 1596.523 | 148.4 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 1.589 | 1.939 | 1.460 | 1.939 | 169.6 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.922 | 4.056 | 3.870 | 4.056 | 148.4 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.183 | 0.190 | 0.145 | 0.190 | 160.6 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.686 | 0.758 | 0.659 | 0.758 | 148.4 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.812 | 58.647 | 4.611 | 58.647 | 159.0 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.537 | 28.500 | 27.420 | 28.500 | 148.4 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.471 | 11.831 | 5.199 | 11.831 | 157.8 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 27.278 | 27.528 | 26.905 | 27.528 | 148.4 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 6.384 | 7.557 | 5.539 | 7.557 | 154.2 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.662 | 24.604 | 21.362 | 24.604 | 148.4 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.342 | 2.889 | 0.256 | 2.889 | 154.3 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.530 | 5.673 | 5.481 | 5.673 | 148.4 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 18.585 | 20.404 | 17.659 | 20.404 | 157.2 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 137.166 | 155.057 | 137.140 | 155.057 | 128.5 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 23.720 | 27.572 | 22.684 | 27.572 | 156.8 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 143.960 | 164.735 | 136.743 | 164.735 | 128.5 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.164 | 7.094 | 5.798 | 7.094 | 150.2 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 29.746 | 30.788 | 29.607 | 30.788 | 128.5 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.189 | 0.510 | 0.177 | 0.510 | 155.5 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.5 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.260 | 0.296 | 0.244 | 0.296 | 152.9 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.008 | 0.011 | 128.5 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 21.310 | 22.486 | 21.058 | 22.486 | 149.5 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 152.019 | 155.588 | 151.134 | 155.588 | 128.5 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 11.554 | 14.046 | 11.149 | 14.046 | 147.7 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 77.040 | 84.652 | 76.208 | 84.652 | 128.5 |
| evaluation-linear-long-history-parallel | evaluation-intervals-processes | python-prophet | 4 | 2955.114 | 3146.861 | 2813.155 | 3146.861 | 139.9 |
| evaluation-linear-long-history-parallel | evaluation-intervals-threads | python-prophet | 4 | 1102.343 | 1105.154 | 1098.066 | 1105.154 | 139.9 |
| evaluation-linear-long-history-parallel | evaluation-intervals | effect-prophet | 4 | 949.639 | 966.877 | 948.193 | 966.877 | 202.1 |
| evaluation-linear-long-history-parallel | evaluation-intervals | python-prophet | 4 | 2498.332 | 2537.903 | 2495.628 | 2537.903 | 138.2 |
| evaluation-linear-long-history-parallel | evaluation-point-processes | python-prophet | 4 | 2974.818 | 3974.165 | 2898.368 | 3974.165 | 137.9 |
| evaluation-linear-long-history-parallel | evaluation-point-threads | python-prophet | 4 | 1209.688 | 1936.038 | 1137.570 | 1936.038 | 137.9 |
| evaluation-linear-long-history-parallel | evaluation-point | effect-prophet | 4 | 953.413 | 989.982 | 944.687 | 989.982 | 192.3 |
| evaluation-linear-long-history-parallel | evaluation-point | python-prophet | 4 | 2463.519 | 2677.730 | 2452.544 | 2677.730 | 128.5 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 181.097 | 200.122 | 180.350 | 200.122 | 152.8 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1482.651 | 1504.650 | 1475.649 | 1504.650 | 128.5 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.053 | 1.162 | 1.047 | 1.162 | 152.7 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.123 | 1.125 | 1.095 | 1.125 | 128.5 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.008 | 0.009 | 0.007 | 0.009 | 130.9 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.424 | 0.455 | 0.401 | 0.455 | 128.5 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.054 | 0.080 | 0.051 | 0.080 | 152.5 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.407 | 5.601 | 5.367 | 5.601 | 128.5 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.049 | 1.192 | 1.003 | 1.192 | 134.4 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.670 | 0.703 | 0.649 | 0.703 | 128.5 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 10.238 | 10.913 | 10.107 | 10.913 | 152.5 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 71.052 | 73.798 | 70.307 | 73.798 | 128.5 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 53.622 | 56.099 | 51.728 | 56.099 | 155.1 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 238.028 | 254.417 | 234.098 | 254.417 | 128.5 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 235.648 | 239.578 | 234.510 | 239.578 | 159.5 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1502.702 | 1541.418 | 1488.643 | 1541.418 | 128.5 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 2.552 | 3.165 | 2.523 | 3.165 | 157.6 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.311 | 1.468 | 1.300 | 1.468 | 128.5 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.151 | 0.177 | 0.148 | 0.177 | 133.9 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.538 | 0.571 | 0.532 | 0.571 | 128.5 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.061 | 0.097 | 0.058 | 0.097 | 157.0 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 4.976 | 5.080 | 4.934 | 5.080 | 128.5 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.120 | 2.380 | 2.079 | 2.380 | 143.1 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.763 | 0.823 | 0.744 | 0.823 | 128.5 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 51.021 | 52.995 | 50.438 | 52.995 | 156.7 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 168.249 | 172.011 | 166.935 | 172.011 | 128.5 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.078 | 6.356 | 6.041 | 6.356 | 154.0 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 30.148 | 30.898 | 29.875 | 30.898 | 128.5 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.204 | 0.326 | 0.183 | 0.326 | 154.6 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.5 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.216 | 0.257 | 0.208 | 0.257 | 154.3 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.009 | 0.012 | 128.5 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 19.882 | 22.669 | 19.407 | 22.669 | 152.8 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 156.094 | 162.716 | 151.891 | 162.716 | 128.5 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.057 | 1.213 | 0.997 | 1.213 | 148.7 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.368 | 1.449 | 1.350 | 1.449 | 128.5 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.864 | 3.928 | 3.852 | 3.928 | 152.6 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 23.726 | 25.112 | 23.249 | 25.112 | 128.5 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.871 | 1.331 | 0.798 | 1.331 | 129.1 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.989 | 2.445 | 0.928 | 2.445 | 128.5 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 6.491 | 8.029 | 5.955 | 8.029 | 143.5 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 52.970 | 73.650 | 52.847 | 73.650 | 128.5 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.195 | 0.205 | 0.178 | 0.205 | 153.0 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.003 | 0.005 | 128.5 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.241 | 0.398 | 0.239 | 0.398 | 153.0 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.008 | 0.011 | 128.5 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 6.719 | 8.292 | 6.662 | 8.292 | 152.5 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 55.514 | 58.048 | 55.058 | 58.048 | 128.5 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.028 | 0.061 | 0.012 | 0.077 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.556 | 0.572 | 0.540 | 0.585 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.509 | 0.620 | 0.374 | 0.717 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.640 | 2.697 | 2.593 | 2.722 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.024 | 0.034 | 0.023 | 0.034 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.543 | 0.584 | 0.516 | 0.584 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 172.603 | 178.675 | 170.565 | 178.675 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1449.411 | 1483.805 | 1430.023 | 1483.805 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 157.946 | 162.518 | 154.095 | 162.518 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1424.399 | 1450.878 | 1418.746 | 1450.878 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.134 | 0.278 | 0.128 | 0.278 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.277 | 2.453 | 2.213 | 2.453 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.030 | 0.047 | 0.025 | 0.047 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.560 | 0.598 | 0.542 | 0.598 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.267 | 6.305 | 6.161 | 6.305 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 18.203 | 19.402 | 17.568 | 19.402 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.363 | 7.231 | 6.239 | 7.231 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 19.232 | 20.552 | 17.178 | 20.552 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.942 | 7.753 | 6.816 | 7.753 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.691 | 14.450 | 13.570 | 14.450 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.253 | 0.263 | 0.234 | 0.263 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.140 | 3.190 | 3.054 | 3.190 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.040 | 0.061 | 0.038 | 0.061 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.564 | 0.591 | 0.535 | 0.591 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 194.779 | 197.468 | 191.943 | 197.468 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1524.224 | 1646.999 | 1510.159 | 1646.999 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 157.647 | 168.622 | 156.068 | 168.622 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1458.004 | 1492.565 | 1432.861 | 1492.565 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.141 | 0.149 | 0.135 | 0.149 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.599 | 3.129 | 2.391 | 3.129 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.024 | 0.091 | 0.023 | 0.091 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.614 | 0.704 | 0.589 | 0.704 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 26.042 | 27.444 | 25.430 | 27.444 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 90.583 | 92.081 | 89.840 | 92.081 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.688 | 27.112 | 25.463 | 27.112 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 90.282 | 95.765 | 88.765 | 95.765 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 27.404 | 28.669 | 25.645 | 28.669 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 86.899 | 92.717 | 85.855 | 92.717 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.318 | 0.333 | 0.287 | 0.333 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.110 | 3.244 | 3.059 | 3.244 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.010 | 0.004 | 0.010 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.468 | 0.849 | 0.415 | 0.849 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 191.400 | 195.656 | 186.172 | 195.656 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1514.016 | 1560.190 | 1493.145 | 1560.190 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 158.898 | 169.097 | 158.176 | 169.097 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1435.286 | 1476.669 | 1417.828 | 1476.669 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.141 | 0.183 | 0.136 | 0.183 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.189 | 2.668 | 2.028 | 2.668 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.026 | 0.055 | 0.024 | 0.055 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.392 | 0.416 | 0.372 | 0.416 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.140 | 20.174 | 18.117 | 20.174 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 65.365 | 68.970 | 64.626 | 68.970 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.210 | 18.395 | 18.146 | 18.395 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 66.502 | 70.249 | 65.278 | 70.249 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.191 | 18.399 | 18.069 | 18.399 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 61.382 | 62.666 | 60.112 | 62.666 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.220 | 0.267 | 0.205 | 0.267 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.175 | 3.321 | 3.122 | 3.321 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.047 | 0.072 | 0.037 | 0.072 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.513 | 0.543 | 0.500 | 0.543 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 183.100 | 209.786 | 174.829 | 209.786 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1442.099 | 1452.390 | 1434.228 | 1452.390 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 166.064 | 185.471 | 165.574 | 185.471 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1428.850 | 1434.575 | 1418.886 | 1434.575 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.120 | 0.169 | 0.117 | 0.169 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.591 | 3.696 | 3.546 | 3.696 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.036 | 0.038 | 0.029 | 0.038 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.621 | 0.668 | 0.618 | 0.668 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.891 | 5.511 | 4.801 | 5.511 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.954 | 28.282 | 27.862 | 28.282 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.843 | 5.350 | 4.764 | 5.350 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.314 | 28.943 | 27.035 | 28.943 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.477 | 6.313 | 5.477 | 6.313 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.568 | 23.145 | 22.472 | 23.145 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.284 | 0.418 | 0.258 | 0.418 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.726 | 4.879 | 4.692 | 4.879 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.025 | 0.016 | 0.025 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.469 | 0.493 | 0.447 | 0.493 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 182.811 | 202.679 | 177.177 | 202.679 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1493.911 | 1567.807 | 1471.553 | 1567.807 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.770 | 166.170 | 161.504 | 166.170 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1476.657 | 1544.174 | 1438.509 | 1544.174 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.213 | 0.105 | 0.213 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.164 | 2.317 | 2.131 | 2.317 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.032 | 0.048 | 0.030 | 0.048 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.420 | 0.493 | 0.412 | 0.493 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.695 | 5.186 | 4.611 | 5.186 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 28.089 | 28.922 | 27.180 | 28.922 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.070 | 5.597 | 4.860 | 5.597 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 27.690 | 35.024 | 26.687 | 35.024 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.359 | 5.438 | 5.078 | 5.438 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 24.143 | 32.905 | 23.033 | 32.905 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.239 | 0.320 | 0.227 | 0.320 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.079 | 6.120 | 3.035 | 6.120 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.012 | 0.013 | 0.012 | 0.013 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.468 | 0.496 | 0.463 | 0.496 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 175.966 | 178.820 | 175.180 | 178.820 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1469.211 | 1495.464 | 1467.804 | 1495.464 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.945 | 163.195 | 159.999 | 163.195 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1428.994 | 1441.765 | 1412.841 | 1441.765 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.133 | 0.107 | 0.133 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.173 | 2.255 | 2.147 | 2.255 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.027 | 0.022 | 0.027 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.414 | 0.477 | 0.406 | 0.477 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.702 | 5.033 | 4.606 | 5.033 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 28.639 | 29.718 | 27.045 | 29.718 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.434 | 6.550 | 4.987 | 6.550 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.262 | 37.989 | 26.094 | 37.989 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.483 | 6.090 | 5.253 | 6.090 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 24.273 | 25.719 | 23.255 | 25.719 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.264 | 0.338 | 0.236 | 0.338 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.119 | 3.225 | 3.056 | 3.225 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.145 | 0.167 | 0.138 | 0.167 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.606 | 0.639 | 0.602 | 0.639 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 206.582 | 234.460 | 204.491 | 234.460 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1465.647 | 1751.900 | 1440.747 | 1751.900 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 28.183 | 29.031 | 27.744 | 29.031 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 109.632 | 116.720 | 109.005 | 116.720 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 28.091 | 28.325 | 27.865 | 28.325 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 109.716 | 124.526 | 108.020 | 124.526 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 28.607 | 30.100 | 28.165 | 30.100 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 93.752 | 99.380 | 92.700 | 99.380 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.685 | 0.978 | 0.623 | 0.978 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 15.210 | 16.913 | 15.069 | 16.913 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.107 | 0.110 | 0.093 | 0.110 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.647 | 0.672 | 0.638 | 0.672 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 171.951 | 182.598 | 169.152 | 182.598 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1453.889 | 1517.654 | 1437.340 | 1517.654 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 160.880 | 164.394 | 156.410 | 164.394 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1428.366 | 1900.368 | 1416.546 | 1900.368 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.126 | 0.205 | 0.099 | 0.205 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.721 | 2.889 | 2.666 | 2.889 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.028 | 0.016 | 0.028 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.633 | 0.701 | 0.605 | 0.701 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.529 | 3.088 | 2.456 | 3.088 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.658 | 19.571 | 16.581 | 19.571 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.688 | 3.206 | 2.619 | 3.206 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 16.048 | 16.637 | 15.837 | 16.637 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.670 | 2.769 | 2.490 | 2.769 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.217 | 12.463 | 12.148 | 12.463 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.412 | 0.461 | 0.376 | 0.461 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.838 | 3.893 | 3.789 | 3.893 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.018 | 0.014 | 0.018 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.525 | 0.451 | 0.525 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 176.809 | 184.321 | 175.013 | 184.321 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1482.180 | 2193.120 | 1474.050 | 2193.120 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 158.169 | 173.626 | 155.423 | 173.626 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1456.137 | 1490.828 | 1440.614 | 1490.828 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.171 | 0.210 | 0.151 | 0.210 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.431 | 3.830 | 3.224 | 3.830 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.021 | 0.030 | 0.015 | 0.030 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.662 | 0.991 | 0.602 | 0.991 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.719 | 7.444 | 6.589 | 7.444 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.334 | 34.496 | 34.123 | 34.496 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.962 | 7.160 | 6.851 | 7.160 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.887 | 36.180 | 33.770 | 36.180 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.291 | 7.992 | 7.078 | 7.992 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 30.317 | 32.247 | 29.983 | 32.247 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.234 | 0.361 | 0.228 | 0.361 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.395 | 5.195 | 4.293 | 5.195 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.006 | 0.004 | 0.006 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.435 | 0.448 | 0.427 | 0.448 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 171.039 | 182.932 | 166.579 | 182.932 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1474.101 | 1502.257 | 1440.557 | 1502.257 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 162.408 | 188.452 | 161.544 | 188.452 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1434.759 | 1466.110 | 1419.288 | 1466.110 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.085 | 0.098 | 0.071 | 0.098 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.038 | 2.111 | 1.988 | 2.111 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.021 | 0.035 | 0.014 | 0.035 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.348 | 0.414 | 0.341 | 0.414 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.853 | 2.983 | 1.768 | 2.983 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.725 | 14.976 | 14.128 | 14.976 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.848 | 1.941 | 1.769 | 1.941 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.842 | 24.561 | 13.575 | 24.561 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.865 | 2.149 | 1.798 | 2.149 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 11.488 | 11.975 | 10.769 | 11.975 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.197 | 0.291 | 0.195 | 0.291 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.732 | 2.863 | 2.683 | 2.863 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.201 | 0.214 | 0.198 | 0.214 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.146 | 1.379 | 1.127 | 1.379 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 196.368 | 200.007 | 191.627 | 200.007 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1505.749 | 1856.612 | 1469.784 | 1856.612 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 176.678 | 181.182 | 169.910 | 181.182 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1459.572 | 1475.119 | 1440.682 | 1475.119 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.346 | 0.376 | 0.313 | 0.376 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.784 | 7.002 | 5.650 | 7.002 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.030 | 0.025 | 0.030 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.732 | 1.951 | 1.712 | 1.951 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.100 | 11.154 | 11.097 | 11.154 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 50.247 | 63.922 | 49.106 | 63.922 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.355 | 11.661 | 11.317 | 11.661 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 44.377 | 47.366 | 43.437 | 47.366 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.109 | 12.076 | 11.073 | 12.076 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 38.929 | 39.358 | 38.475 | 39.358 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.825 | 0.888 | 0.787 | 0.888 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.237 | 6.359 | 6.180 | 6.359 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.010 | 0.058 | 0.007 | 0.058 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.484 | 0.525 | 0.472 | 0.525 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 168.389 | 171.251 | 167.123 | 171.251 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1465.336 | 1493.660 | 1431.878 | 1493.660 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 159.486 | 165.085 | 158.151 | 165.085 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1481.637 | 1527.280 | 1429.752 | 1527.280 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.128 | 0.172 | 0.111 | 0.172 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.634 | 4.023 | 3.554 | 4.023 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.024 | 0.030 | 0.017 | 0.030 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.615 | 0.662 | 0.607 | 0.662 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.500 | 2.992 | 1.414 | 2.992 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.920 | 18.017 | 16.636 | 18.017 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.746 | 1.833 | 1.708 | 1.833 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 16.446 | 17.964 | 16.032 | 17.964 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.892 | 2.346 | 1.786 | 2.346 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 12.075 | 13.067 | 11.318 | 13.067 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.162 | 0.176 | 0.142 | 0.176 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 5.001 | 5.196 | 4.895 | 5.196 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.130 | 0.170 | 0.108 | 0.170 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.682 | 0.722 | 0.663 | 0.722 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 170.753 | 189.807 | 167.409 | 189.807 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1462.295 | 1522.078 | 1443.395 | 1522.078 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 160.760 | 174.881 | 156.934 | 174.881 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1426.578 | 1451.438 | 1414.320 | 1451.438 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.125 | 0.181 | 0.117 | 0.181 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.086 | 4.022 | 2.973 | 4.022 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.029 | 0.040 | 0.026 | 0.040 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.742 | 0.751 | 0.718 | 0.751 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.623 | 2.892 | 2.406 | 2.892 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 15.159 | 18.195 | 14.750 | 18.195 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.639 | 3.216 | 2.577 | 3.216 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 15.561 | 16.984 | 13.745 | 16.984 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.989 | 3.879 | 2.436 | 3.879 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.350 | 11.922 | 10.248 | 11.922 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.463 | 0.998 | 0.447 | 0.998 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.670 | 3.764 | 3.550 | 3.764 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.031 | 0.047 | 0.029 | 0.047 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.553 | 0.745 | 0.524 | 0.745 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 160.779 | 166.560 | 159.164 | 166.560 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1428.464 | 1447.284 | 1420.006 | 1447.284 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.101 | 0.115 | 0.075 | 0.115 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.254 | 2.324 | 2.228 | 2.324 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.019 | 0.022 | 0.014 | 0.022 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.509 | 0.526 | 0.501 | 0.526 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.375 | 1.421 | 1.331 | 1.421 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.616 | 11.770 | 11.601 | 11.770 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 2.024 | 2.231 | 1.654 | 2.231 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.072 | 11.541 | 11.032 | 11.541 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.117 | 3.465 | 1.477 | 3.465 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 7.957 | 8.149 | 7.937 | 8.149 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.237 | 0.261 | 0.234 | 0.261 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.089 | 3.200 | 3.051 | 3.200 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 161.688 | 258.306 | 156.291 | 258.306 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1434.486 | 1480.755 | 1426.471 | 1480.755 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.221 | 0.289 | 0.213 | 0.289 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.454 | 2.521 | 2.442 | 2.521 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.025 | 1.565 | 0.019 | 1.565 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.473 | 0.508 | 0.434 | 0.508 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 31.957 | 34.779 | 31.481 | 34.779 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 111.934 | 112.546 | 111.824 | 112.546 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.283 | 0.305 | 0.272 | 0.305 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.448 | 3.568 | 3.417 | 3.568 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.621 | 165.563 | 160.377 | 165.563 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1442.479 | 1509.185 | 1429.307 | 1509.185 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.195 | 0.263 | 0.192 | 0.263 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.100 | 2.167 | 2.077 | 2.167 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.030 | 0.038 | 0.022 | 0.038 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.427 | 0.452 | 0.383 | 0.452 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.682 | 27.103 | 26.665 | 27.103 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 87.117 | 90.939 | 84.162 | 90.939 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.270 | 0.423 | 0.198 | 0.423 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.729 | 2.853 | 2.685 | 2.853 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 158.807 | 171.982 | 156.210 | 171.982 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1426.638 | 1541.637 | 1415.961 | 1541.637 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.166 | 0.195 | 0.147 | 0.195 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.078 | 2.126 | 2.048 | 2.126 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.034 | 0.020 | 0.034 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.390 | 0.421 | 0.382 | 0.421 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.857 | 4.370 | 3.659 | 4.370 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.743 | 20.242 | 19.380 | 20.242 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.151 | 0.171 | 0.151 | 0.171 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.677 | 2.781 | 2.659 | 2.781 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 165.988 | 175.834 | 156.451 | 175.834 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1412.673 | 1424.758 | 1408.241 | 1424.758 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.186 | 0.215 | 0.175 | 0.215 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.113 | 2.211 | 2.105 | 2.211 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.028 | 0.033 | 0.021 | 0.033 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.423 | 0.445 | 0.399 | 0.445 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 31.415 | 31.886 | 31.330 | 31.886 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 106.657 | 111.904 | 106.389 | 111.904 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.174 | 0.203 | 0.167 | 0.203 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.713 | 2.830 | 2.711 | 2.830 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 158.127 | 159.637 | 157.017 | 159.637 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1421.185 | 1557.497 | 1418.562 | 1557.497 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.170 | 0.231 | 0.163 | 0.231 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.021 | 2.073 | 2.015 | 2.073 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.028 | 0.034 | 0.020 | 0.034 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.392 | 0.398 | 0.381 | 0.398 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.937 | 4.194 | 3.876 | 4.194 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.560 | 20.691 | 20.515 | 20.691 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.156 | 0.178 | 0.153 | 0.178 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.641 | 2.675 | 2.602 | 2.675 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 158.479 | 162.328 | 156.085 | 162.328 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1406.700 | 1448.245 | 1403.158 | 1448.245 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.203 | 0.267 | 0.181 | 0.267 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.125 | 2.130 | 2.043 | 2.130 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.021 | 0.031 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.425 | 0.444 | 0.419 | 0.444 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 30.940 | 32.440 | 30.778 | 32.440 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 108.084 | 110.129 | 107.011 | 110.129 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.185 | 0.262 | 0.178 | 0.262 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.747 | 2.796 | 2.688 | 2.796 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 157.669 | 160.287 | 156.484 | 160.287 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1417.248 | 1461.621 | 1415.948 | 1461.621 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.165 | 0.214 | 0.143 | 0.214 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.122 | 2.481 | 2.048 | 2.481 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.025 | 0.035 | 0.021 | 0.035 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.421 | 0.452 | 0.416 | 0.452 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.162 | 4.422 | 4.094 | 4.422 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 23.098 | 23.305 | 21.206 | 23.305 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.162 | 0.203 | 0.157 | 0.203 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.845 | 4.163 | 2.732 | 4.163 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 188.792 | 196.698 | 186.413 | 196.698 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1623.411 | 1682.322 | 1612.699 | 1682.322 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.346 | 176.878 | 172.852 | 176.878 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1598.662 | 1654.179 | 1593.610 | 1654.179 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.163 | 0.197 | 0.147 | 0.197 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.262 | 2.393 | 2.234 | 2.393 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.022 | 0.034 | 0.021 | 0.034 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.552 | 0.571 | 0.529 | 0.571 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.056 | 0.068 | 0.051 | 0.068 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.602 | 0.627 | 0.594 | 0.627 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.555 | 11.943 | 11.367 | 11.943 | 137.4 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 157.409 | 174.858 | 157.233 | 174.858 | 128.5 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 349.287 | 361.741 | 346.445 | 361.741 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2114.210 | 3090.139 | 2110.644 | 3090.139 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 247.655 | 290.339 | 242.625 | 290.339 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1834.967 | 1891.665 | 1806.980 | 1891.665 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.234 | 0.292 | 0.195 | 0.292 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.645 | 4.234 | 3.509 | 4.234 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.024 | 0.035 | 0.018 | 0.035 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.416 | 1.701 | 1.398 | 1.701 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.050 | 0.063 | 0.049 | 0.063 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.453 | 1.470 | 1.440 | 1.470 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 69.859 | 73.014 | 68.597 | 73.014 | 162.4 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 373.651 | 406.007 | 370.011 | 406.007 | 162.8 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 176.440 | 185.000 | 175.225 | 185.000 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1461.817 | 1479.135 | 1455.995 | 1479.135 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.107 | 174.750 | 161.369 | 174.750 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1444.860 | 1501.130 | 1435.666 | 1501.130 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.230 | 0.297 | 0.195 | 0.297 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.570 | 3.765 | 3.528 | 3.765 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.053 | 0.023 | 0.053 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.641 | 0.652 | 0.620 | 0.652 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.041 | 0.064 | 0.029 | 0.064 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.509 | 0.530 | 0.481 | 0.530 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.489 | 1.361 | 0.448 | 1.361 | 144.4 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 24.791 | 36.618 | 24.593 | 36.618 | 128.5 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 174.086 | 179.361 | 172.773 | 179.361 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1499.191 | 1882.119 | 1489.669 | 1882.119 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.596 | 164.261 | 159.351 | 164.261 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1515.908 | 1680.663 | 1491.343 | 1680.663 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.195 | 0.306 | 0.183 | 0.306 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.574 | 3.747 | 3.557 | 3.747 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.021 | 0.026 | 0.020 | 0.026 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.647 | 0.691 | 0.631 | 0.691 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.050 | 0.067 | 0.044 | 0.067 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.519 | 1.862 | 0.505 | 1.862 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.770 | 1.099 | 0.631 | 1.099 | 144.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 67.569 | 69.022 | 67.368 | 69.022 | 128.5 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 176.227 | 188.864 | 171.207 | 188.864 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1472.837 | 1501.742 | 1450.881 | 1501.742 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.720 | 163.904 | 157.353 | 163.904 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1431.280 | 1471.085 | 1421.907 | 1471.085 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.172 | 0.199 | 0.167 | 0.199 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.196 | 2.416 | 2.168 | 2.416 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.034 | 0.019 | 0.034 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.425 | 0.489 | 0.393 | 0.489 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.013 | 0.020 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.457 | 0.470 | 0.440 | 0.470 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.349 | 0.387 | 0.310 | 0.387 | 135.3 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.819 | 23.604 | 19.666 | 23.604 | 128.5 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 174.796 | 179.078 | 173.739 | 179.078 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1447.421 | 1511.123 | 1441.795 | 1511.123 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.551 | 167.233 | 159.883 | 167.233 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1433.426 | 1455.436 | 1431.541 | 1455.436 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.172 | 0.184 | 0.160 | 0.184 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.266 | 2.479 | 2.108 | 2.479 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.029 | 0.020 | 0.029 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.440 | 0.480 | 0.425 | 0.480 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.013 | 0.016 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.453 | 0.479 | 0.449 | 0.479 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.195 | 2.348 | 0.176 | 2.348 | 136.0 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.590 | 16.719 | 16.458 | 16.719 | 128.5 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 221.635 | 235.133 | 218.375 | 235.133 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1683.258 | 1713.840 | 1674.693 | 1713.840 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.145 | 1.481 | 0.144 | 1.481 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.644 | 0.668 | 0.604 | 0.668 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 9.344 | 11.992 | 8.781 | 11.992 | 165.3 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 235.825 | 242.661 | 230.039 | 242.661 | 128.5 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 165.195 | 178.048 | 160.515 | 178.048 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1460.949 | 1487.982 | 1453.789 | 1487.982 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.465 | 0.583 | 0.400 | 0.583 | 138.0 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.998 | 17.239 | 16.953 | 17.239 | 128.5 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 26.895 | 28.349 | 25.992 | 28.349 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 86.123 | 92.080 | 84.929 | 92.080 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 8.355 | 8.950 | 7.823 | 8.950 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.513 | 22.119 | 21.019 | 22.119 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 26.550 | 29.017 | 25.704 | 29.017 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 86.805 | 92.264 | 85.513 | 92.264 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 27.130 | 27.626 | 26.421 | 27.626 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.276 | 75.320 | 72.784 | 75.320 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:06:59 - cmdstanpy - INFO - Chain [1] start processing<br>04:06:59 - cmdstanpy - INFO - Chain [1] done processing<br>04:06:59 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=64584 data file=/tmp/tmpdvhj9uzz/8pd_23qq.json init=/tmp/tmpdvhj9uzz/f3ras9g5.json output file=/tmp/tmpdvhj9uzz/prophet_modelqkvbtogi/prophet_model-20261102040659.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpdvhj9uzz/8pd_23qq.json<br>init = /tmp/tmpdvhj9uzz/f3ras9g5.json<br>random<br>  seed = 64584<br>output<br>  file = /tmp/tmpdvhj9uzz/prophet_modelqkvbtogi/prophet_model-20261102040659.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=64584 data file=/tmp/tmpdvhj9uzz/8pd_23qq.json init=/tmp/tmpdvhj9uzz/f3ras9g5.json output file=/tmp/tmpdvhj9uzz/prophet_modelqkvbtogi/prophet_model-20261102040659.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:07:00 - cmdstanpy - INFO - Chain [1] start processing<br>04:07:00 - cmdstanpy - INFO - Chain [1] done processing<br>04:07:00 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=22523 data file=/tmp/tmpb2vgwh0m/xyfazcro.json init=/tmp/tmpb2vgwh0m/ft07l1_q.json output file=/tmp/tmpb2vgwh0m/prophet_modela9hl7jph/prophet_model-20261102040700.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpb2vgwh0m/xyfazcro.json<br>init = /tmp/tmpb2vgwh0m/ft07l1_q.json<br>random<br>  seed = 22523<br>output<br>  file = /tmp/tmpb2vgwh0m/prophet_modela9hl7jph/prophet_model-20261102040700.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 873, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 320, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 249, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=22523 data file=/tmp/tmpb2vgwh0m/xyfazcro.json init=/tmp/tmpb2vgwh0m/ft07l1_q.json output file=/tmp/tmpb2vgwh0m/prophet_modela9hl7jph/prophet_model-20261102040700.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1357, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1334, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1096, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 876, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 427, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `a3424eff3a47970f12ddc3764fae47fc2aeb41e3`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:9f188929a72b1631b26ef01a65b6f50dda889b753e2e869a503d09daeb6f6f4a`
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

