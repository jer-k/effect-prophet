import type { Benchmark, CaseResult, PhaseTiming } from "./run.ts";
import {
  benchmarkFeatures,
  featurePath,
  intentionalDifferences,
  suitePath,
  type BenchmarkFeature,
  type BenchmarkSuite,
} from "./suite.ts";

const casePath = (suite: BenchmarkSuite, id: string) => `${suitePath(suite)}/${id}`;

const milliseconds = (ms: number) =>
  ms < 1
    ? `${(ms * 1000).toFixed(0)} µs`
    : ms < 1000
      ? `${ms.toPrecision(3)} ms`
      : `${(ms / 1000).toPrecision(3)} s`;

const ratio = ({ effectMs, pythonMs }: PhaseTiming) =>
  effectMs <= pythonMs
    ? `${(pythonMs / effectMs).toPrecision(2)}× faster`
    : `${(effectMs / pythonMs).toPrecision(2)}× slower`;

const difference = (value: number) =>
  value === 0 ? "0" : value < 1e-4 ? value.toExponential(1) : value.toPrecision(2);

const share = (value: number) => {
  const percent = value * 100;

  return percent === 0 ? "0%" : percent < 0.0001 ? "< 0.0001%" : `${percent.toPrecision(2)}%`;
};

const number = (value: number) => (Number.isFinite(value) ? value.toFixed(4) : String(value));

const result = (item: CaseResult) =>
  item.passed
    ? `<Badge type="tip" text="match" />${item.flags.length === 0 ? "" : ' <Badge type="warning" text="flagged" />'}`
    : item.group === intentionalDifferences
      ? '<Badge type="info" text="intentional difference" />'
      : '<Badge type="danger" text="mismatch" />';

const statuses = {
  match: "Matches Python Prophet",
  flagged: "Matches Python Prophet; internal fit differences flagged",
  difference: "Intentional difference from Python Prophet",
  mismatch: "Doesn't match Python Prophet",
} as const;

type Status = keyof typeof statuses;

const status = (item: CaseResult): Status =>
  item.passed
    ? item.flags.length === 0
      ? "match"
      : "flagged"
    : item.group === intentionalDifferences
      ? "difference"
      : "mismatch";

/** A colored dot whose meaning shows on hover and is read out by screen readers. */
const dot = (kind: Status) =>
  `<span class="status-dot status-${kind}" role="img" aria-label="${statuses[kind]}" data-label="${statuses[kind]}"></span>`;

const caseRow = (suite: BenchmarkSuite, item: CaseResult) =>
  [
    `<span class="case-name">${dot(status(item))}[${item.title}](${casePath(suite, item.id)})</span>`,
    `[${item.dataset.trainingRows} rows](${item.dataset.url})`,
    item.lastValue === undefined ? (item.outcomes?.effect ?? "—") : number(item.lastValue.effect),
    item.lastValue === undefined ? (item.outcomes?.python ?? "—") : number(item.lastValue.python),
    item.relativeDifference !== undefined
      ? share(item.relativeDifference)
      : item.maximumDifference !== undefined
        ? difference(item.maximumDifference)
        : "—",
    item.headline?.label ?? "—",
    item.headline === undefined ? "—" : milliseconds(item.headline.effectMs),
    item.headline === undefined ? "—" : milliseconds(item.headline.pythonMs),
  ].join(" | ");

const caseTable = (suite: BenchmarkSuite, cases: ReadonlyArray<CaseResult>) =>
  [
    "| Case | Input | Effect output | Python output | Largest difference | Timed step | Effect time | Python time |",
    "| --- | --- | ---: | ---: | ---: | --- | ---: | ---: |",
    ...cases.map((item) => `| ${caseRow(suite, item)} |`),
  ].join("\n");

const tally = (cases: ReadonlyArray<CaseResult>) => {
  const kinds = cases.map(status);
  const count = (kind: Status) => kinds.filter((candidate) => candidate === kind).length;

  return {
    total: cases.length,
    passed: count("match") + count("flagged"),
    flagged: count("flagged"),
    differences: count("difference"),
    mismatches: count("mismatch"),
  };
};

const headline = (cases: ReadonlyArray<CaseResult>) => {
  const { passed, total, differences, mismatches } = tally(cases);

  return [
    `**${passed} of ${total} cases match Python Prophet.**`,
    differences === 0 ? "" : ` ${differences} are intentional differences, explained below.`,
    mismatches === 0 ? "" : ` ${mismatches} don't match yet.`,
  ].join("");
};

