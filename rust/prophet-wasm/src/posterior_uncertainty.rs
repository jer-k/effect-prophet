//! Predictive simulation and component ranges from posterior draws, like Python's
//! `sample_posterior_predictive` and `predict_seasonal_components` after `mcmc_samples`.
//!
//! Python runs `ceil(uncertainty_samples / draws)` paths for each draw, so sample `s` uses draw
//! `s / per_draw`. Paths come from one sample-major stream, as in the MAP simulation, so a
//! single draw reproduces the MAP simulation exactly. Rows are produced one at a time.

use crate::map_uncertainty::{
  MAX_CELLS, MAX_ROWS, PathProcess, PredictiveIntervals, PredictiveSamples, SampleOffsets,
  SimulationError, SimulationOptions, draw_sample_paths, future_shift, row_interval, zeroed,
};
use crate::mixed_map::ComponentMode;
use crate::mixed_mcmc::MAX_DRAWS;
use crate::piecewise_linear::PiecewiseTrend;
use crate::quantile::sorted_quantile;
use crate::target_scaling::TargetScaling;

/// Most samples one row may hold: Python's per-draw rounding can pass the request by a draw less
/// than the number of draws.
pub const MAX_POSTERIOR_SAMPLES: usize = crate::map_uncertainty::MAX_SAMPLES + MAX_DRAWS;

/// The trend family the draws describe.
#[derive(Clone, Copy, Debug)]
pub enum PosteriorTrend<'a> {
  Linear {
    time_origin: f64,
    time_scale: f64,
    changepoints: &'a [f64],
  },
  Flat,
}

/// Draws laid out as `MixedMcmcModel::draws`, with the scaling and modes they were fitted with.
#[derive(Clone, Copy, Debug)]
pub struct PosteriorDraws<'a> {
  pub trend: PosteriorTrend<'a>,
  pub scaling: TargetScaling,
  pub count: usize,
  pub values: &'a [f64],
  pub modes: &'a [ComponentMode],
}

impl PosteriorDraws<'_> {
  fn trend_width(&self) -> usize {
    match self.trend {
      PosteriorTrend::Linear { changepoints, .. } => 2 + changepoints.len(),
      PosteriorTrend::Flat => 1,
    }
  }

  fn width(&self) -> usize {
    self.trend_width() + 1 + self.modes.len()
  }

  fn draw(&self, index: usize) -> &[f64] {
    let width = self.width();
    &self.values[index * width..(index + 1) * width]
  }

  fn noise(&self, index: usize) -> f64 {
    self.draw(index)[self.trend_width()]
  }

  fn coefficients(&self, index: usize) -> &[f64] {
    &self.draw(index)[self.trend_width() + 1..]
  }

  fn validate(&self) -> Result<(), SimulationError> {
    let scaling = self.scaling;

    if self.count == 0
      || self.count > MAX_DRAWS
      || self.count.checked_mul(self.width()) != Some(self.values.len())
    {
      return Err(SimulationError::InvalidShape);
    }

    if !scaling.offset.is_finite()
      || !scaling.scale.is_finite()
      || scaling.scale <= 0.0
      || self.values.iter().any(|value| !value.is_finite())
      || (0..self.count).any(|index| self.noise(index) <= 0.0)
    {
      return Err(SimulationError::InvalidModel);
    }

    Ok(())
  }

  /// Each draw's linear trend, checked once.
  fn linear_trends(&self) -> Result<Vec<PiecewiseTrend>, SimulationError> {
    let PosteriorTrend::Linear {
      time_origin,
      time_scale,
      changepoints,
    } = self.trend
    else {
      return Ok(Vec::new());
    };

    (0..self.count)
      .map(|index| {
        let draw = self.draw(index);
        let trend = PiecewiseTrend {
          intercept: draw[0],
          slope: draw[1],
          time_origin,
          time_scale,
          changepoint_timestamps: changepoints.to_vec(),
          deltas: draw[2..2 + changepoints.len()].to_vec(),
        };

        trend
          .validate()
          .map_err(|_| SimulationError::InvalidModel)?;
        Ok(trend)
      })
      .collect()
  }
}

/// Prediction rows: timestamps, their row-major combined feature values and optional offsets.
#[derive(Clone, Copy)]
pub struct PosteriorRows<'a> {
  pub timestamps: &'a [f64],
  pub features: &'a [f64],
  pub offsets: Option<SampleOffsets<'a>>,
}

