import React from "react";

import "./Playlist.css";

import { AppState } from "../../store";
import TrackListItem from "../TrackListItem/TrackListItem";
import { connect } from "react-redux";
import { RecommendationParameters } from "../../common/types";
import { ParameterState } from "../../store/parameter/types";
import { AuthenticationState } from "../../store/authentication/types";
import { addPlaylist, generatePlaylist } from "../../spotify/Spotify";

interface PlaylistProps {
  seedTracks: SpotifyApi.TrackObjectFull[];
  parameters: ParameterState;
  authentication: AuthenticationState;
}

interface PlaylistState {
  tracks: SpotifyApi.TrackObjectFull[];
  parameters: RecommendationParameters | null;
}

const Spinner = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

const Playlist: React.FC<PlaylistProps> = ({
  seedTracks,
  parameters,
  authentication,
}) => {
  const [state, setState] = React.useState<PlaylistState>({
    tracks: [],
    parameters: null,
  });

  const [isGenerating, setGenerating] = React.useState(false);

  const handleGenerateClicked = () => {
    setGenerating(true);

    generatePlaylist(seedTracks, parameters, authentication.accessToken)
      .then((tracks) => {
        setState({
          tracks,
          parameters,
        });
        setGenerating(false);
      })
      .catch(() => {
        setState({
          tracks: [],
          parameters: null,
        });
        setGenerating(false);
      });
  };

  const handleAddPlaylistClicked = () => {
    const playlistName = window.prompt("Enter the name of the playlist");

    if (playlistName == null) return;

    addPlaylist(playlistName, state.tracks, authentication.accessToken)
      .then(() => {
        alert("Successfully created the playlist");
      })
      .catch(() => {
        alert("Unable to create the playlist");
      });
  };

  const canGenerate = state.parameters !== parameters && seedTracks.length >= 3;
  const canAddPlaylist = state.tracks.length > 0;

  return (
    <div className="playlist">
      <h2 className="section-title">Step 4: Generate your playlist</h2>
      <div className="playlist-controls">
        <button
          className="spotify-button playlist-button"
          disabled={!canGenerate}
          onClick={handleGenerateClicked}
        >
          Generate
        </button>
        <button
          className="spotify-button playlist-button"
          disabled={!canAddPlaylist}
          onClick={handleAddPlaylistClicked}
        >
          Add playlist
        </button>
      </div>
      <div className="playlist-tracks">
        {isGenerating ? (
          <Spinner />
        ) : (
          state.tracks.map((t) => <TrackListItem track={t} key={t.id} />)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  seedTracks: state.seedTracks,
  parameters: state.parameters,
  authentication: state.authentication,
});

export default connect(mapStateToProps, {})(Playlist);
