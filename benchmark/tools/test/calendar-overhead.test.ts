import { describe, expect, it } from "vitest";

import { countryControls, renderCalendarOverhead } from "../calendar-overhead.ts";

const timing = (caseId: string, implementation: string, milliseconds: number) => ({
  caseId,
  phase: "warm-predict",
  implementation,
  sampleCount: 6,
  medianNanoseconds: milliseconds * 1e6,
});

const passed = (caseId: string) => ({
  caseId,
  status: "passed" as const,
  comparison: "equivalent-objective",
  note: "",
});

describe("calendar overhead", () => {
  it("pairs country cases with explicit and no-event controls on the same dataset", () => {
    expect(countryControls("country-se-flat-2190-batch-32")).toEqual({
      explicit: "country-explicit-se-flat-2190-batch-32",
      none: "country-none-flat-2190-batch-32",
    });
    // Controls themselves are not country cases.
    expect(countryControls("country-explicit-se-flat-730")).toBeUndefined();
    expect(countryControls("country-none-flat-730")).toBeUndefined();
    expect(countryControls("map-events-small")).toBeUndefined();
  });

  it("reports per-implementation ratios and omits failed or unpaired cases", () => {
    const markdown = renderCalendarOverhead({
      schemaVersion: 1,
      run: { runId: "run-1" },
      correctness: [
        passed("country-se-flat-730"),
        passed("country-explicit-se-flat-730"),
        passed("country-none-flat-730"),
        passed("country-cn-flat-730"),
        { ...passed("country-explicit-cn-flat-730"), status: "failed" },
      ],
      timings: [
        timing("country-se-flat-730", "effect-prophet", 4),
        timing("country-explicit-se-flat-730", "effect-prophet", 2),
        timing("country-none-flat-730", "effect-prophet", 1),
        timing("country-se-flat-730", "python-prophet", 9),
        timing("country-explicit-se-flat-730", "python-prophet", 6),
        timing("country-none-flat-730", "python-prophet", 3),
        timing("country-cn-flat-730", "effect-prophet", 5),
        timing("country-explicit-cn-flat-730", "effect-prophet", 1),
      ],
    });

    expect(markdown).toContain(
      "| country-se-flat-730 | warm-predict | 4.000 | 2.00× | 4.00× | 9.000 | 1.50× | 3.00× |",
    );
    // The CN explicit control failed, so only the no-event control contributes.
    expect(markdown).toContain(
      "| country-cn-flat-730 | warm-predict | 5.000 | n/a | 5.00× | n/a | n/a | n/a |",
    );
    expect(markdown).not.toContain("| country-explicit-se-flat-730 |");
  });
});