/// Paths per draw for a requested sample count, as Python rounds it.
#[must_use]
pub fn samples_per_draw(requested: usize, draws: usize) -> usize {
  requested.div_ceil(draws.max(1)).max(1)
}

/// Each draw's restored trend, additive total and multiplicative total at one row.
struct RowTerms {
  trend: Vec<f64>,
  additive: Vec<f64>,
  multiplicative: Vec<f64>,
}

/// Fill one row's terms for every draw.
fn row_terms(
  draws: &PosteriorDraws<'_>,
  trends: &[PiecewiseTrend],
  timestamp: f64,
  features: &[f64],
  row: usize,
  terms: &mut RowTerms,
) -> Result<(), SimulationError> {
  for index in 0..draws.count {
    let relative = match trends.get(index) {
      Some(trend) => trend
        .evaluate(timestamp, row)
        .map_err(|_| SimulationError::NonFiniteResult { row, sample: 0 })?,
      None => draws.draw(index)[0],
    };
    let mut additive = 0.0;
    let mut multiplicative = 0.0;

    for ((feature, coefficient), mode) in features
      .iter()
      .zip(draws.coefficients(index))
      .zip(draws.modes)
    {
      match mode {
        ComponentMode::Additive => additive += feature * coefficient,
        ComponentMode::Multiplicative => multiplicative += feature * coefficient,
      }
    }

    terms.trend[index] = draws
      .scaling
      .restore_trend(relative)
      .map_err(|_| SimulationError::NonFiniteResult { row, sample: 0 })?;
    terms.additive[index] = additive;
    terms.multiplicative[index] = multiplicative;
  }

  Ok(())
}

/// Validate rows and return the scaled-time horizon past the training end.
fn horizon(draws: &PosteriorDraws<'_>, rows: PosteriorRows<'_>) -> Result<f64, SimulationError> {
  let count = rows.timestamps.len();
  let features = draws.modes.len();

  if count.checked_mul(features) != Some(rows.features.len())
    || rows.timestamps.iter().any(|value| !value.is_finite())
    || rows.features.iter().any(|value| !value.is_finite())
  {
    return Err(SimulationError::InvalidShape);
  }

  let PosteriorTrend::Linear {
    time_origin,
    time_scale,
    changepoints,
  } = draws.trend
  else {
    return Ok(0.0);
  };

  let horizon = rows
    .timestamps
    .iter()
    .map(|timestamp| (timestamp - time_origin) / time_scale - 1.0)
    .fold(0.0, f64::max);

  if horizon > 20.0 || changepoints.len() as f64 * horizon > 256.0 {
    return Err(SimulationError::ResourceLimit);
  }

  Ok(horizon)
}

/// Check one simulation's size before any draw: rows, the samples one row holds, and for sample
/// output every returned value.
fn checked_total(
  rows: usize,
  requested: usize,
  draws: usize,
  samples_output: bool,
) -> Result<usize, SimulationError> {
  if rows > MAX_ROWS || requested == 0 || requested > crate::map_uncertainty::MAX_SAMPLES {
    return Err(SimulationError::ResourceLimit);
  }

  let total = samples_per_draw(requested, draws)
    .checked_mul(draws)
    .ok_or(SimulationError::ResourceLimit)?;

  if total > MAX_POSTERIOR_SAMPLES
    || (samples_output
      && rows
        .checked_mul(total)
        .is_none_or(|cells| cells > MAX_CELLS))
  {
    return Err(SimulationError::ResourceLimit);
  }

  Ok(total)
}

/// Sample count and how many paths each draw runs for a request, or a limit failure.
pub fn posterior_sample_count(
  rows: usize,
  requested: usize,
  draws: usize,
  samples_output: bool,
) -> Result<usize, SimulationError> {
  checked_total(rows, requested, draws, samples_output)
}

/// Simulated draws for one posterior request, reduced to intervals or kept whole.
pub enum PosteriorSimulation {
  Intervals(PredictiveIntervals),
  Samples(PredictiveSamples),
}

