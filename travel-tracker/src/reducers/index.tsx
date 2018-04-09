// src/reducers/index.tsx

import { EnthusiasmAction, LoadingAction, ApiAction } from '../actions';
import { IAppState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, OPEN_DIALOG, CLOSE_DIALOG, LOADING, LOADING_COMPLETED, GET_TRIPS_SUCCESS } from '../constants/index';
//TODO: export multiple methods for updating state or in this file register multiple reducers and then call combineReducers and export that
export function rootReducer(state: IAppState, action: EnthusiasmAction | LoadingAction | ApiAction): IAppState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    case OPEN_DIALOG:
      return { ...state, testDialogOpen: true };
    case CLOSE_DIALOG:
      return { ...state, testDialogOpen: false };
    case LOADING:
      return { ...state, loading: true };
    case LOADING_COMPLETED:
      return { ...state, loading: false };
    case GET_TRIPS_SUCCESS:
      return { ...state, userTrips: action.trips };
  }
  return state;
}