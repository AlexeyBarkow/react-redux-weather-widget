import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import onStateChange from 'redux-on-state-change';
import { routerMiddleware } from 'react-router-redux';
import browserHistory from '../../history';
import storeChangeHandler from './onStoreChange';

const middleware = routerMiddleware(browserHistory);

const enhancer = compose(applyMiddleware(
    thunk,
    middleware,
    onStateChange(storeChangeHandler),
));

export default enhancer;
