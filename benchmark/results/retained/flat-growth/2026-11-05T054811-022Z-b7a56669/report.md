# Effect Prophet benchmark — 2026-11-05T054811-022Z-b7a56669

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
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 11.046 | 12.114 | 10.201 | 12.114 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 124.277 | 141.937 | 118.984 | 141.937 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 3.087 | 5.393 | 1.844 | 5.393 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.295 | 7.109 | 6.269 | 7.109 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.786 | 6.929 | 6.615 | 6.929 | 144.4 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 115.693 | 129.699 | 110.170 | 129.699 | 257.2 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | 140.0 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.449 | 0.470 | 0.429 | 0.470 | 257.2 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 217.213 | 283.431 | 200.523 | 283.431 | 154.4 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1600.942 | 2027.234 | 1592.108 | 2027.234 | 257.2 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 167.539 | 185.380 | 160.187 | 185.380 | 169.8 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1506.172 | 1534.211 | 1486.879 | 1534.211 | 257.2 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 1.306 | 1.679 | 1.093 | 1.679 | 167.1 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.169 | 3.238 | 3.021 | 3.238 | 257.2 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.109 | 0.114 | 0.095 | 0.114 | 156.0 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.512 | 0.574 | 0.492 | 0.574 | 257.2 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.815 | 22.565 | 21.358 | 22.565 | 154.2 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 69.422 | 71.659 | 68.978 | 71.659 | 257.2 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 22.445 | 23.700 | 22.289 | 23.700 | 153.1 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 70.105 | 75.622 | 69.050 | 75.622 | 257.2 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 22.330 | 24.472 | 21.914 | 24.472 | 149.1 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 64.942 | 66.284 | 63.625 | 66.284 | 257.2 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.326 | 0.527 | 0.283 | 0.527 | 149.9 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.121 | 5.251 | 5.116 | 5.251 | 257.2 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 188.895 | 212.681 | 184.003 | 212.681 | 244.4 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1559.171 | 1618.317 | 1540.672 | 1618.317 | 257.2 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.978 | 3.536 | 2.856 | 3.536 | 236.1 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.104 | 9.391 | 8.964 | 9.391 | 257.2 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.117 | 0.135 | 0.105 | 0.135 | 229.3 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 2.971 | 3.068 | 2.937 | 3.068 | 257.2 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.697 | 26.477 | 20.248 | 26.477 | 205.9 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 80.928 | 81.910 | 79.879 | 81.910 | 257.2 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.103 | 3.563 | 2.873 | 3.563 | 222.2 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.622 | 8.781 | 8.505 | 8.781 | 257.2 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 197.347 | 200.167 | 189.177 | 200.167 | 203.7 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1526.068 | 1875.514 | 1520.144 | 1875.514 | 257.2 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.932 | 2.788 | 1.778 | 2.788 | 199.7 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.765 | 4.921 | 4.740 | 4.921 | 257.2 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.112 | 0.133 | 0.109 | 0.133 | 196.3 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.208 | 1.232 | 1.193 | 1.232 | 257.2 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 8.938 | 10.919 | 8.343 | 10.919 | 170.2 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 23.617 | 23.804 | 23.470 | 23.804 | 257.2 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.777 | 3.414 | 2.427 | 3.414 | 194.2 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 6.727 | 6.975 | 6.648 | 6.975 | 257.2 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.017 | 0.011 | 0.017 | 136.1 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.442 | 0.525 | 0.418 | 0.525 | 257.2 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 195.070 | 218.653 | 177.432 | 218.653 | 152.3 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1546.187 | 1580.128 | 1519.001 | 1580.128 | 257.2 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 161.609 | 169.152 | 157.611 | 169.152 | 156.7 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1517.757 | 1540.318 | 1507.014 | 1540.318 | 257.2 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.247 | 1.954 | 0.201 | 1.954 | 154.6 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 1.958 | 2.011 | 1.937 | 2.011 | 257.2 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.046 | 0.068 | 0.037 | 0.068 | 153.8 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.408 | 0.426 | 0.381 | 0.426 | 257.2 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.385 | 1.501 | 1.325 | 1.501 | 150.9 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 12.830 | 15.059 | 12.650 | 15.059 | 257.2 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.547 | 1.858 | 1.418 | 1.858 | 150.9 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 11.952 | 13.045 | 11.816 | 13.045 | 257.2 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.248 | 3.032 | 1.955 | 3.032 | 144.9 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.224 | 11.213 | 9.022 | 11.213 | 257.2 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.159 | 0.185 | 0.141 | 0.185 | 146.6 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 2.924 | 3.009 | 2.860 | 3.009 | 257.2 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.048 | 0.058 | 0.031 | 0.058 | 147.2 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.583 | 0.620 | 0.562 | 0.620 | 257.2 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 228.756 | 292.806 | 210.289 | 292.806 | 190.9 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1527.882 | 1710.959 | 1499.117 | 1710.959 | 257.2 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 177.361 | 211.899 | 172.322 | 211.899 | 192.5 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1478.008 | 1534.951 | 1456.906 | 1534.951 | 257.2 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 0.884 | 2.162 | 0.843 | 2.162 | 192.1 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 2.971 | 3.100 | 2.845 | 3.100 | 257.2 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.109 | 0.171 | 0.095 | 0.171 | 191.1 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.521 | 0.660 | 0.471 | 0.660 | 257.2 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.803 | 23.908 | 20.155 | 23.908 | 188.7 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 68.185 | 72.706 | 64.394 | 72.706 | 257.2 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 21.531 | 31.640 | 19.929 | 31.640 | 170.4 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 64.377 | 66.199 | 63.318 | 66.199 | 257.2 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 20.583 | 22.152 | 19.030 | 22.152 | 150.8 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 58.436 | 72.431 | 57.898 | 72.431 | 257.2 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 2.056 | 4.504 | 1.463 | 4.504 | 153.8 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 4.884 | 5.130 | 4.749 | 5.130 | 257.2 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 193.341 | 207.453 | 189.152 | 207.453 | 241.4 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1388.914 | 1425.458 | 1376.907 | 1425.458 | 257.2 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.872 | 1.996 | 1.796 | 1.996 | 233.7 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.825 | 10.070 | 9.698 | 10.070 | 257.2 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.033 | 0.053 | 0.027 | 0.053 | 226.7 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.255 | 3.305 | 3.159 | 3.305 | 257.2 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 19.810 | 24.641 | 19.502 | 24.641 | 205.0 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 80.191 | 95.083 | 77.061 | 95.083 | 257.2 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.908 | 4.525 | 3.095 | 4.525 | 220.0 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.969 | 9.270 | 8.872 | 9.270 | 257.2 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 177.020 | 182.699 | 174.236 | 182.699 | 207.9 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1387.509 | 1514.633 | 1370.331 | 1514.633 | 257.2 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.863 | 1.482 | 0.817 | 1.482 | 201.7 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.693 | 5.794 | 5.582 | 5.794 | 257.2 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.027 | 0.042 | 0.021 | 0.042 | 196.4 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.408 | 1.442 | 1.406 | 1.442 | 257.2 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.394 | 7.278 | 5.524 | 7.278 | 157.5 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.271 | 20.791 | 20.049 | 20.791 | 257.2 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 4.135 | 4.633 | 2.385 | 4.633 | 183.7 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.302 | 17.738 | 6.189 | 17.738 | 257.2 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.012 | 0.016 | 138.4 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.432 | 0.450 | 0.423 | 0.450 | 257.2 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 183.689 | 194.453 | 171.922 | 194.453 | 152.9 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1375.702 | 1444.805 | 1366.918 | 1444.805 | 257.2 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 170.563 | 206.938 | 167.458 | 206.938 | 153.0 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1373.422 | 1816.491 | 1366.557 | 1816.491 | 257.2 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.086 | 0.104 | 0.076 | 0.104 | 152.9 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.004 | 2.097 | 1.975 | 2.097 | 257.2 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.020 | 0.052 | 0.017 | 0.052 | 152.9 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.422 | 0.467 | 0.398 | 0.467 | 257.2 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.201 | 1.348 | 1.083 | 1.348 | 152.6 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.274 | 12.602 | 10.918 | 12.602 | 257.2 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.288 | 3.516 | 1.167 | 3.516 | 152.5 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.327 | 10.736 | 10.246 | 10.736 | 257.2 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.773 | 3.351 | 1.622 | 3.351 | 145.3 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 7.869 | 8.584 | 7.728 | 8.584 | 257.2 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.136 | 0.217 | 0.122 | 0.217 | 146.6 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.558 | 2.587 | 2.507 | 2.587 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 196.440 | 202.059 | 181.397 | 202.059 | 191.8 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1330.849 | 1358.101 | 1325.202 | 1358.101 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.803 | 3.389 | 2.776 | 3.389 | 189.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 6.862 | 7.866 | 6.735 | 7.866 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.046 | 0.105 | 0.042 | 0.105 | 186.8 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.709 | 3.171 | 2.688 | 3.171 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 12.443 | 26.801 | 11.209 | 26.801 | 161.0 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 36.612 | 49.005 | 36.157 | 49.005 | 257.2 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.572 | 1.178 | 0.489 | 1.178 | 171.8 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 11.530 | 11.805 | 11.400 | 11.805 | 257.2 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 216.304 | 243.702 | 203.292 | 243.702 | 200.6 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1396.600 | 1637.241 | 1364.404 | 1637.241 | 257.2 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.474 | 3.888 | 3.221 | 3.888 | 198.5 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.299 | 7.842 | 7.130 | 7.842 | 257.2 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.050 | 0.067 | 0.048 | 0.067 | 196.4 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.874 | 3.662 | 2.827 | 3.662 | 257.2 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 15.993 | 18.865 | 11.777 | 18.865 | 189.0 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 39.427 | 52.677 | 38.697 | 52.677 | 257.2 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.190 | 3.138 | 1.862 | 3.138 | 194.0 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.122 | 19.538 | 12.869 | 19.538 | 257.2 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 175.419 | 178.324 | 174.669 | 178.324 | 196.4 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1374.882 | 1425.952 | 1371.377 | 1425.952 | 257.2 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.344 | 2.811 | 1.730 | 2.811 | 192.4 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.001 | 5.073 | 4.967 | 5.073 | 257.2 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.032 | 0.038 | 0.031 | 0.038 | 175.1 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.370 | 1.396 | 1.354 | 1.396 | 257.2 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 6.699 | 7.062 | 5.683 | 7.062 | 153.7 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 18.059 | 18.505 | 17.857 | 18.505 | 257.2 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.137 | 2.675 | 2.020 | 2.675 | 160.4 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.573 | 8.829 | 8.452 | 8.829 | 257.2 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.010 | 0.012 | 0.009 | 0.012 | 141.6 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.445 | 0.511 | 0.428 | 0.511 | 257.2 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 187.309 | 205.481 | 186.117 | 205.481 | 157.5 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1441.769 | 1488.507 | 1439.363 | 1488.507 | 257.2 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 161.447 | 168.004 | 158.187 | 168.004 | 157.5 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1402.319 | 1417.926 | 1397.223 | 1417.926 | 257.2 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.404 | 0.447 | 0.396 | 0.447 | 157.5 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.892 | 3.936 | 3.865 | 3.936 | 257.2 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.021 | 0.028 | 0.020 | 0.028 | 157.5 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.691 | 0.704 | 0.654 | 0.704 | 257.2 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.216 | 14.274 | 13.063 | 14.274 | 157.3 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 46.967 | 52.304 | 46.447 | 52.304 | 257.2 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.449 | 14.773 | 13.336 | 14.773 | 153.8 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 46.335 | 48.587 | 45.755 | 48.587 | 257.2 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 15.255 | 16.042 | 14.095 | 16.042 | 153.5 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 41.471 | 42.462 | 41.381 | 42.462 | 257.2 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.168 | 0.178 | 0.152 | 0.178 | 153.6 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.678 | 5.846 | 4.610 | 5.846 | 257.2 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | 138.9 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.430 | 0.450 | 0.420 | 0.450 | 257.2 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 173.997 | 183.406 | 172.602 | 183.406 | 154.4 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1376.949 | 1451.301 | 1375.098 | 1451.301 | 257.2 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 164.706 | 169.676 | 163.698 | 169.676 | 154.5 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1375.661 | 1406.248 | 1370.394 | 1406.248 | 257.2 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.415 | 0.469 | 0.383 | 0.469 | 154.4 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.781 | 4.670 | 3.690 | 4.670 | 257.2 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.019 | 0.026 | 0.019 | 0.026 | 154.4 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.657 | 0.704 | 0.642 | 0.704 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.605 | 2.666 | 2.546 | 2.666 | 154.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 17.692 | 17.888 | 17.344 | 17.888 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.764 | 2.862 | 2.699 | 2.862 | 151.5 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.165 | 18.160 | 16.822 | 18.160 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.236 | 5.267 | 2.851 | 5.267 | 150.7 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 12.697 | 12.984 | 12.371 | 12.984 | 257.2 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.184 | 0.221 | 0.161 | 0.221 | 150.9 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.450 | 4.467 | 4.394 | 4.467 | 257.2 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.042 | 0.073 | 0.037 | 0.073 | 134.8 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.505 | 0.535 | 0.482 | 0.535 | 257.2 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 197.566 | 221.552 | 191.811 | 221.552 | 164.5 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1580.757 | 1805.659 | 1551.420 | 1805.659 | 257.2 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 164.973 | 177.286 | 162.719 | 177.286 | 170.3 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1506.641 | 1568.514 | 1496.754 | 1568.514 | 257.2 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 1.097 | 1.235 | 0.775 | 1.235 | 167.1 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.064 | 4.180 | 4.047 | 4.180 | 257.2 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.119 | 0.157 | 0.098 | 0.157 | 167.1 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.745 | 0.789 | 0.709 | 0.789 | 257.2 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.878 | 19.841 | 17.324 | 19.841 | 160.4 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 60.827 | 62.811 | 58.449 | 62.811 | 257.2 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 18.255 | 19.463 | 17.146 | 19.463 | 149.7 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 58.369 | 62.794 | 57.982 | 62.794 | 257.2 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.771 | 20.513 | 17.154 | 20.513 | 146.2 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 52.957 | 55.305 | 51.506 | 55.305 | 257.2 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.243 | 0.432 | 0.214 | 0.432 | 148.5 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 5.935 | 6.848 | 5.837 | 6.848 | 257.2 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 173.792 | 186.846 | 171.041 | 186.846 | 171.8 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1385.363 | 1614.103 | 1376.214 | 1614.103 | 257.2 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.115 | 0.250 | 0.082 | 0.250 | 170.0 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.619 | 4.667 | 4.547 | 4.667 | 257.2 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.016 | 0.019 | 0.015 | 0.019 | 155.6 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.296 | 2.306 | 2.282 | 2.306 | 257.2 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.764 | 9.441 | 7.011 | 9.441 | 152.7 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 14.838 | 27.703 | 14.821 | 27.703 | 257.2 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.212 | 0.488 | 0.188 | 0.488 | 153.3 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.561 | 2.694 | 2.520 | 2.694 | 257.2 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 172.451 | 181.174 | 169.562 | 181.174 | 190.9 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1414.759 | 1498.393 | 1375.526 | 1498.393 | 257.2 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.125 | 0.186 | 0.101 | 0.186 | 187.6 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.685 | 5.028 | 4.577 | 5.028 | 257.2 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 173.6 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.306 | 2.351 | 2.256 | 2.351 | 257.2 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.950 | 8.724 | 6.147 | 8.724 | 156.3 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 18.727 | 31.490 | 14.544 | 31.490 | 257.2 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 2.322 | 2.792 | 2.178 | 2.792 | 166.4 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.762 | 2.811 | 2.665 | 2.811 | 257.2 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 174.484 | 185.060 | 168.392 | 185.060 | 155.9 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1353.667 | 1390.281 | 1351.044 | 1390.281 | 257.2 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.094 | 0.137 | 0.073 | 0.137 | 155.3 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.795 | 3.051 | 2.737 | 3.051 | 257.2 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.019 | 0.037 | 0.014 | 0.037 | 155.0 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 0.965 | 0.989 | 0.955 | 0.989 | 257.2 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 2.825 | 4.548 | 2.767 | 4.548 | 153.8 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 7.781 | 8.703 | 7.588 | 8.703 | 257.2 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.482 | 1.854 | 1.357 | 1.854 | 154.6 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.619 | 2.673 | 2.564 | 2.673 | 257.2 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.011 | 0.015 | 140.2 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.517 | 0.432 | 0.517 | 257.2 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 181.039 | 221.950 | 179.181 | 221.950 | 159.8 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1497.030 | 1517.092 | 1465.041 | 1517.092 | 257.2 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 170.057 | 255.159 | 164.473 | 255.159 | 172.5 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1469.862 | 1530.203 | 1462.870 | 1530.203 | 257.2 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.393 | 2.403 | 0.807 | 2.403 | 172.5 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 2.866 | 2.967 | 2.821 | 2.967 | 257.2 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.139 | 0.169 | 0.118 | 0.169 | 163.6 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.470 | 0.507 | 0.461 | 0.507 | 257.2 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.304 | 3.470 | 3.006 | 3.470 | 156.6 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 19.824 | 20.161 | 19.686 | 20.161 | 257.2 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.546 | 4.454 | 3.349 | 4.454 | 154.8 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 19.494 | 19.729 | 19.263 | 19.729 | 257.2 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 3.669 | 4.351 | 3.409 | 4.351 | 150.0 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 14.550 | 17.681 | 14.305 | 17.681 | 257.2 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.243 | 1.181 | 0.216 | 1.181 | 153.8 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.523 | 4.610 | 4.488 | 4.610 | 257.2 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 192.962 | 199.514 | 185.037 | 199.514 | 208.0 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1469.607 | 1542.727 | 1464.857 | 1542.727 | 257.2 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 5.023 | 6.318 | 4.768 | 6.318 | 202.1 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.574 | 5.635 | 5.486 | 5.635 | 257.2 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.310 | 0.432 | 0.284 | 0.432 | 198.4 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.361 | 2.435 | 2.295 | 2.435 | 257.2 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 18.145 | 26.960 | 12.988 | 26.960 | 194.1 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 39.987 | 40.854 | 39.689 | 40.854 | 257.2 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.526 | 0.591 | 0.490 | 0.591 | 196.5 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 6.676 | 6.975 | 6.571 | 6.975 | 257.2 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 191.783 | 229.526 | 186.164 | 229.526 | 215.0 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1546.088 | 1548.360 | 1537.631 | 1548.360 | 257.2 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.910 | 5.642 | 4.814 | 5.642 | 210.3 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.778 | 5.854 | 5.735 | 5.854 | 257.2 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.293 | 0.310 | 0.266 | 0.310 | 204.2 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.452 | 2.550 | 2.387 | 2.550 | 257.2 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.752 | 19.830 | 12.757 | 19.830 | 194.0 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 41.167 | 41.436 | 40.926 | 41.436 | 257.2 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.125 | 2.596 | 1.990 | 2.596 | 200.6 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.623 | 8.763 | 8.360 | 8.763 | 257.2 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 208.883 | 214.049 | 185.711 | 214.049 | 206.2 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1515.877 | 1608.293 | 1510.946 | 1608.293 | 257.2 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 3.168 | 5.735 | 3.123 | 5.735 | 203.9 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 3.952 | 4.330 | 3.913 | 4.330 | 257.2 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.284 | 0.290 | 0.263 | 0.290 | 198.6 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.072 | 1.096 | 1.055 | 1.096 | 257.2 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 8.662 | 10.302 | 7.802 | 10.302 | 176.5 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 20.358 | 21.296 | 20.199 | 21.296 | 257.2 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.369 | 2.940 | 2.098 | 2.940 | 196.2 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.489 | 8.787 | 8.302 | 8.787 | 257.2 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 193.934 | 200.976 | 190.202 | 200.976 | 147.5 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1542.836 | 1596.956 | 1531.159 | 1596.956 | 257.2 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 169.972 | 178.064 | 165.758 | 178.064 | 152.0 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1490.129 | 1576.403 | 1489.909 | 1576.403 | 257.2 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.143 | 2.069 | 1.020 | 2.069 | 151.5 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.647 | 3.752 | 3.563 | 3.752 | 257.2 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.088 | 0.123 | 0.086 | 0.123 | 147.5 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.668 | 0.744 | 0.662 | 0.744 | 257.2 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 137.3 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.430 | 0.448 | 0.418 | 0.448 | 257.2 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.326 | 0.373 | 0.308 | 0.373 | 142.1 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 13.653 | 13.861 | 13.370 | 13.861 | 257.2 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.021 | 0.012 | 0.021 | 141.7 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.511 | 0.437 | 0.511 | 257.2 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 212.710 | 313.192 | 192.985 | 313.192 | 157.8 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1661.797 | 1818.659 | 1622.488 | 1818.659 | 257.2 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 171.610 | 186.771 | 166.224 | 186.771 | 170.3 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1579.414 | 1712.263 | 1563.367 | 1712.263 | 257.2 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 1.595 | 2.738 | 1.421 | 2.738 | 167.6 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 3.958 | 4.293 | 3.899 | 4.293 | 257.2 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.143 | 0.215 | 0.120 | 0.215 | 158.6 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.708 | 0.811 | 0.698 | 0.811 | 257.2 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.628 | 15.522 | 13.511 | 15.522 | 157.6 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.233 | 57.797 | 50.498 | 57.797 | 257.2 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.976 | 14.664 | 13.829 | 14.664 | 156.5 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 50.506 | 56.056 | 49.897 | 56.056 | 257.2 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.212 | 15.942 | 13.981 | 15.942 | 152.5 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 45.451 | 53.477 | 44.892 | 53.477 | 257.2 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.220 | 0.448 | 0.187 | 0.448 | 152.6 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.588 | 11.912 | 5.424 | 11.912 | 257.2 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.013 | 0.014 | 137.0 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.503 | 0.452 | 0.503 | 257.2 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 176.667 | 179.268 | 175.975 | 179.268 | 154.6 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1585.206 | 1847.990 | 1550.155 | 1847.990 | 257.2 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 163.264 | 201.096 | 162.206 | 201.096 | 167.1 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1588.445 | 1724.205 | 1522.976 | 1724.205 | 257.2 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.935 | 1.207 | 0.796 | 1.207 | 164.4 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.773 | 3.884 | 3.706 | 3.884 | 257.2 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.115 | 0.131 | 0.105 | 0.131 | 155.4 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.671 | 0.711 | 0.646 | 0.711 | 257.2 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.098 | 3.279 | 3.053 | 3.279 | 154.5 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 21.848 | 22.499 | 21.778 | 22.499 | 257.2 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.271 | 3.761 | 3.222 | 3.761 | 153.4 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 21.812 | 23.733 | 21.655 | 23.733 | 257.2 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.881 | 5.552 | 3.489 | 5.552 | 149.5 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.079 | 16.213 | 15.937 | 16.213 | 257.2 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.209 | 0.226 | 0.206 | 0.226 | 149.6 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.519 | 5.755 | 5.398 | 5.755 | 257.2 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.896 | 8.624 | 7.348 | 8.624 | 156.2 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 45.049 | 53.795 | 45.012 | 53.795 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.137 | 1.396 | 1.136 | 1.396 | 157.6 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 9.091 | 9.795 | 9.024 | 9.795 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.367 | 0.392 | 0.364 | 0.392 | 155.3 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 4.685 | 4.906 | 4.671 | 4.906 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 2.020 | 2.483 | 1.981 | 2.483 | 158.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 4.953 | 4.983 | 4.930 | 4.983 | 257.2 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.444 | 0.700 | 0.444 | 0.700 | 151.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 4.961 | 5.097 | 4.902 | 5.097 | 257.2 |
| evaluation-flat-large-parallel | evaluation-point-processes | python-prophet | 4 | 1968.492 | 2482.575 | 1771.167 | 2482.575 | 257.2 |
| evaluation-flat-large-parallel | evaluation-point-threads | python-prophet | 4 | 198.578 | 200.560 | 195.302 | 200.560 | 257.2 |
| evaluation-flat-large-parallel | evaluation-point | effect-prophet | 4 | 22.200 | 23.237 | 22.120 | 23.237 | 178.1 |
| evaluation-flat-large-parallel | evaluation-point | python-prophet | 4 | 172.201 | 196.552 | 166.380 | 196.552 | 257.2 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 183.326 | 192.033 | 181.811 | 192.033 | 157.3 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1337.172 | 1356.153 | 1333.701 | 1356.153 | 257.2 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.715 | 3.079 | 2.671 | 3.079 | 157.2 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.253 | 1.265 | 1.225 | 1.265 | 257.2 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.161 | 0.164 | 0.158 | 0.164 | 134.5 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.478 | 0.562 | 0.468 | 0.562 | 257.2 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.077 | 0.120 | 0.062 | 0.120 | 156.1 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 4.904 | 5.004 | 4.849 | 5.004 | 257.2 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 2.556 | 3.337 | 2.487 | 3.337 | 147.5 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.705 | 0.743 | 0.703 | 0.743 | 257.2 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 7.488 | 7.917 | 6.178 | 7.917 | 155.7 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 36.598 | 38.482 | 35.994 | 38.482 | 257.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 5.256 | 8.761 | 4.884 | 8.761 | 152.3 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 57.231 | 74.270 | 56.975 | 74.270 | 257.2 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 178.446 | 197.755 | 175.652 | 197.755 | 155.5 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1354.251 | 1455.567 | 1349.500 | 1455.567 | 257.2 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.226 | 1.267 | 1.200 | 1.267 | 155.5 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.354 | 1.455 | 1.325 | 1.455 | 257.2 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.034 | 0.049 | 0.033 | 0.049 | 133.8 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.399 | 0.506 | 0.390 | 0.506 | 257.2 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.115 | 0.129 | 0.108 | 0.129 | 154.7 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 4.902 | 5.172 | 4.880 | 5.172 | 257.2 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.299 | 1.489 | 1.173 | 1.489 | 136.9 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.749 | 0.821 | 0.687 | 0.821 | 257.2 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.109 | 7.856 | 4.025 | 7.856 | 152.1 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 42.792 | 44.311 | 42.655 | 44.311 | 257.2 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 1.984 | 2.485 | 1.857 | 2.485 | 157.8 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 12.444 | 15.177 | 12.272 | 15.177 | 257.2 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.272 | 0.311 | 0.263 | 0.311 | 184.0 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 257.2 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.286 | 0.351 | 0.272 | 0.351 | 174.5 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.010 | 0.008 | 0.010 | 257.2 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.107 | 15.891 | 11.774 | 15.891 | 155.4 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 145.605 | 148.195 | 136.890 | 148.195 | 257.2 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 61.638 | 62.109 | 60.257 | 62.109 | 162.6 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 277.462 | 281.513 | 277.073 | 281.513 | 257.2 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 251.582 | 260.318 | 247.956 | 260.318 | 194.8 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1538.367 | 1583.229 | 1533.886 | 1583.229 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 6.398 | 6.921 | 6.298 | 6.921 | 194.7 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 1.930 | 1.968 | 1.917 | 1.968 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.283 | 0.308 | 0.255 | 0.308 | 138.5 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.748 | 0.778 | 0.697 | 0.778 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.102 | 0.131 | 0.099 | 0.131 | 178.4 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.005 | 5.051 | 4.951 | 5.051 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.500 | 3.123 | 2.467 | 3.123 | 148.2 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 0.980 | 1.021 | 0.976 | 1.021 | 257.2 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 59.988 | 60.979 | 59.497 | 60.979 | 163.6 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 218.476 | 231.447 | 211.756 | 231.447 | 257.2 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.142 | 0.350 | 0.118 | 0.350 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.598 | 0.610 | 0.591 | 0.610 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 174.136 | 190.705 | 171.141 | 190.705 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1309.579 | 1371.873 | 1307.389 | 1371.873 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 169.858 | 178.345 | 162.496 | 178.345 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1307.901 | 1344.657 | 1303.557 | 1344.657 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.139 | 0.164 | 0.130 | 0.164 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.543 | 3.709 | 3.468 | 3.709 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.029 | 0.033 | 0.027 | 0.033 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.772 | 0.802 | 0.752 | 0.802 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.437 | 3.107 | 2.093 | 3.107 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.529 | 13.934 | 13.388 | 13.934 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.225 | 2.371 | 2.164 | 2.371 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 12.814 | 13.258 | 12.672 | 13.258 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.631 | 3.626 | 2.412 | 3.626 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 8.507 | 8.634 | 8.470 | 8.634 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.500 | 0.553 | 0.500 | 0.553 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.692 | 4.816 | 4.566 | 4.816 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.054 | 0.082 | 0.044 | 0.082 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.499 | 0.515 | 0.487 | 0.515 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 176.247 | 179.419 | 175.845 | 179.419 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1348.121 | 1462.551 | 1326.672 | 1462.551 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 161.904 | 164.942 | 161.016 | 164.942 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1319.405 | 1336.949 | 1305.379 | 1336.949 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.132 | 0.147 | 0.129 | 0.147 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.349 | 3.524 | 3.296 | 3.524 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.034 | 0.042 | 0.027 | 0.042 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.636 | 0.736 | 0.609 | 0.736 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.499 | 4.875 | 4.490 | 4.875 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 26.695 | 26.997 | 26.478 | 26.997 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.751 | 4.963 | 4.662 | 4.963 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.760 | 28.503 | 26.753 | 28.503 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.455 | 6.839 | 5.364 | 6.839 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 21.825 | 25.147 | 21.760 | 25.147 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.293 | 0.346 | 0.266 | 0.346 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.360 | 4.577 | 4.301 | 4.577 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.804 | 161.098 | 157.069 | 161.098 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1303.114 | 1327.045 | 1295.258 | 1327.045 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.133 | 0.160 | 0.132 | 0.160 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 1.838 | 1.965 | 1.833 | 1.965 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.048 | 0.021 | 0.048 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.360 | 0.374 | 0.354 | 0.374 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.241 | 1.621 | 1.232 | 1.621 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 2.713 | 2.843 | 2.692 | 2.843 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.263 | 0.297 | 0.256 | 0.297 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.387 | 2.426 | 2.374 | 2.426 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.124 | 168.326 | 161.815 | 168.326 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1306.734 | 1345.983 | 1305.987 | 1345.983 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.174 | 0.114 | 0.174 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 1.865 | 1.910 | 1.850 | 1.910 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.037 | 0.016 | 0.037 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.365 | 0.374 | 0.363 | 0.374 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.095 | 1.400 | 1.056 | 1.400 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 2.773 | 2.901 | 2.725 | 2.901 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.296 | 0.371 | 0.256 | 0.371 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.388 | 2.453 | 2.375 | 2.453 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.095 | 0.135 | 0.087 | 0.135 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.855 | 0.875 | 0.842 | 0.875 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 189.650 | 203.554 | 182.320 | 203.554 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1340.970 | 1367.727 | 1330.559 | 1367.727 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 169.382 | 176.449 | 168.548 | 176.449 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1325.608 | 1341.161 | 1324.015 | 1341.161 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.195 | 0.230 | 0.181 | 0.230 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.332 | 3.408 | 3.266 | 3.408 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.024 | 0.041 | 0.022 | 0.041 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.123 | 1.134 | 1.077 | 1.134 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.707 | 4.832 | 4.598 | 4.832 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 28.946 | 30.205 | 28.661 | 30.205 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.706 | 7.413 | 5.706 | 7.413 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 27.873 | 28.834 | 27.756 | 28.834 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 4.809 | 5.082 | 4.770 | 5.082 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 23.872 | 26.373 | 23.835 | 26.373 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.971 | 1.018 | 0.913 | 1.018 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.024 | 4.086 | 4.007 | 4.086 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.024 | 0.016 | 0.024 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.437 | 0.468 | 0.421 | 0.468 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 174.929 | 263.819 | 167.640 | 263.819 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1307.100 | 1343.312 | 1303.700 | 1343.312 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 162.358 | 204.494 | 159.970 | 204.494 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1318.048 | 1363.819 | 1301.266 | 1363.819 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.119 | 0.269 | 0.082 | 0.269 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 1.924 | 2.042 | 1.888 | 2.042 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.047 | 0.103 | 0.020 | 0.103 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.404 | 0.441 | 0.399 | 0.441 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.459 | 1.625 | 1.390 | 1.625 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.035 | 12.622 | 11.586 | 12.622 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.530 | 1.779 | 1.413 | 1.779 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 11.156 | 13.399 | 11.134 | 13.399 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.988 | 2.499 | 1.756 | 2.499 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.388 | 9.156 | 8.301 | 9.156 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.305 | 0.325 | 0.268 | 0.325 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 2.879 | 3.254 | 2.778 | 3.254 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.035 | 0.015 | 0.035 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.449 | 0.470 | 0.427 | 0.470 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 171.540 | 181.168 | 167.519 | 181.168 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1356.628 | 1393.918 | 1294.813 | 1393.918 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 161.939 | 421.289 | 157.529 | 421.289 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1315.107 | 1332.597 | 1295.062 | 1332.597 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.107 | 0.140 | 0.086 | 0.140 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 1.940 | 2.133 | 1.911 | 2.133 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.028 | 0.055 | 0.018 | 0.055 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.428 | 0.460 | 0.414 | 0.460 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.409 | 1.783 | 1.352 | 1.783 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 11.697 | 12.166 | 11.545 | 12.166 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.599 | 1.900 | 1.420 | 1.900 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.402 | 17.148 | 11.185 | 17.148 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 2.054 | 3.201 | 1.746 | 3.201 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.657 | 8.834 | 8.367 | 8.834 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.296 | 0.853 | 0.271 | 0.853 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 2.805 | 2.931 | 2.772 | 2.931 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.035 | 0.013 | 0.035 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.465 | 0.525 | 0.433 | 0.525 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 287.245 | 301.659 | 285.058 | 301.659 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1701.594 | 1738.136 | 1668.312 | 1738.136 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 159.170 | 162.247 | 158.179 | 162.247 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1326.900 | 1531.144 | 1319.050 | 1531.144 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.119 | 0.148 | 0.109 | 0.148 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.126 | 2.536 | 2.086 | 2.536 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.032 | 0.049 | 0.023 | 0.049 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.443 | 0.485 | 0.421 | 0.485 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 103.645 | 104.355 | 103.337 | 104.355 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 363.495 | 369.569 | 359.068 | 369.569 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 103.963 | 105.603 | 103.561 | 105.603 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 368.648 | 372.010 | 361.100 | 372.010 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 105.438 | 108.112 | 103.962 | 108.112 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 359.896 | 365.487 | 358.478 | 365.487 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.324 | 0.514 | 0.278 | 0.514 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 2.938 | 3.087 | 2.878 | 3.087 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 190.439 | 200.786 | 185.176 | 200.786 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1296.359 | 1330.916 | 1289.228 | 1330.916 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.175 | 0.219 | 0.127 | 0.219 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 1.899 | 1.972 | 1.890 | 1.972 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.058 | 0.025 | 0.058 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.401 | 0.436 | 0.395 | 0.436 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 2.170 | 2.381 | 1.857 | 2.381 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.094 | 7.411 | 6.728 | 7.411 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.324 | 0.436 | 0.314 | 0.436 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.452 | 2.585 | 2.429 | 2.585 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.616 | 168.432 | 160.309 | 168.432 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1294.068 | 1349.001 | 1292.104 | 1349.001 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.161 | 0.222 | 0.123 | 0.222 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 1.984 | 7.517 | 1.853 | 7.517 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.032 | 0.019 | 0.032 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.422 | 1.092 | 0.394 | 1.092 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.822 | 4.048 | 3.682 | 4.048 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 18.526 | 19.245 | 18.185 | 19.245 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.277 | 0.337 | 0.276 | 0.337 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.489 | 2.658 | 2.423 | 2.658 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.087 | 0.046 | 0.087 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.507 | 0.548 | 0.475 | 0.548 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 180.057 | 195.351 | 179.997 | 195.351 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1347.034 | 1404.811 | 1343.821 | 1404.811 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 163.847 | 173.665 | 159.312 | 173.665 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1322.283 | 1344.013 | 1307.239 | 1344.013 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.140 | 0.251 | 0.136 | 0.251 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.286 | 3.436 | 3.205 | 3.436 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.038 | 0.057 | 0.035 | 0.057 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.640 | 0.702 | 0.604 | 0.702 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.997 | 4.000 | 2.932 | 4.000 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 46.065 | 46.602 | 45.715 | 46.602 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.219 | 3.807 | 3.077 | 3.807 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 46.628 | 48.306 | 45.142 | 48.306 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 4.013 | 5.268 | 3.866 | 5.268 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 40.583 | 41.731 | 40.552 | 41.731 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.275 | 0.301 | 0.264 | 0.301 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.301 | 4.389 | 4.296 | 4.389 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.665 | 165.548 | 158.509 | 165.548 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1297.126 | 1377.061 | 1292.792 | 1377.061 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.190 | 0.212 | 0.183 | 0.212 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.333 | 3.479 | 3.229 | 3.479 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.017 | 0.021 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.619 | 0.663 | 0.589 | 0.663 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.097 | 2.715 | 1.964 | 2.715 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 7.220 | 7.947 | 7.153 | 7.947 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.295 | 0.305 | 0.292 | 0.305 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.380 | 4.566 | 4.336 | 4.566 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.468 | 167.201 | 160.772 | 167.201 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1307.105 | 1719.719 | 1303.917 | 1719.719 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.186 | 0.206 | 0.175 | 0.206 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.815 | 5.312 | 3.565 | 5.312 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.017 | 0.020 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.771 | 1.057 | 0.736 | 1.057 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.396 | 2.751 | 2.267 | 2.751 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.057 | 14.152 | 8.698 | 14.152 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.484 | 0.560 | 0.469 | 0.560 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.315 | 6.995 | 4.307 | 6.995 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.099 | 0.376 | 0.095 | 0.376 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.593 | 0.610 | 0.591 | 0.610 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 181.117 | 190.837 | 177.804 | 190.837 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1322.853 | 1355.098 | 1315.730 | 1355.098 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 171.389 | 173.382 | 165.961 | 173.382 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1313.957 | 1356.781 | 1313.488 | 1356.781 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.163 | 0.191 | 0.123 | 0.191 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.566 | 3.983 | 3.460 | 3.983 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.025 | 0.031 | 0.023 | 0.031 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.750 | 0.786 | 0.744 | 0.786 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.057 | 2.821 | 2.018 | 2.821 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.486 | 14.085 | 13.371 | 14.085 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.236 | 2.278 | 2.173 | 2.278 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.002 | 13.287 | 12.951 | 13.287 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.245 | 3.506 | 2.237 | 3.506 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 8.654 | 9.305 | 8.626 | 9.305 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.499 | 0.502 | 0.495 | 0.502 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.412 | 4.553 | 4.337 | 4.553 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.055 | 0.063 | 0.051 | 0.063 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.501 | 0.530 | 0.484 | 0.530 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 178.333 | 188.460 | 174.487 | 188.460 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1316.930 | 1352.956 | 1306.717 | 1352.956 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 169.774 | 172.701 | 167.288 | 172.701 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1316.790 | 1328.806 | 1307.220 | 1328.806 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.131 | 0.168 | 0.124 | 0.168 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.412 | 3.551 | 3.231 | 3.551 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.026 | 0.037 | 0.025 | 0.037 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.620 | 0.634 | 0.609 | 0.634 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.246 | 1.311 | 1.210 | 1.311 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 11.949 | 13.889 | 11.760 | 13.889 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.460 | 1.858 | 1.333 | 1.858 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 11.228 | 11.576 | 11.205 | 11.576 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 2.510 | 3.678 | 2.020 | 3.678 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.335 | 7.740 | 7.160 | 7.740 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.305 | 0.362 | 0.250 | 0.362 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.301 | 4.798 | 4.301 | 4.798 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.621 | 162.115 | 157.990 | 162.115 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1316.858 | 1688.164 | 1311.112 | 1688.164 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.164 | 0.114 | 0.164 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 1.879 | 1.942 | 1.873 | 1.942 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.073 | 0.017 | 0.073 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.412 | 0.436 | 0.403 | 0.436 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.806 | 2.007 | 1.761 | 2.007 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 6.867 | 7.555 | 6.791 | 7.555 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.272 | 0.326 | 0.251 | 0.326 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.436 | 2.544 | 2.416 | 2.544 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.038 | 164.052 | 159.612 | 164.052 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1309.430 | 1349.015 | 1302.884 | 1349.015 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.146 | 0.157 | 0.132 | 0.157 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.960 | 1.975 | 1.847 | 1.975 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.018 | 0.031 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.409 | 0.444 | 0.395 | 0.444 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.944 | 3.984 | 3.804 | 3.984 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 18.623 | 19.362 | 18.375 | 19.362 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.267 | 0.319 | 0.265 | 0.319 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.484 | 2.536 | 2.471 | 2.536 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.346 | 165.665 | 160.296 | 165.665 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1299.253 | 1338.022 | 1294.981 | 1338.022 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.185 | 0.220 | 0.183 | 0.220 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.513 | 3.992 | 3.458 | 3.992 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.731 | 0.748 | 0.707 | 0.748 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.415 | 5.001 | 2.115 | 5.001 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.326 | 8.627 | 8.168 | 8.627 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.173 | 0.259 | 0.149 | 0.259 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.315 | 4.386 | 4.303 | 4.386 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.164 | 171.156 | 160.774 | 171.156 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1316.541 | 1333.514 | 1315.384 | 1333.514 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.186 | 0.407 | 0.180 | 0.407 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.441 | 3.527 | 3.426 | 3.527 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.026 | 0.018 | 0.026 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.732 | 0.750 | 0.729 | 0.750 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.582 | 4.693 | 2.572 | 4.693 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 9.026 | 9.094 | 8.799 | 9.094 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.160 | 0.273 | 0.146 | 0.273 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.305 | 4.558 | 4.266 | 4.558 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.486 | 177.289 | 162.134 | 177.289 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1309.934 | 1321.858 | 1303.386 | 1321.858 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.196 | 0.209 | 0.188 | 0.209 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.463 | 3.642 | 3.419 | 3.642 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.045 | 0.020 | 0.045 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.735 | 0.800 | 0.709 | 0.800 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.558 | 4.767 | 2.247 | 4.767 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.250 | 8.356 | 8.220 | 8.356 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.153 | 0.270 | 0.152 | 0.270 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.264 | 5.840 | 4.181 | 5.840 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.654 | 168.615 | 160.419 | 168.615 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1324.627 | 1361.171 | 1315.417 | 1361.171 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.188 | 0.217 | 0.175 | 0.217 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.546 | 3.604 | 3.483 | 3.604 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.021 | 0.022 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.729 | 0.751 | 0.728 | 0.751 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.105 | 4.944 | 2.265 | 4.944 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.316 | 11.813 | 8.217 | 11.813 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.150 | 0.172 | 0.148 | 0.172 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.424 | 5.335 | 4.397 | 5.335 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.690 | 185.724 | 163.459 | 185.724 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1312.095 | 1318.399 | 1296.870 | 1318.399 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.208 | 0.221 | 0.200 | 0.221 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.336 | 3.550 | 3.273 | 3.550 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.020 | 0.022 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.599 | 0.625 | 0.570 | 0.625 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.832 | 1.955 | 1.831 | 1.955 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.326 | 10.093 | 6.720 | 10.093 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.210 | 0.253 | 0.201 | 0.253 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.304 | 4.872 | 4.275 | 4.872 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.679 | 177.109 | 160.480 | 177.109 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1299.861 | 1376.718 | 1296.538 | 1376.718 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.227 | 0.259 | 0.203 | 0.259 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.257 | 3.379 | 3.184 | 3.379 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.564 | 0.584 | 0.561 | 0.584 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.977 | 2.102 | 1.728 | 2.102 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 6.894 | 7.592 | 6.853 | 7.592 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.223 | 0.249 | 0.213 | 0.249 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.384 | 4.649 | 4.280 | 4.649 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.716 | 163.580 | 158.281 | 163.580 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1306.959 | 1307.964 | 1305.362 | 1307.964 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.250 | 0.187 | 0.250 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.314 | 3.480 | 3.208 | 3.480 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.020 | 0.022 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.590 | 0.611 | 0.565 | 0.611 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 1.990 | 2.130 | 1.725 | 2.130 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.145 | 7.814 | 7.049 | 7.814 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.220 | 0.289 | 0.201 | 0.289 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.676 | 4.799 | 4.383 | 4.799 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.152 | 166.243 | 158.209 | 166.243 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1345.737 | 1843.675 | 1340.599 | 1843.675 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.208 | 0.213 | 0.187 | 0.213 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.225 | 3.357 | 3.205 | 3.357 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.019 | 0.024 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.577 | 0.610 | 0.574 | 0.610 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 2.001 | 3.318 | 1.739 | 3.318 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.396 | 7.497 | 6.930 | 7.497 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.211 | 0.217 | 0.209 | 0.217 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.332 | 4.471 | 4.261 | 4.471 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.730 | 164.336 | 159.859 | 164.336 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1722.572 | 1812.408 | 1716.402 | 1812.408 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.210 | 0.189 | 0.210 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 4.522 | 4.573 | 3.316 | 4.573 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.018 | 0.025 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.792 | 0.835 | 0.779 | 0.835 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.219 | 2.410 | 2.133 | 2.410 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 10.381 | 10.887 | 10.212 | 10.887 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.211 | 0.257 | 0.210 | 0.257 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 5.109 | 5.504 | 4.472 | 5.504 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.629 | 163.696 | 160.190 | 163.696 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1334.199 | 1442.222 | 1303.626 | 1442.222 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.230 | 0.183 | 0.230 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.415 | 3.616 | 3.324 | 3.616 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.016 | 0.023 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.598 | 0.689 | 0.594 | 0.689 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.267 | 2.428 | 2.226 | 2.428 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 9.440 | 10.051 | 7.943 | 10.051 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.233 | 0.279 | 0.197 | 0.279 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.737 | 5.734 | 4.734 | 5.734 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.197 | 0.213 | 0.187 | 0.213 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.861 | 0.875 | 0.835 | 0.875 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 206.862 | 211.105 | 202.738 | 211.105 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1456.242 | 1512.379 | 1447.649 | 1512.379 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 23.861 | 24.286 | 23.417 | 24.286 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 121.062 | 129.340 | 120.561 | 129.340 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 24.130 | 27.809 | 23.822 | 27.809 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 120.668 | 122.418 | 119.776 | 122.418 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 24.677 | 25.131 | 23.536 | 25.131 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 95.275 | 108.278 | 94.189 | 108.278 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 1.208 | 2.004 | 1.044 | 2.004 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 25.264 | 25.724 | 25.052 | 25.724 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.647 | 165.341 | 157.653 | 165.341 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1318.976 | 1343.898 | 1294.465 | 1343.898 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.196 | 0.278 | 0.185 | 0.278 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 1.985 | 2.081 | 1.953 | 2.081 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.069 | 0.021 | 0.069 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.430 | 0.905 | 0.420 | 0.905 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 158.770 | 165.385 | 158.350 | 165.385 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 563.451 | 586.625 | 559.349 | 586.625 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.315 | 0.327 | 0.290 | 0.327 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 2.910 | 3.158 | 2.889 | 3.158 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.532 | 161.999 | 158.639 | 161.999 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1294.695 | 1365.434 | 1288.634 | 1365.434 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.192 | 0.198 | 0.180 | 0.198 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.008 | 2.080 | 1.967 | 2.080 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.044 | 0.019 | 0.044 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.416 | 0.434 | 0.415 | 0.434 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.413 | 4.522 | 4.315 | 4.522 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 18.995 | 19.785 | 18.865 | 19.785 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.300 | 0.305 | 0.281 | 0.305 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 2.897 | 2.945 | 2.824 | 2.945 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 169.201 | 177.575 | 166.523 | 177.575 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1315.642 | 1333.437 | 1288.348 | 1333.437 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.148 | 0.170 | 0.138 | 0.170 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.674 | 1.732 | 1.670 | 1.732 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.029 | 0.047 | 0.026 | 0.047 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.301 | 0.306 | 0.288 | 0.306 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.514 | 0.739 | 0.506 | 0.739 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.563 | 2.723 | 2.550 | 2.723 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.151 | 0.167 | 0.150 | 0.167 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.378 | 2.461 | 2.353 | 2.461 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 179.172 | 191.217 | 176.110 | 191.217 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1296.501 | 1395.094 | 1294.589 | 1395.094 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.146 | 0.183 | 0.129 | 0.183 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.763 | 2.098 | 1.732 | 2.098 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.018 | 0.033 | 0.018 | 0.033 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.317 | 0.355 | 0.304 | 0.355 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 1.007 | 1.348 | 0.907 | 1.348 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.322 | 7.160 | 5.073 | 7.160 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.219 | 0.358 | 0.159 | 0.358 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.491 | 3.316 | 2.401 | 3.316 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 175.462 | 186.703 | 174.436 | 186.703 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1492.934 | 1546.644 | 1484.339 | 1546.644 | n/a |
| mcmc-flat-mixed-components | model-json-decode | effect-prophet | 6 | 1.422 | 1.647 | 1.347 | 1.647 | n/a |
| mcmc-flat-mixed-components | model-json-decode | python-prophet | 6 | 8.934 | 9.336 | 8.660 | 9.336 | n/a |
| mcmc-flat-mixed-components | model-json-encode | effect-prophet | 6 | 0.150 | 0.181 | 0.140 | 0.181 | n/a |
| mcmc-flat-mixed-components | model-json-encode | python-prophet | 6 | 12.320 | 12.535 | 12.196 | 12.535 | n/a |
| mcmc-flat-mixed-components | warm-fit | effect-prophet | 6 | 637.593 | 639.826 | 630.104 | 639.826 | n/a |
| mcmc-flat-mixed-components | warm-fit | python-prophet | 6 | 504.357 | 519.252 | 501.653 | 519.252 | n/a |
| mcmc-flat-mixed-components | warm-predict | effect-prophet | 6 | 0.292 | 0.311 | 0.288 | 0.311 | n/a |
| mcmc-flat-mixed-components | warm-predict | python-prophet | 6 | 4.673 | 4.874 | 4.606 | 4.874 | n/a |
| mcmc-flat-mixed-components | warm-uncertainty | effect-prophet | 6 | 2.103 | 2.160 | 1.871 | 2.160 | 159.9 |
| mcmc-flat-mixed-components | warm-uncertainty | python-prophet | 6 | 124.416 | 137.990 | 121.553 | 137.990 | 257.2 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 299.180 | 311.374 | 297.850 | 311.374 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1843.216 | 2329.952 | 1786.272 | 2329.952 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 168.824 | 171.583 | 164.284 | 171.583 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1437.702 | 2225.684 | 1420.511 | 2225.684 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.144 | 0.158 | 0.119 | 0.158 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.060 | 2.918 | 2.018 | 2.918 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.017 | 0.035 | 0.015 | 0.035 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.460 | 0.694 | 0.402 | 0.694 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.021 | 0.029 | 0.019 | 0.029 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.496 | 0.709 | 0.463 | 0.709 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.924 | 5.154 | 4.876 | 5.154 | 143.9 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 144.789 | 178.976 | 119.377 | 178.976 | 257.2 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 170.567 | 197.710 | 169.416 | 197.710 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1408.862 | 1577.055 | 1395.435 | 1577.055 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 178.005 | 204.268 | 173.664 | 204.268 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1437.335 | 1525.630 | 1390.839 | 1525.630 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.194 | 0.325 | 0.171 | 0.325 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.329 | 3.511 | 3.283 | 3.511 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.020 | 0.026 | 0.018 | 0.026 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.654 | 0.759 | 0.611 | 0.759 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.053 | 0.076 | 0.045 | 0.076 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.483 | 0.536 | 0.472 | 0.536 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.055 | 1.442 | 0.961 | 1.442 | 140.1 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 67.276 | 68.091 | 66.168 | 68.091 | 257.2 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 209.860 | 411.645 | 188.199 | 411.645 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1370.445 | 1425.016 | 1350.887 | 1425.016 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.605 | 178.116 | 169.357 | 178.116 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1370.877 | 1654.312 | 1350.443 | 1654.312 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.339 | 0.560 | 0.276 | 0.560 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.634 | 4.624 | 3.572 | 4.624 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.023 | 0.051 | 0.015 | 0.051 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.793 | 0.918 | 0.740 | 0.918 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.119 | 0.176 | 0.085 | 0.176 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.591 | 0.628 | 0.577 | 0.628 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.917 | 1.159 | 0.839 | 1.159 | 150.9 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 18.795 | 30.691 | 18.484 | 30.691 | 257.2 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 232.688 | 244.276 | 230.809 | 244.276 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1698.470 | 1702.996 | 1689.123 | 1702.996 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.102 | 0.238 | 0.096 | 0.238 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.861 | 0.889 | 0.827 | 0.889 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 19.945 | 22.189 | 18.189 | 22.189 | 196.1 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 249.202 | 270.966 | 246.286 | 270.966 | 257.2 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 104.677 | 105.612 | 104.498 | 105.612 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 358.545 | 386.641 | 354.310 | 386.641 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.144 | 7.884 | 5.980 | 7.884 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.233 | 8.837 | 8.159 | 8.837 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `b7a56669f96d6fd0b7aa03fb7b574f05954fc1e2`
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

