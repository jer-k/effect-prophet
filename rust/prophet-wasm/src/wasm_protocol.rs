pub(crate) const MAX_WIRE_INTEGER: f64 = u32::MAX as f64;

pub(crate) fn parse_positive_integer(value: f64) -> Option<usize> {
  if !value.is_finite() || value <= 0.0 || value.fract() != 0.0 || value > MAX_WIRE_INTEGER {
    return None;
  }

  Some(value as usize)
}

pub(crate) fn parse_nonnegative_integer(value: f64) -> Option<usize> {
  if !value.is_finite() || value < 0.0 || value.fract() != 0.0 || value > MAX_WIRE_INTEGER {
    return None;
  }

  Some(value as usize)
}
