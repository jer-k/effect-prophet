/**
 * Observed minus predicted, the sign Prophet's error metrics use, or `undefined` when finite
 * inputs overflow to a non-finite difference.
 */
export const residualOf = (actual: number, predicted: number): number | undefined => {
  const residual = actual - predicted;

  return Number.isFinite(residual) ? residual : undefined;
};
