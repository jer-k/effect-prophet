# Effect Prophet benchmark — 2026-10-29T235232-725Z-c8e0ac69

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
| evaluation-logistic-large-months-metrics | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.682e-1 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. Absolute times only. |
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
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3839 | 30576 |

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

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling | n/a |
| evaluation-logistic-large-months-metrics | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 3 | 436 | 273 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 70.419 | 71.003 | 69.822 | 71.003 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 298.696 | 317.201 | 295.527 | 317.201 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 52.336 | 55.194 | 52.153 | 55.194 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 45.338 | 49.018 | 44.061 | 49.018 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.395 | 14.781 | 14.183 | 14.781 | 155.0 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 257.136 | 296.970 | 252.315 | 296.970 | 131.5 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.018 | 0.011 | 0.018 | 139.1 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.480 | 0.506 | 0.473 | 0.506 | 131.5 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 204.602 | 223.593 | 198.024 | 223.593 | 151.5 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1466.434 | 1496.293 | 1456.224 | 1496.293 | 131.5 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 155.047 | 161.281 | 154.047 | 161.281 | 151.5 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1419.579 | 1448.030 | 1405.473 | 1448.030 | 131.5 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.334 | 0.397 | 0.318 | 0.397 | 151.5 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.046 | 4.213 | 3.984 | 4.213 | 131.5 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.028 | 0.034 | 0.018 | 0.034 | 151.5 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.725 | 0.734 | 0.686 | 0.734 | 131.5 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.583 | 30.912 | 30.092 | 30.912 | 151.3 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 55.022 | 55.525 | 54.472 | 55.525 | 131.5 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.292 | 30.861 | 30.153 | 30.861 | 149.0 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 54.658 | 55.408 | 54.244 | 55.408 | 131.5 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.306 | 31.642 | 30.828 | 31.642 | 145.3 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 50.414 | 54.098 | 49.750 | 54.098 | 131.5 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.158 | 0.192 | 0.138 | 0.192 | 146.9 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.830 | 4.926 | 4.750 | 4.926 | 131.5 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.038 | 0.011 | 0.038 | 135.7 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.486 | 0.521 | 0.480 | 0.521 | 131.5 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 208.944 | 217.751 | 208.240 | 217.751 | 144.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1465.040 | 1482.088 | 1447.420 | 1482.088 | 131.5 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 154.935 | 167.874 | 150.597 | 167.874 | 144.9 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1398.071 | 1415.859 | 1391.054 | 1415.859 | 131.5 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.323 | 0.372 | 0.313 | 0.372 | 144.9 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.024 | 4.108 | 3.975 | 4.108 | 131.5 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.025 | 0.030 | 0.016 | 0.030 | 144.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.681 | 0.721 | 0.660 | 0.721 | 131.5 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 42.720 | 43.291 | 42.703 | 43.291 | 144.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 62.333 | 63.015 | 62.282 | 63.015 | 131.5 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 42.893 | 43.434 | 42.714 | 43.434 | 143.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 61.786 | 62.505 | 61.493 | 62.505 | 131.5 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.388 | 44.185 | 43.306 | 44.185 | 138.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 56.954 | 57.554 | 56.859 | 57.554 | 131.5 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.168 | 1.494 | 0.140 | 1.494 | 143.6 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.797 | 4.866 | 4.662 | 4.866 | 131.5 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.026 | 0.015 | 0.026 | 145.2 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.518 | 0.477 | 0.518 | 148.3 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 203.707 | 271.752 | 198.207 | 271.752 | 166.4 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1770.771 | 1871.077 | 1659.210 | 1871.077 | 148.3 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 162.867 | 207.260 | 156.444 | 207.260 | 169.3 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1613.335 | 1771.475 | 1594.210 | 1771.475 | 148.3 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.727 | 1.145 | 0.711 | 1.145 | 166.4 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.874 | 6.804 | 4.465 | 6.804 | 148.3 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.111 | 0.271 | 0.094 | 0.271 | 166.4 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.740 | 0.819 | 0.705 | 0.819 | 148.3 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.078 | 34.630 | 30.896 | 34.630 | 165.1 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 60.135 | 62.922 | 59.671 | 62.922 | 148.3 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.625 | 40.050 | 31.304 | 40.050 | 163.4 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 61.278 | 63.032 | 59.219 | 63.032 | 148.3 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.703 | 39.666 | 31.523 | 39.666 | 158.3 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 53.524 | 56.886 | 52.996 | 56.886 | 148.3 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.312 | 0.644 | 0.245 | 0.644 | 158.7 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 6.007 | 6.834 | 5.807 | 6.834 | 148.3 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.011 | 0.015 | 140.3 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.480 | 0.510 | 0.453 | 0.510 | 148.3 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 214.550 | 218.680 | 211.140 | 218.680 | 154.6 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1640.462 | 1696.957 | 1627.616 | 1696.957 | 148.3 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.165 | 176.949 | 153.643 | 176.949 | 157.7 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1579.018 | 1617.173 | 1564.087 | 1617.173 | 148.3 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.819 | 0.937 | 0.741 | 0.937 | 157.7 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.219 | 4.540 | 4.049 | 4.540 | 148.3 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.106 | 0.218 | 0.093 | 0.218 | 157.7 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.682 | 0.805 | 0.667 | 0.805 | 148.3 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.606 | 44.113 | 43.348 | 44.113 | 154.3 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 66.715 | 71.732 | 66.302 | 71.732 | 148.3 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.948 | 45.292 | 43.432 | 45.292 | 152.7 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 66.202 | 78.256 | 65.775 | 78.256 | 148.3 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.091 | 46.566 | 43.953 | 46.566 | 149.8 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 60.386 | 63.340 | 59.607 | 63.340 | 148.3 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.249 | 0.295 | 0.201 | 0.295 | 150.0 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.601 | 5.706 | 5.455 | 5.706 | 148.3 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.535 | 21.112 | 17.556 | 21.112 | 147.4 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 66.898 | 80.790 | 64.991 | 80.790 | 131.5 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 15.616 | 17.718 | 13.798 | 17.718 | 160.6 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 66.582 | 72.217 | 60.935 | 72.217 | 131.5 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.307 | 1.579 | 1.228 | 1.579 | 154.3 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 13.074 | 14.710 | 13.066 | 14.710 | 131.5 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.352 | 0.361 | 0.326 | 0.361 | 154.3 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.197 | 5.596 | 5.179 | 5.596 | 131.5 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.523 | 0.809 | 0.499 | 0.809 | 154.3 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.872 | 6.626 | 5.756 | 6.626 | 131.5 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 194.087 | 249.124 | 193.834 | 249.124 | 158.7 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1471.915 | 1516.853 | 1465.553 | 1516.853 | 131.5 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.384 | 2.590 | 2.336 | 2.590 | 158.6 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.303 | 1.316 | 1.283 | 1.316 | 131.5 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.042 | 0.064 | 0.037 | 0.064 | 131.3 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.490 | 0.589 | 0.461 | 0.589 | 131.5 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.065 | 0.090 | 0.060 | 0.090 | 158.1 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.420 | 5.442 | 5.351 | 5.442 | 131.5 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.204 | 2.510 | 1.148 | 2.510 | 131.3 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.741 | 0.807 | 0.705 | 0.807 | 131.5 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.731 | 16.085 | 13.081 | 16.085 | 157.7 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 42.262 | 43.453 | 42.047 | 43.453 | 131.5 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 199.644 | 246.954 | 195.378 | 246.954 | 157.6 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1482.906 | 1494.520 | 1477.362 | 1494.520 | 131.5 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.085 | 3.690 | 1.006 | 3.690 | 157.5 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.785 | 0.816 | 0.768 | 0.816 | 131.5 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.014 | 0.018 | 0.009 | 0.018 | 127.3 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.401 | 0.469 | 0.372 | 0.469 | 131.5 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.082 | 0.133 | 0.070 | 0.133 | 151.7 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.347 | 6.473 | 5.333 | 6.473 | 131.5 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.972 | 1.366 | 0.875 | 1.366 | 130.4 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.547 | 0.603 | 0.537 | 0.603 | 131.5 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.675 | 20.129 | 16.893 | 20.129 | 149.7 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 59.483 | 61.458 | 59.339 | 61.458 | 131.5 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.566 | 18.024 | 17.404 | 18.024 | 153.4 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 31.026 | 31.925 | 29.884 | 31.925 | 131.5 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.180 | 0.195 | 0.170 | 0.195 | 154.5 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 131.5 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.370 | 0.415 | 0.214 | 0.415 | 154.0 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.011 | 0.016 | 0.009 | 0.016 | 131.5 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 36.694 | 38.676 | 36.120 | 38.676 | 152.3 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 114.249 | 114.805 | 113.726 | 114.805 | 131.5 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.037 | 0.041 | 0.035 | 0.041 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.496 | 0.502 | 0.485 | 0.502 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 191.585 | 196.532 | 183.661 | 196.532 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1426.740 | 1444.920 | 1420.622 | 1444.920 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.295 | 157.058 | 151.213 | 157.058 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1394.745 | 1495.699 | 1393.241 | 1495.699 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.086 | 0.137 | 0.083 | 0.137 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.381 | 2.481 | 2.365 | 2.481 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.048 | 0.028 | 0.048 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.462 | 0.472 | 0.445 | 0.472 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.746 | 20.873 | 20.720 | 20.873 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.510 | 36.425 | 35.301 | 36.425 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 20.865 | 21.126 | 20.827 | 21.126 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 34.736 | 35.484 | 34.651 | 35.484 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.475 | 21.547 | 21.296 | 21.547 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 31.640 | 32.178 | 31.633 | 32.178 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.353 | 0.380 | 0.351 | 0.380 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.515 | 3.549 | 3.480 | 3.549 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.044 | 0.050 | 0.039 | 0.050 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.492 | 0.549 | 0.483 | 0.549 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 181.900 | 190.846 | 181.058 | 190.846 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1407.986 | 1414.552 | 1405.519 | 1414.552 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.669 | 154.438 | 149.691 | 154.438 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1384.348 | 1387.579 | 1382.787 | 1387.579 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.085 | 0.103 | 0.080 | 0.103 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.418 | 2.435 | 2.394 | 2.435 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.034 | 0.025 | 0.034 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.447 | 0.473 | 0.440 | 0.473 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.477 | 18.319 | 17.163 | 18.319 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.213 | 34.532 | 30.025 | 34.532 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.419 | 18.567 | 17.273 | 18.567 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 29.536 | 32.962 | 29.499 | 32.962 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.880 | 18.640 | 17.648 | 18.640 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.495 | 26.576 | 26.363 | 26.576 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.353 | 0.395 | 0.341 | 0.395 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.500 | 3.837 | 3.493 | 3.837 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.030 | 0.017 | 0.030 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.488 | 0.517 | 0.449 | 0.517 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 182.873 | 195.632 | 180.015 | 195.632 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1431.211 | 1446.162 | 1430.375 | 1446.162 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.717 | 157.391 | 150.456 | 157.391 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1393.440 | 1438.830 | 1386.005 | 1438.830 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.093 | 0.102 | 0.086 | 0.102 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.301 | 2.407 | 2.259 | 2.407 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.038 | 0.028 | 0.038 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.429 | 0.490 | 0.406 | 0.490 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.293 | 18.328 | 18.261 | 18.328 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 31.932 | 34.243 | 31.881 | 34.243 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 18.929 | 19.973 | 18.915 | 19.973 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 31.366 | 31.807 | 31.249 | 31.807 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 18.686 | 18.770 | 18.491 | 18.770 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.225 | 28.684 | 28.061 | 28.684 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.287 | 0.359 | 0.286 | 0.359 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.145 | 3.239 | 3.141 | 3.239 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.022 | 0.038 | 0.017 | 0.038 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.463 | 0.488 | 0.444 | 0.488 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 182.725 | 193.430 | 178.261 | 193.430 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1416.853 | 1427.988 | 1408.401 | 1427.988 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 151.995 | 158.855 | 151.652 | 158.855 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1409.370 | 1446.411 | 1388.145 | 1446.411 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.080 | 0.088 | 0.071 | 0.088 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.269 | 2.328 | 2.246 | 2.328 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.028 | 0.050 | 0.026 | 0.050 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.429 | 0.476 | 0.419 | 0.476 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.445 | 18.582 | 18.437 | 18.582 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 32.435 | 32.801 | 32.033 | 32.801 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 18.965 | 19.141 | 18.911 | 19.141 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 31.517 | 31.742 | 31.431 | 31.742 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.018 | 19.332 | 18.907 | 19.332 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 28.530 | 28.921 | 28.316 | 28.921 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.297 | 0.308 | 0.289 | 0.308 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.111 | 3.131 | 3.105 | 3.131 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.040 | 0.044 | 0.039 | 0.044 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.582 | 0.616 | 0.576 | 0.616 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 168.767 | 174.595 | 168.110 | 174.595 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1394.191 | 1416.160 | 1393.199 | 1416.160 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 153.898 | 157.774 | 152.928 | 157.774 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1381.712 | 1401.916 | 1381.515 | 1401.916 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.094 | 0.101 | 0.090 | 0.101 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.491 | 2.621 | 2.468 | 2.621 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.046 | 0.027 | 0.046 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.630 | 0.707 | 0.596 | 0.707 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.123 | 4.286 | 3.999 | 4.286 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.262 | 13.914 | 13.244 | 13.914 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.393 | 4.816 | 4.297 | 4.816 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.592 | 12.917 | 12.560 | 12.917 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 5.054 | 6.429 | 4.892 | 6.429 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.433 | 10.419 | 9.313 | 10.419 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.362 | 0.379 | 0.359 | 0.379 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.237 | 3.576 | 3.168 | 3.576 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.029 | 0.020 | 0.029 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.504 | 0.520 | 0.504 | 0.520 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 184.197 | 190.200 | 181.738 | 190.200 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1420.284 | 1588.336 | 1417.028 | 1588.336 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.486 | 152.917 | 151.247 | 152.917 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1389.751 | 1393.920 | 1387.576 | 1393.920 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.227 | 0.085 | 0.227 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.270 | 2.407 | 2.226 | 2.407 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.033 | 0.039 | 0.029 | 0.039 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.437 | 0.504 | 0.413 | 0.504 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.312 | 20.666 | 20.214 | 20.666 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.093 | 36.022 | 35.054 | 36.022 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.824 | 21.146 | 20.727 | 21.146 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 34.238 | 34.453 | 34.057 | 34.453 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.734 | 21.164 | 20.648 | 21.164 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 31.615 | 32.172 | 31.401 | 32.172 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.329 | 0.335 | 0.328 | 0.335 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.164 | 3.220 | 3.157 | 3.220 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 152.054 | 154.609 | 151.133 | 154.609 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1426.576 | 1432.187 | 1422.180 | 1432.187 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.114 | 0.129 | 0.113 | 0.129 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.235 | 2.297 | 2.217 | 2.297 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.021 | 0.028 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.472 | 0.510 | 0.458 | 0.510 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.699 | 2.191 | 1.676 | 2.191 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.783 | 6.479 | 5.780 | 6.479 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.887 | 1.563 | 0.806 | 1.563 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.950 | 3.562 | 2.897 | 3.562 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 159.170 | 159.473 | 156.087 | 159.473 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1446.016 | 1468.951 | 1438.650 | 1468.951 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.107 | 0.121 | 0.106 | 0.121 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.490 | 2.608 | 2.454 | 2.608 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.018 | 0.025 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.631 | 0.673 | 0.628 | 0.673 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 3.021 | 3.593 | 3.015 | 3.593 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.119 | 7.625 | 7.096 | 7.625 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.077 | 1.127 | 1.057 | 1.127 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.991 | 3.098 | 2.957 | 3.098 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.171 | 163.606 | 156.083 | 163.606 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1456.096 | 1575.393 | 1444.400 | 1575.393 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.126 | 0.203 | 0.124 | 0.203 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.211 | 2.249 | 2.172 | 2.249 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.032 | 0.020 | 0.032 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.439 | 0.458 | 0.435 | 0.458 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.570 | 19.230 | 18.465 | 19.230 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 27.156 | 27.708 | 27.113 | 27.708 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.932 | 1.067 | 0.830 | 1.067 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.889 | 2.973 | 2.871 | 2.973 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.496 | 157.151 | 155.962 | 157.151 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1427.837 | 1473.694 | 1424.223 | 1473.694 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.130 | 0.221 | 0.128 | 0.221 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.226 | 2.304 | 2.203 | 2.304 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.036 | 0.021 | 0.036 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.430 | 0.459 | 0.413 | 0.459 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.089 | 10.131 | 9.051 | 10.131 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.320 | 18.053 | 17.080 | 18.053 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.917 | 1.033 | 0.883 | 1.033 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.895 | 3.056 | 2.836 | 3.056 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.593 | 161.994 | 155.118 | 161.994 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1448.587 | 1474.260 | 1426.630 | 1474.260 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.121 | 1.347 | 0.118 | 1.347 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.059 | 2.178 | 2.002 | 2.178 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.034 | 0.020 | 0.034 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.430 | 0.469 | 0.401 | 0.469 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.480 | 6.693 | 6.451 | 6.693 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.637 | 13.465 | 12.532 | 13.465 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.864 | 0.901 | 0.862 | 0.901 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.923 | 2.978 | 2.902 | 2.978 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 165.265 | 175.639 | 156.799 | 175.639 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1453.934 | 1485.127 | 1435.942 | 1485.127 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.251 | 0.120 | 0.251 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.100 | 2.148 | 2.075 | 2.148 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.050 | 0.022 | 0.050 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.442 | 0.467 | 0.439 | 0.467 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.172 | 8.597 | 8.133 | 8.597 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.486 | 16.429 | 15.219 | 16.429 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.952 | 0.989 | 0.928 | 0.989 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.942 | 3.005 | 2.891 | 3.005 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.689 | 169.948 | 158.521 | 169.948 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1434.554 | 1451.496 | 1431.954 | 1451.496 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.151 | 0.132 | 0.151 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.209 | 2.302 | 2.192 | 2.302 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.040 | 0.019 | 0.040 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.441 | 0.465 | 0.427 | 0.465 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.768 | 8.844 | 7.750 | 8.844 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.114 | 15.615 | 14.953 | 15.615 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.955 | 1.199 | 0.925 | 1.199 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.941 | 2.976 | 2.894 | 2.976 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.269 | 156.726 | 155.684 | 156.726 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1449.276 | 1468.002 | 1442.086 | 1468.002 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.133 | 0.175 | 0.127 | 0.175 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.297 | 2.375 | 2.266 | 2.375 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.037 | 0.018 | 0.037 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.443 | 0.470 | 0.439 | 0.470 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.497 | 16.576 | 16.408 | 16.576 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 24.671 | 25.405 | 24.020 | 25.405 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.850 | 0.859 | 0.848 | 0.859 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.961 | 2.992 | 2.935 | 2.992 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 156.055 | 156.971 | 151.177 | 156.971 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1456.092 | 1704.488 | 1433.831 | 1704.488 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.122 | 0.128 | 0.119 | 0.128 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.249 | 2.769 | 2.245 | 2.769 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.026 | 0.034 | 0.021 | 0.034 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.440 | 0.459 | 0.435 | 0.459 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.502 | 16.628 | 16.323 | 16.628 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.934 | 25.532 | 24.279 | 25.532 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.885 | 0.976 | 0.876 | 0.976 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.954 | 3.558 | 2.947 | 3.558 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 158.681 | 168.744 | 157.278 | 168.744 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1440.636 | 1473.254 | 1427.697 | 1473.254 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.140 | 0.258 | 0.129 | 0.258 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.501 | 2.664 | 2.462 | 2.664 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.022 | 0.028 | 0.020 | 0.028 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.469 | 0.525 | 0.462 | 0.525 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.585 | 17.770 | 16.410 | 17.770 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 27.316 | 28.891 | 26.215 | 28.891 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.604 | 2.657 | 1.420 | 2.657 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.584 | 4.375 | 3.457 | 4.375 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 156.662 | 160.946 | 152.888 | 160.946 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1439.433 | 1478.239 | 1417.989 | 1478.239 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.127 | 0.130 | 0.123 | 0.130 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.269 | 2.347 | 2.212 | 2.347 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.023 | 0.041 | 0.018 | 0.041 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.448 | 0.462 | 0.417 | 0.462 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.477 | 16.665 | 16.182 | 16.665 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.402 | 26.111 | 24.526 | 26.111 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.869 | 1.044 | 0.858 | 1.044 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.871 | 2.962 | 2.824 | 2.962 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 155.786 | 157.007 | 153.562 | 157.007 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1471.308 | 1521.420 | 1418.843 | 1521.420 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.125 | 0.138 | 0.120 | 0.138 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.209 | 2.243 | 2.197 | 2.243 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.020 | 0.030 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.421 | 0.462 | 0.417 | 0.462 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.129 | 6.403 | 6.065 | 6.403 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.255 | 14.005 | 13.084 | 14.005 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.860 | 0.880 | 0.843 | 0.880 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.861 | 2.930 | 2.849 | 2.930 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 160.649 | 194.100 | 160.438 | 194.100 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1456.217 | 1579.437 | 1439.957 | 1579.437 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.120 | 0.178 | 0.117 | 0.178 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.673 | 2.755 | 2.640 | 2.755 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.025 | 0.042 | 0.021 | 0.042 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.652 | 0.714 | 0.637 | 0.714 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.161 | 40.386 | 37.878 | 40.386 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 40.243 | 44.864 | 39.186 | 44.864 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.165 | 1.341 | 1.155 | 1.341 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.575 | 3.619 | 3.558 | 3.619 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 156.475 | 158.464 | 154.669 | 158.464 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1436.355 | 1451.875 | 1428.106 | 1451.875 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.119 | 0.172 | 0.118 | 0.172 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.296 | 2.406 | 2.277 | 2.406 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.022 | 0.028 | 0.019 | 0.028 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.465 | 0.471 | 0.445 | 0.471 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 100.853 | 101.361 | 100.796 | 101.361 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 123.047 | 124.708 | 121.419 | 124.708 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 0.975 | 1.020 | 0.958 | 1.020 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.479 | 3.538 | 3.448 | 3.538 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 201.111 | 330.975 | 171.976 | 330.975 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1437.789 | 1458.994 | 1435.392 | 1458.994 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.178 | 0.343 | 0.152 | 0.343 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.790 | 2.848 | 2.748 | 2.848 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.022 | 0.048 | 0.021 | 0.048 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.748 | 0.787 | 0.748 | 0.787 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 132.571 | 144.676 | 131.173 | 144.676 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 112.597 | 114.765 | 112.514 | 114.765 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.712 | 1.814 | 1.695 | 1.814 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.589 | 3.635 | 3.512 | 3.635 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 156.579 | 165.885 | 156.470 | 165.885 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1429.379 | 1452.970 | 1418.826 | 1452.970 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.125 | 1.655 | 0.112 | 1.655 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.216 | 2.266 | 2.185 | 2.266 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.028 | 0.029 | 0.027 | 0.029 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.441 | 0.448 | 0.430 | 0.448 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 5.929 | 7.047 | 5.826 | 7.047 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.235 | 13.888 | 12.978 | 13.888 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.855 | 1.009 | 0.841 | 1.009 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.035 | 3.082 | 2.986 | 3.082 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.632 | 157.634 | 152.736 | 157.634 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1439.967 | 1468.067 | 1424.351 | 1468.067 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.143 | 0.115 | 0.143 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.079 | 2.175 | 2.061 | 2.175 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.041 | 0.018 | 0.041 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.428 | 0.445 | 0.427 | 0.445 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 115.107 | 117.158 | 114.520 | 117.158 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 127.194 | 130.681 | 126.355 | 130.681 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.869 | 0.885 | 0.842 | 0.885 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.969 | 3.147 | 2.939 | 3.147 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.691 | 160.863 | 151.477 | 160.863 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1434.317 | 1499.137 | 1429.078 | 1499.137 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.146 | 0.246 | 0.121 | 0.246 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.085 | 2.156 | 2.061 | 2.156 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.046 | 0.022 | 0.046 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.439 | 0.456 | 0.432 | 0.456 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.071 | 15.179 | 14.833 | 15.179 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.797 | 21.464 | 20.203 | 21.464 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.841 | 0.873 | 0.840 | 0.873 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.929 | 2.993 | 2.848 | 2.993 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 160.733 | 164.294 | 158.442 | 164.294 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1442.773 | 1464.449 | 1439.881 | 1464.449 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.143 | 0.157 | 0.132 | 0.157 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.391 | 3.487 | 3.367 | 3.487 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.023 | 0.039 | 0.021 | 0.039 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.638 | 0.656 | 0.627 | 0.656 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.501 | 9.660 | 9.331 | 9.660 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.889 | 18.141 | 17.854 | 18.141 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 1.045 | 1.797 | 0.970 | 1.797 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.247 | 4.340 | 4.186 | 4.340 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 167.253 | 168.338 | 164.616 | 168.338 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1427.052 | 1452.766 | 1418.749 | 1452.766 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.135 | 0.112 | 0.135 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.194 | 2.281 | 2.191 | 2.281 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.019 | 0.028 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.429 | 0.451 | 0.426 | 0.451 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.576 | 6.717 | 6.536 | 6.717 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.857 | 14.738 | 13.614 | 14.738 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.892 | 0.996 | 0.883 | 0.996 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.872 | 2.913 | 2.855 | 2.913 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 166.446 | 168.950 | 156.729 | 168.950 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1456.697 | 1474.097 | 1421.751 | 1474.097 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.148 | 0.131 | 0.148 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.219 | 2.278 | 2.173 | 2.278 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.028 | 0.019 | 0.028 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.444 | 0.461 | 0.440 | 0.461 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.347 | 12.157 | 10.309 | 12.157 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.793 | 16.432 | 15.713 | 16.432 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.865 | 0.936 | 0.836 | 0.936 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.878 | 2.965 | 2.848 | 2.965 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.578 | 189.305 | 158.022 | 189.305 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1437.941 | 1464.083 | 1432.949 | 1464.083 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.247 | 0.912 | 0.176 | 0.912 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.821 | 7.435 | 3.757 | 7.435 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.031 | 0.018 | 0.031 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.677 | 1.474 | 0.669 | 1.474 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.706 | 28.874 | 28.279 | 28.874 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 43.049 | 43.635 | 42.912 | 43.635 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.866 | 0.950 | 0.840 | 0.950 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.180 | 5.320 | 5.083 | 5.320 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 169.320 | 171.166 | 164.955 | 171.166 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1429.410 | 1452.541 | 1422.951 | 1452.541 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.715 | 0.158 | 0.715 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.820 | 3.958 | 3.769 | 3.958 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.032 | 0.018 | 0.032 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.664 | 0.710 | 0.651 | 0.710 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 26.098 | 26.602 | 25.812 | 26.602 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 40.914 | 41.826 | 40.116 | 41.826 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.951 | 1.027 | 0.918 | 1.027 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.150 | 5.466 | 5.132 | 5.466 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 157.466 | 166.362 | 156.067 | 166.362 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1424.110 | 1458.730 | 1411.751 | 1458.730 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.130 | 0.149 | 0.119 | 0.149 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.261 | 2.835 | 2.224 | 2.835 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.022 | 0.026 | 0.020 | 0.026 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.422 | 0.446 | 0.418 | 0.446 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.799 | 9.203 | 8.758 | 9.203 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.362 | 17.553 | 16.096 | 17.553 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.851 | 1.022 | 0.842 | 1.022 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.865 | 2.942 | 2.854 | 2.942 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 159.727 | 165.947 | 159.515 | 165.947 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1442.333 | 1452.252 | 1420.476 | 1452.252 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.140 | 0.153 | 0.121 | 0.153 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.547 | 2.810 | 2.521 | 2.810 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.022 | 0.606 | 0.020 | 0.606 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.469 | 0.509 | 0.459 | 0.509 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 8.133 | 8.973 | 8.098 | 8.973 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 16.057 | 16.747 | 14.804 | 16.747 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.861 | 2.463 | 0.827 | 2.463 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.354 | 3.436 | 3.199 | 3.436 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 162.153 | 173.477 | 156.553 | 173.477 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1447.902 | 1507.283 | 1430.402 | 1507.283 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.130 | 0.135 | 0.129 | 0.135 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.506 | 2.615 | 2.481 | 2.615 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.021 | 0.338 | 0.019 | 0.338 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.471 | 0.532 | 0.466 | 0.532 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.998 | 10.620 | 9.903 | 10.620 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.756 | 18.265 | 17.560 | 18.265 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.751 | 3.110 | 0.711 | 3.110 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.408 | 3.478 | 3.321 | 3.478 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 155.639 | 169.749 | 154.607 | 169.749 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1424.804 | 1425.364 | 1416.719 | 1425.364 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.132 | 0.154 | 0.129 | 0.154 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.257 | 3.059 | 2.199 | 3.059 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.025 | 0.030 | 0.024 | 0.030 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.436 | 0.457 | 0.427 | 0.457 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.227 | 10.563 | 10.172 | 10.563 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 18.898 | 20.917 | 17.853 | 20.917 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.843 | 0.927 | 0.834 | 0.927 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.880 | 2.961 | 2.836 | 2.961 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 162.279 | 165.359 | 156.972 | 165.359 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1428.837 | 1432.087 | 1419.386 | 1432.087 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.137 | 0.182 | 0.115 | 0.182 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.230 | 2.242 | 2.192 | 2.242 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.024 | 0.034 | 0.020 | 0.034 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.439 | 0.452 | 0.437 | 0.452 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.216 | 8.307 | 7.757 | 8.307 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 15.303 | 18.213 | 15.071 | 18.213 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.974 | 1.158 | 0.918 | 1.158 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.876 | 2.936 | 2.856 | 2.936 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 166.535 | 192.500 | 163.076 | 192.500 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1441.916 | 1458.459 | 1432.313 | 1458.459 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.134 | 0.217 | 0.128 | 0.217 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.335 | 2.358 | 2.280 | 2.358 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.023 | 1.727 | 0.018 | 1.727 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.445 | 0.475 | 0.444 | 0.475 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.052 | 15.237 | 14.891 | 15.237 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.343 | 25.069 | 24.303 | 25.069 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.039 | 1.397 | 0.902 | 1.397 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.380 | 3.414 | 3.336 | 3.414 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 183.285 | 187.248 | 182.945 | 187.248 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1506.608 | 1515.402 | 1498.021 | 1515.402 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.331 | 161.558 | 153.239 | 161.558 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1483.983 | 1503.046 | 1469.427 | 1503.046 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.185 | 0.191 | 0.148 | 0.191 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.413 | 2.454 | 2.382 | 2.454 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.033 | 0.020 | 0.033 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.443 | 0.483 | 0.436 | 0.483 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.045 | 0.105 | 0.044 | 0.105 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.477 | 0.500 | 0.460 | 0.500 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.048 | 1.625 | 0.987 | 1.625 | 146.1 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 88.090 | 90.345 | 86.771 | 90.345 | 131.5 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 185.857 | 197.722 | 180.974 | 197.722 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1427.015 | 1439.630 | 1420.654 | 1439.630 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.307 | 170.017 | 154.268 | 170.017 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1423.497 | 1650.599 | 1406.552 | 1650.599 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.180 | 0.222 | 0.144 | 0.222 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.413 | 2.538 | 2.403 | 2.538 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.033 | 0.020 | 0.033 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.449 | 0.472 | 0.440 | 0.472 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.046 | 0.080 | 0.042 | 0.080 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.481 | 0.513 | 0.463 | 0.513 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.654 | 1.318 | 0.648 | 1.318 | 145.3 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.510 | 35.224 | 23.042 | 35.224 | 131.5 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 187.522 | 190.669 | 185.840 | 190.669 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1464.422 | 1564.939 | 1453.904 | 1564.939 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.337 | 171.812 | 153.990 | 171.812 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1437.043 | 1468.524 | 1426.189 | 1468.524 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.188 | 0.255 | 0.143 | 0.255 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.714 | 3.886 | 3.665 | 3.886 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.033 | 0.021 | 0.033 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.651 | 0.729 | 0.606 | 0.729 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.052 | 0.032 | 0.052 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.529 | 0.557 | 0.517 | 0.557 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.748 | 2.196 | 0.610 | 2.196 | 151.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 29.884 | 43.156 | 29.737 | 43.156 | 131.5 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 210.137 | 255.328 | 199.757 | 255.328 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1494.284 | 1529.185 | 1488.019 | 1529.185 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 171.206 | 189.550 | 167.452 | 189.550 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1440.153 | 1469.119 | 1433.557 | 1469.119 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.211 | 0.349 | 0.138 | 0.349 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.922 | 4.224 | 3.752 | 4.224 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.032 | 0.087 | 0.021 | 0.087 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.716 | 0.723 | 0.693 | 0.723 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.069 | 0.039 | 0.069 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.532 | 0.554 | 0.500 | 0.554 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.784 | 1.460 | 0.773 | 1.460 | 148.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.337 | 38.499 | 25.008 | 38.499 | 131.5 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 171.368 | 181.705 | 168.049 | 181.705 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1420.654 | 1437.310 | 1418.277 | 1437.310 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.171 | 158.197 | 153.975 | 158.197 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1429.801 | 1472.699 | 1415.531 | 1472.699 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.130 | 0.145 | 0.123 | 0.145 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.493 | 2.591 | 2.469 | 2.591 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.031 | 0.017 | 0.031 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.616 | 0.655 | 0.606 | 0.655 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.040 | 0.044 | 0.034 | 0.044 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.597 | 0.641 | 0.563 | 0.641 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.960 | 1.311 | 0.891 | 1.311 | 147.1 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.532 | 40.744 | 24.348 | 40.744 | 131.5 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 187.083 | 214.136 | 184.756 | 214.136 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1497.434 | 1529.044 | 1495.851 | 1529.044 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.770 | 158.049 | 153.700 | 158.049 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1460.433 | 1487.515 | 1454.323 | 1487.515 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.145 | 0.156 | 0.137 | 0.156 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.232 | 2.339 | 2.164 | 2.339 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.020 | 0.034 | 0.020 | 0.034 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.447 | 0.487 | 0.426 | 0.487 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.019 | 0.028 | 0.017 | 0.028 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.484 | 0.496 | 0.452 | 0.496 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.107 | 1.899 | 0.987 | 1.899 | 145.9 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 78.318 | 81.504 | 78.275 | 81.504 | 131.5 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 324.842 | 338.071 | 324.449 | 338.071 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1785.907 | 1825.447 | 1777.558 | 1825.447 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 183.640 | 188.576 | 183.453 | 188.576 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1687.052 | 1709.116 | 1674.227 | 1709.116 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.159 | 0.269 | 0.137 | 0.269 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.714 | 2.812 | 2.659 | 2.812 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.022 | 0.034 | 0.019 | 0.034 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.743 | 0.784 | 0.737 | 0.784 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.081 | 0.086 | 0.042 | 0.086 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.781 | 0.839 | 0.773 | 0.839 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.111 | 24.289 | 22.754 | 24.289 | 151.9 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 278.564 | 322.375 | 273.535 | 322.375 | 133.5 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 338.895 | 343.089 | 326.814 | 343.089 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1782.661 | 2046.979 | 1777.353 | 2046.979 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.982 | 209.800 | 181.227 | 209.800 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1699.749 | 1855.699 | 1681.240 | 1855.699 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.162 | 0.207 | 0.148 | 0.207 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.707 | 2.861 | 2.694 | 2.861 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.024 | 0.055 | 0.018 | 0.055 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.751 | 0.773 | 0.742 | 0.773 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.079 | 0.121 | 0.059 | 0.121 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.771 | 0.815 | 0.750 | 0.815 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 22.947 | 23.645 | 22.634 | 23.645 | 161.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 281.306 | 291.768 | 279.114 | 291.768 | 133.4 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 131.462 | 132.361 | 131.193 | 132.361 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 111.671 | 112.342 | 110.474 | 112.342 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 126.058 | 187.174 | 116.474 | 187.174 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 94.854 | 100.358 | 94.263 | 100.358 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `c8e0ac696ab935429e6c9466a88935b409a8da6f`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `anomalies-logistic-defaults-99`, `warm-start-logistic-defaults-7-new-rows`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-logistic-large-months-metrics`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:bd623c697976c1db3281c474b5cd04635ebdee459563e4916ddc70ca4d297651`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:1590afe8612860fb938dcb91de6e620a3bbfa84ef7e3752109fe9fdb6a7de4f1`

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
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

