"""Pinned public Prophet evidence for regressors forecast by their own models."""

from __future__ import annotations

from typing import Any, Callable

import numpy as np
import pandas as pd
from prophet import Prophet
from prophet.utilities import warm_start_params


def make_regressor_model_fixture(
    canonical: Callable[[Any], float], fail: Callable[[str], Any],
) -> dict[str, Any]:
    """Fit through `add_regressor(regressor_predictor=...)` and record what `predict` fills in."""

    def timestamp(value: pd.Timestamp) -> str:
        return value.isoformat(timespec="milliseconds") + "Z"

    def fitted_case(
        identifier: str, model: Prophet, options: dict[str, Any], training: pd.DataFrame,
        prediction: pd.DataFrame, predicted: str, supplied: list[str],
        fit_kwargs: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        # Prophet passes fit arguments on to each regressor model, so both use Newton.
        model.fit(training, **(fit_kwargs or {"algorithm": "Newton", "iter": 10_000}))
        forecast = model.predict(prediction)

        if list(forecast["ds"]) != list(prediction["ds"]):
            fail(f"{identifier}: prediction rows must already be in Prophet's output order")

        predictor = model.extra_regressors[predicted]["predictor"]
        if predictor is None:
            fail(f"{identifier}: Prophet did not fit a model for {predicted}")

        last = training["ds"].max()
        future = prediction[prediction["ds"] > last][["ds"]]

        def row(frame: pd.DataFrame, index: int) -> dict[str, Any]:
            values = {
                name: float(frame[name].iloc[index])
                for name in [predicted, *supplied]
                if name in frame and not np.isnan(frame[name].iloc[index])
            }
            return {"regressors": values} if values else {}

        return {
            "id": identifier,
            "options": options,
            "observations": [
                {"timestamp": timestamp(day), "value": float(value), **row(training, index)}
                for index, (day, value) in enumerate(zip(training["ds"], training["y"], strict=True))
            ],
            "predictionRows": [
                {"timestamp": timestamp(day), **row(prediction, index)}
                for index, day in enumerate(prediction["ds"])
            ],
            "expected": {
                "regressor": predicted,
                "regressorForecast": {
                    "timestamps": [timestamp(day) for day in future["ds"]],
                    "value": [canonical(value) for value in predictor.predict(future)["yhat"]],
                },
                "trend": [canonical(value) for value in forecast["trend"]],
                "value": [canonical(value) for value in forecast["yhat"]],
                "additive": [canonical(value) for value in forecast["additive_terms"]],
                "multiplicative": [canonical(value) for value in forecast["multiplicative_terms"]],
            },
            "tolerance": {"absolute": 1e-4, "relative": 0.0},
        }

    dates = pd.date_range("2024-01-01", periods=120)
    index = np.arange(len(dates))
    price = [canonical(10.0 + 0.04 * day + 1.5 * np.sin(2 * np.pi * day / 7) + 0.2 * np.sin(day * 1.1))
             for day in index]
    promotion = [float(day % 3 == 0) for day in index]
    training = pd.DataFrame({
        "ds": dates,
        "y": [canonical(30.0 + 0.05 * day + 1.2 * price[day] + 0.8 * promotion[day]
                        + 0.3 * np.cos(2 * np.pi * day / 7) + 0.1 * np.sin(day * 0.7))
              for day in index],
        "price": price,
        "promotion": promotion,
    })

    # Two history rows, one supplying its own price and one left to the training value, then
    # future rows, where Prophet replaces even a supplied price with the regressor model's.
    future_dates = pd.date_range(dates[-1] + pd.Timedelta(days=1), periods=14)
    prediction = pd.DataFrame({
        "ds": [dates[10], dates[50], *future_dates],
        "price": [12.5, np.nan, 999.0, *([np.nan] * 13)],
        "promotion": [1.0, 0.0, *[float(day % 2) for day in range(14)]],
    })

    default_model = Prophet(yearly_seasonality=False, daily_seasonality=False, uncertainty_samples=0)
    default_model.add_regressor("price", regressor_predictor=True)
    default_model.add_regressor("promotion")
    default_case = fitted_case(
        "default-regressor-model",
        default_model,
        {
            "builtInSeasonalities": {"yearly": "off", "daily": "off"},
            "regressors": [{"name": "price", "predictor": True}, {"name": "promotion"}],
            "map": {"optimizer": {"algorithm": "newton", "maxIterations": 10_000}},
        },
        training,
        prediction,
        "price",
        ["promotion"],
    )

    # Constructor settings reach the regressor model: fewer changepoints with a looser prior, and a
    # lower weekly order.
    configured_model = Prophet(
        yearly_seasonality=False, daily_seasonality=False, seasonality_mode="multiplicative",
        uncertainty_samples=0,
    )
    configured_model.add_regressor(
        "price",
        mode="additive",
        regressor_predictor={
            "n_changepoints": 5, "changepoint_prior_scale": 0.5, "weekly_seasonality": 2,
            "yearly_seasonality": False, "daily_seasonality": False,
        },
    )
    configured_model.add_regressor("promotion")
    configured_case = fitted_case(
        "configured-regressor-model",
        configured_model,
        {
            "seasonalityMode": "multiplicative",
            "builtInSeasonalities": {"yearly": "off", "daily": "off"},
            "regressors": [
                {
                    "name": "price",
                    "mode": "additive",
                    "predictor": {
                        "builtInSeasonalities": {
                            "yearly": "off", "daily": "off", "weekly": {"mode": "on", "fourierOrder": 2},
                        },
                        "map": {
                            "changepoints": {"mode": "auto", "count": 5},
                            "changepointPriorScale": 0.5,
                        },
                    },
                },
                {"name": "promotion"},
            ],
            "map": {"optimizer": {"algorithm": "newton", "maxIterations": 10_000}},
        },
        training,
        prediction,
        "price",
        ["promotion"],
    )

    # A flat regressor model. A flat fit of a trending history settles beside Laplace kinks, where
    # last-bit differences move the endpoint, so this regressor holds a level.
    level = [canonical(10.0 + 1.5 * np.sin(2 * np.pi * day / 7) + 0.2 * np.sin(day * 1.1))
             for day in index]
    level_training = training.assign(
        price=level,
        y=[canonical(30.0 + 0.05 * day + 1.2 * level[day] + 0.8 * promotion[day]
                     + 0.3 * np.cos(2 * np.pi * day / 7) + 0.1 * np.sin(day * 0.7))
           for day in index],
    )
    flat_model = Prophet(yearly_seasonality=False, daily_seasonality=False, uncertainty_samples=0)
    flat_model.add_regressor(
        "price",
        regressor_predictor={
            "growth": "flat", "n_changepoints": 3, "changepoint_prior_scale": 0.2,
            "yearly_seasonality": False, "daily_seasonality": False,
        },
    )
    flat_model.add_regressor("promotion")
    flat_case = fitted_case(
        "flat-regressor-model",
        flat_model,
        {
            "builtInSeasonalities": {"yearly": "off", "daily": "off"},
            "regressors": [
                {
                    "name": "price",
                    "predictor": {
                        "growth": "flat",
                        "builtInSeasonalities": {"yearly": "off", "daily": "off"},
                        "map": {
                            "changepoints": {"mode": "auto", "count": 3},
                            "changepointPriorScale": 0.2,
                        },
                    },
                },
                {"name": "promotion"},
            ],
            "map": {"optimizer": {"algorithm": "newton", "maxIterations": 10_000}},
        },
        level_training,
        prediction,
        "price",
        ["promotion"],
    )

    # Prophet passes init on too. The regressor model starts from the main model's k, m and
    # sigma_obs, and its delta, whose shape matches; its beta has a different shape and falls back
    # to the default. Two Newton steps leave each fit where its start led it.
    first = Prophet(yearly_seasonality=False, daily_seasonality=False, uncertainty_samples=0)
    first.add_regressor("price")
    first.add_regressor("promotion")
    first.fit(training.iloc[:90], algorithm="Newton", iter=10_000)
    warm = warm_start_params(first)

    # Both libraries start from the same canonical values.
    warm_start = {
        "k": canonical(warm["k"]), "m": canonical(warm["m"]), "sigmaObs": canonical(warm["sigma_obs"]),
        "delta": [canonical(value) for value in np.asarray(warm["delta"]).reshape(-1)],
        "beta": [canonical(value) for value in np.asarray(warm["beta"]).reshape(-1)],
    }
    init = {
        "k": warm_start["k"], "m": warm_start["m"], "sigma_obs": warm_start["sigmaObs"],
        "delta": np.array(warm_start["delta"]), "beta": np.array(warm_start["beta"]),
    }

    warm_model = Prophet(yearly_seasonality=False, daily_seasonality=False, uncertainty_samples=0)
    warm_model.add_regressor("price", regressor_predictor=True)
    warm_model.add_regressor("promotion")
    warm_case = fitted_case(
        "warm-started-regressor-model",
        warm_model,
        {
            "builtInSeasonalities": {"yearly": "off", "daily": "off"},
            "regressors": [{"name": "price", "predictor": True}, {"name": "promotion"}],
            "map": {
                "optimizer": {"algorithm": "newton", "maxIterations": 2},
                "warmStart": warm_start,
            },
        },
        training,
        prediction,
        "price",
        ["promotion"],
        {"algorithm": "Newton", "iter": 2, "require_converged": False, "init": init},
    )

    return {"provider": {"prophet": "1.4.0"},
            "fittedCases": [default_case, configured_case, flat_case, warm_case]}
