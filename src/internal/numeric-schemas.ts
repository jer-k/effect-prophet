import { Schema } from "effect";

/** A finite number greater than zero. */
export const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

/** The largest Fourier order whose doubled coefficient count remains a safe integer. */
export const maximumFourierOrder = Math.floor(Number.MAX_SAFE_INTEGER / 2);

/** A positive safe Fourier order. */
export const PositiveFourierOrder = Schema.Int.check(
  Schema.isGreaterThan(0),
  Schema.isLessThanOrEqualTo(maximumFourierOrder),
);
