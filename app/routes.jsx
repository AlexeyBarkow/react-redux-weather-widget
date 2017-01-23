import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Router, Route, IndexRoute} from 'react-router';
import AppContainer from './containers/AppContainer.jsx';
import About from './components/About.jsx';

const router = (
  <Route path="/" component={AppContainer}>
    <Route path="/about" component={About}></Route>
  </Route>
);
export default router;
