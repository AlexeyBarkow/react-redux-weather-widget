import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

import {syncHistoryWithStore} from 'react-router-redux';

import css from './styles/global.scss';

import {AppContainer} from 'react-hot-loader';
import Root from './containers/Root.jsx';
import configureStore from './store/configureStore.js';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root history={history} store={store}/>
  </AppContainer>,
  document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/Root.jsx', () => {
    const NewRoot = require('./containers/Root.jsx').default;
    render(
      <AppContainer>
      <NewRoot history={history} store={store}/>
    </AppContainer>, document.getElementById('root'))
  });
}
