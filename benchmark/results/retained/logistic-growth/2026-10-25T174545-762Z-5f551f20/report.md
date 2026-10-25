# Effect Prophet benchmark — 2026-10-25T174545-762Z-5f551f20

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
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3839 | 30576 |

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

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 70.325 | 71.005 | 69.893 | 71.005 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 293.201 | 307.380 | 292.137 | 307.380 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 53.029 | 54.688 | 52.020 | 54.688 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 44.794 | 46.248 | 44.138 | 46.248 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.299 | 14.830 | 14.224 | 14.830 | 156.2 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 249.710 | 260.177 | 246.841 | 260.177 | 131.0 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.026 | 0.016 | 0.026 | 142.9 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.501 | 0.516 | 0.485 | 0.516 | 131.0 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 200.183 | 209.261 | 199.336 | 209.261 | 164.7 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1479.443 | 1511.728 | 1475.250 | 1511.728 | 131.0 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 154.894 | 157.990 | 153.230 | 157.990 | 164.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1428.163 | 1439.869 | 1423.743 | 1439.869 | 131.0 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.340 | 0.343 | 0.314 | 0.343 | 164.8 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.083 | 4.207 | 3.999 | 4.207 | 131.0 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.027 | 0.045 | 0.018 | 0.045 | 164.7 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.731 | 0.765 | 0.720 | 0.765 | 131.0 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.699 | 31.471 | 30.290 | 31.471 | 164.5 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 56.312 | 58.476 | 56.005 | 58.476 | 131.0 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.841 | 31.159 | 30.460 | 31.159 | 164.3 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 55.123 | 55.600 | 54.414 | 55.600 | 131.0 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.228 | 31.755 | 30.876 | 31.755 | 155.2 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 50.432 | 51.194 | 49.923 | 51.194 | 131.0 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.194 | 0.224 | 0.171 | 0.224 | 157.6 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.913 | 5.067 | 4.813 | 5.067 | 131.0 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.018 | 0.015 | 0.018 | 141.5 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.497 | 0.513 | 0.482 | 0.513 | 131.0 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 214.518 | 225.460 | 208.822 | 225.460 | 161.2 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1487.426 | 1504.271 | 1481.008 | 1504.271 | 131.0 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 155.346 | 164.774 | 153.182 | 164.774 | 161.5 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1426.366 | 1442.598 | 1424.622 | 1442.598 | 131.0 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.358 | 0.459 | 0.311 | 0.459 | 161.5 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.095 | 4.224 | 4.020 | 4.224 | 131.0 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.028 | 0.041 | 0.018 | 0.041 | 161.2 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.703 | 0.719 | 0.695 | 0.719 | 131.0 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 42.913 | 43.157 | 42.834 | 43.157 | 161.1 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 63.631 | 65.550 | 62.937 | 65.550 | 131.0 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.113 | 44.393 | 42.990 | 44.393 | 160.9 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 63.352 | 64.585 | 63.044 | 64.585 | 131.0 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.497 | 45.736 | 43.248 | 45.736 | 151.9 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 58.498 | 58.901 | 57.488 | 58.901 | 131.0 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.216 | 0.236 | 0.174 | 0.236 | 154.4 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.203 | 6.624 | 4.983 | 6.624 | 131.0 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.026 | 0.015 | 0.026 | 141.9 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.507 | 0.547 | 0.494 | 0.547 | 148.2 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 202.405 | 206.824 | 200.297 | 206.824 | 155.2 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1665.078 | 1683.508 | 1653.655 | 1683.508 | 148.2 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 156.441 | 157.423 | 156.213 | 157.423 | 156.4 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1597.502 | 1610.322 | 1594.629 | 1610.322 | 148.2 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 1.032 | 1.264 | 0.973 | 1.264 | 155.7 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.125 | 4.210 | 4.040 | 4.210 | 148.2 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.104 | 0.112 | 0.099 | 0.112 | 155.2 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.734 | 0.786 | 0.692 | 0.786 | 148.2 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.589 | 42.694 | 30.982 | 42.694 | 154.9 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 60.029 | 60.948 | 58.921 | 60.948 | 148.2 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 32.305 | 49.480 | 31.154 | 49.480 | 153.0 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 59.842 | 60.715 | 59.354 | 60.715 | 148.2 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 33.390 | 49.474 | 31.610 | 49.474 | 152.5 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 53.485 | 54.471 | 53.229 | 54.471 | 148.2 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.239 | 0.323 | 0.228 | 0.323 | 152.7 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.701 | 5.940 | 5.631 | 5.940 | 148.2 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.027 | 0.014 | 0.027 | 141.9 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.498 | 0.525 | 0.489 | 0.525 | 148.2 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 214.321 | 226.349 | 212.802 | 226.349 | 153.5 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1660.968 | 1678.923 | 1652.589 | 1678.923 | 148.2 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 156.494 | 159.928 | 155.646 | 159.928 | 154.1 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1595.184 | 1606.456 | 1591.919 | 1606.456 | 148.2 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.919 | 0.943 | 0.912 | 0.943 | 154.1 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.058 | 4.186 | 3.998 | 4.186 | 148.2 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.101 | 0.108 | 0.091 | 0.108 | 153.5 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.695 | 0.722 | 0.664 | 0.722 | 148.2 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.536 | 45.449 | 43.473 | 45.449 | 153.5 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 67.741 | 69.228 | 66.852 | 69.228 | 148.2 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.805 | 44.919 | 43.739 | 44.919 | 152.0 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 66.730 | 67.853 | 66.162 | 67.853 | 148.2 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 45.145 | 47.741 | 44.834 | 47.741 | 151.6 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 61.381 | 62.744 | 60.787 | 62.744 | 148.2 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.311 | 0.562 | 0.216 | 0.562 | 151.7 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.821 | 5.998 | 5.734 | 5.998 | 148.2 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.586 | 19.268 | 18.169 | 19.268 | 151.8 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 63.048 | 64.007 | 62.202 | 64.007 | 131.0 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 16.475 | 17.015 | 15.909 | 17.015 | 163.0 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 57.601 | 60.500 | 57.245 | 60.500 | 131.0 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 186.754 | 189.393 | 183.585 | 189.393 | 161.4 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1420.993 | 1454.458 | 1416.013 | 1454.458 | 131.0 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.161 | 2.323 | 2.135 | 2.323 | 161.3 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.291 | 1.312 | 1.271 | 1.312 | 131.0 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.049 | 0.056 | 0.047 | 0.056 | 128.5 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.500 | 0.512 | 0.498 | 0.512 | 131.0 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.049 | 0.090 | 0.047 | 0.090 | 160.8 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.226 | 5.330 | 5.217 | 5.330 | 131.0 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.774 | 2.399 | 1.763 | 2.399 | 134.6 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.729 | 0.774 | 0.723 | 0.774 | 131.0 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.141 | 17.244 | 12.973 | 17.244 | 160.5 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 40.688 | 42.040 | 40.319 | 42.040 | 131.0 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 185.983 | 187.975 | 184.199 | 187.975 | 152.8 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1433.971 | 1434.857 | 1432.643 | 1434.857 | 131.0 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.539 | 1.577 | 1.520 | 1.577 | 152.8 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.778 | 0.831 | 0.770 | 0.831 | 131.0 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.016 | 0.029 | 0.014 | 0.029 | 126.3 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.391 | 0.448 | 0.362 | 0.448 | 131.0 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.052 | 0.082 | 0.050 | 0.082 | 152.8 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.243 | 5.436 | 5.196 | 5.436 | 131.0 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.957 | 1.076 | 0.954 | 1.076 | 130.7 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.534 | 0.606 | 0.514 | 0.606 | 131.0 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 16.854 | 18.939 | 16.529 | 18.939 | 152.8 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 58.313 | 59.386 | 58.309 | 59.386 | 131.0 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.277 | 17.575 | 17.120 | 17.575 | 158.2 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 29.652 | 30.877 | 29.116 | 30.877 | 131.0 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.147 | 0.166 | 0.134 | 0.166 | 158.9 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.012 | 0.004 | 0.012 | 131.0 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.231 | 0.286 | 0.213 | 0.286 | 158.5 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.007 | 0.011 | 131.0 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 37.014 | 37.330 | 36.465 | 37.330 | 157.8 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 112.327 | 114.040 | 111.661 | 114.040 | 131.0 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.048 | 0.037 | 0.048 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.544 | 0.585 | 0.534 | 0.585 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 188.005 | 190.663 | 186.208 | 190.663 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1454.535 | 1456.802 | 1452.928 | 1456.802 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.032 | 155.354 | 153.582 | 155.354 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1423.970 | 1425.884 | 1422.141 | 1425.884 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.086 | 0.103 | 0.078 | 0.103 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.496 | 2.525 | 2.493 | 2.525 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.044 | 0.028 | 0.044 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.481 | 0.512 | 0.477 | 0.512 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.800 | 20.869 | 20.698 | 20.869 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.797 | 39.260 | 36.335 | 39.260 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.592 | 22.416 | 21.323 | 22.416 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 36.833 | 37.768 | 36.238 | 37.768 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 20.915 | 21.223 | 20.776 | 21.223 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.731 | 33.337 | 32.129 | 33.337 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.363 | 0.373 | 0.359 | 0.373 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.686 | 3.772 | 3.611 | 3.772 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.057 | 0.040 | 0.057 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.500 | 0.514 | 0.485 | 0.514 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 185.599 | 189.607 | 184.705 | 189.607 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1447.282 | 1453.695 | 1447.081 | 1453.695 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.082 | 161.935 | 153.579 | 161.935 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1428.482 | 1447.034 | 1424.782 | 1447.034 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.107 | 0.130 | 0.091 | 0.130 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.568 | 2.713 | 2.514 | 2.713 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.045 | 0.027 | 0.045 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.471 | 0.521 | 0.466 | 0.521 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.338 | 17.718 | 17.220 | 17.718 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 31.333 | 32.917 | 31.317 | 32.917 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 18.535 | 20.170 | 17.834 | 20.170 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.489 | 30.577 | 30.220 | 30.577 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.495 | 17.718 | 17.271 | 17.718 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.718 | 27.386 | 26.636 | 27.386 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.382 | 0.647 | 0.350 | 0.647 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.621 | 3.716 | 3.570 | 3.716 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.500 | 0.505 | 0.482 | 0.505 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 184.116 | 187.311 | 183.141 | 187.311 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1452.580 | 1458.611 | 1449.818 | 1458.611 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.374 | 156.121 | 152.175 | 156.121 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1424.781 | 1466.363 | 1422.174 | 1466.363 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.086 | 0.093 | 0.077 | 0.093 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.314 | 2.358 | 2.308 | 2.358 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.043 | 0.026 | 0.043 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.434 | 0.455 | 0.424 | 0.455 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.613 | 20.240 | 18.594 | 20.240 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.858 | 33.393 | 32.770 | 33.393 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.025 | 19.143 | 18.898 | 19.143 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.969 | 33.289 | 32.576 | 33.289 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 18.647 | 20.807 | 18.617 | 20.807 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 29.104 | 29.405 | 28.908 | 29.405 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.230 | 0.232 | 0.229 | 0.232 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.187 | 3.284 | 3.170 | 3.284 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.489 | 0.546 | 0.488 | 0.546 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 184.723 | 188.775 | 183.642 | 188.775 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1453.581 | 1461.631 | 1451.407 | 1461.631 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 152.680 | 154.560 | 152.388 | 154.560 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1423.845 | 1437.163 | 1422.817 | 1437.163 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.112 | 0.218 | 0.092 | 0.218 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.333 | 2.557 | 2.325 | 2.557 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.028 | 0.048 | 0.026 | 0.048 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.434 | 0.442 | 0.424 | 0.442 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.602 | 20.309 | 18.491 | 20.309 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.208 | 33.412 | 32.808 | 33.412 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.135 | 19.312 | 19.129 | 19.312 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.900 | 33.374 | 32.664 | 33.374 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 18.890 | 20.704 | 18.591 | 20.704 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 29.001 | 29.426 | 28.960 | 29.426 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.232 | 0.334 | 0.222 | 0.334 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.247 | 3.289 | 3.221 | 3.289 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.055 | 0.068 | 0.051 | 0.068 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.604 | 0.623 | 0.601 | 0.623 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 174.282 | 186.041 | 171.713 | 186.041 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1429.895 | 1448.643 | 1429.255 | 1448.643 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 157.395 | 159.728 | 156.742 | 159.728 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1417.876 | 1433.286 | 1417.143 | 1433.286 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.088 | 0.105 | 0.084 | 0.105 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.576 | 2.684 | 2.564 | 2.684 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.034 | 0.024 | 0.034 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.639 | 0.666 | 0.623 | 0.666 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.206 | 4.362 | 3.995 | 4.362 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.757 | 14.026 | 13.702 | 14.026 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.295 | 4.433 | 4.279 | 4.433 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 13.188 | 13.302 | 13.044 | 13.302 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.816 | 5.050 | 4.762 | 5.050 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 10.008 | 10.370 | 9.777 | 10.370 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.382 | 0.403 | 0.359 | 0.403 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.257 | 3.319 | 3.218 | 3.319 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.031 | 0.020 | 0.031 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.468 | 0.497 | 0.460 | 0.497 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 187.143 | 199.887 | 181.262 | 199.887 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1460.968 | 1489.927 | 1450.967 | 1489.927 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.649 | 156.409 | 152.059 | 156.409 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1432.959 | 1502.240 | 1429.739 | 1502.240 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.079 | 0.091 | 0.078 | 0.091 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.290 | 2.363 | 2.255 | 2.363 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.059 | 0.027 | 0.059 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.427 | 0.453 | 0.409 | 0.453 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.385 | 22.395 | 20.360 | 22.395 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.082 | 36.715 | 35.701 | 36.715 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.738 | 21.218 | 20.688 | 21.218 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 35.288 | 35.788 | 34.922 | 35.788 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.483 | 23.431 | 20.290 | 23.431 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 32.144 | 32.269 | 31.791 | 32.269 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.231 | 0.339 | 0.228 | 0.339 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.216 | 3.317 | 3.125 | 3.317 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 172.409 | 183.245 | 170.236 | 183.245 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1381.208 | 1388.068 | 1380.878 | 1388.068 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.208 | 0.274 | 0.173 | 0.274 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.172 | 2.242 | 2.154 | 2.242 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.022 | 0.029 | 0.021 | 0.029 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.439 | 0.466 | 0.426 | 0.466 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.729 | 4.810 | 1.443 | 4.810 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.914 | 6.929 | 5.580 | 6.929 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 1.096 | 1.708 | 1.008 | 1.708 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.859 | 3.066 | 2.789 | 3.066 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 173.738 | 181.352 | 170.850 | 181.352 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1383.591 | 1411.473 | 1382.901 | 1411.473 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.119 | 0.123 | 0.114 | 0.123 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.424 | 2.533 | 2.409 | 2.533 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.027 | 0.086 | 0.018 | 0.086 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.616 | 0.627 | 0.612 | 0.627 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 3.380 | 4.171 | 3.221 | 4.171 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 6.895 | 7.465 | 6.803 | 7.465 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.122 | 1.194 | 1.085 | 1.194 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.919 | 2.979 | 2.906 | 2.979 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.403 | 160.072 | 154.646 | 160.072 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1382.896 | 1386.901 | 1379.561 | 1386.901 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.152 | 0.183 | 0.147 | 0.183 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.135 | 2.215 | 2.115 | 2.215 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.037 | 0.021 | 0.037 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.424 | 0.435 | 0.423 | 0.435 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 19.044 | 20.482 | 18.752 | 20.482 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 26.497 | 26.705 | 26.249 | 26.705 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.873 | 0.899 | 0.867 | 0.899 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.774 | 2.952 | 2.742 | 2.952 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.904 | 158.740 | 155.392 | 158.740 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1383.344 | 1388.719 | 1382.885 | 1388.719 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.145 | 0.161 | 0.142 | 0.161 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.111 | 2.136 | 2.094 | 2.136 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.030 | 0.025 | 0.030 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.409 | 0.439 | 0.408 | 0.439 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.380 | 10.862 | 8.884 | 10.862 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 16.635 | 17.005 | 16.576 | 17.005 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.861 | 0.898 | 0.677 | 0.898 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.764 | 2.825 | 2.714 | 2.825 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.414 | 158.270 | 153.209 | 158.270 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1384.633 | 1395.893 | 1383.457 | 1395.893 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.158 | 0.206 | 0.143 | 0.206 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.027 | 2.048 | 1.990 | 2.048 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.038 | 0.020 | 0.038 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.408 | 0.429 | 0.405 | 0.429 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.728 | 10.607 | 6.487 | 10.607 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.590 | 12.989 | 12.365 | 12.989 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.851 | 0.950 | 0.803 | 0.950 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.812 | 2.888 | 2.782 | 2.888 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.284 | 161.935 | 154.725 | 161.935 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1387.401 | 1394.520 | 1378.439 | 1394.520 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.153 | 0.180 | 0.138 | 0.180 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 1.995 | 2.027 | 1.970 | 2.027 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.030 | 0.020 | 0.030 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.417 | 0.457 | 0.408 | 0.457 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.715 | 10.283 | 7.991 | 10.283 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.077 | 15.465 | 15.047 | 15.465 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.863 | 0.929 | 0.857 | 0.929 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.768 | 2.928 | 2.723 | 2.928 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.460 | 157.681 | 154.597 | 157.681 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1380.763 | 1386.812 | 1380.124 | 1386.812 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.144 | 0.161 | 0.139 | 0.161 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.151 | 2.179 | 2.116 | 2.179 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.021 | 0.028 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.422 | 0.440 | 0.407 | 0.440 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.993 | 9.608 | 7.516 | 9.608 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 14.474 | 15.248 | 14.171 | 15.248 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.846 | 0.903 | 0.835 | 0.903 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.748 | 2.789 | 2.742 | 2.789 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.316 | 159.179 | 155.676 | 159.179 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1383.163 | 1397.307 | 1382.260 | 1397.307 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.162 | 0.131 | 0.162 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.090 | 2.298 | 2.077 | 2.298 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.022 | 0.032 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.423 | 0.432 | 0.413 | 0.432 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 17.118 | 17.671 | 16.922 | 17.671 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 23.642 | 25.560 | 23.261 | 25.560 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.875 | 0.903 | 0.856 | 0.903 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.770 | 2.986 | 2.763 | 2.986 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 201.986 | 619.922 | 182.179 | 619.922 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1379.080 | 1429.361 | 1378.750 | 1429.361 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.184 | 0.235 | 0.166 | 0.235 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.117 | 2.150 | 2.110 | 2.150 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.029 | 0.041 | 0.020 | 0.041 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.416 | 0.448 | 0.403 | 0.448 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.653 | 19.593 | 16.516 | 19.593 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.260 | 24.567 | 24.034 | 24.567 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.912 | 1.286 | 0.841 | 1.286 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.743 | 2.814 | 2.700 | 2.814 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 161.558 | 181.041 | 160.737 | 181.041 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1391.444 | 1400.047 | 1391.270 | 1400.047 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.131 | 0.154 | 0.125 | 0.154 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.391 | 2.481 | 2.382 | 2.481 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.020 | 0.020 | 0.019 | 0.020 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.446 | 0.460 | 0.433 | 0.460 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.412 | 16.482 | 16.234 | 16.482 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 26.321 | 26.663 | 26.139 | 26.663 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.112 | 1.204 | 1.111 | 1.204 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.401 | 3.461 | 3.399 | 3.461 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 160.023 | 161.135 | 157.656 | 161.135 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1410.351 | 1423.031 | 1404.613 | 1423.031 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.200 | 0.365 | 0.187 | 0.365 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.158 | 2.194 | 2.150 | 2.194 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.031 | 0.061 | 0.022 | 0.061 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.413 | 0.419 | 0.407 | 0.419 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.552 | 18.952 | 16.476 | 18.952 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 24.791 | 25.887 | 24.734 | 25.887 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.979 | 1.087 | 0.921 | 1.087 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.844 | 2.921 | 2.829 | 2.921 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 158.009 | 164.734 | 156.974 | 164.734 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1403.180 | 1416.850 | 1402.807 | 1416.850 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.161 | 0.286 | 0.143 | 0.286 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.151 | 2.197 | 2.140 | 2.197 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.020 | 0.029 | 0.019 | 0.029 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.411 | 0.455 | 0.399 | 0.455 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.197 | 8.191 | 6.157 | 8.191 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 12.931 | 13.672 | 12.797 | 13.672 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.856 | 0.883 | 0.848 | 0.883 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.816 | 2.855 | 2.808 | 2.855 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 169.137 | 171.319 | 167.714 | 171.319 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1393.916 | 1417.136 | 1392.480 | 1417.136 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.142 | 0.191 | 0.133 | 0.191 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.545 | 2.611 | 2.543 | 2.611 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.600 | 0.624 | 0.589 | 0.624 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.835 | 49.407 | 38.816 | 49.407 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 38.613 | 43.622 | 38.220 | 43.622 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.247 | 1.421 | 1.161 | 1.421 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.346 | 3.505 | 3.307 | 3.505 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 168.440 | 180.404 | 167.902 | 180.404 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1384.926 | 1441.318 | 1383.026 | 1441.318 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.216 | 0.420 | 0.204 | 0.420 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.242 | 2.244 | 2.214 | 2.244 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.029 | 0.050 | 0.023 | 0.050 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.434 | 0.476 | 0.431 | 0.476 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 103.813 | 128.270 | 102.784 | 128.270 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 119.468 | 121.739 | 118.656 | 121.739 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.103 | 1.190 | 1.069 | 1.190 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.357 | 3.457 | 3.317 | 3.457 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 164.243 | 165.908 | 161.464 | 165.908 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1395.401 | 1409.460 | 1395.115 | 1409.460 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.198 | 0.412 | 0.143 | 0.412 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.643 | 2.780 | 2.636 | 2.780 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.020 | 0.036 | 0.020 | 0.036 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.705 | 0.751 | 0.703 | 0.751 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 132.617 | 159.273 | 131.859 | 159.273 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 111.368 | 111.842 | 111.013 | 111.842 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.614 | 2.123 | 1.589 | 2.123 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.433 | 3.675 | 3.415 | 3.675 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 158.768 | 163.059 | 157.629 | 163.059 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1405.647 | 1418.940 | 1403.845 | 1418.940 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.158 | 0.175 | 0.138 | 0.175 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.170 | 2.497 | 2.148 | 2.497 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.028 | 0.037 | 0.019 | 0.037 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.443 | 0.457 | 0.428 | 0.457 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.844 | 9.087 | 6.232 | 9.087 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 14.269 | 18.329 | 13.486 | 18.329 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.869 | 0.949 | 0.764 | 0.949 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.211 | 3.451 | 3.086 | 3.451 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.052 | 159.982 | 156.491 | 159.982 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1383.618 | 1397.254 | 1382.961 | 1397.254 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.151 | 0.172 | 0.135 | 0.172 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.033 | 2.088 | 2.006 | 2.088 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.031 | 0.022 | 0.031 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.423 | 0.450 | 0.418 | 0.450 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 116.437 | 117.719 | 116.362 | 117.719 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 124.338 | 126.361 | 124.282 | 126.361 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.913 | 0.998 | 0.905 | 0.998 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.848 | 2.857 | 2.810 | 2.857 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.854 | 160.792 | 153.859 | 160.792 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1385.709 | 1435.040 | 1385.679 | 1435.040 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.155 | 0.174 | 0.135 | 0.174 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.089 | 2.093 | 2.074 | 2.093 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.026 | 0.019 | 0.026 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.419 | 0.442 | 0.413 | 0.442 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 14.647 | 17.356 | 14.612 | 17.356 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 19.879 | 20.247 | 19.857 | 20.247 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.844 | 0.877 | 0.833 | 0.877 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.862 | 2.893 | 2.851 | 2.893 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 158.752 | 163.827 | 157.769 | 163.827 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1401.929 | 1415.536 | 1395.087 | 1415.536 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.160 | 0.216 | 0.151 | 0.216 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.329 | 3.417 | 3.276 | 3.417 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.027 | 0.072 | 0.021 | 0.072 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.592 | 0.615 | 0.576 | 0.615 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.561 | 12.590 | 9.430 | 12.590 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.519 | 17.786 | 17.301 | 17.786 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.992 | 2.378 | 0.984 | 2.378 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.158 | 4.225 | 4.090 | 4.225 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.416 | 170.826 | 159.484 | 170.826 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1398.412 | 1424.044 | 1395.991 | 1424.044 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.159 | 0.139 | 0.159 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.174 | 2.232 | 2.147 | 2.232 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.020 | 0.028 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.441 | 0.463 | 0.434 | 0.463 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.216 | 10.739 | 6.203 | 10.739 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.442 | 15.598 | 13.409 | 15.598 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.910 | 0.930 | 0.876 | 0.930 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.805 | 2.951 | 2.758 | 2.951 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 166.452 | 190.420 | 166.347 | 190.420 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1397.577 | 1418.076 | 1396.255 | 1418.076 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.161 | 0.134 | 0.161 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.184 | 2.237 | 2.156 | 2.237 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.035 | 0.022 | 0.035 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.419 | 0.433 | 0.407 | 0.433 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.580 | 12.785 | 9.738 | 12.785 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.676 | 16.267 | 15.529 | 16.267 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.953 | 1.142 | 0.927 | 1.142 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.845 | 2.862 | 2.812 | 2.862 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.012 | 168.088 | 162.920 | 168.088 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1400.772 | 1405.233 | 1398.508 | 1405.233 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.175 | 0.183 | 0.174 | 0.183 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.671 | 3.762 | 3.631 | 3.762 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.020 | 0.024 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.676 | 0.745 | 0.648 | 0.745 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 27.931 | 27.978 | 27.921 | 27.978 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 42.578 | 43.073 | 42.025 | 43.073 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.902 | 1.076 | 0.897 | 1.076 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 4.983 | 5.231 | 4.970 | 5.231 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.280 | 168.125 | 163.141 | 168.125 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1398.359 | 1408.095 | 1396.950 | 1408.095 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.179 | 0.183 | 0.169 | 0.183 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.746 | 3.783 | 3.682 | 3.783 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.027 | 0.021 | 0.027 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.675 | 0.706 | 0.636 | 0.706 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 25.848 | 25.930 | 25.748 | 25.930 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 40.058 | 40.115 | 39.494 | 40.115 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.930 | 0.999 | 0.901 | 0.999 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.080 | 5.288 | 5.030 | 5.288 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 156.692 | 159.668 | 156.692 | 159.668 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1406.005 | 1409.500 | 1405.059 | 1409.500 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.150 | 0.184 | 0.150 | 0.184 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.184 | 2.235 | 2.179 | 2.235 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.032 | 0.036 | 0.028 | 0.036 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.414 | 0.440 | 0.400 | 0.440 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 9.367 | 10.456 | 9.196 | 10.456 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.023 | 16.622 | 15.624 | 16.622 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.875 | 0.905 | 0.870 | 0.905 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.855 | 2.931 | 2.830 | 2.931 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 162.749 | 166.623 | 161.963 | 166.623 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1400.495 | 1410.937 | 1395.612 | 1410.937 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.124 | 0.133 | 0.121 | 0.133 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.415 | 2.454 | 2.377 | 2.454 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.023 | 0.030 | 0.021 | 0.030 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.454 | 0.480 | 0.444 | 0.480 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.985 | 8.210 | 7.976 | 8.210 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 14.828 | 17.958 | 14.609 | 17.958 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.130 | 1.249 | 1.064 | 1.249 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.233 | 3.377 | 3.221 | 3.377 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 160.149 | 172.447 | 159.992 | 172.447 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1401.312 | 1432.067 | 1399.537 | 1432.067 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.133 | 0.215 | 0.131 | 0.215 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.382 | 2.519 | 2.341 | 2.519 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.023 | 0.025 | 0.021 | 0.025 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.450 | 0.471 | 0.440 | 0.471 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.942 | 11.265 | 9.921 | 11.265 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.434 | 20.110 | 17.045 | 20.110 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.209 | 2.219 | 1.198 | 2.219 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.229 | 3.309 | 3.211 | 3.309 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 158.575 | 170.705 | 158.145 | 170.705 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1402.041 | 1686.084 | 1399.845 | 1686.084 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.150 | 0.171 | 0.141 | 0.171 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.245 | 3.375 | 2.229 | 3.375 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.021 | 0.032 | 0.020 | 0.032 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.426 | 0.462 | 0.424 | 0.462 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.969 | 12.039 | 10.755 | 12.039 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.869 | 18.023 | 17.649 | 18.023 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.881 | 0.991 | 0.843 | 0.991 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.889 | 2.931 | 2.823 | 2.931 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 160.501 | 164.669 | 160.142 | 164.669 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1395.412 | 1398.907 | 1388.663 | 1398.907 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.139 | 0.170 | 0.130 | 0.170 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.242 | 2.261 | 2.195 | 2.261 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.028 | 0.032 | 0.026 | 0.032 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.423 | 0.478 | 0.416 | 0.478 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.101 | 9.405 | 7.936 | 9.405 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.772 | 14.879 | 14.622 | 14.879 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.831 | 0.885 | 0.772 | 0.885 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.909 | 2.971 | 2.890 | 2.971 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 160.645 | 173.068 | 157.865 | 173.068 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1399.401 | 1401.412 | 1398.229 | 1401.412 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.150 | 0.171 | 0.135 | 0.171 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.206 | 2.235 | 2.205 | 2.235 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.022 | 0.026 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.417 | 0.487 | 0.413 | 0.487 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 14.667 | 17.565 | 14.590 | 17.565 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.017 | 24.588 | 23.688 | 24.588 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.997 | 1.161 | 0.966 | 1.161 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.252 | 3.313 | 3.230 | 3.313 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 186.698 | 189.916 | 185.892 | 189.916 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1535.021 | 1545.117 | 1525.464 | 1545.117 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.534 | 159.602 | 154.989 | 159.602 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1492.152 | 1506.965 | 1484.963 | 1506.965 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.170 | 0.197 | 0.160 | 0.197 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.446 | 2.529 | 2.408 | 2.529 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.026 | 0.031 | 0.022 | 0.031 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.458 | 0.469 | 0.440 | 0.469 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.061 | 0.042 | 0.061 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.491 | 0.541 | 0.477 | 0.541 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.920 | 1.430 | 0.879 | 1.430 | 146.5 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 89.399 | 102.467 | 88.291 | 102.467 | 131.0 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 188.146 | 189.416 | 183.987 | 189.416 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1450.462 | 1454.624 | 1443.532 | 1454.624 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.211 | 168.905 | 154.587 | 168.905 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1429.060 | 1453.289 | 1425.646 | 1453.289 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.178 | 0.205 | 0.146 | 0.205 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.461 | 2.548 | 2.383 | 2.548 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.026 | 0.032 | 0.021 | 0.032 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.458 | 0.562 | 0.448 | 0.562 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.052 | 0.069 | 0.041 | 0.069 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.499 | 0.508 | 0.475 | 0.508 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.544 | 0.743 | 0.501 | 0.743 | 151.3 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 24.179 | 37.265 | 23.922 | 37.265 | 131.0 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 188.957 | 192.700 | 186.302 | 192.700 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1460.940 | 1498.954 | 1458.977 | 1498.954 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.006 | 162.506 | 153.287 | 162.506 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1435.971 | 1463.976 | 1433.613 | 1463.976 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.221 | 0.246 | 0.183 | 0.246 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.693 | 3.803 | 3.628 | 3.803 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.027 | 0.030 | 0.025 | 0.030 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.666 | 0.673 | 0.633 | 0.673 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.061 | 0.107 | 0.047 | 0.107 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.508 | 0.518 | 0.505 | 0.518 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.664 | 1.218 | 0.623 | 1.218 | 149.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 29.626 | 43.250 | 29.503 | 43.250 | 131.0 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 192.025 | 196.127 | 189.891 | 196.127 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1438.162 | 1514.949 | 1434.199 | 1514.949 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.229 | 159.885 | 156.665 | 159.885 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1416.520 | 1430.421 | 1403.450 | 1430.421 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.216 | 0.247 | 0.177 | 0.247 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.736 | 3.853 | 3.656 | 3.853 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.031 | 0.040 | 0.025 | 0.040 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.663 | 0.679 | 0.648 | 0.679 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.071 | 0.079 | 0.052 | 0.079 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.543 | 0.562 | 0.496 | 0.562 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.710 | 1.478 | 0.613 | 1.478 | 152.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 28.102 | 41.550 | 25.208 | 41.550 | 131.0 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 173.585 | 176.563 | 171.004 | 176.563 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1446.045 | 1493.740 | 1434.881 | 1493.740 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.048 | 169.491 | 156.028 | 169.491 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1434.083 | 1459.600 | 1426.381 | 1459.600 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.138 | 0.176 | 0.131 | 0.176 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.530 | 2.616 | 2.495 | 2.616 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.040 | 0.019 | 0.040 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.620 | 0.641 | 0.601 | 0.641 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.060 | 0.070 | 0.036 | 0.070 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.601 | 0.676 | 0.570 | 0.676 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.994 | 1.121 | 0.919 | 1.121 | 148.3 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 28.446 | 47.971 | 25.103 | 47.971 | 131.0 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 190.417 | 194.767 | 186.502 | 194.767 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1513.656 | 1534.502 | 1507.202 | 1534.502 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.295 | 168.166 | 154.278 | 168.166 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1482.400 | 1484.052 | 1478.990 | 1484.052 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.151 | 0.207 | 0.139 | 0.207 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.239 | 2.277 | 2.194 | 2.277 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.023 | 0.029 | 0.018 | 0.029 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.426 | 0.454 | 0.412 | 0.454 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.024 | 0.040 | 0.020 | 0.040 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.488 | 0.513 | 0.474 | 0.513 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.369 | 2.759 | 0.890 | 2.759 | 144.3 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 79.430 | 80.962 | 79.270 | 80.962 | 131.0 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 330.213 | 333.867 | 326.798 | 333.867 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1824.964 | 1832.092 | 1814.727 | 1832.092 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 183.921 | 195.804 | 182.273 | 195.804 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1703.686 | 1720.626 | 1694.086 | 1720.626 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.172 | 0.210 | 0.138 | 0.210 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.735 | 2.824 | 2.678 | 2.824 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.021 | 0.022 | 0.018 | 0.022 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.746 | 0.773 | 0.733 | 0.773 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.078 | 0.110 | 0.047 | 0.110 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.804 | 0.821 | 0.790 | 0.821 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.125 | 23.462 | 22.888 | 23.462 | 157.9 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 284.470 | 296.825 | 279.285 | 296.825 | 133.5 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 331.815 | 338.181 | 326.617 | 338.181 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1832.211 | 1839.440 | 1828.611 | 1839.440 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.287 | 186.422 | 183.436 | 186.422 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1728.877 | 1753.017 | 1708.447 | 1753.017 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.168 | 0.190 | 0.153 | 0.190 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.712 | 2.811 | 2.666 | 2.811 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.020 | 0.024 | 0.018 | 0.024 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.782 | 0.834 | 0.762 | 0.834 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.080 | 0.110 | 0.049 | 0.110 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.809 | 1.254 | 0.774 | 1.254 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.103 | 23.714 | 22.805 | 23.714 | 160.9 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 286.064 | 303.496 | 283.658 | 303.496 | 133.5 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 132.075 | 133.944 | 131.344 | 133.944 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 110.492 | 113.381 | 109.967 | 113.381 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 116.595 | 117.878 | 115.963 | 117.878 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 94.133 | 95.847 | 93.016 | 95.847 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `5f551f20f5e46dd5d8d0dbe73cbc477bd1c1d725`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `anomalies-logistic-defaults-99`, `warm-start-logistic-defaults-7-new-rows`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:39c4ab144a7147d1a81c22e55137c3ac28c9660c59959796c7c7aca75854b6a2`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:93483eec0afdfe504929a154683fc5d671aec1c501107d5c6a76d99557be5970`

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

