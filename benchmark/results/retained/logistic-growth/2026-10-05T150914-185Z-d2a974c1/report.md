# Effect Prophet benchmark — 2026-10-05T150914-185Z-d2a974c1

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
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 19.551 | 19.862 | 18.347 | 19.862 | 149.7 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 63.142 | 69.451 | 63.055 | 69.451 | 122.6 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 17.060 | 18.028 | 15.834 | 18.028 | 159.9 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 59.144 | 64.027 | 58.873 | 64.027 | 122.6 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 205.475 | 216.999 | 197.616 | 216.999 | 159.5 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1477.432 | 1481.441 | 1460.060 | 1481.441 | 122.6 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.168 | 2.313 | 2.150 | 2.313 | 159.3 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.288 | 1.307 | 1.280 | 1.307 | 122.6 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.043 | 0.074 | 0.038 | 0.074 | 129.1 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.473 | 0.530 | 0.471 | 0.530 | 122.6 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.262 | 0.869 | 0.234 | 0.869 | 159.3 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.248 | 5.528 | 5.198 | 5.528 | 122.6 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.216 | 3.488 | 1.213 | 3.488 | 136.7 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.724 | 0.776 | 0.717 | 0.776 | 122.6 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.388 | 17.950 | 13.164 | 17.950 | 158.5 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 41.625 | 42.375 | 41.161 | 42.375 | 122.6 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 206.018 | 208.908 | 191.775 | 208.908 | 159.6 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1488.475 | 1583.020 | 1487.477 | 1583.020 | 122.6 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.583 | 2.793 | 1.372 | 2.793 | 159.3 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.797 | 0.811 | 0.770 | 0.811 | 122.6 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.016 | 0.033 | 0.015 | 0.033 | 127.4 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.378 | 0.440 | 0.369 | 0.440 | 122.6 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.253 | 0.294 | 0.207 | 0.294 | 151.0 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.283 | 5.589 | 5.220 | 5.589 | 122.6 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.192 | 1.389 | 1.101 | 1.389 | 132.0 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.544 | 0.558 | 0.502 | 0.558 | 122.6 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.303 | 18.942 | 17.066 | 18.942 | 148.0 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 63.540 | 65.040 | 59.819 | 65.040 | 122.6 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 18.902 | 19.565 | 18.730 | 19.565 | 164.7 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 30.501 | 31.899 | 30.353 | 31.899 | 122.6 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.209 | 0.227 | 0.202 | 0.227 | 165.5 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 122.6 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.286 | 0.330 | 0.265 | 0.330 | 165.0 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 122.6 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 38.835 | 39.555 | 37.640 | 39.555 | 160.6 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 118.840 | 121.962 | 113.013 | 121.962 | 122.6 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.048 | 0.040 | 0.048 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.510 | 0.541 | 0.502 | 0.541 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 201.431 | 257.922 | 191.479 | 257.922 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1468.045 | 1507.381 | 1467.495 | 1507.381 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.925 | 171.693 | 164.026 | 171.693 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1452.856 | 1483.818 | 1440.566 | 1483.818 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.084 | 0.118 | 0.074 | 0.118 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.564 | 3.070 | 2.519 | 3.070 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.085 | 0.101 | 0.055 | 0.101 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.486 | 0.563 | 0.456 | 0.563 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 21.218 | 23.667 | 21.127 | 23.667 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 37.520 | 40.541 | 36.387 | 40.541 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 22.665 | 24.271 | 21.621 | 24.271 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 36.829 | 45.018 | 36.612 | 45.018 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.541 | 21.845 | 21.315 | 21.845 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.522 | 32.950 | 32.262 | 32.950 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.418 | 0.440 | 0.397 | 0.440 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.698 | 3.874 | 3.651 | 3.874 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.056 | 0.067 | 0.047 | 0.067 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.497 | 0.509 | 0.493 | 0.509 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 192.528 | 200.051 | 190.710 | 200.051 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1476.578 | 1506.021 | 1476.010 | 1506.021 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 167.515 | 169.590 | 159.308 | 169.590 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1445.077 | 1567.079 | 1424.725 | 1567.079 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.087 | 0.200 | 0.070 | 0.200 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.506 | 3.268 | 2.437 | 3.268 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.059 | 0.086 | 0.055 | 0.086 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.461 | 0.528 | 0.456 | 0.528 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.438 | 17.529 | 17.305 | 17.529 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 31.343 | 34.691 | 30.324 | 34.691 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.747 | 20.089 | 17.580 | 20.089 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.940 | 37.798 | 30.932 | 37.798 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.661 | 19.186 | 17.597 | 19.186 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.743 | 26.928 | 26.488 | 26.928 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.424 | 0.449 | 0.416 | 0.449 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.525 | 3.589 | 3.525 | 3.589 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.036 | 0.037 | 0.029 | 0.037 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.489 | 0.532 | 0.471 | 0.532 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 205.124 | 234.585 | 190.389 | 234.585 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1518.662 | 1593.529 | 1494.497 | 1593.529 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 174.043 | 213.515 | 173.940 | 213.515 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1452.137 | 1502.547 | 1448.905 | 1502.547 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.101 | 0.272 | 0.099 | 0.272 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.357 | 2.404 | 2.300 | 2.404 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.065 | 0.082 | 0.054 | 0.082 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.445 | 0.490 | 0.439 | 0.490 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.118 | 20.574 | 18.822 | 20.574 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 33.633 | 35.554 | 33.474 | 35.554 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 20.733 | 22.479 | 19.996 | 22.479 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 34.734 | 36.557 | 32.322 | 36.557 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.069 | 19.454 | 18.676 | 19.454 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 29.215 | 31.046 | 28.792 | 31.046 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.440 | 0.948 | 0.439 | 0.948 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.302 | 3.731 | 3.198 | 3.731 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.044 | 0.020 | 0.044 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.502 | 0.509 | 0.457 | 0.509 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 196.512 | 202.689 | 186.394 | 202.689 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1464.146 | 1488.738 | 1459.049 | 1488.738 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 156.226 | 162.697 | 153.161 | 162.697 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1454.847 | 1490.673 | 1441.207 | 1490.673 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.062 | 0.087 | 0.061 | 0.087 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.330 | 3.248 | 2.231 | 3.248 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.053 | 0.071 | 0.050 | 0.071 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.457 | 0.559 | 0.439 | 0.559 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.282 | 20.025 | 18.790 | 20.025 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.061 | 33.318 | 32.641 | 33.318 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.613 | 19.885 | 19.390 | 19.885 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.166 | 32.745 | 32.039 | 32.745 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.707 | 20.662 | 18.920 | 20.662 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 28.941 | 29.539 | 28.489 | 29.539 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.282 | 0.367 | 0.261 | 0.367 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.242 | 3.367 | 3.230 | 3.367 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.040 | 0.049 | 0.038 | 0.049 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.596 | 0.651 | 0.567 | 0.651 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 176.792 | 190.236 | 172.892 | 190.236 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1447.501 | 1530.477 | 1434.719 | 1530.477 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 160.349 | 167.371 | 160.079 | 167.371 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1434.242 | 1469.273 | 1425.502 | 1469.273 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.088 | 0.106 | 0.085 | 0.106 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.600 | 2.809 | 2.534 | 2.809 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.050 | 0.053 | 0.044 | 0.053 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.640 | 0.689 | 0.628 | 0.689 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.307 | 4.490 | 4.135 | 4.490 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.851 | 13.994 | 13.603 | 13.994 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.359 | 4.753 | 4.358 | 4.753 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.998 | 13.648 | 12.886 | 13.648 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 5.227 | 6.573 | 5.057 | 6.573 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.816 | 11.846 | 9.716 | 11.846 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.382 | 0.397 | 0.380 | 0.397 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.533 | 3.779 | 3.298 | 3.779 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.019 | 0.021 | 0.018 | 0.021 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.501 | 0.515 | 0.477 | 0.515 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 191.983 | 198.083 | 185.703 | 198.083 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1563.435 | 1736.627 | 1560.215 | 1736.627 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.291 | 170.016 | 150.531 | 170.016 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1503.691 | 1609.981 | 1493.312 | 1609.981 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.091 | 0.093 | 0.088 | 0.093 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.332 | 2.583 | 2.278 | 2.583 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.060 | 0.070 | 0.045 | 0.070 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.502 | 0.537 | 0.466 | 0.537 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.508 | 20.785 | 20.235 | 20.785 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 41.649 | 49.020 | 39.846 | 49.020 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.948 | 22.147 | 20.777 | 22.147 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 37.216 | 37.804 | 36.284 | 37.804 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.536 | 22.772 | 20.412 | 22.772 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 33.533 | 35.109 | 33.392 | 35.109 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.390 | 0.417 | 0.367 | 0.417 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.756 | 5.755 | 3.363 | 5.755 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 173.788 | 187.544 | 170.265 | 187.544 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1457.557 | 1503.347 | 1425.657 | 1503.347 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.140 | 0.208 | 0.138 | 0.208 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.204 | 2.282 | 2.193 | 2.282 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.067 | 0.072 | 0.044 | 0.072 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.455 | 0.463 | 0.455 | 0.463 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.554 | 4.965 | 1.499 | 4.965 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.665 | 6.388 | 5.664 | 6.388 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 1.363 | 1.485 | 1.154 | 1.485 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.881 | 2.912 | 2.845 | 2.912 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 161.035 | 184.673 | 160.508 | 184.673 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1455.431 | 1628.040 | 1448.699 | 1628.040 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.088 | 0.092 | 0.084 | 0.092 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.488 | 2.603 | 2.464 | 2.603 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.038 | 0.078 | 0.034 | 0.078 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.616 | 0.635 | 0.605 | 0.635 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 3.111 | 3.398 | 3.104 | 3.398 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.325 | 8.903 | 7.238 | 8.903 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.003 | 1.345 | 0.895 | 1.345 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.974 | 3.099 | 2.907 | 3.099 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.501 | 192.532 | 160.983 | 192.532 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1420.853 | 1438.386 | 1420.125 | 1438.386 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.138 | 0.209 | 0.100 | 0.209 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.154 | 2.267 | 2.151 | 2.267 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.049 | 0.084 | 0.046 | 0.084 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.435 | 0.653 | 0.406 | 0.653 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 19.747 | 20.746 | 18.481 | 20.746 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 28.459 | 30.363 | 27.488 | 30.363 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 1.073 | 1.245 | 0.925 | 1.245 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.930 | 3.217 | 2.827 | 3.217 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.800 | 160.511 | 155.838 | 160.511 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1414.024 | 1474.111 | 1409.475 | 1474.111 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.204 | 0.114 | 0.204 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.181 | 2.346 | 2.163 | 2.346 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.052 | 0.063 | 0.050 | 0.063 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.434 | 0.469 | 0.407 | 0.469 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 8.889 | 10.877 | 8.870 | 10.877 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.596 | 18.958 | 17.184 | 18.958 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.973 | 0.987 | 0.925 | 0.987 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 3.034 | 3.174 | 2.899 | 3.174 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.410 | 167.415 | 156.928 | 167.415 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1423.259 | 1567.742 | 1421.195 | 1567.742 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.213 | 0.101 | 0.213 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.053 | 2.162 | 2.007 | 2.162 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.051 | 0.060 | 0.049 | 0.060 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.431 | 0.413 | 0.431 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.513 | 9.058 | 6.332 | 9.058 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.534 | 13.124 | 12.353 | 13.124 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.957 | 1.014 | 0.914 | 1.014 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.857 | 2.957 | 2.810 | 2.957 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 165.517 | 175.765 | 162.736 | 175.765 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1427.525 | 1478.813 | 1424.786 | 1478.813 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.157 | 0.118 | 0.157 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.053 | 2.100 | 2.051 | 2.100 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.055 | 0.076 | 0.052 | 0.076 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.440 | 0.467 | 0.429 | 0.467 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.870 | 10.680 | 8.594 | 10.680 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 16.732 | 18.331 | 15.102 | 18.331 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 1.080 | 1.370 | 1.071 | 1.370 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.906 | 3.126 | 2.904 | 3.126 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.887 | 176.525 | 161.849 | 176.525 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1423.156 | 1456.008 | 1421.366 | 1456.008 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.121 | 0.162 | 0.112 | 0.162 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.157 | 2.186 | 2.115 | 2.186 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.073 | 0.082 | 0.051 | 0.082 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.411 | 0.444 | 0.400 | 0.444 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.772 | 9.550 | 7.761 | 9.550 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.049 | 15.724 | 14.545 | 15.724 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 1.041 | 1.121 | 0.991 | 1.121 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.833 | 2.917 | 2.829 | 2.917 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.190 | 188.179 | 159.509 | 188.179 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1436.146 | 1447.825 | 1434.036 | 1447.825 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.128 | 0.139 | 0.123 | 0.139 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.185 | 2.250 | 2.170 | 2.250 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.060 | 0.086 | 0.058 | 0.086 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.468 | 0.529 | 0.410 | 0.529 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 17.820 | 19.804 | 17.221 | 19.804 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 24.287 | 26.144 | 23.876 | 26.144 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 1.082 | 1.172 | 0.955 | 1.172 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.905 | 3.451 | 2.884 | 3.451 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 169.331 | 201.582 | 162.495 | 201.582 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1442.909 | 1501.051 | 1426.514 | 1501.051 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.160 | 0.274 | 0.117 | 0.274 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.240 | 2.306 | 2.236 | 2.306 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.062 | 0.119 | 0.055 | 0.119 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.449 | 0.561 | 0.403 | 0.561 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 17.166 | 18.708 | 16.932 | 18.708 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.450 | 24.949 | 23.569 | 24.949 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.983 | 2.486 | 0.949 | 2.486 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.861 | 3.036 | 2.815 | 3.036 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 167.135 | 170.927 | 161.702 | 170.927 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1436.018 | 1477.515 | 1429.117 | 1477.515 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.098 | 0.136 | 0.095 | 0.136 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.454 | 2.699 | 2.408 | 2.699 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.043 | 0.048 | 0.038 | 0.048 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.454 | 0.488 | 0.434 | 0.488 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 17.112 | 17.894 | 16.244 | 17.894 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 27.906 | 29.440 | 26.516 | 29.440 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.217 | 1.368 | 1.145 | 1.368 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.462 | 3.593 | 3.365 | 3.593 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 160.300 | 172.924 | 158.063 | 172.924 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1459.997 | 1507.499 | 1451.474 | 1507.499 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.129 | 0.298 | 0.111 | 0.298 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.197 | 2.362 | 2.157 | 2.362 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.060 | 0.083 | 0.045 | 0.083 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.417 | 0.445 | 0.397 | 0.445 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 17.344 | 18.395 | 16.547 | 18.395 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.623 | 26.389 | 25.181 | 26.389 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 1.062 | 1.137 | 0.959 | 1.137 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.938 | 3.135 | 2.799 | 3.135 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 164.608 | 171.727 | 157.146 | 171.727 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1447.785 | 1493.102 | 1443.912 | 1493.102 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.117 | 0.135 | 0.103 | 0.135 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.222 | 2.288 | 2.205 | 2.288 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.053 | 0.078 | 0.043 | 0.078 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.425 | 0.460 | 0.421 | 0.460 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.591 | 8.540 | 6.489 | 8.540 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.382 | 13.968 | 13.339 | 13.968 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.994 | 1.139 | 0.901 | 1.139 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.903 | 2.998 | 2.873 | 2.998 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 160.435 | 185.916 | 160.149 | 185.916 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1447.540 | 1450.112 | 1429.051 | 1450.112 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.116 | 0.137 | 0.101 | 0.137 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.582 | 2.688 | 2.537 | 2.688 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.051 | 0.056 | 0.050 | 0.056 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.623 | 1.205 | 0.598 | 1.205 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.852 | 41.033 | 38.560 | 41.033 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 40.410 | 45.590 | 40.040 | 45.590 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.155 | 1.416 | 1.069 | 1.416 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.504 | 3.638 | 3.464 | 3.638 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 164.344 | 173.929 | 162.096 | 173.929 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1438.836 | 1474.680 | 1435.838 | 1474.680 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.113 | 0.138 | 0.100 | 0.138 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.255 | 2.540 | 2.233 | 2.540 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.096 | 0.232 | 0.068 | 0.232 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.488 | 0.526 | 0.436 | 0.526 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 103.070 | 105.857 | 102.507 | 105.857 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 120.709 | 125.652 | 120.151 | 125.652 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.176 | 1.190 | 1.135 | 1.190 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.431 | 3.683 | 3.394 | 3.683 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 166.896 | 176.794 | 163.303 | 176.794 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1455.397 | 1476.026 | 1451.708 | 1476.026 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.129 | 0.193 | 0.116 | 0.193 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.225 | 2.273 | 2.171 | 2.273 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.053 | 0.055 | 0.049 | 0.055 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.420 | 0.458 | 0.408 | 0.458 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.407 | 7.448 | 6.001 | 7.448 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.630 | 14.373 | 13.138 | 14.373 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 1.071 | 1.093 | 1.033 | 1.093 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 2.994 | 3.454 | 2.993 | 3.454 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.568 | 193.167 | 164.973 | 193.167 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1441.846 | 1523.035 | 1438.216 | 1523.035 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.162 | 0.121 | 0.162 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.083 | 2.118 | 1.982 | 2.118 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.051 | 0.066 | 0.049 | 0.066 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.432 | 0.473 | 0.405 | 0.473 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 117.292 | 118.572 | 116.878 | 118.572 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 126.836 | 127.970 | 126.626 | 127.970 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.997 | 1.305 | 0.929 | 1.305 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.839 | 2.923 | 2.792 | 2.923 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 187.970 | 223.126 | 172.044 | 223.126 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1513.237 | 1853.695 | 1499.755 | 1853.695 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.128 | 0.163 | 0.122 | 0.163 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.140 | 2.357 | 2.135 | 2.357 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.049 | 0.088 | 0.046 | 0.088 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.490 | 0.535 | 0.427 | 0.535 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.516 | 16.733 | 14.648 | 16.733 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.563 | 23.511 | 19.833 | 23.511 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.905 | 1.012 | 0.888 | 1.012 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 3.123 | 3.228 | 3.040 | 3.228 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 164.046 | 176.475 | 155.571 | 176.475 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1464.551 | 1491.593 | 1452.141 | 1491.593 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.121 | 0.133 | 0.115 | 0.133 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.532 | 4.578 | 3.423 | 4.578 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.055 | 0.074 | 0.055 | 0.074 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.699 | 1.010 | 0.632 | 1.010 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.433 | 9.537 | 9.208 | 9.537 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 20.715 | 22.004 | 19.993 | 22.004 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 1.182 | 1.632 | 1.155 | 1.632 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.520 | 5.529 | 4.385 | 5.529 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 176.935 | 215.623 | 173.396 | 215.623 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1495.288 | 1516.784 | 1455.499 | 1516.784 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.118 | 0.165 | 0.098 | 0.165 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.264 | 2.406 | 2.218 | 2.406 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.052 | 0.053 | 0.052 | 0.053 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.459 | 0.770 | 0.418 | 0.770 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 7.219 | 9.307 | 7.066 | 9.307 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.512 | 14.201 | 13.424 | 14.201 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 1.040 | 1.117 | 0.985 | 1.117 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.923 | 4.315 | 2.828 | 4.315 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 169.851 | 206.126 | 165.390 | 206.126 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1460.932 | 1468.745 | 1459.130 | 1468.745 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.210 | 0.135 | 0.210 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.246 | 2.935 | 2.195 | 2.935 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.079 | 0.107 | 0.064 | 0.107 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.445 | 0.450 | 0.425 | 0.450 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.342 | 15.241 | 10.111 | 15.241 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 16.350 | 18.625 | 15.901 | 18.625 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.971 | 1.271 | 0.966 | 1.271 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.801 | 3.384 | 2.779 | 3.384 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.865 | 185.560 | 157.520 | 185.560 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1480.689 | 1500.154 | 1458.428 | 1500.154 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.168 | 0.563 | 0.149 | 0.563 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.742 | 3.863 | 3.692 | 3.863 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.066 | 0.068 | 0.065 | 0.068 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.656 | 0.681 | 0.643 | 0.681 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 29.038 | 29.930 | 28.838 | 29.930 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 44.448 | 48.328 | 43.834 | 48.328 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 1.058 | 1.273 | 1.022 | 1.273 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.082 | 5.139 | 5.038 | 5.139 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 169.781 | 185.838 | 167.281 | 185.838 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1462.884 | 1499.360 | 1456.790 | 1499.360 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.185 | 0.645 | 0.148 | 0.645 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.799 | 4.037 | 3.758 | 4.037 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.065 | 0.070 | 0.052 | 0.070 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.649 | 0.739 | 0.645 | 0.739 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 26.891 | 29.581 | 26.588 | 29.581 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 40.945 | 42.287 | 39.746 | 42.287 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 1.112 | 1.674 | 1.074 | 1.674 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.151 | 5.751 | 5.105 | 5.751 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 159.076 | 165.247 | 157.589 | 165.247 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1459.379 | 1491.457 | 1458.966 | 1491.457 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.120 | 0.128 | 0.107 | 0.128 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.285 | 3.239 | 2.270 | 3.239 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.049 | 0.061 | 0.048 | 0.061 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.463 | 0.636 | 0.445 | 0.636 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.698 | 11.499 | 8.637 | 11.499 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.588 | 17.895 | 16.121 | 17.895 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 1.051 | 1.218 | 1.010 | 1.218 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.993 | 3.041 | 2.933 | 3.041 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 159.501 | 170.633 | 157.020 | 170.633 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1444.713 | 1534.239 | 1435.660 | 1534.239 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.093 | 0.095 | 0.089 | 0.095 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.396 | 2.552 | 2.389 | 2.552 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.041 | 0.052 | 0.038 | 0.052 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.459 | 0.483 | 0.457 | 0.483 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 8.225 | 8.390 | 8.170 | 8.390 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.428 | 16.510 | 14.938 | 16.510 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.142 | 1.180 | 1.133 | 1.180 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.188 | 3.305 | 3.186 | 3.305 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 161.179 | 169.573 | 156.492 | 169.573 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1460.518 | 1519.542 | 1454.289 | 1519.542 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.097 | 0.102 | 0.090 | 0.102 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.465 | 3.318 | 2.408 | 3.318 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.041 | 0.045 | 0.037 | 0.045 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.445 | 0.612 | 0.437 | 0.612 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.620 | 9.924 | 9.538 | 9.924 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.511 | 18.259 | 17.054 | 18.259 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.191 | 1.247 | 1.128 | 1.247 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.255 | 9.970 | 3.212 | 9.970 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 163.995 | 176.696 | 159.216 | 176.696 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1464.037 | 1487.379 | 1448.992 | 1487.379 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.113 | 0.195 | 0.094 | 0.195 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.246 | 2.271 | 2.235 | 2.271 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.052 | 0.062 | 0.049 | 0.062 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.441 | 0.458 | 0.433 | 0.458 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.452 | 12.853 | 10.259 | 12.853 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 18.946 | 21.037 | 17.998 | 21.037 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.966 | 1.044 | 0.918 | 1.044 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 3.053 | 3.122 | 2.956 | 3.122 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 169.039 | 184.051 | 163.041 | 184.051 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1449.784 | 1488.559 | 1440.629 | 1488.559 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.114 | 0.133 | 0.112 | 0.133 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.252 | 2.259 | 2.237 | 2.259 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.057 | 0.066 | 0.050 | 0.066 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.442 | 0.444 | 0.427 | 0.444 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.795 | 10.360 | 7.564 | 10.360 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 15.283 | 15.815 | 14.971 | 15.815 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.966 | 1.169 | 0.919 | 1.169 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.869 | 3.008 | 2.852 | 3.008 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 162.601 | 171.299 | 161.649 | 171.299 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1459.887 | 1547.667 | 1453.002 | 1547.667 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.097 | 0.114 | 0.087 | 0.114 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.296 | 2.354 | 2.256 | 2.354 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.059 | 0.076 | 0.050 | 0.076 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.441 | 0.479 | 0.418 | 0.479 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.145 | 15.850 | 15.094 | 15.850 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.518 | 26.079 | 24.287 | 26.079 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.284 | 1.541 | 1.251 | 1.541 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.302 | 3.338 | 3.275 | 3.338 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 196.203 | 203.326 | 194.496 | 203.326 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1541.074 | 1670.358 | 1539.875 | 1670.358 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.645 | 182.578 | 160.088 | 182.578 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1517.548 | 1647.069 | 1507.732 | 1647.069 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.136 | 0.186 | 0.112 | 0.186 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.503 | 2.702 | 2.458 | 2.702 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.077 | 0.089 | 0.060 | 0.089 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.475 | 0.497 | 0.443 | 0.497 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.051 | 0.058 | 0.043 | 0.058 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.494 | 0.728 | 0.491 | 0.728 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.076 | 1.435 | 0.910 | 1.435 | 144.3 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 88.380 | 92.405 | 88.324 | 92.405 | 122.6 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 200.133 | 219.525 | 189.336 | 219.525 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1484.237 | 1518.657 | 1477.680 | 1518.657 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.543 | 207.396 | 154.721 | 207.396 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1480.174 | 1541.500 | 1449.092 | 1541.500 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.189 | 0.319 | 0.111 | 0.319 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.554 | 3.084 | 2.466 | 3.084 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.102 | 0.114 | 0.067 | 0.114 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.466 | 0.522 | 0.439 | 0.522 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.049 | 0.108 | 0.040 | 0.108 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.545 | 0.597 | 0.490 | 0.597 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.607 | 0.735 | 0.569 | 0.735 | 144.2 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 26.258 | 40.024 | 23.800 | 40.024 | 122.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 200.706 | 213.436 | 194.289 | 213.436 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1490.831 | 1507.512 | 1475.567 | 1507.512 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.838 | 165.872 | 154.990 | 165.872 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1468.248 | 1646.370 | 1454.575 | 1646.370 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.147 | 0.179 | 0.133 | 0.179 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.794 | 4.146 | 3.702 | 4.146 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.087 | 0.097 | 0.070 | 0.097 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.675 | 0.946 | 0.655 | 0.946 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.064 | 0.086 | 0.053 | 0.086 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.526 | 0.547 | 0.517 | 0.547 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.885 | 1.256 | 0.724 | 1.256 | 144.7 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.068 | 42.226 | 29.700 | 42.226 | 122.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 190.710 | 199.264 | 188.141 | 199.264 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1490.057 | 1498.698 | 1484.133 | 1498.698 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.716 | 172.440 | 154.915 | 172.440 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1469.454 | 1508.020 | 1431.998 | 1508.020 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.156 | 0.178 | 0.137 | 0.178 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 4.083 | 5.047 | 3.789 | 5.047 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.079 | 0.109 | 0.071 | 0.109 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.722 | 0.934 | 0.649 | 0.934 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.071 | 0.086 | 0.051 | 0.086 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.557 | 0.584 | 0.522 | 0.584 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.677 | 1.256 | 0.599 | 1.256 | 143.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 27.334 | 40.184 | 25.124 | 40.184 | 122.6 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 188.176 | 211.852 | 176.595 | 211.852 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1462.046 | 1519.880 | 1455.278 | 1519.880 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.610 | 186.469 | 161.673 | 186.469 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1460.295 | 1477.000 | 1454.914 | 1477.000 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.154 | 0.297 | 0.110 | 0.297 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.574 | 2.832 | 2.538 | 2.832 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.061 | 0.089 | 0.051 | 0.089 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.641 | 0.684 | 0.623 | 0.684 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.096 | 0.036 | 0.096 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.594 | 0.601 | 0.580 | 0.601 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.132 | 2.113 | 1.020 | 2.113 | 141.9 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.865 | 40.500 | 25.051 | 40.500 | 122.6 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 199.775 | 233.820 | 194.312 | 233.820 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1567.830 | 1691.222 | 1540.925 | 1691.222 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.094 | 174.077 | 157.912 | 174.077 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1510.807 | 1549.503 | 1498.065 | 1549.503 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.124 | 0.156 | 0.120 | 0.156 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.292 | 2.317 | 2.218 | 2.317 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.059 | 0.097 | 0.051 | 0.097 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.446 | 0.493 | 0.438 | 0.493 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.025 | 0.048 | 0.022 | 0.048 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.509 | 0.564 | 0.453 | 0.564 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.993 | 2.815 | 0.814 | 2.815 | 145.0 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 81.409 | 98.826 | 79.439 | 98.826 | 122.6 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `d2a974c150fb09fb54fb4b3aeac555247a1deb35` (dirty)
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
  - `effect-prophet/benchmark-effect:local`: `sha256:ecdbf1674372adc3d7d3f78ffa30dbabfe2d98d32f90ca17f5d424a05b4ada05`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:9209b9f8b7905d93190c45ac0caa73f28a714f9fa18d93ff3bd3a2777e81a8d7`

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

