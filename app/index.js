import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore.js';
import Root from './containers/Root.js';

import css from './styles/global.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    (
        <AppContainer>
            <Root history={history} store={store}/>
        </AppContainer>
    ),
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./containers/Root.js', () => {
        const NewRoot = require('./containers/Root.js').default;
        render(
            (
                <AppContainer>
                    <NewRoot history={history} store={store}/>
                </AppContainer>
            ),
            document.getElementById('root'));
    });
}
