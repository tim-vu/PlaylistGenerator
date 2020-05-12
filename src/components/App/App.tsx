import React from "react";

import "./App.css";

import SeedSelector from "../SeedSelector/SeedSelector";
import Parameters from "../Parameters/Parameters";
import Playlist from "../Playlist/Playlist";
import SpotifyLogin from "../SpotifyLogin/SpotifyLogin";

const CLIENT_ID = "9725f36404fa4862966e006f02481944";
const SCOPES = ["playlist-modify-public"];
//const REDIRECT_URI = "http://localhost:3000";
const REDIRECT_URI = "https://tim-vu.github.io/PlaylistGenerator/";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <SpotifyLogin
        clientId={CLIENT_ID}
        scopes={SCOPES}
        redirectUri={REDIRECT_URI}
      />
      <div className="page">
        <div className="configuration">
          <SeedSelector />
          <Parameters />
        </div>
        <Playlist />
      </div>
    </React.Fragment>
  );
};

export default App;
