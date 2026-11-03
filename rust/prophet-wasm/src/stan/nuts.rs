//! Stan 2.37.0's adaptive No-U-Turn sampler with a diagonal Euclidean metric.
//! Ported from mcmc/hmc/{base_hmc,nuts/base_nuts,nuts/adapt_diag_e_nuts}.hpp,
//! mcmc/hmc/hamiltonians/diag_e_metric.hpp, mcmc/hmc/integrators/expl_leapfrog.hpp,
//! mcmc/{stepsize_adaptation,windowed_adaptation,var_adaptation}.hpp and
//! services/util/run_adaptive_sampler.hpp at 1357c136bf22e3f0d25ed3529fea55fe76842eac, and
//! Stan Math's welford_var_estimator.hpp; see third-party/stan-license.txt.
//!
//! Randomness comes from the crate's xoshiro128** generator instead of CmdStan's mixmax, so
//! draws match CmdStan's in distribution, not value for value. Pure numerical loops
//! intentionally have no tracing.

use std::cmp::Ordering;

use crate::map_objective::MapObjectiveError;
use crate::simulation_rng::SimulationRng;
use crate::stan::optimizer::LogDensityEvaluation;

/// Deepest tree accepted, so one transition takes at most 2^20 - 1 leapfrog steps.
pub const MAX_TREE_DEPTH: usize = 20;

/// Energy error past which a trajectory is divergent, Stan's `max_deltaH_`.
const MAX_DELTA_H: f64 = 1000.0;

/// Stan's bounds on the step size searched for after each metric update.
const MAX_STEP_SIZE: f64 = 1e7;

/// CmdStan's `sample` settings for adaptive diagonal-metric NUTS, per chain.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct NutsSettings {
  pub warmup: usize,
  pub draws: usize,
  pub max_depth: usize,
  pub adapt_delta: f64,
  pub adapt_gamma: f64,
  pub adapt_kappa: f64,
  pub adapt_t0: f64,
  pub init_buffer: usize,
  pub term_buffer: usize,
  pub window: usize,
  pub step_size: f64,
}

impl NutsSettings {
  /// CmdStan's defaults for the given warmup and kept draws per chain.
  pub fn cmdstan(warmup: usize, draws: usize) -> Self {
    Self {
      warmup,
      draws,
      max_depth: 10,
      adapt_delta: 0.8,
      adapt_gamma: 0.05,
      adapt_kappa: 0.75,
      adapt_t0: 10.0,
      init_buffer: 75,
      term_buffer: 50,
      window: 25,
      step_size: 1.0,
    }
  }

  fn is_valid(&self) -> bool {
    let unsigned = |value: usize| u32::try_from(value).is_ok();

    self.draws > 0
      && unsigned(self.warmup)
      && unsigned(self.draws)
      && unsigned(self.init_buffer)
      && unsigned(self.term_buffer)
      && unsigned(self.window)
      && (1..=MAX_TREE_DEPTH).contains(&self.max_depth)
      && self.adapt_delta > 0.0
      && self.adapt_delta < 1.0
      && [
        self.adapt_gamma,
        self.adapt_kappa,
        self.adapt_t0,
        self.step_size,
      ]
      .iter()
      .all(|value| value.is_finite() && *value > 0.0)
  }
}

/// One chain's kept draws and sampler statistics, in CmdStan's output order.
#[derive(Clone, Debug, PartialEq)]
pub struct NutsChain {
  /// Row-major `draws × dimension` states in unconstrained coordinates.
  pub draws: Vec<f64>,
  /// CmdStan's `lp__`: the proportional log density, including Jacobians.
  pub log_density: Vec<f64>,
  pub accept_stat: Vec<f64>,
  pub tree_depth: Vec<u32>,
  pub leapfrog_steps: Vec<u32>,
  pub divergent: Vec<bool>,
  pub energy: Vec<f64>,
  /// The step size adaptation settled on, used for every kept draw.
  pub step_size: f64,
  /// The adapted diagonal inverse metric, all ones when the metric was never adapted.
  pub inverse_metric: Vec<f64>,
  /// Divergent transitions during warmup, which CmdStan doesn't save.
  pub warmup_divergences: usize,
}

