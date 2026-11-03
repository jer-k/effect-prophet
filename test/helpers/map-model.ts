import { isMcmcModel, type FittedMapProphet, type FittedProphet } from "../../src/fitted-model";

/** Narrow a fitted model to a MAP model, failing the test for a posterior. */
export const expectMapModel = (model: FittedProphet): FittedMapProphet => {
  if (isMcmcModel(model)) {
    throw new Error(`Expected a MAP model, got ${model.model}`);
  }

  return model;
};
