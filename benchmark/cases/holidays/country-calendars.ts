import { Effect } from "effect";
import { inspectCountryHolidays } from "effect-prophet";

import type { BenchmarkCase } from "../../tools/case.ts";
import { scalarUncertaintyControls, uncertaintyLifecyclePhases } from "../uncertainty/controls.ts";
import { linearOptimizers } from "../growth/linear/controls.ts";
import { prophetDefaultChangepoints, pythonDefaultOptimizer } from "../prophet-defaults.ts";

type Configuration = Extract<BenchmarkCase["workload"], { kind: "map" }>["configuration"];

type Years = readonly [number, ...Array<number>];

/**
 * Explicit events reproducing a country calendar's fitted layout: training-year dates plus
 * future-year dates of trained names only, deduplicated where training and future years overlap.
 */
const explicitCountryEvents = Effect.fnUntraced(function* (
  country: string,
  trainingYears: Years,
  futureYears: Years,
) {
  const training = yield* inspectCountryHolidays({ country }, trainingYears);
  const future = yield* inspectCountryHolidays({ country }, futureYears);
  const fittedNames = new Set(training.occurrences.map((occurrence) => occurrence.name));
  const seen = new Set<string>();

  const events = [
    ...training.occurrences,
    ...future.occurrences.filter((occurrence) => fittedNames.has(occurrence.name)),
  ].flatMap((occurrence) => {
    const key = `${occurrence.name}\u0000${occurrence.date}`;

    if (seen.has(key)) return [];

    seen.add(key);

    return [
      {
        name: occurrence.name,
        date: occurrence.date,
        lowerWindowDays: 0,
        upperWindowDays: 0,
        priorScale: 10,
      },
    ];
  });

  return { events, snapshot: { snapshotId: training.snapshotId, ...training.provider } };
});

