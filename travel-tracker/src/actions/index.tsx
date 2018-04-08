import * as constants from '../constants';
import 'whatwg-fetch';

interface IncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM;
}

interface DecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM;
}

interface OpenDialog {
  type: constants.OPEN_DIALOG;
}

interface CloseDialog {
  type: constants.CLOSE_DIALOG;
}

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

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | OpenDialog | CloseDialog;

export type LoadingAction = Loading | LoadingCompleted;

export type ApiAction = GetTripsSuccess;

//generic actionCreator for sync click events
export function nodeClicked(type): EnthusiasmAction {
  return {
    type
  }
}

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
export function getTrips(url: string) {
  
  return (dispatch) => {
    //basically a loading event
    dispatch(requestTrips());
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((response) => {
      console.log('fetched: ', response)
      if (!response.ok) {
          throw Error(response.statusText);
      }
      //loading completed event
      dispatch(callCompleted());
      return response;
  })
  .then((response) => response.json())
  .then((items) => dispatch(receiveTrips(items)))
  .catch(() => dispatch(httpError()));
  };
}
