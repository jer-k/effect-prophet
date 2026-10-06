//! Seeded scalar-path MAP predictive simulation. No Effect, WASM or global RNG state.

use crate::logistic_map::{LogisticParameters, LogisticPredictionTrend, stable_sigmoid};
use crate::piecewise_linear::PiecewiseTrend;
use crate::simulation_rng::{SamplerError, SimulationRng};
use crate::target_scaling::{LogisticScaling, TargetScaling};

const MAX_ROWS: usize = 10_000;
const MAX_SAMPLES: usize = 2_048;
const MAX_CELLS: usize = 1_000_000;
const MAX_NEW_EVENTS: usize = 1_000_000;
const MAX_POISSON_STEPS: usize = 2_000_000;
const MAX_WORKSPACE_BYTES: usize = 64 * 1024 * 1024;

/// Checked linear/flat MAP trend state borrowed for one simulation request.
#[derive(Clone, Copy)]
pub enum SimulationTrend<'a> {
  /// Fitted output-unit linear trend, resolved candidates and train-derived scale.
  Linear {
    trend: &'a PiecewiseTrend,
    scaling: TargetScaling,
  },
  /// Constant output-unit level relative to the target offset.
  Flat { level: f64, scaling: TargetScaling },
  /// Method-specific public trend with explicit row capacities and floor policy.
  Logistic {
    parameters: &'a LogisticParameters,
    scaling: LogisticScaling,
    capacities: &'a [f64],
    floors: Option<&'a [f64]>,
    time_origin: f64,
    time_scale: f64,
    changepoints: &'a [f64],
  },
}

/// Complete fixed inputs for one batch; each slice has the same row count.
#[derive(Clone, Copy)]
pub struct SimulationRows<'a> {
  pub timestamps: &'a [f64],
  pub additive: &'a [f64],
  pub multiplicative: &'a [f64],
}

/// Explicit local simulation options; `seed` zero and `samples` one are valid.
#[derive(Clone, Copy)]
pub struct SimulationOptions {
  pub seed: u32,
  pub samples: usize,
  pub interval_width: f64,
}

/// Newly owned row-major predictive trend and observation draws.
pub struct PredictiveSamples {
  pub rows: usize,
  pub samples: usize,
  pub trend: Vec<f64>,
  pub value: Vec<f64>,
}

/// Newly owned row-major interval values `[trend_low, trend_high, value_low, value_high]`.
pub struct PredictiveIntervals {
  pub rows: usize,
  pub values: Vec<f64>,
}

/// Expected invalid input, bounded resource or numerical failure; never partial success.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum SimulationError {
  InvalidShape,
  InvalidOptions,
  InvalidModel,
  ResourceLimit,
  NonFiniteResult { row: usize, sample: usize },
}

pub(crate) fn checked_cells(rows: usize, samples: usize) -> Result<usize, SimulationError> {
  checked_interval_budget(rows, samples)?;

  let cells = rows
    .checked_mul(samples)
    .ok_or(SimulationError::ResourceLimit)?;
  let sample_bytes = cells
    .checked_mul(2 * size_of::<f64>())
    .ok_or(SimulationError::ResourceLimit)?;
  let scratch_bytes = rows
    .checked_mul(4 * size_of::<f64>())
    .and_then(|bytes| bytes.checked_add(samples * size_of::<f64>()))
    .ok_or(SimulationError::ResourceLimit)?;

  if cells > MAX_CELLS || sample_bytes + scratch_bytes > MAX_WORKSPACE_BYTES {
    return Err(SimulationError::ResourceLimit);
  }

  Ok(cells)
}

/// Interval output holds one row of draws at a time, so only rows and samples are bounded.
pub(crate) fn checked_interval_budget(rows: usize, samples: usize) -> Result<(), SimulationError> {
  if rows > MAX_ROWS || samples == 0 || samples > MAX_SAMPLES {
    return Err(SimulationError::ResourceLimit);
  }

  Ok(())
}

fn finite_scaling(scaling: TargetScaling) -> bool {
  scaling.offset.is_finite() && scaling.scale.is_finite() && scaling.scale > 0.0
}

fn future_shift(time: f64, events: &[(f64, f64)]) -> f64 {
  events
    .iter()
    .filter(|event| time > event.0)
    .map(|event| event.1 * (time - event.0))
    .sum()
}

fn sampler_failure(error: SamplerError, sample: usize) -> SimulationError {
  match error {
    SamplerError::Exhausted => SimulationError::ResourceLimit,
    SamplerError::NonFinite => SimulationError::NonFiniteResult { row: 0, sample },
  }
}

fn zeroed(length: usize) -> Result<Vec<f64>, SimulationError> {
  let mut values = Vec::new();
  values
    .try_reserve_exact(length)
    .map_err(|_| SimulationError::ResourceLimit)?;
  values.resize(length, 0.0);

  Ok(values)
}

/// Validated rows, fixed per-row trends and the future changepoint process of one request.
struct PreparedSimulation<'a> {
  model: SimulationTrend<'a>,
  noise_scale: f64,
  rows: SimulationRows<'a>,
  baseline: Vec<f64>,
  horizon: f64,
  rate: f64,
  delta_scale: f64,
}

