import {applyMiddleware, combineReducers, createStore} from "redux";
import {seedTrackReducer} from "./seedtrack/reducers";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {parameterReducer} from "./parameter/reducers";
import {authenticationReducer} from "./authentication/reducers";

const rootReducer = combineReducers({
  seedTracks: seedTrackReducer,
  parameters: parameterReducer,
  authentication: authenticationReducer
})

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(rootReducer, composeWithDevTools(middlewareEnhancer));
}