/// Complete output-unit state required to evaluate a continuous piecewise-linear trend.
#[derive(Clone, Debug, PartialEq)]
pub struct PiecewiseTrend {
  /// Value at scaled time zero before any start-boundary adjustment.
  pub intercept: f64,

  /// Base change over one complete training interval.
  pub slope: f64,

  /// First training timestamp in epoch milliseconds.
  pub time_origin: f64,

  /// Positive full training range in milliseconds.
  pub time_scale: f64,

  /// Strictly increasing changepoint timestamps in inclusive training bounds.
  pub changepoint_timestamps: Vec<f64>,

  /// Output-unit slope adjustments aligned with changepoints.
  pub deltas: Vec<f64>,
}

/// Expected failures from piecewise-linear evaluation.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum PiecewiseTrendError {
  /// Stored trend metadata is malformed.
  InvalidModel,

  /// A prediction timestamp is not finite.
  InvalidTimestamp { row: usize },

  /// Finite inputs produced a non-finite value.
  NonFiniteResult { row: usize },
}

impl PiecewiseTrend {
  /// Check all stored invariants without evaluating a prediction row.
  pub fn validate(&self) -> Result<(), PiecewiseTrendError> {
    if !self.intercept.is_finite()
      || !self.slope.is_finite()
      || !self.time_origin.is_finite()
      || !self.time_scale.is_finite()
      || self.time_scale <= 0.0
      || self.changepoint_timestamps.len() != self.deltas.len()
    {
      return Err(PiecewiseTrendError::InvalidModel);
    }

    let training_end = self.time_origin + self.time_scale;

    if !training_end.is_finite() {
      return Err(PiecewiseTrendError::InvalidModel);
    }

    let mut previous = None;

    for (&changepoint, &delta) in self.changepoint_timestamps.iter().zip(&self.deltas) {
      if !changepoint.is_finite()
        || !delta.is_finite()
        || changepoint < self.time_origin
        || changepoint > training_end
        || previous.is_some_and(|value| changepoint <= value)
      {
        return Err(PiecewiseTrendError::InvalidModel);
      }

      previous = Some(changepoint);
    }

    Ok(())
  }

  /// Evaluate one timestamp while preserving continuous hinge semantics.
  pub fn evaluate(&self, timestamp: f64, row: usize) -> Result<f64, PiecewiseTrendError> {
    if !timestamp.is_finite() {
      return Err(PiecewiseTrendError::InvalidTimestamp { row });
    }

    let scaled_time = (timestamp - self.time_origin) / self.time_scale;
    let mut value = self.intercept + self.slope * scaled_time;

    for (&changepoint, &delta) in self.changepoint_timestamps.iter().zip(&self.deltas) {
      let scaled_changepoint = (changepoint - self.time_origin) / self.time_scale;
      value += delta * (scaled_time - scaled_changepoint).max(0.0);
    }

    if !scaled_time.is_finite() || !value.is_finite() {
      return Err(PiecewiseTrendError::NonFiniteResult { row });
    }

    Ok(value)
  }
}

#[cfg(test)]
mod tests {
  use super::{PiecewiseTrend, PiecewiseTrendError};

  fn trend() -> PiecewiseTrend {
    PiecewiseTrend {
      intercept: 2.0,
      slope: 4.0,
      time_origin: 0.0,
      time_scale: 10.0,
      changepoint_timestamps: vec![2.0, 7.0],
      deltas: vec![-3.0, 5.0],
    }
  }

  #[test]
  fn evaluates_continuous_hinges_and_one_sided_slopes() {
    let trend = trend();

    assert_eq!(trend.evaluate(2.0, 0), Ok(2.8));
    assert_eq!(trend.evaluate(7.0, 0), Ok(3.3));
    assert!((trend.evaluate(2.0 - 1e-8, 0).unwrap() - 2.8).abs() < 1e-8);
    assert!((trend.evaluate(2.0 + 1e-8, 0).unwrap() - 2.8).abs() < 1e-8);

    let before = trend.evaluate(1.0, 0).unwrap();
    let at = trend.evaluate(2.0, 0).unwrap();
    let after = trend.evaluate(3.0, 0).unwrap();

    assert!((at - before - 0.4).abs() < 1e-12);
    assert!((after - at - 0.1).abs() < 1e-12);
  }

  #[test]
  fn empty_changepoints_reduce_to_the_linear_equation() {
    let trend = PiecewiseTrend {
      changepoint_timestamps: vec![],
      deltas: vec![],
      ..trend()
    };

    assert_eq!(trend.evaluate(15.0, 0), Ok(8.0));
  }

  #[test]
  fn rejects_invalid_metadata_and_indexed_evaluation_failures() {
    let mut invalid = trend();
    invalid.changepoint_timestamps.reverse();

    assert_eq!(invalid.validate(), Err(PiecewiseTrendError::InvalidModel));
    assert_eq!(
      trend().evaluate(f64::NAN, 3),
      Err(PiecewiseTrendError::InvalidTimestamp { row: 3 })
    );
  }
}
