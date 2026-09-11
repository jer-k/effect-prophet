import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError, decodeObservations } from "../src/index";

const expectValidationFailure = async <Input>(input: Input, message: string) => {
  const error = await Effect.runPromise(Effect.flip(decodeObservations(input)));

  expect(error).toBeInstanceOf(InputValidationError);
  expect(error.input).toBe("observations");
  expect(error.message).toContain(message);
};

describe("decodeObservations", () => {
  it("decodes canonical UTC timestamps to epoch milliseconds", async () => {
    const observations = await Effect.runPromise(
      decodeObservations([
        { timestamp: "2024-01-01T00:00:00.000Z", value: 1.5 },
        { timestamp: "2024-01-01T00:00:01.000Z", value: -2 },
      ]),
    );

    expect(observations).toEqual([
      { timestamp: 1_704_067_200_000, value: 1.5 },
      { timestamp: 1_704_067_201_000, value: -2 },
    ]);
  });

  it("rejects malformed timestamps", async () => {
    await expectValidationFailure(
      [{ timestamp: "not-a-timestamp", value: 1 }],
      "valid canonical UTC timestamp",
    );
  });

  it("rejects nonexistent calendar dates", async () => {
    await expectValidationFailure(
      [{ timestamp: "2024-02-30T00:00:00.000Z", value: 1 }],
      "valid canonical UTC timestamp",
    );
  });

  it("rejects timestamps that are not in the canonical UTC representation", async () => {
    await expectValidationFailure(
      [{ timestamp: "2024-01-01T00:00:00+00:00", value: 1 }],
      "valid canonical UTC timestamp",
    );
  });

  it("rejects NaN values", async () => {
    await expectValidationFailure(
      [{ timestamp: "2024-01-01T00:00:00.000Z", value: Number.NaN }],
      "finite number",
    );
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "rejects the non-finite value %s",
    async (value) => {
      await expectValidationFailure(
        [{ timestamp: "2024-01-01T00:00:00.000Z", value }],
        "finite number",
      );
    },
  );

  it("rejects an empty collection", async () => {
    await expectValidationFailure([], "Missing key");
  });

  it("rejects observations that are not sorted", async () => {
    await expectValidationFailure(
      [
        { timestamp: "2024-01-01T00:00:01.000Z", value: 1 },
        { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      ],
      "Observations must be sorted by timestamp in ascending order",
    );
  });

  it("rejects duplicate timestamps", async () => {
    await expectValidationFailure(
      [
        { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
        { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      ],
      "Duplicate timestamps are not allowed",
    );
  });
});
