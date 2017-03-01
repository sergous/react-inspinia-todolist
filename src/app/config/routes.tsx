/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import Main from '../components/layouts/Main';
import TodoView from '../components/views/TodoView';
import ContactsView from '../components/views/ContactsView';

import { Route, Router, IndexRedirect, hashHistory} from 'react-router';

export default (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRedirect to='/contacts' />
            <Route path='contacts' component={ContactsView}> </Route>
            <Route path='todo' component={TodoView}> </Route>
        </Route>
    </Router>

);
