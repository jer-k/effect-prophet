import { describe, expect, it } from "vitest";

import {
  resolveContainerPlatform,
  type ContainerPlatformResolution,
} from "../container-platform.ts";
import {
  applyOracleChecks,
  buildDifferentialReport,
  failingVerdicts,
  judgeCase,
  judgeOracleSensitivity,
  maximumOracleChecks,
  oraclePerturbations,
  parseOutcomeLines,
  parsePerturbedOutcomeLines,
  renderDifferentialMarkdown,
  selectOracleChecks,
  targetSpan,
  type DifferentialCaseResult,
  type DifferentialOutcome,
  type PerturbedOutcome,
} from "../differential.ts";
import { generateCase } from "../differential-generate.ts";
import type { ForecastProjection } from "../result.ts";

const amd64Oracle = resolveContainerPlatform("x64");

// Any generated case works as a carrier; judging reads only its id, traits, growth and targets.
const carrier = generateCase(1);

/** A case whose training targets span exactly `span`, offset far from zero. */
const caseWithSpan = (span: number) => ({
  ...carrier,
  dataset: {
    ...carrier.dataset,
    observations: [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 1e6 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 1e6 + span },
    ],
  },
});

const forecast = (value: number, componentName = "weekly-custom"): ForecastProjection => ({
  timestamp: 1_704_153_600_000,
  value,
  trend: value,
  additive: 0,
  multiplicative: 0,
  seasonalities: [{ name: componentName, mode: "additive", value: 0 }],
  events: [],
  regressors: [],
});

const fitted = (value: number, noiseScale = 0.1, componentName?: string): DifferentialOutcome => ({
  caseId: carrier.id,
  status: "fitted",
  forecasts: [forecast(value, componentName)],
  noiseScale,
  seconds: 0.01,
});

const failed = (error: string, reason?: string): DifferentialOutcome => {
  const outcome = {
    caseId: carrier.id,
    status: "failed" as const,
    stage: "fit" as const,
    error,
    message: `${error} message`,
    seconds: 0.01,
  };

  return reason === undefined ? outcome : { ...outcome, reason };
};

describe("differential judging", () => {
  it("measures forecast differences in units of the training target span", () => {
    expect(targetSpan(caseWithSpan(2).dataset)).toBe(2);

    // A 0.01 gap on targets near one million is invisible relative to the values, but it is 1%
    // of a unit span, so it must not pass.
    const result = judgeCase(caseWithSpan(1), fitted(1e6), fitted(1e6 + 0.01));

    expect(result.differences?.forecast).toBeCloseTo(0.01, 6);
    expect(result.verdict).not.toBe("match");
    expect(judgeCase(caseWithSpan(1_000), fitted(1e6), fitted(1e6 + 0.01)).verdict).toBe("match");
  });

  it("triages forecast gaps by which side fits the training data worse", () => {
    const differing = (effectNoise: number, pythonNoise: number) =>
      judgeCase(caseWithSpan(1), fitted(1, effectNoise), fitted(2, pythonNoise));

    expect(differing(0.1, 0.1005).verdict).toBe("equivalent-fit");
    expect(differing(0.1, 0.2).verdict).toBe("python-worse-fit");
    expect(differing(0.2, 0.1).verdict).toBe("mismatch");
    expect(differing(0.2, 0.1).noiseGap).toBeCloseTo(0.1, 12);

    // Residuals larger than the whole target span mean neither fit resolves the data.
    expect(differing(5, 3).verdict).toBe("neither-fits");
  });

  it("treats rows whose components do not align as incomparable", () => {
    const result = judgeCase(caseWithSpan(1), fitted(1), fitted(1, undefined, "monthly"));

    expect(result.verdict).toBe("incomparable");
    expect(result.differences).toBeUndefined();
  });

  it("separates Effect validation rejections from other one-sided failures", () => {
    const span = caseWithSpan(1);

    expect(judgeCase(span, failed("InputValidationError"), fitted(1)).verdict).toBe(
      "effect-rejected",
    );

    expect(judgeCase(span, failed("FittingError", "noise-collapse"), fitted(1)).verdict).toBe(
      "effect-failed",
    );

    expect(judgeCase(span, failed("Defect"), fitted(1)).verdict).toBe("effect-failed");
    expect(judgeCase(span, fitted(1), failed("ValueError")).verdict).toBe("python-failed");
    expect(judgeCase(span, failed("FittingError"), failed("ValueError")).verdict).toBe(
      "both-failed",
    );
  });
});

