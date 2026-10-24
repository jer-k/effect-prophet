import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";

/** Versioned scalar-path algorithm identity returned with every result. */
export const simulationIdentity = "prophet-map-scalar-xoshiro128ss-v2" as const;

const OptionsSchema = Schema.Struct({
  seed: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThanOrEqualTo(4_294_967_295),
  ),
  samples: Schema.optionalKey(
    Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(2_048)),
  ),
  intervalWidth: Schema.optionalKey(
    Schema.Finite.check(Schema.isGreaterThan(0), Schema.isLessThan(1)),
  ),
  output: Schema.optionalKey(Schema.Literals(["intervals", "samples"])),
});

/** Untrusted opt-in simulation request; an explicit seed is required. */
export type EncodedUncertaintyOptions = typeof OptionsSchema.Encoded;

/** Untrusted interval-only simulation request; sample output is rejected, never ignored. */
export type EncodedIntervalOptions = Omit<EncodedUncertaintyOptions, "output"> & {
  readonly output?: never;
};

/** Parsed exact-count simulation controls. */
export interface UncertaintyOptions {
  readonly seed: number;
  readonly samples: number;
  readonly intervalWidth: number;
  readonly output: "intervals" | "samples";
}

/** Rows one simulation call accepts in either output mode. */
export const maximumSimulationRows = 10_000;

/** Draws one sample-output call may return; interval output streams rows instead. */
export const maximumSampleCells = 1_000_000;

/** Whether one simulation call exceeds its row bound or, for samples, its returned-draw bound. */
export const exceedsSimulationBudget = (
  rows: number,
  samples: number,
  output: UncertaintyOptions["output"],
): boolean =>
  rows > maximumSimulationRows || (output === "samples" && rows * samples > maximumSampleCells);

/** One finite equal-tailed predictive interval in observation units. */
export interface UncertaintyInterval {
  readonly lower: number;
  readonly upper: number;
}

/** Simulated trend and value intervals for one prediction row. */
export interface UncertaintyIntervalRow {
  readonly timestamp: number;
  readonly trend: UncertaintyInterval;
  readonly value: UncertaintyInterval;
}

/** Distinct owned interval or row-major sample results. */
export type UncertaintyResult =
  | {
      readonly kind: "intervals";
      readonly simulation: typeof simulationIdentity;
      readonly sampleCount: number;
      readonly intervalWidth: number;
      readonly rows: ReadonlyArray<UncertaintyIntervalRow>;
    }
  | {
      readonly kind: "samples";
      readonly simulation: typeof simulationIdentity;
      readonly sampleCount: number;
      readonly timestamps: ReadonlyArray<number>;
      readonly trend: Float64Array;
      readonly value: Float64Array;
    };

const decodeOptions = Schema.decodeUnknownEffect(OptionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Interval width used when a simulation request omits one. */
export const defaultIntervalWidth = 0.8;

/** Parse explicit simulation controls without installing a random service. */
export const parseUncertaintyOptions = (
  input: Parameters<typeof decodeOptions>[0],
  omittedIntervalWidth: number = defaultIntervalWidth,
): Effect.Effect<UncertaintyOptions, InputValidationError> =>
  decodeOptions(input).pipe(
    Effect.map((parsed) => ({
      seed: parsed.seed,
      samples: parsed.samples ?? 1_000,
      intervalWidth: parsed.intervalWidth ?? omittedIntervalWidth,
      output: parsed.output ?? "intervals",
    })),
    Effect.mapError((error) => inputValidationErrorFromIssue("uncertainty-options", error.issue)),
  );

/** Parse simulation controls for an operation that only returns intervals. */
export const parseIntervalOptions = (
  input: Parameters<typeof decodeOptions>[0],
  message: string,
  omittedIntervalWidth: number = defaultIntervalWidth,
): Effect.Effect<UncertaintyOptions & { readonly output: "intervals" }, InputValidationError> =>
  parseUncertaintyOptions(input, omittedIntervalWidth).pipe(
    Effect.flatMap((options) =>
      options.output === "intervals"
        ? Effect.succeed({ ...options, output: options.output })
        : Effect.fail(
            new InputValidationError({
              input: "uncertainty-options",
              issues: [{ path: ["output"], message }],
              message,
            }),
          ),
    ),
  );

/** The result of pairing interval rows with the rows they were requested for. */
export type IntervalAlignment<Row> =
  | {
      readonly kind: "aligned";
      readonly rows: ReadonlyArray<{
        readonly row: Row;
        readonly interval: UncertaintyIntervalRow;
      }>;
    }
  | { readonly kind: "frame-mismatch" }
  | { readonly kind: "row-mismatch"; readonly index: number; readonly timestamp: number };

const isOrderedInterval = (interval: UncertaintyInterval): boolean =>
  Number.isFinite(interval.lower) &&
  Number.isFinite(interval.upper) &&
  interval.lower <= interval.upper;

/**
 * Pair each requested row with its interval by position.
 *
 * The result must answer the request, and each row must carry the requested
 * timestamp and finite ordered intervals. Rows are never matched by timestamp
 * alone, because duplicate timestamps may carry different auxiliary inputs.
 */
export const alignIntervalRows = <Row extends { readonly timestamp: number }>(
  result: UncertaintyResult,
  options: Pick<UncertaintyOptions, "samples" | "intervalWidth">,
  rows: ReadonlyArray<Row>,
): IntervalAlignment<Row> => {
  if (
    result.kind !== "intervals" ||
    result.simulation !== simulationIdentity ||
    result.sampleCount !== options.samples ||
    result.intervalWidth !== options.intervalWidth ||
    result.rows.length !== rows.length
  ) {
    return { kind: "frame-mismatch" };
  }

  const aligned: Array<{ readonly row: Row; readonly interval: UncertaintyIntervalRow }> = [];

  for (const [index, row] of rows.entries()) {
    const interval = result.rows[index];

    if (
      interval?.timestamp !== row.timestamp ||
      !isOrderedInterval(interval.value) ||
      !isOrderedInterval(interval.trend)
    ) {
      return { kind: "row-mismatch", index, timestamp: row.timestamp };
    }

    aligned.push({ row, interval });
  }

  return { kind: "aligned", rows: aligned };
};