/// Validate model, dimensions and deterministic row values before any RNG or allocation.
fn prepare<'a>(
  model: SimulationTrend<'a>,
  noise_scale: f64,
  rows: SimulationRows<'a>,
  options: SimulationOptions,
  budget: fn(usize, usize) -> Result<(), SimulationError>,
) -> Result<PreparedSimulation<'a>, SimulationError> {
  let count = rows.timestamps.len();

  if rows.additive.len() != count || rows.multiplicative.len() != count {
    return Err(SimulationError::InvalidShape);
  }

  if !options.interval_width.is_finite()
    || options.interval_width <= 0.0
    || options.interval_width >= 1.0
  {
    return Err(SimulationError::InvalidOptions);
  }

  budget(count, options.samples)?;

  if !noise_scale.is_finite() || noise_scale <= 0.0 {
    return Err(SimulationError::InvalidModel);
  }

  match model {
    SimulationTrend::Linear { trend, scaling } => {
      trend
        .validate()
        .map_err(|_| SimulationError::InvalidModel)?;
      if !finite_scaling(scaling) {
        return Err(SimulationError::InvalidModel);
      }
    }
    SimulationTrend::Flat { level, scaling } => {
      if !level.is_finite() || !finite_scaling(scaling) {
        return Err(SimulationError::InvalidModel);
      }
    }
    SimulationTrend::Logistic {
      parameters,
      scaling,
      capacities,
      floors,
      time_origin,
      time_scale,
      changepoints,
      ..
    } => {
      let training_end = time_origin + time_scale;
      if !scaling.scale.is_finite()
        || scaling.scale <= 0.0
        || !time_origin.is_finite()
        || !time_scale.is_finite()
        || time_scale <= 0.0
        || !training_end.is_finite()
        || !parameters.rate.is_finite()
        || !parameters.offset.is_finite()
        || parameters.deltas.len() != changepoints.len()
        || capacities.len() != count
        || floors.is_some_and(|values| values.len() != count)
        || changepoints.iter().zip(&parameters.deltas).enumerate().any(
          |(index, (&point, &delta))| {
            !point.is_finite()
              || !delta.is_finite()
              || point < time_origin
              || point > training_end
              || (index > 0 && point < changepoints[index - 1])
          },
        )
      {
        return Err(SimulationError::InvalidModel);
      }
    }
  }

  let logistic_trend = match model {
    SimulationTrend::Logistic {
      parameters,
      time_origin,
      time_scale,
      changepoints,
      ..
    } => Some(LogisticPredictionTrend::new(
      parameters,
      time_origin,
      time_scale,
      changepoints,
    )),
    _ => None,
  };

  let mut baseline = Vec::new();
  baseline
    .try_reserve_exact(count)
    .map_err(|_| SimulationError::ResourceLimit)?;
  let mut horizon: f64 = 0.0;

  for (row, &timestamp) in rows.timestamps.iter().enumerate() {
    if !timestamp.is_finite()
      || !rows.additive[row].is_finite()
      || !rows.multiplicative[row].is_finite()
    {
      return Err(SimulationError::InvalidShape);
    }

    let relative = match model {
      SimulationTrend::Linear { trend, .. } => {
        let t = (timestamp - trend.time_origin) / trend.time_scale;
        horizon = horizon.max(t - 1.0);
        trend
          .evaluate(timestamp, row)
          .map_err(|_| SimulationError::NonFiniteResult { row, sample: 0 })?
      }
      SimulationTrend::Flat { level, .. } => level,
      SimulationTrend::Logistic {
        scaling,
        capacities,
        floors,
        time_origin,
        time_scale,
        ..
      } => {
        let floor = scaling
          .row_floor(floors, row)
          .map_err(|_| SimulationError::InvalidModel)?;
        if !capacities[row].is_finite() || capacities[row] <= floor {
          return Err(SimulationError::InvalidShape);
        }
        let t = (timestamp - time_origin) / time_scale;
        horizon = horizon.max(t - 1.0);
        logistic_trend
          .as_ref()
          .ok_or(SimulationError::InvalidModel)?
          .eta(t)
          .map_err(|_| SimulationError::NonFiniteResult { row, sample: 0 })?
      }
    };
    let fixed = match model {
      SimulationTrend::Linear { scaling, .. } | SimulationTrend::Flat { scaling, .. } => scaling
        .restore_trend(relative)
        .map_err(|_| SimulationError::NonFiniteResult { row, sample: 0 })?,
      SimulationTrend::Logistic { .. } => relative,
    };
    baseline.push(fixed);
  }

  let (rate, delta_scale) = match model {
    SimulationTrend::Linear { trend, scaling } if horizon > 0.0 => {
      if horizon > 20.0 || (trend.deltas.len() as f64) * horizon > 256.0 {
        return Err(SimulationError::ResourceLimit);
      }

      let sum: f64 = trend
        .deltas
        .iter()
        .map(|delta| (delta / scaling.scale).abs())
        .sum();
      let mean = if trend.deltas.is_empty() {
        0.0
      } else {
        sum / trend.deltas.len() as f64
      };
      let scale = mean + 1e-8;

      if !scale.is_finite() || scale <= 0.0 {
        return Err(SimulationError::InvalidModel);
      }

      (trend.deltas.len() as f64, scale)
    }
    SimulationTrend::Logistic { parameters, .. } if horizon > 0.0 => {
      if horizon > 20.0 || (parameters.deltas.len() as f64) * horizon > 256.0 {
        return Err(SimulationError::ResourceLimit);
      }

      let mean = if parameters.deltas.is_empty() {
        0.0
      } else {
        parameters
          .deltas
          .iter()
          .map(|delta| delta.abs())
          .sum::<f64>()
          / parameters.deltas.len() as f64
      };
      let scale = mean + 1e-8;
      if !scale.is_finite() || scale <= 0.0 {
        return Err(SimulationError::InvalidModel);
      }
      (parameters.deltas.len() as f64, scale)
    }
    _ => (0.0, 0.0),
  };

  Ok(PreparedSimulation {
    model,
    noise_scale,
    rows,
    baseline,
    horizon,
    rate,
    delta_scale,
  })
}

