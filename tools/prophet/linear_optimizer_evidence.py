"""Independent MAP endpoint diagnostics from the pinned Stan executable.

Tooling only: neither the TypeScript library nor its WASM runtime imports Python.
Keep dummy parameters in the executable's internal state; folding public slope
would change its prior density and invalidate this evidence.
"""

import math
import re

import numpy as np

# Mirrors LAPLACE_KINK_TOLERANCE in rust/prophet-wasm/src/map_objective.rs. Stan's
# Newton/L-BFGS stop near, not exactly on, zero; an exact-zero test made the residual
# jump by 2 / tau with the sign of a round-off-sized delta.
LAPLACE_KINK_TOLERANCE = 1e-6


def laplace_stationarity_residual(delta, log_density_gradient, tau):
    """KKT residual for one Laplace coordinate from Stan's log-density gradient."""
    if abs(delta) > LAPLACE_KINK_TOLERANCE:
        return abs(log_density_gradient)
    # Stan's gradient includes -sign(delta) / tau, which is zero at an exact zero.
    smooth = log_density_gradient + np.sign(delta) / tau
    return max(abs(smooth) - 1 / tau, 0)


def stan_density(model, data, constrained):
    """Read proportional density and unconstrained gradient from pinned Stan."""
    result = model.stan_backend.model.log_prob(
        params=constrained, data=data, jacobian=False, sig_figs=12,
    ).iloc[0]
    return float(result.iloc[0]), [float(value) for value in result.iloc[1:]]


def stan_unconstrained_probe(model, data, parameters):
    """Use [k,m,delta...,log(sigma),beta...] without adding a Jacobian."""
    sigma_index = 2 + data["S"]
    constrained = {
        "k": parameters[0], "m": parameters[1],
        "delta": list(parameters[2:sigma_index]),
        "sigma_obs": float(np.exp(parameters[sigma_index])),
        "beta": list(parameters[sigma_index + 1:]),
    }
    return stan_density(model, data, constrained)


def stan_optimization_completion(stdout, algorithm, budget):
    """Decode the pinned executable's completion without timing or path metadata."""
    if algorithm == "Newton":
        iterations = sum(line.startswith("Iteration ") for line in stdout.splitlines())
        termination = "iteration-limit" if iterations == budget else "objective-change"
    else:
        lines = [line for line in stdout.splitlines() if re.match(r"^\s*\d+\s+[-\d.]", line)]
        iterations = int(lines[-1].split()[0])
        descriptions = {
            "absolute change in objective": "absolute-objective",
            "relative change in objective": "relative-objective",
            "gradient norm is below": "absolute-gradient",
            "relative gradient magnitude": "relative-gradient",
            "absolute parameter change": "parameter-change",
            "Maximum number of iterations": "iteration-limit",
        }
        termination = next((label for text, label in descriptions.items() if text in stdout), None)
        if termination is None:
            raise ValueError("Unrecognized frozen L-BFGS completion")

    return {"algorithm": algorithm, "iterations": iterations, "termination": termination}


def stan_curvature_probe(model, data, parameters):
    """Freeze Stan Newton's actual symmetric stencil, including its scaling."""
    dimension = len(parameters)
    curvature = np.zeros((dimension, dimension))

    for column in range(dimension):
        for perturbation, weight in zip(
            (-0.002, -0.001, 0.001, 0.002),
            (1.0 / 12.0, -2.0 / 3.0, 2.0 / 3.0, -1.0 / 12.0),
        ):
            trial = list(parameters)
            trial[column] += perturbation
            _, gradient = stan_unconstrained_probe(model, data, trial)

            for row, derivative in enumerate(gradient):
                increment = 0.0005 * weight * derivative
                curvature[column, row] += increment
                curvature[row, column] += increment

    return curvature.ravel().tolist()


def map_optimizer_evidence(model):
    """Evaluate the fitted objective and constrained gradient using unmodified Stan.

    Logistic empty-point fits fold k after optimization without preserving m.
    Recover the executable's pre-fold parameters, not the public prediction state.
    Linear retains its existing evidence semantics unchanged.
    """
    if model.growth not in ("linear", "logistic"):
        raise ValueError("Optimizer evidence requires a linear or logistic model")

    features, priors, _, _ = model.make_all_seasonality_features(model.history)
    data = {
        "T": len(model.history), "S": len(model.changepoints_t),
        "K": features.shape[1], "tau": model.changepoint_prior_scale,
        "trend_indicator": 1 if model.growth == "logistic" else 0,
        "y": model.history["y_scaled"].tolist(),
        "t": model.history["t"].tolist(), "t_change": model.changepoints_t.tolist(),
        "cap": (model.history["cap_scaled"].tolist() if model.growth == "logistic"
                else np.zeros(len(model.history)).tolist()), "X": features.to_numpy().tolist(),
        "sigmas": list(priors),
        "s_a": model.train_component_cols["additive_terms"].tolist(),
        "s_m": model.train_component_cols["multiplicative_terms"].tolist(),
    }
    fitted = model.params
    if model.growth == "logistic":
        stan_fit = model.stan_fit
        if stan_fit is None:
            raise ValueError("Logistic optimizer evidence requires an executable fit")
        fitted = model.stan_backend.stan_to_dict_numpy(
            stan_fit.column_names, stan_fit.optimized_params_np)
        fitted = {key: value.reshape((1, -1)) for key, value in fitted.items()}

    params = {
        key: (float(fitted[key][0][0]) if key in ("k", "m", "sigma_obs")
              else fitted[key][0].tolist())
        for key in ("k", "m", "delta", "sigma_obs", "beta")
    }
    value, derivatives = stan_density(model, data, params)
    gradient = np.asarray(derivatives, dtype=np.float64)
    gradient[2 + len(params["delta"])] /= params["sigma_obs"]

    for index, delta in enumerate(params["delta"]):
        gradient[2 + index] = laplace_stationarity_residual(
            delta, gradient[2 + index], data["tau"])

    objective = -value
    stationarity = float(np.max(np.abs(gradient)))
    if not math.isfinite(objective) or not math.isfinite(stationarity):
        raise ValueError("Stan returned non-finite optimizer evidence")

    return {"objective": objective, "stationarityResidual": stationarity}


def linear_optimizer_evidence(model):
    """Preserve the existing linear-only fixture and benchmark boundary."""
    if model.growth != "linear":
        raise ValueError("Linear optimizer evidence requires a linear model")
    return map_optimizer_evidence(model)