/// Why sampling couldn't finish. Rejected proposals are not errors.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum NutsError {
  /// The settings, chain count or initial state is malformed.
  InvalidConfiguration,
  /// The density failed for a reason other than rejecting a state.
  Objective(MapObjectiveError),
  /// The density or its gradient isn't finite at the initial state.
  InitialDensity,
  /// The step-size search passed 1e7: Stan's "Posterior is improper".
  ImproperPosterior,
  /// The step-size search reached zero: "No acceptably small step size could be found".
  StepSizeCollapse,
  /// Stan's "Numerical overflow in metric adaptation".
  MetricOverflow,
}

/// Run `chains` independent chains from the same initial state, as CmdStan does for Prophet.
///
/// Chain `c` draws from the seed's stream advanced by `c` jumps of 2^64 outputs. `evaluate`
/// returns the sampling density, Jacobians included. A `NonFiniteResult` from it, or a
/// non-finite value or gradient, rejects the state, as Stan's domain errors do.
pub fn sample_nuts(
  initial: &[f64],
  chains: usize,
  seed: u32,
  settings: NutsSettings,
  evaluate: impl Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
) -> Result<Vec<NutsChain>, NutsError> {
  if chains == 0
    || initial.is_empty()
    || initial.iter().any(|value| !value.is_finite())
    || !settings.is_valid()
  {
    return Err(NutsError::InvalidConfiguration);
  }

  let mut rng = SimulationRng::new(seed);

  (0..chains)
    .map(|_| {
      let chain = run_chain(initial, settings, rng.clone(), &evaluate);
      rng.jump();
      chain
    })
    .collect()
}

/// A phase-space state: position, momentum, potential gradient and potential.
#[derive(Clone)]
struct Point {
  q: Vec<f64>,
  p: Vec<f64>,
  g: Vec<f64>,
  v: f64,
}

impl Point {
  /// Copy another state into this one without reallocating.
  fn assign(&mut self, other: &Point) {
    self.q.copy_from_slice(&other.q);
    self.p.copy_from_slice(&other.p);
    self.g.copy_from_slice(&other.g);
    self.v = other.v;
  }
}

struct Sampler<'a, F> {
  evaluate: &'a F,
  rng: SimulationRng,
  inverse_metric: Vec<f64>,
  z: Point,
  nominal_step_size: f64,
  step_size: f64,
  max_depth: usize,
  depth: usize,
  divergent: bool,
}

/// One subtree's running totals, shared by every leaf `build_tree` reaches.
struct TreeTotals {
  h0: f64,
  sign: f64,
  leapfrog_steps: usize,
  sum_metro_prob: f64,
}

/// Statistics from one transition, as CmdStan reports them.
struct Transition {
  accept_stat: f64,
  energy: f64,
  leapfrog_steps: usize,
}

fn run_chain<F>(
  initial: &[f64],
  settings: NutsSettings,
  rng: SimulationRng,
  evaluate: &F,
) -> Result<NutsChain, NutsError>
where
  F: Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
{
  let dimension = initial.len();
  let mut sampler = Sampler {
    evaluate,
    rng,
    inverse_metric: vec![1.0; dimension],
    z: Point {
      q: initial.to_vec(),
      p: vec![0.0; dimension],
      g: vec![0.0; dimension],
      v: 0.0,
    },
    nominal_step_size: settings.step_size,
    step_size: settings.step_size,
    max_depth: settings.max_depth,
    depth: 0,
    divergent: false,
  };

  sampler.update_potential_gradient()?;
  if !sampler.z.v.is_finite() {
    return Err(NutsError::InitialDensity);
  }

  let mut step_size_adaptation = StepSizeAdaptation::new(&settings);
  let mut metric_adaptation = MetricAdaptation::new(dimension, &settings);
  sampler.init_step_size()?;

  let mut warmup_divergences = 0;
  for _ in 0..settings.warmup {
    let transition = sampler.transition()?;
    warmup_divergences += usize::from(sampler.divergent);

    step_size_adaptation.learn(&mut sampler.nominal_step_size, transition.accept_stat);
    if metric_adaptation.learn(&mut sampler.inverse_metric, &sampler.z.q)? {
      sampler.init_step_size()?;
      step_size_adaptation.mu = (10.0 * sampler.nominal_step_size).ln();
      step_size_adaptation.restart();
    }
  }
  step_size_adaptation.complete(&mut sampler.nominal_step_size);

  let mut chain = NutsChain {
    draws: Vec::with_capacity(settings.draws * dimension),
    log_density: Vec::with_capacity(settings.draws),
    accept_stat: Vec::with_capacity(settings.draws),
    tree_depth: Vec::with_capacity(settings.draws),
    leapfrog_steps: Vec::with_capacity(settings.draws),
    divergent: Vec::with_capacity(settings.draws),
    energy: Vec::with_capacity(settings.draws),
    step_size: sampler.nominal_step_size,
    inverse_metric: Vec::new(),
    warmup_divergences,
  };

  for _ in 0..settings.draws {
    let transition = sampler.transition()?;

    chain.draws.extend_from_slice(&sampler.z.q);
    chain.log_density.push(-sampler.z.v);
    chain.accept_stat.push(transition.accept_stat);
    chain.tree_depth.push(sampler.depth as u32);
    chain.leapfrog_steps.push(transition.leapfrog_steps as u32);
    chain.divergent.push(sampler.divergent);
    chain.energy.push(transition.energy);
  }

  chain.inverse_metric = sampler.inverse_metric;
  Ok(chain)
}

