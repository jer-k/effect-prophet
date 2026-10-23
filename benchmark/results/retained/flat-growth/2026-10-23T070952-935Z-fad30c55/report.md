# Effect Prophet benchmark — 2026-10-23T070952-935Z-fad30c55

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
| flat-correlated-regressors | equivalent-objective | passed | 2.250e-11 | 3.414e-12 | 6.346e-12 | 2.885e-11 | 5.001e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12254 | 25351 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12254 | 25351 |

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
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.012 | 0.020 | 140.7 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.449 | 0.470 | 0.424 | 0.470 | 252.6 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 189.816 | 228.110 | 186.372 | 228.110 | 158.6 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1518.875 | 1550.987 | 1503.971 | 1550.987 | 252.6 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 161.299 | 210.542 | 151.772 | 210.542 | 159.6 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1477.094 | 2012.928 | 1453.641 | 2012.928 | 252.6 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.879 | 1.580 | 0.709 | 1.580 | 159.6 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.011 | 3.211 | 2.929 | 3.211 | 252.6 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.084 | 0.110 | 0.067 | 0.110 | 158.6 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.514 | 0.582 | 0.501 | 0.582 | 252.6 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 22.852 | 26.292 | 21.724 | 26.292 | 158.5 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 66.329 | 67.255 | 65.824 | 67.255 | 252.6 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 20.997 | 27.098 | 20.612 | 27.098 | 155.7 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 66.228 | 70.809 | 66.105 | 70.809 | 252.6 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 22.679 | 24.411 | 20.942 | 24.411 | 155.2 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 61.810 | 66.630 | 61.477 | 66.630 | 252.6 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.228 | 0.261 | 0.200 | 0.261 | 155.2 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 4.914 | 5.137 | 4.819 | 5.137 | 252.6 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 179.087 | 193.297 | 172.337 | 193.297 | 234.3 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1523.677 | 2495.140 | 1506.254 | 2495.140 | 252.6 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.694 | 3.309 | 2.563 | 3.309 | 227.2 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 8.485 | 8.772 | 8.121 | 8.772 | 252.6 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.124 | 0.283 | 0.107 | 0.283 | 221.0 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 2.790 | 3.031 | 2.731 | 3.031 | 252.6 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 25.662 | 26.713 | 20.372 | 26.713 | 208.5 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 77.856 | 79.527 | 76.859 | 79.527 | 252.6 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.842 | 4.588 | 3.095 | 4.588 | 214.9 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.108 | 9.161 | 7.949 | 9.161 | 252.6 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 169.038 | 172.337 | 163.767 | 172.337 | 208.4 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1486.800 | 2269.457 | 1443.689 | 2269.457 | 252.6 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.619 | 2.355 | 1.589 | 2.355 | 202.6 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.858 | 6.067 | 4.561 | 6.067 | 252.6 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.119 | 0.172 | 0.102 | 0.172 | 200.2 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.145 | 1.150 | 1.113 | 1.150 | 252.6 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 7.348 | 9.416 | 6.548 | 9.416 | 158.8 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 22.813 | 23.159 | 22.314 | 23.159 | 252.6 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 3.142 | 5.309 | 2.456 | 5.309 | 178.1 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 6.373 | 6.434 | 6.181 | 6.434 | 252.6 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.025 | 0.014 | 0.025 | 131.0 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.436 | 0.504 | 0.424 | 0.504 | 252.6 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 161.764 | 182.341 | 158.150 | 182.341 | 151.1 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1475.172 | 1500.669 | 1463.659 | 1500.669 | 252.6 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 150.372 | 165.642 | 148.552 | 165.642 | 151.5 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1523.376 | 1841.665 | 1464.451 | 1841.665 | 252.6 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.216 | 0.347 | 0.166 | 0.347 | 151.5 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 1.908 | 2.094 | 1.876 | 2.094 | 252.6 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.046 | 0.081 | 0.026 | 0.081 | 151.1 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.399 | 0.448 | 0.385 | 0.448 | 252.6 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.560 | 1.854 | 1.443 | 1.854 | 151.0 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 12.862 | 14.188 | 12.428 | 14.188 | 252.6 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.825 | 4.128 | 1.648 | 4.128 | 151.0 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.126 | 12.888 | 12.034 | 12.888 | 252.6 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.230 | 3.063 | 2.003 | 3.063 | 141.3 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 8.917 | 10.783 | 8.852 | 10.783 | 252.6 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.176 | 0.470 | 0.161 | 0.470 | 143.8 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 2.908 | 3.076 | 2.824 | 3.076 | 252.6 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.063 | 0.092 | 0.039 | 0.092 | 145.2 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.568 | 0.580 | 0.547 | 0.580 | 252.6 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 194.420 | 212.227 | 189.843 | 212.227 | 177.9 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1550.578 | 1991.547 | 1496.478 | 1991.547 | 252.6 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 162.261 | 172.127 | 160.102 | 172.127 | 190.8 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1454.040 | 1492.827 | 1445.123 | 1492.827 | 252.6 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.136 | 1.204 | 1.085 | 1.204 | 183.5 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 2.998 | 3.240 | 2.902 | 3.240 | 252.6 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.116 | 0.216 | 0.076 | 0.216 | 179.6 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.500 | 0.539 | 0.469 | 0.539 | 252.6 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 19.766 | 25.372 | 18.727 | 25.372 | 170.0 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 63.665 | 64.315 | 62.830 | 64.315 | 252.6 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 19.021 | 24.801 | 18.751 | 24.801 | 162.8 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 63.035 | 63.705 | 62.231 | 63.705 | 252.6 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 18.488 | 21.488 | 17.766 | 21.488 | 150.6 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 57.857 | 59.873 | 57.415 | 59.873 | 252.6 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.630 | 3.010 | 1.405 | 3.010 | 157.6 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 4.822 | 5.169 | 4.715 | 5.169 | 252.6 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 179.849 | 198.895 | 172.603 | 198.895 | 234.8 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1310.155 | 1488.841 | 1298.677 | 1488.841 | 252.6 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.877 | 4.955 | 1.669 | 4.955 | 234.8 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.110 | 9.434 | 8.989 | 9.434 | 252.6 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.030 | 0.043 | 0.025 | 0.043 | 227.4 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.088 | 3.228 | 3.038 | 3.228 | 252.6 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 20.840 | 25.174 | 18.619 | 25.174 | 202.5 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 74.011 | 86.245 | 73.222 | 86.245 | 252.6 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.391 | 4.105 | 3.005 | 4.105 | 219.8 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.406 | 9.012 | 8.221 | 9.012 | 252.6 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 163.381 | 165.986 | 162.598 | 165.986 | 205.3 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1323.451 | 1384.867 | 1296.730 | 1384.867 | 252.6 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.190 | 1.604 | 1.168 | 1.604 | 203.5 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.372 | 8.957 | 5.274 | 8.957 | 252.6 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.024 | 0.046 | 0.021 | 0.046 | 185.2 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.374 | 1.484 | 1.334 | 1.484 | 252.6 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 5.673 | 7.256 | 5.090 | 7.256 | 158.5 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 19.784 | 21.250 | 19.245 | 21.250 | 252.6 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.733 | 3.918 | 2.146 | 3.918 | 170.4 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.094 | 21.001 | 5.937 | 21.001 | 252.6 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 133.9 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.473 | 1.457 | 0.422 | 1.457 | 252.6 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 172.478 | 187.703 | 164.595 | 187.703 | 158.1 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1355.981 | 1430.453 | 1312.261 | 1430.453 | 252.6 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 158.032 | 171.056 | 152.957 | 171.056 | 158.3 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1301.946 | 1372.534 | 1297.003 | 1372.534 | 252.6 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.124 | 0.179 | 0.074 | 0.179 | 158.2 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 1.899 | 1.993 | 1.852 | 1.993 | 252.6 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.019 | 0.036 | 0.017 | 0.036 | 158.1 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.396 | 0.439 | 0.379 | 0.439 | 252.6 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.381 | 2.888 | 1.117 | 2.888 | 157.9 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.463 | 14.508 | 11.274 | 14.508 | 252.6 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.496 | 1.695 | 1.395 | 1.695 | 149.8 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 11.703 | 14.765 | 10.457 | 14.765 | 252.6 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 2.167 | 3.995 | 1.371 | 3.995 | 145.8 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.399 | 11.459 | 8.094 | 11.459 | 252.6 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.132 | 0.262 | 0.111 | 0.262 | 146.2 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.652 | 3.213 | 2.374 | 3.213 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 179.320 | 203.789 | 166.330 | 203.789 | 197.9 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1371.030 | 1456.095 | 1333.140 | 1456.095 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.321 | 2.550 | 2.281 | 2.550 | 196.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 6.671 | 6.814 | 6.585 | 6.814 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.065 | 0.080 | 0.051 | 0.080 | 179.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.663 | 2.857 | 2.639 | 2.857 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 12.443 | 13.741 | 10.847 | 13.741 | 159.8 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 38.169 | 50.478 | 37.147 | 50.478 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.405 | 0.655 | 0.362 | 0.655 | 169.6 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 11.257 | 11.815 | 11.121 | 11.815 | 252.6 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 170.607 | 176.422 | 170.401 | 176.422 | 205.3 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1343.673 | 1414.579 | 1325.001 | 1414.579 | 252.6 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 2.721 | 3.538 | 2.600 | 3.538 | 203.3 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 6.898 | 7.191 | 6.618 | 7.191 | 252.6 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.044 | 0.045 | 0.043 | 0.045 | 200.2 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.701 | 2.843 | 2.674 | 2.843 | 252.6 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 13.860 | 17.038 | 12.845 | 17.038 | 176.2 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 37.886 | 51.171 | 37.753 | 51.171 | 252.6 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.919 | 2.602 | 1.695 | 2.602 | 197.7 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 12.721 | 15.377 | 12.356 | 15.377 | 252.6 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 170.849 | 173.568 | 165.216 | 173.568 | 182.3 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1322.904 | 1462.057 | 1311.831 | 1462.057 | 252.6 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.236 | 2.442 | 2.175 | 2.442 | 180.1 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 4.824 | 5.064 | 4.815 | 5.064 | 252.6 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.029 | 0.040 | 0.027 | 0.040 | 163.8 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.329 | 1.347 | 1.321 | 1.347 | 252.6 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.535 | 6.692 | 4.783 | 6.692 | 157.5 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 17.687 | 18.022 | 17.508 | 18.022 | 252.6 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.051 | 2.356 | 1.933 | 2.356 | 161.9 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.143 | 8.261 | 8.137 | 8.261 | 252.6 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.013 | 0.012 | 0.013 | 137.7 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.541 | 0.709 | 0.448 | 0.709 | 252.6 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 178.258 | 200.011 | 174.678 | 200.011 | 158.0 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1337.294 | 1422.883 | 1326.568 | 1422.883 | 252.6 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 152.656 | 157.915 | 151.732 | 157.915 | 158.1 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1297.897 | 1346.660 | 1288.247 | 1346.660 | 252.6 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.460 | 0.521 | 0.399 | 0.521 | 158.1 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.561 | 3.672 | 3.501 | 3.672 | 252.6 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.024 | 0.039 | 0.018 | 0.039 | 158.0 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.661 | 0.730 | 0.637 | 0.730 | 252.6 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 12.865 | 13.065 | 12.819 | 13.065 | 157.6 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 44.349 | 50.445 | 43.985 | 50.445 | 252.6 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.013 | 13.425 | 12.953 | 13.425 | 157.6 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 43.303 | 46.487 | 42.573 | 46.487 | 252.6 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.544 | 14.624 | 13.186 | 14.624 | 148.6 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 38.404 | 40.178 | 38.057 | 40.178 | 252.6 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.237 | 0.300 | 0.170 | 0.300 | 151.1 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.336 | 5.577 | 4.207 | 5.577 | 252.6 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.022 | 0.014 | 0.022 | 134.8 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.442 | 0.482 | 0.421 | 0.482 | 252.6 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 169.424 | 266.289 | 162.071 | 266.289 | 152.8 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1434.611 | 1957.261 | 1342.827 | 1957.261 | 252.6 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 208.953 | 765.137 | 188.849 | 765.137 | 152.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1305.761 | 1398.032 | 1300.163 | 1398.032 | 252.6 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.457 | 0.611 | 0.376 | 0.611 | 152.9 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.755 | 4.332 | 3.488 | 4.332 | 252.6 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.022 | 0.029 | 0.018 | 0.029 | 152.8 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.690 | 2.534 | 0.639 | 2.534 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.579 | 2.937 | 2.471 | 2.937 | 152.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 17.745 | 21.394 | 17.465 | 21.394 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.715 | 3.773 | 2.634 | 3.773 | 152.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 16.884 | 24.678 | 16.524 | 24.678 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.627 | 4.906 | 2.964 | 4.906 | 143.7 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 15.884 | 33.807 | 14.901 | 33.807 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.239 | 0.429 | 0.192 | 0.429 | 146.2 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.363 | 5.149 | 4.270 | 5.149 | 252.6 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.034 | 0.042 | 0.030 | 0.042 | 141.1 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.489 | 0.531 | 0.467 | 0.531 | 252.6 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 185.337 | 188.122 | 180.938 | 188.122 | 160.9 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1540.825 | 1619.543 | 1513.033 | 1619.543 | 252.6 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 155.614 | 168.401 | 152.005 | 168.401 | 161.8 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1450.823 | 1513.478 | 1441.354 | 1513.478 | 252.6 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.754 | 0.839 | 0.717 | 0.839 | 161.0 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 3.947 | 5.600 | 3.855 | 5.600 | 252.6 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.116 | 0.152 | 0.109 | 0.152 | 160.9 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.714 | 0.779 | 0.673 | 0.779 | 252.6 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 16.353 | 17.076 | 16.167 | 17.076 | 159.6 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 57.976 | 63.799 | 57.422 | 63.799 | 252.6 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 16.475 | 17.016 | 16.331 | 17.016 | 157.3 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 58.398 | 61.455 | 56.178 | 61.455 | 252.6 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.131 | 18.607 | 16.405 | 18.607 | 152.9 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 51.067 | 51.527 | 50.768 | 51.527 | 252.6 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.258 | 0.334 | 0.240 | 0.334 | 155.9 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 5.701 | 5.857 | 5.647 | 5.857 | 252.6 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 162.867 | 265.913 | 153.759 | 265.913 | 152.4 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1435.667 | 1723.503 | 1353.830 | 1723.503 | 252.6 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.088 | 0.181 | 0.076 | 0.181 | 151.7 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.296 | 5.441 | 4.176 | 5.441 | 252.6 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.020 | 0.044 | 0.014 | 0.044 | 150.4 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.498 | 4.234 | 2.143 | 4.234 | 252.6 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 6.938 | 9.250 | 5.737 | 9.250 | 148.6 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 18.976 | 32.461 | 17.630 | 32.461 | 252.6 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.203 | 0.219 | 0.184 | 0.219 | 149.1 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.566 | 3.575 | 2.462 | 3.575 | 252.6 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 160.138 | 168.940 | 157.349 | 168.940 | 184.4 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1330.659 | 1832.533 | 1294.624 | 1832.533 | 252.6 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.123 | 0.165 | 0.083 | 0.165 | 174.0 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.327 | 5.677 | 4.235 | 5.677 | 252.6 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.018 | 0.026 | 0.014 | 0.026 | 163.1 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.141 | 2.755 | 2.109 | 2.755 | 252.6 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.739 | 7.961 | 5.820 | 7.961 | 156.1 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 19.246 | 41.707 | 14.246 | 41.707 | 252.6 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.363 | 1.762 | 1.274 | 1.762 | 157.2 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.689 | 16.900 | 2.530 | 16.900 | 252.6 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 159.460 | 181.222 | 155.296 | 181.222 | 155.6 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1317.057 | 1345.216 | 1290.228 | 1345.216 | 252.6 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.076 | 0.140 | 0.068 | 0.140 | 155.3 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.649 | 2.736 | 2.595 | 2.736 | 252.6 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.030 | 0.192 | 0.016 | 0.192 | 154.9 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 0.909 | 0.941 | 0.901 | 0.941 | 252.6 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 2.860 | 3.608 | 2.777 | 3.608 | 153.7 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 7.767 | 8.960 | 7.535 | 8.960 | 252.6 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.359 | 1.466 | 1.278 | 1.466 | 154.3 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.555 | 2.844 | 2.523 | 2.844 | 252.6 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.022 | 0.012 | 0.022 | 138.3 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.428 | 0.456 | 0.413 | 0.456 | 252.6 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 167.320 | 207.676 | 163.786 | 207.676 | 159.7 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1482.030 | 1550.865 | 1469.476 | 1550.865 | 252.6 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 156.005 | 160.174 | 149.774 | 160.174 | 162.5 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1481.301 | 2302.209 | 1453.651 | 2302.209 | 252.6 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.289 | 1.568 | 0.623 | 1.568 | 162.5 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 2.855 | 3.071 | 2.843 | 3.071 | 252.6 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.089 | 0.125 | 0.080 | 0.125 | 159.7 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.516 | 0.551 | 0.476 | 0.551 | 252.6 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.139 | 3.389 | 3.020 | 3.389 | 159.7 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 19.867 | 21.807 | 19.658 | 21.807 | 252.6 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.480 | 3.818 | 3.348 | 3.818 | 156.7 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 19.118 | 20.082 | 18.943 | 20.082 | 252.6 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 4.927 | 5.970 | 3.687 | 5.970 | 155.9 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 14.444 | 14.940 | 14.427 | 14.940 | 252.6 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.182 | 0.221 | 0.170 | 0.221 | 155.9 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.559 | 5.912 | 4.442 | 5.912 | 252.6 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 179.447 | 185.887 | 175.735 | 185.887 | 205.0 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1517.146 | 1616.669 | 1489.994 | 1616.669 | 252.6 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.022 | 5.162 | 3.857 | 5.162 | 203.4 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.536 | 6.644 | 5.486 | 6.644 | 252.6 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.296 | 0.415 | 0.244 | 0.415 | 198.1 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.341 | 2.466 | 2.326 | 2.466 | 252.6 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 15.198 | 20.408 | 14.701 | 20.408 | 180.7 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 40.041 | 41.054 | 39.891 | 41.054 | 252.6 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.502 | 0.543 | 0.449 | 0.543 | 196.5 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 6.607 | 6.754 | 6.556 | 6.754 | 252.6 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 178.614 | 191.087 | 176.125 | 191.087 | 209.9 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1462.649 | 1524.781 | 1458.103 | 1524.781 | 252.6 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.460 | 5.017 | 3.828 | 5.017 | 206.5 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.475 | 5.533 | 5.427 | 5.533 | 252.6 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.278 | 0.321 | 0.270 | 0.321 | 201.3 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.302 | 2.352 | 2.247 | 2.352 | 252.6 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.371 | 23.160 | 14.118 | 23.160 | 192.4 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 39.208 | 40.194 | 38.922 | 40.194 | 252.6 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.180 | 2.863 | 1.929 | 2.863 | 198.6 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.009 | 8.311 | 7.857 | 8.311 | 252.6 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 178.328 | 414.751 | 174.559 | 414.751 | 202.7 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1478.490 | 1496.540 | 1461.532 | 1496.540 | 252.6 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.635 | 4.253 | 2.487 | 4.253 | 202.3 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 3.817 | 4.170 | 3.786 | 4.170 | 252.6 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.271 | 0.303 | 0.226 | 0.303 | 198.5 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.031 | 1.067 | 1.014 | 1.067 | 252.6 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 7.590 | 8.448 | 6.486 | 8.448 | 158.8 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 19.785 | 21.475 | 19.699 | 21.475 | 252.6 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.827 | 4.210 | 2.026 | 4.210 | 179.7 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 7.981 | 8.248 | 7.847 | 8.248 | 252.6 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 183.883 | 199.121 | 180.341 | 199.121 | 144.0 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1536.598 | 1590.292 | 1493.792 | 1590.292 | 252.6 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.490 | 214.890 | 154.399 | 214.890 | 152.3 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1568.460 | 2119.234 | 1518.399 | 2119.234 | 252.6 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.218 | 1.343 | 1.212 | 1.343 | 152.3 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 4.077 | 4.416 | 3.696 | 4.416 | 252.6 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.108 | 0.152 | 0.096 | 0.152 | 147.5 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.666 | 0.688 | 0.638 | 0.688 | 252.6 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.017 | 0.011 | 0.017 | 134.9 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.446 | 0.468 | 0.437 | 0.468 | 252.6 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.307 | 0.433 | 0.247 | 0.433 | 138.7 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 13.792 | 15.115 | 13.637 | 15.115 | 252.6 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.012 | 0.020 | 138.5 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.425 | 0.447 | 0.408 | 0.447 | 252.6 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 180.024 | 192.517 | 176.235 | 192.517 | 157.9 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1599.023 | 2541.807 | 1547.471 | 2541.807 | 252.6 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 156.405 | 165.964 | 152.077 | 165.964 | 158.5 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1497.736 | 1617.639 | 1463.760 | 1617.639 | 252.6 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.828 | 1.645 | 0.727 | 1.645 | 158.5 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.579 | 6.257 | 4.121 | 6.257 | 252.6 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.094 | 0.101 | 0.084 | 0.101 | 157.9 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.688 | 1.071 | 0.628 | 1.071 | 252.6 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.677 | 14.153 | 13.618 | 14.153 | 157.9 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 47.390 | 48.284 | 46.607 | 48.284 | 252.6 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.781 | 14.479 | 13.556 | 14.479 | 157.2 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 47.308 | 48.764 | 46.233 | 48.764 | 252.6 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.974 | 15.572 | 14.805 | 15.572 | 156.7 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 42.045 | 42.586 | 40.918 | 42.586 | 252.6 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.201 | 0.239 | 0.195 | 0.239 | 156.7 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.107 | 5.234 | 4.975 | 5.234 | 252.6 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.013 | 0.016 | 136.4 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.438 | 0.466 | 0.421 | 0.466 | 252.6 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 170.085 | 187.761 | 164.714 | 187.761 | 156.3 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1484.517 | 1693.561 | 1464.541 | 1693.561 | 252.6 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.986 | 170.970 | 155.219 | 170.970 | 157.1 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1488.842 | 1515.733 | 1470.181 | 1515.733 | 252.6 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.856 | 1.020 | 0.802 | 1.020 | 156.9 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.668 | 3.919 | 3.594 | 3.919 | 252.6 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.105 | 0.153 | 0.085 | 0.153 | 156.3 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.669 | 0.712 | 0.646 | 0.712 | 252.6 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.700 | 4.831 | 3.261 | 4.831 | 156.1 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 21.481 | 25.339 | 20.728 | 25.339 | 252.6 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.963 | 5.170 | 3.405 | 5.170 | 152.8 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 20.417 | 22.965 | 20.282 | 22.965 | 252.6 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 4.866 | 7.259 | 3.784 | 7.259 | 152.2 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 15.980 | 17.098 | 15.470 | 17.098 | 252.6 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.223 | 0.385 | 0.193 | 0.385 | 152.4 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.115 | 5.431 | 5.036 | 5.431 | 252.6 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 6.905 | 10.903 | 6.804 | 10.903 | 156.3 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 44.083 | 51.462 | 43.764 | 51.462 | 252.6 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 181.018 | 218.769 | 175.506 | 218.769 | 159.4 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1341.435 | 1383.203 | 1325.292 | 1383.203 | 252.6 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.865 | 3.653 | 2.701 | 3.653 | 156.9 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.226 | 1.233 | 1.224 | 1.233 | 252.6 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.140 | 0.154 | 0.139 | 0.154 | 128.9 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.479 | 0.564 | 0.470 | 0.564 | 252.6 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.050 | 0.076 | 0.049 | 0.076 | 156.1 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 4.783 | 4.873 | 4.766 | 4.873 | 252.6 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.436 | 3.263 | 1.233 | 3.263 | 136.9 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.726 | 0.744 | 0.693 | 0.744 | 252.6 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.138 | 6.395 | 5.374 | 6.395 | 155.5 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 35.605 | 38.104 | 35.515 | 38.104 | 252.6 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 7.833 | 8.684 | 7.116 | 8.684 | 158.4 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 55.567 | 66.963 | 55.210 | 66.963 | 252.6 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 180.407 | 189.763 | 177.779 | 189.763 | 158.3 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1461.800 | 1669.086 | 1426.999 | 1669.086 | 252.6 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.275 | 1.720 | 1.174 | 1.720 | 158.3 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.330 | 1.354 | 1.328 | 1.354 | 252.6 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.076 | 0.081 | 0.066 | 0.081 | 126.9 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.413 | 0.481 | 0.379 | 0.481 | 252.6 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.055 | 0.083 | 0.052 | 0.083 | 157.6 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 4.888 | 4.954 | 4.876 | 4.954 | 252.6 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.543 | 1.977 | 1.445 | 1.977 | 132.5 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.776 | 1.350 | 0.717 | 1.350 | 252.6 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 6.809 | 8.211 | 6.790 | 8.211 | 157.6 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 43.688 | 48.704 | 42.456 | 48.704 | 252.6 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.057 | 2.214 | 1.796 | 2.214 | 161.1 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 11.996 | 12.394 | 11.946 | 12.394 | 252.6 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.273 | 0.400 | 0.250 | 0.400 | 164.4 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 252.6 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.172 | 0.226 | 0.171 | 0.226 | 162.1 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 252.6 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.381 | 13.500 | 11.575 | 13.500 | 159.6 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 137.563 | 149.890 | 133.312 | 149.890 | 252.6 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.078 | 0.092 | 0.076 | 0.092 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.622 | 0.633 | 0.619 | 0.633 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 166.796 | 173.075 | 162.377 | 173.075 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1371.532 | 1414.439 | 1360.972 | 1414.439 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 152.752 | 157.360 | 152.007 | 157.360 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1407.821 | 1514.842 | 1383.888 | 1514.842 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.124 | 0.144 | 0.119 | 0.144 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.725 | 3.812 | 3.709 | 3.812 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.031 | 0.036 | 0.027 | 0.036 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.810 | 0.839 | 0.792 | 0.839 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.932 | 2.270 | 1.888 | 2.270 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.709 | 14.417 | 13.611 | 14.417 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.041 | 2.401 | 2.034 | 2.401 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.221 | 13.662 | 13.143 | 13.662 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.112 | 3.762 | 2.005 | 3.762 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 8.697 | 8.917 | 8.656 | 8.917 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.455 | 0.964 | 0.426 | 0.964 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.470 | 4.560 | 4.469 | 4.560 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.062 | 0.148 | 0.056 | 0.148 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.480 | 0.524 | 0.476 | 0.524 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 168.870 | 199.507 | 168.803 | 199.507 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1387.626 | 1390.133 | 1385.361 | 1390.133 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 159.177 | 376.177 | 153.059 | 376.177 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1352.294 | 1396.512 | 1348.945 | 1396.512 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.138 | 0.193 | 0.132 | 0.193 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.358 | 3.489 | 3.338 | 3.489 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.036 | 0.065 | 0.030 | 0.065 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.637 | 0.645 | 0.635 | 0.645 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.277 | 4.360 | 4.104 | 4.360 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 26.632 | 27.268 | 26.020 | 27.268 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.363 | 4.717 | 4.331 | 4.717 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 25.965 | 26.177 | 25.830 | 26.177 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 4.904 | 5.666 | 4.506 | 5.666 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 21.491 | 21.999 | 21.204 | 21.999 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.437 | 0.627 | 0.379 | 0.627 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.432 | 4.774 | 4.419 | 4.774 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 145.301 | 147.937 | 145.288 | 147.937 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1435.391 | 1825.219 | 1342.386 | 1825.219 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.166 | 0.102 | 0.166 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 1.916 | 2.318 | 1.866 | 2.318 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.027 | 0.017 | 0.027 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.368 | 0.377 | 0.367 | 0.377 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.220 | 1.397 | 1.171 | 1.397 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 2.801 | 2.903 | 2.672 | 2.903 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.213 | 0.241 | 0.194 | 0.241 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.433 | 3.304 | 2.360 | 3.304 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 148.882 | 156.809 | 147.898 | 156.809 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1352.718 | 1541.026 | 1321.322 | 1541.026 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.115 | 0.155 | 0.093 | 0.155 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 1.894 | 2.311 | 1.865 | 2.311 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.020 | 0.028 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.384 | 0.423 | 0.370 | 0.423 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.265 | 1.699 | 1.188 | 1.699 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 2.814 | 3.203 | 2.654 | 3.203 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.209 | 0.255 | 0.183 | 0.255 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.446 | 3.914 | 2.432 | 3.914 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.099 | 0.109 | 0.098 | 0.109 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.886 | 0.932 | 0.857 | 0.932 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 177.053 | 180.212 | 174.779 | 180.212 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1387.934 | 1397.128 | 1386.512 | 1397.128 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 159.576 | 166.797 | 158.351 | 166.797 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1382.182 | 1389.287 | 1371.101 | 1389.287 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.146 | 0.175 | 0.145 | 0.175 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.472 | 3.532 | 3.447 | 3.532 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.026 | 0.027 | 0.024 | 0.027 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.122 | 1.156 | 1.095 | 1.156 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.044 | 7.391 | 5.987 | 7.391 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 29.737 | 31.022 | 29.197 | 31.022 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.074 | 8.583 | 4.908 | 8.583 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 28.176 | 29.381 | 28.160 | 29.381 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 4.963 | 6.041 | 4.474 | 6.041 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 24.693 | 24.724 | 24.180 | 24.724 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.872 | 1.033 | 0.856 | 1.033 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.151 | 4.590 | 4.101 | 4.590 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.033 | 0.016 | 0.033 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.437 | 0.474 | 0.424 | 0.474 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 184.777 | 411.714 | 168.566 | 411.714 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1324.510 | 1342.002 | 1310.594 | 1342.002 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 153.834 | 170.259 | 149.624 | 170.259 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1309.942 | 1331.955 | 1296.774 | 1331.955 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.136 | 0.277 | 0.094 | 0.277 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 1.950 | 2.156 | 1.911 | 2.156 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.038 | 0.057 | 0.017 | 0.057 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.436 | 0.465 | 0.417 | 0.465 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.394 | 1.529 | 1.318 | 1.529 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 11.549 | 13.908 | 11.478 | 13.908 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.969 | 2.089 | 1.746 | 2.089 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 10.925 | 11.215 | 10.788 | 11.215 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.705 | 4.688 | 1.446 | 4.688 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.300 | 9.404 | 8.136 | 9.404 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.207 | 0.221 | 0.193 | 0.221 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 2.797 | 2.886 | 2.761 | 2.886 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.021 | 0.014 | 0.021 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.449 | 0.591 | 0.427 | 0.591 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 159.372 | 181.608 | 158.739 | 181.608 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1341.667 | 1380.424 | 1298.850 | 1380.424 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 154.049 | 174.413 | 151.518 | 174.413 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1359.110 | 1444.561 | 1301.430 | 1444.561 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.108 | 0.160 | 0.073 | 0.160 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 1.965 | 2.133 | 1.882 | 2.133 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.033 | 0.321 | 0.019 | 0.321 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.435 | 0.459 | 0.428 | 0.459 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.308 | 1.584 | 1.259 | 1.584 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.170 | 13.133 | 11.791 | 13.133 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.867 | 2.004 | 1.660 | 2.004 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.543 | 11.889 | 11.494 | 11.889 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.610 | 4.677 | 1.407 | 4.677 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 9.600 | 12.272 | 8.427 | 12.272 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.216 | 0.281 | 0.192 | 0.281 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 2.920 | 2.972 | 2.859 | 2.972 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.021 | 0.015 | 0.021 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.444 | 0.515 | 0.426 | 0.515 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 277.334 | 280.239 | 270.583 | 280.239 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1728.149 | 1821.950 | 1691.521 | 1821.950 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 151.988 | 161.413 | 146.415 | 161.413 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1482.472 | 1985.365 | 1335.934 | 1985.365 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.104 | 0.174 | 0.075 | 0.174 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.326 | 2.968 | 2.117 | 2.968 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.029 | 0.059 | 0.019 | 0.059 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.469 | 0.505 | 0.436 | 0.505 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 99.148 | 100.061 | 98.484 | 100.061 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 365.508 | 379.652 | 361.878 | 379.652 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 99.286 | 100.588 | 98.670 | 100.588 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 367.057 | 416.201 | 358.636 | 416.201 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 100.164 | 101.119 | 98.601 | 101.119 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 363.084 | 382.283 | 356.638 | 382.283 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.295 | 0.417 | 0.267 | 0.417 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 2.993 | 4.223 | 2.795 | 4.223 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.474 | 186.126 | 155.023 | 186.126 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1386.596 | 1395.233 | 1327.861 | 1395.233 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.119 | 0.141 | 0.103 | 0.141 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 1.977 | 2.151 | 1.945 | 2.151 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.033 | 0.017 | 0.033 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.454 | 0.460 | 0.403 | 0.460 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.884 | 2.317 | 1.834 | 2.317 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.952 | 9.254 | 7.360 | 9.254 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.218 | 0.264 | 0.202 | 0.264 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.712 | 2.850 | 2.579 | 2.850 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.554 | 155.756 | 152.555 | 155.756 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1346.223 | 1594.985 | 1330.587 | 1594.985 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.106 | 0.137 | 0.094 | 0.137 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 1.930 | 1.959 | 1.916 | 1.959 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.045 | 0.021 | 0.045 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.410 | 0.447 | 0.389 | 0.447 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.712 | 3.835 | 3.606 | 3.835 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 18.570 | 19.016 | 18.452 | 19.016 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.192 | 0.397 | 0.185 | 0.397 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.457 | 2.602 | 2.396 | 2.602 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.077 | 0.043 | 0.077 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.486 | 0.503 | 0.480 | 0.503 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 169.385 | 176.567 | 168.594 | 176.567 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1407.529 | 1439.315 | 1406.251 | 1439.315 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 151.632 | 159.266 | 148.220 | 159.266 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1359.046 | 1371.336 | 1357.967 | 1371.336 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.140 | 0.199 | 0.121 | 0.199 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.438 | 3.856 | 3.356 | 3.856 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.028 | 0.036 | 0.028 | 0.036 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.634 | 0.665 | 0.609 | 0.665 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.856 | 2.886 | 2.771 | 2.886 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 46.981 | 48.767 | 46.941 | 48.767 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 2.960 | 3.070 | 2.858 | 3.070 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 46.075 | 48.009 | 45.882 | 48.009 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.828 | 4.643 | 3.118 | 4.643 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 42.871 | 48.637 | 42.322 | 48.637 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.467 | 0.616 | 0.399 | 0.616 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.414 | 4.556 | 4.375 | 4.556 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.895 | 155.583 | 148.985 | 155.583 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1368.847 | 1413.522 | 1356.908 | 1413.522 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.215 | 0.225 | 0.211 | 0.225 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.485 | 3.618 | 3.426 | 3.618 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.025 | 0.022 | 0.025 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.652 | 0.674 | 0.609 | 0.674 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.648 | 3.350 | 1.604 | 3.350 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 7.711 | 9.306 | 7.256 | 9.306 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.425 | 0.855 | 0.421 | 0.855 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.368 | 5.772 | 4.364 | 5.772 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.517 | 183.461 | 156.173 | 183.461 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1360.905 | 1364.099 | 1357.453 | 1364.099 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.193 | 0.149 | 0.193 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.719 | 3.802 | 3.695 | 3.802 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.031 | 0.018 | 0.031 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.815 | 0.853 | 0.802 | 0.853 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 4.092 | 4.388 | 3.314 | 4.388 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.167 | 9.400 | 8.716 | 9.400 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.472 | 0.573 | 0.456 | 0.573 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.493 | 4.537 | 4.493 | 4.537 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.079 | 0.084 | 0.074 | 0.084 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.579 | 0.595 | 0.572 | 0.595 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 168.946 | 177.882 | 166.834 | 177.882 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1330.931 | 1347.706 | 1322.266 | 1347.706 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 155.188 | 164.600 | 152.517 | 164.600 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1327.716 | 1408.013 | 1321.449 | 1408.013 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.165 | 0.228 | 0.160 | 0.228 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.570 | 3.652 | 3.507 | 3.652 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.029 | 0.045 | 0.026 | 0.045 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.764 | 0.781 | 0.731 | 0.781 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.058 | 2.459 | 1.976 | 2.459 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.478 | 14.655 | 13.475 | 14.655 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.428 | 2.539 | 2.164 | 2.539 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 12.919 | 15.116 | 12.774 | 15.116 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 3.396 | 4.838 | 3.014 | 4.838 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 8.692 | 9.311 | 8.611 | 9.311 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.570 | 1.098 | 0.448 | 1.098 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.378 | 5.800 | 4.328 | 5.800 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.065 | 0.070 | 0.042 | 0.070 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.511 | 0.548 | 0.484 | 0.548 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 156.856 | 159.998 | 156.696 | 159.998 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1317.425 | 1352.281 | 1308.629 | 1352.281 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 149.530 | 160.484 | 148.359 | 160.484 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1325.837 | 1362.115 | 1306.982 | 1362.115 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.120 | 0.142 | 0.117 | 0.142 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.306 | 3.497 | 3.279 | 3.497 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.023 | 0.026 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.663 | 0.797 | 0.636 | 0.797 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.082 | 1.315 | 1.060 | 1.315 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 11.888 | 13.522 | 11.886 | 13.522 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.294 | 2.098 | 1.196 | 2.098 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 11.843 | 12.453 | 11.513 | 12.453 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.887 | 2.995 | 1.874 | 2.995 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.243 | 7.569 | 7.195 | 7.569 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.682 | 1.318 | 0.392 | 1.318 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.355 | 4.414 | 4.315 | 4.414 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 145.298 | 154.180 | 145.041 | 154.180 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1395.127 | 1406.452 | 1324.727 | 1406.452 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.109 | 0.137 | 0.093 | 0.137 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 1.893 | 1.957 | 1.877 | 1.957 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.028 | 0.018 | 0.028 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.415 | 0.434 | 0.395 | 0.434 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.929 | 2.285 | 1.921 | 2.285 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.785 | 9.640 | 6.690 | 9.640 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.206 | 0.232 | 0.197 | 0.232 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.545 | 2.671 | 2.440 | 2.671 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 147.893 | 151.304 | 146.935 | 151.304 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1325.551 | 1350.107 | 1308.453 | 1350.107 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.130 | 0.161 | 0.091 | 0.161 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.908 | 2.046 | 1.904 | 2.046 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.015 | 0.031 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.423 | 0.447 | 0.398 | 0.447 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.683 | 3.869 | 3.625 | 3.869 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 19.002 | 19.527 | 18.592 | 19.527 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.194 | 0.235 | 0.186 | 0.235 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.427 | 2.518 | 2.395 | 2.518 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 149.910 | 160.288 | 149.508 | 160.288 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1418.088 | 1710.609 | 1396.733 | 1710.609 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.208 | 0.225 | 0.189 | 0.225 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.689 | 3.761 | 3.645 | 3.761 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.038 | 0.017 | 0.038 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.773 | 0.842 | 0.765 | 0.842 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.018 | 3.619 | 2.996 | 3.619 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.445 | 8.590 | 8.243 | 8.590 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.140 | 0.175 | 0.139 | 0.175 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.517 | 4.668 | 4.488 | 4.668 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.037 | 155.334 | 150.089 | 155.334 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1365.687 | 1395.960 | 1357.159 | 1395.960 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.190 | 0.209 | 0.169 | 0.209 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.683 | 3.716 | 3.611 | 3.716 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.019 | 0.024 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.735 | 0.838 | 0.709 | 0.838 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.553 | 4.764 | 2.924 | 4.764 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.469 | 9.050 | 8.410 | 9.050 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.144 | 0.151 | 0.142 | 0.151 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.438 | 4.490 | 4.415 | 4.490 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 150.811 | 157.187 | 149.488 | 157.187 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1356.448 | 1386.194 | 1353.849 | 1386.194 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.178 | 0.224 | 0.177 | 0.224 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.602 | 3.620 | 3.547 | 3.620 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.020 | 0.018 | 0.020 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.759 | 0.788 | 0.751 | 0.788 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.144 | 3.809 | 3.122 | 3.809 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.418 | 8.505 | 8.389 | 8.505 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.135 | 0.158 | 0.130 | 0.158 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.494 | 4.572 | 4.470 | 4.572 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 148.154 | 153.720 | 147.685 | 153.720 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1369.876 | 1377.812 | 1357.637 | 1377.812 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.182 | 0.229 | 0.181 | 0.229 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.645 | 3.691 | 3.569 | 3.691 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.024 | 0.018 | 0.024 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.734 | 0.774 | 0.730 | 0.774 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.533 | 3.774 | 2.971 | 3.774 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.977 | 9.450 | 8.938 | 9.450 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.139 | 0.182 | 0.132 | 0.182 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.413 | 4.556 | 4.395 | 4.556 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.997 | 180.760 | 148.914 | 180.760 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1359.649 | 1850.277 | 1351.013 | 1850.277 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.241 | 0.249 | 0.226 | 0.249 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.357 | 3.409 | 3.269 | 3.409 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.020 | 0.024 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.596 | 0.631 | 0.560 | 0.631 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 3.287 | 5.181 | 2.062 | 5.181 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.225 | 7.967 | 6.708 | 7.967 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.167 | 0.279 | 0.161 | 0.279 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.246 | 4.311 | 4.204 | 4.311 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.077 | 158.819 | 152.664 | 158.819 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1336.972 | 1383.289 | 1324.096 | 1383.289 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.229 | 0.249 | 0.223 | 0.249 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.375 | 3.591 | 3.294 | 3.591 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.592 | 0.619 | 0.580 | 0.619 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.990 | 2.684 | 1.888 | 2.684 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.187 | 7.687 | 7.049 | 7.687 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.173 | 0.948 | 0.168 | 0.948 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.397 | 4.856 | 4.336 | 4.856 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 149.072 | 160.583 | 144.494 | 160.583 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1347.810 | 1367.608 | 1343.057 | 1367.608 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.233 | 0.249 | 0.233 | 0.249 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.381 | 3.623 | 3.328 | 3.623 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.047 | 0.022 | 0.047 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.573 | 0.620 | 0.572 | 0.620 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.069 | 3.379 | 2.059 | 3.379 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.015 | 8.204 | 6.871 | 8.204 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.163 | 0.173 | 0.161 | 0.173 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.413 | 4.484 | 4.367 | 4.484 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 149.278 | 158.963 | 147.997 | 158.963 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1358.298 | 1435.445 | 1328.638 | 1435.445 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.231 | 0.296 | 0.224 | 0.296 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.521 | 3.775 | 3.449 | 3.775 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.025 | 0.018 | 0.025 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.592 | 0.688 | 0.573 | 0.688 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.932 | 3.175 | 1.918 | 3.175 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.630 | 17.732 | 7.330 | 17.732 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.171 | 0.234 | 0.150 | 0.234 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.295 | 4.398 | 4.262 | 4.398 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 148.160 | 150.970 | 146.665 | 150.970 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1368.935 | 1412.210 | 1338.462 | 1412.210 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.231 | 0.296 | 0.215 | 0.296 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.373 | 3.544 | 3.304 | 3.544 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.041 | 0.023 | 0.041 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.595 | 0.623 | 0.576 | 0.623 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.292 | 4.099 | 2.116 | 4.099 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.567 | 8.077 | 6.959 | 8.077 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.189 | 0.228 | 0.166 | 0.228 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.362 | 4.410 | 4.272 | 4.410 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 147.674 | 155.148 | 147.499 | 155.148 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1366.366 | 1399.101 | 1340.354 | 1399.101 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.249 | 0.305 | 0.212 | 0.305 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.400 | 3.542 | 3.371 | 3.542 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.026 | 0.021 | 0.026 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.605 | 0.619 | 0.586 | 0.619 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.343 | 4.919 | 2.300 | 4.919 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.510 | 7.764 | 7.067 | 7.764 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.182 | 0.269 | 0.152 | 0.269 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.449 | 4.750 | 4.396 | 4.750 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.454 | 170.418 | 151.392 | 170.418 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1314.315 | 1425.089 | 1305.254 | 1425.089 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.163 | 0.272 | 0.159 | 0.272 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.038 | 2.131 | 1.973 | 2.131 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.032 | 0.044 | 0.032 | 0.044 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.449 | 0.512 | 0.415 | 0.512 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 146.471 | 147.685 | 146.429 | 147.685 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 558.732 | 579.187 | 556.818 | 579.187 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.234 | 0.273 | 0.208 | 0.273 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 2.869 | 3.206 | 2.749 | 3.206 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.616 | 171.311 | 148.274 | 171.311 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1397.086 | 1482.039 | 1333.744 | 1482.039 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.155 | 0.170 | 0.137 | 0.170 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 1.972 | 2.018 | 1.938 | 2.018 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.034 | 0.022 | 0.034 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.448 | 0.477 | 0.416 | 0.477 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.399 | 4.769 | 4.203 | 4.769 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 19.005 | 21.632 | 18.812 | 21.632 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.244 | 0.249 | 0.229 | 0.249 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 2.794 | 3.723 | 2.735 | 3.723 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 147.294 | 149.752 | 146.726 | 149.752 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1342.335 | 1395.167 | 1297.289 | 1395.167 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.155 | 0.168 | 0.129 | 0.168 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.686 | 1.778 | 1.675 | 1.778 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.024 | 0.045 | 0.024 | 0.045 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.290 | 0.295 | 0.289 | 0.295 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.521 | 0.574 | 0.507 | 0.574 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.609 | 2.697 | 2.558 | 2.697 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.183 | 0.302 | 0.175 | 0.302 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.367 | 2.431 | 2.366 | 2.431 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 148.628 | 150.803 | 148.413 | 150.803 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1332.244 | 1603.813 | 1327.573 | 1603.813 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.161 | 0.196 | 0.124 | 0.196 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.725 | 1.818 | 1.704 | 1.818 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.019 | 0.025 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.309 | 0.328 | 0.295 | 0.328 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.901 | 0.977 | 0.880 | 0.977 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.373 | 7.782 | 5.278 | 7.782 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.172 | 0.188 | 0.161 | 0.188 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.474 | 2.563 | 2.422 | 2.563 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 282.858 | 286.478 | 280.693 | 286.478 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1838.995 | 2608.916 | 1799.912 | 2608.916 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.556 | 159.189 | 154.232 | 159.189 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1412.754 | 1615.467 | 1408.447 | 1615.467 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.174 | 0.219 | 0.161 | 0.219 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.171 | 5.511 | 1.954 | 5.511 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.029 | 0.033 | 0.020 | 0.033 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.493 | 0.558 | 0.445 | 0.558 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.027 | 0.037 | 0.025 | 0.037 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.486 | 0.498 | 0.458 | 0.498 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.302 | 4.503 | 4.028 | 4.503 | 138.6 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 126.311 | 179.012 | 114.382 | 179.012 | 252.6 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 161.247 | 167.782 | 160.064 | 167.782 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1400.989 | 1432.083 | 1367.892 | 1432.083 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.792 | 160.253 | 151.917 | 160.253 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1405.804 | 1499.987 | 1364.561 | 1499.987 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.213 | 0.230 | 0.194 | 0.230 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.250 | 3.420 | 3.204 | 3.420 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.034 | 0.022 | 0.034 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.601 | 0.701 | 0.584 | 0.701 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.046 | 0.139 | 0.041 | 0.139 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.477 | 0.511 | 0.473 | 0.511 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.823 | 1.212 | 0.783 | 1.212 | 134.0 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 66.631 | 68.380 | 64.779 | 68.380 | 252.6 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 165.868 | 171.930 | 164.186 | 171.930 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1379.418 | 1424.740 | 1337.002 | 1424.740 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.059 | 155.868 | 153.269 | 155.868 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1356.728 | 2281.228 | 1319.482 | 2281.228 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.212 | 0.226 | 0.170 | 0.226 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.628 | 4.156 | 3.567 | 4.156 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.025 | 0.017 | 0.025 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.774 | 0.967 | 0.746 | 0.967 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.074 | 0.120 | 0.071 | 0.120 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.609 | 1.048 | 0.607 | 1.048 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.174 | 2.482 | 0.786 | 2.482 | 147.9 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 18.340 | 30.917 | 18.142 | 30.917 | 252.6 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `fad30c55c03760712503393517c093abe5d6e0c8`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:afea215a8d454312c693b8369934fb94665e4e9cffd67cbb206d35182cd8b614`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:43c20fb254498dcc6cbed89c41d24624a3f22f3d464764ab2480755a55279379`

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

