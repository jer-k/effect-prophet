# Effect Prophet benchmark — 2026-11-05T051506-488Z-b7a56669

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
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 25.504 | 26.693 | 24.995 | 26.693 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 205.504 | 219.763 | 194.730 | 219.763 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.284 | 7.756 | 6.838 | 7.756 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 31.830 | 32.880 | 29.061 | 32.880 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 13.085 | 14.048 | 12.877 | 14.048 | 139.9 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 180.854 | 212.644 | 165.453 | 212.644 | 130.0 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.029 | 0.013 | 0.029 | 139.3 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.458 | 0.500 | 0.453 | 0.500 | 147.0 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 180.542 | 184.031 | 180.058 | 184.031 | 154.3 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1624.737 | 1643.262 | 1617.990 | 1643.262 | 147.0 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 165.601 | 167.173 | 164.230 | 167.173 | 168.5 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1642.342 | 1721.339 | 1586.443 | 1721.339 | 147.0 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 1.124 | 1.342 | 1.073 | 1.342 | 165.8 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.424 | 3.590 | 3.407 | 3.590 | 147.0 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.105 | 0.110 | 0.101 | 0.110 | 156.6 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.522 | 0.541 | 0.514 | 0.541 | 147.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.011 | 5.160 | 4.990 | 5.160 | 154.1 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 28.396 | 30.574 | 27.752 | 30.574 | 147.0 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.428 | 5.640 | 5.306 | 5.640 | 153.1 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 29.765 | 31.837 | 28.706 | 31.837 | 147.0 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.632 | 5.863 | 5.478 | 5.863 | 149.3 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 21.303 | 21.584 | 21.244 | 21.584 | 147.0 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.291 | 0.310 | 0.268 | 0.310 | 150.5 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.455 | 5.606 | 5.406 | 5.606 | 147.0 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 136.9 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.468 | 0.620 | 0.442 | 0.620 | 129.8 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 176.103 | 183.157 | 173.995 | 183.157 | 152.0 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1455.256 | 1505.414 | 1437.784 | 1505.414 | 129.8 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 164.669 | 172.012 | 161.020 | 172.012 | 152.4 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1474.363 | 1486.563 | 1433.204 | 1486.563 | 129.8 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.433 | 0.598 | 0.381 | 0.598 | 152.0 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.949 | 4.813 | 3.916 | 4.813 | 129.8 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.025 | 0.029 | 0.018 | 0.029 | 152.0 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.719 | 0.748 | 0.689 | 0.748 | 129.8 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.718 | 3.769 | 3.629 | 3.769 | 151.9 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.473 | 22.899 | 22.353 | 22.899 | 129.8 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.911 | 4.242 | 3.840 | 4.242 | 149.2 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 21.992 | 26.019 | 21.891 | 26.019 | 129.8 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.484 | 5.725 | 3.990 | 5.725 | 148.4 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 18.436 | 21.635 | 17.160 | 21.635 | 129.8 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.147 | 0.155 | 0.130 | 0.155 | 148.5 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.851 | 4.974 | 4.649 | 4.974 | 129.8 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.025 | 0.013 | 0.025 | 137.8 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.510 | 0.459 | 0.510 | 129.8 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 177.573 | 182.198 | 175.513 | 182.198 | 152.4 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1709.104 | 1869.548 | 1603.896 | 1869.548 | 129.8 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 164.399 | 178.102 | 161.321 | 178.102 | 152.7 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1547.084 | 1830.080 | 1457.706 | 1830.080 | 129.8 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.389 | 0.482 | 0.385 | 0.482 | 152.5 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 4.469 | 4.994 | 4.207 | 4.994 | 129.8 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.024 | 0.035 | 0.018 | 0.035 | 152.4 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.801 | 1.691 | 0.749 | 1.691 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.977 | 4.051 | 3.923 | 4.051 | 152.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 24.338 | 28.088 | 23.552 | 28.088 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.248 | 4.364 | 4.181 | 4.364 | 149.5 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 24.056 | 27.285 | 23.399 | 27.285 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 4.807 | 6.198 | 4.297 | 6.198 | 148.5 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.352 | 22.442 | 20.033 | 22.442 | 129.8 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.153 | 0.278 | 0.140 | 0.278 | 148.6 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.553 | 5.979 | 5.250 | 5.979 | 129.8 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.047 | 0.066 | 0.037 | 0.066 | 140.6 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.532 | 0.913 | 0.500 | 0.913 | 147.5 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 182.599 | 189.656 | 178.956 | 189.656 | 172.8 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1699.380 | 1885.007 | 1664.296 | 1885.007 | 147.5 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 166.597 | 169.428 | 164.398 | 169.428 | 176.8 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1780.584 | 1838.830 | 1690.361 | 1838.830 | 147.5 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 1.052 | 1.298 | 0.865 | 1.298 | 173.5 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 5.550 | 6.853 | 5.164 | 6.853 | 147.5 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.125 | 0.150 | 0.108 | 0.150 | 173.0 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.795 | 1.670 | 0.745 | 1.670 | 147.5 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.088 | 5.978 | 4.618 | 5.978 | 169.5 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 38.224 | 39.348 | 35.068 | 39.348 | 147.5 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 5.037 | 5.901 | 4.934 | 5.901 | 155.7 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 34.872 | 38.667 | 34.218 | 38.667 | 147.5 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.524 | 6.890 | 5.170 | 6.890 | 152.5 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 28.646 | 29.386 | 27.883 | 29.386 | 147.5 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.226 | 0.231 | 0.210 | 0.231 | 153.3 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.530 | 6.664 | 6.328 | 6.664 | 147.5 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.051 | 0.058 | 0.035 | 0.058 | 136.3 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.575 | 0.729 | 0.521 | 0.729 | 147.7 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 181.777 | 201.263 | 180.355 | 201.263 | 166.4 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1683.537 | 1742.322 | 1668.618 | 1742.322 | 147.7 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 168.655 | 171.154 | 167.295 | 171.154 | 172.4 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1611.995 | 1632.156 | 1595.753 | 1632.156 | 147.7 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 0.810 | 0.957 | 0.788 | 0.957 | 167.4 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.484 | 4.580 | 4.356 | 4.580 | 147.7 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.113 | 0.128 | 0.098 | 0.128 | 166.9 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.791 | 0.999 | 0.748 | 0.999 | 147.7 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.923 | 6.926 | 5.857 | 6.926 | 162.8 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 34.910 | 37.691 | 34.549 | 37.691 | 147.7 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.288 | 6.048 | 5.088 | 6.048 | 149.1 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 37.129 | 40.061 | 34.931 | 40.061 | 147.7 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 5.847 | 7.373 | 5.638 | 7.373 | 148.2 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 30.214 | 31.280 | 30.028 | 31.280 | 147.7 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.219 | 0.240 | 0.210 | 0.240 | 148.3 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.992 | 7.726 | 6.692 | 7.726 | 147.7 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.013 | 0.014 | 141.5 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.472 | 0.503 | 0.453 | 0.503 | 147.5 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 179.274 | 184.918 | 176.750 | 184.918 | 156.7 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1645.934 | 2099.040 | 1619.739 | 2099.040 | 147.5 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 165.332 | 166.789 | 163.048 | 166.789 | 171.0 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1641.718 | 1773.665 | 1590.457 | 1773.665 | 147.5 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 1.240 | 1.271 | 1.193 | 1.271 | 168.0 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 4.059 | 5.218 | 3.862 | 5.218 | 147.5 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.128 | 0.142 | 0.113 | 0.142 | 159.0 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.703 | 1.082 | 0.673 | 1.082 | 147.5 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.222 | 4.341 | 4.180 | 4.341 | 156.6 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 28.097 | 30.342 | 26.535 | 30.342 | 147.5 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.422 | 4.504 | 4.376 | 4.504 | 155.7 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 27.880 | 28.754 | 27.160 | 28.754 | 147.5 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 4.851 | 4.924 | 4.665 | 4.924 | 151.7 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 21.400 | 22.511 | 20.467 | 22.511 | 147.5 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.255 | 0.299 | 0.245 | 0.299 | 153.0 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.596 | 6.246 | 5.413 | 6.246 | 147.5 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.025 | 0.013 | 0.025 | 139.7 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.465 | 0.482 | 0.449 | 0.482 | 147.6 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 179.280 | 183.735 | 177.772 | 183.735 | 155.0 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1623.018 | 1666.968 | 1604.122 | 1666.968 | 147.6 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 165.998 | 171.118 | 165.574 | 171.118 | 169.2 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1594.838 | 1787.690 | 1583.135 | 1787.690 | 147.6 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 1.271 | 1.411 | 1.178 | 1.411 | 166.3 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.948 | 4.080 | 3.913 | 4.080 | 147.6 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.133 | 0.146 | 0.118 | 0.146 | 157.3 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.681 | 0.694 | 0.670 | 0.694 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.556 | 4.630 | 4.520 | 4.630 | 154.8 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 28.305 | 30.655 | 27.361 | 30.655 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.728 | 4.834 | 4.673 | 4.834 | 153.8 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 27.000 | 30.158 | 26.632 | 30.158 | 147.6 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.010 | 5.364 | 4.919 | 5.364 | 149.7 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 22.624 | 24.539 | 22.022 | 24.539 | 147.6 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.274 | 0.299 | 0.267 | 0.299 | 150.9 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.634 | 6.498 | 5.578 | 6.498 | 147.6 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 18.238 | 18.454 | 18.145 | 18.454 | 155.5 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 147.976 | 170.365 | 145.486 | 170.365 | 129.8 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 19.938 | 23.637 | 19.754 | 23.637 | 153.0 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 141.963 | 151.885 | 141.669 | 151.885 | 129.8 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 5.927 | 6.526 | 5.896 | 6.526 | 148.2 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 29.361 | 29.701 | 29.353 | 29.701 | 129.8 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.204 | 0.647 | 0.183 | 0.647 | 149.2 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 129.8 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.259 | 0.273 | 0.254 | 0.273 | 148.6 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 129.8 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 21.468 | 22.014 | 21.289 | 22.014 | 147.4 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 148.761 | 152.559 | 147.993 | 152.559 | 129.8 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 10.272 | 11.866 | 10.268 | 11.866 | 140.5 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 76.755 | 82.200 | 76.158 | 82.200 | 129.8 |
| evaluation-linear-long-history-parallel | evaluation-intervals-processes | python-prophet | 4 | 2448.360 | 2670.149 | 2430.162 | 2670.149 | 139.6 |
| evaluation-linear-long-history-parallel | evaluation-intervals-threads | python-prophet | 4 | 1108.039 | 1162.894 | 1102.888 | 1162.894 | 139.6 |
| evaluation-linear-long-history-parallel | evaluation-intervals | effect-prophet | 4 | 950.932 | 960.062 | 948.004 | 960.062 | 196.5 |
| evaluation-linear-long-history-parallel | evaluation-intervals | python-prophet | 4 | 2688.430 | 2902.969 | 2630.934 | 2902.969 | 138.7 |
| evaluation-linear-long-history-parallel | evaluation-point-processes | python-prophet | 4 | 2427.341 | 2628.840 | 2405.599 | 2628.840 | 138.6 |
| evaluation-linear-long-history-parallel | evaluation-point-threads | python-prophet | 4 | 1062.163 | 1166.732 | 1041.309 | 1166.732 | 138.6 |
| evaluation-linear-long-history-parallel | evaluation-point | effect-prophet | 4 | 947.325 | 955.641 | 942.085 | 955.641 | 186.3 |
| evaluation-linear-long-history-parallel | evaluation-point | python-prophet | 4 | 2585.918 | 2658.656 | 2571.838 | 2658.656 | 129.8 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 186.699 | 190.984 | 184.940 | 190.984 | 143.2 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1477.936 | 1496.789 | 1476.124 | 1496.789 | 129.8 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.028 | 1.240 | 1.016 | 1.240 | 143.0 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.101 | 1.129 | 1.098 | 1.129 | 129.8 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.007 | 0.008 | 0.007 | 0.008 | 125.8 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.379 | 0.434 | 0.357 | 0.434 | 129.8 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.058 | 0.082 | 0.057 | 0.082 | 142.9 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.281 | 5.504 | 5.276 | 5.504 | 129.8 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.038 | 1.174 | 1.013 | 1.174 | 125.8 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.629 | 0.679 | 0.604 | 0.679 | 129.8 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 10.188 | 10.691 | 10.061 | 10.691 | 142.7 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 70.607 | 70.954 | 70.573 | 70.954 | 129.8 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 54.817 | 60.000 | 53.528 | 60.000 | 154.6 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 273.534 | 293.017 | 257.732 | 293.017 | 129.8 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 238.906 | 260.757 | 238.714 | 260.757 | 152.1 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1681.057 | 1717.676 | 1652.939 | 1717.676 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 2.638 | 2.718 | 2.561 | 2.718 | 152.0 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.361 | 1.415 | 1.347 | 1.415 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.170 | 0.188 | 0.146 | 0.188 | 130.3 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.574 | 0.628 | 0.553 | 0.628 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.085 | 0.106 | 0.067 | 0.106 | 151.5 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.386 | 6.195 | 5.368 | 6.195 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.090 | 2.425 | 2.081 | 2.425 | 138.9 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.818 | 0.828 | 0.798 | 0.828 | 129.8 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 52.219 | 54.612 | 51.174 | 54.612 | 151.0 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 192.014 | 207.303 | 184.429 | 207.303 | 129.8 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.428 | 6.779 | 6.127 | 6.779 | 150.4 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.268 | 29.745 | 29.200 | 29.745 | 129.8 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.204 | 0.260 | 0.179 | 0.260 | 151.4 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.007 | 0.004 | 0.007 | 129.8 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.217 | 0.259 | 0.211 | 0.259 | 150.9 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 129.8 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.455 | 22.200 | 19.951 | 22.200 | 149.8 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 147.786 | 149.970 | 147.037 | 149.970 | 129.8 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 0.968 | 1.056 | 0.965 | 1.056 | 150.9 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.384 | 1.432 | 1.365 | 1.432 | 129.8 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.874 | 4.075 | 3.674 | 4.075 | 154.6 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 23.168 | 24.534 | 22.127 | 24.534 | 129.8 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.956 | 1.132 | 0.945 | 1.132 | 133.4 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.939 | 1.025 | 0.929 | 1.025 | 129.8 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 7.108 | 7.518 | 6.393 | 7.518 | 150.9 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 54.290 | 60.009 | 52.337 | 60.009 | 129.8 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.201 | 0.267 | 0.196 | 0.267 | 155.0 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 129.8 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.247 | 0.374 | 0.237 | 0.374 | 155.0 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.007 | 0.010 | 129.8 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.926 | 7.746 | 5.708 | 7.746 | 154.4 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 59.962 | 60.875 | 59.425 | 60.875 | 129.8 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.016 | 0.048 | 0.007 | 0.061 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.545 | 0.559 | 0.531 | 0.564 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.470 | 0.564 | 0.326 | 0.805 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.600 | 2.668 | 2.550 | 2.746 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.026 | 0.035 | 0.025 | 0.035 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.543 | 0.581 | 0.535 | 0.581 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 189.814 | 198.810 | 178.483 | 198.810 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1493.065 | 1581.952 | 1467.524 | 1581.952 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 170.378 | 181.292 | 162.602 | 181.292 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1446.373 | 1607.511 | 1440.019 | 1607.511 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.147 | 0.172 | 0.136 | 0.172 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.321 | 2.470 | 2.277 | 2.470 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.029 | 0.049 | 0.026 | 0.049 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.554 | 0.579 | 0.538 | 0.579 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.199 | 6.649 | 6.116 | 6.649 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 18.097 | 20.646 | 17.702 | 20.646 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 7.007 | 8.193 | 6.571 | 8.193 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 17.422 | 18.861 | 17.158 | 18.861 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 7.272 | 8.704 | 6.448 | 8.704 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 14.419 | 14.952 | 14.134 | 14.952 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.275 | 0.315 | 0.269 | 0.315 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.185 | 3.378 | 3.111 | 3.378 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.051 | 0.060 | 0.040 | 0.060 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.612 | 0.618 | 0.592 | 0.618 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 198.093 | 283.863 | 196.788 | 283.863 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1618.920 | 1775.617 | 1593.474 | 1775.617 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 171.476 | 202.322 | 163.686 | 202.322 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1528.175 | 1715.219 | 1493.182 | 1715.219 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.206 | 2.295 | 0.133 | 2.295 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.469 | 3.517 | 2.363 | 3.517 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.027 | 0.102 | 0.025 | 0.102 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.590 | 0.668 | 0.578 | 0.668 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.810 | 26.622 | 25.790 | 26.622 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 97.332 | 140.956 | 96.979 | 140.956 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.987 | 26.117 | 25.806 | 26.117 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 90.637 | 100.495 | 89.818 | 100.495 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.153 | 27.888 | 25.814 | 27.888 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 87.734 | 99.045 | 86.300 | 99.045 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.307 | 0.322 | 0.292 | 0.322 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.214 | 5.911 | 3.150 | 5.911 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.004 | 0.006 | 0.004 | 0.006 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.441 | 0.464 | 0.431 | 0.464 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 190.669 | 200.928 | 188.792 | 200.928 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1493.794 | 1535.204 | 1484.012 | 1535.204 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 161.809 | 166.587 | 159.923 | 166.587 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1436.727 | 1476.657 | 1422.068 | 1476.657 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.145 | 0.163 | 0.132 | 0.163 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.033 | 2.134 | 2.016 | 2.134 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.029 | 0.034 | 0.025 | 0.034 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.375 | 0.395 | 0.344 | 0.395 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.425 | 19.751 | 17.967 | 19.751 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 66.278 | 67.981 | 65.934 | 67.981 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.295 | 19.475 | 18.238 | 19.475 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 64.314 | 66.201 | 63.508 | 66.201 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.318 | 18.600 | 18.059 | 18.600 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 61.449 | 61.922 | 60.279 | 61.922 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.224 | 0.343 | 0.205 | 0.343 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.212 | 3.340 | 3.154 | 3.340 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.045 | 0.074 | 0.044 | 0.074 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.544 | 0.574 | 0.525 | 0.574 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 179.235 | 195.973 | 175.381 | 195.973 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1490.251 | 1619.793 | 1461.351 | 1619.793 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 167.108 | 172.724 | 164.700 | 172.724 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1547.515 | 1582.568 | 1542.372 | 1582.568 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.129 | 0.160 | 0.118 | 0.160 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.672 | 4.580 | 3.553 | 4.580 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.035 | 0.030 | 0.035 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.653 | 0.727 | 0.632 | 0.727 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.501 | 5.986 | 5.375 | 5.986 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 32.803 | 35.213 | 30.295 | 35.213 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 5.635 | 6.127 | 5.506 | 6.127 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 30.986 | 34.267 | 30.280 | 34.267 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 6.690 | 7.920 | 6.133 | 7.920 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 24.492 | 26.734 | 24.333 | 26.734 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.285 | 0.349 | 0.277 | 0.349 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 5.720 | 7.217 | 5.484 | 7.217 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.018 | 0.013 | 0.018 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.516 | 0.677 | 0.494 | 0.677 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 176.099 | 182.044 | 175.305 | 182.044 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1509.913 | 1570.509 | 1483.857 | 1570.509 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.437 | 181.367 | 163.397 | 181.367 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1511.036 | 1522.642 | 1492.222 | 1522.642 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.114 | 0.141 | 0.114 | 0.141 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.225 | 2.773 | 2.192 | 2.773 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.049 | 0.025 | 0.049 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.478 | 0.500 | 0.436 | 0.500 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.733 | 4.822 | 4.675 | 4.822 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 29.195 | 31.032 | 27.849 | 31.032 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.010 | 6.920 | 4.930 | 6.920 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 28.336 | 29.517 | 27.918 | 29.517 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.536 | 5.844 | 5.383 | 5.844 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 25.158 | 26.611 | 25.019 | 26.611 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.353 | 0.365 | 0.281 | 0.365 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.163 | 3.959 | 3.158 | 3.959 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.040 | 0.017 | 0.040 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.566 | 0.633 | 0.561 | 0.633 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 189.435 | 201.130 | 178.759 | 201.130 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1540.187 | 2007.279 | 1526.423 | 2007.279 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 175.849 | 183.272 | 166.949 | 183.272 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1507.011 | 1577.800 | 1470.828 | 1577.800 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.128 | 0.198 | 0.104 | 0.198 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.494 | 2.591 | 2.425 | 2.591 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.078 | 0.024 | 0.078 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.492 | 0.498 | 0.489 | 0.498 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.889 | 5.409 | 4.885 | 5.409 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 27.609 | 31.338 | 27.581 | 31.338 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.096 | 5.389 | 4.972 | 5.389 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 30.816 | 31.172 | 30.426 | 31.172 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.608 | 5.918 | 5.321 | 5.918 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 25.931 | 57.172 | 25.384 | 57.172 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.251 | 0.308 | 0.245 | 0.308 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.345 | 4.372 | 3.176 | 4.372 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.104 | 0.170 | 0.089 | 0.170 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.684 | 0.721 | 0.668 | 0.721 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 205.302 | 218.749 | 204.317 | 218.749 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1570.841 | 1640.199 | 1564.688 | 1640.199 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 28.761 | 29.554 | 28.032 | 29.554 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 130.199 | 136.388 | 119.505 | 136.388 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 28.252 | 28.382 | 27.954 | 28.382 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 121.481 | 137.440 | 118.984 | 137.440 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 28.516 | 30.063 | 28.108 | 30.063 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 104.987 | 123.329 | 104.802 | 123.329 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.636 | 0.676 | 0.612 | 0.676 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 16.789 | 16.965 | 16.561 | 16.965 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.105 | 0.116 | 0.097 | 0.116 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.661 | 0.802 | 0.623 | 0.802 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 174.063 | 196.475 | 172.487 | 196.475 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1437.120 | 1530.607 | 1427.854 | 1530.607 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 172.301 | 206.463 | 163.759 | 206.463 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1436.433 | 1447.225 | 1416.325 | 1447.225 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.132 | 0.275 | 0.112 | 0.275 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.659 | 2.793 | 2.631 | 2.793 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.028 | 0.048 | 0.016 | 0.048 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.605 | 0.679 | 0.571 | 0.679 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.630 | 2.868 | 2.514 | 2.868 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.405 | 16.794 | 16.168 | 16.794 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.665 | 3.243 | 2.639 | 3.243 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.886 | 16.183 | 15.507 | 16.183 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.787 | 2.867 | 2.701 | 2.867 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.143 | 15.995 | 11.636 | 15.995 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.404 | 0.453 | 0.388 | 0.453 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.797 | 3.931 | 3.759 | 3.931 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.034 | 0.016 | 0.034 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.446 | 0.463 | 0.443 | 0.463 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 182.232 | 191.012 | 177.881 | 191.012 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1449.285 | 1588.248 | 1438.049 | 1588.248 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 166.669 | 177.373 | 160.999 | 177.373 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1448.064 | 1483.427 | 1428.691 | 1483.427 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.176 | 0.236 | 0.155 | 0.236 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.242 | 3.511 | 3.211 | 3.511 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.022 | 0.029 | 0.015 | 0.029 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.579 | 0.636 | 0.564 | 0.636 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.603 | 6.899 | 6.418 | 6.899 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 37.328 | 44.330 | 36.456 | 44.330 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.717 | 7.440 | 6.512 | 7.440 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.730 | 38.505 | 33.273 | 38.505 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.169 | 7.604 | 6.896 | 7.604 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.404 | 31.346 | 29.080 | 31.346 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.249 | 0.341 | 0.220 | 0.341 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 5.438 | 11.457 | 4.749 | 11.457 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.007 | 0.004 | 0.007 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.427 | 0.451 | 0.420 | 0.451 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 183.149 | 196.565 | 172.944 | 196.565 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1431.299 | 1627.324 | 1423.826 | 1627.324 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 161.922 | 171.949 | 160.102 | 171.949 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1411.342 | 1588.504 | 1404.691 | 1588.504 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.102 | 0.123 | 0.070 | 0.123 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.038 | 2.209 | 1.927 | 2.209 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.022 | 0.032 | 0.014 | 0.032 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.405 | 0.444 | 0.339 | 0.444 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.803 | 3.283 | 1.764 | 3.283 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.171 | 18.767 | 13.750 | 18.767 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.887 | 1.997 | 1.823 | 1.997 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.346 | 54.271 | 12.972 | 54.271 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.828 | 2.256 | 1.735 | 2.256 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.995 | 13.312 | 10.590 | 13.312 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.213 | 0.324 | 0.190 | 0.324 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.650 | 10.037 | 2.580 | 10.037 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.196 | 0.203 | 0.193 | 0.203 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.096 | 1.121 | 1.095 | 1.121 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 197.204 | 201.123 | 196.018 | 201.123 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1465.386 | 1502.966 | 1448.565 | 1502.966 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 171.405 | 173.267 | 168.286 | 173.267 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1434.704 | 1524.802 | 1424.540 | 1524.802 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.311 | 0.355 | 0.309 | 0.355 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.583 | 6.310 | 5.511 | 6.310 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.036 | 0.054 | 0.028 | 0.054 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.694 | 1.784 | 1.667 | 1.784 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.109 | 11.401 | 11.027 | 11.401 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.153 | 46.428 | 43.933 | 46.428 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.287 | 11.801 | 11.168 | 11.801 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 42.763 | 43.134 | 42.497 | 43.134 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.956 | 12.205 | 11.326 | 12.205 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.093 | 37.709 | 36.390 | 37.709 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.801 | 0.923 | 0.798 | 0.923 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 5.975 | 6.139 | 5.959 | 6.139 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.032 | 0.012 | 0.032 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.496 | 0.556 | 0.487 | 0.556 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 173.072 | 175.783 | 170.104 | 175.783 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1415.564 | 1429.126 | 1414.618 | 1429.126 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 159.750 | 174.203 | 159.101 | 174.203 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1414.085 | 1472.212 | 1404.567 | 1472.212 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.129 | 0.176 | 0.118 | 0.176 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.518 | 3.599 | 3.474 | 3.599 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.027 | 0.033 | 0.017 | 0.033 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.558 | 0.615 | 0.553 | 0.615 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.436 | 1.797 | 1.396 | 1.797 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.349 | 16.666 | 16.237 | 16.666 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.720 | 1.860 | 1.706 | 1.860 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.722 | 16.458 | 15.660 | 16.458 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.906 | 2.437 | 1.845 | 2.437 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.146 | 11.489 | 10.795 | 11.489 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.157 | 0.164 | 0.152 | 0.164 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.761 | 4.898 | 4.732 | 4.898 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.129 | 0.175 | 0.111 | 0.175 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.674 | 0.789 | 0.660 | 0.789 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 188.686 | 202.217 | 183.301 | 202.217 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1444.540 | 1458.494 | 1421.624 | 1458.494 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 177.820 | 190.479 | 169.392 | 190.479 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1423.683 | 1510.704 | 1420.643 | 1510.704 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.133 | 0.288 | 0.098 | 0.288 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.086 | 3.110 | 3.004 | 3.110 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.024 | 0.029 | 0.016 | 0.029 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.736 | 0.763 | 0.699 | 0.763 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.764 | 3.962 | 2.687 | 3.962 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.549 | 15.874 | 14.406 | 15.874 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.752 | 3.919 | 2.671 | 3.919 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 14.383 | 15.286 | 13.704 | 15.286 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.906 | 6.451 | 2.509 | 6.451 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.617 | 11.980 | 10.217 | 11.980 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.545 | 0.987 | 0.459 | 0.987 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.645 | 5.449 | 3.544 | 5.449 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.051 | 0.024 | 0.051 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.519 | 0.553 | 0.500 | 0.553 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 161.793 | 167.440 | 159.752 | 167.440 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1412.186 | 1545.763 | 1401.026 | 1545.763 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.099 | 0.449 | 0.080 | 0.449 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.373 | 13.949 | 2.219 | 13.949 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.020 | 0.021 | 0.014 | 0.021 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.523 | 0.545 | 0.505 | 0.545 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.346 | 1.376 | 1.320 | 1.376 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.673 | 15.271 | 11.451 | 15.271 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.807 | 2.298 | 1.596 | 2.298 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 10.955 | 12.508 | 10.896 | 12.508 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.178 | 3.862 | 1.976 | 3.862 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 7.935 | 9.287 | 7.826 | 9.287 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.242 | 0.255 | 0.230 | 0.255 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.132 | 3.296 | 3.039 | 3.296 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 164.481 | 166.658 | 162.560 | 166.658 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1416.891 | 2049.357 | 1409.701 | 2049.357 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.210 | 0.270 | 0.202 | 0.270 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.460 | 2.670 | 2.439 | 2.670 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.017 | 0.023 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.443 | 0.469 | 0.443 | 0.469 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 33.128 | 33.330 | 32.960 | 33.330 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 111.475 | 111.976 | 111.292 | 111.976 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.245 | 0.292 | 0.234 | 0.292 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.467 | 3.506 | 3.467 | 3.506 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 161.958 | 164.964 | 161.370 | 164.964 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1442.051 | 1507.242 | 1425.067 | 1507.242 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.192 | 0.208 | 0.183 | 0.208 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.337 | 3.416 | 2.153 | 3.416 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.022 | 0.030 | 0.021 | 0.030 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.418 | 0.519 | 0.410 | 0.519 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.212 | 27.469 | 26.013 | 27.469 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 85.129 | 86.667 | 84.814 | 86.667 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.183 | 0.232 | 0.147 | 0.232 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.677 | 2.847 | 2.665 | 2.847 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 161.464 | 163.443 | 161.234 | 163.443 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1490.804 | 1544.443 | 1456.866 | 1544.443 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.172 | 0.204 | 0.164 | 0.204 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.062 | 2.146 | 2.052 | 2.146 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.033 | 0.019 | 0.033 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.410 | 1.021 | 0.398 | 1.021 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.974 | 4.496 | 3.790 | 4.496 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 22.147 | 22.739 | 22.085 | 22.739 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.173 | 0.329 | 0.162 | 0.329 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.731 | 2.802 | 2.676 | 2.802 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.385 | 178.614 | 158.405 | 178.614 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1449.668 | 1597.969 | 1432.226 | 1597.969 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.195 | 0.307 | 0.185 | 0.307 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.741 | 3.204 | 2.389 | 3.204 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.023 | 0.032 | 0.022 | 0.032 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.455 | 0.468 | 0.433 | 0.468 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.886 | 30.999 | 30.858 | 30.999 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 107.548 | 119.218 | 107.172 | 119.218 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.174 | 0.201 | 0.167 | 0.201 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.737 | 2.857 | 2.640 | 2.857 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 164.240 | 196.683 | 163.148 | 196.683 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1430.580 | 1465.679 | 1430.373 | 1465.679 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.187 | 0.194 | 0.178 | 0.194 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.135 | 2.172 | 2.093 | 2.172 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.021 | 0.034 | 0.020 | 0.034 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.417 | 0.442 | 0.395 | 0.442 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.126 | 4.337 | 3.966 | 4.337 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.917 | 22.881 | 20.891 | 22.881 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.166 | 0.193 | 0.163 | 0.193 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.746 | 2.796 | 2.719 | 2.796 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 168.728 | 177.308 | 161.585 | 177.308 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1512.927 | 1726.025 | 1449.817 | 1726.025 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.184 | 0.202 | 0.182 | 0.202 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.139 | 2.996 | 2.137 | 2.996 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.031 | 0.041 | 0.021 | 0.041 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.422 | 0.599 | 0.420 | 0.599 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 31.500 | 32.800 | 31.394 | 32.800 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 108.928 | 116.286 | 108.703 | 116.286 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.188 | 0.221 | 0.173 | 0.221 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.947 | 4.038 | 2.831 | 4.038 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 162.473 | 174.491 | 161.023 | 174.491 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1466.310 | 1536.944 | 1464.963 | 1536.944 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.170 | 0.179 | 0.160 | 0.179 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.154 | 2.271 | 2.113 | 2.271 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.022 | 0.034 | 0.020 | 0.034 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.409 | 0.447 | 0.380 | 0.447 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.953 | 4.671 | 3.907 | 4.671 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 21.120 | 22.772 | 20.742 | 22.772 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.167 | 0.320 | 0.147 | 0.320 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.720 | 2.871 | 2.662 | 2.871 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | effect-prophet | 6 | 194.229 | 256.107 | 189.592 | 256.107 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | python-prophet | 6 | 1642.554 | 1871.038 | 1618.473 | 1871.038 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | effect-prophet | 6 | 5.964 | 12.654 | 4.385 | 12.654 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | python-prophet | 6 | 16.820 | 17.843 | 16.353 | 17.843 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | effect-prophet | 6 | 1.513 | 4.103 | 0.922 | 4.103 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | python-prophet | 6 | 33.738 | 36.902 | 32.648 | 36.902 | n/a |
| mcmc-linear-default-changepoints | warm-fit | effect-prophet | 6 | 5060.423 | 5090.120 | 5055.547 | 5090.120 | n/a |
| mcmc-linear-default-changepoints | warm-fit | python-prophet | 6 | 4259.552 | 4416.589 | 4162.888 | 4416.589 | n/a |
| mcmc-linear-default-changepoints | warm-predict | effect-prophet | 6 | 0.566 | 1.052 | 0.408 | 1.052 | n/a |
| mcmc-linear-default-changepoints | warm-predict | python-prophet | 6 | 3.506 | 4.672 | 3.417 | 4.672 | n/a |
| mcmc-linear-default-changepoints | warm-uncertainty | effect-prophet | 6 | 7.942 | 11.439 | 7.220 | 11.439 | 196.8 |
| mcmc-linear-default-changepoints | warm-uncertainty | python-prophet | 6 | 163.932 | 180.195 | 150.576 | 180.195 | 137.4 |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 188.574 | 202.664 | 185.746 | 202.664 | n/a |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1609.032 | 1786.653 | 1596.697 | 1786.653 | n/a |
| mcmc-linear-mixed-components | model-json-decode | effect-prophet | 6 | 2.857 | 3.545 | 1.769 | 3.545 | n/a |
| mcmc-linear-mixed-components | model-json-decode | python-prophet | 6 | 9.597 | 10.491 | 9.138 | 10.491 | n/a |
| mcmc-linear-mixed-components | model-json-encode | effect-prophet | 6 | 0.363 | 0.467 | 0.310 | 0.467 | n/a |
| mcmc-linear-mixed-components | model-json-encode | python-prophet | 6 | 13.104 | 14.884 | 12.839 | 14.884 | n/a |
| mcmc-linear-mixed-components | warm-fit | effect-prophet | 6 | 143.529 | 144.128 | 140.700 | 144.128 | n/a |
| mcmc-linear-mixed-components | warm-fit | python-prophet | 6 | 190.205 | 195.977 | 184.905 | 195.977 | n/a |
| mcmc-linear-mixed-components | warm-predict | effect-prophet | 6 | 0.382 | 0.817 | 0.363 | 0.817 | n/a |
| mcmc-linear-mixed-components | warm-predict | python-prophet | 6 | 4.997 | 5.130 | 4.868 | 5.130 | n/a |
| mcmc-linear-mixed-components | warm-uncertainty | effect-prophet | 6 | 3.067 | 3.559 | 2.850 | 3.559 | 180.1 |
| mcmc-linear-mixed-components | warm-uncertainty | python-prophet | 6 | 164.134 | 178.829 | 160.227 | 178.829 | 129.8 |
| mcmc-linear-regressor-model | warm-fit | effect-prophet | 6 | 4704.674 | 4763.762 | 4657.165 | 4763.762 | n/a |
| mcmc-linear-regressor-model | warm-fit | python-prophet | 6 | 4180.211 | 4441.067 | 4018.969 | 4441.067 | n/a |
| mcmc-linear-regressor-model | warm-predict | effect-prophet | 6 | 1.341 | 2.402 | 0.939 | 2.402 | n/a |
| mcmc-linear-regressor-model | warm-predict | python-prophet | 6 | 18.404 | 21.213 | 17.571 | 21.213 | n/a |
| mcmc-linear-regressor-model | warm-uncertainty | effect-prophet | 6 | 14.675 | 17.306 | 13.013 | 17.306 | 217.3 |
| mcmc-linear-regressor-model | warm-uncertainty | python-prophet | 6 | 297.729 | 340.382 | 286.863 | 340.382 | 131.3 |
| mcmc-linear-sampled-regressor-model | warm-fit | effect-prophet | 6 | 5013.216 | 5098.154 | 5002.411 | 5098.154 | n/a |
| mcmc-linear-sampled-regressor-model | warm-fit | python-prophet | 6 | 4479.810 | 4669.625 | 4312.371 | 4669.625 | n/a |
| mcmc-linear-sampled-regressor-model | warm-predict | effect-prophet | 6 | 1.157 | 3.760 | 1.058 | 3.760 | n/a |
| mcmc-linear-sampled-regressor-model | warm-predict | python-prophet | 6 | 113.688 | 114.766 | 113.025 | 114.766 | n/a |
| mcmc-linear-sampled-regressor-model | warm-uncertainty | effect-prophet | 6 | 16.289 | 23.360 | 14.031 | 23.360 | 212.6 |
| mcmc-linear-sampled-regressor-model | warm-uncertainty | python-prophet | 6 | 495.465 | 540.068 | 474.219 | 540.068 | 138.7 |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 197.373 | 200.630 | 191.277 | 200.630 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1640.801 | 1731.692 | 1613.813 | 1731.692 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 177.567 | 181.416 | 174.973 | 181.416 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1626.497 | 1727.145 | 1601.801 | 1727.145 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.153 | 0.185 | 0.151 | 0.185 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.325 | 2.435 | 2.236 | 2.435 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.022 | 0.032 | 0.021 | 0.032 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.560 | 0.588 | 0.529 | 0.588 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.059 | 0.069 | 0.046 | 0.069 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.659 | 0.855 | 0.591 | 0.855 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.401 | 11.743 | 11.313 | 11.743 | 150.3 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 168.532 | 190.130 | 162.243 | 190.130 | 129.8 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 356.757 | 365.333 | 352.155 | 365.333 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2231.646 | 2336.820 | 2159.752 | 2336.820 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 257.274 | 265.876 | 246.971 | 265.876 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1935.647 | 2228.507 | 1890.628 | 2228.507 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.235 | 0.281 | 0.216 | 0.281 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.772 | 4.275 | 3.629 | 4.275 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.027 | 0.035 | 0.018 | 0.035 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.508 | 1.766 | 1.460 | 1.766 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.063 | 0.065 | 0.051 | 0.065 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.456 | 1.634 | 1.430 | 1.634 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 70.209 | 73.031 | 68.473 | 73.031 | 174.8 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 403.204 | 422.155 | 376.381 | 422.155 | 162.8 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 178.955 | 184.665 | 176.020 | 184.665 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1469.474 | 1615.457 | 1459.732 | 1615.457 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 165.865 | 169.145 | 163.483 | 169.145 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1446.931 | 1492.120 | 1438.053 | 1492.120 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.197 | 0.267 | 0.184 | 0.267 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.601 | 3.868 | 3.550 | 3.868 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.023 | 0.037 | 0.022 | 0.037 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.643 | 0.685 | 0.630 | 0.685 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.039 | 0.061 | 0.026 | 0.061 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.502 | 0.520 | 0.493 | 0.520 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.490 | 1.385 | 0.455 | 1.385 | 140.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 27.437 | 42.442 | 25.383 | 42.442 | 129.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 177.149 | 179.439 | 172.702 | 179.439 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1514.036 | 1556.839 | 1513.954 | 1556.839 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.888 | 172.485 | 160.481 | 172.485 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1501.082 | 1555.630 | 1490.215 | 1555.630 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.187 | 0.197 | 0.179 | 0.197 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.524 | 3.683 | 3.506 | 3.683 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.023 | 0.033 | 0.018 | 0.033 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.627 | 0.675 | 0.624 | 0.675 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.045 | 0.056 | 0.025 | 0.056 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.506 | 0.529 | 0.484 | 0.529 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.843 | 1.162 | 0.673 | 1.162 | 141.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.641 | 70.870 | 67.678 | 70.870 | 129.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 177.679 | 178.796 | 173.852 | 178.796 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1475.347 | 1516.826 | 1468.980 | 1516.826 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 165.059 | 168.875 | 160.723 | 168.875 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1455.305 | 1511.908 | 1447.384 | 1511.908 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.172 | 0.191 | 0.163 | 0.191 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.185 | 2.450 | 2.157 | 2.450 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.030 | 0.022 | 0.030 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.428 | 0.487 | 0.412 | 0.487 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.011 | 0.017 | 0.010 | 0.017 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.467 | 0.495 | 0.449 | 0.495 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.283 | 0.368 | 0.254 | 0.368 | 138.7 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.878 | 21.058 | 19.694 | 21.058 | 129.8 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 174.247 | 176.561 | 171.256 | 176.561 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1481.050 | 1570.720 | 1457.149 | 1570.720 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.310 | 163.526 | 159.526 | 163.526 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1458.967 | 1498.093 | 1441.443 | 1498.093 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.179 | 0.211 | 0.169 | 0.211 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.451 | 2.953 | 2.255 | 2.953 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.040 | 0.025 | 0.040 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.419 | 0.431 | 0.394 | 0.431 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.013 | 0.014 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.450 | 0.529 | 0.420 | 0.529 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.199 | 0.235 | 0.193 | 0.235 | 135.5 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.865 | 17.344 | 16.745 | 17.344 | 129.8 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 229.233 | 278.702 | 221.575 | 278.702 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1981.438 | 2448.900 | 1908.055 | 2448.900 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.102 | 0.145 | 0.055 | 0.145 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.691 | 0.737 | 0.671 | 0.737 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 8.982 | 12.867 | 8.733 | 12.867 | 166.5 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 259.986 | 299.915 | 249.684 | 299.915 | 129.8 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 163.995 | 167.264 | 163.744 | 167.264 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1446.284 | 1476.648 | 1427.466 | 1476.648 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.525 | 1.740 | 0.430 | 1.740 | 135.7 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 17.358 | 18.927 | 17.000 | 18.927 | 129.8 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 25.847 | 27.651 | 25.743 | 27.651 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 86.566 | 93.321 | 86.112 | 93.321 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 8.187 | 8.517 | 7.673 | 8.517 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.087 | 21.399 | 20.882 | 21.399 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 25.774 | 28.835 | 25.584 | 28.835 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 87.356 | 90.805 | 85.228 | 90.805 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 26.872 | 27.254 | 26.137 | 27.254 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.070 | 78.953 | 72.266 | 78.953 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>05:19:59 - cmdstanpy - INFO - Chain [1] start processing<br>05:19:59 - cmdstanpy - INFO - Chain [1] done processing<br>05:19:59 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=36705 data file=/tmp/tmpjl6_p96p/vto45efw.json init=/tmp/tmpjl6_p96p/tlzuwrhy.json output file=/tmp/tmpjl6_p96p/prophet_modelr0k1wldt/prophet_model-20261105051959.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpjl6_p96p/vto45efw.json<br>init = /tmp/tmpjl6_p96p/tlzuwrhy.json<br>random<br>  seed = 36705<br>output<br>  file = /tmp/tmpjl6_p96p/prophet_modelr0k1wldt/prophet_model-20261105051959.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 910, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 347, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 276, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=36705 data file=/tmp/tmpjl6_p96p/vto45efw.json init=/tmp/tmpjl6_p96p/tlzuwrhy.json output file=/tmp/tmpjl6_p96p/prophet_modelr0k1wldt/prophet_model-20261105051959.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>05:20:00 - cmdstanpy - INFO - Chain [1] start processing<br>05:20:00 - cmdstanpy - INFO - Chain [1] done processing<br>05:20:00 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=54469 data file=/tmp/tmpnftjh2vw/bk1fy56y.json init=/tmp/tmpnftjh2vw/xpgd4e1t.json output file=/tmp/tmpnftjh2vw/prophet_models4am5e86/prophet_model-20261105052000.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpnftjh2vw/bk1fy56y.json<br>init = /tmp/tmpnftjh2vw/xpgd4e1t.json<br>random<br>  seed = 54469<br>output<br>  file = /tmp/tmpnftjh2vw/prophet_models4am5e86/prophet_model-20261105052000.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 910, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 347, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 276, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=54469 data file=/tmp/tmpnftjh2vw/bk1fy56y.json init=/tmp/tmpnftjh2vw/xpgd4e1t.json output file=/tmp/tmpnftjh2vw/prophet_models4am5e86/prophet_model-20261105052000.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 913, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 454, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 913, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 454, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `b7a56669f96d6fd0b7aa03fb7b574f05954fc1e2`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:0e313d139af28eec792becb0667d6d641ac9cb7b774b85fd85208c8717f17259`
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

