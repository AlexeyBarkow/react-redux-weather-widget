import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { save } from '../../utils/localStorage';
import enhancer from '../middlewares/index';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer,
    );
    store.subscribe(() => {
        const state = store.getState();
        const { main: { city, countryCode, metric }, weather: { weather: { location } } } = state;
        const main = state.weather.weather.weatherTypes && state.weather.weather.weatherTypes[0]
            && state.weather.weather.weatherTypes[0].main;
        save('store', {
            city,
            countryCode,
            metric,
            main,
            location,
        });
    });

    return store;
}
