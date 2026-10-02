# Effect Prophet benchmark — 2026-10-01T224335-779Z-4d661a06

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| map-mixed-features-automatic-large-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-ordered-explicit-stan-v2 | equivalent-objective | passed | 3.268e-12 | 0.000e+0 | 0.000e+0 | 3.268e-12 | 4.635e-15 | Verified equivalent behavior for this configuration under evidence linear-stan-map-v2. |
| map-training-ordered-auto-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-unsorted-explicit-stan-v2 | equivalent-objective | passed | 3.268e-12 | 0.000e+0 | 0.000e+0 | 3.268e-12 | 4.635e-15 | Verified equivalent behavior for this configuration under evidence linear-stan-map-v2. |
| map-training-unsorted-auto-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-duplicates-explicit-stan-v2 | equivalent-objective | passed | 1.691e-11 | 0.000e+0 | 0.000e+0 | 1.691e-11 | 5.791e-14 | Verified equivalent behavior for this configuration under evidence linear-stan-map-v2. |
| map-training-duplicates-auto-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-duplicate-features-auto-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| uncertainty-training-duplicates-auto-stan-v2 | scalar-process-different-public-work | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-zero-span-linear-varied-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-flat-varied-stan-v2 | equivalent-objective | passed | 8.557e-5 | 0.000e+0 | 0.000e+0 | 8.557e-5 | 3.338e-4 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-zero-span-linear-constant-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-flat-constant-stan-v2 | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| evaluation-training-duplicates-stan-v2 | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.209e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| linear-offset-scaling-minmax-stan-v2 | equivalent-objective | passed | 6.111e-13 | 2.911e-13 | 2.911e-13 | 8.384e-13 | 4.465e-14 | Verified equivalent behavior for this configuration under evidence linear-stan-map-v2. |
| linear-mixed-components-stan-v2 | equivalent-objective | passed | 1.248e-10 | 2.471e-11 | 0.000e+0 | 1.446e-10 | 1.298e-10 | Verified equivalent behavior for this configuration under evidence linear-stan-map-v2. |

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
| evaluation-training-duplicates-stan-v2 | evaluation-baseline | effect-prophet | 4 | 1.330 | 1.668 | 1.277 | 1.668 | 153.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-baseline | python-prophet | 4 | 1.477 | 1.675 | 1.465 | 1.675 | 117.5 |
| evaluation-training-duplicates-stan-v2 | evaluation-holdout | effect-prophet | 4 | 4.244 | 4.341 | 3.791 | 4.341 | 153.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-holdout | python-prophet | 4 | 24.449 | 25.095 | 24.155 | 25.095 | 117.9 |
| evaluation-training-duplicates-stan-v2 | evaluation-plan | effect-prophet | 4 | 0.821 | 0.939 | 0.801 | 0.939 | 133.4 |
| evaluation-training-duplicates-stan-v2 | evaluation-plan | python-prophet | 4 | 0.957 | 1.092 | 0.954 | 1.092 | 115.0 |
| evaluation-training-duplicates-stan-v2 | evaluation-point | effect-prophet | 4 | 7.444 | 7.597 | 7.159 | 7.597 | 153.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-point | python-prophet | 4 | 56.709 | 59.361 | 55.776 | 59.361 | 117.5 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-decode | effect-prophet | 4 | 0.243 | 0.262 | 0.243 | 0.262 | 153.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 117.9 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-encode | effect-prophet | 4 | 0.306 | 0.562 | 0.285 | 0.562 | 153.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.011 | 0.008 | 0.011 | 117.9 |
| evaluation-training-duplicates-stan-v2 | evaluation-search | effect-prophet | 4 | 6.114 | 7.955 | 6.081 | 7.955 | 153.1 |
| evaluation-training-duplicates-stan-v2 | evaluation-search | python-prophet | 4 | 61.879 | 64.622 | 58.275 | 64.622 | 117.9 |
| linear-mixed-components-stan-v2 | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.076 | 0.051 | 0.076 | n/a |
| linear-mixed-components-stan-v2 | adapter-input-conversion | python-prophet | 4 | 0.578 | 0.645 | 0.563 | 0.645 | n/a |
| linear-mixed-components-stan-v2 | cold-first-forecast | effect-prophet | 4 | 201.625 | 237.957 | 198.596 | 237.957 | n/a |
| linear-mixed-components-stan-v2 | cold-first-forecast | python-prophet | 4 | 1477.922 | 1542.622 | 1468.593 | 1542.622 | n/a |
| linear-mixed-components-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 172.630 | 177.416 | 172.328 | 177.416 | n/a |
| linear-mixed-components-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1524.946 | 1628.187 | 1523.526 | 1628.187 | n/a |
| linear-mixed-components-stan-v2 | model-json-decode | effect-prophet | 4 | 0.158 | 0.588 | 0.136 | 0.588 | n/a |
| linear-mixed-components-stan-v2 | model-json-decode | python-prophet | 4 | 3.896 | 3.999 | 3.704 | 3.999 | n/a |
| linear-mixed-components-stan-v2 | model-json-encode | effect-prophet | 4 | 0.074 | 0.135 | 0.072 | 0.135 | n/a |
| linear-mixed-components-stan-v2 | model-json-encode | python-prophet | 4 | 0.696 | 0.739 | 0.683 | 0.739 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.814 | 5.088 | 4.706 | 5.088 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 4 | 28.499 | 31.262 | 28.342 | 31.262 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict | effect-prophet | 4 | 5.440 | 6.191 | 5.049 | 6.191 | n/a |
| linear-mixed-components-stan-v2 | warm-fit-predict | python-prophet | 4 | 29.471 | 29.638 | 28.580 | 29.638 | n/a |
| linear-mixed-components-stan-v2 | warm-fit | effect-prophet | 4 | 5.744 | 6.102 | 5.628 | 6.102 | n/a |
| linear-mixed-components-stan-v2 | warm-fit | python-prophet | 4 | 23.899 | 24.950 | 22.996 | 24.950 | n/a |
| linear-mixed-components-stan-v2 | warm-predict | effect-prophet | 4 | 0.379 | 0.457 | 0.377 | 0.457 | n/a |
| linear-mixed-components-stan-v2 | warm-predict | python-prophet | 4 | 4.912 | 5.015 | 4.837 | 5.015 | n/a |
| linear-offset-scaling-minmax-stan-v2 | adapter-input-conversion | effect-prophet | 4 | 0.013 | 0.024 | 0.012 | 0.024 | n/a |
| linear-offset-scaling-minmax-stan-v2 | adapter-input-conversion | python-prophet | 4 | 0.508 | 0.526 | 0.486 | 0.526 | n/a |
| linear-offset-scaling-minmax-stan-v2 | cold-first-forecast | effect-prophet | 4 | 185.252 | 206.967 | 184.999 | 206.967 | n/a |
| linear-offset-scaling-minmax-stan-v2 | cold-first-forecast | python-prophet | 4 | 1548.553 | 1731.403 | 1541.202 | 1731.403 | n/a |
| linear-offset-scaling-minmax-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 168.248 | 183.888 | 168.189 | 183.888 | n/a |
| linear-offset-scaling-minmax-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1533.129 | 1574.326 | 1514.372 | 1574.326 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-decode | effect-prophet | 4 | 0.112 | 0.858 | 0.098 | 0.858 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-decode | python-prophet | 4 | 2.284 | 2.757 | 2.235 | 2.757 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-encode | effect-prophet | 4 | 0.068 | 0.080 | 0.060 | 0.080 | n/a |
| linear-offset-scaling-minmax-stan-v2 | model-json-encode | python-prophet | 4 | 0.458 | 0.495 | 0.432 | 0.495 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.576 | 5.193 | 4.544 | 5.193 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict-with-conversion | python-prophet | 4 | 29.255 | 30.851 | 28.160 | 30.851 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict | effect-prophet | 4 | 5.251 | 5.416 | 5.229 | 5.416 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit-predict | python-prophet | 4 | 27.534 | 28.621 | 27.358 | 28.621 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit | effect-prophet | 4 | 4.904 | 5.687 | 4.582 | 5.687 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-fit | python-prophet | 4 | 24.787 | 26.159 | 24.661 | 26.159 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-predict | effect-prophet | 4 | 0.321 | 0.338 | 0.316 | 0.338 | n/a |
| linear-offset-scaling-minmax-stan-v2 | warm-predict | python-prophet | 4 | 3.158 | 3.242 | 3.096 | 3.242 | n/a |
| map-training-duplicates-explicit-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 164.569 | 173.077 | 161.393 | 173.077 | n/a |
| map-training-duplicates-explicit-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1540.231 | 1700.770 | 1498.669 | 1700.770 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-decode | effect-prophet | 4 | 0.147 | 0.211 | 0.142 | 0.211 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-decode | python-prophet | 4 | 2.238 | 2.731 | 2.203 | 2.731 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-encode | effect-prophet | 4 | 0.060 | 0.077 | 0.059 | 0.077 | n/a |
| map-training-duplicates-explicit-stan-v2 | model-json-encode | python-prophet | 4 | 0.484 | 2.266 | 0.459 | 2.266 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-fit | effect-prophet | 4 | 3.355 | 3.470 | 3.163 | 3.470 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-fit | python-prophet | 4 | 21.769 | 24.087 | 20.494 | 24.087 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-predict | effect-prophet | 4 | 0.231 | 0.290 | 0.222 | 0.290 | n/a |
| map-training-duplicates-explicit-stan-v2 | warm-predict | python-prophet | 4 | 3.061 | 3.374 | 2.964 | 3.374 | n/a |
| map-training-ordered-explicit-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 173.309 | 180.826 | 167.857 | 180.826 | n/a |
| map-training-ordered-explicit-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1637.426 | 1924.846 | 1601.067 | 1924.846 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-decode | effect-prophet | 4 | 0.147 | 0.267 | 0.131 | 0.267 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-decode | python-prophet | 4 | 2.116 | 2.242 | 2.101 | 2.242 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-encode | effect-prophet | 4 | 0.074 | 0.102 | 0.061 | 0.102 | n/a |
| map-training-ordered-explicit-stan-v2 | model-json-encode | python-prophet | 4 | 0.461 | 0.815 | 0.420 | 0.815 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-fit | effect-prophet | 4 | 3.532 | 4.384 | 3.137 | 4.384 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-fit | python-prophet | 4 | 22.973 | 24.399 | 22.432 | 24.399 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-predict | effect-prophet | 4 | 0.280 | 0.542 | 0.233 | 0.542 | n/a |
| map-training-ordered-explicit-stan-v2 | warm-predict | python-prophet | 4 | 2.902 | 3.608 | 2.802 | 3.608 | n/a |
| map-training-unsorted-explicit-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 172.276 | 178.770 | 167.164 | 178.770 | n/a |
| map-training-unsorted-explicit-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1556.166 | 1603.768 | 1543.703 | 1603.768 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-decode | effect-prophet | 4 | 0.194 | 0.251 | 0.192 | 0.251 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-decode | python-prophet | 4 | 2.175 | 2.267 | 2.154 | 2.267 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-encode | effect-prophet | 4 | 0.071 | 0.072 | 0.059 | 0.072 | n/a |
| map-training-unsorted-explicit-stan-v2 | model-json-encode | python-prophet | 4 | 0.442 | 0.527 | 0.438 | 0.527 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-fit | effect-prophet | 4 | 3.550 | 3.868 | 3.514 | 3.868 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-fit | python-prophet | 4 | 23.633 | 25.021 | 21.935 | 25.021 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-predict | effect-prophet | 4 | 0.268 | 0.510 | 0.250 | 0.510 | n/a |
| map-training-unsorted-explicit-stan-v2 | warm-predict | python-prophet | 4 | 2.884 | 3.555 | 2.788 | 3.555 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 173.061 | 179.519 | 170.762 | 179.519 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1579.429 | 1611.067 | 1570.816 | 1611.067 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-decode | effect-prophet | 4 | 0.110 | 0.191 | 0.104 | 0.191 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-decode | python-prophet | 4 | 2.333 | 2.836 | 2.291 | 2.836 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-encode | effect-prophet | 4 | 0.045 | 0.075 | 0.038 | 0.075 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | model-json-encode | python-prophet | 4 | 0.337 | 0.370 | 0.326 | 0.370 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-fit | effect-prophet | 4 | 0.699 | 0.897 | 0.672 | 0.897 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-fit | python-prophet | 4 | 3.293 | 4.003 | 3.056 | 4.003 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-predict | effect-prophet | 4 | 0.165 | 0.197 | 0.160 | 0.197 | n/a |
| map-training-zero-span-flat-constant-stan-v2 | warm-predict | python-prophet | 4 | 2.909 | 3.853 | 2.709 | 3.853 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | fresh-process-restored-predict | effect-prophet | 4 | 167.273 | 174.590 | 162.568 | 174.590 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | fresh-process-restored-predict | python-prophet | 4 | 1494.960 | 1577.539 | 1422.282 | 1577.539 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-decode | effect-prophet | 4 | 0.122 | 0.158 | 0.121 | 0.158 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-decode | python-prophet | 4 | 1.997 | 2.087 | 1.907 | 2.087 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-encode | effect-prophet | 4 | 0.041 | 0.090 | 0.039 | 0.090 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | model-json-encode | python-prophet | 4 | 0.334 | 0.357 | 0.328 | 0.357 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-fit | effect-prophet | 4 | 0.520 | 0.836 | 0.485 | 0.836 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-fit | python-prophet | 4 | 5.500 | 6.793 | 5.413 | 6.793 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-predict | effect-prophet | 4 | 0.187 | 0.207 | 0.140 | 0.207 | n/a |
| map-training-zero-span-flat-varied-stan-v2 | warm-predict | python-prophet | 4 | 2.799 | 3.131 | 2.697 | 3.131 | n/a |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied-stan-v2 | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied-stan-v2 | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant-stan-v2 | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant-stan-v2 | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied-stan-v2 | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>22:45:11 - cmdstanpy - INFO - Chain [1] start processing<br>22:45:11 - cmdstanpy - INFO - Chain [1] done processing<br>22:45:11 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=19889 data file=/tmp/tmp3wijwd9n/e_8ym6dm.json init=/tmp/tmp3wijwd9n/l6ekkeu5.json output file=/tmp/tmp3wijwd9n/prophet_model2bics4ba/prophet_model-20261001224511.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp3wijwd9n/e_8ym6dm.json<br>init = /tmp/tmp3wijwd9n/l6ekkeu5.json<br>random<br>  seed = 19889<br>output<br>  file = /tmp/tmp3wijwd9n/prophet_model2bics4ba/prophet_model-20261001224511.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 671, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 254, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 211, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=19889 data file=/tmp/tmp3wijwd9n/e_8ym6dm.json init=/tmp/tmp3wijwd9n/l6ekkeu5.json output file=/tmp/tmp3wijwd9n/prophet_model2bics4ba/prophet_model-20261001224511.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp3wijwd9n/e_8ym6dm.json<br>init = /tmp/tmp3wijw |
| map-training-zero-span-linear-varied-stan-v2 | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>22:45:13 - cmdstanpy - INFO - Chain [1] start processing<br>22:45:13 - cmdstanpy - INFO - Chain [1] done processing<br>22:45:13 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=47685 data file=/tmp/tmpe58syjp2/cdzfxd37.json init=/tmp/tmpe58syjp2/0d_ompbl.json output file=/tmp/tmpe58syjp2/prophet_modelgkq90o2p/prophet_model-20261001224513.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpe58syjp2/cdzfxd37.json<br>init = /tmp/tmpe58syjp2/0d_ompbl.json<br>random<br>  seed = 47685<br>output<br>  file = /tmp/tmpe58syjp2/prophet_modelgkq90o2p/prophet_model-20261001224513.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 671, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 254, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 211, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=47685 data file=/tmp/tmpe58syjp2/cdzfxd37.json init=/tmp/tmpe58syjp2/0d_ompbl.json output file=/tmp/tmpe58syjp2/prophet_modelgkq90o2p/prophet_model-20261001224513.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpe58syjp2/cdzfxd37.json<br>init = /tmp/tmpe58sy |
| map-training-zero-span-linear-constant-stan-v2 | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 674, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 342, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant-stan-v2 | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1131, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1108, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 875, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 674, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 342, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `4d661a06a7e2f588f4b466cdcd4905753e3cce6b` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `map-training-ordered-explicit-stan-v2`, `map-training-ordered-auto-stan-v2`, `map-training-unsorted-explicit-stan-v2`, `map-training-unsorted-auto-stan-v2`, `map-training-duplicates-explicit-stan-v2`, `map-training-duplicates-auto-stan-v2`, `map-training-duplicate-features-auto-stan-v2`, `uncertainty-training-duplicates-auto-stan-v2`, `map-training-zero-span-linear-varied-stan-v2`, `map-training-zero-span-flat-varied-stan-v2`, `map-training-zero-span-linear-constant-stan-v2`, `map-training-zero-span-flat-constant-stan-v2`, `evaluation-training-duplicates-stan-v2`, `map-mixed-features-automatic-large-stan-v2`, `linear-mixed-components-stan-v2`, `linear-offset-scaling-minmax-stan-v2`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:129f26d3fba75d933c3b89fe1ba44056724aec000540b6553a588a71c01fb4ad`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:b9ad12f275b26869435cccffa90aabcb55f680b4cf53a0ce59936e4ce3cf7cb8`

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

