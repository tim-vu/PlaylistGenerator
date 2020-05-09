import {AUTHENTICATION_SUCCESS, RESET_AUTHENTICATION, ResetAuthentication} from "./types";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {AppState} from "../index";

export const  authenticationSuccess = (accessToken: string, expiresIn: number) : ThunkAction<void, AppState, unknown, Action<string>> => dispatch => {
  dispatch({
    type: AUTHENTICATION_SUCCESS,
    accessToken: accessToken
  });

  setTimeout(() => {
    dispatch(resetAuthentication())
  }, expiresIn * 1000)
}


export function resetAuthentication() : ResetAuthentication {
  return {
    type: RESET_AUTHENTICATION
  }
}