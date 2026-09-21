use wasm_bindgen::prelude::wasm_bindgen;

use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::piecewise_linear::PiecewiseTrend;
use crate::piecewise_map::{
  MapControls, fit_piecewise_map_with_features as fit_map_kernel,
  predict_piecewise_map_with_features as predict_map_kernel, resolve_automatic_changepoints,
};
use crate::seasonality::SeasonalitySpec;
use crate::wasm_map::{
  PiecewiseMapFitStatus, PiecewiseMapPredictionStatus, prediction_error_frame, status_for_fit_error,
};
use crate::wasm_protocol::{parse_nonnegative_integer, parse_positive_integer};

#[derive(Debug)]
struct ParsedFeatureMetadata {
  masks: Vec<u8>,
  offsets: Vec<usize>,
  counts: Vec<usize>,
}

/// Fit masked seasonalities and known additive columns through one piecewise MAP WASM call.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_piecewise_map_with_features(
  timestamps: &[f64],
  values: &[f64],
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
  changepoint_prior_scale: f64,
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
) -> Vec<f64> {
  let seasonalities =
    match parse_seasonalities(periods_days, fourier_orders, Some(seasonal_prior_scales)) {
      Ok(value) => value,
      Err(_) => {
        return vec![f64::from(
          PiecewiseMapFitStatus::InvalidConfiguration as u32,
        )];
      }
    };
  let controls = match parse_controls(max_iterations, relative_tolerance, absolute_tolerance) {
    Some(value) => value,
    None => {
      return vec![f64::from(
        PiecewiseMapFitStatus::InvalidConfiguration as u32,
      )];
    }
  };
  let changepoints = match parse_changepoints(
    timestamps,
    changepoint_mode,
    explicit_changepoints,
    automatic_count,
    automatic_range,
  ) {
    Ok(value) => value,
    Err(status) => return vec![f64::from(status as u32)],
  };
  let additional_columns = match parse_nonnegative_integer(additional_column_count) {
    Some(value) => value,
    None => {
      return vec![f64::from(
        PiecewiseMapFitStatus::InvalidConfiguration as u32,
      )];
    }
  };
  let metadata = match parse_feature_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    additional_prior_scales,
    additional_component_offsets,
    additional_component_counts,
  ) {
    Ok(value) => value,
    Err(()) => {
      return vec![f64::from(
        PiecewiseMapFitStatus::InvalidConfiguration as u32,
      )];
    }
  };

  match fit_map_kernel(
    timestamps,
    values,
    &changepoints,
    &seasonalities,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(additional_prior_scales, &metadata.offsets, &metadata.counts),
    changepoint_prior_scale,
    controls,
  ) {
    Ok(model) => {
      let changepoint_count = model.trend.changepoint_timestamps.len();
      let Some(capacity) = changepoint_count
        .checked_mul(2)
        .and_then(|count| count.checked_add(model.coefficients.len()))
        .and_then(|count| count.checked_add(model.additional_coefficients.len()))
        .and_then(|count| count.checked_add(13))
      else {
        return vec![f64::from(PiecewiseMapFitStatus::SizeOverflow as u32)];
      };
      let termination = match model.summary.termination {
        crate::piecewise_map::MapTermination::Converged => 0.0,
        crate::piecewise_map::MapTermination::ConstantTargetShortcut => 1.0,
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.extend_from_slice(&[
        f64::from(PiecewiseMapFitStatus::Success as u32),
        changepoint_count as f64,
        model.trend.intercept,
        model.trend.slope,
        model.trend.time_origin,
        model.trend.time_scale,
        model.summary.value_scale,
        model.noise_scale,
        model.summary.observation_count as f64,
        model.summary.iterations as f64,
        model.summary.objective,
        model.summary.stationarity_residual,
        termination,
      ]);
      packed.extend_from_slice(&model.trend.changepoint_timestamps);
      packed.extend_from_slice(&model.trend.deltas);
      packed.extend_from_slice(&model.coefficients);
      packed.extend_from_slice(&model.additional_coefficients);

      packed
    }
    Err(error) => vec![f64::from(status_for_fit_error(error) as u32)],
  }
}

