# Effect Prophet benchmark — 2026-10-20T171807-628Z-27b7ec98

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
| flat-correlated-regressors | equivalent-objective | passed | 2.255e-11 | 1.948e-12 | 5.112e-12 | 2.765e-11 | 2.945e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12254 | 25351 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12254 | 25351 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| country-uncertainty-us-flat | 96 | 12 | 25 | 4 | 4 | 275 | 32 | intervals | 67108864 | country-v5:country-basic-96:level+jan1(3)+jan5(1.4)+bounded-noise:n=96:future=4:year=2024 / 9ff002c94ecdaa2f78ad32094f4af7cf5cbbe377f19cfdb5b3100e29005151f8 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-defaults-seasonal-intervals-1000 | 96 | 6 | 25 | 120 | 24 | 24 | 1000 | intervals | 67108864 | flat-seasonal-v1:n=96:h=24:level=35:bounded-noise=true / 801786aaae3b93349addcc9eca44eff79cb6f5640dce099ddd19082a85636e2a | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-full-intervals-512 | 96 | 6 | 25 | 24 | 24 | 24 | 512 | intervals | 67108864 | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-large-full-samples-128 | 256 | 6 | 25 | 64 | 64 | 64 | 128 | samples | 67108864 | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 128 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons / exclude | d27263ab5e5b8f488de56085850577bb13a87b5ad4dca13da9039ce8de013341, ac378f98946578839b9dc1c9dbd10cc73c207ee8c103ad3c437807ee60fab209, d76d1f1e1ceb3370113274ddc7a004255a238dcdea9959d517623cb508c5da64 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 128 | 19 / 0.8 | rolling / exclude | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 137.7 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.469 | 0.504 | 0.443 | 0.504 | 252.0 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 193.937 | 199.530 | 189.036 | 199.530 | 156.8 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1743.290 | 1757.125 | 1692.898 | 1757.125 | 252.0 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 160.475 | 170.901 | 156.345 | 170.901 | 157.4 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1637.456 | 1669.542 | 1601.695 | 1669.542 | 252.0 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.779 | 1.014 | 0.721 | 1.014 | 157.4 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.358 | 3.641 | 3.283 | 3.641 | 252.0 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.077 | 0.090 | 0.076 | 0.090 | 156.9 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.561 | 0.605 | 0.539 | 0.605 | 252.0 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.608 | 22.500 | 21.274 | 22.500 | 156.8 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 73.523 | 74.194 | 71.855 | 74.194 | 252.0 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 21.927 | 22.751 | 21.878 | 22.751 | 154.7 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 72.745 | 74.761 | 71.508 | 74.761 | 252.0 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 23.098 | 23.570 | 22.061 | 23.570 | 152.2 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 67.064 | 68.999 | 65.689 | 68.999 | 252.0 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.223 | 0.234 | 0.217 | 0.234 | 152.2 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.263 | 5.346 | 5.240 | 5.346 | 252.0 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 189.802 | 264.742 | 185.821 | 264.742 | 227.1 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1699.010 | 1732.252 | 1676.953 | 1732.252 | 252.0 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 3.489 | 4.394 | 3.179 | 4.394 | 219.7 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.206 | 14.209 | 9.877 | 14.209 | 252.0 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.150 | 0.302 | 0.112 | 0.302 | 214.5 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.086 | 3.361 | 3.004 | 3.361 | 252.0 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 27.597 | 28.820 | 22.335 | 28.820 | 201.9 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 85.905 | 89.113 | 83.358 | 89.113 | 252.0 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 4.172 | 4.829 | 3.757 | 4.829 | 208.3 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.845 | 9.073 | 8.680 | 9.073 | 252.0 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 179.783 | 296.501 | 174.079 | 296.501 | 227.5 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1742.850 | 1825.287 | 1704.713 | 1825.287 | 252.0 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.838 | 3.755 | 1.737 | 3.755 | 219.2 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.354 | 6.291 | 5.027 | 6.291 | 252.0 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.160 | 0.178 | 0.146 | 0.178 | 180.6 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.261 | 1.644 | 1.251 | 1.644 | 252.0 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 7.468 | 9.020 | 7.210 | 9.020 | 154.1 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 27.213 | 29.012 | 25.221 | 29.012 | 252.0 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.569 | 5.322 | 2.348 | 5.322 | 172.6 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 6.997 | 10.060 | 6.974 | 10.060 | 252.0 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 133.5 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.471 | 0.483 | 0.428 | 0.483 | 252.0 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 166.716 | 172.478 | 162.838 | 172.478 | 151.5 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1580.960 | 1802.238 | 1571.028 | 1802.238 | 252.0 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 156.027 | 161.593 | 152.028 | 161.593 | 152.0 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1585.250 | 1674.718 | 1551.348 | 1674.718 | 252.0 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.213 | 0.254 | 0.168 | 0.254 | 151.7 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.130 | 2.592 | 2.024 | 2.592 | 252.0 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.034 | 0.070 | 0.028 | 0.070 | 151.7 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.436 | 0.621 | 0.420 | 0.621 | 252.0 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.475 | 1.585 | 1.452 | 1.585 | 151.4 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 13.330 | 13.595 | 13.148 | 13.595 | 252.0 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.679 | 2.314 | 1.647 | 2.314 | 151.2 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.556 | 13.082 | 12.299 | 13.082 | 252.0 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.882 | 3.620 | 2.284 | 3.620 | 143.5 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.406 | 9.639 | 9.166 | 9.639 | 252.0 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.189 | 0.384 | 0.158 | 0.384 | 145.4 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.093 | 3.153 | 3.064 | 3.153 | 252.0 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.056 | 0.082 | 0.044 | 0.082 | 145.3 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.591 | 0.630 | 0.581 | 0.630 | 252.0 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 197.982 | 212.003 | 193.007 | 212.003 | 179.7 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1687.996 | 2100.294 | 1654.755 | 2100.294 | 252.0 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 164.487 | 179.969 | 161.293 | 179.969 | 196.3 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1634.163 | 1723.191 | 1590.400 | 1723.191 | 252.0 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.110 | 2.183 | 1.062 | 2.183 | 196.0 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.268 | 3.436 | 3.122 | 3.436 | 252.0 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.100 | 0.238 | 0.086 | 0.238 | 183.2 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.518 | 0.568 | 0.499 | 0.568 | 252.0 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.652 | 22.370 | 19.476 | 22.370 | 177.2 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 70.975 | 73.038 | 69.873 | 73.038 | 252.0 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 19.937 | 20.624 | 19.735 | 20.624 | 162.6 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 70.299 | 89.910 | 68.498 | 89.910 | 252.0 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.402 | 20.190 | 18.942 | 20.190 | 152.3 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 63.824 | 64.706 | 62.384 | 64.706 | 252.0 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.650 | 2.496 | 1.430 | 2.496 | 159.4 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.353 | 6.229 | 5.228 | 6.229 | 252.0 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 197.064 | 215.613 | 188.340 | 215.613 | 239.6 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1493.461 | 1583.890 | 1478.801 | 1583.890 | 252.0 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.874 | 4.804 | 1.577 | 4.804 | 234.0 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.244 | 11.512 | 10.068 | 11.512 | 252.0 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.038 | 0.051 | 0.032 | 0.051 | 225.8 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.344 | 3.827 | 3.328 | 3.827 | 252.0 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 22.882 | 29.753 | 20.681 | 29.753 | 202.1 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 84.943 | 101.840 | 79.070 | 101.840 | 252.0 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 4.745 | 5.121 | 3.726 | 5.121 | 217.9 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.845 | 10.489 | 9.248 | 10.489 | 252.0 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 170.328 | 177.300 | 169.061 | 177.300 | 199.3 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1522.435 | 1919.414 | 1483.264 | 1919.414 | 252.0 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.281 | 1.522 | 0.844 | 1.522 | 197.8 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.978 | 6.738 | 5.882 | 6.738 | 252.0 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.024 | 0.092 | 0.023 | 0.092 | 178.5 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.492 | 1.645 | 1.455 | 1.645 | 252.0 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 5.939 | 6.813 | 5.514 | 6.813 | 152.3 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.645 | 21.051 | 20.592 | 21.051 | 252.0 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.610 | 2.853 | 2.339 | 2.853 | 160.3 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.838 | 21.171 | 6.482 | 21.171 | 252.0 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 133.3 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.474 | 0.503 | 0.457 | 0.503 | 252.0 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 182.700 | 205.533 | 169.045 | 205.533 | 156.8 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1447.991 | 1516.344 | 1421.200 | 1516.344 | 252.0 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 158.047 | 209.453 | 152.867 | 209.453 | 156.9 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1487.261 | 1533.498 | 1452.236 | 1533.498 | 252.0 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.131 | 0.203 | 0.098 | 0.203 | 156.9 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.076 | 3.996 | 2.009 | 3.996 | 252.0 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.020 | 0.027 | 0.014 | 0.027 | 156.8 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.462 | 0.486 | 0.420 | 0.486 | 252.0 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.466 | 2.643 | 1.160 | 2.643 | 156.7 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.558 | 13.479 | 11.375 | 13.479 | 252.0 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.428 | 1.572 | 1.397 | 1.572 | 148.3 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.868 | 11.075 | 10.763 | 11.075 | 252.0 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.772 | 3.353 | 1.295 | 3.353 | 144.3 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.369 | 9.539 | 8.082 | 9.539 | 252.0 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.118 | 0.230 | 0.108 | 0.230 | 145.1 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.604 | 2.789 | 2.554 | 2.789 | 252.0 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 178.122 | 204.194 | 171.456 | 204.194 | 195.0 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1455.049 | 1533.954 | 1428.551 | 1533.954 | 252.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.529 | 2.615 | 2.462 | 2.615 | 193.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.359 | 7.954 | 7.231 | 7.954 | 252.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.047 | 0.072 | 0.044 | 0.072 | 175.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.927 | 11.909 | 2.869 | 11.909 | 252.0 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 11.848 | 14.150 | 11.498 | 14.150 | 157.6 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 41.815 | 58.697 | 38.504 | 58.697 | 252.0 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.371 | 0.397 | 0.353 | 0.397 | 158.6 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.372 | 12.625 | 12.309 | 12.625 | 252.0 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 181.030 | 198.390 | 177.688 | 198.390 | 208.9 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1480.233 | 1529.437 | 1459.376 | 1529.437 | 252.0 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 2.833 | 3.544 | 2.723 | 3.544 | 207.0 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.239 | 7.442 | 7.233 | 7.442 | 252.0 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.048 | 0.054 | 0.045 | 0.054 | 204.5 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.914 | 2.997 | 2.882 | 2.997 | 252.0 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 13.107 | 14.397 | 12.159 | 14.397 | 175.7 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.603 | 54.217 | 39.959 | 54.217 | 252.0 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.058 | 2.525 | 1.967 | 2.525 | 201.4 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.493 | 13.990 | 13.298 | 13.990 | 252.0 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 185.768 | 192.834 | 183.470 | 192.834 | 197.6 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1491.020 | 1685.755 | 1461.056 | 1685.755 | 252.0 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 1.591 | 1.734 | 1.554 | 1.734 | 180.5 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.491 | 6.376 | 5.307 | 6.376 | 252.0 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.038 | 0.041 | 0.032 | 0.041 | 164.5 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.574 | 1.990 | 1.501 | 1.990 | 252.0 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 6.718 | 12.654 | 5.400 | 12.654 | 155.2 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 20.144 | 20.838 | 19.087 | 20.838 | 252.0 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.565 | 2.966 | 1.863 | 2.966 | 161.2 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 9.849 | 11.459 | 9.275 | 11.459 | 252.0 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.022 | 0.012 | 0.022 | 133.4 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.465 | 0.509 | 0.455 | 0.509 | 252.0 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 194.175 | 217.937 | 186.073 | 217.937 | 153.8 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1527.451 | 1690.964 | 1486.154 | 1690.964 | 252.0 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 157.900 | 170.807 | 153.553 | 170.807 | 154.0 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1457.950 | 1513.475 | 1411.919 | 1513.475 | 252.0 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.423 | 1.141 | 0.379 | 1.141 | 153.8 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 4.102 | 4.590 | 3.879 | 4.590 | 252.0 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.026 | 0.118 | 0.017 | 0.118 | 153.8 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.725 | 0.795 | 0.693 | 0.795 | 252.0 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.195 | 13.355 | 13.072 | 13.355 | 153.2 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 50.274 | 54.859 | 48.156 | 54.859 | 252.0 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.144 | 13.555 | 13.040 | 13.555 | 153.2 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 51.331 | 115.179 | 49.718 | 115.179 | 252.0 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.752 | 14.364 | 13.377 | 14.364 | 144.2 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 44.086 | 67.076 | 41.872 | 67.076 | 252.0 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.228 | 0.365 | 0.189 | 0.365 | 146.7 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 5.198 | 5.473 | 4.962 | 5.473 | 252.0 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.011 | 0.016 | 136.1 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.455 | 0.477 | 0.452 | 0.477 | 252.0 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 168.083 | 169.781 | 163.454 | 169.781 | 156.4 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1417.879 | 1438.928 | 1407.267 | 1438.928 | 252.0 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 153.690 | 163.458 | 152.108 | 163.458 | 156.4 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1403.479 | 1505.734 | 1399.123 | 1505.734 | 252.0 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.407 | 0.669 | 0.379 | 0.669 | 156.4 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.925 | 4.022 | 3.889 | 4.022 | 252.0 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.022 | 0.036 | 0.018 | 0.036 | 156.4 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.685 | 0.709 | 0.655 | 0.709 | 252.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.529 | 2.558 | 2.506 | 2.558 | 155.9 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.722 | 20.625 | 18.130 | 20.625 | 252.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.686 | 2.775 | 2.655 | 2.775 | 155.9 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.902 | 19.113 | 17.742 | 19.113 | 252.0 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.275 | 3.962 | 3.247 | 3.962 | 146.7 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.646 | 14.191 | 12.999 | 14.191 | 252.0 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.198 | 0.290 | 0.178 | 0.290 | 149.2 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.864 | 6.312 | 4.694 | 6.312 | 252.0 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.031 | 0.081 | 0.030 | 0.081 | 136.8 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.518 | 0.615 | 0.476 | 0.615 | 252.0 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 189.441 | 197.056 | 185.389 | 197.056 | 155.3 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1757.958 | 1842.093 | 1722.628 | 1842.093 | 252.0 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 169.498 | 175.623 | 166.314 | 175.623 | 156.8 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1819.932 | 2087.074 | 1728.269 | 2087.074 | 252.0 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.830 | 1.366 | 0.793 | 1.366 | 155.9 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.997 | 5.864 | 4.811 | 5.864 | 252.0 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.100 | 0.116 | 0.086 | 0.116 | 155.4 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.828 | 0.924 | 0.790 | 0.924 | 252.0 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 17.377 | 19.881 | 17.102 | 19.881 | 155.2 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 63.774 | 74.302 | 60.928 | 74.302 | 252.0 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.511 | 19.194 | 17.202 | 19.194 | 154.7 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 62.134 | 88.816 | 60.669 | 88.816 | 252.0 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.696 | 19.908 | 17.387 | 19.908 | 150.7 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 57.050 | 60.367 | 54.978 | 60.367 | 252.0 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.221 | 0.271 | 0.207 | 0.271 | 150.9 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.269 | 8.715 | 6.154 | 8.715 | 252.0 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 165.609 | 186.639 | 159.566 | 186.639 | 153.2 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1502.465 | 1639.152 | 1492.434 | 1639.152 | 252.0 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.099 | 0.194 | 0.083 | 0.194 | 152.5 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.019 | 5.381 | 4.662 | 5.381 | 252.0 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.015 | 0.025 | 0.013 | 0.025 | 151.8 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.415 | 2.809 | 2.347 | 2.809 | 252.0 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.718 | 9.187 | 6.263 | 9.187 | 150.9 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 18.405 | 32.191 | 17.388 | 32.191 | 252.0 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.200 | 0.224 | 0.186 | 0.224 | 151.0 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.805 | 3.929 | 2.551 | 3.929 | 252.0 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 168.207 | 171.701 | 165.509 | 171.701 | 171.4 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1510.784 | 1782.945 | 1458.052 | 1782.945 | 252.0 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.100 | 0.168 | 0.094 | 0.168 | 161.9 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.801 | 5.476 | 4.680 | 5.476 | 252.0 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.014 | 0.025 | 0.014 | 0.025 | 154.2 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.353 | 2.510 | 2.318 | 2.510 | 252.0 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 7.125 | 7.644 | 6.058 | 7.644 | 150.0 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 16.688 | 29.433 | 15.869 | 29.433 | 252.0 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.398 | 1.815 | 1.295 | 1.815 | 152.9 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.899 | 6.464 | 2.783 | 6.464 | 252.0 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 169.619 | 177.931 | 168.573 | 177.931 | 151.4 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1480.478 | 1560.008 | 1429.674 | 1560.008 | 252.0 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.076 | 0.151 | 0.068 | 0.151 | 150.9 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 3.075 | 3.720 | 2.922 | 3.720 | 252.0 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.022 | 0.014 | 0.022 | 150.4 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.032 | 1.186 | 1.016 | 1.186 | 252.0 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.273 | 3.657 | 2.761 | 3.657 | 149.2 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 9.054 | 9.966 | 8.428 | 9.966 | 252.0 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.357 | 1.485 | 1.343 | 1.485 | 149.9 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.871 | 3.165 | 2.831 | 3.165 | 252.0 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.033 | 0.012 | 0.033 | 135.8 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.510 | 0.456 | 0.510 | 252.0 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 184.616 | 539.578 | 174.070 | 539.578 | 152.3 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1607.890 | 1712.546 | 1601.905 | 1712.546 | 252.0 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 173.420 | 179.023 | 164.545 | 179.023 | 154.0 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1624.872 | 1658.023 | 1575.148 | 1658.023 | 252.0 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.395 | 4.262 | 0.674 | 4.262 | 154.0 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.239 | 3.622 | 3.055 | 3.622 | 252.0 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.106 | 0.203 | 0.098 | 0.203 | 152.3 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.520 | 0.776 | 0.494 | 0.776 | 252.0 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.736 | 4.343 | 3.323 | 4.343 | 152.3 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 20.645 | 20.989 | 20.510 | 20.989 | 252.0 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 4.032 | 4.447 | 3.594 | 4.447 | 151.2 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.542 | 21.388 | 20.036 | 21.388 | 252.0 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 5.863 | 21.156 | 4.208 | 21.156 | 150.7 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.609 | 16.073 | 15.352 | 16.073 | 252.0 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.198 | 0.352 | 0.185 | 0.352 | 150.8 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.843 | 4.890 | 4.781 | 4.890 | 252.0 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 177.043 | 184.192 | 175.650 | 184.192 | 197.4 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1649.645 | 1743.036 | 1607.315 | 1743.036 | 252.0 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.485 | 6.198 | 4.257 | 6.198 | 195.8 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.923 | 6.447 | 5.858 | 6.447 | 252.0 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.386 | 0.514 | 0.326 | 0.514 | 193.1 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.576 | 2.763 | 2.483 | 2.763 | 252.0 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 16.572 | 34.169 | 16.206 | 34.169 | 178.1 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 44.772 | 48.563 | 42.738 | 48.563 | 252.0 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.519 | 0.823 | 0.493 | 0.823 | 191.2 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.973 | 8.678 | 7.296 | 8.678 | 252.0 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 186.095 | 189.421 | 182.759 | 189.421 | 202.6 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1714.369 | 1857.957 | 1622.006 | 1857.957 | 252.0 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.285 | 5.176 | 4.102 | 5.176 | 201.9 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 6.814 | 8.006 | 6.588 | 8.006 | 252.0 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.315 | 0.336 | 0.267 | 0.336 | 201.9 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.726 | 3.165 | 2.594 | 3.165 | 252.0 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.347 | 18.000 | 16.009 | 18.000 | 193.4 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 44.941 | 47.939 | 43.747 | 47.939 | 252.0 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.134 | 3.547 | 2.046 | 3.547 | 201.5 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 9.372 | 11.940 | 8.709 | 11.940 | 252.0 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 194.804 | 210.740 | 184.715 | 210.740 | 199.5 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1590.254 | 1640.422 | 1586.787 | 1640.422 | 252.0 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.775 | 3.239 | 2.671 | 3.239 | 197.2 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.230 | 5.712 | 4.119 | 5.712 | 252.0 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.267 | 0.302 | 0.251 | 0.302 | 193.8 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.144 | 1.514 | 1.113 | 1.514 | 252.0 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 7.688 | 9.785 | 7.352 | 9.785 | 154.5 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 23.178 | 24.276 | 21.276 | 24.276 | 252.0 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 3.348 | 5.239 | 2.341 | 5.239 | 181.8 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 9.646 | 11.218 | 8.925 | 11.218 | 252.0 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 196.692 | 228.179 | 185.573 | 228.179 | 145.7 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1659.372 | 1767.118 | 1636.051 | 1767.118 | 252.0 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.558 | 162.096 | 158.223 | 162.096 | 153.7 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1620.047 | 1666.178 | 1589.507 | 1666.178 | 252.0 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.242 | 1.380 | 1.195 | 1.380 | 153.7 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.961 | 4.230 | 3.935 | 4.230 | 252.0 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.115 | 0.151 | 0.105 | 0.151 | 149.2 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.687 | 0.717 | 0.661 | 0.717 | 252.0 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 136.5 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.444 | 0.485 | 0.410 | 0.485 | 252.0 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.318 | 0.377 | 0.254 | 0.377 | 140.1 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.770 | 16.235 | 14.726 | 16.235 | 252.0 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.028 | 0.015 | 0.028 | 138.3 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.493 | 0.466 | 0.493 | 252.0 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 185.928 | 200.755 | 182.617 | 200.755 | 155.1 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1674.728 | 1760.065 | 1663.040 | 1760.065 | 252.0 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 161.003 | 178.850 | 154.265 | 178.850 | 155.5 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1658.047 | 1802.539 | 1592.145 | 1802.539 | 252.0 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.978 | 1.199 | 0.939 | 1.199 | 155.5 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.060 | 4.369 | 3.988 | 4.369 | 252.0 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.093 | 0.102 | 0.082 | 0.102 | 155.1 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.707 | 0.768 | 0.690 | 0.768 | 252.0 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.695 | 14.767 | 13.610 | 14.767 | 155.0 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 53.312 | 55.050 | 52.322 | 55.050 | 252.0 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.185 | 14.649 | 14.013 | 14.649 | 153.1 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 53.432 | 54.512 | 52.597 | 54.512 | 252.0 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 15.778 | 32.739 | 14.252 | 32.739 | 152.5 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 49.637 | 53.415 | 46.907 | 53.415 | 252.0 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.247 | 0.300 | 0.215 | 0.300 | 152.5 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 6.358 | 9.452 | 5.748 | 9.452 | 252.0 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.024 | 0.013 | 0.024 | 138.3 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.504 | 0.473 | 0.504 | 252.0 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 169.129 | 185.946 | 168.386 | 185.946 | 157.9 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1606.805 | 1698.027 | 1596.434 | 1698.027 | 252.0 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 159.244 | 707.339 | 154.591 | 707.339 | 158.5 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1587.121 | 1648.867 | 1568.635 | 1648.867 | 252.0 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.906 | 1.585 | 0.756 | 1.585 | 158.5 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.966 | 4.063 | 3.929 | 4.063 | 252.0 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.095 | 0.153 | 0.077 | 0.153 | 157.9 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.697 | 0.731 | 0.681 | 0.731 | 252.0 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.289 | 3.973 | 3.204 | 3.973 | 157.8 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.668 | 30.110 | 22.400 | 30.110 | 252.0 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.499 | 4.431 | 3.440 | 4.431 | 156.0 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 22.246 | 25.450 | 21.859 | 25.450 | 252.0 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 4.851 | 5.922 | 3.731 | 5.922 | 155.4 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 17.835 | 18.362 | 16.823 | 18.362 | 252.0 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.218 | 0.234 | 0.208 | 0.234 | 155.4 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.506 | 5.777 | 5.415 | 5.777 | 252.0 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 8.015 | 10.522 | 7.249 | 10.522 | 154.3 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 46.543 | 46.965 | 46.510 | 46.965 | 252.0 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 180.066 | 200.923 | 178.022 | 200.923 | 158.6 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1512.385 | 1544.133 | 1482.703 | 1544.133 | 252.0 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.762 | 3.166 | 2.705 | 3.166 | 156.0 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.376 | 1.411 | 1.310 | 1.411 | 252.0 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.145 | 0.220 | 0.133 | 0.220 | 126.9 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.500 | 0.550 | 0.486 | 0.550 | 252.0 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.248 | 0.263 | 0.214 | 0.263 | 155.4 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.270 | 5.437 | 5.174 | 5.437 | 252.0 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 2.023 | 3.888 | 1.436 | 3.888 | 135.0 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.748 | 0.787 | 0.714 | 0.787 | 252.0 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.388 | 6.736 | 5.927 | 6.736 | 154.9 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 39.840 | 41.128 | 39.653 | 41.128 | 252.0 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 7.097 | 8.575 | 6.812 | 8.575 | 151.4 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 60.129 | 68.445 | 58.700 | 68.445 | 252.0 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 184.783 | 188.790 | 182.583 | 188.790 | 155.7 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1465.256 | 1648.438 | 1453.547 | 1648.438 | 252.0 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.284 | 1.837 | 1.248 | 1.837 | 155.7 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.455 | 1.477 | 1.421 | 1.477 | 252.0 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.068 | 0.075 | 0.052 | 0.075 | 127.2 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.386 | 0.464 | 0.375 | 0.464 | 252.0 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.218 | 0.419 | 0.210 | 0.419 | 155.2 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.342 | 5.425 | 5.302 | 5.425 | 252.0 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.495 | 1.737 | 1.432 | 1.737 | 132.9 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.741 | 0.780 | 0.734 | 0.780 | 252.0 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 6.505 | 7.200 | 6.181 | 7.200 | 154.7 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.112 | 47.613 | 45.762 | 47.613 | 252.0 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.324 | 2.656 | 1.905 | 2.656 | 155.8 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 12.976 | 13.246 | 12.968 | 13.246 | 252.0 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.296 | 0.335 | 0.283 | 0.335 | 161.2 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 252.0 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.226 | 0.230 | 0.216 | 0.230 | 156.9 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 252.0 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 13.091 | 14.548 | 13.002 | 14.548 | 154.4 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 149.987 | 159.763 | 147.561 | 159.763 | 252.0 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.075 | 0.089 | 0.075 | 0.089 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.643 | 0.667 | 0.611 | 0.667 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 170.178 | 186.098 | 168.220 | 186.098 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1449.413 | 1471.063 | 1435.162 | 1471.063 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 159.284 | 169.437 | 156.790 | 169.437 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1408.813 | 1463.658 | 1395.897 | 1463.658 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.121 | 0.129 | 0.119 | 0.129 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.908 | 4.292 | 3.791 | 4.292 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.034 | 0.026 | 0.034 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.842 | 0.869 | 0.830 | 0.869 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.155 | 2.434 | 1.916 | 2.434 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.092 | 14.272 | 13.983 | 14.272 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.121 | 2.557 | 2.109 | 2.557 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.302 | 13.649 | 13.250 | 13.649 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.157 | 3.638 | 2.070 | 3.638 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 8.987 | 9.091 | 8.903 | 9.091 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.529 | 0.982 | 0.461 | 0.982 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.672 | 5.263 | 4.653 | 5.263 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.061 | 0.070 | 0.044 | 0.070 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.507 | 0.523 | 0.486 | 0.523 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 169.859 | 174.500 | 169.580 | 174.500 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1424.842 | 1514.714 | 1416.444 | 1514.714 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 154.759 | 182.480 | 153.773 | 182.480 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1409.326 | 1470.798 | 1405.502 | 1470.798 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.126 | 0.150 | 0.124 | 0.150 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.598 | 3.735 | 3.572 | 3.735 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.033 | 0.056 | 0.027 | 0.056 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.648 | 1.273 | 0.629 | 1.273 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.588 | 4.780 | 4.473 | 4.780 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.402 | 28.340 | 27.181 | 28.340 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.666 | 4.951 | 4.616 | 4.951 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 26.938 | 28.021 | 26.032 | 28.021 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.050 | 5.177 | 4.791 | 5.177 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 21.950 | 22.418 | 21.901 | 22.418 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.378 | 0.494 | 0.353 | 0.494 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.530 | 4.575 | 4.517 | 4.575 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.264 | 158.457 | 151.337 | 158.457 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1452.989 | 1481.885 | 1445.183 | 1481.885 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.103 | 0.135 | 0.101 | 0.135 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.038 | 2.115 | 2.004 | 2.115 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.027 | 0.016 | 0.027 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.400 | 0.405 | 0.394 | 0.405 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.159 | 1.876 | 1.127 | 1.876 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.096 | 4.068 | 2.938 | 4.068 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.217 | 0.229 | 0.195 | 0.229 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.641 | 2.668 | 2.551 | 2.668 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.478 | 161.451 | 150.041 | 161.451 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1449.272 | 1496.707 | 1434.992 | 1496.707 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.134 | 0.104 | 0.134 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.056 | 2.099 | 2.054 | 2.099 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.027 | 0.017 | 0.027 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.397 | 0.416 | 0.389 | 0.416 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.160 | 1.462 | 1.143 | 1.462 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.032 | 3.144 | 2.990 | 3.144 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.212 | 0.232 | 0.210 | 0.232 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.595 | 2.662 | 2.582 | 2.662 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.101 | 0.588 | 0.099 | 0.588 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.932 | 0.948 | 0.928 | 0.948 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 183.393 | 355.359 | 182.628 | 355.359 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1446.367 | 1498.754 | 1416.951 | 1498.754 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 196.249 | 284.088 | 183.818 | 284.088 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1397.136 | 1507.597 | 1397.078 | 1507.597 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.202 | 0.252 | 0.148 | 0.252 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.538 | 3.697 | 3.525 | 3.697 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.026 | 0.041 | 0.025 | 0.041 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.153 | 1.265 | 1.143 | 1.265 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.989 | 8.171 | 6.596 | 8.171 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 30.432 | 31.154 | 30.237 | 31.154 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.419 | 8.181 | 4.988 | 8.181 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 29.617 | 30.945 | 29.339 | 30.945 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.102 | 5.602 | 4.873 | 5.602 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 25.362 | 28.896 | 25.273 | 28.896 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.924 | 1.039 | 0.881 | 1.039 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.547 | 6.841 | 4.520 | 6.841 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.028 | 0.015 | 0.028 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.490 | 0.866 | 0.432 | 0.866 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 168.613 | 170.314 | 165.018 | 170.314 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1419.101 | 1463.009 | 1412.594 | 1463.009 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 152.217 | 164.568 | 151.617 | 164.568 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1400.787 | 1455.818 | 1394.602 | 1455.818 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.115 | 0.165 | 0.072 | 0.165 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.190 | 2.407 | 2.093 | 2.407 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.024 | 0.031 | 0.020 | 0.031 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.467 | 0.593 | 0.450 | 0.593 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.412 | 1.453 | 1.372 | 1.453 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.142 | 12.274 | 12.062 | 12.274 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.862 | 2.167 | 1.792 | 2.167 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 11.392 | 11.788 | 11.373 | 11.788 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 2.931 | 5.673 | 1.646 | 5.673 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 9.111 | 9.772 | 8.888 | 9.772 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.231 | 0.297 | 0.191 | 0.297 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.020 | 3.077 | 2.980 | 3.077 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.033 | 0.015 | 0.033 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.455 | 0.498 | 0.438 | 0.498 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 163.598 | 167.944 | 160.341 | 167.944 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1423.388 | 1479.611 | 1407.045 | 1479.611 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 152.727 | 155.760 | 150.195 | 155.760 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1424.059 | 1464.540 | 1406.855 | 1464.540 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.093 | 0.156 | 0.074 | 0.156 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.253 | 3.288 | 2.078 | 3.288 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.026 | 0.042 | 0.019 | 0.042 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.446 | 0.481 | 0.422 | 0.481 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.445 | 1.494 | 1.376 | 1.494 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.357 | 13.153 | 12.171 | 13.153 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.817 | 2.212 | 1.741 | 2.212 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 12.067 | 14.131 | 11.657 | 14.131 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 2.219 | 5.869 | 1.464 | 5.869 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.962 | 9.703 | 8.471 | 9.703 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.213 | 0.773 | 0.179 | 0.773 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.083 | 3.279 | 3.047 | 3.279 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.034 | 0.016 | 0.034 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.527 | 0.434 | 0.527 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 291.682 | 321.435 | 282.524 | 321.435 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1822.764 | 1897.040 | 1800.926 | 1897.040 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 152.365 | 158.568 | 150.640 | 158.568 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1427.948 | 1682.917 | 1398.290 | 1682.917 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.104 | 0.187 | 0.083 | 0.187 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.152 | 2.365 | 2.108 | 2.365 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.029 | 0.045 | 0.019 | 0.045 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.429 | 0.452 | 0.416 | 0.452 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 105.804 | 107.478 | 103.755 | 107.478 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 389.374 | 400.722 | 386.382 | 400.722 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 104.222 | 108.013 | 104.019 | 108.013 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 394.914 | 398.057 | 387.289 | 398.057 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 105.952 | 109.152 | 104.012 | 109.152 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 385.784 | 393.675 | 384.444 | 393.675 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.231 | 0.540 | 0.220 | 0.540 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.041 | 3.413 | 3.000 | 3.413 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.803 | 153.019 | 150.505 | 153.019 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1415.673 | 1448.867 | 1409.581 | 1448.867 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.146 | 0.162 | 0.110 | 0.162 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.052 | 2.126 | 2.034 | 2.126 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.039 | 0.018 | 0.039 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.420 | 0.439 | 0.393 | 0.439 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.779 | 1.994 | 1.723 | 1.994 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.401 | 7.726 | 7.091 | 7.726 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.222 | 0.290 | 0.201 | 0.290 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.657 | 2.691 | 2.641 | 2.691 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.370 | 154.395 | 150.978 | 154.395 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1396.831 | 1407.431 | 1393.185 | 1407.431 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.162 | 0.100 | 0.162 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.062 | 2.090 | 2.054 | 2.090 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.067 | 0.017 | 0.067 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.408 | 0.428 | 0.398 | 0.428 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.889 | 4.139 | 3.840 | 4.139 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 20.049 | 20.852 | 19.040 | 20.852 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.199 | 0.215 | 0.198 | 0.215 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.660 | 2.696 | 2.624 | 2.696 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.059 | 0.074 | 0.050 | 0.074 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.504 | 0.516 | 0.474 | 0.516 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 169.241 | 240.176 | 168.097 | 240.176 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1448.238 | 1485.314 | 1447.593 | 1485.314 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 167.403 | 188.357 | 162.046 | 188.357 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1411.012 | 1434.454 | 1402.974 | 1434.454 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.129 | 0.217 | 0.123 | 0.217 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.616 | 3.960 | 3.601 | 3.960 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.034 | 0.060 | 0.029 | 0.060 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.625 | 0.733 | 0.623 | 0.733 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.980 | 3.339 | 2.866 | 3.339 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 48.740 | 52.067 | 48.288 | 52.067 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.168 | 3.415 | 3.038 | 3.415 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 48.449 | 49.397 | 47.500 | 49.397 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.846 | 4.094 | 3.572 | 4.094 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 43.214 | 44.619 | 42.977 | 44.619 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.374 | 0.790 | 0.369 | 0.790 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.547 | 4.668 | 4.547 | 4.668 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.632 | 165.623 | 154.333 | 165.623 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1414.197 | 1557.990 | 1405.011 | 1557.990 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.226 | 0.245 | 0.210 | 0.245 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.565 | 3.732 | 3.542 | 3.732 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.021 | 0.028 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.650 | 0.676 | 0.648 | 0.676 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.579 | 3.642 | 1.533 | 3.642 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 7.921 | 8.406 | 7.614 | 8.406 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.469 | 0.576 | 0.401 | 0.576 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.670 | 4.752 | 4.664 | 4.752 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.240 | 159.488 | 157.349 | 159.488 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1396.144 | 1477.213 | 1391.918 | 1477.213 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.176 | 0.203 | 0.147 | 0.203 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.843 | 3.913 | 3.812 | 3.913 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.025 | 0.018 | 0.025 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.822 | 0.837 | 0.814 | 0.837 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.824 | 4.012 | 3.531 | 4.012 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 8.989 | 9.019 | 8.874 | 9.019 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.476 | 0.496 | 0.454 | 0.496 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.714 | 4.825 | 4.707 | 4.825 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.067 | 0.086 | 0.063 | 0.086 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.638 | 0.667 | 0.612 | 0.667 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 174.393 | 181.856 | 173.745 | 181.856 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1438.341 | 1475.184 | 1428.653 | 1475.184 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 164.159 | 188.237 | 161.125 | 188.237 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1436.882 | 1456.168 | 1426.889 | 1456.168 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.194 | 0.226 | 0.163 | 0.226 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.867 | 3.932 | 3.832 | 3.932 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.035 | 0.067 | 0.030 | 0.067 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.819 | 0.850 | 0.810 | 0.850 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.152 | 2.601 | 2.043 | 2.601 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.469 | 15.196 | 14.421 | 15.196 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.228 | 2.625 | 2.213 | 2.625 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.727 | 14.042 | 13.681 | 14.042 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.259 | 3.503 | 2.245 | 3.503 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.132 | 10.158 | 8.986 | 10.158 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.515 | 1.618 | 0.472 | 1.618 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.714 | 4.844 | 4.662 | 4.844 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.061 | 0.049 | 0.061 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.549 | 0.697 | 0.529 | 0.697 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 163.252 | 167.776 | 162.899 | 167.776 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1458.571 | 1503.833 | 1438.768 | 1503.833 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 154.870 | 176.375 | 154.740 | 176.375 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1462.924 | 1510.563 | 1419.319 | 1510.563 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.133 | 0.154 | 0.116 | 0.154 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.673 | 3.775 | 3.549 | 3.775 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.023 | 0.026 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.669 | 0.679 | 0.668 | 0.679 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.203 | 1.344 | 1.192 | 1.344 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 12.910 | 13.038 | 12.899 | 13.038 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.406 | 1.550 | 1.309 | 1.550 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.419 | 13.287 | 12.378 | 13.287 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.372 | 1.703 | 1.267 | 1.703 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.647 | 8.137 | 7.510 | 8.137 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.543 | 1.232 | 0.401 | 1.232 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.688 | 5.010 | 4.656 | 5.010 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.340 | 154.355 | 150.845 | 154.355 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1406.752 | 1496.920 | 1404.736 | 1496.920 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.134 | 0.101 | 0.134 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.082 | 2.139 | 2.027 | 2.139 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.029 | 0.018 | 0.029 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.442 | 0.395 | 0.442 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.913 | 1.963 | 1.909 | 1.963 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.627 | 10.355 | 6.959 | 10.355 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.228 | 0.231 | 0.204 | 0.231 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.689 | 2.740 | 2.628 | 2.740 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.829 | 182.839 | 152.358 | 182.839 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1422.907 | 1459.265 | 1408.091 | 1459.265 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.142 | 0.101 | 0.142 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.072 | 2.404 | 2.038 | 2.404 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.034 | 0.017 | 0.034 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.409 | 0.421 | 0.397 | 0.421 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.880 | 4.010 | 3.848 | 4.010 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 19.817 | 25.144 | 19.737 | 25.144 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.205 | 0.234 | 0.198 | 0.234 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.660 | 2.819 | 2.580 | 2.819 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.442 | 160.908 | 159.853 | 160.908 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1446.733 | 1530.631 | 1433.833 | 1530.631 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.192 | 0.205 | 0.190 | 0.205 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.773 | 3.856 | 3.747 | 3.856 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.016 | 0.030 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.775 | 0.785 | 0.763 | 0.785 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.482 | 4.588 | 2.976 | 4.588 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.666 | 8.920 | 8.600 | 8.920 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.147 | 0.155 | 0.136 | 0.155 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.643 | 4.713 | 4.636 | 4.713 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.493 | 163.272 | 155.520 | 163.272 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1415.579 | 1487.042 | 1390.124 | 1487.042 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.178 | 0.205 | 0.177 | 0.205 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.778 | 3.852 | 3.772 | 3.852 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.031 | 0.017 | 0.031 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.780 | 0.799 | 0.774 | 0.799 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.169 | 3.528 | 3.002 | 3.528 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.788 | 8.979 | 8.644 | 8.979 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.136 | 0.141 | 0.129 | 0.141 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.610 | 4.753 | 4.566 | 4.753 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.928 | 167.404 | 155.105 | 167.404 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1411.482 | 1414.105 | 1404.872 | 1414.105 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.193 | 0.199 | 0.178 | 0.199 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.779 | 3.827 | 3.767 | 3.827 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.018 | 0.020 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.752 | 0.824 | 0.720 | 0.824 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.984 | 3.728 | 2.936 | 3.728 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.858 | 9.069 | 8.790 | 9.069 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.136 | 0.145 | 0.130 | 0.145 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.710 | 4.841 | 4.708 | 4.841 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.638 | 172.183 | 156.155 | 172.183 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1398.333 | 1524.864 | 1394.510 | 1524.864 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.206 | 0.259 | 0.193 | 0.259 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.829 | 3.913 | 3.764 | 3.913 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.018 | 0.024 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.793 | 0.814 | 0.788 | 0.814 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.197 | 3.767 | 2.991 | 3.767 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.890 | 10.128 | 8.878 | 10.128 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.138 | 0.146 | 0.135 | 0.146 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.621 | 5.111 | 4.613 | 5.111 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.710 | 154.356 | 151.494 | 154.356 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1451.819 | 1495.421 | 1421.557 | 1495.421 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.214 | 0.405 | 0.212 | 0.405 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.642 | 4.801 | 3.527 | 4.801 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.032 | 0.019 | 0.032 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.625 | 0.658 | 0.623 | 0.658 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 2.245 | 3.298 | 2.029 | 3.298 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.624 | 8.287 | 7.479 | 8.287 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.163 | 0.178 | 0.163 | 0.178 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.678 | 4.782 | 4.622 | 4.782 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.496 | 205.935 | 157.545 | 205.935 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1464.273 | 1487.597 | 1448.209 | 1487.597 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.226 | 0.238 | 0.220 | 0.238 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.591 | 4.106 | 3.559 | 4.106 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.018 | 0.021 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.606 | 0.613 | 0.605 | 0.613 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 2.210 | 3.066 | 2.097 | 3.066 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.608 | 8.380 | 7.285 | 8.380 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.178 | 0.188 | 0.160 | 0.188 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.887 | 12.973 | 4.775 | 12.973 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.715 | 176.082 | 151.761 | 176.082 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1444.896 | 1468.441 | 1411.954 | 1468.441 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.231 | 0.248 | 0.217 | 0.248 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.526 | 3.642 | 3.490 | 3.642 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.032 | 0.021 | 0.032 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.622 | 0.649 | 0.574 | 0.649 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.104 | 3.591 | 2.015 | 3.591 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.440 | 8.204 | 7.388 | 8.204 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.169 | 0.184 | 0.167 | 0.184 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.720 | 4.775 | 4.589 | 4.775 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.383 | 161.893 | 155.523 | 161.893 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1427.511 | 1459.845 | 1414.639 | 1459.845 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.208 | 0.227 | 0.208 | 0.227 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.591 | 4.313 | 3.500 | 4.313 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.019 | 0.028 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.618 | 0.641 | 0.610 | 0.641 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 2.037 | 4.003 | 1.895 | 4.003 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.847 | 8.497 | 7.323 | 8.497 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.166 | 0.184 | 0.151 | 0.184 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.692 | 5.173 | 4.664 | 5.173 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.763 | 157.787 | 153.756 | 157.787 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1434.220 | 1481.460 | 1429.332 | 1481.460 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.209 | 0.220 | 0.208 | 0.220 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.524 | 3.720 | 3.513 | 3.720 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.021 | 0.023 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.630 | 0.656 | 0.627 | 0.656 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.523 | 3.453 | 2.186 | 3.453 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.506 | 8.187 | 7.409 | 8.187 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.185 | 0.220 | 0.152 | 0.220 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.649 | 4.683 | 4.616 | 4.683 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.464 | 166.518 | 154.339 | 166.518 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1503.692 | 1919.655 | 1484.698 | 1919.655 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.225 | 0.232 | 0.221 | 0.232 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.610 | 3.944 | 3.557 | 3.944 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.024 | 0.028 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.615 | 0.676 | 0.593 | 0.676 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.155 | 4.123 | 1.690 | 4.123 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 8.160 | 9.850 | 7.482 | 9.850 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.164 | 0.213 | 0.155 | 0.213 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.730 | 4.897 | 4.727 | 4.897 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.980 | 177.927 | 155.893 | 177.927 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1432.300 | 1437.432 | 1432.256 | 1437.432 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.245 | 0.308 | 0.230 | 0.308 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.098 | 2.117 | 2.066 | 2.117 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.039 | 0.019 | 0.039 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.436 | 0.466 | 0.425 | 0.466 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 155.006 | 157.001 | 154.772 | 157.001 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 603.408 | 617.859 | 602.252 | 617.859 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.222 | 0.284 | 0.221 | 0.284 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.059 | 4.019 | 3.007 | 4.019 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.901 | 161.886 | 153.120 | 161.886 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1508.827 | 1517.849 | 1479.012 | 1517.849 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.162 | 0.225 | 0.155 | 0.225 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.128 | 2.234 | 2.105 | 2.234 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.032 | 0.019 | 0.032 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.447 | 0.605 | 0.442 | 0.605 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.231 | 5.780 | 4.180 | 5.780 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 20.373 | 22.401 | 20.158 | 22.401 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.217 | 0.235 | 0.192 | 0.235 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.145 | 3.486 | 3.117 | 3.486 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 153.201 | 160.791 | 152.108 | 160.791 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1469.768 | 1615.225 | 1431.539 | 1615.225 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.147 | 0.180 | 0.135 | 0.180 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.891 | 2.335 | 1.835 | 2.335 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.024 | 0.031 | 0.021 | 0.031 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.328 | 0.343 | 0.319 | 0.343 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.530 | 0.634 | 0.520 | 0.634 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.863 | 2.968 | 2.855 | 2.968 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.183 | 0.361 | 0.174 | 0.361 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.612 | 2.686 | 2.602 | 2.686 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 155.990 | 190.778 | 152.817 | 190.778 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1404.532 | 1432.463 | 1391.388 | 1432.463 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.160 | 0.241 | 0.145 | 0.241 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.889 | 1.974 | 1.829 | 1.974 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.022 | 0.029 | 0.021 | 0.029 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.323 | 0.335 | 0.317 | 0.335 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.888 | 0.955 | 0.856 | 0.955 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.740 | 5.878 | 5.458 | 5.878 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.167 | 0.192 | 0.158 | 0.192 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.683 | 2.812 | 2.620 | 2.812 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 297.018 | 324.250 | 294.950 | 324.250 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1949.023 | 2046.465 | 1923.076 | 2046.465 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 165.023 | 193.287 | 161.002 | 193.287 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1574.744 | 1645.374 | 1536.184 | 1645.374 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.171 | 0.182 | 0.138 | 0.182 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.126 | 2.471 | 2.089 | 2.471 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.022 | 0.035 | 0.019 | 0.035 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.455 | 0.517 | 0.435 | 0.517 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.028 | 0.050 | 0.026 | 0.050 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.513 | 0.552 | 0.501 | 0.552 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.482 | 4.673 | 4.339 | 4.673 | 138.0 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 125.298 | 139.084 | 122.142 | 139.084 | 252.0 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 177.843 | 215.264 | 169.751 | 215.264 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1510.954 | 1568.214 | 1487.005 | 1568.214 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.737 | 189.248 | 158.910 | 189.248 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1513.323 | 1558.329 | 1485.038 | 1558.329 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.218 | 0.235 | 0.184 | 0.235 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.561 | 3.814 | 3.512 | 3.814 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.030 | 0.019 | 0.030 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.660 | 0.743 | 0.646 | 0.743 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.044 | 0.067 | 0.041 | 0.067 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.498 | 0.553 | 0.485 | 0.553 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.098 | 1.691 | 0.792 | 1.691 | 132.0 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 73.597 | 82.519 | 72.153 | 82.519 | 252.0 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 173.444 | 177.319 | 169.897 | 177.319 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1438.964 | 1487.058 | 1432.401 | 1487.058 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.285 | 171.904 | 158.160 | 171.904 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1429.251 | 1502.097 | 1414.161 | 1502.097 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.200 | 0.224 | 0.170 | 0.224 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.799 | 4.403 | 3.795 | 4.403 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.025 | 0.017 | 0.025 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.822 | 0.874 | 0.797 | 0.874 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.077 | 0.119 | 0.043 | 0.119 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.632 | 0.652 | 0.623 | 0.652 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.206 | 2.600 | 0.908 | 2.600 | 151.5 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 22.280 | 34.305 | 19.867 | 34.305 | 252.0 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `27b7ec98aff8098fc16dd0abc828045b94569e9a`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-flat-additive`, `country-explicit-us-flat-additive`, `country-us-flat-multiplicative`, `country-explicit-us-flat-multiplicative`, `country-boundary-flat`, `country-empty-bv-flat`, `country-explicit-empty-flat`, `country-estimated-sg-flat`, `country-partial-in-flat`, `country-mixed-us-flat`, `country-none-flat-730`, `country-se-flat-730`, `country-explicit-se-flat-730`, `country-cn-flat-730`, `country-explicit-cn-flat-730`, `country-none-flat-2190`, `country-se-flat-2190`, `country-explicit-se-flat-2190`, `country-cn-flat-2190`, `country-explicit-cn-flat-2190`, `country-none-flat-2190-batch-32`, `country-se-flat-2190-batch-32`, `country-explicit-se-flat-2190-batch-32`, `country-uncertainty-us-flat`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:2061871ed43219e5d693e330002a01b52a6f651da9905f06adbc8776c3534dd4`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:6184e1c348bfdcb4cf50766f9b542337ea93ca6d7afd631db59651cf65ec0ee2`

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

