import { appendFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Cause, Effect, Exit, Predicate, Schema, type Types } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

import {
  DifferentialCaseSchema,
  type DifferentialFailure,
  type DifferentialOutcome,
} from "../differential.ts";
import { effectOptionsForCase } from "../effect-case.ts";

const runDirectory = process.env.DIFFERENTIAL_RUN_DIRECTORY ?? "/results";

const outputPath = resolve(runDirectory, "effect-prophet.jsonl");

const maximumMessageLength = 500;

/** Project a failed exit onto its error tag, typed reason and message. */
const failure = (cause: Cause.Cause<unknown>) => {
  const reason = cause.reasons[0];

  if (reason === undefined || !Cause.isFailReason(reason)) {
    // Defects and interrupts are never expected from the public API; record them as such.
    return { error: "Defect", message: Cause.pretty(cause).slice(0, maximumMessageLength) };
  }

  const error = reason.error;
  const message = error instanceof Error ? error.message : String(error);

  const projected: Types.Mutable<Pick<DifferentialFailure, "error" | "reason" | "message">> = {
    error: Predicate.hasProperty(error, "_tag") ? String(error._tag) : "UnknownError",
    message: message.slice(0, maximumMessageLength),
  };

  if (Predicate.hasProperty(error, "reason")) {
    projected.reason = String(error.reason);
  }

  return projected;
};

const runCase = async (
  differentialCase: typeof DifferentialCaseSchema.Type,
): Promise<DifferentialOutcome> => {
  const started = performance.now();
  const seconds = () => (performance.now() - started) / 1_000;

  const fitted = await Effect.runPromiseExit(
    fit(differentialCase.dataset.observations, effectOptionsForCase(differentialCase)).pipe(
      Effect.provide(prophetFittingBackendLayer),
      Effect.withTracerEnabled(false),
    ),
  );

  if (Exit.isFailure(fitted)) {
    return {
      caseId: differentialCase.id,
      status: "failed",
      stage: "fit",
      ...failure(fitted.cause),
      seconds: seconds(),
    };
  }

  const model = fitted.value;

  const predicted = await Effect.runPromiseExit(
    predict(model, differentialCase.dataset.predictionRows).pipe(Effect.withTracerEnabled(false)),
  );

  if (Exit.isFailure(predicted)) {
    return {
      caseId: differentialCase.id,
      status: "failed",
      stage: "predict",
      ...failure(predicted.cause),
      seconds: seconds(),
    };
  }

  return {
    caseId: differentialCase.id,
    status: "fitted",
    forecasts: predicted.value.map((forecast) => ({
      timestamp: forecast.timestamp,
      value: forecast.value,
      trend: forecast.trend,
      additive: forecast.additive,
      multiplicative: forecast.multiplicative,
      seasonalities: forecast.seasonalities,
      events: forecast.events,
      regressors: forecast.regressors,
    })),
    noiseScale: model.noiseScale,
    seconds: seconds(),
  };
};

const cases = Schema.decodeUnknownSync(Schema.Array(DifferentialCaseSchema))(
  JSON.parse(await readFile(resolve(runDirectory, "cases.json"), "utf8")),
);

// One JSON line per case, appended as it finishes, so a crash keeps every completed outcome.
await writeFile(outputPath, "");

for (const [index, differentialCase] of cases.entries()) {
  const outcome = await runCase(differentialCase);

  await appendFile(outputPath, `${JSON.stringify(outcome)}\n`);

  process.stdout.write(
    `effect ${index + 1}/${cases.length} ${differentialCase.id} ${outcome.status} ${outcome.seconds.toFixed(2)}s\n`,
  );
}
