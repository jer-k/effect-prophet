# Model persistence

`encodeFittedModel` projects a trusted fitted model into JSON-compatible prediction state.
`decodeFittedModel` parses an untrusted payload back into a deeply frozen model without loading
WASM, selecting a fitting Layer, or refitting observations.

The current portable model kinds are:

- `linear-trend` — intercept, slope, and time scaling;
- `linear-piecewise-map` — target scaling, relative piecewise trend and changepoints, ordered mode-resolved seasonality definitions and coefficients, condition names, events, fitted regressors, positive observation noise, and MAP diagnostics;
- `flat-map` — target scaling, relative constant level, ordered mode-resolved seasonalities, events and regressors, positive observation noise, and flat MAP diagnostics;
- `logistic-piecewise-map` — floor-aware target scaling, dimensionless rate/time-offset/deltas, training time bounds, resolved changepoints and mixed features, output-unit noise, and logistic MAP diagnostics. Future capacities and explicit floors remain row inputs and are not persisted as curves.

Payloads from the removed pre-release additive ridge model are rejected as typed decode errors;
models are never silently refit or migrated.

## Flat MAP payload

A flat payload stores all state required to rebuild Fourier features and predict:

```json
{
  "modelKind": "flat-map",
  "targetScaling": {
    "mode": "minmax",
    "offset": 10,
    "scale": 3
  },
  "coefficients": {
    "level": 1.25,
    "seasonal": [0.5, -0.1]
  },
  "seasonalities": [
    {
      "name": "daily-custom",
      "periodDays": 1,
      "fourierOrder": 1,
      "priorScale": 10,
      "mode": "additive"
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
prediction timestamps cannot change the saved layout. Conditional custom definitions retain their
optional `conditionName`. Every seasonality and regressor persists its resolved `mode`, while events persist the resolved holiday mode. Older payloads without mode metadata decode explicitly as additive; reload never reapplies current mode defaults.
Condition values and training masks are not prediction state and are never persisted. A reloaded
conditional model therefore requires fresh exact boolean condition maps for every nonempty
prediction row.

Decoding rejects non-finite levels/coefficients/diagnostics/scaling offsets, non-positive noise and
target/value scales, coefficient-count misalignment, duplicated or invalid definitions,
non-canonical built-in periods, inconsistent objective/mode identities, condition/component name collisions,
and inconsistent shortcut summaries. Legacy MAP payloads without `targetScaling` decode as absmax
with offset zero and their stored `fitSummary.valueScale`. Decoding never infers metadata from
prediction rows or current defaults.

The payload has no independent format version and is interpreted by the installed package's
schema. Compatibility therefore remains experimental until the package reaches `1.0.0`.
