import { DateTime, Option, Schema, SchemaGetter } from "effect";

const canonicalTimestampExpected =
  "a valid canonical UTC timestamp (for example, 2024-01-01T00:00:00.000Z)";

const CanonicalTimestampString = Schema.String.check(
  Schema.makeFilter(
    (timestamp) =>
      Option.match(DateTime.make(timestamp), {
        onNone: () => false,
        onSome: (dateTime) => DateTime.formatIso(dateTime) === timestamp,
      }),
    { expected: canonicalTimestampExpected },
  ),
);

/** Codec between canonical UTC timestamp strings and integer epoch milliseconds. */
export const TimestampSchema = CanonicalTimestampString.pipe(
  Schema.decodeTo(Schema.Int, {
    decode: SchemaGetter.transform((timestamp) =>
      DateTime.toEpochMillis(DateTime.makeUnsafe(timestamp)),
    ),
    encode: SchemaGetter.transform((epochMilliseconds) =>
      DateTime.formatIso(DateTime.makeUnsafe(epochMilliseconds)),
    ),
  }),
);
