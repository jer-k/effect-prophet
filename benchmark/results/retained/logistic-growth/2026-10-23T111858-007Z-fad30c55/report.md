# Effect Prophet benchmark — 2026-10-23T111858-007Z-fad30c55

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| country-us-logistic-additive | equivalent-objective | passed | 1.167e-11 | 3.583e-12 | 3.583e-12 | 1.525e-11 | 2.174e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-logistic-additive | equivalent-objective | passed | 1.167e-11 | 3.583e-12 | 3.583e-12 | 1.525e-11 | 2.174e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-us-logistic-multiplicative | equivalent-objective | passed | 2.675e-9 | 1.628e-9 | 0.000e+0 | 5.343e-9 | 2.181e-10 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-logistic-multiplicative | equivalent-objective | passed | 2.675e-9 | 1.628e-9 | 0.000e+0 | 5.343e-9 | 2.181e-10 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-absmax | equivalent-objective | passed | 1.180e-11 | 2.829e-13 | 2.829e-13 | 1.208e-11 | 1.994e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-minmax | equivalent-objective | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-absmax | equivalent-objective | passed | 1.369e-11 | 3.264e-13 | 3.264e-13 | 1.384e-11 | 7.563e-15 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-minmax | equivalent-objective | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-auto-changepoints | equivalent-objective | passed | 2.389e-11 | 2.405e-13 | 2.405e-13 | 2.396e-11 | 1.941e-13 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-large | equivalent-objective | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | scalar-process-different-public-work | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | 0.440 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | scalar-process-different-public-work | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | 0.482 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | scalar-process-different-public-work | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | 0.082 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | scalar-process-different-public-work | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | 0.094 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | 0.007 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | 0.022 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | 0.022 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | 0.022 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| logistic-reconcile-basic-96-empty-absmax | equivalent-objective | passed | 3.905e-8 | 0.000e+0 | 0.000e+0 | 3.905e-8 | 1.179e-11 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-explicit-absmax | equivalent-objective | passed | 2.399e-11 | 0.000e+0 | 0.000e+0 | 2.399e-11 | 2.577e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-auto-absmax | equivalent-objective | passed | 1.273e-11 | 0.000e+0 | 0.000e+0 | 1.273e-11 | 3.247e-15 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-empty-minmax | equivalent-objective | passed | 1.559e-10 | 0.000e+0 | 0.000e+0 | 1.559e-10 | 9.770e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-explicit-minmax | equivalent-objective | passed | 3.867e-11 | 0.000e+0 | 0.000e+0 | 3.867e-11 | 2.794e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-auto-minmax | equivalent-objective | passed | 2.374e-9 | 0.000e+0 | 0.000e+0 | 2.374e-9 | 9.145e-11 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-empty-loose-prior-absmax | equivalent-objective | passed | 9.034e-9 | 0.000e+0 | 0.000e+0 | 9.034e-9 | 3.456e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-empty-loose-prior-minmax | equivalent-objective | passed | 1.397e-11 | 0.000e+0 | 0.000e+0 | 1.397e-11 | 3.443e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-99 | equivalent-objective | passed | 3.772e-11 | 0.000e+0 | 0.000e+0 | 3.772e-11 | 5.922e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-100 | equivalent-objective | passed | 4.670e-11 | 0.000e+0 | 0.000e+0 | 4.670e-11 | 4.095e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-256 | equivalent-objective | passed | 2.169e-11 | 0.000e+0 | 0.000e+0 | 2.169e-11 | 4.034e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-defaults-96 | equivalent-objective | passed | 2.965e-9 | 2.560e-10 | 2.560e-10 | 3.077e-9 | 1.086e-10 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-defaults-256 | equivalent-objective | passed | 1.133e-3 | 1.273e-5 | 1.273e-5 | 1.122e-3 | 7.028e-4 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| logistic-reconcile-defaults-rate-changes | equivalent-objective | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| logistic-reconcile-weekly | equivalent-objective | passed | 5.460e-8 | 3.208e-8 | 3.208e-8 | 8.668e-8 | 5.013e-9 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-conditional | equivalent-objective | passed | 4.785e-11 | 4.619e-13 | 4.619e-13 | 4.808e-11 | 2.232e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-event | equivalent-objective | passed | 3.766e-11 | 4.705e-12 | 4.705e-12 | 4.074e-11 | 2.844e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-regressor-additive | equivalent-objective | passed | 1.130e-11 | 1.915e-12 | 1.915e-12 | 1.133e-11 | 1.733e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-regressor-multiplicative | equivalent-objective | passed | 4.558e-11 | 4.103e-12 | 0.000e+0 | 4.840e-11 | 4.628e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-explicit-floor-absmax | equivalent-objective | passed | 4.539e-11 | 0.000e+0 | 0.000e+0 | 4.539e-11 | 2.362e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-mixed-absmax | equivalent-objective | passed | 4.205e-11 | 3.521e-12 | 3.561e-12 | 4.330e-11 | 1.402e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-explicit-floor-minmax | equivalent-objective | passed | 3.185e-11 | 0.000e+0 | 0.000e+0 | 3.185e-11 | 1.549e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-mixed-minmax | equivalent-objective | passed | 4.333e-11 | 3.867e-12 | 3.997e-12 | 4.559e-11 | 2.427e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-unsorted | equivalent-objective | passed | 2.399e-11 | 0.000e+0 | 0.000e+0 | 2.399e-11 | 2.577e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-duplicates | equivalent-objective | passed | 2.563e-11 | 0.000e+0 | 0.000e+0 | 2.563e-11 | 2.678e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-declining | equivalent-objective | passed | 3.874e-11 | 0.000e+0 | 0.000e+0 | 3.874e-11 | 6.897e-15 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-saturated | equivalent-objective | passed | 1.005e-9 | 0.000e+0 | 0.000e+0 | 1.005e-9 | 2.266e-10 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-constant | equivalent-objective | passed | 7.894e-12 | 0.000e+0 | 0.000e+0 | 7.894e-12 | 4.140e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-out-of-bounds | equivalent-objective | passed | 4.331e-8 | 0.000e+0 | 0.000e+0 | 4.331e-8 | 4.639e-8 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3839 | 30576 |

## Stationarity diagnostics

Constrained normalized infinity-norm residuals at independently fitted endpoints, not a same-point gradient comparison. Deltas within the Laplace kink tolerance use the subgradient interval on both sides. Equality-gate rows bound the absolute difference. Output-first rows never gate eligibility; they are flagged for investigation when Effect's residual exceeds Python's by more than the declared threshold. Diagnostic-only rows do not certify near-stationarity; EP-097 owns that deferred requirement. Forecast, component, metadata, persistence and applicable uncertainty gates always apply; density and normalized noise also gate except under output-first.

