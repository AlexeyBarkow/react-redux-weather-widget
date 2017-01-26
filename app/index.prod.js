import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import Root from './containers/Root';

import css from './styles/global.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    (
        <Root history={history} store={store}/>
    ),
    document.getElementById('root'));
