//! Predictive simulation and component ranges from posterior draws, like Python's
//! `sample_posterior_predictive` and `predict_seasonal_components` after `mcmc_samples`.
//!
//! Python runs `ceil(uncertainty_samples / draws)` paths for each draw, so sample `s` uses draw
//! `s / per_draw`. Paths come from one sample-major stream, as in the MAP simulation, so a
//! single draw reproduces the MAP simulation exactly. Rows are produced one at a time.

use crate::logistic_map::{LogisticParameters, LogisticPredictionTrend, stable_sigmoid};
use crate::map_uncertainty::{
  MAX_CELLS, MAX_ROWS, PathProcess, PredictiveIntervals, PredictiveSamples, SampleOffsets,
  SimulationError, SimulationOptions, draw_sample_paths, future_shift, row_interval, zeroed,
};
use crate::mixed_map::ComponentMode;
use crate::mixed_mcmc::MAX_DRAWS;
use crate::piecewise_linear::PiecewiseTrend;
use crate::quantile::sorted_quantile;
use crate::target_scaling::{LogisticScaling, TargetScaling};

/// Most samples one row may hold: Python's per-draw rounding can pass the request by a draw less
/// than the number of draws.
pub const MAX_POSTERIOR_SAMPLES: usize = crate::map_uncertainty::MAX_SAMPLES + MAX_DRAWS;

/// The trend family the draws describe, with the scaling it was fitted with.
#[derive(Clone, Copy, Debug)]
pub enum PosteriorTrend<'a> {
  Linear {
    time_origin: f64,
    time_scale: f64,
    changepoints: &'a [f64],
    scaling: TargetScaling,
  },
  Flat {
    scaling: TargetScaling,
  },
  /// Dimensionless rate, offset and rate changes, with each prediction row's capacity and the
  /// training floor policy.
  Logistic {
    time_origin: f64,
    time_scale: f64,
    changepoints: &'a [f64],
    scaling: LogisticScaling,
    capacities: &'a [f64],
    floors: Option<&'a [f64]>,
  },
}

/// Draws laid out as `MixedMcmcModel::draws` or `LogisticMcmcModel::draws`, with the modes they
/// were fitted with.
#[derive(Clone, Copy, Debug)]
pub struct PosteriorDraws<'a> {
  pub trend: PosteriorTrend<'a>,
  pub count: usize,
  pub values: &'a [f64],
  pub modes: &'a [ComponentMode],
}

/// Each draw's trend, checked once before any row.
enum DrawTrends<'a> {
  Linear(Vec<PiecewiseTrend>),
  Flat,
  Logistic(Vec<LogisticPredictionTrend<'a>>),
}

impl<'a> PosteriorDraws<'a> {
  fn trend_width(&self) -> usize {
    match self.trend {
      PosteriorTrend::Linear { changepoints, .. }
      | PosteriorTrend::Logistic { changepoints, .. } => 2 + changepoints.len(),
      PosteriorTrend::Flat { .. } => 1,
    }
  }

  /// Training time origin and scale, for trends that change over time.
  fn time_bounds(&self) -> Option<(f64, f64, usize)> {
    match self.trend {
      PosteriorTrend::Linear {
        time_origin,
        time_scale,
        changepoints,
        ..
      }
      | PosteriorTrend::Logistic {
        time_origin,
        time_scale,
        changepoints,
        ..
      } => Some((time_origin, time_scale, changepoints.len())),
      PosteriorTrend::Flat { .. } => None,
    }
  }

