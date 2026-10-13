# Effect Prophet benchmark — 2026-10-13T175256-063Z-4f5ffaf9

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
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.134 | 6.502 | 6.079 | 6.502 | 156.2 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 29.694 | 32.471 | 29.537 | 32.471 | 123.8 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.206 | 0.243 | 0.184 | 0.243 | 156.9 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.005 | 0.004 | 0.005 | 123.8 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.223 | 0.237 | 0.216 | 0.237 | 156.3 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 123.8 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 19.679 | 23.660 | 19.420 | 23.660 | 153.2 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 149.500 | 151.509 | 148.332 | 151.509 | 123.8 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.913 | 11.831 | 9.612 | 11.831 | 142.3 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 76.792 | 77.490 | 75.889 | 77.490 | 123.8 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 173.567 | 180.742 | 172.820 | 180.742 | 154.7 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1475.625 | 1487.009 | 1471.865 | 1487.009 | 123.8 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.013 | 1.037 | 0.982 | 1.037 | 154.5 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.096 | 1.135 | 1.058 | 1.135 | 123.8 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.009 | 0.013 | 0.009 | 0.013 | 126.4 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.380 | 0.445 | 0.361 | 0.445 | 123.8 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.195 | 0.243 | 0.184 | 0.243 | 149.0 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.270 | 5.294 | 5.250 | 5.294 | 123.8 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.009 | 1.154 | 0.946 | 1.154 | 130.9 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.629 | 0.675 | 0.629 | 0.675 | 123.8 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.212 | 9.480 | 9.118 | 9.480 | 145.8 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 71.118 | 73.332 | 70.706 | 73.332 | 123.8 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 5.814 | 6.187 | 5.801 | 6.187 | 156.4 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.694 | 29.752 | 29.361 | 29.752 | 123.8 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.193 | 0.199 | 0.186 | 0.199 | 157.4 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 123.8 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.214 | 0.226 | 0.208 | 0.226 | 157.3 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 123.8 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 18.154 | 22.594 | 18.041 | 22.594 | 154.0 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 148.007 | 148.754 | 147.540 | 148.754 | 123.8 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.402 | 1.827 | 1.345 | 1.827 | 151.4 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.354 | 1.367 | 1.348 | 1.367 | 123.8 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.448 | 3.722 | 3.364 | 3.722 | 155.4 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 21.460 | 21.678 | 21.333 | 21.678 | 123.8 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.993 | 1.099 | 0.956 | 1.099 | 132.3 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.918 | 1.008 | 0.900 | 1.008 | 123.8 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.435 | 5.867 | 5.229 | 5.867 | 145.7 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 50.821 | 51.252 | 50.250 | 51.252 | 123.8 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.200 | 0.206 | 0.189 | 0.206 | 156.2 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.004 | 0.004 | 0.004 | 123.8 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.230 | 0.246 | 0.221 | 0.246 | 156.1 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.007 | 0.009 | 0.007 | 0.009 | 123.8 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.253 | 5.710 | 5.239 | 5.710 | 154.9 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 51.959 | 53.017 | 51.953 | 53.017 | 123.8 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.017 | 0.055 | 0.012 | 0.059 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.559 | 0.584 | 0.529 | 0.616 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.408 | 0.504 | 0.317 | 0.582 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.570 | 2.624 | 2.529 | 2.638 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.027 | 0.038 | 0.026 | 0.038 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.527 | 0.566 | 0.503 | 0.566 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 165.713 | 167.283 | 163.179 | 167.283 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1414.018 | 1423.586 | 1411.025 | 1423.586 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 150.779 | 153.644 | 149.541 | 153.644 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1405.613 | 1405.911 | 1403.012 | 1405.911 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.109 | 0.169 | 0.089 | 0.169 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.234 | 2.333 | 2.185 | 2.333 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.055 | 0.073 | 0.050 | 0.073 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.516 | 0.527 | 0.514 | 0.527 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.015 | 6.099 | 5.978 | 6.099 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.220 | 17.425 | 17.172 | 17.425 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.202 | 6.331 | 6.133 | 6.331 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.285 | 17.187 | 16.160 | 17.187 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.691 | 6.850 | 6.601 | 6.850 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.366 | 13.629 | 13.123 | 13.629 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.402 | 1.537 | 0.288 | 1.537 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.071 | 3.245 | 2.964 | 3.245 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.045 | 0.028 | 0.045 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.533 | 0.555 | 0.514 | 0.555 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 185.342 | 192.652 | 184.006 | 192.652 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1490.883 | 1506.896 | 1484.606 | 1506.896 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 151.789 | 153.413 | 150.663 | 153.413 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1407.925 | 1409.870 | 1400.044 | 1409.870 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.112 | 0.159 | 0.087 | 0.159 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.350 | 2.432 | 2.309 | 2.432 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.050 | 0.184 | 0.048 | 0.184 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.554 | 0.588 | 0.553 | 0.588 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.584 | 25.716 | 24.956 | 25.716 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 89.020 | 94.662 | 88.413 | 94.662 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.365 | 26.305 | 25.283 | 26.305 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 89.032 | 93.555 | 88.443 | 93.555 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.552 | 28.671 | 25.743 | 28.671 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 85.963 | 92.463 | 84.994 | 92.463 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.340 | 0.386 | 0.324 | 0.386 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.081 | 3.211 | 3.049 | 3.211 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.008 | 0.006 | 0.008 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.417 | 0.445 | 0.388 | 0.445 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 180.178 | 188.957 | 179.574 | 188.957 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1465.165 | 1489.363 | 1458.686 | 1489.363 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 147.500 | 155.859 | 146.719 | 155.859 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1408.122 | 1418.523 | 1403.812 | 1418.523 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.130 | 0.152 | 0.109 | 0.152 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.019 | 2.110 | 2.006 | 2.110 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.068 | 0.087 | 0.060 | 0.087 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.350 | 0.368 | 0.344 | 0.368 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 19.445 | 19.606 | 19.299 | 19.606 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 63.794 | 65.226 | 63.398 | 65.226 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 19.530 | 19.810 | 19.490 | 19.810 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 63.289 | 65.083 | 63.145 | 65.083 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 19.483 | 19.586 | 19.436 | 19.586 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 60.134 | 61.209 | 59.705 | 61.209 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.211 | 0.223 | 0.206 | 0.223 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.086 | 3.156 | 3.058 | 3.156 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.050 | 0.069 | 0.044 | 0.069 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.500 | 0.516 | 0.499 | 0.516 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 164.988 | 170.600 | 164.552 | 170.600 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1428.149 | 1432.236 | 1426.131 | 1432.236 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 154.780 | 155.971 | 154.092 | 155.971 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1407.477 | 1416.449 | 1406.444 | 1416.449 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.102 | 0.122 | 0.100 | 0.122 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.631 | 3.710 | 3.533 | 3.710 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.067 | 0.073 | 0.067 | 0.073 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.623 | 0.630 | 0.606 | 0.630 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.572 | 4.898 | 4.478 | 4.898 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.674 | 28.285 | 27.642 | 28.285 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.591 | 4.808 | 4.589 | 4.808 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.020 | 27.236 | 26.772 | 27.236 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.070 | 5.172 | 4.967 | 5.172 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.239 | 22.942 | 21.796 | 22.942 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.461 | 0.586 | 0.448 | 0.586 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.663 | 4.733 | 4.630 | 4.733 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.017 | 0.015 | 0.017 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.433 | 0.470 | 0.433 | 0.470 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 166.791 | 168.476 | 166.072 | 168.476 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1423.975 | 1465.161 | 1423.713 | 1465.161 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 149.240 | 154.797 | 147.165 | 154.797 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1417.083 | 1418.334 | 1412.817 | 1418.334 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.084 | 0.098 | 0.070 | 0.098 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.103 | 2.165 | 2.075 | 2.165 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.039 | 0.079 | 0.036 | 0.079 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.406 | 0.425 | 0.403 | 0.425 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.529 | 5.897 | 4.451 | 5.897 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.482 | 27.501 | 26.347 | 27.501 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.098 | 5.291 | 4.985 | 5.291 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.029 | 26.486 | 25.935 | 26.486 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 4.737 | 4.880 | 4.668 | 4.880 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.371 | 23.801 | 23.059 | 23.801 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.208 | 0.214 | 0.193 | 0.214 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.005 | 3.040 | 2.957 | 3.040 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.016 | 0.014 | 0.016 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.440 | 0.455 | 0.439 | 0.455 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 164.985 | 170.801 | 164.143 | 170.801 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1431.976 | 1460.604 | 1420.550 | 1460.604 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 150.936 | 152.402 | 150.332 | 152.402 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1405.720 | 1414.502 | 1405.052 | 1414.502 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.065 | 0.079 | 0.062 | 0.079 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.127 | 2.320 | 2.101 | 2.320 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.044 | 0.063 | 0.037 | 0.063 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.411 | 0.482 | 0.404 | 0.482 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.546 | 6.047 | 4.476 | 6.047 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.231 | 26.391 | 26.129 | 26.391 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.002 | 5.169 | 4.988 | 5.169 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 25.866 | 26.046 | 25.725 | 26.046 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 4.743 | 6.420 | 4.676 | 6.420 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.012 | 24.994 | 22.862 | 24.994 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.204 | 0.280 | 0.195 | 0.280 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.034 | 3.084 | 3.010 | 3.084 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.072 | 0.082 | 0.062 | 0.082 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.643 | 0.657 | 0.602 | 0.657 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 162.615 | 163.955 | 158.446 | 163.955 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1418.262 | 1484.881 | 1416.936 | 1484.881 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 152.946 | 154.314 | 151.845 | 154.314 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1414.054 | 1434.328 | 1405.751 | 1434.328 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.078 | 0.105 | 0.067 | 0.105 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.619 | 2.749 | 2.597 | 2.749 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.046 | 0.055 | 0.039 | 0.055 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.620 | 0.648 | 0.607 | 0.648 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.463 | 2.868 | 2.389 | 2.868 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.026 | 16.418 | 15.932 | 16.418 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.646 | 2.784 | 2.494 | 2.784 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.487 | 15.612 | 15.226 | 15.612 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.574 | 4.572 | 2.455 | 4.572 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 11.744 | 11.942 | 11.652 | 11.942 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.439 | 0.460 | 0.420 | 0.460 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.760 | 3.969 | 3.750 | 3.969 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.018 | 0.014 | 0.018 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.445 | 0.458 | 0.439 | 0.458 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 172.234 | 180.153 | 166.370 | 180.153 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1434.755 | 1469.625 | 1425.557 | 1469.625 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 152.770 | 161.459 | 150.975 | 161.459 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1402.629 | 1410.181 | 1397.210 | 1410.181 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.155 | 0.194 | 0.120 | 0.194 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.296 | 7.414 | 3.188 | 7.414 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.081 | 0.086 | 0.066 | 0.086 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.578 | 0.598 | 0.570 | 0.598 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.500 | 6.710 | 6.289 | 6.710 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 33.598 | 34.373 | 33.211 | 34.373 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.445 | 6.556 | 6.393 | 6.556 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 32.974 | 33.492 | 32.873 | 33.492 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 6.976 | 7.075 | 6.698 | 7.075 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 28.976 | 29.471 | 28.499 | 29.471 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.450 | 0.572 | 0.422 | 0.572 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.310 | 5.830 | 4.214 | 5.830 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.006 | 0.005 | 0.006 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.439 | 0.497 | 0.408 | 0.497 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 154.877 | 157.266 | 153.246 | 157.266 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1401.510 | 1403.760 | 1397.708 | 1403.760 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 147.304 | 150.180 | 146.288 | 150.180 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1391.007 | 1394.828 | 1389.152 | 1394.828 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.069 | 0.077 | 0.067 | 0.077 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 1.926 | 2.033 | 1.920 | 2.033 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.041 | 0.058 | 0.040 | 0.058 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.331 | 0.353 | 0.318 | 0.353 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.641 | 1.713 | 1.589 | 1.713 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.602 | 13.928 | 13.341 | 13.928 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.559 | 1.734 | 1.505 | 1.734 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 12.899 | 13.320 | 12.770 | 13.320 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.780 | 1.881 | 1.700 | 1.881 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.483 | 10.803 | 10.214 | 10.803 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.194 | 0.242 | 0.159 | 0.242 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.592 | 2.672 | 2.558 | 2.672 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.192 | 0.611 | 0.189 | 0.611 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.114 | 1.125 | 1.088 | 1.125 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 189.547 | 203.793 | 187.111 | 203.793 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1429.978 | 1434.451 | 1428.327 | 1434.451 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 164.220 | 174.453 | 161.672 | 174.453 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1395.415 | 1558.860 | 1395.153 | 1558.860 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.230 | 0.236 | 0.209 | 0.236 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.581 | 5.625 | 5.533 | 5.625 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.087 | 0.109 | 0.086 | 0.109 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.680 | 1.695 | 1.664 | 1.695 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.630 | 12.459 | 11.486 | 12.459 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 43.625 | 44.492 | 43.437 | 44.492 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 12.267 | 17.352 | 12.150 | 17.352 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 42.317 | 44.639 | 42.303 | 44.639 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.994 | 12.121 | 11.828 | 12.121 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 36.415 | 37.015 | 36.239 | 37.015 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 1.047 | 1.207 | 1.034 | 1.207 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.021 | 6.146 | 6.017 | 6.146 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.011 | 0.018 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.489 | 0.419 | 0.489 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 187.798 | 200.764 | 180.294 | 200.764 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1399.396 | 1408.915 | 1396.564 | 1408.915 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 162.879 | 223.353 | 152.550 | 223.353 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1392.438 | 1412.726 | 1389.774 | 1412.726 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.118 | 0.178 | 0.111 | 0.178 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.455 | 3.635 | 3.431 | 3.635 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.074 | 0.102 | 0.055 | 0.102 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.573 | 0.601 | 0.563 | 0.601 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.741 | 2.332 | 1.673 | 2.332 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.075 | 19.459 | 16.003 | 19.459 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.830 | 2.467 | 1.691 | 2.467 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.418 | 15.762 | 15.333 | 15.762 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 2.091 | 4.049 | 1.709 | 4.049 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 10.615 | 11.087 | 10.452 | 11.087 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.242 | 0.319 | 0.168 | 0.319 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.740 | 4.782 | 4.676 | 4.782 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.106 | 0.127 | 0.094 | 0.127 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.678 | 0.694 | 0.645 | 0.694 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 164.137 | 167.179 | 162.310 | 167.179 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1456.996 | 1492.905 | 1420.809 | 1492.905 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 154.787 | 157.547 | 153.181 | 157.547 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1410.076 | 1491.666 | 1405.065 | 1491.666 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.082 | 0.112 | 0.072 | 0.112 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.022 | 3.209 | 2.935 | 3.209 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.049 | 0.051 | 0.045 | 0.051 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.729 | 0.765 | 0.719 | 0.765 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.752 | 3.512 | 2.588 | 3.512 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.689 | 15.838 | 14.369 | 15.838 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.809 | 3.216 | 2.580 | 3.216 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 14.297 | 14.968 | 13.618 | 14.968 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.698 | 3.316 | 2.562 | 3.316 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.511 | 12.046 | 10.030 | 12.046 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.538 | 0.681 | 0.504 | 0.681 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.672 | 3.816 | 3.580 | 3.816 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.029 | 0.034 | 0.029 | 0.034 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.517 | 0.547 | 0.510 | 0.547 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 151.167 | 180.831 | 147.995 | 180.831 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1389.986 | 1401.539 | 1386.476 | 1401.539 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.072 | 0.088 | 0.056 | 0.088 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.216 | 2.264 | 2.173 | 2.264 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.035 | 0.046 | 0.033 | 0.046 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.510 | 0.529 | 0.504 | 0.529 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.251 | 1.415 | 1.186 | 1.415 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.263 | 11.422 | 11.207 | 11.422 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.543 | 2.386 | 1.311 | 2.386 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 10.727 | 10.882 | 10.614 | 10.882 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 1.879 | 3.104 | 1.559 | 3.104 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 7.640 | 8.011 | 7.598 | 8.011 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.377 | 1.756 | 0.314 | 1.756 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 2.999 | 3.256 | 2.948 | 3.256 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 153.382 | 157.888 | 150.333 | 157.888 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1404.384 | 1406.531 | 1403.645 | 1406.531 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.208 | 0.345 | 0.158 | 0.345 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.451 | 2.498 | 2.397 | 2.498 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.079 | 0.095 | 0.078 | 0.095 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.438 | 0.448 | 0.435 | 0.448 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 30.748 | 33.046 | 30.453 | 33.046 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 110.189 | 110.468 | 109.279 | 110.468 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.325 | 0.349 | 0.322 | 0.349 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.418 | 3.554 | 3.398 | 3.554 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 148.680 | 152.498 | 147.434 | 152.498 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1402.301 | 1416.143 | 1399.894 | 1416.143 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.158 | 0.202 | 0.150 | 0.202 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.002 | 2.033 | 1.982 | 2.033 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.047 | 0.051 | 0.046 | 0.051 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.409 | 0.424 | 0.403 | 0.424 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 24.703 | 25.755 | 24.615 | 25.755 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 83.542 | 85.384 | 83.094 | 85.384 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.228 | 0.274 | 0.191 | 0.274 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.659 | 2.709 | 2.629 | 2.709 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 150.677 | 151.629 | 149.799 | 151.629 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1400.636 | 1406.394 | 1396.394 | 1406.394 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.117 | 0.121 | 0.112 | 0.121 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.021 | 2.035 | 1.973 | 2.035 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.037 | 0.043 | 0.032 | 0.043 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.389 | 0.404 | 0.385 | 0.404 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.633 | 4.992 | 3.368 | 4.992 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.641 | 20.213 | 19.566 | 20.213 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.185 | 0.273 | 0.181 | 0.273 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.621 | 2.647 | 2.597 | 2.647 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 149.926 | 152.595 | 149.825 | 152.595 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1400.820 | 1420.482 | 1400.259 | 1420.482 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.176 | 0.196 | 0.152 | 0.196 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.041 | 2.117 | 2.017 | 2.117 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.048 | 0.049 | 0.046 | 0.049 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.413 | 0.434 | 0.400 | 0.434 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.545 | 31.070 | 29.370 | 31.070 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 106.807 | 107.199 | 105.714 | 107.199 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.226 | 0.263 | 0.181 | 0.263 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.573 | 2.790 | 2.559 | 2.790 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 151.998 | 157.933 | 148.303 | 157.933 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1404.663 | 1407.578 | 1403.287 | 1407.578 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.114 | 0.128 | 0.113 | 0.128 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.006 | 2.036 | 1.990 | 2.036 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.036 | 0.041 | 0.035 | 0.041 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.386 | 0.416 | 0.383 | 0.416 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.720 | 4.939 | 3.630 | 4.939 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.512 | 20.994 | 20.394 | 20.994 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.180 | 0.243 | 0.178 | 0.243 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.652 | 2.681 | 2.611 | 2.681 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 150.952 | 152.639 | 150.632 | 152.639 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1405.141 | 1433.957 | 1400.561 | 1433.957 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.146 | 0.198 | 0.145 | 0.198 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.032 | 2.138 | 2.028 | 2.138 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.049 | 0.057 | 0.047 | 0.057 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.410 | 0.432 | 0.403 | 0.432 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 29.628 | 30.573 | 29.460 | 30.573 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 105.410 | 107.520 | 104.964 | 107.520 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.200 | 0.270 | 0.194 | 0.270 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.612 | 2.746 | 2.597 | 2.746 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 147.526 | 152.058 | 147.358 | 152.058 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1402.114 | 1412.225 | 1399.383 | 1412.225 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.096 | 0.123 | 0.095 | 0.123 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.014 | 2.072 | 1.974 | 2.072 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.036 | 0.038 | 0.036 | 0.038 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.396 | 0.408 | 0.386 | 0.408 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.976 | 4.924 | 3.767 | 4.924 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 20.264 | 20.702 | 19.979 | 20.702 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.176 | 0.382 | 0.170 | 0.382 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.685 | 2.731 | 2.677 | 2.731 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 179.765 | 184.820 | 178.996 | 184.820 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1583.000 | 1599.118 | 1578.287 | 1599.118 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.682 | 172.362 | 165.515 | 172.362 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1574.545 | 1584.275 | 1571.427 | 1584.275 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.163 | 0.178 | 0.134 | 0.178 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.225 | 2.340 | 2.206 | 2.340 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.062 | 0.072 | 0.061 | 0.072 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.534 | 0.549 | 0.515 | 0.549 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.051 | 0.037 | 0.051 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.593 | 0.609 | 0.588 | 0.609 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 12.268 | 12.895 | 11.817 | 12.895 | 147.4 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 154.950 | 166.603 | 154.567 | 166.603 | 125.9 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 340.149 | 344.796 | 338.668 | 344.796 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2101.293 | 2165.810 | 2083.174 | 2165.810 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 236.685 | 240.861 | 236.158 | 240.861 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1791.543 | 1802.448 | 1776.762 | 1802.448 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.203 | 0.309 | 0.180 | 0.309 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.503 | 3.677 | 3.398 | 3.677 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.082 | 0.097 | 0.059 | 0.097 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.404 | 1.446 | 1.393 | 1.446 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.050 | 0.076 | 0.048 | 0.076 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.467 | 1.567 | 1.415 | 1.567 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 67.979 | 68.393 | 67.392 | 68.393 | 154.8 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 364.707 | 376.138 | 360.961 | 376.138 | 162.0 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 168.409 | 171.181 | 167.134 | 171.181 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1445.428 | 1451.123 | 1442.333 | 1451.123 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.238 | 158.514 | 152.317 | 158.514 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1434.140 | 1441.303 | 1433.047 | 1441.303 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.169 | 0.175 | 0.156 | 0.175 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.546 | 3.780 | 3.519 | 3.780 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.083 | 0.101 | 0.066 | 0.101 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.616 | 0.645 | 0.607 | 0.645 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.046 | 0.944 | 0.037 | 0.944 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.495 | 0.544 | 0.482 | 0.544 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.429 | 0.469 | 0.406 | 0.469 | 143.4 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.176 | 37.307 | 24.300 | 37.307 | 123.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 167.107 | 169.741 | 165.743 | 169.741 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1490.172 | 1496.599 | 1486.379 | 1496.599 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.456 | 159.925 | 152.107 | 159.925 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1475.111 | 1481.651 | 1473.179 | 1481.651 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.173 | 0.194 | 0.150 | 0.194 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.613 | 3.724 | 3.546 | 3.724 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.083 | 0.107 | 0.064 | 0.107 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.616 | 0.643 | 0.609 | 0.643 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.072 | 0.035 | 0.072 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.505 | 0.529 | 0.496 | 0.529 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.900 | 1.247 | 0.681 | 1.247 | 139.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 66.980 | 67.662 | 66.826 | 67.662 | 123.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 165.565 | 168.867 | 164.992 | 168.867 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1446.522 | 1459.070 | 1438.791 | 1459.070 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 151.140 | 152.272 | 149.228 | 152.272 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1423.967 | 1466.183 | 1420.519 | 1466.183 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.125 | 0.140 | 0.125 | 0.140 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.164 | 2.360 | 2.096 | 2.360 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.041 | 0.064 | 0.039 | 0.064 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.393 | 0.423 | 0.386 | 0.423 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.011 | 0.015 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.452 | 0.499 | 0.440 | 0.499 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.369 | 0.420 | 0.335 | 0.420 | 137.4 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.586 | 20.307 | 19.402 | 20.307 | 123.8 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 163.938 | 168.124 | 162.599 | 168.124 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1447.814 | 1455.332 | 1441.122 | 1455.332 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 151.627 | 153.346 | 150.030 | 153.346 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1419.016 | 1426.128 | 1417.323 | 1426.128 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.126 | 0.157 | 0.112 | 0.157 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.153 | 2.419 | 2.102 | 2.419 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.047 | 0.060 | 0.040 | 0.060 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.391 | 0.407 | 0.384 | 0.407 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.032 | 0.012 | 0.032 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.453 | 0.467 | 0.442 | 0.467 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.257 | 0.269 | 0.246 | 0.269 | 137.3 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.529 | 16.738 | 16.478 | 16.738 | 123.8 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 150.430 | 154.111 | 149.681 | 154.111 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1416.439 | 1420.637 | 1413.928 | 1420.637 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.506 | 0.654 | 0.435 | 0.654 | 135.5 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.657 | 17.051 | 16.652 | 17.051 | 123.8 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:55:38 - cmdstanpy - INFO - Chain [1] start processing<br>17:55:38 - cmdstanpy - INFO - Chain [1] done processing<br>17:55:38 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=18285 data file=/tmp/tmpf9njud3s/_tsui_bc.json init=/tmp/tmpf9njud3s/l6huwnh8.json output file=/tmp/tmpf9njud3s/prophet_modele87k89r4/prophet_model-20261013175538.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpf9njud3s/_tsui_bc.json<br>init = /tmp/tmpf9njud3s/l6huwnh8.json<br>random<br>  seed = 18285<br>output<br>  file = /tmp/tmpf9njud3s/prophet_modele87k89r4/prophet_model-20261013175538.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1157, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1134, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 900, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 695, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 263, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 220, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=18285 data file=/tmp/tmpf9njud3s/_tsui_bc.json init=/tmp/tmpf9njud3s/l6huwnh8.json output file=/tmp/tmpf9njud3s/prophet_modele87k89r4/prophet_model-20261013175538.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpf9njud3 |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:55:39 - cmdstanpy - INFO - Chain [1] start processing<br>17:55:39 - cmdstanpy - INFO - Chain [1] done processing<br>17:55:39 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=75975 data file=/tmp/tmp5vqsmlbx/an_vvx0i.json init=/tmp/tmp5vqsmlbx/xs387bx9.json output file=/tmp/tmp5vqsmlbx/prophet_modelfje_dm7h/prophet_model-20261013175539.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp5vqsmlbx/an_vvx0i.json<br>init = /tmp/tmp5vqsmlbx/xs387bx9.json<br>random<br>  seed = 75975<br>output<br>  file = /tmp/tmp5vqsmlbx/prophet_modelfje_dm7h/prophet_model-20261013175539.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1157, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1134, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 900, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 695, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 263, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 220, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=75975 data file=/tmp/tmp5vqsmlbx/an_vvx0i.json init=/tmp/tmp5vqsmlbx/xs387bx9.json output file=/tmp/tmp5vqsmlbx/prophet_modelfje_dm7h/prophet_model-20261013175539.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp5vqsmlb |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1157, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1134, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 900, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 698, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 351, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1157, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1134, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 900, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 698, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 351, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `4f5ffaf996e4159ada941b6d0d6d3e4e2b1f1ba5`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`
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

