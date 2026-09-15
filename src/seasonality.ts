import { Effect, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";

/** The Stage B default ridge penalty control for a seasonal component. */
export const defaultSeasonalityPriorScale = 10;

// Exact, case-sensitive names reserved for built-ins and package output/component labels.
// Names are never normalized: `daily` is reserved while `Daily` is a distinct custom name.
const reservedSeasonalityNames: ReadonlySet<string> = new Set([
  "daily",
  "weekly",
  "yearly",
  "trend",
  "value",
  "timestamp",
  "additive",
  "seasonalities",
]);

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const maximumFourierOrder = Math.floor(Number.MAX_SAFE_INTEGER / 2);

const PositiveFourierOrder = Schema.Int.check(
  Schema.isGreaterThan(0),
  Schema.isLessThanOrEqualTo(maximumFourierOrder),
);

const SeasonalityNameSchema = Schema.NonEmptyString.check(
  Schema.makeFilter((name) => !reservedSeasonalityNames.has(name), {
    message: "Seasonality name is reserved",
  }),
).pipe(Schema.brand("effect-prophet/SeasonalityName"));

const SeasonalityDefinitionSchema = Schema.Struct({
  name: SeasonalityNameSchema,
  periodDays: PositiveFinite,
  fourierOrder: PositiveFourierOrder,
  priorScale: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultSeasonalityPriorScale)),
  ),
}).pipe(Schema.brand("effect-prophet/SeasonalityDefinition"));

/** A custom seasonality representation accepted before parsing and default application. */
export type EncodedSeasonality = typeof SeasonalityDefinitionSchema.Encoded;

/** A parsed additive Fourier seasonality definition. */
export type SeasonalityDefinition = typeof SeasonalityDefinitionSchema.Type;

const seasonalitiesHaveUniqueNames = Schema.makeFilter<ReadonlyArray<SeasonalityDefinition>>(
  (definitions) => {
    const names = new Set<string>();
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

    for (const [index, definition] of definitions.entries()) {
      if (names.has(definition.name)) {
        issues.push({
          path: [index, "name"],
          issue: `Seasonality name '${definition.name}' is duplicated`,
        });
      }

      names.add(definition.name);
    }

    return issues;
  },
);

const SeasonalitiesSchema = Schema.Array(SeasonalityDefinitionSchema).check(
  seasonalitiesHaveUniqueNames,
);

const ParsedSeasonalityDefinitionSchema = Schema.toType(SeasonalityDefinitionSchema);

const SeasonalComponentSchema = Schema.Struct({
  definition: ParsedSeasonalityDefinitionSchema,
  coefficientOffset: Schema.Natural,
  coefficientCount: Schema.Natural,
});

const SeasonalityLayoutFieldsSchema = Schema.Struct({
  components: Schema.Array(SeasonalComponentSchema),
  coefficientCount: Schema.Natural,
});

type SeasonalityLayoutFields = typeof SeasonalityLayoutFieldsSchema.Type;

const consistentSeasonalityLayout = Schema.makeFilter<SeasonalityLayoutFields>((layout) => {
  const names = new Set<string>();
  const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];
  let expectedOffset = 0;

  for (const [index, component] of layout.components.entries()) {
    const componentPath = ["components", index] as const;
    const expectedCount = component.definition.fourierOrder * 2;

    if (names.has(component.definition.name)) {
      issues.push({
        path: [...componentPath, "definition", "name"],
        issue: `Seasonality name '${component.definition.name}' is duplicated`,
      });
    }

    names.add(component.definition.name);

    if (component.coefficientOffset !== expectedOffset) {
      issues.push({
        path: [...componentPath, "coefficientOffset"],
        issue: `Expected contiguous coefficient offset ${expectedOffset}`,
      });
    }

    if (component.coefficientCount !== expectedCount) {
      issues.push({
        path: [...componentPath, "coefficientCount"],
        issue: `Expected coefficient count ${expectedCount}`,
      });
    }

    if (expectedOffset > Number.MAX_SAFE_INTEGER - expectedCount) {
      issues.push({
        path: [...componentPath, "coefficientCount"],
        issue: "Total seasonal coefficient count exceeds safe integer arithmetic",
      });
      continue;
    }

    expectedOffset += expectedCount;
  }

  if (layout.coefficientCount !== expectedOffset) {
    issues.push({
      path: ["coefficientCount"],
      issue: `Expected total coefficient count ${expectedOffset}`,
    });
  }

  return issues;
});

/** Runtime schema for a parsed, deterministic seasonality coefficient layout. */
export const SeasonalityLayoutSchema = SeasonalityLayoutFieldsSchema.check(
  consistentSeasonalityLayout,
).pipe(Schema.brand("effect-prophet/SeasonalityLayout"));

