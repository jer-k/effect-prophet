# Effect Prophet benchmark — 2026-11-03T215626-728Z-0068e212

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| country-us-flat-additive | equivalent-objective | passed | 2.198e-6 | 8.204e-5 | 1.540e-4 | 1.518e-4 | 3.051e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-us-flat-additive | equivalent-objective | passed | 2.198e-6 | 8.204e-5 | 1.540e-4 | 1.518e-4 | 3.051e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-us-flat-multiplicative | equivalent-objective | passed | 1.068e-11 | 3.645e-10 | 0.000e+0 | 3.538e-10 | 3.253e-12 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-us-flat-multiplicative | equivalent-objective | passed | 1.068e-11 | 3.645e-10 | 0.000e+0 | 3.538e-10 | 3.253e-12 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-boundary-flat | equivalent-objective | passed | 4.071e-12 | 9.293e-12 | 9.293e-12 | 5.222e-12 | 8.532e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-empty-bv-flat | equivalent-objective | passed | 1.135e-11 | 0.000e+0 | 0.000e+0 | 1.135e-11 | 1.614e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-empty-flat | equivalent-objective | passed | 1.135e-11 | 0.000e+0 | 0.000e+0 | 1.135e-11 | 1.614e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-estimated-sg-flat | equivalent-objective | passed | 3.691e-12 | 1.789e-11 | 1.789e-11 | 1.420e-11 | 1.016e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-partial-in-flat | equivalent-objective | passed | 2.956e-12 | 2.062e-13 | 2.062e-13 | 3.162e-12 | 8.658e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-mixed-us-flat | equivalent-objective | passed | 1.351e-6 | 2.695e-5 | 3.165e-5 | 3.047e-5 | 7.054e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-730 | equivalent-objective | passed | 3.062e-12 | 0.000e+0 | 0.000e+0 | 3.062e-12 | 8.921e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-730 | equivalent-objective | passed | 1.933e-12 | 1.069e-11 | 1.069e-11 | 1.263e-11 | 9.048e-15 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-730 | equivalent-objective | passed | 1.933e-12 | 1.069e-11 | 1.069e-11 | 1.263e-11 | 9.048e-15 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-cn-flat-730 | equivalent-objective | passed | 2.309e-12 | 6.989e-12 | 6.989e-12 | 4.682e-12 | 5.806e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-cn-flat-730 | equivalent-objective | passed | 2.309e-12 | 6.989e-12 | 6.989e-12 | 4.682e-12 | 5.806e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-2190 | equivalent-objective | passed | 4.146e-12 | 0.000e+0 | 0.000e+0 | 4.146e-12 | 7.427e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-2190 | equivalent-objective | passed | 9.604e-11 | 4.352e-10 | 4.146e-10 | 5.106e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-2190 | equivalent-objective | passed | 9.604e-11 | 4.352e-10 | 4.146e-10 | 5.106e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-cn-flat-2190 | equivalent-objective | passed | 1.345e-6 | 2.604e-4 | 2.604e-4 | 2.618e-4 | 7.266e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-cn-flat-2190 | equivalent-objective | passed | 1.345e-6 | 2.604e-4 | 2.604e-4 | 2.618e-4 | 7.266e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-2190-batch-32 | equivalent-objective | passed | 4.146e-12 | 0.000e+0 | 0.000e+0 | 4.146e-12 | 7.427e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-2190-batch-32 | equivalent-objective | passed | 9.604e-11 | 3.817e-10 | 3.817e-10 | 4.778e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-2190-batch-32 | equivalent-objective | passed | 9.604e-11 | 3.817e-10 | 3.817e-10 | 4.778e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-uncertainty-us-flat | scalar-process-different-public-work | passed | 2.198e-6 | 8.204e-5 | 1.540e-4 | 1.518e-4 | 3.051e-5 | 0.091 | Verified fitted point behavior under country-calendar-public-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| map-training-zero-span-flat-varied | equivalent-objective | passed | 2.942e-4 | 0.000e+0 | 0.000e+0 | 2.942e-4 | 9.174e-4 | n/a | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-zero-span-flat-constant | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| flat-mixed-components | equivalent-objective | passed | 1.109e-7 | 1.290e-7 | 7.644e-9 | 2.322e-7 | 7.402e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-mixed-v1. |
| flat-mixed-components-large | equivalent-objective | passed | 1.352e-7 | 2.799e-7 | 7.200e-9 | 3.987e-7 | 2.050e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-mixed-v1. |
| uncertainty-flat-defaults-seasonal-intervals-1000 | scalar-process-different-public-work | passed | 9.024e-13 | 1.051e-10 | 1.051e-10 | 1.060e-10 | 7.260e-13 | 0.116 | Verified fitted point behavior under flat-growth-reduced-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| uncertainty-flat-mixed-components-full-intervals-512 | scalar-process-different-public-work | passed | 1.109e-7 | 1.290e-7 | 7.644e-9 | 2.322e-7 | 7.402e-10 | 0.008 | Verified fitted point behavior under flat-map-mixed-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| uncertainty-flat-mixed-components-large-full-samples-128 | scalar-process-different-public-work | passed | 1.352e-7 | 2.799e-7 | 7.200e-9 | 3.987e-7 | 2.050e-10 | 0.021 | Verified fitted point behavior under flat-map-mixed-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| anomalies-flat-defaults-99 | scalar-process-different-public-work | passed | 5.002e-12 | 1.683e-12 | 1.683e-12 | 6.601e-12 | 1.265e-12 | 0.608 | Verified fitted point behavior under flat-growth-reduced-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Both libraries flagged all 3 injected outliers. Effect flagged at most 3 rows and Python 3; 0 were flagged by only one library, each between the two libraries' bounds. |
| warm-start-flat-defaults-7-new-rows | equivalent-objective | passed | 8.739e-7 | 4.699e-6 | 4.699e-6 | 5.573e-6 | 6.025e-7 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. Each library refit from its own fit of the first 89 rows; their starting parameters differed by at most 4.34e-13 in scaled units. |
| evaluation-flat-mixed-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-months-metrics | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 4.099e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. MASE fold scales agree within 1e-12 relative, and overall MASE within its forecasts' difference. Absolute times only. |
| evaluation-flat-large-parallel | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 4.904e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| flat-defaults-level | equivalent-objective | passed | 1.218e-11 | 3.152e-15 | 3.152e-15 | 1.219e-11 | 1.745e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-seasonal | equivalent-objective | passed | 9.024e-13 | 1.051e-10 | 1.051e-10 | 1.060e-10 | 7.260e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-negative | equivalent-objective | passed | 1.069e-11 | 1.975e-15 | 1.975e-15 | 1.070e-11 | 6.573e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-absmax | equivalent-objective | passed | 1.130e-11 | 0.000e+0 | 0.000e+0 | 1.130e-11 | 1.848e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-minmax | equivalent-objective | passed | 7.202e-8 | 0.000e+0 | 0.000e+0 | 7.202e-8 | 1.093e-4 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-absmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-minmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-absmax | equivalent-objective | passed | 1.322e-11 | 0.000e+0 | 0.000e+0 | 1.322e-11 | 1.272e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-minmax | equivalent-objective | passed | 7.202e-8 | 0.000e+0 | 0.000e+0 | 7.202e-8 | 1.093e-4 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-absmax | equivalent-objective | passed | 1.115e-11 | 2.887e-13 | 2.887e-13 | 1.143e-11 | 2.119e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-minmax | equivalent-objective | passed | 9.948e-13 | 1.637e-12 | 1.637e-12 | 2.615e-12 | 1.455e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-prefix-63-absmax | equivalent-objective | passed | 1.033e-7 | 1.759e-7 | 2.228e-9 | 2.814e-7 | 1.099e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-63-minmax | equivalent-objective | passed | 9.243e-8 | 1.060e-7 | 7.826e-9 | 1.984e-7 | 7.576e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-absmax | equivalent-objective | passed | 1.001e-7 | 9.092e-8 | 1.479e-8 | 1.910e-7 | 2.555e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-minmax | equivalent-objective | passed | 1.372e-7 | 2.744e-7 | 9.190e-9 | 4.116e-7 | 9.502e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-absmax | equivalent-objective | passed | 5.871e-8 | 1.429e-7 | 4.958e-9 | 2.016e-7 | 1.688e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-minmax | equivalent-objective | passed | 1.044e-6 | 7.814e-6 | 2.359e-6 | 8.858e-6 | 2.711e-7 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-absmax | equivalent-objective | passed | 1.107e-7 | 1.063e-7 | 3.407e-9 | 2.130e-7 | 2.439e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-absmax | equivalent-objective | passed | 1.627e-7 | 8.952e-8 | 1.230e-9 | 2.443e-7 | 9.071e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-minmax | equivalent-objective | passed | 7.836e-8 | 1.453e-7 | 1.366e-8 | 2.178e-7 | 2.623e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-absmax | equivalent-objective | passed | 4.856e-8 | 9.183e-8 | 2.275e-9 | 1.188e-7 | 1.398e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-minmax | equivalent-objective | passed | 1.377e-7 | 1.074e-7 | 8.662e-9 | 2.382e-7 | 3.142e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-large-absmax | equivalent-objective | passed | 8.224e-8 | 1.116e-7 | 8.169e-9 | 1.938e-7 | 2.158e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-additive-components | equivalent-objective | passed | 7.695e-12 | 1.528e-11 | 1.528e-11 | 2.269e-11 | 7.447e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |
| flat-additive-components-large | equivalent-objective | passed | 1.133e-11 | 1.275e-11 | 1.398e-11 | 2.300e-11 | 9.111e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |
| flat-mixed-components-absmax-defaults | equivalent-objective | passed | 1.236e-2 | 8.702e-3 | 3.943e-3 | 2.107e-2 | 4.691e-2 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-mixed-v1. |
| flat-correlated-regressors | equivalent-objective | passed | 2.250e-11 | 3.414e-12 | 6.346e-12 | 2.885e-11 | 5.001e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |
| flat-regressor-model | equivalent-objective | passed | 2.250e-11 | 2.637e-4 | 2.637e-4 | 2.637e-4 | 5.001e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |
| uncertainty-flat-regressor-model-intervals-1000 | scalar-process-different-public-work | passed | 2.250e-11 | 2.637e-4 | 2.637e-4 | 2.637e-4 | 5.001e-13 | 0.261 | Verified fitted point behavior under flat-map-additive-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| evaluation-flat-regressor-model-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.239e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-regressor-model-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.239e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| mcmc-flat-mixed-components | equivalent-posterior | passed | 3.506e-5 | 6.202e-3 | 1.411e-3 | 6.167e-3 | 8.186e-5 | 0.356 | Verified 500-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25352 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25352 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

