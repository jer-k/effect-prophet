# Country calendar diagnostic review

These are **local, native, dirty-tree diagnostics**, not retained release baselines. Raw runs stay
in gitignored `benchmark/results/runs/`; no named baseline or retained result was replaced.

## Correctness checkpoints

| Run                               | Scope                                                          | Outcome                                                                                                                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `2026-10-14T202723-355Z-d565e154` | All 25 country/control cases plus unchanged `map-events-small` | 26/26 passed; no failures or investigation flags; 422 timing groups.                                                                                                                                                                                       |
| `2026-10-14T204721-422Z-d565e154` | Complete linear suite                                          | 37/40 initially passed; two existing intentional zero-span differences and one harness metadata regression.                                                                                                                                                |
| `2026-10-14T210328-228Z-d565e154` | Complete flat suite                                            | 55/55 passed; no investigation flags. The host shell deadline interrupted orchestration after timing began; the already-running Python container completed successfully and the existing final report command produced the report from the frozen records. |
| `2026-10-14T212933-386Z-d565e154` | Complete logistic suite                                        | 52/52 passed; output-first investigation flags remain visible.                                                                                                                                                                                             |
| `2026-10-14T215030-827Z-d565e154` | Fixed-equation regression after correction                     | Passed; maximum forecast difference approximately `1.42e-14`.                                                                                                                                                                                              |

The fixed-equation regression was an omitted zero `eventColumnCount` in Python's authored-model
metadata, not a changed numerical equation. The adapter now emits zero explicitly, with a real
Python regression test. Earlier calendar attempts also exposed synchronous execution of an async
filesystem fit and Node's 1 MiB stdout limit; both were corrected without changing datasets,
priors, algorithms or numeric tolerances. Failed attempts remain local and unaltered.

All three full-suite attempts were sequential, native `linux/arm64` runs. The country-only run
used six raw repetitions per ordinary phase, which is descriptive evidence, not a stable-tail or
performance-threshold claim. Old retained gate sources differ, so the standard comparison tool
**withholds before/after timing comparisons**. A compatible pre-change timing baseline was not
established by those historical results.

## Country costs and model storage

Representative Effect medians from the country-only diagnostic, in milliseconds:

| Workload                                       |    Fit | Predict | JSON encode | JSON decode | Model bytes |
| ---------------------------------------------- | -----: | ------: | ----------: | ----------: | ----------: |
| US flat additive, with embedded country        | 16.622 |   1.534 |       1.034 |       1.533 |      12,253 |
| Exactly equivalent explicit US events          | 14.513 |   0.335 |       0.164 |       0.348 |       3,534 |
| Selected empty BV calendar                     |  1.984 |   0.305 |       0.181 |       0.301 |       2,819 |
| No-calendar empty control                      |  0.880 |   0.152 |       0.025 |       0.047 |         485 |
| Sweden, 730 history / 512 prediction rows      | 17.507 |   9.685 |       4.474 |       6.304 |      60,773 |
| Sweden, 2,190 history / 512 prediction rows    | 25.021 |  11.291 |       5.518 |       8.085 |      85,696 |
| Sweden, identical history / 32 prediction rows | 24.173 |   7.225 |       5.622 |       8.049 |      85,696 |
| China, 730 history / 512 prediction rows       | 11.657 |   6.651 |       1.912 |       2.919 |      28,794 |
| China, 2,190 history / 512 prediction rows     | 24.891 |   9.227 |       2.805 |       4.156 |      39,077 |

Sweden retains 14 event columns in these histories; China grows from 26 to 56. Country models
embed the complete selected-country horizon and custom provenance; explicit controls do not.
Warm prediction includes the public model/calendar validation and feature resolution, not only a
matrix kernel. The nontrivial small-batch cost warrants future narrowly scoped profiling; these
coarse medians do not isolate a private kernel or justify subtracting unrelated phase timings.
Worker RSS is recorded in raw results, approximately 135–252 MB for these representative rows;
it includes imports and prior operations and is not per-call allocation or process-tree memory.

## Actual npm artifact comparison

An isolated `git archive` of pre-feature `HEAD` (`d565e154`) rebuilt TypeScript and produced a real
npm tarball. It reused the identical release WASM artifact after verifying Rust sources,
manifests, lockfile and toolchain were unchanged. The current package check built and extracted a
real tarball and verified country lookup plus fresh-process restoration after bundled-file removal.

| Artifact                      | Packed bytes | Unpacked bytes | Files |
| ----------------------------- | -----------: | -------------: | ----: |
| Pre-feature archive build     |      350,431 |      1,607,305 |   129 |
| Current country-enabled build |    1,275,069 |      4,684,922 |   398 |
| Increase                      |      924,638 |      3,077,617 |   269 |

The increase includes all 250 country files, coverage/provenance, notices and added code/declarations.
These are actual npm bytes, not research gzip estimates. They are not a publication approval or a
clean release baseline.

## Remaining investigation and release gates

Existing non-country output-first cases have diagnostic differences at independently fitted
endpoints. No normalized-noise flags appeared here. Linear objective gaps occur for the irregular
and long-history defaults; stationarity excess appears for the automatic mixed/conditional and
long-history cases. Logistic flags occur for defaults-256, rate-change defaults and implicit-floor
large histories, including their uncertainty derivatives. For example, defaults-256 objective
values are approximately `-1786.0298` / `-1786.0610`, and its constrained residuals are approximately
`8818.19` / `1349.28`. The residuals are not a same-point gradient comparison or proof of an optimum.
Fitted-output and applicable interval gates passed; flags are not silently waived or cleared.
The prior retained summaries contain no corresponding flags, but their changed gate/runtime
contracts prevent attributing these differences to the calendar change. This remains a solver/
validation review item before promoting new release baselines.

Before release: review and commit implementation/adapters/cases/inputs, establish an appropriate
compatible pre-change regression comparison where available, rerun **all three complete suites**
sequentially from that clean commit, review flags and costs, retain/repoint the three named
baselines through the existing commands, and regenerate results/site pages. Do not promote these
dirty diagnostics or the corrected fixed-case subset as complete clean linear release evidence.
