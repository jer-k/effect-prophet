# Stage F model contract

**Status:** Historical decision for the reduced flat slice; its broader Stage F deferrals are superseded

Later target-scaling, event, regressor, conditional-seasonality, mixed-component, and logistic
slices completed the tracks this decision intentionally deferred. The constraints below record the
boundary of the original reduced-flat change rather than the repository's current capability set.

## Context

The original Stage F roadmap assumed the piecewise MAP, target-scaling, event, regressor,
conditional-seasonality, and persistence tracks had already landed. They have not. Implementing
the provisional EP-053–055 or EP-059–062 contracts as hidden prerequisites to flat growth would
silently expand this change into several independent model families.

The repository does have a complete public fitting Layer, additive Fourier layouts, a ridge
solver, strict WASM protocols, fitted-model parsing, prediction, serialization, and real-seam
tracing. A reduced additive flat MAP model can therefore be implemented coherently without
pretending the unfinished piecewise or mixed-mode tracks exist.

## Decision

1. Public `growth: "flat"` always means the reduced `flat-map` model.
2. The package has no arithmetic-mean fitting model or fallback. Flat fitting either returns its
   prior-informed MAP result or a typed failure.
3. Supported options are a closed union of featureless/additive linear and featureless/additive
   flat variants. Every accepted variant is total under `prophetFittingBackendLayer`; untyped
   malformed options fail as `InputValidationError` before a numerical boundary.
4. Flat state contains only output-unit level, ordered additive coefficients, output-unit noise,
   resolved seasonality metadata, and a finite optimizer summary. It has no slope, changepoints,
   or prior-only dummy parameters.
5. The current flat slice uses train-only absmax scaling internally. A public scaling option and
   minmax persistence remain EP-053–055 work and are not implied by the flat discriminator.
6. Exact constant targets use the explicit release-style shortcut documented in
   [`flat-map.md`](../modeling/flat-map.md). Nonconstant noise collapse and iteration exhaustion
   are typed failures; no OLS/ridge/baseline fallback is allowed.
7. Prediction is `trend=level`, `additive=X*coefficients`, `value=trend+additive`. All stored
   values are in output units. Flat models complete fit → predict → JSON decode → predict.
8. Rust owns all flat MAP numerical execution. TypeScript owns only parsing, orchestration,
   strict protocol decoding, trusted model construction, and public projection; there is no
   duplicate TypeScript flat MAP kernel or backend.
9. Public operations retain `Prophet.fit`/`Prophet.predict` spans. Each entered WASM adapter owns
   one complete coarse boundary span with bounded model/growth/count attributes.

## Reconciliation

- **EP-056:** retain the reduced equations, invariants, fixture expectations, and conformance
  cases as specification only. Do not add a TypeScript numerical implementation or backend.
- **EP-057:** port the same objective and constant/noise policy to a narrow Rust/WASM adapter with
  strict fit and prediction frames. Do not introduce broad MAP capability checks.
- **EP-058:** replace provisional public flat routing atomically across options, plans,
  fitted/raw/portable unions, prediction, components, exports, tracing, and tests.
- **EP-053–055:** unchanged and still blocked. Public minmax/target-scaling selection is not a
  prerequisite for the bounded absmax flat slice.
- **EP-059–062:** unchanged and still blocked. Multiplicative and mixed components require their
  own approved nonlinear objective and component-unit contract.
- **EP-071:** add flat workloads only after the broader benchmark prerequisites are ready.

The original broad EP-052 proposal for mixed modes, public scaling selection, events,
regressors, and conditional masks is not approved by this decision. Those tracks retain their
ordinary prerequisites and must not infer readiness from the completed reduced flat slice.

## Consequences

The public meaning of `growth: "flat"` is unambiguous and serializable. Consumers needing an
arithmetic-mean benchmark should own that baseline outside the Prophet fitting model rather than
selecting it through growth syntax.

The package can add minmax, additional additive feature sources, and mixed modes later by
extending the flat configuration and state without changing the reduced model's current equation
or reusing its options for a second implementation.
