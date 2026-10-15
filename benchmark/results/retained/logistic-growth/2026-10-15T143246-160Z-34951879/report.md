# Effect Prophet benchmark — 2026-10-15T143246-160Z-34951879

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| country-us-logistic-additive | equivalent-objective | passed | 1.167e-11 | 3.583e-12 | 3.583e-12 | 1.525e-11 | 2.174e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-logistic-additive | equivalent-objective | passed | 1.167e-11 | 3.583e-12 | 3.583e-12 | 1.525e-11 | 2.174e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-us-logistic-multiplicative | equivalent-objective | passed | 2.675e-9 | 1.628e-9 | 0.000e+0 | 5.343e-9 | 2.181e-10 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-logistic-multiplicative | equivalent-objective | passed | 2.675e-9 | 1.628e-9 | 0.000e+0 | 5.343e-9 | 2.181e-10 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-absmax | equivalent-objective | passed | 1.180e-11 | 2.829e-13 | 2.829e-13 | 1.208e-11 | 1.994e-14 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-minmax | equivalent-objective | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-absmax | equivalent-objective | passed | 1.369e-11 | 3.264e-13 | 3.264e-13 | 1.384e-11 | 7.563e-15 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-minmax | equivalent-objective | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-auto-changepoints | equivalent-objective | passed | 2.389e-11 | 2.405e-13 | 2.405e-13 | 2.396e-11 | 1.941e-13 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-large | equivalent-objective | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | scalar-process-different-public-work | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | 0.440 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | scalar-process-different-public-work | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | 0.482 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | scalar-process-different-public-work | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | 0.082 | Verified fitted point behavior under stage-f-logistic-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | scalar-process-different-public-work | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | 0.094 | Verified fitted point behavior under stage-f-logistic-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | 0.007 | Verified fitted point behavior under stage-f-logistic-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | 0.022 | Verified fitted point behavior under stage-f-logistic-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | 0.022 | Verified fitted point behavior under stage-f-logistic-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | 0.022 | Verified fitted point behavior under stage-f-logistic-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
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
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3839 | 30576 |

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

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling / exclude | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.026 | 0.014 | 0.026 | 139.9 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.466 | 0.514 | 0.453 | 0.514 | 128.2 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 196.857 | 208.889 | 194.283 | 208.889 | 162.9 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1461.203 | 1563.906 | 1448.531 | 1563.906 | 128.2 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 154.413 | 160.641 | 152.561 | 160.641 | 163.3 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1404.206 | 1445.090 | 1393.774 | 1445.090 | 128.2 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.348 | 0.399 | 0.345 | 0.399 | 163.3 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.975 | 4.505 | 3.924 | 4.505 | 128.2 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.028 | 0.031 | 0.018 | 0.031 | 163.3 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.701 | 0.852 | 0.682 | 0.852 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.537 | 38.880 | 30.428 | 38.880 | 162.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 56.026 | 61.996 | 54.069 | 61.996 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.937 | 40.217 | 30.582 | 40.217 | 162.7 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 53.884 | 57.111 | 53.815 | 57.111 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.846 | 39.541 | 30.815 | 39.541 | 147.2 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 49.367 | 50.491 | 48.916 | 50.491 | 128.2 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.177 | 0.220 | 0.166 | 0.220 | 149.8 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.828 | 5.473 | 4.778 | 5.473 | 128.2 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.020 | 0.016 | 0.020 | 138.7 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.486 | 0.823 | 0.467 | 0.823 | 128.2 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 210.964 | 215.771 | 208.645 | 215.771 | 161.1 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1481.874 | 1554.257 | 1468.181 | 1554.257 | 128.2 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 152.228 | 155.933 | 150.767 | 155.933 | 161.1 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1463.254 | 1665.316 | 1413.212 | 1665.316 | 128.2 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.342 | 0.470 | 0.308 | 0.470 | 161.1 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.131 | 5.806 | 4.005 | 5.806 | 128.2 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.027 | 0.034 | 0.018 | 0.034 | 161.1 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.701 | 0.837 | 0.671 | 0.837 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.119 | 43.319 | 42.824 | 43.319 | 160.7 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 62.700 | 68.243 | 61.601 | 68.243 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.261 | 43.466 | 43.089 | 43.466 | 160.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 63.063 | 69.149 | 61.513 | 69.149 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.099 | 44.936 | 43.638 | 44.936 | 145.3 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 63.060 | 73.276 | 62.349 | 73.276 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.185 | 0.193 | 0.179 | 0.193 | 147.7 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.869 | 5.665 | 4.722 | 5.665 | 128.2 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.023 | 0.031 | 0.015 | 0.031 | 142.7 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.469 | 0.493 | 0.457 | 0.493 | 146.9 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 202.616 | 221.666 | 198.916 | 221.666 | 157.8 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1614.237 | 1635.742 | 1612.649 | 1635.742 | 146.9 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 157.822 | 162.178 | 156.508 | 162.178 | 158.2 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1567.892 | 1579.299 | 1559.798 | 1579.299 | 146.9 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.984 | 1.314 | 0.931 | 1.314 | 158.2 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.000 | 4.093 | 3.959 | 4.093 | 146.9 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.103 | 0.148 | 0.087 | 0.148 | 157.8 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.688 | 0.731 | 0.670 | 0.731 | 146.9 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 32.244 | 40.611 | 31.462 | 40.611 | 157.8 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 58.281 | 59.551 | 58.057 | 59.551 | 146.9 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 32.293 | 40.539 | 31.466 | 40.539 | 157.8 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 57.729 | 58.130 | 57.161 | 58.130 | 146.9 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 33.796 | 41.561 | 32.342 | 41.561 | 154.7 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 52.327 | 54.238 | 51.834 | 54.238 | 146.9 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.242 | 0.316 | 0.227 | 0.316 | 154.7 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.637 | 5.918 | 5.527 | 5.918 | 146.9 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.019 | 0.014 | 0.019 | 143.0 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.481 | 0.507 | 0.467 | 0.507 | 147.8 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 215.886 | 219.651 | 214.042 | 219.651 | 164.2 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1638.573 | 1684.772 | 1618.936 | 1684.772 | 147.8 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.033 | 174.885 | 153.561 | 174.885 | 164.9 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1574.780 | 1636.055 | 1571.319 | 1636.055 | 147.8 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.893 | 1.396 | 0.744 | 1.396 | 164.8 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.010 | 4.078 | 3.978 | 4.078 | 147.8 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.104 | 0.117 | 0.097 | 0.117 | 164.3 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.694 | 0.704 | 0.680 | 0.704 | 147.8 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 44.176 | 45.175 | 43.665 | 45.175 | 164.0 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 66.730 | 68.510 | 65.959 | 68.510 | 147.8 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 44.180 | 46.090 | 44.151 | 46.090 | 163.5 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 65.893 | 66.850 | 65.405 | 66.850 | 147.8 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 45.498 | 46.621 | 44.767 | 46.621 | 156.9 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 60.890 | 62.306 | 59.874 | 62.306 | 147.8 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.232 | 0.305 | 0.230 | 0.305 | 156.9 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.590 | 5.757 | 5.485 | 5.757 | 147.8 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.361 | 19.465 | 18.233 | 19.465 | 144.9 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 66.821 | 69.628 | 66.500 | 69.628 | 128.2 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 16.053 | 16.970 | 15.954 | 16.970 | 150.9 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 58.618 | 59.079 | 57.363 | 59.079 | 128.2 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 196.203 | 198.014 | 194.120 | 198.014 | 163.1 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1538.693 | 1580.457 | 1502.063 | 1580.457 | 128.2 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.207 | 2.330 | 2.156 | 2.330 | 162.9 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.309 | 1.339 | 1.292 | 1.339 | 128.2 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.047 | 0.061 | 0.036 | 0.061 | 127.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.477 | 0.515 | 0.470 | 0.515 | 128.2 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.224 | 0.295 | 0.222 | 0.295 | 162.2 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.317 | 5.553 | 5.259 | 5.553 | 128.2 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.883 | 2.475 | 1.762 | 2.475 | 136.8 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.732 | 0.744 | 0.714 | 0.744 | 128.2 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.066 | 17.126 | 13.026 | 17.126 | 162.0 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 41.683 | 44.291 | 41.174 | 44.291 | 128.2 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 182.689 | 188.514 | 181.763 | 188.514 | 154.4 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1472.376 | 1510.234 | 1468.877 | 1510.234 | 128.2 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.472 | 1.510 | 1.411 | 1.510 | 154.3 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.782 | 0.846 | 0.774 | 0.846 | 128.2 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.012 | 0.019 | 0.011 | 0.019 | 126.2 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.403 | 0.450 | 0.368 | 0.450 | 128.2 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.192 | 0.531 | 0.183 | 0.531 | 148.3 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.324 | 9.203 | 5.265 | 9.203 | 128.2 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.892 | 1.208 | 0.868 | 1.208 | 130.7 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.538 | 0.575 | 0.534 | 0.575 | 128.2 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 16.784 | 18.724 | 16.300 | 18.724 | 147.3 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 60.493 | 60.998 | 59.105 | 60.998 | 128.2 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.676 | 18.078 | 17.638 | 18.078 | 167.0 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 29.685 | 32.944 | 29.570 | 32.944 | 128.2 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.179 | 0.193 | 0.170 | 0.193 | 168.0 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.2 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.247 | 0.251 | 0.228 | 0.251 | 167.3 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.008 | 0.011 | 128.2 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 36.743 | 39.079 | 36.084 | 39.079 | 159.8 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 115.380 | 124.458 | 113.226 | 124.458 | 128.2 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.044 | 0.048 | 0.043 | 0.048 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.517 | 0.557 | 0.493 | 0.557 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 188.608 | 193.609 | 188.015 | 193.609 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1443.255 | 1468.196 | 1431.634 | 1468.196 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.720 | 157.745 | 150.798 | 157.745 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1405.595 | 1416.911 | 1404.599 | 1416.911 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.099 | 0.139 | 0.079 | 0.139 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.499 | 2.596 | 2.468 | 2.596 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.053 | 0.029 | 0.053 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.457 | 0.516 | 0.453 | 0.516 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.775 | 20.889 | 20.758 | 20.889 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.421 | 36.869 | 35.592 | 36.869 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.618 | 23.306 | 20.861 | 23.306 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.581 | 37.780 | 35.403 | 37.780 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.255 | 21.589 | 21.184 | 21.589 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.933 | 37.092 | 31.723 | 37.092 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.387 | 0.406 | 0.375 | 0.406 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.482 | 3.576 | 3.473 | 3.576 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.056 | 0.043 | 0.056 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.491 | 0.504 | 0.471 | 0.504 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 182.156 | 184.520 | 181.214 | 184.520 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1445.216 | 1533.063 | 1428.882 | 1533.063 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.798 | 153.724 | 149.756 | 153.724 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1452.014 | 1490.708 | 1425.993 | 1490.708 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.088 | 0.153 | 0.085 | 0.153 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.528 | 3.298 | 2.511 | 3.298 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.047 | 0.035 | 0.047 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.460 | 0.488 | 0.456 | 0.488 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.115 | 17.217 | 16.949 | 17.217 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.332 | 30.965 | 30.036 | 30.965 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 18.123 | 18.953 | 17.726 | 18.953 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 29.468 | 31.233 | 29.463 | 31.233 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.380 | 17.520 | 17.332 | 17.520 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.341 | 26.615 | 26.085 | 26.615 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.398 | 0.480 | 0.354 | 0.480 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.450 | 3.542 | 3.443 | 3.542 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.027 | 0.017 | 0.027 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.469 | 0.488 | 0.463 | 0.488 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 177.522 | 183.015 | 175.703 | 183.015 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1443.413 | 1453.406 | 1437.658 | 1453.406 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.281 | 154.823 | 151.253 | 154.823 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1409.776 | 1416.099 | 1403.259 | 1416.099 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.091 | 0.104 | 0.085 | 0.104 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.273 | 2.351 | 2.230 | 2.351 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.038 | 0.027 | 0.038 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.438 | 0.457 | 0.429 | 0.457 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.902 | 20.050 | 18.823 | 20.050 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 33.042 | 33.939 | 32.294 | 33.939 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.028 | 19.252 | 19.013 | 19.252 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 31.806 | 34.326 | 31.445 | 34.326 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.978 | 21.028 | 19.006 | 21.028 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.498 | 29.752 | 28.221 | 29.752 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.226 | 0.244 | 0.220 | 0.244 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.089 | 3.163 | 3.085 | 3.163 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.045 | 0.018 | 0.045 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.489 | 0.491 | 0.477 | 0.491 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 182.870 | 185.069 | 181.903 | 185.069 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1456.653 | 1654.712 | 1437.415 | 1654.712 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 151.117 | 152.230 | 150.367 | 152.230 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1464.963 | 1493.148 | 1416.336 | 1493.148 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.095 | 0.111 | 0.093 | 0.111 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.334 | 2.665 | 2.323 | 2.665 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.027 | 0.036 | 0.027 | 0.036 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.468 | 0.523 | 0.427 | 0.523 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.263 | 19.965 | 18.587 | 19.965 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 32.432 | 35.553 | 32.253 | 35.553 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.406 | 19.500 | 19.130 | 19.500 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.098 | 35.936 | 31.203 | 35.936 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.239 | 20.460 | 18.804 | 20.460 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 28.618 | 29.149 | 27.987 | 29.149 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.239 | 0.320 | 0.239 | 0.320 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.146 | 4.300 | 3.101 | 4.300 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.064 | 0.959 | 0.055 | 0.959 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.580 | 0.610 | 0.575 | 0.610 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 167.826 | 171.367 | 165.391 | 171.367 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1409.376 | 1428.078 | 1408.985 | 1428.078 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 153.295 | 163.120 | 151.280 | 163.120 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1412.677 | 1430.258 | 1403.664 | 1430.258 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.084 | 0.087 | 0.069 | 0.087 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.502 | 2.611 | 2.466 | 2.611 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.033 | 0.025 | 0.033 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.614 | 0.629 | 0.576 | 0.629 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.144 | 4.314 | 4.018 | 4.314 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.273 | 14.757 | 13.220 | 14.757 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.391 | 4.486 | 4.255 | 4.486 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.891 | 13.066 | 12.483 | 13.066 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 5.132 | 5.468 | 5.101 | 5.468 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.828 | 12.177 | 9.528 | 12.177 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.387 | 0.438 | 0.369 | 0.438 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.172 | 3.231 | 3.144 | 3.231 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.023 | 0.020 | 0.023 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.469 | 0.482 | 0.465 | 0.482 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 182.092 | 194.382 | 181.576 | 194.382 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1441.318 | 1445.667 | 1436.991 | 1445.667 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.701 | 172.246 | 152.744 | 172.246 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1418.961 | 1455.386 | 1410.885 | 1455.386 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.096 | 0.114 | 0.073 | 0.114 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.338 | 2.660 | 2.278 | 2.660 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.043 | 0.028 | 0.043 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.424 | 0.439 | 0.420 | 0.439 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.484 | 21.596 | 20.190 | 21.596 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.400 | 36.229 | 34.785 | 36.229 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.552 | 20.911 | 20.535 | 20.911 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 34.705 | 35.503 | 34.670 | 35.503 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.699 | 22.201 | 20.471 | 22.201 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 31.553 | 31.763 | 31.522 | 31.763 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.239 | 0.312 | 0.218 | 0.312 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.116 | 3.242 | 3.114 | 3.242 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 156.656 | 157.268 | 150.732 | 157.268 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1401.213 | 1431.813 | 1396.629 | 1431.813 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.181 | 0.367 | 0.174 | 0.367 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.178 | 2.210 | 2.144 | 2.210 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.030 | 0.041 | 0.024 | 0.041 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.420 | 0.428 | 0.409 | 0.428 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 2.867 | 3.699 | 1.730 | 3.699 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.799 | 6.506 | 5.551 | 6.506 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.829 | 0.975 | 0.822 | 0.975 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.870 | 2.895 | 2.829 | 2.895 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 156.725 | 159.947 | 155.763 | 159.947 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1407.669 | 1418.272 | 1399.492 | 1418.272 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.115 | 0.121 | 0.105 | 0.121 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.424 | 2.529 | 2.408 | 2.529 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.024 | 0.030 | 0.018 | 0.030 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.615 | 0.634 | 0.601 | 0.634 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.943 | 3.134 | 2.917 | 3.134 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 6.933 | 7.586 | 6.741 | 7.586 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.141 | 1.428 | 1.106 | 1.428 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.942 | 5.535 | 2.875 | 5.535 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.684 | 159.566 | 151.500 | 159.566 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1390.337 | 1420.174 | 1388.137 | 1420.174 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.180 | 0.197 | 0.153 | 0.197 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.095 | 2.160 | 2.054 | 2.160 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.038 | 0.020 | 0.038 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.415 | 0.437 | 0.403 | 0.437 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.758 | 20.150 | 18.733 | 20.150 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 26.711 | 28.192 | 26.163 | 28.192 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.847 | 0.984 | 0.793 | 0.984 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.789 | 2.858 | 2.768 | 2.858 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.684 | 163.284 | 158.274 | 163.284 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1389.348 | 1442.482 | 1385.588 | 1442.482 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.159 | 0.172 | 0.149 | 0.172 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.156 | 2.188 | 2.149 | 2.188 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.034 | 0.023 | 0.034 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.413 | 0.437 | 0.409 | 0.437 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.513 | 11.255 | 9.333 | 11.255 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.090 | 17.706 | 16.094 | 17.706 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.779 | 1.030 | 0.719 | 1.030 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.877 | 2.914 | 2.841 | 2.914 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.953 | 152.684 | 150.643 | 152.684 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1390.879 | 1426.038 | 1383.945 | 1426.038 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.162 | 0.136 | 0.162 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.060 | 2.076 | 2.036 | 2.076 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.030 | 0.021 | 0.030 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.429 | 0.445 | 0.421 | 0.445 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.528 | 7.938 | 6.519 | 7.938 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.544 | 13.249 | 12.225 | 13.249 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.755 | 0.911 | 0.732 | 0.911 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.887 | 2.956 | 2.871 | 2.956 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.733 | 154.651 | 153.502 | 154.651 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1387.354 | 1391.711 | 1384.154 | 1391.711 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.155 | 0.247 | 0.151 | 0.247 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 1.993 | 2.022 | 1.950 | 2.022 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.065 | 0.025 | 0.065 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.411 | 0.437 | 0.403 | 0.437 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.225 | 10.355 | 8.221 | 10.355 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.224 | 16.052 | 15.150 | 16.052 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.830 | 0.852 | 0.678 | 0.852 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.773 | 2.907 | 2.759 | 2.907 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.344 | 155.457 | 151.629 | 155.457 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1391.972 | 1401.382 | 1388.521 | 1401.382 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.189 | 0.140 | 0.189 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.162 | 2.247 | 2.129 | 2.247 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.038 | 0.020 | 0.038 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.417 | 0.441 | 0.404 | 0.441 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.751 | 9.191 | 7.750 | 9.191 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 14.971 | 15.820 | 14.499 | 15.820 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.837 | 0.916 | 0.789 | 0.916 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.812 | 2.854 | 2.779 | 2.854 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.573 | 210.772 | 152.917 | 210.772 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1384.203 | 1405.130 | 1383.543 | 1405.130 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.150 | 0.232 | 0.129 | 0.232 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.138 | 2.223 | 2.100 | 2.223 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.043 | 0.021 | 0.043 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.413 | 0.435 | 0.404 | 0.435 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.624 | 17.665 | 16.595 | 17.665 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 22.862 | 23.785 | 22.785 | 23.785 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.765 | 0.881 | 0.756 | 0.881 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.807 | 2.833 | 2.772 | 2.833 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 153.163 | 153.652 | 151.232 | 153.652 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1402.148 | 1459.739 | 1386.320 | 1459.739 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.153 | 0.184 | 0.144 | 0.184 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.100 | 2.191 | 2.099 | 2.191 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.025 | 0.032 | 0.025 | 0.032 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.421 | 0.436 | 0.406 | 0.436 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 17.293 | 18.664 | 16.723 | 18.664 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.173 | 24.696 | 24.084 | 24.696 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.911 | 1.009 | 0.872 | 1.009 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.801 | 3.184 | 2.756 | 3.184 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 153.895 | 156.178 | 153.340 | 156.178 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1512.614 | 1598.125 | 1412.969 | 1598.125 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.145 | 0.155 | 0.134 | 0.155 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.424 | 2.876 | 2.402 | 2.876 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.020 | 0.024 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.457 | 0.514 | 0.441 | 0.514 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.227 | 17.798 | 16.188 | 17.798 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 30.232 | 31.374 | 29.841 | 31.374 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.111 | 1.154 | 1.055 | 1.154 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 4.386 | 4.482 | 3.784 | 4.482 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 154.371 | 163.487 | 152.950 | 163.487 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1452.706 | 1474.061 | 1435.951 | 1474.061 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.150 | 0.183 | 0.146 | 0.183 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.170 | 2.292 | 2.120 | 2.292 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.029 | 0.032 | 0.025 | 0.032 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.412 | 0.430 | 0.405 | 0.430 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.820 | 17.802 | 16.671 | 17.802 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.502 | 26.110 | 24.814 | 26.110 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.778 | 0.852 | 0.775 | 0.852 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.845 | 3.238 | 2.819 | 3.238 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 154.148 | 156.710 | 153.219 | 156.710 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1438.269 | 1524.927 | 1416.499 | 1524.927 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.167 | 0.185 | 0.154 | 0.185 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.221 | 2.280 | 2.185 | 2.280 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.025 | 0.063 | 0.021 | 0.063 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.451 | 0.462 | 0.407 | 0.462 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.322 | 8.008 | 6.318 | 8.008 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.177 | 13.935 | 13.048 | 13.935 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.644 | 0.909 | 0.618 | 0.909 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.961 | 4.474 | 2.897 | 4.474 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 159.622 | 161.630 | 158.148 | 161.630 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1437.045 | 1532.097 | 1429.416 | 1532.097 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.131 | 0.203 | 0.129 | 0.203 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.489 | 2.584 | 2.454 | 2.584 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.017 | 0.022 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.628 | 0.647 | 0.599 | 0.647 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 39.407 | 40.365 | 38.686 | 40.365 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 37.948 | 43.495 | 37.435 | 43.495 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.123 | 1.306 | 1.119 | 1.306 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.374 | 3.488 | 3.354 | 3.488 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 155.843 | 160.196 | 155.490 | 160.196 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1394.942 | 1465.110 | 1394.218 | 1465.110 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.180 | 0.238 | 0.164 | 0.238 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.240 | 2.305 | 2.223 | 2.305 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.023 | 0.026 | 0.023 | 0.026 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.462 | 0.479 | 0.425 | 0.479 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.584 | 103.674 | 101.583 | 103.674 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 120.075 | 123.472 | 120.028 | 123.472 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.012 | 1.343 | 0.985 | 1.343 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.252 | 3.567 | 3.241 | 3.567 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 162.838 | 186.722 | 158.434 | 186.722 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1507.952 | 1560.756 | 1479.966 | 1560.756 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.152 | 0.186 | 0.139 | 0.186 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 3.034 | 3.723 | 2.942 | 3.723 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.020 | 0.024 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.775 | 3.518 | 0.761 | 3.518 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 133.499 | 135.020 | 132.303 | 135.020 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 112.630 | 119.309 | 110.826 | 119.309 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.490 | 2.435 | 1.479 | 2.435 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.484 | 3.597 | 3.455 | 3.597 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 154.528 | 163.424 | 154.200 | 163.424 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1403.826 | 1407.332 | 1393.283 | 1407.332 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.152 | 0.189 | 0.152 | 0.189 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.191 | 2.260 | 2.130 | 2.260 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.026 | 0.030 | 0.020 | 0.030 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.426 | 0.457 | 0.420 | 0.457 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 7.198 | 8.096 | 5.950 | 8.096 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.439 | 14.292 | 13.196 | 14.292 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.823 | 1.000 | 0.674 | 1.000 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.010 | 3.150 | 2.961 | 3.150 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.721 | 161.069 | 150.964 | 161.069 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1385.777 | 1410.977 | 1385.484 | 1410.977 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.162 | 0.202 | 0.147 | 0.202 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.007 | 2.010 | 1.984 | 2.010 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.034 | 0.024 | 0.034 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.414 | 0.436 | 0.407 | 0.436 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 121.035 | 129.349 | 119.513 | 129.349 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 123.988 | 128.404 | 123.978 | 128.404 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.850 | 1.057 | 0.849 | 1.057 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.848 | 2.887 | 2.822 | 2.887 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.093 | 155.158 | 153.717 | 155.158 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1382.495 | 1389.094 | 1382.125 | 1389.094 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.147 | 0.177 | 0.144 | 0.177 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 1.973 | 2.080 | 1.961 | 2.080 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.031 | 0.020 | 0.031 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.427 | 0.476 | 0.408 | 0.476 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.219 | 16.385 | 14.991 | 16.385 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 19.280 | 19.797 | 19.193 | 19.797 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.854 | 0.876 | 0.755 | 0.876 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.779 | 2.833 | 2.746 | 2.833 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 155.079 | 178.258 | 154.991 | 178.258 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1492.705 | 1669.799 | 1459.217 | 1669.799 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.157 | 0.167 | 0.141 | 0.167 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.399 | 3.782 | 3.274 | 3.782 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.025 | 0.034 | 0.024 | 0.034 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.599 | 0.704 | 0.589 | 0.704 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.343 | 10.963 | 9.093 | 10.963 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 19.273 | 21.220 | 18.093 | 21.220 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.970 | 0.995 | 0.919 | 0.995 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.383 | 5.419 | 4.172 | 5.419 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.709 | 159.446 | 154.156 | 159.446 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1582.327 | 1946.144 | 1548.261 | 1946.144 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.145 | 0.198 | 0.133 | 0.198 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.385 | 2.435 | 2.289 | 2.435 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.025 | 0.032 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.478 | 0.496 | 0.459 | 0.496 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.541 | 7.913 | 6.428 | 7.913 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 15.282 | 16.059 | 14.527 | 16.059 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.825 | 0.957 | 0.793 | 0.957 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.061 | 3.535 | 2.960 | 3.535 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.256 | 154.324 | 151.701 | 154.324 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1460.757 | 1554.567 | 1415.065 | 1554.567 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.161 | 0.172 | 0.153 | 0.172 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.289 | 2.311 | 2.245 | 2.311 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.020 | 0.032 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.428 | 0.482 | 0.425 | 0.482 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.777 | 11.030 | 10.236 | 11.030 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.982 | 17.483 | 15.693 | 17.483 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.866 | 0.888 | 0.803 | 0.888 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.833 | 3.016 | 2.815 | 3.016 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.793 | 159.078 | 155.581 | 159.078 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1441.385 | 1471.029 | 1429.680 | 1471.029 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.186 | 0.148 | 0.186 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.780 | 3.881 | 3.743 | 3.881 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.019 | 0.023 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.689 | 0.705 | 0.686 | 0.705 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.168 | 28.383 | 27.961 | 28.383 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 43.972 | 44.584 | 43.231 | 44.584 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.878 | 2.249 | 0.868 | 2.249 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.202 | 5.247 | 5.147 | 5.247 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.078 | 161.076 | 155.230 | 161.076 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1409.725 | 1419.445 | 1402.315 | 1419.445 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.165 | 0.188 | 0.161 | 0.188 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.708 | 3.748 | 3.688 | 3.748 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.020 | 0.024 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.651 | 0.689 | 0.633 | 0.689 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 25.710 | 26.157 | 25.674 | 26.157 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 39.646 | 40.721 | 39.372 | 40.721 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.913 | 2.417 | 0.862 | 2.417 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.131 | 5.188 | 5.109 | 5.188 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 154.323 | 157.722 | 152.337 | 157.722 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1407.254 | 1515.579 | 1407.163 | 1515.579 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.141 | 0.164 | 0.135 | 0.164 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.189 | 2.217 | 2.156 | 2.217 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.027 | 0.060 | 0.026 | 0.060 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.408 | 0.453 | 0.407 | 0.453 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 9.027 | 10.845 | 8.931 | 10.845 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 15.829 | 16.456 | 15.338 | 16.456 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.859 | 1.174 | 0.732 | 1.174 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.852 | 2.897 | 2.838 | 2.897 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 155.863 | 160.960 | 154.734 | 160.960 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1627.051 | 1686.821 | 1614.376 | 1686.821 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.134 | 0.136 | 0.131 | 0.136 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.707 | 3.828 | 2.499 | 3.828 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.024 | 0.028 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.533 | 0.589 | 0.506 | 0.589 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.660 | 7.894 | 7.650 | 7.894 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 17.897 | 18.183 | 17.661 | 18.183 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.072 | 1.089 | 1.036 | 1.089 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.627 | 5.119 | 3.526 | 5.119 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 154.612 | 158.036 | 153.565 | 158.036 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1570.633 | 1651.572 | 1557.259 | 1651.572 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.132 | 0.137 | 0.121 | 0.137 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.583 | 2.822 | 2.562 | 2.822 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.025 | 0.026 | 0.024 | 0.026 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.519 | 0.554 | 0.515 | 0.554 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.630 | 9.825 | 9.444 | 9.825 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 19.394 | 20.763 | 18.919 | 20.763 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.059 | 1.095 | 1.048 | 1.095 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.721 | 4.549 | 3.576 | 4.549 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 154.190 | 158.655 | 150.312 | 158.655 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1406.337 | 1460.259 | 1394.463 | 1460.259 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.149 | 0.223 | 0.146 | 0.223 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.228 | 2.329 | 2.187 | 2.329 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.030 | 0.060 | 0.028 | 0.060 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.429 | 0.449 | 0.429 | 0.449 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.830 | 11.902 | 10.624 | 11.902 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.732 | 18.657 | 17.525 | 18.657 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.776 | 0.894 | 0.701 | 0.894 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.844 | 2.885 | 2.818 | 2.885 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 154.769 | 190.176 | 151.310 | 190.176 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1402.386 | 1429.822 | 1402.065 | 1429.822 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.150 | 0.165 | 0.140 | 0.165 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.201 | 2.228 | 2.189 | 2.228 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.025 | 0.034 | 0.021 | 0.034 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.423 | 0.447 | 0.412 | 0.447 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.909 | 9.797 | 7.833 | 9.797 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.751 | 15.209 | 14.519 | 15.209 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.784 | 1.122 | 0.685 | 1.122 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.860 | 2.934 | 2.838 | 2.934 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 153.791 | 158.561 | 152.523 | 158.561 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1531.305 | 1759.396 | 1435.886 | 1759.396 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.145 | 0.166 | 0.144 | 0.166 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.573 | 2.808 | 2.267 | 2.808 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.022 | 0.026 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.441 | 0.455 | 0.434 | 0.455 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.067 | 16.036 | 15.026 | 16.036 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 26.113 | 28.546 | 25.528 | 28.546 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.947 | 1.120 | 0.938 | 1.120 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.325 | 4.616 | 3.275 | 4.616 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 194.927 | 200.051 | 186.886 | 200.051 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1518.625 | 1528.918 | 1510.009 | 1528.918 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.005 | 163.011 | 153.778 | 163.011 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1480.168 | 1494.532 | 1473.688 | 1494.532 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.176 | 0.214 | 0.154 | 0.214 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.429 | 2.488 | 2.404 | 2.488 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.032 | 0.039 | 0.028 | 0.039 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.454 | 0.490 | 0.436 | 0.490 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.044 | 0.105 | 0.038 | 0.105 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.497 | 0.528 | 0.471 | 0.528 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.389 | 3.283 | 0.957 | 3.283 | 145.3 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 89.429 | 90.808 | 88.712 | 90.808 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 184.447 | 190.123 | 182.617 | 190.123 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1438.113 | 1454.422 | 1430.994 | 1454.422 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.592 | 158.791 | 153.050 | 158.791 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1415.747 | 1521.358 | 1411.642 | 1521.358 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.167 | 0.190 | 0.154 | 0.190 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.467 | 2.585 | 2.410 | 2.585 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.030 | 0.033 | 0.020 | 0.033 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.454 | 0.477 | 0.445 | 0.477 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.051 | 0.059 | 0.044 | 0.059 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.485 | 0.508 | 0.470 | 0.508 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.570 | 2.429 | 0.527 | 2.429 | 144.2 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.523 | 35.805 | 23.322 | 35.805 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 190.669 | 193.662 | 188.272 | 193.662 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1452.669 | 1464.556 | 1444.986 | 1464.556 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.774 | 156.564 | 152.354 | 156.564 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1424.195 | 1448.684 | 1414.849 | 1448.684 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.215 | 0.242 | 0.166 | 0.242 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.802 | 4.030 | 3.699 | 4.030 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.026 | 0.034 | 0.023 | 0.034 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.651 | 0.667 | 0.610 | 0.667 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.064 | 0.091 | 0.050 | 0.091 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.524 | 0.535 | 0.497 | 0.535 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.711 | 1.287 | 0.542 | 1.287 | 144.9 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 29.579 | 41.817 | 29.282 | 41.817 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 186.689 | 189.413 | 185.877 | 189.413 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1451.017 | 1549.320 | 1436.963 | 1549.320 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.060 | 158.559 | 150.502 | 158.559 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1429.696 | 1459.110 | 1412.069 | 1459.110 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.220 | 0.263 | 0.183 | 0.263 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.814 | 4.077 | 3.726 | 4.077 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.036 | 0.022 | 0.036 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.649 | 0.726 | 0.631 | 0.726 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.062 | 0.073 | 0.057 | 0.073 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.514 | 0.565 | 0.498 | 0.565 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.610 | 1.116 | 0.562 | 1.116 | 144.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.177 | 37.310 | 24.723 | 37.310 | 128.2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 169.587 | 203.868 | 165.236 | 203.868 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1430.463 | 1476.845 | 1417.072 | 1476.845 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.816 | 173.794 | 155.179 | 173.794 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1428.923 | 1447.551 | 1425.265 | 1447.551 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.162 | 0.201 | 0.135 | 0.201 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.569 | 2.692 | 2.539 | 2.692 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.036 | 0.018 | 0.036 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.628 | 0.646 | 0.587 | 0.646 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.055 | 0.062 | 0.036 | 0.062 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.586 | 0.617 | 0.577 | 0.617 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.883 | 1.796 | 0.812 | 1.796 | 143.0 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.056 | 39.493 | 24.990 | 39.493 | 128.2 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 183.648 | 200.631 | 182.757 | 200.631 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1500.443 | 1513.356 | 1493.206 | 1513.356 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.809 | 177.008 | 150.677 | 177.008 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1474.669 | 1480.966 | 1468.893 | 1480.966 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.141 | 0.230 | 0.129 | 0.230 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.245 | 2.357 | 2.195 | 2.357 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.019 | 0.034 | 0.017 | 0.034 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.417 | 0.429 | 0.406 | 0.429 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.021 | 0.025 | 0.019 | 0.025 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.479 | 0.499 | 0.446 | 0.499 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.353 | 2.466 | 1.121 | 2.466 | 144.8 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 79.203 | 96.048 | 77.317 | 96.048 | 128.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 329.452 | 342.322 | 327.656 | 342.322 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1825.284 | 1888.807 | 1808.376 | 1888.807 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 186.152 | 359.391 | 181.983 | 359.391 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1722.087 | 1775.392 | 1704.018 | 1775.392 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.180 | 0.308 | 0.140 | 0.308 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.744 | 2.797 | 2.669 | 2.797 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.042 | 0.657 | 0.020 | 0.657 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.751 | 0.783 | 0.737 | 0.783 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.099 | 0.136 | 0.063 | 0.136 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.799 | 0.842 | 0.786 | 0.842 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.396 | 23.759 | 22.801 | 23.759 | 160.5 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 289.626 | 305.935 | 277.409 | 305.935 | 133.3 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 326.353 | 331.742 | 324.070 | 331.742 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1849.558 | 1933.175 | 1802.906 | 1933.175 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.286 | 189.907 | 182.999 | 189.907 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1689.371 | 1782.423 | 1681.463 | 1782.423 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.171 | 0.200 | 0.124 | 0.200 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.725 | 3.235 | 2.658 | 3.235 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.024 | 0.027 | 0.018 | 0.027 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.731 | 0.915 | 0.725 | 0.915 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.081 | 0.101 | 0.062 | 0.101 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.781 | 0.813 | 0.771 | 0.813 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 22.835 | 22.952 | 22.641 | 22.952 | 155.7 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 303.995 | 314.173 | 279.431 | 314.173 | 133.1 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `3495187941a358227641e3c27fd1dc6602b1f96f`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:63bcd28b405bd9562482d4dad56cb4c04d26a520fb2c193f7695937290e30522`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:dd23f2a2f63224aebf0f4bd6ab4e9f68dc44c64f3dedf4214bc6c3086c8ebf50`

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

