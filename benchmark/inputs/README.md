# Versioned benchmark inputs

`v1/` contains the existing deterministic datasets, moved without changing their bytes.
`v2/` contains the 18 new [logistic reconciliation datasets](../cases/growth/logistic/README.md),
including historical and future prediction rows; it does not duplicate or replace v1.
`v5/` contains eight [country-calendar workloads](../cases/holidays/README.md): basic/mixed/bounded
histories, sparse/estimated/partial future years, and occurrence/name-heavy scaling cases.
`v6/` adds the identical long training history with a smaller prediction batch without changing v5.
`v7/` contains three histories with known outliers (linear, flat and logistic) for the in-sample
anomaly cases; they have no future rows.
Each version has a `manifest.json` recording recipe identities and SHA-256 hashes.
Training rows and future rows include all required covariates, masks and bounds.

Cases reference explicit versioned paths such as `v1/<dataset>.json` or `v5/<dataset>.json`. Normal runs read and verify these files directly; they
never regenerate inputs or copy them into each run. Retained runs preserve their input references
and hashes. Keep an input version while any retained evidence references it.

Explicit maintenance generation:

```sh
npm run benchmark:setup -- v2
```

Generation cannot overwrite existing version bytes. Recipe changes require a new version,
updated case references and committed datasets. The recipes are analytic and seedless, combining
piecewise/logistic trends with known seasonal, event, regressor and bounded-noise terms. No external
dataset license or network access is needed.

Historical snapshots may still contain their original `inputs/generated/` copies. Those are
historical evidence, not the normal input location for new runs.
