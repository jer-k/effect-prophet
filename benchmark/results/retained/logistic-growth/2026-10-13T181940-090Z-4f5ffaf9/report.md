# Effect Prophet benchmark — 2026-10-13T181940-090Z-4f5ffaf9

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
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

## Stationarity diagnostics

Constrained normalized infinity-norm residuals at independently fitted endpoints, not a same-point gradient comparison. Deltas within the Laplace kink tolerance use the subgradient interval on both sides. Equality-gate rows bound the absolute difference. Output-first rows never gate eligibility; they are flagged for investigation when Effect's residual exceeds Python's by more than the declared threshold. Diagnostic-only rows do not certify near-stationarity; EP-097 owns that deferred requirement. Forecast, component, metadata, persistence and applicable uncertainty gates always apply; density and normalized noise also gate except under output-first.

| Case | Run | Effect residual | Python residual | Absolute difference | Policy | Follow-up |
| --- | ---: | ---: | ---: | ---: | --- | --- |
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
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 17.574 | 19.680 | 17.134 | 19.680 | 143.3 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 64.082 | 64.609 | 63.634 | 64.609 | 127.4 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 15.723 | 18.427 | 15.332 | 18.427 | 159.1 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 55.901 | 58.161 | 55.587 | 58.161 | 127.4 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 194.617 | 196.621 | 192.079 | 196.621 | 161.8 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1440.351 | 1444.860 | 1437.470 | 1444.860 | 127.4 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.346 | 3.511 | 2.114 | 3.511 | 161.5 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.264 | 1.314 | 1.259 | 1.314 | 127.4 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.038 | 0.066 | 0.035 | 0.066 | 128.6 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.480 | 0.537 | 0.439 | 0.537 | 127.4 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.226 | 0.228 | 0.225 | 0.228 | 161.0 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.372 | 5.635 | 5.359 | 5.635 | 127.4 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 0.945 | 3.052 | 0.938 | 3.052 | 136.0 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.734 | 0.779 | 0.705 | 0.779 | 127.4 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.048 | 17.018 | 12.889 | 17.018 | 160.9 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 41.363 | 49.645 | 41.124 | 49.645 | 127.4 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 184.773 | 188.673 | 183.942 | 188.673 | 156.0 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1454.834 | 1460.711 | 1453.346 | 1460.711 | 127.4 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.450 | 1.488 | 1.445 | 1.488 | 155.8 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.760 | 0.806 | 0.758 | 0.806 | 127.4 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.019 | 0.026 | 0.016 | 0.026 | 126.5 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.377 | 0.431 | 0.363 | 0.431 | 127.4 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.192 | 0.211 | 0.185 | 0.211 | 149.9 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.204 | 5.265 | 5.202 | 5.265 | 127.4 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.870 | 1.068 | 0.825 | 1.068 | 130.8 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.547 | 0.552 | 0.523 | 0.552 | 127.4 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 16.579 | 17.090 | 16.503 | 17.090 | 147.9 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 58.744 | 59.537 | 58.533 | 59.537 | 127.4 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.748 | 18.327 | 17.728 | 18.327 | 163.2 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 29.905 | 30.131 | 29.622 | 30.131 | 127.4 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.172 | 0.175 | 0.163 | 0.175 | 164.5 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 127.4 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.229 | 0.241 | 0.223 | 0.241 | 163.8 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.023 | 0.008 | 0.023 | 127.4 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 37.506 | 38.212 | 37.205 | 38.212 | 158.8 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 112.723 | 114.104 | 112.316 | 114.104 | 127.4 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.037 | 0.050 | 0.036 | 0.050 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.503 | 0.536 | 0.484 | 0.536 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 182.292 | 188.082 | 180.890 | 188.082 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1431.500 | 1440.118 | 1427.097 | 1440.118 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.949 | 152.105 | 151.907 | 152.105 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1402.899 | 1411.536 | 1400.093 | 1411.536 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.079 | 0.094 | 0.073 | 0.094 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.415 | 2.477 | 2.384 | 2.477 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.059 | 0.073 | 0.053 | 0.073 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.433 | 0.467 | 0.432 | 0.467 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.816 | 20.872 | 20.704 | 20.872 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.815 | 36.067 | 35.708 | 36.067 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.006 | 22.377 | 20.949 | 22.377 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.147 | 35.673 | 34.984 | 35.673 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 20.953 | 21.050 | 20.840 | 21.050 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 31.956 | 32.279 | 31.765 | 32.279 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.447 | 0.551 | 0.396 | 0.551 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.523 | 3.692 | 3.489 | 3.692 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.040 | 0.045 | 0.038 | 0.045 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.489 | 0.496 | 0.485 | 0.496 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 182.133 | 185.862 | 179.760 | 185.862 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1425.950 | 1427.853 | 1423.588 | 1427.853 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.383 | 153.324 | 150.916 | 153.324 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1398.860 | 1399.281 | 1398.094 | 1399.281 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.075 | 0.116 | 0.070 | 0.116 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.445 | 2.515 | 2.441 | 2.515 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.057 | 0.061 | 0.054 | 0.061 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.441 | 0.467 | 0.437 | 0.467 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.031 | 17.351 | 16.980 | 17.351 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.333 | 30.649 | 30.031 | 30.649 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.360 | 19.147 | 17.198 | 19.147 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.010 | 30.799 | 29.453 | 30.799 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.457 | 17.543 | 17.395 | 17.543 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.571 | 26.889 | 25.769 | 26.889 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.401 | 0.439 | 0.370 | 0.439 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.502 | 3.531 | 3.435 | 3.531 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.026 | 0.041 | 0.017 | 0.041 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.471 | 0.484 | 0.467 | 0.484 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 181.120 | 186.522 | 180.562 | 186.522 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1430.675 | 1439.952 | 1427.036 | 1439.952 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.224 | 152.845 | 150.134 | 152.845 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1407.155 | 1418.390 | 1398.001 | 1418.390 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.058 | 0.077 | 0.057 | 0.077 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.269 | 2.315 | 2.247 | 2.315 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.055 | 0.063 | 0.048 | 0.063 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.432 | 0.465 | 0.407 | 0.465 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.438 | 19.724 | 18.397 | 19.724 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.186 | 32.417 | 31.618 | 32.417 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.221 | 19.372 | 19.202 | 19.372 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 31.708 | 32.444 | 31.555 | 32.444 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 18.576 | 18.685 | 18.546 | 18.685 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.783 | 29.003 | 27.995 | 29.003 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.322 | 0.375 | 0.258 | 0.375 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.181 | 3.200 | 3.137 | 3.200 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.019 | 0.028 | 0.018 | 0.028 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.459 | 0.501 | 0.454 | 0.501 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 182.574 | 186.822 | 181.067 | 186.822 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1426.626 | 1501.566 | 1424.877 | 1501.566 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 152.818 | 156.764 | 152.557 | 156.764 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1396.021 | 1517.643 | 1390.907 | 1517.643 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.071 | 0.077 | 0.062 | 0.077 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.283 | 2.344 | 2.258 | 2.344 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.049 | 0.074 | 0.043 | 0.074 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.422 | 0.492 | 0.420 | 0.492 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.673 | 20.277 | 18.582 | 20.277 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 32.321 | 33.418 | 32.250 | 33.418 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.403 | 20.346 | 19.020 | 20.346 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 31.358 | 33.146 | 31.274 | 33.146 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 18.668 | 18.895 | 18.623 | 18.895 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 28.638 | 29.023 | 28.556 | 29.023 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.293 | 0.373 | 0.260 | 0.373 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.117 | 3.180 | 3.111 | 3.180 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.039 | 0.115 | 0.024 | 0.115 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.584 | 0.588 | 0.571 | 0.588 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 167.583 | 175.338 | 167.061 | 175.338 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1407.519 | 1411.615 | 1407.464 | 1411.615 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 153.888 | 155.031 | 152.501 | 155.031 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1397.609 | 1402.801 | 1394.946 | 1402.801 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.067 | 0.078 | 0.067 | 0.078 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.483 | 2.652 | 2.438 | 2.652 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.042 | 0.050 | 0.041 | 0.050 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.620 | 0.640 | 0.601 | 0.640 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.139 | 4.259 | 3.958 | 4.259 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.388 | 13.528 | 13.104 | 13.528 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.249 | 4.341 | 4.196 | 4.341 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.858 | 12.955 | 12.691 | 12.955 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.876 | 5.061 | 4.776 | 5.061 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.425 | 9.973 | 9.251 | 9.973 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.380 | 0.425 | 0.378 | 0.425 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.204 | 3.446 | 3.146 | 3.446 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.036 | 0.018 | 0.036 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.462 | 0.480 | 0.452 | 0.480 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 180.997 | 188.435 | 179.841 | 188.435 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1437.087 | 1510.434 | 1427.748 | 1510.434 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.571 | 159.879 | 151.355 | 159.879 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1399.888 | 1514.306 | 1395.030 | 1514.306 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.065 | 0.073 | 0.064 | 0.073 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.240 | 2.380 | 2.237 | 2.380 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.063 | 0.053 | 0.063 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.446 | 0.475 | 0.412 | 0.475 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.213 | 21.224 | 20.161 | 21.224 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.092 | 36.093 | 34.943 | 36.093 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.787 | 21.757 | 20.540 | 21.757 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 34.742 | 34.809 | 34.295 | 34.809 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.310 | 20.432 | 20.249 | 20.432 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 31.633 | 32.160 | 31.393 | 32.160 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.245 | 0.370 | 0.243 | 0.370 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.087 | 3.176 | 3.083 | 3.176 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 156.260 | 157.995 | 154.508 | 157.995 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1410.872 | 1413.125 | 1403.320 | 1413.125 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.108 | 0.150 | 0.105 | 0.150 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.216 | 2.278 | 2.155 | 2.278 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.051 | 0.062 | 0.037 | 0.062 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.439 | 0.470 | 0.430 | 0.470 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.609 | 3.926 | 1.469 | 3.926 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.647 | 6.335 | 5.559 | 6.335 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.917 | 1.021 | 0.890 | 1.021 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.909 | 2.949 | 2.850 | 2.949 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 157.000 | 157.375 | 154.244 | 157.375 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1413.072 | 1419.108 | 1405.039 | 1419.108 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.079 | 0.092 | 0.070 | 0.092 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.480 | 2.553 | 2.419 | 2.553 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.038 | 0.056 | 0.033 | 0.056 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.629 | 0.636 | 0.613 | 0.636 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.977 | 3.260 | 2.952 | 3.260 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 6.919 | 7.685 | 6.890 | 7.685 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.081 | 1.121 | 1.081 | 1.121 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.889 | 2.985 | 2.879 | 2.985 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.170 | 156.442 | 153.977 | 156.442 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1407.692 | 1455.231 | 1404.096 | 1455.231 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.109 | 0.184 | 0.103 | 0.184 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.162 | 2.179 | 2.129 | 2.179 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.043 | 0.051 | 0.042 | 0.051 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.440 | 0.416 | 0.440 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.517 | 19.928 | 18.270 | 19.928 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 26.620 | 27.060 | 26.286 | 27.060 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.941 | 0.972 | 0.930 | 0.972 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.788 | 3.026 | 2.771 | 3.026 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.779 | 158.390 | 152.795 | 158.390 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1406.722 | 1407.446 | 1405.862 | 1407.446 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.156 | 0.187 | 0.110 | 0.187 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.219 | 2.283 | 2.163 | 2.283 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.044 | 0.054 | 0.041 | 0.054 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.435 | 0.463 | 0.430 | 0.463 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 8.824 | 8.962 | 8.735 | 8.962 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.487 | 18.259 | 16.928 | 18.259 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.926 | 0.941 | 0.902 | 0.941 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.886 | 2.963 | 2.831 | 2.963 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.152 | 163.188 | 154.969 | 163.188 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1407.633 | 1411.433 | 1406.379 | 1411.433 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.113 | 0.120 | 0.106 | 0.120 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.049 | 2.097 | 2.024 | 2.097 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.042 | 0.049 | 0.041 | 0.049 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.428 | 0.445 | 0.427 | 0.445 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.225 | 8.051 | 6.194 | 8.051 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.714 | 12.899 | 12.261 | 12.899 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.913 | 0.958 | 0.886 | 0.958 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.818 | 2.888 | 2.799 | 2.888 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.197 | 169.099 | 151.792 | 169.099 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1409.177 | 1414.991 | 1403.011 | 1414.991 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.102 | 0.204 | 0.091 | 0.204 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.051 | 2.103 | 2.003 | 2.103 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.043 | 0.052 | 0.041 | 0.052 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.441 | 0.463 | 0.417 | 0.463 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 7.961 | 9.254 | 7.923 | 9.254 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.521 | 16.367 | 15.476 | 16.367 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.902 | 0.929 | 0.900 | 0.929 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.845 | 2.961 | 2.811 | 2.961 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.679 | 160.503 | 153.558 | 160.503 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1405.146 | 1405.416 | 1403.744 | 1405.416 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.108 | 0.115 | 0.106 | 0.115 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.187 | 2.225 | 2.153 | 2.225 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.046 | 0.058 | 0.043 | 0.058 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.428 | 0.444 | 0.425 | 0.444 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.457 | 9.014 | 7.366 | 9.014 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 14.978 | 16.786 | 14.446 | 16.786 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.930 | 0.968 | 0.911 | 0.968 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.891 | 2.971 | 2.859 | 2.971 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.642 | 158.867 | 153.394 | 158.867 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1407.842 | 1454.131 | 1403.165 | 1454.131 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.106 | 0.129 | 0.092 | 0.129 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.153 | 2.189 | 2.136 | 2.189 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.041 | 0.056 | 0.040 | 0.056 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.425 | 0.454 | 0.401 | 0.454 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.254 | 17.704 | 16.111 | 17.704 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 23.546 | 23.921 | 23.273 | 23.921 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.915 | 0.956 | 0.915 | 0.956 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.807 | 2.846 | 2.790 | 2.846 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 155.096 | 159.089 | 154.010 | 159.089 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1413.035 | 1415.947 | 1412.592 | 1415.947 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.108 | 0.131 | 0.106 | 0.131 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.245 | 2.262 | 2.211 | 2.262 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.042 | 0.044 | 0.038 | 0.044 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.422 | 0.434 | 0.406 | 0.434 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.345 | 17.890 | 16.211 | 17.890 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.910 | 25.492 | 24.449 | 25.492 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.900 | 0.980 | 0.899 | 0.980 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.842 | 2.913 | 2.838 | 2.913 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 161.090 | 185.052 | 157.653 | 185.052 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1413.508 | 1420.572 | 1411.680 | 1420.572 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.089 | 0.121 | 0.074 | 0.121 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.482 | 2.518 | 2.465 | 2.518 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.048 | 0.052 | 0.045 | 0.052 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.445 | 0.493 | 0.445 | 0.493 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.805 | 18.142 | 16.610 | 18.142 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 27.049 | 29.615 | 26.439 | 29.615 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.239 | 1.550 | 1.224 | 1.550 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.479 | 3.539 | 3.432 | 3.539 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 155.491 | 156.656 | 153.656 | 156.656 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1414.006 | 1420.563 | 1410.555 | 1420.563 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.113 | 0.117 | 0.095 | 0.117 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.150 | 2.161 | 2.126 | 2.161 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.039 | 0.046 | 0.037 | 0.046 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.419 | 0.424 | 0.397 | 0.424 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.160 | 17.680 | 16.145 | 17.680 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.340 | 25.512 | 24.889 | 25.512 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.932 | 0.989 | 0.928 | 0.989 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.894 | 2.924 | 2.873 | 2.924 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 153.691 | 159.656 | 153.412 | 159.656 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1412.231 | 1419.678 | 1412.071 | 1419.678 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.107 | 1.174 | 0.102 | 1.174 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.222 | 2.252 | 2.216 | 2.252 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.041 | 0.045 | 0.038 | 0.045 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.442 | 0.465 | 0.419 | 0.465 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 5.842 | 7.543 | 5.825 | 7.543 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 12.930 | 13.674 | 12.829 | 13.674 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.939 | 0.965 | 0.939 | 0.965 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.867 | 2.929 | 2.866 | 2.929 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 158.096 | 160.204 | 157.133 | 160.204 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1408.054 | 1460.569 | 1407.311 | 1460.569 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.097 | 0.121 | 0.097 | 0.121 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.564 | 2.657 | 2.539 | 2.657 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.049 | 0.059 | 0.046 | 0.059 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.638 | 0.679 | 0.629 | 0.679 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 37.954 | 39.066 | 37.913 | 39.066 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 39.647 | 41.153 | 39.333 | 41.153 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.201 | 1.823 | 1.059 | 1.823 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.440 | 3.558 | 3.437 | 3.558 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 155.972 | 158.008 | 153.302 | 158.008 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1408.655 | 1415.784 | 1401.693 | 1415.784 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.122 | 0.141 | 0.100 | 0.141 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.279 | 2.312 | 2.275 | 2.312 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.066 | 0.073 | 0.065 | 0.073 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.458 | 0.487 | 0.441 | 0.487 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.998 | 102.897 | 100.635 | 102.897 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 121.915 | 122.169 | 120.248 | 122.169 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.057 | 1.151 | 1.036 | 1.151 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.356 | 3.441 | 3.350 | 3.441 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 159.893 | 163.234 | 159.467 | 163.234 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1413.410 | 1420.473 | 1411.185 | 1420.473 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.124 | 0.149 | 0.111 | 0.149 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.715 | 2.786 | 2.693 | 2.786 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.050 | 0.054 | 0.049 | 0.054 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.759 | 0.789 | 0.751 | 0.789 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 132.092 | 134.146 | 131.649 | 134.146 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 112.223 | 112.498 | 111.221 | 112.498 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.489 | 2.071 | 1.465 | 2.071 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.539 | 3.619 | 3.479 | 3.619 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 153.472 | 156.137 | 152.846 | 156.137 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1414.538 | 1431.613 | 1408.362 | 1431.613 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.110 | 0.139 | 0.104 | 0.139 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.202 | 2.229 | 2.150 | 2.229 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.039 | 0.043 | 0.036 | 0.043 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.429 | 0.445 | 0.420 | 0.445 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 5.519 | 7.841 | 5.432 | 7.841 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.116 | 13.794 | 13.023 | 13.794 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.940 | 0.953 | 0.899 | 0.953 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.071 | 3.081 | 2.999 | 3.081 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.158 | 156.696 | 153.019 | 156.696 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1408.217 | 1429.709 | 1403.221 | 1429.709 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.113 | 0.155 | 0.108 | 0.155 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.045 | 2.075 | 2.042 | 2.075 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.047 | 0.063 | 0.038 | 0.063 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.436 | 0.462 | 0.412 | 0.462 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 116.435 | 117.665 | 116.124 | 117.665 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 126.587 | 127.012 | 125.595 | 127.012 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.909 | 1.027 | 0.903 | 1.027 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.874 | 3.059 | 2.873 | 3.059 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.449 | 157.804 | 152.762 | 157.804 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1406.351 | 1438.169 | 1400.703 | 1438.169 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.107 | 0.098 | 0.107 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.060 | 2.260 | 2.047 | 2.260 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.041 | 0.041 | 0.036 | 0.041 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.427 | 0.479 | 0.419 | 0.479 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 14.601 | 16.130 | 14.514 | 16.130 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.103 | 22.950 | 19.685 | 22.950 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.902 | 1.059 | 0.898 | 1.059 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.849 | 3.129 | 2.797 | 3.129 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 155.559 | 158.795 | 154.464 | 158.795 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1417.908 | 1422.931 | 1415.630 | 1422.931 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.124 | 0.136 | 0.121 | 0.136 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.410 | 3.537 | 3.356 | 3.537 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.061 | 0.064 | 0.050 | 0.064 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.587 | 0.639 | 0.578 | 0.639 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.045 | 9.163 | 8.909 | 9.163 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.377 | 17.992 | 17.363 | 17.992 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 1.140 | 1.159 | 1.114 | 1.159 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.285 | 4.426 | 4.180 | 4.426 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.313 | 157.955 | 155.255 | 157.955 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1410.618 | 1415.609 | 1410.064 | 1415.609 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.100 | 0.115 | 0.093 | 0.115 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.214 | 2.274 | 2.179 | 2.274 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.041 | 0.046 | 0.040 | 0.046 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.434 | 0.454 | 0.413 | 0.454 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.142 | 7.735 | 6.037 | 7.735 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.302 | 13.822 | 13.246 | 13.822 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.960 | 1.050 | 0.944 | 1.050 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.787 | 2.833 | 2.767 | 2.833 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.176 | 157.089 | 153.878 | 157.089 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1413.965 | 1416.596 | 1412.519 | 1416.596 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.106 | 0.112 | 0.105 | 0.112 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.216 | 2.234 | 2.196 | 2.234 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.039 | 0.046 | 0.036 | 0.046 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.422 | 0.440 | 0.397 | 0.440 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 9.962 | 11.598 | 9.607 | 11.598 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.847 | 16.676 | 15.539 | 16.676 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.953 | 0.982 | 0.941 | 0.982 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.881 | 2.896 | 2.816 | 2.896 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.089 | 160.085 | 157.893 | 160.085 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1417.297 | 1420.664 | 1416.806 | 1420.664 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.144 | 0.158 | 0.136 | 0.158 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.754 | 3.847 | 3.718 | 3.847 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.071 | 0.076 | 0.068 | 0.076 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.658 | 0.682 | 0.642 | 0.682 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.358 | 28.756 | 28.330 | 28.756 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 42.847 | 44.132 | 42.419 | 44.132 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.992 | 1.108 | 0.992 | 1.108 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.200 | 5.234 | 5.166 | 5.234 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.061 | 158.710 | 154.559 | 158.710 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1415.645 | 1464.948 | 1407.256 | 1464.948 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.151 | 0.128 | 0.151 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.674 | 3.782 | 3.647 | 3.782 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.075 | 0.079 | 0.069 | 0.079 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.643 | 0.671 | 0.642 | 0.671 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 26.246 | 26.476 | 26.065 | 26.476 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 39.670 | 40.821 | 38.922 | 40.821 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 1.014 | 1.110 | 1.007 | 1.110 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.021 | 5.250 | 5.004 | 5.250 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 152.665 | 157.121 | 149.505 | 157.121 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1412.161 | 1416.197 | 1410.292 | 1416.197 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.105 | 0.149 | 0.096 | 0.149 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.227 | 2.249 | 2.204 | 2.249 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.040 | 0.046 | 0.037 | 0.046 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.440 | 0.468 | 0.432 | 0.468 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.567 | 10.003 | 8.458 | 10.003 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.499 | 18.169 | 15.827 | 18.169 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.913 | 1.007 | 0.892 | 1.007 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.892 | 3.467 | 2.838 | 3.467 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 160.363 | 164.737 | 155.463 | 164.737 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1413.242 | 1421.140 | 1410.545 | 1421.140 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.095 | 0.106 | 0.076 | 0.106 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.356 | 2.489 | 2.348 | 2.489 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.044 | 0.048 | 0.043 | 0.048 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.480 | 0.718 | 0.438 | 0.718 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.751 | 8.136 | 7.639 | 8.136 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.319 | 17.598 | 14.878 | 17.598 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.149 | 1.396 | 1.147 | 1.396 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.329 | 4.472 | 3.239 | 4.472 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 156.730 | 164.276 | 156.332 | 164.276 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1419.658 | 1462.936 | 1415.700 | 1462.936 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.090 | 0.110 | 0.084 | 0.110 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.415 | 2.443 | 2.376 | 2.443 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.044 | 0.048 | 0.040 | 0.048 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.449 | 0.478 | 0.438 | 0.478 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.655 | 9.676 | 9.229 | 9.676 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.177 | 17.880 | 16.959 | 17.880 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.106 | 1.167 | 1.106 | 1.167 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.212 | 3.322 | 3.185 | 3.322 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 153.618 | 154.195 | 151.528 | 154.195 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1412.042 | 1417.217 | 1411.243 | 1417.217 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.102 | 0.141 | 0.092 | 0.141 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.183 | 2.237 | 2.182 | 2.237 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.041 | 0.056 | 0.038 | 0.056 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.433 | 0.472 | 0.433 | 0.472 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.095 | 11.993 | 9.986 | 11.993 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.818 | 18.611 | 17.577 | 18.611 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.923 | 0.933 | 0.907 | 0.933 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.855 | 2.915 | 2.842 | 2.915 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 155.578 | 156.213 | 155.417 | 156.213 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1415.907 | 1418.613 | 1409.657 | 1418.613 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.105 | 0.120 | 0.099 | 0.120 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.213 | 2.377 | 2.148 | 2.377 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.039 | 0.053 | 0.037 | 0.053 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.436 | 0.452 | 0.429 | 0.452 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.438 | 9.299 | 7.362 | 9.299 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.739 | 15.106 | 14.720 | 15.106 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.966 | 1.192 | 0.934 | 1.192 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.910 | 2.930 | 2.848 | 2.930 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 164.140 | 172.431 | 159.022 | 172.431 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1417.276 | 1423.081 | 1412.143 | 1423.081 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.102 | 0.132 | 0.085 | 0.132 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.272 | 2.357 | 2.245 | 2.357 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.049 | 0.058 | 0.043 | 0.058 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.436 | 0.438 | 0.425 | 0.438 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 14.728 | 15.600 | 14.567 | 15.600 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.561 | 25.790 | 24.376 | 25.790 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.082 | 1.143 | 1.036 | 1.143 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.339 | 3.403 | 3.283 | 3.403 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 183.968 | 187.999 | 183.142 | 187.999 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1511.651 | 1518.960 | 1505.658 | 1518.960 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.599 | 160.875 | 155.953 | 160.875 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1475.700 | 1487.778 | 1472.754 | 1487.778 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.140 | 0.151 | 0.131 | 0.151 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.475 | 2.541 | 2.438 | 2.541 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.058 | 0.084 | 0.047 | 0.084 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.442 | 0.479 | 0.436 | 0.479 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.071 | 0.042 | 0.071 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.477 | 0.519 | 0.465 | 0.519 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.973 | 1.581 | 0.894 | 1.581 | 143.5 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 88.305 | 89.245 | 87.694 | 89.245 | 127.4 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 182.025 | 186.605 | 180.042 | 186.605 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1436.030 | 1608.313 | 1433.227 | 1608.313 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.254 | 158.397 | 152.555 | 158.397 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1411.096 | 1419.714 | 1406.403 | 1419.714 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.139 | 0.152 | 0.127 | 0.152 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.484 | 2.547 | 2.393 | 2.547 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.071 | 0.079 | 0.053 | 0.079 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.453 | 0.494 | 0.442 | 0.494 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.042 | 0.088 | 0.037 | 0.088 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.487 | 0.533 | 0.464 | 0.533 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.602 | 0.922 | 0.540 | 0.922 | 143.5 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.366 | 36.060 | 23.258 | 36.060 | 127.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 188.328 | 190.423 | 185.145 | 190.423 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1453.949 | 1606.535 | 1444.975 | 1606.535 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.374 | 158.432 | 155.926 | 158.432 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1426.795 | 1441.705 | 1420.865 | 1441.705 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.174 | 0.237 | 0.129 | 0.237 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.695 | 3.747 | 3.625 | 3.747 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.072 | 0.080 | 0.070 | 0.080 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.645 | 0.688 | 0.625 | 0.688 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.059 | 0.078 | 0.047 | 0.078 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.509 | 0.552 | 0.491 | 0.552 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.860 | 2.489 | 0.685 | 2.489 | 144.0 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 29.463 | 43.130 | 29.308 | 43.130 | 127.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 188.049 | 189.250 | 186.499 | 189.250 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1450.693 | 1456.973 | 1447.234 | 1456.973 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.188 | 163.656 | 154.876 | 163.656 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1425.162 | 1427.891 | 1414.193 | 1427.891 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.175 | 0.191 | 0.141 | 0.191 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.703 | 3.783 | 3.646 | 3.783 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.073 | 0.092 | 0.069 | 0.092 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.645 | 0.656 | 0.621 | 0.656 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.065 | 0.081 | 0.061 | 0.081 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.541 | 0.576 | 0.539 | 0.576 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.903 | 1.132 | 0.591 | 1.132 | 145.9 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.120 | 37.840 | 24.579 | 37.840 | 127.4 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 167.752 | 171.001 | 166.087 | 171.001 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1420.501 | 1426.694 | 1417.119 | 1426.694 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.033 | 158.370 | 154.950 | 158.370 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1414.854 | 1424.809 | 1413.439 | 1424.809 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.091 | 0.113 | 0.075 | 0.113 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.544 | 2.641 | 2.458 | 2.641 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.073 | 1.179 | 0.045 | 1.179 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.613 | 0.642 | 0.577 | 0.642 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.041 | 0.060 | 0.039 | 0.060 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.594 | 0.603 | 0.566 | 0.603 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.032 | 1.283 | 0.938 | 1.283 | 138.0 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 24.990 | 37.726 | 24.687 | 37.726 | 127.4 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 185.377 | 190.300 | 184.000 | 190.300 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1494.713 | 1496.904 | 1492.763 | 1496.904 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.907 | 159.816 | 153.790 | 159.816 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1472.956 | 1478.722 | 1472.424 | 1478.722 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.115 | 0.144 | 0.112 | 0.144 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.233 | 2.362 | 2.171 | 2.362 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.057 | 0.084 | 0.053 | 0.084 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.429 | 0.444 | 0.416 | 0.444 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.021 | 0.035 | 0.018 | 0.035 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.459 | 0.469 | 0.444 | 0.469 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.939 | 1.238 | 0.900 | 1.238 | 141.6 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 77.806 | 79.098 | 77.608 | 79.098 | 127.4 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 325.246 | 358.480 | 324.929 | 358.480 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1792.175 | 1802.541 | 1785.007 | 1802.541 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.099 | 190.238 | 183.040 | 190.238 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1683.666 | 1694.464 | 1677.640 | 1694.464 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.129 | 0.201 | 0.106 | 0.201 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.660 | 2.775 | 2.628 | 2.775 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.060 | 0.134 | 0.054 | 0.134 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.743 | 0.781 | 0.709 | 0.781 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.080 | 0.110 | 0.065 | 0.110 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.795 | 0.822 | 0.781 | 0.822 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.560 | 26.965 | 23.462 | 26.965 | 156.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 280.035 | 289.698 | 276.810 | 289.698 | 132.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 324.410 | 330.838 | 323.313 | 330.838 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1791.676 | 1800.103 | 1785.423 | 1800.103 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 182.961 | 191.741 | 182.348 | 191.741 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1680.555 | 1687.536 | 1676.249 | 1687.536 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.120 | 0.171 | 0.107 | 0.171 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.716 | 2.781 | 2.605 | 2.781 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.077 | 0.097 | 0.055 | 0.097 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.721 | 0.729 | 0.713 | 0.729 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.084 | 0.098 | 0.059 | 0.098 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.784 | 0.804 | 0.744 | 0.804 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 22.757 | 23.057 | 22.399 | 23.057 | 157.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 277.175 | 289.448 | 274.819 | 289.448 | 133.0 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `4f5ffaf996e4159ada941b6d0d6d3e4e2b1f1ba5`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:51ab5e440765ab69603e6c4e39bc1600d05b2f4c02478795aa57d310c8a475af`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:9ecbb1d6fc43605464860e35230c82ee75838d3406c020a0d4d381327304cdb5`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

