import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './dataflow/store/configureStore';
import Root from './containers/Root';
import { ROOT_NODE } from './utils/constants';

import './styles/global.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state,
});

render(
    (
        <Root history={history} store={store} />
    ), ROOT_NODE);
