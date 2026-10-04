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