/// Simulate `options.samples` requested paths, rounded up to whole paths per draw.
pub fn simulate_posterior(
  draws: PosteriorDraws<'_>,
  rows: PosteriorRows<'_>,
  options: SimulationOptions,
  samples_output: bool,
) -> Result<PosteriorSimulation, SimulationError> {
  if !options.interval_width.is_finite()
    || options.interval_width <= 0.0
    || options.interval_width >= 1.0
  {
    return Err(SimulationError::InvalidOptions);
  }

  draws.validate()?;
  let count = rows.timestamps.len();
  let total = checked_total(count, options.samples, draws.count, samples_output)?;
  let per_draw = total / draws.count;
  let horizon = horizon(&draws, rows)?;
  let trends = draws.linear_trends()?;

  if let Some(offsets) = rows.offsets {
    let cells = offsets
      .rows
      .len()
      .checked_mul(total)
      .filter(|&cells| cells <= MAX_CELLS)
      .ok_or(SimulationError::ResourceLimit)?;

    if offsets.additive.len() != cells
      || offsets.multiplicative.len() != cells
      || offsets
        .rows
        .iter()
        .enumerate()
        .any(|(index, &row)| row >= count || (index > 0 && row <= offsets.rows[index - 1]))
      || offsets
        .additive
        .iter()
        .chain(offsets.multiplicative)
        .any(|value| !value.is_finite())
    {
      return Err(SimulationError::InvalidShape);
    }
  }

  // Each draw's Laplace scale for future changes, in scaled units, as Python's mean |delta|.
  let delta_scales: Vec<f64> = match draws.trend {
    PosteriorTrend::Linear { changepoints, .. } if horizon > 0.0 => (0..draws.count)
      .map(|index| {
        let deltas = &draws.draw(index)[2..2 + changepoints.len()];
        let mean = if deltas.is_empty() {
          0.0
        } else {
          deltas
            .iter()
            .map(|delta| (delta / draws.scaling.scale).abs())
            .sum::<f64>()
            / deltas.len() as f64
        };

        mean + 1e-8
      })
      .collect(),
    _ => Vec::new(),
  };

  if delta_scales
    .iter()
    .any(|scale| !scale.is_finite() || *scale <= 0.0)
  {
    return Err(SimulationError::InvalidModel);
  }

  let rate = match draws.trend {
    PosteriorTrend::Linear { changepoints, .. } if horizon > 0.0 => changepoints.len() as f64,
    _ => 0.0,
  };
  let mut paths = draw_sample_paths(
    PathProcess {
      rows: count,
      horizon,
      rate,
    },
    options.seed,
    total,
    |sample| delta_scales.get(sample / per_draw).copied().unwrap_or(0.0),
  )?;

  let mut terms = RowTerms {
    trend: zeroed(draws.count)?,
    additive: zeroed(draws.count)?,
    multiplicative: zeroed(draws.count)?,
  };
  let mut trend_row = zeroed(total)?;
  let mut value_row = zeroed(total)?;
  let mut output = if samples_output {
    PosteriorSimulation::Samples(PredictiveSamples {
      rows: count,
      samples: total,
      trend: zeroed(count * total)?,
      value: zeroed(count * total)?,
    })
  } else {
    let mut values = Vec::new();
    values
      .try_reserve_exact(count * 4)
      .map_err(|_| SimulationError::ResourceLimit)?;
    PosteriorSimulation::Intervals(PredictiveIntervals {
      rows: count,
      values,
    })
  };
  let features = draws.modes.len();

  for (row, &timestamp) in rows.timestamps.iter().enumerate() {
    row_terms(
      &draws,
      &trends,
      timestamp,
      &rows.features[row * features..(row + 1) * features],
      row,
      &mut terms,
    )?;

    let time = match draws.trend {
      PosteriorTrend::Linear {
        time_origin,
        time_scale,
        ..
      } => (timestamp - time_origin) / time_scale,
      PosteriorTrend::Flat => 0.0,
    };
    let offsets = rows.offsets.and_then(|offsets| {
      let start = offsets.rows.binary_search(&row).ok()? * total;

      Some((
        &offsets.additive[start..start + total],
        &offsets.multiplicative[start..start + total],
      ))
    });
    let (events, noise) = paths.split();

    for (sample, noise) in noise.iter_mut().enumerate() {
      let draw = sample / per_draw;
      let shift = future_shift(time, events.get(sample));
      let trend = terms.trend[draw] + draws.scaling.scale * shift;
      let (additive, multiplicative) = match offsets {
        Some((additive, multiplicative)) => (
          terms.additive[draw] + additive[sample],
          terms.multiplicative[draw] + multiplicative[sample],
        ),
        None => (terms.additive[draw], terms.multiplicative[draw]),
      };
      let value = trend * (1.0 + multiplicative) + additive + draws.noise(draw) * noise.normal();

      if !trend.is_finite() || !value.is_finite() {
        return Err(SimulationError::NonFiniteResult { row, sample });
      }

      trend_row[sample] = trend;
      value_row[sample] = value;
    }

    match &mut output {
      PosteriorSimulation::Samples(samples) => {
        samples.trend[row * total..(row + 1) * total].copy_from_slice(&trend_row);
        samples.value[row * total..(row + 1) * total].copy_from_slice(&value_row);
      }
      PosteriorSimulation::Intervals(intervals) => {
        for draws in [&mut trend_row, &mut value_row] {
          let (lower, upper) = row_interval(draws, options.interval_width, row)?;
          intervals.values.push(lower);
          intervals.values.push(upper);
        }
      }
    }
  }

  Ok(output)
}

