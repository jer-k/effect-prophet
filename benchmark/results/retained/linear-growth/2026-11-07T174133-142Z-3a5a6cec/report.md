# Effect Prophet benchmark — 2026-11-07T174133-142Z-3a5a6cec

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
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2010 | 13 | 11765 | 23981 |
| country-global-priors-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12854 | 29669 |
| country-global-priors-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12854 | 29669 |
| country-global-priors-overrides-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12827 | 29665 |
| country-global-priors-overrides-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12827 | 29665 |

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
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 25.194 | 26.356 | 24.206 | 26.356 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 199.121 | 208.724 | 195.474 | 208.724 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 7.364 | 7.821 | 6.819 | 7.821 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 30.135 | 32.823 | 29.547 | 32.823 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 13.023 | 14.153 | 12.745 | 14.153 | 145.8 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 167.006 | 180.890 | 164.959 | 180.890 | 130.2 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.023 | 0.013 | 0.023 | 137.9 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.483 | 0.679 | 0.462 | 0.679 | 147.8 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 193.371 | 200.177 | 185.239 | 200.177 | 153.1 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1644.461 | 1745.083 | 1617.271 | 1745.083 | 147.8 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 180.174 | 188.087 | 169.598 | 188.087 | 167.0 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1629.974 | 1677.884 | 1622.512 | 1677.884 | 147.8 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 1.308 | 1.490 | 1.232 | 1.490 | 164.1 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.511 | 4.574 | 3.289 | 4.574 | 147.8 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.117 | 0.147 | 0.108 | 0.147 | 155.1 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.529 | 0.809 | 0.519 | 0.809 | 147.8 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.980 | 5.465 | 4.885 | 5.465 | 153.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 27.806 | 28.242 | 27.563 | 28.242 | 147.8 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.279 | 5.491 | 5.052 | 5.491 | 151.9 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 27.768 | 29.340 | 27.345 | 29.340 | 147.8 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 5.596 | 7.832 | 5.412 | 7.832 | 147.9 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 21.607 | 24.850 | 21.357 | 24.850 | 147.8 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.230 | 0.331 | 0.212 | 0.331 | 148.7 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.499 | 5.878 | 5.399 | 5.878 | 147.8 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.013 | 0.011 | 0.013 | 136.2 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.505 | 0.461 | 0.505 | 129.9 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 181.888 | 189.201 | 178.322 | 189.201 | 151.7 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1470.959 | 1506.349 | 1450.744 | 1506.349 | 129.9 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.327 | 171.988 | 162.825 | 171.988 | 151.8 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1441.810 | 1472.631 | 1427.179 | 1472.631 | 129.9 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.445 | 0.545 | 0.410 | 0.545 | 151.7 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.965 | 4.121 | 3.908 | 4.121 | 129.9 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.026 | 0.030 | 0.018 | 0.030 | 151.7 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.699 | 0.719 | 0.673 | 0.719 | 129.9 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.759 | 4.416 | 3.724 | 4.416 | 151.6 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 23.357 | 29.685 | 22.862 | 29.685 | 129.9 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.945 | 4.153 | 3.788 | 4.153 | 148.6 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 23.096 | 24.358 | 22.580 | 24.358 | 129.9 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.634 | 5.728 | 4.561 | 5.728 | 148.1 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 18.009 | 20.603 | 17.560 | 20.603 | 129.9 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.146 | 0.172 | 0.123 | 0.172 | 148.2 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.731 | 5.842 | 4.675 | 5.842 | 129.9 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.014 | 0.018 | 140.0 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.501 | 0.451 | 0.501 | 129.9 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 192.575 | 211.224 | 185.606 | 211.224 | 155.3 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1478.618 | 1590.333 | 1435.623 | 1590.333 | 129.9 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 173.370 | 188.502 | 171.019 | 188.502 | 155.8 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1459.678 | 1508.527 | 1441.085 | 1508.527 | 129.9 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.516 | 0.700 | 0.361 | 0.700 | 155.5 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 4.032 | 4.275 | 3.979 | 4.275 | 129.9 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.030 | 0.033 | 0.018 | 0.033 | 155.3 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.701 | 0.762 | 0.693 | 0.762 | 129.9 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.103 | 4.531 | 4.026 | 4.531 | 155.2 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 24.633 | 25.746 | 24.337 | 25.746 | 129.9 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.477 | 4.616 | 4.295 | 4.616 | 152.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 23.561 | 29.772 | 23.416 | 29.772 | 129.9 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 4.830 | 7.610 | 4.294 | 7.610 | 151.7 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.988 | 19.297 | 18.296 | 19.297 | 129.9 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.154 | 0.265 | 0.150 | 0.265 | 151.8 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.693 | 4.758 | 4.687 | 4.758 | 129.9 |
| country-global-priors-linear | adapter-input-conversion | effect-prophet | 6 | 0.051 | 0.059 | 0.046 | 0.059 | 138.4 |
| country-global-priors-linear | adapter-input-conversion | python-prophet | 6 | 0.545 | 0.560 | 0.500 | 0.560 | 147.6 |
| country-global-priors-linear | cold-first-forecast | effect-prophet | 6 | 188.097 | 194.303 | 181.653 | 194.303 | 168.5 |
| country-global-priors-linear | cold-first-forecast | python-prophet | 6 | 1633.084 | 1710.964 | 1626.055 | 1710.964 | 147.6 |
| country-global-priors-linear | fresh-process-restored-predict | effect-prophet | 6 | 169.268 | 172.588 | 167.834 | 172.588 | 172.6 |
| country-global-priors-linear | fresh-process-restored-predict | python-prophet | 6 | 1612.011 | 1639.288 | 1594.210 | 1639.288 | 147.6 |
| country-global-priors-linear | model-json-decode | effect-prophet | 6 | 1.093 | 1.309 | 0.861 | 1.309 | 169.3 |
| country-global-priors-linear | model-json-decode | python-prophet | 6 | 4.491 | 5.254 | 4.324 | 5.254 | 147.6 |
| country-global-priors-linear | model-json-encode | effect-prophet | 6 | 0.132 | 0.159 | 0.120 | 0.159 | 168.6 |
| country-global-priors-linear | model-json-encode | python-prophet | 6 | 0.745 | 0.793 | 0.726 | 0.793 | 147.6 |
| country-global-priors-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.753 | 5.793 | 4.661 | 5.793 | 165.1 |
| country-global-priors-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 33.851 | 34.229 | 33.684 | 34.229 | 147.6 |
| country-global-priors-linear | warm-fit-predict | effect-prophet | 6 | 5.085 | 5.724 | 4.864 | 5.724 | 151.4 |
| country-global-priors-linear | warm-fit-predict | python-prophet | 6 | 33.786 | 34.880 | 33.455 | 34.880 | 147.6 |
| country-global-priors-linear | warm-fit | effect-prophet | 6 | 5.637 | 7.563 | 5.348 | 7.563 | 150.1 |
| country-global-priors-linear | warm-fit | python-prophet | 6 | 27.655 | 29.448 | 27.225 | 29.448 | 147.6 |
| country-global-priors-linear | warm-predict | effect-prophet | 6 | 0.227 | 0.240 | 0.216 | 0.240 | 150.1 |
| country-global-priors-linear | warm-predict | python-prophet | 6 | 6.373 | 6.729 | 6.279 | 6.729 | 147.6 |
| country-global-priors-overrides-linear | adapter-input-conversion | effect-prophet | 6 | 0.052 | 0.066 | 0.039 | 0.066 | 145.8 |
| country-global-priors-overrides-linear | adapter-input-conversion | python-prophet | 6 | 0.534 | 0.795 | 0.503 | 0.795 | 147.7 |
| country-global-priors-overrides-linear | cold-first-forecast | effect-prophet | 6 | 181.791 | 184.706 | 180.523 | 184.706 | 178.4 |
| country-global-priors-overrides-linear | cold-first-forecast | python-prophet | 6 | 1655.931 | 1785.137 | 1628.744 | 1785.137 | 147.7 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | effect-prophet | 6 | 169.674 | 171.008 | 167.608 | 171.008 | 182.4 |
| country-global-priors-overrides-linear | fresh-process-restored-predict | python-prophet | 6 | 1622.434 | 1668.016 | 1602.998 | 1668.016 | 147.7 |
| country-global-priors-overrides-linear | model-json-decode | effect-prophet | 6 | 1.081 | 1.296 | 0.886 | 1.296 | 179.0 |
| country-global-priors-overrides-linear | model-json-decode | python-prophet | 6 | 4.401 | 4.791 | 4.258 | 4.791 | 147.7 |
| country-global-priors-overrides-linear | model-json-encode | effect-prophet | 6 | 0.138 | 0.145 | 0.115 | 0.145 | 178.4 |
| country-global-priors-overrides-linear | model-json-encode | python-prophet | 6 | 0.756 | 0.804 | 0.724 | 0.804 | 147.7 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.023 | 5.976 | 4.895 | 5.976 | 174.9 |
| country-global-priors-overrides-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 35.150 | 40.166 | 34.716 | 40.166 | 147.7 |
| country-global-priors-overrides-linear | warm-fit-predict | effect-prophet | 6 | 5.109 | 5.827 | 5.048 | 5.827 | 159.0 |
| country-global-priors-overrides-linear | warm-fit-predict | python-prophet | 6 | 33.917 | 38.664 | 33.491 | 38.664 | 147.7 |
| country-global-priors-overrides-linear | warm-fit | effect-prophet | 6 | 5.794 | 7.516 | 5.663 | 7.516 | 158.0 |
| country-global-priors-overrides-linear | warm-fit | python-prophet | 6 | 27.064 | 33.974 | 26.919 | 33.974 | 147.7 |
| country-global-priors-overrides-linear | warm-predict | effect-prophet | 6 | 0.233 | 0.284 | 0.220 | 0.284 | 158.1 |
| country-global-priors-overrides-linear | warm-predict | python-prophet | 6 | 6.341 | 16.145 | 6.259 | 16.145 | 147.7 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.013 | 0.016 | 144.5 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.469 | 0.484 | 0.448 | 0.484 | 147.6 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 179.880 | 184.230 | 177.585 | 184.230 | 158.9 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1617.391 | 1782.746 | 1606.930 | 1782.746 | 147.6 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 167.550 | 187.144 | 164.417 | 187.144 | 172.7 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1610.674 | 1662.041 | 1592.055 | 1662.041 | 147.6 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 1.229 | 1.305 | 1.209 | 1.305 | 170.0 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 4.085 | 4.451 | 3.987 | 4.451 | 147.6 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.140 | 0.154 | 0.116 | 0.154 | 160.9 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.707 | 0.788 | 0.683 | 0.788 | 147.6 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.223 | 4.284 | 4.176 | 4.284 | 158.7 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 27.056 | 27.315 | 26.806 | 27.315 | 147.6 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.491 | 4.623 | 4.418 | 4.623 | 157.7 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 26.596 | 28.834 | 26.455 | 28.834 | 147.6 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 4.714 | 4.917 | 4.636 | 4.917 | 153.7 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.744 | 20.895 | 20.464 | 20.895 | 147.6 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.263 | 0.275 | 0.248 | 0.275 | 154.6 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.529 | 5.968 | 5.496 | 5.968 | 147.6 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.024 | 0.013 | 0.024 | 142.3 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.508 | 0.457 | 0.508 | 147.6 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 183.199 | 206.705 | 179.122 | 206.705 | 156.4 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1627.923 | 1727.844 | 1612.050 | 1727.844 | 147.6 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 178.605 | 194.204 | 171.560 | 194.204 | 170.9 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1593.546 | 1612.075 | 1585.987 | 1612.075 | 147.6 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 1.509 | 1.668 | 1.272 | 1.668 | 168.0 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.899 | 4.000 | 3.839 | 4.000 | 147.6 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.162 | 0.230 | 0.134 | 0.230 | 158.9 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.684 | 0.692 | 0.678 | 0.692 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.556 | 4.639 | 4.542 | 4.639 | 156.1 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 28.004 | 28.777 | 27.820 | 28.777 | 147.6 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.756 | 4.932 | 4.716 | 4.932 | 155.3 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 27.354 | 27.888 | 27.154 | 27.888 | 147.6 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.125 | 5.321 | 4.961 | 5.321 | 151.6 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.825 | 22.160 | 21.665 | 22.160 | 147.6 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.276 | 0.320 | 0.268 | 0.320 | 153.0 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.604 | 5.670 | 5.494 | 5.670 | 147.6 |
| evaluation-linear-custom-search | evaluation-search-custom | effect-prophet | 4 | 17.693 | 18.868 | 17.638 | 18.868 | 147.9 |
| evaluation-linear-custom-search | evaluation-search-custom | python-prophet | 4 | 150.549 | 166.429 | 148.118 | 166.429 | 129.9 |
| evaluation-linear-custom-search | evaluation-search | effect-prophet | 4 | 20.392 | 22.338 | 20.327 | 22.338 | 147.2 |
| evaluation-linear-custom-search | evaluation-search | python-prophet | 4 | 143.271 | 145.532 | 143.044 | 145.532 | 129.9 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.013 | 6.326 | 5.919 | 6.326 | 151.5 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.143 | 30.605 | 29.998 | 30.605 | 129.9 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.209 | 0.262 | 0.191 | 0.262 | 152.7 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 129.9 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.286 | 0.461 | 0.257 | 0.461 | 152.2 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.008 | 0.011 | 129.9 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 21.423 | 21.882 | 21.188 | 21.882 | 151.0 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 152.583 | 157.536 | 152.524 | 157.536 | 129.9 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 10.519 | 11.211 | 10.484 | 11.211 | 149.9 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 78.170 | 78.782 | 78.114 | 78.782 | 129.9 |
| evaluation-linear-long-history-parallel | evaluation-intervals-processes | python-prophet | 4 | 2487.573 | 2632.744 | 2460.220 | 2632.744 | 140.4 |
| evaluation-linear-long-history-parallel | evaluation-intervals-threads | python-prophet | 4 | 1150.086 | 1203.110 | 1137.595 | 1203.110 | 140.4 |
| evaluation-linear-long-history-parallel | evaluation-intervals | effect-prophet | 4 | 964.487 | 996.748 | 951.316 | 996.748 | 200.6 |
| evaluation-linear-long-history-parallel | evaluation-intervals | python-prophet | 4 | 2711.732 | 2765.987 | 2668.256 | 2765.987 | 139.1 |
| evaluation-linear-long-history-parallel | evaluation-point-processes | python-prophet | 4 | 2494.065 | 2579.351 | 2441.357 | 2579.351 | 138.8 |
| evaluation-linear-long-history-parallel | evaluation-point-threads | python-prophet | 4 | 1103.600 | 1165.750 | 1039.871 | 1165.750 | 138.8 |
| evaluation-linear-long-history-parallel | evaluation-point | effect-prophet | 4 | 953.106 | 975.814 | 944.949 | 975.814 | 190.3 |
| evaluation-linear-long-history-parallel | evaluation-point | python-prophet | 4 | 2607.609 | 2621.855 | 2602.469 | 2621.855 | 129.9 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 190.700 | 208.889 | 189.020 | 208.889 | 149.9 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1499.878 | 1510.499 | 1499.346 | 1510.499 | 129.9 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.078 | 1.173 | 1.058 | 1.173 | 149.7 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.128 | 1.353 | 1.099 | 1.353 | 129.9 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.009 | 0.018 | 0.008 | 0.018 | 128.8 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.473 | 0.542 | 0.400 | 0.542 | 129.9 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.056 | 0.083 | 0.052 | 0.083 | 149.4 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.360 | 5.449 | 5.355 | 5.449 | 129.9 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 0.917 | 1.130 | 0.842 | 1.130 | 129.2 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.721 | 0.987 | 0.680 | 0.987 | 129.9 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 10.104 | 10.740 | 9.685 | 10.740 | 148.8 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 72.036 | 88.377 | 71.826 | 88.377 | 129.9 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 51.895 | 53.789 | 51.545 | 53.789 | 149.6 |
| evaluation-linear-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 254.944 | 277.340 | 251.118 | 277.340 | 129.9 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 244.572 | 253.298 | 241.894 | 253.298 | 150.2 |
| evaluation-linear-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1623.656 | 1721.194 | 1615.414 | 1721.194 | 129.9 |
| evaluation-linear-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 2.901 | 3.456 | 2.541 | 3.456 | 150.1 |
| evaluation-linear-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.415 | 1.545 | 1.397 | 1.545 | 129.9 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.108 | 0.171 | 0.102 | 0.171 | 129.7 |
| evaluation-linear-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.544 | 0.622 | 0.514 | 0.622 | 129.9 |
| evaluation-linear-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.058 | 0.087 | 0.052 | 0.087 | 149.5 |
| evaluation-linear-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.502 | 6.301 | 5.434 | 6.301 | 129.9 |
| evaluation-linear-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.247 | 2.391 | 2.148 | 2.391 | 139.2 |
| evaluation-linear-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.796 | 0.847 | 0.778 | 0.847 | 129.9 |
| evaluation-linear-regressor-model-point | evaluation-point | effect-prophet | 4 | 51.603 | 52.848 | 50.341 | 52.848 | 149.0 |
| evaluation-linear-regressor-model-point | evaluation-point | python-prophet | 4 | 184.884 | 197.968 | 181.827 | 197.968 | 129.9 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.215 | 6.566 | 6.071 | 6.566 | 152.8 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 30.330 | 31.143 | 30.130 | 31.143 | 129.9 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.207 | 0.231 | 0.193 | 0.231 | 153.6 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 129.9 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.221 | 0.273 | 0.211 | 0.273 | 153.2 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 129.9 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.193 | 22.651 | 19.592 | 22.651 | 152.2 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 151.129 | 153.772 | 149.916 | 153.772 | 129.9 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 0.968 | 1.099 | 0.965 | 1.099 | 148.5 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.395 | 1.421 | 1.389 | 1.421 | 129.9 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.848 | 4.110 | 3.658 | 4.110 | 151.9 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.210 | 26.498 | 22.157 | 26.498 | 129.9 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 1.111 | 1.176 | 0.986 | 1.176 | 133.9 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.945 | 1.046 | 0.916 | 1.046 | 129.9 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 6.848 | 7.492 | 6.389 | 7.492 | 148.5 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 53.442 | 55.350 | 52.692 | 55.350 | 129.9 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.219 | 0.440 | 0.201 | 0.440 | 152.6 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 129.9 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.236 | 0.314 | 0.234 | 0.314 | 152.5 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 129.9 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.791 | 7.622 | 5.638 | 7.622 | 151.7 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 56.646 | 74.532 | 54.417 | 74.532 | 129.9 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.019 | 0.065 | 0.013 | 0.196 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.551 | 0.566 | 0.538 | 0.574 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.532 | 0.724 | 0.349 | 0.820 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.635 | 2.690 | 2.560 | 2.761 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.031 | 0.046 | 0.030 | 0.046 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.556 | 1.129 | 0.522 | 1.129 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 177.181 | 178.942 | 176.726 | 178.942 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1447.483 | 1531.310 | 1439.857 | 1531.310 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 163.168 | 165.455 | 161.087 | 165.455 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1443.482 | 1492.967 | 1421.442 | 1492.967 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.135 | 0.147 | 0.130 | 0.147 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.278 | 2.448 | 2.227 | 2.448 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.026 | 0.031 | 0.023 | 0.031 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.540 | 0.579 | 0.524 | 0.579 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.152 | 6.383 | 6.050 | 6.383 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.727 | 18.592 | 17.288 | 18.592 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.803 | 7.087 | 6.530 | 7.087 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 17.129 | 18.161 | 16.817 | 18.161 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.904 | 8.346 | 6.345 | 8.346 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 14.364 | 15.806 | 14.095 | 15.806 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.247 | 0.265 | 0.239 | 0.265 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.266 | 4.184 | 3.127 | 4.184 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.053 | 0.056 | 0.044 | 0.056 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.550 | 0.679 | 0.540 | 0.679 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 203.674 | 214.084 | 199.035 | 214.084 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1530.602 | 1665.103 | 1520.975 | 1665.103 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 165.773 | 170.431 | 163.459 | 170.431 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1439.174 | 1473.135 | 1431.142 | 1473.135 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.142 | 0.220 | 0.128 | 0.220 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.463 | 3.299 | 2.306 | 3.299 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.026 | 0.059 | 0.025 | 0.059 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.618 | 0.669 | 0.578 | 0.669 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 26.230 | 26.994 | 25.996 | 26.994 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 91.461 | 91.843 | 91.200 | 91.843 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 26.458 | 27.744 | 26.163 | 27.744 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 89.898 | 99.351 | 89.730 | 99.351 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.541 | 36.822 | 25.906 | 36.822 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 87.440 | 95.565 | 87.052 | 95.565 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.331 | 0.425 | 0.306 | 0.425 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.128 | 3.174 | 3.111 | 3.174 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.006 | 0.004 | 0.006 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.437 | 0.474 | 0.429 | 0.474 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 191.168 | 201.936 | 188.938 | 201.936 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1498.909 | 1523.950 | 1488.916 | 1523.950 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 163.728 | 189.200 | 158.848 | 189.200 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1440.172 | 1505.408 | 1419.147 | 1505.408 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.140 | 0.160 | 0.132 | 0.160 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.063 | 2.240 | 2.042 | 2.240 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.028 | 0.034 | 0.026 | 0.034 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.390 | 0.433 | 0.375 | 0.433 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.134 | 19.726 | 17.944 | 19.726 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 64.869 | 73.314 | 64.449 | 73.314 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 18.391 | 18.655 | 18.203 | 18.655 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 64.140 | 64.483 | 63.443 | 64.483 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.181 | 18.488 | 18.125 | 18.488 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 61.235 | 61.907 | 59.992 | 61.907 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.204 | 0.235 | 0.202 | 0.235 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.150 | 3.250 | 3.093 | 3.250 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.046 | 0.068 | 0.038 | 0.068 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.540 | 0.593 | 0.511 | 0.593 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 177.290 | 182.349 | 177.032 | 182.349 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1470.364 | 1495.821 | 1468.241 | 1495.821 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 164.465 | 176.371 | 163.313 | 176.371 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1440.177 | 1446.281 | 1437.903 | 1446.281 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.129 | 0.161 | 0.113 | 0.161 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.668 | 3.852 | 3.602 | 3.852 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.034 | 0.044 | 0.028 | 0.044 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.685 | 0.704 | 0.677 | 0.704 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.732 | 6.004 | 4.718 | 6.004 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.762 | 29.368 | 28.746 | 29.368 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.917 | 5.542 | 4.751 | 5.542 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 29.470 | 37.271 | 29.380 | 37.271 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 6.072 | 6.815 | 5.309 | 6.815 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 23.044 | 32.959 | 22.952 | 32.959 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.268 | 0.303 | 0.267 | 0.303 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.735 | 9.696 | 4.721 | 9.696 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.024 | 0.016 | 0.024 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.474 | 0.491 | 0.456 | 0.491 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 176.198 | 181.843 | 173.144 | 181.843 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1454.807 | 1474.382 | 1450.492 | 1474.382 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.213 | 161.739 | 160.039 | 161.739 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1429.564 | 1483.971 | 1426.829 | 1483.971 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.115 | 0.138 | 0.107 | 0.138 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.230 | 2.246 | 2.138 | 2.246 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.027 | 0.023 | 0.027 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.451 | 0.459 | 0.423 | 0.459 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.678 | 4.710 | 4.653 | 4.710 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 27.210 | 27.379 | 26.955 | 27.379 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 4.908 | 5.031 | 4.834 | 5.031 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.716 | 26.982 | 26.695 | 26.982 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.131 | 5.414 | 5.076 | 5.414 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.762 | 24.482 | 23.759 | 24.482 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.252 | 0.276 | 0.250 | 0.276 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.109 | 3.165 | 3.056 | 3.165 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.013 | 0.023 | 0.012 | 0.023 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.475 | 0.480 | 0.472 | 0.480 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 174.204 | 190.650 | 172.105 | 190.650 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1479.940 | 1492.227 | 1463.511 | 1492.227 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.295 | 174.195 | 159.010 | 174.195 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1482.583 | 1537.129 | 1460.569 | 1537.129 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.152 | 0.116 | 0.152 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.155 | 2.242 | 2.155 | 2.242 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.031 | 0.024 | 0.031 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.462 | 0.465 | 0.442 | 0.465 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.674 | 4.754 | 4.673 | 4.754 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 27.442 | 28.166 | 27.424 | 28.166 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.028 | 6.655 | 4.911 | 6.655 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.950 | 28.257 | 26.808 | 28.257 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.242 | 5.431 | 5.080 | 5.431 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.611 | 24.429 | 23.476 | 24.429 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.240 | 0.257 | 0.227 | 0.257 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.102 | 3.189 | 3.096 | 3.189 | n/a |
| linear-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.104 | 0.223 | 0.091 | 0.223 | n/a |
| linear-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.683 | 0.721 | 0.682 | 0.721 | n/a |
| linear-regressor-model | cold-first-forecast | effect-prophet | 4 | 212.291 | 244.167 | 211.256 | 244.167 | n/a |
| linear-regressor-model | cold-first-forecast | python-prophet | 4 | 1622.491 | 1654.923 | 1561.761 | 1654.923 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 27.999 | 30.523 | 27.446 | 30.523 | n/a |
| linear-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 118.817 | 120.505 | 118.680 | 120.505 | n/a |
| linear-regressor-model | warm-fit-predict | effect-prophet | 4 | 28.647 | 29.213 | 28.596 | 29.213 | n/a |
| linear-regressor-model | warm-fit-predict | python-prophet | 4 | 119.284 | 141.222 | 118.853 | 141.222 | n/a |
| linear-regressor-model | warm-fit | effect-prophet | 4 | 29.836 | 36.129 | 29.061 | 36.129 | n/a |
| linear-regressor-model | warm-fit | python-prophet | 4 | 101.480 | 107.977 | 101.099 | 107.977 | n/a |
| linear-regressor-model | warm-predict | effect-prophet | 4 | 0.658 | 0.736 | 0.648 | 0.736 | n/a |
| linear-regressor-model | warm-predict | python-prophet | 4 | 16.754 | 17.161 | 16.730 | 17.161 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.095 | 0.135 | 0.085 | 0.135 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.704 | 0.941 | 0.681 | 0.941 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 175.463 | 178.673 | 172.732 | 178.673 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1483.097 | 1600.935 | 1438.083 | 1600.935 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 167.670 | 172.080 | 165.191 | 172.080 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1465.837 | 1505.221 | 1447.606 | 1505.221 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.108 | 0.159 | 0.094 | 0.159 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.843 | 3.812 | 2.670 | 3.812 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.037 | 0.020 | 0.037 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.671 | 0.792 | 0.667 | 0.792 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.559 | 3.013 | 2.538 | 3.013 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 17.151 | 23.261 | 16.476 | 23.261 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.775 | 3.310 | 2.590 | 3.310 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 16.820 | 18.995 | 16.238 | 18.995 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.680 | 2.835 | 2.524 | 2.835 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 14.031 | 15.422 | 13.532 | 15.422 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.395 | 0.449 | 0.387 | 0.449 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 4.030 | 4.278 | 3.853 | 4.278 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.029 | 0.016 | 0.029 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.481 | 0.506 | 0.472 | 0.506 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 183.457 | 195.747 | 180.619 | 195.747 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1471.167 | 1506.016 | 1456.999 | 1506.016 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 165.289 | 180.806 | 162.529 | 180.806 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1449.015 | 1511.649 | 1427.093 | 1511.649 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.193 | 0.267 | 0.163 | 0.267 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.301 | 3.433 | 3.250 | 3.433 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.022 | 0.037 | 0.018 | 0.037 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.617 | 0.631 | 0.612 | 0.631 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.630 | 7.023 | 6.440 | 7.023 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.782 | 40.540 | 34.504 | 40.540 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.746 | 7.513 | 6.658 | 7.513 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.960 | 34.644 | 33.701 | 34.644 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.307 | 8.890 | 7.201 | 8.890 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.748 | 30.255 | 29.544 | 30.255 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.281 | 0.715 | 0.237 | 0.715 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.336 | 4.384 | 4.284 | 4.384 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.016 | 0.004 | 0.016 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.451 | 0.459 | 0.436 | 0.459 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 184.171 | 205.864 | 175.360 | 205.864 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1454.777 | 1575.664 | 1439.427 | 1575.664 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 163.147 | 169.939 | 161.956 | 169.939 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1424.388 | 1454.610 | 1416.286 | 1454.610 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.106 | 0.181 | 0.077 | 0.181 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 1.966 | 2.097 | 1.933 | 2.097 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.023 | 0.025 | 0.013 | 0.025 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.359 | 0.387 | 0.342 | 0.387 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.779 | 3.821 | 1.735 | 3.821 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.087 | 14.491 | 14.050 | 14.491 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 2.109 | 2.239 | 1.959 | 2.239 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.758 | 14.123 | 13.578 | 14.123 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.886 | 2.236 | 1.771 | 2.236 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 11.003 | 11.924 | 10.820 | 11.924 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.229 | 0.809 | 0.197 | 0.809 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.750 | 2.848 | 2.638 | 2.848 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.195 | 0.260 | 0.194 | 0.260 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.146 | 1.154 | 1.110 | 1.154 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 217.319 | 417.434 | 215.965 | 417.434 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1477.152 | 1487.553 | 1475.915 | 1487.553 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 188.208 | 201.000 | 182.927 | 201.000 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1436.237 | 1552.549 | 1435.116 | 1552.549 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.347 | 0.592 | 0.333 | 0.592 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.764 | 6.663 | 5.596 | 6.663 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.037 | 0.084 | 0.028 | 0.084 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.751 | 1.783 | 1.693 | 1.783 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 12.097 | 14.568 | 11.240 | 14.568 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 45.475 | 46.535 | 45.281 | 46.535 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.774 | 13.055 | 11.318 | 13.055 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 44.254 | 44.636 | 43.638 | 44.636 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 14.553 | 19.210 | 13.745 | 19.210 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.988 | 45.810 | 37.441 | 45.810 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.965 | 1.828 | 0.905 | 1.828 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.542 | 7.478 | 6.356 | 7.478 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.021 | 0.009 | 0.021 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.486 | 0.511 | 0.461 | 0.511 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 181.629 | 189.358 | 178.995 | 189.358 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1464.067 | 1580.126 | 1442.584 | 1580.126 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 173.744 | 182.789 | 165.928 | 182.789 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1472.627 | 1565.930 | 1437.975 | 1565.930 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.141 | 0.225 | 0.122 | 0.225 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.742 | 4.353 | 3.666 | 4.353 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.027 | 0.050 | 0.026 | 0.050 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.585 | 0.597 | 0.573 | 0.597 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.589 | 3.717 | 1.407 | 3.717 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 19.731 | 20.878 | 17.546 | 20.878 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.787 | 1.953 | 1.702 | 1.953 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.983 | 19.951 | 15.880 | 19.951 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 2.039 | 2.274 | 1.886 | 2.274 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 12.281 | 13.233 | 11.362 | 13.233 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.170 | 0.183 | 0.149 | 0.183 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.995 | 5.221 | 4.824 | 5.221 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.118 | 0.153 | 0.107 | 0.153 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.689 | 0.711 | 0.663 | 0.711 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 178.575 | 182.377 | 176.232 | 182.377 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1464.501 | 1665.891 | 1435.737 | 1665.891 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 168.873 | 172.805 | 163.714 | 172.805 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1459.268 | 1467.531 | 1454.457 | 1467.531 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.111 | 0.144 | 0.088 | 0.144 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.081 | 3.154 | 2.950 | 3.154 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.023 | 0.026 | 0.015 | 0.026 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.737 | 0.813 | 0.731 | 0.813 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.640 | 3.994 | 2.662 | 3.994 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.843 | 15.377 | 14.792 | 15.377 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.649 | 3.379 | 2.622 | 3.379 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 14.111 | 14.618 | 13.926 | 14.618 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 3.116 | 3.441 | 2.427 | 3.441 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.502 | 11.228 | 10.437 | 11.228 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.506 | 1.013 | 0.444 | 1.013 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.600 | 3.726 | 3.577 | 3.726 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.037 | 0.058 | 0.025 | 0.058 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.528 | 0.552 | 0.515 | 0.552 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 165.155 | 169.997 | 161.288 | 169.997 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1439.957 | 1458.442 | 1427.971 | 1458.442 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.092 | 0.121 | 0.082 | 0.121 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.238 | 2.326 | 2.217 | 2.326 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.020 | 0.028 | 0.014 | 0.028 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.519 | 0.542 | 0.497 | 0.542 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.355 | 1.778 | 1.329 | 1.778 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.590 | 11.788 | 11.516 | 11.788 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.986 | 2.691 | 1.712 | 2.691 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.116 | 11.309 | 11.027 | 11.309 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.398 | 3.310 | 1.504 | 3.310 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.163 | 8.527 | 7.885 | 8.527 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.265 | 0.353 | 0.231 | 0.353 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.088 | 3.200 | 3.046 | 3.200 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 162.534 | 184.657 | 161.509 | 184.657 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1442.776 | 1503.697 | 1427.550 | 1503.697 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.260 | 0.318 | 0.230 | 0.318 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.595 | 4.052 | 2.552 | 4.052 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.469 | 0.493 | 0.449 | 0.493 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 31.929 | 33.830 | 31.523 | 33.830 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 113.428 | 118.368 | 111.041 | 118.368 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.241 | 0.356 | 0.233 | 0.356 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.424 | 3.501 | 3.417 | 3.501 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 165.218 | 179.958 | 164.142 | 179.958 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1422.845 | 1483.973 | 1421.751 | 1483.973 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.188 | 0.232 | 0.177 | 0.232 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.044 | 2.134 | 2.014 | 2.134 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.022 | 0.061 | 0.021 | 0.061 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.403 | 0.421 | 0.394 | 0.421 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.368 | 29.386 | 26.121 | 29.386 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 84.894 | 85.435 | 84.482 | 85.435 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.185 | 0.202 | 0.182 | 0.202 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.772 | 2.862 | 2.764 | 2.862 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 165.773 | 182.798 | 161.574 | 182.798 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1447.031 | 1452.133 | 1429.160 | 1452.133 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.176 | 0.252 | 0.156 | 0.252 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.059 | 2.112 | 2.043 | 2.112 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.032 | 0.019 | 0.032 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.391 | 0.434 | 0.389 | 0.434 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 4.054 | 4.308 | 3.930 | 4.308 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.801 | 20.618 | 19.728 | 20.618 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.158 | 0.298 | 0.155 | 0.298 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.694 | 2.769 | 2.676 | 2.769 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 168.746 | 196.883 | 167.581 | 196.883 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1446.875 | 1547.742 | 1430.337 | 1547.742 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.256 | 0.361 | 0.203 | 0.361 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.161 | 2.517 | 2.117 | 2.517 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.031 | 0.059 | 0.021 | 0.059 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.435 | 0.535 | 0.400 | 0.535 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.934 | 32.300 | 30.906 | 32.300 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 108.329 | 108.483 | 107.577 | 108.483 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.251 | 0.384 | 0.205 | 0.384 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.813 | 2.889 | 2.767 | 2.889 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 168.214 | 170.899 | 162.313 | 170.899 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1460.036 | 1470.836 | 1427.979 | 1470.836 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.172 | 0.218 | 0.166 | 0.218 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.092 | 2.129 | 2.023 | 2.129 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.029 | 0.020 | 0.029 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.412 | 0.428 | 0.400 | 0.428 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.339 | 4.692 | 4.072 | 4.692 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.806 | 21.508 | 20.469 | 21.508 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.161 | 0.172 | 0.149 | 0.172 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.725 | 2.802 | 2.697 | 2.802 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 181.313 | 206.358 | 177.759 | 206.358 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1435.303 | 1490.325 | 1435.275 | 1490.325 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.222 | 0.292 | 0.191 | 0.292 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.069 | 2.175 | 2.027 | 2.175 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.046 | 0.062 | 0.036 | 0.062 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.414 | 0.445 | 0.413 | 0.445 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 32.026 | 33.930 | 31.578 | 33.930 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 108.554 | 109.534 | 107.444 | 109.534 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.191 | 0.302 | 0.166 | 0.302 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.792 | 2.809 | 2.752 | 2.809 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 172.337 | 187.210 | 163.139 | 187.210 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1435.455 | 1443.735 | 1433.070 | 1443.735 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.190 | 0.227 | 0.175 | 0.227 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.122 | 2.301 | 2.062 | 2.301 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.022 | 0.030 | 0.019 | 0.030 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.420 | 0.516 | 0.417 | 0.516 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.306 | 5.155 | 3.959 | 5.155 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 20.832 | 21.249 | 20.718 | 21.249 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.164 | 0.259 | 0.164 | 0.259 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.682 | 2.767 | 2.669 | 2.767 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | effect-prophet | 6 | 198.134 | 239.642 | 192.943 | 239.642 | n/a |
| mcmc-linear-default-changepoints | fresh-process-restored-uncertainty | python-prophet | 6 | 1646.998 | 1734.978 | 1630.058 | 1734.978 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | effect-prophet | 6 | 4.421 | 5.163 | 4.166 | 5.163 | n/a |
| mcmc-linear-default-changepoints | model-json-decode | python-prophet | 6 | 16.546 | 17.475 | 16.200 | 17.475 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | effect-prophet | 6 | 1.080 | 1.495 | 0.943 | 1.495 | n/a |
| mcmc-linear-default-changepoints | model-json-encode | python-prophet | 6 | 33.783 | 35.332 | 32.581 | 35.332 | n/a |
| mcmc-linear-default-changepoints | warm-fit | effect-prophet | 6 | 5085.311 | 5402.481 | 5033.217 | 5402.481 | n/a |
| mcmc-linear-default-changepoints | warm-fit | python-prophet | 6 | 4300.910 | 4461.298 | 4109.428 | 4461.298 | n/a |
| mcmc-linear-default-changepoints | warm-predict | effect-prophet | 6 | 0.692 | 1.190 | 0.408 | 1.190 | n/a |
| mcmc-linear-default-changepoints | warm-predict | python-prophet | 6 | 3.500 | 3.618 | 3.381 | 3.618 | n/a |
| mcmc-linear-default-changepoints | warm-uncertainty | effect-prophet | 6 | 7.580 | 10.845 | 7.071 | 10.845 | 189.8 |
| mcmc-linear-default-changepoints | warm-uncertainty | python-prophet | 6 | 153.343 | 191.153 | 150.519 | 191.153 | 137.6 |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 187.168 | 193.476 | 186.692 | 193.476 | n/a |
| mcmc-linear-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1635.579 | 1707.185 | 1627.180 | 1707.185 | n/a |
| mcmc-linear-mixed-components | model-json-decode | effect-prophet | 6 | 2.619 | 2.676 | 1.931 | 2.676 | n/a |
| mcmc-linear-mixed-components | model-json-decode | python-prophet | 6 | 9.234 | 9.847 | 9.103 | 9.847 | n/a |
| mcmc-linear-mixed-components | model-json-encode | effect-prophet | 6 | 0.273 | 0.302 | 0.269 | 0.302 | n/a |
| mcmc-linear-mixed-components | model-json-encode | python-prophet | 6 | 13.044 | 13.584 | 13.014 | 13.584 | n/a |
| mcmc-linear-mixed-components | warm-fit | effect-prophet | 6 | 138.770 | 139.964 | 137.837 | 139.964 | n/a |
| mcmc-linear-mixed-components | warm-fit | python-prophet | 6 | 186.172 | 190.973 | 184.217 | 190.973 | n/a |
| mcmc-linear-mixed-components | warm-predict | effect-prophet | 6 | 0.288 | 0.360 | 0.264 | 0.360 | n/a |
| mcmc-linear-mixed-components | warm-predict | python-prophet | 6 | 5.072 | 5.193 | 4.938 | 5.193 | n/a |
| mcmc-linear-mixed-components | warm-uncertainty | effect-prophet | 6 | 2.950 | 3.137 | 2.913 | 3.137 | 172.0 |
| mcmc-linear-mixed-components | warm-uncertainty | python-prophet | 6 | 164.496 | 183.946 | 158.901 | 183.946 | 129.9 |
| mcmc-linear-regressor-model | warm-fit | effect-prophet | 6 | 4666.009 | 4847.165 | 4628.982 | 4847.165 | n/a |
| mcmc-linear-regressor-model | warm-fit | python-prophet | 6 | 4125.124 | 4449.508 | 4008.984 | 4449.508 | n/a |
| mcmc-linear-regressor-model | warm-predict | effect-prophet | 6 | 1.104 | 2.286 | 1.030 | 2.286 | n/a |
| mcmc-linear-regressor-model | warm-predict | python-prophet | 6 | 17.564 | 21.434 | 17.272 | 21.434 | n/a |
| mcmc-linear-regressor-model | warm-uncertainty | effect-prophet | 6 | 16.109 | 23.116 | 13.393 | 23.116 | 208.6 |
| mcmc-linear-regressor-model | warm-uncertainty | python-prophet | 6 | 305.505 | 341.625 | 292.175 | 341.625 | 131.3 |
| mcmc-linear-sampled-regressor-model | warm-fit | effect-prophet | 6 | 5017.977 | 5120.599 | 5003.193 | 5120.599 | n/a |
| mcmc-linear-sampled-regressor-model | warm-fit | python-prophet | 6 | 4422.277 | 4612.820 | 4380.909 | 4612.820 | n/a |
| mcmc-linear-sampled-regressor-model | warm-predict | effect-prophet | 6 | 1.685 | 2.247 | 1.077 | 2.247 | n/a |
| mcmc-linear-sampled-regressor-model | warm-predict | python-prophet | 6 | 112.972 | 144.003 | 111.471 | 144.003 | n/a |
| mcmc-linear-sampled-regressor-model | warm-uncertainty | effect-prophet | 6 | 16.298 | 23.092 | 15.596 | 23.092 | 218.0 |
| mcmc-linear-sampled-regressor-model | warm-uncertainty | python-prophet | 6 | 500.305 | 535.966 | 480.230 | 535.966 | 138.8 |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 191.193 | 192.624 | 190.251 | 192.624 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1625.534 | 1651.720 | 1600.817 | 1651.720 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 179.424 | 192.615 | 176.814 | 192.615 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1624.012 | 1639.068 | 1608.655 | 1639.068 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.171 | 0.192 | 0.147 | 0.192 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.481 | 2.604 | 2.349 | 2.604 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.028 | 0.040 | 0.021 | 0.040 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.584 | 0.668 | 0.554 | 0.668 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.059 | 0.063 | 0.049 | 0.063 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.614 | 0.641 | 0.594 | 0.641 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.440 | 11.621 | 11.120 | 11.621 | 148.3 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 158.276 | 175.182 | 156.922 | 175.182 | 129.9 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 355.924 | 362.425 | 351.442 | 362.425 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2145.047 | 2315.846 | 2131.672 | 2315.846 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 249.653 | 263.170 | 245.504 | 263.170 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1865.996 | 1935.695 | 1830.977 | 1935.695 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.213 | 0.242 | 0.198 | 0.242 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.663 | 4.096 | 3.576 | 4.096 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.025 | 0.035 | 0.018 | 0.035 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.455 | 1.548 | 1.432 | 1.548 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.052 | 0.071 | 0.051 | 0.071 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.441 | 1.497 | 1.427 | 1.497 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 69.688 | 72.761 | 68.785 | 72.761 | 170.2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 375.453 | 443.739 | 367.697 | 443.739 | 162.9 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 178.251 | 180.493 | 177.105 | 180.493 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1493.218 | 1786.870 | 1483.062 | 1786.870 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 165.560 | 167.673 | 163.278 | 167.673 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1464.464 | 1551.524 | 1455.251 | 1551.524 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.192 | 0.200 | 0.179 | 0.200 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.729 | 4.014 | 3.634 | 4.014 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.036 | 0.021 | 0.036 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.687 | 0.722 | 0.641 | 0.722 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.038 | 0.049 | 0.026 | 0.049 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.529 | 0.561 | 0.511 | 0.561 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.487 | 0.518 | 0.413 | 0.518 | 144.5 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.392 | 45.152 | 24.643 | 45.152 | 129.9 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 181.063 | 182.857 | 179.237 | 182.857 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1537.608 | 1587.620 | 1518.629 | 1587.620 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.768 | 178.983 | 163.460 | 178.983 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1532.723 | 1554.131 | 1512.948 | 1554.131 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.192 | 0.225 | 0.189 | 0.225 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.621 | 3.847 | 3.594 | 3.847 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.025 | 0.033 | 0.021 | 0.033 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.677 | 0.704 | 0.644 | 0.704 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.039 | 0.128 | 0.026 | 0.128 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.540 | 0.614 | 0.511 | 0.614 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.798 | 1.180 | 0.748 | 1.180 | 145.5 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.649 | 82.599 | 67.510 | 82.599 | 129.9 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 175.026 | 178.125 | 173.762 | 178.125 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1476.052 | 1518.983 | 1472.755 | 1518.983 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.910 | 167.800 | 161.833 | 167.800 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1458.975 | 1570.158 | 1449.408 | 1570.158 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.175 | 0.185 | 0.165 | 0.185 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.498 | 4.303 | 2.160 | 4.303 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.027 | 0.030 | 0.020 | 0.030 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.431 | 0.466 | 0.421 | 0.466 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.016 | 0.029 | 0.013 | 0.029 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.472 | 0.499 | 0.457 | 0.499 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.331 | 0.646 | 0.279 | 0.646 | 141.3 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.841 | 20.205 | 19.712 | 20.205 | 129.9 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 175.209 | 188.127 | 173.482 | 188.127 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1499.867 | 1611.668 | 1487.598 | 1611.668 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.987 | 167.325 | 159.680 | 167.325 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1451.655 | 1482.094 | 1449.549 | 1482.094 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.178 | 0.195 | 0.168 | 0.195 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.186 | 2.449 | 2.146 | 2.449 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.047 | 0.021 | 0.047 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.459 | 0.472 | 0.438 | 0.472 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.016 | 0.023 | 0.013 | 0.023 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.486 | 0.508 | 0.473 | 0.508 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.204 | 1.719 | 0.191 | 1.719 | 136.2 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.843 | 18.004 | 16.762 | 18.004 | 129.9 |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 230.104 | 247.453 | 226.341 | 247.453 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1822.393 | 1837.871 | 1804.426 | 1837.871 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.089 | 0.114 | 0.055 | 0.114 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.680 | 0.873 | 0.668 | 0.873 | n/a |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 9.281 | 12.076 | 8.865 | 12.076 | 164.0 |
| uncertainty-linear-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 246.314 | 266.860 | 245.185 | 266.860 | 129.9 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 165.187 | 169.803 | 163.432 | 169.803 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1450.833 | 1495.619 | 1444.929 | 1495.619 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.471 | 1.367 | 0.392 | 1.367 | 137.2 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.807 | 16.893 | 16.729 | 16.893 | 129.9 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 26.304 | 27.933 | 25.847 | 27.933 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 93.207 | 98.233 | 86.841 | 98.233 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 8.143 | 8.991 | 7.822 | 8.991 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.548 | 26.469 | 21.174 | 26.469 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 26.725 | 28.352 | 25.824 | 28.352 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 88.281 | 94.345 | 86.934 | 94.345 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 27.318 | 28.998 | 26.511 | 28.998 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 73.243 | 74.107 | 73.059 | 74.107 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:46:27 - cmdstanpy - INFO - Chain [1] start processing<br>17:46:27 - cmdstanpy - INFO - Chain [1] done processing<br>17:46:27 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=96061 data file=/tmp/tmpwal1j7uz/tx174pa2.json init=/tmp/tmpwal1j7uz/7kqbjktn.json output file=/tmp/tmpwal1j7uz/prophet_modelcr79v02q/prophet_model-20261107174627.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpwal1j7uz/tx174pa2.json<br>init = /tmp/tmpwal1j7uz/7kqbjktn.json<br>random<br>  seed = 96061<br>output<br>  file = /tmp/tmpwal1j7uz/prophet_modelcr79v02q/prophet_model-20261107174627.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 910, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 347, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 276, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=96061 data file=/tmp/tmpwal1j7uz/tx174pa2.json init=/tmp/tmpwal1j7uz/7kqbjktn.json output file=/tmp/tmpwal1j7uz/prophet_modelcr79v02q/prophet_model-20261107174627.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:46:28 - cmdstanpy - INFO - Chain [1] start processing<br>17:46:28 - cmdstanpy - INFO - Chain [1] done processing<br>17:46:28 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=983 data file=/tmp/tmppkyz42uk/gbvn0zuw.json init=/tmp/tmppkyz42uk/5vxi4094.json output file=/tmp/tmppkyz42uk/prophet_modelf45mublu/prophet_model-20261107174628.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmppkyz42uk/gbvn0zuw.json<br>init = /tmp/tmppkyz42uk/5vxi4094.json<br>random<br>  seed = 983<br>output<br>  file = /tmp/tmppkyz42uk/prophet_modelf45mublu/prophet_model-20261107174628.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 910, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 347, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 276, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=983 data file=/tmp/tmppkyz42uk/gbvn0zuw.json init=/tmp/tmppkyz42uk/5vxi4094.json output file=/tmp/tmppkyz42uk/prophet_modelf45mublu/prophet_model-20261107174628.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  fil |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 913, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 454, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1421, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1398, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1160, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 913, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 454, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `3a5a6cec5d0df164aaaa64a9fdc64b8f4184914c`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:993200ab5fdb277173dcdfb301bbdd41314581b4adc7cfd42c5e9042c7007c90`
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

