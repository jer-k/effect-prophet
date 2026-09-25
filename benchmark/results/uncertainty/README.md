# EP-081 — local Stage G uncertainty benchmark review

**Status:** Uncommitted review evidence. Native Linux/arm64 Docker on Apple M4 Pro; release WASM, pinned Python Prophet 1.4.0. Full raw samples, dataset hashes, provenance, correctness records and report are in ignored local run [`2026-09-24T000231-613Z-36ead619`](../runs/2026-09-24T000231-613Z-36ead619/report.md). Classification is `scalar-process-different-public-work`; review the run before any deliberate baseline promotion. This is not a public performance guarantee.

In the original run, eleven of twelve cases passed both independent correctness gates. The 256-training/64-future-row implicit-floor logistic interval case failed Effect's scalar simulator with `non-finite-forecast` and was **not timed**; Python passed. A local release-WASM reproduction found all 8,192 public samples finite, but Rust's interpolation on plateaued trend samples reversed five lower/upper pairs by 1–2 ULPs. The original failed records remain in the ignored run. EP-094 fixes this interpolation and changes the public simulation identity to v2 without changing sample draws. A separate native Linux/arm64 release-WASM [rerun](../runs/2026-09-24T153023-456Z-cce56b08/report.md) of this single case passed both independent correctness gates, became eligible, and recorded absolute timings. That rerun does not rewrite the original eleven-of-twelve result or establish cross-version bitwise interval parity.

Representative **absolute warm public call** medians (six samples per implementation, from two runs; milliseconds):

| Case (rows × draws)                                                | Output    | Effect | Python scalar |
| ------------------------------------------------------------------ | --------- | -----: | ------------: |
| Linear nonzero-offset historical (8 × 128)                         | intervals |  0.427 |        21.891 |
| Linear mixed historical/future irregular (12 × 512)                | samples   |  0.855 |        74.256 |
| Flat mixed with features (24 × 512)                                | intervals |  1.094 |        78.501 |
| Flat mixed larger (64 × 128)                                       | samples   |  1.345 |        22.233 |
| Logistic implicit floor (24 × 512)                                 | samples   |  1.803 |        86.044 |
| Logistic explicit floor (24 × 512)                                 | intervals |  1.553 |        97.208 |
| Logistic changing bounds + conditions/events/regressors (24 × 128) | intervals |  0.736 |        34.127 |

These are **not equivalent-work speedup measurements**. Python's `predict(..., vectorized=False)` performs point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices, while Effect returns interval or row-major sample results. Python's default vectorized approximation is different and not used as the denominator. Warm runs exclude fit, input conversion and JSON persistence; cold/restored phases and raw values are in the run report. Process high-water RSS includes import and fit/setup, excludes Python's fitting child and is not a simulation allocation estimate or RAM ranking. Six repetitions cannot establish stable tails. There is no observed uncertainty simulation slowdown in the **eligible** scalar-path cases; the pre-existing Stage F logistic **fit** crossover is owned separately by EP-093.

To reproduce against the current suite after review, run `npm run benchmark -- --case <case-id>` for a single case, or run all declarations from `benchmark/cases/uncertainty.ts` with `--case` for each ID. Use release images (omit `--no-build` after code changes). Review `eligible-cases.json`, `report.json`, `effect-prophet.json`, `python-prophet.json`, `manifest.json`, `cases.json` and `records.jsonl` in the run directory before comparing timings. No speed threshold or optimization is introduced in EP-081.
