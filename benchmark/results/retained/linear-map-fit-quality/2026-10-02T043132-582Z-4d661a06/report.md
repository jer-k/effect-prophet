# Effect Prophet benchmark — 2026-10-02T043132-582Z-4d661a06

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium-stan-v2 | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence fixed-linear-equation-v1. |
| map-explicit-break-small-stan-v2 | equivalent-objective | passed | 1.017e-11 | 0.000e+0 | 0.000e+0 | 1.017e-11 | 4.041e-14 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-seasonal-breaks-irregular-medium-stan-v2 | equivalent-objective | passed | 6.301e-5 | 1.686e-5 | 1.686e-5 | 6.877e-5 | 1.344e-5 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-events-small-stan-v2 | equivalent-objective | passed | 7.297e-12 | 2.335e-12 | 2.335e-12 | 7.297e-12 | 5.524e-13 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-regressors-medium-stan-v2 | equivalent-objective | passed | 3.086e-3 | 1.054e-4 | 1.907e-4 | 3.130e-3 | 4.650e-4 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-conditional-seasonalities-medium-stan-v2 | equivalent-objective | passed | 2.682e-3 | 7.941e-4 | 7.454e-4 | 2.722e-3 | 2.397e-4 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-mixed-features-explicit-small-stan-v2 | equivalent-objective | passed | 8.136e-13 | 1.215e-12 | 1.282e-12 | 1.048e-12 | 1.104e-13 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-mixed-features-automatic-large-stan-v2 | equivalent-objective | passed | 5.158e-3 | 1.775e-3 | 2.989e-3 | 6.924e-3 | 1.031e-4 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-ordered-explicit-stan-v2 | equivalent-objective | passed | 3.268e-12 | 0.000e+0 | 0.000e+0 | 3.268e-12 | 4.635e-15 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-ordered-auto-stan-v2 | equivalent-objective | passed | 1.064e-8 | 0.000e+0 | 0.000e+0 | 1.064e-8 | 1.432e-8 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-unsorted-explicit-stan-v2 | equivalent-objective | passed | 3.268e-12 | 0.000e+0 | 0.000e+0 | 3.268e-12 | 4.635e-15 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-unsorted-auto-stan-v2 | equivalent-objective | passed | 1.064e-8 | 0.000e+0 | 0.000e+0 | 1.064e-8 | 1.432e-8 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-duplicates-explicit-stan-v2 | equivalent-objective | passed | 1.691e-11 | 0.000e+0 | 0.000e+0 | 1.691e-11 | 5.791e-14 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-duplicates-auto-stan-v2 | equivalent-objective | passed | 3.999e-5 | 0.000e+0 | 0.000e+0 | 3.999e-5 | 1.271e-4 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-duplicate-features-auto-stan-v2 | equivalent-objective | passed | 8.030e-4 | 9.818e-5 | 9.818e-5 | 7.796e-4 | 1.195e-4 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| uncertainty-training-duplicates-auto-stan-v2 | scalar-process-different-public-work | passed | 3.999e-5 | 0.000e+0 | 0.000e+0 | 3.999e-5 | 1.271e-4 | Verified fitted point behavior under linear-stan-map-fit-quality-v3; scalar simulation gated by docs/validation/uncertainty.md. Public output work differs. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| map-training-zero-span-linear-varied-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-flat-varied-stan-v2 | equivalent-objective | passed | 8.557e-5 | 0.000e+0 | 0.000e+0 | 8.557e-5 | 3.338e-4 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-zero-span-linear-constant-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-flat-constant-stan-v2 | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| evaluation-training-duplicates-stan-v2 | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.209e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| linear-offset-scaling-absmax-stan-v2 | equivalent-objective | passed | 1.226e-11 | 1.500e-13 | 1.500e-13 | 1.236e-11 | 2.082e-15 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| linear-offset-scaling-minmax-stan-v2 | equivalent-objective | passed | 6.111e-13 | 2.911e-13 | 2.911e-13 | 8.384e-13 | 4.465e-14 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |
| linear-mixed-components-stan-v2 | equivalent-objective | passed | 1.248e-10 | 2.471e-11 | 0.000e+0 | 1.446e-10 | 1.298e-10 | Verified equivalent behavior for this configuration under evidence linear-stan-map-fit-quality-v3. Stationarity is diagnostic-only; near-stationarity acceptance is deferred to EP-097. |

## Stationarity diagnostics

Constrained normalized infinity-norm residuals at independently fitted endpoints, not a same-point gradient comparison. Diagnostic-only rows do not certify near-stationarity; EP-097 owns that deferred requirement. Density, normalized-noise, forecast, component, metadata, persistence and applicable uncertainty gates still apply.

