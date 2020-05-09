
export interface AuthenticationState {
  isAuthenticated: boolean;
  accessToken: string;
}


export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const RESET_AUTHENTICATION = "RESET_AUTHENTICATION";

export interface AuthenticationSuccess {
  type: typeof AUTHENTICATION_SUCCESS;
  accessToken: string;
}


export interface ResetAuthentication {
  type: typeof RESET_AUTHENTICATION;
}

export type AuthenticationActions = AuthenticationSuccess | ResetAuthentication;