import React from "react";

import "./SeedSelector.css";
import "../App/App.css";

import CrossIcon from "./cross.svg";
import SearchBar from "../SearchBar/SearchBar";

import "spotify-web-api-js";
import SpotifyWebApi from "spotify-web-api-js";
import TrackListItem from "../TrackListItem/TrackListItem";
import Checkbox from "../Checkbox/Checkbox";
import { AppState } from "../../store";
import { SeedTrackState } from "../../store/seedtrack/types";
import { deselectTrack, selectTrack } from "../../store/seedtrack/actions";
import { connect } from "react-redux";
import { AuthenticationState } from "../../store/authentication/types";

const TRACKS_DISPLAYED = 5;

const SpotifyApi = new SpotifyWebApi();

interface SeedSelectorProps {
  selectTrack: typeof selectTrack;
  deselectTrack: typeof deselectTrack;
  seedTracks: SeedTrackState;
  authentication: AuthenticationState;
}

const SeedSelector: React.FC<SeedSelectorProps> = ({
  selectTrack,
  deselectTrack,
  seedTracks,
  authentication,
}) => {
  const [tracks, setTracks] = React.useState<SpotifyApi.TrackObjectFull[]>([]);

  SpotifyApi.setAccessToken(authentication.accessToken);

  const handleQueryChanged = async (query: string) => {
    if (query.length === 0) {
      setTracks([]);
      return;
    }

    const response = await SpotifyApi.searchTracks(query);
    setTracks(response.tracks.items);
  };

  const handleCheckedChange = (
    track: SpotifyApi.TrackObjectFull,
    checked: boolean
  ) => {
    if (checked) {
      selectTrack(track);
    } else {
      deselectTrack(track.id);
    }
  };

  const classNameDropdown = tracks.length === 0 ? "hide" : "show";

  return (
    <div>
      <div className="seed-selector">
        <h2 className="section-title">Step 2: Select seed songs</h2>
        <div className="searchbar-wrapper">
          <SearchBar onQueryChanged={handleQueryChanged} />
        </div>
        <div className="search-results">
          <div className={"search-results-dropdown " + classNameDropdown}>
            {tracks.slice(0, TRACKS_DISPLAYED).map((t) => (
              <TrackListItem
                track={t}
                key={t.id}
                icon={
                  <Checkbox
                    id={t.id}
                    checked={seedTracks.some((e) => e.id === t.id)}
                    onCheckedChanged={(checked) =>
                      handleCheckedChange(t, checked)
                    }
                  />
                }
              />
            ))}
          </div>
        </div>
        <div className={"seed-tracks"}>
          {seedTracks.map((t) => (
            <TrackListItem
              track={t}
              key={t.id}
              icon={
                <button
                  className="seed-tracks-deselect"
                  onClick={() => handleCheckedChange(t, false)}
                >
                  <img src={CrossIcon} alt="cross icon" />
                </button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  seedTracks: state.seedTracks,
  authentication: state.authentication,
});

export default connect(mapStateToProps, { selectTrack, deselectTrack })(
  SeedSelector
);