impl<F> Sampler<'_, F>
where
  F: Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
{
  fn kinetic_energy(&self, point: &Point) -> f64 {
    point
      .p
      .iter()
      .zip(&self.inverse_metric)
      .map(|(momentum, inverse)| momentum * (inverse * momentum))
      .sum::<f64>()
      * 0.5
  }

  fn hamiltonian(&self, point: &Point) -> f64 {
    self.kinetic_energy(point) + point.v
  }

  /// The velocity `dτ/dp`, Stan's "sharp" momentum.
  fn velocity(&self, momentum: &[f64]) -> Vec<f64> {
    momentum
      .iter()
      .zip(&self.inverse_metric)
      .map(|(momentum, inverse)| inverse * momentum)
      .collect()
  }

  fn sample_momentum(&mut self) {
    for (momentum, inverse) in self.z.p.iter_mut().zip(&self.inverse_metric) {
      *momentum = self.rng.normal() / inverse.sqrt();
    }
  }

  /// Recompute the potential at `z.q`; a rejected state gets infinite potential.
  fn update_potential_gradient(&mut self) -> Result<(), NutsError> {
    let rejected = match (self.evaluate)(&self.z.q) {
      Ok(evaluation) => {
        if evaluation.gradient.len() != self.z.q.len() {
          return Err(NutsError::InvalidConfiguration);
        }

        let finite =
          evaluation.value.is_finite() && evaluation.gradient.iter().all(|value| value.is_finite());
        if finite {
          self.z.v = -evaluation.value;
          for (gradient, value) in self.z.g.iter_mut().zip(&evaluation.gradient) {
            *gradient = -value;
          }
        }
        !finite
      }
      Err(MapObjectiveError::NonFiniteResult) => true,
      Err(error) => return Err(NutsError::Objective(error)),
    };

    // Zero the gradient so momentum stays finite until the trajectory is abandoned.
    if rejected {
      self.z.v = f64::INFINITY;
      self.z.g.fill(0.0);
    }

    Ok(())
  }

  fn leapfrog(&mut self, step: f64) -> Result<(), NutsError> {
    let half = 0.5 * step;

    for (momentum, gradient) in self.z.p.iter_mut().zip(&self.z.g) {
      *momentum -= half * gradient;
    }
    for ((position, momentum), inverse) in
      self.z.q.iter_mut().zip(&self.z.p).zip(&self.inverse_metric)
    {
      *position += step * (inverse * momentum);
    }
    self.update_potential_gradient()?;
    for (momentum, gradient) in self.z.p.iter_mut().zip(&self.z.g) {
      *momentum -= half * gradient;
    }

    Ok(())
  }

  /// One leapfrog step from `z.q` with fresh momentum, returning `H0 - h`.
  fn trial_energy_change(&mut self) -> Result<f64, NutsError> {
    self.sample_momentum();
    let h0 = self.hamiltonian(&self.z);
    self.leapfrog(self.nominal_step_size)?;

    let h = self.hamiltonian(&self.z);
    Ok(h0 - if h.is_nan() { f64::INFINITY } else { h })
  }

  /// Stan's `init_stepsize`: double or halve until one step's acceptance crosses 0.8.
  fn init_step_size(&mut self) -> Result<(), NutsError> {
    if self.nominal_step_size == 0.0
      || self.nominal_step_size > MAX_STEP_SIZE
      || self.nominal_step_size.is_nan()
    {
      return Ok(());
    }

    let start = self.z.clone();
    let threshold = 0.8_f64.ln();

    // Grow while one step's acceptance stays above 0.8, otherwise shrink until it does.
    // Like Stan's negated comparisons, an unordered change stops the search either way.
    let direction = if self.trial_energy_change()? > threshold {
      Ordering::Greater
    } else {
      Ordering::Less
    };

    loop {
      self.z.assign(&start);
      let delta_h = self.trial_energy_change()?;

      if delta_h.partial_cmp(&threshold) != Some(direction) {
        break;
      }

      self.nominal_step_size *= if direction == Ordering::Greater {
        2.0
      } else {
        0.5
      };

      if self.nominal_step_size > MAX_STEP_SIZE {
        return Err(NutsError::ImproperPosterior);
      }
      if self.nominal_step_size == 0.0 {
        return Err(NutsError::StepSizeCollapse);
      }
    }

    self.z.assign(&start);
    Ok(())
  }

  /// One NUTS transition from `z`, which must already hold its potential and gradient.
  fn transition(&mut self) -> Result<Transition, NutsError> {
    self.step_size = self.nominal_step_size;
    self.sample_momentum();

    let mut z_fwd = self.z.clone();
    let mut z_bck = self.z.clone();
    let mut z_sample = self.z.clone();
    let mut z_propose = self.z.clone();

    let mut p_fwd_fwd = self.z.p.clone();
    let mut p_sharp_fwd_fwd = self.velocity(&self.z.p);
    let mut p_fwd_bck = self.z.p.clone();
    let mut p_sharp_fwd_bck = p_sharp_fwd_fwd.clone();
    let mut p_bck_fwd = self.z.p.clone();
    let mut p_sharp_bck_fwd = p_sharp_fwd_fwd.clone();
    let mut p_bck_bck = self.z.p.clone();
    let mut p_sharp_bck_bck = p_sharp_fwd_fwd.clone();

    let mut rho = self.z.p.clone();
    let mut log_sum_weight = 0.0;
    let mut totals = TreeTotals {
      h0: self.hamiltonian(&self.z),
      sign: 1.0,
      leapfrog_steps: 0,
      sum_metro_prob: 0.0,
    };

    self.depth = 0;
    self.divergent = false;

    while self.depth < self.max_depth {
      let dimension = rho.len();
      let mut rho_fwd = vec![0.0; dimension];
      let mut rho_bck = vec![0.0; dimension];
      let mut log_sum_weight_subtree = f64::NEG_INFINITY;

      let valid_subtree = if self.rng.uniform() > 0.5 {
        self.z.assign(&z_fwd);
        rho_bck.copy_from_slice(&rho);
        p_bck_fwd.copy_from_slice(&p_fwd_fwd);
        p_sharp_bck_fwd.copy_from_slice(&p_sharp_fwd_fwd);

        totals.sign = 1.0;
        let valid = self.build_tree(
          self.depth,
          &mut z_propose,
          &mut p_sharp_fwd_bck,
          &mut p_sharp_fwd_fwd,
          &mut rho_fwd,
          &mut p_fwd_bck,
          &mut p_fwd_fwd,
          &mut totals,
          &mut log_sum_weight_subtree,
        )?;
        z_fwd.assign(&self.z);
        valid
      } else {
        self.z.assign(&z_bck);
        rho_fwd.copy_from_slice(&rho);
        p_fwd_bck.copy_from_slice(&p_bck_bck);
        p_sharp_fwd_bck.copy_from_slice(&p_sharp_bck_bck);

        totals.sign = -1.0;
        let valid = self.build_tree(
          self.depth,
          &mut z_propose,
          &mut p_sharp_bck_fwd,
          &mut p_sharp_bck_bck,
          &mut rho_bck,
          &mut p_bck_fwd,
          &mut p_bck_bck,
          &mut totals,
          &mut log_sum_weight_subtree,
        )?;
        z_bck.assign(&self.z);
        valid
      };

      if !valid_subtree {
        break;
      }

      self.depth += 1;

      if log_sum_weight_subtree > log_sum_weight {
        z_sample.assign(&z_propose);
      } else {
        let accept_prob = (log_sum_weight_subtree - log_sum_weight).exp();
        if self.rng.uniform() < accept_prob {
          z_sample.assign(&z_propose);
        }
      }

      log_sum_weight = log_sum_exp(log_sum_weight, log_sum_weight_subtree);

      for ((total, backward), forward) in rho.iter_mut().zip(&rho_bck).zip(&rho_fwd) {
        *total = backward + forward;
      }

      let mut persist = no_u_turn(&p_sharp_bck_bck, &p_sharp_fwd_fwd, &rho);
      let extended = add(&rho_bck, &p_fwd_bck);
      persist &= no_u_turn(&p_sharp_bck_bck, &p_sharp_fwd_bck, &extended);
      let extended = add(&rho_fwd, &p_bck_fwd);
      persist &= no_u_turn(&p_sharp_bck_fwd, &p_sharp_fwd_fwd, &extended);

      if !persist {
        break;
      }
    }

    self.z.assign(&z_sample);

    Ok(Transition {
      accept_stat: totals.sum_metro_prob / totals.leapfrog_steps as f64,
      energy: self.hamiltonian(&self.z),
      leapfrog_steps: totals.leapfrog_steps,
    })
  }

  /// Stan's recursive `build_tree`; returns whether the subtree is valid.
  #[allow(clippy::too_many_arguments)]
  fn build_tree(
    &mut self,
    depth: usize,
    z_propose: &mut Point,
    p_sharp_beg: &mut Vec<f64>,
    p_sharp_end: &mut Vec<f64>,
    rho: &mut [f64],
    p_beg: &mut Vec<f64>,
    p_end: &mut Vec<f64>,
    totals: &mut TreeTotals,
    log_sum_weight: &mut f64,
  ) -> Result<bool, NutsError> {
    if depth == 0 {
      self.leapfrog(totals.sign * self.step_size)?;
      totals.leapfrog_steps += 1;

      let mut h = self.hamiltonian(&self.z);
      if h.is_nan() {
        h = f64::INFINITY;
      }
      if h - totals.h0 > MAX_DELTA_H {
        self.divergent = true;
      }

      *log_sum_weight = log_sum_exp(*log_sum_weight, totals.h0 - h);
      totals.sum_metro_prob += if totals.h0 - h > 0.0 {
        1.0
      } else {
        (totals.h0 - h).exp()
      };

      z_propose.assign(&self.z);
      *p_sharp_beg = self.velocity(&self.z.p);
      p_sharp_end.clone_from(p_sharp_beg);
      for (total, momentum) in rho.iter_mut().zip(&self.z.p) {
        *total += momentum;
      }
      p_beg.clone_from(&self.z.p);
      p_end.clone_from(p_beg);

      return Ok(!self.divergent);
    }

    let dimension = rho.len();

    let mut log_sum_weight_init = f64::NEG_INFINITY;
    let mut p_init_end = vec![0.0; dimension];
    let mut p_sharp_init_end = vec![0.0; dimension];
    let mut rho_init = vec![0.0; dimension];

    let valid_init = self.build_tree(
      depth - 1,
      z_propose,
      p_sharp_beg,
      &mut p_sharp_init_end,
      &mut rho_init,
      p_beg,
      &mut p_init_end,
      totals,
      &mut log_sum_weight_init,
    )?;
    if !valid_init {
      return Ok(false);
    }

    let mut z_propose_final = self.z.clone();
    let mut log_sum_weight_final = f64::NEG_INFINITY;
    let mut p_final_beg = vec![0.0; dimension];
    let mut p_sharp_final_beg = vec![0.0; dimension];
    let mut rho_final = vec![0.0; dimension];

    let valid_final = self.build_tree(
      depth - 1,
      &mut z_propose_final,
      &mut p_sharp_final_beg,
      p_sharp_end,
      &mut rho_final,
      &mut p_final_beg,
      p_end,
      totals,
      &mut log_sum_weight_final,
    )?;
    if !valid_final {
      return Ok(false);
    }

    let log_sum_weight_subtree = log_sum_exp(log_sum_weight_init, log_sum_weight_final);
    *log_sum_weight = log_sum_exp(*log_sum_weight, log_sum_weight_subtree);

    if log_sum_weight_final > log_sum_weight_subtree {
      z_propose.assign(&z_propose_final);
    } else {
      let accept_prob = (log_sum_weight_final - log_sum_weight_subtree).exp();
      if self.rng.uniform() < accept_prob {
        z_propose.assign(&z_propose_final);
      }
    }

    let rho_subtree = add(&rho_init, &rho_final);
    for (total, value) in rho.iter_mut().zip(&rho_subtree) {
      *total += value;
    }

    let mut persist = no_u_turn(p_sharp_beg, p_sharp_end, &rho_subtree);
    let extended = add(&rho_init, &p_final_beg);
    persist &= no_u_turn(p_sharp_beg, &p_sharp_final_beg, &extended);
    let extended = add(&rho_final, &p_init_end);
    persist &= no_u_turn(&p_sharp_init_end, p_sharp_end, &extended);

    Ok(persist)
  }
}

