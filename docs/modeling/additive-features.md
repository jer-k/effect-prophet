# Known additive features

Custom events and additional regressors are represented as known additive feature columns and are fitted jointly with trend, changepoints, and seasonal Fourier terms. Conditional seasonalities reuse the same seasonal coefficient block while applying one binary mask per row and component. The numerical implementation is Rust-only; TypeScript parses feature semantics, resolves train-only regressor transforms, aligns strict conditions, constructs checked matrices, and frames coarse WASM calls.

## Column and coefficient order

The complete Gaussian-prior feature order is:

1. seasonal Fourier coefficients in resolved seasonality order;
2. event columns in Python/Prophet lexical key order;
3. future additional-regressor columns.

An event key is `name_delim_<signedOffset>`, including `+0`. Ordering compares Unicode code points to match Python rather than JavaScript UTF-16 ordering. Event offsets belonging to one name form one grouped forecast component. Seasonal masks have one binary value per row and seasonal component and gate all harmonics before fitting or prediction. An unconditional component receives an all-one mask. A conditional component resolves its named boolean column; false gates every sine/cosine value to zero without changing phase, order, prior, coefficient offset, or component identity. Multiple components may share a condition.

The piecewise MAP design is `[1, scaledTime, changepointHinges, seasonal, additional]`. Additional columns use their configured positive Gaussian prior scales and are optimized in the same objective; no residual-after-fit shortcut is used.

## Event calendar behavior

Event dates are exact `YYYY-MM-DD` Gregorian dates. Prediction and training timestamps map to calendar days in UTC using mathematical floor division, including dates before the Unix epoch. Every subdaily row on a matching UTC day receives the same indicator.

A lower window must be at most zero and an upper window at least zero. Every `(name, offset)` pair creates one binary column. Duplicate occurrences are idempotent, overlapping occurrences remain binary, and all occurrences of one name must use one prior scale. Names are case-sensitive, are not whitespace-normalized, cannot contain `_delim_`, and cannot collide with package labels or configured seasonalities.

Occurrences supplied during fitting are retained in the fitted model and portable payload. Future declared occurrences therefore affect prediction; undeclared one-off dates do not recur automatically. A future-only column is representable but has no training signal beyond its zero-centered prior.

## Regressor normalization and rows

Regressor definitions preserve caller order, use globally unique feature names, and have positive finite prior scales. Only additive regressors are currently accepted. Every training and prediction row must provide exactly the configured names with finite numeric values. Missing and extra names are indexed validation failures; values are never imputed, defaulted to zero, carried forward, or forecast by a nested model.

Transforms are resolved from training rows before prediction values are observed:

- `"never"` keeps the original value;
- `"auto"` keeps a constant column or a column whose unique set is exactly `{0, 1}`, and standardizes every other column;
- `"always"` standardizes a nonconstant column but keeps a constant column to avoid division by zero.

Standardization uses the arithmetic training mean and sample standard deviation with denominator `N - 1`:

```text
z = (x - mean) / sampleStandardDeviation
```

The implementation computes variance with Welford's online update to avoid subtracting large squared sums. Non-finite statistics or transformed values are rejected. Prediction reuses the stored transform, including for values outside the training range. A constant nonzero identity column is legal and regularized, but it is confounded with the intercept and should not be interpreted independently.

Fitted transformed-unit coefficients are projected for inspection as:

```text
originalCoefficient = fittedCoefficient / sampleStandardDeviation
center = mean
contribution = originalCoefficient * (x - center)
```

Identity transforms retain the fitted coefficient and use center zero. These point-estimate summaries are associational model parameters, not causal estimates or uncertainty intervals.

Complete prediction rows, rather than timestamps alone, define identity and ordering. Duplicate timestamps are retained, and rows at the same timestamp can produce different forecasts when their regressors or conditions differ. Timestamp strings remain supported for models that require no row covariates.

## Conditional row policy

A `conditionName` is a case-sensitive shared feature name and cannot collide with any seasonality, event, regressor, built-in, or output/group label. Built-in seasonalities remain unconditional. Every training and nonempty prediction row must provide exactly the distinct condition-name set retained by the fitted model. Values must be actual booleans; numbers, strings, null, missing keys, and extra keys are rejected without truthiness coercion.

Condition values affect only their component masks. They do not affect automatic built-in resolution, target or regressor normalization, changepoint placement, coefficient order, or priors. An all-false training condition remains a legal regularized design, and a future condition regime need not have appeared during training. Models persist condition names with resolved seasonal definitions, never row values or masks.

## Memory and WASM protocol

Feature and mask matrices are row-major and copied at the TypeScript and generated WASM boundaries. Rust validates exact lengths, finite values, binary masks, positive priors, and contiguous component ranges before numerical loops. Fitted models retain semantic event and regressor metadata plus owned coefficient arrays, never matrix buffers or typed-array aliases.

Featureful fit and prediction each cross WASM once. Existing feature-free exports remain callable. Successful prediction rows are `[trend, additive, value, ...seasonalComponents, ...eventComponents, ...regressorComponents]`; successful fit frames append seasonal coefficients followed by event and regressor coefficients.
