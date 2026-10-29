import type { CaseDescription } from "./suite.ts";

/** Country coverage is provider parity, never a guarantee of officially complete future dates. */
export const countryCalendarGroup = {
  id: "calendars",
  title: "Country holiday calendars",
  intro:
    "Pinned country calendars, matching explicit-event controls, dynamic future years and portable saved models. Known-gap opt-in is partial provider output, not a completeness guarantee.",
} as const;

/** Reader-facing descriptions shared by each trend's country cases. */
export const countryDescriptionsFor = (
  growth: "linear" | "flat" | "logistic",
): Readonly<Record<string, CaseDescription>> => {
  const entries: Array<readonly [string, CaseDescription]> = [];

  const description = (title: string, summary: string): CaseDescription => ({
    group: "calendars",
    title,
    summary,
  });

  for (const mode of ["additive", "multiplicative"] as const) {
    entries.push([
      `country-us-${growth}-${mode}`,
      description(
        `US holidays, ${mode}`,
        "96 daily rows from 2024, country holidays plus custom January events, including simultaneous activations. Prediction spans late 2024 and early 2025; fitting includes lookup, and saved models embed the country snapshot.",
      ),
    ]);
    entries.push([
      `country-explicit-us-${growth}-${mode}`,
      description(
        `Explicit US control, ${mode}`,
        "The same rows, occurrences, priors, mode and fitted names as the corresponding country case, but all dates are explicit events and no country snapshot is embedded.",
      ),
    ]);
  }

  if (growth !== "logistic") {
    entries.push([
      `country-boundary-${growth}`,
      description(
        "Observed spillovers and unseen future names",
        "96 daily rows from 2010; sparse prediction years 2021 and 2060. December 31's observed New Year's Day is retained while unseen Juneteenth names are ignored.",
      ),
    ]);
  }

  if (growth === "linear") {
    entries.push(
      [
        "country-global-priors-linear",
        description(
          "Global prior scales",
          "The mixed-feature rows with seasonalityPriorScale 0.1 and holidaysPriorScale 0.05. The seasonality, custom events, regressor and US holidays set no prior of their own, so each takes the global one; the regressor follows holidaysPriorScale, as in Python.",
        ),
      ],
      [
        "country-global-priors-overrides-linear",
        description(
          "Global prior scales with explicit overrides",
          "The same global priors, but the seasonality, custom events and regressor each set a prior of 10, so only the US holidays take holidaysPriorScale.",
        ),
      ],
    );
  }

  if (growth === "flat") {
    entries.push(
      [
        "country-empty-bv-flat",
        description(
          "Deliberately empty country",
          "Bouvet Island's selected provider calendar has no columns; the saved model still retains country selection, coverage policy and the embedded snapshot.",
        ),
      ],
      [
        "country-explicit-empty-flat",
        description(
          "No-calendar empty control",
          "The same history and forecast rows as the empty-country case, with no events or embedded country data.",
        ),
      ],
      [
        "country-estimated-sg-flat",
        description(
          "Singapore estimated-name transition",
          "96 daily training rows from 2024 and every day of 2028. Estimated suffixes stay distinct, and future-only names never become fitted columns.",
        ),
      ],
      [
        "country-partial-in-flat",
        description(
          "India with explicit known-gap opt-in",
          "A 2036 history and 2037 forecasts use the pinned partial provider result with allow-known-gaps. The omitted table-backed holidays are not claimed complete.",
        ),
      ],
      [
        "country-mixed-us-flat",
        description(
          "Country, custom events and mixed features",
          "96 days with US country holidays, custom events, conditional weekly seasonality and a promotion regressor. Holiday effects are multiplicative.",
        ),
      ],
      [
        "country-uncertainty-us-flat",
        {
          group: "uncertainty",
          title: "Country calendar uncertainty replay",
          summary:
            "32 seeded scalar draws on the US/custom-event model, with interval reduction, portable JSON and fresh-process replay checks. Individual Python and Effect draws need not match.",
        },
      ],
    );

    for (const country of ["se", "cn"] as const) {
      for (const rows of [730, 2190]) {
        entries.push([
          `country-${country}-flat-${rows}`,
          description(
            `${country.toUpperCase()} calendar, ${rows} training rows`,
            `${rows} daily rows starting in 2020 and a 512-row prediction batch. Sweden stresses occurrence counts; China stresses distinct fitted names. Persistence retains the per-country horizon.`,
          ),
        ]);
      }
    }

    entries.push([
      "country-se-flat-2190-batch-32",
      description(
        "Sweden with a smaller prediction batch",
        "The identical 2,190-row history and frozen fitted columns as the 512-row case, with only 32 future rows; input bytes are frozen separately.",
      ),
    ]);

    for (const suffix of ["730", "2190", "2190-batch-32"] as const) {
      const rows = suffix === "730" ? "730" : "2,190";
      const batch = suffix === "2190-batch-32" ? 32 : 512;

      entries.push([
        `country-none-flat-${suffix}`,
        description(
          `No-calendar control, ${rows} training rows / ${batch} prediction rows`,
          "The same history and prediction rows as the country scaling cases with no events, isolating each implementation's total calendar cost.",
        ),
      ]);

      for (const country of suffix === "2190-batch-32"
        ? (["se"] as const)
        : (["se", "cn"] as const)) {
        entries.push([
          `country-explicit-${country}-flat-${suffix}`,
          description(
            `Explicit ${country.toUpperCase()} events, ${rows} training rows / ${batch} prediction rows`,
            "The country case's training-year dates and trained names' future dates as ordinary events, separating calendar machinery from the cost of the extra holiday columns.",
          ),
        ]);
      }
    }
  }

  return Object.fromEntries(entries);
};
