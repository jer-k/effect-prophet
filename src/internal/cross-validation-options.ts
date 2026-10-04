import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "../errors";
import type { EncodedProphetOptions } from "../options";
import {
  defaultTargetScalingMode,
  TargetScalingModeSchema,
  type TargetScalingMode,
} from "../target-scaling";
import {
  parseUncertaintyOptions,
  type EncodedUncertaintyOptions,
  type UncertaintyOptions,
} from "../uncertainty";

/** Point CV controls; omitted scaling defaults to absmax independently of fit options. */
export interface CrossValidationPointInput {
  readonly mode?: "point";
  readonly scaling?: TargetScalingMode;
}

/** Interval CV controls with an explicit seed and independent fold scaling policy. */
export interface CrossValidationIntervalInput {
  readonly mode: "intervals";
  readonly scaling?: TargetScalingMode;
  readonly uncertainty: Omit<EncodedUncertaintyOptions, "output"> & { readonly output?: never };
}

/** Public fourth-argument controls for point or interval cross-validation. */
export type CrossValidationInput = CrossValidationPointInput | CrossValidationIntervalInput;

/** Parsed CV controls shared by direct evaluation and model search. */
export type ParsedCrossValidationInput =
  | (CrossValidationPointInput & { readonly mode: "point" })
  | (CrossValidationIntervalInput & { readonly uncertaintyOptions: UncertaintyOptions });

const InputSchema = Schema.Union([
  Schema.Struct({
    mode: Schema.Literal("point").pipe(Schema.withDecodingDefaultKey(Effect.succeed("point"))),
    scaling: Schema.optionalKey(TargetScalingModeSchema),
  }),
  Schema.Struct({
    mode: Schema.Literal("intervals"),
    scaling: Schema.optionalKey(TargetScalingModeSchema),
    uncertainty: Schema.Unknown,
  }),
]);

const decodeInput = Schema.decodeUnknownEffect(InputSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Parse controls without entering any fitting, prediction or simulation boundary. */
export const parseCrossValidationInput = (
  input?: CrossValidationInput,
): Effect.Effect<ParsedCrossValidationInput, InputValidationError> =>
  Effect.gen(function* () {
    const syntax = yield* decodeInput(input === undefined ? {} : input).pipe(
      Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-plan", error.issue)),
    );

    if (syntax.mode === "point") {
      return Object.freeze(syntax);
    }

    const uncertainty = yield* parseUncertaintyOptions(syntax.uncertainty);

    if (uncertainty.output !== "intervals") {
      return yield* Effect.fail(
        new InputValidationError({
          input: "uncertainty-options",
          issues: [{ path: ["output"], message: "Cross-validation requires interval output" }],
          message: "Cross-validation requires interval output",
        }),
      );
    }

    return Object.freeze({
      ...syntax,
      uncertainty: Object.freeze({
        seed: uncertainty.seed,
        samples: uncertainty.samples,
        intervalWidth: uncertainty.intervalWidth,
      }),
      uncertaintyOptions: uncertainty,
    });
  });

/** Resolve fold/search fit options using the independent CV scaling policy. */
export const crossValidationFitOptions = (
  input: EncodedProphetOptions,
  controls: CrossValidationInput,
): EncodedProphetOptions =>
  Object.freeze({ ...input, scaling: controls.scaling ?? defaultTargetScalingMode });