  /// The Laplace scale of draw `index`'s future rate changes: Python's mean |delta| + 1e-8, in
  /// the scaled units the trend uses.
  fn delta_scale(&self, index: usize) -> f64 {
    let (unit, count) = match self.trend {
      PosteriorTrend::Linear {
        scaling,
        changepoints,
        ..
      } => (scaling.scale, changepoints.len()),
      PosteriorTrend::Logistic { changepoints, .. } => (1.0, changepoints.len()),
      PosteriorTrend::Flat { .. } => return 0.0,
    };
    let deltas = &self.draw(index)[2..2 + count];
    let mean = if deltas.is_empty() {
      0.0
    } else {
      deltas.iter().map(|delta| (delta / unit).abs()).sum::<f64>() / deltas.len() as f64
    };

    mean + 1e-8
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
    if self.count == 0
      || self.count > MAX_DRAWS
      || self.count.checked_mul(self.width()) != Some(self.values.len())
    {
      return Err(SimulationError::InvalidShape);
    }

    let finite_scaling = match self.trend {
      PosteriorTrend::Linear { scaling, .. } | PosteriorTrend::Flat { scaling } => {
        scaling.offset.is_finite() && scaling.scale.is_finite() && scaling.scale > 0.0
      }
      PosteriorTrend::Logistic { scaling, .. } => scaling.scale.is_finite() && scaling.scale > 0.0,
    };

    if !finite_scaling
      || self.values.iter().any(|value| !value.is_finite())
      || (0..self.count).any(|index| self.noise(index) <= 0.0)
    {
      return Err(SimulationError::InvalidModel);
    }

    Ok(())
  }

  /// Logistic parameters for every draw, which `trends` borrows.
  fn logistic_parameters(&self) -> Vec<LogisticParameters> {
    let PosteriorTrend::Logistic { changepoints, .. } = self.trend else {
      return Vec::new();
    };

    (0..self.count)
      .map(|index| {
        let draw = self.draw(index);

        LogisticParameters {
          rate: draw[0],
          offset: draw[1],
          deltas: draw[2..2 + changepoints.len()].to_vec(),
        }
      })
      .collect()
  }

  /// Each draw's trend, checked once.
  fn trends<'p>(
    &self,
    logistic: &'p [LogisticParameters],
  ) -> Result<DrawTrends<'p>, SimulationError> {
    match self.trend {
      PosteriorTrend::Linear {
        time_origin,
        time_scale,
        changepoints,
        ..
      } => (0..self.count)
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
        .collect::<Result<Vec<_>, _>>()
        .map(DrawTrends::Linear),
      PosteriorTrend::Flat { .. } => Ok(DrawTrends::Flat),
      PosteriorTrend::Logistic {
        time_origin,
        time_scale,
        changepoints,
        ..
      } => {
        let training_end = time_origin + time_scale;

        if !time_origin.is_finite()
          || !time_scale.is_finite()
          || time_scale <= 0.0
          || !training_end.is_finite()
          || changepoints.iter().enumerate().any(|(index, &point)| {
            !point.is_finite()
              || point < time_origin
              || point > training_end
              || (index > 0 && point < changepoints[index - 1])
          })
        {
          return Err(SimulationError::InvalidModel);
        }

        Ok(DrawTrends::Logistic(
          logistic
            .iter()
            .map(|parameters| {
              LogisticPredictionTrend::new(parameters, time_origin, time_scale, changepoints)
            })
            .collect(),
        ))
      }
    }
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