fn add(left: &[f64], right: &[f64]) -> Vec<f64> {
  left.iter().zip(right).map(|(a, b)| a + b).collect()
}

fn dot(left: &[f64], right: &[f64]) -> f64 {
  left.iter().zip(right).map(|(a, b)| a * b).sum()
}

/// Stan's generalized no-U-turn criterion: both ends still move along `rho`.
fn no_u_turn(p_sharp_minus: &[f64], p_sharp_plus: &[f64], rho: &[f64]) -> bool {
  dot(p_sharp_plus, rho) > 0.0 && dot(p_sharp_minus, rho) > 0.0
}

/// Stan Math's two-argument `log_sum_exp`.
fn log_sum_exp(a: f64, b: f64) -> f64 {
  if a == f64::NEG_INFINITY {
    return b;
  }
  if a == f64::INFINITY && b == f64::INFINITY {
    return f64::INFINITY;
  }
  if a > b {
    a + (b - a).exp().ln_1p()
  } else {
    b + (a - b).exp().ln_1p()
  }
}

/// Stan's dual-averaging step-size adaptation.
struct StepSizeAdaptation {
  counter: f64,
  s_bar: f64,
  x_bar: f64,
  mu: f64,
  delta: f64,
  gamma: f64,
  kappa: f64,
  t0: f64,
}