/** How cases are compared and how to read the tables below. */
const legend = (cases: ReadonlyArray<CaseResult>) => [
  "Each case runs the same input through Effect Prophet and Python Prophet 1.4.0, then compares every forecast row, the trend, each component and the fitted noise. A case **matches** when all of them agree within its tolerances, and only matching cases are timed.",
  "",
  `Each case's dot shows its result: ${dot("match")} matches, ${dot("flagged")} matches with internal differences flagged, ${dot("difference")} intentional difference, ${dot("mismatch")} doesn't match. Hover over a dot for details.`,
  "",
  "How to read the tables:",
  "",
  "- **Effect output** and **Python output** are each library's final forecast value. Open a case to see every row side by side.",
  "- **Largest difference** is the biggest gap between the two forecasts, as a share of the input data's range.",
  "- **Effect time** and **Python time** are the median time for the **timed step**, usually fitting and predicting. Open a case for every step, including first-run and save/load times.",
  ...(tally(cases).flagged === 0
    ? []
    : [
        "- **Flagged** cases match, but the two libraries stopped their fitting search at slightly different points. The case page shows the internal numbers.",
      ]),
];

const runDetails = ({ run }: Benchmark) => [
  `- Run \`${run.id}\` on ${run.date}, commit \`${run.revision}\`${run.dirty ? " with uncommitted changes" : ""}`,
  `- Both libraries ran in \`${run.platform}\` containers on ${run.processor}`,
  ...run.versions.map((version) => `- ${version.name} ${version.value}`),
  `- [Full benchmark report](${run.reportUrl})`,
];

const timingCaveat =
  "Timings come from one machine and describe this workload only. They are not a general speed ranking.";

const allCases = (benchmark: Benchmark) => benchmark.groups.flatMap((group) => group.cases);

