/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IStore} from '~react-redux~redux';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';
import {Router, hashHistory} from 'react-router';
import routes from './app/config/routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/animate.css/animate.min.css';
import './inspinia.css';

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
