import { Cause, Exit } from "effect";
import fc from "fast-check";

import type { EncodedObservation } from "../../src/index";
import { millisecondsPerDay } from "../../src/internal/time";

/**
 * Seeded, bounded fast-check parameters so CI failures replay locally and `npm test` stays fast.
 * To replay a shrunk failure, temporarily add the `path` from its report to these parameters.
 */
export const propertyParameters = (numRuns: number): fc.Parameters<unknown> => ({
  seed: 59,
  numRuns,
});

/** 2020-01-01T00:00:00.000Z: an epoch far from timestamp representability limits. */
const baseEpoch = 1_577_836_800_000;

/** The canonical timestamp a whole number of days after the base epoch. */
export const timestampAtDay = (day: number): string =>
  new Date(baseEpoch + day * millisecondsPerDay).toISOString();

/** Days in the generated timestamp pool; later days are outside every generated history. */
export const timestampPoolDays = 61;

/** Floats at the edges of finiteness, sign, magnitude, and integer precision. */
export const edgeNumber: fc.Arbitrary<number> = fc.oneof(
  fc.constantFrom(
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    0,
    -0,
    Number.MAX_VALUE,
    -Number.MAX_VALUE,
    Number.MIN_VALUE,
    Number.MAX_SAFE_INTEGER + 2,
    1e300,
    -1e300,
  ),
  fc.double(),
);

/** Finite targets spanning tiny, ordinary, and extreme magnitudes. */
export const finiteNumber: fc.Arbitrary<number> = fc.oneof(
  fc.double({ min: -1_000, max: 1_000, noNaN: true }),
  fc.double({ noNaN: true, noDefaultInfinity: true }),
  fc.constantFrom(0, -0, Number.MAX_VALUE, -Number.MAX_VALUE, Number.MIN_VALUE, 1e300, -1e300),
);

/** Canonical UTC timestamps drawn from a small daily pool so duplicates and disorder are common. */
export const canonicalTimestamp: fc.Arbitrary<string> = fc
  .integer({ min: 0, max: timestampPoolDays - 1 })
  .map(timestampAtDay);

/** Strings that look like timestamps but are not canonical UTC instants. */
export const malformedTimestamp: fc.Arbitrary<string> = fc.oneof(
  fc.constantFrom(
    "",
    "2024-01-01",
    "2024-01-01T00:00:00Z",
    "2024-01-01T00:00:00.000+00:00",
    "2024-13-01T00:00:00.000Z",
    "2024-02-30T00:00:00.000Z",
    "+275760-09-13T00:00:00.001Z",
    "not a timestamp",
  ),
  fc.string({ maxLength: 30 }),
);

/** Encoded observations that are valid apart from what the value arbitraries inject. */
export const encodedObservation = (
  timestamp: fc.Arbitrary<string>,
  value: fc.Arbitrary<number>,
): fc.Arbitrary<EncodedObservation> =>
  fc.record(
    {
      timestamp,
      value,
      regressors: fc.dictionary(fc.constantFrom("price", "promo"), value, { maxKeys: 2 }),
      conditions: fc.dictionary(fc.constantFrom("weekend", "season"), fc.boolean(), {
        maxKeys: 2,
      }),
    },
    { requiredKeys: ["timestamp", "value"] },
  );

/** Rows mixing valid fields with non-finite numbers, malformed timestamps, and unknown keys. */
export const hostileObservation: fc.Arbitrary<unknown> = fc.oneof(
  encodedObservation(fc.oneof(canonicalTimestamp, malformedTimestamp), edgeNumber),
  encodedObservation(canonicalTimestamp, finiteNumber).map((row) => ({ ...row, extra: 1 })),
  encodedObservation(canonicalTimestamp, finiteNumber).map((row) => ({
    ...row,
    capacity: Number.NaN,
  })),
  fc.anything(),
);

/** Valid encoded observation histories, including single rows, ties, and unsorted input. */
export const validObservations = (
  value: fc.Arbitrary<number> = finiteNumber,
): fc.Arbitrary<ReadonlyArray<{ readonly timestamp: string; readonly value: number }>> =>
  fc.array(fc.record({ timestamp: canonicalTimestamp, value }), { minLength: 1, maxLength: 16 });

/** Insert one row into a copy of a history at a generated position. */
export const insertAt = <Row, Inserted>(
  rows: ReadonlyArray<Row>,
  inserted: Inserted,
  position: number,
): ReadonlyArray<Row | Inserted> => {
  const index = position % (rows.length + 1);

  return [...rows.slice(0, index), inserted, ...rows.slice(index)];
};

/** Whether an exit is a success or fails only with the expected error classes. */
export const isTypedExit = <A, E>(
  exit: Exit.Exit<A, E>,
  expected: ReadonlyArray<abstract new (...args: never) => object>,
): boolean => {
  if (Exit.isSuccess(exit)) {
    return true;
  }

  if (Cause.hasDies(exit.cause) || Cause.hasInterrupts(exit.cause)) {
    return false;
  }

  return exit.cause.reasons.every(
    (reason) =>
      Cause.isFailReason(reason) &&
      expected.some((ErrorClass) => reason.error instanceof ErrorClass),
  );
};
