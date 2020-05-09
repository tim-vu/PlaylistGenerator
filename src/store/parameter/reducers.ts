import {ParameterActions, ParameterState} from "./types";

const initialState : ParameterState = {
  danceability: 10,
  energy: 0.5,
  popularity: 50,
  tempoVariance: 0.5,
  valence: 0.5
}

export function parameterReducer(state = initialState, action : ParameterActions) : ParameterState  {
  switch (action.type) {
    case "UPDATE_PARAMETERS":
      return action.payload;
    default:
      return state;
  }
}