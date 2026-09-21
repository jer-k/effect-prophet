# Benchmark data

`generate-data.ts` creates deterministic shared datasets under `data/generated/`. Every training
observation and future prediction row is explicit, including required regressors and boolean
conditions.

Targets combine deterministic piecewise trends with known seasonal, event, regressor, and bounded
noise terms. `data/generated/manifest.json` records each generated file's stable recipe identity
and SHA-256. The run orchestrator regenerates the files before execution and records the manifest
and selected dataset hashes in run provenance.

The feature datasets cover event windows and overlaps, all regressor transformation controls,
dense and sparse conditional seasonalities, a fixture-scale mixed model, and an `N=768` mixed
automatic-changepoint model. No network access or external dataset license is required.
