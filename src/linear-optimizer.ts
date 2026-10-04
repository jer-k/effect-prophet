import { Effect, Schema } from "effect";

import { inputValidationErrorFromIssue, type InputValidationError } from "./errors";
import { PositiveFinite } from "./internal/numeric-schemas";

/** Effective Stan L-BFGS settings; relative criteria are scaled by machine epsilon. */
export interface LbfgsSettings {
  readonly historySize: number;
  readonly initAlpha: number;
  readonly tolObj: number;
  readonly tolRelObj: number;
  readonly tolGrad: number;
  readonly tolRelGrad: number;
  readonly tolParam: number;
}

/** Public L-BFGS overrides, retaining Stan's control names and meanings. */
export interface EncodedLbfgsSettings {
  readonly historySize?: number;
  readonly initAlpha?: number;
  readonly tolObj?: number;
  readonly tolRelObj?: number;
  readonly tolGrad?: number;
  readonly tolRelGrad?: number;
  readonly tolParam?: number;
}

/** Shared Stan optimizer selection, retaining its linear API name; Newton rejects L-BFGS controls. */
export type EncodedLinearOptimizer =
  | { readonly algorithm: "newton"; readonly maxIterations?: number }
  | {
      readonly algorithm?: "auto" | "lbfgs";
      readonly maxIterations?: number;
      readonly fallback?: "newton" | "none";
      readonly lbfgs?: EncodedLbfgsSettings;
    };

/** Parsed shared Stan settings with a fresh budget for each attempt. */
export type LinearOptimizer =
  | { readonly algorithm: "newton"; readonly maxIterations: number }
  | {
      readonly algorithm: "auto" | "lbfgs";
      readonly maxIterations: number;
      readonly fallback: "newton" | "none";
      readonly lbfgs: LbfgsSettings;
    };

/** Pinned CmdStan 2.37 L-BFGS defaults, not coordinate-change tolerances. */
export const defaultLbfgsSettings: LbfgsSettings = Object.freeze({
  historySize: 5,
  initAlpha: 0.001,
  tolObj: 1e-12,
  tolRelObj: 1e4,
  tolGrad: 1e-8,
  tolRelGrad: 1e7,
  tolParam: 1e-8,
});

/** Prophet selection counts every retained row, including independent duplicates. */
export const defaultLinearOptimizer: LinearOptimizer = Object.freeze({
  algorithm: "auto",
  maxIterations: 10_000,
  fallback: "newton",
  lbfgs: defaultLbfgsSettings,
});

const CmdStanPositiveInteger = Schema.Int.check(
  Schema.isGreaterThan(0),
  Schema.isLessThanOrEqualTo(2_147_483_647),
);

const MaxIterations = CmdStanPositiveInteger.pipe(
  Schema.withDecodingDefaultKey(Effect.succeed(10_000)),
);

const LbfgsSettingsSchema = Schema.Struct({
  historySize: CmdStanPositiveInteger.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings.historySize)),
  ),
  initAlpha: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings.initAlpha)),
  ),
  tolObj: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings.tolObj)),
  ),
  tolRelObj: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings.tolRelObj)),
  ),
  tolGrad: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings.tolGrad)),
  ),
  tolRelGrad: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings.tolRelGrad)),
  ),
  tolParam: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings.tolParam)),
  ),
});

/** Strict Stan control schema shared by linear/logistic library and benchmark boundaries. */
export const LinearOptimizerSchema = Schema.Union([
  Schema.Struct({ algorithm: Schema.Literal("newton"), maxIterations: MaxIterations }),
  Schema.Struct({
    algorithm: Schema.Literals(["auto", "lbfgs"]).pipe(
      Schema.withDecodingDefaultKey(Effect.succeed("auto")),
    ),
    maxIterations: MaxIterations,
    fallback: Schema.Literals(["newton", "none"]).pipe(
      Schema.withDecodingDefaultKey(Effect.succeed("newton")),
    ),
    lbfgs: LbfgsSettingsSchema.pipe(
      Schema.withDecodingDefaultKey(Effect.succeed(defaultLbfgsSettings)),
    ),
  }),
]);

const decode = Schema.decodeUnknownEffect(LinearOptimizerSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Parse linear settings, rejecting obsolete or algorithm-inapplicable controls. */
export const decodeLinearOptimizer = Effect.fn("decodeLinearOptimizer")(function* (
  input: Parameters<typeof decode>[0],
): Effect.fn.Return<LinearOptimizer, InputValidationError> {
  const parsed = yield* decode(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("options", error.issue)),
  );

  return parsed.algorithm === "newton"
    ? Object.freeze(parsed)
    : Object.freeze({ ...parsed, lbfgs: Object.freeze(parsed.lbfgs) });
});
