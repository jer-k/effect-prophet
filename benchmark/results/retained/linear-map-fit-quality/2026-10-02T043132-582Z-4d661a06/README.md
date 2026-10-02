# Linear Stan MAP fit-quality closeout — native arm64

Reviewed local run: `2026-10-02T043132-582Z-4d661a06`, native `linux/arm64` on Apple M4 Pro.

## Acceptance

Twenty-two of 24 cases pass the [approved EP-096 fit-quality policy](../../../../../docs/decisions/linear-map-benchmark-acceptance.md). The two zero-span linear cases retain eight failure records and no timings. The 290 timing summaries contain only independently eligible cases. Coverage includes the original linear feature workloads, the complete training-row migration set, large automatic features, absmax/minmax scaling, mixed components, duplicate uncertainty replay and duplicate-aware evaluation/persistence.

Evidence identity is `linear-stan-map-fit-quality-v3`. Objective (`0.01` absolute), normalized noise (`0.0002` absolute), and all other applicable quantity/lifecycle bounds are unchanged. Stationarity is explicitly diagnostic-only under EP-097, not a near-stationarity certificate. The 36 residual rows remain in both JSON and Markdown.

Across this run, the maximum objective difference is approximately `0.001203`, normalized-noise difference `7.893e-6`, and forecast difference `0.006924` in the respective case's output units. The maximum endpoint stationarity difference is approximately `79.984`; the larger duplicate/L-BFGS differences have not been assigned the ordered-case trajectory explanation. Each case independently passes its own unchanged bounds.

## Preserved evidence

Original coordinate-exhaustion and stationarity-equality snapshots remain byte-identical. Their failed cases are not requalified, their original `linear-stan-map-v2` evidence and `stationarityAbsolute: 0.01` declarations are unchanged, and their timings remain withheld.

`review.json` records independent artifact/hash checks and per-run objective/noise differences. All 62 snapshotted fixture/historical files remained unchanged through fixture regeneration and validation.

## Provenance and limits

This is deliberately retained **dirty-tree local implementation evidence**, not a clean release baseline. The recorded Git revision alone does not identify the uncommitted source. Container image identities, cases, complete input snapshots, locks, versions, raw samples and failures are retained. Executable hashes independently read from those images:

- Release WASM SHA-256: `e4baec49d1c324473a5b7a3aa0c6c91ec241debe555316bb1625c1a88c0ae3d1`.
- Pinned Prophet native executable SHA-256: `faff590e554b6dd4e8c232d2a51c63fe734ae018dd529ee7433a5cdcd86fc54e`.

Timing overlapped local validation workloads. Measurements are descriptive absolute samples, not isolated performance estimates, rankings, or release thresholds. Small sample counts do not establish stable tails. The uncertainty/evaluation entries retain their different-public-work classifications and existing distribution/metric/RSS limitations. No global optimum, small KKT residual, bitwise trajectory, or fitted uncertainty calibration is claimed.

See [report.md](report.md), [report.json](report.json), [review.json](review.json), and [manifest.json](manifest.json).
