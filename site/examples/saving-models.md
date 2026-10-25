# Saving and loading models

Fitting takes a moment; predicting from a fitted model is fast. Save a fitted model as JSON and
load it later, for example to fit once in a nightly job and forecast on demand in an API.

<<< @/snippets/save-and-load.ts

## Things to know

- `encodeFittedModel` turns a model into plain JSON-friendly data. `decodeFittedModel` checks the
  data and turns it back into a model.
- **Loading and predicting don't need the forecasting engine**, so no layer is required.
- **No refitting happens on load.** The restored model gives exactly the same forecasts as the
  original.
- Saved models are meant to be loaded by the **same version** of Effect Prophet. Refit after
  upgrading.
- This format is not compatible with Python Prophet's `model_to_json`.

## Updating a model with new data

When new rows arrive, you can start the next fit from where the last model ended, like Python's
`fit(df, init=warm_start_params(m))`. Pass `warmStartParameters(model)` as `map.warmStart`:

<<< @/snippets/warm-start.ts

```txt [Output]
warm start:   346.20
from scratch: 346.20
```

- `warmStartParameters` returns plain numbers (`k`, `m`, `sigmaObs`, `delta` and `beta`) in
  Prophet's internal scaled units, so you can save them as JSON with or without the model.
- **Use the same settings as the earlier fit.** As in Python, the fit always starts the trend and
  noise (`k`, `m`, `sigmaObs`) from the warm start. It starts the changepoint adjustments
  (`delta`) and the seasonality, holiday and regressor coefficients (`beta`) from it only when
  their counts still match, and otherwise from Prophet's defaults. Automatic changepoints grow
  with short histories and `"auto"` seasonalities can switch on, so the
  [`optimizer.warm_start.delta` and `optimizer.warm_start.beta`](../guide/tracing) span attributes
  show which parts were used.
- **It isn't always faster.** Refitting an unchanged history takes one or two steps instead of
  hundreds. After new rows arrive, the optimizer often needs fewer steps, but sometimes more:
  the target scale and time span change, so the old answer is only a nearby guess.
- The result can differ slightly from a fresh fit, as it can in Python, because the optimizer
  stops when it is close enough.
- A history whose values are all the same skips the optimizer, so the warm start is ignored.
- `crossValidate` and `searchModels` use `map.warmStart` for every fold, as Python's
  `cross_validation` reuses the arguments the model was fitted with.