Anomaly workloads check the whole history in-sample. Effect's `warm-anomalies` times the public `anomalies` call, fit included; Python's times a fresh fit, `predict(history, vectorized=False)` and the strict `y < yhat_lower | y > yhat_upper` comparison. Each library's flags must be exactly the rows outside its own value intervals, and both must flag every declared outlier. Rows flagged by one library alone are counted, not failed.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| country-uncertainty-us-flat | 96 | 12 | 25 | 4 | 4 | 275 | 32 | intervals | 67108864 | country-v5:country-basic-96:level+jan1(3)+jan5(1.4)+bounded-noise:n=96:future=4:year=2024 / 9ff002c94ecdaa2f78ad32094f4af7cf5cbbe377f19cfdb5b3100e29005151f8 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-defaults-seasonal-intervals-1000 | 96 | 6 | 25 | 120 | 24 | 24 | 1000 | intervals | 67108864 | flat-seasonal-v1:n=96:h=24:level=35:bounded-noise=true / 801786aaae3b93349addcc9eca44eff79cb6f5640dce099ddd19082a85636e2a | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-full-intervals-512 | 96 | 6 | 25 | 24 | 24 | 24 | 512 | intervals | 67108864 | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-large-full-samples-128 | 256 | 6 | 25 | 64 | 64 | 64 | 128 | samples | 67108864 | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | docs/validation/uncertainty.md#evidence-classes |
| anomalies-flat-defaults-99 | 180 | 6 | 25 | 180 | 0 | 0 | 1000 | intervals | 67108864 | flat-anomalies-v1:level=35+weekly+bounded-noise-x5+outliers@30(+8),95(-8),150(+6):n=180:h=0 / 331e086f70aeba1edc5c406b58248c396c8666bda9fe70e084658fa5eabae0d8 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-regressor-model-intervals-1000 | 730 | 26 | 25 | 180 | 180 | 180 | 1000 | intervals | 67108864 | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | docs/validation/uncertainty.md#evidence-classes |
| mcmc-flat-mixed-components | 96 | 6 | 25 | 24 | 24 | 24 | 1000 | intervals | 67108864 | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Effect runs folds one at a time. Python runs them sequentially too, except in `-threads` and `-processes` phases, which time `cross_validation(parallel=...)` with Prophet's default pools and must return the sequential point rows and search scores exactly. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 128 | 19 / 0.8 | horizons | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | d27263ab5e5b8f488de56085850577bb13a87b5ad4dca13da9039ce8de013341, ac378f98946578839b9dc1c9dbd10cc73c207ee8c103ad3c437807ee60fab209, d76d1f1e1ceb3370113274ddc7a004255a238dcdea9959d517623cb508c5da64 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 128 | 19 / 0.8 | rolling | n/a |
| evaluation-flat-large-months-metrics | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 3 | 436 | 273 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-large-parallel | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 12 | 2526 | 84 | 6 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-regressor-model-point | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | flat | 0 | 2 | 1418 | 14 | 26 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-regressor-model-intervals | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | flat | 0 | 2 | 1418 | 14 | 26 | 25 | 128 | 19 / 0.8 | horizons | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.854 | 11.901 | 10.476 | 11.901 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 133.476 | 174.106 | 128.615 | 174.106 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 1.992 | 4.378 | 1.695 | 4.378 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.838 | 7.484 | 6.811 | 7.484 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.636 | 6.804 | 6.444 | 6.804 | 146.8 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 122.998 | 136.614 | 120.836 | 136.614 | 257.2 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | 138.3 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.478 | 0.497 | 0.461 | 0.497 | 257.2 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 208.844 | 262.497 | 203.136 | 262.497 | 154.2 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1727.018 | 1785.472 | 1697.937 | 1785.472 | 257.2 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 169.371 | 180.370 | 164.600 | 180.370 | 168.2 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1614.822 | 1785.084 | 1608.322 | 1785.084 | 257.2 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 1.286 | 1.458 | 1.108 | 1.458 | 165.2 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.456 | 4.134 | 3.296 | 4.134 | 257.2 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.125 | 0.215 | 0.105 | 0.215 | 156.2 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.579 | 0.847 | 0.555 | 0.847 | 257.2 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.187 | 21.517 | 21.085 | 21.517 | 154.0 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 73.988 | 80.939 | 72.826 | 80.939 | 257.2 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 21.796 | 23.464 | 21.475 | 23.464 | 152.9 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 72.581 | 90.406 | 71.855 | 90.406 | 257.2 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 21.783 | 22.000 | 21.667 | 22.000 | 148.7 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 67.447 | 68.477 | 66.569 | 68.477 | 257.2 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.288 | 0.349 | 0.278 | 0.349 | 149.8 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.440 | 5.622 | 5.294 | 5.622 | 257.2 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 201.050 | 218.492 | 192.207 | 218.492 | 247.0 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1656.151 | 1764.301 | 1620.157 | 1764.301 | 257.2 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.989 | 4.375 | 2.860 | 4.375 | 239.1 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.345 | 9.719 | 9.264 | 9.719 | 257.2 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.125 | 0.140 | 0.103 | 0.140 | 231.3 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.124 | 3.168 | 3.108 | 3.168 | 257.2 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 22.219 | 28.301 | 20.561 | 28.301 | 207.0 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 84.642 | 88.844 | 84.523 | 88.844 | 257.2 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.512 | 4.290 | 3.246 | 4.290 | 222.8 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.099 | 9.795 | 8.822 | 9.795 | 257.2 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 192.883 | 217.086 | 181.754 | 217.086 | 200.9 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1925.817 | 2376.362 | 1770.558 | 2376.362 | 257.2 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.786 | 2.459 | 1.686 | 2.459 | 198.5 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.100 | 6.370 | 4.949 | 6.370 | 257.2 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.124 | 0.175 | 0.113 | 0.175 | 194.9 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.262 | 1.294 | 1.246 | 1.294 | 257.2 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 8.516 | 9.740 | 7.823 | 9.740 | 168.4 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 25.710 | 30.258 | 24.516 | 30.258 | 257.2 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.707 | 5.045 | 2.608 | 5.045 | 192.8 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.013 | 7.282 | 6.976 | 7.282 | 257.2 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.025 | 0.011 | 0.025 | 131.2 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.485 | 0.505 | 0.458 | 0.505 | 257.2 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 175.706 | 191.385 | 171.990 | 191.385 | 147.8 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1632.507 | 1733.740 | 1596.287 | 1733.740 | 257.2 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 164.839 | 168.209 | 163.020 | 168.209 | 151.3 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1603.293 | 1718.100 | 1590.706 | 1718.100 | 257.2 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.232 | 0.940 | 0.213 | 0.940 | 151.3 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.164 | 2.359 | 2.100 | 2.359 | 257.2 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.043 | 0.061 | 0.035 | 0.061 | 148.8 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.467 | 0.500 | 0.456 | 0.500 | 257.2 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.348 | 1.962 | 1.307 | 1.962 | 147.7 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 14.057 | 15.939 | 13.415 | 15.939 | 257.2 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.712 | 2.060 | 1.456 | 2.060 | 147.3 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.723 | 12.936 | 12.625 | 12.936 | 257.2 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.223 | 3.854 | 1.934 | 3.854 | 139.4 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.549 | 9.994 | 9.419 | 9.994 | 257.2 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.179 | 0.214 | 0.170 | 0.214 | 141.4 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.193 | 3.311 | 3.138 | 3.311 | 257.2 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.045 | 0.076 | 0.028 | 0.076 | 154.2 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.593 | 0.606 | 0.572 | 0.606 | 257.2 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 231.430 | 303.934 | 212.481 | 303.934 | 195.1 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1759.441 | 1861.708 | 1712.121 | 1861.708 | 257.2 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 177.052 | 209.509 | 176.463 | 209.509 | 196.6 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1680.402 | 1761.427 | 1599.020 | 1761.427 | 257.2 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 0.833 | 1.732 | 0.759 | 1.732 | 196.4 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.298 | 4.129 | 3.112 | 4.129 | 257.2 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.091 | 0.137 | 0.086 | 0.137 | 195.3 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.537 | 0.566 | 0.494 | 0.566 | 257.2 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.798 | 26.830 | 20.699 | 26.830 | 194.6 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 72.794 | 74.929 | 70.306 | 74.929 | 257.2 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 23.847 | 27.659 | 21.129 | 27.659 | 176.4 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 69.438 | 72.757 | 69.312 | 72.757 | 257.2 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 20.908 | 24.388 | 19.539 | 24.388 | 157.8 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 64.288 | 64.941 | 63.799 | 64.941 | 257.2 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 2.244 | 10.647 | 1.758 | 10.647 | 159.3 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.430 | 5.881 | 5.353 | 5.881 | 257.2 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 194.315 | 270.603 | 186.293 | 270.603 | 241.5 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1463.782 | 1673.309 | 1456.806 | 1673.309 | 257.2 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.219 | 2.390 | 2.152 | 2.390 | 232.0 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.061 | 13.808 | 9.985 | 13.808 | 257.2 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.055 | 0.101 | 0.043 | 0.101 | 226.0 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.334 | 4.079 | 3.294 | 4.079 | 257.2 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 20.199 | 24.127 | 19.206 | 24.127 | 204.6 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 81.511 | 112.014 | 79.079 | 112.014 | 257.2 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 2.845 | 3.458 | 2.742 | 3.458 | 218.8 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.249 | 9.415 | 9.161 | 9.415 | 257.2 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 186.043 | 209.490 | 179.921 | 209.490 | 198.8 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1550.672 | 1824.410 | 1472.973 | 1824.410 | 257.2 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.870 | 1.111 | 0.857 | 1.111 | 196.1 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 6.231 | 7.099 | 6.053 | 7.099 | 257.2 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.033 | 0.042 | 0.030 | 0.042 | 187.9 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.518 | 1.614 | 1.491 | 1.614 | 257.2 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.861 | 8.637 | 5.511 | 8.637 | 150.9 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 22.831 | 24.738 | 22.255 | 24.738 | 257.2 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 4.224 | 5.249 | 2.150 | 5.249 | 175.9 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 7.461 | 21.701 | 6.808 | 21.701 | 257.2 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 130.7 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.452 | 0.480 | 0.431 | 0.480 | 257.2 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 175.434 | 177.065 | 170.843 | 177.065 | 143.5 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1455.001 | 1526.261 | 1444.736 | 1526.261 | 257.2 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 178.756 | 230.183 | 160.641 | 230.183 | 143.7 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1446.630 | 1497.880 | 1436.950 | 1497.880 | 257.2 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.096 | 0.111 | 0.086 | 0.111 | 143.5 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.070 | 2.190 | 2.050 | 2.190 | 257.2 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.017 | 0.025 | 0.014 | 0.025 | 143.5 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.437 | 0.510 | 0.434 | 0.510 | 257.2 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.100 | 1.164 | 1.074 | 1.164 | 143.3 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.762 | 13.934 | 11.641 | 13.934 | 257.2 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.308 | 3.008 | 1.138 | 3.008 | 143.3 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 11.441 | 12.650 | 10.931 | 12.650 | 257.2 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.598 | 1.928 | 1.529 | 1.928 | 135.8 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.881 | 9.679 | 8.224 | 9.679 | 257.2 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.116 | 0.135 | 0.114 | 0.135 | 137.3 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.664 | 2.731 | 2.648 | 2.731 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 178.344 | 179.265 | 176.335 | 179.265 | 191.8 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1519.791 | 2145.863 | 1488.811 | 2145.863 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.825 | 3.068 | 2.725 | 3.068 | 189.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.574 | 8.030 | 7.305 | 8.030 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.046 | 0.052 | 0.044 | 0.052 | 188.5 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.884 | 2.899 | 2.842 | 2.899 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 13.502 | 15.672 | 12.088 | 15.672 | 168.8 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 39.137 | 53.507 | 38.549 | 53.507 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.496 | 0.933 | 0.396 | 0.933 | 179.4 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.195 | 12.365 | 12.009 | 12.365 | 257.2 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 196.775 | 361.616 | 188.306 | 361.616 | 207.0 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1498.007 | 1550.389 | 1466.108 | 1550.389 | 257.2 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.350 | 3.812 | 3.138 | 3.812 | 201.1 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.277 | 8.473 | 7.213 | 8.473 | 257.2 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.049 | 0.055 | 0.049 | 0.055 | 199.4 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.956 | 3.013 | 2.927 | 3.013 | 257.2 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.081 | 20.160 | 12.725 | 20.160 | 190.1 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 41.433 | 59.859 | 40.008 | 59.859 | 257.2 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.963 | 2.737 | 1.872 | 2.737 | 196.4 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.758 | 15.186 | 13.408 | 15.186 | 257.2 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 183.343 | 191.148 | 180.499 | 191.148 | 191.4 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1458.661 | 1494.185 | 1430.584 | 1494.185 | 257.2 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.685 | 2.919 | 1.700 | 2.919 | 190.2 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.497 | 5.664 | 5.320 | 5.664 | 257.2 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.032 | 0.034 | 0.031 | 0.034 | 171.6 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.443 | 1.471 | 1.424 | 1.471 | 257.2 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.864 | 7.149 | 5.252 | 7.149 | 149.6 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 19.056 | 22.369 | 18.737 | 22.369 | 257.2 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.077 | 4.123 | 1.917 | 4.123 | 161.6 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 9.471 | 10.763 | 9.197 | 10.763 | 257.2 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.010 | 0.017 | 0.009 | 0.017 | 140.7 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.498 | 0.453 | 0.498 | 257.2 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 185.837 | 189.375 | 184.040 | 189.375 | 155.7 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1521.535 | 1631.675 | 1470.399 | 1631.675 | 257.2 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.461 | 178.003 | 157.408 | 178.003 | 155.8 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1482.145 | 1645.425 | 1439.771 | 1645.425 | 257.2 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.405 | 0.414 | 0.387 | 0.414 | 155.7 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 4.015 | 4.212 | 3.932 | 4.212 | 257.2 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.021 | 0.038 | 0.018 | 0.038 | 155.7 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.722 | 0.736 | 0.700 | 0.736 | 257.2 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.414 | 13.739 | 12.804 | 13.739 | 155.4 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 47.767 | 50.016 | 47.040 | 50.016 | 257.2 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.323 | 14.194 | 13.013 | 14.194 | 152.7 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 47.706 | 51.665 | 46.630 | 51.665 | 257.2 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 14.031 | 15.494 | 13.607 | 15.494 | 151.9 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 42.538 | 44.604 | 42.155 | 44.604 | 257.2 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.150 | 0.176 | 0.146 | 0.176 | 152.1 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.789 | 4.974 | 4.700 | 4.974 | 257.2 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.016 | 0.011 | 0.016 | 136.0 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.482 | 0.445 | 0.482 | 257.2 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 174.601 | 183.134 | 170.249 | 183.134 | 153.3 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1505.137 | 1560.827 | 1447.243 | 1560.827 | 257.2 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 162.279 | 167.729 | 161.867 | 167.729 | 153.5 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1440.955 | 1495.977 | 1433.575 | 1495.977 | 257.2 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.403 | 0.456 | 0.388 | 0.456 | 153.3 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.930 | 4.082 | 3.867 | 4.082 | 257.2 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.024 | 0.027 | 0.017 | 0.027 | 153.3 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.720 | 0.751 | 0.716 | 0.751 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.556 | 3.283 | 2.490 | 3.283 | 152.9 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.706 | 18.926 | 18.646 | 18.926 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.747 | 2.825 | 2.683 | 2.825 | 149.8 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 18.239 | 18.541 | 17.840 | 18.541 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.476 | 4.514 | 2.936 | 4.514 | 149.0 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.513 | 15.101 | 13.222 | 15.101 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.157 | 0.190 | 0.149 | 0.190 | 149.1 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.668 | 4.750 | 4.586 | 4.750 | 257.2 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.044 | 0.053 | 0.031 | 0.053 | 137.3 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.568 | 1.004 | 0.524 | 1.004 | 257.2 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 197.358 | 200.000 | 194.859 | 200.000 | 169.0 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1717.891 | 2110.201 | 1664.566 | 2110.201 | 257.2 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 167.224 | 187.536 | 166.439 | 187.536 | 174.9 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1635.200 | 2661.281 | 1585.967 | 2661.281 | 257.2 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.886 | 1.333 | 0.801 | 1.333 | 169.5 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.412 | 6.244 | 4.330 | 6.244 | 257.2 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.106 | 0.164 | 0.095 | 0.164 | 169.3 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.764 | 1.028 | 0.733 | 1.028 | 257.2 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 17.313 | 18.338 | 16.805 | 18.338 | 165.4 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 62.967 | 63.881 | 61.424 | 63.881 | 257.2 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.503 | 18.026 | 16.850 | 18.026 | 151.9 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 62.432 | 63.073 | 61.870 | 63.073 | 257.2 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.632 | 19.428 | 17.363 | 19.428 | 149.5 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 57.962 | 63.159 | 55.799 | 63.159 | 257.2 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.231 | 0.244 | 0.220 | 0.244 | 149.8 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.401 | 6.596 | 6.246 | 6.596 | 257.2 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 167.902 | 174.732 | 166.693 | 174.732 | 169.0 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1546.011 | 2441.344 | 1432.467 | 2441.344 | 257.2 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.099 | 0.152 | 0.078 | 0.152 | 168.0 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.706 | 4.829 | 4.613 | 4.829 | 257.2 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.015 | 0.016 | 0.014 | 0.016 | 153.0 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.326 | 2.377 | 2.306 | 2.377 | 257.2 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.563 | 8.443 | 6.529 | 8.443 | 150.7 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 15.699 | 29.604 | 15.297 | 29.604 | 257.2 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.208 | 0.516 | 0.194 | 0.516 | 151.1 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.698 | 2.757 | 2.640 | 2.757 | 257.2 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 172.962 | 174.113 | 170.711 | 174.113 | 185.5 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1482.900 | 1547.647 | 1467.339 | 1547.647 | 257.2 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.132 | 0.175 | 0.098 | 0.175 | 182.7 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.720 | 4.957 | 4.633 | 4.957 | 257.2 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.014 | 0.016 | 0.013 | 0.016 | 168.0 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.353 | 2.443 | 2.314 | 2.443 | 257.2 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 7.225 | 8.193 | 6.509 | 8.193 | 150.4 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 17.837 | 33.377 | 16.594 | 33.377 | 257.2 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 2.349 | 2.926 | 2.008 | 2.926 | 161.1 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.907 | 2.985 | 2.851 | 2.985 | 257.2 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 174.815 | 190.409 | 172.245 | 190.409 | 153.4 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1470.439 | 1548.387 | 1424.143 | 1548.387 | 257.2 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.108 | 0.193 | 0.080 | 0.193 | 152.5 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.894 | 3.003 | 2.878 | 3.003 | 257.2 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 152.4 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.033 | 1.056 | 1.027 | 1.056 | 257.2 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.295 | 4.575 | 2.849 | 4.575 | 151.2 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.088 | 8.412 | 8.043 | 8.412 | 257.2 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.499 | 1.716 | 1.369 | 1.716 | 151.9 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.853 | 2.923 | 2.793 | 2.923 | 257.2 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.019 | 0.011 | 0.019 | 134.5 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.487 | 0.421 | 0.487 | 257.2 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 180.062 | 183.381 | 174.930 | 183.381 | 157.4 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1665.756 | 1704.254 | 1618.421 | 1704.254 | 257.2 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 168.206 | 190.959 | 167.873 | 190.959 | 169.9 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1598.502 | 1753.051 | 1590.028 | 1753.051 | 257.2 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.291 | 2.095 | 0.734 | 2.095 | 169.8 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.597 | 4.167 | 3.103 | 4.167 | 257.2 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.124 | 0.144 | 0.106 | 0.144 | 161.0 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.527 | 0.554 | 0.501 | 0.554 | 257.2 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.301 | 3.594 | 3.121 | 3.594 | 154.0 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 21.892 | 23.688 | 21.040 | 23.688 | 257.2 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.472 | 4.659 | 3.348 | 4.659 | 152.3 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.680 | 24.298 | 20.489 | 24.298 | 257.2 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 3.529 | 3.886 | 3.427 | 3.886 | 147.5 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 16.410 | 17.379 | 15.446 | 17.379 | 257.2 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.237 | 0.847 | 0.202 | 0.847 | 151.1 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.966 | 5.200 | 4.929 | 5.200 | 257.2 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 188.790 | 195.919 | 182.341 | 195.919 | 210.0 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1685.911 | 1744.472 | 1623.315 | 1744.472 | 257.2 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 5.058 | 5.467 | 4.769 | 5.467 | 205.0 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.956 | 6.682 | 5.880 | 6.682 | 257.2 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.326 | 0.980 | 0.285 | 0.980 | 201.6 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.531 | 2.628 | 2.452 | 2.628 | 257.2 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 15.722 | 19.634 | 13.349 | 19.634 | 194.4 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 42.917 | 47.805 | 42.646 | 47.805 | 257.2 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.533 | 0.598 | 0.496 | 0.598 | 198.5 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.274 | 7.965 | 7.203 | 7.965 | 257.2 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 194.960 | 212.640 | 187.791 | 212.640 | 211.9 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1651.872 | 1727.572 | 1593.482 | 1727.572 | 257.2 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.864 | 5.813 | 4.566 | 5.813 | 207.8 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 6.493 | 7.495 | 6.129 | 7.495 | 257.2 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.302 | 0.309 | 0.258 | 0.309 | 201.9 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.582 | 3.292 | 2.512 | 3.292 | 257.2 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 14.740 | 20.433 | 13.542 | 20.433 | 191.0 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 43.333 | 46.253 | 42.636 | 46.253 | 257.2 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.061 | 3.971 | 1.951 | 3.971 | 199.0 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 9.531 | 17.658 | 8.920 | 17.658 | 257.2 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 203.541 | 371.535 | 186.461 | 371.535 | 206.5 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1676.248 | 2199.152 | 1623.011 | 2199.152 | 257.2 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 3.175 | 4.010 | 2.734 | 4.010 | 202.3 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.157 | 4.950 | 4.075 | 4.950 | 257.2 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.281 | 0.305 | 0.264 | 0.305 | 196.8 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.132 | 1.145 | 1.109 | 1.145 | 257.2 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 9.928 | 11.177 | 8.798 | 11.177 | 178.1 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.587 | 23.681 | 21.294 | 23.681 | 257.2 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.393 | 3.271 | 2.210 | 3.271 | 196.0 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.727 | 9.744 | 8.607 | 9.744 | 257.2 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 192.101 | 197.568 | 191.561 | 197.568 | 144.8 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1692.017 | 1784.401 | 1658.711 | 1784.401 | 257.2 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.517 | 169.471 | 162.470 | 169.471 | 149.1 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1624.871 | 1757.756 | 1603.263 | 1757.756 | 257.2 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.190 | 2.009 | 1.047 | 2.009 | 147.5 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.934 | 4.660 | 3.866 | 4.660 | 257.2 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.088 | 0.114 | 0.085 | 0.114 | 144.9 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.684 | 0.727 | 0.667 | 0.727 | 257.2 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.013 | 0.020 | 133.6 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.462 | 0.497 | 0.439 | 0.497 | 257.2 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.331 | 0.412 | 0.299 | 0.412 | 138.3 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.785 | 15.227 | 14.678 | 15.227 | 257.2 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.021 | 0.012 | 0.021 | 139.1 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.494 | 0.732 | 0.476 | 0.732 | 257.2 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 191.133 | 207.112 | 184.681 | 207.112 | 154.6 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1692.933 | 1838.838 | 1655.665 | 1838.838 | 257.2 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 161.701 | 178.318 | 159.969 | 178.318 | 168.1 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1797.182 | 1948.079 | 1628.945 | 1948.079 | 257.2 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 1.220 | 1.705 | 1.146 | 1.705 | 165.2 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.094 | 4.486 | 3.924 | 4.486 | 257.2 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.117 | 0.129 | 0.103 | 0.129 | 156.3 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.712 | 0.794 | 0.697 | 0.794 | 257.2 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.786 | 13.981 | 13.405 | 13.981 | 154.3 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 52.398 | 56.083 | 51.812 | 56.083 | 257.2 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.799 | 14.043 | 13.522 | 14.043 | 153.2 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 52.775 | 57.499 | 51.751 | 57.499 | 257.2 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.056 | 14.436 | 13.812 | 14.436 | 148.8 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 49.328 | 50.746 | 48.161 | 50.746 | 257.2 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.270 | 0.376 | 0.261 | 0.376 | 150.2 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.749 | 9.369 | 5.557 | 9.369 | 257.2 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 143.4 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.452 | 0.492 | 0.447 | 0.492 | 257.2 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 172.855 | 177.491 | 170.874 | 177.491 | 157.6 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1634.633 | 1660.452 | 1621.304 | 1660.452 | 257.2 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 163.673 | 174.143 | 162.410 | 174.143 | 171.3 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1648.614 | 1692.885 | 1602.914 | 1692.885 | 257.2 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 1.160 | 1.389 | 1.055 | 1.389 | 168.4 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.992 | 4.165 | 3.894 | 4.165 | 257.2 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.119 | 0.144 | 0.106 | 0.144 | 159.5 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.715 | 0.778 | 0.689 | 0.778 | 257.2 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.103 | 3.256 | 3.017 | 3.256 | 157.5 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.944 | 24.580 | 22.593 | 24.580 | 257.2 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.383 | 3.520 | 3.271 | 3.520 | 156.5 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 22.711 | 24.478 | 22.216 | 24.478 | 257.2 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.645 | 3.845 | 3.489 | 3.845 | 152.5 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 18.692 | 32.170 | 17.243 | 32.170 | 257.2 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.260 | 0.297 | 0.251 | 0.297 | 153.6 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 6.101 | 6.698 | 5.954 | 6.698 | 257.2 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 8.182 | 10.340 | 7.891 | 10.340 | 151.6 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 48.436 | 49.046 | 47.473 | 49.046 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.785 | 1.983 | 1.455 | 1.983 | 149.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.136 | 10.244 | 9.985 | 10.244 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.378 | 0.525 | 0.367 | 0.525 | 148.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.077 | 5.917 | 4.988 | 5.917 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 2.237 | 2.799 | 2.086 | 2.799 | 150.3 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.400 | 24.376 | 5.376 | 24.376 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.513 | 1.356 | 0.476 | 1.356 | 145.3 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.547 | 5.608 | 5.454 | 5.608 | 257.2 |
| evaluation-flat-large-parallel | evaluation-point-processes | python-prophet | 4 | 1525.124 | 1564.944 | 1492.189 | 1564.944 | 257.2 |
| evaluation-flat-large-parallel | evaluation-point-threads | python-prophet | 4 | 195.988 | 218.650 | 194.911 | 218.650 | 257.2 |
| evaluation-flat-large-parallel | evaluation-point | effect-prophet | 4 | 23.792 | 28.748 | 21.841 | 28.748 | 176.8 |
| evaluation-flat-large-parallel | evaluation-point | python-prophet | 4 | 184.549 | 214.086 | 180.741 | 214.086 | 257.2 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 198.476 | 480.060 | 193.798 | 480.060 | 152.3 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1490.537 | 1521.012 | 1481.155 | 1521.012 | 257.2 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.725 | 3.369 | 2.584 | 3.369 | 151.3 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.382 | 1.614 | 1.344 | 1.614 | 257.2 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.105 | 0.169 | 0.102 | 0.169 | 129.6 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.546 | 0.584 | 0.535 | 0.584 | 257.2 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.063 | 0.084 | 0.061 | 0.084 | 150.5 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.271 | 5.471 | 5.175 | 5.471 | 257.2 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 2.354 | 3.257 | 1.880 | 3.257 | 142.6 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.766 | 0.797 | 0.750 | 0.797 | 257.2 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.284 | 8.751 | 6.254 | 8.751 | 149.9 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 38.209 | 39.162 | 37.765 | 39.162 | 257.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 5.696 | 9.027 | 5.074 | 9.027 | 147.9 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 60.352 | 62.778 | 59.511 | 62.778 | 257.2 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 184.754 | 188.534 | 181.110 | 188.534 | 154.7 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1527.488 | 1633.900 | 1480.189 | 1633.900 | 257.2 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.224 | 1.262 | 1.222 | 1.262 | 154.6 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.467 | 1.494 | 1.463 | 1.494 | 257.2 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.037 | 0.055 | 0.034 | 0.055 | 133.4 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.427 | 0.476 | 0.412 | 0.476 | 257.2 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.123 | 0.214 | 0.101 | 0.214 | 153.9 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.290 | 5.376 | 5.235 | 5.376 | 257.2 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.250 | 1.354 | 1.180 | 1.354 | 136.6 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.768 | 0.806 | 0.766 | 0.806 | 257.2 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.227 | 8.041 | 4.147 | 8.041 | 150.9 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.410 | 49.644 | 46.256 | 49.644 | 257.2 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.017 | 2.885 | 1.946 | 2.885 | 155.1 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.366 | 14.716 | 13.114 | 14.716 | 257.2 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.277 | 0.299 | 0.266 | 0.299 | 181.8 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.005 | 0.004 | 0.005 | 257.2 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.314 | 0.493 | 0.259 | 0.493 | 171.8 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.017 | 0.009 | 0.017 | 257.2 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.577 | 15.491 | 12.498 | 15.491 | 150.4 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 161.893 | 180.712 | 145.116 | 180.712 | 257.2 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 62.953 | 67.632 | 62.700 | 67.632 | 166.4 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 300.393 | 310.488 | 300.116 | 310.488 | 257.2 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 257.739 | 301.295 | 257.458 | 301.295 | 194.1 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1689.959 | 1751.710 | 1669.217 | 1751.710 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 6.678 | 8.307 | 6.601 | 8.307 | 194.0 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 2.034 | 2.637 | 2.029 | 2.637 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.261 | 0.399 | 0.250 | 0.399 | 136.1 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.767 | 0.831 | 0.751 | 0.831 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.104 | 0.131 | 0.064 | 0.131 | 177.6 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.339 | 8.918 | 5.283 | 8.918 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.511 | 3.025 | 2.474 | 3.025 | 146.0 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 1.049 | 1.327 | 1.022 | 1.327 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 60.952 | 69.288 | 59.624 | 69.288 | 164.8 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 247.363 | 273.186 | 232.108 | 273.186 | 257.2 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.126 | 0.277 | 0.116 | 0.277 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.635 | 0.656 | 0.634 | 0.656 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 184.783 | 200.691 | 181.506 | 200.691 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1451.321 | 1671.973 | 1436.866 | 1671.973 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 178.743 | 189.911 | 168.982 | 189.911 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1445.315 | 1718.665 | 1443.485 | 1718.665 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.138 | 0.154 | 0.128 | 0.154 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.879 | 5.022 | 3.849 | 5.022 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.032 | 0.033 | 0.026 | 0.033 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.843 | 0.931 | 0.837 | 0.931 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.204 | 2.989 | 2.164 | 2.989 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 15.358 | 15.678 | 14.642 | 15.678 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.294 | 2.530 | 2.289 | 2.530 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 14.157 | 14.747 | 14.101 | 14.747 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.462 | 2.846 | 2.340 | 2.846 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.493 | 10.702 | 9.271 | 10.702 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.535 | 0.575 | 0.486 | 0.575 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 5.054 | 5.376 | 4.808 | 5.376 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.072 | 0.113 | 0.050 | 0.113 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.525 | 0.542 | 0.523 | 0.542 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 214.248 | 380.951 | 200.645 | 380.951 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1518.154 | 1886.133 | 1469.044 | 1886.133 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 176.849 | 181.196 | 172.941 | 181.196 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1437.061 | 1577.980 | 1427.011 | 1577.980 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.184 | 0.211 | 0.174 | 0.211 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.710 | 4.207 | 3.522 | 4.207 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.041 | 0.073 | 0.038 | 0.073 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.667 | 0.797 | 0.653 | 0.797 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.782 | 23.523 | 5.378 | 23.523 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.270 | 32.211 | 28.083 | 32.211 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 5.582 | 5.940 | 4.947 | 5.940 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.572 | 29.589 | 26.926 | 29.589 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 7.169 | 7.530 | 5.373 | 7.530 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.781 | 24.844 | 22.209 | 24.844 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.405 | 0.710 | 0.252 | 0.710 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.704 | 5.411 | 4.696 | 5.411 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.064 | 167.380 | 159.458 | 167.380 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1770.915 | 1954.512 | 1590.064 | 1954.512 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.127 | 0.172 | 0.114 | 0.172 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.142 | 3.347 | 2.099 | 3.347 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.017 | 0.024 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.415 | 0.704 | 0.414 | 0.704 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.208 | 1.713 | 1.206 | 1.713 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.260 | 3.811 | 3.185 | 3.811 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.253 | 0.272 | 0.244 | 0.272 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.828 | 3.534 | 2.774 | 3.534 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 169.996 | 180.070 | 164.560 | 180.070 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1539.143 | 1571.423 | 1492.368 | 1571.423 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.162 | 0.120 | 0.162 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.069 | 2.138 | 2.058 | 2.138 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.035 | 0.016 | 0.035 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.403 | 0.411 | 0.391 | 0.411 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.116 | 1.503 | 1.029 | 1.503 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.065 | 3.243 | 3.003 | 3.243 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.257 | 0.293 | 0.249 | 0.293 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.706 | 2.719 | 2.650 | 2.719 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.097 | 0.150 | 0.093 | 0.150 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.923 | 0.946 | 0.918 | 0.946 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 194.783 | 203.207 | 193.839 | 203.207 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1465.078 | 1536.007 | 1455.769 | 1536.007 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 183.918 | 198.873 | 180.405 | 198.873 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1478.955 | 1539.019 | 1436.648 | 1539.019 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.196 | 0.299 | 0.185 | 0.299 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.609 | 3.752 | 3.584 | 3.752 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.028 | 0.038 | 0.020 | 0.038 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.181 | 1.210 | 1.169 | 1.210 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.177 | 5.602 | 4.838 | 5.602 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 30.856 | 31.263 | 30.756 | 31.263 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 6.260 | 8.000 | 5.725 | 8.000 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 30.008 | 30.977 | 29.588 | 30.977 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 4.965 | 5.537 | 4.896 | 5.537 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 26.226 | 27.165 | 24.828 | 27.165 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 1.020 | 1.091 | 0.927 | 1.091 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.367 | 4.430 | 4.349 | 4.430 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.016 | 0.012 | 0.016 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.502 | 1.345 | 0.474 | 1.345 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 180.436 | 203.842 | 177.640 | 203.842 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1540.206 | 1643.324 | 1496.927 | 1643.324 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 164.654 | 178.396 | 163.306 | 178.396 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1525.626 | 2098.599 | 1510.503 | 2098.599 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.135 | 0.147 | 0.100 | 0.147 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.188 | 2.301 | 2.166 | 2.301 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.029 | 0.045 | 0.021 | 0.045 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.496 | 0.549 | 0.470 | 0.549 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.525 | 1.832 | 1.378 | 1.832 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 14.860 | 33.374 | 14.320 | 33.374 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.558 | 1.802 | 1.466 | 1.802 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 14.131 | 16.445 | 13.557 | 16.445 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 2.375 | 3.070 | 1.776 | 3.070 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 10.361 | 11.374 | 9.814 | 11.374 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.350 | 0.429 | 0.279 | 0.429 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.184 | 3.787 | 3.136 | 3.787 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.012 | 0.016 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.509 | 0.578 | 0.432 | 0.578 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 180.471 | 187.333 | 178.852 | 187.333 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1525.394 | 1577.735 | 1475.883 | 1577.735 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 167.151 | 186.733 | 163.748 | 186.733 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1503.062 | 1536.835 | 1484.800 | 1536.835 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.119 | 0.211 | 0.086 | 0.211 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.219 | 2.811 | 2.166 | 2.811 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.031 | 0.046 | 0.016 | 0.046 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.485 | 0.805 | 0.447 | 0.805 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.427 | 1.565 | 1.405 | 1.565 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.678 | 13.067 | 12.561 | 13.067 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.509 | 3.193 | 1.384 | 3.193 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.984 | 12.417 | 11.858 | 12.417 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.964 | 2.592 | 1.738 | 2.592 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 9.471 | 10.025 | 8.940 | 10.025 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.287 | 0.810 | 0.260 | 0.810 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.169 | 3.372 | 3.118 | 3.372 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.017 | 0.012 | 0.017 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.483 | 0.516 | 0.464 | 0.516 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 316.565 | 393.656 | 300.383 | 393.656 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1937.807 | 2046.618 | 1831.974 | 2046.618 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 168.611 | 184.358 | 166.106 | 184.358 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1619.093 | 1810.907 | 1536.262 | 1810.907 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.131 | 0.237 | 0.110 | 0.237 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.262 | 2.550 | 2.188 | 2.550 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.050 | 0.062 | 0.021 | 0.062 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.493 | 0.615 | 0.471 | 0.615 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 107.267 | 309.482 | 103.317 | 309.482 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 404.246 | 461.759 | 399.718 | 461.759 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 116.273 | 145.313 | 104.614 | 145.313 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 403.703 | 412.033 | 393.507 | 412.033 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 106.112 | 120.293 | 104.853 | 120.293 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 401.992 | 436.739 | 396.887 | 436.739 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.305 | 0.334 | 0.276 | 0.334 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.843 | 5.244 | 3.406 | 5.244 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 170.427 | 174.421 | 162.437 | 174.421 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1666.107 | 1744.783 | 1627.437 | 1744.783 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.163 | 0.173 | 0.118 | 0.173 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.120 | 2.786 | 2.058 | 2.786 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.027 | 0.022 | 0.027 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.419 | 0.573 | 0.412 | 0.573 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.954 | 2.260 | 1.796 | 2.260 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.870 | 11.130 | 7.130 | 11.130 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.268 | 0.327 | 0.249 | 0.327 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.694 | 4.285 | 2.624 | 4.285 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 167.032 | 186.534 | 164.807 | 186.534 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1635.015 | 1690.955 | 1588.295 | 1690.955 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.185 | 0.134 | 0.185 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.601 | 3.200 | 2.518 | 3.200 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.016 | 0.021 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.453 | 0.527 | 0.452 | 0.527 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.843 | 21.792 | 3.819 | 21.792 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 22.900 | 23.416 | 22.877 | 23.416 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.323 | 0.386 | 0.295 | 0.386 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 3.298 | 3.738 | 2.952 | 3.738 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.078 | 0.191 | 0.050 | 0.191 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.531 | 0.598 | 0.516 | 0.598 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 206.918 | 968.018 | 196.685 | 968.018 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1501.980 | 1559.644 | 1479.827 | 1559.644 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 184.357 | 218.747 | 171.856 | 218.747 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1441.770 | 1498.243 | 1441.755 | 1498.243 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.181 | 0.219 | 0.136 | 0.219 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.609 | 3.764 | 3.607 | 3.764 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.036 | 0.136 | 0.031 | 0.136 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.675 | 0.838 | 0.672 | 0.838 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.231 | 4.406 | 3.000 | 4.406 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 49.706 | 60.491 | 49.600 | 60.491 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.341 | 3.792 | 3.071 | 3.792 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 50.618 | 55.834 | 49.009 | 55.834 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 4.713 | 5.923 | 3.773 | 5.923 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 46.214 | 47.499 | 45.915 | 47.499 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.299 | 0.316 | 0.283 | 0.316 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.824 | 6.961 | 4.695 | 6.961 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.914 | 163.284 | 161.421 | 163.284 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1509.450 | 1548.886 | 1502.058 | 1548.886 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.206 | 0.191 | 0.206 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.846 | 4.301 | 3.730 | 4.301 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.016 | 0.024 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.696 | 0.711 | 0.694 | 0.711 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.249 | 2.763 | 2.213 | 2.763 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.828 | 9.975 | 7.895 | 9.975 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.298 | 0.303 | 0.277 | 0.303 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.893 | 5.148 | 4.730 | 5.148 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.555 | 175.456 | 164.089 | 175.456 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1464.069 | 1500.903 | 1450.392 | 1500.903 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.197 | 0.164 | 0.197 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.857 | 3.955 | 3.824 | 3.955 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.018 | 0.021 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.829 | 0.831 | 0.814 | 0.831 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.746 | 3.016 | 2.546 | 3.016 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.368 | 9.605 | 9.276 | 9.605 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.542 | 1.343 | 0.496 | 1.343 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.694 | 4.834 | 4.684 | 4.834 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.117 | 0.137 | 0.104 | 0.137 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.654 | 0.901 | 0.654 | 0.901 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 170.868 | 172.025 | 170.843 | 172.025 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1477.152 | 1561.764 | 1452.039 | 1561.764 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 163.427 | 165.449 | 161.837 | 165.449 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1440.513 | 1545.750 | 1429.448 | 1545.750 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.158 | 0.162 | 0.124 | 0.162 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.958 | 4.187 | 3.919 | 4.187 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.034 | 0.026 | 0.034 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.872 | 0.897 | 0.848 | 0.897 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.151 | 2.439 | 2.073 | 2.439 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 16.862 | 19.215 | 16.037 | 19.215 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.244 | 2.292 | 2.240 | 2.292 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 14.062 | 16.899 | 14.007 | 16.899 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.510 | 3.264 | 2.178 | 3.264 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.503 | 13.972 | 9.316 | 13.972 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.495 | 0.509 | 0.493 | 0.509 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.743 | 4.954 | 4.730 | 4.954 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.045 | 0.070 | 0.038 | 0.070 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.541 | 0.637 | 0.540 | 0.637 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 166.799 | 169.707 | 164.342 | 169.707 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1456.849 | 1507.244 | 1437.662 | 1507.244 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 160.209 | 160.625 | 160.124 | 160.625 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1467.930 | 1477.463 | 1441.681 | 1477.463 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.149 | 0.170 | 0.130 | 0.170 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.718 | 3.776 | 3.626 | 3.776 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.196 | 0.025 | 0.196 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.645 | 0.666 | 0.640 | 0.666 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.619 | 1.845 | 1.233 | 1.845 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.203 | 13.471 | 13.053 | 13.471 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.405 | 1.441 | 1.350 | 1.441 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.400 | 12.507 | 12.303 | 12.507 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.906 | 2.690 | 1.881 | 2.690 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.734 | 8.095 | 7.669 | 8.095 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.278 | 0.372 | 0.260 | 0.372 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.790 | 4.888 | 4.782 | 4.888 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.354 | 178.568 | 160.561 | 178.568 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1466.858 | 1516.976 | 1441.140 | 1516.976 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.161 | 0.133 | 0.161 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.116 | 2.163 | 2.113 | 2.163 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.033 | 0.018 | 0.033 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.446 | 0.455 | 0.417 | 0.455 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.818 | 1.989 | 1.785 | 1.989 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 8.001 | 9.831 | 7.493 | 9.831 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.267 | 0.353 | 0.265 | 0.353 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.733 | 3.049 | 2.699 | 3.049 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.625 | 183.265 | 158.453 | 183.265 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1552.382 | 1564.089 | 1434.316 | 1564.089 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.132 | 0.162 | 0.125 | 0.162 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.231 | 2.501 | 2.146 | 2.501 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.033 | 0.018 | 0.033 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.509 | 0.524 | 0.485 | 0.524 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.811 | 4.069 | 3.628 | 4.069 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 22.982 | 26.711 | 22.425 | 26.711 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.278 | 0.300 | 0.272 | 0.300 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.952 | 3.106 | 2.884 | 3.106 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.427 | 170.978 | 160.404 | 170.978 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1452.305 | 1489.560 | 1425.378 | 1489.560 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.201 | 0.221 | 0.197 | 0.221 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.830 | 3.963 | 3.796 | 3.963 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.022 | 0.019 | 0.022 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.777 | 0.809 | 0.750 | 0.809 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.749 | 5.883 | 2.448 | 5.883 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.877 | 9.288 | 8.705 | 9.288 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.149 | 0.260 | 0.146 | 0.260 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.744 | 4.774 | 4.744 | 4.774 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.323 | 166.877 | 160.668 | 166.877 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1445.769 | 1504.228 | 1439.769 | 1504.228 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.193 | 0.219 | 0.187 | 0.219 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.873 | 4.042 | 3.811 | 4.042 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.016 | 0.022 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.807 | 0.842 | 0.800 | 0.842 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.637 | 4.810 | 2.369 | 4.810 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 9.324 | 9.764 | 9.039 | 9.764 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.155 | 0.176 | 0.146 | 0.176 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.855 | 5.067 | 4.750 | 5.067 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 188.169 | 199.783 | 170.289 | 199.783 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1447.854 | 1465.660 | 1443.296 | 1465.660 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.191 | 0.200 | 0.183 | 0.200 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.924 | 3.969 | 3.810 | 3.969 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.030 | 0.020 | 0.030 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.791 | 0.806 | 0.785 | 0.806 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.229 | 4.944 | 2.193 | 4.944 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.920 | 9.127 | 8.827 | 9.127 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.155 | 0.263 | 0.151 | 0.263 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.712 | 4.833 | 4.690 | 4.833 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 178.969 | 193.026 | 178.028 | 193.026 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1514.532 | 1682.568 | 1508.858 | 1682.568 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.190 | 0.239 | 0.190 | 0.239 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 4.633 | 88.722 | 3.894 | 88.722 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.025 | 0.018 | 0.025 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.854 | 1.179 | 0.787 | 1.179 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.196 | 5.310 | 2.862 | 5.310 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.536 | 10.270 | 8.968 | 10.270 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.181 | 0.262 | 0.177 | 0.262 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 5.184 | 5.642 | 4.906 | 5.642 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 183.095 | 186.061 | 180.656 | 186.061 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1623.456 | 1796.582 | 1582.445 | 1796.582 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.225 | 0.243 | 0.203 | 0.243 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 4.101 | 4.838 | 3.800 | 4.838 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.026 | 0.018 | 0.026 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.673 | 0.741 | 0.664 | 0.741 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 2.027 | 3.674 | 2.016 | 3.674 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 9.975 | 11.435 | 9.450 | 11.435 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.267 | 0.297 | 0.252 | 0.297 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 5.909 | 6.098 | 5.671 | 6.098 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 166.384 | 170.064 | 165.782 | 170.064 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1521.274 | 1624.918 | 1485.642 | 1624.918 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.223 | 0.193 | 0.223 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.755 | 5.410 | 3.635 | 5.410 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.690 | 0.769 | 0.664 | 0.769 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.748 | 1.872 | 1.717 | 1.872 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 10.206 | 18.160 | 8.148 | 18.160 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.234 | 0.303 | 0.212 | 0.303 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 5.245 | 7.847 | 5.042 | 7.847 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 170.360 | 176.173 | 169.328 | 176.173 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1439.939 | 1524.058 | 1433.580 | 1524.058 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.287 | 0.392 | 0.270 | 0.392 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.695 | 3.935 | 3.615 | 3.935 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.034 | 0.019 | 0.034 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.644 | 0.665 | 0.641 | 0.665 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.230 | 2.946 | 1.937 | 2.946 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 8.109 | 8.663 | 7.511 | 8.663 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.275 | 0.385 | 0.225 | 0.385 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.761 | 5.314 | 4.719 | 5.314 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 170.766 | 188.538 | 162.369 | 188.538 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1489.286 | 1601.256 | 1465.231 | 1601.256 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.213 | 0.216 | 0.191 | 0.216 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.727 | 3.800 | 3.644 | 3.800 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.037 | 0.019 | 0.037 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.650 | 0.725 | 0.643 | 0.725 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 2.207 | 2.613 | 1.866 | 2.613 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 8.558 | 9.125 | 7.728 | 9.125 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.219 | 0.345 | 0.218 | 0.345 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 5.066 | 5.438 | 4.854 | 5.438 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 169.572 | 186.335 | 163.701 | 186.335 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1490.502 | 1898.366 | 1477.192 | 1898.366 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.209 | 0.257 | 0.203 | 0.257 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.758 | 4.068 | 3.640 | 4.068 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.018 | 0.028 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.646 | 0.654 | 0.645 | 0.654 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.351 | 2.618 | 2.165 | 2.618 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 8.453 | 9.365 | 8.096 | 9.365 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.234 | 0.340 | 0.195 | 0.340 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 5.186 | 5.644 | 5.010 | 5.644 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.205 | 180.974 | 161.261 | 180.974 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1588.139 | 1629.115 | 1489.060 | 1629.115 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.209 | 0.194 | 0.209 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 4.019 | 4.151 | 3.804 | 4.151 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.017 | 0.024 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.665 | 0.763 | 0.637 | 0.763 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.462 | 2.638 | 2.283 | 2.638 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 9.843 | 10.838 | 8.394 | 10.838 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.225 | 0.441 | 0.223 | 0.441 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 5.206 | 6.045 | 4.970 | 6.045 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.130 | 0.235 | 0.096 | 0.235 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.940 | 0.957 | 0.934 | 0.957 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 214.584 | 220.427 | 209.582 | 220.427 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1631.538 | 1730.396 | 1607.092 | 1730.396 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 24.269 | 24.883 | 23.842 | 24.883 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 130.855 | 133.652 | 130.006 | 133.652 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 24.496 | 28.576 | 24.214 | 28.576 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 130.507 | 135.127 | 130.252 | 135.127 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 24.271 | 25.154 | 24.068 | 25.154 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 114.294 | 125.024 | 104.356 | 125.024 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 1.971 | 2.307 | 1.859 | 2.307 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 27.331 | 27.655 | 27.129 | 27.655 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.671 | 177.648 | 160.491 | 177.648 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1672.127 | 2357.681 | 1653.963 | 2357.681 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.182 | 0.206 | 0.177 | 0.206 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.283 | 2.446 | 2.206 | 2.446 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.019 | 0.027 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.479 | 0.567 | 0.474 | 0.567 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 158.710 | 170.546 | 158.674 | 170.546 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 625.486 | 656.740 | 622.200 | 656.740 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.301 | 0.316 | 0.299 | 0.316 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.191 | 3.601 | 3.058 | 3.601 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 174.934 | 181.665 | 163.484 | 181.665 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1614.497 | 1740.454 | 1593.424 | 1740.454 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.190 | 0.202 | 0.183 | 0.202 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.332 | 2.469 | 2.231 | 2.469 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.031 | 0.017 | 0.031 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.495 | 0.519 | 0.493 | 0.519 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.472 | 4.654 | 4.353 | 4.654 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 23.339 | 23.590 | 23.088 | 23.590 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.321 | 0.433 | 0.311 | 0.433 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.447 | 4.000 | 3.309 | 4.000 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 180.245 | 195.089 | 160.760 | 195.089 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1465.832 | 1539.643 | 1437.883 | 1539.643 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.167 | 0.203 | 0.162 | 0.203 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.908 | 2.075 | 1.882 | 2.075 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.018 | 0.024 | 0.016 | 0.024 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.329 | 0.346 | 0.328 | 0.346 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.533 | 1.085 | 0.485 | 1.085 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 3.006 | 3.061 | 2.864 | 3.061 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.214 | 0.342 | 0.211 | 0.342 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.660 | 2.856 | 2.635 | 2.856 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 170.758 | 174.076 | 168.710 | 174.076 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1505.361 | 1567.726 | 1455.085 | 1567.726 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.150 | 0.181 | 0.148 | 0.181 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.942 | 2.331 | 1.903 | 2.331 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.019 | 0.022 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.329 | 0.386 | 0.318 | 0.386 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.872 | 1.781 | 0.867 | 1.781 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 6.939 | 10.230 | 6.328 | 10.230 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.160 | 0.202 | 0.156 | 0.202 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.905 | 3.344 | 2.787 | 3.344 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 207.105 | 290.507 | 181.856 | 290.507 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1639.701 | 1964.228 | 1583.995 | 1964.228 | n/a |
| mcmc-flat-mixed-components | model-json-decode | effect-prophet | 6 | 1.446 | 1.690 | 1.420 | 1.690 | n/a |
| mcmc-flat-mixed-components | model-json-decode | python-prophet | 6 | 10.278 | 10.728 | 9.923 | 10.728 | n/a |
| mcmc-flat-mixed-components | model-json-encode | effect-prophet | 6 | 0.177 | 0.250 | 0.159 | 0.250 | n/a |
| mcmc-flat-mixed-components | model-json-encode | python-prophet | 6 | 13.960 | 18.184 | 13.080 | 18.184 | n/a |
| mcmc-flat-mixed-components | warm-fit | effect-prophet | 6 | 658.252 | 728.538 | 644.494 | 728.538 | n/a |
| mcmc-flat-mixed-components | warm-fit | python-prophet | 6 | 545.415 | 667.590 | 526.237 | 667.590 | n/a |
| mcmc-flat-mixed-components | warm-predict | effect-prophet | 6 | 0.353 | 0.582 | 0.332 | 0.582 | n/a |
| mcmc-flat-mixed-components | warm-predict | python-prophet | 6 | 6.857 | 7.328 | 6.487 | 7.328 | n/a |
| mcmc-flat-mixed-components | warm-uncertainty | effect-prophet | 6 | 2.388 | 2.921 | 2.337 | 2.921 | 154.8 |
| mcmc-flat-mixed-components | warm-uncertainty | python-prophet | 6 | 152.375 | 218.496 | 140.492 | 218.496 | 257.2 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 295.112 | 300.791 | 293.251 | 300.791 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1986.614 | 2169.345 | 1957.767 | 2169.345 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 169.219 | 188.952 | 167.910 | 188.952 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1580.202 | 1623.651 | 1558.717 | 1623.651 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.144 | 0.231 | 0.131 | 0.231 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.160 | 2.546 | 2.081 | 2.546 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.018 | 0.038 | 0.017 | 0.038 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.475 | 0.529 | 0.433 | 0.529 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.028 | 0.038 | 0.026 | 0.038 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.542 | 0.631 | 0.479 | 0.631 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.597 | 4.845 | 4.549 | 4.845 | 143.3 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 126.844 | 223.270 | 121.928 | 223.270 | 257.2 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 172.943 | 197.173 | 170.408 | 197.173 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1572.094 | 1716.194 | 1540.576 | 1716.194 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.915 | 177.135 | 163.746 | 177.135 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1518.909 | 1620.788 | 1504.880 | 1620.788 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.218 | 0.303 | 0.177 | 0.303 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.732 | 4.089 | 3.568 | 4.089 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.021 | 0.029 | 0.018 | 0.029 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.686 | 0.739 | 0.642 | 0.739 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.056 | 0.127 | 0.050 | 0.127 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.525 | 0.558 | 0.518 | 0.558 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.218 | 2.126 | 0.965 | 2.126 | 138.7 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 71.967 | 73.644 | 71.713 | 73.644 | 257.2 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 177.667 | 428.997 | 174.499 | 428.997 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1491.213 | 1570.282 | 1475.576 | 1570.282 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 173.345 | 204.503 | 172.360 | 204.503 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1455.008 | 1491.950 | 1443.508 | 1491.950 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.307 | 0.396 | 0.176 | 0.396 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.848 | 3.959 | 3.816 | 3.959 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.023 | 0.032 | 0.017 | 0.032 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.830 | 0.869 | 0.797 | 0.869 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.110 | 0.166 | 0.080 | 0.166 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.646 | 0.677 | 0.630 | 0.677 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.855 | 1.038 | 0.837 | 1.038 | 143.1 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 20.270 | 33.223 | 19.729 | 33.223 | 257.2 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 241.667 | 263.564 | 238.466 | 263.564 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1902.718 | 2359.023 | 1862.986 | 2359.023 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.200 | 0.225 | 0.179 | 0.225 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.010 | 1.100 | 0.951 | 1.100 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 18.705 | 21.800 | 17.977 | 21.800 | 198.9 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 285.787 | 382.862 | 263.200 | 382.862 | 257.2 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 105.774 | 106.620 | 104.482 | 106.620 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 397.663 | 420.747 | 394.080 | 420.747 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.239 | 8.042 | 6.082 | 8.042 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 9.676 | 10.417 | 8.752 | 10.417 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `0068e212d593db1dc80d41477a9b2105398faec4`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-flat-additive`, `country-explicit-us-flat-additive`, `country-us-flat-multiplicative`, `country-explicit-us-flat-multiplicative`, `country-boundary-flat`, `country-empty-bv-flat`, `country-explicit-empty-flat`, `country-estimated-sg-flat`, `country-partial-in-flat`, `country-mixed-us-flat`, `country-none-flat-730`, `country-se-flat-730`, `country-explicit-se-flat-730`, `country-cn-flat-730`, `country-explicit-cn-flat-730`, `country-none-flat-2190`, `country-se-flat-2190`, `country-explicit-se-flat-2190`, `country-cn-flat-2190`, `country-explicit-cn-flat-2190`, `country-none-flat-2190-batch-32`, `country-se-flat-2190-batch-32`, `country-explicit-se-flat-2190-batch-32`, `country-uncertainty-us-flat`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `anomalies-flat-defaults-99`, `warm-start-flat-defaults-7-new-rows`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `evaluation-flat-large-months-metrics`, `evaluation-flat-large-parallel`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`, `flat-regressor-model`, `uncertainty-flat-regressor-model-intervals-1000`, `evaluation-flat-regressor-model-point`, `evaluation-flat-regressor-model-intervals`, `mcmc-flat-mixed-components`
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

