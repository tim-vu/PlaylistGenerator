
export type SeedTrackState = SpotifyApi.TrackObjectFull[];

export const SELECT_TRACK = "SELECT_TRACK";
export const DESELECT_TRACK = "DESELECT_TRACK";
export const RESET_TRACK_SELECTION = "RESET_TRACK_SELECTION";

export interface SelectTrack {
  type: typeof SELECT_TRACK,
  payload: SpotifyApi.TrackObjectFull
}

export interface DeselectTrack {
  type: typeof DESELECT_TRACK,
  id: string
}

export interface ResetTrackSelection {
  type: typeof RESET_TRACK_SELECTION
}

export type SeedTrackActions = SelectTrack | DeselectTrack | ResetTrackSelection