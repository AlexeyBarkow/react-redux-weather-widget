import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middleware = routerMiddleware(browserHistory);

const composeEnhancers =
  typeof window === 'object' &&
/*eslint-disable no-underscore-dangle*/
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/*eslint-enable no-underscore-dangle*/
const enhancer = composeEnhancers(applyMiddleware(thunk, middleware));
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer,
    );

    return store;
}
