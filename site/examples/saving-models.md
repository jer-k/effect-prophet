# Saving and loading models

Fitting takes a moment; predicting from a fitted model is fast. Save a fitted model as JSON and
load it later, for example to fit once in a nightly job and forecast on demand in an API.

<<< @/snippets/save-and-load.ts

## Things to know

- `encodeFittedModel` turns a model into plain JSON-friendly data. `decodeFittedModel` checks the
  data and turns it back into a model.
- **Loading and predicting don't need the forecasting engine**, so no layer is required.
- **No refitting happens on load.** The restored model gives exactly the same forecasts as the
  original. That includes models whose regressors are
  [forecast by their own models](./regressors#forecasting-a-regressor): their models and the
  regressor history they were fitted to are saved too, so the file grows with the history. Python's
  `model_to_json` drops them.
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
  stops when it is close enough, and [sometimes sooner](./residuals#did-the-optimizer-finish).
- **Check logistic refits after many new rows.** `warmStartParameters` returns the earlier fit's
  values in its own scaled units, as Python's `warm_start_params` does, but the new fit rescales
  time to the longer history. After many new rows, the warm-started logistic trend no longer lines
  up with the data, and the default L-BFGS optimizer can settle on a far worse fit. Python Prophet
  1.4.0 does the same. On five logistic histories of 256 and 365 days, 9 of 10 refits after 30 or
  60 new rows ended with a noise scale 60 to 920 times a fresh fit's, in both libraries, and
  fitted values off by 2 to 5 standard deviations of the history. No refit after one or seven new
  rows did this, and no linear refit after up to 60. Compare the refit's `noiseScale` with the
  earlier model's, or [check the fit](./residuals#did-the-optimizer-finish).
  Refitting with `map: { warmStart, optimizer: { algorithm: "newton" } }` usually recovers, but
  not always: in 1 of the 9 cases in each library, Newton from the same warm start also stopped
  short of the best fit, by thousands in Effect Prophet's case. When in doubt, fit from scratch.
- A history whose values are all the same skips the optimizer, so the warm start is ignored.
- `crossValidate` and `searchModels` use `map.warmStart` for every fold, as Python's
  `cross_validation` reuses the arguments the model was fitted with.