| Case | Run | Effect residual | Python residual | Absolute difference | Policy | Follow-up |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| country-us-logistic-additive | 0 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-us-logistic-additive | 1 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-explicit-us-logistic-additive | 0 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-explicit-us-logistic-additive | 1 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-us-logistic-multiplicative | 0 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| country-us-logistic-multiplicative | 1 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| country-explicit-us-logistic-multiplicative | 0 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| country-explicit-us-logistic-multiplicative | 1 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| logistic-implicit-floor-absmax | 0 | 2.775607e+0 | 2.775607e+0 | 6.245631e-8 | output-first | n/a |
| logistic-implicit-floor-absmax | 1 | 2.775607e+0 | 2.775607e+0 | 6.245631e-8 | output-first | n/a |
| logistic-implicit-floor-minmax | 0 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| logistic-implicit-floor-minmax | 1 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| logistic-explicit-floor-absmax | 0 | 2.998344e+0 | 2.998344e+0 | 1.578685e-8 | output-first | n/a |
| logistic-explicit-floor-absmax | 1 | 2.998344e+0 | 2.998344e+0 | 1.578685e-8 | output-first | n/a |
| logistic-explicit-floor-minmax | 0 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| logistic-explicit-floor-minmax | 1 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| logistic-implicit-floor-auto-changepoints | 0 | 2.795426e-1 | 2.795426e-1 | 1.026899e-8 | output-first | n/a |
| logistic-implicit-floor-auto-changepoints | 1 | 2.795426e-1 | 2.795426e-1 | 1.026899e-8 | output-first | n/a |
| logistic-implicit-floor-large | 0 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| logistic-implicit-floor-large | 1 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 0 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 1 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 0 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 1 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | 0 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | 1 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 0 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 1 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | 0 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | 1 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | 0 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | 1 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | 0 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | 1 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | 0 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | 1 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| logistic-reconcile-basic-96-empty-absmax | 0 | 5.596132e+1 | 5.596157e+1 | 2.453791e-4 | output-first | n/a |
| logistic-reconcile-basic-96-empty-absmax | 1 | 5.596132e+1 | 5.596157e+1 | 2.453791e-4 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-absmax | 0 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-absmax | 1 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-basic-96-auto-absmax | 0 | 5.778612e+0 | 5.778612e+0 | 1.073255e-8 | output-first | n/a |
| logistic-reconcile-basic-96-auto-absmax | 1 | 5.778612e+0 | 5.778612e+0 | 1.073255e-8 | output-first | n/a |
| logistic-reconcile-basic-96-empty-minmax | 0 | 3.851771e-2 | 3.851771e-2 | 4.093843e-10 | output-first | n/a |
| logistic-reconcile-basic-96-empty-minmax | 1 | 3.851771e-2 | 3.851771e-2 | 4.093843e-10 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-minmax | 0 | 2.627372e-1 | 2.627371e-1 | 4.410863e-8 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-minmax | 1 | 2.627372e-1 | 2.627371e-1 | 4.410863e-8 | output-first | n/a |
| logistic-reconcile-basic-96-auto-minmax | 0 | 7.819626e-1 | 7.819642e-1 | 1.545846e-6 | output-first | n/a |
| logistic-reconcile-basic-96-auto-minmax | 1 | 7.819626e-1 | 7.819642e-1 | 1.545846e-6 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-absmax | 0 | 2.334662e+0 | 2.334678e+0 | 1.559136e-5 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-absmax | 1 | 2.334662e+0 | 2.334678e+0 | 1.559136e-5 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-minmax | 0 | 5.898676e-2 | 5.898682e-2 | 5.426538e-8 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-minmax | 1 | 5.898676e-2 | 5.898682e-2 | 5.426538e-8 | output-first | n/a |
| logistic-reconcile-basic-99 | 0 | 6.445543e+0 | 6.445544e+0 | 3.002141e-7 | output-first | n/a |
| logistic-reconcile-basic-99 | 1 | 6.445543e+0 | 6.445544e+0 | 3.002141e-7 | output-first | n/a |
| logistic-reconcile-basic-100 | 0 | 9.730062e+1 | 9.730062e+1 | 2.132167e-7 | output-first | n/a |
| logistic-reconcile-basic-100 | 1 | 9.730062e+1 | 9.730062e+1 | 2.132167e-7 | output-first | n/a |
| logistic-reconcile-basic-256 | 0 | 1.724594e+1 | 1.724585e+1 | 8.251495e-5 | output-first | n/a |
| logistic-reconcile-basic-256 | 1 | 1.724594e+1 | 1.724585e+1 | 8.251495e-5 | output-first | n/a |
| logistic-reconcile-defaults-96 | 0 | 7.692917e+0 | 7.692919e+0 | 1.480945e-6 | output-first | n/a |
| logistic-reconcile-defaults-96 | 1 | 7.692917e+0 | 7.692919e+0 | 1.480945e-6 | output-first | n/a |
| logistic-reconcile-defaults-256 | 0 | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | output-first | n/a |
| logistic-reconcile-defaults-256 | 1 | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | output-first | n/a |
| logistic-reconcile-defaults-rate-changes | 0 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| logistic-reconcile-defaults-rate-changes | 1 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| logistic-reconcile-weekly | 0 | 1.541596e-3 | 3.019356e-2 | 2.865197e-2 | output-first | n/a |
| logistic-reconcile-weekly | 1 | 1.541596e-3 | 3.019356e-2 | 2.865197e-2 | output-first | n/a |
| logistic-reconcile-conditional | 0 | 2.659943e-2 | 2.660012e-2 | 6.835484e-7 | output-first | n/a |
| logistic-reconcile-conditional | 1 | 2.659943e-2 | 2.660012e-2 | 6.835484e-7 | output-first | n/a |
| logistic-reconcile-event | 0 | 3.346656e+0 | 3.346656e+0 | 1.451913e-7 | output-first | n/a |
| logistic-reconcile-event | 1 | 3.346656e+0 | 3.346656e+0 | 1.451913e-7 | output-first | n/a |
| logistic-reconcile-regressor-additive | 0 | 2.139794e-2 | 2.139802e-2 | 7.703051e-8 | output-first | n/a |
| logistic-reconcile-regressor-additive | 1 | 2.139794e-2 | 2.139802e-2 | 7.703051e-8 | output-first | n/a |
| logistic-reconcile-regressor-multiplicative | 0 | 3.828836e-1 | 3.828834e-1 | 2.333604e-7 | output-first | n/a |
| logistic-reconcile-regressor-multiplicative | 1 | 3.828836e-1 | 3.828834e-1 | 2.333604e-7 | output-first | n/a |
| logistic-reconcile-explicit-floor-absmax | 0 | 2.905198e-3 | 2.905296e-3 | 9.777836e-8 | output-first | n/a |
| logistic-reconcile-explicit-floor-absmax | 1 | 2.905198e-3 | 2.905296e-3 | 9.777836e-8 | output-first | n/a |
| logistic-reconcile-mixed-absmax | 0 | 3.549139e+0 | 3.549139e+0 | 3.679589e-8 | output-first | n/a |
| logistic-reconcile-mixed-absmax | 1 | 3.549139e+0 | 3.549139e+0 | 3.679589e-8 | output-first | n/a |
| logistic-reconcile-explicit-floor-minmax | 0 | 1.667647e-3 | 1.624910e-3 | 4.273681e-5 | output-first | n/a |
| logistic-reconcile-explicit-floor-minmax | 1 | 1.667647e-3 | 1.624910e-3 | 4.273681e-5 | output-first | n/a |
| logistic-reconcile-mixed-minmax | 0 | 4.698194e+0 | 4.698195e+0 | 7.219327e-8 | output-first | n/a |
| logistic-reconcile-mixed-minmax | 1 | 4.698194e+0 | 4.698195e+0 | 7.219327e-8 | output-first | n/a |
| logistic-reconcile-unsorted | 0 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-unsorted | 1 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-duplicates | 0 | 6.305502e-3 | 6.305381e-3 | 1.217013e-7 | output-first | n/a |
| logistic-reconcile-duplicates | 1 | 6.305502e-3 | 6.305381e-3 | 1.217013e-7 | output-first | n/a |
| logistic-reconcile-declining | 0 | 3.123213e-3 | 3.150439e-3 | 2.722630e-5 | output-first | n/a |
| logistic-reconcile-declining | 1 | 3.123213e-3 | 3.150439e-3 | 2.722630e-5 | output-first | n/a |
| logistic-reconcile-saturated | 0 | 2.054553e+1 | 2.054664e+1 | 1.118189e-3 | output-first | n/a |
| logistic-reconcile-saturated | 1 | 2.054553e+1 | 2.054664e+1 | 1.118189e-3 | output-first | n/a |
| logistic-reconcile-constant | 0 | 3.285123e+1 | 3.285234e+1 | 1.112908e-3 | output-first | n/a |
| logistic-reconcile-constant | 1 | 3.285123e+1 | 3.285234e+1 | 1.112908e-3 | output-first | n/a |
| logistic-reconcile-out-of-bounds | 0 | 1.200530e+0 | 1.200504e+0 | 2.595364e-5 | output-first | n/a |
| logistic-reconcile-out-of-bounds | 1 | 1.200530e+0 | 1.200504e+0 | 2.595364e-5 | output-first | n/a |

