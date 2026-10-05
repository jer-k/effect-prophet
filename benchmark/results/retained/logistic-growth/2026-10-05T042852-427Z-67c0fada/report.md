# Effect Prophet benchmark — 2026-10-05T042852-427Z-67c0fada

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| logistic-implicit-floor-absmax | equivalent-objective | passed | 1.180e-11 | 2.829e-13 | 2.829e-13 | 1.208e-11 | 1.994e-14 | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-minmax | equivalent-objective | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-absmax | equivalent-objective | passed | 1.369e-11 | 3.264e-13 | 3.264e-13 | 1.384e-11 | 7.563e-15 | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-minmax | equivalent-objective | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-auto-changepoints | equivalent-objective | passed | 2.389e-11 | 2.405e-13 | 2.405e-13 | 2.396e-11 | 1.941e-13 | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-large | equivalent-objective | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | Verified equivalent behavior for this configuration under evidence stage-f-logistic-v1. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | scalar-process-different-public-work | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | Verified fitted point behavior under stage-f-logistic-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | scalar-process-different-public-work | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | Verified fitted point behavior under stage-f-logistic-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | Verified fitted point behavior under stage-f-logistic-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | Verified fitted point behavior under stage-f-logistic-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | Verified fitted point behavior under stage-f-logistic-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | Verified fitted point behavior under stage-f-logistic-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| logistic-reconcile-basic-96-empty-absmax | equivalent-objective | passed | 3.905e-8 | 0.000e+0 | 0.000e+0 | 3.905e-8 | 1.179e-11 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-explicit-absmax | equivalent-objective | passed | 2.399e-11 | 0.000e+0 | 0.000e+0 | 2.399e-11 | 2.577e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-auto-absmax | equivalent-objective | passed | 1.273e-11 | 0.000e+0 | 0.000e+0 | 1.273e-11 | 3.247e-15 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-empty-minmax | equivalent-objective | passed | 1.559e-10 | 0.000e+0 | 0.000e+0 | 1.559e-10 | 9.770e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-explicit-minmax | equivalent-objective | passed | 3.867e-11 | 0.000e+0 | 0.000e+0 | 3.867e-11 | 2.794e-12 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-auto-minmax | equivalent-objective | passed | 2.374e-9 | 0.000e+0 | 0.000e+0 | 2.374e-9 | 9.145e-11 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-empty-loose-prior-absmax | equivalent-objective | passed | 9.034e-9 | 0.000e+0 | 0.000e+0 | 9.034e-9 | 3.456e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-empty-loose-prior-minmax | equivalent-objective | passed | 1.397e-11 | 0.000e+0 | 0.000e+0 | 1.397e-11 | 3.443e-12 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-99 | equivalent-objective | passed | 3.772e-11 | 0.000e+0 | 0.000e+0 | 3.772e-11 | 5.922e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-100 | equivalent-objective | passed | 4.670e-11 | 0.000e+0 | 0.000e+0 | 4.670e-11 | 4.095e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-256 | equivalent-objective | passed | 2.169e-11 | 0.000e+0 | 0.000e+0 | 2.169e-11 | 4.034e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-defaults-96 | equivalent-objective | passed | 2.965e-9 | 2.560e-10 | 2.560e-10 | 3.077e-9 | 1.086e-10 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-defaults-256 | equivalent-objective | passed | 1.133e-3 | 1.273e-5 | 1.273e-5 | 1.122e-3 | 7.028e-4 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| logistic-reconcile-weekly | equivalent-objective | passed | 5.460e-8 | 3.208e-8 | 3.208e-8 | 8.668e-8 | 5.013e-9 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-conditional | equivalent-objective | passed | 4.785e-11 | 4.619e-13 | 4.619e-13 | 4.808e-11 | 2.232e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-event | equivalent-objective | passed | 3.766e-11 | 4.705e-12 | 4.705e-12 | 4.074e-11 | 2.844e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-regressor-additive | equivalent-objective | passed | 1.130e-11 | 1.915e-12 | 1.915e-12 | 1.133e-11 | 1.733e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-regressor-multiplicative | equivalent-objective | passed | 4.558e-11 | 4.103e-12 | 0.000e+0 | 4.840e-11 | 4.628e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-explicit-floor-absmax | equivalent-objective | passed | 4.539e-11 | 0.000e+0 | 0.000e+0 | 4.539e-11 | 2.362e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-mixed-absmax | equivalent-objective | passed | 4.205e-11 | 3.521e-12 | 3.561e-12 | 4.330e-11 | 1.402e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-explicit-floor-minmax | equivalent-objective | passed | 3.185e-11 | 0.000e+0 | 0.000e+0 | 3.185e-11 | 1.549e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-mixed-minmax | equivalent-objective | passed | 4.333e-11 | 3.867e-12 | 3.997e-12 | 4.559e-11 | 2.427e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-unsorted | equivalent-objective | passed | 2.399e-11 | 0.000e+0 | 0.000e+0 | 2.399e-11 | 2.577e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-duplicates | equivalent-objective | passed | 2.563e-11 | 0.000e+0 | 0.000e+0 | 2.563e-11 | 2.678e-14 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-declining | equivalent-objective | passed | 3.874e-11 | 0.000e+0 | 0.000e+0 | 3.874e-11 | 6.897e-15 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-saturated | equivalent-objective | passed | 1.005e-9 | 0.000e+0 | 0.000e+0 | 1.005e-9 | 2.266e-10 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-constant | equivalent-objective | passed | 7.894e-12 | 0.000e+0 | 0.000e+0 | 7.894e-12 | 4.140e-12 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-out-of-bounds | equivalent-objective | passed | 4.331e-8 | 0.000e+0 | 0.000e+0 | 4.331e-8 | 4.639e-8 | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |

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
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 0 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 1 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 0 | objective | -1.786030e+3 | -1.786061e+3 | 3.122188e-2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 0 | stationarity-residual | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 1 | objective | -1.786030e+3 | -1.786061e+3 | 3.122188e-2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 1 | stationarity-residual | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | 1.000e-2 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
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
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 17.229 | 20.247 | 16.993 | 20.247 | 145.6 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 68.722 | 76.130 | 68.500 | 76.130 | 122.6 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 16.194 | 18.070 | 16.075 | 18.070 | 156.0 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 59.406 | 69.407 | 59.317 | 69.407 | 122.6 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 212.700 | 228.461 | 201.995 | 228.461 | 154.1 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1507.041 | 1526.650 | 1499.069 | 1526.650 | 122.6 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.273 | 2.634 | 2.135 | 2.634 | 153.9 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.342 | 1.893 | 1.290 | 1.893 | 122.6 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.043 | 0.070 | 0.034 | 0.070 | 123.7 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.494 | 0.569 | 0.437 | 0.569 | 122.6 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.247 | 0.292 | 0.235 | 0.292 | 153.7 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.368 | 6.582 | 5.357 | 6.582 | 122.6 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.214 | 3.391 | 1.169 | 3.391 | 131.4 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.745 | 0.784 | 0.734 | 0.784 | 122.6 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 14.329 | 19.742 | 14.159 | 19.742 | 153.1 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 43.427 | 46.066 | 43.202 | 46.066 | 122.6 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 191.822 | 200.393 | 189.676 | 200.393 | 155.9 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1531.757 | 1560.135 | 1527.653 | 1560.135 | 122.6 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.631 | 2.895 | 1.515 | 2.895 | 155.8 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.791 | 0.823 | 0.771 | 0.823 | 122.6 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.013 | 0.018 | 0.013 | 0.018 | 127.6 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.408 | 0.473 | 0.406 | 0.473 | 122.6 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.210 | 0.299 | 0.204 | 0.299 | 147.1 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.310 | 5.352 | 5.275 | 5.352 | 122.6 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.077 | 1.162 | 1.068 | 1.162 | 132.1 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.569 | 0.586 | 0.551 | 0.586 | 122.6 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 16.819 | 17.845 | 16.358 | 17.845 | 144.6 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 60.269 | 61.606 | 60.190 | 61.606 | 122.6 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 18.355 | 19.566 | 18.338 | 19.566 | 165.9 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 31.963 | 33.987 | 30.679 | 33.987 | 122.6 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.211 | 0.301 | 0.190 | 0.301 | 166.7 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 122.6 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.246 | 0.274 | 0.236 | 0.274 | 166.0 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 122.6 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 37.613 | 40.110 | 37.547 | 40.110 | 159.1 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 117.398 | 122.854 | 117.359 | 122.854 | 122.6 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.071 | 0.050 | 0.071 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.510 | 0.515 | 0.491 | 0.515 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 192.270 | 202.492 | 189.655 | 202.492 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1493.222 | 1516.349 | 1483.482 | 1516.349 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.413 | 172.613 | 156.266 | 172.613 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1492.710 | 1586.413 | 1462.053 | 1586.413 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.087 | 0.091 | 0.079 | 0.091 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.586 | 2.599 | 2.537 | 2.599 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.052 | 0.064 | 0.051 | 0.064 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.481 | 0.515 | 0.480 | 0.515 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.761 | 21.542 | 20.623 | 21.542 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 37.219 | 38.300 | 36.955 | 38.300 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.422 | 23.243 | 20.258 | 23.243 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 37.055 | 37.825 | 36.385 | 37.825 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 20.846 | 21.205 | 20.541 | 21.205 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 33.111 | 33.776 | 32.737 | 33.776 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.429 | 0.736 | 0.403 | 0.736 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 4.038 | 5.337 | 3.790 | 5.337 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.054 | 0.070 | 0.052 | 0.070 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.565 | 0.795 | 0.545 | 0.795 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 188.972 | 194.263 | 187.048 | 194.263 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1479.574 | 1509.605 | 1472.255 | 1509.605 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.540 | 179.405 | 163.449 | 179.405 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1463.905 | 1592.409 | 1461.483 | 1592.409 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.071 | 0.098 | 0.069 | 0.098 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.521 | 2.572 | 2.461 | 2.572 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.064 | 0.082 | 0.060 | 0.082 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.471 | 0.501 | 0.469 | 0.501 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 16.915 | 17.138 | 16.862 | 17.138 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.242 | 33.377 | 31.778 | 33.377 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.503 | 18.975 | 17.420 | 18.975 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 31.134 | 31.301 | 30.928 | 31.301 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.404 | 18.046 | 17.305 | 18.046 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 29.102 | 29.267 | 29.061 | 29.267 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.427 | 0.465 | 0.404 | 0.465 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.604 | 3.751 | 3.597 | 3.751 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.040 | 0.017 | 0.040 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.484 | 0.572 | 0.468 | 0.572 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 191.123 | 217.896 | 190.381 | 217.896 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1529.501 | 1582.097 | 1523.291 | 1582.097 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.753 | 162.281 | 157.900 | 162.281 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1459.492 | 1493.072 | 1458.800 | 1493.072 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.089 | 0.154 | 0.073 | 0.154 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.391 | 3.324 | 2.318 | 3.324 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.063 | 0.085 | 0.050 | 0.085 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.488 | 0.514 | 0.485 | 0.514 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.406 | 18.528 | 18.318 | 18.528 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.606 | 37.019 | 33.805 | 37.019 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.242 | 19.644 | 19.133 | 19.644 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.759 | 38.585 | 32.419 | 38.585 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 18.743 | 18.919 | 18.532 | 18.919 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 29.939 | 31.207 | 29.789 | 31.207 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.327 | 0.355 | 0.278 | 0.355 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.235 | 3.953 | 3.205 | 3.953 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.022 | 0.031 | 0.020 | 0.031 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.483 | 0.496 | 0.469 | 0.496 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 190.975 | 196.843 | 189.673 | 196.843 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1509.168 | 1541.915 | 1508.069 | 1541.915 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 167.709 | 175.669 | 161.629 | 175.669 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1466.284 | 1475.810 | 1461.123 | 1475.810 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.065 | 0.101 | 0.063 | 0.101 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.303 | 3.147 | 2.287 | 3.147 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.062 | 0.248 | 0.052 | 0.248 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.459 | 0.582 | 0.449 | 0.582 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.181 | 20.797 | 18.837 | 20.797 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.018 | 33.392 | 32.743 | 33.392 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.243 | 19.788 | 19.059 | 19.788 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 33.127 | 38.075 | 33.079 | 38.075 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.292 | 20.279 | 19.091 | 20.279 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 29.745 | 32.499 | 29.327 | 32.499 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.310 | 0.382 | 0.273 | 0.382 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.319 | 4.182 | 3.305 | 4.182 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.702 | 0.034 | 0.702 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.597 | 0.758 | 0.590 | 0.758 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 176.828 | 189.581 | 174.732 | 189.581 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1467.870 | 1561.181 | 1458.449 | 1561.181 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 160.362 | 177.095 | 157.682 | 177.095 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1496.868 | 1521.158 | 1486.609 | 1521.158 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.086 | 0.102 | 0.079 | 0.102 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.611 | 2.759 | 2.561 | 2.759 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.054 | 0.062 | 0.047 | 0.062 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.657 | 0.683 | 0.632 | 0.683 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.010 | 4.154 | 3.994 | 4.154 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.861 | 14.547 | 13.714 | 14.547 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.242 | 4.373 | 4.239 | 4.373 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.961 | 18.825 | 12.876 | 18.825 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 5.228 | 6.485 | 5.163 | 6.485 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 10.247 | 11.482 | 10.186 | 11.482 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.391 | 0.397 | 0.377 | 0.397 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.255 | 3.338 | 3.245 | 3.338 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.501 | 0.574 | 0.494 | 0.574 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 188.020 | 192.549 | 187.510 | 192.549 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1503.937 | 1572.974 | 1489.944 | 1572.974 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.934 | 175.526 | 161.818 | 175.526 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1475.336 | 1486.548 | 1464.049 | 1486.548 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.088 | 0.201 | 0.088 | 0.201 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.504 | 5.825 | 2.325 | 5.825 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.064 | 0.075 | 0.048 | 0.075 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.454 | 0.503 | 0.432 | 0.503 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.328 | 20.793 | 20.032 | 20.793 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.811 | 35.904 | 35.746 | 35.904 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.919 | 21.556 | 20.807 | 21.556 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 35.510 | 40.118 | 35.250 | 40.118 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.565 | 21.022 | 20.278 | 21.022 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 32.338 | 32.526 | 32.083 | 32.526 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.324 | 0.359 | 0.260 | 0.359 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.181 | 3.289 | 3.131 | 3.289 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 165.344 | 182.362 | 161.038 | 182.362 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1463.102 | 1498.961 | 1445.990 | 1498.961 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.105 | 0.133 | 0.084 | 0.133 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.286 | 2.392 | 2.281 | 2.392 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.056 | 0.062 | 0.049 | 0.062 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.459 | 0.475 | 0.455 | 0.475 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.622 | 3.599 | 1.394 | 3.599 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 6.275 | 6.388 | 5.878 | 6.388 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 1.044 | 1.541 | 0.997 | 1.541 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.929 | 3.373 | 2.889 | 3.373 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 161.325 | 168.286 | 159.220 | 168.286 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1457.092 | 1481.906 | 1442.599 | 1481.906 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.087 | 0.090 | 0.084 | 0.090 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.513 | 2.584 | 2.482 | 2.584 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.034 | 0.036 | 0.033 | 0.036 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.635 | 0.754 | 0.633 | 0.754 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 3.132 | 3.750 | 3.098 | 3.750 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.183 | 8.776 | 7.141 | 8.776 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.094 | 1.167 | 1.035 | 1.167 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 3.049 | 3.663 | 2.931 | 3.663 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.165 | 173.424 | 158.131 | 173.424 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1446.079 | 1487.432 | 1444.802 | 1487.432 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.188 | 0.105 | 0.188 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.226 | 2.300 | 2.201 | 2.300 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.062 | 0.049 | 0.062 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.436 | 0.459 | 0.431 | 0.459 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.278 | 19.956 | 18.049 | 19.956 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 27.927 | 29.557 | 27.909 | 29.557 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.950 | 0.969 | 0.914 | 0.969 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.937 | 3.052 | 2.887 | 3.052 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.850 | 168.574 | 156.172 | 168.574 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1446.863 | 1492.327 | 1438.850 | 1492.327 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.173 | 0.121 | 0.173 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.191 | 2.258 | 2.186 | 2.258 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.056 | 0.051 | 0.056 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.435 | 0.467 | 0.411 | 0.467 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 8.925 | 11.669 | 8.691 | 11.669 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.611 | 18.549 | 17.089 | 18.549 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.925 | 1.032 | 0.904 | 1.032 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.897 | 2.981 | 2.862 | 2.981 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.362 | 171.042 | 159.027 | 171.042 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1467.758 | 1499.098 | 1434.808 | 1499.098 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.111 | 0.171 | 0.105 | 0.171 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.052 | 2.126 | 2.028 | 2.126 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.050 | 0.067 | 0.043 | 0.067 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.431 | 0.458 | 0.425 | 0.458 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.218 | 8.139 | 6.207 | 8.139 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 14.024 | 15.345 | 14.018 | 15.345 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.912 | 0.992 | 0.891 | 0.992 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 3.102 | 3.667 | 3.049 | 3.667 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.506 | 168.242 | 157.348 | 168.242 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1451.549 | 1459.625 | 1437.898 | 1459.625 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.108 | 0.147 | 0.103 | 0.147 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.080 | 2.144 | 2.051 | 2.144 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.052 | 0.060 | 0.047 | 0.060 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.437 | 0.461 | 0.434 | 0.461 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 7.923 | 9.397 | 7.854 | 9.397 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.735 | 16.174 | 15.234 | 16.174 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.881 | 1.020 | 0.875 | 1.020 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.978 | 3.101 | 2.865 | 3.101 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.139 | 162.507 | 155.549 | 162.507 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1472.338 | 1484.696 | 1464.195 | 1484.696 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.116 | 0.137 | 0.108 | 0.137 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.257 | 2.334 | 2.241 | 2.334 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.093 | 0.049 | 0.093 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.446 | 0.460 | 0.445 | 0.460 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.585 | 8.951 | 7.479 | 8.951 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.527 | 16.940 | 15.107 | 16.940 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.951 | 0.993 | 0.936 | 0.993 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.936 | 3.221 | 2.906 | 3.221 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.286 | 168.970 | 156.967 | 168.970 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1450.363 | 1492.911 | 1449.087 | 1492.911 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.276 | 0.099 | 0.276 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.279 | 2.391 | 2.261 | 2.391 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.062 | 0.045 | 0.062 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.441 | 0.469 | 0.437 | 0.469 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.408 | 17.862 | 16.384 | 17.862 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 24.995 | 33.041 | 24.788 | 33.041 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.922 | 1.003 | 0.895 | 1.003 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.924 | 3.050 | 2.870 | 3.050 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 165.228 | 165.914 | 158.470 | 165.914 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1465.002 | 1479.839 | 1448.036 | 1479.839 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.120 | 0.152 | 0.092 | 0.152 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.190 | 2.295 | 2.185 | 2.295 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.054 | 0.088 | 0.045 | 0.088 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.432 | 0.471 | 0.431 | 0.471 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.295 | 17.506 | 16.244 | 17.506 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 25.511 | 26.100 | 25.496 | 26.100 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 1.077 | 1.131 | 0.975 | 1.131 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.943 | 3.039 | 2.877 | 3.039 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 175.746 | 192.477 | 173.463 | 192.477 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1471.555 | 1482.110 | 1460.993 | 1482.110 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.105 | 0.158 | 0.102 | 0.158 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.499 | 2.520 | 2.449 | 2.520 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.042 | 0.056 | 0.036 | 0.056 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.453 | 0.472 | 0.443 | 0.472 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 17.612 | 21.094 | 17.279 | 21.094 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 27.243 | 28.323 | 26.831 | 28.323 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.265 | 1.468 | 1.264 | 1.468 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.534 | 3.676 | 3.462 | 3.676 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 161.698 | 172.024 | 157.110 | 172.024 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1453.786 | 1471.867 | 1437.722 | 1471.867 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.161 | 0.195 | 0.119 | 0.195 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.174 | 2.203 | 2.172 | 2.203 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.057 | 0.079 | 0.049 | 0.079 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.412 | 0.422 | 0.411 | 0.422 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 17.353 | 19.244 | 15.983 | 19.244 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.683 | 26.696 | 25.090 | 26.696 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 1.137 | 1.335 | 1.073 | 1.335 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.942 | 4.321 | 2.910 | 4.321 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 165.435 | 174.834 | 161.038 | 174.834 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1463.139 | 1467.937 | 1453.197 | 1467.937 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.108 | 1.924 | 0.107 | 1.924 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.224 | 2.250 | 2.198 | 2.250 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.051 | 0.057 | 0.049 | 0.057 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.427 | 0.436 | 0.418 | 0.436 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.024 | 8.150 | 5.969 | 8.150 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.691 | 14.095 | 13.573 | 14.095 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.988 | 1.096 | 0.950 | 1.096 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.887 | 2.966 | 2.876 | 2.966 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 162.520 | 195.172 | 159.855 | 195.172 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1450.151 | 1482.945 | 1438.932 | 1482.945 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.107 | 0.135 | 0.098 | 0.135 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.654 | 2.691 | 2.570 | 2.691 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.049 | 0.061 | 0.045 | 0.061 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.628 | 0.650 | 0.625 | 0.650 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.329 | 39.073 | 38.319 | 39.073 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 39.503 | 40.229 | 39.131 | 40.229 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.097 | 1.216 | 1.088 | 1.216 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.574 | 3.649 | 3.535 | 3.649 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 166.325 | 174.357 | 160.148 | 174.357 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1459.203 | 1495.413 | 1447.884 | 1495.413 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.118 | 0.158 | 0.116 | 0.158 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.320 | 2.586 | 2.256 | 2.586 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.113 | 0.130 | 0.095 | 0.130 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.550 | 0.616 | 0.527 | 0.616 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 104.206 | 118.375 | 104.144 | 118.375 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 123.130 | 124.288 | 122.829 | 124.288 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.315 | 1.495 | 1.264 | 1.495 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.429 | 3.614 | 3.349 | 3.614 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 167.638 | 181.568 | 165.380 | 181.568 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1464.715 | 1473.687 | 1446.438 | 1473.687 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.112 | 0.150 | 0.109 | 0.150 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.238 | 2.279 | 2.188 | 2.279 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.055 | 0.060 | 0.053 | 0.060 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.421 | 0.454 | 0.413 | 0.454 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.214 | 8.996 | 5.703 | 8.996 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.432 | 14.702 | 13.285 | 14.702 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.991 | 1.025 | 0.990 | 1.025 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.062 | 3.153 | 3.036 | 3.153 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.969 | 170.108 | 157.902 | 170.108 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1456.834 | 1479.492 | 1452.518 | 1479.492 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.209 | 0.112 | 0.209 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.069 | 2.217 | 2.045 | 2.217 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.061 | 0.049 | 0.061 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.464 | 0.489 | 0.462 | 0.489 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 114.461 | 114.958 | 113.697 | 114.958 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 129.897 | 133.478 | 129.211 | 133.478 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.979 | 1.030 | 0.931 | 1.030 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 3.465 | 6.019 | 3.362 | 6.019 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.844 | 162.672 | 157.575 | 162.672 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1449.564 | 1470.774 | 1442.759 | 1470.774 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.116 | 0.144 | 0.109 | 0.144 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.099 | 2.230 | 2.055 | 2.230 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.055 | 0.070 | 0.053 | 0.070 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.428 | 0.475 | 0.423 | 0.475 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.432 | 17.937 | 14.394 | 17.937 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 21.239 | 22.300 | 20.818 | 22.300 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.951 | 1.120 | 0.928 | 1.120 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.958 | 3.294 | 2.856 | 3.294 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 177.804 | 188.442 | 173.731 | 188.442 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1446.062 | 1501.201 | 1441.538 | 1501.201 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.138 | 0.150 | 0.122 | 0.150 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.453 | 3.470 | 3.346 | 3.470 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.057 | 0.072 | 0.056 | 0.072 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.622 | 0.630 | 0.620 | 0.630 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.808 | 9.938 | 9.482 | 9.938 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.555 | 18.453 | 17.431 | 18.453 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 1.288 | 1.778 | 1.260 | 1.778 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.211 | 4.273 | 4.185 | 4.273 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.298 | 165.157 | 156.558 | 165.157 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1447.220 | 1508.606 | 1436.078 | 1508.606 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.138 | 0.105 | 0.138 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.218 | 2.276 | 2.167 | 2.276 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.050 | 0.061 | 0.049 | 0.061 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.439 | 0.483 | 0.409 | 0.483 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.068 | 7.919 | 6.049 | 7.919 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 14.336 | 15.815 | 13.971 | 15.815 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 1.015 | 1.096 | 0.979 | 1.096 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.808 | 2.906 | 2.735 | 2.906 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 167.322 | 181.422 | 162.169 | 181.422 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1444.414 | 1455.281 | 1440.275 | 1455.281 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.114 | 0.152 | 0.112 | 0.152 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.228 | 2.319 | 2.202 | 2.319 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.053 | 0.101 | 0.052 | 0.101 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.456 | 0.468 | 0.427 | 0.468 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 9.811 | 11.580 | 9.764 | 11.580 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.983 | 16.410 | 15.867 | 16.410 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 1.117 | 1.205 | 1.058 | 1.205 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.824 | 2.855 | 2.789 | 2.855 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 170.591 | 179.011 | 164.875 | 179.011 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1438.895 | 1465.841 | 1436.149 | 1465.841 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.679 | 0.154 | 0.679 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.706 | 3.851 | 3.701 | 3.851 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.075 | 0.168 | 0.052 | 0.168 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.664 | 0.684 | 0.645 | 0.684 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 30.286 | 30.982 | 29.625 | 30.982 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 45.289 | 48.050 | 43.583 | 48.050 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 1.195 | 1.295 | 1.053 | 1.295 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.236 | 6.349 | 5.131 | 6.349 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 169.341 | 175.822 | 166.012 | 175.822 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1452.918 | 1479.986 | 1450.656 | 1479.986 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.176 | 0.258 | 0.150 | 0.258 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.762 | 3.874 | 3.744 | 3.874 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.065 | 0.075 | 0.053 | 0.075 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.684 | 0.705 | 0.676 | 0.705 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 26.548 | 28.017 | 26.377 | 28.017 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 40.821 | 43.097 | 40.304 | 43.097 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 1.005 | 1.151 | 0.990 | 1.151 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.119 | 5.256 | 5.110 | 5.256 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 171.038 | 174.471 | 169.751 | 174.471 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1452.958 | 1478.825 | 1448.426 | 1478.825 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.110 | 0.178 | 0.104 | 0.178 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.227 | 2.256 | 2.227 | 2.256 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.058 | 0.068 | 0.049 | 0.068 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.425 | 0.484 | 0.422 | 0.484 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.847 | 12.423 | 8.463 | 12.423 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 17.015 | 19.467 | 16.803 | 19.467 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 1.009 | 1.186 | 0.921 | 1.186 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 3.366 | 7.720 | 3.060 | 7.720 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 171.503 | 187.525 | 171.051 | 187.525 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1448.251 | 1485.763 | 1444.004 | 1485.763 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.090 | 0.105 | 0.089 | 0.105 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.456 | 2.577 | 2.393 | 2.577 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.039 | 0.041 | 0.036 | 0.041 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.459 | 0.508 | 0.458 | 0.508 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.759 | 8.452 | 7.585 | 8.452 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.428 | 15.607 | 15.237 | 15.607 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.243 | 1.471 | 1.149 | 1.471 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.314 | 3.701 | 3.234 | 3.701 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 166.608 | 174.773 | 161.690 | 174.773 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1456.326 | 1509.273 | 1455.070 | 1509.273 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.095 | 0.116 | 0.091 | 0.116 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.405 | 2.431 | 2.389 | 2.431 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.041 | 0.059 | 0.039 | 0.059 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.451 | 0.506 | 0.435 | 0.506 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.386 | 9.983 | 9.263 | 9.983 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.587 | 20.204 | 17.385 | 20.204 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.314 | 1.810 | 1.274 | 1.810 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.452 | 4.829 | 3.292 | 4.829 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 174.007 | 187.274 | 161.784 | 187.274 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1446.437 | 1482.895 | 1434.580 | 1482.895 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.126 | 0.169 | 0.112 | 0.169 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.239 | 2.292 | 2.160 | 2.292 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.059 | 0.093 | 0.051 | 0.093 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.409 | 0.437 | 0.404 | 0.437 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.500 | 16.072 | 10.311 | 16.072 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 18.201 | 18.980 | 18.017 | 18.980 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 1.178 | 1.441 | 0.986 | 1.441 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.908 | 3.084 | 2.835 | 3.084 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 172.058 | 179.238 | 166.636 | 179.238 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1446.201 | 1467.073 | 1438.874 | 1467.073 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.117 | 0.138 | 0.114 | 0.138 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.207 | 2.240 | 2.202 | 2.240 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.047 | 0.076 | 0.044 | 0.076 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.428 | 0.444 | 0.412 | 0.444 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.731 | 11.266 | 7.665 | 11.266 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.956 | 19.574 | 14.851 | 19.574 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.996 | 1.008 | 0.937 | 1.008 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 3.029 | 3.339 | 2.939 | 3.339 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 167.897 | 191.284 | 167.329 | 191.284 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1452.639 | 1482.156 | 1442.620 | 1482.156 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.106 | 0.124 | 0.088 | 0.124 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.251 | 2.402 | 2.208 | 2.402 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.079 | 0.284 | 0.074 | 0.284 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.424 | 0.461 | 0.422 | 0.461 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.560 | 16.407 | 15.288 | 16.407 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 25.678 | 27.226 | 24.582 | 27.226 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.387 | 1.492 | 1.245 | 1.492 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.313 | 3.548 | 3.286 | 3.548 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 206.985 | 227.654 | 196.197 | 227.654 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1611.127 | 1684.592 | 1590.289 | 1684.592 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 177.611 | 184.919 | 171.396 | 184.919 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1549.421 | 1636.336 | 1536.955 | 1636.336 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.153 | 0.211 | 0.130 | 0.211 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.541 | 2.647 | 2.467 | 2.647 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.089 | 0.106 | 0.085 | 0.106 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.524 | 0.634 | 0.509 | 0.634 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.066 | 0.081 | 0.042 | 0.081 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.528 | 0.578 | 0.506 | 0.578 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.152 | 1.555 | 1.075 | 1.555 | 142.2 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 91.621 | 97.628 | 88.463 | 97.628 | 122.6 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 200.740 | 204.368 | 191.251 | 204.368 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1519.559 | 1540.059 | 1506.305 | 1540.059 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.684 | 172.029 | 162.219 | 172.029 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1480.960 | 1531.660 | 1466.538 | 1531.660 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.171 | 0.233 | 0.126 | 0.233 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.530 | 3.081 | 2.487 | 3.081 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.073 | 0.088 | 0.062 | 0.088 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.480 | 0.505 | 0.464 | 0.505 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.058 | 0.079 | 0.042 | 0.079 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.536 | 0.550 | 0.528 | 0.550 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.652 | 0.794 | 0.607 | 0.794 | 141.3 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.872 | 38.220 | 23.641 | 38.220 | 122.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 198.845 | 212.242 | 190.714 | 212.242 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1522.928 | 1585.535 | 1518.306 | 1585.535 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.042 | 184.336 | 159.936 | 184.336 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1498.289 | 1544.308 | 1481.218 | 1544.308 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.140 | 0.188 | 0.137 | 0.188 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.780 | 4.006 | 3.690 | 4.006 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.086 | 0.090 | 0.073 | 0.090 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.681 | 0.727 | 0.679 | 0.727 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.057 | 0.091 | 0.039 | 0.091 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.581 | 0.790 | 0.558 | 0.790 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.683 | 1.018 | 0.619 | 1.018 | 140.3 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 32.987 | 51.072 | 30.173 | 51.072 | 122.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 194.085 | 208.722 | 191.805 | 208.722 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1528.541 | 1548.024 | 1510.573 | 1548.024 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.711 | 175.174 | 161.101 | 175.174 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1490.440 | 1560.903 | 1476.256 | 1560.903 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.152 | 0.241 | 0.128 | 0.241 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.844 | 3.925 | 3.782 | 3.925 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.083 | 0.113 | 0.070 | 0.113 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.741 | 0.947 | 0.723 | 0.947 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.063 | 0.088 | 0.054 | 0.088 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.570 | 0.591 | 0.533 | 0.591 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.907 | 1.962 | 0.591 | 1.962 | 141.9 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.404 | 39.177 | 25.243 | 39.177 | 122.6 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 173.606 | 177.610 | 170.501 | 177.610 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1550.034 | 1595.118 | 1530.787 | 1595.118 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.296 | 175.942 | 158.670 | 175.942 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1589.908 | 1668.785 | 1520.258 | 1668.785 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.114 | 0.575 | 0.087 | 0.575 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.818 | 3.161 | 2.545 | 3.161 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.061 | 2.020 | 0.050 | 2.020 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.745 | 0.817 | 0.668 | 0.817 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.040 | 0.596 | 0.024 | 0.596 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.592 | 0.613 | 0.582 | 0.613 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.225 | 3.696 | 1.131 | 3.696 | 139.4 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 27.817 | 40.808 | 25.716 | 40.808 | 122.6 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 200.397 | 223.664 | 189.838 | 223.664 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1592.497 | 1623.403 | 1583.582 | 1623.403 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.840 | 180.992 | 161.747 | 180.992 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1554.141 | 1614.808 | 1546.331 | 1614.808 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.159 | 0.247 | 0.129 | 0.247 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.317 | 2.678 | 2.304 | 2.678 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.098 | 0.226 | 0.068 | 0.226 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.581 | 0.638 | 0.480 | 0.638 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.022 | 0.047 | 0.020 | 0.047 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.482 | 0.506 | 0.471 | 0.506 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.292 | 3.375 | 0.864 | 3.375 | 142.6 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 84.509 | 93.782 | 80.026 | 93.782 | 122.6 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `67c0fadac27b562c968436cf839143d83e560a3d` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:1b22e7d1a158448616c87b246daa988a97df3cadb41185b7516c76366cd66dbf`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:d245bbb205a084864a20cfca0960ee30ba9975f2d423726ed274d0bdf1e27651`

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

