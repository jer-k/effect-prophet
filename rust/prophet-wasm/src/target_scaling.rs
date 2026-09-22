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

/// Whether logistic rows use a persisted implicit floor or row-specific explicit floors.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum LogisticFloorPolicy {
  /// Every row uses the persisted output-unit floor.
  Implicit(f64),

  /// Every row supplies its own output-unit floor.
  Explicit,
}

/// Train-derived scaling state for logistic growth.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct LogisticScaling {
  /// Scaling policy used during fitting.
  pub mode: ScalingMode,

  /// Positive output-unit divisor used by the likelihood.
  pub scale: f64,

  /// Resolved floor policy reused for prediction.
  pub floor_policy: LogisticFloorPolicy,
}

impl LogisticScaling {
  /// Parse checked logistic scaling metadata received from a protocol boundary.
  pub fn parse(
    mode: f64,
    scale: f64,
    floor_policy: f64,
    implicit_floor: f64,
  ) -> Result<Self, TargetScalingError> {
    let mode = ScalingMode::from_code(mode).ok_or(TargetScalingError::InvalidScaling)?;

    if !scale.is_finite() || scale <= 0.0 || !implicit_floor.is_finite() {
      return Err(TargetScalingError::InvalidScaling);
    }

    let floor_policy = match floor_policy {
      0.0 => LogisticFloorPolicy::Implicit(implicit_floor),
      1.0 if implicit_floor == 0.0 => LogisticFloorPolicy::Explicit,
      _ => return Err(TargetScalingError::InvalidScaling),
    };

    Ok(Self {
      mode,
      scale,
      floor_policy,
    })
  }

  /// Return the effective floor for one row, checking the persisted floor policy.
  pub fn row_floor(
    self,
    explicit_floors: Option<&[f64]>,
    row: usize,
  ) -> Result<f64, TargetScalingError> {
    let floor = match (self.floor_policy, explicit_floors) {
      (LogisticFloorPolicy::Implicit(floor), None) => floor,
      (LogisticFloorPolicy::Explicit, Some(floors)) => {
        *floors.get(row).ok_or(TargetScalingError::InvalidScaling)?
      }
      _ => return Err(TargetScalingError::InvalidScaling),
    };

    if !floor.is_finite() {
      return Err(TargetScalingError::NonFiniteValue);
    }

    Ok(floor)
  }
}

/// Resolve Prophet's floor-aware, train-only logistic target scaling.
pub fn resolve_logistic_scaling(
  values: &[f64],
  capacities: &[f64],
  explicit_floors: Option<&[f64]>,
  mode: ScalingMode,
) -> Result<LogisticScaling, TargetScalingError> {
  let Some(&first_value) = values.first() else {
    return Err(TargetScalingError::EmptyValues);
  };

  if capacities.len() != values.len()
    || explicit_floors.is_some_and(|floors| floors.len() != values.len())
  {
    return Err(TargetScalingError::InvalidScaling);
  }

  if values
    .iter()
    .chain(capacities)
    .any(|value| !value.is_finite())
    || explicit_floors.is_some_and(|floors| floors.iter().any(|value| !value.is_finite()))
  {
    return Err(TargetScalingError::NonFiniteValue);
  }

  let (floor_policy, mut scale) = if let Some(floors) = explicit_floors {
    for (&capacity, &floor) in capacities.iter().zip(floors) {
      if capacity <= floor {
        return Err(TargetScalingError::InvalidScaling);
      }
    }

    match mode {
      ScalingMode::AbsMax => {
        let mut maximum = 0.0_f64;

        for (&value, &floor) in values.iter().zip(floors) {
          let difference = value - floor;

          if !difference.is_finite() {
            return Err(TargetScalingError::NonRepresentable);
          }

          maximum = maximum.max(difference.abs());
        }

        (LogisticFloorPolicy::Explicit, maximum)
      }
      ScalingMode::MinMax => {
        let minimum_floor = floors.iter().copied().fold(f64::INFINITY, f64::min);
        let maximum_capacity = capacities.iter().copied().fold(f64::NEG_INFINITY, f64::max);
        let range = maximum_capacity - minimum_floor;

        if !range.is_finite() {
          return Err(TargetScalingError::NonRepresentable);
        }

        (LogisticFloorPolicy::Explicit, range)
      }
    }
  } else {
    let implicit_floor = match mode {
      ScalingMode::AbsMax => 0.0,
      ScalingMode::MinMax => values.iter().copied().fold(first_value, f64::min),
    };

    for &capacity in capacities {
      if capacity <= implicit_floor {
        return Err(TargetScalingError::InvalidScaling);
      }
    }

    let scale = match mode {
      ScalingMode::AbsMax => values.iter().map(|value| value.abs()).fold(0.0, f64::max),
      ScalingMode::MinMax => {
        let maximum = values.iter().copied().fold(first_value, f64::max);
        let range = maximum - implicit_floor;

        if !range.is_finite() {
          return Err(TargetScalingError::NonRepresentable);
        }

        range
      }
    };

    (LogisticFloorPolicy::Implicit(implicit_floor), scale)
  };

  if scale == 0.0 {
    scale = 1.0;
  }

  if !scale.is_finite() || scale <= 0.0 {
    return Err(TargetScalingError::NonRepresentable);
  }

  Ok(LogisticScaling {
    mode,
    scale,
    floor_policy,
  })
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
