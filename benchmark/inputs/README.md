# Versioned benchmark inputs

`v1/` contains the existing deterministic datasets, moved without changing their bytes.
Each version has a `manifest.json` recording recipe identities and SHA-256 hashes.
Training rows and future rows include all required covariates, masks and bounds.

Cases reference `v1/<dataset>.json`. Normal runs read and verify these files directly; they
never regenerate inputs or copy them into each run. Retained runs preserve their input references
and hashes. Keep an input version while any retained evidence references it.

Explicit maintenance generation:

```sh
npm run benchmark:setup -- v2
```

Generation cannot overwrite existing version bytes. Recipe changes require a new version,
updated case references and committed datasets. The recipes are analytic and seedless, combining
piecewise trends with known seasonal, event, regressor and bounded-noise terms. No external
dataset license or network access is needed.

Historical snapshots may still contain their original `inputs/generated/` copies. Those are
historical evidence, not the normal input location for new runs.
