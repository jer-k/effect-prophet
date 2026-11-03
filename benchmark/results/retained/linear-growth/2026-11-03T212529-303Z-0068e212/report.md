# Effect Prophet benchmark — 2026-11-03T212529-303Z-0068e212

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
| mcmc-linear-mixed-components | equivalent-posterior | passed | 5.452e-3 | 2.922e-3 | 0.000e+0 | 6.947e-3 | 2.510e-3 | 0.393 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |
| mcmc-linear-default-changepoints | equivalent-posterior | passed | 1.729e-4 | 7.052e-4 | 7.052e-4 | 8.780e-4 | 6.112e-4 | 0.406 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |
| mcmc-linear-regressor-model | equivalent-posterior | passed | 2.102e-2 | 6.648e-3 | 7.175e-3 | 1.825e-2 | 9.374e-4 | 0.503 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |

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
| mcmc-linear-mixed-components | 96 | 6 | 2 | 24 | 24 | 24 | 1000 | intervals | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |
| mcmc-linear-default-changepoints | 256 | 6 | 25 | 64 | 64 | 64 | 1000 | intervals | 67108864 | deterministic-piecewise-weekly-v2:n=256:h=64 / 5f69f47c9189c3587fe9c4d72a1c885d2b16d5bd72fa693b49c46ca5ad6381fc | docs/validation/uncertainty.md#evidence-classes |
| mcmc-linear-regressor-model | 256 | 4 | 25 | 64 | 64 | 64 | 1000 | intervals | 67108864 | map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64 / 804afd5985e47268a8ddae3301fffcdaaf9a2afca3f3cdbdab8e3d028286f525 | docs/validation/uncertainty.md#evidence-classes |

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
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 24.571 | 25.440 | 24.218 | 25.440 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 209.880 | 224.051 | 201.376 | 224.051 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.217 | 8.737 | 6.771 | 8.737 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 31.465 | 32.768 | 29.340 | 32.768 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 12.894 | 13.098 | 12.653 | 13.098 | 150.0 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 183.133 | 204.165 | 169.352 | 204.165 | 130.1 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.062 | 0.015 | 0.062 | 139.1 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.476 | 0.501 | 0.463 | 0.501 | 147.9 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 202.880 | 213.093 | 179.160 | 213.093 | 155.4 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1669.656 | 2224.681 | 1647.829 | 2224.681 | 147.9 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 176.156 | 181.086 | 168.572 | 181.086 | 168.2 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1690.846 | 1793.083 | 1635.646 | 1793.083 | 147.9 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 1.429 | 2.083 | 1.287 | 2.083 | 165.5 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.547 | 4.628 | 3.291 | 4.628 | 147.9 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.118 | 0.146 | 0.104 | 0.146 | 156.4 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.566 | 0.640 | 0.540 | 0.640 | 147.9 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.093 | 5.263 | 5.021 | 5.263 | 155.2 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 28.709 | 29.085 | 28.254 | 29.085 | 147.9 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.434 | 5.600 | 5.305 | 5.600 | 154.1 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 27.589 | 34.012 | 26.909 | 34.012 | 147.9 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 6.039 | 7.872 | 5.590 | 7.872 | 150.0 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 21.963 | 24.908 | 21.210 | 24.908 | 147.9 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.309 | 0.350 | 0.241 | 0.350 | 150.1 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.556 | 6.093 | 5.392 | 6.093 | 147.9 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.025 | 0.011 | 0.025 | 138.9 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.521 | 8.488 | 0.476 | 8.488 | 129.3 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 179.185 | 202.568 | 174.855 | 202.568 | 154.3 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1628.223 | 1768.988 | 1559.804 | 1768.988 | 129.3 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 210.395 | 520.362 | 163.400 | 520.362 | 154.6 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1580.561 | 1688.121 | 1561.227 | 1688.121 | 129.3 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.472 | 0.554 | 0.382 | 0.554 | 154.5 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 4.249 | 4.504 | 4.063 | 4.504 | 129.3 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.026 | 0.049 | 0.019 | 0.049 | 154.3 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.766 | 0.829 | 0.760 | 0.829 | 129.3 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.817 | 4.558 | 3.712 | 4.558 | 154.1 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 27.165 | 43.197 | 26.643 | 43.197 | 129.3 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.059 | 4.223 | 3.800 | 4.223 | 150.6 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 25.778 | 27.318 | 25.337 | 27.318 | 129.3 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 5.272 | 6.272 | 4.657 | 6.272 | 150.3 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 20.724 | 21.364 | 20.110 | 21.364 | 129.3 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.149 | 0.282 | 0.133 | 0.282 | 150.5 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 5.376 | 6.328 | 4.895 | 6.328 | 129.3 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.015 | 0.011 | 0.015 | 138.3 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.516 | 0.440 | 0.516 | 129.3 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 186.684 | 201.606 | 184.934 | 201.606 | 153.4 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1556.204 | 1932.315 | 1548.824 | 1932.315 | 129.3 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 173.619 | 231.866 | 169.795 | 231.866 | 153.7 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1568.016 | 1642.017 | 1513.848 | 1642.017 | 129.3 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.478 | 0.645 | 0.440 | 0.645 | 153.4 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 4.182 | 5.154 | 4.002 | 5.154 | 129.3 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.040 | 0.054 | 0.023 | 0.054 | 153.4 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.761 | 0.855 | 0.717 | 0.855 | 129.3 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.028 | 4.883 | 3.929 | 4.883 | 153.2 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 24.423 | 25.028 | 24.192 | 25.028 | 129.3 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.161 | 4.379 | 4.061 | 4.379 | 150.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 24.175 | 25.399 | 23.680 | 25.399 | 129.3 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 4.901 | 6.213 | 4.356 | 6.213 | 149.8 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 19.367 | 21.742 | 18.883 | 21.742 | 129.3 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.177 | 0.227 | 0.142 | 0.227 | 149.8 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.749 | 4.996 | 4.700 | 4.996 | 129.3 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.048 | 0.097 | 0.038 | 0.097 | 142.7 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.519 | 0.522 | 0.498 | 0.522 | 148.7 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 185.790 | 194.322 | 178.609 | 194.322 | 171.1 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1679.426 | 1761.903 | 1670.708 | 1761.903 | 148.7 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 169.113 | 180.637 | 165.305 | 180.637 | 177.4 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1695.192 | 1834.052 | 1642.303 | 1834.052 | 148.7 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 1.095 | 1.493 | 0.872 | 1.493 | 175.1 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.568 | 6.245 | 4.434 | 6.245 | 148.7 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.110 | 0.154 | 0.097 | 0.154 | 171.2 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.801 | 1.150 | 0.766 | 1.150 | 148.7 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.885 | 6.352 | 4.760 | 6.352 | 167.6 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 35.357 | 38.027 | 35.063 | 38.027 | 148.7 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 5.084 | 5.501 | 4.891 | 5.501 | 157.0 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 38.067 | 43.315 | 36.714 | 43.315 | 148.7 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.746 | 7.011 | 5.419 | 7.011 | 153.9 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 27.046 | 28.221 | 26.502 | 28.221 | 148.7 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.227 | 0.311 | 0.217 | 0.311 | 156.0 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.439 | 10.308 | 6.198 | 10.308 | 148.7 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.049 | 0.062 | 0.035 | 0.062 | 145.2 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.525 | 0.662 | 0.499 | 0.662 | 148.5 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 187.019 | 213.005 | 181.820 | 213.005 | 175.4 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1650.941 | 1743.437 | 1631.938 | 1743.437 | 148.5 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 167.262 | 177.136 | 164.149 | 177.136 | 181.5 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1646.884 | 1674.300 | 1607.780 | 1674.300 | 148.5 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 0.824 | 1.267 | 0.798 | 1.267 | 176.4 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.378 | 4.871 | 4.301 | 4.871 | 148.5 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.100 | 0.204 | 0.088 | 0.204 | 175.4 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.749 | 0.839 | 0.731 | 0.839 | 148.5 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.151 | 6.702 | 6.024 | 6.702 | 171.8 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 37.837 | 49.074 | 37.106 | 49.074 | 148.5 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.511 | 6.265 | 5.310 | 6.265 | 158.2 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 34.044 | 37.755 | 33.779 | 37.755 | 148.5 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 6.645 | 13.041 | 5.648 | 13.041 | 157.1 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 27.639 | 30.403 | 27.490 | 30.403 | 148.5 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.223 | 0.314 | 0.210 | 0.314 | 157.2 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.343 | 6.416 | 6.256 | 6.416 | 148.5 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.031 | 0.013 | 0.031 | 143.9 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.490 | 0.572 | 0.464 | 0.572 | 148.5 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 186.227 | 191.139 | 180.056 | 191.139 | 159.2 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1803.004 | 2079.342 | 1721.473 | 2079.342 | 148.5 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 172.841 | 183.602 | 164.330 | 183.602 | 173.3 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1792.833 | 1935.105 | 1701.624 | 1935.105 | 148.5 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 1.313 | 1.733 | 1.209 | 1.733 | 170.3 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 4.578 | 8.335 | 4.255 | 8.335 | 148.5 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.124 | 0.133 | 0.120 | 0.133 | 161.3 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.788 | 0.861 | 0.742 | 0.861 | 148.5 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.357 | 4.488 | 4.306 | 4.488 | 159.1 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 29.761 | 68.540 | 28.908 | 68.540 | 148.5 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.687 | 4.968 | 4.494 | 4.968 | 158.0 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 30.358 | 44.677 | 29.824 | 44.677 | 148.5 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 4.866 | 5.148 | 4.818 | 5.148 | 154.1 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 23.628 | 25.330 | 23.560 | 25.330 | 148.5 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.274 | 0.281 | 0.254 | 0.281 | 155.5 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.793 | 6.743 | 5.656 | 6.743 | 148.5 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.031 | 0.012 | 0.031 | 138.5 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.496 | 0.523 | 0.474 | 0.523 | 147.6 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 186.927 | 203.995 | 181.197 | 203.995 | 153.0 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1706.416 | 1836.775 | 1665.180 | 1836.775 | 147.6 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 175.412 | 180.446 | 165.415 | 180.446 | 168.8 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1877.907 | 2904.596 | 1652.805 | 2904.596 | 147.6 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 1.624 | 1.695 | 1.275 | 1.695 | 165.9 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 5.128 | 55.845 | 4.456 | 55.845 | 147.6 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.130 | 0.143 | 0.108 | 0.143 | 155.4 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.754 | 0.829 | 0.721 | 0.829 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.097 | 6.825 | 4.896 | 6.825 | 152.9 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 28.539 | 30.345 | 27.601 | 30.345 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.534 | 6.186 | 4.847 | 6.186 | 151.9 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 28.643 | 29.566 | 27.704 | 29.566 | 147.6 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.699 | 6.421 | 5.647 | 6.421 | 147.8 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 23.361 | 24.275 | 22.637 | 24.275 | 147.6 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.309 | 0.379 | 0.285 | 0.379 | 149.2 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.683 | 6.971 | 5.601 | 6.971 | 147.6 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 19.137 | 21.741 | 18.204 | 21.741 | 152.5 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 155.447 | 165.281 | 149.614 | 165.281 | 129.3 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 22.858 | 26.533 | 22.139 | 26.533 | 151.8 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 143.913 | 156.233 | 143.266 | 156.233 | 129.3 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.483 | 6.688 | 6.194 | 6.688 | 154.4 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 32.286 | 33.685 | 30.723 | 33.685 | 129.3 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.216 | 0.312 | 0.203 | 0.312 | 155.4 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 129.3 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.262 | 0.300 | 0.261 | 0.300 | 154.9 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.015 | 0.008 | 0.015 | 129.3 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 21.603 | 27.745 | 21.505 | 27.745 | 153.8 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 153.490 | 199.802 | 153.142 | 199.802 | 129.3 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 11.040 | 11.549 | 10.401 | 11.549 | 144.1 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 79.440 | 91.267 | 77.473 | 91.267 | 129.3 |
| evaluation-linear-long-history-parallel | evaluation-intervals-processes | python-prophet | 4 | 2531.553 | 2598.345 | 2447.219 | 2598.345 | 139.8 |
| evaluation-linear-long-history-parallel | evaluation-intervals-threads | python-prophet | 4 | 1166.954 | 1285.515 | 1091.920 | 1285.515 | 139.8 |
| evaluation-linear-long-history-parallel | evaluation-intervals | effect-prophet | 4 | 972.701 | 2200.255 | 972.155 | 2200.255 | 197.8 |
| evaluation-linear-long-history-parallel | evaluation-intervals | python-prophet | 4 | 2690.549 | 2717.388 | 2685.431 | 2717.388 | 138.4 |
| evaluation-linear-long-history-parallel | evaluation-point-processes | python-prophet | 4 | 2438.887 | 3526.016 | 2431.947 | 3526.016 | 138.1 |
| evaluation-linear-long-history-parallel | evaluation-point-threads | python-prophet | 4 | 1105.549 | 1340.232 | 1097.374 | 1340.232 | 138.1 |
| evaluation-linear-long-history-parallel | evaluation-point | effect-prophet | 4 | 968.237 | 981.762 | 962.865 | 981.762 | 188.0 |
| evaluation-linear-long-history-parallel | evaluation-point | python-prophet | 4 | 2615.449 | 2660.132 | 2591.084 | 2660.132 | 129.3 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 192.226 | 198.255 | 189.913 | 198.255 | 147.3 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1581.871 | 1590.074 | 1562.833 | 1590.074 | 129.3 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.049 | 1.194 | 1.033 | 1.194 | 147.2 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.115 | 1.142 | 1.076 | 1.142 | 129.3 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.007 | 0.009 | 0.007 | 0.009 | 130.7 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.423 | 0.471 | 0.380 | 0.471 | 129.3 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.053 | 0.085 | 0.051 | 0.085 | 147.2 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.350 | 5.698 | 5.333 | 5.698 | 129.3 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.072 | 1.311 | 1.011 | 1.311 | 134.4 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.674 | 0.731 | 0.657 | 0.731 | 129.3 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 10.537 | 11.528 | 10.473 | 11.528 | 147.1 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 72.071 | 76.180 | 70.660 | 76.180 | 129.3 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 56.017 | 87.420 | 55.342 | 87.420 | 149.5 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 252.544 | 271.387 | 249.129 | 271.387 | 129.3 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 362.687 | 649.655 | 317.966 | 649.655 | 147.7 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1609.831 | 1782.276 | 1603.640 | 1782.276 | 129.3 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 9.605 | 14.339 | 6.875 | 14.339 | 145.4 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.399 | 1.412 | 1.368 | 1.412 | 129.3 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.121 | 0.246 | 0.116 | 0.246 | 126.8 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.547 | 0.641 | 0.546 | 0.641 | 129.3 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.100 | 0.198 | 0.087 | 0.198 | 144.7 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.332 | 5.747 | 5.328 | 5.747 | 129.3 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.243 | 2.705 | 2.166 | 2.705 | 130.3 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.815 | 0.844 | 0.814 | 0.844 | 129.3 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 62.931 | 75.823 | 61.270 | 75.823 | 144.1 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 182.968 | 190.393 | 182.572 | 190.393 | 129.3 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.154 | 6.703 | 6.137 | 6.703 | 149.8 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 32.932 | 34.504 | 32.844 | 34.504 | 129.3 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.193 | 0.204 | 0.177 | 0.204 | 150.6 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 129.3 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.237 | 0.290 | 0.222 | 0.290 | 150.1 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 129.3 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.567 | 30.688 | 20.472 | 30.688 | 147.1 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 162.911 | 167.359 | 159.751 | 167.359 | 129.3 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.081 | 1.198 | 1.015 | 1.198 | 155.9 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.387 | 2.488 | 1.377 | 2.488 | 129.3 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.816 | 4.064 | 3.647 | 4.064 | 159.4 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 21.999 | 22.892 | 21.819 | 22.892 | 129.3 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.896 | 1.137 | 0.810 | 1.137 | 136.2 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.936 | 1.097 | 0.878 | 1.097 | 129.3 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 6.923 | 8.429 | 6.298 | 8.429 | 151.1 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 54.733 | 71.452 | 51.745 | 71.452 | 129.3 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.183 | 0.208 | 0.180 | 0.208 | 159.9 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.004 | 0.004 | 0.004 | 129.3 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.248 | 0.281 | 0.225 | 0.281 | 159.9 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.007 | 0.011 | 129.3 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 7.055 | 7.996 | 6.015 | 7.996 | 159.3 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 53.884 | 63.359 | 53.605 | 63.359 | 129.3 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.015 | 0.045 | 0.006 | 0.063 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.558 | 0.600 | 0.537 | 0.744 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.490 | 0.679 | 0.352 | 1.042 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.670 | 2.770 | 2.615 | 2.926 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.033 | 0.040 | 0.030 | 0.040 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.527 | 0.542 | 0.501 | 0.542 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 178.727 | 189.479 | 176.848 | 189.479 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1474.538 | 1534.785 | 1449.771 | 1534.785 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 165.718 | 175.767 | 163.113 | 175.767 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1464.372 | 1497.248 | 1449.599 | 1497.248 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.138 | 0.158 | 0.127 | 0.158 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.393 | 4.030 | 2.261 | 4.030 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.026 | 0.035 | 0.025 | 0.035 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.530 | 0.560 | 0.524 | 0.560 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.215 | 6.500 | 6.149 | 6.500 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.770 | 21.223 | 17.282 | 21.223 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 7.139 | 7.592 | 6.421 | 7.592 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.659 | 21.236 | 16.511 | 21.236 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.992 | 8.249 | 6.228 | 8.249 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.762 | 13.950 | 13.382 | 13.950 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.245 | 0.259 | 0.242 | 0.259 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.075 | 3.147 | 3.013 | 3.147 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.044 | 0.072 | 0.041 | 0.072 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.572 | 0.614 | 0.510 | 0.614 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 201.022 | 216.006 | 198.135 | 216.006 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1557.945 | 1577.058 | 1513.102 | 1577.058 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 164.894 | 175.564 | 160.439 | 175.564 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1446.049 | 1597.959 | 1424.172 | 1597.959 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.270 | 11.749 | 0.156 | 11.749 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.446 | 2.640 | 2.361 | 2.640 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.030 | 0.046 | 0.029 | 0.046 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.580 | 0.637 | 0.575 | 0.637 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 26.392 | 27.474 | 25.563 | 27.474 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 91.835 | 113.313 | 90.529 | 113.313 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 26.168 | 28.398 | 25.824 | 28.398 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 92.626 | 122.637 | 90.255 | 122.637 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.317 | 28.627 | 25.870 | 28.627 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 87.944 | 92.593 | 87.327 | 92.593 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.305 | 0.329 | 0.297 | 0.329 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.208 | 3.339 | 3.161 | 3.339 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.010 | 0.005 | 0.010 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.451 | 0.491 | 0.426 | 0.491 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 195.476 | 201.752 | 194.664 | 201.752 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1572.429 | 1669.054 | 1523.552 | 1669.054 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 164.961 | 183.801 | 164.216 | 183.801 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1478.634 | 1522.941 | 1451.762 | 1522.941 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.176 | 0.325 | 0.137 | 0.325 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.112 | 2.239 | 2.020 | 2.239 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.030 | 0.042 | 0.027 | 0.042 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.382 | 0.468 | 0.366 | 0.468 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.368 | 20.379 | 18.036 | 20.379 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 65.738 | 66.650 | 65.264 | 66.650 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.347 | 19.238 | 18.175 | 19.238 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 67.138 | 80.601 | 65.299 | 80.601 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.843 | 19.315 | 18.344 | 19.315 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 63.222 | 64.797 | 61.619 | 64.797 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.269 | 0.304 | 0.245 | 0.304 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.725 | 4.133 | 3.352 | 4.133 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.054 | 0.072 | 0.045 | 0.072 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.514 | 0.535 | 0.503 | 0.535 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 181.914 | 195.613 | 177.978 | 195.613 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1526.307 | 1546.175 | 1523.180 | 1546.175 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 163.763 | 169.215 | 160.765 | 169.215 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1573.888 | 1644.202 | 1477.454 | 1644.202 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.135 | 0.183 | 0.112 | 0.183 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.791 | 4.043 | 3.675 | 4.043 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.034 | 0.058 | 0.032 | 0.058 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.642 | 0.714 | 0.626 | 0.714 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.816 | 5.196 | 4.727 | 5.196 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.986 | 35.551 | 28.572 | 35.551 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.870 | 5.104 | 4.736 | 5.104 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 31.478 | 31.637 | 28.179 | 31.637 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.467 | 7.007 | 5.315 | 7.007 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 23.304 | 26.622 | 23.047 | 26.622 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.279 | 0.287 | 0.272 | 0.287 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.953 | 6.303 | 4.856 | 6.303 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.035 | 0.016 | 0.035 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.476 | 0.580 | 0.445 | 0.580 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 173.296 | 188.849 | 171.449 | 188.849 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1523.682 | 1526.685 | 1449.321 | 1526.685 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.778 | 166.328 | 158.444 | 166.328 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1492.428 | 1522.423 | 1436.144 | 1522.423 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.119 | 0.162 | 0.108 | 0.162 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.151 | 2.237 | 2.092 | 2.237 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.044 | 0.024 | 0.044 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.431 | 0.451 | 0.420 | 0.451 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.720 | 4.756 | 4.698 | 4.756 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.675 | 28.969 | 26.649 | 28.969 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 4.933 | 4.987 | 4.910 | 4.987 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.753 | 29.115 | 26.746 | 29.115 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.263 | 5.432 | 5.087 | 5.432 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 24.924 | 26.804 | 23.852 | 26.804 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.229 | 0.328 | 0.225 | 0.328 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.018 | 4.411 | 3.014 | 4.411 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.016 | 0.013 | 0.016 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.469 | 0.543 | 0.468 | 0.543 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 185.141 | 200.742 | 178.163 | 200.742 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1559.819 | 1669.452 | 1489.563 | 1669.452 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 169.153 | 193.110 | 165.415 | 193.110 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1532.040 | 1556.065 | 1503.753 | 1556.065 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.127 | 0.254 | 0.113 | 0.254 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.202 | 2.393 | 2.091 | 2.393 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.102 | 0.024 | 0.102 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.493 | 0.618 | 0.461 | 0.618 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.716 | 5.063 | 4.633 | 5.063 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 29.227 | 33.163 | 27.951 | 33.163 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.236 | 6.623 | 4.939 | 6.623 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 28.074 | 29.573 | 26.977 | 29.573 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.388 | 6.383 | 5.089 | 6.383 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 24.884 | 25.611 | 23.985 | 25.611 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.235 | 0.447 | 0.226 | 0.447 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.101 | 3.682 | 3.032 | 3.682 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.090 | 1.485 | 0.080 | 1.485 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.713 | 1.036 | 0.708 | 1.036 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 230.813 | 241.433 | 215.802 | 241.433 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1575.179 | 1626.840 | 1559.071 | 1626.840 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 31.735 | 32.776 | 30.852 | 32.776 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 119.806 | 121.445 | 119.483 | 121.445 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 27.911 | 29.394 | 27.641 | 29.394 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 121.531 | 138.594 | 120.074 | 138.594 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 28.136 | 29.481 | 27.729 | 29.481 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 102.263 | 109.272 | 101.921 | 109.272 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.630 | 0.750 | 0.595 | 0.750 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 16.523 | 16.711 | 16.403 | 16.711 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.102 | 0.108 | 0.094 | 0.108 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.627 | 0.675 | 0.614 | 0.675 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 177.988 | 187.728 | 176.213 | 187.728 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1504.102 | 1598.049 | 1454.966 | 1598.049 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 165.303 | 167.313 | 163.381 | 167.313 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1459.199 | 1555.894 | 1431.775 | 1555.894 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.113 | 0.132 | 0.091 | 0.132 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.787 | 3.014 | 2.715 | 3.014 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.034 | 0.015 | 0.034 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.677 | 0.740 | 0.645 | 0.740 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.521 | 2.629 | 2.470 | 2.629 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 17.163 | 17.635 | 16.881 | 17.635 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.695 | 3.517 | 2.640 | 3.517 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 16.451 | 18.226 | 15.991 | 18.226 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.668 | 2.915 | 2.654 | 2.915 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 14.006 | 16.019 | 12.693 | 16.019 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.390 | 0.458 | 0.386 | 0.458 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 4.009 | 4.299 | 3.932 | 4.299 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.019 | 0.013 | 0.019 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.510 | 0.552 | 0.498 | 0.552 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 188.681 | 199.966 | 179.440 | 199.966 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1605.638 | 1675.871 | 1515.073 | 1675.871 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 164.832 | 169.672 | 162.119 | 169.672 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1470.443 | 1624.525 | 1450.217 | 1624.525 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.180 | 0.284 | 0.156 | 0.284 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.414 | 3.809 | 3.279 | 3.809 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.020 | 0.035 | 0.015 | 0.035 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.637 | 0.732 | 0.625 | 0.732 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.849 | 7.578 | 6.663 | 7.578 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 38.782 | 40.249 | 37.792 | 40.249 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.630 | 7.368 | 6.555 | 7.368 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 37.498 | 40.044 | 36.349 | 40.044 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.550 | 7.664 | 7.149 | 7.664 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 32.797 | 33.991 | 32.078 | 33.991 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.248 | 0.285 | 0.218 | 0.285 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.717 | 5.374 | 4.522 | 5.374 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.008 | 0.004 | 0.008 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.425 | 0.534 | 0.410 | 0.534 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 186.109 | 496.202 | 176.522 | 496.202 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1470.312 | 1545.961 | 1439.102 | 1545.961 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 169.999 | 272.160 | 161.771 | 272.160 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1459.323 | 1481.670 | 1429.434 | 1481.670 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.098 | 0.149 | 0.075 | 0.149 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.046 | 2.349 | 1.986 | 2.349 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.022 | 0.042 | 0.014 | 0.042 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.359 | 0.391 | 0.350 | 0.391 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.968 | 3.659 | 1.788 | 3.659 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.805 | 14.195 | 13.675 | 14.195 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 2.368 | 4.603 | 1.869 | 4.603 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.420 | 16.284 | 13.305 | 16.284 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 2.409 | 3.634 | 1.825 | 3.634 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 11.331 | 14.065 | 10.632 | 14.065 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.343 | 0.775 | 0.200 | 0.775 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.662 | 2.722 | 2.611 | 2.722 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.199 | 0.225 | 0.195 | 0.225 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.132 | 1.159 | 1.122 | 1.159 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 221.213 | 231.092 | 216.450 | 231.092 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1479.653 | 1590.255 | 1461.462 | 1590.255 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 188.473 | 205.910 | 182.849 | 205.910 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1499.461 | 1558.471 | 1491.235 | 1558.471 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.336 | 0.372 | 0.316 | 0.372 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.670 | 5.974 | 5.575 | 5.974 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.034 | 0.042 | 0.029 | 0.042 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.700 | 1.845 | 1.671 | 1.845 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 12.211 | 12.489 | 11.679 | 12.489 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 45.723 | 50.574 | 45.526 | 50.574 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 12.020 | 14.989 | 11.285 | 14.989 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.655 | 48.702 | 43.186 | 48.702 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 12.260 | 13.524 | 11.439 | 13.524 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.837 | 40.681 | 37.744 | 40.681 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.860 | 1.006 | 0.824 | 1.006 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.185 | 6.316 | 6.056 | 6.316 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.023 | 0.008 | 0.023 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.526 | 0.582 | 0.458 | 0.582 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 172.160 | 189.678 | 170.900 | 189.678 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1489.398 | 1599.851 | 1446.678 | 1599.851 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 176.423 | 541.667 | 168.109 | 541.667 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1470.130 | 1630.367 | 1465.618 | 1630.367 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.140 | 0.209 | 0.117 | 0.209 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.909 | 4.060 | 3.583 | 4.060 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.023 | 0.028 | 0.015 | 0.028 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.611 | 0.664 | 0.595 | 0.664 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.514 | 3.366 | 1.433 | 3.366 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 17.896 | 20.821 | 16.826 | 20.821 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.809 | 1.993 | 1.717 | 1.993 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 17.397 | 25.421 | 16.146 | 25.421 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.911 | 2.076 | 1.868 | 2.076 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.495 | 13.574 | 10.982 | 13.574 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.164 | 0.298 | 0.152 | 0.298 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 5.020 | 5.623 | 4.877 | 5.623 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.123 | 0.166 | 0.116 | 0.166 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.661 | 0.896 | 0.659 | 0.896 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 179.040 | 211.203 | 176.367 | 211.203 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1604.002 | 1808.146 | 1482.498 | 1808.146 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 166.407 | 174.119 | 163.139 | 174.119 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1546.906 | 1625.192 | 1521.047 | 1625.192 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.129 | 0.183 | 0.085 | 0.183 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.158 | 4.021 | 3.128 | 4.021 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.040 | 0.015 | 0.040 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.760 | 0.901 | 0.747 | 0.901 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.382 | 6.645 | 2.623 | 6.645 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 15.068 | 19.459 | 14.645 | 19.459 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 3.161 | 6.959 | 2.690 | 6.959 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 15.693 | 20.614 | 15.219 | 20.614 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 3.191 | 5.118 | 2.516 | 5.118 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.651 | 14.327 | 10.217 | 14.327 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.525 | 1.229 | 0.447 | 1.229 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.578 | 3.795 | 3.559 | 3.795 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.031 | 0.050 | 0.025 | 0.050 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.527 | 0.562 | 0.513 | 0.562 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 170.795 | 179.160 | 165.688 | 179.160 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1446.766 | 1511.862 | 1441.740 | 1511.862 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.103 | 0.468 | 0.090 | 0.468 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.229 | 2.276 | 2.200 | 2.276 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.021 | 0.026 | 0.014 | 0.026 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.499 | 0.534 | 0.482 | 0.534 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.394 | 1.533 | 1.379 | 1.533 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.804 | 12.280 | 11.475 | 12.280 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.941 | 2.725 | 1.647 | 2.725 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 10.930 | 13.564 | 10.894 | 13.564 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.244 | 4.188 | 1.839 | 4.188 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.016 | 8.089 | 7.811 | 8.089 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.244 | 0.275 | 0.228 | 0.275 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.100 | 3.173 | 3.043 | 3.173 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.028 | 170.206 | 159.169 | 170.206 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1485.916 | 1512.072 | 1484.887 | 1512.072 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.224 | 0.240 | 0.221 | 0.240 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.358 | 2.451 | 2.345 | 2.451 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.018 | 0.023 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.467 | 0.498 | 0.445 | 0.498 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.114 | 33.931 | 31.711 | 33.931 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 111.194 | 112.738 | 110.917 | 112.738 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.276 | 0.405 | 0.225 | 0.405 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.441 | 4.152 | 3.423 | 4.152 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 159.889 | 161.737 | 159.115 | 161.737 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1455.743 | 1479.439 | 1454.279 | 1479.439 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.212 | 0.237 | 0.176 | 0.237 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.049 | 2.096 | 2.026 | 2.096 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.022 | 0.034 | 0.021 | 0.034 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.441 | 0.492 | 0.426 | 0.492 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.768 | 27.924 | 25.963 | 27.924 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 86.187 | 87.748 | 85.258 | 87.748 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.182 | 0.304 | 0.163 | 0.304 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.648 | 2.780 | 2.597 | 2.780 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 166.915 | 180.399 | 160.217 | 180.399 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1422.521 | 1502.135 | 1403.463 | 1502.135 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.166 | 0.205 | 0.160 | 0.205 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.029 | 2.197 | 2.000 | 2.197 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.030 | 0.039 | 0.021 | 0.039 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.383 | 0.396 | 0.375 | 0.396 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.878 | 4.049 | 3.726 | 4.049 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 20.343 | 21.635 | 19.443 | 21.635 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.251 | 0.301 | 0.165 | 0.301 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.683 | 2.759 | 2.664 | 2.759 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 169.537 | 178.908 | 168.550 | 178.908 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1451.219 | 1541.565 | 1442.184 | 1541.565 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.381 | 0.609 | 0.200 | 0.609 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.093 | 4.681 | 2.066 | 4.681 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.022 | 0.035 | 0.020 | 0.035 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.449 | 0.773 | 0.416 | 0.773 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.996 | 34.282 | 30.858 | 34.282 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 108.511 | 109.087 | 107.413 | 109.087 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.224 | 0.271 | 0.167 | 0.271 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.703 | 2.790 | 2.668 | 2.790 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 171.750 | 192.642 | 165.282 | 192.642 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1467.802 | 1524.685 | 1457.023 | 1524.685 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.167 | 0.228 | 0.161 | 0.228 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.104 | 2.156 | 2.074 | 2.156 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.027 | 0.033 | 0.023 | 0.033 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.408 | 0.416 | 0.390 | 0.416 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.093 | 4.644 | 3.877 | 4.644 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 21.936 | 22.534 | 21.101 | 22.534 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.180 | 0.271 | 0.158 | 0.271 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.752 | 3.163 | 2.680 | 3.163 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 164.298 | 205.929 | 163.587 | 205.929 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1449.962 | 1611.688 | 1437.038 | 1611.688 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.212 | 0.280 | 0.197 | 0.280 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.065 | 2.158 | 2.049 | 2.158 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.024 | 0.031 | 0.021 | 0.031 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.444 | 0.481 | 0.427 | 0.481 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 31.456 | 34.100 | 31.420 | 34.100 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 108.812 | 109.462 | 107.642 | 109.462 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.286 | 0.729 | 0.186 | 0.729 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.771 | 3.134 | 2.766 | 3.134 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 163.519 | 178.443 | 161.653 | 178.443 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1466.630 | 1515.528 | 1465.870 | 1515.528 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.170 | 0.266 | 0.151 | 0.266 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.234 | 2.620 | 2.035 | 2.620 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.029 | 0.019 | 0.029 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.406 | 0.507 | 0.392 | 0.507 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.542 | 4.683 | 4.227 | 4.683 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 21.605 | 47.852 | 20.581 | 47.852 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.185 | 0.302 | 0.173 | 0.302 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.712 | 7.520 | 2.658 | 7.520 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | effect-prophet | 6 | 251.540 | 334.204 | 207.260 | 334.204 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | python-prophet | 6 | 1765.769 | 1988.560 | 1657.596 | 1988.560 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | effect-prophet | 6 | 6.041 | 6.849 | 5.217 | 6.849 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | python-prophet | 6 | 18.708 | 19.476 | 17.461 | 19.476 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | effect-prophet | 6 | 1.177 | 2.221 | 1.043 | 2.221 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | python-prophet | 6 | 33.265 | 39.896 | 32.564 | 39.896 | n/a |
| mcmc-linear-default-changepoints | warm-fit | effect-prophet | 6 | 5128.761 | 5291.455 | 5036.468 | 5291.455 | n/a |
| mcmc-linear-default-changepoints | warm-fit | python-prophet | 6 | 4236.185 | 4399.618 | 4165.632 | 4399.618 | n/a |
| mcmc-linear-default-changepoints | warm-predict | effect-prophet | 6 | 0.769 | 1.719 | 0.629 | 1.719 | n/a |
| mcmc-linear-default-changepoints | warm-predict | python-prophet | 6 | 3.652 | 4.191 | 3.464 | 4.191 | n/a |
| mcmc-linear-default-changepoints | warm-uncertainty | effect-prophet | 6 | 9.901 | 12.576 | 7.894 | 12.576 | 194.0 |
| mcmc-linear-default-changepoints | warm-uncertainty | python-prophet | 6 | 165.527 | 172.867 | 152.392 | 172.867 | 136.2 |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 196.450 | 229.553 | 195.156 | 229.553 | n/a |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1772.607 | 2585.190 | 1751.815 | 2585.190 | n/a |
| mcmc-linear-mixed-components | model-json-decode | effect-prophet | 6 | 2.640 | 3.658 | 2.155 | 3.658 | n/a |
| mcmc-linear-mixed-components | model-json-decode | python-prophet | 6 | 10.223 | 10.425 | 9.386 | 10.425 | n/a |
| mcmc-linear-mixed-components | model-json-encode | effect-prophet | 6 | 0.311 | 0.394 | 0.288 | 0.394 | n/a |
| mcmc-linear-mixed-components | model-json-encode | python-prophet | 6 | 12.999 | 14.127 | 12.809 | 14.127 | n/a |
| mcmc-linear-mixed-components | warm-fit | effect-prophet | 6 | 142.279 | 187.994 | 139.631 | 187.994 | n/a |
| mcmc-linear-mixed-components | warm-fit | python-prophet | 6 | 188.631 | 195.568 | 186.361 | 195.568 | n/a |
| mcmc-linear-mixed-components | warm-predict | effect-prophet | 6 | 0.362 | 0.434 | 0.330 | 0.434 | n/a |
| mcmc-linear-mixed-components | warm-predict | python-prophet | 6 | 5.125 | 6.933 | 4.931 | 6.933 | n/a |
| mcmc-linear-mixed-components | warm-uncertainty | effect-prophet | 6 | 3.030 | 3.368 | 2.838 | 3.368 | 172.3 |
| mcmc-linear-mixed-components | warm-uncertainty | python-prophet | 6 | 167.939 | 184.937 | 163.338 | 184.937 | 129.3 |
| mcmc-linear-regressor-model | warm-fit | effect-prophet | 6 | 4690.071 | 4765.613 | 4647.835 | 4765.613 | n/a |
| mcmc-linear-regressor-model | warm-fit | python-prophet | 6 | 4359.960 | 7354.650 | 4088.676 | 7354.650 | n/a |
| mcmc-linear-regressor-model | warm-predict | effect-prophet | 6 | 1.406 | 4.147 | 1.336 | 4.147 | n/a |
| mcmc-linear-regressor-model | warm-predict | python-prophet | 6 | 19.812 | 20.501 | 17.821 | 20.501 | n/a |
| mcmc-linear-regressor-model | warm-uncertainty | effect-prophet | 6 | 16.136 | 21.539 | 13.958 | 21.539 | 212.2 |
| mcmc-linear-regressor-model | warm-uncertainty | python-prophet | 6 | 312.305 | 350.808 | 287.179 | 350.808 | 133.5 |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 260.911 | 595.738 | 206.049 | 595.738 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1761.918 | 1804.053 | 1751.695 | 1804.053 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 219.389 | 749.398 | 201.839 | 749.398 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1630.228 | 1704.808 | 1612.865 | 1704.808 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.179 | 0.201 | 0.149 | 0.201 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.518 | 2.786 | 2.390 | 2.786 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.030 | 0.046 | 0.025 | 0.046 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.623 | 0.735 | 0.589 | 0.735 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.068 | 0.096 | 0.064 | 0.096 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.621 | 0.762 | 0.591 | 0.762 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 12.467 | 14.245 | 12.006 | 14.245 | 140.9 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 168.990 | 196.976 | 168.038 | 196.976 | 129.3 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 356.812 | 369.643 | 355.510 | 369.643 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2259.655 | 2471.781 | 2247.224 | 2471.781 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 277.550 | 415.555 | 263.692 | 415.555 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1873.088 | 2076.851 | 1831.133 | 2076.851 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.239 | 0.315 | 0.199 | 0.315 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.985 | 5.463 | 3.684 | 5.463 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.030 | 0.037 | 0.021 | 0.037 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.544 | 1.873 | 1.443 | 1.873 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.051 | 0.095 | 0.048 | 0.095 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.493 | 3.010 | 1.416 | 3.010 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 69.724 | 71.169 | 68.852 | 71.169 | 163.2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 392.179 | 436.731 | 379.221 | 436.731 | 162.9 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 195.968 | 215.253 | 181.578 | 215.253 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1611.797 | 2133.118 | 1567.304 | 2133.118 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.173 | 182.909 | 163.135 | 182.909 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1558.758 | 1839.943 | 1473.184 | 1839.943 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.231 | 0.290 | 0.215 | 0.290 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 4.452 | 4.665 | 3.997 | 4.665 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.036 | 0.018 | 0.036 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.702 | 0.757 | 0.679 | 0.757 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.046 | 0.068 | 0.035 | 0.068 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.537 | 0.590 | 0.489 | 0.590 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.551 | 0.771 | 0.450 | 0.771 | 142.1 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.812 | 42.751 | 24.454 | 42.751 | 129.3 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 179.171 | 192.076 | 174.571 | 192.076 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1582.979 | 1631.598 | 1547.036 | 1631.598 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.149 | 172.518 | 162.064 | 172.518 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1565.083 | 1650.833 | 1536.480 | 1650.833 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.194 | 0.223 | 0.183 | 0.223 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.765 | 4.304 | 3.602 | 4.304 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.020 | 0.032 | 0.018 | 0.032 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.671 | 0.685 | 0.653 | 0.685 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.046 | 0.070 | 0.040 | 0.070 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.501 | 0.520 | 0.490 | 0.520 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.803 | 1.160 | 0.709 | 1.160 | 140.2 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.716 | 74.266 | 68.000 | 74.266 | 129.3 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 213.985 | 270.618 | 196.430 | 270.618 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1490.687 | 1660.692 | 1480.714 | 1660.692 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 199.430 | 210.429 | 174.908 | 210.429 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1525.553 | 1737.943 | 1478.234 | 1737.943 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.202 | 0.278 | 0.185 | 0.278 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.219 | 2.599 | 2.121 | 2.599 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.034 | 0.055 | 0.020 | 0.055 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.488 | 0.534 | 0.457 | 0.534 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.022 | 0.011 | 0.022 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.465 | 0.571 | 0.432 | 0.571 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.365 | 0.531 | 0.306 | 0.531 | 136.9 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 20.242 | 21.372 | 19.916 | 21.372 | 129.3 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 187.890 | 196.418 | 185.578 | 196.418 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1569.183 | 2882.239 | 1523.727 | 2882.239 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.796 | 194.337 | 163.552 | 194.337 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1565.510 | 1589.675 | 1514.938 | 1589.675 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.218 | 0.292 | 0.214 | 0.292 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.583 | 3.661 | 2.203 | 3.661 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.034 | 0.021 | 0.034 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.467 | 0.555 | 0.431 | 0.555 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.011 | 0.017 | 0.010 | 0.017 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.502 | 0.571 | 0.482 | 0.571 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.235 | 0.335 | 0.194 | 0.335 | 133.7 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 17.453 | 18.309 | 17.352 | 18.309 | 129.3 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 258.320 | 285.584 | 240.813 | 285.584 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1822.018 | 1859.878 | 1784.398 | 1859.878 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.100 | 0.150 | 0.081 | 0.150 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.684 | 0.710 | 0.666 | 0.710 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 14.658 | 21.828 | 11.644 | 21.828 | 167.7 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 251.222 | 274.266 | 250.274 | 274.266 | 129.3 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 165.932 | 208.618 | 165.818 | 208.618 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1541.527 | 2164.737 | 1492.642 | 2164.737 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.484 | 0.652 | 0.422 | 0.652 | 134.7 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 18.076 | 18.551 | 17.958 | 18.551 | 129.3 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 27.077 | 29.073 | 26.346 | 29.073 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 88.105 | 99.568 | 87.662 | 99.568 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 8.573 | 10.634 | 7.877 | 10.634 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 22.232 | 23.868 | 21.640 | 23.868 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 25.976 | 28.003 | 25.710 | 28.003 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 88.429 | 92.126 | 87.259 | 92.126 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 26.998 | 27.305 | 26.449 | 27.305 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 75.520 | 81.927 | 73.660 | 81.927 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>21:29:55 - cmdstanpy - INFO - Chain [1] start processing<br>21:29:55 - cmdstanpy - INFO - Chain [1] done processing<br>21:29:55 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=78122 data file=/tmp/tmpaiesw7cn/613pqpwz.json init=/tmp/tmpaiesw7cn/m9ceg74y.json output file=/tmp/tmpaiesw7cn/prophet_modelyexu58m9/prophet_model-20261103212955.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpaiesw7cn/613pqpwz.json<br>init = /tmp/tmpaiesw7cn/m9ceg74y.json<br>random<br>  seed = 78122<br>output<br>  file = /tmp/tmpaiesw7cn/prophet_modelyexu58m9/prophet_model-20261103212955.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1407, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1384, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1146, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 896, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 333, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 262, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=78122 data file=/tmp/tmpaiesw7cn/613pqpwz.json init=/tmp/tmpaiesw7cn/m9ceg74y.json output file=/tmp/tmpaiesw7cn/prophet_modelyexu58m9/prophet_model-20261103212955.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>21:29:57 - cmdstanpy - INFO - Chain [1] start processing<br>21:29:57 - cmdstanpy - INFO - Chain [1] done processing<br>21:29:57 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=88821 data file=/tmp/tmpa_00a5b7/6ny4w_h1.json init=/tmp/tmpa_00a5b7/ofkqdpo_.json output file=/tmp/tmpa_00a5b7/prophet_modelq4y4f78k/prophet_model-20261103212957.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpa_00a5b7/6ny4w_h1.json<br>init = /tmp/tmpa_00a5b7/ofkqdpo_.json<br>random<br>  seed = 88821<br>output<br>  file = /tmp/tmpa_00a5b7/prophet_modelq4y4f78k/prophet_model-20261103212957.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1407, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1384, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1146, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 896, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 333, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 262, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=88821 data file=/tmp/tmpa_00a5b7/6ny4w_h1.json init=/tmp/tmpa_00a5b7/ofkqdpo_.json output file=/tmp/tmpa_00a5b7/prophet_modelq4y4f78k/prophet_model-20261103212957.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1407, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1384, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1146, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 899, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 440, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1407, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1384, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1146, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 899, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 440, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `0068e212d593db1dc80d41477a9b2105398faec4`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `country-global-priors-linear`, `country-global-priors-overrides-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `anomalies-linear-defaults-99`, `warm-start-linear-defaults-30-new-rows`, `warm-start-linear-defaults-1-new-row`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`, `evaluation-linear-custom-search`, `evaluation-linear-long-history-parallel`, `linear-regressor-model`, `uncertainty-linear-regressor-model-intervals-1000`, `evaluation-linear-regressor-model-point`, `evaluation-linear-regressor-model-intervals`, `mcmc-linear-mixed-components`, `mcmc-linear-default-changepoints`, `mcmc-linear-regressor-model`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:fa036ac57316cb13968ef42625383ab67e987b95f6fd18ec9737c52fd5c3c108`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:80fdd0ae0db1dc3113e9c8e353127a25670c8454d1c42f398d283166db5a2a5b`

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

