import * as constants from '../constants';

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

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | OpenDialog | CloseDialog;
//action methods, returning object with type property that has value of the type of action to take against the current state
//should be called when responses are received from the http requests
//
// export function incrementEnthusiasm(): IncrementEnthusiasm {
//   return {
//       type: constants.INCREMENT_ENTHUSIASM
//   }
// }

export function nodeClicked(type): EnthusiasmAction {
  return {
    type
  }
}

// export function decrementEnthusiasm(): DecrementEnthusiasm {
//   return {
//       type: constants.DECREMENT_ENTHUSIASM
//   }
// }
