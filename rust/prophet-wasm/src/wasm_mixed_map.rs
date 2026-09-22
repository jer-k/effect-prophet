use wasm_bindgen::prelude::wasm_bindgen;

use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::mixed_map::{
  ComponentMode, MixedTrendInput, MixedTrendModel, fit_mixed_map, predict_mixed_map,
};
use crate::piecewise_linear::PiecewiseTrend;
use crate::piecewise_map::{MapControls, resolve_automatic_changepoints};
use crate::seasonality::SeasonalitySpec;
use crate::target_scaling::{ScalingMode, TargetScaling};
use crate::wasm_map::{
  PiecewiseMapFitStatus, PiecewiseMapPredictionStatus, prediction_error_frame, status_for_fit_error,
};
use crate::wasm_protocol::{parse_nonnegative_integer, parse_positive_integer};

struct ParsedMetadata {
  masks: Vec<u8>,
  offsets: Vec<usize>,
  counts: Vec<usize>,
}

/// Fit a mixed additive/multiplicative linear MAP model through one checked WASM call.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_mixed_linear_map(
  timestamps: &[f64],
  values: &[f64],
  scaling_mode: f64,
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_prior_scales: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  changepoint_prior_scale: f64,
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
) -> Vec<f64> {
  let Some(scaling) = ScalingMode::from_code(scaling_mode) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(seasonalities) =
    parse_seasonalities(periods_days, fourier_orders, Some(seasonal_prior_scales))
  else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Some(controls) = parse_controls(max_iterations, relative_tolerance, absolute_tolerance)
  else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(changepoints) = parse_changepoints(
    timestamps,
    changepoint_mode,
    explicit_changepoints,
    automatic_count,
    automatic_range,
  ) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(metadata) = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    additional_prior_scales,
    additional_component_offsets,
    additional_component_counts,
  ) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };

  match fit_mixed_map(
    timestamps,
    values,
    MixedTrendInput::Linear {
      changepoints: &changepoints,
    },
    &seasonalities,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(additional_prior_scales, &metadata.offsets, &metadata.counts),
    &modes,
    changepoint_prior_scale,
    controls,
    scaling,
  ) {
    Ok(model) => pack_linear_fit(model),
    Err(error) => fit_error(status_for_fit_error(error)),
  }
}

/// Fit a mixed additive/multiplicative reduced flat MAP model.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_mixed_flat_map(
  timestamps: &[f64],
  values: &[f64],
  scaling_mode: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_prior_scales: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
) -> Vec<f64> {
  let Some(scaling) = ScalingMode::from_code(scaling_mode) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(seasonalities) =
    parse_seasonalities(periods_days, fourier_orders, Some(seasonal_prior_scales))
  else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Some(controls) = parse_controls(max_iterations, relative_tolerance, absolute_tolerance)
  else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(metadata) = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    additional_prior_scales,
    additional_component_offsets,
    additional_component_counts,
  ) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };

  match fit_mixed_map(
    timestamps,
    values,
    MixedTrendInput::Flat,
    &seasonalities,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(additional_prior_scales, &metadata.offsets, &metadata.counts),
    &modes,
    0.05,
    controls,
    scaling,
  ) {
    Ok(model) => pack_flat_fit(model),
    Err(error) => fit_error(status_for_fit_error(error)),
  }
}

/// Predict a mixed linear MAP batch with dimensionally tagged component effects.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_mixed_linear_map(
  timestamps: &[f64],
  scaling_mode: f64,
  target_offset: f64,
  target_scale: f64,
  intercept: f64,
  slope: f64,
  time_origin: f64,
  time_scale: f64,
  changepoint_timestamps: &[f64],
  deltas: &[f64],
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_coefficients: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_coefficients: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
) -> Vec<f64> {
  let trend = MixedTrendModel::Linear(PiecewiseTrend {
    intercept,
    slope,
    time_origin,
    time_scale,
    changepoint_timestamps: changepoint_timestamps.to_vec(),
    deltas: deltas.to_vec(),
  });

  predict_protocol(
    timestamps,
    scaling_mode,
    target_offset,
    target_scale,
    &trend,
    noise_scale,
    periods_days,
    fourier_orders,
    seasonal_coefficients,
    seasonality_masks,
    additional_column_count,
    additional_values,
    additional_coefficients,
    additional_component_offsets,
    additional_component_counts,
    column_modes,
  )
}

/// Predict a mixed reduced-flat MAP batch.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_mixed_flat_map(
  timestamps: &[f64],
  scaling_mode: f64,
  target_offset: f64,
  target_scale: f64,
  level: f64,
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_coefficients: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_coefficients: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
) -> Vec<f64> {
  predict_protocol(
    timestamps,
    scaling_mode,
    target_offset,
    target_scale,
    &MixedTrendModel::Flat { level },
    noise_scale,
    periods_days,
    fourier_orders,
    seasonal_coefficients,
    seasonality_masks,
    additional_column_count,
    additional_values,
    additional_coefficients,
    additional_component_offsets,
    additional_component_counts,
    column_modes,
  )
}

