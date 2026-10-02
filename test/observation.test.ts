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

  it("parses finite regressor records", async () => {
    const observations = await Effect.runPromise(
      decodeObservations([
        {
          timestamp: "2024-01-01T00:00:00.000Z",
          value: 1,
          regressors: { price: 2, promotion: 0 },
        },
      ]),
    );

    expect(observations[0]?.regressors).toEqual({ price: 2, promotion: 0 });
  });

  it("parses strict boolean condition records", async () => {
    const observations = await Effect.runPromise(
      decodeObservations([
        {
          timestamp: "2024-01-01T00:00:00.000Z",
          value: 1,
          conditions: { onSeason: true, promotion: false },
        },
      ]),
    );

    expect(observations[0]?.conditions).toEqual({ onSeason: true, promotion: false });

    for (const value of [1, "true", null]) {
      await expectValidationFailure(
        [
          {
            timestamp: "2024-01-01T00:00:00.000Z",
            value: 1,
            conditions: { onSeason: value },
          },
        ],
        "boolean",
      );
    }
  });

  it("rejects non-finite regressor values and unknown row fields", async () => {
    await expectValidationFailure(
      [
        {
          timestamp: "2024-01-01T00:00:00.000Z",
          value: 1,
          regressors: { price: Number.NaN },
        },
      ],
      "finite number",
    );

    await expectValidationFailure(
      [{ timestamp: "2024-01-01T00:00:00.000Z", value: 1, typo: true }],
      "excess property",
    );
  });

  it("rejects missing and null targets instead of silently dropping observations", async () => {
    for (const row of [
      { timestamp: "2024-01-01T00:00:00.000Z" },
      { timestamp: "2024-01-01T00:00:00.000Z", value: undefined },
      { timestamp: "2024-01-01T00:00:00.000Z", value: null },
    ]) {
      const error = await Effect.runPromise(Effect.flip(decodeObservations([row])));

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error.input).toBe("observations");
      expect(error.issues.some((issue) => issue.path?.includes("value"))).toBe(true);
    }
  });

  it("preserves a positive timestamp gap when the caller omits an entire row", async () => {
    const observations = await Effect.runPromise(
      decodeObservations([
        { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
        { timestamp: "2024-01-03T00:00:00.000Z", value: 3 },
      ]),
    );

    expect(observations.map((row) => row.value)).toEqual([1, 3]);
    expect(observations[1]?.timestamp).toBe(1_704_240_000_000);
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

  it("stably sorts complete decoded rows without mutating caller data or dropping ties", async () => {
    const input = Object.freeze([
      Object.freeze({
        timestamp: "2024-01-01T00:00:01.000Z",
        value: 1,
        regressors: Object.freeze({ x: 10 }),
        conditions: Object.freeze({ active: true }),
        capacity: 20,
        floor: 2,
      }),
      Object.freeze({
        timestamp: "2024-01-01T00:00:00.000Z",
        value: 2,
        regressors: Object.freeze({ x: 20 }),
        conditions: Object.freeze({ active: false }),
        capacity: 30,
        floor: 3,
      }),
      Object.freeze({
        timestamp: "2024-01-01T00:00:01.000Z",
        value: 3,
        regressors: Object.freeze({ x: 30 }),
        conditions: Object.freeze({ active: false }),
        capacity: 40,
        floor: 4,
      }),
    ]);

    const before = JSON.stringify(input);
    const decoded = await Effect.runPromise(decodeObservations(input));

    expect(decoded.map((row) => row.value)).toEqual([2, 1, 3]);
    expect(decoded.map((row) => row.regressors?.x)).toEqual([20, 10, 30]);
    expect(decoded.map((row) => row.conditions?.active)).toEqual([false, true, false]);
    expect(decoded.map((row) => [row.capacity, row.floor])).toEqual([
      [30, 3],
      [20, 2],
      [40, 4],
    ]);
    expect(JSON.stringify(input)).toBe(before);
    expect(decoded).not.toBe(input);
    expect(decoded[0]).not.toBe(input[1]);
    expect(decoded[0].regressors).not.toBe(input[1]?.regressors);
  });

  it("keeps zero-span histories for the selected fitting family's numerical policy", async () => {
    const decoded = await Effect.runPromise(
      decodeObservations([
        { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
        { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      ]),
    );

    expect(decoded.map((row) => row.value)).toEqual([1, 2]);
  });

  it("reports malformed rows at original input indexes before sorting", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        decodeObservations([
          { timestamp: "2024-01-03T00:00:00.000Z", value: 3 },
          { timestamp: "2024-01-01T00:00:00.000Z", value: null },
        ]),
      ),
    );

    expect(
      error.issues.some((issue) => JSON.stringify(issue.path) === JSON.stringify([1, "value"])),
    ).toBe(true);
  });
});