describe("differential reports", () => {
  it("counts verdicts and renders failures with a replay command", () => {
    const report = buildDifferentialReport(
      "run-1",
      60,
      amd64Oracle,
      [caseWithSpan(1)],
      [fitted(1, 0.2)],
      [fitted(5, 0.1)],
    );

    expect(report.counts.mismatch).toBe(1);
    expect(report.counts.match).toBe(0);

    const markdown = renderDifferentialMarkdown(report);

    expect(markdown).toContain(`\`${carrier.id}\``);
    expect(markdown).toContain("npm run differential -- --seed 60 --cases 1");
    expect(markdown).toContain("npm run differential -- --case-seed <seed>");
    expect(markdown).toContain("Python oracle: `linux/amd64`, native.");
    expect(markdown).not.toContain("Warning");
  });

  it("states an emulated oracle and warns when it is not the reference platform", () => {
    const render = (oracle: ContainerPlatformResolution) =>
      renderDifferentialMarkdown(
        buildDifferentialReport("run-1", 60, oracle, [carrier], [fitted(1)], [fitted(1)]),
      );

    const emulated = render(resolveContainerPlatform("arm64", undefined, "linux/amd64"));

    expect(emulated).toContain("Python oracle: `linux/amd64`, emulated on a `linux/arm64` host.");
    expect(emulated).not.toContain("Warning");

    const native = render(resolveContainerPlatform("arm64"));

    expect(native).toContain("Python oracle: `linux/arm64`, native.");
    expect(native).toContain(
      "> **Warning:** The Python oracle ran on `linux/arm64`, not `linux/amd64`",
    );
  });

  it("fails when a case has no outcome from one implementation", () => {
    expect(() =>
      buildDifferentialReport("run-1", 60, amd64Oracle, [carrier], [fitted(1)], []),
    ).toThrow("missing an implementation outcome");
  });

  it("decodes JSON-lines outcomes and rejects malformed ones", () => {
    const lines = `${JSON.stringify(fitted(1, 2))}\n\n${JSON.stringify(failed("ValueError"))}\n`;

    expect(parseOutcomeLines(lines).map((outcome) => outcome.status)).toEqual(["fitted", "failed"]);

    expect(() =>
      parseOutcomeLines(`${JSON.stringify({ caseId: "x", status: "done" })}\n`),
    ).toThrow();
  });
});

type Fitted = Extract<DifferentialOutcome, { status: "fitted" }>;

const fittedOutcome = (value: number, noiseScale: number): Fitted => ({
  caseId: carrier.id,
  status: "fitted",
  forecasts: [forecast(value)],
  noiseScale,
  seconds: 0.01,
});

/** Perturbed oracle fits, one per perturbation, cycling through the given values and noises. */
const perturbedFits = (
  outcomes: ReadonlyArray<readonly [value: number, noiseScale: number]>,
): ReadonlyArray<PerturbedOutcome> =>
  oraclePerturbations.map((perturbation, index) => {
    const [value, noiseScale] = outcomes[index % outcomes.length] ?? [Number.NaN, Number.NaN];

    return { ...fittedOutcome(value, noiseScale), perturbation };
  });

