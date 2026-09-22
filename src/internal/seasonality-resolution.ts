import { Effect } from "effect";

import type { ComponentMode } from "../component-mode";
import type { Observations } from "../observation";
import type { BuiltInSeasonalities, BuiltInSeasonalitySetting } from "../options";
import * as Seasonality from "../seasonality";
import { millisecondsPerDay } from "./time";

/** Canonical names of the built-in seasonalities resolved from training history. */
export type BuiltInSeasonalityName = "daily" | "weekly" | "yearly";

/** Why a built-in seasonality was enabled or disabled. */
export type SeasonalityResolutionReason =
  | "explicitly-disabled"
  | "explicitly-enabled"
  | "automatic-enabled"
  | "insufficient-history"
  | "sampling-too-sparse";

/** A legal enabled built-in seasonality decision. */
export interface EnabledSeasonalityResolutionDecision {
  readonly name: BuiltInSeasonalityName;
  readonly enabled: true;
  readonly reason: "explicitly-enabled" | "automatic-enabled";
}

/** A legal disabled built-in seasonality decision. */
export interface DisabledSeasonalityResolutionDecision {
  readonly name: BuiltInSeasonalityName;
  readonly enabled: false;
  readonly reason: "explicitly-disabled" | "insufficient-history" | "sampling-too-sparse";
}

/** One internally inspectable, consistent built-in resolution decision. */
export type SeasonalityResolutionDecision =
  | EnabledSeasonalityResolutionDecision
  | DisabledSeasonalityResolutionDecision;

/** Complete concrete layout and built-in policy decisions selected at fitting time. */
export interface ResolvedSeasonalities {
  readonly layout: Seasonality.SeasonalityLayout;
  readonly decisions: ReadonlyArray<SeasonalityResolutionDecision>;
}

/** Parsed seasonality controls consumed by the training-dependent resolver. */
export interface SeasonalityResolutionInput {
  readonly seasonalityMode: ComponentMode;
  readonly seasonalities: ReadonlyArray<Seasonality.SeasonalityDefinition>;
  readonly builtInSeasonalities: BuiltInSeasonalities;
}

interface BuiltInSpecification {
  readonly name: BuiltInSeasonalityName;
  readonly periodDays: number;
  readonly defaultOrder: number;
  readonly minimumHistoryDays: number;
  readonly maximumGapDays?: number;
}

interface HistorySummary {
  readonly spanMilliseconds: number;
  readonly minPositiveGapMilliseconds?: number;
}

interface SelectedBuiltIn {
  readonly decision: SeasonalityResolutionDecision;
  readonly definition?: {
    readonly name: BuiltInSeasonalityName;
    readonly periodDays: number;
    readonly fourierOrder: number;
    readonly priorScale: number;
    readonly mode: ComponentMode;
  };
}

const builtInSpecifications: ReadonlyArray<BuiltInSpecification> = Object.freeze([
  {
    name: "yearly",
    periodDays: 365.25,
    defaultOrder: 10,
    minimumHistoryDays: 730,
  },
  {
    name: "weekly",
    periodDays: 7,
    defaultOrder: 3,
    minimumHistoryDays: 14,
    maximumGapDays: 7,
  },
  {
    name: "daily",
    periodDays: 1,
    defaultOrder: 4,
    minimumHistoryDays: 2,
    maximumGapDays: 1,
  },
]);

const summarizeHistory = (observations: Observations): HistorySummary => {
  const first = observations[0];
  let previousTimestamp = first.timestamp;
  let lastTimestamp = first.timestamp;
  let minPositiveGapMilliseconds: number | undefined;

  for (const [index, current] of observations.entries()) {
    if (index === 0) {
      continue;
    }

    const gap = current.timestamp - previousTimestamp;

    if (gap > 0 && (minPositiveGapMilliseconds === undefined || gap < minPositiveGapMilliseconds)) {
      minPositiveGapMilliseconds = gap;
    }

    previousTimestamp = current.timestamp;
    lastTimestamp = current.timestamp;
  }

  const spanMilliseconds = lastTimestamp - first.timestamp;

  return minPositiveGapMilliseconds === undefined
    ? { spanMilliseconds }
    : { spanMilliseconds, minPositiveGapMilliseconds };
};

