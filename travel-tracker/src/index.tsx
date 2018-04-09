import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import App from './containers/App';
import './styles/index.css';
import { rootReducer } from './reducers/index';
import { IAppState } from './types/index';
import registerServiceWorker from './registerServiceWorker';

//first param is reducer or reducers (call combineReducers from reducers index.tsx)
//second param passed to createStore is the persisted or initial state
//third param is middleware that needs to be registered, in this case thunk for dispatching async actions
const store = createStore<IAppState>(rootReducer, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
  testDialogOpen: false,
  userTrips: [],
  loading: false
}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
