/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import Main from '../components/layouts/Main';
import App from '../containers/App';

import MainView from '../views/Main';
import MinorView from '../views/Minor';

import { Route, Router, IndexRedirect, browserHistory} from 'react-router';

export default (
    <Router history={browserHistory}>
        <Route path='/todo' component={App}/>
        <Route path='/' component={Main}>
            <IndexRedirect to='/todo' />
            <Route path='main' component={MainView}> </Route>
            <Route path='minor' component={MinorView}> </Route>
        </Route>
    </Router>

);