impl StepSizeAdaptation {
  fn new(settings: &NutsSettings) -> Self {
    Self {
      counter: 0.0,
      s_bar: 0.0,
      x_bar: 0.0,
      mu: (10.0 * settings.step_size).ln(),
      delta: settings.adapt_delta,
      gamma: settings.adapt_gamma,
      kappa: settings.adapt_kappa,
      t0: settings.adapt_t0,
    }
  }

  fn restart(&mut self) {
    self.counter = 0.0;
    self.s_bar = 0.0;
    self.x_bar = 0.0;
  }

  fn learn(&mut self, step_size: &mut f64, accept_stat: f64) {
    self.counter += 1.0;

    let accept_stat = accept_stat.min(1.0);
    let eta = 1.0 / (self.counter + self.t0);
    self.s_bar = (1.0 - eta) * self.s_bar + eta * (self.delta - accept_stat);

    let x = self.mu - self.s_bar * self.counter.sqrt() / self.gamma;
    let x_eta = self.counter.powf(-self.kappa);
    self.x_bar = (1.0 - x_eta) * self.x_bar + x_eta * x;

    *step_size = x.exp();
  }

  fn complete(&self, step_size: &mut f64) {
    if self.counter > 0.0 {
      *step_size = self.x_bar.exp();
    }
  }
}

