"""Real pinned-Python tests for the benchmark's numeric input mapping."""

import copy
import json
from pathlib import Path
import runpy
import sys
import unittest

import numpy as np

BENCHMARK_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(BENCHMARK_ROOT / "tools" / "adapters"))
adapter = runpy.run_path(str(BENCHMARK_ROOT / "tools" / "adapters" / "python-prophet.py"))


class PythonProphetInputTest(unittest.TestCase):
    def test_numeric_columns_are_float64_without_changing_values_masks_or_order(self):
        rows = [
            {"timestamp": timestamp, "value": value, "capacity": 60, "floor": -5,
             "regressors": {"promotion": promotion}, "conditions": {"active": active}}
            for timestamp, value, promotion, active in [
                ("2024-01-02T00:00:00.000Z", 35, 0, False),
                ("2024-01-01T00:00:00.000Z", 36.25, 1, True),
                ("2024-01-01T00:00:00.000Z", 35, 0, False),
            ]
        ]
        original = copy.deepcopy(rows)
        frame = adapter["records_frame"](rows, include_value=True)

        for column, values in {
            "y": [35, 36.25, 35], "cap": [60, 60, 60],
            "floor": [-5, -5, -5], "promotion": [0, 1, 0],
        }.items():
            self.assertEqual(frame[column].dtype, np.dtype("float64"))
            self.assertEqual(frame[column].tolist(), values)

        self.assertEqual(frame["active"].dtype, np.dtype("bool"))
        self.assertEqual(frame["active"].tolist(), [False, True, False])
        self.assertEqual(frame["ds"].dt.strftime("%Y-%m-%d").tolist(),
                         ["2024-01-02", "2024-01-01", "2024-01-01"])
        self.assertIsNone(frame["ds"].dt.tz)
        self.assertEqual(rows, original)

        prediction = adapter["records_frame"](rows, include_value=False)
        self.assertNotIn("y", prediction.columns)
        self.assertEqual(prediction["floor"].dtype, np.dtype("float64"))
        self.assertEqual(prediction["active"].dtype, np.dtype("bool"))

    def test_fixed_equation_projection_retains_zero_holiday_columns(self):
        declarations = json.loads((BENCHMARK_ROOT / "cases" / "growth" / "linear" / "public-api.json").read_text())
        case = next(item for item in declarations if item["workload"]["kind"] == "fixed-linear-prediction")
        dataset = json.loads((BENCHMARK_ROOT / "inputs" / case["dataset"].replace("generated/", "v1/")).read_text())
        training, _ = adapter["prepare_input"](dataset)
        model = adapter["fixed_prediction_model"](training, case)
        metadata = adapter["metadata_projection"](model, case)
        self.assertEqual(metadata["eventColumnCount"], 0)
        self.assertEqual(metadata["events"], [])

    def test_empty_frames_keep_float_targets_only_when_requested(self):
        training = adapter["records_frame"]([], include_value=True)
        prediction = adapter["records_frame"]([], include_value=False)

        self.assertTrue(training.empty)
        self.assertEqual(training["y"].dtype, np.dtype("float64"))
        self.assertTrue(prediction.empty)
        self.assertNotIn("y", prediction.columns)

    def test_integer_constant_fits_predicts_and_roundtrips_in_both_scaling_modes(self):
        path = BENCHMARK_ROOT / "inputs" / "v1" / "flat-constant.json"
        contents = path.read_bytes()
        dataset = json.loads(contents)
        original = copy.deepcopy(dataset)
        self.assertTrue(all(type(row["value"]) is int for row in dataset["observations"]))

        training, future = adapter["prepare_input"](dataset)

        for scaling in ("absmax", "minmax"):
            with self.subTest(scaling=scaling):
                case = {
                    "id": f"flat-constant-{scaling}",
                    "workload": {
                        "kind": "map",
                        "configuration": {
                            "growth": "flat", "scaling": scaling,
                            "changepoints": {"mode": "explicit", "timestamps": []},
                            "changepointPriorScale": 0.05,
                            "seasonalities": [], "events": [], "regressors": [],
                        },
                        "pythonOptimizer": {
                            "algorithm": "LBFGS", "maxIterations": 10_000,
                            "newtonFallback": False,
                        },
                    },
                }
                model = adapter["fit_model"](training, case)
                encoded = adapter["model_to_json"](model)
                restored = adapter["model_from_json"](encoded)

                self.assertEqual(model.scaling, scaling)
                self.assertEqual(restored.scaling, scaling)
                self.assertEqual(model.y_min, 35.0 if scaling == "minmax" else 0.0)
                self.assertEqual(model.y_scale, 1.0 if scaling == "minmax" else 35.0)
                np.testing.assert_array_equal(model.predict(future)["yhat"], 35.0)
                np.testing.assert_array_equal(restored.predict(future)["yhat"], 35.0)
                self.assertEqual(adapter["model_to_json"](model), encoded)

        self.assertEqual(dataset, original)
        self.assertEqual(path.read_bytes(), contents)

    def test_flat_keeps_prophet_default_changepoints_and_automatic_newton(self):
        path = BENCHMARK_ROOT / "inputs" / "v1" / "flat-level.json"
        training, _ = adapter["prepare_input"](json.loads(path.read_bytes()))
        case = {
            "id": "flat-default-changepoints",
            "workload": {
                "kind": "map",
                "configuration": {
                    "growth": "flat", "scaling": "minmax",
                    # Effect's flat options cannot express either setting.
                    "changepoints": {"mode": "explicit", "timestamps": []},
                    "changepointPriorScale": 0.5,
                    "seasonalities": [], "events": [], "regressors": [],
                },
                "pythonOptimizer": {
                    "algorithm": "Auto", "maxIterations": 10_000,
                    "newtonFallback": True, "sigFigs": 12,
                },
            },
        }
        model = adapter["fit_model"](training, case)
        direct = adapter["Prophet"](growth="flat")

        for field in ("n_changepoints", "changepoint_range", "changepoint_prior_scale"):
            self.assertEqual(getattr(model, field), getattr(direct, field))
        self.assertEqual(len(model.changepoints), 25)
        self.assertEqual(np.asarray(model.params["delta"]).shape, (1, 25))
        self.assertIn("algorithm=newton", model.stan_fit.runset.cmd(0))


