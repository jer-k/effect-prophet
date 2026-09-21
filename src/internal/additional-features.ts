import { Effect, Schema } from "effect";

import type { FeatureName } from "../feature-name";

/** Source kind represented by one contiguous additional-feature component. */
export type AdditionalFeatureKind = "event" | "regressor";

/** One named contiguous range in the additional coefficient block. */
export interface AdditionalFeatureComponent {
  readonly kind: AdditionalFeatureKind;
  readonly name: FeatureName;
  readonly coefficientOffset: number;
  readonly coefficientCount: number;
}

/** Ordered metadata and priors for additional additive columns. */
export interface AdditionalFeatureLayout {
  readonly components: ReadonlyArray<AdditionalFeatureComponent>;
  readonly coefficientCount: number;
  readonly priorScales: ReadonlyArray<number>;
}

/** A privately owned, checked row-major matrix of finite additional features. */
export interface AdditionalFeatureMatrix {
  readonly rowCount: number;
  readonly columnCount: number;
  readonly values: Float64Array;
}

/** A privately owned row-major binary mask with one column per seasonal component. */
export interface SeasonalityMaskMatrix {
  readonly rowCount: number;
  readonly componentCount: number;
  readonly values: Uint8Array;
}

/** Matrix and layout passed together to numerical backends. */
export interface KnownAdditiveFeatures {
  readonly matrix: AdditionalFeatureMatrix;
  readonly layout: AdditionalFeatureLayout;
}

/** Structured failure while constructing checked additional-feature values. */
export class InvalidAdditionalFeatures extends Schema.TaggedError<InvalidAdditionalFeatures>()(
  "InvalidAdditionalFeatures",
  {
    path: Schema.Array(Schema.PropertyKey),
    message: Schema.String,
  },
) {}

const fail = (path: ReadonlyArray<PropertyKey>, message: string) =>
  Effect.fail(new InvalidAdditionalFeatures({ path, message }));

const checkedElementCount = (rows: number, columns: number): number | undefined => {
  if (!Number.isSafeInteger(rows) || rows < 0 || !Number.isSafeInteger(columns) || columns < 0) {
    return undefined;
  }

  const count = rows * columns;

  return Number.isSafeInteger(count) ? count : undefined;
};

/** Construct and deeply freeze an ordered additional-feature layout. */
export const createAdditionalFeatureLayout = <Component extends AdditionalFeatureComponent>(
  components: ReadonlyArray<Component>,
  priorScales: ReadonlyArray<number>,
): Effect.Effect<
  AdditionalFeatureLayout & { readonly components: ReadonlyArray<Component> },
  InvalidAdditionalFeatures
> => {
  const names = new Set<string>();
  let expectedOffset = 0;

  for (const [index, component] of components.entries()) {
    if (names.has(component.name)) {
      return fail(["components", index, "name"], `Feature name '${component.name}' is duplicated`);
    }

    names.add(component.name);

    if (component.coefficientOffset !== expectedOffset) {
      return fail(
        ["components", index, "coefficientOffset"],
        `Expected contiguous coefficient offset ${expectedOffset}`,
      );
    }

    if (!Number.isSafeInteger(component.coefficientCount) || component.coefficientCount <= 0) {
      return fail(
        ["components", index, "coefficientCount"],
        "Component coefficient count must be a positive safe integer",
      );
    }

    if (expectedOffset > Number.MAX_SAFE_INTEGER - component.coefficientCount) {
      return fail(["components", index], "Additional coefficient count exceeds safe arithmetic");
    }

    expectedOffset += component.coefficientCount;
  }

  if (priorScales.length !== expectedOffset) {
    return fail(["priorScales"], `Expected exactly ${expectedOffset} additional prior scales`);
  }

  for (const [index, priorScale] of priorScales.entries()) {
    if (!Number.isFinite(priorScale) || priorScale <= 0) {
      return fail(["priorScales", index], "Additional prior scales must be positive and finite");
    }
  }

  const frozenComponents: ReadonlyArray<Component> = Object.freeze(
    components.map((component) => {
      // SAFETY: the copy preserves every field of Component while severing the caller-owned object alias.
      const copied = { ...component } as Component;

      return Object.freeze(copied);
    }),
  );

  return Effect.succeed(
    Object.freeze({
      components: frozenComponents,
      coefficientCount: expectedOffset,
      priorScales: Object.freeze(Array.from(priorScales)),
    }),
  );
};

