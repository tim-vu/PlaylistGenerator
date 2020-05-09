import React, { ReactNode } from "react";
import "spotify-web-api-js";

import "./TrackListItem.css";

interface TrackListItemProps {
  track: SpotifyApi.TrackObjectFull;
  icon?: ReactNode;
}

const artistsToString = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
  return artists
    .splice(1)
    .reduce(
      (acc: string, curr: SpotifyApi.ArtistObjectSimplified) =>
        acc + ", " + curr.name,
      artists[0].name
    );
};

const TrackListItem: React.FC<TrackListItemProps> = ({ track, icon }) => {
  const coverImageUrl = track.album.images.reduce(
    (acc: SpotifyApi.ImageObject, curr: SpotifyApi.ImageObject) =>
      // @ts-ignore
      curr.width < acc.width ? curr : acc
  );

  return (
    <li className="track-item">
      <div className="track-description">
        <div className="track-cover">
          <img
            width={48}
            src={coverImageUrl.url}
            alt={"Cover of album " + track.album.name}
          />
        </div>
        <div className="track-info">
          <h4 className="track-name">{track.name}</h4>
          <p className="track-album">
            {artistsToString(track.artists)} • {track.album.name}
          </p>
        </div>
      </div>
      <div className="track-icon">{icon}</div>
    </li>
  );
};

export default TrackListItem;
