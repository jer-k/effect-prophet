import { describe, expect, it } from "vitest";

import {
  daysInUtcMonth,
  utcDayOfMonth,
  utcMonth,
  utcMonthDay,
} from "../../src/internal/calendar-month";
import { utcTimeOfDay } from "../../src/internal/time";

const epoch = (timestamp: string) => Date.parse(timestamp);

describe("UTC calendar months", () => {
  it("counts months from January 1970 on both sides of the epoch", () => {
    expect(utcMonth(epoch("1970-01-01T00:00:00.000Z"))).toBe(0);
    expect(utcMonth(epoch("1969-12-31T23:59:59.999Z"))).toBe(-1);
    expect(utcMonth(epoch("2025-03-15T12:00:00.000Z"))).toBe(55 * 12 + 2);
  });

  it("counts leap-year and short-month lengths", () => {
    expect(daysInUtcMonth(utcMonth(epoch("2024-02-10T00:00:00.000Z")))).toBe(29);
    expect(daysInUtcMonth(utcMonth(epoch("2025-02-10T00:00:00.000Z")))).toBe(28);
    expect(daysInUtcMonth(utcMonth(epoch("1900-02-10T00:00:00.000Z")))).toBe(28);
    expect(daysInUtcMonth(utcMonth(epoch("2000-02-10T00:00:00.000Z")))).toBe(29);
    expect(daysInUtcMonth(utcMonth(epoch("2025-04-10T00:00:00.000Z")))).toBe(30);
    expect(daysInUtcMonth(utcMonth(epoch("1969-12-10T00:00:00.000Z")))).toBe(31);
  });

  it("builds a day of a month at a time of day without rolling over", () => {
    const february = utcMonth(epoch("2024-02-01T00:00:00.000Z"));

    expect(utcMonthDay(february, 29, 45_000_000)).toBe(epoch("2024-02-29T12:30:00.000Z"));
    expect(utcMonthDay(february + 11, 1, 0)).toBe(epoch("2025-01-01T00:00:00.000Z"));
    expect(utcDayOfMonth(epoch("2024-02-29T23:59:59.999Z"))).toBe(29);
  });

  it("returns NaN past the JavaScript date range", () => {
    expect(utcMonthDay(utcMonth(8.64e15) + 1, 1, 0)).toBeNaN();
  });

  it("reads the UTC time of day before and after the epoch", () => {
    expect(utcTimeOfDay(epoch("2025-01-15T12:30:00.000Z"))).toBe(45_000_000);
    expect(utcTimeOfDay(epoch("1969-12-31T18:00:00.000Z"))).toBe(64_800_000);
    expect(utcTimeOfDay(epoch("1969-12-31T00:00:00.000Z"))).toBe(0);
  });
});
