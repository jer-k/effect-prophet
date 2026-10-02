# Linear Stan MAP: frozen same-point investigation

**Status:** Focused diagnosis completed for one case. This investigation changed no optimizer controls, budgets, gates, production code or fixtures. Subsequent local benchmark acceptance uses the separately approved [fit-quality policy](linear-map-benchmark-acceptance.md); stationarity remains EP-097 work.

Related: [alignment plan](linear-map-stan-alignment-plan.md).

## Frozen case and reference

Case: `map-training-ordered-auto-stan-v2`, copied from the retained native-arm64 diagnostic with its dataset and controls unchanged.

- 96 retained rows, 25 automatic candidates, prior scale `0.05`.
- Automatic selection chooses Newton; 10,000 steps per attempt.
- Reference output remains capped at 12 significant digits.
- Dataset SHA-256: `26225e1a04e8d87fbc01f0cbcbe1053c72b87e0ef2c1d0efca3d15a1a448668c`.
- Native `linux/arm64` executable SHA-256: `faff590e554b6dd4e8c232d2a51c63fe734ae018dd529ee7433a5cdcd86fc54e`, matching the retained benchmark executable.

The locked native-arm64 Python image was rebuilt from the existing Dockerfile under a separate diagnostic tag. There was no additional architecture comparison. Numerical Rust probes used a temporary, test-only instrumented source copy on native macOS arm64. The public endpoint was independently obtained through freshly built, Node-hosted release WASM.

Raw artifacts, scripts, source snapshots, comparison assertions and provenance are retained locally in:

`benchmark/results/runs/linear-same-point-ordered-auto/`

This directory is ignored run evidence, not generated compatibility fixtures. Its raw numerical values intentionally preserve the parameter vectors being compared; existing fixture precision rules and bytes are untouched. Original baseline directories were not modified.

## Preparation agrees

The instrumentation captures the actual `StanLinearObjective` constructed by the production Rust fitting path, rather than constructing a second prepared problem for comparison.

Exact equality was verified for:

- Public decoded row order and reference row timestamps.
- All 96 normalized targets and normalized times.
- All 25 normalized changepoint positions and their order.
- Target scale (`32.6287988238`), offset and changepoint prior.
- All 29 initial unconstrained coordinates.

There are no public features. Python supplies its private zero feature with prior one and zero additive/multiplicative flags; Rust supplies the equivalent private beta internally. Both use `[k,m,delta...,log(sigma),beta]`, with sigma at index 27. The linear trend indicator and unused zero capacities were checked. No no-changepoint folding is involved.

## Same-point density and gradients agree

At each point, the pinned executable evaluates `log_prob` with `jacobian=False` and 12-digit output. Rust evaluates its shared numerical owner at the same unconstrained vector. Both convert the log-noise derivative to the constrained normalized-noise coordinate and apply KKT treatment only to exactly zero deltas.

The WASM vector is reconstructed from its public output-unit coefficients and normalized noise. It includes the known zero private beta. This may incur output scaling roundoff; it is not a claim to expose hidden WASM optimizer memory.

| Identical point                  | Absolute objective difference | Maximum absolute unconstrained gradient difference | Absolute stationarity difference |
| -------------------------------- | ----------------------------: | -------------------------------------------------: | -------------------------------: |
| Initialization                   |                   `4.943e-12` |                                        `3.074e-11` |                      `3.074e-11` |
| Python fitted endpoint           |                   `2.723e-10` |                                        `4.471e-11` |                      `2.609e-10` |
| Native Rust fitted endpoint      |                   `1.796e-10` |                                        `4.719e-11` |                      `1.282e-10` |
| Reconstructed real WASM endpoint |                   `1.206e-10` |                                        `4.810e-11` |                      `1.433e-10` |

Ten same-point probes, including counterfactual sigma swaps and the step-103 backtracking states below, pass the existing frozen numerical oracle's `1e-7` value/gradient tolerances. No new acceptance tolerance was substituted.

The real WASM fit exactly reproduces the retained public objective, noise, stationarity residual and 106-step completion. At its reconstructed endpoint, Stan reports residual `161.287219603053`, versus the WASM summary's `161.287219603196`.