const enabledSelection = (
  specification: BuiltInSpecification,
  reason: EnabledSeasonalityResolutionDecision["reason"],
  fourierOrder: number,
  priorScale: number,
  mode: ComponentMode,
): SelectedBuiltIn => ({
  decision: Object.freeze({ name: specification.name, enabled: true, reason }),
  definition: {
    name: specification.name,
    periodDays: specification.periodDays,
    fourierOrder,
    priorScale,
    mode,
  },
});

const resolveBuiltIn = (
  specification: BuiltInSpecification,
  setting: BuiltInSeasonalitySetting,
  history: HistorySummary,
  mode: ComponentMode,
): SelectedBuiltIn => {
  if (setting === "off") {
    return {
      decision: Object.freeze({
        name: specification.name,
        enabled: false,
        reason: "explicitly-disabled",
      }),
    };
  }

  if (setting !== "auto") {
    return enabledSelection(
      specification,
      "explicitly-enabled",
      setting.fourierOrder,
      setting.priorScale,
      mode,
    );
  }

  if (history.spanMilliseconds < specification.minimumHistoryDays * millisecondsPerDay) {
    return {
      decision: Object.freeze({
        name: specification.name,
        enabled: false,
        reason: "insufficient-history",
      }),
    };
  }

  if (specification.maximumGapDays !== undefined) {
    const minGap = history.minPositiveGapMilliseconds;

    if (minGap === undefined || minGap >= specification.maximumGapDays * millisecondsPerDay) {
      return {
        decision: Object.freeze({
          name: specification.name,
          enabled: false,
          reason: "sampling-too-sparse",
        }),
      };
    }
  }

  return enabledSelection(
    specification,
    "automatic-enabled",
    specification.defaultOrder,
    Seasonality.defaultSeasonalityPriorScale,
    mode,
  );
};

const settingFor = (
  controls: BuiltInSeasonalities,
  name: BuiltInSeasonalityName,
): BuiltInSeasonalitySetting => {
  switch (name) {
    case "daily":
      return controls.daily;
    case "weekly":
      return controls.weekly;
    case "yearly":
      return controls.yearly;
  }
};

/**
 * Resolve custom and built-in seasonalities using training timestamps only.
 *
 * Custom definitions retain caller order. Enabled built-ins are appended in the fixed order
 * yearly, weekly, daily. Prediction timestamps and persisted models never enter this operation.
 *
 * @param observations - Parsed, strictly increasing training observations.
 * @param input - Parsed custom definitions and fully defaulted built-in controls.
 * @returns The concrete coefficient layout and consistent built-in decisions.
 */
export const resolveSeasonalities = (
  observations: Observations,
  input: SeasonalityResolutionInput,
): Effect.Effect<ResolvedSeasonalities, Seasonality.InvalidSeasonality> =>
  Effect.gen(function* () {
    const history = summarizeHistory(observations);
    const definitions: Array<Seasonality.SeasonalityDefinition> = [...input.seasonalities];
    const decisions: Array<SeasonalityResolutionDecision> = [];

    for (const specification of builtInSpecifications) {
      const selected = resolveBuiltIn(
        specification,
        settingFor(input.builtInSeasonalities, specification.name),
        history,
        input.seasonalityMode,
      );

      decisions.push(selected.decision);

      if (selected.definition !== undefined) {
        definitions.push(yield* Seasonality.makeBuiltInSeasonalityDefinition(selected.definition));
      }
    }

    const layout = yield* Seasonality.makeSeasonalityLayout(definitions);

    return Object.freeze({
      layout,
      decisions: Object.freeze(decisions),
    });
  });
