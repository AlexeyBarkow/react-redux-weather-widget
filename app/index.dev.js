import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import browserHistory from './history';
import configureStore from './dataflow/store/configureStore';
import Root from './containers/Root';
import { ROOT_NODE } from './utils/constants';

import './styles/global.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.routing,
});

render(
    (
        <AppContainer>
            <Root history={history} store={store} />
        </AppContainer>
    ), ROOT_NODE);

if (module.hot) {
    module.hot.accept('./containers/Root.js', () => {
        const NewRoot = require('./containers/Root.js').default;
        render(
            (
                <AppContainer>
                    <NewRoot history={history} store={store} />
                </AppContainer>
            ), ROOT_NODE);
    });
}
