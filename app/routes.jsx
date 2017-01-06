import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import About from './components/About.jsx';

const router = (
    <Route path="/" component={ App }>
        // <IndexRoute component={ App }></IndexRoute>
        <Route path="/about" component={ About }></Route>
    </Route>
);
export default router;
