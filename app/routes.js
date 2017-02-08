import React from 'react';
import { Route, IndexRoute } from 'react-router';
import RootContainer from './containers/connectors/RootContainerConnector';
import About from './components/About';
import IndexMain from './containers/connectors/IndexMainConnector';
import WrongPath from './components/WrongPath';

const routes = (
    <Route path="/" component={RootContainer}>
        <IndexRoute component={IndexMain} />
        <Route path="/home" component={IndexMain} />
        <Route path="/cities/:country/:cityname" component={IndexMain} />
        <Route path="/about" component={About} />
        <Route path="*" component={WrongPath} />
    </Route>
);
export default routes;
