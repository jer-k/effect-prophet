# Effect Prophet benchmark — 2026-10-15T043106-340Z-34951879

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence fixed-linear-equation-v1. |
| map-explicit-break-small | equivalent-objective | passed | 1.018e-11 | 0.000e+0 | 0.000e+0 | 1.018e-11 | 4.041e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 6.301e-5 | 1.686e-5 | 1.686e-5 | 6.877e-5 | 1.344e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-explicit-small | equivalent-objective | passed | 7.887e-13 | 1.212e-12 | 1.281e-12 | 1.020e-12 | 1.101e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-automatic-large | equivalent-objective | passed | 5.158e-3 | 1.775e-3 | 2.989e-3 | 6.924e-3 | 1.031e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| map-events-small | equivalent-objective | passed | 7.304e-12 | 2.315e-12 | 2.315e-12 | 7.304e-12 | 5.540e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-regressors-medium | equivalent-objective | passed | 3.086e-3 | 1.054e-4 | 1.907e-4 | 3.130e-3 | 4.650e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
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
| evaluation-linear-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2010 | 13 | 11765 | 23981 |

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
| map-mixed-features-automatic-large | 0 | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | output-first | n/a |
| map-mixed-features-automatic-large | 1 | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | output-first | n/a |
| map-events-small | 0 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-events-small | 1 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-regressors-medium | 0 | 2.268414e+1 | 3.524345e+1 | 1.255931e+1 | output-first | n/a |
| map-regressors-medium | 1 | 2.268414e+1 | 3.524345e+1 | 1.255931e+1 | output-first | n/a |
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

## Output-first investigation flags

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's.

