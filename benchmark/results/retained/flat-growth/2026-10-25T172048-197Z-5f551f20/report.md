# Effect Prophet benchmark — 2026-10-25T172048-197Z-5f551f20

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

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12254 | 25352 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12254 | 25352 |

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

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 128 | 19 / 0.8 | horizons | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | d27263ab5e5b8f488de56085850577bb13a87b5ad4dca13da9039ce8de013341, ac378f98946578839b9dc1c9dbd10cc73c207ee8c103ad3c437807ee60fab209, d76d1f1e1ceb3370113274ddc7a004255a238dcdea9959d517623cb508c5da64 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 128 | 19 / 0.8 | rolling | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.218 | 11.418 | 9.924 | 11.418 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 131.824 | 145.871 | 129.558 | 145.871 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 1.774 | 3.213 | 1.319 | 3.213 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.677 | 7.314 | 6.561 | 7.314 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.479 | 8.457 | 6.433 | 8.457 | 150.2 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 123.543 | 159.551 | 121.825 | 159.551 | 254.0 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.031 | 0.011 | 0.031 | 140.5 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.465 | 0.482 | 0.453 | 0.482 | 254.0 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 197.478 | 213.025 | 192.939 | 213.025 | 159.2 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1672.359 | 1712.989 | 1658.878 | 1712.989 | 254.0 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 159.514 | 165.500 | 158.753 | 165.500 | 159.8 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1602.485 | 1638.889 | 1594.737 | 1638.889 | 254.0 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.766 | 0.839 | 0.745 | 0.839 | 159.8 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.333 | 3.443 | 3.288 | 3.443 | 254.0 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.089 | 0.113 | 0.075 | 0.113 | 159.2 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.547 | 0.613 | 0.526 | 0.613 | 254.0 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 22.503 | 23.189 | 22.237 | 23.189 | 159.1 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 73.465 | 77.904 | 72.751 | 77.904 | 254.0 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 22.582 | 23.176 | 22.283 | 23.176 | 157.5 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 73.568 | 75.701 | 71.795 | 75.701 | 254.0 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 23.366 | 24.197 | 22.744 | 24.197 | 154.8 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 67.885 | 69.508 | 67.191 | 69.508 | 254.0 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.227 | 0.242 | 0.217 | 0.242 | 154.9 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.462 | 5.617 | 5.377 | 5.617 | 254.0 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 182.841 | 185.494 | 180.872 | 185.494 | 232.3 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1584.690 | 1598.881 | 1579.827 | 1598.881 | 254.0 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.932 | 3.562 | 2.807 | 3.562 | 224.9 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.098 | 9.359 | 9.082 | 9.359 | 254.0 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.133 | 0.295 | 0.115 | 0.295 | 218.8 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.040 | 3.089 | 3.009 | 3.089 | 254.0 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 26.659 | 28.848 | 21.804 | 28.848 | 206.2 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 82.831 | 83.552 | 82.753 | 83.552 | 254.0 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 4.154 | 4.872 | 3.367 | 4.872 | 212.5 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.966 | 9.456 | 8.714 | 9.456 | 254.0 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 176.066 | 184.577 | 173.256 | 184.577 | 196.9 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1579.867 | 1600.887 | 1578.205 | 1600.887 | 254.0 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.828 | 2.936 | 1.749 | 2.936 | 196.9 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.958 | 5.074 | 4.854 | 5.074 | 254.0 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.293 | 0.327 | 0.276 | 0.327 | 186.7 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.251 | 1.276 | 1.233 | 1.276 | 254.0 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 7.880 | 9.756 | 7.219 | 9.756 | 157.5 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 25.057 | 26.428 | 24.557 | 26.428 | 254.0 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 3.002 | 3.567 | 2.565 | 3.567 | 170.4 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 6.967 | 7.125 | 6.874 | 7.125 | 254.0 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 135.0 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.482 | 0.441 | 0.482 | 254.0 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 167.499 | 193.081 | 167.019 | 193.081 | 152.3 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1603.931 | 1611.395 | 1593.161 | 1611.395 | 254.0 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 157.067 | 162.977 | 155.141 | 162.977 | 152.4 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1592.146 | 1614.287 | 1584.141 | 1614.287 | 254.0 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.242 | 0.388 | 0.175 | 0.388 | 152.4 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.144 | 2.483 | 2.041 | 2.483 | 254.0 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.034 | 0.054 | 0.026 | 0.054 | 152.4 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.452 | 0.474 | 0.430 | 0.474 | 254.0 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.498 | 1.547 | 1.452 | 1.547 | 152.3 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 15.467 | 17.718 | 14.998 | 17.718 | 254.0 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.616 | 2.146 | 1.566 | 2.146 | 152.1 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 13.023 | 13.218 | 12.874 | 13.218 | 254.0 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.182 | 4.249 | 1.878 | 4.249 | 143.2 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.544 | 9.867 | 9.440 | 9.867 | 254.0 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.167 | 0.188 | 0.147 | 0.188 | 145.8 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.134 | 3.199 | 3.092 | 3.199 | 254.0 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.058 | 0.067 | 0.035 | 0.067 | 145.4 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.617 | 0.667 | 0.608 | 0.667 | 254.0 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 197.386 | 199.538 | 191.442 | 199.538 | 179.7 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1650.092 | 1661.713 | 1643.502 | 1661.713 | 254.0 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 165.101 | 173.721 | 164.297 | 173.721 | 192.8 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1595.156 | 1612.663 | 1588.600 | 1612.663 | 254.0 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.136 | 1.484 | 1.032 | 1.484 | 185.3 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.205 | 3.438 | 3.118 | 3.438 | 254.0 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.085 | 0.124 | 0.084 | 0.124 | 181.4 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.505 | 0.522 | 0.501 | 0.522 | 254.0 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.715 | 21.453 | 19.710 | 21.453 | 171.9 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 69.477 | 69.969 | 69.209 | 69.969 | 254.0 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 20.356 | 20.726 | 20.067 | 20.726 | 164.7 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 69.390 | 70.384 | 68.523 | 70.384 | 254.0 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.370 | 20.023 | 19.027 | 20.023 | 152.8 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 64.355 | 64.651 | 62.641 | 64.651 | 254.0 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.609 | 2.349 | 1.394 | 2.349 | 159.3 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.335 | 5.442 | 5.242 | 5.442 | 254.0 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 180.400 | 183.289 | 178.847 | 183.289 | 237.1 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1433.877 | 1472.438 | 1422.920 | 1472.438 | 254.0 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.774 | 2.412 | 1.709 | 2.412 | 237.1 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.087 | 10.216 | 10.040 | 10.216 | 254.0 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.032 | 0.042 | 0.025 | 0.042 | 230.7 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.349 | 3.457 | 3.314 | 3.457 | 254.0 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 20.141 | 26.253 | 19.609 | 26.253 | 207.5 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 79.148 | 92.394 | 78.844 | 92.394 | 254.0 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.975 | 4.221 | 3.390 | 4.221 | 222.3 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.396 | 9.811 | 9.197 | 9.811 | 254.0 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 171.714 | 176.582 | 168.447 | 176.582 | 204.4 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1423.716 | 1467.058 | 1423.352 | 1467.058 | 254.0 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.367 | 1.603 | 1.266 | 1.603 | 202.7 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.816 | 6.262 | 5.726 | 6.262 | 254.0 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.023 | 0.048 | 0.021 | 0.048 | 184.1 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.528 | 1.555 | 1.514 | 1.555 | 254.0 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 5.962 | 6.860 | 5.566 | 6.860 | 158.1 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 21.039 | 21.534 | 20.519 | 21.534 | 254.0 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.757 | 2.868 | 2.396 | 2.868 | 165.6 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.816 | 20.067 | 6.440 | 20.067 | 254.0 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.014 | 0.018 | 134.8 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.480 | 0.549 | 0.465 | 0.549 | 254.0 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 167.373 | 184.960 | 163.431 | 184.960 | 158.1 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1431.622 | 1451.330 | 1426.058 | 1451.330 | 254.0 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 153.791 | 155.160 | 151.117 | 155.160 | 158.1 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1425.400 | 1429.951 | 1420.272 | 1429.951 | 254.0 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.097 | 0.124 | 0.087 | 0.124 | 158.1 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.083 | 2.222 | 2.054 | 2.222 | 254.0 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.016 | 0.022 | 0.015 | 0.022 | 158.1 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.434 | 0.447 | 0.431 | 0.447 | 254.0 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.352 | 2.599 | 1.082 | 2.599 | 158.1 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.802 | 12.051 | 11.636 | 12.051 | 254.0 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.512 | 1.608 | 1.431 | 1.608 | 150.6 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 11.416 | 13.880 | 10.962 | 13.880 | 254.0 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.915 | 4.711 | 1.367 | 4.711 | 144.9 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.638 | 10.605 | 8.194 | 10.605 | 254.0 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.134 | 0.194 | 0.122 | 0.194 | 145.2 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.714 | 2.808 | 2.616 | 2.808 | 254.0 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 179.681 | 188.615 | 178.295 | 188.615 | 198.9 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1428.889 | 1441.367 | 1427.767 | 1441.367 | 254.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.552 | 2.706 | 2.494 | 2.706 | 197.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.192 | 7.397 | 7.107 | 7.397 | 254.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.051 | 0.053 | 0.049 | 0.053 | 177.4 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.893 | 2.902 | 2.868 | 2.902 | 254.0 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 11.959 | 13.862 | 11.552 | 13.862 | 158.9 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 38.635 | 52.158 | 38.206 | 52.158 | 254.0 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.378 | 0.559 | 0.355 | 0.559 | 160.4 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.017 | 12.249 | 11.848 | 12.249 | 254.0 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 181.716 | 183.821 | 179.320 | 183.821 | 205.9 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1430.945 | 1467.239 | 1426.039 | 1467.239 | 254.0 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 2.824 | 3.670 | 2.745 | 3.670 | 203.8 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.210 | 7.345 | 7.193 | 7.345 | 254.0 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.045 | 0.068 | 0.042 | 0.068 | 201.2 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.932 | 2.960 | 2.897 | 2.960 | 254.0 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 13.336 | 16.077 | 12.369 | 16.077 | 176.7 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.209 | 52.649 | 40.013 | 52.649 | 254.0 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.931 | 2.794 | 1.797 | 2.794 | 198.4 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.456 | 13.729 | 13.244 | 13.729 | 254.0 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 171.523 | 176.723 | 169.730 | 176.723 | 193.0 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1431.574 | 1434.994 | 1420.911 | 1434.994 | 254.0 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 1.590 | 1.700 | 1.521 | 1.700 | 177.7 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.124 | 5.247 | 5.077 | 5.247 | 254.0 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.039 | 0.044 | 0.032 | 0.044 | 160.4 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.463 | 1.487 | 1.449 | 1.487 | 254.0 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.620 | 6.714 | 5.356 | 6.714 | 154.1 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 18.986 | 19.346 | 18.794 | 19.346 | 254.0 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.112 | 2.505 | 1.982 | 2.505 | 158.1 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.932 | 9.098 | 8.815 | 9.098 | 254.0 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.026 | 0.011 | 0.026 | 136.3 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.474 | 0.497 | 0.462 | 0.497 | 254.0 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 186.901 | 191.691 | 184.942 | 191.691 | 155.6 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1475.504 | 1494.801 | 1473.373 | 1494.801 | 254.0 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 158.596 | 188.129 | 155.370 | 188.129 | 155.6 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1431.058 | 1446.904 | 1427.979 | 1446.904 | 254.0 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.419 | 0.455 | 0.396 | 0.455 | 155.6 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.914 | 4.034 | 3.888 | 4.034 | 254.0 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.024 | 0.034 | 0.021 | 0.034 | 155.6 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.715 | 0.819 | 0.702 | 0.819 | 254.0 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.165 | 13.436 | 12.915 | 13.436 | 155.1 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 47.827 | 48.414 | 47.309 | 48.414 | 254.0 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.284 | 13.488 | 13.162 | 13.488 | 155.1 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 47.076 | 48.677 | 46.370 | 48.677 | 254.0 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 14.059 | 14.472 | 13.836 | 14.472 | 146.6 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 42.579 | 47.160 | 42.209 | 47.160 | 254.0 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.201 | 0.226 | 0.188 | 0.226 | 149.1 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.841 | 4.945 | 4.758 | 4.945 | 254.0 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 135.4 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.466 | 0.483 | 0.454 | 0.483 | 254.0 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 172.177 | 192.890 | 171.894 | 192.890 | 155.8 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1439.327 | 1446.991 | 1435.402 | 1446.991 | 254.0 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.478 | 211.756 | 158.412 | 211.756 | 155.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1439.095 | 1444.290 | 1432.775 | 1444.290 | 254.0 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.441 | 0.688 | 0.410 | 0.688 | 155.8 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.024 | 4.680 | 3.943 | 4.680 | 254.0 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.021 | 0.033 | 0.019 | 0.033 | 155.8 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.696 | 1.417 | 0.694 | 1.417 | 254.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.570 | 2.845 | 2.530 | 2.845 | 155.1 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.970 | 20.360 | 18.590 | 20.360 | 254.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.721 | 2.853 | 2.693 | 2.853 | 155.1 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 18.123 | 19.287 | 17.979 | 19.287 | 254.0 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.339 | 3.636 | 3.032 | 3.636 | 146.1 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.909 | 15.863 | 13.683 | 15.863 | 254.0 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.207 | 0.277 | 0.180 | 0.277 | 148.8 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.742 | 4.851 | 4.718 | 4.851 | 254.0 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.043 | 0.056 | 0.024 | 0.056 | 139.8 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.530 | 0.553 | 0.508 | 0.553 | 254.0 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 188.624 | 195.438 | 185.901 | 195.438 | 158.4 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1658.970 | 1697.192 | 1647.022 | 1697.192 | 254.0 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 160.486 | 168.719 | 159.512 | 168.719 | 159.4 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1603.943 | 1641.712 | 1588.941 | 1641.712 | 254.0 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.780 | 0.837 | 0.774 | 0.837 | 158.6 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.376 | 4.456 | 4.245 | 4.456 | 254.0 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.099 | 0.125 | 0.090 | 0.125 | 158.5 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.753 | 0.766 | 0.733 | 0.766 | 254.0 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 16.990 | 17.485 | 16.944 | 17.485 | 156.4 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 63.049 | 64.416 | 62.922 | 64.416 | 254.0 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.093 | 17.745 | 16.991 | 17.745 | 153.8 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 64.005 | 65.553 | 63.336 | 65.553 | 254.0 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.830 | 18.173 | 17.395 | 18.173 | 151.2 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 56.233 | 57.417 | 55.908 | 57.417 | 254.0 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.229 | 1.011 | 0.225 | 1.011 | 153.2 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.522 | 15.144 | 6.205 | 15.144 | 254.0 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 168.863 | 185.491 | 164.189 | 185.491 | 156.4 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1460.968 | 1617.025 | 1419.197 | 1617.025 | 254.0 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.082 | 0.151 | 0.075 | 0.151 | 155.7 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.685 | 4.847 | 4.591 | 4.847 | 254.0 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.014 | 0.026 | 0.014 | 0.026 | 155.2 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.332 | 2.583 | 2.314 | 2.583 | 254.0 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.277 | 8.910 | 6.282 | 8.910 | 153.9 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 15.996 | 32.159 | 15.205 | 32.159 | 254.0 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.200 | 0.209 | 0.186 | 0.209 | 154.6 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.755 | 3.157 | 2.679 | 3.157 | 254.0 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 169.225 | 172.666 | 165.102 | 172.666 | 184.7 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1413.506 | 1440.486 | 1410.744 | 1440.486 | 254.0 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.110 | 0.185 | 0.082 | 0.185 | 174.4 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.740 | 4.826 | 4.634 | 4.826 | 254.0 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.015 | 0.029 | 0.014 | 0.029 | 163.4 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.317 | 2.377 | 2.300 | 2.377 | 254.0 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 7.498 | 8.081 | 6.895 | 8.081 | 156.4 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 15.380 | 28.063 | 15.316 | 28.063 | 254.0 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.413 | 1.775 | 1.322 | 1.775 | 157.6 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.859 | 2.928 | 2.797 | 2.928 | 254.0 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 161.410 | 164.830 | 159.269 | 164.830 | 155.7 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1423.127 | 1506.492 | 1413.494 | 1506.492 | 254.0 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.097 | 0.131 | 0.067 | 0.131 | 155.6 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.920 | 2.982 | 2.874 | 2.982 | 254.0 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.029 | 0.014 | 0.029 | 155.1 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.024 | 1.039 | 1.015 | 1.039 | 254.0 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.304 | 4.644 | 2.795 | 4.644 | 153.9 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.204 | 8.698 | 8.042 | 8.698 | 254.0 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.369 | 1.572 | 1.341 | 1.572 | 154.5 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.877 | 2.918 | 2.800 | 2.918 | 254.0 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.029 | 0.012 | 0.029 | 140.7 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.459 | 0.508 | 0.451 | 0.508 | 254.0 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 172.112 | 177.755 | 168.540 | 177.755 | 161.3 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1607.761 | 1613.332 | 1600.937 | 1613.332 | 254.0 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 158.782 | 162.565 | 158.163 | 162.565 | 163.5 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1593.521 | 1613.638 | 1588.518 | 1613.638 | 254.0 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.235 | 1.569 | 0.813 | 1.569 | 163.5 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.107 | 3.222 | 3.054 | 3.222 | 254.0 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.092 | 0.111 | 0.085 | 0.111 | 161.3 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.516 | 0.583 | 0.501 | 0.583 | 254.0 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.370 | 3.559 | 3.258 | 3.559 | 161.1 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 21.543 | 23.791 | 21.369 | 23.791 | 254.0 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.693 | 3.849 | 3.510 | 3.849 | 158.2 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.886 | 22.026 | 20.640 | 22.026 | 254.0 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 5.717 | 6.958 | 3.964 | 6.958 | 157.7 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.988 | 20.734 | 15.613 | 20.734 | 254.0 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.175 | 0.201 | 0.162 | 0.201 | 157.7 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 5.089 | 5.199 | 5.009 | 5.199 | 254.0 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 184.270 | 192.668 | 183.228 | 192.668 | 204.1 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1602.165 | 1617.077 | 1586.837 | 1617.077 | 254.0 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.405 | 5.399 | 4.140 | 5.399 | 202.5 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 6.161 | 6.392 | 6.016 | 6.392 | 254.0 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.308 | 0.347 | 0.296 | 0.347 | 198.5 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.665 | 2.723 | 2.460 | 2.723 | 254.0 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 15.725 | 18.477 | 15.004 | 18.477 | 178.9 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 44.182 | 65.281 | 42.288 | 65.281 | 254.0 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.560 | 0.882 | 0.555 | 0.882 | 196.8 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 8.059 | 8.268 | 7.672 | 8.268 | 254.0 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 187.695 | 206.409 | 183.521 | 206.409 | 200.2 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1582.510 | 1593.586 | 1579.096 | 1593.586 | 254.0 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.343 | 4.780 | 4.148 | 4.780 | 200.0 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.911 | 6.025 | 5.886 | 6.025 | 254.0 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.318 | 0.339 | 0.312 | 0.339 | 200.0 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.453 | 2.537 | 2.431 | 2.537 | 254.0 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 17.205 | 17.723 | 15.542 | 17.723 | 191.1 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 42.304 | 42.582 | 41.949 | 42.582 | 254.0 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.077 | 3.352 | 1.978 | 3.352 | 199.0 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.807 | 10.123 | 8.687 | 10.123 | 254.0 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 178.318 | 199.306 | 178.082 | 199.306 | 202.2 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1585.703 | 1611.110 | 1581.253 | 1611.110 | 254.0 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 3.326 | 4.409 | 2.487 | 4.409 | 202.1 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.445 | 4.892 | 4.279 | 4.892 | 254.0 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.286 | 0.296 | 0.254 | 0.296 | 198.2 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.129 | 1.159 | 1.115 | 1.159 | 254.0 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 7.417 | 8.927 | 7.024 | 8.927 | 158.2 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.009 | 21.365 | 20.898 | 21.365 | 254.0 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 3.195 | 4.351 | 2.102 | 4.351 | 179.3 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.665 | 8.793 | 8.594 | 8.793 | 254.0 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 192.418 | 194.416 | 190.189 | 194.416 | 148.9 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1638.921 | 1681.647 | 1629.279 | 1681.647 | 254.0 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.243 | 178.315 | 164.585 | 178.315 | 158.1 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1591.056 | 1603.542 | 1587.099 | 1603.542 | 254.0 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.265 | 1.390 | 1.212 | 1.390 | 158.1 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.948 | 4.003 | 3.893 | 4.003 | 254.0 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.126 | 0.266 | 0.109 | 0.266 | 152.4 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.697 | 0.717 | 0.692 | 0.717 | 254.0 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.015 | 0.016 | 0.012 | 0.016 | 140.1 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.462 | 0.478 | 0.459 | 0.478 | 254.0 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.308 | 0.346 | 0.282 | 0.346 | 143.3 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.572 | 14.779 | 14.519 | 14.779 | 254.0 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.027 | 0.011 | 0.027 | 139.7 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.485 | 0.462 | 0.485 | 254.0 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 188.636 | 192.370 | 187.159 | 192.370 | 155.5 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1651.690 | 1676.879 | 1645.891 | 1676.879 | 254.0 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 165.347 | 171.791 | 160.700 | 171.791 | 156.3 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1602.057 | 1653.530 | 1596.517 | 1653.530 | 254.0 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.977 | 1.272 | 0.933 | 1.272 | 156.3 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 3.978 | 4.133 | 3.899 | 4.133 | 254.0 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.099 | 0.107 | 0.083 | 0.107 | 155.5 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.710 | 0.736 | 0.699 | 0.736 | 254.0 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.985 | 15.063 | 13.908 | 15.063 | 155.4 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.935 | 52.366 | 51.518 | 52.366 | 254.0 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.074 | 14.821 | 13.943 | 14.821 | 154.0 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 51.244 | 51.736 | 51.147 | 51.736 | 254.0 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 15.449 | 16.107 | 14.339 | 16.107 | 153.4 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 45.542 | 46.940 | 45.428 | 46.940 | 254.0 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.214 | 0.264 | 0.191 | 0.264 | 153.5 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.533 | 5.806 | 5.460 | 5.806 | 254.0 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.025 | 0.012 | 0.025 | 135.2 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.472 | 0.494 | 0.464 | 0.494 | 254.0 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 179.813 | 187.307 | 177.209 | 187.307 | 152.8 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1611.736 | 1655.260 | 1606.666 | 1655.260 | 254.0 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 167.653 | 180.631 | 165.868 | 180.631 | 153.2 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1605.749 | 1622.719 | 1593.055 | 1622.719 | 254.0 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.998 | 1.081 | 0.963 | 1.081 | 153.2 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.992 | 4.071 | 3.852 | 4.071 | 254.0 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.093 | 0.113 | 0.087 | 0.113 | 152.8 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.703 | 0.721 | 0.684 | 0.721 | 254.0 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.506 | 4.333 | 3.256 | 4.333 | 152.5 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.684 | 28.768 | 22.689 | 28.768 | 254.0 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.770 | 4.172 | 3.610 | 4.172 | 151.9 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 22.330 | 26.145 | 22.043 | 26.145 | 254.0 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 5.212 | 7.292 | 3.903 | 7.292 | 151.0 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.372 | 18.090 | 16.167 | 18.090 | 254.0 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.212 | 0.251 | 0.203 | 0.251 | 151.4 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.516 | 6.888 | 5.432 | 6.888 | 254.0 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.266 | 11.078 | 6.748 | 11.078 | 151.5 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 49.211 | 50.968 | 48.586 | 50.968 | 254.0 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 183.312 | 188.177 | 181.282 | 188.177 | 157.8 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1483.945 | 1531.115 | 1464.992 | 1531.115 | 254.0 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.680 | 3.156 | 2.645 | 3.156 | 157.1 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.367 | 1.464 | 1.329 | 1.464 | 254.0 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.136 | 0.402 | 0.131 | 0.402 | 128.8 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.558 | 0.618 | 0.556 | 0.618 | 254.0 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.050 | 0.071 | 0.047 | 0.071 | 156.5 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.537 | 5.714 | 5.413 | 5.714 | 254.0 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.773 | 2.075 | 1.736 | 2.075 | 136.6 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.857 | 1.264 | 0.803 | 1.264 | 254.0 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.193 | 6.422 | 6.189 | 6.422 | 156.0 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 40.726 | 41.995 | 40.126 | 41.995 | 254.0 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 8.235 | 8.504 | 7.493 | 8.504 | 152.6 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 61.160 | 64.995 | 59.574 | 64.995 | 254.0 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 187.116 | 190.119 | 186.646 | 190.119 | 154.1 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1463.086 | 1465.053 | 1453.871 | 1465.053 | 254.0 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.307 | 1.854 | 1.211 | 1.854 | 154.0 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.506 | 1.551 | 1.458 | 1.551 | 254.0 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.067 | 0.079 | 0.056 | 0.079 | 124.3 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.444 | 0.478 | 0.435 | 0.478 | 254.0 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.056 | 0.085 | 0.055 | 0.085 | 153.1 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.413 | 5.668 | 5.361 | 5.668 | 254.0 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.567 | 1.763 | 1.498 | 1.763 | 130.1 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.814 | 0.834 | 0.788 | 0.834 | 254.0 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 6.518 | 7.395 | 6.297 | 7.395 | 153.1 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.817 | 47.415 | 46.322 | 47.415 | 254.0 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.249 | 2.578 | 2.139 | 2.578 | 157.5 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.306 | 14.420 | 13.232 | 14.420 | 254.0 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.193 | 0.286 | 0.186 | 0.286 | 170.5 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 254.0 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.196 | 0.216 | 0.190 | 0.216 | 158.5 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 254.0 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 13.453 | 14.600 | 12.395 | 14.600 | 155.7 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 143.777 | 158.936 | 143.582 | 158.936 | 254.0 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.075 | 0.083 | 0.071 | 0.083 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.638 | 0.654 | 0.635 | 0.654 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 176.114 | 179.428 | 175.643 | 179.428 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1403.312 | 1425.180 | 1396.632 | 1425.180 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 164.200 | 166.528 | 163.384 | 166.528 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1397.158 | 1404.626 | 1392.087 | 1404.626 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.129 | 0.133 | 0.123 | 0.133 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.838 | 4.010 | 3.791 | 4.010 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.030 | 0.026 | 0.030 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.841 | 1.092 | 0.809 | 1.092 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.010 | 2.570 | 1.894 | 2.570 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.022 | 14.232 | 14.004 | 14.232 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.465 | 2.557 | 2.154 | 2.557 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.454 | 13.726 | 13.343 | 13.726 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.117 | 3.321 | 2.053 | 3.321 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 8.871 | 8.940 | 8.741 | 8.940 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.463 | 1.133 | 0.461 | 1.133 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.633 | 4.699 | 4.614 | 4.699 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.050 | 0.079 | 0.045 | 0.079 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.490 | 0.515 | 0.477 | 0.515 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 177.970 | 181.183 | 175.421 | 181.183 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1413.636 | 1418.408 | 1412.050 | 1418.408 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 161.011 | 165.892 | 158.119 | 165.892 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1401.247 | 1418.736 | 1398.258 | 1418.736 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.129 | 0.138 | 0.123 | 0.138 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.544 | 3.678 | 3.539 | 3.678 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.029 | 0.038 | 0.027 | 0.038 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.643 | 0.668 | 0.622 | 0.668 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.479 | 4.696 | 4.469 | 4.696 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.067 | 27.120 | 26.640 | 27.120 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.718 | 5.028 | 4.628 | 5.028 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 26.149 | 27.006 | 26.134 | 27.006 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 4.851 | 5.349 | 4.839 | 5.349 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.044 | 22.421 | 21.845 | 22.421 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.393 | 0.431 | 0.361 | 0.431 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.515 | 4.767 | 4.483 | 4.767 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.507 | 162.457 | 154.464 | 162.457 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1415.310 | 1429.759 | 1415.018 | 1429.759 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.684 | 0.107 | 0.684 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.065 | 2.122 | 2.055 | 2.122 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.074 | 0.016 | 0.074 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.396 | 0.422 | 0.394 | 0.422 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.334 | 3.132 | 1.243 | 3.132 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.065 | 3.171 | 3.060 | 3.171 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.220 | 0.234 | 0.197 | 0.234 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.743 | 2.931 | 2.689 | 2.931 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.144 | 162.890 | 158.785 | 162.890 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1413.220 | 1422.189 | 1405.256 | 1422.189 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.127 | 0.170 | 0.127 | 0.170 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.067 | 2.106 | 2.051 | 2.106 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.036 | 0.017 | 0.036 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.407 | 0.427 | 0.399 | 0.427 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.224 | 1.300 | 1.199 | 1.300 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.022 | 3.129 | 2.964 | 3.129 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.221 | 0.224 | 0.198 | 0.224 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.628 | 2.740 | 2.580 | 2.740 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.101 | 0.108 | 0.099 | 0.108 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.943 | 0.954 | 0.936 | 0.954 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 182.353 | 188.285 | 179.087 | 188.285 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1415.081 | 1428.351 | 1411.640 | 1428.351 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 164.117 | 167.953 | 162.796 | 167.953 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1392.336 | 1450.338 | 1391.902 | 1450.338 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.145 | 0.201 | 0.140 | 0.201 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.517 | 3.568 | 3.503 | 3.568 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.020 | 0.028 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.202 | 1.366 | 1.193 | 1.366 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.890 | 8.031 | 6.148 | 8.031 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 30.311 | 30.353 | 29.892 | 30.353 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.331 | 8.567 | 5.217 | 8.567 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 28.955 | 29.287 | 28.761 | 29.287 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 4.800 | 5.337 | 4.776 | 5.337 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 24.770 | 26.551 | 24.493 | 26.551 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.912 | 1.042 | 0.903 | 1.042 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.361 | 4.432 | 4.343 | 4.432 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.024 | 0.016 | 0.024 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.523 | 0.480 | 0.523 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 169.295 | 173.561 | 167.801 | 173.561 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1427.971 | 1465.294 | 1418.866 | 1465.294 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 158.093 | 164.178 | 156.171 | 164.178 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1420.383 | 1429.438 | 1417.793 | 1429.438 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.094 | 0.293 | 0.082 | 0.293 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.149 | 2.248 | 2.105 | 2.248 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.026 | 0.036 | 0.019 | 0.036 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.441 | 0.475 | 0.431 | 0.475 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.379 | 1.416 | 1.339 | 1.416 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.492 | 13.795 | 12.407 | 13.795 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.877 | 2.321 | 1.763 | 2.321 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 11.868 | 12.344 | 11.633 | 12.344 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.652 | 3.893 | 1.533 | 3.893 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.760 | 9.631 | 8.627 | 9.631 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.270 | 0.307 | 0.198 | 0.307 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.097 | 3.197 | 3.053 | 3.197 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.018 | 0.016 | 0.018 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.487 | 0.514 | 0.468 | 0.514 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 170.090 | 174.687 | 168.217 | 174.687 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1426.181 | 1441.046 | 1422.372 | 1441.046 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 156.480 | 161.204 | 155.139 | 161.204 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1421.926 | 1445.767 | 1416.050 | 1445.767 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.098 | 0.152 | 0.084 | 0.152 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.187 | 2.256 | 2.128 | 2.256 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.025 | 0.035 | 0.019 | 0.035 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.445 | 0.485 | 0.435 | 0.485 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.450 | 1.715 | 1.340 | 1.715 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.591 | 12.790 | 12.573 | 12.790 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.925 | 2.529 | 1.790 | 2.529 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.931 | 12.263 | 11.910 | 12.263 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 2.085 | 6.017 | 1.506 | 6.017 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.868 | 9.397 | 8.755 | 9.397 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.210 | 0.327 | 0.191 | 0.327 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.136 | 3.270 | 3.068 | 3.270 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.025 | 0.015 | 0.025 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.464 | 0.482 | 0.440 | 0.482 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 290.704 | 307.256 | 287.226 | 307.256 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1813.441 | 1853.210 | 1800.479 | 1853.210 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 158.430 | 161.180 | 155.651 | 161.180 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1423.994 | 1445.909 | 1419.716 | 1445.909 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.096 | 0.148 | 0.084 | 0.148 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.179 | 2.380 | 2.136 | 2.380 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.026 | 0.038 | 0.017 | 0.038 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.438 | 0.457 | 0.419 | 0.457 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 106.525 | 107.925 | 105.009 | 107.925 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 396.604 | 402.893 | 392.015 | 402.893 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 106.258 | 107.947 | 105.377 | 107.947 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 392.221 | 408.790 | 388.647 | 408.790 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 107.021 | 109.217 | 105.830 | 109.217 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 392.141 | 405.242 | 391.592 | 405.242 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.292 | 0.313 | 0.271 | 0.313 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.160 | 3.422 | 3.055 | 3.422 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.368 | 168.256 | 156.325 | 168.256 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1416.546 | 1451.618 | 1414.354 | 1451.618 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.133 | 0.199 | 0.131 | 0.199 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.062 | 2.129 | 2.045 | 2.129 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.018 | 0.029 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.434 | 0.449 | 0.428 | 0.449 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.879 | 3.281 | 1.795 | 3.281 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.223 | 7.753 | 7.044 | 7.753 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.239 | 0.280 | 0.227 | 0.280 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.650 | 2.721 | 2.647 | 2.721 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.651 | 170.012 | 155.168 | 170.012 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1421.117 | 1431.734 | 1417.452 | 1431.734 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.155 | 0.134 | 0.155 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.108 | 2.174 | 2.073 | 2.174 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.018 | 0.031 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.428 | 0.455 | 0.425 | 0.455 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.905 | 3.956 | 3.830 | 3.956 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 19.924 | 20.452 | 19.507 | 20.452 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.202 | 0.226 | 0.192 | 0.226 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.701 | 2.768 | 2.645 | 2.768 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.068 | 0.042 | 0.068 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.484 | 0.509 | 0.479 | 0.509 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 172.965 | 182.899 | 170.533 | 182.899 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1434.253 | 1438.532 | 1431.622 | 1438.532 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 158.357 | 159.973 | 158.102 | 159.973 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1394.388 | 1397.151 | 1391.733 | 1397.151 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.131 | 0.153 | 0.128 | 0.153 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.638 | 3.693 | 3.547 | 3.693 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.037 | 0.055 | 0.030 | 0.055 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.620 | 0.639 | 0.609 | 0.639 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.962 | 3.005 | 2.915 | 3.005 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 47.936 | 48.089 | 47.754 | 48.089 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.106 | 3.329 | 3.057 | 3.329 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 47.703 | 47.831 | 47.612 | 47.831 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.266 | 4.549 | 3.220 | 4.549 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 42.972 | 43.692 | 42.955 | 43.692 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.423 | 0.809 | 0.345 | 0.809 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.699 | 4.785 | 4.644 | 4.785 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.254 | 164.927 | 161.335 | 164.927 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1401.850 | 1406.470 | 1397.594 | 1406.470 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.214 | 2.499 | 0.196 | 2.499 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.576 | 3.731 | 3.574 | 3.731 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.030 | 0.021 | 0.030 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.662 | 0.755 | 0.645 | 0.755 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.355 | 3.230 | 1.945 | 3.230 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 7.559 | 8.175 | 7.358 | 8.175 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.416 | 0.522 | 0.391 | 0.522 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.649 | 4.714 | 4.638 | 4.714 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.914 | 173.667 | 162.660 | 173.667 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1408.013 | 1417.872 | 1398.408 | 1417.872 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.186 | 0.162 | 0.186 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.833 | 3.880 | 3.724 | 3.880 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.031 | 0.018 | 0.031 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.817 | 0.860 | 0.810 | 0.860 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.875 | 4.364 | 3.691 | 4.364 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.006 | 9.518 | 8.784 | 9.518 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.492 | 0.523 | 0.487 | 0.523 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.680 | 4.797 | 4.637 | 4.797 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.075 | 0.077 | 0.073 | 0.077 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.653 | 0.673 | 0.650 | 0.673 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 177.531 | 182.667 | 177.159 | 182.667 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1425.380 | 1428.206 | 1423.719 | 1428.206 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 167.937 | 175.266 | 164.929 | 175.266 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1415.096 | 1425.999 | 1413.165 | 1425.999 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.136 | 0.146 | 0.126 | 0.146 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.807 | 3.897 | 3.800 | 3.897 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.026 | 0.032 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.825 | 0.849 | 0.806 | 0.849 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.046 | 2.554 | 2.025 | 2.554 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.615 | 15.254 | 14.581 | 15.254 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.599 | 3.291 | 2.283 | 3.291 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.844 | 16.570 | 13.750 | 16.570 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.421 | 3.675 | 2.232 | 3.675 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.097 | 9.167 | 8.995 | 9.167 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 1.009 | 1.288 | 0.512 | 1.288 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.764 | 5.080 | 4.733 | 5.080 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.060 | 0.068 | 0.054 | 0.068 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.550 | 0.567 | 0.539 | 0.567 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 168.801 | 174.895 | 166.869 | 174.895 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1422.919 | 1427.995 | 1416.653 | 1427.995 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 162.592 | 163.853 | 161.151 | 163.853 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1421.995 | 1445.813 | 1417.059 | 1445.813 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.113 | 0.141 | 0.109 | 0.141 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.635 | 3.827 | 3.575 | 3.827 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.025 | 0.027 | 0.023 | 0.027 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.677 | 0.695 | 0.675 | 0.695 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.188 | 1.296 | 1.176 | 1.296 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 12.891 | 13.000 | 12.861 | 13.000 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.298 | 1.333 | 1.294 | 1.333 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.321 | 12.428 | 12.304 | 12.428 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 2.010 | 2.420 | 1.941 | 2.420 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.927 | 7.953 | 7.852 | 7.953 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.386 | 1.033 | 0.385 | 1.033 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.731 | 4.789 | 4.705 | 4.789 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.902 | 160.964 | 155.734 | 160.964 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1413.097 | 1429.289 | 1409.430 | 1429.289 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.163 | 0.128 | 0.163 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.069 | 2.120 | 2.048 | 2.120 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.018 | 0.029 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.429 | 0.440 | 0.426 | 0.440 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.958 | 2.240 | 1.880 | 2.240 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.636 | 7.940 | 7.111 | 7.940 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.221 | 0.233 | 0.200 | 0.233 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.649 | 2.719 | 2.649 | 2.719 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.064 | 161.820 | 155.556 | 161.820 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1411.412 | 1430.674 | 1408.988 | 1430.674 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.158 | 0.118 | 0.158 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.025 | 2.104 | 2.021 | 2.104 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.031 | 0.017 | 0.031 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.406 | 0.437 | 0.394 | 0.437 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.922 | 6.156 | 3.813 | 6.156 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 19.656 | 20.234 | 19.615 | 20.234 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.200 | 0.391 | 0.196 | 0.391 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.608 | 2.754 | 2.570 | 2.754 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.876 | 165.926 | 159.689 | 165.926 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1405.780 | 1433.663 | 1396.441 | 1433.663 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.196 | 0.208 | 0.192 | 0.208 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.797 | 3.861 | 3.783 | 3.861 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.027 | 0.017 | 0.027 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.786 | 0.809 | 0.764 | 0.809 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.167 | 3.617 | 3.021 | 3.617 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.572 | 8.697 | 8.478 | 8.697 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.147 | 0.156 | 0.144 | 0.156 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.676 | 4.898 | 4.644 | 4.898 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.569 | 168.647 | 162.881 | 168.647 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1397.477 | 1423.789 | 1392.288 | 1423.789 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.182 | 0.221 | 0.180 | 0.221 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.759 | 3.776 | 3.722 | 3.776 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.032 | 0.021 | 0.032 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.743 | 0.787 | 0.729 | 0.787 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.182 | 4.139 | 2.867 | 4.139 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.676 | 8.815 | 8.500 | 8.815 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.147 | 0.158 | 0.134 | 0.158 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.705 | 4.804 | 4.639 | 4.804 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.674 | 184.240 | 163.342 | 184.240 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1394.517 | 1397.620 | 1392.045 | 1397.620 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.191 | 0.198 | 0.184 | 0.198 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.767 | 3.843 | 3.748 | 3.843 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.021 | 0.018 | 0.021 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.792 | 0.813 | 0.772 | 0.813 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.648 | 4.402 | 3.404 | 4.402 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.709 | 8.981 | 8.658 | 8.981 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.159 | 0.166 | 0.151 | 0.166 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.645 | 4.682 | 4.610 | 4.682 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.933 | 167.963 | 161.754 | 167.963 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1398.851 | 1424.166 | 1395.958 | 1424.166 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.196 | 0.208 | 0.190 | 0.208 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.796 | 4.048 | 3.709 | 4.048 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.032 | 0.018 | 0.032 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.802 | 0.831 | 0.780 | 0.831 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 4.088 | 5.797 | 3.136 | 5.797 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.772 | 8.897 | 8.577 | 8.897 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.161 | 0.184 | 0.149 | 0.184 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.613 | 4.730 | 4.566 | 4.730 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.504 | 158.877 | 156.154 | 158.877 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1412.535 | 1429.712 | 1411.975 | 1429.712 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.240 | 0.248 | 0.213 | 0.248 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.571 | 3.725 | 3.496 | 3.725 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.019 | 0.024 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.627 | 0.649 | 0.625 | 0.649 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 3.309 | 4.360 | 1.856 | 4.360 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.601 | 9.046 | 7.194 | 9.046 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.171 | 0.187 | 0.163 | 0.187 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.726 | 4.863 | 4.724 | 4.863 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.634 | 162.054 | 159.317 | 162.054 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1399.342 | 1417.973 | 1397.143 | 1417.973 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.214 | 0.255 | 0.212 | 0.255 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.629 | 4.106 | 3.508 | 4.106 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.022 | 0.021 | 0.022 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.619 | 0.645 | 0.605 | 0.645 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 2.106 | 3.751 | 1.907 | 3.751 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.319 | 7.957 | 7.176 | 7.957 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.162 | 0.164 | 0.158 | 0.164 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.714 | 4.750 | 4.710 | 4.750 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.750 | 163.865 | 159.845 | 163.865 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1402.987 | 1455.092 | 1398.567 | 1455.092 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.217 | 0.222 | 0.217 | 0.222 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.533 | 3.676 | 3.512 | 3.676 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.104 | 0.018 | 0.104 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.615 | 0.648 | 0.608 | 0.648 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.020 | 5.597 | 2.000 | 5.597 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.353 | 7.940 | 7.330 | 7.940 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.162 | 0.171 | 0.160 | 0.171 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.661 | 4.709 | 4.617 | 4.709 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.739 | 160.649 | 158.381 | 160.649 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1398.802 | 1428.385 | 1396.684 | 1428.385 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.216 | 0.269 | 0.211 | 0.269 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.583 | 3.662 | 3.551 | 3.662 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.023 | 0.020 | 0.023 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.634 | 0.666 | 0.624 | 0.666 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 2.136 | 2.841 | 2.042 | 2.841 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.499 | 7.907 | 7.267 | 7.907 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.237 | 0.490 | 0.229 | 0.490 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.701 | 4.972 | 4.680 | 4.972 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.062 | 173.526 | 158.466 | 173.526 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1408.185 | 1441.278 | 1405.817 | 1441.278 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.221 | 0.245 | 0.215 | 0.245 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.544 | 3.654 | 3.538 | 3.654 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.027 | 0.021 | 0.027 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.648 | 0.664 | 0.642 | 0.664 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.156 | 4.627 | 1.485 | 4.627 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.550 | 7.971 | 7.315 | 7.971 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.173 | 0.187 | 0.160 | 0.187 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.688 | 4.820 | 4.648 | 4.820 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.769 | 162.549 | 155.769 | 162.549 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1406.366 | 1418.214 | 1402.859 | 1418.214 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.218 | 0.229 | 0.212 | 0.229 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.587 | 3.702 | 3.531 | 3.702 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.031 | 0.022 | 0.031 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.667 | 0.684 | 0.643 | 0.684 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 1.546 | 3.393 | 1.479 | 3.393 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.827 | 9.007 | 7.364 | 9.007 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.162 | 0.169 | 0.161 | 0.169 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.657 | 5.123 | 4.632 | 5.123 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.530 | 160.239 | 159.383 | 160.239 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1408.794 | 1434.910 | 1405.856 | 1434.910 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.196 | 0.220 | 0.194 | 0.220 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.109 | 2.130 | 2.086 | 2.130 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.036 | 0.020 | 0.036 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.424 | 0.426 | 0.414 | 0.426 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 151.511 | 157.573 | 149.882 | 157.573 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 611.534 | 616.084 | 607.286 | 616.084 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.236 | 0.252 | 0.212 | 0.252 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.020 | 3.099 | 2.988 | 3.099 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.660 | 168.453 | 162.256 | 168.453 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1411.370 | 1431.401 | 1406.471 | 1431.401 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.196 | 0.250 | 0.162 | 0.250 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.075 | 2.111 | 2.043 | 2.111 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.035 | 0.021 | 0.035 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.413 | 0.421 | 0.404 | 0.421 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.445 | 4.619 | 4.198 | 4.619 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 19.830 | 20.360 | 19.657 | 20.360 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.220 | 0.238 | 0.213 | 0.238 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 2.985 | 3.018 | 2.983 | 3.018 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 159.551 | 161.009 | 158.454 | 161.009 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1416.728 | 1421.047 | 1411.061 | 1421.047 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.163 | 0.184 | 0.139 | 0.184 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.898 | 1.937 | 1.868 | 1.937 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.027 | 0.029 | 0.025 | 0.029 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.328 | 0.333 | 0.326 | 0.333 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.602 | 0.905 | 0.517 | 0.905 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.881 | 3.019 | 2.848 | 3.019 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.192 | 0.200 | 0.187 | 0.200 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.691 | 2.713 | 2.661 | 2.713 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 158.281 | 159.168 | 157.960 | 159.168 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1418.394 | 1434.676 | 1405.368 | 1434.676 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.166 | 0.175 | 0.142 | 0.175 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.885 | 1.989 | 1.882 | 1.989 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.022 | 0.038 | 0.020 | 0.038 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.340 | 0.468 | 0.340 | 0.468 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.847 | 0.951 | 0.830 | 0.951 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.590 | 6.766 | 5.500 | 6.766 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.163 | 0.177 | 0.159 | 0.177 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.710 | 4.302 | 2.682 | 4.302 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 303.219 | 322.693 | 298.410 | 322.693 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1936.933 | 1963.421 | 1927.262 | 1963.421 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.603 | 175.657 | 166.262 | 175.657 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1542.054 | 1582.860 | 1537.524 | 1582.860 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.180 | 0.263 | 0.162 | 0.263 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.168 | 2.327 | 2.109 | 2.327 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.028 | 0.052 | 0.019 | 0.052 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.452 | 0.465 | 0.406 | 0.465 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.027 | 0.035 | 0.025 | 0.035 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.484 | 0.507 | 0.474 | 0.507 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.450 | 4.951 | 4.362 | 4.951 | 142.8 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 122.131 | 134.886 | 120.191 | 134.886 | 254.0 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 177.418 | 211.227 | 174.103 | 211.227 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1504.265 | 1518.030 | 1495.650 | 1518.030 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.167 | 174.351 | 165.712 | 174.351 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1493.807 | 1504.697 | 1490.227 | 1504.697 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.264 | 0.337 | 0.212 | 0.337 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.775 | 5.507 | 3.515 | 5.507 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.024 | 0.044 | 0.018 | 0.044 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.695 | 0.718 | 0.661 | 0.718 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.058 | 0.067 | 0.044 | 0.067 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.535 | 0.572 | 0.528 | 0.572 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.035 | 1.310 | 0.981 | 1.310 | 137.2 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 72.773 | 73.934 | 72.139 | 73.934 | 254.0 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 180.622 | 182.686 | 177.787 | 182.686 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1441.049 | 1668.344 | 1433.773 | 1668.344 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.562 | 169.550 | 165.886 | 169.550 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1435.276 | 1458.131 | 1427.533 | 1458.131 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.190 | 0.210 | 0.171 | 0.210 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.926 | 4.172 | 3.820 | 4.172 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.025 | 0.017 | 0.025 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.838 | 0.900 | 0.817 | 0.900 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.073 | 0.086 | 0.041 | 0.086 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.654 | 0.704 | 0.629 | 0.704 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.336 | 3.288 | 1.218 | 3.288 | 150.4 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 20.324 | 32.155 | 19.681 | 32.155 | 254.0 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 104.911 | 107.151 | 103.234 | 107.151 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 388.366 | 403.442 | 385.168 | 403.442 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.306 | 6.657 | 6.248 | 6.657 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.367 | 9.351 | 8.317 | 9.351 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `5f551f20f5e46dd5d8d0dbe73cbc477bd1c1d725`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-flat-additive`, `country-explicit-us-flat-additive`, `country-us-flat-multiplicative`, `country-explicit-us-flat-multiplicative`, `country-boundary-flat`, `country-empty-bv-flat`, `country-explicit-empty-flat`, `country-estimated-sg-flat`, `country-partial-in-flat`, `country-mixed-us-flat`, `country-none-flat-730`, `country-se-flat-730`, `country-explicit-se-flat-730`, `country-cn-flat-730`, `country-explicit-cn-flat-730`, `country-none-flat-2190`, `country-se-flat-2190`, `country-explicit-se-flat-2190`, `country-cn-flat-2190`, `country-explicit-cn-flat-2190`, `country-none-flat-2190-batch-32`, `country-se-flat-2190-batch-32`, `country-explicit-se-flat-2190-batch-32`, `country-uncertainty-us-flat`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `anomalies-flat-defaults-99`, `warm-start-flat-defaults-7-new-rows`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:39c4ab144a7147d1a81c22e55137c3ac28c9660c59959796c7c7aca75854b6a2`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:93483eec0afdfe504929a154683fc5d671aec1c501107d5c6a76d99557be5970`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