/// Each sample's sorted future slope changes and the RNG state that starts its row noise.
struct SamplePaths {
  events: Vec<(f64, f64)>,
  offsets: Vec<usize>,
  noise: Vec<SimulationRng>,
}

/// Draw every sample's changes in the original sample-major stream order.
///
/// Sample `s` draws its changes, then two uniforms per row of noise, before sample `s + 1`
/// starts. Saving the stream at each noise start lets rows be emitted in any order with
/// exactly the draws a sample-major loop would produce.
fn draw_paths(
  prepared: &PreparedSimulation<'_>,
  options: SimulationOptions,
) -> Result<SamplePaths, SimulationError> {
  let count = prepared.rows.timestamps.len();
  let mut rng = SimulationRng::new(options.seed);
  let mut events = Vec::<(f64, f64)>::new();
  let mut offsets = Vec::new();
  let mut noise = Vec::new();
  let mut remaining_steps = MAX_POISSON_STEPS;

  offsets
    .try_reserve_exact(options.samples + 1)
    .map_err(|_| SimulationError::ResourceLimit)?;
  noise
    .try_reserve_exact(options.samples)
    .map_err(|_| SimulationError::ResourceLimit)?;
  offsets.push(0);

  for sample in 0..options.samples {
    let start = events.len();

    if prepared.rate > 0.0 {
      let changes = rng
        .poisson(prepared.rate * prepared.horizon, &mut remaining_steps)
        .map_err(|error| sampler_failure(error, sample))?;

      if changes > MAX_NEW_EVENTS - start {
        return Err(SimulationError::ResourceLimit);
      }
      events
        .try_reserve(changes)
        .map_err(|_| SimulationError::ResourceLimit)?;

      for _ in 0..changes {
        events.push((1.0 + prepared.horizon * rng.uniform(), 0.0));
      }
      events[start..].sort_unstable_by(|left, right| left.0.total_cmp(&right.0));

      for event in &mut events[start..] {
        event.1 = rng.laplace(prepared.delta_scale);
      }
    }

    offsets.push(events.len());
    noise.push(rng.clone());
    rng.discard(2 * count);
  }

  Ok(SamplePaths {
    events,
    offsets,
    noise,
  })
}

/// Fill one row's trend and observation draws for every sample, advancing each noise stream.
fn draw_row(
  prepared: &PreparedSimulation<'_>,
  paths: &mut SamplePaths,
  row: usize,
  trend_draws: &mut [f64],
  value_draws: &mut [f64],
) -> Result<(), SimulationError> {
  let rows = prepared.rows;
  let timestamp = rows.timestamps[row];
  let fixed = prepared.baseline[row];

  let time = match prepared.model {
    SimulationTrend::Linear { trend, .. } => (timestamp - trend.time_origin) / trend.time_scale,
    SimulationTrend::Flat { .. } => 0.0,
    SimulationTrend::Logistic {
      time_origin,
      time_scale,
      ..
    } => (timestamp - time_origin) / time_scale,
  };
  let floor = match prepared.model {
    SimulationTrend::Logistic {
      scaling, floors, ..
    } => scaling
      .row_floor(floors, row)
      .map_err(|_| SimulationError::InvalidModel)?,
    _ => 0.0,
  };

  for (sample, noise) in paths.noise.iter_mut().enumerate() {
    let events = &paths.events[paths.offsets[sample]..paths.offsets[sample + 1]];
    let shift = future_shift(time, events);
    let trend = match prepared.model {
      SimulationTrend::Linear { scaling, .. } => fixed + scaling.scale * shift,
      SimulationTrend::Flat { .. } => fixed,
      SimulationTrend::Logistic { capacities, .. } => {
        floor + (capacities[row] - floor) * stable_sigmoid(fixed + shift)
      }
    };
    let value = trend * (1.0 + rows.multiplicative[row])
      + rows.additive[row]
      + prepared.noise_scale * noise.normal();

    if !trend.is_finite() || !value.is_finite() {
      return Err(SimulationError::NonFiniteResult { row, sample });
    }

    trend_draws[sample] = trend;
    value_draws[sample] = value;
  }

  Ok(())
}

