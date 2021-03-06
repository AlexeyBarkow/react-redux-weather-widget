import { createStore } from 'redux';
import rootReducer from '../reducers';
import { save } from '../../utils/localStorage';
import enhancer from '../middlewares';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer,
    );
    store.subscribe(() => {
        const state = store.getState();
        const {
            main: { city, countryCode, metric },
            weather: { weather: { location } },
            favorites: { favoriteCities },
        } = state;
        const main = state.weather.weather.weatherTypes && state.weather.weather.weatherTypes[0]
            && state.weather.weather.weatherTypes[0].main;
        save('store', {
            city,
            countryCode,
            metric,
            main,
            location,
            favoriteCities,
        });
    });

    return store;
}
