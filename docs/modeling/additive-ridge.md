# Linear additive ridge model contract

## Scope and identity

Stage B models a linear trend plus additive Fourier seasonalities. Its fitted model tag is
`linear-additive-ridge`. This is distinct from the existing `linear-trend` ordinary least-squares
model and must not be described as a full Prophet MAP fit.

EP-018 defines metadata and trusted fitted state only. Fourier evaluation, fitting, public options,
prediction dispatch, and portable serialization are connected in later tickets.

## Time and units

Trend time and seasonal phase use separate coordinates:

- Trend time is `(timestamp - timeOrigin) / timeScale`. Timestamps, `timeOrigin`, and `timeScale`
  use Unix-epoch milliseconds, and `timeScale` is positive.
- Fourier phase uses days since the Unix epoch, where one day is exactly 24 hours
  (`86_400_000` milliseconds). It is independent of the training-relative trend coordinate.
- `periodDays` is a positive finite count of these fixed 24-hour days.
- The intercept, fitted seasonal coefficients, and predictions are in observation units. The slope
  is observation units per scaled trend-time unit.
- `priorScale` is a positive Stage B ridge-penalty control. Its default is `10`; this does not
  promise equivalence to Prophet's MAP prior behavior.
- `fitSummary.valueScale` records the positive target scale used by normalized fitting. Public
  coefficients have already been transformed back to observation units.

For harmonic `h`, starting at one, the corresponding numerical kernels use:

```text
sin(2π h epochDays / periodDays)
cos(2π h epochDays / periodDays)
```

## Coefficient identity

Seasonality definitions are ordered and names are exact and case-sensitive. Parsing never sorts,
trims, folds case, or otherwise normalizes names. Definition order is part of model identity.

The coefficient layout is deterministic:

1. Preserve seasonality definition order.
2. Within a definition, use increasing harmonic order from `1` through `fourierOrder`.
3. Within a harmonic, place sine before cosine.

A definition therefore owns `2 * fourierOrder` contiguous coefficients. Its
`coefficientOffset` points to the sine coefficient for harmonic one, and its
`coefficientCount` covers the complete component. Offsets start at zero, do not overlap, and
exactly cover the layout's total `coefficientCount`.

For a component at offset `o`, harmonic `h` uses:

```text
sine index   = o + 2 * (h - 1)
cosine index = o + 2 * (h - 1) + 1
```

An empty definition list has an empty component list and zero coefficients. Persisted layouts are
parsed by recomputing offsets and counts rather than trusting redundant metadata.

Custom names must be non-empty and unique. Uniqueness is case-sensitive. The parser reserves the
built-in names `daily`, `weekly`, and `yearly`, plus current/planned package output and component
labels `trend`, `value`, `timestamp`, `additive`, and `seasonalities`.

## Fitted state

A trusted additive model stores:

- finite trend parameters and positive finite trend scaling;
- the complete validated seasonality layout;
- exactly one finite public coefficient per layout coefficient;
- required `normalized-ridge-v1` fit diagnostics;
- at least two observations and enough observations for the fitted design;
- numerical rank equal to the full design width, `2 + coefficientCount`; and
- finite, non-negative normalized residual sum of squares and penalized objective values.

All count arithmetic is checked as safe-integer arithmetic. Parsing clones and deeply freezes the
layout, definitions, components, coefficient array, and fit summary, so caller-owned input aliases
cannot mutate trusted fitted state.

The exact normalized ridge objective and fitting procedure are specified by EP-020. Fit summaries
contain finite scalar diagnostics only; they do not retain training rows, backend resources, or
protocol payloads.
