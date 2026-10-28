import { Effect, Equal, Schema } from "effect";

import type { ComponentMode } from "./component-mode";
import type { CountryHolidayError } from "./country-holidays";
import {
  InputValidationError,
  inputValidationErrorFromIssue,
  nestedInputValidationError,
  type ValidationIssue,
} from "./errors";
import { copyFrozen } from "./internal/owned-input";
import { checkedMultiply } from "./internal/safe-arithmetic";
import { maximumSearchCandidates } from "./internal/search-limits";
import type { SearchCandidateInput } from "./model-search";
import {
  decodeOptions,
  type EncodedBuiltInSeasonalities,
  type EncodedChangepointSetting,
  type EncodedProphetOptions,
} from "./options";
import type { EncodedSeasonality } from "./seasonality";
import type { TargetScalingMode } from "./target-scaling";

/**
 * The options a grid can vary, each with the whole values to try. Structured values such as a
 * seasonality list or a changepoint setting are single choices, never expanded further.
 */
export interface ParameterGridAxes {
  /** Replaces `map.changepointPriorScale`. */
  readonly changepointPriorScale?: ReadonlyArray<number>;

  /** Replaces `map.changepoints`. */
  readonly changepoints?: ReadonlyArray<EncodedChangepointSetting>;

  readonly seasonalityMode?: ReadonlyArray<ComponentMode>;
  readonly holidaysMode?: ReadonlyArray<ComponentMode>;
  readonly builtInSeasonalities?: ReadonlyArray<EncodedBuiltInSeasonalities>;
  readonly seasonalities?: ReadonlyArray<ReadonlyArray<EncodedSeasonality>>;
  readonly scaling?: ReadonlyArray<TargetScalingMode>;
}

/** Options every candidate shares, and the axes whose every combination becomes a candidate. */
export interface ParameterGridInput {
  readonly base?: EncodedProphetOptions;
  readonly axes: ParameterGridAxes;
}

type Axis = keyof ParameterGridAxes;

type Choice = {
  readonly [Key in Axis]-?: {
    readonly axis: Key;
    readonly value: NonNullable<ParameterGridAxes[Key]>[number];
  };
}[Axis];

// Candidates vary the first axis slowest, in this order, whatever order the caller wrote them in.
const axisOrder = [
  "changepointPriorScale",
  "changepoints",
  "seasonalityMode",
  "holidaysMode",
  "builtInSeasonalities",
  "seasonalities",
  "scaling",
] as const satisfies ReadonlyArray<Axis>;

// Where each axis's value sits inside a candidate's options.
const axisPaths: Readonly<Record<Axis, ReadonlyArray<string>>> = {
  changepointPriorScale: ["map", "changepointPriorScale"],
  changepoints: ["map", "changepoints"],
  seasonalityMode: ["seasonalityMode"],
  holidaysMode: ["holidaysMode"],
  builtInSeasonalities: ["builtInSeasonalities"],
  seasonalities: ["seasonalities"],
  scaling: ["scaling"],
};

const AxisValuesSchema = Schema.Array(Schema.Unknown).check(Schema.isMinLength(1));

const GridSchema = Schema.Struct({
  base: Schema.optionalKey(Schema.Unknown),
  axes: Schema.Struct({
    changepointPriorScale: Schema.optionalKey(AxisValuesSchema),
    changepoints: Schema.optionalKey(AxisValuesSchema),
    seasonalityMode: Schema.optionalKey(AxisValuesSchema),
    holidaysMode: Schema.optionalKey(AxisValuesSchema),
    builtInSeasonalities: Schema.optionalKey(AxisValuesSchema),
    seasonalities: Schema.optionalKey(AxisValuesSchema),
    scaling: Schema.optionalKey(AxisValuesSchema),
  }),
});

