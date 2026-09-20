# effect-prophet

## Whitespace

Use whitespace to make the structure of code immediately apparent. Group related
statements together and separate distinct phases of control flow with blank lines.
Avoid both dense blocks and unnecessary blank lines.

Prefer formatting that makes operations, early returns, and side effects easy to scan.

## Tracing

Treat tracing as part of every new feature's design and acceptance criteria. Add stable,
named Effect spans to new public operations and coarse adapter/runtime boundaries. Use
`Effect.fn` for named operation boundaries and `Effect.withSpan` for meaningful child
operations such as WASM, filesystem, network, or other integration calls. Do not add
spans to pure helpers, individual records, or tight numerical loops.

A boundary span should cover the complete caller-visible operation, including setup,
invocation, result copying or decoding, and translation of expected failures. Preserve
the active parent span and Effect's normal completion semantics: successful values end
the span successfully, typed failures end it as failed without replacing the error, and
defects retain their existing behavior. Validation and short-circuit paths that do not
enter the boundary must not emit misleading boundary spans.

Use stable, bounded, low-cardinality attributes such as operation names, backend/model
types, and counts. Never attach raw observations, timestamps, coefficients, protocol
payloads, error messages, stack traces, runtime causes, secrets, or other sensitive or
unbounded values.

Instrumentation must use the installed `effect` tracing API without adding tracer,
OpenTelemetry, or exporter requirements to library Effect environments. Applications
own tracer configuration, sampling, and export.

Test new spans through an in-memory `Tracer.make` implementation and real integration
seams rather than module mocks. Assert span names, safe attributes, trace IDs, direct
parent IDs, ended status, success/failure completion, and interval containment. Also
assert that pre-boundary validation and short-circuit paths do not create boundary
spans. Do not use sleeps, duration thresholds, network collectors, or exporter-specific
test infrastructure.

## Prophet compatibility fixtures

Keep generated Prophet fixtures deterministic across supported CPU implementations. Never write
raw fitted optimizer values into fixture JSON: canonicalize them to at most 12 significant digits
with the shared generator helper. Keep CPU-sensitive Fourier values at 12 decimal places. Do not
increase either precision beyond 12 digits, even when the local environment produces additional
stable-looking digits.

Regenerate fixtures with `npm run fixtures:generate` rather than editing generated JSON by hand,
then run `npm run fixtures:check` to verify fixture bytes, manifest hashes, and compatibility tests.

## Testing

Files in `test/` should be at the same level as the file they're testing in `src/`. Example

- `src/internal/fitting-backend.ts` -> `test/internal/fitting-backend.test.ts`
-
