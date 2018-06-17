import * as constants from '../constants';
import { HttpWrapper } from '../services/http-wrapper';
//http-wrapper
const http = new HttpWrapper();

interface Loading {
  type: constants.LOADING;
}

interface LoadingCompleted {
  type: constants.LOADING_COMPLETED;
}

interface GetTripsSuccess {
  type: constants.GET_TRIPS_SUCCESS;
  trips: any[];
}

interface IsAuthenticated {
  type: constants.IS_AUTHENTICATED;
  isAuthenticated: boolean;
}

export type LoadingAction = Loading | LoadingCompleted;

export type ApiAction = GetTripsSuccess | IsAuthenticated;

//generic actionCreator for sync click events
export const nodeClicked = (type): LoadingAction => ({ type })

//TODO: refactor to call this loading, use it as generic loading action
export const requestTrips = (): LoadingAction => ({
  type: constants.LOADING
});

export const loading = (): LoadingAction => ({
  type: constants.LOADING
});

export const callCompleted = (): LoadingAction => ({
  type: constants.LOADING_COMPLETED
});

export const receiveTrips = (trips): ApiAction => ({
  type: constants.GET_TRIPS_SUCCESS,
  trips,
});

export const isAuthenticated = (isAuthenticated: boolean) => ({
  type: constants.IS_AUTHENTICATED,
  isAuthenticated
})

export const httpError = () => ({
  type: constants.HTTP_ERROR
});

export function verifyAuth() {
  return (dispatch) => {
    http.get(`${constants.appConstants.apiUrl}/auth/verify`)
      .then(isVerified => dispatch(isAuthenticated(isVerified.success)))
      .catch(() => dispatch(httpError()));
  };
}

export function loginUser(creds: any) {
  return (dispatch) => {
    dispatch(loading());
    http.post(`${constants.appConstants.apiUrl}/auth/signin`, creds)
      .then(response => {
        localStorage.setItem('token', response.token)
        dispatch(isAuthenticated(true))
      })
      .catch(() => dispatch(httpError()));
  };
}

//async action creators: redux docs do show these action creators within the actions file
export function getTrips() {
  return (dispatch) => {
    //basically a loading event
    dispatch(requestTrips());
    http.get(`${constants.appConstants.apiUrl}/trips`)
      .then(items => dispatch(receiveTrips(items)))
      .catch(() => dispatch(httpError()));
    };
}