/** Declare country workloads and equivalent explicit-event controls using pinned public inspection. */
export const countryHolidayCases = Effect.fn("benchmark.catalog.country-holidays")(function* (
  template: BenchmarkCase,
): Effect.fn.Return<ReadonlyArray<BenchmarkCase>, import("effect-prophet").CountryHolidayError> {
  const { events: explicitEvents, snapshot } = yield* explicitCountryEvents("US", [2024], [2025]);

  const customEvents = ["2024-01-01", "2024-01-05", "2025-01-01", "2025-01-05"].map((date) => ({
    name: "launch",
    date,
    lowerWindowDays: 0,
    upperWindowDays: 0,
    priorScale: 10,
  }));

  const us = { country: "US", coverage: "reject-known-gaps", priorScale: 10 } as const;
  const { optimizerQuality, ...common } = template;

  const make = (
    id: string,
    dataset: string,
    growth: Configuration["growth"],
    fields: Pick<Configuration, "countryHolidays" | "events" | "seasonalities" | "regressors">,
    mode: Configuration["holidaysMode"] = "additive",
  ): BenchmarkCase => {
    const quality: Pick<BenchmarkCase, "optimizerQuality"> = {};

    if (growth !== "flat" && optimizerQuality !== undefined)
      Object.assign(quality, { optimizerQuality });

    return {
      ...common,
      ...quality,
      id: `country-${id}`,
      dataset,
      calendarSnapshot: snapshot,
      workload: {
        kind: "map",
        comparison: { kind: "equivalent-objective", evidenceId: "country-calendar-public-v1" },
        configuration: {
          growth,
          scaling: "absmax",
          seasonalityMode: "additive",
          holidaysMode: mode,
          changepoints:
            growth === "flat" ? prophetDefaultChangepoints : { mode: "auto", count: 2, range: 0.8 },
          changepointPriorScale: 0.05,
          ...fields,
        },
        ...(growth === "flat" ? { pythonOptimizer: pythonDefaultOptimizer } : linearOptimizers),
      },
    };
  };

  const fields = { countryHolidays: us, events: customEvents, seasonalities: [], regressors: [] };
  const cases: Array<BenchmarkCase> = [];

  for (const growth of ["linear", "flat", "logistic"] as const) {
    const dataset =
      growth === "logistic" ? "v5/country-logistic-96.json" : "v5/country-basic-96.json";

    for (const mode of ["additive", "multiplicative"] as const) {
      cases.push(make(`us-${growth}-${mode}`, dataset, growth, fields, mode));
      cases.push(
        make(
          `explicit-us-${growth}-${mode}`,
          dataset,
          growth,
          { events: [...customEvents, ...explicitEvents], seasonalities: [], regressors: [] },
          mode,
        ),
      );
    }
  }

  for (const growth of ["linear", "flat"] as const) {
    cases.push(
      make(`boundary-${growth}`, "v5/country-boundary-96.json", growth, { ...fields, events: [] }),
    );
  }

  cases.push(
    make("empty-bv-flat", "v5/country-basic-96.json", "flat", {
      ...fields,
      events: [],
      countryHolidays: { ...us, country: "BV" },
    }),
  );
  cases.push(
    make("explicit-empty-flat", "v5/country-basic-96.json", "flat", {
      events: [],
      seasonalities: [],
      regressors: [],
    }),
  );
  cases.push(
    make("estimated-sg-flat", "v5/country-estimated-96.json", "flat", {
      ...fields,
      events: [],
      countryHolidays: { ...us, country: "SG" },
    }),
  );
  cases.push(
    make("partial-in-flat", "v5/country-partial-96.json", "flat", {
      ...fields,
      events: [],
      countryHolidays: { ...us, country: "IN", coverage: "allow-known-gaps" },
    }),
  );
  cases.push(
    make(
      "mixed-us-flat",
      "v5/country-mixed-96.json",
      "flat",
      {
        ...fields,
        seasonalities: [
          {
            name: "weekly-active",
            periodDays: 7,
            fourierOrder: 1,
            priorScale: 10,
            conditionName: "active",
          },
        ],
        regressors: [{ name: "promotion", priorScale: 10, standardization: "never" }],
      },
      "multiplicative",
    ),
  );

  const scalingPhases = [
    "warm-fit",
    "warm-predict",
    "model-json-encode",
    "model-json-decode",
    "fresh-process-restored-predict",
  ] as const;

  // Fixed by the immutable v5/v6 dataset bytes: represented training and prediction-row years.
  const scalingDatasets = [
    {
      suffix: "730",
      dataset: "v5/country-scaling-730.json",
      countries: ["SE", "CN"],
      training: [2020, 2021],
      future: [2021, 2022, 2023],
    },
    {
      suffix: "2190",
      dataset: "v5/country-scaling-2190.json",
      countries: ["SE", "CN"],
      training: [2020, 2021, 2022, 2023, 2024, 2025],
      future: [2025, 2026, 2027],
    },
    {
      suffix: "2190-batch-32",
      dataset: "v6/country-scaling-2190-batch-32.json",
      countries: ["SE"],
      training: [2020, 2021, 2022, 2023, 2024, 2025],
      future: [2025, 2026],
    },
  ] as const;

  const none = { events: [], seasonalities: [], regressors: [] };

  // Every country case shares its dataset with a no-calendar control and an explicit-event
  // control, so each side's calendar slowdown can be read from one run.
  for (const { suffix, dataset, countries, training, future } of scalingDatasets) {
    const scaled = (item: BenchmarkCase): BenchmarkCase => ({ ...item, phases: scalingPhases });

    cases.push(scaled(make(`none-flat-${suffix}`, dataset, "flat", none)));

    for (const country of countries) {
      const code = country.toLowerCase();
      const explicit = yield* explicitCountryEvents(country, training, future);

      cases.push(
        scaled(
          make(`${code}-flat-${suffix}`, dataset, "flat", {
            ...fields,
            events: [],
            countryHolidays: { ...us, country },
          }),
        ),
      );
      cases.push(
        scaled(
          make(`explicit-${code}-flat-${suffix}`, dataset, "flat", {
            ...none,
            events: explicit.events,
          }),
        ),
      );
    }
  }

  const uncertainty = make("uncertainty-us-flat", "v5/country-basic-96.json", "flat", fields);

  if (uncertainty.workload.kind !== "map")
    throw new Error("Expected authored country MAP workload");

  cases.push({
    ...uncertainty,
    phases: uncertaintyLifecyclePhases,
    workload: {
      ...uncertainty.workload,
      uncertainty: scalarUncertaintyControls("intervals", 32, 2024),
    },
  });

  return cases;
});
