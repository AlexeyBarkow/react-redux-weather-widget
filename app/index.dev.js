import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './dataflow/store/configureStore';
import Root from './containers/Root';

import './styles/global.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state,
});

render(
    (
        <AppContainer>
            <Root history={history} store={store} />
        </AppContainer>
    ),
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./containers/Root.js', () => {
        const NewRoot = require('./containers/Root.js').default;
        render(
            (
                <AppContainer>
                    <NewRoot history={history} store={store} />
                </AppContainer>
            ),
            document.getElementById('root'));
    });
}
