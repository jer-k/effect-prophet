# Effect Prophet benchmark — 2026-10-25T170328-932Z-5f551f20

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence fixed-linear-equation-v1. |
| map-explicit-break-small | equivalent-objective | passed | 1.018e-11 | 0.000e+0 | 0.000e+0 | 1.018e-11 | 4.041e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 6.301e-5 | 1.686e-5 | 1.686e-5 | 6.877e-5 | 1.344e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-explicit-small | equivalent-objective | passed | 7.887e-13 | 1.212e-12 | 1.281e-12 | 1.020e-12 | 1.101e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-automatic-large | equivalent-objective | passed | 6.238e-3 | 1.135e-2 | 1.318e-2 | 1.804e-2 | 4.515e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-events-small | equivalent-objective | passed | 7.304e-12 | 2.315e-12 | 2.315e-12 | 7.304e-12 | 5.540e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-regressors-medium | equivalent-objective | passed | 4.291e-3 | 1.333e-4 | 2.226e-4 | 4.248e-3 | 3.923e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| map-conditional-seasonalities-medium | equivalent-objective | passed | 2.682e-3 | 7.941e-4 | 7.454e-4 | 2.722e-3 | 2.397e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| country-us-linear-additive | equivalent-objective | passed | 6.775e-12 | 1.065e-12 | 1.065e-12 | 6.835e-12 | 1.652e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-linear-additive | equivalent-objective | passed | 6.775e-12 | 1.065e-12 | 1.065e-12 | 6.835e-12 | 1.652e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-us-linear-multiplicative | equivalent-objective | passed | 4.270e-12 | 1.024e-12 | 0.000e+0 | 6.022e-12 | 2.594e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-linear-multiplicative | equivalent-objective | passed | 4.270e-12 | 1.024e-12 | 0.000e+0 | 6.022e-12 | 2.594e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-boundary-linear | equivalent-objective | passed | 1.866e-9 | 3.610e-12 | 3.610e-12 | 1.862e-9 | 6.639e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-small | equivalent-objective | passed | 2.104e-8 | 3.465e-8 | 3.465e-8 | 4.443e-8 | 3.800e-9 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-medium | equivalent-objective | passed | 1.776e-3 | 2.078e-5 | 2.078e-5 | 1.783e-3 | 3.358e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-irregular | equivalent-objective | passed | 7.782e-2 | 6.977e-3 | 6.977e-3 | 7.881e-2 | 9.079e-3 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in objective. |
| map-training-ordered-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-ordered-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-explicit | equivalent-objective | passed | 1.690e-11 | 0.000e+0 | 0.000e+0 | 1.690e-11 | 5.818e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-auto | equivalent-objective | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicate-features-auto | equivalent-objective | passed | 8.106e-4 | 1.475e-4 | 1.620e-4 | 9.252e-4 | 7.159e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-training-duplicates-auto | scalar-process-different-public-work | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | 0.313 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| map-training-zero-span-linear-varied | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-linear-constant | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| evaluation-training-duplicates | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.211e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| linear-offset-scaling-absmax | equivalent-objective | passed | 1.226e-11 | 1.420e-13 | 1.420e-13 | 1.236e-11 | 1.023e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-offset-scaling-minmax | equivalent-objective | passed | 6.111e-13 | 2.905e-13 | 2.905e-13 | 8.527e-13 | 4.503e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-mixed-components | equivalent-objective | passed | 1.561e-10 | 2.705e-11 | 0.000e+0 | 1.790e-10 | 1.565e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-defaults-long-history-intervals-1000 | scalar-process-different-public-work | passed | 5.708e-2 | 1.814e-2 | 1.818e-2 | 4.692e-2 | 2.608e-4 | 0.394 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-linear-defaults-irregular-intervals-1000 | scalar-process-different-public-work | passed | 1.096e-1 | 6.977e-3 | 6.977e-3 | 1.070e-1 | 9.079e-3 | 0.483 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective. |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | scalar-process-different-public-work | passed | 1.194e-11 | 1.420e-13 | 1.420e-13 | 1.208e-11 | 1.023e-14 | 0.013 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | scalar-process-different-public-work | passed | 1.197e-11 | 4.310e-14 | 4.310e-14 | 1.201e-11 | 1.023e-14 | 0.005 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-intervals-128 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | 0.016 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-samples-512 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | 0.010 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| anomalies-linear-defaults-99 | scalar-process-different-public-work | passed | 1.547e-1 | 6.235e-4 | 6.235e-4 | 1.542e-1 | 1.974e-3 | 0.579 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Both libraries flagged all 4 injected outliers. Effect flagged at most 4 rows and Python 4; 0 were flagged by only one library, each between the two libraries' bounds. Output-first: investigate internal fit differences in objective. |
| warm-start-linear-defaults-30-new-rows | equivalent-objective | passed | 2.365e-3 | 1.342e-5 | 1.342e-5 | 2.376e-3 | 4.792e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Each library refit from its own fit of the first 226 rows; their starting parameters differed by at most 0.00531 in scaled units. Output-first: investigate internal fit differences in objective. |
| warm-start-linear-defaults-1-new-row | equivalent-objective | passed | 1.175e-3 | 5.353e-5 | 5.353e-5 | 1.169e-3 | 1.041e-3 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Each library refit from its own fit of the first 255 rows; their starting parameters differed by at most 0.00456 in scaled units. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| evaluation-linear-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a14370273fba01e9cb27ee517ec9ba221510f8e9fba706dcd872c63ac2ea7d88 | true | 2010 | 13 | 11765 | 23981 |

## Stationarity diagnostics

Constrained normalized infinity-norm residuals at independently fitted endpoints, not a same-point gradient comparison. Deltas within the Laplace kink tolerance use the subgradient interval on both sides. Equality-gate rows bound the absolute difference. Output-first rows never gate eligibility; they are flagged for investigation when Effect's residual exceeds Python's by more than the declared threshold. Diagnostic-only rows do not certify near-stationarity; EP-097 owns that deferred requirement. Forecast, component, metadata, persistence and applicable uncertainty gates always apply; density and normalized noise also gate except under output-first.

