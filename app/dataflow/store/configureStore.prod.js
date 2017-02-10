import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import onStateChange from 'redux-on-state-change';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { save } from '../../utils/localStorage';
import storeChangeHandler from './onStoreChange';

const middleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, middleware, onStateChange(storeChangeHandler)),
    );

    store.subscribe(() => {
        const { city, countryCode, metric } = store.getState();
        save('store', {
            city,
            countryCode,
            metric,
        });
    });

    return store;
}
