import { Effect, Exit } from "effect";
import fc from "fast-check";
import { describe, expect, it } from "vitest";

import { InputValidationError } from "../src/index";
import { decodeObservations } from "../src/observation";
import {
  canonicalTimestamp,
  edgeNumber,
  hostileObservation,
  insertAt,
  isTypedExit,
  malformedTimestamp,
  propertyParameters,
  validObservations,
} from "./helpers/property";

describe("observation decoding properties", () => {
  it("returns observations or an InputValidationError for arbitrary input, never a defect", () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.array(hostileObservation, { maxLength: 12 }), fc.anything()),
        (input) => {
          const exit = Effect.runSyncExit(decodeObservations(input));

          expect(isTypedExit(exit, [InputValidationError])).toBe(true);
        },
      ),
      propertyParameters(300),
    );
  });

  it("keeps every valid row and stably sorts ties and unsorted timestamps", () => {
    fc.assert(
      fc.property(validObservations(), (input) => {
        const exit = Effect.runSyncExit(decodeObservations(input));

        expect(Exit.isSuccess(exit)).toBe(true);

        if (!Exit.isSuccess(exit)) {
          return;
        }

        const expected = input
          .map((row, index) => ({ timestamp: Date.parse(row.timestamp), value: row.value, index }))
          .sort((left, right) => left.timestamp - right.timestamp || left.index - right.index);

        expect(exit.value.map(({ timestamp, value }) => ({ timestamp, value }))).toEqual(
          expected.map(({ timestamp, value }) => ({ timestamp, value })),
        );
      }),
      propertyParameters(200),
    );
  });

  it("rejects any history containing a non-finite target or malformed timestamp", () => {
    const corruptRow = fc.oneof(
      fc.record({
        timestamp: canonicalTimestamp,
        value: fc.constantFrom(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY),
      }),
      fc.record({ timestamp: malformedTimestamp, value: edgeNumber }),
    );

    fc.assert(
      fc.property(validObservations(), corruptRow, fc.nat(), (valid, corrupt, position) => {
        const exit = Effect.runSyncExit(decodeObservations(insertAt(valid, corrupt, position)));

        expect(Exit.isFailure(exit)).toBe(true);
        expect(isTypedExit(exit, [InputValidationError])).toBe(true);
      }),
      propertyParameters(200),
    );
  });
});
