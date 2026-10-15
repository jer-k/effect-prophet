import { Effect } from "effect";

import { loadStoredReport } from "./stored-results.ts";

type StoredReport = Effect.Success<ReturnType<typeof loadStoredReport>>["report"];

const implementations = ["effect-prophet", "python-prophet"] as const;

const phases = [
  "warm-fit",
  "warm-predict",
  "model-json-encode",
  "model-json-decode",
  "fresh-process-restored-predict",
] as const;

/**
 * Controls sharing a country case's dataset: explicit events with the same fitted layout, and no
 * events at all. `country-us-linear-additive` pairs with `country-explicit-us-linear-additive`;
 * `country-se-flat-730` also pairs with `country-none-flat-730`.
 */
export const countryControls = (caseId: string) => {
  const match = /^country-([a-z]{2})-(.+)$/u.exec(caseId);

  if (match === null || match[1] === undefined || match[2] === undefined) return undefined;

  return {
    explicit: `country-explicit-${match[1]}-${match[2]}`,
    none: `country-none-${match[2]}`,
  };
};

const milliseconds = (nanoseconds: number | undefined) =>
  nanoseconds === undefined ? "n/a" : (nanoseconds / 1e6).toFixed(3);

const ratio = (country: number | undefined, control: number | undefined) =>
  country === undefined || control === undefined || control === 0
    ? "n/a"
    : `${(country / control).toFixed(2)}×`;

/** Render each passing country case beside its passing same-dataset controls, per implementation. */
export const renderCalendarOverhead = (report: StoredReport): string => {
  const passed = new Set(
    report.correctness.filter((item) => item.status === "passed").map((item) => item.caseId),
  );

  const median = (caseId: string, phase: string, implementation: string) =>
    passed.has(caseId)
      ? report.timings.find(
          (item) =>
            item.caseId === caseId &&
            item.phase === phase &&
            item.implementation === implementation,
        )?.medianNanoseconds
      : undefined;

  const rows: Array<string> = [];

  for (const caseId of [...passed].sort()) {
    const controls = countryControls(caseId);

    if (controls === undefined || (!passed.has(controls.explicit) && !passed.has(controls.none)))
      continue;

    for (const phase of phases) {
      const cells = implementations.flatMap((implementation) => {
        const country = median(caseId, phase, implementation);
        const explicit = median(controls.explicit, phase, implementation);
        const none = median(controls.none, phase, implementation);

        return [milliseconds(country), ratio(country, explicit), ratio(country, none)];
      });

      if (cells.every((cell) => cell === "n/a")) continue;

      rows.push(`| ${caseId} | ${phase} | ${cells.join(" | ")} |`);
    }
  }

  return [
    `# Country calendar overhead: ${report.run.runId}`,
    "",
    "Median milliseconds for each passing country case, with its slowdown relative to passing",
    "same-dataset controls: explicit events reproducing the fitted layout (calendar machinery only)",
    "and no events (total calendar cost). Ratios compare cases within one implementation and run.",
    "",
    "| Case | Phase | Effect ms | Effect ÷ explicit | Effect ÷ none | Python ms | Python ÷ explicit | Python ÷ none |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...rows,
    "",
  ].join("\n");
};

/** Load a recorded run and render its calendar overhead table. */
export const calendarOverhead = Effect.fn("benchmark.results.calendar-overhead")(function* (
  directory: string,
) {
  const { report } = yield* loadStoredReport(directory);

  return renderCalendarOverhead(report);
});
