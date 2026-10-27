/** Number of milliseconds in one hour. */
export const millisecondsPerHour = 3_600_000;

/** Number of milliseconds in one 24-hour UTC day. */
export const millisecondsPerDay = 86_400_000;

/** Milliseconds since the start of an epoch millisecond's UTC day, including before 1970. */
export const utcTimeOfDay = (epoch: number): number =>
  ((epoch % millisecondsPerDay) + millisecondsPerDay) % millisecondsPerDay;
