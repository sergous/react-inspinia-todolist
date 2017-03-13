/// <reference path="../../../typings/index.d.ts" />

import {createStore} from 'redux';
import rootReducer from '../reducers/index';
//noinspection TypeScriptCheckImport
import { devToolsEnhancer } from 'redux-devtools-extension';

declare var module: any;
export default function configureStore(initialState: any) {
  const store = createStore(rootReducer,
                            /* initialState */
                            devToolsEnhancer());
  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