/// Stan's windowed variance adaptation, with its `unsigned int` arithmetic.
///
/// When warmup is too short for the configured buffers, Stan shrinks them to 15%/75%/10% but
/// never restarts the schedule, so the first window never closes and the metric stays at
/// ones. Under 20 warmup iterations it isn't adapted either. CmdStan 2.37 behaves this way
/// for every Prophet fit with `mcmc_samples` under 300.
struct MetricAdaptation {
  num_warmup: u32,
  init_buffer: u32,
  term_buffer: u32,
  base_window: u32,
  counter: u32,
  next_window: u32,
  window_size: u32,
  estimator: WelfordVariance,
}

impl MetricAdaptation {
  fn new(dimension: usize, settings: &NutsSettings) -> Self {
    let mut adaptation = Self {
      num_warmup: 0,
      init_buffer: 0,
      term_buffer: 0,
      base_window: 0,
      counter: 0,
      next_window: 0,
      window_size: 0,
      estimator: WelfordVariance::new(dimension),
    };
    adaptation.restart();

    // `is_valid` guarantees each value fits Stan's `unsigned int`.
    let unsigned = |value: usize| value as u32;
    adaptation.set_window_params(
      unsigned(settings.warmup),
      unsigned(settings.init_buffer),
      unsigned(settings.term_buffer),
      unsigned(settings.window),
    );
    adaptation
  }