| Case | Run | Effect residual | Python residual | Absolute difference | Policy | Follow-up |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| map-explicit-break-small | 0 | 3.070796e-2 | 3.070796e-2 | 5.727387e-11 | output-first | n/a |
| map-explicit-break-small | 1 | 3.070796e-2 | 3.070796e-2 | 5.727387e-11 | output-first | n/a |
| map-seasonal-breaks-irregular-medium | 0 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | output-first | n/a |
| map-seasonal-breaks-irregular-medium | 1 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | output-first | n/a |
| map-mixed-features-explicit-small | 0 | 2.483610e-2 | 2.483610e-2 | 1.594271e-9 | output-first | n/a |
| map-mixed-features-explicit-small | 1 | 2.483610e-2 | 2.483610e-2 | 1.594271e-9 | output-first | n/a |
| map-mixed-features-automatic-large | 0 | 1.719064e+2 | 1.734560e+2 | 1.549680e+0 | output-first | n/a |
| map-mixed-features-automatic-large | 1 | 1.719064e+2 | 1.734560e+2 | 1.549680e+0 | output-first | n/a |
| map-events-small | 0 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-events-small | 1 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-regressors-medium | 0 | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | output-first | n/a |
| map-regressors-medium | 1 | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | output-first | n/a |
| map-conditional-seasonalities-medium | 0 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | output-first | n/a |
| map-conditional-seasonalities-medium | 1 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | output-first | n/a |
| country-us-linear-additive | 0 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-us-linear-additive | 1 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-explicit-us-linear-additive | 0 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-explicit-us-linear-additive | 1 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-us-linear-multiplicative | 0 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-us-linear-multiplicative | 1 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-explicit-us-linear-multiplicative | 0 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-explicit-us-linear-multiplicative | 1 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-boundary-linear | 0 | 1.622527e+0 | 1.622527e+0 | 1.016670e-8 | output-first | n/a |
| country-boundary-linear | 1 | 1.622527e+0 | 1.622527e+0 | 1.016670e-8 | output-first | n/a |
| linear-defaults-small | 0 | 2.798504e+1 | 2.797839e+1 | 6.650479e-3 | output-first | n/a |
| linear-defaults-small | 1 | 2.798504e+1 | 2.797839e+1 | 6.650479e-3 | output-first | n/a |
| linear-defaults-medium | 0 | 3.399954e+3 | 9.062191e+3 | 5.662238e+3 | output-first | n/a |
| linear-defaults-medium | 1 | 3.399954e+3 | 9.062191e+3 | 5.662238e+3 | output-first | n/a |
| linear-defaults-irregular | 0 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| linear-defaults-irregular | 1 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| map-training-ordered-explicit | 0 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-ordered-explicit | 1 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-ordered-auto | 0 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-ordered-auto | 1 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-unsorted-explicit | 0 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-unsorted-explicit | 1 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-unsorted-auto | 0 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-unsorted-auto | 1 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-duplicates-explicit | 0 | 1.044064e+0 | 1.044064e+0 | 5.043985e-8 | output-first | n/a |
| map-training-duplicates-explicit | 1 | 1.044064e+0 | 1.044064e+0 | 5.043985e-8 | output-first | n/a |
| map-training-duplicates-auto | 0 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| map-training-duplicates-auto | 1 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| map-training-duplicate-features-auto | 0 | 4.784026e+1 | 1.075811e+2 | 5.974084e+1 | output-first | n/a |
| map-training-duplicate-features-auto | 1 | 4.784026e+1 | 1.075811e+2 | 5.974084e+1 | output-first | n/a |
| uncertainty-training-duplicates-auto | 0 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| uncertainty-training-duplicates-auto | 1 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| linear-offset-scaling-absmax | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| linear-offset-scaling-absmax | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| linear-offset-scaling-minmax | 0 | 4.443357e-1 | 4.443357e-1 | 2.258696e-8 | output-first | n/a |
| linear-offset-scaling-minmax | 1 | 4.443357e-1 | 4.443357e-1 | 2.258696e-8 | output-first | n/a |
| linear-mixed-components | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| linear-mixed-components | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | output-first | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | output-first | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | 0 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | 1 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| anomalies-linear-defaults-99 | 0 | 9.725647e+1 | 2.103162e+2 | 1.130598e+2 | output-first | n/a |
| anomalies-linear-defaults-99 | 1 | 9.725647e+1 | 2.103162e+2 | 1.130598e+2 | output-first | n/a |
| warm-start-linear-defaults-30-new-rows | 0 | 1.674684e+4 | 2.256474e+4 | 5.817903e+3 | output-first | n/a |
| warm-start-linear-defaults-30-new-rows | 1 | 1.674684e+4 | 2.256474e+4 | 5.817903e+3 | output-first | n/a |
| warm-start-linear-defaults-1-new-row | 0 | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | output-first | n/a |
| warm-start-linear-defaults-1-new-row | 1 | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | output-first | n/a |

## Output-first investigation flags

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's. Warm-start parameters are flagged when the two libraries' base fits start their refits further apart than the case allows.

| Case | Run | Quantity | Effect | Python | Effect - Python | Threshold |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| map-regressors-medium | 0 | stationarity-residual | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | 1.000e-2 |
| map-regressors-medium | 1 | stationarity-residual | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | 1.000e-2 |
| map-conditional-seasonalities-medium | 0 | stationarity-residual | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | 1.000e-2 |
| map-conditional-seasonalities-medium | 1 | stationarity-residual | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | 1.000e-2 |
| linear-defaults-irregular | 0 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| linear-defaults-irregular | 1 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | objective | -5.819508e+3 | -5.819647e+3 | 1.389642e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | stationarity-residual | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | objective | -5.819508e+3 | -5.819647e+3 | 1.389642e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | stationarity-residual | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | 1.000e-2 |
| uncertainty-linear-defaults-irregular-intervals-1000 | 0 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| uncertainty-linear-defaults-irregular-intervals-1000 | 1 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| anomalies-linear-defaults-99 | 0 | objective | -1.465484e+3 | -1.466453e+3 | 9.685886e-1 | 1.000e-2 |
| anomalies-linear-defaults-99 | 1 | objective | -1.465484e+3 | -1.466453e+3 | 9.685886e-1 | 1.000e-2 |
| warm-start-linear-defaults-30-new-rows | 0 | objective | -1.762230e+3 | -1.762152e+3 | -7.891521e-2 | 1.000e-2 |
| warm-start-linear-defaults-30-new-rows | 1 | objective | -1.762230e+3 | -1.762152e+3 | -7.891521e-2 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 0 | objective | -1.762038e+3 | -1.762258e+3 | 2.199214e-1 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 0 | stationarity-residual | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 1 | objective | -1.762038e+3 | -1.762258e+3 | 2.199214e-1 | 1.000e-2 |
| warm-start-linear-defaults-1-new-row | 1 | stationarity-residual | 2.914290e+4 | 1.567931e+4 | 1.346359e+4 | 1.000e-2 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

