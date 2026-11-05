# Effect Prophet benchmark — 2026-11-05T080220-274Z-b7a56669

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
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3839 | 30576 |

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
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 64.802 | 74.824 | 63.950 | 74.824 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 275.826 | 307.136 | 273.580 | 307.136 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 46.896 | 48.639 | 46.627 | 48.639 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 41.743 | 44.758 | 41.577 | 44.758 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 13.034 | 13.314 | 12.827 | 13.314 | 156.6 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 232.792 | 243.495 | 230.979 | 243.495 | 133.8 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.026 | 0.011 | 0.026 | 143.5 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.459 | 0.486 | 0.448 | 0.486 | 133.8 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 196.873 | 208.252 | 191.722 | 208.252 | 159.5 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1408.558 | 1622.912 | 1366.084 | 1622.912 | 133.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 154.737 | 157.362 | 153.104 | 157.362 | 159.6 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1320.042 | 1417.796 | 1317.584 | 1417.796 | 133.8 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.334 | 0.366 | 0.319 | 0.366 | 159.6 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.818 | 4.498 | 3.784 | 4.498 | 133.8 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.026 | 0.041 | 0.016 | 0.041 | 159.5 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.687 | 0.825 | 0.650 | 0.825 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 29.297 | 32.032 | 27.772 | 32.032 | 159.3 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 53.829 | 59.613 | 52.275 | 59.613 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 28.244 | 28.481 | 27.865 | 28.481 | 155.6 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 51.100 | 51.978 | 50.839 | 51.978 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 30.323 | 33.089 | 29.828 | 33.089 | 154.5 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 46.438 | 47.529 | 46.117 | 47.529 | 133.8 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.159 | 0.167 | 0.127 | 0.167 | 155.3 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.408 | 4.705 | 4.328 | 4.705 | 133.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.020 | 0.015 | 0.020 | 141.5 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.496 | 0.512 | 0.468 | 0.512 | 133.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 206.133 | 211.366 | 205.361 | 211.366 | 156.1 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1392.093 | 1536.545 | 1389.720 | 1536.545 | 133.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 154.923 | 159.741 | 152.283 | 159.741 | 156.3 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1344.578 | 1448.352 | 1341.213 | 1448.352 | 133.8 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.332 | 0.368 | 0.310 | 0.368 | 156.1 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.036 | 4.513 | 3.914 | 4.513 | 133.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.026 | 0.034 | 0.017 | 0.034 | 156.1 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.771 | 1.007 | 0.755 | 1.007 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 39.929 | 41.467 | 39.485 | 41.467 | 156.0 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 59.742 | 60.371 | 59.420 | 60.371 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 40.356 | 40.791 | 39.712 | 40.791 | 152.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 59.295 | 59.741 | 58.531 | 59.741 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 41.020 | 41.662 | 40.260 | 41.662 | 152.5 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 55.279 | 61.860 | 54.942 | 61.860 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.163 | 0.199 | 0.130 | 0.199 | 152.6 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.454 | 4.633 | 4.419 | 4.633 | 133.8 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.021 | 0.014 | 0.021 | 139.3 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.472 | 0.499 | 0.466 | 0.499 | 147.5 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 199.966 | 204.122 | 195.697 | 204.122 | 156.1 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1516.994 | 1627.751 | 1512.308 | 1627.751 | 147.5 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 155.940 | 172.927 | 154.147 | 172.927 | 166.8 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1532.578 | 1589.739 | 1458.684 | 1589.739 | 147.5 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 1.097 | 1.212 | 1.041 | 1.212 | 163.9 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.743 | 3.872 | 3.696 | 3.872 | 147.5 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.103 | 0.134 | 0.096 | 0.134 | 156.1 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.668 | 0.743 | 0.642 | 0.743 | 147.5 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 28.412 | 29.360 | 28.240 | 29.360 | 155.9 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 54.353 | 54.852 | 54.260 | 54.852 | 147.5 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 28.842 | 29.313 | 28.680 | 29.313 | 154.8 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 53.864 | 59.569 | 53.250 | 59.569 | 147.5 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 30.469 | 33.300 | 28.723 | 33.300 | 150.6 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 49.754 | 51.158 | 48.659 | 51.158 | 147.5 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.213 | 0.343 | 0.184 | 0.343 | 150.6 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.203 | 5.492 | 5.107 | 5.492 | 147.5 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.024 | 0.015 | 0.024 | 140.9 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.491 | 0.446 | 0.491 | 147.6 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 210.965 | 221.509 | 210.058 | 221.509 | 158.9 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1551.941 | 1581.371 | 1540.354 | 1581.371 | 147.6 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 156.225 | 177.422 | 154.650 | 177.422 | 170.8 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1487.212 | 1508.525 | 1477.100 | 1508.525 | 147.6 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 1.075 | 1.478 | 1.006 | 1.478 | 168.1 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 3.791 | 3.861 | 3.725 | 3.861 | 147.6 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.110 | 0.181 | 0.097 | 0.181 | 159.4 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.647 | 0.689 | 0.628 | 0.689 | 147.6 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 41.135 | 42.175 | 40.706 | 42.175 | 158.8 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 62.701 | 66.826 | 61.873 | 66.826 | 147.6 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 40.451 | 45.401 | 40.031 | 45.401 | 157.6 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 62.750 | 71.941 | 62.030 | 71.941 | 147.6 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 40.830 | 42.443 | 40.367 | 42.443 | 151.6 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 56.855 | 57.780 | 56.733 | 57.780 | 147.6 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.189 | 0.302 | 0.181 | 0.302 | 151.9 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.190 | 6.460 | 5.116 | 6.460 | 147.6 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 16.643 | 20.373 | 16.085 | 20.373 | 145.4 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 60.975 | 63.193 | 59.779 | 63.193 | 133.8 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 14.013 | 16.698 | 13.431 | 16.698 | 150.5 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 54.199 | 54.987 | 52.777 | 54.987 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.247 | 1.654 | 1.207 | 1.654 | 156.1 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 12.205 | 12.281 | 12.072 | 12.281 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.321 | 0.381 | 0.314 | 0.381 | 149.9 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 4.679 | 4.722 | 4.674 | 4.722 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.482 | 1.747 | 1.478 | 1.747 | 156.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.062 | 5.561 | 5.044 | 5.561 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.461 | 0.765 | 0.429 | 0.765 | 149.6 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.146 | 5.224 | 5.080 | 5.224 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point-processes | python-prophet | 4 | 1857.063 | 2052.661 | 1856.487 | 2052.661 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point-threads | python-prophet | 4 | 160.870 | 169.766 | 159.371 | 169.766 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point | effect-prophet | 4 | 56.926 | 57.783 | 56.809 | 57.783 | 160.8 |
| evaluation-logistic-large-parallel | evaluation-point | python-prophet | 4 | 163.787 | 174.151 | 159.138 | 174.151 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search-processes | python-prophet | 4 | 5410.864 | 5466.425 | 5389.289 | 5466.425 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search-threads | python-prophet | 4 | 503.449 | 539.248 | 490.619 | 539.248 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search | effect-prophet | 4 | 157.296 | 164.911 | 157.079 | 164.911 | 200.8 |
| evaluation-logistic-large-parallel | evaluation-search | python-prophet | 4 | 499.281 | 551.395 | 498.789 | 551.395 | 133.8 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 181.854 | 188.702 | 180.003 | 188.702 | 157.5 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1360.209 | 1477.908 | 1358.580 | 1477.908 | 133.8 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.214 | 2.815 | 2.060 | 2.815 | 157.4 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.214 | 1.238 | 1.196 | 1.238 | 133.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.031 | 0.050 | 0.028 | 0.050 | 132.5 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.472 | 0.495 | 0.449 | 0.495 | 133.8 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.072 | 0.084 | 0.067 | 0.084 | 156.9 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 4.895 | 5.014 | 4.872 | 5.014 | 133.8 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.466 | 1.728 | 1.252 | 1.728 | 137.2 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.708 | 0.728 | 0.677 | 0.728 | 133.8 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 12.823 | 13.200 | 12.710 | 13.200 | 154.2 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 39.938 | 40.057 | 39.825 | 40.057 | 133.8 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 188.733 | 190.851 | 184.358 | 190.851 | 156.9 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1375.664 | 1393.298 | 1364.974 | 1393.298 | 133.8 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 0.951 | 1.059 | 0.921 | 1.059 | 156.7 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.740 | 0.778 | 0.726 | 0.778 | 133.8 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.011 | 0.012 | 0.011 | 0.012 | 134.9 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.364 | 0.410 | 0.360 | 0.410 | 133.8 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.098 | 1.565 | 0.060 | 1.565 | 156.7 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 4.863 | 5.988 | 4.855 | 5.988 | 133.8 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.894 | 1.076 | 0.874 | 1.076 | 137.0 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.530 | 0.535 | 0.512 | 0.535 | 133.8 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 16.370 | 17.091 | 15.537 | 17.091 | 151.2 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 55.835 | 60.195 | 55.090 | 60.195 | 133.8 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 15.713 | 16.633 | 15.556 | 16.633 | 161.7 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 28.417 | 29.486 | 27.896 | 29.486 | 133.8 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.202 | 0.369 | 0.164 | 0.369 | 164.1 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 133.8 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.240 | 0.299 | 0.219 | 0.299 | 161.8 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 133.8 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 31.937 | 35.868 | 31.360 | 35.868 | 158.0 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 106.917 | 107.537 | 106.315 | 107.537 | 133.8 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.044 | 0.059 | 0.042 | 0.059 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.486 | 0.495 | 0.486 | 0.495 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 186.316 | 189.625 | 179.142 | 189.625 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1376.267 | 1409.331 | 1368.040 | 1409.331 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.837 | 159.267 | 154.834 | 159.267 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1351.020 | 1403.505 | 1346.857 | 1403.505 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.080 | 0.102 | 0.080 | 0.102 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.423 | 2.457 | 2.372 | 2.457 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.052 | 0.032 | 0.052 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.443 | 0.483 | 0.439 | 0.483 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.046 | 20.465 | 19.630 | 20.465 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 34.854 | 35.253 | 34.776 | 35.253 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.990 | 20.628 | 19.850 | 20.628 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 34.175 | 36.675 | 33.490 | 36.675 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 20.363 | 21.374 | 20.279 | 21.374 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 30.974 | 31.700 | 30.879 | 31.700 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.284 | 0.949 | 0.279 | 0.949 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.309 | 4.970 | 3.251 | 4.970 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.029 | 0.042 | 0.025 | 0.042 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.528 | 0.973 | 0.511 | 0.973 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 183.579 | 189.600 | 179.849 | 189.600 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1387.544 | 1410.097 | 1383.569 | 1410.097 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.257 | 155.550 | 150.955 | 155.550 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1356.253 | 1541.887 | 1347.947 | 1541.887 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.093 | 0.109 | 0.085 | 0.109 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.333 | 2.395 | 2.319 | 2.395 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.050 | 0.031 | 0.050 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.449 | 0.475 | 0.448 | 0.475 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 16.308 | 17.682 | 16.215 | 17.682 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.404 | 35.117 | 30.389 | 35.117 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 16.222 | 16.713 | 16.057 | 16.713 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 29.143 | 29.333 | 29.130 | 29.333 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 16.520 | 16.812 | 16.435 | 16.812 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 25.872 | 30.776 | 25.699 | 30.776 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.283 | 0.383 | 0.267 | 0.383 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.393 | 3.533 | 3.348 | 3.533 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.013 | 0.018 | 0.013 | 0.018 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.453 | 0.501 | 0.443 | 0.501 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 180.906 | 184.073 | 178.049 | 184.073 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1369.763 | 1389.875 | 1359.117 | 1389.875 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 150.375 | 159.381 | 150.090 | 159.381 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1342.736 | 1367.695 | 1342.652 | 1367.695 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.089 | 0.140 | 0.088 | 0.140 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.175 | 2.198 | 2.108 | 2.198 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.044 | 0.034 | 0.044 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.430 | 0.435 | 0.407 | 0.435 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.026 | 18.051 | 16.912 | 18.051 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.084 | 31.232 | 30.040 | 31.232 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 17.566 | 20.930 | 17.138 | 20.930 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 30.007 | 30.501 | 29.908 | 30.501 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 17.762 | 17.860 | 17.513 | 17.860 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 27.284 | 27.596 | 26.931 | 27.596 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.324 | 0.350 | 0.309 | 0.350 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 2.979 | 3.056 | 2.913 | 3.056 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.013 | 0.017 | 0.013 | 0.017 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.487 | 0.573 | 0.447 | 0.573 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 180.578 | 188.951 | 176.770 | 188.951 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1375.062 | 1414.443 | 1372.583 | 1414.443 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 149.054 | 154.421 | 148.928 | 154.421 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1354.130 | 1390.759 | 1345.915 | 1390.759 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.103 | 0.121 | 0.084 | 0.121 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.194 | 2.381 | 2.171 | 2.381 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.033 | 0.065 | 0.029 | 0.065 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.432 | 0.461 | 0.429 | 0.461 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.388 | 18.105 | 17.317 | 18.105 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 31.926 | 35.688 | 31.508 | 35.688 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 17.397 | 19.150 | 17.071 | 19.150 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 34.177 | 35.614 | 33.802 | 35.614 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 17.671 | 17.998 | 17.428 | 17.998 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 27.747 | 30.585 | 27.637 | 30.585 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.313 | 0.324 | 0.291 | 0.324 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.015 | 3.055 | 3.007 | 3.055 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.055 | 0.078 | 0.054 | 0.078 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.563 | 0.630 | 0.548 | 0.630 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 184.276 | 266.247 | 171.306 | 266.247 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1363.511 | 1417.375 | 1361.474 | 1417.375 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 183.535 | 192.129 | 172.860 | 192.129 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1357.956 | 1428.057 | 1354.672 | 1428.057 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.095 | 0.192 | 0.090 | 0.192 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.496 | 2.587 | 2.431 | 2.587 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.047 | 0.025 | 0.047 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.611 | 0.641 | 0.608 | 0.641 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.958 | 5.277 | 3.669 | 5.277 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.272 | 13.812 | 13.061 | 13.812 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.324 | 5.083 | 4.203 | 5.083 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.520 | 12.966 | 12.389 | 12.966 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.495 | 6.240 | 4.104 | 6.240 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.250 | 9.458 | 9.225 | 9.458 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.389 | 0.466 | 0.387 | 0.466 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.081 | 3.124 | 3.013 | 3.124 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.024 | 0.013 | 0.024 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.478 | 0.502 | 0.454 | 0.502 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 184.242 | 186.538 | 181.270 | 186.538 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1381.623 | 1394.259 | 1369.313 | 1394.259 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.238 | 169.638 | 151.198 | 169.638 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1348.975 | 1368.935 | 1347.706 | 1368.935 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.098 | 0.222 | 0.096 | 0.222 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.136 | 2.433 | 2.072 | 2.433 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.050 | 0.031 | 0.050 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.427 | 0.456 | 0.414 | 0.456 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.807 | 19.447 | 18.668 | 19.447 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 33.931 | 36.053 | 33.649 | 36.053 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 18.832 | 20.367 | 18.743 | 20.367 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 33.461 | 36.789 | 33.136 | 36.789 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 19.103 | 19.671 | 18.838 | 19.671 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 30.447 | 30.515 | 30.410 | 30.515 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.324 | 0.345 | 0.297 | 0.345 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 2.942 | 3.023 | 2.931 | 3.023 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 152.772 | 155.620 | 151.395 | 155.620 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1371.711 | 1393.975 | 1360.277 | 1393.975 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.138 | 0.257 | 0.137 | 0.257 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.142 | 2.349 | 2.096 | 2.349 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.018 | 0.030 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.434 | 0.458 | 0.426 | 0.458 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.712 | 2.468 | 1.690 | 2.468 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.554 | 6.309 | 5.474 | 6.309 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.871 | 2.841 | 0.608 | 2.841 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.787 | 2.864 | 2.765 | 2.864 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 155.927 | 159.125 | 153.750 | 159.125 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1371.335 | 1422.697 | 1365.931 | 1422.697 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.110 | 0.118 | 0.107 | 0.118 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.407 | 2.468 | 2.358 | 2.468 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.020 | 0.029 | 0.018 | 0.029 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.596 | 0.611 | 0.593 | 0.611 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.829 | 4.301 | 2.413 | 4.301 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 6.954 | 7.847 | 6.766 | 7.847 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.526 | 1.906 | 1.200 | 1.906 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.857 | 2.895 | 2.848 | 2.895 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.631 | 159.473 | 153.587 | 159.473 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1384.697 | 1396.588 | 1378.863 | 1396.588 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.151 | 0.123 | 0.151 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.162 | 2.253 | 2.122 | 2.253 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.033 | 0.017 | 0.033 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.436 | 0.479 | 0.433 | 0.479 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 17.225 | 17.527 | 17.028 | 17.527 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 26.301 | 27.108 | 26.127 | 27.108 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.853 | 2.098 | 0.689 | 2.098 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.728 | 2.902 | 2.670 | 2.902 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.585 | 153.018 | 149.866 | 153.018 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1362.688 | 1382.724 | 1361.018 | 1382.724 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.167 | 0.122 | 0.167 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.067 | 2.119 | 2.054 | 2.119 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.016 | 0.034 | 0.015 | 0.034 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.427 | 0.438 | 0.419 | 0.438 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 8.341 | 8.440 | 8.286 | 8.440 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 16.773 | 17.022 | 16.194 | 17.022 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.791 | 1.913 | 0.768 | 1.913 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.748 | 2.859 | 2.721 | 2.859 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.329 | 169.870 | 152.433 | 169.870 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1386.368 | 1400.597 | 1380.549 | 1400.597 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.162 | 0.128 | 0.162 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 1.988 | 2.057 | 1.984 | 2.057 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.033 | 0.015 | 0.033 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.433 | 0.448 | 0.427 | 0.448 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.374 | 6.984 | 6.290 | 6.984 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.392 | 13.329 | 11.863 | 13.329 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.858 | 2.330 | 0.843 | 2.330 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.772 | 2.941 | 2.732 | 2.941 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.039 | 161.793 | 153.155 | 161.793 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1387.188 | 1444.360 | 1371.108 | 1444.360 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.154 | 0.125 | 0.154 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 1.959 | 2.460 | 1.884 | 2.460 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.033 | 0.015 | 0.033 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.440 | 0.498 | 0.410 | 0.498 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 7.838 | 8.523 | 7.503 | 8.523 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 14.977 | 15.594 | 14.913 | 15.594 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.821 | 0.906 | 0.812 | 0.906 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.732 | 3.219 | 2.724 | 3.219 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.614 | 157.051 | 151.170 | 157.051 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1377.176 | 1406.761 | 1371.672 | 1406.761 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.154 | 0.133 | 0.154 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.130 | 2.192 | 2.127 | 2.192 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.034 | 0.015 | 0.034 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.419 | 0.463 | 0.403 | 0.463 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.200 | 7.522 | 6.945 | 7.522 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 14.723 | 14.854 | 14.675 | 14.854 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.842 | 2.058 | 0.813 | 2.058 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.715 | 2.902 | 2.685 | 2.902 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.401 | 157.185 | 151.746 | 157.185 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1384.675 | 1401.232 | 1382.604 | 1401.232 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.155 | 0.127 | 0.155 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.095 | 2.127 | 2.069 | 2.127 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.017 | 0.027 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.411 | 0.439 | 0.410 | 0.439 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 15.400 | 16.550 | 15.312 | 16.550 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 23.165 | 26.018 | 22.974 | 26.018 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.838 | 2.352 | 0.803 | 2.352 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.808 | 2.833 | 2.773 | 2.833 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 154.328 | 159.738 | 153.051 | 159.738 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1368.539 | 1395.612 | 1355.780 | 1395.612 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.132 | 0.141 | 0.130 | 0.141 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.160 | 2.209 | 2.153 | 2.209 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.018 | 0.028 | 0.016 | 0.028 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.435 | 0.491 | 0.405 | 0.491 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 15.371 | 15.540 | 15.338 | 15.540 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 23.697 | 24.204 | 23.570 | 24.204 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.661 | 2.970 | 0.603 | 2.970 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.826 | 2.901 | 2.726 | 2.901 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 154.130 | 166.361 | 151.768 | 166.361 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1404.002 | 1421.838 | 1379.693 | 1421.838 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.133 | 0.150 | 0.127 | 0.150 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.260 | 2.356 | 2.213 | 2.356 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.018 | 0.020 | 0.017 | 0.020 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.445 | 0.472 | 0.444 | 0.472 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 15.504 | 15.530 | 15.391 | 15.530 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 26.078 | 26.322 | 25.729 | 26.322 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 0.729 | 0.849 | 0.695 | 0.849 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.269 | 4.215 | 3.235 | 4.215 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 155.517 | 156.909 | 152.873 | 156.909 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1378.108 | 1392.776 | 1372.585 | 1392.776 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.127 | 0.156 | 0.121 | 0.156 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.139 | 2.331 | 2.109 | 2.331 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.023 | 0.036 | 0.018 | 0.036 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.412 | 0.447 | 0.406 | 0.447 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 15.431 | 16.071 | 15.404 | 16.071 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 24.698 | 25.245 | 24.474 | 25.245 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.867 | 0.896 | 0.862 | 0.896 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.820 | 2.891 | 2.776 | 2.891 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 153.573 | 163.308 | 153.130 | 163.308 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1408.089 | 1423.902 | 1396.609 | 1423.902 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.139 | 0.162 | 0.122 | 0.162 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.132 | 2.212 | 2.112 | 2.212 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.019 | 0.032 | 0.018 | 0.032 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.424 | 0.440 | 0.408 | 0.440 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 5.912 | 6.095 | 5.901 | 6.095 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 12.986 | 13.291 | 12.753 | 13.291 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.853 | 2.011 | 0.828 | 2.011 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.884 | 3.276 | 2.821 | 3.276 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 155.646 | 156.721 | 155.046 | 156.721 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1388.011 | 1405.543 | 1368.951 | 1405.543 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.128 | 0.181 | 0.126 | 0.181 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.496 | 2.555 | 2.493 | 2.555 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.017 | 0.019 | 0.017 | 0.019 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.609 | 0.623 | 0.607 | 0.623 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 36.771 | 39.880 | 35.009 | 39.880 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 37.994 | 39.959 | 37.417 | 39.959 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.734 | 1.953 | 1.303 | 1.953 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.339 | 3.427 | 3.325 | 3.427 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 152.437 | 154.890 | 152.087 | 154.890 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1398.889 | 1429.885 | 1395.856 | 1429.885 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.148 | 0.187 | 0.135 | 0.187 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.355 | 2.951 | 2.332 | 2.951 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.018 | 0.021 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.470 | 0.495 | 0.469 | 0.495 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 93.430 | 96.282 | 93.351 | 96.282 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 120.016 | 128.566 | 119.187 | 128.566 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 0.693 | 2.189 | 0.684 | 2.189 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.360 | 3.985 | 3.260 | 3.985 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 164.688 | 177.713 | 163.707 | 177.713 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1386.759 | 1414.328 | 1371.940 | 1414.328 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.181 | 0.211 | 0.131 | 0.211 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.656 | 2.715 | 2.642 | 2.715 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.017 | 0.024 | 0.017 | 0.024 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.726 | 0.768 | 0.713 | 0.768 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 121.883 | 124.269 | 121.657 | 124.269 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 110.120 | 111.598 | 110.070 | 111.598 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.641 | 2.699 | 1.561 | 2.699 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.452 | 3.599 | 3.403 | 3.599 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 154.547 | 157.670 | 154.180 | 157.670 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1388.277 | 1410.774 | 1372.876 | 1410.774 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.134 | 0.169 | 0.129 | 0.169 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.136 | 2.230 | 2.129 | 2.230 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.019 | 0.033 | 0.017 | 0.033 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.416 | 0.441 | 0.407 | 0.441 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 5.583 | 5.639 | 5.517 | 5.639 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.361 | 15.547 | 12.836 | 15.547 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.810 | 2.163 | 0.700 | 2.163 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 2.904 | 2.968 | 2.875 | 2.968 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.007 | 156.209 | 150.828 | 156.209 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1364.333 | 1470.355 | 1358.031 | 1470.355 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.262 | 0.153 | 0.262 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 1.950 | 1.996 | 1.928 | 1.996 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.016 | 0.024 | 0.014 | 0.024 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.429 | 0.492 | 0.426 | 0.492 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 106.864 | 107.508 | 106.711 | 107.508 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 124.710 | 125.329 | 123.102 | 125.329 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.914 | 2.273 | 0.849 | 2.273 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.678 | 2.760 | 2.659 | 2.760 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.822 | 158.407 | 152.427 | 158.407 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1367.957 | 1380.468 | 1367.364 | 1380.468 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.151 | 0.219 | 0.132 | 0.219 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 1.962 | 1.997 | 1.962 | 1.997 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.090 | 0.020 | 0.090 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.424 | 0.448 | 0.420 | 0.448 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 13.735 | 14.112 | 13.731 | 14.112 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 19.670 | 20.013 | 19.408 | 20.013 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.893 | 1.976 | 0.846 | 1.976 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.658 | 2.724 | 2.652 | 2.724 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 153.393 | 153.887 | 150.880 | 153.887 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1380.817 | 1400.923 | 1377.655 | 1400.923 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.158 | 0.169 | 0.157 | 0.169 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.207 | 3.323 | 3.164 | 3.323 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.606 | 0.620 | 0.598 | 0.620 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 8.707 | 8.899 | 8.562 | 8.899 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.660 | 18.882 | 16.952 | 18.882 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.673 | 2.329 | 0.656 | 2.329 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.053 | 4.328 | 4.035 | 4.328 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.847 | 154.399 | 151.681 | 154.399 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1379.530 | 1436.347 | 1378.215 | 1436.347 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.147 | 0.153 | 0.122 | 0.153 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.108 | 2.109 | 2.108 | 2.109 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.016 | 0.035 | 0.015 | 0.035 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.420 | 0.449 | 0.412 | 0.449 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.092 | 6.149 | 5.863 | 6.149 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 12.919 | 13.529 | 12.693 | 13.529 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.851 | 2.225 | 0.715 | 2.225 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.677 | 3.045 | 2.669 | 3.045 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.650 | 159.915 | 150.455 | 159.915 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1396.642 | 1433.845 | 1377.233 | 1433.845 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.146 | 0.129 | 0.146 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.094 | 2.154 | 2.080 | 2.154 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.030 | 0.019 | 0.030 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.421 | 0.427 | 0.409 | 0.427 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 9.440 | 9.637 | 9.367 | 9.637 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.525 | 16.093 | 15.109 | 16.093 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.832 | 2.330 | 0.652 | 2.330 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.755 | 2.826 | 2.730 | 2.826 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.592 | 156.373 | 152.471 | 156.373 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1393.698 | 1417.597 | 1390.638 | 1417.597 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.198 | 0.153 | 0.198 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.823 | 4.772 | 3.714 | 4.772 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.020 | 0.024 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.673 | 0.852 | 0.635 | 0.852 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 26.649 | 27.401 | 26.504 | 27.401 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 43.295 | 46.072 | 43.055 | 46.072 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.868 | 0.900 | 0.849 | 0.900 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 4.990 | 7.051 | 4.900 | 7.051 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.461 | 155.265 | 151.476 | 155.265 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1412.947 | 1569.521 | 1402.461 | 1569.521 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.160 | 0.179 | 0.150 | 0.179 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.652 | 3.696 | 3.615 | 3.696 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.041 | 0.020 | 0.041 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.638 | 0.647 | 0.613 | 0.647 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 24.516 | 25.372 | 24.048 | 25.372 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 38.538 | 39.910 | 38.009 | 39.910 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.894 | 0.906 | 0.858 | 0.906 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 4.990 | 5.008 | 4.906 | 5.008 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 155.747 | 181.250 | 152.361 | 181.250 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1386.799 | 1413.979 | 1379.962 | 1413.979 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.142 | 0.194 | 0.132 | 0.194 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.161 | 2.190 | 2.154 | 2.190 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.030 | 0.051 | 0.016 | 0.051 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.429 | 0.466 | 0.408 | 0.466 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.406 | 178.868 | 8.313 | 178.868 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 15.983 | 16.432 | 15.410 | 16.432 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 1.408 | 2.123 | 0.818 | 2.123 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.838 | 2.982 | 2.816 | 2.982 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 158.392 | 171.893 | 156.712 | 171.893 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1414.390 | 1646.083 | 1386.065 | 1646.083 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.135 | 0.140 | 0.135 | 0.140 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.395 | 2.527 | 2.371 | 2.527 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.017 | 0.021 | 0.017 | 0.021 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.457 | 0.504 | 0.449 | 0.504 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.421 | 7.762 | 7.327 | 7.762 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 16.435 | 17.507 | 16.392 | 17.507 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.721 | 0.782 | 0.696 | 0.782 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.219 | 3.988 | 3.218 | 3.988 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 154.766 | 158.940 | 153.423 | 158.940 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1380.039 | 1425.634 | 1378.530 | 1425.634 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.132 | 0.138 | 0.117 | 0.138 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.287 | 2.372 | 2.286 | 2.372 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.018 | 0.025 | 0.017 | 0.025 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.451 | 0.509 | 0.436 | 0.509 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.310 | 9.819 | 9.108 | 9.819 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 16.364 | 17.053 | 16.184 | 17.053 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.755 | 0.781 | 0.675 | 0.781 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.046 | 3.261 | 3.015 | 3.261 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 169.752 | 191.810 | 159.122 | 191.810 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1377.643 | 1379.655 | 1374.403 | 1379.655 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.145 | 0.232 | 0.134 | 0.232 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.180 | 2.512 | 2.135 | 2.512 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.018 | 0.030 | 0.017 | 0.030 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.418 | 0.442 | 0.418 | 0.442 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 9.752 | 10.215 | 9.668 | 10.215 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.602 | 18.067 | 17.287 | 18.067 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.913 | 2.161 | 0.878 | 2.161 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.785 | 2.790 | 2.751 | 2.790 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 152.624 | 156.294 | 152.055 | 156.294 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1391.555 | 1442.636 | 1378.646 | 1442.636 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.133 | 0.161 | 0.126 | 0.161 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.117 | 2.174 | 2.115 | 2.174 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.019 | 0.036 | 0.016 | 0.036 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.411 | 0.427 | 0.405 | 0.427 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.263 | 7.408 | 7.146 | 7.408 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.946 | 15.740 | 14.860 | 15.740 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.835 | 1.864 | 0.785 | 1.864 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.747 | 2.935 | 2.733 | 2.935 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 154.567 | 159.692 | 154.426 | 159.692 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1387.344 | 1412.891 | 1374.101 | 1412.891 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.140 | 0.151 | 0.130 | 0.151 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.198 | 2.237 | 2.156 | 2.237 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.018 | 0.023 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.425 | 0.448 | 0.424 | 0.448 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 14.855 | 14.967 | 14.635 | 14.967 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 23.406 | 24.227 | 23.394 | 24.227 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.903 | 2.374 | 0.784 | 2.374 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.190 | 3.282 | 3.154 | 3.282 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.805 | 189.015 | 172.763 | 189.015 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | python-prophet | 6 | 1658.091 | 1753.315 | 1635.287 | 1753.315 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 6 | 2.244 | 2.720 | 2.135 | 2.720 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | python-prophet | 6 | 9.693 | 12.788 | 9.260 | 12.788 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 6 | 0.281 | 0.327 | 0.268 | 0.327 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | python-prophet | 6 | 13.512 | 17.339 | 13.004 | 17.339 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | effect-prophet | 6 | 1658.183 | 1701.850 | 1643.879 | 1701.850 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | python-prophet | 6 | 449.792 | 564.450 | 447.662 | 564.450 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | effect-prophet | 6 | 0.305 | 0.364 | 0.298 | 0.364 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | python-prophet | 6 | 3.874 | 4.550 | 3.732 | 4.550 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | effect-prophet | 6 | 2.834 | 4.407 | 2.495 | 4.407 | 174.5 |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | python-prophet | 6 | 231.659 | 286.497 | 205.367 | 286.497 | 133.8 |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | effect-prophet | 6 | 235.029 | 283.430 | 223.496 | 283.430 | n/a |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | python-prophet | 6 | 1754.916 | 2009.293 | 1663.548 | 2009.293 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | effect-prophet | 6 | 4.625 | 9.171 | 4.462 | 9.171 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | python-prophet | 6 | 29.398 | 32.752 | 25.810 | 32.752 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | effect-prophet | 6 | 0.884 | 1.592 | 0.810 | 1.592 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | python-prophet | 6 | 52.640 | 55.430 | 52.089 | 55.430 | n/a |
| mcmc-logistic-rate-changes | warm-fit | effect-prophet | 6 | 29292.905 | 30883.816 | 28669.692 | 30883.816 | n/a |
| mcmc-logistic-rate-changes | warm-fit | python-prophet | 6 | 9271.346 | 11285.776 | 8545.266 | 11285.776 | n/a |
| mcmc-logistic-rate-changes | warm-predict | effect-prophet | 6 | 2.261 | 2.440 | 2.010 | 2.440 | n/a |
| mcmc-logistic-rate-changes | warm-predict | python-prophet | 6 | 5.907 | 6.138 | 5.682 | 6.138 | n/a |
| mcmc-logistic-rate-changes | warm-uncertainty | effect-prophet | 6 | 34.775 | 35.805 | 34.513 | 35.805 | 151.1 |
| mcmc-logistic-rate-changes | warm-uncertainty | python-prophet | 6 | 323.020 | 335.259 | 315.738 | 335.259 | 151.0 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 186.071 | 192.411 | 181.290 | 192.411 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1508.915 | 1898.504 | 1498.748 | 1898.504 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.321 | 168.699 | 156.678 | 168.699 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1455.838 | 1532.626 | 1369.587 | 1532.626 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.181 | 1.840 | 0.123 | 1.840 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.370 | 2.965 | 2.351 | 2.965 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.031 | 0.053 | 0.020 | 0.053 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.479 | 0.536 | 0.431 | 0.536 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.040 | 0.052 | 0.024 | 0.052 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.548 | 0.613 | 0.511 | 0.613 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.005 | 1.540 | 0.962 | 1.540 | 141.1 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 93.588 | 107.971 | 88.769 | 107.971 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 183.434 | 188.277 | 181.003 | 188.277 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1350.982 | 1357.848 | 1342.981 | 1357.848 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.911 | 167.348 | 154.669 | 167.348 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1317.949 | 1359.082 | 1300.108 | 1359.082 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.155 | 0.173 | 0.128 | 0.173 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.324 | 2.469 | 2.276 | 2.469 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.036 | 1.668 | 0.024 | 1.668 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.457 | 0.480 | 0.444 | 0.480 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.039 | 0.061 | 0.024 | 0.061 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.489 | 0.500 | 0.466 | 0.500 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.672 | 1.739 | 0.626 | 1.739 | 144.2 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 21.465 | 33.497 | 21.369 | 33.497 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 190.101 | 204.702 | 187.204 | 204.702 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1373.450 | 1481.821 | 1364.536 | 1481.821 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.238 | 158.002 | 154.547 | 158.002 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1321.483 | 1341.398 | 1317.614 | 1341.398 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.190 | 0.283 | 0.156 | 0.283 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.458 | 3.686 | 3.357 | 3.686 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.035 | 0.024 | 0.035 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.688 | 0.882 | 0.620 | 0.882 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.062 | 0.078 | 0.052 | 0.078 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.517 | 0.553 | 0.491 | 0.553 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.778 | 2.066 | 0.729 | 2.066 | 147.5 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 27.942 | 41.169 | 26.785 | 41.169 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 183.914 | 186.130 | 182.514 | 186.130 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1356.305 | 1379.635 | 1337.959 | 1379.635 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.411 | 162.415 | 151.307 | 162.415 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1349.198 | 1395.725 | 1316.207 | 1395.725 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.180 | 0.225 | 0.141 | 0.225 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.598 | 4.030 | 3.364 | 4.030 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.035 | 0.021 | 0.035 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.708 | 0.757 | 0.648 | 0.757 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.053 | 0.086 | 0.051 | 0.086 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.513 | 0.577 | 0.491 | 0.577 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.736 | 1.733 | 0.679 | 1.733 | 147.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 23.512 | 35.098 | 22.753 | 35.098 | 133.8 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 176.555 | 183.441 | 175.674 | 183.441 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1419.199 | 1431.633 | 1397.042 | 1431.633 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 169.441 | 178.256 | 162.260 | 178.256 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1406.276 | 1408.023 | 1388.974 | 1408.023 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.144 | 0.172 | 0.135 | 0.172 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.483 | 2.593 | 2.427 | 2.593 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.029 | 0.035 | 0.017 | 0.035 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.606 | 0.661 | 0.584 | 0.661 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.070 | 0.986 | 0.057 | 0.986 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.563 | 0.584 | 0.554 | 0.584 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.994 | 2.221 | 0.827 | 2.221 | 148.7 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.039 | 42.296 | 24.784 | 42.296 | 133.8 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 187.135 | 245.713 | 181.792 | 245.713 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1490.052 | 1522.576 | 1471.011 | 1522.576 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.924 | 390.514 | 164.959 | 390.514 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1471.360 | 1592.748 | 1443.740 | 1592.748 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.345 | 1.702 | 0.150 | 1.702 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.296 | 2.359 | 2.208 | 2.359 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.034 | 0.060 | 0.019 | 0.060 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.455 | 0.495 | 0.447 | 0.495 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.023 | 0.040 | 0.017 | 0.040 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.470 | 0.506 | 0.438 | 0.506 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.158 | 1.491 | 1.076 | 1.491 | 145.2 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 78.095 | 80.759 | 76.516 | 80.759 | 133.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 319.723 | 328.148 | 314.161 | 328.148 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1762.150 | 2019.957 | 1752.624 | 2019.957 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 183.947 | 210.229 | 181.882 | 210.229 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1676.284 | 1728.797 | 1650.114 | 1728.797 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.154 | 0.228 | 0.139 | 0.228 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.695 | 3.819 | 2.582 | 3.819 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.032 | 0.051 | 0.022 | 0.051 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.730 | 0.967 | 0.700 | 0.967 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.060 | 0.083 | 0.040 | 0.083 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.759 | 0.839 | 0.756 | 0.839 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 21.486 | 22.932 | 21.297 | 22.932 | 155.4 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 274.290 | 318.939 | 272.607 | 318.939 | 133.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 320.873 | 340.317 | 313.663 | 340.317 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1756.958 | 1779.189 | 1741.324 | 1779.189 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 183.939 | 188.706 | 182.542 | 188.706 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1650.666 | 1672.808 | 1639.412 | 1672.808 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.156 | 0.167 | 0.141 | 0.167 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.694 | 2.777 | 2.566 | 2.777 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.021 | 0.026 | 0.021 | 0.026 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.727 | 0.734 | 0.707 | 0.734 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.082 | 0.105 | 0.054 | 0.105 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.744 | 0.798 | 0.712 | 0.798 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 21.846 | 22.955 | 21.637 | 22.955 | 157.3 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 281.563 | 300.550 | 274.164 | 300.550 | 133.8 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 120.602 | 123.421 | 119.865 | 123.421 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 104.524 | 108.305 | 103.664 | 108.305 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 106.091 | 111.146 | 105.128 | 111.146 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 89.336 | 91.198 | 88.576 | 91.198 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `b7a56669f96d6fd0b7aa03fb7b574f05954fc1e2`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:0e313d139af28eec792becb0667d6d641ac9cb7b774b85fd85208c8717f17259`
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