| Case | Run | Quantity | Effect | Python | Effect - Python | Threshold |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| map-mixed-features-automatic-large | 0 | stationarity-residual | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | 1.000e-2 |
| map-mixed-features-automatic-large | 1 | stationarity-residual | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | 1.000e-2 |
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

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-training-duplicates-auto | 96 | 0 | 25 | 8 | 8 | 8 | 128 | samples | 33554432 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | docs/validation/uncertainty.md |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1095 | 26 | 25 | 1460 | 365 | 365 | 1000 | intervals | 67108864 | long-history-v1:piecewise+weekly+yearly+bounded-noise-x20:n=1095:h=365 / 30f02c063165126f62a0964a83fef842d557b54fab6300c692ef69225bb94d41 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-defaults-irregular-intervals-1000 | 192 | 6 | 25 | 240 | 48 | 57 | 1000 | intervals | 67108864 | deterministic-piecewise-weekly-v2:n=192:h=48:irregular=true / 62f195edf2bc788b67f26471e00eee77ec55c61670a7c61be3c23230664418a1 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 96 | 4 | 1 | 8 | 0 | 0 | 128 | intervals | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 96 | 4 | 1 | 1 | 1 | 1 | 128 | samples | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 96 | 6 | 1 | 12 | 8 | 15 | 128 | intervals | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-samples-512 | 96 | 6 | 1 | 12 | 8 | 15 | 512 | samples | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall / exclude | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall / exclude | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.016 | 0.013 | 0.016 | 135.2 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.457 | 0.630 | 0.452 | 0.630 | 146.7 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 170.753 | 178.470 | 168.926 | 178.470 | 153.0 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1588.930 | 1603.141 | 1586.446 | 1603.141 | 146.7 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 158.067 | 158.982 | 157.261 | 158.982 | 153.6 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1564.816 | 1570.754 | 1562.064 | 1570.754 | 146.7 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.957 | 1.005 | 0.918 | 1.005 | 153.6 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.288 | 3.337 | 3.230 | 3.337 | 146.7 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.077 | 0.094 | 0.071 | 0.094 | 153.0 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.520 | 0.554 | 0.518 | 0.554 | 146.7 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.206 | 6.121 | 5.178 | 6.121 | 153.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 26.825 | 27.077 | 26.569 | 27.077 | 146.7 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.571 | 5.884 | 5.478 | 5.884 | 151.0 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.304 | 26.746 | 26.217 | 26.746 | 146.7 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 6.770 | 7.916 | 5.751 | 7.916 | 148.4 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 20.784 | 21.416 | 20.556 | 21.416 | 146.7 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.222 | 0.241 | 0.193 | 0.241 | 148.5 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.314 | 5.564 | 5.283 | 5.564 | 146.7 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.027 | 0.014 | 0.027 | 135.4 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.466 | 0.493 | 0.454 | 0.493 | 124.7 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 180.320 | 195.063 | 172.249 | 195.063 | 153.4 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1419.064 | 1427.374 | 1413.338 | 1427.374 | 124.7 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 157.069 | 160.735 | 154.790 | 160.735 | 153.4 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1415.553 | 1423.015 | 1407.963 | 1423.015 | 124.7 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.433 | 0.539 | 0.390 | 0.539 | 153.4 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.901 | 4.047 | 3.890 | 4.047 | 124.7 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.023 | 0.031 | 0.015 | 0.031 | 153.4 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.695 | 0.709 | 0.676 | 0.709 | 124.7 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.701 | 3.784 | 3.617 | 3.784 | 153.2 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.381 | 23.026 | 22.137 | 23.026 | 124.7 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.857 | 3.989 | 3.787 | 3.989 | 153.0 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.058 | 22.318 | 21.918 | 22.318 | 124.7 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.926 | 8.912 | 4.107 | 8.912 | 144.0 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.263 | 17.604 | 17.190 | 17.604 | 124.7 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.243 | 0.448 | 0.173 | 0.448 | 146.3 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.707 | 4.842 | 4.667 | 4.842 | 124.7 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 135.4 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.441 | 0.492 | 0.433 | 0.492 | 124.7 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 169.895 | 222.888 | 167.549 | 222.888 | 153.1 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1425.629 | 1478.715 | 1419.100 | 1478.715 | 124.7 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.430 | 165.201 | 155.949 | 165.201 | 155.1 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1408.907 | 1415.930 | 1406.371 | 1415.930 | 124.7 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.470 | 0.632 | 0.392 | 0.632 | 153.8 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.864 | 3.955 | 3.812 | 3.955 | 124.7 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.037 | 0.015 | 0.037 | 153.1 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.681 | 0.695 | 0.668 | 0.695 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.112 | 4.353 | 3.982 | 4.353 | 152.9 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.450 | 24.639 | 23.232 | 24.639 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.322 | 4.492 | 4.109 | 4.492 | 152.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 22.981 | 29.462 | 22.825 | 29.462 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.180 | 6.458 | 4.551 | 6.458 | 144.1 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.228 | 19.319 | 18.032 | 19.319 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.188 | 0.202 | 0.182 | 0.202 | 146.6 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.691 | 4.716 | 4.651 | 4.716 | 124.7 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.023 | 0.013 | 0.023 | 137.4 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.495 | 0.450 | 0.495 | 146.9 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 168.254 | 171.780 | 167.300 | 171.780 | 153.9 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1590.159 | 1641.158 | 1586.181 | 1641.158 | 146.9 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 160.031 | 291.158 | 156.818 | 291.158 | 154.4 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1572.061 | 1582.261 | 1567.877 | 1582.261 | 146.9 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.872 | 0.995 | 0.774 | 0.995 | 154.4 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.846 | 3.913 | 3.835 | 3.913 | 146.9 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.091 | 0.103 | 0.082 | 0.103 | 153.9 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.661 | 0.676 | 0.655 | 0.676 | 146.9 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.521 | 5.380 | 4.460 | 5.380 | 153.9 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.561 | 26.776 | 26.409 | 26.776 | 146.9 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.730 | 5.108 | 4.624 | 5.108 | 151.9 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 26.160 | 26.802 | 25.677 | 26.802 | 146.9 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.907 | 6.816 | 5.024 | 6.816 | 151.4 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.459 | 20.693 | 20.223 | 20.693 | 146.9 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.220 | 0.234 | 0.206 | 0.234 | 151.4 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.549 | 5.717 | 5.421 | 5.717 | 146.9 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.049 | 0.013 | 0.049 | 138.0 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.452 | 0.487 | 0.438 | 0.487 | 147.9 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 172.822 | 177.250 | 170.237 | 177.250 | 152.7 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1589.150 | 1604.387 | 1581.959 | 1604.387 | 147.9 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.639 | 171.038 | 156.143 | 171.038 | 155.2 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1578.830 | 1614.094 | 1571.661 | 1614.094 | 147.9 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 1.021 | 1.073 | 1.014 | 1.073 | 154.9 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.920 | 4.168 | 3.865 | 4.168 | 147.9 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.089 | 0.101 | 0.083 | 0.101 | 152.7 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.667 | 0.698 | 0.649 | 0.698 | 147.9 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.890 | 5.863 | 4.741 | 5.863 | 152.6 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.391 | 29.047 | 27.112 | 29.047 | 147.9 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 5.056 | 5.537 | 4.952 | 5.537 | 151.0 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 26.819 | 26.937 | 26.343 | 26.937 | 147.9 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 6.281 | 6.993 | 5.307 | 6.993 | 150.2 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.222 | 21.545 | 21.193 | 21.545 | 147.9 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.234 | 0.309 | 0.225 | 0.309 | 150.4 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.532 | 5.636 | 5.456 | 5.636 | 147.9 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 5.982 | 6.217 | 5.940 | 6.217 | 157.5 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 29.220 | 29.296 | 28.963 | 29.296 | 124.7 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.196 | 0.205 | 0.187 | 0.205 | 160.7 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 124.7 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.241 | 0.257 | 0.239 | 0.257 | 160.2 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.010 | 0.008 | 0.010 | 124.7 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 20.277 | 25.252 | 19.980 | 25.252 | 156.8 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 147.967 | 149.921 | 147.404 | 149.921 | 124.7 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.282 | 12.066 | 9.079 | 12.066 | 145.2 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 75.359 | 76.305 | 74.542 | 76.305 | 124.7 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 178.995 | 180.895 | 176.954 | 180.895 | 156.5 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1463.722 | 1514.011 | 1454.524 | 1514.011 | 124.7 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.113 | 2.434 | 1.006 | 2.434 | 156.3 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.085 | 1.088 | 1.053 | 1.088 | 124.7 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.011 | 0.019 | 0.010 | 0.019 | 126.3 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.373 | 0.430 | 0.361 | 0.430 | 124.7 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.187 | 0.214 | 0.183 | 0.214 | 149.5 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.206 | 5.290 | 5.190 | 5.290 | 124.7 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.014 | 1.171 | 0.931 | 1.171 | 130.8 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.615 | 0.668 | 0.603 | 0.668 | 124.7 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 8.917 | 9.212 | 8.849 | 9.212 | 146.2 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 69.947 | 74.479 | 69.704 | 74.479 | 124.7 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.082 | 6.301 | 5.896 | 6.301 | 158.0 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.852 | 31.481 | 29.331 | 31.481 | 124.7 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.200 | 0.206 | 0.193 | 0.206 | 160.6 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 124.7 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.226 | 0.239 | 0.209 | 0.239 | 160.4 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 124.7 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.218 | 22.274 | 19.618 | 22.274 | 157.4 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 146.018 | 147.914 | 145.547 | 147.914 | 124.7 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.542 | 1.681 | 1.511 | 1.681 | 150.3 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.354 | 1.387 | 1.345 | 1.387 | 124.7 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.532 | 3.794 | 3.417 | 3.794 | 157.1 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 21.714 | 21.871 | 21.642 | 21.871 | 124.7 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.933 | 1.160 | 0.928 | 1.160 | 130.1 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.903 | 1.018 | 0.847 | 1.018 | 124.7 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.437 | 7.728 | 5.400 | 7.728 | 144.4 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 51.359 | 52.270 | 50.810 | 52.270 | 124.7 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.194 | 0.205 | 0.191 | 0.205 | 157.5 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.004 | 0.004 | 0.004 | 124.7 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.256 | 0.622 | 0.250 | 0.622 | 157.4 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.007 | 0.010 | 124.7 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.389 | 5.892 | 5.287 | 5.892 | 154.5 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 53.613 | 55.500 | 53.105 | 55.500 | 124.7 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.017 | 0.058 | 0.013 | 0.075 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.561 | 0.578 | 0.539 | 0.588 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.277 | 0.784 | 0.237 | 2.027 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.652 | 2.732 | 2.592 | 2.830 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.029 | 0.031 | 0.029 | 0.031 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.522 | 0.536 | 0.512 | 0.536 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 170.828 | 173.084 | 168.705 | 173.084 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1419.912 | 1427.007 | 1413.819 | 1427.007 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 153.374 | 167.806 | 151.413 | 167.806 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1403.521 | 1409.173 | 1402.294 | 1409.173 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.128 | 0.139 | 0.117 | 0.139 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.250 | 2.496 | 2.210 | 2.496 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.037 | 0.070 | 0.026 | 0.070 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.532 | 0.539 | 0.520 | 0.539 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.230 | 6.569 | 5.983 | 6.569 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.220 | 18.807 | 17.189 | 18.807 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.255 | 7.218 | 6.110 | 7.218 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.307 | 16.903 | 16.209 | 16.903 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.635 | 6.808 | 6.284 | 6.808 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.330 | 13.711 | 13.233 | 13.711 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.335 | 0.375 | 0.331 | 0.375 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.103 | 3.186 | 3.047 | 3.186 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.051 | 0.060 | 0.041 | 0.060 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.548 | 0.563 | 0.532 | 0.563 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 192.140 | 196.639 | 191.254 | 196.639 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1493.634 | 1501.502 | 1490.086 | 1501.502 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 156.968 | 158.619 | 149.085 | 158.619 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1403.472 | 1406.564 | 1400.071 | 1406.564 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.135 | 0.146 | 0.128 | 0.146 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.318 | 2.411 | 2.289 | 2.411 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.031 | 0.074 | 0.024 | 0.074 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.614 | 0.676 | 0.588 | 0.676 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.072 | 26.224 | 24.781 | 26.224 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 89.980 | 95.426 | 89.445 | 95.426 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.379 | 26.504 | 25.170 | 26.504 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 90.645 | 95.468 | 88.923 | 95.468 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 25.957 | 27.898 | 25.714 | 27.898 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 86.422 | 92.722 | 85.367 | 92.722 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.317 | 0.895 | 0.285 | 0.895 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.102 | 3.166 | 3.071 | 3.166 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.008 | 0.006 | 0.008 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.421 | 0.434 | 0.398 | 0.434 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 183.285 | 187.940 | 181.963 | 187.940 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1472.479 | 1508.782 | 1461.931 | 1508.782 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 152.374 | 161.196 | 149.234 | 161.196 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1408.905 | 1427.775 | 1404.153 | 1427.775 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.168 | 0.188 | 0.151 | 0.188 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.005 | 2.083 | 1.981 | 2.083 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.029 | 0.034 | 0.026 | 0.034 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.375 | 0.395 | 0.362 | 0.395 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 19.407 | 19.651 | 19.351 | 19.651 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 63.941 | 64.398 | 63.566 | 64.398 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 19.305 | 19.530 | 19.225 | 19.530 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 64.197 | 65.426 | 63.602 | 65.426 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 19.558 | 19.888 | 19.454 | 19.888 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 60.328 | 61.287 | 59.949 | 61.287 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.207 | 0.229 | 0.183 | 0.229 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.040 | 3.142 | 3.019 | 3.142 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.058 | 0.071 | 0.043 | 0.071 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.512 | 0.529 | 0.506 | 0.529 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 167.197 | 170.529 | 166.616 | 170.529 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1425.130 | 1431.543 | 1421.963 | 1431.543 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 154.752 | 158.918 | 153.567 | 158.918 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1405.635 | 1414.725 | 1403.603 | 1414.725 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.132 | 0.143 | 0.131 | 0.143 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.680 | 3.819 | 3.599 | 3.819 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.037 | 0.031 | 0.037 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.629 | 0.639 | 0.615 | 0.639 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.500 | 4.577 | 4.484 | 4.577 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.730 | 27.998 | 27.659 | 27.998 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.803 | 4.859 | 4.671 | 4.859 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.321 | 29.468 | 26.860 | 29.468 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.098 | 5.339 | 4.774 | 5.339 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.195 | 24.130 | 22.087 | 24.130 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.394 | 0.406 | 0.378 | 0.406 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.638 | 4.693 | 4.634 | 4.693 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.017 | 0.018 | 0.015 | 0.018 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.460 | 0.474 | 0.459 | 0.474 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 169.163 | 195.247 | 166.692 | 195.247 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1431.326 | 1432.683 | 1425.253 | 1432.683 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.486 | 161.758 | 152.662 | 161.758 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1403.457 | 1416.826 | 1401.489 | 1416.826 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.112 | 0.127 | 0.111 | 0.127 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.121 | 2.167 | 2.110 | 2.167 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.027 | 0.019 | 0.027 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.407 | 0.446 | 0.400 | 0.446 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.049 | 5.905 | 4.821 | 5.905 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.734 | 27.211 | 26.704 | 27.211 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.263 | 5.278 | 5.096 | 5.278 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.265 | 26.332 | 26.201 | 26.332 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.137 | 7.425 | 4.775 | 7.425 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.574 | 24.232 | 23.344 | 24.232 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.167 | 0.299 | 0.163 | 0.299 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.076 | 3.106 | 3.057 | 3.106 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.017 | 0.015 | 0.017 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.471 | 0.490 | 0.437 | 0.490 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 169.128 | 170.739 | 164.830 | 170.739 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1425.970 | 1439.672 | 1420.927 | 1439.672 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.080 | 162.245 | 152.184 | 162.245 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1402.712 | 1409.309 | 1400.044 | 1409.309 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.107 | 0.120 | 0.105 | 0.120 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.107 | 2.178 | 2.105 | 2.178 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.029 | 0.017 | 0.029 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.409 | 0.428 | 0.393 | 0.428 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.868 | 5.943 | 4.853 | 5.943 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.674 | 27.183 | 26.450 | 27.183 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.008 | 5.233 | 4.986 | 5.233 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.256 | 26.365 | 25.968 | 26.365 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.266 | 6.722 | 4.649 | 6.722 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.279 | 23.771 | 22.897 | 23.771 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.160 | 0.178 | 0.157 | 0.178 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.024 | 3.065 | 2.994 | 3.065 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.072 | 0.089 | 0.064 | 0.089 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.644 | 0.663 | 0.631 | 0.663 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 166.196 | 171.878 | 164.510 | 171.878 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1413.595 | 1420.005 | 1407.832 | 1420.005 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 154.842 | 162.304 | 153.515 | 162.304 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1405.479 | 1410.775 | 1403.060 | 1410.775 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.101 | 0.125 | 0.092 | 0.125 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.639 | 2.776 | 2.603 | 2.776 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.021 | 0.028 | 0.014 | 0.028 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.608 | 0.637 | 0.601 | 0.637 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.554 | 2.998 | 2.537 | 2.998 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.587 | 16.888 | 16.400 | 16.888 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.718 | 3.234 | 2.586 | 3.234 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.708 | 19.396 | 15.560 | 19.396 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 3.582 | 4.268 | 2.554 | 4.268 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 11.914 | 12.392 | 11.784 | 12.392 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.414 | 0.421 | 0.407 | 0.421 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.813 | 3.876 | 3.778 | 3.876 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.018 | 0.014 | 0.018 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.466 | 0.480 | 0.452 | 0.480 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 167.538 | 169.378 | 166.268 | 169.378 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1435.843 | 1510.084 | 1429.740 | 1510.084 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 152.842 | 162.308 | 151.143 | 162.308 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1419.463 | 1495.027 | 1410.710 | 1495.027 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.169 | 0.193 | 0.141 | 0.193 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.350 | 3.619 | 3.222 | 3.619 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.021 | 0.022 | 0.014 | 0.022 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.599 | 0.646 | 0.591 | 0.646 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.280 | 6.405 | 6.227 | 6.405 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 33.974 | 34.243 | 33.729 | 34.243 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.390 | 7.767 | 6.333 | 7.767 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.428 | 33.856 | 33.090 | 33.856 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 6.489 | 6.661 | 6.411 | 6.661 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.451 | 29.650 | 29.161 | 29.650 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.332 | 0.354 | 0.298 | 0.354 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.228 | 4.262 | 4.200 | 4.262 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.015 | 0.005 | 0.015 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.427 | 0.456 | 0.423 | 0.456 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 159.078 | 161.417 | 155.309 | 161.417 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1419.246 | 1426.387 | 1410.000 | 1426.387 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 148.646 | 149.972 | 147.912 | 149.972 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1403.026 | 1434.999 | 1401.039 | 1434.999 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.112 | 0.132 | 0.084 | 0.132 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 1.994 | 2.055 | 1.942 | 2.055 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.024 | 0.052 | 0.016 | 0.052 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.354 | 0.398 | 0.344 | 0.398 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.618 | 1.777 | 1.537 | 1.777 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.964 | 14.045 | 13.806 | 14.045 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.569 | 1.677 | 1.539 | 1.677 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.290 | 13.606 | 13.052 | 13.606 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.883 | 3.081 | 1.734 | 3.081 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.550 | 10.695 | 10.470 | 10.695 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.194 | 0.206 | 0.182 | 0.206 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.672 | 2.776 | 2.614 | 2.776 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.186 | 0.208 | 0.183 | 0.208 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.117 | 1.142 | 1.104 | 1.142 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 185.893 | 187.767 | 184.325 | 187.767 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1441.993 | 1454.313 | 1440.161 | 1454.313 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 161.369 | 170.943 | 160.764 | 170.943 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1412.371 | 1416.059 | 1410.384 | 1416.059 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.230 | 0.244 | 0.221 | 0.244 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.604 | 5.657 | 5.550 | 5.657 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.024 | 0.032 | 0.022 | 0.032 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.690 | 1.695 | 1.688 | 1.695 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.093 | 11.310 | 11.068 | 11.310 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.452 | 44.799 | 43.953 | 44.799 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.326 | 15.966 | 11.196 | 15.966 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.051 | 43.502 | 43.004 | 43.502 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.503 | 11.777 | 11.460 | 11.777 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.455 | 39.611 | 36.920 | 39.611 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.857 | 0.931 | 0.831 | 0.931 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.144 | 6.278 | 6.100 | 6.278 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.034 | 0.011 | 0.034 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.469 | 0.498 | 0.465 | 0.498 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 162.370 | 164.662 | 161.343 | 164.662 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1418.399 | 1449.929 | 1413.172 | 1449.929 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 150.255 | 151.832 | 148.323 | 151.832 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1406.909 | 1413.301 | 1404.914 | 1413.301 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.161 | 0.198 | 0.138 | 0.198 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.528 | 3.766 | 3.478 | 3.766 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.029 | 0.047 | 0.018 | 0.047 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.596 | 0.616 | 0.582 | 0.616 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.659 | 1.792 | 1.611 | 1.792 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.316 | 16.474 | 16.164 | 16.474 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.623 | 1.634 | 1.506 | 1.634 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.800 | 16.039 | 15.644 | 16.039 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.884 | 2.174 | 1.837 | 2.174 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 10.977 | 11.800 | 10.948 | 11.800 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.143 | 0.168 | 0.124 | 0.168 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.808 | 4.910 | 4.746 | 4.910 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.087 | 0.109 | 0.054 | 0.109 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.663 | 0.687 | 0.637 | 0.687 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 165.910 | 171.050 | 165.119 | 171.050 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1418.725 | 1423.009 | 1411.773 | 1423.009 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 154.641 | 160.865 | 154.304 | 160.865 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1407.009 | 1426.797 | 1406.491 | 1426.797 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.097 | 0.141 | 0.079 | 0.141 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.976 | 3.055 | 2.952 | 3.055 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.026 | 0.035 | 0.015 | 0.035 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.728 | 0.732 | 0.717 | 0.732 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.693 | 3.035 | 2.664 | 3.035 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.502 | 14.728 | 14.195 | 14.728 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.891 | 3.209 | 2.688 | 3.209 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.940 | 14.194 | 13.680 | 14.194 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.802 | 3.170 | 2.605 | 3.170 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.156 | 10.460 | 9.986 | 10.460 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.477 | 0.780 | 0.452 | 0.780 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.570 | 3.661 | 3.555 | 3.661 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.038 | 0.027 | 0.038 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.536 | 0.547 | 0.524 | 0.547 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 152.568 | 154.456 | 150.870 | 154.456 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1403.929 | 1415.295 | 1403.180 | 1415.295 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.093 | 0.115 | 0.089 | 0.115 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.243 | 2.346 | 2.238 | 2.346 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.014 | 0.294 | 0.014 | 0.294 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.511 | 0.538 | 0.495 | 0.538 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.353 | 1.963 | 1.268 | 1.963 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.584 | 13.601 | 11.532 | 13.601 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.447 | 1.986 | 1.362 | 1.986 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 10.989 | 11.095 | 10.904 | 11.095 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 1.874 | 2.122 | 1.646 | 2.122 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 7.898 | 7.989 | 7.877 | 7.989 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.339 | 0.357 | 0.320 | 0.357 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.082 | 3.150 | 3.042 | 3.150 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 154.136 | 156.316 | 150.748 | 156.316 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1406.497 | 1413.169 | 1405.960 | 1413.169 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.220 | 0.251 | 0.216 | 0.251 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.462 | 2.481 | 2.445 | 2.481 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.025 | 0.026 | 0.022 | 0.026 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.466 | 0.468 | 0.431 | 0.468 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.321 | 34.371 | 32.250 | 34.371 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 111.572 | 112.620 | 110.619 | 112.620 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.247 | 0.272 | 0.243 | 0.272 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.461 | 3.632 | 3.402 | 3.632 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 154.986 | 156.444 | 152.267 | 156.444 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1407.293 | 1428.916 | 1399.651 | 1428.916 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.172 | 0.194 | 0.162 | 0.194 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.058 | 2.100 | 2.002 | 2.100 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.019 | 0.032 | 0.018 | 0.032 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.392 | 0.399 | 0.384 | 0.399 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 25.179 | 26.600 | 24.775 | 26.600 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 83.752 | 85.145 | 83.319 | 85.145 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.135 | 0.162 | 0.133 | 0.162 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.639 | 2.769 | 2.585 | 2.769 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 156.207 | 164.231 | 154.678 | 164.231 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1405.128 | 1409.666 | 1398.319 | 1409.666 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.133 | 0.139 | 0.133 | 0.139 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.007 | 2.039 | 1.975 | 2.039 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.018 | 0.024 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.377 | 0.401 | 0.376 | 0.401 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.511 | 3.846 | 3.356 | 3.846 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.616 | 20.141 | 19.453 | 20.141 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.141 | 0.161 | 0.138 | 0.161 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.648 | 2.673 | 2.642 | 2.673 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.682 | 168.031 | 156.599 | 168.031 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1402.731 | 1414.969 | 1400.280 | 1414.969 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.163 | 0.165 | 0.153 | 0.165 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.098 | 2.162 | 2.051 | 2.162 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.018 | 0.033 | 0.018 | 0.033 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.428 | 0.445 | 0.402 | 0.445 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.679 | 31.709 | 30.626 | 31.709 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 107.445 | 116.325 | 106.534 | 116.325 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.164 | 0.266 | 0.139 | 0.266 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.722 | 2.812 | 2.677 | 2.812 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 155.825 | 231.053 | 152.764 | 231.053 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1402.786 | 1420.698 | 1402.050 | 1420.698 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.163 | 0.240 | 0.158 | 0.240 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.031 | 2.050 | 2.024 | 2.050 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.023 | 0.037 | 0.017 | 0.037 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.386 | 0.399 | 0.379 | 0.399 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.797 | 4.266 | 3.601 | 4.266 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.690 | 20.816 | 19.983 | 20.816 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.143 | 0.196 | 0.130 | 0.196 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.642 | 2.726 | 2.607 | 2.726 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 162.967 | 173.502 | 152.941 | 173.502 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1426.582 | 1594.606 | 1413.314 | 1594.606 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.150 | 0.160 | 0.147 | 0.160 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.041 | 2.131 | 2.023 | 2.131 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.020 | 0.027 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.412 | 0.424 | 0.390 | 0.424 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 30.089 | 30.529 | 29.747 | 30.529 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 106.819 | 108.286 | 105.558 | 108.286 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.166 | 0.243 | 0.160 | 0.243 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.615 | 2.849 | 2.613 | 2.849 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 159.400 | 173.748 | 156.489 | 173.748 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1398.657 | 1412.849 | 1396.942 | 1412.849 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.128 | 0.134 | 0.126 | 0.134 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.043 | 2.111 | 2.000 | 2.111 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.020 | 0.026 | 0.019 | 0.026 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.386 | 0.422 | 0.376 | 0.422 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.926 | 4.169 | 3.735 | 4.169 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 20.314 | 21.160 | 20.070 | 21.160 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.127 | 0.236 | 0.126 | 0.236 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.705 | 2.769 | 2.665 | 2.769 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 183.906 | 185.835 | 183.245 | 185.835 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1566.796 | 1575.460 | 1565.192 | 1575.460 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.114 | 173.872 | 168.602 | 173.872 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1554.239 | 1567.007 | 1552.236 | 1567.007 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.167 | 0.398 | 0.155 | 0.398 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.249 | 2.303 | 2.197 | 2.303 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.019 | 0.029 | 0.017 | 0.029 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.528 | 0.549 | 0.503 | 0.549 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.056 | 0.064 | 0.046 | 0.064 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.585 | 0.645 | 0.542 | 0.645 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 12.005 | 12.895 | 11.827 | 12.895 | 148.5 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 154.216 | 167.406 | 152.665 | 167.406 | 126.2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 344.620 | 345.680 | 343.353 | 345.680 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2085.255 | 2097.840 | 2072.685 | 2097.840 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 238.669 | 245.429 | 237.943 | 245.429 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1772.430 | 1781.005 | 1767.642 | 1781.005 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.239 | 0.277 | 0.218 | 0.277 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.511 | 3.685 | 3.438 | 3.685 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.023 | 0.031 | 0.018 | 0.031 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.394 | 1.403 | 1.385 | 1.403 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.053 | 0.064 | 0.049 | 0.064 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.413 | 1.431 | 1.388 | 1.431 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 68.411 | 69.160 | 68.119 | 69.160 | 155.0 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 369.274 | 379.033 | 366.916 | 379.033 | 162.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 170.798 | 173.546 | 168.804 | 173.546 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1432.837 | 1451.642 | 1422.745 | 1451.642 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.204 | 160.360 | 155.660 | 160.360 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1421.768 | 1495.154 | 1403.824 | 1495.154 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.224 | 0.348 | 0.201 | 0.348 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.642 | 3.945 | 3.582 | 3.945 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.033 | 0.018 | 0.033 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.629 | 0.669 | 0.597 | 0.669 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.062 | 0.040 | 0.062 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.502 | 0.521 | 0.495 | 0.521 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.439 | 0.465 | 0.397 | 0.465 | 141.5 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 24.427 | 36.182 | 24.354 | 36.182 | 124.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 169.708 | 173.367 | 168.777 | 173.367 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1471.483 | 1477.499 | 1468.640 | 1477.499 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.151 | 155.812 | 154.768 | 155.812 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1452.046 | 1462.853 | 1449.042 | 1462.853 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.226 | 0.265 | 0.219 | 0.265 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.459 | 3.645 | 3.419 | 3.645 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.038 | 0.020 | 0.038 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.621 | 0.629 | 0.586 | 0.629 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.049 | 0.060 | 0.041 | 0.060 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.489 | 0.500 | 0.488 | 0.500 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.713 | 1.651 | 0.651 | 1.651 | 141.3 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 67.364 | 69.444 | 66.368 | 69.444 | 124.7 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 170.328 | 177.616 | 169.946 | 177.616 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1427.436 | 1431.524 | 1425.930 | 1431.524 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.846 | 160.016 | 150.949 | 160.016 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1408.755 | 1439.661 | 1407.710 | 1439.661 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.154 | 0.239 | 0.132 | 0.239 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.136 | 2.414 | 2.090 | 2.414 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.018 | 0.036 | 0.017 | 0.036 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.389 | 0.412 | 0.383 | 0.412 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.018 | 0.012 | 0.018 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.443 | 0.483 | 0.421 | 0.483 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.325 | 1.595 | 0.311 | 1.595 | 135.4 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.331 | 19.683 | 19.245 | 19.683 | 124.7 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 168.026 | 173.687 | 165.299 | 173.687 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1422.951 | 1440.577 | 1420.269 | 1440.577 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.312 | 154.346 | 150.524 | 154.346 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1397.267 | 1412.989 | 1395.195 | 1412.989 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.152 | 0.180 | 0.129 | 0.180 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.099 | 2.351 | 2.052 | 2.351 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.025 | 0.017 | 0.025 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.396 | 0.421 | 0.393 | 0.421 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.031 | 0.013 | 0.031 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.441 | 0.461 | 0.434 | 0.461 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.217 | 0.247 | 0.185 | 0.247 | 135.7 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.357 | 16.669 | 16.318 | 16.669 | 124.7 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 152.891 | 153.332 | 152.819 | 153.332 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1420.582 | 1426.444 | 1419.814 | 1426.444 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.383 | 0.504 | 0.383 | 0.504 | 137.6 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.761 | 16.847 | 16.749 | 16.847 | 124.7 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:34:05 - cmdstanpy - INFO - Chain [1] start processing<br>04:34:05 - cmdstanpy - INFO - Chain [1] done processing<br>04:34:05 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=74779 data file=/tmp/tmpcr7blttd/3jq54ocu.json init=/tmp/tmpcr7blttd/mcv_jwdm.json output file=/tmp/tmpcr7blttd/prophet_modelc3kwx4md/prophet_model-20261015043405.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpcr7blttd/3jq54ocu.json<br>init = /tmp/tmpcr7blttd/mcv_jwdm.json<br>random<br>  seed = 74779<br>output<br>  file = /tmp/tmpcr7blttd/prophet_modelc3kwx4md/prophet_model-20261015043405.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1237, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1214, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 980, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 772, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 270, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 227, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=74779 data file=/tmp/tmpcr7blttd/3jq54ocu.json init=/tmp/tmpcr7blttd/mcv_jwdm.json output file=/tmp/tmpcr7blttd/prophet_modelc3kwx4md/prophet_model-20261015043405.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpcr7bltt |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:34:06 - cmdstanpy - INFO - Chain [1] start processing<br>04:34:06 - cmdstanpy - INFO - Chain [1] done processing<br>04:34:06 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=97070 data file=/tmp/tmprva0ko00/b8bqymq5.json init=/tmp/tmprva0ko00/rfis2299.json output file=/tmp/tmprva0ko00/prophet_modelutdsm5ku/prophet_model-20261015043406.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmprva0ko00/b8bqymq5.json<br>init = /tmp/tmprva0ko00/rfis2299.json<br>random<br>  seed = 97070<br>output<br>  file = /tmp/tmprva0ko00/prophet_modelutdsm5ku/prophet_model-20261015043406.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1237, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1214, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 980, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 772, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 270, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 227, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=97070 data file=/tmp/tmprva0ko00/b8bqymq5.json init=/tmp/tmprva0ko00/rfis2299.json output file=/tmp/tmprva0ko00/prophet_modelutdsm5ku/prophet_model-20261015043406.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmprva0ko0 |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1237, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1214, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 980, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 775, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 377, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1237, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1214, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 980, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 775, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 377, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `3495187941a358227641e3c27fd1dc6602b1f96f`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`
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

