import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import onStateChange from 'redux-on-state-change';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { save } from '../../utils/localStorage';
import storeChangeHandler from './onStoreChange';

const middleware = routerMiddleware(browserHistory);

const composeEnhancers =
  typeof window === 'object' &&
/*eslint-disable no-underscore-dangle*/
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/*eslint-enable no-underscore-dangle*/
const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    middleware,
    onStateChange(storeChangeHandler),
));
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer,
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
