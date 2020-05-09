import {
  DESELECT_TRACK,
  DeselectTrack,
  RESET_TRACK_SELECTION,
  ResetTrackSelection,
  SELECT_TRACK,
  SelectTrack
} from "./types";

export function selectTrack(track: SpotifyApi.TrackObjectFull) : SelectTrack {
  return {
    type: SELECT_TRACK,
    payload: track
  }
}

export function deselectTrack(id: string) : DeselectTrack {
  return {
    type: DESELECT_TRACK,
    id
  }
}

export function resetTrackSelection() : ResetTrackSelection {
  return {
    type: RESET_TRACK_SELECTION
  }
}


