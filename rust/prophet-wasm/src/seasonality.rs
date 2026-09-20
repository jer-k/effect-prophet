/// Complete configuration for one fitted additive seasonal component.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct SeasonalitySpec {
  /// Seasonal period measured in fixed 24-hour days.
  pub period_days: f64,

  /// Number of sine/cosine harmonic pairs.
  pub fourier_order: usize,

  /// Positive coefficient scale used by the MAP prior.
  pub prior_scale: f64,
}
