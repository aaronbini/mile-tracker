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

export type LoadingAction = Loading | LoadingCompleted;

export type ApiAction = GetTripsSuccess;

//generic actionCreator for sync click events
export const nodeClicked = (type): LoadingAction => ({ type })

export const requestTrips = (): LoadingAction => ({
  type: constants.LOADING
});

export const callCompleted = (): LoadingAction => ({
  type: constants.LOADING_COMPLETED
});

export const receiveTrips = (trips): ApiAction => ({
  type: constants.GET_TRIPS_SUCCESS,
  trips,
});

export const httpError = () => ({
  type: constants.HTTP_ERROR
});

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