| Case | Run | Effect residual | Python residual | Absolute difference | Policy | Follow-up |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| map-explicit-break-small-stan-v2 | 0 | 3.070796e-2 | 3.070796e-2 | 5.694441e-11 | diagnostic-only | EP-097 |
| map-explicit-break-small-stan-v2 | 1 | 3.070796e-2 | 3.070796e-2 | 5.694441e-11 | diagnostic-only | EP-097 |
| map-seasonal-breaks-irregular-medium-stan-v2 | 0 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | diagnostic-only | EP-097 |
| map-seasonal-breaks-irregular-medium-stan-v2 | 1 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | diagnostic-only | EP-097 |
| map-events-small-stan-v2 | 0 | 1.662652e-1 | 1.662652e-1 | 3.630426e-9 | diagnostic-only | EP-097 |
| map-events-small-stan-v2 | 1 | 1.662652e-1 | 1.662652e-1 | 3.630426e-9 | diagnostic-only | EP-097 |
| map-regressors-medium-stan-v2 | 0 | 2.268414e+1 | 3.524345e+1 | 1.255931e+1 | diagnostic-only | EP-097 |
| map-regressors-medium-stan-v2 | 1 | 2.268414e+1 | 3.524345e+1 | 1.255931e+1 | diagnostic-only | EP-097 |
| map-conditional-seasonalities-medium-stan-v2 | 0 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | diagnostic-only | EP-097 |
| map-conditional-seasonalities-medium-stan-v2 | 1 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | diagnostic-only | EP-097 |
| map-mixed-features-explicit-small-stan-v2 | 0 | 2.547203e+0 | 2.547203e+0 | 1.914208e-9 | diagnostic-only | EP-097 |
| map-mixed-features-explicit-small-stan-v2 | 1 | 2.547203e+0 | 2.547203e+0 | 1.914208e-9 | diagnostic-only | EP-097 |
| map-mixed-features-automatic-large-stan-v2 | 0 | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | diagnostic-only | EP-097 |
| map-mixed-features-automatic-large-stan-v2 | 1 | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | diagnostic-only | EP-097 |
| map-training-ordered-explicit-stan-v2 | 0 | 2.141087e+0 | 2.141087e+0 | 9.295804e-10 | diagnostic-only | EP-097 |
| map-training-ordered-explicit-stan-v2 | 1 | 2.141087e+0 | 2.141087e+0 | 9.295804e-10 | diagnostic-only | EP-097 |
| map-training-ordered-auto-stan-v2 | 0 | 1.612872e+2 | 1.612664e+2 | 2.086740e-2 | diagnostic-only | EP-097 |
| map-training-ordered-auto-stan-v2 | 1 | 1.612872e+2 | 1.612664e+2 | 2.086740e-2 | diagnostic-only | EP-097 |
| map-training-unsorted-explicit-stan-v2 | 0 | 2.141087e+0 | 2.141087e+0 | 9.295804e-10 | diagnostic-only | EP-097 |
| map-training-unsorted-explicit-stan-v2 | 1 | 2.141087e+0 | 2.141087e+0 | 9.295804e-10 | diagnostic-only | EP-097 |
| map-training-unsorted-auto-stan-v2 | 0 | 1.612872e+2 | 1.612664e+2 | 2.086740e-2 | diagnostic-only | EP-097 |
| map-training-unsorted-auto-stan-v2 | 1 | 1.612872e+2 | 1.612664e+2 | 2.086740e-2 | diagnostic-only | EP-097 |
| map-training-duplicates-explicit-stan-v2 | 0 | 1.044064e+0 | 1.044064e+0 | 5.020599e-8 | diagnostic-only | EP-097 |
| map-training-duplicates-explicit-stan-v2 | 1 | 1.044064e+0 | 1.044064e+0 | 5.020599e-8 | diagnostic-only | EP-097 |
| map-training-duplicates-auto-stan-v2 | 0 | 2.724605e+1 | 1.072297e+2 | 7.998369e+1 | diagnostic-only | EP-097 |
| map-training-duplicates-auto-stan-v2 | 1 | 2.724605e+1 | 1.072297e+2 | 7.998369e+1 | diagnostic-only | EP-097 |
| map-training-duplicate-features-auto-stan-v2 | 0 | 2.907500e+1 | 1.075811e+2 | 7.850610e+1 | diagnostic-only | EP-097 |
| map-training-duplicate-features-auto-stan-v2 | 1 | 2.907500e+1 | 1.075811e+2 | 7.850610e+1 | diagnostic-only | EP-097 |
| uncertainty-training-duplicates-auto-stan-v2 | 0 | 2.724605e+1 | 1.072297e+2 | 7.998369e+1 | diagnostic-only | EP-097 |
| uncertainty-training-duplicates-auto-stan-v2 | 1 | 2.724605e+1 | 1.072297e+2 | 7.998369e+1 | diagnostic-only | EP-097 |
| linear-offset-scaling-absmax-stan-v2 | 0 | 5.840638e+0 | 5.840638e+0 | 2.269747e-8 | diagnostic-only | EP-097 |
| linear-offset-scaling-absmax-stan-v2 | 1 | 5.840638e+0 | 5.840638e+0 | 2.269747e-8 | diagnostic-only | EP-097 |
| linear-offset-scaling-minmax-stan-v2 | 0 | 4.443357e-1 | 4.443357e-1 | 2.240020e-8 | diagnostic-only | EP-097 |
| linear-offset-scaling-minmax-stan-v2 | 1 | 4.443357e-1 | 4.443357e-1 | 2.240020e-8 | diagnostic-only | EP-097 |
| linear-mixed-components-stan-v2 | 0 | 3.489484e+0 | 3.489839e+0 | 3.554020e-4 | diagnostic-only | EP-097 |
| linear-mixed-components-stan-v2 | 1 | 3.489484e+0 | 3.489839e+0 | 3.554020e-4 | diagnostic-only | EP-097 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-training-duplicates-auto-stan-v2 | 96 | 0 | 25 | 8 | 8 | 8 | 128 | samples | 33554432 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | docs/validation/uncertainty.md |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates-stan-v2 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall / exclude | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| evaluation-training-duplicates-stan-v2 | evaluation-baseline | effect-prophet | 4 | 1.499 | 1.513 | 1.319 | 1.513 | 155.9 |
| evaluation-training-duplicates-stan-v2 | evaluation-baseline | python-prophet | 4 | 1.441 | 1.544 | 1.405 | 1.544 | 117.7 |
| evaluation-training-duplicates-stan-v2 | evaluation-holdout | effect-prophet | 4 | 3.944 | 4.229 | 3.738 | 4.229 | 157.8 |
| evaluation-training-duplicates-stan-v2 | evaluation-holdout | python-prophet | 4 | 22.130 | 23.465 | 22.045 | 23.465 | 118.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-plan | effect-prophet | 4 | 0.855 | 1.008 | 0.603 | 1.008 | 134.4 |
| evaluation-training-duplicates-stan-v2 | evaluation-plan | python-prophet | 4 | 0.939 | 1.057 | 0.925 | 1.057 | 115.8 |
| evaluation-training-duplicates-stan-v2 | evaluation-point | effect-prophet | 4 | 7.468 | 8.541 | 7.303 | 8.541 | 155.8 |
| evaluation-training-duplicates-stan-v2 | evaluation-point | python-prophet | 4 | 55.319 | 62.383 | 53.029 | 62.383 | 117.7 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-decode | effect-prophet | 4 | 0.266 | 0.287 | 0.251 | 0.287 | 160.5 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 118.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-encode | effect-prophet | 4 | 0.329 | 0.533 | 0.284 | 0.533 | 160.3 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.008 | 0.011 | 118.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-search | effect-prophet | 4 | 6.288 | 7.523 | 6.199 | 7.523 | 156.9 |
| evaluation-training-duplicates-stan-v2 | evaluation-search | python-prophet | 4 | 54.666 | 58.970 | 54.038 | 58.970 | 118.1 |
| fixed-linear-prediction-medium-stan-v2 | adapter-input-conversion | effect-prophet | 30 | 0.022 | 0.042 | 0.006 | 0.048 | n/a |
| fixed-linear-prediction-medium-stan-v2 | adapter-input-conversion | python-prophet | 30 | 0.593 | 0.719 | 0.563 | 1.028 | n/a |
| fixed-linear-prediction-medium-stan-v2 | warm-predict | effect-prophet | 30 | 0.534 | 0.676 | 0.381 | 0.930 | n/a |
| fixed-linear-prediction-medium-stan-v2 | warm-predict | python-prophet | 30 | 3.504 | 8.198 | 2.803 | 12.018 | n/a |
| linear-mixed-components-stan-v2 | adapter-input-conversion | effect-prophet | 4 | 0.071 | 0.075 | 0.055 | 0.075 | n/a |
| linear-mixed-components-stan-v2 | adapter-input-conversion | python-prophet | 4 | 0.599 | 0.663 | 0.585 | 0.663 | n/a |
| linear-mixed-components-stan-v2 | cold-first-forecast | effect-prophet | 4 | 187.987 | 196.961 | 187.579 | 196.961 | n/a |
| linear-mixed-components-stan-v2 | cold-first-forecast | python-prophet | 4 | 1523.686 | 1725.646 | 1461.018 | 1725.646 | n/a |
| linear-mixed-components-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 166.576 | 168.069 | 166.380 | 168.069 | n/a |
| linear-mixed-components-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1517.154 | 1622.363 | 1434.385 | 1622.363 | n/a |
| linear-mixed-components-stan-v2 | model-json-decode | effect-prophet | 4 | 0.151 | 0.165 | 0.146 | 0.165 | n/a |
| linear-mixed-components-stan-v2 | model-json-decode | python-prophet | 4 | 3.735 | 4.454 | 3.609 | 4.454 | n/a |
| linear-mixed-components-stan-v2 | model-json-encode | effect-prophet | 4 | 0.079 | 0.098 | 0.065 | 0.098 | n/a |
| linear-mixed-components-stan-v2 | model-json-encode | python-prophet | 4 | 0.698 | 0.849 | 0.656 | 0.849 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.053 | 5.251 | 4.936 | 5.251 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 4 | 30.693 | 32.160 | 29.607 | 32.160 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict | effect-prophet | 4 | 4.915 | 5.197 | 4.899 | 5.197 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict | python-prophet | 4 | 29.402 | 31.976 | 29.221 | 31.976 | n/a |
| linear-mixed-components-stan-v2 | warm-fit | effect-prophet | 4 | 5.723 | 5.954 | 5.543 | 5.954 | n/a |
| linear-mixed-components-stan-v2 | warm-fit | python-prophet | 4 | 24.491 | 28.317 | 23.871 | 28.317 | n/a |
| linear-mixed-components-stan-v2 | warm-predict | effect-prophet | 4 | 0.564 | 0.914 | 0.501 | 0.914 | n/a |
| linear-mixed-components-stan-v2 | warm-predict | python-prophet | 4 | 5.018 | 5.169 | 4.937 | 5.169 | n/a |
| linear-offset-scaling-absmax-stan-v2 | adapter-input-conversion | effect-prophet | 4 | 0.013 | 0.014 | 0.012 | 0.014 | n/a |
| linear-offset-scaling-absmax-stan-v2 | adapter-input-conversion | python-prophet | 4 | 0.491 | 0.547 | 0.481 | 0.547 | n/a |
| linear-offset-scaling-absmax-stan-v2 | cold-first-forecast | effect-prophet | 4 | 196.838 | 209.411 | 189.330 | 209.411 | n/a |
| linear-offset-scaling-absmax-stan-v2 | cold-first-forecast | python-prophet | 4 | 1521.956 | 1535.078 | 1454.119 | 1535.078 | n/a |
| linear-offset-scaling-absmax-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 165.462 | 176.312 | 163.520 | 176.312 | n/a |
| linear-offset-scaling-absmax-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1480.655 | 1499.155 | 1450.370 | 1499.155 | n/a |
| linear-offset-scaling-absmax-stan-v2 | model-json-decode | effect-prophet | 4 | 0.150 | 0.320 | 0.126 | 0.320 | n/a |
| linear-offset-scaling-absmax-stan-v2 | model-json-decode | python-prophet | 4 | 2.254 | 2.277 | 2.200 | 2.277 | n/a |
| linear-offset-scaling-absmax-stan-v2 | model-json-encode | effect-prophet | 4 | 0.061 | 0.069 | 0.056 | 0.069 | n/a |
| linear-offset-scaling-absmax-stan-v2 | model-json-encode | python-prophet | 4 | 0.451 | 0.492 | 0.443 | 0.492 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.453 | 4.710 | 4.228 | 4.710 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 4 | 29.389 | 29.823 | 28.493 | 29.823 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-fit-predict | effect-prophet | 4 | 4.661 | 5.111 | 4.569 | 5.111 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-fit-predict | python-prophet | 4 | 27.392 | 30.863 | 26.833 | 30.863 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-fit | effect-prophet | 4 | 5.699 | 5.805 | 5.552 | 5.805 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-fit | python-prophet | 4 | 25.657 | 28.973 | 25.069 | 28.973 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-predict | effect-prophet | 4 | 0.477 | 0.530 | 0.337 | 0.530 | n/a |
| linear-offset-scaling-absmax-stan-v2 | warm-predict | python-prophet | 4 | 3.161 | 3.232 | 3.119 | 3.232 | n/a |
| linear-offset-scaling-minmax-stan-v2 | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.025 | 0.013 | 0.025 | n/a |
| linear-offset-scaling-minmax-stan-v2 | adapter-input-conversion | python-prophet | 4 | 0.480 | 0.533 | 0.474 | 0.533 | n/a |
| linear-offset-scaling-minmax-stan-v2 | cold-first-forecast | effect-prophet | 4 | 185.982 | 196.400 | 181.868 | 196.400 | n/a |
| linear-offset-scaling-minmax-stan-v2 | cold-first-forecast | python-prophet | 4 | 1502.971 | 1615.526 | 1484.922 | 1615.526 | n/a |
| linear-offset-scaling-minmax-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 167.906 | 172.293 | 165.567 | 172.293 | n/a |
| linear-offset-scaling-minmax-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1486.506 | 1554.118 | 1415.225 | 1554.118 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-decode | effect-prophet | 4 | 0.096 | 0.122 | 0.088 | 0.122 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-decode | python-prophet | 4 | 2.333 | 2.440 | 2.258 | 2.440 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-encode | effect-prophet | 4 | 0.050 | 0.079 | 0.047 | 0.079 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-encode | python-prophet | 4 | 0.496 | 0.758 | 0.441 | 0.758 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.392 | 4.472 | 4.368 | 4.472 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 4 | 27.858 | 28.691 | 27.084 | 28.691 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict | effect-prophet | 4 | 4.564 | 4.717 | 4.479 | 4.717 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict | python-prophet | 4 | 26.884 | 28.925 | 26.555 | 28.925 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit | effect-prophet | 4 | 5.077 | 5.383 | 4.816 | 5.383 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit | python-prophet | 4 | 24.985 | 25.852 | 24.505 | 25.852 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-predict | effect-prophet | 4 | 0.333 | 0.358 | 0.308 | 0.358 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-predict | python-prophet | 4 | 3.254 | 3.371 | 3.122 | 3.371 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | adapter-input-conversion | effect-prophet | 6 | 0.109 | 0.130 | 0.100 | 0.130 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | adapter-input-conversion | python-prophet | 6 | 0.663 | 0.706 | 0.625 | 0.706 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | cold-first-forecast | effect-prophet | 6 | 167.866 | 181.540 | 165.350 | 181.540 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | cold-first-forecast | python-prophet | 6 | 1546.431 | 1706.066 | 1474.194 | 1706.066 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | fresh-process-restored-predict | effect-prophet | 6 | 161.743 | 206.611 | 156.541 | 206.611 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | fresh-process-restored-predict | python-prophet | 6 | 1504.542 | 1519.947 | 1456.592 | 1519.947 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | model-json-decode | effect-prophet | 6 | 0.119 | 0.238 | 0.100 | 0.238 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | model-json-decode | python-prophet | 6 | 2.899 | 3.070 | 2.791 | 3.070 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | model-json-encode | effect-prophet | 6 | 0.052 | 0.064 | 0.049 | 0.064 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | model-json-encode | python-prophet | 6 | 0.656 | 0.691 | 0.637 | 0.691 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.714 | 3.513 | 2.682 | 3.513 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 6 | 18.896 | 19.782 | 18.319 | 19.782 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-fit-predict | effect-prophet | 6 | 3.333 | 3.427 | 2.870 | 3.427 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-fit-predict | python-prophet | 6 | 17.495 | 18.624 | 17.271 | 18.624 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-fit | effect-prophet | 6 | 2.901 | 3.103 | 2.729 | 3.103 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-fit | python-prophet | 6 | 13.655 | 14.426 | 12.831 | 14.426 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-predict | effect-prophet | 6 | 0.478 | 0.503 | 0.467 | 0.503 | n/a |
| map-conditional-seasonalities-medium-stan-v2 | warm-predict | python-prophet | 6 | 4.121 | 4.557 | 3.945 | 4.557 | n/a |
| map-events-small-stan-v2 | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.019 | 0.013 | 0.019 | n/a |
| map-events-small-stan-v2 | adapter-input-conversion | python-prophet | 6 | 0.504 | 0.547 | 0.495 | 0.547 | n/a |
| map-events-small-stan-v2 | cold-first-forecast | effect-prophet | 6 | 181.194 | 186.920 | 177.629 | 186.920 | n/a |
| map-events-small-stan-v2 | cold-first-forecast | python-prophet | 6 | 1673.777 | 1755.913 | 1557.408 | 1755.913 | n/a |
| map-events-small-stan-v2 | fresh-process-restored-predict | effect-prophet | 6 | 162.930 | 167.422 | 161.920 | 167.422 | n/a |
| map-events-small-stan-v2 | fresh-process-restored-predict | python-prophet | 6 | 1573.296 | 1717.882 | 1452.458 | 1717.882 | n/a |
| map-events-small-stan-v2 | model-json-decode | effect-prophet | 6 | 0.201 | 0.232 | 0.146 | 0.232 | n/a |
| map-events-small-stan-v2 | model-json-decode | python-prophet | 6 | 3.442 | 4.272 | 3.319 | 4.272 | n/a |
| map-events-small-stan-v2 | model-json-encode | effect-prophet | 6 | 0.089 | 0.106 | 0.080 | 0.106 | n/a |
| map-events-small-stan-v2 | model-json-encode | python-prophet | 6 | 0.661 | 0.709 | 0.644 | 0.709 | n/a |
| map-events-small-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.781 | 7.025 | 6.614 | 7.025 | n/a |
| map-events-small-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 6 | 39.095 | 42.243 | 38.010 | 42.243 | n/a |
| map-events-small-stan-v2 | warm-fit-predict | effect-prophet | 6 | 7.101 | 7.555 | 6.688 | 7.555 | n/a |
| map-events-small-stan-v2 | warm-fit-predict | python-prophet | 6 | 37.750 | 39.097 | 35.900 | 39.097 | n/a |
| map-events-small-stan-v2 | warm-fit | effect-prophet | 6 | 7.513 | 9.808 | 6.778 | 9.808 | n/a |
| map-events-small-stan-v2 | warm-fit | python-prophet | 6 | 32.750 | 34.990 | 32.220 | 34.990 | n/a |
| map-events-small-stan-v2 | warm-predict | effect-prophet | 6 | 0.374 | 0.518 | 0.320 | 0.518 | n/a |
| map-events-small-stan-v2 | warm-predict | python-prophet | 6 | 4.687 | 5.664 | 4.531 | 5.664 | n/a |
| map-explicit-break-small-stan-v2 | adapter-input-conversion | effect-prophet | 6 | 0.004 | 0.006 | 0.004 | 0.006 | n/a |
| map-explicit-break-small-stan-v2 | adapter-input-conversion | python-prophet | 6 | 0.499 | 1.172 | 0.454 | 1.172 | n/a |
| map-explicit-break-small-stan-v2 | cold-first-forecast | effect-prophet | 6 | 179.751 | 186.935 | 163.514 | 186.935 | n/a |
| map-explicit-break-small-stan-v2 | cold-first-forecast | python-prophet | 6 | 1587.901 | 1889.072 | 1552.994 | 1889.072 | n/a |
| map-explicit-break-small-stan-v2 | fresh-process-restored-predict | effect-prophet | 6 | 159.484 | 164.453 | 154.258 | 164.453 | n/a |
| map-explicit-break-small-stan-v2 | fresh-process-restored-predict | python-prophet | 6 | 1600.894 | 1736.259 | 1579.794 | 1736.259 | n/a |
| map-explicit-break-small-stan-v2 | model-json-decode | effect-prophet | 6 | 0.076 | 0.087 | 0.072 | 0.087 | n/a |
| map-explicit-break-small-stan-v2 | model-json-decode | python-prophet | 6 | 2.071 | 2.302 | 2.032 | 2.302 | n/a |
| map-explicit-break-small-stan-v2 | model-json-encode | effect-prophet | 6 | 0.038 | 0.140 | 0.035 | 0.140 | n/a |
| map-explicit-break-small-stan-v2 | model-json-encode | python-prophet | 6 | 0.440 | 0.479 | 0.399 | 0.479 | n/a |
| map-explicit-break-small-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.442 | 1.579 | 1.401 | 1.579 | n/a |
| map-explicit-break-small-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 6 | 15.728 | 28.987 | 15.294 | 28.987 | n/a |
| map-explicit-break-small-stan-v2 | warm-fit-predict | effect-prophet | 6 | 1.720 | 1.974 | 1.590 | 1.974 | n/a |
| map-explicit-break-small-stan-v2 | warm-fit-predict | python-prophet | 6 | 15.745 | 31.990 | 14.785 | 31.990 | n/a |
| map-explicit-break-small-stan-v2 | warm-fit | effect-prophet | 6 | 2.057 | 2.095 | 2.029 | 2.095 | n/a |
| map-explicit-break-small-stan-v2 | warm-fit | python-prophet | 6 | 12.706 | 52.116 | 12.218 | 52.116 | n/a |
| map-explicit-break-small-stan-v2 | warm-predict | effect-prophet | 6 | 0.280 | 0.313 | 0.254 | 0.313 | n/a |
| map-explicit-break-small-stan-v2 | warm-predict | python-prophet | 6 | 3.162 | 14.519 | 2.945 | 14.519 | n/a |
| map-mixed-features-automatic-large-stan-v2 | adapter-input-conversion | effect-prophet | 4 | 0.206 | 0.222 | 0.205 | 0.222 | n/a |
| map-mixed-features-automatic-large-stan-v2 | adapter-input-conversion | python-prophet | 4 | 1.299 | 1.341 | 1.285 | 1.341 | n/a |
| map-mixed-features-automatic-large-stan-v2 | cold-first-forecast | effect-prophet | 4 | 202.630 | 225.236 | 195.884 | 225.236 | n/a |
| map-mixed-features-automatic-large-stan-v2 | cold-first-forecast | python-prophet | 4 | 1549.500 | 1655.199 | 1547.490 | 1655.199 | n/a |
| map-mixed-features-automatic-large-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 171.510 | 179.887 | 170.173 | 179.887 | n/a |
| map-mixed-features-automatic-large-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1585.324 | 1632.350 | 1569.078 | 1632.350 | n/a |
| map-mixed-features-automatic-large-stan-v2 | model-json-decode | effect-prophet | 4 | 0.241 | 0.262 | 0.233 | 0.262 | n/a |
| map-mixed-features-automatic-large-stan-v2 | model-json-decode | python-prophet | 4 | 5.916 | 6.777 | 5.907 | 6.777 | n/a |
| map-mixed-features-automatic-large-stan-v2 | model-json-encode | effect-prophet | 4 | 0.116 | 0.156 | 0.110 | 0.156 | n/a |
| map-mixed-features-automatic-large-stan-v2 | model-json-encode | python-prophet | 4 | 1.823 | 1.861 | 1.748 | 1.861 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 4 | 23.141 | 23.890 | 21.652 | 23.890 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 4 | 49.642 | 50.994 | 48.923 | 50.994 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-fit-predict | effect-prophet | 4 | 22.396 | 27.087 | 22.110 | 27.087 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-fit-predict | python-prophet | 4 | 45.087 | 48.664 | 44.234 | 48.664 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-fit | effect-prophet | 4 | 22.709 | 23.982 | 22.618 | 23.982 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-fit | python-prophet | 4 | 38.670 | 42.096 | 38.033 | 42.096 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-predict | effect-prophet | 4 | 1.237 | 2.330 | 1.063 | 2.330 | n/a |
| map-mixed-features-automatic-large-stan-v2 | warm-predict | python-prophet | 4 | 6.387 | 8.142 | 6.224 | 8.142 | n/a |
| map-mixed-features-explicit-small-stan-v2 | adapter-input-conversion | effect-prophet | 6 | 0.010 | 0.018 | 0.009 | 0.018 | n/a |
| map-mixed-features-explicit-small-stan-v2 | adapter-input-conversion | python-prophet | 6 | 0.530 | 0.582 | 0.495 | 0.582 | n/a |
| map-mixed-features-explicit-small-stan-v2 | cold-first-forecast | effect-prophet | 6 | 180.158 | 201.986 | 175.706 | 201.986 | n/a |
| map-mixed-features-explicit-small-stan-v2 | cold-first-forecast | python-prophet | 6 | 1469.051 | 1524.076 | 1445.772 | 1524.076 | n/a |
| map-mixed-features-explicit-small-stan-v2 | fresh-process-restored-predict | effect-prophet | 6 | 162.804 | 184.005 | 158.584 | 184.005 | n/a |
| map-mixed-features-explicit-small-stan-v2 | fresh-process-restored-predict | python-prophet | 6 | 1510.327 | 1518.046 | 1478.964 | 1518.046 | n/a |
| map-mixed-features-explicit-small-stan-v2 | model-json-decode | effect-prophet | 6 | 0.149 | 0.203 | 0.120 | 0.203 | n/a |
| map-mixed-features-explicit-small-stan-v2 | model-json-decode | python-prophet | 6 | 3.674 | 4.000 | 3.648 | 4.000 | n/a |
| map-mixed-features-explicit-small-stan-v2 | model-json-encode | effect-prophet | 6 | 0.108 | 0.146 | 0.097 | 0.146 | n/a |
| map-mixed-features-explicit-small-stan-v2 | model-json-encode | python-prophet | 6 | 0.611 | 0.632 | 0.593 | 0.632 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.511 | 1.851 | 1.481 | 1.851 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 6 | 18.340 | 19.665 | 17.914 | 19.665 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-fit-predict | effect-prophet | 6 | 2.123 | 3.415 | 1.572 | 3.415 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-fit-predict | python-prophet | 6 | 17.799 | 17.989 | 17.768 | 17.989 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-fit | effect-prophet | 6 | 2.159 | 3.020 | 2.131 | 3.020 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-fit | python-prophet | 6 | 12.186 | 12.789 | 12.083 | 12.789 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-predict | effect-prophet | 6 | 0.282 | 0.443 | 0.268 | 0.443 | n/a |
| map-mixed-features-explicit-small-stan-v2 | warm-predict | python-prophet | 6 | 5.071 | 5.787 | 4.894 | 5.787 | n/a |
| map-regressors-medium-stan-v2 | adapter-input-conversion | effect-prophet | 6 | 0.144 | 0.182 | 0.131 | 0.182 | n/a |
| map-regressors-medium-stan-v2 | adapter-input-conversion | python-prophet | 6 | 0.795 | 0.841 | 0.784 | 0.841 | n/a |
| map-regressors-medium-stan-v2 | cold-first-forecast | effect-prophet | 6 | 168.064 | 171.279 | 165.433 | 171.279 | n/a |
| map-regressors-medium-stan-v2 | cold-first-forecast | python-prophet | 6 | 1643.355 | 1999.553 | 1532.929 | 1999.553 | n/a |
| map-regressors-medium-stan-v2 | fresh-process-restored-predict | effect-prophet | 6 | 155.398 | 168.954 | 152.237 | 168.954 | n/a |
| map-regressors-medium-stan-v2 | fresh-process-restored-predict | python-prophet | 6 | 1619.800 | 2015.231 | 1577.356 | 2015.231 | n/a |
| map-regressors-medium-stan-v2 | model-json-decode | effect-prophet | 6 | 0.185 | 0.247 | 0.169 | 0.247 | n/a |
| map-regressors-medium-stan-v2 | model-json-decode | python-prophet | 6 | 3.534 | 4.002 | 3.328 | 4.002 | n/a |
| map-regressors-medium-stan-v2 | model-json-encode | effect-prophet | 6 | 0.086 | 0.112 | 0.077 | 0.112 | n/a |
| map-regressors-medium-stan-v2 | model-json-encode | python-prophet | 6 | 0.804 | 1.002 | 0.768 | 1.002 | n/a |
| map-regressors-medium-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.780 | 3.170 | 2.683 | 3.170 | n/a |
| map-regressors-medium-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 6 | 17.602 | 18.234 | 17.346 | 18.234 | n/a |
| map-regressors-medium-stan-v2 | warm-fit-predict | effect-prophet | 6 | 2.949 | 3.475 | 2.638 | 3.475 | n/a |
| map-regressors-medium-stan-v2 | warm-fit-predict | python-prophet | 6 | 15.672 | 16.600 | 15.065 | 16.600 | n/a |
| map-regressors-medium-stan-v2 | warm-fit | effect-prophet | 6 | 2.716 | 3.574 | 2.524 | 3.574 | n/a |
| map-regressors-medium-stan-v2 | warm-fit | python-prophet | 6 | 12.211 | 12.720 | 11.909 | 12.720 | n/a |
| map-regressors-medium-stan-v2 | warm-predict | effect-prophet | 6 | 0.551 | 1.370 | 0.520 | 1.370 | n/a |
| map-regressors-medium-stan-v2 | warm-predict | python-prophet | 6 | 3.932 | 4.460 | 3.724 | 4.460 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | adapter-input-conversion | effect-prophet | 6 | 0.034 | 0.051 | 0.027 | 0.051 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | adapter-input-conversion | python-prophet | 6 | 0.560 | 0.715 | 0.538 | 0.715 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | fresh-process-restored-predict | effect-prophet | 6 | 165.197 | 172.404 | 160.679 | 172.404 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | fresh-process-restored-predict | python-prophet | 6 | 1534.726 | 1648.138 | 1520.381 | 1648.138 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | model-json-decode | effect-prophet | 6 | 0.112 | 0.199 | 0.099 | 0.199 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | model-json-decode | python-prophet | 6 | 2.339 | 2.483 | 2.308 | 2.483 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | model-json-encode | effect-prophet | 6 | 0.045 | 0.057 | 0.041 | 0.057 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | model-json-encode | python-prophet | 6 | 0.551 | 0.585 | 0.525 | 0.585 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.924 | 2.017 | 1.485 | 2.017 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 6 | 13.184 | 15.174 | 12.671 | 15.174 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-fit-predict | effect-prophet | 6 | 1.739 | 2.437 | 1.564 | 2.437 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-fit-predict | python-prophet | 6 | 12.111 | 14.836 | 11.813 | 14.836 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-fit | effect-prophet | 6 | 2.262 | 4.095 | 1.669 | 4.095 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-fit | python-prophet | 6 | 9.549 | 9.936 | 9.247 | 9.936 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-predict | effect-prophet | 6 | 0.313 | 0.324 | 0.291 | 0.324 | n/a |
| map-seasonal-breaks-irregular-medium-stan-v2 | warm-predict | python-prophet | 6 | 3.284 | 3.426 | 3.243 | 3.426 | n/a |
| map-training-duplicate-features-auto-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 161.832 | 168.681 | 153.774 | 168.681 | n/a |
| map-training-duplicate-features-auto-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1567.314 | 1631.884 | 1559.851 | 1631.884 | n/a |
| map-training-duplicate-features-auto-stan-v2 | model-json-decode | effect-prophet | 4 | 0.158 | 0.171 | 0.155 | 0.171 | n/a |
| map-training-duplicate-features-auto-stan-v2 | model-json-decode | python-prophet | 4 | 2.930 | 3.156 | 2.670 | 3.156 | n/a |
| map-training-duplicate-features-auto-stan-v2 | model-json-encode | effect-prophet | 4 | 0.081 | 0.089 | 0.069 | 0.089 | n/a |
| map-training-duplicate-features-auto-stan-v2 | model-json-encode | python-prophet | 4 | 0.645 | 0.929 | 0.548 | 0.929 | n/a |
| map-training-duplicate-features-auto-stan-v2 | warm-fit | effect-prophet | 4 | 86.822 | 89.214 | 86.781 | 89.214 | n/a |
| map-training-duplicate-features-auto-stan-v2 | warm-fit | python-prophet | 4 | 116.097 | 153.436 | 115.996 | 153.436 | n/a |
| map-training-duplicate-features-auto-stan-v2 | warm-predict | effect-prophet | 4 | 0.363 | 0.396 | 0.356 | 0.396 | n/a |
| map-training-duplicate-features-auto-stan-v2 | warm-predict | python-prophet | 4 | 4.456 | 6.982 | 4.187 | 6.982 | n/a |
| map-training-duplicates-auto-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 157.122 | 161.710 | 156.592 | 161.710 | n/a |
| map-training-duplicates-auto-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1534.767 | 1594.631 | 1522.943 | 1594.631 | n/a |
| map-training-duplicates-auto-stan-v2 | model-json-decode | effect-prophet | 4 | 0.158 | 2.015 | 0.140 | 2.015 | n/a |
| map-training-duplicates-auto-stan-v2 | model-json-decode | python-prophet | 4 | 2.209 | 2.250 | 2.095 | 2.250 | n/a |
| map-training-duplicates-auto-stan-v2 | model-json-encode | effect-prophet | 4 | 0.083 | 0.112 | 0.078 | 0.112 | n/a |
| map-training-duplicates-auto-stan-v2 | model-json-encode | python-prophet | 4 | 0.461 | 0.468 | 0.436 | 0.468 | n/a |
| map-training-duplicates-auto-stan-v2 | warm-fit | effect-prophet | 4 | 58.013 | 60.964 | 57.660 | 60.964 | n/a |
| map-training-duplicates-auto-stan-v2 | warm-fit | python-prophet | 4 | 89.616 | 91.239 | 89.105 | 91.239 | n/a |
| map-training-duplicates-auto-stan-v2 | warm-predict | effect-prophet | 4 | 0.287 | 0.342 | 0.287 | 0.342 | n/a |
| map-training-duplicates-auto-stan-v2 | warm-predict | python-prophet | 4 | 2.910 | 2.975 | 2.834 | 2.975 | n/a |
| map-training-duplicates-explicit-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 164.620 | 172.251 | 156.577 | 172.251 | n/a |
| map-training-duplicates-explicit-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1478.075 | 1512.895 | 1455.466 | 1512.895 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-decode | effect-prophet | 4 | 0.145 | 0.206 | 0.124 | 0.206 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-decode | python-prophet | 4 | 2.145 | 2.244 | 2.092 | 2.244 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-encode | effect-prophet | 4 | 0.067 | 0.088 | 0.056 | 0.088 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-encode | python-prophet | 4 | 0.436 | 0.466 | 0.429 | 0.466 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-fit | effect-prophet | 4 | 3.158 | 3.214 | 2.870 | 3.214 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-fit | python-prophet | 4 | 21.250 | 22.596 | 20.867 | 22.596 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-predict | effect-prophet | 4 | 0.273 | 0.299 | 0.212 | 0.299 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-predict | python-prophet | 4 | 2.874 | 2.974 | 2.785 | 2.974 | n/a |
| map-training-ordered-auto-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 162.059 | 167.958 | 153.419 | 167.958 | n/a |
| map-training-ordered-auto-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1583.752 | 1597.059 | 1559.379 | 1597.059 | n/a |
| map-training-ordered-auto-stan-v2 | model-json-decode | effect-prophet | 4 | 0.157 | 2.698 | 0.135 | 2.698 | n/a |
| map-training-ordered-auto-stan-v2 | model-json-decode | python-prophet | 4 | 2.260 | 2.645 | 2.198 | 2.645 | n/a |
| map-training-ordered-auto-stan-v2 | model-json-encode | effect-prophet | 4 | 0.075 | 0.100 | 0.073 | 0.100 | n/a |
| map-training-ordered-auto-stan-v2 | model-json-encode | python-prophet | 4 | 0.496 | 0.580 | 0.474 | 0.580 | n/a |
| map-training-ordered-auto-stan-v2 | warm-fit | effect-prophet | 4 | 72.533 | 75.963 | 68.809 | 75.963 | n/a |
| map-training-ordered-auto-stan-v2 | warm-fit | python-prophet | 4 | 112.112 | 114.060 | 111.741 | 114.060 | n/a |
| map-training-ordered-auto-stan-v2 | warm-predict | effect-prophet | 4 | 0.266 | 0.460 | 0.245 | 0.460 | n/a |
| map-training-ordered-auto-stan-v2 | warm-predict | python-prophet | 4 | 3.436 | 3.712 | 2.885 | 3.712 | n/a |
| map-training-ordered-explicit-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 156.210 | 157.802 | 150.825 | 157.802 | n/a |
| map-training-ordered-explicit-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1563.899 | 1606.321 | 1563.367 | 1606.321 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-decode | effect-prophet | 4 | 0.141 | 0.182 | 0.135 | 0.182 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-decode | python-prophet | 4 | 2.273 | 5.246 | 2.251 | 5.246 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-encode | effect-prophet | 4 | 0.058 | 0.067 | 0.054 | 0.067 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-encode | python-prophet | 4 | 0.438 | 0.447 | 0.434 | 0.447 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-fit | effect-prophet | 4 | 3.105 | 3.154 | 3.065 | 3.154 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-fit | python-prophet | 4 | 23.163 | 24.481 | 21.710 | 24.481 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-predict | effect-prophet | 4 | 0.244 | 0.480 | 0.238 | 0.480 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-predict | python-prophet | 4 | 2.952 | 3.057 | 2.822 | 3.057 | n/a |
| map-training-unsorted-auto-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 163.610 | 177.119 | 159.951 | 177.119 | n/a |
| map-training-unsorted-auto-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1498.628 | 1529.900 | 1436.108 | 1529.900 | n/a |
| map-training-unsorted-auto-stan-v2 | model-json-decode | effect-prophet | 4 | 0.178 | 2.230 | 0.146 | 2.230 | n/a |
| map-training-unsorted-auto-stan-v2 | model-json-decode | python-prophet | 4 | 2.281 | 2.399 | 2.237 | 2.399 | n/a |
| map-training-unsorted-auto-stan-v2 | model-json-encode | effect-prophet | 4 | 0.112 | 0.135 | 0.074 | 0.135 | n/a |
| map-training-unsorted-auto-stan-v2 | model-json-encode | python-prophet | 4 | 0.470 | 0.517 | 0.455 | 0.517 | n/a |
| map-training-unsorted-auto-stan-v2 | warm-fit | effect-prophet | 4 | 73.531 | 78.852 | 72.006 | 78.852 | n/a |
| map-training-unsorted-auto-stan-v2 | warm-fit | python-prophet | 4 | 113.992 | 114.431 | 113.303 | 114.431 | n/a |
| map-training-unsorted-auto-stan-v2 | warm-predict | effect-prophet | 4 | 0.265 | 0.367 | 0.257 | 0.367 | n/a |
| map-training-unsorted-auto-stan-v2 | warm-predict | python-prophet | 4 | 2.939 | 3.027 | 2.844 | 3.027 | n/a |
| map-training-unsorted-explicit-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 168.792 | 240.105 | 163.232 | 240.105 | n/a |
| map-training-unsorted-explicit-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1547.088 | 1591.112 | 1545.927 | 1591.112 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-decode | effect-prophet | 4 | 0.148 | 0.182 | 0.139 | 0.182 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-decode | python-prophet | 4 | 2.381 | 2.664 | 2.205 | 2.664 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-encode | effect-prophet | 4 | 0.055 | 0.090 | 0.051 | 0.090 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-encode | python-prophet | 4 | 0.462 | 0.637 | 0.443 | 0.637 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-fit | effect-prophet | 4 | 3.333 | 5.807 | 3.316 | 5.807 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-fit | python-prophet | 4 | 23.627 | 23.938 | 22.934 | 23.938 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-predict | effect-prophet | 4 | 0.292 | 0.401 | 0.288 | 0.401 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-predict | python-prophet | 4 | 2.955 | 3.753 | 2.891 | 3.753 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 171.078 | 183.458 | 166.510 | 183.458 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1443.353 | 1455.772 | 1430.787 | 1455.772 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-decode | effect-prophet | 4 | 0.111 | 0.156 | 0.109 | 0.156 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-decode | python-prophet | 4 | 1.942 | 2.077 | 1.872 | 2.077 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-encode | effect-prophet | 4 | 0.044 | 0.045 | 0.038 | 0.045 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-encode | python-prophet | 4 | 0.332 | 0.339 | 0.327 | 0.339 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-fit | effect-prophet | 4 | 0.483 | 0.526 | 0.474 | 0.526 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-fit | python-prophet | 4 | 2.991 | 3.212 | 2.888 | 3.212 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-predict | effect-prophet | 4 | 0.180 | 0.231 | 0.167 | 0.231 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-predict | python-prophet | 4 | 2.687 | 3.172 | 2.631 | 3.172 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 177.634 | 192.113 | 168.740 | 192.113 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1444.293 | 1520.889 | 1442.998 | 1520.889 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-decode | effect-prophet | 4 | 0.105 | 0.133 | 0.102 | 0.133 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-decode | python-prophet | 4 | 2.016 | 2.061 | 2.010 | 2.061 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-encode | effect-prophet | 4 | 0.040 | 0.042 | 0.040 | 0.042 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-encode | python-prophet | 4 | 0.344 | 0.366 | 0.342 | 0.366 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-fit | effect-prophet | 4 | 0.550 | 0.555 | 0.484 | 0.555 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-fit | python-prophet | 4 | 6.176 | 6.734 | 6.042 | 6.734 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-predict | effect-prophet | 4 | 0.160 | 0.160 | 0.156 | 0.160 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-predict | python-prophet | 4 | 2.885 | 3.021 | 2.855 | 3.021 | n/a |
| uncertainty-training-duplicates-auto-stan-v2 | fresh-process-restored-uncertainty | effect-prophet | 4 | 187.493 | 189.103 | 175.648 | 189.103 | n/a |
| uncertainty-training-duplicates-auto-stan-v2 | fresh-process-restored-uncertainty | python-prophet | 4 | 1519.940 | 1525.279 | 1478.391 | 1525.279 | n/a |
| uncertainty-training-duplicates-auto-stan-v2 | warm-uncertainty | effect-prophet | 4 | 0.731 | 1.131 | 0.593 | 1.131 | 137.9 |
| uncertainty-training-duplicates-auto-stan-v2 | warm-uncertainty | python-prophet | 4 | 18.015 | 19.016 | 17.717 | 19.016 | 117.9 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied-stan-v2 | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied-stan-v2 | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant-stan-v2 | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant-stan-v2 | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied-stan-v2 | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:33:54 - cmdstanpy - INFO - Chain [1] start processing<br>04:33:54 - cmdstanpy - INFO - Chain [1] done processing<br>04:33:54 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=41416 data file=/tmp/tmpy3q6e1bn/32qoruun.json init=/tmp/tmpy3q6e1bn/pd25x2xo.json output file=/tmp/tmpy3q6e1bn/prophet_modelblvs85ki/prophet_model-20261002043354.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpy3q6e1bn/32qoruun.json<br>init = /tmp/tmpy3q6e1bn/pd25x2xo.json<br>random<br>  seed = 41416<br>output<br>  file = /tmp/tmpy3q6e1bn/prophet_modelblvs85ki/prophet_model-20261002043354.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 671, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 254, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 211, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=41416 data file=/tmp/tmpy3q6e1bn/32qoruun.json init=/tmp/tmpy3q6e1bn/pd25x2xo.json output file=/tmp/tmpy3q6e1bn/prophet_modelblvs85ki/prophet_model-20261002043354.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpy3q6e1bn/32qoruun.json<br>init = /tmp/tmpy3q6e |
| map-training-zero-span-linear-varied-stan-v2 | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:33:55 - cmdstanpy - INFO - Chain [1] start processing<br>04:33:55 - cmdstanpy - INFO - Chain [1] done processing<br>04:33:55 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=6164 data file=/tmp/tmp_7gpgwj8/xdl3w10b.json init=/tmp/tmp_7gpgwj8/r85hg14b.json output file=/tmp/tmp_7gpgwj8/prophet_modelur8uvz65/prophet_model-20261002043355.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp_7gpgwj8/xdl3w10b.json<br>init = /tmp/tmp_7gpgwj8/r85hg14b.json<br>random<br>  seed = 6164<br>output<br>  file = /tmp/tmp_7gpgwj8/prophet_modelur8uvz65/prophet_model-20261002043355.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 671, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 254, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 211, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=6164 data file=/tmp/tmp_7gpgwj8/xdl3w10b.json init=/tmp/tmp_7gpgwj8/r85hg14b.json output file=/tmp/tmp_7gpgwj8/prophet_modelur8uvz65/prophet_model-20261002043355.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp_7gpgwj8/xdl3w10b.json<br>init = /tmp/tmp_7gpgwj8 |
| map-training-zero-span-linear-constant-stan-v2 | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 674, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 342, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant-stan-v2 | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 674, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 342, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `4d661a06a7e2f588f4b466cdcd4905753e3cce6b` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium-stan-v2`, `map-explicit-break-small-stan-v2`, `map-seasonal-breaks-irregular-medium-stan-v2`, `map-events-small-stan-v2`, `map-regressors-medium-stan-v2`, `map-conditional-seasonalities-medium-stan-v2`, `map-mixed-features-explicit-small-stan-v2`, `map-mixed-features-automatic-large-stan-v2`, `map-training-ordered-explicit-stan-v2`, `map-training-ordered-auto-stan-v2`, `map-training-unsorted-explicit-stan-v2`, `map-training-unsorted-auto-stan-v2`, `map-training-duplicates-explicit-stan-v2`, `map-training-duplicates-auto-stan-v2`, `map-training-duplicate-features-auto-stan-v2`, `uncertainty-training-duplicates-auto-stan-v2`, `map-training-zero-span-linear-varied-stan-v2`, `map-training-zero-span-flat-varied-stan-v2`, `map-training-zero-span-linear-constant-stan-v2`, `map-training-zero-span-flat-constant-stan-v2`, `evaluation-training-duplicates-stan-v2`, `linear-offset-scaling-absmax-stan-v2`, `linear-offset-scaling-minmax-stan-v2`, `linear-mixed-components-stan-v2`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:e259bf2342f35bf3f6622e4c3f90454cf7d6b1747a669b0a8bb62c6c4970ed9e`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:2dbc806622d42e7c5744f57782c623ba488a6b81b0e69d2f4e6ae46b0d466efa`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0-beta.107`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