class PythonLogisticReferenceTest(unittest.TestCase):
    def case(self, count=96, empty=False, defaults=False, prior_scale=0.05):
        return {
            "id": "logistic-reference-test",
            "workload": {
                "kind": "map",
                **({"fitRequest": "growth-only"} if defaults else {}),
                "configuration": {
                    "growth": "logistic", "scaling": "absmax",
                    "changepoints": {"mode": "explicit", "timestamps": [] if empty
                                     else ["2020-02-08T00:00:00.000Z"]},
                    "changepointPriorScale": prior_scale,
                    "seasonalities": [], "events": [], "regressors": [],
                },
                "pythonOptimizer": {
                    "algorithm": "Auto", "maxIterations": 10_000,
                    "newtonFallback": True, "sigFigs": 12,
                },
            },
        }

    def dataset(self, count):
        path = BENCHMARK_ROOT / "inputs" / "v2" / f"logistic-basic-{count}.json"
        return adapter["prepare_input"](json.loads(path.read_bytes()))

    def test_growth_only_does_not_disable_builtin_seasonalities(self):
        model = adapter["configure_model"](self.case(defaults=True))
        direct = adapter["Prophet"](growth="logistic", uncertainty_samples=0)
        for field in ("scaling", "n_changepoints", "changepoint_range",
                      "changepoint_prior_scale", "weekly_seasonality",
                      "daily_seasonality", "yearly_seasonality"):
            self.assertEqual(getattr(model, field), getattr(direct, field))
        self.assertEqual(model.weekly_seasonality, "auto")

    def test_auto_fitting_uses_python_newton_below_100_and_lbfgs_at_100(self):
        for count, algorithm in ((99, "newton"), (100, "lbfgs")):
            with self.subTest(count=count):
                training, _ = self.dataset(count)
                model = adapter["fit_model"](training, self.case(count=count))
                self.assertIn(f"algorithm={algorithm}", model.stan_fit.runset.cmd(0))
                evidence = adapter["map_optimizer_evidence"](model)
                self.assertAlmostEqual(evidence["objective"],
                                       -model.stan_fit.optimized_params_dict["lp__"], places=6)
                self.assertTrue(np.isfinite(evidence["stationarityResidual"]))

    def test_empty_point_evidence_uses_private_prefold_executable_state(self):
        training, _ = self.dataset(96)
        for prior_scale in (0.05, 10):
            with self.subTest(prior_scale=prior_scale):
                model = adapter["fit_model"](training, self.case(empty=True, prior_scale=prior_scale))
                self.assertEqual(len(model.changepoints), 0)
                self.assertEqual(model.changepoints_t.tolist(), [0])
                # Public delta is zero after Prophet folds it into k; the executable retains it.
                self.assertEqual(model.params["delta"].tolist(), [[0]])
                if prior_scale == 10:
                    self.assertGreater(abs(model.stan_fit.optimized_params_dict["delta[1]"]), 0.1)
                evidence = adapter["map_optimizer_evidence"](model)
                self.assertAlmostEqual(evidence["objective"],
                                       -model.stan_fit.optimized_params_dict["lp__"], places=6)


