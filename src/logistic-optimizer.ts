import { Effect, Predicate, Schema } from "effect";

import { inputValidationErrorFromIssue, type InputValidationError } from "./errors";
import { PositiveFinite } from "./internal/numeric-schemas";
import {
  decodeLinearOptimizer,
  type EncodedLinearOptimizer,
  type LinearOptimizer,
} from "./linear-optimizer";

/** Explicit proximal selection; legacy tolerance overrides retain their historical policy. */
export interface EncodedProximalLogisticOptimizer {
  readonly algorithm?: "proximal";
  readonly maxIterations?: number;
  readonly relativeTolerance?: number;
  readonly absoluteTolerance?: number;
}

/** Logistic defaults use the shared Stan policy; proximal behavior requires an explicit opt-in. */
export type EncodedLogisticOptimizer = EncodedLinearOptimizer | EncodedProximalLogisticOptimizer;

/** Parsed logistic optimizer selection with algorithm-specific controls. */
export type LogisticOptimizer =
  | LinearOptimizer
  | {
      readonly algorithm: "proximal";
      readonly maxIterations: number;
      readonly relativeTolerance: number;
      readonly absoluteTolerance: number;
    };

const decodeProximal = Schema.decodeUnknownEffect(
  Schema.Struct({
    algorithm: Schema.Literal("proximal").pipe(
      Schema.withDecodingDefaultKey(Effect.succeed("proximal")),
    ),
    maxIterations: Schema.Int.check(
      Schema.isGreaterThan(0),
      Schema.isLessThanOrEqualTo(4_294_967_295),
    ).pipe(Schema.withDecodingDefaultKey(Effect.succeed(10_000))),
    relativeTolerance: PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(1e-7))),
    absoluteTolerance: PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(1e-9))),
  }),
  { errors: "all", onExcessProperty: "error" },
);

/** Parse logistic controls, keeping historical tolerances out of Stan requests. */
export const decodeLogisticOptimizer = Effect.fn("decodeLogisticOptimizer")(function* (
  input: Parameters<typeof decodeProximal>[0],
): Effect.fn.Return<LogisticOptimizer, InputValidationError> {
  const proximal =
    Predicate.isObjectKeyword(input) &&
    ((Predicate.hasProperty(input, "algorithm") && input.algorithm === "proximal") ||
      (!Predicate.hasProperty(input, "algorithm") &&
        (Predicate.hasProperty(input, "relativeTolerance") ||
          Predicate.hasProperty(input, "absoluteTolerance"))));

  if (proximal) {
    return Object.freeze(
      yield* decodeProximal(input).pipe(
        Effect.mapError((error) => inputValidationErrorFromIssue("options", error.issue)),
      ),
    );
  }

  return yield* decodeLinearOptimizer(input);
});