/// Fill one row's terms for every draw. Linear and flat trends are restored to observation
/// units; logistic ones stay on the logit scale, which the capacity maps after any change.
fn row_terms(
  draws: &PosteriorDraws<'_>,
  trends: &DrawTrends<'_>,
  timestamp: f64,
  features: &[f64],
  row: usize,
  terms: &mut RowTerms,
) -> Result<(), SimulationError> {
  let failed = |_| SimulationError::NonFiniteResult { row, sample: 0 };

  for index in 0..draws.count {
    let trend = match (trends, draws.trend) {
      (DrawTrends::Linear(trends), PosteriorTrend::Linear { scaling, .. }) => {
        let relative = trends[index]
          .evaluate(timestamp, row)
          .map_err(|_| SimulationError::NonFiniteResult { row, sample: 0 })?;
        scaling.restore_trend(relative).map_err(failed)?
      }
      (DrawTrends::Flat, PosteriorTrend::Flat { scaling }) => scaling
        .restore_trend(draws.draw(index)[0])
        .map_err(failed)?,
      (
        DrawTrends::Logistic(trends),
        PosteriorTrend::Logistic {
          time_origin,
          time_scale,
          ..
        },
      ) => trends[index]
        .eta((timestamp - time_origin) / time_scale)
        .map_err(|_| SimulationError::NonFiniteResult { row, sample: 0 })?,
      _ => return Err(SimulationError::InvalidModel),
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

    terms.trend[index] = trend;
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

  if let PosteriorTrend::Logistic {
    scaling,
    capacities,
    floors,
    ..
  } = draws.trend
  {
    if capacities.len() != count || floors.is_some_and(|floors| floors.len() != count) {
      return Err(SimulationError::InvalidShape);
    }

    for (row, &capacity) in capacities.iter().enumerate() {
      let floor = scaling
        .row_floor(floors, row)
        .map_err(|_| SimulationError::InvalidModel)?;

      if !capacity.is_finite() || capacity <= floor {
        return Err(SimulationError::InvalidShape);
      }
    }
  }

  let Some((time_origin, time_scale, changepoints)) = draws.time_bounds() else {
    return Ok(0.0);
  };

  let horizon = rows
    .timestamps
    .iter()
    .map(|timestamp| (timestamp - time_origin) / time_scale - 1.0)
    .fold(0.0, f64::max);

  if horizon > 20.0 || changepoints as f64 * horizon > 256.0 {
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
  let logistic = draws.logistic_parameters();
  let trends = draws.trends(&logistic)?;

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

  // Future rate changes only reach past the history, and only for trends that change.
  let changepoints = draws.time_bounds().map_or(0, |(_, _, count)| count);
  let rate = if horizon > 0.0 {
    changepoints as f64
  } else {
    0.0
  };
  let delta_scales: Vec<f64> = if rate > 0.0 {
    (0..draws.count)
      .map(|index| draws.delta_scale(index))
      .collect()
  } else {
    Vec::new()
  };

  if delta_scales
    .iter()
    .any(|scale| !scale.is_finite() || *scale <= 0.0)
  {
    return Err(SimulationError::InvalidModel);
  }

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

    let time = draws
      .time_bounds()
      .map_or(0.0, |(origin, scale, _)| (timestamp - origin) / scale);
    let floor = match draws.trend {
      PosteriorTrend::Logistic {
        scaling, floors, ..
      } => scaling
        .row_floor(floors, row)
        .map_err(|_| SimulationError::InvalidModel)?,
      _ => 0.0,
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
      let trend = match draws.trend {
        PosteriorTrend::Linear { scaling, .. } => terms.trend[draw] + scaling.scale * shift,
        PosteriorTrend::Flat { .. } => terms.trend[draw],
        PosteriorTrend::Logistic { capacities, .. } => {
          floor + (capacities[row] - floor) * stable_sigmoid(terms.trend[draw] + shift)
        }
      };
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

/// Draws read only for their feature coefficients: each row holds `trend_width` trend values, the
/// noise, then one coefficient per mode.
#[derive(Clone, Copy, Debug)]
pub struct DrawCoefficients<'a> {
  pub count: usize,
  pub values: &'a [f64],
  pub trend_width: usize,
  pub modes: &'a [ComponentMode],
}

impl DrawCoefficients<'_> {
  fn coefficients(&self, index: usize) -> &[f64] {
    let width = self.trend_width + 1 + self.modes.len();
    &self.values[index * width + self.trend_width + 1..(index + 1) * width]
  }
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
  draws: DrawCoefficients<'_>,
  timestamps: &[f64],
  features: &[f64],
  components: ComponentColumns<'_>,
  interval_width: f64,
) -> Result<Vec<f64>, SimulationError> {
  if !interval_width.is_finite() || interval_width <= 0.0 || interval_width >= 1.0 {
    return Err(SimulationError::InvalidOptions);
  }

  let columns = draws.modes.len();

  if draws.count == 0
    || draws.count > MAX_DRAWS
    || draws
      .trend_width
      .checked_add(1 + columns)
      .and_then(|width| width.checked_mul(draws.count))
      != Some(draws.values.len())
    || draws.values.iter().any(|value| !value.is_finite())
  {
    return Err(SimulationError::InvalidModel);
  }

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
