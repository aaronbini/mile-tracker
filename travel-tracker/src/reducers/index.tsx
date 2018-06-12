// src/reducers/index.tsx

import { LoadingAction, ApiAction } from '../actions';
import { IAppState } from '../types/index';
import { LOADING, GET_TRIPS_SUCCESS } from '../constants/index';
//TODO: export multiple methods for updating state or in this file register multiple reducers and then call combineReducers and export that
export function rootReducer(state: IAppState, action: LoadingAction | ApiAction): IAppState {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_TRIPS_SUCCESS:
      return { ...state, userTrips: action.trips, loading: false };
  }
  return state;
}