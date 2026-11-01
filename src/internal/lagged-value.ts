import { checkedAdd } from "./safe-arithmetic";

/**
 * Each observed timestamp's value. Stable input order makes the last row at a repeated timestamp
 * win, so exact-lag lookups agree with the seasonal-naive baseline.
 */
export const valuesByTimestamp = (
  rows: ReadonlyArray<{ readonly timestamp: number; readonly value: number }>,
): ReadonlyMap<number, number> => {
  const values = new Map<number, number>();

  for (const row of rows) values.set(row.timestamp, row.value);

  return values;
};

/** The value observed exactly `lagMs` before `timestamp`, if there is one. */
export const laggedValue = (
  values: ReadonlyMap<number, number>,
  timestamp: number,
  lagMs: number,
): number | undefined => {
  const lagged = checkedAdd(timestamp, -lagMs);

  return lagged === undefined ? undefined : values.get(lagged);
};
