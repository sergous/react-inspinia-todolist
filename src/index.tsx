/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IStore} from '~react-redux~redux';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';
import {Router, hashHistory} from 'react-router';
import routes from './app/config/routes';

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
