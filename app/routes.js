import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './containers/RootContainer';
import About from './components/About';
import MainContainer from './containers/MainContainer';

const router = (
    <Route path="/" component={RootContainer}>
        <Route path="/about" component={About} />
        <IndexRoute component={MainContainer} />
    </Route>
);
export default router;
