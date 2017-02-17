import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import onStateChange from 'redux-on-state-change';
import { routerMiddleware } from 'react-router-redux';
import browserHistory from '../../history';
import storeChangeHandler from './onStoreChange';

const middleware = routerMiddleware(browserHistory);

const composeEnhancers = typeof window === 'object' &&
/*eslint-disable no-underscore-dangle*/
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/*eslint-enable no-underscore-dangle*/

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    middleware,
    onStateChange(storeChangeHandler),
));

export default enhancer;
