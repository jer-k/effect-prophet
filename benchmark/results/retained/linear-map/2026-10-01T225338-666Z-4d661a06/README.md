# Amd64 linear Stan migration diagnostic

Run: `2026-10-01T225338-666Z-4d661a06`, `linux/amd64` emulated on an arm64 host.

Four diagnostic cases exercise ordered/unsorted unique automatic MAP, duplicate automatic MAP, and larger mixed features. All fail the declared stationarity-comparison gate; **no timings are accepted**. Objectives and normalized noise alone do not qualify results. This reproduces the blocker outside native-arm64 Python and does not establish a CPU-only root cause.

Controls retain the 10,000-step per-attempt budget and default Stan tolerances. Twelve-digit CmdStan output and Eigen ascending eigenpair ordering are included. Raw results, complete inputs, controls and provenance are retained alongside the report. Native-arm64 evidence is in `../linear-map-stan-native-arm64-diagnostic/`; the original coordinate failures remain untouched.