/** One seasonal component's identity and contiguous coefficient range. */
export type SeasonalComponent = (typeof SeasonalityLayoutSchema.Type)["components"][number];

/** A parsed coefficient layout ordered by definition, harmonic, then sine before cosine. */
export type SeasonalityLayout = typeof SeasonalityLayoutSchema.Type;

/** An internal failure to establish seasonality or coefficient-layout invariants. */
export class InvalidSeasonality extends Schema.TaggedError<InvalidSeasonality>()(
  "InvalidSeasonality",
  {
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

const invalidSeasonalityFromIssue = (issue: SchemaIssue.Issue): InvalidSeasonality =>
  new InvalidSeasonality({
    issues: validationIssuesFromIssue(issue),
    message: validationMessageFromIssue(issue),
  });

const decodeSeasonalities = Schema.decodeUnknownEffect(SeasonalitiesSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const decodeSeasonalityLayout = Schema.decodeUnknownEffect(SeasonalityLayoutSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const freezeDefinition = (definition: SeasonalityDefinition): SeasonalityDefinition =>
  Object.freeze(definition);

const freezeDefinitions = (
  definitions: ReadonlyArray<SeasonalityDefinition>,
): ReadonlyArray<SeasonalityDefinition> => Object.freeze(definitions.map(freezeDefinition));

const freezeLayout = (layout: SeasonalityLayout): SeasonalityLayout => {
  for (const component of layout.components) {
    Object.freeze(component.definition);
    Object.freeze(component);
  }

  Object.freeze(layout.components);

  return Object.freeze(layout);
};

/**
 * Parse untrusted custom seasonality definitions without changing their order or names.
 *
 * Missing `priorScale` values receive the Stage B penalty-control default of `10`. This is not
 * a promise of equivalent Prophet MAP behavior.
 *
 * @param input - Untrusted seasonality definitions.
 * @returns Parsed, fresh, frozen definitions or structured seasonality issues.
 */
export const parseSeasonalities = (
  input: Parameters<typeof decodeSeasonalities>[0],
): Effect.Effect<ReadonlyArray<SeasonalityDefinition>, InvalidSeasonality> =>
  decodeSeasonalities(input).pipe(
    Effect.map(freezeDefinitions),
    Effect.mapError((error) => invalidSeasonalityFromIssue(error.issue)),
  );

/**
 * Parse persisted coefficient-layout metadata and verify all redundant offsets and counts.
 *
 * @param input - Untrusted persisted layout metadata.
 * @returns A fresh, deeply frozen layout or structured seasonality issues.
 */
export const parseSeasonalityLayout = (
  input: Parameters<typeof decodeSeasonalityLayout>[0],
): Effect.Effect<SeasonalityLayout, InvalidSeasonality> =>
  decodeSeasonalityLayout(input).pipe(
    Effect.map(freezeLayout),
    Effect.mapError((error) => invalidSeasonalityFromIssue(error.issue)),
  );

/**
 * Construct a deterministic contiguous coefficient layout in definition order.
 *
 * Within each component, coefficient identity is increasing harmonic followed by sine then
 * cosine. The operation allocates component metadata only; it never allocates by coefficient
 * count.
 *
 * @param definitions - Parsed seasonality definitions in caller-selected order.
 * @returns A deeply frozen layout or structured layout issues.
 */
export const makeSeasonalityLayout = (
  definitions: ReadonlyArray<SeasonalityDefinition>,
): Effect.Effect<SeasonalityLayout, InvalidSeasonality> => {
  const components: Array<{
    readonly definition: SeasonalityDefinition;
    readonly coefficientOffset: number;
    readonly coefficientCount: number;
  }> = [];

  let coefficientCount = 0;

  for (const [index, definition] of definitions.entries()) {
    const componentCoefficientCount = definition.fourierOrder * 2;

    if (coefficientCount > Number.MAX_SAFE_INTEGER - componentCoefficientCount) {
      return Effect.fail(
        new InvalidSeasonality({
          issues: [
            {
              path: [index, "fourierOrder"],
              message: "Total seasonal coefficient count exceeds safe integer arithmetic",
            },
          ],
          message: "Invalid seasonality layout: coefficient count exceeds safe integer arithmetic",
        }),
      );
    }

    components.push({
      definition,
      coefficientOffset: coefficientCount,
      coefficientCount: componentCoefficientCount,
    });
    coefficientCount += componentCoefficientCount;
  }

  return parseSeasonalityLayout({ components, coefficientCount });
};
