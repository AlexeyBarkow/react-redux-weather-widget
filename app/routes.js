import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './containers/RootContainer';
import About from './components/About';
import IndexMain from './containers/IndexMain';

const router = (
    <Route path="/" component={RootContainer}>
        <Route path="/about" component={About} />
        <Route path="/home" component={IndexMain} />
        <IndexRoute component={IndexMain} />
    </Route>
);
export default router;
