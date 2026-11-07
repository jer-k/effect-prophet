# Effect Prophet benchmark — 2026-11-07T184211-397Z-3a5a6cec

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
| anomalies-logistic-defaults-99 | scalar-process-different-public-work | passed | 1.096e-1 | 7.468e-4 | 7.468e-4 | 1.097e-1 | 1.382e-2 | 0.657 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Both libraries flagged all 3 injected outliers. Effect flagged at most 3 rows and Python 3; 0 were flagged by only one library, each between the two libraries' bounds. Output-first: investigate internal fit differences in objective. |
| warm-start-logistic-defaults-7-new-rows | equivalent-objective | passed | 5.800e-2 | 1.353e-4 | 1.353e-4 | 5.795e-2 | 1.295e-3 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Each library refit from its own fit of the first 358 rows; their starting parameters differed by at most 0.0656 in scaled units. Output-first: investigate internal fit differences in objective, warm-start-parameters. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-months-metrics | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.682e-1 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. MASE fold scales agree within 1e-12 relative, and overall MASE within its forecasts' difference. Absolute times only. |
| evaluation-logistic-large-parallel | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 6.622e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
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
| mcmc-logistic-explicit-floor-minmax | equivalent-posterior | passed | 6.689e-4 | 4.305e-3 | 1.363e-3 | 4.383e-3 | 3.028e-4 | 0.392 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |
| mcmc-logistic-rate-changes | equivalent-posterior | passed | 3.285e-2 | 1.135e-2 | 1.135e-2 | 3.979e-2 | 2.609e-4 | 0.494 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:df4d0c73d9e0d51227555321b0a47a6cb1b1766995437adc620e0862888b8cf9 | false | n/a | 12 | 3839 | 30576 |

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
| anomalies-logistic-defaults-99 | 0 | 6.473574e+0 | 6.184515e+1 | 5.537158e+1 | output-first | n/a |
| anomalies-logistic-defaults-99 | 1 | 6.473574e+0 | 6.184515e+1 | 5.537158e+1 | output-first | n/a |
| warm-start-logistic-defaults-7-new-rows | 0 | 6.886317e+1 | 1.450545e+2 | 7.619138e+1 | output-first | n/a |
| warm-start-logistic-defaults-7-new-rows | 1 | 6.886317e+1 | 1.450545e+2 | 7.619138e+1 | output-first | n/a |
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

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's. Warm-start parameters are flagged when the two libraries' base fits start their refits further apart than the case allows.

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
| anomalies-logistic-defaults-99 | 0 | objective | -1.234595e+3 | -1.233998e+3 | -5.977039e-1 | 1.000e-2 |
| anomalies-logistic-defaults-99 | 1 | objective | -1.234595e+3 | -1.233998e+3 | -5.977039e-1 | 1.000e-2 |
| warm-start-logistic-defaults-7-new-rows | 0 | objective | -1.687641e+3 | -1.688476e+3 | 8.349156e-1 | 1.000e-2 |
| warm-start-logistic-defaults-7-new-rows | 1 | objective | -1.687641e+3 | -1.688476e+3 | 8.349156e-1 | 1.000e-2 |
| warm-start-logistic-defaults-7-new-rows | 0 | warm-start-parameters | -2.623396e+0 | -2.689005e+0 | 6.560831e-2 | 1.000e-2 |
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

