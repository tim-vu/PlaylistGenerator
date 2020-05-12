import React, { useEffect } from "react";

import "./SpotifyLogin.css";
import "../App/App.css";

import { connect } from "react-redux";
import { AppState } from "../../store";
import {
  AuthenticationState,
  AuthenticationSuccess,
} from "../../store/authentication/types";
import { authenticationSuccess } from "../../store/authentication/actions";
import { toParams, toQuery } from "../../common/utils";
import { ThunkDispatch } from "redux-thunk";

const AUTHORIZATION_URL = "https://accounts.spotify.com/authorize";

interface SpotifyLoginProps {
  clientId: string;
  scopes: string[];
  redirectUri: string;
  authentication: AuthenticationState;
  authenticationSuccess: (accessToken: string, expiresIn: number) => void;
}

const SpotifyLogin: React.FC<SpotifyLoginProps> = ({
  clientId,
  scopes,
  redirectUri,
  authentication,
  authenticationSuccess,
}) => {
  const handleLoginClicked = () => {
    const params = {
      client_id: clientId,
      response_type: "token",
      scope: scopes.join(" "),
      redirect_uri: redirectUri,
    };

    window.location.href = AUTHORIZATION_URL + "?" + toQuery(params);
  };

  useEffect(() => {
    const url = window.location.href;

    const index = url.indexOf("#");
    if (index === -1) return;

    const paramString = url.substring(index + 1);

    const params = toParams(paramString);

    if (!("access_token" in params) || !("expires_in" in params)) return;

    window.history.replaceState(
      null,
      "Playlist Generator",
      url.substring(0, index)
    );

    authenticationSuccess(
      params["access_token"],
      parseInt(params["expires_in"])
    );
    // eslint-disable-next-line
  }, []);

  const className = authentication.isAuthenticated ? "hide" : "show";

  return (
    <div className={"spotify-login " + className}>
      <div className="spotify-login-title">
        <h1>Playlist Generator for Spotify</h1>
        <div className="spotify-login-content">
          <h2>Step 1: Login to spotify</h2>
          <button
            className="spotify-login-button spotify-button"
            onClick={handleLoginClicked}
          >
            Sign in with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  authentication: state.authentication,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthenticationSuccess>
) => ({
  authenticationSuccess: (accessToken: string, expiresIn: number) =>
    dispatch(authenticationSuccess(accessToken, expiresIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyLogin);
