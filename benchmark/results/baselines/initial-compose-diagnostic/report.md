# Effect Prophet benchmark — 2026-09-19T205822-746Z-bbd36f0b

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Max absolute difference | Max relative difference | Note |
| --- | --- | --- | ---: | ---: | --- |
| linear-small | different-objective | passed | n/a | n/a | Both implementations passed local checks; cross-language forecast equality is not applicable. |
| linear-medium | different-objective | passed | n/a | n/a | Both implementations passed local checks; cross-language forecast equality is not applicable. |
| linear-large | different-objective | passed | n/a | n/a | Both implementations passed local checks; cross-language forecast equality is not applicable. |
| fixed-linear-prediction-medium | equivalent-equation | passed | 7.105e-15 | 1.947e-16 | Cross-language projections passed evidence fixed-linear-equation-v1. |
| map-no-points-small | different-objective | passed | n/a | n/a | Both implementations passed local checks; cross-language forecast equality is not applicable. |
| map-explicit-break-small | equivalent-objective | passed | 7.107e-5 | 2.414e-5 | Cross-language projections passed evidence explicit-linear-map-objective-v1. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 2.390e-4 | 1.093e-2 | Cross-language projections passed evidence explicit-linear-map-seasonal-objective-v1. |
| map-explicit-breaks-large | equivalent-objective | passed | 3.504e-5 | 1.076e-5 | Cross-language projections passed evidence explicit-linear-map-objective-v1. |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
| fixed-linear-prediction-medium | input-preparation | effect-prophet | 30 | 0.006 | 0.012 | 0.004 | 0.018 |
| fixed-linear-prediction-medium | input-preparation | python-prophet | 30 | 1.202 | 1.363 | 1.124 | 1.677 |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.605 | 2.225 | 0.380 | 2.580 |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 6.356 | 7.217 | 5.422 | 7.747 |
| linear-large | input-preparation | effect-prophet | 2 | 0.039 | 0.059 | 0.039 | 0.059 |
| linear-large | input-preparation | python-prophet | 2 | 1.920 | 2.041 | 1.920 | 2.041 |
| linear-large | warm-fit-predict | effect-prophet | 2 | 4.150 | 5.863 | 4.150 | 5.863 |
| linear-large | warm-fit-predict | python-prophet | 2 | 85.338 | 86.558 | 85.338 | 86.558 |
| linear-large | warm-fit | effect-prophet | 2 | 4.728 | 14.285 | 4.728 | 14.285 |
| linear-large | warm-fit | python-prophet | 2 | 80.174 | 80.983 | 80.174 | 80.983 |
| linear-large | warm-predict | effect-prophet | 2 | 0.600 | 0.835 | 0.600 | 0.835 |
| linear-large | warm-predict | python-prophet | 2 | 5.547 | 6.013 | 5.547 | 6.013 |
| linear-medium | input-preparation | effect-prophet | 6 | 0.010 | 0.025 | 0.008 | 0.025 |
| linear-medium | input-preparation | python-prophet | 6 | 1.268 | 1.919 | 1.182 | 1.919 |
| linear-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.190 | 11.169 | 2.571 | 11.169 |
| linear-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 149.935 | 152.607 | 145.252 | 152.607 |
| linear-medium | warm-fit-predict | effect-prophet | 6 | 2.341 | 3.584 | 1.892 | 3.584 |
| linear-medium | warm-fit-predict | python-prophet | 6 | 145.559 | 148.940 | 142.992 | 148.940 |
| linear-medium | warm-fit | effect-prophet | 6 | 4.036 | 11.132 | 3.451 | 11.132 |
| linear-medium | warm-fit | python-prophet | 6 | 140.092 | 149.724 | 135.693 | 149.724 |
| linear-medium | warm-predict | effect-prophet | 6 | 0.697 | 1.109 | 0.308 | 1.109 |
| linear-medium | warm-predict | python-prophet | 6 | 5.947 | 6.595 | 5.652 | 6.595 |
| linear-small | cold-first-forecast | effect-prophet | 10 | 1437.292 | 1606.313 | 1351.468 | 1751.494 |
| linear-small | cold-first-forecast | python-prophet | 10 | 2693.575 | 2847.918 | 2612.910 | 2852.610 |
| linear-small | input-preparation | effect-prophet | 10 | 0.002 | 0.004 | 0.002 | 0.004 |
| linear-small | input-preparation | python-prophet | 10 | 0.947 | 1.231 | 0.916 | 1.256 |
| linear-small | model-json-decode | effect-prophet | 10 | 0.052 | 0.100 | 0.032 | 0.108 |
| linear-small | model-json-decode | python-prophet | 10 | 3.707 | 4.111 | 3.563 | 4.132 |
| linear-small | model-json-encode | effect-prophet | 10 | 0.098 | 0.973 | 0.032 | 11.707 |
| linear-small | model-json-encode | python-prophet | 10 | 0.897 | 1.101 | 0.748 | 1.123 |
| linear-small | warm-fit-predict-with-conversion | effect-prophet | 10 | 0.900 | 2.355 | 0.718 | 2.825 |
| linear-small | warm-fit-predict-with-conversion | python-prophet | 10 | 72.614 | 80.809 | 65.956 | 82.103 |
| linear-small | warm-fit-predict | effect-prophet | 10 | 1.432 | 3.831 | 0.777 | 4.194 |
| linear-small | warm-fit-predict | python-prophet | 10 | 68.393 | 81.785 | 65.157 | 82.389 |
| linear-small | warm-fit | effect-prophet | 10 | 2.483 | 4.825 | 2.090 | 6.108 |
| linear-small | warm-fit | python-prophet | 10 | 61.983 | 78.718 | 59.912 | 79.866 |
| linear-small | warm-predict | effect-prophet | 10 | 0.650 | 1.329 | 0.190 | 2.810 |
| linear-small | warm-predict | python-prophet | 10 | 6.350 | 6.701 | 5.110 | 7.872 |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 1106.374 | 1135.319 | 1079.556 | 1135.319 |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 2745.780 | 2978.520 | 2619.075 | 2978.520 |
| map-explicit-break-small | input-preparation | effect-prophet | 6 | 0.002 | 0.004 | 0.002 | 0.004 |
| map-explicit-break-small | input-preparation | python-prophet | 6 | 0.974 | 1.061 | 0.937 | 1.061 |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.144 | 1.042 | 0.138 | 1.042 |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 4.503 | 4.873 | 4.287 | 4.873 |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.115 | 2.042 | 0.061 | 2.042 |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.780 | 0.897 | 0.757 | 0.897 |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.073 | 1.499 | 0.671 | 1.499 |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 79.258 | 79.991 | 76.988 | 79.991 |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.888 | 5.648 | 1.398 | 5.648 |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 76.568 | 80.264 | 74.954 | 80.264 |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 2.670 | 7.903 | 2.133 | 7.903 |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 71.922 | 88.893 | 68.937 | 88.893 |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.358 | 1.591 | 0.195 | 1.591 |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 5.586 | 7.031 | 5.437 | 7.031 |
| map-explicit-breaks-large | input-preparation | effect-prophet | 2 | 0.034 | 0.035 | 0.034 | 0.035 |
| map-explicit-breaks-large | input-preparation | python-prophet | 2 | 1.879 | 1.990 | 1.879 | 1.990 |
| map-explicit-breaks-large | warm-fit-predict | effect-prophet | 2 | 19.049 | 20.823 | 19.049 | 20.823 |
| map-explicit-breaks-large | warm-fit-predict | python-prophet | 2 | 78.245 | 81.131 | 78.245 | 81.131 |
| map-explicit-breaks-large | warm-fit | effect-prophet | 2 | 43.188 | 265.427 | 43.188 | 265.427 |
| map-explicit-breaks-large | warm-fit | python-prophet | 2 | 71.933 | 75.328 | 71.933 | 75.328 |
| map-explicit-breaks-large | warm-predict | effect-prophet | 2 | 2.638 | 4.157 | 2.638 | 4.157 |
| map-explicit-breaks-large | warm-predict | python-prophet | 2 | 6.103 | 6.763 | 6.103 | 6.763 |
| map-no-points-small | warm-fit-predict | effect-prophet | 6 | 6.665 | 23.012 | 3.337 | 23.012 |
| map-no-points-small | warm-fit-predict | python-prophet | 6 | 70.280 | 72.751 | 68.178 | 72.751 |
| map-no-points-small | warm-fit | effect-prophet | 6 | 2.270 | 4.866 | 1.969 | 4.866 |
| map-no-points-small | warm-fit | python-prophet | 6 | 63.954 | 65.804 | 63.006 | 65.804 |
| map-no-points-small | warm-predict | effect-prophet | 6 | 0.998 | 39.377 | 0.827 | 39.377 |
| map-no-points-small | warm-predict | python-prophet | 6 | 6.205 | 6.454 | 5.700 | 6.454 |
| map-seasonal-breaks-irregular-medium | input-preparation | effect-prophet | 6 | 0.011 | 0.129 | 0.010 | 0.129 |
| map-seasonal-breaks-irregular-medium | input-preparation | python-prophet | 6 | 1.144 | 1.815 | 1.127 | 1.815 |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.076 | 0.083 | 0.071 | 0.083 |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 5.163 | 6.373 | 4.666 | 6.373 |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.127 | 5.588 | 0.091 | 5.588 |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 1.113 | 1.469 | 1.064 | 1.469 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.436 | 6.531 | 5.292 | 6.531 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 75.877 | 77.395 | 72.987 | 77.395 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 5.492 | 6.072 | 5.055 | 6.072 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 74.388 | 75.878 | 73.832 | 75.878 |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 7.369 | 12.796 | 6.824 | 12.796 |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 66.786 | 69.083 | 64.698 | 69.083 |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.476 | 0.862 | 0.265 | 0.862 |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 7.249 | 8.620 | 6.612 | 8.620 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `bbd36f0b733a56c0b77e0d3b1c66c8cb86beb7ce` (dirty)
- Host: `darwin/arm64`
- Container platform: `linux/amd64`
- Execution mode: architecture-emulated diagnostic run
- Selected cases: `linear-small`, `linear-medium`, `linear-large`, `fixed-linear-prediction-medium`, `map-no-points-small`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-explicit-breaks-large`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:d61f91c75bc4b1d079677a12f3c8318a004cda6bff5d4cf74f9435cad0418a5e`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:842f5e7a53b0ea57c4dfbfd3667d13a11644aa412593ae7c5132d0931476a754`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/x64`
- Processor: `VirtualApple @ 2.50GHz`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: unsupported; timings do not report a process-tree peak RSS

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/x86_64`
- Processor: `unavailable`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: unsupported; Prophet fitting may use a backend child process and timings do not report a process-tree peak RSS