#[allow(clippy::too_many_arguments)]
fn predict_protocol(
  timestamps: &[f64],
  scaling_mode: f64,
  target_offset: f64,
  target_scale: f64,
  trend: &MixedTrendModel,
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_coefficients: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_coefficients: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
) -> Vec<f64> {
  let Ok(scaling) = TargetScaling::parse(scaling_mode, target_offset, target_scale) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidModel);
  };
  let Ok(seasonalities) = parse_seasonalities(periods_days, fourier_orders, None) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };
  let placeholder_priors = vec![1.0; additional_columns];
  let Ok(metadata) = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    &placeholder_priors,
    additional_component_offsets,
    additional_component_counts,
  ) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };

  match predict_mixed_map(
    timestamps,
    scaling,
    trend,
    noise_scale,
    &seasonalities,
    seasonal_coefficients,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(&placeholder_priors, &metadata.offsets, &metadata.counts),
    additional_coefficients,
    &modes,
  ) {
    Ok(prediction) => success_frame(prediction.values()),
    Err(error) => prediction_error_frame(error),
  }
}

fn pack_linear_fit(model: crate::mixed_map::MixedMapModel) -> Vec<f64> {
  let MixedTrendModel::Linear(trend) = model.trend else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let changepoint_count = trend.changepoint_timestamps.len();
  let mut packed = Vec::with_capacity(
    16 + changepoint_count * 2 + model.coefficients.len() + model.additional_coefficients.len(),
  );
  let termination = termination_code(model.summary.termination);

  packed.extend_from_slice(&[
    0.0,
    model.target_scaling.mode.code(),
    model.target_scaling.offset,
    model.target_scaling.scale,
    changepoint_count as f64,
    trend.intercept,
    trend.slope,
    trend.time_origin,
    trend.time_scale,
    model.summary.value_scale,
    model.noise_scale,
    model.summary.observation_count as f64,
    model.summary.iterations as f64,
    model.summary.objective,
    model.summary.stationarity_residual,
    termination,
  ]);
  packed.extend_from_slice(&trend.changepoint_timestamps);
  packed.extend_from_slice(&trend.deltas);
  packed.extend_from_slice(&model.coefficients);
  packed.extend_from_slice(&model.additional_coefficients);
  packed
}

fn pack_flat_fit(model: crate::mixed_map::MixedMapModel) -> Vec<f64> {
  let MixedTrendModel::Flat { level } = model.trend else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let mut packed =
    Vec::with_capacity(12 + model.coefficients.len() + model.additional_coefficients.len());

  packed.extend_from_slice(&[
    0.0,
    model.target_scaling.mode.code(),
    model.target_scaling.offset,
    model.target_scaling.scale,
    level,
    model.noise_scale,
    model.summary.value_scale,
    model.summary.observation_count as f64,
    model.summary.iterations as f64,
    model.summary.objective,
    model.summary.stationarity_residual,
    termination_code(model.summary.termination),
  ]);
  packed.extend_from_slice(&model.coefficients);
  packed.extend_from_slice(&model.additional_coefficients);
  packed
}

fn termination_code(termination: crate::piecewise_map::MapTermination) -> f64 {
  match termination {
    crate::piecewise_map::MapTermination::Converged => 0.0,
    crate::piecewise_map::MapTermination::ConstantTargetShortcut => 1.0,
  }
}

fn parse_modes(values: &[f64]) -> Result<Vec<ComponentMode>, ()> {
  values
    .iter()
    .map(|value| match *value {
      0.0 => Ok(ComponentMode::Additive),
      1.0 => Ok(ComponentMode::Multiplicative),
      _ => Err(()),
    })
    .collect()
}

#[allow(clippy::too_many_arguments)]
fn parse_metadata(
  row_count: usize,
  seasonal_component_count: usize,
  masks: &[f64],
  additional_column_count: usize,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  component_offsets: &[f64],
  component_counts: &[f64],
) -> Result<ParsedMetadata, ()> {
  if masks.len() != row_count.checked_mul(seasonal_component_count).ok_or(())?
    || additional_values.len() != row_count.checked_mul(additional_column_count).ok_or(())?
    || additional_prior_scales.len() != additional_column_count
    || component_offsets.len() != component_counts.len()
  {
    return Err(());
  }

  let masks = masks
    .iter()
    .map(|value| match *value {
      0.0 => Ok(0),
      1.0 => Ok(1),
      _ => Err(()),
    })
    .collect::<Result<Vec<_>, _>>()?;
  let offsets = component_offsets
    .iter()
    .map(|value| parse_nonnegative_integer(*value).ok_or(()))
    .collect::<Result<Vec<_>, _>>()?;
  let counts = component_counts
    .iter()
    .map(|value| parse_positive_integer(*value).ok_or(()))
    .collect::<Result<Vec<_>, _>>()?;

  Ok(ParsedMetadata {
    masks,
    offsets,
    counts,
  })
}