/** Construct an owned checked row-major additional-feature matrix. */
export const createAdditionalFeatureMatrix = (
  rowCount: number,
  columnCount: number,
  values: ArrayLike<number>,
): Effect.Effect<AdditionalFeatureMatrix, InvalidAdditionalFeatures> => {
  const expectedLength = checkedElementCount(rowCount, columnCount);

  if (expectedLength === undefined) {
    return fail([], "Additional feature matrix dimensions exceed safe arithmetic");
  }

  if (values.length !== expectedLength) {
    return fail(["values"], `Expected exactly ${expectedLength} matrix values`);
  }

  const owned = new Float64Array(values);

  for (const [index, value] of owned.entries()) {
    if (!Number.isFinite(value)) {
      return fail(["values", index], "Additional feature values must be finite");
    }
  }

  return Effect.succeed(Object.freeze({ rowCount, columnCount, values: owned }));
};

/** Construct an owned checked row-major seasonal-component mask. */
export const createSeasonalityMaskMatrix = (
  rowCount: number,
  componentCount: number,
  values: ArrayLike<number>,
): Effect.Effect<SeasonalityMaskMatrix, InvalidAdditionalFeatures> => {
  const expectedLength = checkedElementCount(rowCount, componentCount);

  if (expectedLength === undefined) {
    return fail([], "Seasonality mask dimensions exceed safe arithmetic");
  }

  if (values.length !== expectedLength) {
    return fail(["values"], `Expected exactly ${expectedLength} mask values`);
  }

  const owned = new Uint8Array(expectedLength);

  for (let index = 0; index < expectedLength; index += 1) {
    const value = values[index];

    if (value !== 0 && value !== 1) {
      return fail(["values", index], "Seasonality masks must contain exactly zero or one");
    }

    owned[index] = value;
  }

  return Effect.succeed(Object.freeze({ rowCount, componentCount, values: owned }));
};

/** Construct an all-one mask for unconditional seasonal components. */
export const createUnconditionalSeasonalityMask = (
  rowCount: number,
  componentCount: number,
): Effect.Effect<SeasonalityMaskMatrix, InvalidAdditionalFeatures> => {
  const count = checkedElementCount(rowCount, componentCount);

  if (count === undefined) {
    return fail([], "Seasonality mask dimensions exceed safe arithmetic");
  }

  const values = new Uint8Array(count);
  values.fill(1);

  return createSeasonalityMaskMatrix(rowCount, componentCount, values);
};

/** Concatenate checked additional-feature blocks while preserving row and component order. */
export const concatenateKnownAdditiveFeatures = (
  blocks: ReadonlyArray<KnownAdditiveFeatures>,
): Effect.Effect<KnownAdditiveFeatures, InvalidAdditionalFeatures> =>
  Effect.gen(function* () {
    const rowCount = blocks[0]?.matrix.rowCount ?? 0;
    let columnCount = 0;

    for (const [index, block] of blocks.entries()) {
      if (block.matrix.rowCount !== rowCount) {
        return yield* fail(
          [index, "matrix", "rowCount"],
          "Additional feature blocks must have identical row counts",
        );
      }

      if (columnCount > Number.MAX_SAFE_INTEGER - block.matrix.columnCount) {
        return yield* fail([], "Combined additional feature dimensions exceed safe arithmetic");
      }

      columnCount += block.matrix.columnCount;
    }

    const elementCount = checkedElementCount(rowCount, columnCount);

    if (elementCount === undefined) {
      return yield* fail([], "Combined additional feature dimensions exceed safe arithmetic");
    }

    const values = new Float64Array(elementCount);
    const components: Array<AdditionalFeatureComponent> = [];
    const priorScales: Array<number> = [];
    let columnOffset = 0;

    for (const block of blocks) {
      for (let row = 0; row < rowCount; row += 1) {
        const sourceOffset = row * block.matrix.columnCount;
        const targetOffset = row * columnCount + columnOffset;

        values.set(
          block.matrix.values.subarray(sourceOffset, sourceOffset + block.matrix.columnCount),
          targetOffset,
        );
      }

      for (const component of block.layout.components) {
        components.push({
          ...component,
          coefficientOffset: component.coefficientOffset + columnOffset,
        });
      }

      priorScales.push(...block.layout.priorScales);
      columnOffset += block.matrix.columnCount;
    }

    const layout = yield* createAdditionalFeatureLayout(components, priorScales);
    const matrix = yield* createAdditionalFeatureMatrix(rowCount, columnCount, values);

    return Object.freeze({ matrix, layout });
  });

/** Construct the canonical empty additional-feature values for a row count. */
export const createEmptyKnownAdditiveFeatures = (
  rowCount: number,
): Effect.Effect<KnownAdditiveFeatures, InvalidAdditionalFeatures> =>
  Effect.gen(function* () {
    const layout = yield* createAdditionalFeatureLayout([], []);
    const matrix = yield* createAdditionalFeatureMatrix(rowCount, 0, []);

    return Object.freeze({ matrix, layout });
  });
