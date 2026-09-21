/// Supported Prophet target-scaling policies for nonlogistic models.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum ScalingMode {
  /// Divide targets by their largest absolute value without centering.
  AbsMax,

  /// Center targets at their minimum and divide by their range.
  MinMax,
}

impl ScalingMode {
  /// Parse the finite integer code used by the WASM protocol.
  pub fn from_code(code: f64) -> Option<Self> {
    match code {
      0.0 => Some(Self::AbsMax),
      1.0 => Some(Self::MinMax),
      _ => None,
    }
  }

  /// Return the finite integer code used by the WASM protocol.
  #[must_use]
  pub fn code(self) -> f64 {
    match self {
      Self::AbsMax => 0.0,
      Self::MinMax => 1.0,
    }
  }
}

/// Complete train-derived state required to reverse target scaling.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct TargetScaling {
  /// Scaling policy used during fitting.
  pub mode: ScalingMode,

  /// Output-unit value subtracted before fitting.
  pub offset: f64,

  /// Positive output-unit divisor used during fitting.
  pub scale: f64,
}

/// Expected failures while resolving or applying target scaling.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum TargetScalingError {
  /// Scale resolution requires at least one target.
  EmptyValues,

  /// Every target and stored scaling value must be finite.
  NonFiniteValue,

  /// Finite inputs produced an unrepresentable scale or projection.
  NonRepresentable,

  /// Stored scaling metadata is internally invalid.
  InvalidScaling,
}

impl TargetScaling {
  /// Parse checked scaling metadata received from a protocol boundary.
  pub fn parse(mode: f64, offset: f64, scale: f64) -> Result<Self, TargetScalingError> {
    let mode = ScalingMode::from_code(mode).ok_or(TargetScalingError::InvalidScaling)?;

    if !offset.is_finite() || !scale.is_finite() || scale <= 0.0 {
      return Err(TargetScalingError::InvalidScaling);
    }

    Ok(Self {
      mode,
      offset,
      scale,
    })
  }

  /// Scale one finite output-unit target.
  pub fn scale_value(self, value: f64) -> Result<f64, TargetScalingError> {
    if !value.is_finite() {
      return Err(TargetScalingError::NonFiniteValue);
    }

    let scaled = (value - self.offset) / self.scale;

    if !scaled.is_finite() {
      return Err(TargetScalingError::NonRepresentable);
    }

    Ok(scaled)
  }

  /// Restore one finite relative output-unit trend value by adding the offset once.
  pub fn restore_trend(self, relative_trend: f64) -> Result<f64, TargetScalingError> {
    if !relative_trend.is_finite() {
      return Err(TargetScalingError::NonFiniteValue);
    }

    let restored = self.offset + relative_trend;

    if !restored.is_finite() {
      return Err(TargetScalingError::NonRepresentable);
    }

    Ok(restored)
  }
}

/// Resolve Prophet's train-only nonlogistic target scaling.
pub fn resolve_target_scaling(
  values: &[f64],
  mode: ScalingMode,
) -> Result<TargetScaling, TargetScalingError> {
  let Some(&first) = values.first() else {
    return Err(TargetScalingError::EmptyValues);
  };

  if !first.is_finite() {
    return Err(TargetScalingError::NonFiniteValue);
  }

  let (offset, mut scale) = match mode {
    ScalingMode::AbsMax => {
      let mut maximum = first.abs();

      for &value in &values[1..] {
        if !value.is_finite() {
          return Err(TargetScalingError::NonFiniteValue);
        }

        maximum = maximum.max(value.abs());
      }

      (0.0, maximum)
    }
    ScalingMode::MinMax => {
      let mut minimum = first;
      let mut maximum = first;

      for &value in &values[1..] {
        if !value.is_finite() {
          return Err(TargetScalingError::NonFiniteValue);
        }

        minimum = minimum.min(value);
        maximum = maximum.max(value);
      }

      let range = maximum - minimum;

      if !range.is_finite() {
        return Err(TargetScalingError::NonRepresentable);
      }

      (minimum, range)
    }
  };

  if scale == 0.0 {
    scale = 1.0;
  }

  if !offset.is_finite() || !scale.is_finite() || scale <= 0.0 {
    return Err(TargetScalingError::NonRepresentable);
  }

  Ok(TargetScaling {
    mode,
    offset,
    scale,
  })
}

#[cfg(test)]
mod tests {
  use super::{ScalingMode, TargetScaling, TargetScalingError, resolve_target_scaling};

  #[test]
  fn resolves_absmax_and_minmax_scaling() {
    assert_eq!(
      resolve_target_scaling(&[-2.0, 3.0, 1.0], ScalingMode::AbsMax),
      Ok(TargetScaling {
        mode: ScalingMode::AbsMax,
        offset: 0.0,
        scale: 3.0,
      })
    );
    assert_eq!(
      resolve_target_scaling(&[-2.0, 3.0, 1.0], ScalingMode::MinMax),
      Ok(TargetScaling {
        mode: ScalingMode::MinMax,
        offset: -2.0,
        scale: 5.0,
      })
    );
  }

  #[test]
  fn uses_a_unit_scale_for_constant_targets() {
    assert_eq!(
      resolve_target_scaling(&[4.0, 4.0], ScalingMode::MinMax),
      Ok(TargetScaling {
        mode: ScalingMode::MinMax,
        offset: 4.0,
        scale: 1.0,
      })
    );
    assert_eq!(
      resolve_target_scaling(&[0.0, 0.0], ScalingMode::AbsMax),
      Ok(TargetScaling {
        mode: ScalingMode::AbsMax,
        offset: 0.0,
        scale: 1.0,
      })
    );
  }

  #[test]
  fn rejects_an_overflowing_minmax_range() {
    assert_eq!(
      resolve_target_scaling(&[-f64::MAX, f64::MAX], ScalingMode::MinMax),
      Err(TargetScalingError::NonRepresentable)
    );
  }

  #[test]
  fn scales_and_restores_checked_values() {
    let scaling = resolve_target_scaling(&[10.0, 14.0], ScalingMode::MinMax).unwrap();

    assert_eq!(scaling.scale_value(12.0), Ok(0.5));
    assert_eq!(scaling.restore_trend(2.0), Ok(12.0));
  }
}
