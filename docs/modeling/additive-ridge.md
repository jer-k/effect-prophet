# Linear additive ridge model contract

## Scope and identity

Stage B models a linear trend plus additive Fourier seasonalities. Its fitted model tag is
`linear-additive-ridge`. This is distinct from the existing `linear-trend` ordinary least-squares
model and must not be described as a full Prophet MAP fit.

The public `prophetFittingBackendLayer` selects the narrow additive WASM adapter for the non-empty
seasonality configuration variant and connects it to option decoding, fitting, prediction dispatch,
named component forecasts, tracing, and portable serialization. Built-in daily, weekly, and yearly
components are resolved from training history before the same concrete layout reaches the adapter.

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
- at least two observations at distinct timestamps;
- numerical rank of the augmented ridge system equal to the full design width,
  `2 + coefficientCount` (the observation count may be smaller than this width); and
- finite, non-negative normalized residual sum of squares and penalized objective values.

All count arithmetic is checked as safe-integer arithmetic. Parsing clones and deeply freezes the
layout, definitions, components, coefficient array, and fit summary, so caller-owned input aliases
cannot mutate trusted fitted state.

Fit summaries contain finite scalar diagnostics only; they do not retain training rows, backend
resources, or protocol payloads.

## Normalized ridge objective

For training origin `min(timestamp)`, training range `timeScale`, and
`valueScale = max(abs(y))` (or `1` for an all-zero series), fitting uses:

```text
u_i = (timestamp_i - timeOrigin) / timeScale
z_i = y_i / valueScale
X_i = [1, u_i, Fourier features_i]
θ   = [intercept, slope, seasonal coefficients...]

J(θ) = 0.5 * Σ_i (z_i - X_i θ)^2
     + 0.5 * Σ_j (β_j / priorScale(component(j)))^2
```

The residual is a sum rather than a mean. Intercept and slope are unpenalized. Every seasonal
coefficient has a positive penalty and all columns are solved jointly. Public coefficients are
multiplied by `valueScale` before leaving the kernel.

The solver uses augmented least squares, `[X; R] θ ≈ [z; 0]`, and column-pivoted Householder QR.
Each seasonal coefficient contributes one diagonal `1 / priorScale` row to `R`. Consequently,
two distinct timestamps and positive representable penalties can identify an augmented system with
more columns than observations. An unregularized rank-deficient system still fails.

Numerical rank uses this single threshold:

```text
epsilon * max(augmentedRowCount, columnCount) * max(abs(diagonal(QR)))
```

A diagonal magnitude must be strictly greater than the threshold to count toward rank. The solver
never falls back to normal equations or a different objective.

One dense Rust numerical buffer is limited to `16,777,216` `f64` entries (128 MiB). Integer
arithmetic and this limit are checked before allocation. The fit requires dense design, Fourier,
and augmented QR buffers, so peak memory is larger than one buffer and scales as
`O((N + K) * (K + 2))`.

## Public options and forecasts

Callers configure ordered custom definitions through `seasonalities`. Built-in controls are
separate and deliberately default to `"off"`; this differs from Python Prophet's default-auto API.
At fit time, `"auto"` uses only the parsed training history: yearly requires a span of at least 730
fixed days, weekly requires 14 days and a minimum positive gap below 7 days, and daily requires 2
days and a minimum gap below 1 day. Enabled built-ins use periods/orders `365.25/10`, `7/3`, and
`1/4`, with prior scale `10`. Explicit `{ mode: "on" }` bypasses those checks and permits positive
order and prior overrides.

Custom definitions retain caller order, followed by enabled built-ins in yearly, weekly, daily
order. Canonical built-in names remain unavailable to custom definitions, deliberately differing
from Prophet's same-name override behavior. Different names may share a period; this is numerically
supported but can limit component interpretability. The public fit operation supplies only the
resolved layout to the backend. For linear growth, a non-empty resolved layout selects additive
ridge; otherwise ordinary linear fitting is used. Flat growth uses the separate reduced MAP
objective described in [the flat MAP contract](flat-map.md).

Automatic resolution never inspects prediction timestamps and is not rerun during model decoding.
Portable payloads retain the concrete definitions selected at fit time. Forcing yearly seasonality
with less than 730 days can under-identify the decomposition; callers should force any component
only when observed time windows support its interpretation and extrapolation.

Every forecast has `timestamp`, `trend`, `additive`, `value`, and `seasonalities`. Named component
values use observation units and retain definition order. Within floating-point tolerance,
`additive` is the sum of the named components and `value` is `trend + additive`. Featureless
models use zero additive contribution and an empty component list.

Portable additive payloads retain coefficients, scaling, ordered definitions, and the complete fit
summary. Decoding reconstructs layout offsets and counts through this domain owner and requires no
fitting backend.

## Rust/WASM packed protocol

Additive fit and prediction use status enums separate from the legacy linear protocol.

Fit statuses are:

| Code | Meaning                             |
| ---: | ----------------------------------- |
|    0 | success                             |
|    1 | insufficient observations           |
|    2 | aligned input length mismatch       |
|    3 | invalid observation                 |
|    4 | invalid configuration               |
|    5 | zero time range                     |
|    6 | rank deficient                      |
|    7 | size overflow or dense-buffer limit |
|    8 | non-finite result                   |

A successful fit is packed as:

```text
[0, intercept, slope, timeOrigin, timeScale, valueScale,
 numericalRank, normalizedResidualSumSquares, penalizedObjective,
 ...coefficients]
```

A failed fit is `[status]`.

Prediction statuses are:

| Code | Meaning                                         |
| ---: | ----------------------------------------------- |
|    0 | success                                         |
|    1 | invalid timestamp                               |
|    2 | invalid model metadata or coefficient alignment |
|    3 | invalid configuration                           |
|    4 | aligned input length mismatch                   |
|    5 | size overflow or dense-buffer limit             |
|    6 | non-finite result                               |

A successful prediction is `[0, ...rowMajorValues]`. Each row is
`[trend, additive, value, component_0, ...]`. Metadata/configuration failures are `[status]`;
timestamp evaluation failures are `[status, timestampIndex]`. An empty prediction batch is `[0]`.

Periods, orders, and priors cross the fit boundary once. Prediction omits priors. Fourier orders
cross as finite positive integer-valued `f64` values no larger than `u32::MAX` and are checked
before conversion. Legacy linear exports and status codes are unchanged.
