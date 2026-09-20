# Model persistence

`encodeFittedModel` projects a trusted fitted model into JSON-compatible prediction state.
`decodeFittedModel` parses an untrusted payload back into a deeply frozen model without loading
WASM, selecting a fitting Layer, or refitting observations.

The current portable model kinds are:

- `linear-trend` — intercept, slope, and time scaling;
- `linear-piecewise-map` — trend, changepoints, deltas, ordered seasonality definitions and
  coefficients, positive observation noise, and MAP diagnostics;
- `flat-map` — constant level, ordered seasonality definitions and coefficients, positive
  observation noise, and flat MAP diagnostics.

Payloads from the removed pre-release additive ridge model are rejected as typed decode errors;
models are never silently refit or migrated.

## Flat MAP payload

A flat payload stores all state required to rebuild Fourier features and predict:

```json
{
  "modelKind": "flat-map",
  "coefficients": {
    "level": 1.25,
    "seasonal": [0.5, -0.1]
  },
  "seasonalities": [
    {
      "name": "daily-custom",
      "periodDays": 1,
      "fourierOrder": 1,
      "priorScale": 10
    }
  ],
  "noiseScale": 0.2,
  "fitSummary": {
    "method": "flat-map-coordinate-v1",
    "termination": "converged",
    "valueScale": 3,
    "observationCount": 12,
    "iterations": 5,
    "objective": -4.2,
    "stationarityResidual": 1e-10
  }
}
```

Decoding reconstructs deterministic coefficient offsets from the ordered definitions. Automatic
built-in controls are resolved before fitting, so payloads store concrete canonical definitions
(`yearly`, `weekly`, and `daily`) rather than `"auto"`. Reload never reruns history/cadence rules and
prediction timestamps cannot change the saved layout.

Decoding rejects non-finite levels/coefficients/diagnostics, non-positive noise and value scales,
coefficient-count misalignment, duplicated or invalid definitions, non-canonical built-in periods,
and inconsistent shortcut summaries. It never infers metadata from prediction rows or current
defaults.

The payload has no independent format version and is interpreted by the installed package's
schema. Compatibility therefore remains experimental until the package reaches `1.0.0`.