/// Draw one shared future trend path per sample and independent row observation errors.
pub fn simulate_map(
  model: SimulationTrend<'_>,
  noise_scale: f64,
  rows: SimulationRows<'_>,
  options: SimulationOptions,
) -> Result<PredictiveSamples, SimulationError> {
  let prepared = prepare(model, noise_scale, rows, options, |rows, samples| {
    checked_cells(rows, samples).map(|_| ())
  })?;
  let count = rows.timestamps.len();
  let cells = count * options.samples;
  let mut paths = draw_paths(&prepared, options)?;
  let mut trend_draws = zeroed(cells)?;
  let mut value_draws = zeroed(cells)?;

  for row in 0..count {
    let draws = row * options.samples..(row + 1) * options.samples;
    draw_row(
      &prepared,
      &mut paths,
      row,
      &mut trend_draws[draws.clone()],
      &mut value_draws[draws],
    )?;
  }

  Ok(PredictiveSamples {
    rows: count,
    samples: options.samples,
    trend: trend_draws,
    value: value_draws,
  })
}

pub use simulate_map as simulate_linear_flat;

/// Reduce the same draws as `simulate_map` to intervals while holding one row at a time.
pub fn simulate_intervals(
  model: SimulationTrend<'_>,
  noise_scale: f64,
  rows: SimulationRows<'_>,
  options: SimulationOptions,
) -> Result<PredictiveIntervals, SimulationError> {
  let prepared = prepare(model, noise_scale, rows, options, checked_interval_budget)?;
  let count = rows.timestamps.len();
  let mut paths = draw_paths(&prepared, options)?;
  let mut trend_draws = zeroed(options.samples)?;
  let mut value_draws = zeroed(options.samples)?;
  let mut values = Vec::new();

  values
    .try_reserve_exact(count * 4)
    .map_err(|_| SimulationError::ResourceLimit)?;

  for row in 0..count {
    draw_row(
      &prepared,
      &mut paths,
      row,
      &mut trend_draws,
      &mut value_draws,
    )?;

    for draws in [&mut trend_draws, &mut value_draws] {
      let (lower, upper) = row_interval(draws, options.interval_width, row)?;
      values.push(lower);
      values.push(upper);
    }
  }

  Ok(PredictiveIntervals {
    rows: count,
    values,
  })
}

