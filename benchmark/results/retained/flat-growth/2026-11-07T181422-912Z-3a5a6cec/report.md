# Effect Prophet benchmark — 2026-11-07T181422-912Z-3a5a6cec

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
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12254 | 25352 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12254 | 25352 |

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
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.372 | 10.851 | 10.117 | 10.851 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 133.321 | 150.623 | 131.292 | 150.623 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 1.834 | 4.159 | 1.769 | 4.159 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.846 | 7.624 | 6.746 | 7.624 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.393 | 6.575 | 6.375 | 6.575 | 143.5 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 122.584 | 144.158 | 122.262 | 144.158 | 256.4 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.021 | 0.013 | 0.021 | 139.0 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.444 | 0.474 | 0.429 | 0.474 | 256.4 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 227.320 | 255.020 | 202.755 | 255.020 | 154.0 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1649.802 | 1733.569 | 1640.699 | 1733.569 | 256.4 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 188.295 | 203.472 | 166.346 | 203.472 | 168.0 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1574.437 | 1625.091 | 1570.867 | 1625.091 | 256.4 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 1.440 | 1.654 | 1.356 | 1.654 | 165.2 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.284 | 3.414 | 3.200 | 3.414 | 256.4 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.135 | 0.184 | 0.114 | 0.184 | 156.2 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.529 | 0.556 | 0.488 | 0.556 | 256.4 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.278 | 22.408 | 20.957 | 22.408 | 153.8 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 72.199 | 73.524 | 71.518 | 73.524 | 256.4 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 21.519 | 23.273 | 21.354 | 23.273 | 152.7 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 71.293 | 75.021 | 70.845 | 75.021 | 256.4 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 21.819 | 23.490 | 21.481 | 23.490 | 149.1 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 65.381 | 66.375 | 65.275 | 66.375 | 256.4 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.314 | 0.330 | 0.250 | 0.330 | 150.5 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.263 | 5.404 | 5.225 | 5.404 | 256.4 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 196.354 | 700.031 | 190.941 | 700.031 | 243.6 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1617.302 | 1731.054 | 1601.283 | 1731.054 | 256.4 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.870 | 3.631 | 2.748 | 3.631 | 236.7 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.118 | 9.267 | 9.074 | 9.267 | 256.4 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.115 | 0.136 | 0.099 | 0.136 | 230.7 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.051 | 3.218 | 2.997 | 3.218 | 256.4 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.300 | 24.882 | 21.071 | 24.882 | 204.7 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 84.645 | 88.177 | 83.305 | 88.177 | 256.4 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.813 | 4.077 | 2.979 | 4.077 | 221.1 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.091 | 9.779 | 8.978 | 9.779 | 256.4 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 179.002 | 203.071 | 177.051 | 203.071 | 201.6 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1598.128 | 1623.873 | 1589.624 | 1623.873 | 256.4 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.685 | 1.785 | 1.601 | 1.785 | 196.4 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.924 | 5.044 | 4.868 | 5.044 | 256.4 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.116 | 0.146 | 0.103 | 0.146 | 194.1 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.258 | 1.288 | 1.245 | 1.288 | 256.4 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 9.336 | 9.991 | 7.390 | 9.991 | 167.2 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.761 | 25.098 | 24.221 | 25.098 | 256.4 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.686 | 3.158 | 2.447 | 3.158 | 192.4 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.034 | 7.160 | 6.890 | 7.160 | 256.4 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.017 | 0.011 | 0.017 | 131.9 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.460 | 0.489 | 0.454 | 0.489 | 256.4 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 176.725 | 186.700 | 173.241 | 186.700 | 145.7 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1596.070 | 1640.892 | 1590.434 | 1640.892 | 256.4 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 165.130 | 166.411 | 159.986 | 166.411 | 148.9 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1565.584 | 1605.675 | 1558.076 | 1605.675 | 256.4 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.224 | 1.167 | 0.199 | 1.167 | 148.9 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.045 | 2.226 | 2.019 | 2.226 | 256.4 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.042 | 0.080 | 0.037 | 0.080 | 146.4 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.448 | 0.457 | 0.396 | 0.457 | 256.4 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.347 | 1.385 | 1.295 | 1.385 | 145.5 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 13.451 | 13.798 | 13.173 | 13.798 | 256.4 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.458 | 1.932 | 1.407 | 1.932 | 145.4 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.714 | 13.619 | 12.154 | 13.619 | 256.4 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.531 | 3.344 | 2.022 | 3.344 | 137.7 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.287 | 9.692 | 9.199 | 9.692 | 256.4 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.186 | 0.208 | 0.157 | 0.208 | 139.7 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.053 | 3.165 | 3.034 | 3.165 | 256.4 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.047 | 0.073 | 0.030 | 0.073 | 144.5 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.595 | 0.741 | 0.571 | 0.741 | 256.4 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 203.752 | 224.353 | 202.062 | 224.353 | 187.9 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1643.300 | 1677.671 | 1626.857 | 1677.671 | 256.4 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 179.073 | 186.442 | 175.674 | 186.442 | 189.4 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1597.085 | 1619.253 | 1563.946 | 1619.253 | 256.4 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 0.758 | 1.123 | 0.753 | 1.123 | 189.3 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.165 | 3.217 | 3.103 | 3.217 | 256.4 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.095 | 0.136 | 0.083 | 0.136 | 188.1 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.495 | 0.532 | 0.472 | 0.532 | 256.4 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 19.312 | 22.083 | 19.251 | 22.083 | 187.1 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 69.629 | 75.255 | 68.262 | 75.255 | 256.4 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 20.689 | 22.086 | 19.505 | 22.086 | 168.9 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 69.027 | 73.087 | 67.829 | 73.087 | 256.4 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.701 | 20.627 | 19.159 | 20.627 | 148.4 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 62.792 | 66.394 | 62.228 | 66.394 | 256.4 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.510 | 3.678 | 1.428 | 3.678 | 151.1 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 6.058 | 8.933 | 5.649 | 8.933 | 256.4 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 194.477 | 210.162 | 183.893 | 210.162 | 237.5 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1450.363 | 1478.633 | 1435.210 | 1478.633 | 256.4 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.863 | 2.257 | 1.836 | 2.257 | 232.4 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.020 | 10.151 | 9.950 | 10.151 | 256.4 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.038 | 0.058 | 0.026 | 0.058 | 225.6 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.358 | 3.439 | 3.333 | 3.439 | 256.4 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 20.073 | 25.537 | 19.407 | 25.537 | 202.8 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 79.457 | 94.991 | 78.704 | 94.991 | 256.4 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 4.044 | 4.271 | 3.151 | 4.271 | 218.6 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.310 | 9.509 | 9.146 | 9.509 | 256.4 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 184.920 | 190.225 | 174.363 | 190.225 | 192.1 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1459.953 | 1626.250 | 1421.193 | 1626.250 | 256.4 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.875 | 0.983 | 0.828 | 0.983 | 189.4 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.903 | 7.431 | 5.865 | 7.431 | 256.4 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.025 | 0.033 | 0.024 | 0.033 | 186.1 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.488 | 1.519 | 1.470 | 1.519 | 256.4 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 5.889 | 7.681 | 5.571 | 7.681 | 143.9 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 21.065 | 21.364 | 20.727 | 21.364 | 256.4 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 3.703 | 4.735 | 2.350 | 4.735 | 183.9 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.727 | 19.598 | 6.501 | 19.598 | 256.4 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.014 | 0.011 | 0.014 | 131.9 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.458 | 0.504 | 0.435 | 0.504 | 256.4 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 170.473 | 192.102 | 166.030 | 192.102 | 147.1 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1417.763 | 1444.218 | 1402.529 | 1444.218 | 256.4 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 166.187 | 169.424 | 157.661 | 169.424 | 147.3 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1397.238 | 1420.033 | 1393.960 | 1420.033 | 256.4 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.085 | 0.151 | 0.073 | 0.151 | 147.1 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.062 | 2.126 | 2.015 | 2.126 | 256.4 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.021 | 0.041 | 0.016 | 0.041 | 147.1 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.427 | 0.551 | 0.416 | 0.551 | 256.4 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.094 | 1.139 | 1.050 | 1.139 | 146.8 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.220 | 14.736 | 11.182 | 14.736 | 256.4 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.212 | 2.723 | 1.115 | 2.723 | 146.8 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.844 | 10.973 | 10.716 | 10.973 | 256.4 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.776 | 3.174 | 1.652 | 3.174 | 137.5 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.192 | 8.678 | 8.055 | 8.678 | 256.4 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.123 | 0.143 | 0.117 | 0.143 | 139.0 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.587 | 2.626 | 2.572 | 2.626 | 256.4 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 178.382 | 180.536 | 176.949 | 180.536 | 192.1 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1446.444 | 1468.859 | 1441.028 | 1468.859 | 256.4 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.701 | 2.979 | 2.638 | 2.979 | 191.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.293 | 7.673 | 7.209 | 7.673 | 256.4 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.042 | 0.047 | 0.039 | 0.047 | 188.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.884 | 2.926 | 2.880 | 2.926 | 256.4 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 13.089 | 17.614 | 12.047 | 17.614 | 171.1 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 38.774 | 54.413 | 38.157 | 54.413 | 256.4 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.378 | 0.415 | 0.366 | 0.415 | 187.8 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.151 | 12.292 | 12.040 | 12.292 | 256.4 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 184.681 | 188.926 | 178.982 | 188.926 | 199.8 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1446.783 | 1467.953 | 1436.969 | 1467.953 | 256.4 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.197 | 3.452 | 3.125 | 3.452 | 197.5 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.250 | 7.400 | 7.147 | 7.400 | 256.4 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.046 | 0.047 | 0.043 | 0.047 | 195.7 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.904 | 2.980 | 2.872 | 2.980 | 256.4 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 15.446 | 17.577 | 11.341 | 17.577 | 188.2 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.481 | 53.647 | 39.742 | 53.647 | 256.4 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.813 | 2.537 | 1.714 | 2.537 | 192.8 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.206 | 13.636 | 13.067 | 13.636 | 256.4 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 176.936 | 181.901 | 173.565 | 181.901 | 192.0 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1427.064 | 1457.881 | 1418.625 | 1457.881 | 256.4 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 1.834 | 2.812 | 1.709 | 2.812 | 190.2 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.224 | 5.313 | 5.170 | 5.313 | 256.4 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.033 | 0.042 | 0.031 | 0.042 | 177.4 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.442 | 1.463 | 1.433 | 1.463 | 256.4 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.933 | 6.707 | 5.469 | 6.707 | 150.6 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 18.902 | 25.937 | 18.817 | 25.937 | 256.4 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.092 | 3.662 | 1.729 | 3.662 | 171.4 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.932 | 9.112 | 8.802 | 9.112 | 256.4 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.019 | 0.012 | 0.019 | 139.7 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.456 | 0.480 | 0.434 | 0.480 | 256.4 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 187.662 | 191.179 | 185.173 | 191.179 | 154.7 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1478.778 | 1529.393 | 1459.880 | 1529.393 | 256.4 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 160.928 | 166.563 | 159.804 | 166.563 | 154.9 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1412.966 | 1427.465 | 1407.147 | 1427.465 | 256.4 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.412 | 0.425 | 0.405 | 0.425 | 154.7 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.963 | 4.126 | 3.892 | 4.126 | 256.4 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.022 | 0.027 | 0.020 | 0.027 | 154.7 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.692 | 0.711 | 0.655 | 0.711 | 256.4 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 12.861 | 13.260 | 12.782 | 13.260 | 154.6 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 46.760 | 47.660 | 46.715 | 47.660 | 256.4 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.252 | 13.690 | 12.926 | 13.690 | 151.9 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 46.399 | 47.549 | 46.061 | 47.549 | 256.4 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.548 | 16.596 | 13.096 | 16.596 | 151.2 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 41.838 | 42.858 | 41.266 | 42.858 | 256.4 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.160 | 0.172 | 0.158 | 0.172 | 151.4 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.683 | 4.723 | 4.563 | 4.723 | 256.4 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.018 | 0.012 | 0.018 | 142.3 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.490 | 0.450 | 0.490 | 256.4 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 172.352 | 180.143 | 168.513 | 180.143 | 156.8 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1434.908 | 1459.524 | 1417.597 | 1459.524 | 256.4 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 158.798 | 165.894 | 158.090 | 165.894 | 157.0 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1415.127 | 1481.950 | 1409.904 | 1481.950 | 256.4 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.403 | 0.412 | 0.388 | 0.412 | 156.8 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.049 | 4.195 | 3.931 | 4.195 | 256.4 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.026 | 0.019 | 0.026 | 156.8 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.705 | 0.750 | 0.696 | 0.750 | 256.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.546 | 2.778 | 2.495 | 2.778 | 156.6 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.888 | 20.811 | 18.479 | 20.811 | 256.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.898 | 3.766 | 2.704 | 3.766 | 154.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.569 | 18.041 | 17.514 | 18.041 | 256.4 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.373 | 5.435 | 2.963 | 5.435 | 153.0 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.172 | 13.658 | 12.890 | 13.658 | 256.4 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.162 | 0.175 | 0.157 | 0.175 | 153.1 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.589 | 4.672 | 4.578 | 4.672 | 256.4 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.046 | 0.062 | 0.043 | 0.062 | 138.3 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.499 | 0.512 | 0.479 | 0.512 | 256.4 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 195.742 | 205.514 | 190.225 | 205.514 | 168.6 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1650.020 | 1766.906 | 1625.131 | 1766.906 | 256.4 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 167.309 | 168.051 | 163.520 | 168.051 | 172.1 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1601.411 | 1667.965 | 1589.603 | 1667.965 | 256.4 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.810 | 0.929 | 0.765 | 0.929 | 168.7 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.304 | 4.622 | 4.205 | 4.622 | 256.4 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.108 | 0.118 | 0.093 | 0.118 | 168.7 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.704 | 0.803 | 0.690 | 0.803 | 256.4 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.259 | 18.302 | 18.028 | 18.302 | 164.8 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 61.612 | 63.670 | 61.307 | 63.670 | 256.4 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.123 | 17.966 | 16.903 | 17.966 | 151.3 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 61.443 | 67.562 | 60.711 | 67.562 | 256.4 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.763 | 19.736 | 17.273 | 19.736 | 150.2 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 54.912 | 55.107 | 54.126 | 55.107 | 256.4 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.222 | 0.254 | 0.216 | 0.254 | 150.3 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.233 | 6.297 | 6.121 | 6.297 | 256.4 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 170.912 | 177.517 | 169.763 | 177.517 | 162.4 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1439.757 | 1462.970 | 1430.710 | 1462.970 | 256.4 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.105 | 0.151 | 0.075 | 0.151 | 161.5 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.739 | 4.807 | 4.682 | 4.807 | 256.4 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.018 | 0.035 | 0.014 | 0.035 | 146.0 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.330 | 2.354 | 2.293 | 2.354 | 256.4 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.558 | 8.306 | 6.676 | 8.306 | 143.5 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 15.549 | 28.726 | 15.216 | 28.726 | 256.4 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.203 | 0.220 | 0.192 | 0.220 | 144.2 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.652 | 2.755 | 2.615 | 2.755 | 256.4 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 171.080 | 176.737 | 167.845 | 176.737 | 186.6 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1433.490 | 1452.957 | 1429.026 | 1452.957 | 256.4 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.124 | 0.176 | 0.104 | 0.176 | 183.8 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.710 | 4.852 | 4.651 | 4.852 | 256.4 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.014 | 0.022 | 0.014 | 0.022 | 169.4 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.348 | 2.458 | 2.299 | 2.458 | 256.4 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.849 | 7.975 | 6.275 | 7.975 | 152.0 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 15.562 | 29.286 | 15.349 | 29.286 | 256.4 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 2.185 | 3.243 | 2.146 | 3.243 | 162.0 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.842 | 2.908 | 2.801 | 2.908 | 256.4 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 169.427 | 181.914 | 167.913 | 181.914 | 145.3 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1422.186 | 1446.035 | 1414.079 | 1446.035 | 256.4 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.102 | 0.159 | 0.080 | 0.159 | 144.6 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.895 | 2.976 | 2.864 | 2.976 | 256.4 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.012 | 0.014 | 0.012 | 0.014 | 144.3 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.016 | 1.025 | 1.003 | 1.025 | 256.4 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.013 | 4.652 | 2.695 | 4.652 | 142.8 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.228 | 9.389 | 8.059 | 9.389 | 256.4 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.483 | 1.873 | 1.374 | 1.873 | 144.1 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.856 | 3.180 | 2.796 | 3.180 | 256.4 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.024 | 0.015 | 0.024 | 141.2 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.446 | 0.465 | 0.422 | 0.465 | 256.4 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 178.676 | 181.772 | 177.355 | 181.772 | 161.7 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1592.965 | 1598.083 | 1589.295 | 1598.083 | 256.4 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 163.014 | 172.986 | 160.845 | 172.986 | 174.9 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1584.025 | 1607.387 | 1571.002 | 1607.387 | 256.4 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.267 | 2.259 | 1.034 | 2.259 | 174.8 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.057 | 3.194 | 2.969 | 3.194 | 256.4 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.120 | 0.184 | 0.103 | 0.184 | 165.3 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.510 | 0.526 | 0.496 | 0.526 | 256.4 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.096 | 3.790 | 3.013 | 3.790 | 158.3 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 20.854 | 21.173 | 20.674 | 21.173 | 256.4 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.397 | 4.280 | 3.335 | 4.280 | 156.6 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.337 | 22.431 | 20.034 | 22.431 | 256.4 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 3.640 | 4.638 | 3.555 | 4.638 | 152.4 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.218 | 15.747 | 15.104 | 15.747 | 256.4 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.208 | 1.029 | 0.164 | 1.029 | 153.7 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.847 | 5.092 | 4.812 | 5.092 | 256.4 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 182.927 | 197.628 | 178.713 | 197.628 | 199.9 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1604.121 | 1620.443 | 1597.362 | 1620.443 | 256.4 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.725 | 5.484 | 4.438 | 5.484 | 196.6 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.906 | 6.085 | 5.884 | 6.085 | 256.4 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.299 | 0.326 | 0.258 | 0.326 | 192.8 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.539 | 2.572 | 2.437 | 2.572 | 256.4 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 13.322 | 19.182 | 12.602 | 19.182 | 188.3 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 43.035 | 52.573 | 42.212 | 52.573 | 256.4 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.518 | 0.616 | 0.476 | 0.616 | 190.5 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.441 | 7.602 | 7.359 | 7.602 | 256.4 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 188.257 | 213.282 | 184.961 | 213.282 | 210.5 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1608.771 | 1618.358 | 1595.816 | 1618.358 | 256.4 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.868 | 5.582 | 4.486 | 5.582 | 206.4 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.937 | 6.104 | 5.855 | 6.104 | 256.4 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.298 | 0.320 | 0.269 | 0.320 | 201.1 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.511 | 2.546 | 2.419 | 2.546 | 256.4 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 13.989 | 18.989 | 13.217 | 18.989 | 191.7 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 42.718 | 43.651 | 42.390 | 43.651 | 256.4 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.257 | 3.332 | 2.154 | 3.332 | 198.9 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.746 | 8.845 | 8.557 | 8.845 | 256.4 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 178.709 | 185.322 | 178.301 | 185.322 | 200.4 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1601.311 | 1669.338 | 1587.969 | 1669.338 | 256.4 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.981 | 4.205 | 2.953 | 4.205 | 196.1 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.301 | 6.371 | 4.150 | 6.371 | 256.4 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.285 | 0.304 | 0.251 | 0.304 | 193.1 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.151 | 1.256 | 1.130 | 1.256 | 256.4 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 8.741 | 12.116 | 8.582 | 12.116 | 175.8 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.138 | 21.966 | 20.984 | 21.966 | 256.4 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.284 | 3.193 | 2.087 | 3.193 | 191.8 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.788 | 9.546 | 8.649 | 9.546 | 256.4 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 190.894 | 197.196 | 190.450 | 197.196 | 144.5 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1651.515 | 1810.018 | 1639.851 | 1810.018 | 256.4 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.971 | 170.973 | 162.246 | 170.973 | 149.1 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1607.671 | 1625.888 | 1598.575 | 1625.888 | 256.4 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.117 | 1.627 | 1.017 | 1.627 | 147.4 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 4.002 | 4.032 | 3.934 | 4.032 | 256.4 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.087 | 0.111 | 0.083 | 0.111 | 144.8 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.713 | 0.770 | 0.688 | 0.770 | 256.4 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.012 | 0.016 | 133.3 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.457 | 0.476 | 0.438 | 0.476 | 256.4 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.341 | 0.386 | 0.313 | 0.386 | 138.3 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.740 | 15.276 | 14.554 | 15.276 | 256.4 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.023 | 0.014 | 0.023 | 144.9 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.449 | 0.500 | 0.433 | 0.500 | 256.4 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 196.883 | 266.141 | 185.955 | 266.141 | 161.6 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1623.403 | 1668.220 | 1620.360 | 1668.220 | 256.4 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.155 | 182.313 | 160.539 | 182.313 | 175.2 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1581.544 | 1624.318 | 1579.032 | 1624.318 | 256.4 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 1.155 | 1.322 | 1.119 | 1.322 | 172.5 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 3.904 | 4.070 | 3.853 | 4.070 | 256.4 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.126 | 0.148 | 0.108 | 0.148 | 163.5 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.699 | 0.734 | 0.662 | 0.734 | 256.4 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.741 | 13.998 | 13.566 | 13.998 | 159.4 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.638 | 55.582 | 50.604 | 55.582 | 256.4 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.979 | 14.252 | 13.792 | 14.252 | 158.3 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 50.268 | 52.053 | 49.930 | 52.053 | 256.4 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.305 | 14.677 | 14.119 | 14.677 | 154.4 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 44.656 | 47.127 | 44.179 | 47.127 | 256.4 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.257 | 0.360 | 0.252 | 0.360 | 155.4 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.464 | 5.584 | 5.350 | 5.584 | 256.4 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.029 | 0.015 | 0.029 | 138.3 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.471 | 0.497 | 0.443 | 0.497 | 256.4 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 175.382 | 186.224 | 172.783 | 186.224 | 155.3 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1604.532 | 1656.427 | 1601.239 | 1656.427 | 256.4 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 164.397 | 166.642 | 162.751 | 166.642 | 168.0 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1573.254 | 1609.151 | 1570.630 | 1609.151 | 256.4 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 1.154 | 1.299 | 1.083 | 1.299 | 165.1 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.922 | 4.074 | 3.773 | 4.074 | 256.4 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.122 | 0.158 | 0.097 | 0.158 | 156.2 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.706 | 0.734 | 0.688 | 0.734 | 256.4 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.113 | 3.518 | 2.995 | 3.518 | 155.1 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.339 | 22.554 | 21.851 | 22.554 | 256.4 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.252 | 3.412 | 3.228 | 3.412 | 154.1 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 21.742 | 21.979 | 21.628 | 21.979 | 256.4 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.539 | 5.159 | 3.479 | 5.159 | 150.1 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.607 | 20.189 | 16.096 | 20.189 | 256.4 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.253 | 0.269 | 0.202 | 0.269 | 150.2 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.478 | 5.599 | 5.444 | 5.599 | 256.4 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 8.362 | 9.082 | 7.593 | 9.082 | 153.1 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 49.116 | 61.849 | 48.221 | 61.849 | 256.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.186 | 1.408 | 1.138 | 1.408 | 157.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.141 | 10.233 | 9.974 | 10.233 | 256.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.376 | 0.389 | 0.372 | 0.389 | 155.0 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.055 | 5.132 | 5.034 | 5.132 | 256.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.999 | 2.040 | 1.854 | 2.040 | 158.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.621 | 7.010 | 5.495 | 7.010 | 256.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.462 | 0.707 | 0.455 | 0.707 | 151.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.607 | 6.509 | 5.503 | 6.509 | 256.4 |
| evaluation-flat-large-parallel | evaluation-point-processes | python-prophet | 4 | 1501.846 | 1510.748 | 1498.685 | 1510.748 | 256.4 |
| evaluation-flat-large-parallel | evaluation-point-threads | python-prophet | 4 | 199.487 | 207.257 | 197.646 | 207.257 | 256.4 |
| evaluation-flat-large-parallel | evaluation-point | effect-prophet | 4 | 27.621 | 30.277 | 22.182 | 30.277 | 186.8 |
| evaluation-flat-large-parallel | evaluation-point | python-prophet | 4 | 183.512 | 195.226 | 183.000 | 195.226 | 256.4 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 191.858 | 213.574 | 191.828 | 213.574 | 151.1 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1473.467 | 1513.174 | 1463.903 | 1513.174 | 256.4 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.705 | 3.145 | 2.630 | 3.145 | 150.5 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.395 | 1.442 | 1.389 | 1.442 | 256.4 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.118 | 0.167 | 0.106 | 0.167 | 128.1 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.511 | 0.557 | 0.510 | 0.557 | 256.4 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.085 | 0.103 | 0.084 | 0.103 | 149.8 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.479 | 5.548 | 5.467 | 5.548 | 256.4 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 2.268 | 3.312 | 1.870 | 3.312 | 135.2 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.768 | 0.829 | 0.763 | 0.829 | 256.4 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.274 | 8.440 | 5.746 | 8.440 | 149.2 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 39.039 | 42.045 | 38.400 | 42.045 | 256.4 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 5.572 | 9.749 | 4.948 | 9.749 | 144.9 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 61.264 | 64.954 | 59.990 | 64.954 | 256.4 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 189.643 | 199.337 | 188.705 | 199.337 | 151.0 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1476.875 | 1518.779 | 1459.239 | 1518.779 | 256.4 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.226 | 1.257 | 1.193 | 1.257 | 150.9 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.470 | 1.509 | 1.454 | 1.509 | 256.4 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.052 | 0.080 | 0.050 | 0.080 | 127.3 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.423 | 0.455 | 0.406 | 0.455 | 256.4 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.108 | 0.213 | 0.098 | 0.213 | 150.6 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.445 | 5.935 | 5.337 | 5.935 | 256.4 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.566 | 2.023 | 1.523 | 2.023 | 132.9 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.769 | 0.817 | 0.756 | 0.817 | 256.4 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.502 | 5.040 | 4.133 | 5.040 | 147.4 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.196 | 47.184 | 46.104 | 47.184 | 256.4 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.018 | 2.199 | 2.001 | 2.199 | 153.8 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.623 | 14.260 | 13.446 | 14.260 | 256.4 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.308 | 0.310 | 0.306 | 0.310 | 181.4 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 256.4 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.277 | 0.350 | 0.274 | 0.350 | 170.2 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 256.4 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.318 | 17.622 | 12.109 | 17.622 | 150.3 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 145.660 | 164.000 | 145.077 | 164.000 | 256.4 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 61.780 | 61.992 | 61.547 | 61.992 | 157.2 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 291.433 | 295.292 | 291.215 | 295.292 | 256.4 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 260.267 | 275.671 | 255.839 | 275.671 | 188.4 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1636.835 | 1647.179 | 1631.531 | 1647.179 | 256.4 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 7.096 | 8.572 | 6.488 | 8.572 | 188.3 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 2.002 | 2.030 | 2.000 | 2.030 | 256.4 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.250 | 0.301 | 0.237 | 0.301 | 132.9 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.750 | 0.812 | 0.699 | 0.812 | 256.4 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.098 | 0.164 | 0.059 | 0.164 | 186.9 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.255 | 5.400 | 5.246 | 5.400 | 256.4 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.612 | 2.886 | 2.447 | 2.886 | 142.5 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 1.010 | 1.072 | 1.001 | 1.072 | 256.4 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 60.316 | 63.857 | 60.009 | 63.857 | 169.0 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 226.845 | 238.829 | 224.131 | 238.829 | 256.4 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.103 | 0.141 | 0.081 | 0.141 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.643 | 0.659 | 0.643 | 0.659 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 173.232 | 185.315 | 171.493 | 185.315 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1425.691 | 1430.864 | 1420.510 | 1430.864 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 165.181 | 165.754 | 163.804 | 165.754 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1423.629 | 1459.280 | 1422.984 | 1459.280 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.134 | 0.137 | 0.123 | 0.137 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.821 | 3.876 | 3.803 | 3.876 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.032 | 0.026 | 0.032 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.858 | 0.907 | 0.838 | 0.907 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.036 | 3.123 | 2.029 | 3.123 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.456 | 14.621 | 14.314 | 14.621 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.154 | 2.560 | 2.146 | 2.560 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.802 | 14.012 | 13.448 | 14.012 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.156 | 3.050 | 2.110 | 3.050 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 8.962 | 9.174 | 8.872 | 9.174 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.518 | 1.007 | 0.509 | 1.007 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.762 | 5.008 | 4.701 | 5.008 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.058 | 0.069 | 0.051 | 0.069 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.518 | 0.583 | 0.504 | 0.583 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 176.578 | 180.998 | 176.474 | 180.998 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1457.424 | 1591.195 | 1450.579 | 1591.195 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 159.230 | 163.261 | 159.024 | 163.261 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1465.658 | 1506.109 | 1418.526 | 1506.109 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.130 | 0.142 | 0.126 | 0.142 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.825 | 5.634 | 3.601 | 5.634 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.035 | 0.042 | 0.027 | 0.042 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.738 | 0.811 | 0.661 | 0.811 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.521 | 4.917 | 4.514 | 4.917 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.488 | 30.505 | 28.317 | 30.505 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.818 | 5.000 | 4.628 | 5.000 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.546 | 27.686 | 27.151 | 27.686 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.483 | 6.778 | 5.429 | 6.778 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.341 | 22.668 | 22.147 | 22.668 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.309 | 0.821 | 0.294 | 0.821 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.643 | 4.729 | 4.635 | 4.729 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.035 | 161.401 | 159.452 | 161.401 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1463.239 | 1590.101 | 1463.231 | 1590.101 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.159 | 0.162 | 0.116 | 0.162 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.118 | 2.353 | 2.069 | 2.353 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.024 | 0.016 | 0.024 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.405 | 0.414 | 0.402 | 0.414 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.228 | 1.313 | 1.040 | 1.313 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.100 | 3.201 | 3.060 | 3.201 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.259 | 0.306 | 0.256 | 0.306 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.686 | 2.735 | 2.675 | 2.735 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.305 | 165.444 | 158.023 | 165.444 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1543.381 | 1854.110 | 1453.334 | 1854.110 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.175 | 0.115 | 0.175 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.105 | 2.235 | 2.062 | 2.235 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.041 | 0.015 | 0.041 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.402 | 0.409 | 0.402 | 0.409 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.200 | 1.258 | 1.086 | 1.258 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.082 | 3.144 | 2.994 | 3.144 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.235 | 0.243 | 0.233 | 0.243 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.654 | 2.691 | 2.634 | 2.691 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.146 | 0.227 | 0.122 | 0.227 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.930 | 0.948 | 0.929 | 0.948 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 190.661 | 201.986 | 190.651 | 201.986 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1430.329 | 1441.525 | 1426.844 | 1441.525 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 172.819 | 173.882 | 171.483 | 173.882 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1407.877 | 1432.423 | 1407.130 | 1432.423 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.191 | 0.204 | 0.185 | 0.204 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.546 | 3.600 | 3.516 | 3.600 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.022 | 0.029 | 0.021 | 0.029 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.181 | 1.185 | 1.171 | 1.185 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.874 | 4.972 | 4.856 | 4.972 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 30.990 | 31.869 | 30.973 | 31.869 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 6.061 | 8.616 | 5.903 | 8.616 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 29.154 | 30.225 | 28.982 | 30.225 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.590 | 6.055 | 4.995 | 6.055 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 24.697 | 24.975 | 24.652 | 24.975 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.973 | 1.169 | 0.924 | 1.169 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.333 | 4.416 | 4.332 | 4.416 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.028 | 0.015 | 0.028 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.483 | 0.509 | 0.478 | 0.509 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 172.072 | 185.667 | 168.617 | 185.667 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1459.965 | 1483.066 | 1443.125 | 1483.066 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 163.702 | 167.836 | 160.462 | 167.836 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1439.816 | 1473.941 | 1427.757 | 1473.941 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.118 | 0.126 | 0.093 | 0.126 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.160 | 2.254 | 2.108 | 2.254 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.034 | 0.053 | 0.019 | 0.053 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.459 | 0.476 | 0.436 | 0.476 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.388 | 1.774 | 1.340 | 1.774 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.695 | 12.918 | 12.524 | 12.918 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.479 | 2.210 | 1.407 | 2.210 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 12.226 | 12.408 | 12.160 | 12.408 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.884 | 2.010 | 1.774 | 2.010 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 9.240 | 10.163 | 9.175 | 10.163 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.280 | 0.350 | 0.268 | 0.350 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.136 | 3.208 | 3.104 | 3.208 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.018 | 0.013 | 0.018 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.469 | 0.539 | 0.447 | 0.539 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 175.565 | 190.041 | 169.241 | 190.041 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1438.611 | 1462.401 | 1433.699 | 1462.401 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 161.046 | 163.490 | 158.171 | 163.490 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1449.924 | 1475.858 | 1431.435 | 1475.858 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.108 | 0.160 | 0.081 | 0.160 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.142 | 2.247 | 2.102 | 2.247 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.039 | 0.063 | 0.030 | 0.063 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.451 | 0.483 | 0.439 | 0.483 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.472 | 1.655 | 1.356 | 1.655 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.746 | 13.115 | 12.501 | 13.115 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.577 | 1.675 | 1.406 | 1.675 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 12.056 | 12.356 | 11.972 | 12.356 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.832 | 2.030 | 1.722 | 2.030 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.823 | 9.634 | 8.698 | 9.634 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.260 | 0.833 | 0.227 | 0.833 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.113 | 3.164 | 3.088 | 3.164 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.019 | 0.012 | 0.019 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.478 | 0.562 | 0.469 | 0.562 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 291.660 | 306.943 | 286.061 | 306.943 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1836.732 | 1854.581 | 1824.688 | 1854.581 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 160.990 | 165.080 | 157.745 | 165.080 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1441.491 | 1484.445 | 1433.133 | 1484.445 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.126 | 0.161 | 0.091 | 0.161 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.144 | 3.069 | 2.107 | 3.069 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.025 | 0.043 | 0.021 | 0.043 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.481 | 0.505 | 0.445 | 0.505 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 104.425 | 108.366 | 104.209 | 108.366 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 398.295 | 409.109 | 393.331 | 409.109 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 104.516 | 105.152 | 103.940 | 105.152 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 397.666 | 410.010 | 395.373 | 410.010 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 104.592 | 105.110 | 104.094 | 105.110 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 392.226 | 403.925 | 389.465 | 403.925 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.306 | 0.317 | 0.274 | 0.317 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.313 | 3.463 | 3.180 | 3.463 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.111 | 160.250 | 158.528 | 160.250 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1430.562 | 1447.436 | 1425.486 | 1447.436 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.161 | 0.109 | 0.161 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.104 | 2.149 | 2.041 | 2.149 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.034 | 0.019 | 0.034 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.465 | 0.526 | 0.436 | 0.526 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.917 | 1.937 | 1.770 | 1.937 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.478 | 8.458 | 7.156 | 8.458 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.265 | 0.283 | 0.242 | 0.283 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.717 | 2.777 | 2.713 | 2.777 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.621 | 180.866 | 159.741 | 180.866 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1428.166 | 1454.022 | 1426.910 | 1454.022 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.148 | 0.162 | 0.133 | 0.162 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.075 | 2.155 | 2.074 | 2.155 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.040 | 0.018 | 0.040 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.429 | 0.469 | 0.425 | 0.469 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.848 | 3.889 | 3.843 | 3.889 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 19.773 | 20.139 | 19.604 | 20.139 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.273 | 0.284 | 0.263 | 0.284 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.637 | 2.678 | 2.589 | 2.678 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.080 | 0.045 | 0.080 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.507 | 0.523 | 0.506 | 0.523 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 175.465 | 177.314 | 174.585 | 177.314 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1463.028 | 1469.647 | 1448.798 | 1469.647 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 160.175 | 164.360 | 158.877 | 164.360 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1419.405 | 1447.097 | 1413.148 | 1447.097 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.137 | 0.145 | 0.127 | 0.145 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.767 | 3.842 | 3.643 | 3.842 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.030 | 0.045 | 0.029 | 0.045 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.703 | 1.365 | 0.648 | 1.365 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.946 | 3.711 | 2.940 | 3.711 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 49.030 | 50.579 | 48.127 | 50.579 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.112 | 3.217 | 3.060 | 3.217 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 48.798 | 49.726 | 48.302 | 49.726 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.610 | 4.957 | 3.592 | 4.957 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 43.619 | 44.105 | 43.598 | 44.105 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.287 | 0.343 | 0.286 | 0.343 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.726 | 4.770 | 4.671 | 4.770 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.894 | 168.829 | 160.215 | 168.829 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1422.289 | 1478.801 | 1421.717 | 1478.801 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.188 | 0.179 | 0.188 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.709 | 3.907 | 3.577 | 3.907 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.033 | 0.018 | 0.033 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.665 | 0.681 | 0.657 | 0.681 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.000 | 2.368 | 1.924 | 2.368 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.160 | 9.267 | 7.998 | 9.267 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.283 | 0.445 | 0.271 | 0.445 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.874 | 4.959 | 4.801 | 4.959 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 167.379 | 179.988 | 165.481 | 179.988 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1427.036 | 1436.227 | 1413.342 | 1436.227 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.187 | 0.193 | 0.156 | 0.193 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.840 | 3.903 | 3.822 | 3.903 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.019 | 0.017 | 0.019 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.788 | 0.836 | 0.787 | 0.836 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.570 | 4.449 | 2.423 | 4.449 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.068 | 9.145 | 9.046 | 9.145 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.553 | 1.175 | 0.470 | 1.175 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.767 | 4.802 | 4.724 | 4.802 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.136 | 0.155 | 0.087 | 0.155 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.638 | 0.667 | 0.627 | 0.667 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 177.477 | 183.692 | 171.799 | 183.692 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1487.439 | 1550.407 | 1465.211 | 1550.407 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 172.292 | 191.756 | 163.128 | 191.756 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1437.464 | 1468.616 | 1437.429 | 1468.616 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.162 | 0.207 | 0.120 | 0.207 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 4.375 | 8.643 | 4.096 | 8.643 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.051 | 0.027 | 0.051 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.899 | 1.285 | 0.863 | 1.285 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.053 | 2.466 | 2.051 | 2.466 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.941 | 20.498 | 14.620 | 20.498 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.196 | 2.430 | 2.193 | 2.430 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 14.344 | 43.706 | 14.172 | 43.706 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.714 | 3.397 | 2.240 | 3.397 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.344 | 10.084 | 9.302 | 10.084 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.486 | 0.499 | 0.473 | 0.499 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.845 | 5.781 | 4.767 | 5.781 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.070 | 0.047 | 0.070 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.545 | 0.572 | 0.530 | 0.572 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 171.754 | 172.865 | 166.883 | 172.865 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1436.840 | 1456.480 | 1433.939 | 1456.480 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 164.226 | 170.460 | 163.254 | 170.460 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1430.761 | 1485.359 | 1424.472 | 1485.359 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.145 | 0.218 | 0.128 | 0.218 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.720 | 3.894 | 3.678 | 3.894 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.028 | 0.032 | 0.025 | 0.032 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.711 | 0.733 | 0.664 | 0.733 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.480 | 2.047 | 1.243 | 2.047 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.367 | 15.031 | 13.246 | 15.031 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.376 | 2.434 | 1.346 | 2.434 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.306 | 12.403 | 12.259 | 12.403 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.963 | 2.336 | 1.743 | 2.336 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.654 | 8.011 | 7.644 | 8.011 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.283 | 0.296 | 0.269 | 0.296 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.726 | 4.804 | 4.693 | 4.804 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 169.256 | 189.661 | 161.382 | 189.661 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1433.942 | 1452.753 | 1433.608 | 1452.753 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.168 | 0.118 | 0.168 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.141 | 2.636 | 2.097 | 2.636 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.035 | 0.016 | 0.035 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.446 | 0.457 | 0.432 | 0.457 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.785 | 2.504 | 1.746 | 2.504 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.228 | 7.740 | 7.174 | 7.740 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.254 | 0.293 | 0.234 | 0.293 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.730 | 2.787 | 2.678 | 2.787 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.583 | 164.199 | 161.139 | 164.199 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1445.299 | 1452.245 | 1433.764 | 1452.245 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.152 | 0.178 | 0.112 | 0.178 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.109 | 2.210 | 2.095 | 2.210 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.029 | 0.018 | 0.029 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.469 | 0.498 | 0.435 | 0.498 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.903 | 3.987 | 3.887 | 3.987 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 20.123 | 20.894 | 20.023 | 20.894 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.259 | 0.303 | 0.244 | 0.303 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.763 | 4.008 | 2.752 | 4.008 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.982 | 163.557 | 160.323 | 163.557 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1455.087 | 1464.280 | 1419.505 | 1464.280 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.197 | 0.220 | 0.189 | 0.220 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.828 | 3.870 | 3.776 | 3.870 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.019 | 0.017 | 0.019 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.742 | 0.801 | 0.734 | 0.801 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.239 | 4.584 | 2.128 | 4.584 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 9.041 | 9.194 | 8.868 | 9.194 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.158 | 0.205 | 0.155 | 0.205 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.769 | 4.848 | 4.763 | 4.848 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.372 | 165.680 | 158.203 | 165.680 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1418.834 | 1435.514 | 1412.720 | 1435.514 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.245 | 0.194 | 0.245 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.769 | 3.837 | 3.766 | 3.837 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.018 | 0.021 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.760 | 0.801 | 0.759 | 0.801 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.232 | 4.666 | 2.195 | 4.666 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.937 | 10.436 | 8.697 | 10.436 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.164 | 0.274 | 0.159 | 0.274 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.749 | 4.849 | 4.706 | 4.849 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.217 | 166.033 | 161.718 | 166.033 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1418.116 | 1444.291 | 1416.422 | 1444.291 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.200 | 0.217 | 0.178 | 0.217 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.794 | 3.896 | 3.785 | 3.896 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.019 | 0.024 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.792 | 0.807 | 0.779 | 0.807 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.595 | 5.107 | 2.331 | 5.107 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.745 | 8.897 | 8.725 | 8.897 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.152 | 0.276 | 0.150 | 0.276 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.678 | 4.851 | 4.657 | 4.851 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.701 | 162.373 | 157.303 | 162.373 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1419.392 | 1467.554 | 1417.037 | 1467.554 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.194 | 0.285 | 0.190 | 0.285 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.819 | 4.046 | 3.743 | 4.046 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.025 | 0.021 | 0.025 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.796 | 0.818 | 0.785 | 0.818 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 2.804 | 4.427 | 2.595 | 4.427 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.872 | 9.072 | 8.838 | 9.072 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.173 | 0.338 | 0.153 | 0.338 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.721 | 4.974 | 4.671 | 4.974 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.395 | 163.629 | 160.194 | 163.629 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1435.042 | 1447.248 | 1433.595 | 1447.248 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.263 | 0.198 | 0.263 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.588 | 3.943 | 3.539 | 3.943 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.026 | 0.019 | 0.026 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.644 | 0.655 | 0.642 | 0.655 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.825 | 2.760 | 1.808 | 2.760 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.362 | 8.083 | 7.353 | 8.083 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.220 | 0.246 | 0.217 | 0.246 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.784 | 4.824 | 4.737 | 4.824 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 166.012 | 176.894 | 162.868 | 176.894 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1454.135 | 1495.735 | 1441.487 | 1495.735 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.214 | 0.274 | 0.192 | 0.274 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.613 | 3.850 | 3.582 | 3.850 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.036 | 0.021 | 0.036 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.637 | 0.655 | 0.630 | 0.655 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.768 | 2.025 | 1.673 | 2.025 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.741 | 8.691 | 7.529 | 8.691 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.229 | 0.267 | 0.208 | 0.267 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 5.067 | 5.146 | 4.988 | 5.146 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.945 | 162.811 | 159.317 | 162.811 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1435.009 | 1475.081 | 1426.029 | 1475.081 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.207 | 0.224 | 0.194 | 0.224 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.597 | 3.753 | 3.570 | 3.753 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.022 | 0.026 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.648 | 0.697 | 0.632 | 0.697 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.147 | 2.317 | 1.962 | 2.317 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 8.053 | 11.871 | 7.628 | 11.871 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.212 | 0.493 | 0.205 | 0.493 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.795 | 5.482 | 4.725 | 5.482 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.427 | 161.175 | 159.596 | 161.175 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1426.236 | 1442.059 | 1423.114 | 1442.059 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.220 | 0.262 | 0.193 | 0.262 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.616 | 3.741 | 3.611 | 3.741 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.651 | 0.655 | 0.628 | 0.655 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.717 | 2.292 | 1.659 | 2.292 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.538 | 8.479 | 7.500 | 8.479 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.211 | 0.243 | 0.202 | 0.243 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.735 | 4.800 | 4.680 | 4.800 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.940 | 161.919 | 157.869 | 161.919 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1419.003 | 1458.292 | 1415.891 | 1458.292 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.207 | 0.266 | 0.200 | 0.266 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.639 | 3.802 | 3.627 | 3.802 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.660 | 0.702 | 0.601 | 0.702 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.005 | 2.281 | 1.901 | 2.281 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.521 | 8.098 | 7.391 | 8.098 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.218 | 0.239 | 0.203 | 0.239 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.706 | 4.783 | 4.704 | 4.783 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.909 | 173.350 | 160.538 | 173.350 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1426.685 | 1440.452 | 1423.767 | 1440.452 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.202 | 0.197 | 0.202 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.617 | 3.778 | 3.522 | 3.778 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.033 | 0.016 | 0.033 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.628 | 0.650 | 0.627 | 0.650 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.243 | 3.424 | 2.157 | 3.424 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.675 | 8.352 | 7.538 | 8.352 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.204 | 0.267 | 0.197 | 0.267 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.696 | 4.773 | 4.659 | 4.773 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.222 | 0.372 | 0.194 | 0.372 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.936 | 0.947 | 0.913 | 0.947 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 209.118 | 223.220 | 207.024 | 223.220 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1560.861 | 1641.134 | 1552.169 | 1641.134 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 23.686 | 24.576 | 23.525 | 24.576 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 128.661 | 129.957 | 127.650 | 129.957 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 24.544 | 24.946 | 24.218 | 24.946 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 127.496 | 133.576 | 126.209 | 133.576 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 24.206 | 25.187 | 24.016 | 25.187 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 100.119 | 114.137 | 100.048 | 114.137 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 1.077 | 1.190 | 1.047 | 1.190 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 27.178 | 28.597 | 26.380 | 28.597 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.645 | 164.848 | 158.987 | 164.848 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1432.477 | 1474.179 | 1425.011 | 1474.179 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.207 | 1.792 | 0.198 | 1.792 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.214 | 2.374 | 2.185 | 2.374 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.038 | 0.019 | 0.038 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.467 | 0.811 | 0.430 | 0.811 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 158.861 | 164.233 | 158.497 | 164.233 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 629.552 | 636.130 | 611.181 | 636.130 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.329 | 0.394 | 0.329 | 0.394 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.118 | 3.264 | 3.071 | 3.264 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.425 | 162.482 | 156.868 | 162.482 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1444.289 | 1518.977 | 1436.194 | 1518.977 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.188 | 1.805 | 0.177 | 1.805 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.262 | 2.358 | 2.167 | 2.358 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.060 | 0.018 | 0.060 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.437 | 0.550 | 0.434 | 0.550 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.352 | 4.432 | 4.340 | 4.432 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 20.716 | 22.726 | 20.495 | 22.726 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.298 | 0.312 | 0.294 | 0.312 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.134 | 3.401 | 3.114 | 3.401 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 159.727 | 164.670 | 155.018 | 164.670 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1434.739 | 1440.049 | 1422.935 | 1440.049 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.143 | 0.221 | 0.122 | 0.221 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.881 | 1.956 | 1.879 | 1.956 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.017 | 0.023 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.328 | 0.335 | 0.325 | 0.335 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.496 | 0.632 | 0.492 | 0.632 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.871 | 3.001 | 2.870 | 3.001 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.153 | 0.172 | 0.135 | 0.172 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.650 | 2.711 | 2.640 | 2.711 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 163.517 | 175.177 | 160.785 | 175.177 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1428.321 | 1460.942 | 1426.037 | 1460.942 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.167 | 0.226 | 0.161 | 0.226 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.947 | 2.111 | 1.862 | 2.111 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.018 | 0.021 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.314 | 0.347 | 0.311 | 0.347 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.937 | 1.168 | 0.847 | 1.168 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.389 | 5.521 | 5.283 | 5.521 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.177 | 0.213 | 0.146 | 0.213 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.680 | 2.725 | 2.655 | 2.725 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | effect-prophet | 6 | 185.359 | 202.516 | 182.680 | 202.516 | n/a |
| mcmc-flat-mixed-components | fresh-process-restored-uncertainty | python-prophet | 6 | 1563.544 | 1591.766 | 1549.072 | 1591.766 | n/a |
| mcmc-flat-mixed-components | model-json-decode | effect-prophet | 6 | 1.508 | 2.083 | 1.345 | 2.083 | n/a |
| mcmc-flat-mixed-components | model-json-decode | python-prophet | 6 | 9.738 | 12.014 | 9.299 | 12.014 | n/a |
| mcmc-flat-mixed-components | model-json-encode | effect-prophet | 6 | 0.166 | 0.181 | 0.151 | 0.181 | n/a |
| mcmc-flat-mixed-components | model-json-encode | python-prophet | 6 | 12.499 | 12.577 | 12.342 | 12.577 | n/a |
| mcmc-flat-mixed-components | warm-fit | effect-prophet | 6 | 635.589 | 650.330 | 634.947 | 650.330 | n/a |
| mcmc-flat-mixed-components | warm-fit | python-prophet | 6 | 528.682 | 536.389 | 521.964 | 536.389 | n/a |
| mcmc-flat-mixed-components | warm-predict | effect-prophet | 6 | 0.312 | 0.390 | 0.274 | 0.390 | n/a |
| mcmc-flat-mixed-components | warm-predict | python-prophet | 6 | 4.897 | 5.077 | 4.787 | 5.077 | n/a |
| mcmc-flat-mixed-components | warm-uncertainty | effect-prophet | 6 | 2.022 | 2.832 | 1.842 | 2.832 | 155.5 |
| mcmc-flat-mixed-components | warm-uncertainty | python-prophet | 6 | 130.300 | 143.883 | 126.953 | 143.883 | 256.4 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 298.407 | 303.169 | 297.904 | 303.169 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1957.089 | 1991.350 | 1945.058 | 1991.350 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 171.517 | 177.786 | 167.774 | 177.786 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1572.946 | 1681.020 | 1557.994 | 1681.020 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.157 | 0.215 | 0.140 | 0.215 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.127 | 2.258 | 2.104 | 2.258 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.018 | 0.036 | 0.017 | 0.036 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.448 | 0.481 | 0.446 | 0.481 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.027 | 0.047 | 0.025 | 0.047 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.498 | 0.544 | 0.498 | 0.544 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.826 | 4.954 | 4.594 | 4.954 | 145.3 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 129.075 | 137.071 | 122.140 | 137.071 | 256.4 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 169.080 | 170.247 | 168.077 | 170.247 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1519.437 | 1552.978 | 1516.920 | 1552.978 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.189 | 164.511 | 163.440 | 164.511 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1512.585 | 1533.929 | 1509.732 | 1533.929 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.189 | 0.208 | 0.181 | 0.208 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.602 | 3.917 | 3.501 | 3.917 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.018 | 0.030 | 0.017 | 0.030 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.668 | 0.715 | 0.642 | 0.715 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.052 | 0.075 | 0.041 | 0.075 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.532 | 0.566 | 0.520 | 0.566 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.985 | 1.449 | 0.952 | 1.449 | 142.1 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 72.108 | 74.376 | 71.349 | 74.376 | 256.4 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 172.333 | 177.476 | 170.223 | 177.476 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1466.288 | 1508.439 | 1453.042 | 1508.439 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 165.203 | 212.385 | 164.367 | 212.385 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1449.742 | 1471.011 | 1446.843 | 1471.011 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.188 | 0.206 | 0.158 | 0.206 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.887 | 4.162 | 3.857 | 4.162 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.018 | 0.025 | 0.017 | 0.025 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.845 | 0.904 | 0.824 | 0.904 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.122 | 0.418 | 0.084 | 0.418 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.645 | 0.684 | 0.628 | 0.684 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.860 | 1.012 | 0.835 | 1.012 | 148.2 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 20.169 | 33.626 | 19.825 | 33.626 | 256.4 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 238.600 | 274.075 | 232.847 | 274.075 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1800.059 | 1871.956 | 1792.619 | 1871.956 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.237 | 0.273 | 0.184 | 0.273 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.924 | 0.959 | 0.922 | 0.959 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 18.138 | 22.302 | 17.297 | 22.302 | 189.3 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 277.125 | 279.760 | 262.781 | 279.760 | 256.4 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 110.259 | 129.406 | 104.009 | 129.406 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 389.278 | 396.346 | 386.706 | 396.346 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.384 | 10.481 | 6.039 | 10.481 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.522 | 8.729 | 8.475 | 8.729 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `3a5a6cec5d0df164aaaa64a9fdc64b8f4184914c`
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