class LaplaceStationarityTest(unittest.TestCase):
    def test_near_zero_deltas_use_the_subgradient_regardless_of_sign(self):
        from linear_optimizer_evidence import (
            LAPLACE_KINK_TOLERANCE, laplace_stationarity_residual)

        # basic-96-auto-minmax endpoints share smooth log-density derivative -11.39111.
        tau = 0.05
        smooth = -11.39111
        self.assertEqual(laplace_stationarity_residual(4.337e-11, smooth - 1 / tau, tau), 0)
        self.assertEqual(laplace_stationarity_residual(-1.856e-9, smooth + 1 / tau, tau), 0)
        self.assertEqual(laplace_stationarity_residual(0.0, smooth, tau), 0)
        self.assertAlmostEqual(laplace_stationarity_residual(0.0, -25.0, tau), 5.0)
        self.assertEqual(LAPLACE_KINK_TOLERANCE, 1e-6)

        delta = 2 * LAPLACE_KINK_TOLERANCE
        self.assertEqual(laplace_stationarity_residual(delta, smooth - 1 / tau, tau),
                         abs(smooth - 1 / tau))


class PythonCountryReferenceTest(unittest.TestCase):
    def case(self, country="US", growth="flat", mode="additive", coverage="reject-known-gaps"):
        case = copy.deepcopy(json.loads((BENCHMARK_ROOT / "cases" / "holidays" / "public-api.json").read_text())[0])
        case["id"] = "country-reference-test"
        case.pop("optimizerQuality", None)
        case["workload"]["kind"] = "map"
        case["workload"]["configuration"].update({
            "growth": growth, "scaling": "absmax", "holidaysMode": mode,
            "changepoints": {"mode": "explicit", "timestamps": []} if growth == "flat" else {"mode": "auto", "count": 2, "range": 0.8},
            "seasonalities": [], "events": [], "regressors": [],
            "countryHolidays": {"country": country, "coverage": coverage, "priorScale": 4},
        })
        return case

    def test_real_add_country_holidays_preserves_all_growths_modes_priors_and_restoration(self):
        for growth in ("linear", "flat", "logistic"):
            data = "country-logistic-96" if growth == "logistic" else "country-basic-96"
            dataset = json.loads((BENCHMARK_ROOT / "inputs" / "v5" / f"{data}.json").read_text())
            training, future = adapter["prepare_input"](dataset)
            for mode in ("additive", "multiplicative"):
                with self.subTest(growth=growth, mode=mode):
                    case = self.case("USA", growth, mode)
                    model = adapter["fit_model"](training, case)
                    self.assertEqual(model.country_holidays, "USA")
                    self.assertEqual(model.holidays_prior_scale, 4)
                    self.assertEqual(model.holidays_mode, mode)
                    before = adapter["model_to_json"](model)
                    _, forecasts = adapter["forecast_projection"](model, future)
                    adapter["assert_forecasts"](case, dataset, forecasts, model)
                    projection = adapter["country_projection"](model, future, case, forecasts)
                    self.assertEqual(projection["country"], "US")
                    self.assertEqual(projection["trainingYears"], [2024])
                    self.assertEqual(projection["provider"], {"prophet": "1.4.0", "holidays": "0.104"})
                    self.assertTrue(all(column["priorScale"] == 4 for column in projection["columns"]))
                    self.assertEqual(adapter["model_to_json"](model), before)
                    restored = adapter["model_from_json"](before)
                    np.testing.assert_array_equal(restored.predict(future)["yhat"], model.predict(future)["yhat"])

    def test_actual_future_features_include_observed_spillovers_but_ignore_unseen_names(self):
        dataset = json.loads((BENCHMARK_ROOT / "inputs" / "v5" / "country-boundary-96.json").read_text())
        training, future = adapter["prepare_input"](dataset)
        case = self.case()
        model = adapter["fit_model"](training, case)
        _, forecasts = adapter["forecast_projection"](model, future)
        adapter["assert_forecasts"](case, dataset, forecasts, model)
        projection = adapter["country_projection"](model, future, case, forecasts)
        self.assertEqual(projection["trainingYears"], [2010])
        self.assertIn("Juneteenth National Independence Day", projection["ignoredPredictionNames"])
        observed = next(index for index, column in enumerate(projection["columns"])
                        if column["name"] == "New Year's Day (observed)")
        self.assertEqual(projection["predictionActivations"][2 * len(projection["columns"]) + observed], 1)

    def test_estimated_names_and_deliberately_empty_provider_results_are_not_normalized(self):
        for country, data in (("SG", "country-estimated-96"), ("BV", "country-basic-96")):
            with self.subTest(country=country):
                dataset = json.loads((BENCHMARK_ROOT / "inputs" / "v5" / f"{data}.json").read_text())
                training, future = adapter["prepare_input"](dataset)
                case = self.case(country)
                model = adapter["fit_model"](training, case)
                _, forecasts = adapter["forecast_projection"](model, future)
                adapter["assert_forecasts"](case, dataset, forecasts, model)
                projection = adapter["country_projection"](model, future, case, forecasts)
                if country == "SG":
                    self.assertIn("Chinese New Year (estimated)", projection["ignoredPredictionNames"])
                else:
                    self.assertEqual(projection["columns"], [])
                    self.assertEqual(projection["trainingActivations"], [])
                    self.assertEqual(projection["predictionActivations"], [])

    def test_explicit_event_names_follow_prophet_feature_column_order(self):
        dataset = json.loads((BENCHMARK_ROOT / "inputs" / "v5" / "country-basic-96.json").read_text())
        training, _ = adapter["prepare_input"](dataset)
        case = self.case()
        configuration = case["workload"]["configuration"]
        configuration.pop("countryHolidays")
        # A space sorts before Prophet's `_delim_` separator, so the longer name's column comes first.
        configuration["events"] = [
            {"name": name, "date": date, "lowerWindowDays": 0, "upperWindowDays": 0, "priorScale": 10}
            for name, date in (("Festival", "2024-01-10"), ("Festival (observed)", "2024-01-11"))
        ]
        model = adapter["fit_model"](training, case)
        features, _, _ = model.make_holiday_features(
            model.history["ds"], model.construct_holiday_dataframe(model.history["ds"])
        )
        expected = list(dict.fromkeys(column.rsplit("_delim_", 1)[0] for column in features.columns))
        self.assertEqual(expected, ["Festival (observed)", "Festival"])
        self.assertEqual(adapter["event_names"](model), expected)

    def test_declared_effect_policy_rejections_are_real_python_semantic_differences(self):
        from prophet.make_holidays import make_holidays_df

        policies = json.loads((BENCHMARK_ROOT / "cases" / "holidays" / "coverage-policy.json").read_text())
        for policy in policies:
            frame = make_holidays_df(year_list=[policy["year"]], country=policy["country"])
            self.assertEqual(policy["comparison"], "intentional-difference")
            self.assertGreater(len(frame), 0)


if __name__ == "__main__":
    unittest.main()
