import { Effect, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";

/** Separator used by Prophet when constructing event-offset feature identities. */
export const featureNameDelimiter = "_delim_";

const reservedFeatureNames: ReadonlySet<string> = new Set([
  "daily",
  "weekly",
  "yearly",
  "trend",
  "value",
  "timestamp",
  "additive",
  "multiplicative",
  "factor",
  "contribution",
  "seasonalities",
  "events",
  "regressors",
  "conditions",
]);

/** Return whether a name is reserved for a built-in or package output/group label. */
export const isReservedFeatureName = (name: string): boolean => reservedFeatureNames.has(name);

const ValidFeatureName = Schema.NonEmptyString.check(
  Schema.makeFilter((name) => !name.includes(featureNameDelimiter), {
    message: `Feature names cannot contain '${featureNameDelimiter}'`,
  }),
  Schema.makeFilter((name) => !isReservedFeatureName(name), {
    message: "Feature name is reserved",
  }),
);

/** Runtime schema for a case-sensitive, non-reserved component feature name. */
export const FeatureNameSchema = ValidFeatureName.pipe(Schema.brand("effect-prophet/FeatureName"));

/** A parsed case-sensitive name shared by events, regressors, and conditions. */
export type FeatureName = typeof FeatureNameSchema.Type;

/** A failure to parse a shared feature name. */
export class InvalidFeatureName extends Schema.TaggedError<InvalidFeatureName>()(
  "InvalidFeatureName",
  {
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

const decodeFeatureName = Schema.decodeUnknownEffect(FeatureNameSchema, {
  errors: "all",
});

const invalidFeatureNameFromIssue = (issue: SchemaIssue.Issue): InvalidFeatureName =>
  new InvalidFeatureName({
    issues: validationIssuesFromIssue(issue),
    message: validationMessageFromIssue(issue),
  });

/** Parse an untrusted shared component feature name without normalization. */
export const parseFeatureName = (
  input: Parameters<typeof decodeFeatureName>[0],
): Effect.Effect<FeatureName, InvalidFeatureName> =>
  decodeFeatureName(input).pipe(
    Effect.mapError((error) => invalidFeatureNameFromIssue(error.issue)),
  );
