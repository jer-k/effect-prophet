const TREND_PRIOR_VARIANCE: f64 = 25.0;
const NOISE_PRIOR_VARIANCE: f64 = 0.25;

/// Checked evaluation of the linear piecewise MAP objective.
#[derive(Clone, Debug, PartialEq)]
pub struct MapObjectiveEvaluation {
  /// Summed negative log posterior up to parameter-independent constants.
  pub objective: f64,

  /// Sum of squared residuals in scaled target coordinates.
  pub residual_sum_squares: f64,

  /// Smooth coefficient derivatives in `[m,k,delta...,beta...]` order.
  pub smooth_gradient: Vec<f64>,

  /// Derivative with respect to positive `sigma`.
  pub noise_derivative: f64,

  /// Maximum complete KKT residual including Laplace subgradients.
  pub stationarity_residual: f64,
}

/// Expected failures from objective evaluation.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum MapObjectiveError {
  /// Matrix, coefficient, or prior dimensions do not align.
  InvalidDimensions,

  /// A scale or finite numerical input is invalid.
  InvalidInput,

  /// Finite inputs produced an unrepresentable result.
  NonFiniteResult,
}

/// Evaluate the approved summed MAP objective and complete stationarity certificate.
#[allow(clippy::too_many_arguments)]
pub fn evaluate_map_objective(
  row_count: usize,
  column_count: usize,
  changepoint_count: usize,
  design: &[f64],
  target: &[f64],
  coefficients: &[f64],
  seasonal_prior_scales: &[f64],
  changepoint_prior_scale: f64,
  noise_scale: f64,
) -> Result<MapObjectiveEvaluation, MapObjectiveError> {
  let seasonal_count = column_count
    .checked_sub(2 + changepoint_count)
    .ok_or(MapObjectiveError::InvalidDimensions)?;

  if row_count < 2
    || target.len() != row_count
    || design.len()
      != row_count
        .checked_mul(column_count)
        .ok_or(MapObjectiveError::InvalidDimensions)?
    || coefficients.len() != column_count
    || seasonal_prior_scales.len() != seasonal_count
    || !changepoint_prior_scale.is_finite()
    || changepoint_prior_scale <= 0.0
    || !noise_scale.is_finite()
    || noise_scale <= 0.0
    || design
      .iter()
      .chain(target)
      .chain(coefficients)
      .any(|value| !value.is_finite())
    || seasonal_prior_scales
      .iter()
      .any(|scale| !scale.is_finite() || *scale <= 0.0)
  {
    return Err(MapObjectiveError::InvalidInput);
  }

  let mut gradient = vec![0.0; column_count];
  let mut residual_sum_squares = 0.0;

  for (row, &target_value) in target.iter().enumerate() {
    let offset = row * column_count;
    let fitted = coefficients
      .iter()
      .enumerate()
      .map(|(column, coefficient)| design[offset + column] * coefficient)
      .sum::<f64>();
    let residual = fitted - target_value;

    residual_sum_squares += residual * residual;

    for column in 0..column_count {
      gradient[column] += design[offset + column] * residual;
    }
  }

  let noise_variance = noise_scale * noise_scale;
  let mut objective = row_count as f64 * noise_scale.ln()
    + residual_sum_squares / (2.0 * noise_variance)
    + noise_variance / (2.0 * NOISE_PRIOR_VARIANCE);

  for value in gradient.iter_mut() {
    *value /= noise_variance;
  }

  for column in 0..2 {
    objective += coefficients[column] * coefficients[column] / (2.0 * TREND_PRIOR_VARIANCE);
    gradient[column] += coefficients[column] / TREND_PRIOR_VARIANCE;
  }

  for delta in coefficients.iter().skip(2).take(changepoint_count) {
    objective += delta.abs() / changepoint_prior_scale;
  }

  for (seasonal, &prior_scale) in seasonal_prior_scales.iter().enumerate() {
    let column = 2 + changepoint_count + seasonal;
    let prior_variance = prior_scale * prior_scale;

    objective += coefficients[column] * coefficients[column] / (2.0 * prior_variance);
    gradient[column] += coefficients[column] / prior_variance;
  }

  let noise_derivative = row_count as f64 / noise_scale
    - residual_sum_squares / (noise_scale * noise_variance)
    + noise_scale / NOISE_PRIOR_VARIANCE;
  let mut stationarity_residual = noise_derivative.abs();

  for (column, &derivative) in gradient.iter().enumerate() {
    let residual = if column >= 2 && column < 2 + changepoint_count {
      let delta = coefficients[column];

      if delta == 0.0 {
        (derivative.abs() - 1.0 / changepoint_prior_scale).max(0.0)
      } else {
        (derivative + delta.signum() / changepoint_prior_scale).abs()
      }
    } else {
      derivative.abs()
    };

    stationarity_residual = stationarity_residual.max(residual);
  }

  if !objective.is_finite()
    || !residual_sum_squares.is_finite()
    || gradient.iter().any(|value| !value.is_finite())
    || !noise_derivative.is_finite()
    || !stationarity_residual.is_finite()
  {
    return Err(MapObjectiveError::NonFiniteResult);
  }

  Ok(MapObjectiveEvaluation {
    objective,
    residual_sum_squares,
    smooth_gradient: gradient,
    noise_derivative,
    stationarity_residual,
  })
}

#[cfg(test)]
mod tests {
  use super::evaluate_map_objective;

  #[test]
  fn isolates_likelihood_priors_and_laplace_stationarity() {
    let evaluation = evaluate_map_objective(
      2,
      4,
      1,
      &[1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.5, -1.0],
      &[1.0, 2.0],
      &[0.5, 0.25, 0.0, 0.1],
      &[2.0],
      0.05,
      0.5,
    )
    .expect("the hand-authored objective is finite");

    assert!(evaluation.objective.is_finite());
    assert!(evaluation.residual_sum_squares > 0.0);
    assert_eq!(evaluation.smooth_gradient.len(), 4);
    assert!(evaluation.stationarity_residual >= 0.0);
  }

  #[test]
  fn smooth_derivatives_match_central_finite_differences() {
    let design = [1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.5, -1.0];
    let target = [1.0, 2.0];
    let coefficients = [0.5, 0.25, 0.2, 0.1];
    let evaluate = |point: &[f64], sigma: f64| {
      evaluate_map_objective(2, 4, 1, &design, &target, point, &[2.0], 0.05, sigma).unwrap()
    };
    let evaluation = evaluate(&coefficients, 0.5);
    let step = 1e-6;

    for column in [0, 1, 3] {
      let mut lower = coefficients;
      let mut upper = coefficients;
      lower[column] -= step;
      upper[column] += step;
      let finite_difference =
        (evaluate(&upper, 0.5).objective - evaluate(&lower, 0.5).objective) / (2.0 * step);

      assert!((finite_difference - evaluation.smooth_gradient[column]).abs() < 1e-5);
    }

    let noise_difference = (evaluate(&coefficients, 0.5 + step).objective
      - evaluate(&coefficients, 0.5 - step).objective)
      / (2.0 * step);

    assert!((noise_difference - evaluation.noise_derivative).abs() < 1e-5);
  }

  #[test]
  fn accepts_a_zero_delta_inside_its_subgradient_interval() {
    let evaluation = evaluate_map_objective(
      2,
      3,
      1,
      &[1.0, 0.0, 0.0, 1.0, 1.0, 0.0],
      &[0.0, 0.0],
      &[0.0, 0.0, 0.0],
      &[],
      0.05,
      0.5,
    )
    .unwrap();

    assert_eq!(evaluation.smooth_gradient[2], 0.0);
  }
}
