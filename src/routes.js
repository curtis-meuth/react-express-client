import React from 'react';
import { Route, Redirect, Link, IndexRoute } from 'react-router';

//Components
import App from './components/app';
import HomePage from './components/homePage';
import GroceryItemList from './components/groceries/GroceryItemList';

let routes = (
    <Route path="/" component={ App }>
        <IndexRoute component={ HomePage } />
        <Route path="/groceries" component={ GroceryItemList } />
    </Route>
);

export default routes;