Anomaly workloads check the whole history in-sample. Effect's `warm-anomalies` times the public `anomalies` call, fit included; Python's times a fresh fit, `predict(history, vectorized=False)` and the strict `y < yhat_lower | y > yhat_upper` comparison. Each library's flags must be exactly the rows outside its own value intervals, and both must flag every declared outlier. Rows flagged by one library alone are counted, not failed.

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
| anomalies-logistic-defaults-99 | 365 | 6 | 25 | 365 | 0 | 0 | 1000 | intervals | 67108864 | logistic-anomalies-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10+outliers@70(+25),180(-25),290(+20):changing-capacity:n=365:h=0 / f92aff28ec2c019e6c7a4aa0e8212f37dc46671743801175f23c953ca5e56275 | docs/validation/uncertainty.md#evidence-classes |
| mcmc-logistic-explicit-floor-minmax | 96 | 5 | 2 | 24 | 24 | 24 | 1000 | intervals | 67108864 | logistic-explicit-floor-v1:n=96:h=24:changing-capacity:weekly / c6fa262b4fd7353c7113029e7863b000afba00ec339f72dfaaa26b08a76a0f9b | docs/validation/uncertainty.md#evidence-classes |
| mcmc-logistic-rate-changes | 365 | 6 | 25 | 455 | 455 | 90 | 1000 | intervals | 67108864 | logistic-rate-changes-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10:changing-capacity:n=365:h=90 / a2b86c23197e401e7531c84acd97a4af204be36a92bcf992ce229f99096fe628 | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Effect runs folds one at a time. Python runs them sequentially too, except in `-threads` and `-processes` phases, which time `cross_validation(parallel=...)` with Prophet's default pools and must return the sequential point rows and search scores exactly. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling | n/a |
| evaluation-logistic-large-months-metrics | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 3 | 436 | 273 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |
| evaluation-logistic-large-parallel | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 3 | 12 | 2526 | 84 | 4 | 1 | 0 | n/a / n/a | horizons | b2ade82f1451af519f00e057ad5b8db860287430d3130093fd06b6a70c24c8ce, f21b216c86b55d627c58d554ce407ce8677c0a34e4551bf9d1a2a471efcee514, c2f468d0f6458fa1d0c67d783d8c7e5eb721726c6756c4a00dc9bc8d42ebce0a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 71.606 | 72.959 | 70.800 | 72.959 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 298.218 | 314.161 | 296.319 | 314.161 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 51.949 | 52.290 | 51.727 | 52.290 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 45.116 | 46.417 | 44.138 | 46.417 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.512 | 15.073 | 14.308 | 15.073 | 154.2 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 251.064 | 269.140 | 250.527 | 269.140 | 133.8 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 141.4 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.497 | 0.534 | 0.475 | 0.534 | 133.8 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 207.108 | 277.147 | 201.659 | 277.147 | 157.1 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1505.050 | 1552.803 | 1482.714 | 1552.803 | 133.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 166.410 | 169.663 | 161.063 | 169.663 | 157.4 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1442.036 | 1471.132 | 1427.187 | 1471.132 | 133.8 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.369 | 0.417 | 0.319 | 0.417 | 157.1 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.296 | 12.685 | 4.201 | 12.685 | 133.8 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.031 | 0.049 | 0.019 | 0.049 | 157.1 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.718 | 0.808 | 0.705 | 0.808 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.017 | 39.280 | 30.563 | 39.280 | 157.0 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 57.013 | 58.631 | 56.488 | 58.631 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.909 | 31.120 | 30.325 | 31.120 | 153.7 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 57.135 | 61.349 | 55.903 | 61.349 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 32.478 | 34.675 | 31.966 | 34.675 | 153.5 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 52.610 | 61.347 | 50.767 | 61.347 | 133.8 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.153 | 0.186 | 0.128 | 0.186 | 153.5 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 5.060 | 8.104 | 4.895 | 8.104 | 133.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.044 | 0.016 | 0.044 | 138.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.491 | 0.522 | 0.475 | 0.522 | 133.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 222.745 | 233.883 | 216.014 | 233.883 | 153.6 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1481.014 | 1510.182 | 1474.842 | 1510.182 | 133.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 167.943 | 176.372 | 157.963 | 176.372 | 153.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1434.650 | 1489.118 | 1420.575 | 1489.118 | 133.8 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.344 | 0.378 | 0.329 | 0.378 | 153.6 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.119 | 4.361 | 4.017 | 4.361 | 133.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.032 | 0.049 | 0.020 | 0.049 | 153.6 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.737 | 0.759 | 0.695 | 0.759 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 42.893 | 46.262 | 42.549 | 46.262 | 153.5 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 63.958 | 66.782 | 63.250 | 66.782 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.050 | 43.980 | 42.813 | 43.980 | 150.0 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 65.484 | 68.750 | 64.481 | 68.750 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.320 | 45.965 | 43.473 | 45.965 | 149.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 57.447 | 59.644 | 57.151 | 59.644 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.158 | 0.168 | 0.148 | 0.168 | 149.9 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.795 | 4.898 | 4.777 | 4.898 | 133.8 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.030 | 0.015 | 0.030 | 142.9 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.505 | 0.572 | 0.494 | 0.572 | 147.6 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 214.729 | 255.635 | 210.750 | 255.635 | 156.8 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1676.254 | 1717.256 | 1645.906 | 1717.256 | 147.6 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 170.214 | 183.896 | 166.448 | 183.896 | 169.3 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1621.031 | 1640.449 | 1597.898 | 1640.449 | 147.6 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 1.127 | 1.184 | 0.972 | 1.184 | 166.3 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.015 | 4.190 | 3.948 | 4.190 | 147.6 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.157 | 0.173 | 0.120 | 0.173 | 157.7 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.723 | 0.822 | 0.695 | 0.822 | 147.6 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.355 | 34.520 | 31.003 | 34.520 | 156.7 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 59.790 | 62.425 | 59.513 | 62.425 | 147.6 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.366 | 33.344 | 30.909 | 33.344 | 155.7 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 60.164 | 63.693 | 57.796 | 63.693 | 147.6 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 32.129 | 32.934 | 31.241 | 32.934 | 152.0 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 53.401 | 54.734 | 52.355 | 54.734 | 147.6 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.256 | 0.304 | 0.224 | 0.304 | 152.5 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.587 | 5.706 | 5.483 | 5.706 | 147.6 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.032 | 0.018 | 0.032 | 144.8 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.509 | 0.562 | 0.450 | 0.562 | 147.6 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 224.680 | 228.261 | 220.404 | 228.261 | 159.7 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1690.649 | 1714.666 | 1679.811 | 1714.666 | 147.6 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 168.212 | 170.857 | 163.194 | 170.857 | 171.9 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1601.585 | 1690.087 | 1588.280 | 1690.087 | 147.6 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 1.141 | 1.292 | 1.122 | 1.292 | 169.0 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.076 | 4.200 | 4.000 | 4.200 | 147.6 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.125 | 0.179 | 0.100 | 0.179 | 160.4 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.699 | 0.748 | 0.692 | 0.748 | 147.6 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.413 | 44.201 | 43.287 | 44.201 | 159.5 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 67.630 | 68.962 | 66.739 | 68.962 | 147.6 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.389 | 44.687 | 43.317 | 44.687 | 158.2 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 66.507 | 67.555 | 66.383 | 67.555 | 147.6 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.146 | 45.648 | 43.617 | 45.648 | 154.3 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 61.486 | 62.422 | 60.721 | 62.422 | 147.6 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.239 | 0.285 | 0.213 | 0.285 | 154.7 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.649 | 5.721 | 5.556 | 5.721 | 147.6 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.059 | 18.656 | 18.024 | 18.656 | 149.0 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 64.105 | 64.555 | 63.611 | 64.555 | 133.8 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 15.072 | 17.558 | 14.048 | 17.558 | 159.1 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 56.415 | 57.392 | 56.380 | 57.392 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.263 | 1.744 | 1.262 | 1.744 | 156.6 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 12.868 | 13.060 | 12.825 | 13.060 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.359 | 0.360 | 0.356 | 0.360 | 153.1 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.040 | 5.164 | 4.990 | 5.164 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.624 | 1.866 | 1.601 | 1.866 | 157.3 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.382 | 5.490 | 5.380 | 5.490 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.467 | 0.750 | 0.454 | 0.750 | 152.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.579 | 6.417 | 5.438 | 6.417 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point-processes | python-prophet | 4 | 1489.614 | 1539.152 | 1489.528 | 1539.152 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point-threads | python-prophet | 4 | 164.305 | 177.186 | 163.201 | 177.186 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point | effect-prophet | 4 | 61.331 | 62.677 | 61.086 | 62.677 | 158.9 |
| evaluation-logistic-large-parallel | evaluation-point | python-prophet | 4 | 170.433 | 183.984 | 163.554 | 183.984 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search-processes | python-prophet | 4 | 4546.130 | 4772.476 | 4492.314 | 4772.476 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search-threads | python-prophet | 4 | 500.072 | 527.303 | 497.221 | 527.303 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search | effect-prophet | 4 | 172.666 | 173.764 | 170.825 | 173.764 | 198.7 |
| evaluation-logistic-large-parallel | evaluation-search | python-prophet | 4 | 528.352 | 537.817 | 523.226 | 537.817 | 133.8 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 190.205 | 193.159 | 188.484 | 193.159 | 161.3 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1450.991 | 1497.016 | 1439.890 | 1497.016 | 133.8 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.152 | 2.884 | 2.133 | 2.884 | 161.1 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.299 | 1.326 | 1.278 | 1.326 | 133.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.031 | 0.058 | 0.022 | 0.058 | 131.4 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.500 | 0.532 | 0.498 | 0.532 | 133.8 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.062 | 0.088 | 0.057 | 0.088 | 160.9 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.312 | 5.384 | 5.301 | 5.384 | 133.8 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.318 | 1.787 | 1.259 | 1.787 | 138.1 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.718 | 0.776 | 0.715 | 0.776 | 133.8 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 14.096 | 14.232 | 13.947 | 14.232 | 159.9 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 41.536 | 42.078 | 41.143 | 42.078 | 133.8 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 191.355 | 204.203 | 189.959 | 204.203 | 154.9 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1457.781 | 1478.950 | 1452.985 | 1478.950 | 133.8 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.017 | 1.076 | 1.013 | 1.076 | 154.8 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.769 | 0.812 | 0.761 | 0.812 | 133.8 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.011 | 0.010 | 0.011 | 131.3 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.433 | 0.500 | 0.429 | 0.500 | 133.8 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.067 | 0.110 | 0.058 | 0.110 | 154.8 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.164 | 5.244 | 5.151 | 5.244 | 133.8 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.853 | 1.045 | 0.744 | 1.045 | 135.1 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.573 | 0.657 | 0.552 | 0.657 | 133.8 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.077 | 17.561 | 16.879 | 17.561 | 149.3 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 59.508 | 61.573 | 58.764 | 61.573 | 133.8 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.442 | 17.689 | 17.400 | 17.689 | 159.6 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 30.073 | 30.125 | 29.796 | 30.125 | 133.8 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.203 | 0.220 | 0.201 | 0.220 | 160.2 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 133.8 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.227 | 0.253 | 0.224 | 0.253 | 159.9 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 133.8 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 35.515 | 37.947 | 34.615 | 37.947 | 154.2 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 115.071 | 117.047 | 113.101 | 117.047 | 133.8 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.047 | 0.065 | 0.043 | 0.065 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.538 | 0.842 | 0.526 | 0.842 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 193.965 | 197.878 | 189.003 | 197.878 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1478.330 | 1500.420 | 1477.506 | 1500.420 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.333 | 164.986 | 163.305 | 164.986 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1456.115 | 1469.225 | 1445.974 | 1469.225 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.098 | 0.107 | 0.084 | 0.107 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.576 | 2.587 | 2.544 | 2.587 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.038 | 0.048 | 0.031 | 0.048 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.488 | 0.533 | 0.483 | 0.533 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 21.182 | 21.674 | 21.142 | 21.674 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.727 | 36.945 | 36.539 | 36.945 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 20.895 | 21.378 | 20.870 | 21.378 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 36.529 | 37.322 | 36.087 | 37.322 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.563 | 22.546 | 21.405 | 22.546 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.684 | 34.704 | 32.496 | 34.704 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.292 | 0.408 | 0.252 | 0.408 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.551 | 3.578 | 3.494 | 3.578 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.029 | 0.060 | 0.026 | 0.060 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.542 | 0.548 | 0.539 | 0.548 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 191.018 | 197.602 | 189.068 | 197.602 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1461.667 | 1471.986 | 1452.131 | 1471.986 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.961 | 171.640 | 158.836 | 171.640 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1421.883 | 1468.884 | 1417.103 | 1468.884 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.118 | 0.088 | 0.118 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.538 | 2.623 | 2.497 | 2.623 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.039 | 0.051 | 0.034 | 0.051 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.501 | 0.515 | 0.481 | 0.515 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.091 | 18.282 | 17.557 | 18.282 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.356 | 32.779 | 31.353 | 32.779 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.448 | 18.196 | 17.412 | 18.196 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 32.161 | 39.611 | 31.374 | 39.611 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 18.208 | 19.216 | 17.836 | 19.216 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 28.241 | 28.583 | 27.907 | 28.583 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.373 | 1.707 | 0.308 | 1.707 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.660 | 3.775 | 3.648 | 3.775 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.019 | 0.022 | 0.019 | 0.022 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.485 | 0.498 | 0.481 | 0.498 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 189.853 | 192.890 | 188.561 | 192.890 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1478.092 | 1500.616 | 1452.873 | 1500.616 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.286 | 173.443 | 159.270 | 173.443 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1468.141 | 1509.665 | 1455.281 | 1509.665 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.323 | 0.114 | 0.323 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.400 | 2.450 | 2.347 | 2.450 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.057 | 0.028 | 0.057 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.448 | 0.463 | 0.431 | 0.463 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.674 | 18.813 | 18.665 | 18.813 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.607 | 32.929 | 32.250 | 32.929 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 18.862 | 18.958 | 18.803 | 18.958 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.046 | 32.331 | 31.667 | 32.331 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.282 | 19.591 | 19.003 | 19.591 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.786 | 30.177 | 28.518 | 30.177 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.313 | 0.480 | 0.294 | 0.480 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.334 | 3.368 | 3.236 | 3.368 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.020 | 0.015 | 0.020 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.503 | 0.573 | 0.495 | 0.573 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 196.069 | 223.712 | 194.723 | 223.712 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1465.196 | 1540.180 | 1457.980 | 1540.180 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 169.961 | 174.476 | 167.387 | 174.476 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1426.094 | 1437.081 | 1422.662 | 1437.081 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.100 | 0.131 | 0.083 | 0.131 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.408 | 2.922 | 2.325 | 2.922 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.035 | 0.057 | 0.029 | 0.057 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.448 | 0.489 | 0.425 | 0.489 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.836 | 19.079 | 18.516 | 19.079 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.293 | 33.990 | 32.961 | 33.990 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.378 | 21.594 | 19.009 | 21.594 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.603 | 35.436 | 32.344 | 35.436 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.299 | 19.497 | 19.238 | 19.497 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 29.545 | 32.291 | 29.248 | 32.291 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.315 | 0.391 | 0.294 | 0.391 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.321 | 3.621 | 3.313 | 3.621 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.069 | 0.210 | 0.065 | 0.210 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.569 | 0.619 | 0.559 | 0.619 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 177.818 | 204.069 | 175.128 | 204.069 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1439.190 | 1453.426 | 1432.324 | 1453.426 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 163.297 | 180.452 | 159.876 | 180.452 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1455.014 | 1459.896 | 1454.394 | 1459.896 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.098 | 0.123 | 0.095 | 0.123 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.668 | 4.475 | 2.549 | 4.475 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.030 | 0.025 | 0.030 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.659 | 0.673 | 0.653 | 0.673 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.459 | 4.897 | 4.413 | 4.897 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.805 | 13.916 | 13.597 | 13.916 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.704 | 5.554 | 4.616 | 5.554 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 13.007 | 13.722 | 12.976 | 13.722 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.718 | 5.179 | 4.428 | 5.179 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.829 | 10.069 | 9.630 | 10.069 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.421 | 0.722 | 0.420 | 0.722 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.281 | 3.284 | 3.240 | 3.284 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.025 | 0.014 | 0.025 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.491 | 0.499 | 0.485 | 0.499 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 188.989 | 196.250 | 185.648 | 196.250 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1465.017 | 1477.605 | 1460.771 | 1477.605 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.531 | 172.363 | 162.630 | 172.363 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1428.667 | 1463.077 | 1420.407 | 1463.077 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.096 | 0.128 | 0.094 | 0.128 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.397 | 2.605 | 2.353 | 2.605 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.039 | 0.030 | 0.039 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.505 | 0.533 | 0.467 | 0.533 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.097 | 20.758 | 19.997 | 20.758 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.482 | 38.597 | 36.088 | 38.597 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.304 | 22.143 | 20.236 | 22.143 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 35.875 | 37.138 | 35.366 | 37.138 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.572 | 20.812 | 20.568 | 20.812 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 32.216 | 33.113 | 32.017 | 33.113 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.304 | 0.323 | 0.299 | 0.323 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.259 | 3.495 | 3.245 | 3.495 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 162.515 | 170.430 | 159.898 | 170.430 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1423.042 | 1525.364 | 1419.073 | 1525.364 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.124 | 0.150 | 0.113 | 0.150 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.277 | 2.405 | 2.248 | 2.405 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.015 | 0.022 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.456 | 0.489 | 0.453 | 0.489 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.828 | 3.225 | 1.821 | 3.225 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.849 | 6.672 | 5.684 | 6.672 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.889 | 2.672 | 0.638 | 2.672 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.959 | 3.036 | 2.890 | 3.036 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 167.572 | 168.203 | 164.522 | 168.203 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1442.100 | 1457.187 | 1403.599 | 1457.187 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.123 | 0.128 | 0.119 | 0.128 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.433 | 2.536 | 2.429 | 2.536 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.023 | 0.038 | 0.019 | 0.038 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.627 | 0.645 | 0.620 | 0.645 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.950 | 4.377 | 2.524 | 4.377 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.031 | 7.440 | 6.920 | 7.440 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.347 | 1.672 | 1.277 | 1.672 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.924 | 2.984 | 2.904 | 2.984 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 168.021 | 176.320 | 163.135 | 176.320 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1428.882 | 1458.577 | 1427.637 | 1458.577 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.151 | 0.220 | 0.129 | 0.220 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.180 | 2.224 | 2.156 | 2.224 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.025 | 0.016 | 0.025 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.431 | 0.478 | 0.423 | 0.478 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 19.141 | 20.742 | 18.902 | 20.742 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 27.078 | 28.188 | 27.008 | 28.188 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 1.010 | 2.530 | 0.907 | 2.530 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.916 | 2.972 | 2.897 | 2.972 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.328 | 162.749 | 159.247 | 162.749 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1424.380 | 1512.186 | 1424.140 | 1512.186 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.163 | 0.128 | 0.163 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.258 | 3.720 | 2.248 | 3.720 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.019 | 0.030 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.453 | 0.721 | 0.428 | 0.721 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.310 | 9.499 | 9.283 | 9.499 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.172 | 17.893 | 17.145 | 17.893 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.697 | 2.230 | 0.676 | 2.230 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.951 | 4.789 | 2.872 | 4.789 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.541 | 168.616 | 158.890 | 168.616 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1448.508 | 1474.730 | 1443.857 | 1474.730 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.163 | 0.124 | 0.163 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.067 | 2.153 | 2.057 | 2.153 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.038 | 0.018 | 0.038 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.454 | 0.495 | 0.446 | 0.495 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.871 | 7.136 | 6.745 | 7.136 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 13.319 | 14.221 | 12.974 | 14.221 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.925 | 2.174 | 0.601 | 2.174 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.965 | 3.170 | 2.945 | 3.170 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.629 | 167.221 | 161.547 | 167.221 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1424.658 | 1425.736 | 1419.142 | 1425.736 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.126 | 0.140 | 0.119 | 0.140 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.080 | 2.100 | 2.043 | 2.100 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.045 | 0.016 | 0.045 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.439 | 0.469 | 0.426 | 0.469 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.525 | 9.220 | 8.504 | 9.220 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.697 | 16.745 | 15.451 | 16.745 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 1.044 | 2.161 | 0.840 | 2.161 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.928 | 2.978 | 2.909 | 2.978 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.934 | 172.635 | 161.578 | 172.635 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1435.926 | 1483.232 | 1424.116 | 1483.232 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.145 | 0.118 | 0.145 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.257 | 2.317 | 2.227 | 2.317 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.028 | 0.016 | 0.028 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.444 | 0.457 | 0.437 | 0.457 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.912 | 8.162 | 7.910 | 8.162 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.381 | 16.072 | 14.936 | 16.072 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.708 | 2.819 | 0.674 | 2.819 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.928 | 3.009 | 2.875 | 3.009 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.545 | 161.621 | 160.032 | 161.621 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1424.716 | 1449.233 | 1423.497 | 1449.233 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.138 | 0.196 | 0.127 | 0.196 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.459 | 2.514 | 2.384 | 2.514 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.032 | 0.018 | 0.032 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.492 | 0.510 | 0.490 | 0.510 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.988 | 17.053 | 16.917 | 17.053 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 25.471 | 28.093 | 24.341 | 28.093 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.703 | 2.296 | 0.620 | 2.296 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 3.147 | 3.322 | 3.048 | 3.322 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 166.093 | 172.320 | 165.174 | 172.320 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1423.363 | 1434.516 | 1419.968 | 1434.516 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.129 | 0.182 | 0.128 | 0.182 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.226 | 2.303 | 2.203 | 2.303 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.022 | 0.030 | 0.022 | 0.030 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.427 | 0.449 | 0.425 | 0.449 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 17.170 | 17.392 | 17.086 | 17.392 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.319 | 25.075 | 23.597 | 25.075 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.840 | 3.442 | 0.663 | 3.442 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.823 | 2.975 | 2.802 | 2.975 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 171.012 | 176.622 | 166.470 | 176.622 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1430.717 | 1460.755 | 1411.512 | 1460.755 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.141 | 0.161 | 0.141 | 0.161 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.432 | 2.487 | 2.415 | 2.487 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.017 | 0.022 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.473 | 0.491 | 0.458 | 0.491 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 17.084 | 18.421 | 17.054 | 18.421 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 27.139 | 27.396 | 26.430 | 27.396 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 0.772 | 0.823 | 0.764 | 0.823 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.444 | 3.639 | 3.388 | 3.639 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 161.551 | 162.655 | 156.876 | 162.655 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1412.814 | 1427.172 | 1412.300 | 1427.172 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.134 | 0.150 | 0.122 | 0.150 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.126 | 2.167 | 2.122 | 2.167 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.019 | 0.030 | 0.018 | 0.030 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.417 | 0.442 | 0.399 | 0.442 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.415 | 16.693 | 16.404 | 16.693 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 24.854 | 25.490 | 24.656 | 25.490 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.848 | 2.075 | 0.843 | 2.075 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.832 | 2.894 | 2.806 | 2.894 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 163.143 | 167.367 | 159.845 | 167.367 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1411.208 | 1459.903 | 1410.009 | 1459.903 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.126 | 0.148 | 0.125 | 0.148 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.234 | 2.770 | 2.161 | 2.770 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.020 | 0.035 | 0.018 | 0.035 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.416 | 0.457 | 0.412 | 0.457 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.384 | 6.518 | 6.317 | 6.518 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.117 | 13.694 | 12.924 | 13.694 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.868 | 1.996 | 0.853 | 1.996 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.900 | 3.787 | 2.889 | 3.787 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 164.834 | 166.239 | 162.705 | 166.239 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1418.062 | 1437.025 | 1411.979 | 1437.025 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.183 | 0.234 | 0.133 | 0.234 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.506 | 2.586 | 2.495 | 2.586 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.604 | 0.639 | 0.603 | 0.639 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 39.046 | 41.264 | 37.364 | 41.264 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 38.736 | 43.087 | 38.237 | 43.087 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.787 | 2.185 | 1.354 | 2.185 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.429 | 3.441 | 3.367 | 3.441 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 161.241 | 161.896 | 159.720 | 161.896 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1426.656 | 1471.047 | 1426.003 | 1471.047 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.144 | 0.196 | 0.135 | 0.196 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.271 | 2.335 | 2.256 | 2.335 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.019 | 0.023 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.447 | 0.464 | 0.439 | 0.464 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.631 | 101.827 | 100.327 | 101.827 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 121.458 | 122.439 | 120.718 | 122.439 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.005 | 2.321 | 0.695 | 2.321 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.319 | 4.849 | 3.317 | 4.849 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 170.955 | 172.283 | 169.517 | 172.283 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1420.469 | 1441.732 | 1414.361 | 1441.732 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.138 | 0.189 | 0.125 | 0.189 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.732 | 3.057 | 2.638 | 3.057 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.018 | 0.023 | 0.017 | 0.023 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.748 | 0.811 | 0.728 | 0.811 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 134.164 | 134.596 | 132.759 | 134.596 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 112.037 | 116.659 | 111.799 | 116.659 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.535 | 2.331 | 1.518 | 2.331 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.839 | 3.931 | 3.800 | 3.931 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 159.845 | 163.636 | 159.334 | 163.636 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1408.888 | 1443.974 | 1403.028 | 1443.974 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.129 | 0.141 | 0.127 | 0.141 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.151 | 2.236 | 2.135 | 2.236 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.019 | 0.033 | 0.017 | 0.033 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.443 | 0.502 | 0.408 | 0.502 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 5.855 | 6.228 | 5.840 | 6.228 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.037 | 14.313 | 12.695 | 14.313 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.686 | 2.187 | 0.629 | 2.187 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 2.957 | 3.099 | 2.952 | 3.099 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.144 | 167.309 | 157.991 | 167.309 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1428.647 | 1442.372 | 1410.957 | 1442.372 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.227 | 0.131 | 0.227 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.022 | 2.174 | 1.990 | 2.174 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.031 | 0.018 | 0.031 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.426 | 0.458 | 0.423 | 0.458 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 118.226 | 120.804 | 117.595 | 120.804 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 127.824 | 133.003 | 126.426 | 133.003 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.873 | 2.463 | 0.857 | 2.463 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.890 | 2.970 | 2.856 | 2.970 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.579 | 169.734 | 158.389 | 169.734 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1451.206 | 1525.126 | 1432.564 | 1525.126 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.119 | 0.135 | 0.119 | 0.135 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.139 | 2.434 | 2.073 | 2.434 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.034 | 0.020 | 0.034 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.428 | 0.453 | 0.427 | 0.453 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 14.956 | 15.641 | 14.927 | 15.641 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.446 | 23.363 | 20.059 | 23.363 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.865 | 2.052 | 0.847 | 2.052 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 3.030 | 3.180 | 3.019 | 3.180 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 167.291 | 171.930 | 162.641 | 171.930 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1429.226 | 1472.539 | 1417.919 | 1472.539 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.171 | 0.193 | 0.170 | 0.193 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.346 | 3.419 | 3.322 | 3.419 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.019 | 0.022 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.607 | 0.643 | 0.570 | 0.643 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.531 | 9.691 | 9.482 | 9.691 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 18.526 | 21.149 | 17.918 | 21.149 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.746 | 2.153 | 0.693 | 2.153 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.285 | 4.663 | 4.165 | 4.663 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.850 | 166.816 | 161.859 | 166.816 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1413.680 | 1448.618 | 1406.123 | 1448.618 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.161 | 0.129 | 0.161 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.180 | 2.207 | 2.150 | 2.207 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.033 | 0.015 | 0.033 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.433 | 0.447 | 0.420 | 0.447 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.511 | 6.751 | 6.348 | 6.751 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.497 | 14.340 | 13.287 | 14.340 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.908 | 2.202 | 0.613 | 2.202 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.824 | 2.860 | 2.801 | 2.860 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.807 | 162.100 | 157.347 | 162.100 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1406.551 | 1428.309 | 1405.658 | 1428.309 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.141 | 0.119 | 0.141 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.179 | 2.208 | 2.171 | 2.208 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.030 | 0.016 | 0.030 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.427 | 0.456 | 0.407 | 0.456 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.146 | 10.407 | 10.108 | 10.407 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.923 | 17.219 | 15.463 | 17.219 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.921 | 0.941 | 0.917 | 0.941 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.779 | 2.811 | 2.731 | 2.811 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.451 | 167.041 | 163.853 | 167.041 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1412.171 | 1427.161 | 1411.938 | 1427.161 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.178 | 0.196 | 0.168 | 0.196 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.739 | 3.831 | 3.723 | 3.831 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.028 | 0.022 | 0.028 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.653 | 0.670 | 0.648 | 0.670 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.237 | 29.482 | 28.198 | 29.482 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 42.861 | 45.516 | 42.170 | 45.516 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.900 | 0.929 | 0.895 | 0.929 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.042 | 5.102 | 5.014 | 5.102 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.515 | 190.224 | 163.406 | 190.224 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1427.383 | 1443.518 | 1416.162 | 1443.518 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.168 | 0.194 | 0.164 | 0.194 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.897 | 4.025 | 3.773 | 4.025 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.019 | 0.024 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.653 | 0.672 | 0.649 | 0.672 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 26.191 | 27.624 | 25.978 | 27.624 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 39.290 | 40.944 | 39.206 | 40.944 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.903 | 0.959 | 0.887 | 0.959 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.154 | 5.227 | 5.135 | 5.227 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 162.924 | 167.634 | 160.755 | 167.634 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1400.911 | 1431.740 | 1394.546 | 1431.740 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.131 | 0.157 | 0.125 | 0.157 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.184 | 2.206 | 2.131 | 2.206 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.017 | 0.030 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.432 | 0.460 | 0.412 | 0.460 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.975 | 9.258 | 8.794 | 9.258 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.192 | 17.377 | 15.502 | 17.377 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.945 | 3.124 | 0.728 | 3.124 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.812 | 2.923 | 2.789 | 2.923 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 163.529 | 167.592 | 161.345 | 167.592 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1406.715 | 1435.784 | 1406.388 | 1435.784 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.133 | 0.139 | 0.133 | 0.139 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.380 | 2.401 | 2.364 | 2.401 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.020 | 0.021 | 0.020 | 0.021 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.439 | 0.450 | 0.434 | 0.450 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 8.103 | 8.259 | 8.046 | 8.259 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 14.504 | 15.449 | 14.440 | 15.449 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.702 | 0.765 | 0.669 | 0.765 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.214 | 3.292 | 3.198 | 3.292 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 162.863 | 165.137 | 160.720 | 165.137 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1435.868 | 1480.249 | 1413.345 | 1480.249 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.130 | 0.141 | 0.128 | 0.141 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.402 | 2.445 | 2.377 | 2.445 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.017 | 0.024 | 0.017 | 0.024 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.440 | 0.479 | 0.435 | 0.479 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 10.053 | 10.487 | 9.970 | 10.487 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 16.679 | 17.252 | 16.515 | 17.252 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.711 | 0.774 | 0.697 | 0.774 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.211 | 3.310 | 3.188 | 3.310 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 160.940 | 167.289 | 160.194 | 167.289 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1423.609 | 1444.510 | 1405.944 | 1444.510 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.125 | 0.140 | 0.118 | 0.140 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.108 | 2.121 | 2.089 | 2.121 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.017 | 0.029 | 0.017 | 0.029 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.414 | 0.431 | 0.408 | 0.431 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.480 | 10.859 | 10.368 | 10.859 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 18.289 | 19.326 | 17.831 | 19.326 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.855 | 0.881 | 0.849 | 0.881 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.812 | 2.921 | 2.772 | 2.921 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 159.759 | 161.153 | 157.932 | 161.153 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1417.953 | 1429.486 | 1411.101 | 1429.486 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.134 | 0.143 | 0.132 | 0.143 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.171 | 2.237 | 2.170 | 2.237 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.019 | 0.036 | 0.016 | 0.036 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.417 | 0.442 | 0.415 | 0.442 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.706 | 7.851 | 7.632 | 7.851 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.638 | 16.201 | 14.447 | 16.201 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.882 | 2.049 | 0.842 | 2.049 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.797 | 2.914 | 2.784 | 2.914 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 172.924 | 178.643 | 168.074 | 178.643 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1414.844 | 1441.603 | 1404.036 | 1441.603 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.139 | 0.145 | 0.134 | 0.145 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.317 | 2.349 | 2.237 | 2.349 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.018 | 0.021 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.433 | 0.452 | 0.431 | 0.452 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 14.975 | 16.020 | 14.842 | 16.020 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.975 | 25.877 | 24.456 | 25.877 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.918 | 2.362 | 0.701 | 2.362 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.313 | 3.368 | 3.307 | 3.368 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | effect-prophet | 6 | 186.425 | 219.201 | 185.178 | 219.201 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | python-prophet | 6 | 1645.068 | 1681.968 | 1632.908 | 1681.968 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 6 | 2.868 | 5.586 | 2.255 | 5.586 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | python-prophet | 6 | 8.014 | 8.419 | 7.973 | 8.419 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 6 | 0.269 | 0.526 | 0.260 | 0.526 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | python-prophet | 6 | 12.474 | 12.642 | 12.355 | 12.642 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | effect-prophet | 6 | 1825.219 | 1846.032 | 1817.521 | 1846.032 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | python-prophet | 6 | 452.415 | 459.487 | 446.251 | 459.487 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | effect-prophet | 6 | 0.396 | 0.451 | 0.322 | 0.451 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | python-prophet | 6 | 3.795 | 3.963 | 3.708 | 3.963 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | effect-prophet | 6 | 2.909 | 4.064 | 2.806 | 4.064 | 171.9 |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | python-prophet | 6 | 209.522 | 220.718 | 206.474 | 220.718 | 133.8 |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | effect-prophet | 6 | 244.933 | 284.649 | 232.708 | 284.649 | n/a |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | python-prophet | 6 | 1886.316 | 1936.718 | 1826.558 | 1936.718 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | effect-prophet | 6 | 5.425 | 10.538 | 4.467 | 10.538 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | python-prophet | 6 | 22.927 | 25.121 | 22.312 | 25.121 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | effect-prophet | 6 | 0.745 | 0.912 | 0.712 | 0.912 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | python-prophet | 6 | 44.898 | 45.934 | 44.536 | 45.934 | n/a |
| mcmc-logistic-rate-changes | warm-fit | effect-prophet | 6 | 31611.798 | 31936.489 | 31502.799 | 31936.489 | n/a |
| mcmc-logistic-rate-changes | warm-fit | python-prophet | 6 | 6928.613 | 7014.487 | 6786.835 | 7014.487 | n/a |
| mcmc-logistic-rate-changes | warm-predict | effect-prophet | 6 | 1.907 | 3.662 | 1.819 | 3.662 | n/a |
| mcmc-logistic-rate-changes | warm-predict | python-prophet | 6 | 5.121 | 6.607 | 4.714 | 6.607 | n/a |
| mcmc-logistic-rate-changes | warm-uncertainty | effect-prophet | 6 | 38.388 | 40.665 | 37.805 | 40.665 | 151.3 |
| mcmc-logistic-rate-changes | warm-uncertainty | python-prophet | 6 | 356.055 | 370.449 | 346.662 | 370.449 | 150.1 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 194.499 | 198.557 | 191.262 | 198.557 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1576.823 | 1613.978 | 1553.128 | 1613.978 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.855 | 178.363 | 163.884 | 178.363 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1537.704 | 1587.422 | 1510.012 | 1587.422 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.155 | 0.176 | 0.143 | 0.176 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.505 | 3.103 | 2.432 | 3.103 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.029 | 0.037 | 0.022 | 0.037 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.486 | 0.550 | 0.452 | 0.550 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.052 | 0.065 | 0.047 | 0.065 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.495 | 0.516 | 0.488 | 0.516 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.015 | 1.506 | 1.001 | 1.506 | 144.5 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 92.252 | 96.430 | 91.086 | 96.430 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 190.912 | 218.237 | 188.589 | 218.237 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1469.242 | 1482.632 | 1465.715 | 1482.632 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.187 | 165.661 | 158.943 | 165.661 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1445.047 | 1453.956 | 1437.949 | 1453.956 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.152 | 0.188 | 0.147 | 0.188 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.478 | 2.606 | 2.421 | 2.606 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.035 | 0.018 | 0.035 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.469 | 0.534 | 0.459 | 0.534 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.071 | 0.072 | 0.044 | 0.072 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.509 | 0.524 | 0.502 | 0.524 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.733 | 0.921 | 0.666 | 0.921 | 149.3 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 24.068 | 37.682 | 23.930 | 37.682 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 193.556 | 220.645 | 191.550 | 220.645 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1488.090 | 1510.429 | 1473.186 | 1510.429 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.680 | 166.361 | 161.112 | 166.361 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1492.003 | 1554.456 | 1454.586 | 1554.456 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.181 | 0.225 | 0.147 | 0.225 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.784 | 4.147 | 3.695 | 4.147 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.029 | 0.041 | 0.025 | 0.041 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.702 | 0.836 | 0.657 | 0.836 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.063 | 0.079 | 0.050 | 0.079 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.550 | 0.589 | 0.505 | 0.589 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.760 | 0.925 | 0.742 | 0.925 | 144.2 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.276 | 43.627 | 29.908 | 43.627 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 193.511 | 196.849 | 191.508 | 196.849 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1476.216 | 1499.370 | 1461.144 | 1499.370 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.372 | 163.930 | 161.046 | 163.930 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1454.451 | 1470.001 | 1438.606 | 1470.001 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.179 | 0.232 | 0.148 | 0.232 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.745 | 3.829 | 3.672 | 3.829 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.036 | 0.023 | 0.036 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.667 | 0.703 | 0.623 | 0.703 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.058 | 0.087 | 0.051 | 0.087 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.517 | 0.550 | 0.516 | 0.550 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.759 | 1.842 | 0.673 | 1.842 | 145.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.143 | 38.882 | 24.896 | 38.882 | 133.8 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 176.600 | 178.939 | 174.955 | 178.939 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1478.430 | 1542.378 | 1458.079 | 1542.378 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.431 | 172.514 | 162.622 | 172.514 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1452.047 | 1472.859 | 1449.649 | 1472.859 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.137 | 0.165 | 0.131 | 0.165 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.617 | 2.743 | 2.547 | 2.743 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.034 | 0.016 | 0.034 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.669 | 0.715 | 0.648 | 0.715 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.058 | 0.067 | 0.046 | 0.067 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.591 | 0.617 | 0.574 | 0.617 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.551 | 2.526 | 1.015 | 2.526 | 152.7 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.908 | 39.277 | 25.555 | 39.277 | 133.8 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 200.097 | 214.616 | 192.152 | 214.616 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1541.346 | 1564.890 | 1528.407 | 1564.890 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.882 | 191.229 | 161.523 | 191.229 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1499.757 | 1538.988 | 1498.796 | 1538.988 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.143 | 0.230 | 0.116 | 0.230 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.334 | 2.619 | 2.314 | 2.619 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.029 | 0.040 | 0.021 | 0.040 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.468 | 0.475 | 0.448 | 0.475 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.022 | 0.029 | 0.021 | 0.029 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.482 | 0.499 | 0.471 | 0.499 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.221 | 1.520 | 1.152 | 1.520 | 147.6 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 80.404 | 88.167 | 79.575 | 88.167 | 133.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 338.327 | 347.756 | 333.601 | 347.756 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1846.901 | 2027.996 | 1826.960 | 2027.996 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 197.434 | 211.716 | 191.521 | 211.716 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1743.032 | 1782.552 | 1734.783 | 1782.552 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.164 | 0.251 | 0.151 | 0.251 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.796 | 3.014 | 2.782 | 3.014 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.021 | 0.026 | 0.020 | 0.026 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.782 | 0.878 | 0.757 | 0.878 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.088 | 1.232 | 0.051 | 1.232 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.823 | 0.878 | 0.802 | 0.878 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.536 | 25.084 | 23.172 | 25.084 | 158.7 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 297.827 | 341.335 | 285.900 | 341.335 | 133.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 339.708 | 363.921 | 336.940 | 363.921 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1861.996 | 1874.248 | 1835.287 | 1874.248 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 194.610 | 212.282 | 191.395 | 212.282 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1736.623 | 1747.120 | 1719.917 | 1747.120 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.152 | 0.186 | 0.147 | 0.186 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.796 | 2.903 | 2.732 | 2.903 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.022 | 0.040 | 0.022 | 0.040 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.765 | 0.802 | 0.750 | 0.802 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.067 | 0.073 | 0.048 | 0.073 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.822 | 0.848 | 0.797 | 0.848 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.264 | 25.570 | 23.235 | 25.570 | 153.3 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 293.285 | 307.056 | 281.641 | 307.056 | 133.8 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 131.265 | 136.342 | 130.371 | 136.342 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 111.337 | 112.986 | 111.197 | 112.986 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 116.960 | 117.932 | 115.687 | 117.932 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 94.174 | 95.320 | 93.566 | 95.320 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `3a5a6cec5d0df164aaaa64a9fdc64b8f4184914c`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `anomalies-logistic-defaults-99`, `warm-start-logistic-defaults-7-new-rows`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-logistic-large-months-metrics`, `evaluation-logistic-large-parallel`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`, `mcmc-logistic-explicit-floor-minmax`, `mcmc-logistic-rate-changes`
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