/// Predict grouped masked-seasonal and additional piecewise MAP contributions.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_piecewise_map_with_features(
  timestamps: &[f64],
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
) -> Vec<f64> {
  let seasonalities = match parse_seasonalities(periods_days, fourier_orders, None) {
    Ok(value) => value,
    Err(_) => {
      return vec![f64::from(
        PiecewiseMapPredictionStatus::InvalidConfiguration as u32,
      )];
    }
  };
  let additional_columns = match parse_nonnegative_integer(additional_column_count) {
    Some(value) => value,
    None => {
      return vec![f64::from(
        PiecewiseMapPredictionStatus::InvalidConfiguration as u32,
      )];
    }
  };
  let placeholder_priors = vec![1.0; additional_columns];
  let metadata = match parse_feature_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    &placeholder_priors,
    additional_component_offsets,
    additional_component_counts,
  ) {
    Ok(value) => value,
    Err(()) => {
      return vec![f64::from(
        PiecewiseMapPredictionStatus::InvalidConfiguration as u32,
      )];
    }
  };
  let trend = PiecewiseTrend {
    intercept,
    slope,
    time_origin,
    time_scale,
    changepoint_timestamps: changepoint_timestamps.to_vec(),
    deltas: deltas.to_vec(),
  };

  match predict_map_kernel(
    timestamps,
    &trend,
    noise_scale,
    &seasonalities,
    seasonal_coefficients,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(&placeholder_priors, &metadata.offsets, &metadata.counts),
    additional_coefficients,
  ) {
    Ok(prediction) => success_frame(prediction.values()),
    Err(error) => prediction_error_frame(error),
  }
}

#[allow(clippy::too_many_arguments)]
fn parse_feature_metadata(
  row_count: usize,
  seasonal_component_count: usize,
  masks: &[f64],
  additional_column_count: usize,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  component_offsets: &[f64],
  component_counts: &[f64],
) -> Result<ParsedFeatureMetadata, ()> {
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

  Ok(ParsedFeatureMetadata {
    masks,
    offsets,
    counts,
  })
}

fn mask_view<'a>(
  rows: usize,
  components: usize,
  metadata: &'a ParsedFeatureMetadata,
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

fn parse_seasonalities(
  periods: &[f64],
  orders: &[f64],
  priors: Option<&[f64]>,
) -> Result<Vec<SeasonalitySpec>, PiecewiseMapFitStatus> {
  if periods.len() != orders.len() || priors.is_some_and(|values| values.len() != periods.len()) {
    return Err(PiecewiseMapFitStatus::LengthMismatch);
  }

  periods
    .iter()
    .zip(orders)
    .enumerate()
    .map(|(index, (&period, &order))| {
      let prior = priors.map_or(1.0, |values| values[index]);
      let fourier_order =
        parse_positive_integer(order).ok_or(PiecewiseMapFitStatus::InvalidConfiguration)?;

      if !period.is_finite() || period <= 0.0 || !prior.is_finite() || prior <= 0.0 {
        return Err(PiecewiseMapFitStatus::InvalidConfiguration);
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
) -> Result<Vec<f64>, PiecewiseMapFitStatus> {
  if mode == 0.0 {
    if count != 0.0 || range != 0.0 {
      return Err(PiecewiseMapFitStatus::InvalidConfiguration);
    }

    return Ok(explicit.to_vec());
  }

  if mode != 1.0 || !explicit.is_empty() {
    return Err(PiecewiseMapFitStatus::InvalidConfiguration);
  }

  let count =
    parse_nonnegative_integer(count).ok_or(PiecewiseMapFitStatus::InvalidConfiguration)?;

  resolve_automatic_changepoints(timestamps, count, range).map_err(status_for_fit_error)
}

fn success_frame(values: &[f64]) -> Vec<f64> {
  let mut packed = Vec::with_capacity(values.len().saturating_add(1));
  packed.push(0.0);
  packed.extend_from_slice(values);
  packed
}