**Established:** preparation and same-point objective/gradient discrepancies do not explain this case's failed residual-equality gate.

## The residual gap is between endpoints

At their independently fitted endpoints:

- WASM stationarity residual: `161.287219603196`.
- Python stationarity residual: `161.266352202422`.
- Residual gap: approximately `0.0208674`, above the unchanged `0.01` gate.
- Normalized noise gap: approximately `4.39e-10`.

The dominant constrained residual is **sigma** in both implementations. Its unconstrained derivative is approximately `0.295`, amplified by division by normalized sigma (`~0.00182925`).

Swapping only sigma between endpoint vectors changes the residual by approximately `0.025305`; changes in the remaining coordinates partly offset it. This demonstrates sensitivity, not permission to alter fitted parameters or loosen a gate.

Four tiny deltas (8, 16, 24 and 25) have opposite signs at the fitted endpoints. Their magnitudes are approximately `1e-10`–`1e-8` in normalized coordinates. Their prior derivatives consequently jump by `2/tau = 40`. They are not exactly zero, so neither implementation's current KKT calculation treats them as zero.

Both reported residuals remain large. Equality of two residuals around 161 would not establish a small-KKT-residual certificate.

## Accepted-step comparison narrows the trajectory difference

A separate reference optimization retains accepted Newton rows without changing initialization, algorithm, tolerance or budget. Its endpoint equals the ordinary public Python fit exactly at the declared output precision.

Native Rust and reference trajectories are closely aligned through step 102:

- Maximum coordinate discrepancy over steps 1–102: approximately `1.86e-9` (step 18).
- Maximum discrepancy at step 102: approximately `3.77e-10`.
- The first differing delta signs appear at step 103.

At step 103, the trial step `1.4551915228366852e-11` has different acceptance outcomes because the starting vectors differ slightly:

| Starting vector            | Rust density improvement | Stan density improvement at the same trial | Result             |
| -------------------------- | -----------------------: | -----------------------------------------: | ------------------ |
| Native Rust step-102 state |              `-3.234e-9` |                                `-3.000e-9` | Reject; halve step |
| Saved Stan step-102 state  |               `1.208e-8` |                                 `1.200e-8` | Accept             |

Replaying Rust Newton from the saved Stan starting vector accepts Stan's step and reproduces its next parameter vector within approximately `2.09e-12`. Replaying from its own starting vector reproduces its original next state exactly.

Native Rust subsequently stops at step 106 with density change approximately `5.286e-9`; Stan stops at step 124 with reported change approximately `6.049e-9`. Both satisfy their `1e-8` objective-change policy. Their different stopping states produce the endpoint diagnostic gap.

**Established:** the first consequential native trajectory divergence is a near-threshold backtracking decision from slightly different accumulated states. Evaluating the same starting/trial states does not reverse the decision between implementations.

**Not established:** the precise earlier floating-point operation that accumulated the tiny state differences, or that every other failing case has this explanation. The accepted-step trace is native Rust, not an instrumented WASM trace; the real WASM endpoint and completion were checked separately. Reference saved vectors are rounded to 12 significant digits, so replay agreement is necessarily bounded rather than a bitwise reconstruction of reference memory.

## Acceptance decision at the investigation checkpoint

The investigation distinguishes endpoint/stopping sensitivity from same-point numerical fidelity. It does not qualify the failed benchmark or prove universal optimizer equivalence.

The existing endpoint-residual-equality gate is not a stationarity certificate, and this case demonstrates that its fixed absolute tolerance can reject closely aligned objective-stopped trajectories despite matching density/gradient evaluation at both endpoints.

Jeremy should review the intended optimality requirement before implementation changes or further broad runs. In particular, matching Stan's objective-change behavior and requiring a genuinely small KKT residual are different contracts. Any revised gate must explicitly declare its coordinates, nonsmooth treatment and evidence requirements; simply raising `0.01` is not justified by this investigation.

No gate replacement or optimizer change was made during this investigation. Jeremy subsequently authorized explicit diagnostic-only stationarity under EP-097 and final closeout. The [acceptance decision](linear-map-benchmark-acceptance.md) records the separate policy, 24-case rerun and completed local checks; it does not generalize this case's diagnosis or claim a small KKT residual.