## Output-first investigation flags

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's.

| Case | Run | Quantity | Effect | Python | Effect - Python | Threshold |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| logistic-implicit-floor-large | 0 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| logistic-implicit-floor-large | 1 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 0 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 0 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 1 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 1 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 0 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 0 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 1 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 1 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 0 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 1 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 0 | objective | -1.786030e+3 | -1.786061e+3 | 3.122188e-2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 0 | stationarity-residual | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 1 | objective | -1.786030e+3 | -1.786061e+3 | 3.122188e-2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 1 | stationarity-residual | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 0 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 0 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 1 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 1 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 365 | 6 | 25 | 455 | 455 | 90 | 1000 | intervals | 67108864 | logistic-rate-changes-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10:changing-capacity:n=365:h=90 / a2b86c23197e401e7531c84acd97a4af204be36a92bcf992ce229f99096fe628 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 365 | 6 | 25 | 455 | 455 | 90 | 1000 | intervals | 67108864 | logistic-rate-changes-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10:changing-capacity:n=365:h=90 / a2b86c23197e401e7531c84acd97a4af204be36a92bcf992ce229f99096fe628 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | 96 | 4 | 1 | 24 | 24 | 24 | 512 | samples | 67108864 | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 256 | 4 | 1 | 64 | 64 | 64 | 128 | intervals | 67108864 | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | 96 | 5 | 1 | 24 | 24 | 24 | 512 | intervals | 67108864 | logistic-explicit-floor-v1:n=96:h=24:changing-capacity:weekly / c6fa262b4fd7353c7113029e7863b000afba00ec339f72dfaaa26b08a76a0f9b | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | 96 | 5 | 1 | 24 | 24 | 24 | 128 | samples | 67108864 | logistic-explicit-floor-v1:n=96:h=24:changing-capacity:weekly / c6fa262b4fd7353c7113029e7863b000afba00ec339f72dfaaa26b08a76a0f9b | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | 96 | 6 | 1 | 24 | 24 | 24 | 128 | intervals | 67108864 | logistic-uncertainty-mixed-v1:n=96:h=24:changing-capacity-floor+conditional-weekly+campaign+promotion / 6dd8e686d92b341795f6e1f4cf7be9c247ccdb275ca309059fd9114369416767 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | 96 | 6 | 1 | 24 | 24 | 24 | 128 | samples | 67108864 | logistic-uncertainty-mixed-v1:n=96:h=24:changing-capacity-floor+conditional-weekly+campaign+promotion / 6dd8e686d92b341795f6e1f4cf7be9c247ccdb275ca309059fd9114369416767 | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.019 | 0.025 | 0.016 | 0.025 | 137.5 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.524 | 0.448 | 0.524 | 128.2 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 216.910 | 242.577 | 202.801 | 242.577 | 161.0 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1461.738 | 1519.617 | 1445.958 | 1519.617 | 128.2 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.910 | 163.907 | 155.855 | 163.907 | 161.5 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1427.934 | 1469.685 | 1409.360 | 1469.685 | 128.2 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.418 | 0.759 | 0.397 | 0.759 | 161.5 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.178 | 4.227 | 4.014 | 4.227 | 128.2 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.025 | 0.053 | 0.020 | 0.053 | 161.2 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.699 | 0.726 | 0.690 | 0.726 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.751 | 41.067 | 30.117 | 41.067 | 160.7 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 54.842 | 55.146 | 54.161 | 55.146 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 32.776 | 41.077 | 30.491 | 41.077 | 160.7 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 54.247 | 55.316 | 53.468 | 55.316 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.347 | 44.991 | 30.504 | 44.991 | 150.6 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 49.632 | 50.730 | 49.184 | 50.730 | 128.2 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.213 | 0.233 | 0.191 | 0.233 | 153.1 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.769 | 4.849 | 4.740 | 4.849 | 128.2 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.040 | 0.016 | 0.040 | 139.6 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.522 | 0.736 | 0.489 | 0.736 | 128.2 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 212.303 | 255.358 | 209.928 | 255.358 | 159.5 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1479.646 | 1556.376 | 1455.787 | 1556.376 | 128.2 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 154.922 | 164.765 | 149.591 | 164.765 | 160.0 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1418.448 | 1444.577 | 1405.536 | 1444.577 | 128.2 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.372 | 0.492 | 0.339 | 0.492 | 159.8 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.095 | 4.184 | 4.013 | 4.184 | 128.2 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.033 | 0.048 | 0.022 | 0.048 | 159.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.717 | 0.738 | 0.700 | 0.738 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 42.582 | 43.801 | 42.068 | 43.801 | 159.3 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 62.254 | 65.219 | 62.142 | 65.219 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 42.758 | 43.545 | 42.434 | 43.545 | 159.3 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 62.482 | 63.282 | 61.979 | 63.282 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.261 | 44.142 | 42.889 | 44.142 | 150.1 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 58.101 | 59.753 | 57.575 | 59.753 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.202 | 0.214 | 0.172 | 0.214 | 152.5 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.785 | 4.895 | 4.780 | 4.895 | 128.2 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.019 | 0.054 | 0.017 | 0.054 | 143.3 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.500 | 1.272 | 0.456 | 1.272 | 146.8 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 240.209 | 335.321 | 205.397 | 335.321 | 163.3 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1654.461 | 1839.607 | 1634.887 | 1839.607 | 146.8 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 165.003 | 197.398 | 157.116 | 197.398 | 163.9 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1578.933 | 1637.103 | 1569.062 | 1637.103 | 146.8 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 1.079 | 2.570 | 0.818 | 2.570 | 163.9 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.998 | 4.209 | 3.961 | 4.209 | 146.8 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.109 | 0.119 | 0.095 | 0.119 | 163.4 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.668 | 0.754 | 0.656 | 0.754 | 146.8 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 39.388 | 40.535 | 38.040 | 40.535 | 163.3 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 60.498 | 63.896 | 58.561 | 63.896 | 146.8 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 40.219 | 41.499 | 37.996 | 41.499 | 162.6 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 59.742 | 84.417 | 59.172 | 84.417 | 146.8 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 45.378 | 50.541 | 44.400 | 50.541 | 161.9 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 55.096 | 58.370 | 54.183 | 58.370 | 146.8 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.413 | 0.512 | 0.232 | 0.512 | 162.1 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.862 | 7.973 | 5.612 | 7.973 | 146.8 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.031 | 0.014 | 0.031 | 140.4 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.480 | 0.504 | 0.455 | 0.504 | 147.9 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 216.260 | 233.398 | 211.022 | 233.398 | 157.9 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1642.028 | 1662.579 | 1620.075 | 1662.579 | 147.9 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 160.198 | 162.405 | 155.479 | 162.405 | 158.6 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1571.585 | 1888.537 | 1562.681 | 1888.537 | 147.9 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.848 | 1.608 | 0.700 | 1.608 | 158.5 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.032 | 4.246 | 3.978 | 4.246 | 147.9 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.102 | 0.118 | 0.091 | 0.118 | 157.9 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.700 | 0.766 | 0.670 | 0.766 | 147.9 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.777 | 44.588 | 43.366 | 44.588 | 157.8 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 66.489 | 66.648 | 65.635 | 66.648 | 147.9 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 44.134 | 44.895 | 43.419 | 44.895 | 157.2 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 65.918 | 67.351 | 65.489 | 67.351 | 147.9 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 45.485 | 46.478 | 44.746 | 46.478 | 156.5 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 60.233 | 61.002 | 59.912 | 61.002 | 147.9 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.275 | 0.356 | 0.223 | 0.356 | 156.5 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.523 | 5.743 | 5.445 | 5.743 | 147.9 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 19.483 | 20.909 | 19.390 | 20.909 | 149.4 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 63.616 | 67.493 | 63.560 | 67.493 | 128.2 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 15.887 | 16.741 | 15.764 | 16.741 | 159.6 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 57.561 | 59.085 | 56.884 | 59.085 | 128.2 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 196.549 | 227.377 | 193.343 | 227.377 | 160.7 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1440.389 | 1468.766 | 1436.687 | 1468.766 | 128.2 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.256 | 3.298 | 2.216 | 3.298 | 160.5 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.306 | 1.398 | 1.301 | 1.398 | 128.2 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.052 | 0.119 | 0.047 | 0.119 | 128.5 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.466 | 0.531 | 0.436 | 0.531 | 128.2 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.057 | 0.097 | 0.051 | 0.097 | 159.9 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.386 | 5.639 | 5.385 | 5.639 | 128.2 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 2.349 | 3.254 | 1.965 | 3.254 | 137.2 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.727 | 0.760 | 0.718 | 0.760 | 128.2 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.732 | 25.288 | 13.237 | 25.288 | 159.7 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 42.103 | 42.999 | 41.695 | 42.999 | 128.2 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 217.241 | 368.793 | 201.967 | 368.793 | 156.2 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1466.055 | 1497.814 | 1449.286 | 1497.814 | 128.2 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.653 | 1.904 | 1.642 | 1.904 | 156.0 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.781 | 0.806 | 0.744 | 0.806 | 128.2 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.017 | 0.032 | 0.016 | 0.032 | 126.8 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.410 | 0.416 | 0.358 | 0.416 | 128.2 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.069 | 0.094 | 0.053 | 0.094 | 153.9 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.146 | 5.318 | 5.146 | 5.318 | 128.2 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.152 | 1.420 | 1.012 | 1.420 | 131.0 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.531 | 0.556 | 0.521 | 0.556 | 128.2 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 16.981 | 21.089 | 16.215 | 21.089 | 153.9 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 59.084 | 59.631 | 58.560 | 59.631 | 128.2 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.344 | 17.563 | 17.332 | 17.563 | 164.9 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 30.503 | 33.379 | 29.817 | 33.379 | 128.2 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.169 | 0.783 | 0.158 | 0.783 | 165.8 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.2 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.296 | 0.338 | 0.294 | 0.338 | 165.2 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.012 | 0.023 | 0.011 | 0.023 | 128.2 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 37.954 | 38.197 | 37.034 | 38.197 | 164.7 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 113.385 | 114.403 | 112.377 | 114.403 | 128.2 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.048 | 0.063 | 0.041 | 0.063 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.533 | 0.560 | 0.517 | 0.560 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 185.522 | 186.139 | 184.506 | 186.139 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1446.688 | 1463.737 | 1439.867 | 1463.737 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.694 | 160.865 | 151.059 | 160.865 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1412.032 | 1840.734 | 1402.680 | 1840.734 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.082 | 0.112 | 0.076 | 0.112 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.476 | 2.542 | 2.469 | 2.542 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.047 | 0.095 | 0.030 | 0.095 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.458 | 0.558 | 0.454 | 0.558 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.624 | 20.843 | 20.587 | 20.843 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.659 | 36.841 | 36.465 | 36.841 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.377 | 22.837 | 21.353 | 22.837 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.420 | 43.819 | 35.240 | 43.819 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 20.985 | 21.177 | 20.868 | 21.177 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.892 | 34.825 | 32.107 | 34.825 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.396 | 0.413 | 0.356 | 0.413 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.530 | 3.803 | 3.509 | 3.803 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.042 | 0.047 | 0.037 | 0.047 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.483 | 0.500 | 0.478 | 0.500 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 192.665 | 204.376 | 189.886 | 204.376 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1437.426 | 1458.079 | 1433.879 | 1458.079 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.636 | 180.717 | 156.716 | 180.717 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1395.546 | 1412.784 | 1395.031 | 1412.784 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.104 | 0.271 | 0.089 | 0.271 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.521 | 2.600 | 2.497 | 2.600 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.044 | 0.081 | 0.028 | 0.081 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.472 | 0.524 | 0.452 | 0.524 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.144 | 17.206 | 17.076 | 17.206 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 31.017 | 31.405 | 30.995 | 31.405 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 18.229 | 19.153 | 17.741 | 19.153 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.199 | 38.664 | 29.569 | 38.664 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.269 | 17.526 | 17.239 | 17.526 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.426 | 28.961 | 26.298 | 28.961 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.378 | 0.462 | 0.357 | 0.462 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.633 | 3.810 | 3.612 | 3.810 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.044 | 0.017 | 0.044 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.465 | 0.485 | 0.455 | 0.485 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 180.311 | 185.564 | 179.394 | 185.564 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1439.692 | 1472.835 | 1430.267 | 1472.835 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.644 | 178.849 | 151.905 | 178.849 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1415.638 | 1422.174 | 1409.930 | 1422.174 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.081 | 0.102 | 0.073 | 0.102 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.237 | 2.379 | 2.230 | 2.379 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.042 | 0.028 | 0.042 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.450 | 0.494 | 0.437 | 0.494 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.134 | 20.270 | 18.801 | 20.270 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 31.957 | 32.030 | 31.944 | 32.030 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.048 | 19.433 | 18.958 | 19.433 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 31.446 | 31.627 | 31.288 | 31.627 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 18.854 | 20.353 | 18.838 | 20.353 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.197 | 28.518 | 27.822 | 28.518 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.232 | 0.250 | 0.219 | 0.250 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.123 | 3.209 | 3.088 | 3.209 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.027 | 0.017 | 0.027 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.464 | 0.495 | 0.453 | 0.495 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 182.078 | 196.460 | 178.725 | 196.460 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1439.691 | 1469.738 | 1425.648 | 1469.738 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 154.255 | 158.647 | 153.696 | 158.647 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1424.982 | 1486.774 | 1412.197 | 1486.774 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.091 | 0.111 | 0.088 | 0.111 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.392 | 2.534 | 2.360 | 2.534 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.027 | 0.049 | 0.026 | 0.049 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.456 | 0.468 | 0.411 | 0.468 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.075 | 20.310 | 18.798 | 20.310 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 32.494 | 33.122 | 32.069 | 33.122 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.037 | 19.112 | 18.989 | 19.112 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.040 | 32.360 | 31.427 | 32.360 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.850 | 20.443 | 18.431 | 20.443 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 28.762 | 29.130 | 27.975 | 29.130 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.226 | 0.236 | 0.218 | 0.236 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.134 | 3.160 | 3.126 | 3.160 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.069 | 0.084 | 0.066 | 0.084 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.593 | 0.697 | 0.571 | 0.697 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 174.426 | 192.986 | 169.537 | 192.986 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1416.658 | 1420.959 | 1409.697 | 1420.959 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 154.605 | 163.352 | 154.246 | 163.352 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1407.506 | 1419.836 | 1397.880 | 1419.836 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.091 | 0.120 | 0.073 | 0.120 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.570 | 2.794 | 2.464 | 2.794 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.050 | 0.025 | 0.050 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.626 | 0.661 | 0.625 | 0.661 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.162 | 4.366 | 4.117 | 4.366 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.845 | 17.324 | 13.536 | 17.324 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.357 | 4.918 | 4.261 | 4.918 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.606 | 15.114 | 12.543 | 15.114 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 5.183 | 5.378 | 5.061 | 5.378 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.440 | 10.308 | 9.384 | 10.308 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.413 | 0.455 | 0.390 | 0.455 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.193 | 3.236 | 3.169 | 3.236 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.019 | 0.027 | 0.018 | 0.027 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.484 | 0.603 | 0.464 | 0.603 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 185.950 | 188.984 | 184.031 | 188.984 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1441.537 | 1447.556 | 1427.523 | 1447.556 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.733 | 159.518 | 154.340 | 159.518 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1395.777 | 1401.343 | 1391.920 | 1401.343 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.096 | 0.118 | 0.077 | 0.118 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.265 | 2.385 | 2.221 | 2.385 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.033 | 0.041 | 0.026 | 0.041 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.447 | 0.491 | 0.418 | 0.491 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.434 | 21.973 | 20.199 | 21.973 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.205 | 35.298 | 35.116 | 35.298 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.546 | 21.159 | 20.522 | 21.159 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 35.045 | 35.449 | 34.676 | 35.449 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.801 | 22.051 | 20.717 | 22.051 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 31.546 | 33.630 | 30.850 | 33.630 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.231 | 0.322 | 0.227 | 0.322 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.129 | 3.390 | 3.123 | 3.390 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 153.261 | 169.441 | 151.536 | 169.441 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1456.152 | 1544.001 | 1414.144 | 1544.001 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.168 | 0.206 | 0.142 | 0.206 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.215 | 2.318 | 2.208 | 2.318 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.023 | 0.034 | 0.021 | 0.034 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.462 | 0.471 | 0.420 | 0.471 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 2.087 | 4.980 | 1.688 | 4.980 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.927 | 6.419 | 5.816 | 6.419 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.878 | 0.922 | 0.679 | 0.922 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.879 | 2.912 | 2.845 | 2.912 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 156.062 | 167.084 | 155.574 | 167.084 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1411.561 | 1429.367 | 1406.192 | 1429.367 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.133 | 0.138 | 0.118 | 0.138 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.476 | 2.566 | 2.460 | 2.566 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.019 | 0.040 | 0.018 | 0.040 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.633 | 0.700 | 0.611 | 0.700 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.973 | 3.146 | 2.856 | 3.146 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.548 | 8.701 | 7.022 | 8.701 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.072 | 1.121 | 1.071 | 1.121 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.983 | 3.229 | 2.936 | 3.229 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.208 | 187.551 | 156.002 | 187.551 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1405.851 | 1454.920 | 1398.970 | 1454.920 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.161 | 0.184 | 0.158 | 0.184 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.178 | 2.235 | 2.170 | 2.235 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.058 | 0.025 | 0.058 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.415 | 0.438 | 0.402 | 0.438 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 20.452 | 22.040 | 19.307 | 22.040 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 26.748 | 27.191 | 26.393 | 27.191 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.897 | 0.937 | 0.717 | 0.937 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.831 | 2.868 | 2.822 | 2.868 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.765 | 173.385 | 156.937 | 173.385 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1413.657 | 1493.592 | 1400.695 | 1493.592 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.173 | 0.201 | 0.151 | 0.201 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.237 | 2.294 | 2.229 | 2.294 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.030 | 0.022 | 0.030 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.438 | 0.451 | 0.410 | 0.451 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.800 | 10.986 | 9.385 | 10.986 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.207 | 19.121 | 16.776 | 19.121 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.893 | 1.094 | 0.704 | 1.094 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.880 | 3.832 | 2.852 | 3.832 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.139 | 163.237 | 152.093 | 163.237 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1403.741 | 1422.125 | 1403.282 | 1422.125 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.236 | 0.141 | 0.236 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.033 | 2.079 | 2.025 | 2.079 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.041 | 0.020 | 0.041 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.424 | 0.441 | 0.413 | 0.441 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.752 | 10.199 | 6.748 | 10.199 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.472 | 13.132 | 12.429 | 13.132 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.723 | 0.892 | 0.721 | 0.892 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.941 | 2.975 | 2.883 | 2.975 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.270 | 160.684 | 154.955 | 160.684 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1412.551 | 1556.833 | 1406.206 | 1556.833 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.171 | 0.177 | 0.134 | 0.177 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.088 | 2.374 | 2.071 | 2.374 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.020 | 0.028 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.457 | 0.524 | 0.435 | 0.524 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.494 | 9.689 | 8.458 | 9.689 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.801 | 18.989 | 15.507 | 18.989 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.789 | 0.947 | 0.718 | 0.947 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.974 | 3.226 | 2.900 | 3.226 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.954 | 161.973 | 156.382 | 161.973 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1411.109 | 1460.402 | 1404.317 | 1460.402 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.148 | 0.223 | 0.134 | 0.223 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.226 | 2.294 | 2.226 | 2.294 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.035 | 0.026 | 0.035 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.456 | 0.492 | 0.427 | 0.492 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 8.191 | 9.406 | 8.054 | 9.406 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 14.843 | 15.643 | 14.733 | 15.643 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.843 | 0.889 | 0.694 | 0.889 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.974 | 3.064 | 2.949 | 3.064 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.923 | 159.595 | 154.724 | 159.595 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1397.975 | 1411.016 | 1395.342 | 1411.016 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.160 | 0.248 | 0.139 | 0.248 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.188 | 2.256 | 2.176 | 2.256 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.058 | 0.027 | 0.058 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.418 | 0.438 | 0.403 | 0.438 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 17.053 | 18.174 | 16.478 | 18.174 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 23.609 | 24.141 | 23.369 | 24.141 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.751 | 1.381 | 0.735 | 1.381 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.848 | 2.908 | 2.794 | 2.908 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 152.882 | 155.032 | 152.811 | 155.032 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1419.265 | 1496.529 | 1414.042 | 1496.529 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.147 | 0.162 | 0.134 | 0.162 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.188 | 2.248 | 2.169 | 2.248 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.026 | 0.030 | 0.021 | 0.030 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.434 | 0.449 | 0.420 | 0.449 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 17.080 | 18.171 | 16.802 | 18.171 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.457 | 25.276 | 24.334 | 25.276 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.886 | 0.967 | 0.849 | 0.967 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.860 | 2.961 | 2.829 | 2.961 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 153.975 | 161.398 | 153.861 | 161.398 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1414.042 | 1737.883 | 1403.483 | 1737.883 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.135 | 0.155 | 0.129 | 0.155 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.474 | 3.526 | 2.470 | 3.526 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.023 | 0.038 | 0.022 | 0.038 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.453 | 0.533 | 0.450 | 0.533 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.050 | 17.719 | 16.046 | 17.719 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 27.122 | 30.630 | 26.612 | 30.630 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.092 | 1.166 | 1.061 | 1.166 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.689 | 4.361 | 3.582 | 4.361 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 155.126 | 163.245 | 151.118 | 163.245 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1416.909 | 1440.630 | 1393.630 | 1440.630 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.163 | 0.182 | 0.161 | 0.182 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.186 | 2.264 | 2.181 | 2.264 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.028 | 0.030 | 0.023 | 0.030 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.423 | 0.429 | 0.418 | 0.429 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 17.189 | 18.913 | 16.611 | 18.913 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.184 | 25.271 | 24.390 | 25.271 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.896 | 1.107 | 0.711 | 1.107 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.839 | 2.886 | 2.820 | 2.886 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 160.675 | 164.794 | 160.105 | 164.794 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1408.411 | 1435.963 | 1404.594 | 1435.963 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.185 | 0.286 | 0.172 | 0.286 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.172 | 2.201 | 2.161 | 2.201 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.027 | 0.042 | 0.022 | 0.042 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.434 | 0.449 | 0.423 | 0.449 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 8.123 | 10.003 | 6.439 | 10.003 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.281 | 13.898 | 13.275 | 13.898 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.754 | 0.990 | 0.668 | 0.990 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.870 | 2.930 | 2.830 | 2.930 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 165.770 | 170.849 | 160.266 | 170.849 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1423.955 | 1472.823 | 1409.837 | 1472.823 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.196 | 0.205 | 0.135 | 0.205 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.599 | 2.696 | 2.529 | 2.696 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.016 | 0.022 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.634 | 0.664 | 0.628 | 0.664 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.166 | 39.192 | 38.154 | 39.192 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 39.003 | 44.841 | 38.302 | 44.841 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.168 | 1.322 | 1.147 | 1.322 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.463 | 3.719 | 3.377 | 3.719 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 156.234 | 194.530 | 151.057 | 194.530 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1404.948 | 1416.391 | 1396.803 | 1416.391 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.186 | 0.244 | 0.185 | 0.244 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.311 | 2.448 | 2.284 | 2.448 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.024 | 0.027 | 0.023 | 0.027 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.452 | 0.471 | 0.437 | 0.471 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.259 | 103.163 | 100.700 | 103.163 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 120.856 | 121.899 | 120.840 | 121.899 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.040 | 1.127 | 0.993 | 1.127 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.414 | 3.473 | 3.407 | 3.473 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 166.056 | 166.927 | 163.982 | 166.927 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1425.831 | 1446.320 | 1415.056 | 1446.320 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.137 | 0.186 | 0.125 | 0.186 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.812 | 2.886 | 2.801 | 2.886 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.021 | 0.052 | 0.020 | 0.052 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.747 | 0.785 | 0.747 | 0.785 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 133.571 | 135.896 | 132.579 | 135.896 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 112.632 | 113.782 | 112.215 | 113.782 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.543 | 3.452 | 1.535 | 3.452 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.623 | 3.802 | 3.615 | 3.802 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 155.144 | 158.201 | 153.528 | 158.201 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1408.411 | 1422.797 | 1400.043 | 1422.797 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.136 | 0.257 | 0.135 | 0.257 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.168 | 2.225 | 2.146 | 2.225 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.029 | 0.057 | 0.025 | 0.057 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.439 | 0.451 | 0.432 | 0.451 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.332 | 11.177 | 6.092 | 11.177 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.326 | 13.662 | 13.060 | 13.662 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.863 | 1.049 | 0.666 | 1.049 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 2.997 | 3.017 | 2.958 | 3.017 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.398 | 159.161 | 154.673 | 159.161 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1415.223 | 1450.591 | 1406.699 | 1450.591 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.189 | 0.303 | 0.147 | 0.303 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.102 | 2.120 | 2.079 | 2.120 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.039 | 0.024 | 0.039 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.436 | 0.557 | 0.401 | 0.557 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 116.566 | 118.156 | 114.845 | 118.156 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 126.554 | 129.364 | 126.477 | 129.364 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.816 | 1.066 | 0.792 | 1.066 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.907 | 3.036 | 2.871 | 3.036 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.389 | 155.721 | 152.901 | 155.721 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1398.835 | 1413.583 | 1395.935 | 1413.583 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.389 | 0.134 | 0.389 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.077 | 2.227 | 2.040 | 2.227 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.033 | 0.026 | 0.033 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.425 | 0.453 | 0.418 | 0.453 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.229 | 16.066 | 15.057 | 16.066 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.153 | 20.794 | 19.879 | 20.794 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.853 | 0.881 | 0.759 | 0.881 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.910 | 2.949 | 2.873 | 2.949 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 157.376 | 171.514 | 156.172 | 171.514 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1418.606 | 1459.655 | 1412.753 | 1459.655 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.143 | 0.173 | 0.138 | 0.173 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.481 | 3.557 | 3.388 | 3.557 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.023 | 0.027 | 0.022 | 0.027 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.599 | 0.635 | 0.588 | 0.635 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.070 | 11.744 | 9.015 | 11.744 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 18.020 | 21.403 | 17.200 | 21.403 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 1.004 | 1.195 | 0.984 | 1.195 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.217 | 4.420 | 4.134 | 4.420 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.946 | 163.881 | 157.224 | 163.881 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1408.681 | 1421.281 | 1407.744 | 1421.281 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.148 | 0.235 | 0.140 | 0.235 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.183 | 2.224 | 2.169 | 2.224 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.021 | 0.029 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.425 | 0.457 | 0.420 | 0.457 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.722 | 9.430 | 6.531 | 9.430 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.255 | 14.032 | 13.161 | 14.032 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.883 | 0.990 | 0.747 | 0.990 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.809 | 3.051 | 2.773 | 3.051 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.911 | 166.453 | 155.627 | 166.453 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1431.470 | 1459.168 | 1429.750 | 1459.168 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.187 | 0.126 | 0.187 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.207 | 2.267 | 2.197 | 2.267 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.037 | 0.028 | 0.037 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.428 | 0.447 | 0.422 | 0.447 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.646 | 11.124 | 10.422 | 11.124 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 16.018 | 16.763 | 16.017 | 16.763 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.880 | 0.946 | 0.849 | 0.946 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.830 | 2.869 | 2.798 | 2.869 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.560 | 163.935 | 160.403 | 163.935 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1403.967 | 1463.320 | 1395.825 | 1463.320 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.169 | 0.186 | 0.169 | 0.186 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.694 | 3.740 | 3.658 | 3.740 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.655 | 0.719 | 0.646 | 0.719 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 27.705 | 28.936 | 27.505 | 28.936 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 43.021 | 46.741 | 42.806 | 46.741 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.898 | 2.495 | 0.894 | 2.495 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.045 | 5.164 | 5.043 | 5.164 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.857 | 168.325 | 158.978 | 168.325 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1482.268 | 1538.114 | 1470.038 | 1538.114 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.174 | 0.183 | 0.166 | 0.183 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.783 | 3.863 | 3.730 | 3.863 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.019 | 0.027 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.671 | 0.687 | 0.651 | 0.687 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 25.515 | 26.044 | 25.502 | 26.044 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 40.100 | 40.331 | 40.059 | 40.331 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.884 | 2.299 | 0.871 | 2.299 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.053 | 5.419 | 5.033 | 5.419 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 153.203 | 155.121 | 151.950 | 155.121 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1435.900 | 1463.312 | 1416.792 | 1463.312 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.165 | 0.174 | 0.143 | 0.174 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.202 | 2.225 | 2.158 | 2.225 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.025 | 0.030 | 0.025 | 0.030 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.419 | 0.449 | 0.406 | 0.449 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 9.448 | 10.204 | 9.095 | 10.204 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 15.717 | 16.552 | 15.587 | 16.552 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.739 | 0.896 | 0.621 | 0.896 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.824 | 2.856 | 2.806 | 2.856 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 157.696 | 157.902 | 157.216 | 157.902 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1407.226 | 1418.955 | 1389.234 | 1418.955 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.134 | 0.146 | 0.127 | 0.146 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.396 | 2.473 | 2.390 | 2.473 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.023 | 0.037 | 0.023 | 0.037 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.464 | 0.488 | 0.437 | 0.488 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.650 | 9.810 | 7.631 | 9.810 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 14.573 | 15.341 | 14.444 | 15.341 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.077 | 1.156 | 1.040 | 1.156 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.187 | 3.272 | 3.174 | 3.272 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 156.132 | 170.749 | 154.645 | 170.749 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1426.931 | 1436.208 | 1406.557 | 1436.208 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.113 | 0.134 | 0.107 | 0.134 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.454 | 3.148 | 2.383 | 3.148 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.025 | 0.031 | 0.023 | 0.031 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.498 | 0.535 | 0.489 | 0.535 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.927 | 10.689 | 9.404 | 10.689 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 16.908 | 17.552 | 16.652 | 17.552 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.099 | 1.357 | 1.092 | 1.357 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.285 | 3.427 | 3.189 | 3.427 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 156.096 | 162.084 | 154.519 | 162.084 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1436.016 | 1456.012 | 1397.982 | 1456.012 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.147 | 0.198 | 0.145 | 0.198 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.177 | 2.227 | 2.114 | 2.227 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.025 | 0.031 | 0.021 | 0.031 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.420 | 0.445 | 0.413 | 0.445 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 12.446 | 14.173 | 10.982 | 14.173 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.933 | 18.117 | 17.421 | 18.117 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.811 | 0.984 | 0.711 | 0.984 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.840 | 2.900 | 2.816 | 2.900 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 159.136 | 162.869 | 158.562 | 162.869 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1424.369 | 1440.698 | 1407.383 | 1440.698 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.153 | 0.170 | 0.138 | 0.170 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.184 | 2.231 | 2.165 | 2.231 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.027 | 0.033 | 0.020 | 0.033 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.438 | 0.448 | 0.408 | 0.448 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.424 | 9.306 | 8.356 | 9.306 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.872 | 15.000 | 14.726 | 15.000 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.898 | 0.907 | 0.697 | 0.907 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.852 | 2.903 | 2.825 | 2.903 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 155.247 | 155.924 | 155.007 | 155.924 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1405.622 | 1420.149 | 1403.195 | 1420.149 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.156 | 0.184 | 0.150 | 0.184 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.233 | 2.329 | 2.218 | 2.329 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.023 | 0.028 | 0.023 | 0.028 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.424 | 0.440 | 0.421 | 0.440 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.036 | 16.340 | 15.026 | 16.340 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.114 | 24.829 | 23.730 | 24.829 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.022 | 1.046 | 1.006 | 1.046 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.296 | 3.364 | 3.267 | 3.364 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 186.225 | 192.005 | 183.664 | 192.005 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1530.839 | 1548.787 | 1523.288 | 1548.787 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.150 | 164.542 | 156.206 | 164.542 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1497.011 | 1550.082 | 1482.308 | 1550.082 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.169 | 0.273 | 0.148 | 0.273 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.431 | 2.655 | 2.380 | 2.655 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.033 | 0.039 | 0.031 | 0.039 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.468 | 0.491 | 0.454 | 0.491 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.045 | 0.064 | 0.040 | 0.064 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.501 | 0.557 | 0.486 | 0.557 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.961 | 3.060 | 0.890 | 3.060 | 143.2 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 90.081 | 103.829 | 89.273 | 103.829 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 185.993 | 190.566 | 183.293 | 190.566 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1459.604 | 1598.031 | 1448.365 | 1598.031 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.761 | 157.154 | 153.173 | 157.154 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1426.355 | 1455.109 | 1420.016 | 1455.109 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.164 | 0.241 | 0.149 | 0.241 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.457 | 2.531 | 2.384 | 2.531 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.032 | 0.043 | 0.029 | 0.043 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.469 | 0.575 | 0.441 | 0.575 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.040 | 0.073 | 0.038 | 0.073 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.497 | 0.511 | 0.460 | 0.511 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.592 | 2.346 | 0.586 | 2.346 | 142.1 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 24.954 | 42.275 | 23.270 | 42.275 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 189.334 | 192.654 | 186.198 | 192.654 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1504.500 | 1599.955 | 1499.840 | 1599.955 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.419 | 159.065 | 151.278 | 159.065 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1459.386 | 1484.521 | 1436.351 | 1484.521 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.214 | 0.248 | 0.171 | 0.248 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.765 | 3.935 | 3.700 | 3.935 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.033 | 0.021 | 0.033 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.678 | 0.702 | 0.651 | 0.702 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.061 | 0.089 | 0.055 | 0.089 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.531 | 0.574 | 0.514 | 0.574 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.700 | 1.193 | 0.541 | 1.193 | 144.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.090 | 41.658 | 29.716 | 41.658 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 189.765 | 198.633 | 185.731 | 198.633 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1471.748 | 1519.619 | 1459.503 | 1519.619 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.785 | 161.213 | 154.255 | 161.213 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1438.143 | 1674.185 | 1423.175 | 1674.185 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.209 | 0.234 | 0.178 | 0.234 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.835 | 3.936 | 3.699 | 3.936 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.034 | 0.023 | 0.034 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.717 | 0.737 | 0.686 | 0.737 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.063 | 0.082 | 0.053 | 0.082 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.529 | 0.580 | 0.519 | 0.580 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.776 | 1.146 | 0.557 | 1.146 | 149.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.639 | 37.503 | 24.700 | 37.503 | 128.2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 174.999 | 201.780 | 171.580 | 201.780 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1513.006 | 1568.181 | 1449.335 | 1568.181 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.065 | 174.855 | 153.324 | 174.855 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1446.656 | 1475.933 | 1426.147 | 1475.933 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.139 | 0.180 | 0.131 | 0.180 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.521 | 2.768 | 2.495 | 2.768 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.027 | 0.031 | 0.021 | 0.031 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.638 | 0.682 | 0.609 | 0.682 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.070 | 0.051 | 0.070 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.581 | 0.653 | 0.577 | 0.653 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.922 | 1.203 | 0.809 | 1.203 | 145.5 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.426 | 38.830 | 25.071 | 38.830 | 128.2 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 190.122 | 196.769 | 184.611 | 196.769 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1527.109 | 1604.633 | 1504.460 | 1604.633 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.784 | 163.753 | 153.975 | 163.753 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1501.088 | 2067.613 | 1486.679 | 2067.613 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.180 | 0.245 | 0.127 | 0.245 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.446 | 2.642 | 2.279 | 2.642 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.017 | 0.028 | 0.016 | 0.028 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.464 | 0.498 | 0.453 | 0.498 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.022 | 0.025 | 0.018 | 0.025 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.468 | 0.509 | 0.446 | 0.509 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.370 | 3.134 | 0.814 | 3.134 | 150.3 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 78.056 | 79.254 | 77.865 | 79.254 | 128.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 326.166 | 332.699 | 322.683 | 332.699 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1829.687 | 1873.738 | 1819.493 | 1873.738 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 185.874 | 201.560 | 180.990 | 201.560 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1707.411 | 1715.568 | 1701.658 | 1715.568 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.193 | 0.284 | 0.141 | 0.284 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.696 | 2.846 | 2.671 | 2.846 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.024 | 0.632 | 0.018 | 0.632 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.766 | 0.799 | 0.754 | 0.799 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.115 | 0.127 | 0.049 | 0.127 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.765 | 0.817 | 0.744 | 0.817 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.013 | 23.408 | 22.891 | 23.408 | 158.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 279.123 | 292.963 | 276.697 | 292.963 | 133.1 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 330.685 | 342.372 | 329.026 | 342.372 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1834.723 | 2230.661 | 1805.844 | 2230.661 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 185.378 | 195.385 | 180.836 | 195.385 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1713.588 | 1786.453 | 1698.615 | 1786.453 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.169 | 0.255 | 0.141 | 0.255 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.787 | 2.887 | 2.705 | 2.887 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.024 | 0.870 | 0.019 | 0.870 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.842 | 0.921 | 0.778 | 0.921 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.082 | 0.123 | 0.050 | 0.123 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.782 | 0.835 | 0.741 | 0.835 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 22.863 | 23.543 | 22.789 | 23.543 | 157.7 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 288.090 | 322.613 | 281.322 | 322.613 | 133.2 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `fad30c55c03760712503393517c093abe5d6e0c8`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
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

