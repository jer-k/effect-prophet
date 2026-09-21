import { Effect, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import {
  FeatureNameSchema,
  featureNameDelimiter,
  isReservedFeatureName,
  type FeatureName,
} from "./feature-name";

/** The Stage B default ridge penalty control for a seasonal component. */
export const defaultSeasonalityPriorScale = 10;

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const maximumFourierOrder = Math.floor(Number.MAX_SAFE_INTEGER / 2);

const PositiveFourierOrder = Schema.Int.check(
  Schema.isGreaterThan(0),
  Schema.isLessThanOrEqualTo(maximumFourierOrder),
);

const builtInSeasonalityNames: ReadonlySet<string> = new Set(["daily", "weekly", "yearly"]);

const validDefinitionName = Schema.makeFilter(
  (name: string) =>
    (!isReservedFeatureName(name) || builtInSeasonalityNames.has(name)) &&
    !name.includes(featureNameDelimiter),
  { message: "Seasonality name is reserved" },
);

const priorScaleSchema = PositiveFinite.pipe(
  Schema.withDecodingDefaultKey(Effect.succeed(defaultSeasonalityPriorScale)),
);

const SeasonalityDefinitionFieldsSchema = Schema.Struct({
  name: Schema.NonEmptyString.check(validDefinitionName),
  periodDays: PositiveFinite,
  fourierOrder: PositiveFourierOrder,
  priorScale: priorScaleSchema,
  conditionName: Schema.optionalKey(FeatureNameSchema),
});

const expectedBuiltInPeriod = (name: string): number | undefined => {
  switch (name) {
    case "daily":
      return 1;
    case "weekly":
      return 7;
    case "yearly":
      return 365.25;
    default:
      return undefined;
  }
};

const canonicalBuiltInPeriod = Schema.makeFilter<typeof SeasonalityDefinitionFieldsSchema.Type>(
  (definition) => {
    const expectedPeriod = expectedBuiltInPeriod(definition.name);

    if (expectedPeriod !== undefined && definition.periodDays !== expectedPeriod) {
      return {
        path: ["periodDays"],
        issue: `Expected canonical ${definition.name} period ${expectedPeriod}`,
      };
    }

    if (expectedPeriod !== undefined && definition.conditionName !== undefined) {
      return {
        path: ["conditionName"],
        issue: "Built-in seasonalities cannot be conditional",
      };
    }
  },
);

const ResolvedSeasonalityDefinitionFieldsSchema =
  SeasonalityDefinitionFieldsSchema.check(canonicalBuiltInPeriod);

const SeasonalityDefinitionSchema = ResolvedSeasonalityDefinitionFieldsSchema.pipe(
  Schema.brand("effect-prophet/SeasonalityDefinition"),
);

const CustomSeasonalityDefinitionSchema = Schema.Struct({
  name: Schema.NonEmptyString.check(
    Schema.makeFilter((name) => !isReservedFeatureName(name), {
      message: "Seasonality name is reserved",
    }),
    Schema.makeFilter((name) => !name.includes(featureNameDelimiter), {
      message: `Seasonality names cannot contain '${featureNameDelimiter}'`,
    }),
  ),
  periodDays: PositiveFinite,
  fourierOrder: PositiveFourierOrder,
  priorScale: priorScaleSchema,
  conditionName: Schema.optionalKey(FeatureNameSchema),
}).pipe(Schema.brand("effect-prophet/SeasonalityDefinition"));

const BuiltInSeasonalityDefinitionSchema = Schema.Struct({
  name: Schema.Literals(["daily", "weekly", "yearly"]),
  periodDays: PositiveFinite,
  fourierOrder: PositiveFourierOrder,
  priorScale: priorScaleSchema,
})
  .check(canonicalBuiltInPeriod)
  .pipe(Schema.brand("effect-prophet/SeasonalityDefinition"));

/** A custom seasonality representation accepted before parsing and default application. */
export type EncodedSeasonality = typeof CustomSeasonalityDefinitionSchema.Encoded;

/** A parsed additive Fourier seasonality definition. */
export type SeasonalityDefinition = typeof SeasonalityDefinitionSchema.Type & {
  /** Optional condition whose boolean row value gates every harmonic in this component. */
  readonly conditionName?: FeatureName;
};

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

const SeasonalitiesSchema = Schema.Array(CustomSeasonalityDefinitionSchema).check(
  seasonalitiesHaveUniqueNames,
);

const SeasonalityDefinitionsSchema = Schema.Array(SeasonalityDefinitionSchema).check(
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

/** A parsed coefficient layout containing no seasonal components. */
export type EmptySeasonalityLayout = SeasonalityLayout & {
  readonly components: readonly [];
  readonly coefficientCount: 0;
};

/** A parsed coefficient layout containing at least one seasonal component. */
export type NonEmptySeasonalityLayout = SeasonalityLayout & {
  readonly components: readonly [SeasonalComponent, ...ReadonlyArray<SeasonalComponent>];
};

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

const decodeSeasonalityDefinitions = Schema.decodeUnknownEffect(SeasonalityDefinitionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const decodeBuiltInSeasonalityDefinition = Schema.decodeUnknownEffect(
  BuiltInSeasonalityDefinitionSchema,
  {
    errors: "all",
    onExcessProperty: "error",
  },
);

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
 * Parse trusted-format definitions that may include canonical built-in names.
 *
 * This parser is for resolved model state, not public custom-seasonality options.
 *
 * @param input - Untrusted resolved seasonality definitions.
 * @returns Parsed, fresh, frozen definitions or structured seasonality issues.
 */
export const parseSeasonalityDefinitions = (
  input: Parameters<typeof decodeSeasonalityDefinitions>[0],
): Effect.Effect<ReadonlyArray<SeasonalityDefinition>, InvalidSeasonality> =>
  decodeSeasonalityDefinitions(input).pipe(
    Effect.map(freezeDefinitions),
    Effect.mapError((error) => invalidSeasonalityFromIssue(error.issue)),
  );

/**
 * Construct one canonical built-in definition through the seasonality domain parser.
 *
 * @param input - Complete built-in definition fields selected by fit-time resolution.
 * @returns A parsed frozen definition or structured seasonality issues.
 */
export const makeBuiltInSeasonalityDefinition = (
  input: Parameters<typeof decodeBuiltInSeasonalityDefinition>[0],
): Effect.Effect<SeasonalityDefinition, InvalidSeasonality> =>
  decodeBuiltInSeasonalityDefinition(input).pipe(
    Effect.map(freezeDefinition),
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

/**
 * Construct the canonical empty coefficient layout.
 *
 * @returns A deeply frozen empty layout or structured layout issues.
 */
export const makeEmptySeasonalityLayout = (): Effect.Effect<
  EmptySeasonalityLayout,
  InvalidSeasonality
> =>
  makeSeasonalityLayout([]).pipe(
    Effect.map((layout) => {
      const components: readonly [] = Object.freeze([]);

      return Object.freeze({
        ...layout,
        components,
        coefficientCount: 0 as const,
      });
    }),
  );

/**
 * Construct a deterministic coefficient layout from at least one definition.
 *
 * @param definitions - Parsed non-empty seasonality definitions in caller-selected order.
 * @returns A deeply frozen non-empty layout or structured layout issues.
 */
export const makeNonEmptySeasonalityLayout = (
  definitions: readonly [SeasonalityDefinition, ...ReadonlyArray<SeasonalityDefinition>],
): Effect.Effect<NonEmptySeasonalityLayout, InvalidSeasonality> =>
  makeSeasonalityLayout(definitions).pipe(
    Effect.flatMap((layout) => {
      const firstComponent = layout.components[0];

      if (firstComponent === undefined) {
        return Effect.fail(
          new InvalidSeasonality({
            issues: [{ message: "Expected at least one seasonal component" }],
            message: "Failed to construct a non-empty seasonality layout",
          }),
        );
      }

      const components: readonly [SeasonalComponent, ...ReadonlyArray<SeasonalComponent>] =
        Object.freeze([firstComponent, ...layout.components.slice(1)]);

      return Effect.succeed(Object.freeze({ ...layout, components }));
    }),
  );