Anomaly workloads check the whole history in-sample. Effect's `warm-anomalies` times the public `anomalies` call, fit included; Python's times a fresh fit, `predict(history, vectorized=False)` and the strict `y < yhat_lower | y > yhat_upper` comparison. Each library's flags must be exactly the rows outside its own value intervals, and both must flag every declared outlier. Rows flagged by one library alone are counted, not failed.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-training-duplicates-auto | 96 | 0 | 25 | 8 | 8 | 8 | 128 | samples | 33554432 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | docs/validation/uncertainty.md |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1095 | 26 | 25 | 1460 | 365 | 365 | 1000 | intervals | 67108864 | long-history-v1:piecewise+weekly+yearly+bounded-noise-x20:n=1095:h=365 / 30f02c063165126f62a0964a83fef842d557b54fab6300c692ef69225bb94d41 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-defaults-irregular-intervals-1000 | 192 | 6 | 25 | 240 | 48 | 57 | 1000 | intervals | 67108864 | deterministic-piecewise-weekly-v2:n=192:h=48:irregular=true / 62f195edf2bc788b67f26471e00eee77ec55c61670a7c61be3c23230664418a1 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 96 | 4 | 1 | 8 | 0 | 0 | 128 | intervals | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 96 | 4 | 1 | 1 | 1 | 1 | 128 | samples | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 96 | 6 | 1 | 12 | 8 | 15 | 128 | intervals | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-samples-512 | 96 | 6 | 1 | 12 | 8 | 15 | 512 | samples | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |
| anomalies-linear-defaults-99 | 365 | 6 | 25 | 365 | 0 | 0 | 1000 | intervals | 67108864 | linear-anomalies-v1:piecewise+weekly+bounded-noise-x10+outliers@50(+15),120(-15),230(+12),300(-12):n=365:h=0 / 2b70250a026865e01f8ce95665c42641633fba309e791a7dc1e2996e67bd98ed | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-linear-defaults-99 | warm-anomalies | effect-prophet | 6 | 23.829 | 24.464 | 23.610 | 24.464 | n/a |
| anomalies-linear-defaults-99 | warm-anomalies | python-prophet | 6 | 205.598 | 225.238 | 201.773 | 225.238 | n/a |
| anomalies-linear-defaults-99 | warm-fit | effect-prophet | 6 | 8.207 | 9.904 | 6.953 | 9.904 | n/a |
| anomalies-linear-defaults-99 | warm-fit | python-prophet | 6 | 29.286 | 29.737 | 29.203 | 29.737 | n/a |
| anomalies-linear-defaults-99 | warm-uncertainty | effect-prophet | 6 | 12.945 | 13.421 | 12.784 | 13.421 | 150.0 |
| anomalies-linear-defaults-99 | warm-uncertainty | python-prophet | 6 | 172.532 | 188.714 | 169.911 | 188.714 | 129.7 |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.012 | 0.016 | 137.8 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.482 | 0.439 | 0.482 | 147.6 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 171.134 | 184.302 | 170.984 | 184.302 | 155.2 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1589.787 | 1618.123 | 1588.007 | 1618.123 | 147.6 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 157.654 | 160.368 | 156.188 | 160.368 | 155.7 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1569.284 | 1782.032 | 1567.620 | 1782.032 | 147.6 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.797 | 1.007 | 0.722 | 1.007 | 155.7 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.270 | 3.390 | 3.208 | 3.390 | 147.6 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.077 | 0.095 | 0.073 | 0.095 | 155.2 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.519 | 0.551 | 0.500 | 0.551 | 147.6 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.156 | 6.216 | 5.028 | 6.216 | 155.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 26.849 | 27.220 | 26.600 | 27.220 | 147.6 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.391 | 5.960 | 5.240 | 5.960 | 153.5 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.168 | 26.748 | 25.936 | 26.748 | 147.6 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 6.505 | 7.421 | 5.485 | 7.421 | 150.9 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 20.834 | 21.186 | 20.547 | 21.186 | 147.6 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.246 | 0.319 | 0.218 | 0.319 | 150.9 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.340 | 5.437 | 5.300 | 5.437 | 147.6 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.014 | 0.012 | 0.014 | 136.1 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.478 | 0.446 | 0.478 | 126.6 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 168.407 | 169.637 | 165.629 | 169.637 | 153.8 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1420.258 | 1425.679 | 1417.739 | 1425.679 | 126.6 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 155.159 | 170.297 | 153.486 | 170.297 | 153.8 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1403.087 | 1416.931 | 1401.662 | 1416.931 | 126.6 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.389 | 0.501 | 0.383 | 0.501 | 153.8 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.943 | 4.049 | 3.860 | 4.049 | 126.6 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.022 | 0.031 | 0.017 | 0.031 | 153.8 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.685 | 0.721 | 0.657 | 0.721 | 126.6 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.650 | 3.751 | 3.572 | 3.751 | 153.3 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.762 | 23.188 | 22.679 | 23.188 | 126.6 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.860 | 4.060 | 3.732 | 4.060 | 153.2 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 21.882 | 22.084 | 21.637 | 22.084 | 126.6 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.438 | 4.584 | 4.061 | 4.584 | 144.8 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.251 | 17.724 | 17.113 | 17.724 | 126.6 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.170 | 0.188 | 0.154 | 0.188 | 147.3 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.754 | 5.199 | 4.671 | 5.199 | 126.6 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.014 | 0.018 | 138.3 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.529 | 0.451 | 0.529 | 126.6 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 169.919 | 177.259 | 169.725 | 177.259 | 156.7 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1441.555 | 1473.983 | 1421.020 | 1473.983 | 126.6 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 156.507 | 168.360 | 153.018 | 168.360 | 156.7 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1410.821 | 1433.335 | 1406.270 | 1433.335 | 126.6 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.433 | 0.559 | 0.382 | 0.559 | 156.7 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.951 | 4.096 | 3.893 | 4.096 | 126.6 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.024 | 0.030 | 0.017 | 0.030 | 156.7 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.707 | 1.027 | 0.688 | 1.027 | 126.6 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.151 | 5.826 | 3.985 | 5.826 | 156.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.560 | 23.842 | 23.086 | 23.842 | 126.6 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.266 | 5.975 | 4.226 | 5.975 | 156.3 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 23.481 | 23.912 | 23.164 | 23.912 | 126.6 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.080 | 6.394 | 4.502 | 6.394 | 148.4 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.608 | 21.058 | 18.367 | 21.058 | 126.6 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.181 | 0.249 | 0.171 | 0.249 | 150.9 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.711 | 4.819 | 4.682 | 4.819 | 126.6 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | 138.5 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.449 | 0.498 | 0.440 | 0.498 | 148.1 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 172.399 | 174.677 | 168.675 | 174.677 | 154.1 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1588.971 | 1680.109 | 1585.041 | 1680.109 | 148.1 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.080 | 163.360 | 157.883 | 163.360 | 154.8 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1579.738 | 1589.764 | 1571.635 | 1589.764 | 148.1 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.982 | 1.524 | 0.916 | 1.524 | 154.6 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.869 | 4.046 | 3.836 | 4.046 | 148.1 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.093 | 0.103 | 0.081 | 0.103 | 154.1 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.676 | 0.717 | 0.656 | 0.717 | 148.1 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.505 | 5.270 | 4.434 | 5.270 | 154.0 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.606 | 28.096 | 26.332 | 28.096 | 148.1 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.758 | 5.093 | 4.574 | 5.093 | 152.5 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 25.938 | 26.737 | 25.623 | 26.737 | 148.1 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.746 | 6.720 | 5.069 | 6.720 | 151.8 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.161 | 20.354 | 19.999 | 20.354 | 148.1 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.222 | 0.228 | 0.211 | 0.228 | 151.9 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.500 | 5.704 | 5.448 | 5.704 | 148.1 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.012 | 0.016 | 140.2 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.457 | 0.484 | 0.448 | 0.484 | 148.2 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 173.954 | 197.608 | 171.356 | 197.608 | 159.5 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1591.342 | 1612.952 | 1589.666 | 1612.952 | 148.2 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.963 | 176.829 | 159.480 | 176.829 | 160.0 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1567.491 | 1580.913 | 1565.542 | 1580.913 | 148.2 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.842 | 1.251 | 0.767 | 1.251 | 160.0 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.880 | 3.962 | 3.853 | 3.962 | 148.2 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.092 | 0.113 | 0.083 | 0.113 | 159.5 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.677 | 0.685 | 0.675 | 0.685 | 148.2 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.282 | 8.072 | 4.760 | 8.072 | 159.2 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.482 | 28.052 | 27.325 | 28.052 | 148.2 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.533 | 7.719 | 5.129 | 7.719 | 157.6 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 26.949 | 27.718 | 26.533 | 27.718 | 148.2 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 7.093 | 11.409 | 5.333 | 11.409 | 157.1 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.342 | 21.689 | 21.098 | 21.689 | 148.2 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.255 | 0.343 | 0.208 | 0.343 | 157.1 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.547 | 5.705 | 5.492 | 5.705 | 148.2 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.211 | 6.262 | 5.964 | 6.262 | 158.1 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.984 | 33.403 | 30.343 | 33.403 | 126.6 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.166 | 0.168 | 0.156 | 0.168 | 158.9 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 126.6 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.209 | 0.225 | 0.197 | 0.225 | 158.4 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.011 | 0.014 | 0.009 | 0.014 | 126.6 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 20.297 | 24.100 | 19.954 | 24.100 | 157.3 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 151.048 | 157.068 | 150.991 | 157.068 | 126.6 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.893 | 12.224 | 9.674 | 12.224 | 145.2 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 87.332 | 91.175 | 86.304 | 91.175 | 126.6 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 175.795 | 180.168 | 175.302 | 180.168 | 156.5 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1500.108 | 2231.798 | 1484.542 | 2231.798 | 126.6 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.100 | 2.317 | 1.085 | 2.317 | 156.5 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.100 | 1.131 | 1.098 | 1.131 | 126.6 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.012 | 0.012 | 0.011 | 0.012 | 126.8 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.413 | 0.462 | 0.371 | 0.462 | 126.6 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.064 | 0.076 | 0.057 | 0.076 | 150.0 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.428 | 5.521 | 5.380 | 5.521 | 126.6 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.086 | 1.202 | 1.075 | 1.202 | 131.6 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.659 | 0.693 | 0.601 | 0.693 | 126.6 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.359 | 9.432 | 9.241 | 9.432 | 146.8 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 72.129 | 77.328 | 71.494 | 77.328 | 126.6 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 5.954 | 6.190 | 5.921 | 6.190 | 156.0 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 30.756 | 30.789 | 29.768 | 30.789 | 126.6 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.163 | 0.180 | 0.162 | 0.180 | 158.2 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 126.6 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.187 | 0.223 | 0.184 | 0.223 | 158.2 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 126.6 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 19.155 | 24.471 | 18.752 | 24.471 | 155.1 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 148.548 | 150.796 | 148.107 | 150.796 | 126.6 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.494 | 2.002 | 1.438 | 2.002 | 150.1 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.418 | 1.454 | 1.378 | 1.454 | 126.6 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.816 | 4.035 | 3.704 | 4.035 | 157.2 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.165 | 22.630 | 22.048 | 22.630 | 126.6 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.960 | 1.066 | 0.941 | 1.066 | 132.0 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.918 | 0.980 | 0.898 | 0.980 | 126.6 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.799 | 6.512 | 5.754 | 6.512 | 144.2 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 52.328 | 53.821 | 52.120 | 53.821 | 126.6 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.160 | 0.177 | 0.158 | 0.177 | 157.5 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 126.6 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.281 | 0.679 | 0.191 | 0.679 | 157.2 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.009 | 0.007 | 0.009 | 126.6 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 6.068 | 6.423 | 5.669 | 6.423 | 156.7 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 53.130 | 54.078 | 52.936 | 54.078 | 126.6 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.018 | 0.061 | 0.013 | 0.069 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.554 | 0.567 | 0.536 | 0.579 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.302 | 0.627 | 0.241 | 2.061 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.613 | 2.684 | 2.579 | 2.709 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.029 | 0.036 | 0.027 | 0.036 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.532 | 0.555 | 0.509 | 0.555 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 170.154 | 172.495 | 168.286 | 172.495 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1431.473 | 1469.625 | 1423.517 | 1469.625 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 153.110 | 154.606 | 151.661 | 154.606 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1425.652 | 1433.122 | 1418.280 | 1433.122 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.137 | 0.141 | 0.123 | 0.141 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.236 | 2.370 | 2.221 | 2.370 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.026 | 0.039 | 0.024 | 0.039 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.526 | 0.555 | 0.512 | 0.555 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.294 | 6.896 | 6.107 | 6.896 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.308 | 17.591 | 17.188 | 17.591 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.442 | 7.096 | 6.157 | 7.096 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.434 | 16.711 | 16.402 | 16.711 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.975 | 7.311 | 6.750 | 7.311 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.500 | 13.731 | 13.281 | 13.731 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.354 | 1.636 | 0.326 | 1.636 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.132 | 3.245 | 3.057 | 3.245 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.043 | 0.057 | 0.040 | 0.057 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.539 | 0.560 | 0.536 | 0.560 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 191.682 | 204.888 | 188.630 | 204.888 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1499.623 | 1553.247 | 1499.473 | 1553.247 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 155.018 | 160.837 | 152.820 | 160.837 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1417.009 | 1454.895 | 1410.634 | 1454.895 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.137 | 0.141 | 0.120 | 0.141 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.345 | 2.434 | 2.302 | 2.434 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.037 | 0.069 | 0.024 | 0.069 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.600 | 0.692 | 0.578 | 0.692 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.747 | 26.058 | 25.419 | 26.058 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 90.403 | 95.695 | 89.477 | 95.695 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.868 | 26.334 | 25.561 | 26.334 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 89.740 | 91.577 | 89.155 | 91.577 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.367 | 27.316 | 26.213 | 27.316 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 86.247 | 92.450 | 85.790 | 92.450 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.320 | 0.335 | 0.302 | 0.335 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.123 | 3.196 | 3.091 | 3.196 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.007 | 0.016 | 0.006 | 0.016 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.424 | 0.458 | 0.421 | 0.458 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 182.456 | 185.383 | 178.434 | 185.383 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1489.203 | 1532.667 | 1474.411 | 1532.667 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 151.180 | 154.842 | 149.555 | 154.842 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1426.592 | 1447.902 | 1415.786 | 1447.902 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.170 | 0.200 | 0.158 | 0.200 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.068 | 2.165 | 2.019 | 2.165 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.030 | 0.040 | 0.026 | 0.040 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.370 | 0.396 | 0.362 | 0.396 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.206 | 18.965 | 17.899 | 18.965 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 64.350 | 65.238 | 63.503 | 65.238 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 17.879 | 18.043 | 17.789 | 18.043 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 63.884 | 65.827 | 63.408 | 65.827 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.122 | 18.255 | 17.967 | 18.255 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 60.059 | 61.374 | 59.845 | 61.374 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.214 | 0.323 | 0.183 | 0.323 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.067 | 3.209 | 3.014 | 3.209 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.045 | 0.067 | 0.042 | 0.067 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.544 | 0.586 | 0.521 | 0.586 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 170.926 | 190.930 | 168.895 | 190.930 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1446.328 | 1461.962 | 1444.046 | 1461.962 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 155.453 | 156.423 | 155.349 | 156.423 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1419.992 | 1434.132 | 1414.713 | 1434.132 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.128 | 0.142 | 0.126 | 0.142 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.604 | 3.801 | 3.591 | 3.801 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.032 | 0.036 | 0.031 | 0.036 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.673 | 0.679 | 0.660 | 0.679 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.581 | 4.992 | 4.565 | 4.992 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.882 | 28.173 | 27.518 | 28.173 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.842 | 5.282 | 4.726 | 5.282 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.535 | 29.299 | 27.261 | 29.299 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.539 | 5.879 | 5.234 | 5.879 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.921 | 25.148 | 22.660 | 25.148 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.418 | 0.433 | 0.403 | 0.433 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.727 | 4.796 | 4.676 | 4.796 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.021 | 0.015 | 0.021 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.452 | 0.485 | 0.437 | 0.485 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 168.062 | 169.600 | 167.077 | 169.600 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1450.140 | 1485.048 | 1444.748 | 1485.048 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.644 | 155.214 | 151.289 | 155.214 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1428.806 | 1438.606 | 1415.974 | 1438.606 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.103 | 0.104 | 0.096 | 0.104 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.110 | 2.236 | 2.087 | 2.236 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.019 | 0.027 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.425 | 0.444 | 0.418 | 0.444 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.103 | 6.097 | 4.660 | 6.097 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 27.000 | 27.125 | 26.969 | 27.125 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.284 | 5.613 | 5.185 | 5.613 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.967 | 27.152 | 26.759 | 27.152 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.684 | 7.956 | 4.763 | 7.956 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.698 | 24.836 | 23.425 | 24.836 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.185 | 0.239 | 0.163 | 0.239 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.108 | 3.280 | 3.076 | 3.280 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.017 | 0.015 | 0.017 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.451 | 0.483 | 0.451 | 0.483 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 168.093 | 169.797 | 165.924 | 169.797 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1438.439 | 1444.850 | 1436.269 | 1444.850 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.194 | 161.762 | 149.239 | 161.762 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1418.527 | 1429.945 | 1415.870 | 1429.945 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.099 | 0.103 | 0.096 | 0.103 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.124 | 2.205 | 2.097 | 2.205 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.027 | 0.018 | 0.027 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.417 | 0.431 | 0.393 | 0.431 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.170 | 6.378 | 5.130 | 6.378 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.539 | 26.898 | 26.393 | 26.898 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.280 | 5.401 | 5.223 | 5.401 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.311 | 26.367 | 26.285 | 26.367 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.022 | 7.049 | 4.879 | 7.049 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.276 | 24.023 | 23.177 | 24.023 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.168 | 0.178 | 0.155 | 0.178 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.084 | 3.166 | 3.076 | 3.166 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.072 | 0.081 | 0.064 | 0.081 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.648 | 0.667 | 0.626 | 0.667 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 168.368 | 176.044 | 166.949 | 176.044 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1415.047 | 1431.992 | 1408.164 | 1431.992 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 157.601 | 161.173 | 157.045 | 161.173 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1404.965 | 1415.708 | 1402.023 | 1415.708 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.111 | 0.120 | 0.090 | 0.120 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.647 | 2.835 | 2.626 | 2.835 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.028 | 0.016 | 0.028 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.624 | 0.660 | 0.615 | 0.660 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.727 | 3.384 | 2.520 | 3.384 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.470 | 16.560 | 16.194 | 16.560 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.782 | 3.195 | 2.677 | 3.195 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.937 | 16.173 | 15.648 | 16.173 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 3.662 | 4.265 | 2.675 | 4.265 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 11.851 | 12.116 | 11.699 | 12.116 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.422 | 0.466 | 0.398 | 0.466 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.833 | 3.884 | 3.815 | 3.884 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.027 | 0.015 | 0.027 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.507 | 0.449 | 0.507 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 172.944 | 176.757 | 168.017 | 176.757 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1437.990 | 1444.548 | 1431.172 | 1444.548 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 155.214 | 161.974 | 153.115 | 161.974 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1409.048 | 1418.045 | 1406.774 | 1418.045 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.166 | 0.205 | 0.141 | 0.205 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.304 | 3.433 | 3.247 | 3.433 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.026 | 0.028 | 0.016 | 0.028 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.596 | 0.602 | 0.585 | 0.602 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.537 | 6.665 | 6.416 | 6.665 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.118 | 34.272 | 33.800 | 34.272 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.649 | 8.087 | 6.583 | 8.087 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.824 | 35.168 | 33.768 | 35.168 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 6.785 | 6.992 | 6.712 | 6.992 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.464 | 31.997 | 29.169 | 31.997 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.330 | 0.356 | 0.329 | 0.356 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.341 | 4.560 | 4.281 | 4.560 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.007 | 0.006 | 0.007 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.429 | 0.459 | 0.413 | 0.459 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 160.414 | 182.977 | 158.788 | 182.977 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1419.554 | 1432.605 | 1415.147 | 1432.605 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 149.541 | 153.587 | 148.621 | 153.587 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1406.616 | 1416.619 | 1403.853 | 1416.619 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.113 | 0.124 | 0.093 | 0.124 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 1.946 | 2.057 | 1.916 | 2.057 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.024 | 0.045 | 0.016 | 0.045 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.343 | 0.360 | 0.330 | 0.360 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.748 | 1.971 | 1.663 | 1.971 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.881 | 14.046 | 13.754 | 14.046 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.790 | 1.957 | 1.648 | 1.957 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.496 | 13.717 | 13.335 | 13.717 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 2.101 | 2.302 | 1.875 | 2.302 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.880 | 11.016 | 10.799 | 11.016 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.258 | 0.283 | 0.190 | 0.283 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.647 | 2.722 | 2.599 | 2.722 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.192 | 0.197 | 0.189 | 0.197 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.118 | 1.150 | 1.113 | 1.150 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 193.227 | 197.247 | 185.175 | 197.247 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1442.298 | 1444.510 | 1442.143 | 1444.510 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 162.497 | 172.934 | 161.969 | 172.934 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1418.964 | 1426.185 | 1411.989 | 1426.185 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.252 | 0.281 | 0.237 | 0.281 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.577 | 5.690 | 5.568 | 5.690 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.024 | 0.025 | 0.023 | 0.025 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.683 | 1.689 | 1.679 | 1.689 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 10.551 | 11.670 | 10.477 | 11.670 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.625 | 44.889 | 44.315 | 44.889 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.936 | 15.839 | 11.236 | 15.839 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.419 | 44.248 | 43.054 | 44.248 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.483 | 12.146 | 11.399 | 12.146 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.271 | 39.430 | 37.168 | 39.430 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 1.037 | 1.514 | 0.798 | 1.514 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.151 | 6.264 | 6.080 | 6.264 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.024 | 0.012 | 0.024 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.482 | 0.509 | 0.469 | 0.509 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 163.562 | 165.044 | 161.236 | 165.044 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1420.523 | 1441.941 | 1418.020 | 1441.941 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 151.660 | 156.556 | 151.072 | 156.556 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1410.207 | 1435.503 | 1406.288 | 1435.503 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.185 | 2.519 | 0.143 | 2.519 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.583 | 3.803 | 3.510 | 3.803 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.028 | 0.042 | 0.020 | 0.042 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.588 | 0.616 | 0.578 | 0.616 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.626 | 1.691 | 1.586 | 1.691 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.268 | 23.784 | 16.073 | 23.784 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.667 | 1.777 | 1.502 | 1.777 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.695 | 19.251 | 15.569 | 19.251 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.847 | 2.319 | 1.764 | 2.319 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.066 | 11.224 | 10.873 | 11.224 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.166 | 0.288 | 0.122 | 0.288 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.815 | 4.930 | 4.746 | 4.930 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.098 | 0.158 | 0.052 | 0.158 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.678 | 0.741 | 0.665 | 0.741 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 167.342 | 173.127 | 166.375 | 173.127 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1419.620 | 1444.981 | 1414.805 | 1444.981 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 156.262 | 157.585 | 156.214 | 157.585 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1423.252 | 1430.352 | 1412.790 | 1430.352 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.105 | 0.108 | 0.082 | 0.108 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.983 | 3.160 | 2.972 | 3.160 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.021 | 0.022 | 0.015 | 0.022 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.729 | 0.771 | 0.699 | 0.771 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.553 | 2.846 | 2.499 | 2.846 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.372 | 14.598 | 14.300 | 14.598 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.796 | 3.160 | 2.705 | 3.160 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.706 | 13.836 | 13.610 | 13.836 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.739 | 2.850 | 2.560 | 2.850 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.143 | 10.572 | 10.004 | 10.572 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.483 | 0.799 | 0.472 | 0.799 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.549 | 3.623 | 3.511 | 3.623 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.034 | 0.027 | 0.034 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.533 | 0.578 | 0.514 | 0.578 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 153.187 | 159.747 | 151.072 | 159.747 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1407.013 | 1429.810 | 1403.164 | 1429.810 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.094 | 0.122 | 0.091 | 0.122 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.256 | 2.333 | 2.208 | 2.333 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.019 | 0.021 | 0.014 | 0.021 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.511 | 0.533 | 0.496 | 0.533 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.397 | 1.892 | 1.320 | 1.892 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.556 | 11.708 | 11.514 | 11.708 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.453 | 1.606 | 1.393 | 1.606 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.003 | 11.133 | 10.825 | 11.133 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 1.990 | 2.191 | 1.730 | 2.191 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 7.905 | 8.123 | 7.859 | 8.123 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.336 | 0.369 | 0.325 | 0.369 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.153 | 3.232 | 3.109 | 3.232 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 153.298 | 157.221 | 151.854 | 157.221 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1427.092 | 1456.227 | 1426.006 | 1456.227 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.214 | 0.238 | 0.198 | 0.238 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.494 | 2.522 | 2.462 | 2.522 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.027 | 0.137 | 0.023 | 0.137 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.439 | 0.476 | 0.429 | 0.476 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.308 | 34.402 | 30.417 | 34.402 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 110.934 | 112.766 | 110.836 | 112.766 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.280 | 0.381 | 0.263 | 0.381 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.534 | 3.656 | 3.461 | 3.656 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 151.972 | 153.331 | 149.369 | 153.331 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1426.661 | 1442.884 | 1419.939 | 1442.884 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.165 | 0.185 | 0.157 | 0.185 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.030 | 2.131 | 2.024 | 2.131 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.019 | 0.027 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.406 | 0.443 | 0.400 | 0.443 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.287 | 26.577 | 26.075 | 26.577 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 85.044 | 88.766 | 84.703 | 88.766 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.152 | 0.242 | 0.132 | 0.242 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.779 | 2.870 | 2.703 | 2.870 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 152.060 | 153.230 | 151.779 | 153.230 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1423.429 | 1428.485 | 1418.488 | 1428.485 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.132 | 0.183 | 0.128 | 0.183 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.027 | 2.075 | 2.010 | 2.075 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.018 | 0.025 | 0.018 | 0.025 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.389 | 0.433 | 0.383 | 0.433 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.870 | 4.421 | 3.639 | 4.421 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.660 | 20.126 | 19.461 | 20.126 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.138 | 0.156 | 0.127 | 0.156 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.696 | 2.790 | 2.669 | 2.790 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 153.105 | 154.460 | 152.835 | 154.460 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1426.292 | 1428.613 | 1423.808 | 1428.613 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.156 | 0.166 | 0.149 | 0.166 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.097 | 2.161 | 2.082 | 2.161 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.025 | 0.033 | 0.019 | 0.033 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.407 | 0.423 | 0.396 | 0.423 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.934 | 31.462 | 30.848 | 31.462 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 107.807 | 109.485 | 106.791 | 109.485 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.154 | 0.239 | 0.151 | 0.239 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.699 | 3.929 | 2.678 | 3.929 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 151.817 | 158.071 | 151.177 | 158.071 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1423.095 | 1446.141 | 1421.873 | 1446.141 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.135 | 0.138 | 0.121 | 0.138 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.085 | 2.113 | 2.045 | 2.113 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.017 | 0.024 | 0.017 | 0.024 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.397 | 0.420 | 0.386 | 0.420 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.112 | 5.607 | 3.922 | 5.607 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.926 | 21.065 | 20.507 | 21.065 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.141 | 0.156 | 0.137 | 0.156 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.670 | 2.689 | 2.660 | 2.689 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 153.361 | 162.237 | 152.272 | 162.237 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1422.052 | 1429.241 | 1421.075 | 1429.241 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.161 | 0.176 | 0.155 | 0.176 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.101 | 2.131 | 2.061 | 2.131 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.025 | 0.034 | 0.021 | 0.034 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.419 | 0.467 | 0.412 | 0.467 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 31.488 | 32.560 | 31.480 | 32.560 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 107.846 | 108.065 | 107.115 | 108.065 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.141 | 0.185 | 0.124 | 0.185 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.678 | 2.823 | 2.666 | 2.823 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 153.308 | 158.450 | 152.749 | 158.450 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1430.153 | 1455.229 | 1418.894 | 1455.229 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.130 | 0.145 | 0.130 | 0.145 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.106 | 2.147 | 2.046 | 2.147 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.019 | 0.025 | 0.017 | 0.025 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.389 | 0.412 | 0.389 | 0.412 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.024 | 4.337 | 4.023 | 4.337 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 20.770 | 20.984 | 20.462 | 20.984 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.143 | 0.159 | 0.137 | 0.159 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.676 | 2.774 | 2.624 | 2.774 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 186.632 | 197.060 | 182.806 | 197.060 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1596.375 | 1655.356 | 1590.800 | 1655.356 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 169.576 | 171.925 | 167.989 | 171.925 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1594.428 | 1618.014 | 1581.799 | 1618.014 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.188 | 0.214 | 0.160 | 0.214 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.267 | 2.368 | 2.235 | 2.368 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.020 | 0.030 | 0.019 | 0.030 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.526 | 0.568 | 0.515 | 0.568 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 1.233 | 0.041 | 1.233 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.595 | 0.619 | 0.589 | 0.619 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.973 | 13.193 | 11.666 | 13.193 | 148.7 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 158.211 | 175.069 | 157.609 | 175.069 | 126.6 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 343.794 | 353.827 | 341.689 | 353.827 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2108.077 | 2148.369 | 2106.499 | 2148.369 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 240.674 | 243.729 | 237.475 | 243.729 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1803.115 | 1837.190 | 1799.724 | 1837.190 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.228 | 1.191 | 0.190 | 1.191 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.535 | 3.608 | 3.466 | 3.608 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.024 | 0.031 | 0.018 | 0.031 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.416 | 1.560 | 1.403 | 1.560 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.185 | 0.049 | 0.185 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.432 | 1.472 | 1.396 | 1.472 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 68.659 | 70.465 | 68.162 | 70.465 | 159.2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 368.079 | 382.521 | 366.462 | 382.521 | 162.5 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 169.424 | 175.240 | 167.351 | 175.240 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1470.186 | 1495.162 | 1451.830 | 1495.162 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.039 | 158.338 | 153.887 | 158.338 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1439.972 | 1455.903 | 1437.120 | 1455.903 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.235 | 0.330 | 0.211 | 0.330 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.622 | 3.850 | 3.537 | 3.850 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.032 | 0.020 | 0.032 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.662 | 0.707 | 0.631 | 0.707 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.049 | 0.058 | 0.045 | 0.058 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.519 | 0.535 | 0.507 | 0.535 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.414 | 0.743 | 0.385 | 0.743 | 140.1 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 24.911 | 37.668 | 24.686 | 37.668 | 126.6 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 171.976 | 175.895 | 169.786 | 175.895 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1501.117 | 1510.865 | 1496.282 | 1510.865 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.142 | 169.509 | 155.193 | 169.509 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1482.773 | 1520.929 | 1477.222 | 1520.929 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.226 | 0.243 | 0.222 | 0.243 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.578 | 3.775 | 3.499 | 3.775 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.033 | 0.021 | 0.033 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.651 | 0.697 | 0.631 | 0.697 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.051 | 0.070 | 0.038 | 0.070 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.514 | 0.542 | 0.503 | 0.542 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.714 | 1.931 | 0.677 | 1.931 | 144.0 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 67.171 | 68.170 | 66.395 | 68.170 | 126.6 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 171.351 | 173.447 | 169.435 | 173.447 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1454.102 | 1485.988 | 1452.271 | 1485.988 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.792 | 175.291 | 152.472 | 175.291 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1431.426 | 1447.423 | 1426.157 | 1447.423 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.160 | 0.238 | 0.114 | 0.238 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.223 | 2.420 | 2.132 | 2.420 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.017 | 0.020 | 0.015 | 0.020 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.412 | 0.449 | 0.404 | 0.449 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.013 | 0.020 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.455 | 0.482 | 0.445 | 0.482 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.335 | 1.187 | 0.317 | 1.187 | 139.4 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.498 | 19.812 | 19.364 | 19.812 | 126.6 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 171.383 | 176.873 | 167.672 | 176.873 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1452.960 | 1461.282 | 1452.475 | 1461.282 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.868 | 155.212 | 149.284 | 155.212 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1424.826 | 1432.702 | 1422.755 | 1432.702 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.150 | 0.184 | 0.133 | 0.184 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.189 | 2.371 | 2.121 | 2.371 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.028 | 0.017 | 0.028 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.404 | 0.427 | 0.398 | 0.427 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.459 | 0.479 | 0.455 | 0.479 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.208 | 0.221 | 0.184 | 0.221 | 135.6 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.656 | 16.914 | 16.622 | 16.914 | 126.6 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 151.623 | 154.047 | 151.560 | 154.047 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1441.549 | 1450.120 | 1439.764 | 1450.120 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.415 | 0.564 | 0.400 | 0.564 | 138.3 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 17.200 | 17.444 | 17.032 | 17.444 | 126.6 |
| warm-start-linear-defaults-1-new-row | warm-fit | effect-prophet | 6 | 26.997 | 27.984 | 26.547 | 27.984 | n/a |
| warm-start-linear-defaults-1-new-row | warm-fit | python-prophet | 6 | 86.582 | 87.435 | 86.249 | 87.435 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | effect-prophet | 6 | 7.904 | 9.982 | 7.769 | 9.982 | n/a |
| warm-start-linear-defaults-1-new-row | warm-start-fit | python-prophet | 6 | 21.493 | 22.793 | 21.265 | 22.793 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | effect-prophet | 6 | 26.281 | 26.845 | 26.094 | 26.845 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-fit | python-prophet | 6 | 87.640 | 90.174 | 87.336 | 90.174 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | effect-prophet | 6 | 26.158 | 26.392 | 25.879 | 26.392 | n/a |
| warm-start-linear-defaults-30-new-rows | warm-start-fit | python-prophet | 6 | 72.770 | 79.738 | 72.288 | 79.738 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:06:56 - cmdstanpy - INFO - Chain [1] start processing<br>17:06:56 - cmdstanpy - INFO - Chain [1] done processing<br>17:06:56 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=94049 data file=/tmp/tmplkno3waj/bienbvw8.json init=/tmp/tmplkno3waj/ylkpmg0z.json output file=/tmp/tmplkno3waj/prophet_modelk49drdmk/prophet_model-20261025170656.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmplkno3waj/bienbvw8.json<br>init = /tmp/tmplkno3waj/ylkpmg0z.json<br>random<br>  seed = 94049<br>output<br>  file = /tmp/tmplkno3waj/prophet_modelk49drdmk/prophet_model-20261025170656.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1321, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1298, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1064, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 842, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 301, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 230, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=94049 data file=/tmp/tmplkno3waj/bienbvw8.json init=/tmp/tmplkno3waj/ylkpmg0z.json output file=/tmp/tmplkno3waj/prophet_modelk49drdmk/prophet_model-20261025170656.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:06:58 - cmdstanpy - INFO - Chain [1] start processing<br>17:06:58 - cmdstanpy - INFO - Chain [1] done processing<br>17:06:58 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=9595 data file=/tmp/tmpd2nwignl/dkdx_nqd.json init=/tmp/tmpd2nwignl/8bq_2uid.json output file=/tmp/tmpd2nwignl/prophet_modelu248yyok/prophet_model-20261025170658.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpd2nwignl/dkdx_nqd.json<br>init = /tmp/tmpd2nwignl/8bq_2uid.json<br>random<br>  seed = 9595<br>output<br>  file = /tmp/tmpd2nwignl/prophet_modelu248yyok/prophet_model-20261025170658.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1321, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1298, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1064, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 842, in correctness_projection<br>    model = setup_model(training, benchmark_case, init)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 301, in setup_model<br>    return fit_model(training, benchmark_case, init)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 230, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=9595 data file=/tmp/tmpd2nwignl/dkdx_nqd.json init=/tmp/tmpd2nwignl/8bq_2uid.json output file=/tmp/tmpd2nwignl/prophet_modelu248yyok/prophet_model-20261025170658.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>   |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1321, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1298, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1064, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 845, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 408, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1321, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1298, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1064, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 845, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 408, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `5f551f20f5e46dd5d8d0dbe73cbc477bd1c1d725`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `anomalies-linear-defaults-99`, `warm-start-linear-defaults-30-new-rows`, `warm-start-linear-defaults-1-new-row`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`
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

