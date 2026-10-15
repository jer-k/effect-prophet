/** Public scalar-simulation lifecycle phases; setup remains outside warm operation timings. */
export const uncertaintyLifecyclePhases = [
  "uncertainty-input-conversion",
  "warm-uncertainty",
  "cold-first-uncertainty",
  "model-json-encode",
  "model-json-decode",
  "fresh-process-restored-uncertainty",
] as const;

/** Shared scalar algorithm and evidence class; declarations are parsed at catalog loading. */
export const scalarUncertaintyControls = (
  output: "intervals" | "samples",
  samples: number,
  seed = 19,
) => ({
  seed,
  samples,
  intervalWidth: 0.8,
  output,
  algorithm: "scalar-continuous-time" as const,
  evidence: "docs/validation/uncertainty.md#evidence-classes",
  samplerMemoryLimitBytes: 64 * 1_048_576,
});