/** One trend's page: one table per group with links to every case. */
export const overviewMarkdown = (benchmark: Benchmark) => {
  const { suite } = benchmark;
  const cases = allCases(benchmark);

  const sections = benchmark.groups
    .filter((group) => group.cases.length > 0)
    .map((group) =>
      [`## ${group.title}`, "", group.intro, "", caseTable(suite, group.cases)].join("\n"),
    );

  return [
    `# ${suite.title} benchmarks`,
    "",
    headline(cases),
    "",
    ...legend(cases),
    "",
    "::: details About this run",
    "",
    ...runDetails(benchmark),
    "",
    timingCaveat,
    "",
    ":::",
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");
};

/** One feature's page: its group from every trend, each linking back to that trend's cases. */
export const featureMarkdown = (
  feature: BenchmarkFeature,
  benchmarks: ReadonlyArray<Benchmark>,
) => {
  const sections = benchmarks.flatMap((benchmark) => {
    const group = benchmark.groups.find((candidate) => candidate.id === feature.group);

    return group === undefined || group.cases.length === 0 ? [] : [{ benchmark, group }];
  });

  const cases = sections.flatMap(({ group }) => group.cases);

  return [
    `# ${feature.title} benchmarks`,
    "",
    headline(cases),
    "",
    feature.intro,
    "",
    ...legend(cases),
    "",
    "::: details About these runs",
    "",
    "Each trend's cases come from that trend's own run.",
    "",
    ...sections.flatMap(({ benchmark }) => [
      `**${benchmark.suite.title}**`,
      "",
      ...runDetails(benchmark),
      "",
    ]),
    timingCaveat,
    "",
    ":::",
    "",
    ...sections.flatMap(({ benchmark: { suite }, group }) => [
      `## ${suite.title}`,
      "",
      `${group.intro} [All ${suite.title.toLowerCase()} benchmarks →](${suitePath(suite)})`,
      "",
      caseTable(suite, group.cases),
      "",
    ]),
  ].join("\n");
};

const tallyColumns = (cases: ReadonlyArray<CaseResult>) => {
  const { total, passed, differences, mismatches } = tally(cases);

  return [total, passed, differences, mismatches].join(" | ");
};

/** The benchmarks landing page: every trend and feature page with its results at a glance. */
export const indexMarkdown = (benchmarks: ReadonlyArray<Benchmark>) =>
  [
    "# Benchmarks",
    "",
    "Every benchmark case runs the same input through Effect Prophet and Python Prophet 1.4.0, then compares every forecast row, the trend, each component and the fitted noise. Only matching cases are timed. [How close are the results?](/python/accuracy) explains how we test.",
    "",
    "Each trend has its own page with every case run for it. The feature pages gather the cases for one feature from all three trends, linking to the same case pages.",
    "",
    "## By trend",
    "",
    "| Trend | Cases | Match | Intentional differences | Don't match yet | Run |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
    ...benchmarks.map(
      (benchmark) =>
        `| [${benchmark.suite.title}](${suitePath(benchmark.suite)}) | ${tallyColumns(allCases(benchmark))} | ${benchmark.run.date}, commit \`${benchmark.run.revision}\` |`,
    ),
    "",
    "## By feature",
    "",
    "| Feature | Cases | Match | Intentional differences | Don't match yet |",
    "| --- | ---: | ---: | ---: | ---: |",
    ...benchmarkFeatures.map((feature) => {
      const cases = benchmarks.flatMap(
        (benchmark) => benchmark.groups.find((group) => group.id === feature.group)?.cases ?? [],
      );

      return `| [${feature.title}](${featurePath(feature)}) | ${tallyColumns(cases)} |`;
    }),
    "",
    timingCaveat,
    "",
  ].join("\n");

const valuesTable = (item: CaseResult) => {
  if (item.values.length === 0) {
    return "Neither library produced a usable forecast for this input.";
  }

  const actual = item.kind === "cross-validation";

  return [
    actual
      ? "Each row is one forecast made during cross-validation, next to the value that actually happened."
      : "Every forecast row from both libraries.",
    "",
    `| Date | ${actual ? "Actual | " : ""}Effect Prophet | Python Prophet | Difference |`,
    `| --- | ${actual ? "---: | " : ""}---: | ---: | ---: |`,
    ...item.values.map(
      (value) =>
        `| ${value.timestamp} | ${actual ? `${number(value.actual ?? Number.NaN)} | ` : ""}${number(value.effect)} | ${number(value.python)} | ${difference(Math.abs(value.effect - value.python))} |`,
    ),
  ].join("\n");
};

const timingTable = (item: CaseResult) =>
  item.timings.length === 0
    ? "This case isn't timed, because only matching cases are."
    : [
        "Median of all measured repetitions.",
        "",
        "| Step | Effect Prophet | Python Prophet | Effect Prophet is |",
        "| --- | ---: | ---: | --- |",
        ...item.timings.map(
          (timing) =>
            `| ${timing.label} | ${milliseconds(timing.effectMs)} | ${milliseconds(timing.pythonMs)} | ${ratio(timing)} |`,
        ),
      ].join("\n");

/** One case's page: inputs, outputs from both libraries side by side, and timings. */
export const caseMarkdown = (suite: BenchmarkSuite, item: CaseResult) =>
  [
    `# ${item.title}`,
    "",
    `${result(item)} [← All ${suite.title.toLowerCase()} benchmarks](${suitePath(suite)})`,
    "",
    item.summary,
    "",
    "## Input",
    "",
    `[\`benchmark/inputs/${item.dataset.name}\`](${item.dataset.url}): ${item.dataset.trainingRows} history rows and ${item.dataset.futureRows} forecast rows.`,
    "",
    ...(item.failures.length === 0
      ? []
      : [
          "## What happened",
          "",
          ...item.failures.flatMap((failure) => [
            `**${failure.implementation === "effect-prophet" ? "Effect Prophet" : "Python Prophet"}**`,
            "",
            "```txt",
            failure.message,
            "```",
            "",
          ]),
        ]),
    "## Output",
    "",
    ...(item.maximumDifference === undefined
      ? []
      : [
          `Largest difference: **${difference(item.maximumDifference)}**${item.relativeDifference === undefined ? "" : ` (${share(item.relativeDifference)} of the input's range)`}.`,
          "",
        ]),
    valuesTable(item),
    "",
    ...(item.flags.length === 0
      ? []
      : [
          "## Internal fit differences",
          "",
          "The forecasts match, so this case passes. Both libraries search for the best-fitting parameters and stop when they are close enough. On this input they stopped at slightly different points, so these internal numbers differ by more than the threshold where we take a closer look.",
          "",
          "| Check | Effect Prophet | Python Prophet | Threshold |",
          "| --- | ---: | ---: | ---: |",
          ...item.flags.map(
            (flag) =>
              `| ${flag.label} | ${number(flag.effect)} | ${number(flag.python)} | ${flag.threshold} |`,
          ),
          "",
        ]),
    "## Timing",
    "",
    timingTable(item),
    "",
    "## Settings",
    "",
    "The case declaration both libraries ran.",
    "",
    "```json",
    JSON.stringify(item.settings, null, 2),
    "```",
    "",
  ].join("\n");