fn parse_seasonalities(
  periods: &[f64],
  orders: &[f64],
  priors: Option<&[f64]>,
) -> Result<Vec<SeasonalitySpec>, ()> {
  if periods.len() != orders.len() || priors.is_some_and(|values| values.len() != periods.len()) {
    return Err(());
  }

  periods
    .iter()
    .zip(orders)
    .enumerate()
    .map(|(index, (&period, &order))| {
      let prior = priors.map_or(1.0, |values| values[index]);
      let fourier_order = parse_positive_integer(order).ok_or(())?;

      if !period.is_finite() || period <= 0.0 || !prior.is_finite() || prior <= 0.0 {
        return Err(());
      }

      Ok(SeasonalitySpec {
        period_days: period,
        fourier_order,
        prior_scale: prior,
      })
    })
    .collect()
}

fn parse_controls(max_iterations: f64, relative: f64, absolute: f64) -> Option<MapControls> {
  if !relative.is_finite() || relative <= 0.0 || !absolute.is_finite() || absolute <= 0.0 {
    return None;
  }

  Some(MapControls {
    max_iterations: parse_positive_integer(max_iterations)?,
    relative_tolerance: relative,
    absolute_tolerance: absolute,
  })
}

fn parse_changepoints(
  timestamps: &[f64],
  mode: f64,
  explicit: &[f64],
  count: f64,
  range: f64,
) -> Result<Vec<f64>, ()> {
  if mode == 0.0 {
    if count != 0.0 || range != 0.0 {
      return Err(());
    }

    return Ok(explicit.to_vec());
  }

  if mode != 1.0 || !explicit.is_empty() {
    return Err(());
  }

  let count = parse_nonnegative_integer(count).ok_or(())?;
  resolve_automatic_changepoints(timestamps, count, range).map_err(|_| ())
}

fn mask_view<'a>(
  rows: usize,
  components: usize,
  metadata: &'a ParsedMetadata,
) -> SeasonalityMaskView<'a> {
  SeasonalityMaskView {
    row_count: rows,
    component_count: components,
    values: &metadata.masks,
  }
}

fn matrix_view(rows: usize, columns: usize, values: &[f64]) -> FeatureMatrixView<'_> {
  FeatureMatrixView {
    row_count: rows,
    column_count: columns,
    values,
  }
}

fn layout_view<'a>(
  priors: &'a [f64],
  offsets: &'a [usize],
  counts: &'a [usize],
) -> AdditionalFeatureLayoutView<'a> {
  AdditionalFeatureLayoutView {
    prior_scales: priors,
    component_offsets: offsets,
    component_counts: counts,
  }
}

fn fit_error(status: PiecewiseMapFitStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

fn prediction_error(status: PiecewiseMapPredictionStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

fn success_frame(values: &[f64]) -> Vec<f64> {
  let mut packed = Vec::with_capacity(values.len().saturating_add(1));
  packed.push(0.0);
  packed.extend_from_slice(values);
  packed
}

#[cfg(test)]
mod tests {
  use super::{fit_mixed_flat_map, predict_mixed_flat_map};

  #[test]
  fn frames_flat_mixed_fit_and_prediction() {
    let fit = fit_mixed_flat_map(
      &[0.0, 1.0, 2.0, 3.0, 4.0, 5.0],
      &[11.0, 8.0, 10.5, 11.0, 9.5, 10.0],
      0.0,
      &[],
      &[],
      &[],
      &[],
      1.0,
      &[1.0, -1.0, 0.5, 1.0, -0.5, 0.0],
      &[10.0],
      &[0.0],
      &[1.0],
      &[1.0],
      10_000.0,
      1e-10,
      1e-12,
    );

    assert_eq!(fit[0], 0.0);
    assert_eq!(fit.len(), 13);

    let prediction = predict_mixed_flat_map(
      &[6.0],
      fit[1],
      fit[2],
      fit[3],
      fit[4],
      fit[5],
      &[],
      &[],
      &[],
      &[],
      1.0,
      &[2.0],
      &[fit[12]],
      &[0.0],
      &[1.0],
      &[1.0],
    );

    assert_eq!(prediction[0], 0.0);
    assert_eq!(prediction.len(), 6);
    assert_eq!(prediction[2], 0.0);
    assert_eq!(prediction[3], prediction[5]);
  }

  #[test]
  fn rejects_fractional_and_unknown_modes_before_fitting() {
    for mode in [0.5, 2.0, f64::NAN] {
      let packed = fit_mixed_flat_map(
        &[0.0, 1.0],
        &[1.0, 2.0],
        0.0,
        &[],
        &[],
        &[],
        &[],
        1.0,
        &[1.0, 1.0],
        &[10.0],
        &[0.0],
        &[1.0],
        &[mode],
        10.0,
        1e-10,
        1e-12,
      );

      assert_eq!(packed, vec![4.0]);
    }
  }
}
