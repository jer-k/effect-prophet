# Benchmark data

`generate-data.ts` creates deterministic datasets under `data/generated/`. Generated files are
shared read-only by the Docker Compose runners and are hashed into each run manifest.

The `deterministic-piecewise-weekly-v1` recipe combines a linear trend, two slope changes, a weekly
term, and deterministic bounded perturbations. Regular and irregular timestamp variants are used.
No network access or external dataset license is required.
