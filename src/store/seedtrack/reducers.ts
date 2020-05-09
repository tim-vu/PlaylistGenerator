import {DESELECT_TRACK, RESET_TRACK_SELECTION, SeedTrackActions, SeedTrackState, SELECT_TRACK} from "./types";

const initialState : SeedTrackState = [];

export function seedTrackReducer(state = initialState, action : SeedTrackActions) : SeedTrackState {
  switch(action.type){
    case SELECT_TRACK:
      return [...state, action.payload];
    case DESELECT_TRACK:
      return state.filter(track => track.id !== action.id);
    case RESET_TRACK_SELECTION:
      return [];
    default:
      return state;
  }
}