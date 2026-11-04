# Effect Prophet benchmark — 2026-11-04T151056-786Z-d4edbd51

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
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.578 | 11.132 | 10.457 | 11.132 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 143.788 | 156.137 | 131.006 | 156.137 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 1.929 | 2.670 | 1.734 | 2.670 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.765 | 7.419 | 6.575 | 7.419 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.493 | 6.673 | 6.452 | 6.673 | 151.8 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 123.556 | 150.789 | 122.969 | 150.789 | 256.7 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.014 | 0.013 | 0.014 | 140.4 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.448 | 0.523 | 0.433 | 0.523 | 256.7 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 217.638 | 231.464 | 210.040 | 231.464 | 155.5 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1681.907 | 1849.042 | 1663.127 | 1849.042 | 256.7 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 167.745 | 182.570 | 160.550 | 182.570 | 169.4 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1606.247 | 1675.743 | 1588.845 | 1675.743 | 256.7 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.779 | 1.387 | 0.709 | 1.387 | 166.5 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.357 | 3.592 | 3.308 | 3.592 | 256.7 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.096 | 0.125 | 0.079 | 0.125 | 157.5 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.537 | 0.555 | 0.516 | 0.555 | 256.7 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.337 | 22.605 | 21.021 | 22.605 | 155.2 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 77.205 | 78.888 | 75.306 | 78.888 | 256.7 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 21.959 | 23.052 | 21.501 | 23.052 | 154.2 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 77.667 | 80.772 | 74.956 | 80.772 | 256.7 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 22.747 | 23.725 | 21.796 | 23.725 | 150.2 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 68.542 | 71.716 | 67.526 | 71.716 | 256.7 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.263 | 0.324 | 0.242 | 0.324 | 151.5 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.325 | 6.160 | 5.281 | 6.160 | 256.7 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 192.252 | 199.502 | 186.017 | 199.502 | 244.9 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1605.807 | 1651.569 | 1604.460 | 1651.569 | 256.7 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 3.208 | 4.004 | 2.892 | 4.004 | 238.0 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.182 | 9.672 | 9.138 | 9.672 | 256.7 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.129 | 0.152 | 0.113 | 0.152 | 231.7 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.024 | 3.066 | 2.990 | 3.066 | 256.7 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.612 | 25.698 | 20.769 | 25.698 | 208.0 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 83.630 | 84.839 | 83.142 | 84.839 | 256.7 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.153 | 4.478 | 2.993 | 4.478 | 224.2 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.975 | 9.322 | 8.932 | 9.322 | 256.7 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 193.462 | 196.748 | 181.311 | 196.748 | 204.8 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1640.516 | 1730.160 | 1610.176 | 1730.160 | 256.7 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.815 | 2.468 | 1.698 | 2.468 | 201.8 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.998 | 5.129 | 4.948 | 5.129 | 256.7 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.117 | 0.125 | 0.111 | 0.125 | 199.2 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.247 | 1.280 | 1.238 | 1.280 | 256.7 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 9.113 | 10.978 | 7.216 | 10.978 | 172.8 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.823 | 25.335 | 24.716 | 25.335 | 256.7 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.741 | 3.869 | 2.522 | 3.869 | 197.7 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.115 | 7.328 | 6.945 | 7.328 | 256.7 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.014 | 0.011 | 0.014 | 132.5 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.462 | 0.499 | 0.453 | 0.499 | 256.7 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 170.817 | 174.819 | 169.690 | 174.819 | 148.3 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1602.986 | 1613.069 | 1593.921 | 1613.069 | 256.7 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 162.353 | 170.361 | 159.004 | 170.361 | 151.6 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1589.920 | 1689.790 | 1573.139 | 1689.790 | 256.7 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.276 | 0.953 | 0.242 | 0.953 | 151.6 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.111 | 2.343 | 2.046 | 2.343 | 256.7 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.044 | 0.078 | 0.034 | 0.078 | 149.1 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.422 | 0.458 | 0.399 | 0.458 | 256.7 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.327 | 1.377 | 1.293 | 1.377 | 148.2 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 14.405 | 14.951 | 13.500 | 14.951 | 256.7 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.503 | 1.722 | 1.427 | 1.722 | 148.2 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.582 | 12.745 | 12.493 | 12.745 | 256.7 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.000 | 2.232 | 1.956 | 2.232 | 140.8 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.454 | 9.704 | 9.375 | 9.704 | 256.7 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.170 | 0.182 | 0.163 | 0.182 | 142.6 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.209 | 3.389 | 3.158 | 3.389 | 256.7 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.047 | 0.109 | 0.031 | 0.109 | 147.0 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.571 | 0.580 | 0.567 | 0.580 | 256.7 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 204.625 | 206.886 | 201.923 | 206.886 | 195.8 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1655.264 | 1681.964 | 1635.005 | 1681.964 | 256.7 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 175.228 | 195.228 | 172.288 | 195.228 | 201.3 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1593.251 | 1778.740 | 1583.037 | 1778.740 | 256.7 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 0.773 | 0.871 | 0.758 | 0.871 | 200.6 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.132 | 3.229 | 3.085 | 3.229 | 256.7 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.088 | 0.125 | 0.077 | 0.125 | 200.2 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.506 | 0.534 | 0.488 | 0.534 | 256.7 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 19.687 | 21.411 | 19.294 | 21.411 | 188.6 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 68.153 | 69.400 | 67.726 | 69.400 | 256.7 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 19.698 | 21.462 | 19.636 | 21.462 | 168.3 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 68.006 | 69.545 | 66.600 | 69.545 | 256.7 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 18.851 | 20.444 | 18.545 | 20.444 | 154.3 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 61.949 | 63.176 | 61.543 | 63.176 | 256.7 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.780 | 2.176 | 1.583 | 2.176 | 157.1 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.169 | 5.245 | 5.123 | 5.245 | 256.7 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 187.760 | 206.999 | 183.109 | 206.999 | 236.4 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1451.073 | 1483.824 | 1440.947 | 1483.824 | 256.7 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.332 | 2.942 | 2.019 | 2.942 | 230.7 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.129 | 10.242 | 10.003 | 10.242 | 256.7 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.030 | 0.082 | 0.027 | 0.082 | 225.4 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.348 | 3.408 | 3.295 | 3.408 | 256.7 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 20.404 | 29.798 | 19.774 | 29.798 | 202.9 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 79.439 | 92.978 | 79.315 | 92.978 | 256.7 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.272 | 4.596 | 2.599 | 4.596 | 217.2 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.160 | 9.359 | 9.043 | 9.359 | 256.7 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 176.634 | 196.110 | 175.268 | 196.110 | 197.6 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1469.318 | 1536.179 | 1432.170 | 1536.179 | 256.7 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.849 | 1.465 | 0.823 | 1.465 | 196.1 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.870 | 5.962 | 5.807 | 5.962 | 256.7 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.028 | 0.046 | 0.023 | 0.046 | 193.2 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.511 | 1.538 | 1.479 | 1.538 | 256.7 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.537 | 7.569 | 5.471 | 7.569 | 151.6 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.978 | 21.403 | 20.720 | 21.403 | 256.7 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 3.760 | 4.451 | 2.212 | 4.451 | 180.5 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.747 | 21.065 | 6.497 | 21.065 | 256.7 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.017 | 0.014 | 0.017 | 134.3 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.465 | 0.498 | 0.451 | 0.498 | 256.7 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 175.093 | 191.702 | 171.796 | 191.702 | 149.1 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1424.100 | 1496.145 | 1417.355 | 1496.145 | 256.7 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 161.984 | 163.547 | 161.400 | 163.547 | 149.5 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1419.293 | 1440.233 | 1410.247 | 1440.233 | 256.7 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.084 | 0.133 | 0.078 | 0.133 | 149.3 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.056 | 2.179 | 1.989 | 2.179 | 256.7 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.017 | 0.023 | 0.016 | 0.023 | 149.1 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.437 | 0.459 | 0.423 | 0.459 | 256.7 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.100 | 1.324 | 1.067 | 1.324 | 148.9 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.337 | 13.572 | 11.207 | 13.572 | 256.7 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.212 | 3.374 | 1.122 | 3.374 | 148.9 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.913 | 11.372 | 10.737 | 11.372 | 256.7 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.751 | 2.289 | 1.553 | 2.289 | 141.6 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.693 | 9.319 | 8.095 | 9.319 | 256.7 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.122 | 0.160 | 0.119 | 0.160 | 143.0 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.638 | 2.669 | 2.622 | 2.669 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 182.822 | 209.469 | 178.655 | 209.469 | 195.2 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1450.407 | 1458.225 | 1440.804 | 1458.225 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 3.000 | 4.812 | 2.729 | 4.812 | 194.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.126 | 7.264 | 7.101 | 7.264 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.047 | 0.057 | 0.044 | 0.057 | 192.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.867 | 2.933 | 2.848 | 2.933 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 13.518 | 16.407 | 11.624 | 16.407 | 170.4 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 38.856 | 53.165 | 38.662 | 53.165 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.392 | 0.526 | 0.384 | 0.526 | 180.7 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.108 | 12.253 | 11.947 | 12.253 | 256.7 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 185.450 | 191.228 | 184.783 | 191.228 | 197.9 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1451.311 | 1465.208 | 1443.599 | 1465.208 | 256.7 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.226 | 3.554 | 3.097 | 3.554 | 195.3 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.326 | 7.588 | 7.206 | 7.588 | 256.7 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.048 | 0.058 | 0.045 | 0.058 | 193.1 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.885 | 2.957 | 2.849 | 2.957 | 256.7 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 15.998 | 17.893 | 11.598 | 17.893 | 185.9 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.292 | 53.781 | 39.749 | 53.781 | 256.7 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.976 | 2.567 | 1.825 | 2.567 | 190.8 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.318 | 13.669 | 13.288 | 13.669 | 256.7 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 176.882 | 180.457 | 176.625 | 180.457 | 195.9 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1438.564 | 1545.040 | 1434.898 | 1545.040 | 256.7 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.765 | 3.444 | 2.321 | 3.444 | 194.2 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.195 | 5.320 | 5.180 | 5.320 | 256.7 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.032 | 0.039 | 0.031 | 0.039 | 175.9 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.450 | 1.467 | 1.430 | 1.467 | 256.7 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 6.174 | 6.815 | 5.475 | 6.815 | 154.2 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 19.074 | 19.981 | 19.006 | 19.981 | 256.7 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 1.999 | 2.917 | 1.981 | 2.917 | 162.4 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.952 | 9.236 | 8.784 | 9.236 | 256.7 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.013 | 0.018 | 140.7 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.466 | 0.480 | 0.455 | 0.480 | 256.7 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 187.517 | 196.467 | 184.367 | 196.467 | 155.4 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1479.072 | 1496.875 | 1471.494 | 1496.875 | 256.7 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 161.272 | 163.473 | 158.732 | 163.473 | 155.6 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1447.102 | 1461.177 | 1435.961 | 1461.177 | 256.7 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.422 | 0.499 | 0.400 | 0.499 | 155.6 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 4.003 | 4.149 | 3.951 | 4.149 | 256.7 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.022 | 0.029 | 0.019 | 0.029 | 155.4 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.702 | 0.731 | 0.692 | 0.731 | 256.7 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 12.861 | 13.240 | 12.763 | 13.240 | 155.3 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 47.403 | 47.711 | 47.113 | 47.711 | 256.7 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.217 | 13.554 | 13.053 | 13.554 | 152.4 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 48.309 | 50.506 | 47.497 | 50.506 | 256.7 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.813 | 15.294 | 13.350 | 15.294 | 151.7 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 42.409 | 42.950 | 42.110 | 42.950 | 256.7 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.170 | 0.239 | 0.149 | 0.239 | 151.8 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.900 | 5.046 | 4.710 | 5.046 | 256.7 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.013 | 0.012 | 0.013 | 139.5 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.464 | 0.469 | 0.439 | 0.469 | 256.7 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 172.267 | 179.238 | 171.470 | 179.238 | 154.2 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1447.141 | 1509.222 | 1441.074 | 1509.222 | 256.7 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.226 | 176.483 | 160.529 | 176.483 | 154.6 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1434.549 | 1457.586 | 1420.107 | 1457.586 | 256.7 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.400 | 0.416 | 0.394 | 0.416 | 154.4 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.995 | 4.417 | 3.875 | 4.417 | 256.7 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.025 | 0.034 | 0.021 | 0.034 | 154.2 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.714 | 0.844 | 0.681 | 0.844 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.487 | 2.631 | 2.466 | 2.631 | 154.1 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.813 | 18.998 | 18.322 | 18.998 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.754 | 3.013 | 2.693 | 3.013 | 151.5 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.637 | 20.282 | 17.537 | 20.282 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.351 | 4.627 | 2.786 | 4.627 | 150.6 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 12.978 | 14.229 | 12.917 | 14.229 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.201 | 0.248 | 0.154 | 0.248 | 150.6 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.649 | 4.751 | 4.602 | 4.751 | 256.7 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.047 | 0.067 | 0.037 | 0.067 | 138.7 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.522 | 0.605 | 0.495 | 0.605 | 256.7 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 198.159 | 207.305 | 196.304 | 207.305 | 169.9 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1638.128 | 1674.903 | 1632.989 | 1674.903 | 256.7 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 169.464 | 183.938 | 166.878 | 183.938 | 173.4 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1596.944 | 1823.115 | 1579.303 | 1823.115 | 256.7 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.823 | 0.957 | 0.782 | 0.957 | 170.0 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.282 | 4.427 | 4.177 | 4.427 | 256.7 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.105 | 0.118 | 0.095 | 0.118 | 170.0 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.735 | 0.740 | 0.700 | 0.740 | 256.7 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 17.763 | 18.084 | 17.735 | 18.084 | 166.0 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 65.341 | 66.909 | 62.054 | 66.909 | 256.7 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 16.942 | 17.951 | 16.898 | 17.951 | 152.7 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 61.205 | 62.196 | 60.588 | 62.196 | 256.7 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.569 | 19.172 | 17.203 | 19.172 | 151.2 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 55.249 | 56.439 | 54.541 | 56.439 | 256.7 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.225 | 0.232 | 0.217 | 0.232 | 151.3 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.197 | 6.268 | 6.118 | 6.268 | 256.7 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 172.879 | 194.565 | 165.739 | 194.565 | 170.8 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1445.385 | 1550.159 | 1430.225 | 1550.159 | 256.7 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.162 | 0.202 | 0.101 | 0.202 | 170.2 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.784 | 4.870 | 4.663 | 4.870 | 256.7 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.017 | 0.022 | 0.015 | 0.022 | 155.6 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.372 | 2.424 | 2.369 | 2.424 | 256.7 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.953 | 9.966 | 6.331 | 9.966 | 152.0 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 16.415 | 29.269 | 15.864 | 29.269 | 256.7 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.212 | 0.234 | 0.197 | 0.234 | 152.5 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.730 | 2.901 | 2.658 | 2.901 | 256.7 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 174.620 | 181.959 | 172.587 | 181.959 | 188.2 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1434.415 | 1446.261 | 1423.920 | 1446.261 | 256.7 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.133 | 0.171 | 0.099 | 0.171 | 185.3 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.842 | 4.974 | 4.819 | 4.974 | 256.7 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.015 | 0.031 | 0.014 | 0.031 | 170.7 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.390 | 2.538 | 2.338 | 2.538 | 256.7 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.978 | 8.729 | 6.252 | 8.729 | 152.7 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 15.753 | 28.872 | 15.254 | 28.872 | 256.7 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 2.420 | 3.043 | 2.307 | 3.043 | 163.4 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.868 | 2.930 | 2.804 | 2.930 | 256.7 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 170.330 | 171.057 | 168.395 | 171.057 | 152.5 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1428.991 | 1456.010 | 1424.573 | 1456.010 | 256.7 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.094 | 0.166 | 0.071 | 0.166 | 151.8 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 3.314 | 3.689 | 3.185 | 3.689 | 256.7 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.013 | 0.015 | 0.013 | 0.015 | 151.6 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.030 | 1.051 | 1.020 | 1.051 | 256.7 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.940 | 4.562 | 2.993 | 4.562 | 150.4 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.117 | 9.185 | 8.033 | 9.185 | 256.7 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.507 | 1.885 | 1.420 | 1.885 | 151.1 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.858 | 3.149 | 2.778 | 3.149 | 256.7 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 142.0 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.446 | 0.464 | 0.421 | 0.464 | 256.7 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 179.923 | 183.549 | 176.288 | 183.549 | 162.0 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1597.954 | 1634.104 | 1586.387 | 1634.104 | 256.7 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 166.068 | 167.796 | 160.381 | 167.796 | 174.5 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1598.436 | 1624.745 | 1563.917 | 1624.745 | 256.7 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.292 | 2.296 | 0.753 | 2.296 | 174.4 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.168 | 3.308 | 3.025 | 3.308 | 256.7 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.126 | 0.154 | 0.118 | 0.154 | 165.6 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.545 | 0.619 | 0.525 | 0.619 | 256.7 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.188 | 3.584 | 3.066 | 3.584 | 158.6 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 20.817 | 21.090 | 20.625 | 21.090 | 256.7 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.407 | 4.519 | 3.266 | 4.519 | 156.9 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.456 | 24.721 | 20.395 | 24.721 | 256.7 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 3.577 | 4.200 | 3.531 | 4.200 | 151.9 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.248 | 16.140 | 15.197 | 16.140 | 256.7 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.245 | 1.012 | 0.176 | 1.012 | 156.0 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.870 | 4.955 | 4.738 | 4.955 | 256.7 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 183.695 | 186.508 | 180.873 | 186.508 | 209.2 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1603.599 | 1688.045 | 1595.111 | 1688.045 | 256.7 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 5.017 | 5.387 | 4.832 | 5.387 | 205.2 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.937 | 6.131 | 5.871 | 6.131 | 256.7 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.347 | 0.436 | 0.280 | 0.436 | 199.7 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.538 | 2.564 | 2.450 | 2.564 | 256.7 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 14.372 | 20.951 | 12.542 | 20.951 | 195.3 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 43.505 | 46.156 | 42.559 | 46.156 | 256.7 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.511 | 0.621 | 0.491 | 0.621 | 197.8 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.244 | 7.417 | 7.227 | 7.417 | 256.7 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 191.007 | 193.604 | 189.802 | 193.604 | 211.1 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1615.500 | 1752.096 | 1605.843 | 1752.096 | 256.7 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.843 | 5.753 | 4.510 | 5.753 | 206.4 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 6.030 | 6.154 | 5.921 | 6.154 | 256.7 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.297 | 0.319 | 0.271 | 0.319 | 201.9 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.521 | 2.577 | 2.488 | 2.577 | 256.7 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 13.989 | 19.548 | 13.100 | 19.548 | 191.9 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 42.759 | 43.159 | 42.628 | 43.159 | 256.7 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.201 | 3.005 | 2.083 | 3.005 | 198.8 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.888 | 9.043 | 8.723 | 9.043 | 256.7 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 181.463 | 183.070 | 180.185 | 183.070 | 201.3 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1617.348 | 1651.385 | 1600.232 | 1651.385 | 256.7 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 3.033 | 3.989 | 2.932 | 3.989 | 199.1 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.172 | 4.333 | 4.109 | 4.333 | 256.7 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.267 | 1.057 | 0.255 | 1.057 | 195.9 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.132 | 1.144 | 1.123 | 1.144 | 256.7 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 9.164 | 9.959 | 7.810 | 9.959 | 173.8 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.723 | 23.396 | 21.200 | 23.396 | 256.7 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.329 | 2.998 | 2.150 | 2.998 | 193.6 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.727 | 9.078 | 8.664 | 9.078 | 256.7 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 192.101 | 195.178 | 190.939 | 195.178 | 152.5 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1657.854 | 1728.026 | 1652.558 | 1728.026 | 256.7 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 169.464 | 185.073 | 166.129 | 185.073 | 156.5 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1608.799 | 1705.062 | 1603.850 | 1705.062 | 256.7 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.219 | 4.718 | 1.061 | 4.718 | 154.7 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.943 | 3.979 | 3.881 | 3.979 | 256.7 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.089 | 0.121 | 0.084 | 0.121 | 152.6 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.700 | 0.749 | 0.676 | 0.749 | 256.7 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.017 | 0.013 | 0.017 | 141.4 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.477 | 0.510 | 0.442 | 0.510 | 256.7 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.344 | 0.423 | 0.306 | 0.423 | 146.1 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.612 | 15.100 | 14.572 | 15.100 | 256.7 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.026 | 0.011 | 0.026 | 140.4 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.492 | 0.445 | 0.492 | 256.7 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 192.041 | 202.910 | 189.849 | 202.910 | 156.6 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1647.964 | 1814.118 | 1642.304 | 1814.118 | 256.7 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.458 | 180.603 | 161.235 | 180.603 | 168.9 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1612.097 | 1702.751 | 1604.253 | 1702.751 | 256.7 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 1.166 | 1.265 | 1.085 | 1.265 | 166.2 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 3.962 | 4.106 | 3.880 | 4.106 | 256.7 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.128 | 0.168 | 0.106 | 0.168 | 157.2 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.707 | 0.717 | 0.692 | 0.717 | 256.7 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.616 | 13.930 | 13.339 | 13.930 | 156.4 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 52.628 | 56.009 | 52.131 | 56.009 | 256.7 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.911 | 14.307 | 13.515 | 14.307 | 155.2 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 52.105 | 53.644 | 51.404 | 53.644 | 256.7 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.234 | 16.418 | 13.831 | 16.418 | 151.4 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 45.618 | 46.245 | 45.017 | 46.245 | 256.7 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.225 | 0.319 | 0.210 | 0.319 | 151.4 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.568 | 5.712 | 5.436 | 5.712 | 256.7 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | 141.0 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.468 | 0.488 | 0.442 | 0.488 | 256.7 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 178.021 | 183.862 | 173.068 | 183.862 | 159.1 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1641.467 | 1806.643 | 1599.732 | 1806.643 | 256.7 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 166.428 | 172.293 | 163.965 | 172.293 | 171.7 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1602.826 | 1639.319 | 1593.979 | 1639.319 | 256.7 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 1.160 | 1.233 | 1.131 | 1.233 | 168.9 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.914 | 4.107 | 3.895 | 4.107 | 256.7 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.118 | 0.146 | 0.110 | 0.146 | 159.9 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.685 | 0.816 | 0.666 | 0.816 | 256.7 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.225 | 4.091 | 3.079 | 4.091 | 158.9 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.522 | 30.244 | 22.912 | 30.244 | 256.7 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.350 | 3.490 | 3.338 | 3.490 | 157.9 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 23.668 | 28.530 | 22.482 | 28.530 | 256.7 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.680 | 5.265 | 3.493 | 5.265 | 154.0 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.740 | 18.588 | 16.248 | 18.588 | 256.7 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.256 | 0.316 | 0.232 | 0.316 | 154.0 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.576 | 5.845 | 5.491 | 5.845 | 256.7 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.883 | 8.555 | 7.434 | 8.555 | 149.6 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 51.780 | 57.613 | 48.732 | 57.613 | 256.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.187 | 1.393 | 1.145 | 1.393 | 151.6 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.185 | 10.554 | 10.083 | 10.554 | 256.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.375 | 0.385 | 0.368 | 0.385 | 151.1 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.183 | 5.339 | 5.079 | 5.339 | 256.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.976 | 2.020 | 1.962 | 2.020 | 152.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.432 | 5.562 | 5.377 | 5.562 | 256.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.461 | 0.661 | 0.449 | 0.661 | 147.3 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.594 | 5.672 | 5.470 | 5.672 | 256.7 |
| evaluation-flat-large-parallel | evaluation-point-processes | python-prophet | 4 | 1538.942 | 1553.879 | 1498.679 | 1553.879 | 256.7 |
| evaluation-flat-large-parallel | evaluation-point-threads | python-prophet | 4 | 198.296 | 202.575 | 197.910 | 202.575 | 256.7 |
| evaluation-flat-large-parallel | evaluation-point | effect-prophet | 4 | 22.634 | 25.878 | 20.717 | 25.878 | 185.3 |
| evaluation-flat-large-parallel | evaluation-point | python-prophet | 4 | 179.962 | 199.433 | 178.523 | 199.433 | 256.7 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 187.522 | 192.711 | 186.580 | 192.711 | 150.2 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1465.466 | 1554.661 | 1455.980 | 1554.661 | 256.7 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.670 | 3.170 | 2.632 | 3.170 | 149.7 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.381 | 1.387 | 1.371 | 1.387 | 256.7 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.116 | 0.178 | 0.112 | 0.178 | 131.3 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.534 | 0.567 | 0.533 | 0.567 | 256.7 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.093 | 0.107 | 0.084 | 0.107 | 149.1 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.319 | 5.470 | 5.305 | 5.470 | 256.7 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 2.327 | 3.152 | 1.895 | 3.152 | 135.1 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.785 | 0.832 | 0.767 | 0.832 | 256.7 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.444 | 8.585 | 5.744 | 8.585 | 148.8 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 39.020 | 40.207 | 38.949 | 40.207 | 256.7 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 5.031 | 8.538 | 4.828 | 8.538 | 153.4 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 63.285 | 68.410 | 62.646 | 68.410 | 256.7 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 182.188 | 187.065 | 180.359 | 187.065 | 154.6 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1478.170 | 1493.459 | 1465.994 | 1493.459 | 256.7 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.224 | 1.226 | 1.195 | 1.226 | 154.5 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.470 | 1.514 | 1.466 | 1.514 | 256.7 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.038 | 0.051 | 0.034 | 0.051 | 130.4 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.438 | 0.512 | 0.423 | 0.512 | 256.7 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.099 | 0.114 | 0.098 | 0.114 | 154.5 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.401 | 5.465 | 5.362 | 5.465 | 256.7 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.365 | 1.562 | 1.341 | 1.562 | 135.6 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.803 | 0.821 | 0.790 | 0.821 | 256.7 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.304 | 4.972 | 4.295 | 4.972 | 151.1 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.864 | 49.878 | 46.744 | 49.878 | 256.7 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 1.999 | 2.156 | 1.992 | 2.156 | 154.9 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.536 | 20.910 | 13.454 | 20.910 | 256.7 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.281 | 0.302 | 0.269 | 0.302 | 181.2 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 256.7 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.325 | 0.380 | 0.284 | 0.380 | 171.4 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 256.7 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.738 | 16.274 | 12.414 | 16.274 | 150.2 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 159.735 | 200.111 | 146.635 | 200.111 | 256.7 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 61.639 | 62.624 | 61.423 | 62.624 | 168.3 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 297.699 | 301.480 | 297.137 | 301.480 | 256.7 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 262.412 | 271.758 | 258.459 | 271.758 | 194.1 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1678.235 | 1684.336 | 1660.917 | 1684.336 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 6.316 | 7.022 | 6.293 | 7.022 | 193.8 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 2.044 | 2.132 | 1.998 | 2.132 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.293 | 0.326 | 0.272 | 0.326 | 135.1 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.781 | 0.836 | 0.768 | 0.836 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.102 | 0.115 | 0.097 | 0.115 | 176.9 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.614 | 5.964 | 5.465 | 5.964 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.459 | 2.929 | 2.408 | 2.929 | 145.0 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 1.051 | 1.100 | 1.044 | 1.100 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 60.355 | 60.440 | 59.371 | 60.440 | 162.3 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 232.643 | 243.540 | 228.694 | 243.540 | 256.7 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.133 | 0.148 | 0.090 | 0.148 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.636 | 0.761 | 0.604 | 0.761 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 224.789 | 243.674 | 186.247 | 243.674 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1454.660 | 1496.155 | 1446.943 | 1496.155 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 175.065 | 219.737 | 172.991 | 219.737 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1454.001 | 1476.844 | 1442.700 | 1476.844 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.140 | 0.155 | 0.140 | 0.155 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.934 | 4.109 | 3.923 | 4.109 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.044 | 0.028 | 0.044 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.844 | 0.893 | 0.834 | 0.893 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.255 | 3.094 | 2.081 | 3.094 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.770 | 15.370 | 14.584 | 15.370 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.413 | 3.466 | 2.359 | 3.466 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 14.192 | 14.406 | 14.151 | 14.406 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.656 | 6.267 | 2.157 | 6.267 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.174 | 9.338 | 9.066 | 9.338 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.564 | 0.821 | 0.521 | 0.821 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.732 | 5.026 | 4.727 | 5.026 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.067 | 0.090 | 0.060 | 0.090 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.547 | 0.745 | 0.540 | 0.745 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 209.009 | 238.187 | 195.258 | 238.187 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1471.675 | 1518.030 | 1459.179 | 1518.030 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 177.292 | 200.118 | 177.232 | 200.118 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1432.647 | 1483.306 | 1429.146 | 1483.306 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.180 | 0.322 | 0.156 | 0.322 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.742 | 3.909 | 3.649 | 3.909 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.029 | 0.051 | 0.027 | 0.051 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.718 | 0.739 | 0.711 | 0.739 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.838 | 5.446 | 4.618 | 5.446 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.143 | 29.520 | 28.022 | 29.520 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 5.268 | 5.349 | 4.974 | 5.349 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.808 | 29.201 | 27.479 | 29.201 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.765 | 7.299 | 5.680 | 7.299 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.875 | 23.390 | 22.381 | 23.390 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.305 | 0.408 | 0.282 | 0.408 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.753 | 4.811 | 4.743 | 4.811 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.874 | 166.497 | 160.417 | 166.497 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1447.547 | 1468.950 | 1436.736 | 1468.950 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.161 | 0.112 | 0.161 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.107 | 2.146 | 2.060 | 2.146 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.039 | 0.018 | 0.039 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.406 | 0.422 | 0.398 | 0.422 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.254 | 1.360 | 1.227 | 1.360 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.036 | 3.177 | 3.033 | 3.177 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.260 | 0.268 | 0.249 | 0.268 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.668 | 2.756 | 2.654 | 2.756 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.687 | 164.638 | 161.118 | 164.638 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1435.983 | 1464.884 | 1428.345 | 1464.884 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.176 | 0.131 | 0.176 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.062 | 2.115 | 2.057 | 2.115 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.038 | 0.021 | 0.038 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.408 | 0.412 | 0.407 | 0.412 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.277 | 1.476 | 1.226 | 1.476 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.050 | 3.191 | 3.007 | 3.191 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.264 | 0.296 | 0.252 | 0.296 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.687 | 2.744 | 2.649 | 2.744 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.100 | 0.111 | 0.098 | 0.111 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.992 | 1.016 | 0.970 | 1.016 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 202.570 | 239.111 | 195.817 | 239.111 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1463.146 | 1474.998 | 1454.936 | 1474.998 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 184.637 | 220.645 | 181.914 | 220.645 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1442.553 | 1459.296 | 1430.528 | 1459.296 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.222 | 1.356 | 0.191 | 1.356 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.665 | 3.747 | 3.620 | 3.747 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.032 | 0.325 | 0.024 | 0.325 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.207 | 1.212 | 1.186 | 1.212 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.179 | 8.710 | 4.978 | 8.710 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 31.232 | 33.036 | 31.074 | 33.036 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 6.787 | 7.865 | 5.739 | 7.865 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 30.845 | 33.373 | 30.068 | 33.373 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.292 | 5.726 | 4.818 | 5.726 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 25.444 | 28.769 | 25.262 | 28.769 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.995 | 2.232 | 0.972 | 2.232 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.654 | 4.819 | 4.547 | 4.819 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.019 | 0.012 | 0.019 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.489 | 0.515 | 0.473 | 0.515 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 176.182 | 227.519 | 173.212 | 227.519 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1448.720 | 1477.751 | 1445.365 | 1477.751 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 165.675 | 183.246 | 163.308 | 183.246 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1444.589 | 1479.242 | 1437.804 | 1479.242 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.107 | 0.200 | 0.084 | 0.200 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.173 | 2.356 | 2.114 | 2.356 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.034 | 0.065 | 0.020 | 0.065 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.448 | 0.472 | 0.438 | 0.472 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.415 | 1.914 | 1.336 | 1.914 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.588 | 12.873 | 12.489 | 12.873 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.470 | 1.641 | 1.412 | 1.641 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 12.117 | 12.509 | 11.895 | 12.509 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 2.138 | 2.396 | 1.756 | 2.396 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 9.044 | 9.600 | 9.009 | 9.600 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.272 | 0.355 | 0.263 | 0.355 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.140 | 3.247 | 3.080 | 3.247 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.280 | 0.015 | 0.280 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.524 | 0.465 | 0.524 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 175.216 | 198.322 | 172.088 | 198.322 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1451.906 | 1480.890 | 1437.589 | 1480.890 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 161.841 | 197.790 | 159.458 | 197.790 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1439.571 | 1460.093 | 1432.087 | 1460.093 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.121 | 0.210 | 0.087 | 0.210 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.139 | 2.322 | 2.096 | 2.322 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.029 | 0.042 | 0.019 | 0.042 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.461 | 0.485 | 0.449 | 0.485 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.397 | 1.526 | 1.359 | 1.526 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 13.369 | 13.910 | 13.074 | 13.910 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.624 | 1.731 | 1.396 | 1.731 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.978 | 12.401 | 11.924 | 12.401 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.999 | 3.032 | 1.721 | 3.032 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.907 | 9.637 | 8.851 | 9.637 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.286 | 0.320 | 0.272 | 0.320 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.221 | 3.618 | 3.091 | 3.618 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.018 | 0.012 | 0.018 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.520 | 0.587 | 0.501 | 0.587 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 303.458 | 323.098 | 294.086 | 323.098 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1859.433 | 1875.670 | 1827.824 | 1875.670 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 165.340 | 173.109 | 163.854 | 173.109 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1498.092 | 1560.043 | 1439.905 | 1560.043 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.161 | 0.212 | 0.152 | 0.212 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.184 | 2.517 | 2.147 | 2.517 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.033 | 0.054 | 0.020 | 0.054 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.477 | 0.524 | 0.441 | 0.524 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 106.554 | 115.043 | 106.177 | 115.043 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 400.014 | 401.544 | 393.612 | 401.544 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 106.746 | 112.871 | 106.421 | 112.871 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 393.669 | 401.138 | 391.973 | 401.138 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 107.736 | 113.971 | 107.207 | 113.971 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 391.270 | 399.080 | 388.960 | 399.080 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.322 | 0.449 | 0.266 | 0.449 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.175 | 3.238 | 3.128 | 3.238 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.306 | 169.861 | 159.929 | 169.861 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1433.639 | 1544.996 | 1429.693 | 1544.996 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.193 | 0.126 | 0.193 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.133 | 2.197 | 2.103 | 2.197 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.027 | 0.016 | 0.027 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.442 | 0.457 | 0.434 | 0.457 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.813 | 1.849 | 1.650 | 1.849 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.666 | 8.928 | 7.301 | 8.928 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.269 | 0.302 | 0.267 | 0.302 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.707 | 2.773 | 2.649 | 2.773 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.898 | 164.431 | 161.683 | 164.431 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1432.027 | 1444.008 | 1429.378 | 1444.008 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.173 | 0.122 | 0.173 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.097 | 2.171 | 2.042 | 2.171 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.033 | 0.017 | 0.033 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.436 | 0.452 | 0.424 | 0.452 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.862 | 3.985 | 3.843 | 3.985 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 19.845 | 21.171 | 19.786 | 21.171 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.272 | 0.283 | 0.258 | 0.283 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.710 | 2.790 | 2.686 | 2.790 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.062 | 0.067 | 0.045 | 0.067 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.529 | 0.560 | 0.507 | 0.560 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 225.295 | 249.376 | 192.722 | 249.376 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1486.348 | 1543.425 | 1483.397 | 1543.425 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 180.152 | 217.895 | 177.074 | 217.895 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1451.622 | 1569.067 | 1448.206 | 1569.067 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.133 | 0.159 | 0.126 | 0.159 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.800 | 4.600 | 3.628 | 4.600 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.038 | 0.049 | 0.027 | 0.049 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.704 | 0.739 | 0.639 | 0.739 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.323 | 14.610 | 3.029 | 14.610 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 49.888 | 50.790 | 49.547 | 50.790 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.393 | 3.639 | 3.363 | 3.639 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 50.438 | 51.270 | 49.853 | 51.270 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 4.531 | 5.373 | 3.936 | 5.373 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 44.775 | 45.189 | 44.228 | 45.189 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.280 | 0.298 | 0.264 | 0.298 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.805 | 4.851 | 4.788 | 4.851 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.546 | 199.141 | 164.172 | 199.141 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1443.927 | 1600.896 | 1428.825 | 1600.896 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.187 | 0.277 | 0.187 | 0.277 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.670 | 3.985 | 3.606 | 3.985 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.018 | 0.023 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.642 | 0.787 | 0.628 | 0.787 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.522 | 3.397 | 1.912 | 3.397 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.401 | 10.397 | 7.821 | 10.397 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.369 | 1.045 | 0.285 | 1.045 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.855 | 5.304 | 4.771 | 5.304 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 177.527 | 236.016 | 175.832 | 236.016 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1462.892 | 1584.333 | 1437.250 | 1584.333 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.201 | 0.174 | 0.201 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.954 | 9.117 | 3.858 | 9.117 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.023 | 0.017 | 0.023 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.821 | 1.597 | 0.820 | 1.597 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.582 | 2.784 | 2.328 | 2.784 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.205 | 14.720 | 9.095 | 14.720 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.534 | 0.586 | 0.497 | 0.586 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.822 | 10.140 | 4.802 | 10.140 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.115 | 0.149 | 0.102 | 0.149 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.737 | 0.861 | 0.708 | 0.861 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 184.384 | 197.771 | 183.918 | 197.771 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1453.963 | 1567.830 | 1447.820 | 1567.830 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 170.820 | 188.164 | 164.687 | 188.164 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1430.529 | 1443.455 | 1428.900 | 1443.455 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.166 | 0.221 | 0.162 | 0.221 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.942 | 4.046 | 3.828 | 4.046 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.032 | 0.026 | 0.032 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.839 | 0.857 | 0.832 | 0.857 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.145 | 3.009 | 2.094 | 3.009 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 15.076 | 17.222 | 15.039 | 17.222 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.338 | 3.162 | 2.239 | 3.162 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 14.044 | 20.406 | 13.910 | 20.406 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.210 | 3.896 | 2.109 | 3.896 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 10.820 | 12.463 | 10.345 | 12.463 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.504 | 0.509 | 0.496 | 0.509 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.944 | 5.466 | 4.901 | 5.466 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.053 | 0.066 | 0.045 | 0.066 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.545 | 0.591 | 0.539 | 0.591 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 184.030 | 198.451 | 171.431 | 198.451 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1440.346 | 1482.834 | 1439.864 | 1482.834 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 177.532 | 184.193 | 174.967 | 184.193 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1437.161 | 1454.934 | 1434.420 | 1454.934 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.162 | 0.264 | 0.137 | 0.264 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.784 | 3.912 | 3.585 | 3.912 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.040 | 0.028 | 0.040 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.673 | 0.706 | 0.644 | 0.706 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.267 | 1.426 | 1.203 | 1.426 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.055 | 13.498 | 12.959 | 13.498 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.373 | 1.865 | 1.344 | 1.865 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.463 | 12.650 | 12.288 | 12.650 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 2.174 | 3.747 | 1.913 | 3.747 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.709 | 7.942 | 7.666 | 7.942 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.288 | 0.375 | 0.268 | 0.375 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.745 | 4.792 | 4.657 | 4.792 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.259 | 162.827 | 162.140 | 162.827 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1427.468 | 1443.810 | 1425.613 | 1443.810 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.177 | 0.130 | 0.177 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.142 | 2.184 | 2.098 | 2.184 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.021 | 0.017 | 0.021 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.449 | 0.463 | 0.434 | 0.463 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.825 | 2.561 | 1.767 | 2.561 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.239 | 7.601 | 7.136 | 7.601 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.271 | 0.306 | 0.262 | 0.306 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.747 | 2.889 | 2.670 | 2.889 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.595 | 167.327 | 158.315 | 167.327 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1439.645 | 1548.390 | 1431.056 | 1548.390 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.171 | 0.128 | 0.171 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.108 | 2.148 | 2.088 | 2.148 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.036 | 0.020 | 0.036 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.423 | 0.446 | 0.420 | 0.446 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.872 | 4.019 | 3.851 | 4.019 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 20.391 | 21.071 | 20.123 | 21.071 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.270 | 0.328 | 0.268 | 0.328 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.715 | 2.770 | 2.660 | 2.770 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.689 | 174.426 | 166.671 | 174.426 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1443.847 | 1453.111 | 1439.220 | 1453.111 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.421 | 0.189 | 0.421 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.900 | 3.991 | 3.836 | 3.991 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.032 | 0.019 | 0.032 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.786 | 0.816 | 0.775 | 0.816 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.461 | 5.077 | 2.372 | 5.077 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.861 | 9.040 | 8.817 | 9.040 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.168 | 0.276 | 0.151 | 0.276 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.712 | 5.073 | 4.692 | 5.073 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 167.569 | 180.429 | 163.755 | 180.429 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1430.812 | 1486.593 | 1428.702 | 1486.593 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.224 | 0.235 | 0.213 | 0.235 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.839 | 4.001 | 3.786 | 4.001 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.027 | 0.021 | 0.027 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.793 | 0.815 | 0.788 | 0.815 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.555 | 4.923 | 2.646 | 4.923 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.937 | 9.197 | 8.871 | 9.197 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.165 | 0.172 | 0.151 | 0.172 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.746 | 4.814 | 4.667 | 4.814 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 187.813 | 280.624 | 176.727 | 280.624 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1432.909 | 1476.016 | 1432.764 | 1476.016 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.208 | 0.353 | 0.201 | 0.353 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.910 | 3.976 | 3.881 | 3.976 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.803 | 0.888 | 0.792 | 0.888 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.391 | 4.954 | 2.261 | 4.954 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 9.064 | 9.322 | 8.962 | 9.322 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.165 | 0.177 | 0.165 | 0.177 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.788 | 4.869 | 4.748 | 4.869 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 178.598 | 218.751 | 176.683 | 218.751 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1437.143 | 1456.375 | 1434.932 | 1456.375 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.201 | 0.206 | 0.190 | 0.206 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.839 | 3.898 | 3.775 | 3.898 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.041 | 0.024 | 0.041 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.810 | 0.816 | 0.810 | 0.816 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 2.416 | 6.065 | 2.337 | 6.065 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.160 | 10.043 | 9.000 | 10.043 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.161 | 0.255 | 0.151 | 0.255 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.697 | 5.005 | 4.682 | 5.005 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.231 | 168.202 | 159.701 | 168.202 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1448.390 | 1462.495 | 1437.588 | 1462.495 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.245 | 0.346 | 0.205 | 0.346 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.592 | 3.725 | 3.577 | 3.725 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.635 | 0.670 | 0.633 | 0.670 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.863 | 2.460 | 1.828 | 2.460 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.864 | 8.100 | 7.748 | 8.100 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.234 | 0.266 | 0.226 | 0.266 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.736 | 4.999 | 4.687 | 4.999 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.826 | 165.131 | 160.842 | 165.131 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1447.220 | 1536.503 | 1432.730 | 1536.503 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.204 | 0.211 | 0.193 | 0.211 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.604 | 3.813 | 3.566 | 3.813 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.034 | 0.020 | 0.034 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.644 | 0.656 | 0.632 | 0.656 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.759 | 1.910 | 1.732 | 1.910 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.701 | 8.438 | 7.539 | 8.438 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.224 | 0.230 | 0.224 | 0.230 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.769 | 4.823 | 4.725 | 4.823 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.336 | 175.302 | 161.945 | 175.302 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1436.453 | 1447.555 | 1431.644 | 1447.555 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.206 | 0.282 | 0.187 | 0.282 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.643 | 3.763 | 3.598 | 3.763 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.021 | 0.025 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.626 | 0.645 | 0.621 | 0.645 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.033 | 2.326 | 1.965 | 2.326 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.886 | 9.505 | 7.667 | 9.505 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.213 | 0.247 | 0.207 | 0.247 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.758 | 4.821 | 4.738 | 4.821 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 174.500 | 200.433 | 170.262 | 200.433 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1441.066 | 1471.174 | 1435.886 | 1471.174 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.198 | 1.901 | 0.193 | 1.901 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.593 | 3.727 | 3.569 | 3.727 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.025 | 0.020 | 0.025 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.638 | 0.663 | 0.628 | 0.663 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.969 | 2.721 | 1.879 | 2.721 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.604 | 8.189 | 7.502 | 8.189 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.204 | 0.248 | 0.204 | 0.248 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.832 | 5.903 | 4.766 | 5.903 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 182.167 | 192.923 | 180.960 | 192.923 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1435.032 | 1446.672 | 1431.519 | 1446.672 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.236 | 0.395 | 0.229 | 0.395 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.716 | 3.894 | 3.579 | 3.894 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.040 | 0.021 | 0.040 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.648 | 0.660 | 0.632 | 0.660 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.122 | 2.603 | 1.888 | 2.603 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.662 | 8.475 | 7.486 | 8.475 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.261 | 0.311 | 0.248 | 0.311 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.735 | 4.834 | 4.679 | 4.834 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 168.094 | 178.007 | 165.513 | 178.007 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1429.081 | 1440.949 | 1428.659 | 1440.949 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.202 | 0.218 | 0.197 | 0.218 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.604 | 3.725 | 3.595 | 3.725 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.016 | 0.023 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.647 | 0.654 | 0.626 | 0.654 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.341 | 4.594 | 2.256 | 4.594 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 8.007 | 8.459 | 7.925 | 8.459 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.219 | 0.266 | 0.213 | 0.266 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.741 | 4.789 | 4.714 | 4.789 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.208 | 0.278 | 0.203 | 0.278 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.961 | 0.990 | 0.947 | 0.990 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 212.551 | 216.695 | 212.164 | 216.695 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1565.313 | 1591.863 | 1562.800 | 1591.863 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 24.370 | 25.538 | 23.598 | 25.538 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 131.554 | 133.688 | 131.475 | 133.688 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 24.623 | 29.209 | 23.875 | 29.209 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 130.737 | 136.704 | 130.350 | 136.704 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 24.704 | 57.069 | 24.116 | 57.069 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 105.776 | 118.097 | 102.782 | 118.097 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 2.067 | 2.163 | 1.747 | 2.163 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 27.460 | 27.977 | 27.053 | 27.977 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.444 | 171.073 | 161.336 | 171.073 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1443.640 | 1476.144 | 1433.110 | 1476.144 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.203 | 0.238 | 0.194 | 0.238 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.176 | 2.254 | 2.152 | 2.254 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.023 | 0.021 | 0.023 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.446 | 0.449 | 0.433 | 0.449 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 158.465 | 161.299 | 157.571 | 161.299 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 614.846 | 630.180 | 613.841 | 630.180 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.307 | 0.313 | 0.298 | 0.313 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.209 | 3.382 | 3.097 | 3.382 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.133 | 167.266 | 160.161 | 167.266 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1437.621 | 1478.282 | 1437.327 | 1478.282 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.180 | 0.188 | 0.178 | 0.188 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.135 | 2.172 | 2.123 | 2.172 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.030 | 0.019 | 0.030 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.434 | 0.458 | 0.415 | 0.458 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.336 | 4.493 | 4.281 | 4.493 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 20.583 | 20.652 | 20.294 | 20.652 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.298 | 0.314 | 0.292 | 0.314 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.056 | 3.407 | 3.016 | 3.407 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 163.339 | 181.232 | 160.239 | 181.232 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1442.307 | 1464.995 | 1439.433 | 1464.995 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.155 | 0.181 | 0.122 | 0.181 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.931 | 1.974 | 1.870 | 1.974 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.019 | 0.027 | 0.015 | 0.027 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.329 | 0.363 | 0.327 | 0.363 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.488 | 0.562 | 0.487 | 0.562 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.922 | 3.100 | 2.863 | 3.100 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.139 | 0.148 | 0.129 | 0.148 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.696 | 2.717 | 2.646 | 2.717 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 162.467 | 163.379 | 161.137 | 163.379 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1429.076 | 1437.788 | 1425.346 | 1437.788 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.148 | 0.177 | 0.145 | 0.177 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.857 | 1.923 | 1.856 | 1.923 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.017 | 0.020 | 0.017 | 0.020 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.324 | 0.349 | 0.313 | 0.349 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.826 | 0.876 | 0.817 | 0.876 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.481 | 5.632 | 5.404 | 5.632 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.172 | 0.286 | 0.154 | 0.286 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.676 | 2.749 | 2.675 | 2.749 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 189.605 | 213.818 | 182.041 | 213.818 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1614.797 | 1690.326 | 1592.607 | 1690.326 | n/a |
| mcmc-flat-mixed-components | model-json-decode | effect-prophet | 6 | 1.374 | 1.641 | 1.348 | 1.641 | n/a |
| mcmc-flat-mixed-components | model-json-decode | python-prophet | 6 | 9.519 | 10.033 | 9.362 | 10.033 | n/a |
| mcmc-flat-mixed-components | model-json-encode | effect-prophet | 6 | 0.163 | 0.177 | 0.160 | 0.177 | n/a |
| mcmc-flat-mixed-components | model-json-encode | python-prophet | 6 | 12.513 | 13.244 | 12.277 | 13.244 | n/a |
| mcmc-flat-mixed-components | warm-fit | effect-prophet | 6 | 637.840 | 642.211 | 635.258 | 642.211 | n/a |
| mcmc-flat-mixed-components | warm-fit | python-prophet | 6 | 531.133 | 533.414 | 528.167 | 533.414 | n/a |
| mcmc-flat-mixed-components | warm-predict | effect-prophet | 6 | 0.355 | 0.513 | 0.296 | 0.513 | n/a |
| mcmc-flat-mixed-components | warm-predict | python-prophet | 6 | 5.052 | 5.320 | 4.820 | 5.320 | n/a |
| mcmc-flat-mixed-components | warm-uncertainty | effect-prophet | 6 | 2.087 | 2.710 | 1.890 | 2.710 | 153.5 |
| mcmc-flat-mixed-components | warm-uncertainty | python-prophet | 6 | 144.933 | 157.578 | 129.484 | 157.578 | 256.7 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 305.095 | 318.146 | 292.468 | 318.146 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1958.867 | 1991.044 | 1956.730 | 1991.044 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.803 | 175.062 | 170.135 | 175.062 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1571.688 | 1589.191 | 1559.447 | 1589.191 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.143 | 0.163 | 0.122 | 0.163 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.328 | 2.466 | 2.232 | 2.466 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.019 | 0.040 | 0.016 | 0.040 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.426 | 0.506 | 0.416 | 0.506 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.028 | 0.035 | 0.024 | 0.035 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.492 | 0.518 | 0.481 | 0.518 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.592 | 5.071 | 4.538 | 5.071 | 150.3 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 122.576 | 137.833 | 122.223 | 137.833 | 256.7 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 174.395 | 179.285 | 169.905 | 179.285 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1605.826 | 1706.196 | 1535.694 | 1706.196 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.361 | 187.230 | 164.328 | 187.230 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1519.229 | 1566.770 | 1513.540 | 1566.770 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.178 | 0.204 | 0.160 | 0.204 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.674 | 3.982 | 3.637 | 3.982 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.018 | 0.023 | 0.016 | 0.023 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.709 | 0.903 | 0.657 | 0.903 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.096 | 0.040 | 0.096 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.534 | 0.569 | 0.527 | 0.569 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.941 | 1.359 | 0.923 | 1.359 | 134.0 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 72.576 | 74.839 | 72.392 | 74.839 | 256.7 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 178.923 | 184.033 | 176.595 | 184.033 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1471.042 | 1483.922 | 1453.980 | 1483.922 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.545 | 176.321 | 167.178 | 176.321 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1473.096 | 1504.805 | 1456.820 | 1504.805 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.192 | 0.336 | 0.164 | 0.336 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.937 | 4.123 | 3.881 | 4.123 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.030 | 0.017 | 0.030 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.827 | 0.916 | 0.823 | 0.916 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.097 | 0.138 | 0.083 | 0.138 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.652 | 0.676 | 0.648 | 0.676 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.865 | 1.018 | 0.837 | 1.018 | 144.5 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 20.658 | 45.772 | 20.189 | 45.772 | 256.7 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 241.086 | 244.336 | 238.704 | 244.336 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1831.124 | 1944.732 | 1816.996 | 1944.732 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.104 | 0.275 | 0.091 | 0.275 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.950 | 0.965 | 0.929 | 0.965 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 18.423 | 22.698 | 17.844 | 22.698 | 195.6 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 270.071 | 286.276 | 269.049 | 286.276 | 256.7 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 104.547 | 105.256 | 103.610 | 105.256 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 391.605 | 408.276 | 390.044 | 408.276 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.341 | 7.907 | 6.144 | 7.907 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.813 | 12.936 | 8.408 | 12.936 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `d4edbd51740a32f8a1d8e245aa70e2ba8d313fc7`
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

