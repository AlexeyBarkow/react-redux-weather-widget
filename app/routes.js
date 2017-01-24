import React from 'react';
import { Route } from 'react-router';

import RootContainer from './containers/RootContainer';
import About from './components/About';

const router = (
    <Route path="/" component={RootContainer}>
        <Route path="/about" component={About} />
    </Route>
);
export default router;
