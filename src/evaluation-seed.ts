import { simulationIdentity } from "./uncertainty";

/** Stable evaluation schedule; independent of the simulator's own version. */
export const evaluationSeedSchedule = "effect-prophet-eval-seed-v1" as const;

/** A validated rolling-origin plan, without observations or fitted state. */
export interface EvaluationSeedPlan {
  readonly horizonMs: number;
  readonly cutoffs: ReadonlyArray<number>;
}

/** Derive a fold-local uint32 seed; invalid internal inputs return undefined before any BigInt conversion. */
export const deriveEvaluationFoldSeed = (
  rootSeed: number,
  plan: EvaluationSeedPlan,
  candidateId: string,
  cutoff: number,
): number | undefined => {
  if (
    !Number.isInteger(rootSeed) ||
    rootSeed < 0 ||
    rootSeed > 0xffff_ffff ||
    !Number.isSafeInteger(plan.horizonMs) ||
    plan.horizonMs <= 0 ||
    !Number.isSafeInteger(cutoff) ||
    plan.cutoffs.length === 0 ||
    plan.cutoffs.length > 0xffff_ffff ||
    !plan.cutoffs.includes(cutoff) ||
    plan.cutoffs.some((value) => !Number.isSafeInteger(value))
  ) {
    return undefined;
  }

  const encoder = new TextEncoder();
  const simulation = encoder.encode(simulationIdentity);
  const candidate = encoder.encode(candidateId);

  if (simulation.length > 0xffff_ffff || candidate.length > 0xffff_ffff) {
    return undefined;
  }

  let hash = 2_166_136_261;

  const byte = (value: number): void => {
    hash = Math.imul(hash ^ value, 16_777_619) >>> 0;
  };

  const bytes = (values: Uint8Array): void => {
    for (const value of values) {
      byte(value);
    }
  };

  const uint32 = (value: number): void => {
    for (let index = 0; index < 4; index += 1) {
      byte((value >>> (8 * index)) & 0xff);
    }
  };

  const int64 = (value: number): void => {
    let remaining = BigInt(value);

    for (let index = 0; index < 8; index += 1) {
      byte(Number(remaining & 0xffn));
      remaining >>= 8n;
    }
  };

  bytes(encoder.encode(evaluationSeedSchedule));
  byte(0);
  uint32(rootSeed);
  uint32(simulation.length);
  bytes(simulation);
  int64(plan.horizonMs);
  uint32(plan.cutoffs.length);

  for (const timestamp of plan.cutoffs) {
    int64(timestamp);
  }

  uint32(candidate.length);
  bytes(candidate);
  int64(cutoff);

  return hash;
};
