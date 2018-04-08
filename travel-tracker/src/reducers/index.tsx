// src/reducers/index.tsx

import { EnthusiasmAction } from '../actions';
import { IAppState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, OPEN_DIALOG, CLOSE_DIALOG } from '../constants/index';
//TODO: export multiple methods for updating state or in this file register multiple reducers and then call combineReducers and export that
export function enthusiasm(state: IAppState, action: EnthusiasmAction): IAppState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    case OPEN_DIALOG:
      return { ...state, testDialogOpen: true };
    case CLOSE_DIALOG:
      return { ...state, testDialogOpen: false};
  }
  return state;
}