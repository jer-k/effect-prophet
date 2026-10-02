# Native-arm64 linear Stan migration diagnostic

Run: `2026-10-01T224335-779Z-4d661a06`, native `linux/arm64`.

This is retained diagnostic evidence, **not final migration acceptance**. Sixteen versioned counterparts preserve datasets, priors, objectives and the 10,000-step per-attempt budget. Automatic linear selection and Newton retry follow the new public policy. CmdStan output precision is explicitly 12 significant digits; optimizer tolerances are unchanged.

Eight cases pass all declared gates and alone retain timings. Six automatic-changepoint cases fail the stationarity-comparison gate; their timings are withheld despite close objective/noise evidence. Two zero-span linear cases remain unusable comparisons (typed Effect rejection versus Python failure/non-finite output).

Eigen ascending eigenpair ordering is included. The original coordinate failure history remains in `../linear-growth-training-rows-native-arm64/` without changes. See `report.md`, `report.json`, the raw implementation results, cases, row snapshots and manifest for full evidence. The corresponding amd64 diagnostic is `../linear-map-stan-amd64-diagnostic/`.
