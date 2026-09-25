# Stage H public evaluation benchmark review

This directory indexes the reviewed native-architecture public evaluation run. The result is descriptive timing evidence, not a performance ranking, universal speed claim, or statistical calibration study. The full raw samples, correctness records, failed cases and environment manifest live in the promoted snapshot under [`../baselines/`](../baselines/README.md).

The comparison class is `different-public-work`: Python requires a previously fitted mutable model and uses vectorized uncertainty; Effect refits sequentially and uses scalar simulation. Python baselines, search and final report assembly are explicit application loops, not Prophet APIs. Ineligible cases have no timing summaries; do not interpolate timings for them. RSS is a worker high-water mark, excludes Python CmdStan children, and is not heap/WASM-only allocation or a RAM ranking.

Run `npm run benchmark -- --case <case-id>` after a release-image rebuild to reproduce a subset. Run `npm run benchmark` for the complete suite, then review `report.md`, `report.json`, `eligible-cases.json`, `cases.json`, `manifest.json`, both adapter records and `records.jsonl` before promoting via `npm run benchmark:baseline -- <run-id> <baseline-id>`.
