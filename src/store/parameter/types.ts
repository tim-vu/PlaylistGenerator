import {RecommendationParameters} from "../../common/types";


export type ParameterState = RecommendationParameters;

export const UPDATE_PARAMETERS = "UPDATE_PARAMETERS";

export interface UpdateParameters {
  type: typeof UPDATE_PARAMETERS,
  payload: RecommendationParameters
}

export type ParameterActions = UpdateParameters