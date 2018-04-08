import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { IAppState } from './types/index';

//TODO: will need to call combineReducers at some point and replace the below 'enthusiasm' once there are more reducers
//second param passed to createStore is the persisted or initial state
const store = createStore<IAppState>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
  testDialogOpen: false
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
