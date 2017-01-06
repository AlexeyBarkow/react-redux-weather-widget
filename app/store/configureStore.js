import { createStore } from 'redux';
import rootReducer from '../reducers/index.js';
import DevTools from '../containers/DevTools.jsx';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        DevTools.instrument()
    );
    
    return store;
}
