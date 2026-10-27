/**
 * UTC calendar-month arithmetic over epoch milliseconds.
 *
 * A month is counted from January 1970, so month 0 is 1970-01 and month -1 is 1969-12. Calendar
 * months have no fixed duration, so callers step through month numbers rather than adding
 * milliseconds.
 */

/** Months since January 1970 of the UTC month containing an epoch millisecond. */
export const utcMonth = (epoch: number): number => {
  const date = new Date(epoch);

  return (date.getUTCFullYear() - 1970) * 12 + date.getUTCMonth();
};

/** The UTC day of the month, from 1, of an epoch millisecond. */
export const utcDayOfMonth = (epoch: number): number => new Date(epoch).getUTCDate();

/** Days in a UTC calendar month, counting leap years. */
export const daysInUtcMonth = (month: number): number =>
  new Date(Date.UTC(1970, month + 1, 0)).getUTCDate();

/**
 * The epoch millisecond of a day in a UTC month, offset by a time of day.
 *
 * Returns `NaN` outside JavaScript's date range, which callers reject as an invalid timestamp.
 */
export const utcMonthDay = (month: number, day: number, timeOfDay: number): number =>
  Date.UTC(1970, month, day) + timeOfDay;
