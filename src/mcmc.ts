import { Schema } from "effect";

import { PositiveFinite } from "./internal/numeric-schemas";

/** Most chains one fit may run. */
export const maximumMcmcChains = 16;

/** Most warmup iterations per chain. */
export const maximumMcmcWarmup = 100_000;

/** Most draws kept over every chain. */
export const maximumMcmcDraws = 20_000;

/** Most kept values, draws times saved parameters. */
export const maximumPosteriorValues = 2_000_000;

const Seed = Schema.Int.check(
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(4_294_967_295),
);

const McmcOptionsSyntaxSchema = Schema.Struct({
  samples: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(2),
    Schema.isLessThanOrEqualTo(2 * maximumMcmcDraws + 1),
  ),
  seed: Seed,
  chains: Schema.optionalKey(
    Schema.Int.check(
      Schema.isGreaterThanOrEqualTo(1),
      Schema.isLessThanOrEqualTo(maximumMcmcChains),
    ),
  ),
  warmup: Schema.optionalKey(
    Schema.Int.check(
      Schema.isGreaterThanOrEqualTo(0),
      Schema.isLessThanOrEqualTo(maximumMcmcWarmup),
    ),
  ),
});

/**
 * Full Bayesian fitting, like Python's `mcmc_samples`.
 *
 * Each chain runs `warmup` iterations, then keeps `samples / 2` draws, rounded down, as Python
 * does. `warmup` defaults to `samples / 2` too.
 */
export interface EncodedMcmcOptions {
  /** Iterations per chain, like `mcmc_samples`. At least 2. */
  readonly samples: number;

  /** Seed for the chains, so a fit is repeatable. Python draws a random one. */
  readonly seed: number;

  /** Number of chains, 4 by default as in Python. */
  readonly chains?: number;

  /** Warmup iterations per chain, like Python's `iter_warmup`. */
  readonly warmup?: number;
}

/** Parsed sampling settings with Python's defaults applied. */
export interface McmcOptions {
  readonly samples: number;
  readonly seed: number;
  readonly chains: number;
  readonly warmup: number;

  /** Draws each chain keeps: `samples / 2`, rounded down. */
  readonly drawsPerChain: number;
}

/** The decoded syntax, before defaults. */
export type McmcOptionsSyntax = typeof McmcOptionsSyntaxSchema.Type;

/** Schema for untrusted `mcmc` options inside fitting options. */
export const McmcOptionsSchema = McmcOptionsSyntaxSchema.check(
  Schema.makeFilter((options) =>
    (options.chains ?? 4) * Math.floor(options.samples / 2) > maximumMcmcDraws
      ? {
          path: ["samples"],
          issue: `Chains times samples / 2 must be at most ${maximumMcmcDraws} draws`,
        }
      : undefined,
  ),
);

/** Apply Python's defaults to decoded `mcmc` options. */
export const resolveMcmcOptions = (syntax: McmcOptionsSyntax): McmcOptions => {
  const drawsPerChain = Math.floor(syntax.samples / 2);

  return Object.freeze({
    samples: syntax.samples,
    seed: syntax.seed,
    chains: syntax.chains ?? 4,
    warmup: syntax.warmup ?? drawsPerChain,
    drawsPerChain,
  });
};

/** How the posterior was sampled. */
export const McmcSamplerSchema = Schema.Struct({
  chains: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(1),
    Schema.isLessThanOrEqualTo(maximumMcmcChains),
  ),
  warmup: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThanOrEqualTo(maximumMcmcWarmup),
  ),
  drawsPerChain: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(1),
    Schema.isLessThanOrEqualTo(maximumMcmcDraws),
  ),
  seed: Seed,
});

const NonNegativeFinite = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/**
 * Sampler health, as CmdStan's `diagnose` and `summary` report it. Convergence values are
 * `null` when undefined, such as for a parameter that never moved.
 */
export const McmcDiagnosticsSchema = Schema.Struct({
  /** Divergent transitions among the kept draws. Any suggest the ranges can't be trusted. */
  divergences: Schema.Natural,

  /** Divergent transitions during warmup, which CmdStan doesn't report. */
  warmupDivergences: Schema.Natural,

  /** Kept draws whose trajectory reached the maximum tree depth of 10. */
  maxTreeDepthHits: Schema.Natural,

  /** Mean acceptance statistic over the kept draws; adaptation targets 0.8. */
  meanAcceptStat: Schema.Finite.check(
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThanOrEqualTo(1),
  ),

  /** Largest rank-normalized split R-hat over every saved parameter; near 1 when mixed. */
  maxRhat: Schema.NullOr(NonNegativeFinite),

  /** Smallest bulk effective sample size over every saved parameter. */
  minBulkEss: Schema.NullOr(NonNegativeFinite),

  /** Smallest tail effective sample size over every saved parameter. */
  minTailEss: Schema.NullOr(NonNegativeFinite),

  /** Each chain's adapted step size. */
  stepSizes: Schema.Array(PositiveFinite),
});

/** Sampler health over every chain. */
export type McmcDiagnostics = typeof McmcDiagnosticsSchema.Type;
