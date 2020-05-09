import {AuthenticationActions, AuthenticationState} from "./types";

const initialState : AuthenticationState = {
  isAuthenticated: false,
  accessToken: ""
}

export function authenticationReducer(state = initialState, action: AuthenticationActions) : AuthenticationState {
  switch (action.type) {
    case "RESET_AUTHENTICATION":
      return {
        isAuthenticated: false,
        accessToken: ""
      }
    case "AUTHENTICATION_SUCCESS":
      return {
        isAuthenticated: true,
        accessToken: action.accessToken
      };
    default:
      return state;
  }
}