/// Named components as ranges of combined feature columns.
#[derive(Clone, Copy, Debug)]
pub struct ComponentColumns<'a> {
  /// First column and column count of each named component, seasonalities first.
  pub starts: &'a [usize],
  pub counts: &'a [usize],
}

/// Per row, the `[lower, upper]` range over draws of the additive total, the multiplicative
/// total, then each named component, as Python's `_lower` and `_upper` columns.
///
/// Additive values are in observation units and multiplicative ones are factors, as in
/// Python. Like `np.percentile`, ranges interpolate linearly between sorted draws.
pub fn posterior_component_intervals(
  draws: PosteriorDraws<'_>,
  timestamps: &[f64],
  features: &[f64],
  components: ComponentColumns<'_>,
  interval_width: f64,
) -> Result<Vec<f64>, SimulationError> {
  if !interval_width.is_finite() || interval_width <= 0.0 || interval_width >= 1.0 {
    return Err(SimulationError::InvalidOptions);
  }

  draws.validate()?;
  let columns = draws.modes.len();

  if timestamps.len() > MAX_ROWS
    || timestamps.len().checked_mul(columns) != Some(features.len())
    || features.iter().any(|value| !value.is_finite())
    || components.starts.len() != components.counts.len()
    || components
      .starts
      .iter()
      .zip(components.counts)
      .any(|(start, count)| start.checked_add(*count).is_none_or(|end| end > columns))
  {
    return Err(SimulationError::InvalidShape);
  }

  let series = components.starts.len() + 2;
  let width = (1.0 - interval_width) / 2.0;
  let cells = series
    .checked_mul(draws.count)
    .filter(|&cells| cells <= MAX_CELLS)
    .ok_or(SimulationError::ResourceLimit)?;
  let mut buffer = zeroed(cells)?;
  let mut values = Vec::new();
  values
    .try_reserve_exact(timestamps.len() * series * 2)
    .map_err(|_| SimulationError::ResourceLimit)?;

  for row in 0..timestamps.len() {
    let features = &features[row * columns..(row + 1) * columns];

    for index in 0..draws.count {
      let coefficients = draws.coefficients(index);
      let effect = |column: usize| features[column] * coefficients[column];
      let mut additive = 0.0;
      let mut multiplicative = 0.0;

      for (column, mode) in draws.modes.iter().enumerate() {
        match mode {
          ComponentMode::Additive => additive += effect(column),
          ComponentMode::Multiplicative => multiplicative += effect(column),
        }
      }

      buffer[index] = additive;
      buffer[draws.count + index] = multiplicative;

      for (component, (&start, &count)) in
        components.starts.iter().zip(components.counts).enumerate()
      {
        buffer[(component + 2) * draws.count + index] = (start..start + count).map(effect).sum();
      }
    }

    for series in buffer.chunks_exact_mut(draws.count) {
      if series.iter().any(|value| !value.is_finite()) {
        return Err(SimulationError::NonFiniteResult { row, sample: 0 });
      }

      series.sort_unstable_by(f64::total_cmp);
      values.push(sorted_quantile(series, width));
      values.push(sorted_quantile(series, 1.0 - width));
    }
  }

  Ok(values)
}

#[cfg(test)]
mod tests;
