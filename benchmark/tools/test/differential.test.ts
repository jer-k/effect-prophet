import { describe, expect, it } from "vitest";

import {
  buildDifferentialReport,
  judgeCase,
  parseOutcomeLines,
  renderDifferentialMarkdown,
  targetSpan,
  type DifferentialOutcome,
} from "../differential.ts";
import { generateCase } from "../differential-generate.ts";
import type { ForecastProjection } from "../result.ts";

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
  });

  it("fails when a case has no outcome from one implementation", () => {
    expect(() => buildDifferentialReport("run-1", 60, [carrier], [fitted(1)], [])).toThrow(
      "missing an implementation outcome",
    );
  });

  it("decodes JSON-lines outcomes and rejects malformed ones", () => {
    const lines = `${JSON.stringify(fitted(1, 2))}\n\n${JSON.stringify(failed("ValueError"))}\n`;

    expect(parseOutcomeLines(lines).map((outcome) => outcome.status)).toEqual(["fitted", "failed"]);

    expect(() =>
      parseOutcomeLines(`${JSON.stringify({ caseId: "x", status: "done" })}\n`),
    ).toThrow();
  });
});
