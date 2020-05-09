import {UPDATE_PARAMETERS, UpdateParameters} from "./types";
import {RecommendationParameters} from "../../common/types";

export function updateParameters(parameters: RecommendationParameters) : UpdateParameters {
  return {
    type: UPDATE_PARAMETERS,
    payload: parameters
  }
}