fn quantile(sorted: &[f64], probability: f64) -> f64 {
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

/// Sort one row's draws in place and return its equal-tailed `[lower, upper]` bounds.
fn row_interval(draws: &mut [f64], width: f64, row: usize) -> Result<(f64, f64), SimulationError> {
  if draws.iter().any(|value| !value.is_finite()) {
    return Err(SimulationError::NonFiniteResult { row, sample: 0 });
  }

  draws.sort_unstable_by(f64::total_cmp);
  let lower = quantile(draws, (1.0 - width) / 2.0);
  let upper = quantile(draws, (1.0 + width) / 2.0);

  if !lower.is_finite() || !upper.is_finite() || lower > upper {
    return Err(SimulationError::NonFiniteResult { row, sample: 0 });
  }

  Ok((lower, upper))
}

/// Reduce already-generated samples without mutating their column identity.
pub fn reduce_intervals(
  samples: &PredictiveSamples,
  width: f64,
) -> Result<PredictiveIntervals, SimulationError> {
  if !width.is_finite() || width <= 0.0 || width >= 1.0 {
    return Err(SimulationError::InvalidOptions);
  }

  let cells = checked_cells(samples.rows, samples.samples)?;
  if samples.trend.len() != cells || samples.value.len() != cells {
    return Err(SimulationError::InvalidShape);
  }

  let length = samples
    .rows
    .checked_mul(4)
    .ok_or(SimulationError::ResourceLimit)?;
  let mut values = Vec::new();
  let mut sorted = Vec::new();
  values
    .try_reserve_exact(length)
    .map_err(|_| SimulationError::ResourceLimit)?;
  sorted
    .try_reserve_exact(samples.samples)
    .map_err(|_| SimulationError::ResourceLimit)?;

  for row in 0..samples.rows {
    for source in [&samples.trend, &samples.value] {
      let start = row * samples.samples;
      sorted.clear();
      sorted.extend_from_slice(&source[start..start + samples.samples]);

      let (lower, upper) = row_interval(&mut sorted, width, row)?;
      values.push(lower);
      values.push(upper);
    }
  }

  Ok(PredictiveIntervals {
    rows: samples.rows,
    values,
  })
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::target_scaling::ScalingMode;

  const SCALING: TargetScaling = TargetScaling {
    mode: ScalingMode::AbsMax,
    offset: 10.0,
    scale: 2.0,
  };
  const OPTIONS: SimulationOptions = SimulationOptions {
    seed: 42,
    samples: 128,
    interval_width: 0.8,
  };

  fn rows<'a>(
    timestamps: &'a [f64],
    additive: &'a [f64],
    multiplicative: &'a [f64],
  ) -> SimulationRows<'a> {
    SimulationRows {
      timestamps,
      additive,
      multiplicative,
    }
  }

  fn linear(deltas: Vec<f64>) -> PiecewiseTrend {
    PiecewiseTrend {
      intercept: 2.0,
      slope: 4.0,
      time_origin: 0.0,
      time_scale: 10.0,
      changepoint_timestamps: if deltas.is_empty() { vec![] } else { vec![5.0] },
      deltas,
    }
  }

  #[test]
  fn flat_and_empty_point_paths_are_fixed_but_observation_errors_differ() {
    let input = rows(&[10.0, 20.0, 20.0, 5.0], &[1.0; 4], &[0.0; 4]);
    let flat = simulate_linear_flat(
      SimulationTrend::Flat {
        level: 3.0,
        scaling: SCALING,
      },
      0.2,
      input,
      OPTIONS,
    )
    .unwrap();
    assert!(flat.trend.iter().all(|value| *value == 13.0));
    assert_ne!(flat.value[0], flat.value[OPTIONS.samples]);

    let empty = linear(vec![]);
    let draws = simulate_linear_flat(
      SimulationTrend::Linear {
        trend: &empty,
        scaling: SCALING,
      },
      0.2,
      rows(&[20.0, 20.0], &[0.0; 2], &[-1.0; 2]),
      OPTIONS,
    )
    .unwrap();
    assert_eq!(draws.trend[0], draws.trend[OPTIONS.samples]);
    assert_ne!(draws.value[0], draws.value[OPTIONS.samples]);
  }

  #[test]
  fn historical_only_and_zero_delta_candidates_preserve_distinct_event_policies() {
    let historical = linear(vec![0.5]);
    let history = simulate_map(
      SimulationTrend::Linear {
        trend: &historical,
        scaling: SCALING,
      },
      0.2,
      rows(&[5.0, 10.0, 5.0], &[0.0; 3], &[0.0; 3]),
      OPTIONS,
    )
    .unwrap();

    for row in 0..3 {
      let draws = &history.trend[row * OPTIONS.samples..(row + 1) * OPTIONS.samples];
      assert!(draws.iter().all(|value| *value == draws[0]));
    }
    assert_eq!(history.trend[0], history.trend[2 * OPTIONS.samples]);
    assert_ne!(history.value[0], history.value[2 * OPTIONS.samples]);

    let no_candidates = linear(vec![]);
    let resolved_zero = linear(vec![0.0]);
    let historical_value = SCALING.offset + resolved_zero.evaluate(20.0, 0).unwrap();
    let fixed = simulate_map(
      SimulationTrend::Linear {
        trend: &no_candidates,
        scaling: SCALING,
      },
      0.2,
      rows(&[20.0], &[0.0], &[0.0]),
      OPTIONS,
    )
    .unwrap();
    let tiny_changes = simulate_map(
      SimulationTrend::Linear {
        trend: &resolved_zero,
        scaling: SCALING,
      },
      0.2,
      rows(&[20.0], &[0.0], &[0.0]),
      OPTIONS,
    )
    .unwrap();

    assert!(fixed.trend.iter().all(|value| *value == historical_value));
    assert!(
      tiny_changes
        .trend
        .iter()
        .any(|value| *value != historical_value)
    );
    assert!(
      tiny_changes
        .trend
        .iter()
        .all(|value| (*value - historical_value).abs() < 1e-6)
    );
  }

  #[test]
  fn logistic_draws_share_a_continuous_logit_path_across_different_row_bounds() {
    let parameters = LogisticParameters {
      rate: 1.0,
      offset: 0.5,
      deltas: vec![0.2],
    };
    let scaling = LogisticScaling::parse(0.0, 10.0, 1.0, 0.0).unwrap();
    let capacities = [10.0, 20.0, 10.0];
    let floors = [0.0, 2.0, 0.0];
    let model = SimulationTrend::Logistic {
      parameters: &parameters,
      scaling,
      capacities: &capacities,
      floors: Some(&floors),
      time_origin: 0.0,
      time_scale: 10.0,
      changepoints: &[5.0],
    };
    let draws = simulate_map(
      model,
      0.2,
      rows(&[20.0, 20.0, 5.0], &[0.0; 3], &[0.0; 3]),
      OPTIONS,
    )
    .unwrap();

    for sample in 0..OPTIONS.samples {
      let first = draws.trend[sample] / 10.0;
      let second = (draws.trend[OPTIONS.samples + sample] - 2.0) / 18.0;
      assert!((first - second).abs() < 1e-14);
      assert!(first > 0.0 && first < 1.0);
      assert_eq!(draws.trend[2 * OPTIONS.samples + sample], 5.0);
    }
    assert_ne!(draws.value[0], draws.value[OPTIONS.samples]);
  }

  #[test]
  fn logistic_rate_crossings_stay_bounded_and_zero_post_change_rates_fail() {
    let capacities = [10.0, 12.0];
    let scaling = LogisticScaling::parse(0.0, 10.0, 0.0, 0.0).unwrap();
    let simulate = |parameters: &LogisticParameters| {
      simulate_map(
        SimulationTrend::Logistic {
          parameters,
          scaling,
          capacities: &capacities,
          floors: None,
          time_origin: 0.0,
          time_scale: 10.0,
          changepoints: &[5.0],
        },
        0.2,
        rows(&[20.0, 30.0], &[0.0; 2], &[0.0; 2]),
        OPTIONS,
      )
    };

    let crossing = LogisticParameters {
      rate: 0.25,
      offset: 0.4,
      deltas: vec![-0.5],
    };
    let draws = simulate(&crossing).unwrap();

    for (row, &capacity) in capacities.iter().enumerate() {
      assert!(
        draws.trend[row * OPTIONS.samples..(row + 1) * OPTIONS.samples]
          .iter()
          .all(|value| value.is_finite() && *value > 0.0 && *value < capacity)
      );
    }
    assert!(draws.value.iter().all(|value| value.is_finite()));

    // Prophet's gamma recurrence divides by each post-change rate.
    let zero = LogisticParameters {
      rate: 0.0,
      offset: 0.4,
      deltas: vec![0.0],
    };
    assert!(matches!(
      simulate(&zero),
      Err(SimulationError::NonFiniteResult { row: 0, sample: 0 })
    ));
  }

  #[test]
  fn replays_interleaved_calls_and_preserves_owned_row_major_buffers() {
    let trend = linear(vec![0.5]);
    let input = || rows(&[20.0, 5.0, 20.0], &[1.0; 3], &[-1.5; 3]);
    let first = simulate_linear_flat(
      SimulationTrend::Linear {
        trend: &trend,
        scaling: SCALING,
      },
      0.2,
      input(),
      OPTIONS,
    )
    .unwrap();
    let _other = simulate_linear_flat(
      SimulationTrend::Flat {
        level: 3.0,
        scaling: SCALING,
      },
      0.2,
      input(),
      OPTIONS,
    )
    .unwrap();
    let replay = simulate_linear_flat(
      SimulationTrend::Linear {
        trend: &trend,
        scaling: SCALING,
      },
      0.2,
      input(),
      OPTIONS,
    )
    .unwrap();
    assert_eq!(first.trend, replay.trend);
    assert_eq!(first.value, replay.value);
    assert_eq!(first.trend[0], first.trend[OPTIONS.samples * 2]);
    assert_ne!(first.value[0], first.value[OPTIONS.samples * 2]);
    assert!(
      first.trend[OPTIONS.samples..OPTIONS.samples * 2]
        .iter()
        .all(|value| *value == 14.0)
    );
  }

  /// The pre-streaming loop: each sample draws its changes, then every row's noise.
  fn sample_major(
    model: SimulationTrend<'_>,
    input: SimulationRows<'_>,
    options: SimulationOptions,
  ) -> (Vec<f64>, Vec<f64>) {
    let SimulationTrend::Linear { trend, scaling } = model else {
      unreachable!("reference covers linear trends")
    };
    let prepared = prepare(model, 0.2, input, options, |_, _| Ok(())).unwrap();
    let count = input.timestamps.len();
    let mut rng = SimulationRng::new(options.seed);
    let mut steps = MAX_POISSON_STEPS;
    let mut trend_draws = vec![0.0; count * options.samples];
    let mut value_draws = vec![0.0; count * options.samples];

    for sample in 0..options.samples {
      let changes = rng
        .poisson(prepared.rate * prepared.horizon, &mut steps)
        .unwrap();
      let mut events: Vec<(f64, f64)> = (0..changes)
        .map(|_| (1.0 + prepared.horizon * rng.uniform(), 0.0))
        .collect();
      events.sort_unstable_by(|left, right| left.0.total_cmp(&right.0));
      for event in &mut events {
        event.1 = rng.laplace(prepared.delta_scale);
      }

      for row in 0..count {
        let time = (input.timestamps[row] - trend.time_origin) / trend.time_scale;
        let draw = prepared.baseline[row] + scaling.scale * future_shift(time, &events);
        let index = row * options.samples + sample;
        trend_draws[index] = draw;
        value_draws[index] =
          draw * (1.0 + input.multiplicative[row]) + input.additive[row] + 0.2 * rng.normal();
      }
    }

    (trend_draws, value_draws)
  }

  #[test]
  fn row_streaming_replays_the_sample_major_draw_stream() {
    let trend = linear(vec![0.5]);
    let model = SimulationTrend::Linear {
      trend: &trend,
      scaling: SCALING,
    };
    let input = rows(
      &[5.0, 12.0, 20.0, 31.0, 15.0],
      &[1.0, 0.0, -2.0, 0.5, 0.0],
      &[0.0, 0.25, -0.5, 0.0, 1.0],
    );

    for seed in [0, 42, u32::MAX] {
      let options = SimulationOptions { seed, ..OPTIONS };
      let streamed = simulate_map(model, 0.2, input, options).unwrap();
      let (trend_draws, value_draws) = sample_major(model, input, options);

      assert_eq!(streamed.trend, trend_draws, "seed {seed}");
      assert_eq!(streamed.value, value_draws, "seed {seed}");
      let future = &streamed.trend[3 * OPTIONS.samples..4 * OPTIONS.samples];
      assert!(future.iter().any(|draw| *draw != future[0]));
    }
  }

  #[test]
  fn streamed_intervals_reduce_the_same_draws_beyond_the_sample_budget() {
    let trend = linear(vec![0.5]);
    let model = SimulationTrend::Linear {
      trend: &trend,
      scaling: SCALING,
    };
    let input = rows(&[5.0, 12.0, 20.0, 31.0], &[1.0; 4], &[0.0, 0.25, -0.5, 0.0]);
    let streamed = simulate_intervals(model, 0.2, input, OPTIONS).unwrap();
    let draws = simulate_map(model, 0.2, input, OPTIONS).unwrap();

    assert_eq!(
      streamed.values,
      reduce_intervals(&draws, OPTIONS.interval_width)
        .unwrap()
        .values
    );

    let timestamps: Vec<f64> = (0..1_001).map(|row| 5.0 + row as f64 * 0.02).collect();
    let zeros = vec![0.0; timestamps.len()];
    let large = rows(&timestamps, &zeros, &zeros);
    let options = SimulationOptions {
      samples: 1_000,
      ..OPTIONS
    };

    assert!(matches!(
      simulate_map(model, 0.2, large, options),
      Err(SimulationError::ResourceLimit)
    ));
    let intervals = simulate_intervals(model, 0.2, large, options).unwrap();
    assert_eq!(intervals.rows, 1_001);
    assert_eq!(intervals.values.len(), 4 * 1_001);
  }

  #[test]
  fn intervals_reduce_the_same_samples_without_mutating_them() {
    let samples = PredictiveSamples {
      rows: 2,
      samples: 4,
      trend: vec![4.0, 1.0, 2.0, 3.0, 9.0, 9.0, 9.0, 9.0],
      value: vec![10.0, 20.0, 30.0, 40.0, -2.0, -2.0, 2.0, 2.0],
    };
    let intervals = reduce_intervals(&samples, 0.5).unwrap();
    assert_eq!(
      intervals.values,
      [1.75, 3.25, 17.5, 32.5, 9.0, 9.0, -2.0, 2.0]
    );
    assert_eq!(samples.trend[0..4], [4.0, 1.0, 2.0, 3.0]);
  }

  #[test]
  fn forced_future_changes_are_continuous_at_the_training_end_and_event() {
    let events = [(1.25, -0.5), (1.75, 0.25)];

    assert_eq!(future_shift(1.0, &events), 0.0);
    assert_eq!(future_shift(1.25, &events), 0.0);
    assert_eq!(future_shift(1.5, &events), -0.125);
    assert_eq!(future_shift(2.0, &events), -0.3125);
    assert_eq!(SCALING.scale * future_shift(2.0, &events), -0.625);
  }

  #[test]
  fn seeded_future_moments_match_independent_compound_poisson_variance() {
    let model = linear(vec![0.5]);
    // Compound Poisson of Laplace slopes integrated over one normalized future span:
    // Var(G) = scale² * 2 * r * b² * h³ / 3. Fixed M multiplies only trend variance.
    let expected_trend = SCALING.offset + model.evaluate(20.0, 0).unwrap();
    let b = 0.5 / SCALING.scale + 1e-8;
    let theoretical =
      1.5_f64.powi(2) * SCALING.scale.powi(2) * 2.0 * b.powi(2) / 3.0 + 0.2_f64.powi(2);

    for seed in [42, 99] {
      let options = SimulationOptions {
        seed,
        samples: 2_048,
        ..OPTIONS
      };
      let draws = simulate_linear_flat(
        SimulationTrend::Linear {
          trend: &model,
          scaling: SCALING,
        },
        0.2,
        rows(&[20.0], &[1.0], &[0.5]),
        options,
      )
      .unwrap();
      let trend_mean = draws.trend.iter().sum::<f64>() / options.samples as f64;
      let value_mean = draws.value.iter().sum::<f64>() / options.samples as f64;
      let variance = draws
        .value
        .iter()
        .map(|value| (value - value_mean).powi(2))
        .sum::<f64>()
        / options.samples as f64;

      assert!((trend_mean - expected_trend).abs() < 0.08, "seed {seed}");
      assert!((variance - theoretical).abs() < 0.12, "seed {seed}");
    }
  }

  #[test]
  fn one_sample_ties_extreme_widths_and_bad_quantile_buffers_are_checked() {
    let single = PredictiveSamples {
      rows: 1,
      samples: 1,
      trend: vec![4.0],
      value: vec![-2.0],
    };
    assert_eq!(
      reduce_intervals(&single, 0.8).unwrap().values,
      [4.0, 4.0, -2.0, -2.0]
    );

    let tied = PredictiveSamples {
      rows: 1,
      samples: 5,
      trend: vec![1.0, 1.0, 2.0, 4.0, 4.0],
      value: vec![-2.0, -2.0, -2.0, 3.0, 3.0],
    };
    assert_eq!(
      reduce_intervals(&tied, 0.5).unwrap().values,
      [1.0, 4.0, -2.0, 3.0]
    );
    let narrow = reduce_intervals(&tied, f64::MIN_POSITIVE).unwrap();
    let wide = reduce_intervals(&tied, 1.0 - f64::EPSILON).unwrap();
    assert!(wide.values[0] <= narrow.values[0] && narrow.values[1] <= wide.values[1]);
    assert_eq!(tied.trend, [1.0, 1.0, 2.0, 4.0, 4.0]);

    assert_eq!(
      reduce_intervals(&tied, 0.0).err(),
      Some(SimulationError::InvalidOptions)
    );
    assert_eq!(
      reduce_intervals(&tied, f64::NAN).err(),
      Some(SimulationError::InvalidOptions)
    );
    assert_eq!(
      reduce_intervals(
        &PredictiveSamples {
          value: vec![],
          ..single
        },
        0.8
      )
      .err(),
      Some(SimulationError::InvalidShape)
    );
    assert_eq!(
      reduce_intervals(
        &PredictiveSamples {
          trend: vec![f64::NAN],
          value: vec![0.0],
          rows: 1,
          samples: 1
        },
        0.8
      )
      .err(),
      Some(SimulationError::NonFiniteResult { row: 0, sample: 0 })
    );
  }

  #[test]
  fn quantiles_preserve_saturated_plateaus_and_ordered_finite_extremes() {
    let plateau = 91.4363479694379;
    let constant = PredictiveSamples {
      rows: 1,
      samples: 128,
      trend: vec![plateau; 128],
      value: vec![-plateau; 128],
    };

    for width in [f64::MIN_POSITIVE, 0.8, 1.0 - f64::EPSILON] {
      assert_eq!(
        reduce_intervals(&constant, width).unwrap().values,
        [plateau, plateau, -plateau, -plateau]
      );
    }

    let next = f64::from_bits(plateau.to_bits() + 1);
    let close = PredictiveSamples {
      trend: (0..128)
        .map(|index| if index < 64 { plateau } else { next })
        .collect(),
      value: vec![-f64::MAX, f64::MAX]
        .into_iter()
        .cycle()
        .take(128)
        .collect(),
      ..constant
    };

    let intervals = reduce_intervals(&close, 0.8).unwrap();
    assert_eq!(intervals.values[0], plateau);
    assert_eq!(intervals.values[1], next);
    assert!(intervals.values[2].is_finite() && intervals.values[2] <= intervals.values[3]);
  }

  #[test]
  fn mixed_factors_cancel_or_reverse_trend_without_scaling_observation_noise() {
    let model = linear(vec![0.5]);
    let simulate = |factor| {
      simulate_map(
        SimulationTrend::Linear {
          trend: &model,
          scaling: SCALING,
        },
        0.2,
        rows(&[20.0], &[3.0], &[factor]),
        SimulationOptions {
          samples: 1,
          ..OPTIONS
        },
      )
      .unwrap()
    };
    let normal = simulate(0.0);
    let cancelled = simulate(-1.0);
    let reversed = simulate(-1.5);

    assert_eq!(normal.trend, cancelled.trend);
    assert_eq!(normal.trend, reversed.trend);
    assert!((normal.value[0] - cancelled.value[0] - normal.trend[0]).abs() < 1e-12);
    assert!((reversed.value[0] - cancelled.value[0] + 0.5 * normal.trend[0]).abs() < 1e-12);
  }

  #[test]
  fn invalid_shapes_and_budgets_fail_before_sampling() {
    assert_eq!(
      checked_cells(10_001, 1),
      Err(SimulationError::ResourceLimit)
    );
    assert_eq!(
      checked_cells(500, 2_048),
      Err(SimulationError::ResourceLimit)
    );
    assert_eq!(checked_interval_budget(500, 2_048), Ok(()));
    assert_eq!(checked_interval_budget(10_000, 2_048), Ok(()));
    assert_eq!(
      checked_interval_budget(10_001, 1),
      Err(SimulationError::ResourceLimit)
    );
    assert_eq!(
      checked_interval_budget(1, 2_049),
      Err(SimulationError::ResourceLimit)
    );

    assert!(matches!(
      simulate_linear_flat(
        SimulationTrend::Flat {
          level: 3.0,
          scaling: SCALING
        },
        0.2,
        rows(&[1.0], &[], &[0.0]),
        OPTIONS
      ),
      Err(SimulationError::InvalidShape)
    ));
    assert!(matches!(
      simulate_linear_flat(
        SimulationTrend::Flat {
          level: 3.0,
          scaling: SCALING
        },
        0.2,
        rows(&[1.0], &[0.0], &[0.0]),
        SimulationOptions {
          samples: 0,
          ..OPTIONS
        }
      ),
      Err(SimulationError::ResourceLimit)
    ));
    assert!(matches!(
      simulate_linear_flat(
        SimulationTrend::Flat {
          level: 3.0,
          scaling: SCALING
        },
        f64::NAN,
        rows(&[1.0], &[0.0], &[0.0]),
        OPTIONS
      ),
      Err(SimulationError::InvalidModel)
    ));
    assert!(matches!(
      simulate_linear_flat(
        SimulationTrend::Flat {
          level: 3.0,
          scaling: SCALING
        },
        0.2,
        rows(&[1.0], &[0.0], &[0.0]),
        SimulationOptions {
          interval_width: 1.0,
          ..OPTIONS
        }
      ),
      Err(SimulationError::InvalidOptions)
    ));
  }
}
