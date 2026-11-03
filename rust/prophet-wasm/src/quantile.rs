//! Linear-interpolation quantiles of sorted draws, numpy's and Stan Math's default method.

/// The `probability` quantile of ascending finite `sorted`, interpolating between neighbors.
pub(crate) fn sorted_quantile(sorted: &[f64], probability: f64) -> f64 {
  let position = (sorted.len() - 1) as f64 * probability;
  let lower = position.floor() as usize;
  let upper = position.ceil() as usize;
  let fraction = position - lower as f64;
  let start = sorted[lower];
  let end = sorted[upper];

  // Preserve plateaus exactly: multiplying equal values by complementary weights can
  // round two quantiles in opposite directions on saturated logistic trends.
  if start == end || fraction == 0.0 {
    return start;
  }
  if fraction == 1.0 {
    return end;
  }

  // The difference avoids cancellation for nearby values, but may overflow when
  // the finite endpoints have opposite signs. In that case use bounded weights.
  let difference = end - start;
  if difference.is_finite() {
    start + difference * fraction
  } else {
    start * (1.0 - fraction) + end * fraction
  }
}
