# Effect Prophet benchmark — 2026-11-04T143908-109Z-d4edbd51

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
| mcmc-linear-sampled-regressor-model | equivalent-posterior | passed | 2.102e-2 | 6.648e-3 | 7.867e-3 | 1.822e-2 | 9.374e-4 | 0.568 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |

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
| mcmc-linear-sampled-regressor-model | 256 | 4 | 25 | 64 | 64 | 64 | 1000 | intervals | 67108864 | map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64 / 804afd5985e47268a8ddae3301fffcdaaf9a2afca3f3cdbdab8e3d028286f525 | docs/validation/uncertainty.md#evidence-classes |

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
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 25.686 | 26.619 | 25.180 | 26.619 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 197.309 | 215.316 | 195.133 | 215.316 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.361 | 7.476 | 6.876 | 7.476 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 29.522 | 31.171 | 29.414 | 31.171 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 13.206 | 13.401 | 13.111 | 13.401 | 146.8 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 165.536 | 178.894 | 162.505 | 178.894 | 130.1 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 140.0 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.500 | 0.461 | 0.500 | 147.0 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 181.076 | 183.871 | 178.765 | 183.871 | 154.6 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1622.595 | 1680.659 | 1608.017 | 1680.659 | 147.0 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 167.393 | 178.438 | 165.778 | 178.438 | 168.9 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1599.445 | 1625.022 | 1589.535 | 1625.022 | 147.0 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 1.160 | 1.258 | 1.129 | 1.258 | 166.0 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.286 | 3.546 | 3.183 | 3.546 | 147.0 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.108 | 0.120 | 0.098 | 0.120 | 157.0 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.514 | 0.552 | 0.510 | 0.552 | 147.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.740 | 4.958 | 4.668 | 4.958 | 154.5 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 27.373 | 28.847 | 27.197 | 28.847 | 147.0 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.043 | 5.138 | 4.935 | 5.138 | 153.4 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.643 | 26.862 | 26.563 | 26.862 | 147.0 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.278 | 5.574 | 5.208 | 5.574 | 149.3 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 21.334 | 23.379 | 20.896 | 23.379 | 147.0 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.288 | 0.368 | 0.258 | 0.368 | 150.8 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.471 | 5.484 | 5.408 | 5.484 | 147.0 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.012 | 0.011 | 0.012 | 139.9 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.451 | 0.463 | 0.431 | 0.463 | 129.8 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 174.917 | 177.907 | 174.671 | 177.907 | 156.0 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1480.587 | 1521.967 | 1457.383 | 1521.967 | 129.8 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 162.895 | 164.653 | 160.662 | 164.653 | 156.0 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1425.696 | 1575.605 | 1420.446 | 1575.605 | 129.8 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.402 | 0.459 | 0.376 | 0.459 | 156.0 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 4.103 | 5.692 | 3.889 | 5.692 | 129.8 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.026 | 0.038 | 0.018 | 0.038 | 156.0 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.715 | 0.786 | 0.698 | 0.786 | 129.8 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.695 | 4.595 | 3.628 | 4.595 | 155.7 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 23.610 | 25.585 | 22.914 | 25.585 | 129.8 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.861 | 3.923 | 3.724 | 3.923 | 152.4 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.262 | 23.222 | 21.953 | 23.222 | 129.8 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.681 | 5.786 | 4.555 | 5.786 | 152.1 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.524 | 21.238 | 17.335 | 21.238 | 129.8 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.139 | 0.164 | 0.133 | 0.164 | 152.2 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.747 | 4.803 | 4.668 | 4.803 | 129.8 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.014 | 0.011 | 0.014 | 139.1 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.464 | 0.522 | 0.449 | 0.522 | 129.8 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 177.752 | 203.263 | 176.257 | 203.263 | 156.4 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1451.204 | 1610.998 | 1442.797 | 1610.998 | 129.8 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 162.465 | 164.812 | 161.074 | 164.812 | 156.5 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1450.698 | 1482.358 | 1437.598 | 1482.358 | 129.8 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.405 | 0.482 | 0.385 | 0.482 | 156.5 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.981 | 4.245 | 3.900 | 4.245 | 129.8 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.024 | 0.029 | 0.017 | 0.029 | 156.5 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.684 | 0.795 | 0.675 | 0.795 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.040 | 4.644 | 3.936 | 4.644 | 156.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.716 | 24.865 | 23.547 | 24.865 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.165 | 4.287 | 4.097 | 4.287 | 152.5 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 23.001 | 24.020 | 22.801 | 24.020 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 4.948 | 6.045 | 4.791 | 6.045 | 152.2 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.622 | 18.960 | 18.299 | 18.960 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.151 | 0.188 | 0.142 | 0.188 | 152.4 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.655 | 4.857 | 4.598 | 4.857 | 129.8 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.045 | 0.064 | 0.035 | 0.064 | 143.9 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.509 | 0.541 | 0.501 | 0.541 | 147.6 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 180.614 | 185.372 | 179.578 | 185.372 | 174.0 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1629.777 | 1693.038 | 1611.995 | 1693.038 | 147.6 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 169.881 | 177.214 | 165.156 | 177.214 | 180.2 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1595.252 | 1605.167 | 1588.848 | 1605.167 | 147.6 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 0.800 | 0.946 | 0.787 | 0.946 | 176.7 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.520 | 4.670 | 4.402 | 4.670 | 147.6 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.104 | 0.121 | 0.097 | 0.121 | 176.2 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.755 | 0.814 | 0.740 | 0.814 | 147.6 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.861 | 6.141 | 5.678 | 6.141 | 170.5 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 33.936 | 37.513 | 33.831 | 37.513 | 147.6 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 4.963 | 5.721 | 4.852 | 5.721 | 156.8 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 33.229 | 36.577 | 32.726 | 36.577 | 147.6 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.913 | 7.324 | 5.452 | 7.324 | 155.8 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 26.709 | 27.062 | 26.602 | 27.062 | 147.6 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.220 | 0.229 | 0.214 | 0.229 | 155.9 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.383 | 6.729 | 6.264 | 6.729 | 147.6 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.053 | 0.071 | 0.034 | 0.071 | 136.2 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.515 | 0.551 | 0.490 | 0.551 | 147.7 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 182.312 | 185.063 | 179.185 | 185.063 | 168.8 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1630.760 | 1710.529 | 1611.191 | 1710.529 | 147.7 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 165.647 | 240.556 | 164.503 | 240.556 | 173.1 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1618.830 | 1637.274 | 1611.915 | 1637.274 | 147.7 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 0.802 | 1.039 | 0.798 | 1.039 | 169.6 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.462 | 4.764 | 4.325 | 4.764 | 147.7 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.114 | 0.137 | 0.105 | 0.137 | 169.0 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.761 | 1.143 | 0.748 | 1.143 | 147.7 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.090 | 6.371 | 5.891 | 6.371 | 165.5 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 34.236 | 35.310 | 34.090 | 35.310 | 147.7 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.126 | 6.064 | 5.001 | 6.064 | 151.6 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 33.735 | 35.108 | 33.570 | 35.108 | 147.7 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 5.610 | 7.466 | 5.406 | 7.466 | 148.5 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 27.186 | 56.388 | 26.724 | 56.388 | 147.7 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.221 | 0.233 | 0.216 | 0.233 | 148.6 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.432 | 9.130 | 6.237 | 9.130 | 147.7 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.018 | 0.014 | 0.018 | 143.3 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.459 | 0.489 | 0.437 | 0.489 | 147.6 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 178.024 | 182.334 | 176.402 | 182.334 | 159.7 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1616.116 | 1647.933 | 1607.472 | 1647.933 | 147.6 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 166.207 | 170.666 | 164.228 | 170.666 | 173.4 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1609.191 | 1747.798 | 1597.588 | 1747.798 | 147.6 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 1.209 | 1.301 | 1.134 | 1.301 | 170.7 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.900 | 3.986 | 3.839 | 3.986 | 147.6 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.125 | 0.146 | 0.117 | 0.146 | 161.7 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.682 | 0.686 | 0.644 | 0.686 | 147.6 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.282 | 4.493 | 4.167 | 4.493 | 159.6 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.685 | 27.472 | 26.627 | 27.472 | 147.6 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.472 | 4.717 | 4.412 | 4.717 | 158.4 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 26.369 | 26.728 | 26.055 | 26.728 | 147.6 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 4.881 | 5.031 | 4.791 | 5.031 | 152.4 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.883 | 22.474 | 20.559 | 22.474 | 147.6 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.255 | 0.298 | 0.252 | 0.298 | 153.4 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.482 | 5.775 | 5.408 | 5.775 | 147.6 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.028 | 0.013 | 0.028 | 137.8 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.456 | 0.477 | 0.430 | 0.477 | 147.6 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 181.833 | 194.925 | 180.878 | 194.925 | 153.9 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1625.284 | 1676.344 | 1615.583 | 1676.344 | 147.6 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 167.876 | 180.973 | 166.314 | 180.973 | 168.0 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1599.007 | 1616.660 | 1589.792 | 1616.660 | 147.6 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 1.206 | 1.589 | 1.136 | 1.589 | 165.1 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.940 | 4.232 | 3.882 | 4.232 | 147.6 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.142 | 0.161 | 0.122 | 0.161 | 156.1 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.671 | 0.767 | 0.660 | 0.767 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.558 | 4.612 | 4.480 | 4.612 | 153.6 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.541 | 28.407 | 27.325 | 28.407 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.773 | 4.920 | 4.713 | 4.920 | 152.6 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 27.425 | 28.478 | 26.944 | 28.478 | 147.6 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.067 | 5.299 | 4.942 | 5.299 | 148.8 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.505 | 22.077 | 21.241 | 22.077 | 147.6 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.271 | 0.318 | 0.261 | 0.318 | 149.9 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.460 | 5.548 | 5.418 | 5.548 | 147.6 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 18.811 | 19.304 | 18.252 | 19.304 | 155.2 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 152.092 | 164.265 | 147.520 | 164.265 | 129.8 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 22.136 | 24.197 | 21.577 | 24.197 | 153.0 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 147.159 | 165.368 | 144.484 | 165.368 | 129.8 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.509 | 6.577 | 5.979 | 6.577 | 158.0 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.178 | 30.872 | 30.150 | 30.872 | 129.8 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.211 | 0.309 | 0.181 | 0.309 | 160.7 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 129.8 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.263 | 0.279 | 0.255 | 0.279 | 160.3 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 129.8 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 21.640 | 23.657 | 21.578 | 23.657 | 157.5 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 151.070 | 151.487 | 149.744 | 151.487 | 129.8 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 10.714 | 11.523 | 10.452 | 11.523 | 149.1 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 78.235 | 79.524 | 78.102 | 79.524 | 129.8 |
| evaluation-linear-long-history-parallel | evaluation-intervals-processes | python-prophet | 4 | 2461.346 | 2506.925 | 2452.074 | 2506.925 | 140.0 |
| evaluation-linear-long-history-parallel | evaluation-intervals-threads | python-prophet | 4 | 1125.738 | 1201.896 | 1117.623 | 1201.896 | 140.0 |
| evaluation-linear-long-history-parallel | evaluation-intervals | effect-prophet | 4 | 967.448 | 971.181 | 965.468 | 971.181 | 200.3 |
| evaluation-linear-long-history-parallel | evaluation-intervals | python-prophet | 4 | 2662.626 | 2693.007 | 2660.179 | 2693.007 | 139.2 |
| evaluation-linear-long-history-parallel | evaluation-point-processes | python-prophet | 4 | 2455.321 | 2560.285 | 2440.495 | 2560.285 | 138.9 |
| evaluation-linear-long-history-parallel | evaluation-point-threads | python-prophet | 4 | 1098.926 | 1201.031 | 1075.536 | 1201.031 | 138.8 |
| evaluation-linear-long-history-parallel | evaluation-point | effect-prophet | 4 | 972.116 | 985.338 | 972.052 | 985.338 | 190.5 |
| evaluation-linear-long-history-parallel | evaluation-point | python-prophet | 4 | 2597.032 | 2609.099 | 2596.418 | 2609.099 | 129.8 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 184.706 | 192.474 | 181.977 | 192.474 | 152.7 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1512.763 | 1531.151 | 1510.251 | 1531.151 | 129.8 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.059 | 1.173 | 1.029 | 1.173 | 152.6 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.121 | 1.142 | 1.081 | 1.142 | 129.8 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.007 | 0.008 | 0.007 | 0.008 | 132.1 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.362 | 0.436 | 0.358 | 0.436 | 129.8 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.057 | 0.087 | 0.054 | 0.087 | 152.4 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.451 | 5.464 | 5.352 | 5.464 | 129.8 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 0.974 | 1.195 | 0.850 | 1.195 | 134.4 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.644 | 0.667 | 0.594 | 0.667 | 129.8 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 10.098 | 10.562 | 9.879 | 10.562 | 148.0 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 72.146 | 74.399 | 71.457 | 74.399 | 129.8 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 52.380 | 54.825 | 51.447 | 54.825 | 156.5 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 265.310 | 267.779 | 249.825 | 267.779 | 129.8 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 243.279 | 247.563 | 239.140 | 247.563 | 158.4 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1631.887 | 1648.533 | 1625.080 | 1648.533 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 2.633 | 3.225 | 2.597 | 3.225 | 158.0 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.369 | 1.418 | 1.365 | 1.418 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.112 | 0.165 | 0.098 | 0.165 | 133.1 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.554 | 0.631 | 0.546 | 0.631 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.070 | 0.091 | 0.058 | 0.091 | 157.5 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.461 | 5.509 | 5.389 | 5.509 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.061 | 2.671 | 2.058 | 2.671 | 142.2 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.813 | 0.846 | 0.812 | 0.846 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 50.959 | 52.308 | 50.214 | 52.308 | 156.8 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 182.367 | 188.152 | 182.151 | 188.152 | 129.8 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.046 | 6.399 | 6.029 | 6.399 | 154.8 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.775 | 30.092 | 29.594 | 30.092 | 129.8 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.188 | 0.251 | 0.185 | 0.251 | 157.5 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 129.8 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.230 | 0.250 | 0.220 | 0.250 | 154.9 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 129.8 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.050 | 21.870 | 19.993 | 21.870 | 153.9 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 149.773 | 151.206 | 149.421 | 151.206 | 129.8 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.012 | 1.079 | 1.003 | 1.079 | 154.4 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.409 | 1.497 | 1.370 | 1.497 | 129.8 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.931 | 4.306 | 3.715 | 4.306 | 157.9 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.200 | 27.220 | 21.768 | 27.220 | 129.8 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 1.042 | 1.147 | 1.035 | 1.147 | 134.6 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.949 | 1.023 | 0.917 | 1.023 | 129.8 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 7.032 | 7.740 | 6.624 | 7.740 | 154.4 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 53.009 | 62.186 | 51.919 | 62.186 | 129.8 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.250 | 0.278 | 0.237 | 0.278 | 158.4 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 129.8 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.235 | 0.323 | 0.231 | 0.323 | 158.4 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.007 | 0.010 | 0.007 | 0.010 | 129.8 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 6.603 | 7.835 | 6.014 | 7.835 | 157.6 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 53.577 | 64.250 | 53.190 | 64.250 | 129.8 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.018 | 0.049 | 0.007 | 0.066 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.550 | 0.566 | 0.528 | 0.590 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.515 | 0.626 | 0.363 | 0.785 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.666 | 2.796 | 2.586 | 2.851 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.033 | 0.036 | 0.032 | 0.036 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.516 | 0.539 | 0.490 | 0.539 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 188.163 | 209.999 | 178.971 | 209.999 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1449.018 | 1460.868 | 1446.886 | 1460.868 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 164.706 | 191.907 | 162.834 | 191.907 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1431.650 | 1466.665 | 1426.299 | 1466.665 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.149 | 0.158 | 0.135 | 0.158 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.286 | 2.446 | 2.237 | 2.446 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.025 | 0.035 | 0.024 | 0.035 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.529 | 0.558 | 0.523 | 0.558 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.660 | 6.933 | 6.530 | 6.933 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.379 | 18.441 | 17.311 | 18.441 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 7.299 | 7.957 | 7.051 | 7.957 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.789 | 17.189 | 16.410 | 17.189 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 7.683 | 9.260 | 6.683 | 9.260 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.584 | 15.019 | 13.374 | 15.019 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.259 | 0.283 | 0.258 | 0.283 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.169 | 3.584 | 3.083 | 3.584 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.046 | 0.055 | 0.041 | 0.055 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.544 | 0.566 | 0.538 | 0.566 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 201.746 | 215.371 | 199.068 | 215.371 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1517.511 | 1565.105 | 1498.836 | 1565.105 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 167.775 | 174.299 | 163.850 | 174.299 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1440.457 | 1464.742 | 1421.291 | 1464.742 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.186 | 0.823 | 0.133 | 0.823 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.374 | 2.514 | 2.319 | 2.514 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.024 | 0.034 | 0.023 | 0.034 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.598 | 0.646 | 0.583 | 0.646 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 27.425 | 28.919 | 27.041 | 28.919 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 90.678 | 96.610 | 89.238 | 96.610 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 27.588 | 28.934 | 26.483 | 28.934 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 89.903 | 95.667 | 89.094 | 95.667 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 28.153 | 30.437 | 26.380 | 30.437 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 88.683 | 92.690 | 85.895 | 92.690 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.301 | 0.322 | 0.285 | 0.322 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.171 | 3.279 | 3.108 | 3.279 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.006 | 0.004 | 0.006 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.425 | 0.467 | 0.411 | 0.467 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 193.776 | 196.318 | 193.026 | 196.318 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1496.193 | 1521.752 | 1483.802 | 1521.752 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 162.544 | 173.025 | 159.354 | 173.025 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1430.333 | 1442.399 | 1426.081 | 1442.399 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.137 | 0.147 | 0.131 | 0.147 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.072 | 2.191 | 2.050 | 2.191 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.027 | 0.037 | 0.025 | 0.037 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.359 | 0.418 | 0.352 | 0.418 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.100 | 19.852 | 17.803 | 19.852 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 64.225 | 64.951 | 63.754 | 64.951 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.284 | 18.405 | 18.056 | 18.405 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 64.036 | 65.452 | 63.481 | 65.452 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.062 | 18.395 | 17.942 | 18.395 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 60.224 | 61.529 | 60.037 | 61.529 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.228 | 0.249 | 0.197 | 0.249 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.081 | 3.226 | 3.042 | 3.226 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.053 | 0.068 | 0.042 | 0.068 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.515 | 0.530 | 0.513 | 0.530 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 187.243 | 192.434 | 178.037 | 192.434 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1463.877 | 1485.816 | 1445.574 | 1485.816 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 164.352 | 177.783 | 163.584 | 177.783 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1446.858 | 1472.735 | 1424.736 | 1472.735 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.132 | 0.178 | 0.115 | 0.178 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.660 | 3.746 | 3.641 | 3.746 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.042 | 0.050 | 0.030 | 0.050 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.657 | 0.674 | 0.626 | 0.674 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.899 | 5.611 | 4.763 | 5.611 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.928 | 28.213 | 27.817 | 28.213 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.911 | 5.877 | 4.831 | 5.877 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.610 | 27.886 | 27.561 | 27.886 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 6.602 | 7.697 | 5.378 | 7.697 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.561 | 22.677 | 22.443 | 22.677 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.260 | 0.281 | 0.258 | 0.281 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.737 | 4.790 | 4.732 | 4.790 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.039 | 0.015 | 0.039 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.458 | 0.478 | 0.449 | 0.478 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 183.444 | 194.809 | 182.312 | 194.809 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1456.883 | 1501.619 | 1449.271 | 1501.619 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 172.617 | 175.947 | 166.739 | 175.947 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1436.039 | 1459.516 | 1423.557 | 1459.516 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.142 | 0.150 | 0.140 | 0.150 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.125 | 2.197 | 2.111 | 2.197 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.034 | 0.027 | 0.034 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.419 | 0.457 | 0.408 | 0.457 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.021 | 5.090 | 5.004 | 5.090 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.906 | 26.999 | 26.791 | 26.999 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.246 | 5.367 | 5.222 | 5.367 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.403 | 27.301 | 26.114 | 27.301 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.667 | 5.901 | 5.458 | 5.901 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.950 | 24.689 | 23.489 | 24.689 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.279 | 0.305 | 0.273 | 0.305 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.126 | 3.254 | 3.116 | 3.254 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.031 | 0.017 | 0.031 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.466 | 0.475 | 0.462 | 0.475 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 192.075 | 196.485 | 181.666 | 196.485 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1446.432 | 1508.667 | 1441.523 | 1508.667 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 165.274 | 169.310 | 162.258 | 169.310 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1429.892 | 1457.209 | 1424.956 | 1457.209 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.144 | 0.167 | 0.111 | 0.167 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.084 | 2.267 | 2.083 | 2.267 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.033 | 0.024 | 0.033 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.420 | 0.431 | 0.409 | 0.431 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.935 | 5.077 | 4.854 | 5.077 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.955 | 27.262 | 26.703 | 27.262 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.217 | 5.343 | 5.024 | 5.343 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.230 | 26.375 | 26.149 | 26.375 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.499 | 5.869 | 5.338 | 5.869 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.376 | 23.986 | 23.134 | 23.986 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.242 | 0.252 | 0.238 | 0.252 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.013 | 3.039 | 2.961 | 3.039 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.102 | 0.178 | 0.093 | 0.178 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.711 | 0.752 | 0.701 | 0.752 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 227.309 | 228.417 | 225.841 | 228.417 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1578.142 | 1620.497 | 1573.732 | 1620.497 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 29.680 | 31.365 | 28.951 | 31.365 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 118.937 | 128.421 | 118.563 | 128.421 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 29.300 | 29.910 | 28.993 | 29.910 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 125.458 | 137.391 | 122.060 | 137.391 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 30.262 | 32.101 | 30.223 | 32.101 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 106.516 | 109.053 | 106.094 | 109.053 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.760 | 0.778 | 0.635 | 0.778 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 16.693 | 17.346 | 16.373 | 17.346 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.111 | 0.118 | 0.095 | 0.118 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.645 | 0.656 | 0.631 | 0.656 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 174.595 | 177.597 | 173.499 | 177.597 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1435.182 | 1471.292 | 1429.918 | 1471.292 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 165.934 | 175.241 | 164.896 | 175.241 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1424.063 | 1467.902 | 1416.094 | 1467.902 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.110 | 0.145 | 0.091 | 0.145 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.624 | 2.792 | 2.623 | 2.792 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.026 | 0.015 | 0.026 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.595 | 0.641 | 0.573 | 0.641 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.524 | 3.137 | 2.456 | 3.137 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.430 | 17.362 | 16.373 | 17.362 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.676 | 3.143 | 2.591 | 3.143 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.859 | 16.275 | 15.735 | 16.275 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.665 | 2.765 | 2.488 | 2.765 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.162 | 12.421 | 11.865 | 12.421 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.422 | 0.473 | 0.394 | 0.473 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.799 | 3.865 | 3.742 | 3.865 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.019 | 0.015 | 0.019 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.445 | 0.475 | 0.432 | 0.475 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 182.206 | 197.984 | 180.126 | 197.984 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1454.633 | 1461.112 | 1446.302 | 1461.112 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 163.908 | 166.899 | 161.410 | 166.899 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1438.802 | 1454.938 | 1431.968 | 1454.938 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.170 | 0.208 | 0.145 | 0.208 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.280 | 3.397 | 3.212 | 3.397 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.023 | 0.030 | 0.016 | 0.030 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.583 | 0.613 | 0.568 | 0.613 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.585 | 6.741 | 6.364 | 6.741 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.699 | 37.174 | 34.267 | 37.174 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.617 | 6.706 | 6.550 | 6.706 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.866 | 37.282 | 33.620 | 37.282 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.061 | 7.897 | 6.951 | 7.897 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.555 | 30.471 | 29.312 | 30.471 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.239 | 0.265 | 0.222 | 0.265 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.294 | 4.344 | 4.241 | 4.344 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.008 | 0.004 | 0.008 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.424 | 0.479 | 0.421 | 0.479 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 177.595 | 190.513 | 175.055 | 190.513 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1426.493 | 1437.038 | 1417.399 | 1437.038 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 160.806 | 171.683 | 157.766 | 171.683 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1420.252 | 1438.367 | 1411.781 | 1438.367 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.087 | 0.100 | 0.073 | 0.100 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 1.953 | 1.997 | 1.911 | 1.997 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.023 | 0.030 | 0.015 | 0.030 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.351 | 0.388 | 0.337 | 0.388 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.827 | 3.236 | 1.716 | 3.236 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.703 | 13.960 | 13.426 | 13.960 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.982 | 2.218 | 1.786 | 2.218 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.298 | 13.463 | 13.054 | 13.463 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.952 | 2.634 | 1.657 | 2.634 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.692 | 11.645 | 10.395 | 11.645 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.209 | 0.270 | 0.190 | 0.270 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.675 | 2.715 | 2.611 | 2.715 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.201 | 0.217 | 0.191 | 0.217 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.124 | 1.164 | 1.121 | 1.164 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 201.614 | 206.236 | 196.596 | 206.236 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1464.391 | 1494.192 | 1459.029 | 1494.192 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 173.026 | 176.615 | 172.771 | 176.615 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1444.205 | 1465.917 | 1428.424 | 1465.917 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.313 | 0.357 | 0.298 | 0.357 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.633 | 5.704 | 5.571 | 5.704 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.031 | 0.027 | 0.031 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.700 | 1.765 | 1.686 | 1.765 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.170 | 11.674 | 11.048 | 11.674 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.632 | 45.591 | 44.187 | 45.591 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.733 | 12.906 | 11.643 | 12.906 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.453 | 47.780 | 43.424 | 47.780 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.229 | 12.210 | 11.199 | 12.210 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.109 | 37.571 | 36.868 | 37.571 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.817 | 1.161 | 0.795 | 1.161 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.026 | 6.051 | 6.010 | 6.051 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.019 | 0.031 | 0.011 | 0.031 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.447 | 0.483 | 0.443 | 0.483 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 176.608 | 184.344 | 174.028 | 184.344 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1466.473 | 1483.250 | 1425.709 | 1483.250 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 165.374 | 174.445 | 164.197 | 174.445 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1423.045 | 1528.777 | 1419.739 | 1528.777 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.148 | 0.196 | 0.120 | 0.196 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.760 | 4.253 | 3.528 | 4.253 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.026 | 0.031 | 0.017 | 0.031 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.613 | 0.746 | 0.551 | 0.746 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.498 | 1.570 | 1.415 | 1.570 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.531 | 16.865 | 16.230 | 16.865 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.781 | 1.897 | 1.716 | 1.897 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.783 | 16.038 | 15.733 | 16.038 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.955 | 2.063 | 1.818 | 2.063 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.137 | 11.494 | 10.800 | 11.494 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.163 | 0.181 | 0.141 | 0.181 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.801 | 4.931 | 4.740 | 4.931 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.142 | 0.157 | 0.107 | 0.157 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.676 | 0.690 | 0.663 | 0.690 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 175.644 | 179.101 | 175.058 | 179.101 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1439.634 | 1507.270 | 1426.172 | 1507.270 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 163.882 | 169.664 | 162.200 | 169.664 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1438.188 | 1477.907 | 1427.780 | 1477.907 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.137 | 0.187 | 0.131 | 0.187 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.122 | 6.383 | 2.979 | 6.383 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.027 | 0.039 | 0.018 | 0.039 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.740 | 0.923 | 0.713 | 0.923 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.583 | 2.835 | 2.448 | 2.835 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.477 | 15.025 | 14.247 | 15.025 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.654 | 3.111 | 2.625 | 3.111 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.726 | 14.163 | 13.644 | 14.163 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.864 | 3.848 | 2.426 | 3.848 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.323 | 10.554 | 10.039 | 10.554 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.474 | 1.019 | 0.445 | 1.019 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.559 | 3.619 | 3.550 | 3.619 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.032 | 0.043 | 0.030 | 0.043 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.530 | 0.560 | 0.526 | 0.560 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 164.567 | 190.610 | 162.474 | 190.610 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1423.531 | 1444.408 | 1414.974 | 1444.408 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.100 | 0.120 | 0.080 | 0.120 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.230 | 2.395 | 2.195 | 2.395 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.047 | 1.452 | 0.014 | 1.452 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.516 | 0.526 | 0.501 | 0.526 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.382 | 1.411 | 1.334 | 1.411 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.761 | 13.396 | 11.497 | 13.396 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.947 | 2.620 | 1.810 | 2.620 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.203 | 12.142 | 11.013 | 12.142 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.101 | 3.708 | 1.545 | 3.708 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.137 | 9.226 | 7.956 | 9.226 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.243 | 0.252 | 0.233 | 0.252 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.159 | 3.531 | 3.091 | 3.531 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 163.984 | 174.130 | 163.750 | 174.130 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1428.734 | 1434.939 | 1422.694 | 1434.939 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.291 | 0.302 | 0.218 | 0.302 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.464 | 2.656 | 2.462 | 2.656 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.438 | 0.474 | 0.432 | 0.474 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 31.621 | 33.284 | 31.181 | 33.284 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 111.962 | 115.646 | 110.873 | 115.646 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.252 | 0.338 | 0.234 | 0.338 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.479 | 3.512 | 3.447 | 3.512 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 164.244 | 167.565 | 163.902 | 167.565 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1437.360 | 1448.548 | 1436.726 | 1448.548 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.211 | 0.260 | 0.179 | 0.260 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.029 | 2.072 | 2.011 | 2.072 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.025 | 0.033 | 0.021 | 0.033 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.411 | 0.457 | 0.400 | 0.457 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 27.026 | 28.291 | 26.617 | 28.291 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 84.825 | 90.280 | 84.001 | 90.280 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.180 | 0.207 | 0.163 | 0.207 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.783 | 2.942 | 2.688 | 2.942 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 164.628 | 168.942 | 160.397 | 168.942 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1440.183 | 1549.143 | 1432.151 | 1549.143 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.154 | 0.177 | 0.153 | 0.177 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.045 | 2.271 | 2.019 | 2.271 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.037 | 0.020 | 0.037 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.396 | 0.468 | 0.394 | 0.468 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 4.207 | 4.323 | 3.971 | 4.323 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 20.989 | 24.585 | 20.326 | 24.585 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.165 | 0.182 | 0.153 | 0.182 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.940 | 3.117 | 2.835 | 3.117 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 173.541 | 174.011 | 170.796 | 174.011 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1439.896 | 1483.201 | 1423.851 | 1483.201 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.208 | 0.236 | 0.176 | 0.236 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.088 | 2.154 | 2.077 | 2.154 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.032 | 0.069 | 0.022 | 0.069 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.419 | 0.452 | 0.410 | 0.452 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 32.325 | 32.790 | 32.294 | 32.790 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 107.232 | 108.798 | 106.885 | 108.798 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.167 | 0.176 | 0.156 | 0.176 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.745 | 2.822 | 2.681 | 2.822 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 171.584 | 178.973 | 167.852 | 178.973 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1421.027 | 1433.306 | 1417.040 | 1433.306 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.190 | 0.236 | 0.155 | 0.236 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.041 | 2.075 | 2.010 | 2.075 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.020 | 0.030 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.405 | 0.422 | 0.388 | 0.422 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.110 | 4.263 | 4.060 | 4.263 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.660 | 21.192 | 20.239 | 21.192 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.186 | 0.193 | 0.172 | 0.193 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.667 | 2.715 | 2.656 | 2.715 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 167.619 | 185.551 | 162.692 | 185.551 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1429.436 | 1505.556 | 1425.851 | 1505.556 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.242 | 0.340 | 0.217 | 0.340 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.087 | 2.109 | 2.044 | 2.109 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.032 | 0.047 | 0.021 | 0.047 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.414 | 0.434 | 0.407 | 0.434 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 30.893 | 32.404 | 30.856 | 32.404 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 107.809 | 108.574 | 107.477 | 108.574 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.179 | 0.290 | 0.174 | 0.290 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.695 | 2.745 | 2.608 | 2.745 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 167.033 | 182.565 | 164.176 | 182.565 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1422.111 | 1450.022 | 1420.970 | 1450.022 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.178 | 0.193 | 0.150 | 0.193 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.050 | 2.083 | 2.033 | 2.083 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.033 | 0.020 | 0.033 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.399 | 0.408 | 0.399 | 0.408 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.330 | 5.838 | 4.110 | 5.838 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 20.820 | 21.279 | 20.622 | 21.279 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.178 | 0.203 | 0.156 | 0.203 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.718 | 2.860 | 2.697 | 2.860 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | effect-prophet | 6 | 203.142 | 240.449 | 185.030 | 240.449 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | python-prophet | 6 | 1638.020 | 1719.446 | 1626.753 | 1719.446 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | effect-prophet | 6 | 4.862 | 5.087 | 3.928 | 5.087 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | python-prophet | 6 | 16.777 | 18.051 | 16.645 | 18.051 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | effect-prophet | 6 | 0.848 | 2.410 | 0.744 | 2.410 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | python-prophet | 6 | 32.599 | 33.416 | 32.363 | 33.416 | n/a |
| mcmc-linear-default-changepoints | warm-fit | effect-prophet | 6 | 5035.550 | 5045.981 | 5030.702 | 5045.981 | n/a |
| mcmc-linear-default-changepoints | warm-fit | python-prophet | 6 | 4114.863 | 4612.453 | 4086.287 | 4612.453 | n/a |
| mcmc-linear-default-changepoints | warm-predict | effect-prophet | 6 | 0.426 | 0.731 | 0.403 | 0.731 | n/a |
| mcmc-linear-default-changepoints | warm-predict | python-prophet | 6 | 3.506 | 3.775 | 3.410 | 3.775 | n/a |
| mcmc-linear-default-changepoints | warm-uncertainty | effect-prophet | 6 | 7.588 | 14.897 | 7.186 | 14.897 | 194.4 |
| mcmc-linear-default-changepoints | warm-uncertainty | python-prophet | 6 | 152.808 | 168.134 | 151.642 | 168.134 | 135.0 |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.085 | 217.156 | 181.269 | 217.156 | n/a |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1663.650 | 1812.704 | 1657.101 | 1812.704 | n/a |
| mcmc-linear-mixed-components | model-json-decode | effect-prophet | 6 | 2.529 | 3.461 | 1.888 | 3.461 | n/a |
| mcmc-linear-mixed-components | model-json-decode | python-prophet | 6 | 9.496 | 10.664 | 9.098 | 10.664 | n/a |
| mcmc-linear-mixed-components | model-json-encode | effect-prophet | 6 | 0.331 | 0.352 | 0.300 | 0.352 | n/a |
| mcmc-linear-mixed-components | model-json-encode | python-prophet | 6 | 13.196 | 13.803 | 12.881 | 13.803 | n/a |
| mcmc-linear-mixed-components | warm-fit | effect-prophet | 6 | 139.105 | 142.926 | 138.398 | 142.926 | n/a |
| mcmc-linear-mixed-components | warm-fit | python-prophet | 6 | 187.396 | 190.277 | 186.264 | 190.277 | n/a |
| mcmc-linear-mixed-components | warm-predict | effect-prophet | 6 | 0.307 | 0.322 | 0.305 | 0.322 | n/a |
| mcmc-linear-mixed-components | warm-predict | python-prophet | 6 | 5.064 | 5.287 | 4.866 | 5.287 | n/a |
| mcmc-linear-mixed-components | warm-uncertainty | effect-prophet | 6 | 2.817 | 3.108 | 2.708 | 3.108 | 179.9 |
| mcmc-linear-mixed-components | warm-uncertainty | python-prophet | 6 | 175.789 | 189.022 | 159.915 | 189.022 | 129.8 |
| mcmc-linear-regressor-model | warm-fit | effect-prophet | 6 | 4641.028 | 4661.502 | 4636.016 | 4661.502 | n/a |
| mcmc-linear-regressor-model | warm-fit | python-prophet | 6 | 4241.298 | 4501.800 | 4122.141 | 4501.800 | n/a |
| mcmc-linear-regressor-model | warm-predict | effect-prophet | 6 | 1.690 | 3.370 | 0.899 | 3.370 | n/a |
| mcmc-linear-regressor-model | warm-predict | python-prophet | 6 | 17.370 | 17.941 | 17.177 | 17.941 | n/a |
| mcmc-linear-regressor-model | warm-uncertainty | effect-prophet | 6 | 14.298 | 16.692 | 12.924 | 16.692 | 214.8 |
| mcmc-linear-regressor-model | warm-uncertainty | python-prophet | 6 | 296.458 | 314.729 | 289.595 | 314.729 | 133.5 |
| mcmc-linear-sampled-regressor-model | warm-fit | effect-prophet | 6 | 4991.401 | 5041.765 | 4951.450 | 5041.765 | n/a |
| mcmc-linear-sampled-regressor-model | warm-fit | python-prophet | 6 | 4528.955 | 4754.536 | 4403.287 | 4754.536 | n/a |
| mcmc-linear-sampled-regressor-model | warm-predict | effect-prophet | 6 | 0.968 | 1.056 | 0.779 | 1.056 | n/a |
| mcmc-linear-sampled-regressor-model | warm-predict | python-prophet | 6 | 111.495 | 136.068 | 110.530 | 136.068 | n/a |
| mcmc-linear-sampled-regressor-model | warm-uncertainty | effect-prophet | 6 | 17.883 | 19.059 | 13.759 | 19.059 | 221.8 |
| mcmc-linear-sampled-regressor-model | warm-uncertainty | python-prophet | 6 | 494.611 | 518.428 | 483.188 | 518.428 | 139.9 |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 197.225 | 208.800 | 191.920 | 208.800 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1624.724 | 1714.719 | 1624.067 | 1714.719 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 188.156 | 197.536 | 179.361 | 197.536 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1598.215 | 1648.261 | 1588.984 | 1648.261 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.167 | 0.187 | 0.150 | 0.187 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.313 | 2.522 | 2.244 | 2.522 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.024 | 0.033 | 0.021 | 0.033 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.603 | 0.639 | 0.526 | 0.639 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.058 | 0.067 | 0.052 | 0.067 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.602 | 0.631 | 0.580 | 0.631 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.835 | 13.323 | 11.383 | 13.323 | 150.9 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 157.730 | 172.839 | 155.582 | 172.839 | 129.8 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 358.111 | 369.533 | 348.311 | 369.533 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2159.461 | 2202.684 | 2146.728 | 2202.684 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 250.384 | 265.474 | 247.254 | 265.474 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1840.840 | 1896.969 | 1818.744 | 1896.969 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.204 | 0.263 | 0.190 | 0.263 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.726 | 4.096 | 3.632 | 4.096 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.027 | 0.045 | 0.021 | 0.045 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.445 | 1.469 | 1.431 | 1.469 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.053 | 0.077 | 0.052 | 0.077 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.447 | 2.216 | 1.408 | 2.216 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 70.219 | 72.938 | 68.871 | 72.938 | 164.9 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 371.698 | 384.230 | 369.294 | 384.230 | 162.9 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 179.679 | 193.574 | 176.127 | 193.574 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1474.188 | 1493.514 | 1463.069 | 1493.514 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.865 | 178.080 | 164.599 | 178.080 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1455.674 | 1472.086 | 1449.011 | 1472.086 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.196 | 0.224 | 0.172 | 0.224 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.614 | 3.794 | 3.526 | 3.794 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.035 | 0.018 | 0.035 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.648 | 0.671 | 0.635 | 0.671 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.066 | 0.038 | 0.066 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.501 | 0.599 | 0.491 | 0.599 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.454 | 1.384 | 0.431 | 1.384 | 139.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.449 | 42.007 | 24.750 | 42.007 | 129.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 186.455 | 190.051 | 178.328 | 190.051 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1516.903 | 1539.658 | 1507.053 | 1539.658 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.366 | 193.582 | 166.490 | 193.582 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1513.525 | 1548.723 | 1503.489 | 1548.723 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.193 | 0.208 | 0.192 | 0.208 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.674 | 3.843 | 3.583 | 3.843 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.020 | 0.032 | 0.018 | 0.032 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.643 | 0.664 | 0.623 | 0.664 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.058 | 0.065 | 0.038 | 0.065 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.525 | 0.577 | 0.495 | 0.577 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.819 | 1.087 | 0.750 | 1.087 | 144.4 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.196 | 68.932 | 67.333 | 68.932 | 129.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 188.234 | 194.404 | 175.888 | 194.404 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1471.932 | 1486.919 | 1462.146 | 1486.919 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.027 | 170.704 | 161.181 | 170.704 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1455.557 | 1512.872 | 1444.618 | 1512.872 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.184 | 0.286 | 0.168 | 0.286 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.181 | 2.455 | 2.136 | 2.455 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.027 | 0.043 | 0.022 | 0.043 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.415 | 0.455 | 0.395 | 0.455 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.030 | 0.011 | 0.030 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.449 | 0.508 | 0.442 | 0.508 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.311 | 0.388 | 0.269 | 0.388 | 139.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.677 | 19.977 | 19.496 | 19.977 | 129.8 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 180.054 | 186.651 | 174.860 | 186.651 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1476.622 | 1560.969 | 1464.988 | 1560.969 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 175.919 | 177.269 | 168.515 | 177.269 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1437.893 | 1456.947 | 1435.520 | 1456.947 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.175 | 0.203 | 0.165 | 0.203 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.178 | 2.387 | 2.123 | 2.387 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.031 | 0.037 | 0.020 | 0.037 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.418 | 0.501 | 0.399 | 0.501 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.012 | 0.019 | 0.010 | 0.019 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.460 | 0.473 | 0.446 | 0.473 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.193 | 0.229 | 0.167 | 0.229 | 140.4 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.819 | 17.208 | 16.649 | 17.208 | 129.8 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 225.552 | 242.344 | 223.687 | 242.344 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1837.754 | 1910.528 | 1833.573 | 1910.528 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.144 | 0.195 | 0.136 | 0.195 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.682 | 0.715 | 0.673 | 0.715 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 9.078 | 13.799 | 8.888 | 13.799 | 169.5 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 246.683 | 269.098 | 245.107 | 269.098 | 129.8 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 171.176 | 183.479 | 167.900 | 183.479 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1447.449 | 1460.085 | 1442.647 | 1460.085 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.458 | 0.560 | 0.454 | 0.560 | 141.3 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 17.779 | 18.818 | 17.669 | 18.818 | 129.8 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 27.245 | 29.001 | 26.718 | 29.001 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 86.691 | 91.101 | 86.403 | 91.101 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 8.590 | 9.320 | 8.194 | 9.320 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.115 | 22.080 | 21.000 | 22.080 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 26.229 | 28.414 | 25.856 | 28.414 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 87.206 | 91.290 | 86.585 | 91.290 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 27.113 | 27.935 | 26.429 | 27.935 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.601 | 79.043 | 73.183 | 79.043 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>14:43:17 - cmdstanpy - INFO - Chain [1] start processing<br>14:43:17 - cmdstanpy - INFO - Chain [1] done processing<br>14:43:17 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=75506 data file=/tmp/tmpermxpln5/uc3prxci.json init=/tmp/tmpermxpln5/1jl0gtrb.json output file=/tmp/tmpermxpln5/prophet_model945simna/prophet_model-20261104144317.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpermxpln5/uc3prxci.json<br>init = /tmp/tmpermxpln5/1jl0gtrb.json<br>random<br>  seed = 75506<br>output<br>  file = /tmp/tmpermxpln5/prophet_model945simna/prophet_model-20261104144317.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 910, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 347, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 276, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=75506 data file=/tmp/tmpermxpln5/uc3prxci.json init=/tmp/tmpermxpln5/1jl0gtrb.json output file=/tmp/tmpermxpln5/prophet_model945simna/prophet_model-20261104144317.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>14:43:19 - cmdstanpy - INFO - Chain [1] start processing<br>14:43:19 - cmdstanpy - INFO - Chain [1] done processing<br>14:43:19 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=47987 data file=/tmp/tmpuk5ohj9z/q4n4x95u.json init=/tmp/tmpuk5ohj9z/t_xchiqp.json output file=/tmp/tmpuk5ohj9z/prophet_model6oi7m5dn/prophet_model-20261104144319.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpuk5ohj9z/q4n4x95u.json<br>init = /tmp/tmpuk5ohj9z/t_xchiqp.json<br>random<br>  seed = 47987<br>output<br>  file = /tmp/tmpuk5ohj9z/prophet_model6oi7m5dn/prophet_model-20261104144319.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 910, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 347, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 276, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=47987 data file=/tmp/tmpuk5ohj9z/q4n4x95u.json init=/tmp/tmpuk5ohj9z/t_xchiqp.json output file=/tmp/tmpuk5ohj9z/prophet_model6oi7m5dn/prophet_model-20261104144319.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 913, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 454, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 913, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 454, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `d4edbd51740a32f8a1d8e245aa70e2ba8d313fc7`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `country-global-priors-linear`, `country-global-priors-overrides-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `anomalies-linear-defaults-99`, `warm-start-linear-defaults-30-new-rows`, `warm-start-linear-defaults-1-new-row`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`, `evaluation-linear-custom-search`, `evaluation-linear-long-history-parallel`, `linear-regressor-model`, `uncertainty-linear-regressor-model-intervals-1000`, `evaluation-linear-regressor-model-point`, `evaluation-linear-regressor-model-intervals`, `mcmc-linear-mixed-components`, `mcmc-linear-default-changepoints`, `mcmc-linear-regressor-model`, `mcmc-linear-sampled-regressor-model`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:3a0b8982c7c2549c4371e76ccbb4746eb0a08b745b6e2e5df640f6feaa76418a`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:4a7391c7de7249a9491d08fe69e0eea60542221c2e3d5ed50e6d6bcd8d3c75a6`

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