  fn restart(&mut self) {
    self.counter = 0;
    self.window_size = self.base_window;
    self.next_window = self
      .init_buffer
      .wrapping_add(self.window_size)
      .wrapping_sub(1);
  }

  fn set_window_params(
    &mut self,
    num_warmup: u32,
    init_buffer: u32,
    term_buffer: u32,
    window: u32,
  ) {
    if num_warmup < 20 {
      return;
    }

    let configured = u64::from(init_buffer) + u64::from(window) + u64::from(term_buffer);
    if configured > u64::from(num_warmup) {
      self.num_warmup = num_warmup;
      self.init_buffer = (0.15 * f64::from(num_warmup)) as u32;
      self.term_buffer = (0.10 * f64::from(num_warmup)) as u32;
      self.base_window = num_warmup - (self.init_buffer + self.term_buffer);
      return;
    }

    self.num_warmup = num_warmup;
    self.init_buffer = init_buffer;
    self.term_buffer = term_buffer;
    self.base_window = window;
    self.restart();
  }

  fn last_window_end(&self) -> u32 {
    self
      .num_warmup
      .wrapping_sub(self.term_buffer)
      .wrapping_sub(1)
  }

  fn in_window(&self) -> bool {
    self.counter >= self.init_buffer
      && self.counter < self.num_warmup.wrapping_sub(self.term_buffer)
      && self.counter != self.num_warmup
  }

  fn window_ends(&self) -> bool {
    self.counter == self.next_window && self.counter != self.num_warmup
  }

  fn compute_next_window(&mut self) {
    if self.next_window == self.last_window_end() {
      return;
    }

    self.window_size = self.window_size.wrapping_mul(2);
    self.next_window = self.counter.wrapping_add(self.window_size);
    if self.next_window == self.last_window_end() {
      return;
    }

    let next_boundary = self
      .next_window
      .wrapping_add(self.window_size.wrapping_mul(2));
    if next_boundary >= self.num_warmup.wrapping_sub(self.term_buffer) {
      self.next_window = self.last_window_end();
    }
  }

  /// Record one warmup state; returns whether the metric changed.
  fn learn(&mut self, inverse_metric: &mut [f64], q: &[f64]) -> Result<bool, NutsError> {
    if self.in_window() {
      self.estimator.add(q);
    }

    if !self.window_ends() {
      self.counter = self.counter.wrapping_add(1);
      return Ok(false);
    }

    self.compute_next_window();
    self.estimator.variance(inverse_metric);

    let n = self.estimator.count;
    for value in inverse_metric.iter_mut() {
      *value = (n / (n + 5.0)) * *value + 1e-3 * (5.0 / (n + 5.0));
    }
    if inverse_metric.iter().any(|value| !value.is_finite()) {
      return Err(NutsError::MetricOverflow);
    }

    self.estimator.restart();
    self.counter = self.counter.wrapping_add(1);
    Ok(true)
  }
}

/// Stan Math's Welford running variance.
struct WelfordVariance {
  count: f64,
  mean: Vec<f64>,
  m2: Vec<f64>,
}

impl WelfordVariance {
  fn new(dimension: usize) -> Self {
    Self {
      count: 0.0,
      mean: vec![0.0; dimension],
      m2: vec![0.0; dimension],
    }
  }

  fn restart(&mut self) {
    self.count = 0.0;
    self.mean.fill(0.0);
    self.m2.fill(0.0);
  }

  fn add(&mut self, q: &[f64]) {
    self.count += 1.0;

    for ((mean, m2), value) in self.mean.iter_mut().zip(&mut self.m2).zip(q) {
      let delta = value - *mean;
      *mean += delta / self.count;
      *m2 += delta * (value - *mean);
    }
  }

  /// Leave `variance` unchanged with fewer than two samples, as Stan does.
  fn variance(&self, variance: &mut [f64]) {
    if self.count > 1.0 {
      for (target, m2) in variance.iter_mut().zip(&self.m2) {
        *target = m2 / (self.count - 1.0);
      }
    }
  }
}

#[cfg(test)]
mod tests;