describe("oracle sensitivity", () => {
  const span = caseWithSpan(1);

  it("labels a case only when Effect's noise and forecasts lie within the perturbed spread", () => {
    const evidence = judgeOracleSensitivity(
      span,
      "mismatch",
      fittedOutcome(1.3, 0.25),
      fittedOutcome(1, 0.1),
      perturbedFits([
        [1.5, 0.3],
        [0.9, 0.12],
      ]),
    );

    expect(evidence.sensitive).toBe(true);
    expect(evidence.noiseSpread).toEqual({ minimum: 0.1, maximum: 0.3 });
    expect(evidence.forecastExcess).toBe(0);
    expect(evidence.variants).toHaveLength(oraclePerturbations.length);
  });

  it("keeps the mismatch when Effect's noise or any forecast lies outside the spread", () => {
    const noisier = judgeOracleSensitivity(
      span,
      "mismatch",
      fittedOutcome(1.3, 0.4),
      fittedOutcome(1, 0.1),
      perturbedFits([[1.5, 0.3]]),
    );

    expect(noisier.noiseWithinSpread).toBe(false);
    expect(noisier.sensitive).toBe(false);

    const shifted = judgeOracleSensitivity(
      span,
      "mismatch",
      fittedOutcome(2, 0.2),
      fittedOutcome(1, 0.1),
      perturbedFits([[1.5, 0.3]]),
    );

    expect(shifted.noiseWithinSpread).toBe(true);
    expect(shifted.forecastWithinSpread).toBe(false);
    expect(shifted.forecastExcess).toBeCloseTo(0.5 - 1e-3, 12);
    expect(shifted.sensitive).toBe(false);
  });

  it("widens the spread only by the strict tolerances", () => {
    const edge = (noise: number) =>
      judgeOracleSensitivity(
        span,
        "mismatch",
        fittedOutcome(1, noise),
        fittedOutcome(1, 0.1),
        perturbedFits([[1, 0.2]]),
      ).noiseWithinSpread;

    expect(edge(0.2 + 0.5e-3)).toBe(true);
    expect(edge(0.2 + 2e-3)).toBe(false);
  });

  it("never forgives a mismatch from indicators, or without a comparable perturbed fit", () => {
    // Targets near one million that move by a millionth of their size.
    const tiny = caseWithSpan(1e-6);

    const unchanged = judgeOracleSensitivity(
      tiny,
      "mismatch",
      fittedOutcome(1e6, 3e-6),
      fittedOutcome(1e6, 1e-6),
      perturbedFits([[1e6, 1e-6]]),
    );

    expect(unchanged.indicators.relativeTargetSpan).toBeLessThan(2e-12);
    expect(unchanged.sensitive).toBe(false);

    const failures = oraclePerturbations.map((perturbation): PerturbedOutcome => ({
      caseId: carrier.id,
      status: "failed",
      stage: "fit",
      error: "RuntimeError",
      message: "failed",
      seconds: 0.01,
      perturbation,
    }));

    const unsupported = judgeOracleSensitivity(
      span,
      "mismatch",
      fittedOutcome(1, 0.1),
      fittedOutcome(1, 0.1),
      failures,
    );

    expect(unsupported.sensitive).toBe(false);
    expect(unsupported.variants.every((variant) => variant.status === "failed")).toBe(true);

    const misaligned = perturbedFits([[1, 0.1]]).map((outcome) =>
      outcome.status === "fitted" ? { ...outcome, forecasts: [forecast(1, "monthly")] } : outcome,
    );

    const incomparable = judgeOracleSensitivity(
      span,
      "mismatch",
      fittedOutcome(1, 0.1),
      fittedOutcome(1, 0.1),
      misaligned,
    );

    expect(incomparable.sensitive).toBe(false);
    expect(incomparable.variants.every((variant) => variant.status === "incomparable")).toBe(true);
  });

  it("checks only noise disagreements, in case order, up to the per-run limit", () => {
    const result = (index: number, verdict: DifferentialCaseResult["verdict"]) => ({
      ...judgeCase(span, fitted(1), fitted(1)),
      caseId: `case-${index}`,
      verdict,
    });

    const results = [
      result(0, "match"),
      result(1, "equivalent-fit"),
      result(2, "python-worse-fit"),
      result(3, "effect-failed"),
      ...Array.from({ length: maximumOracleChecks + 3 }, (_, index) =>
        result(index + 4, "mismatch"),
      ),
    ];

    const selected = selectOracleChecks(results);

    expect(selected).toHaveLength(maximumOracleChecks);
    expect(selected[0]?.caseId).toBe("case-2");
    expect(selected.slice(1).every((item) => item.verdict === "mismatch")).toBe(true);
  });

  it("relabels checked reports, counts oracle-sensitive cases separately and keeps evidence", () => {
    const effect = [fittedOutcome(1.3, 0.25)];
    const python = [fittedOutcome(1, 0.1)];
    const report = buildDifferentialReport("run-1", 60, amd64Oracle, [span], effect, python);

    expect(report.results[0]?.verdict).toBe("mismatch");

    const checked = applyOracleChecks(report, [span], effect, python, perturbedFits([[1.5, 0.3]]));
    const [result] = checked.results;

    expect(result?.verdict).toBe("oracle-sensitive");
    expect(result?.oracleCheck?.originalVerdict).toBe("mismatch");
    expect(result?.differences).toEqual(report.results[0]?.differences);
    expect(checked.counts["oracle-sensitive"]).toBe(1);
    expect(checked.counts.mismatch).toBe(0);
    expect(failingVerdicts.has("oracle-sensitive")).toBe(false);

    const markdown = renderDifferentialMarkdown(checked);

    expect(markdown).toContain("## Oracle sensitivity");
    expect(markdown).toContain("| oracle-sensitive | 1 |");
    expect(markdown).toContain("| mismatch | oracle-sensitive |");

    const outside = applyOracleChecks(report, [span], effect, python, perturbedFits([[1, 0.1]]));

    expect(outside.results[0]?.verdict).toBe("mismatch");
    expect(outside.results[0]?.oracleCheck?.sensitive).toBe(false);

    expect(() => applyOracleChecks(report, [span], effect, python, [])).toThrow(
      "missing perturbed oracle outcomes",
    );
  });

  it("decodes perturbed outcomes and rejects unknown perturbations", () => {
    const [first] = perturbedFits([[1, 0.1]]);

    expect(parsePerturbedOutcomeLines(`${JSON.stringify(first)}\n`)).toEqual([first]);

    expect(() =>
      parsePerturbedOutcomeLines(`${JSON.stringify({ ...first, perturbation: "k-up" })}\n`),
    ).toThrow();
  });
});
