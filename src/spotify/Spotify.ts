import {RecommendationParameters} from "../common/types";
import SpotifyWebApi from "spotify-web-api-js";

export const generatePlaylist = async (tracks : SpotifyApi.TrackObjectFull[], parameters : RecommendationParameters, accessToken: string) : Promise<SpotifyApi.TrackObjectFull[]> => {

  await new Promise(r => setTimeout(r, 5000));

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);

  const trackAnalyses = await spotifyApi.getAudioFeaturesForTracks(tracks.map(t => t.id));

  if(trackAnalyses.audio_features.length !== tracks.length){
    throw new Error("Unable to fetch audio features");
  }

  const averageBpm = trackAnalyses.audio_features.reduce((acc: number, curr: SpotifyApi.AudioFeaturesObject) => acc + curr.tempo, 0) / trackAnalyses.audio_features.length;

  const recommendationOptions : SpotifyApi.RecommendationsOptionsObject = {
    seed_tracks: tracks.map(t => t.id),
    //seed_artists: tracks.flatMap(t => t.artists.map(a => a.id)),
    min_tempo: averageBpm - parameters.tempoVariance,
    max_tempo: averageBpm + parameters.tempoVariance,
    target_tempo: averageBpm,
    target_danceability: parameters.danceability,
    target_energy: parameters.energy,
    target_popularity: parameters.popularity,
    target_valence: parameters.valence
  }

  const recommendationResponse = await spotifyApi.getRecommendations(recommendationOptions);

  if(recommendationResponse.tracks.length === 0)
    return [];

  const trackResponse = await spotifyApi.getTracks(recommendationResponse.tracks.map(t => t.id));

  return trackResponse.tracks;
}

export const addPlaylist = async (name: string, tracks: SpotifyApi.TrackObjectSimplified[], accessToken: string) => {

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);

  const user = await spotifyApi.getMe();

  const response = await spotifyApi.createPlaylist(user.id, { description: "Created with SpotifyPlaylistGenerator", name: name});

  await spotifyApi.addTracksToPlaylist(response.id, tracks.map(t => t.uri))
}