const decodeGrid = Schema.decodeUnknownEffect(GridSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const invalidGrid = (path: ReadonlyArray<PropertyKey>, message: string): InputValidationError =>
  new InputValidationError({ input: "parameter-grid", issues: [{ path, message }], message });

// Spreading keeps the base's growth, and the length check picks the seasonal or trend-only variant.
const withSeasonalities = (
  options: EncodedProphetOptions,
  seasonalities: ReadonlyArray<EncodedSeasonality>,
): EncodedProphetOptions => {
  if (options.growth === "logistic") {
    return { ...options, seasonalities };
  }

  const [first, ...rest] = seasonalities;

  if (first === undefined) {
    return { ...options, seasonalities: [] };
  }

  return { ...options, seasonalities: [first, ...rest] };
};

const withChoice = (options: EncodedProphetOptions, choice: Choice): EncodedProphetOptions => {
  switch (choice.axis) {
    case "changepointPriorScale":
      return { ...options, map: { ...options.map, changepointPriorScale: choice.value } };
    case "changepoints":
      return { ...options, map: { ...options.map, changepoints: choice.value } };
    case "seasonalityMode":
      return { ...options, seasonalityMode: choice.value };
    case "holidaysMode":
      return { ...options, holidaysMode: choice.value };
    case "builtInSeasonalities":
      return { ...options, builtInSeasonalities: choice.value };
    case "seasonalities":
      return withSeasonalities(options, choice.value);
    case "scaling":
      return { ...options, scaling: choice.value };
  }
};

// One case per axis so each value keeps its own axis type, which a shared branch would lose.
const choicesOf = (axes: ParameterGridAxes, axis: Axis): ReadonlyArray<Choice> => {
  switch (axis) {
    case "changepointPriorScale":
      return (axes[axis] ?? []).map((value) => ({ axis, value }));
    case "changepoints":
      return (axes[axis] ?? []).map((value) => ({ axis, value }));
    case "seasonalityMode":
      return (axes[axis] ?? []).map((value) => ({ axis, value }));
    case "holidaysMode":
      return (axes[axis] ?? []).map((value) => ({ axis, value }));
    case "builtInSeasonalities":
      return (axes[axis] ?? []).map((value) => ({ axis, value }));
    case "seasonalities":
      return (axes[axis] ?? []).map((value) => ({ axis, value }));
    case "scaling":
      return (axes[axis] ?? []).map((value) => ({ axis, value }));
  }
};

const startsWith = (path: ReadonlyArray<PropertyKey>, prefix: ReadonlyArray<PropertyKey>) =>
  prefix.every((key, index) => path[index] === key);

/**
 * Expand a base configuration and explicit axes into every combination, as complete candidates
 * for `searchModels`.
 *
 * Axes vary in a fixed order, the first slowest: `changepointPriorScale`, `changepoints`,
 * `seasonalityMode`, `holidaysMode`, `builtInSeasonalities`, `seasonalities`, `scaling`. Each axis
 * value replaces the base's value outright. A candidate's ID is `grid` followed by the index of its
 * value on each given axis, in that order, such as `grid-2-0`; with no axes the one candidate is
 * the base, with ID `grid`.
 *
 * Every candidate is checked with the same rules as `fit` before any is returned. Nothing is
 * fitted or evaluated.
 *
 * @param input - The shared base options and the axes to combine.
 * @returns At most 32 frozen candidates, or a typed failure naming the axis or candidate at fault.
 */
export const makeParameterGrid = Effect.fn("Prophet.makeParameterGrid")(function* (
  input: ParameterGridInput,
): Effect.fn.Return<
  ReadonlyArray<SearchCandidateInput>,
  InputValidationError | CountryHolidayError
> {
  yield* decodeGrid(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("parameter-grid", error.issue)),
  );

  const axes = axisOrder.filter((axis) => input.axes[axis] !== undefined);

  // Count the product before reading any value, so an oversized grid allocates nothing.
  let count: number | undefined = 1;

  for (const axis of axes) {
    count = count === undefined ? undefined : checkedMultiply(count, input.axes[axis]?.length ?? 0);
  }

  if (count === undefined || count > maximumSearchCandidates) {
    return yield* Effect.fail(
      invalidGrid(["axes"], `Parameter grid exceeds ${maximumSearchCandidates} candidates`),
    );
  }

  // Candidates are built by spreading, never mutating, and each is copied once it is valid.
  const base: EncodedProphetOptions = input.base ?? {};
  const grid = axes.map((axis) => ({ axis, choices: choicesOf(input.axes, axis) }));

  for (const { axis, choices } of grid) {
    for (const [index, choice] of choices.entries()) {
      const repeated = choices
        .slice(0, index)
        .some((earlier) => Equal.equals(earlier.value, choice.value));

      if (repeated) {
        return yield* Effect.fail(
          invalidGrid(["axes", axis, index], "Parameter grid choice is repeated"),
        );
      }
    }
  }

  yield* decodeOptions(base).pipe(
    Effect.mapError((error) =>
      error instanceof InputValidationError
        ? nestedInputValidationError("parameter-grid", error, ["base"], "Invalid base options")
        : error,
    ),
  );

  // Expand axis by axis, so the first axis varies slowest and the last fastest.
  let combinations: ReadonlyArray<{
    readonly indices: ReadonlyArray<number>;
    readonly picked: ReadonlyArray<Choice>;
  }> = [{ indices: [], picked: [] }];

  for (const { choices } of grid) {
    combinations = combinations.flatMap(({ indices, picked }) =>
      choices.map((choice, index) => ({
        indices: [...indices, index],
        picked: [...picked, choice],
      })),
    );
  }

  const candidates: Array<SearchCandidateInput> = [];

  for (const [ordinal, { indices, picked }] of combinations.entries()) {
    const options = picked.reduce(withChoice, base);
    const id = ["grid", ...indices].join("-");

    // Point an issue at the axis value it falls under, or at the candidate when it involves more.
    const locate = (issue: ValidationIssue): ValidationIssue => {
      const path = issue.path ?? [];
      const position = axes.findIndex((axis) => startsWith(path, axisPaths[axis]));
      const axis = axes[position];

      if (axis === undefined) {
        return { message: issue.message, path: ["candidates", ordinal, "options", ...path] };
      }

      return {
        message: issue.message,
        path: ["axes", axis, indices[position] ?? 0, ...path.slice(axisPaths[axis].length)],
      };
    };

    yield* decodeOptions(options).pipe(
      Effect.mapError((error) =>
        error instanceof InputValidationError
          ? new InputValidationError({
              input: "parameter-grid",
              issues: error.issues.map(locate),
              message: `Parameter grid candidate ${id} has invalid options`,
            })
          : error,
      ),
    );

    candidates.push(Object.freeze({ id, options: copyFrozen(options) }));
  }

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.axis.count": axes.length,
    "effect_prophet.candidate.count": candidates.length,
  });

  return Object.freeze(candidates);
});
