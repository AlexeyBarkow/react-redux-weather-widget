import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Router, Route, IndexRoute } from 'react-router';
import RootContainer from './containers/RootContainer.js';
import About from './components/About.js';

const router = (
    <Route path="/" component={RootContainer}>
        <Route path="/about" component={About}></Route>
    </Route>
);
export default router;
