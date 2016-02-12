import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import InitializeActions from './actions/initializeActions';
import routes from './routes';

InitializeActions.initApp();

const history = createBrowserHistory();

ReactDOM.render(
    <Router history = { history }>
        {routes}
    </Router>,
    document.getElementById('app')
);
