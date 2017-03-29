import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import weatherReducer from './weather';
import mainReducer from './main';
import locationReducer from './location';
import favoritesReducer from './favorites';
import dragAndDropReducer from './dragAndDrog';
import tooltipReducer from './tooltip';
import { load } from '../../utils/localStorage';
import { DEFAULT_METRIC } from '../../utils/constants';

const stored = load('store') || {};
const { city, countryCode, metric, main, location, favoriteCities } = stored;

const initialState = {
    location: {
        geolocation: {
            code: -1,
            message: 'You location is not defined',
        },
        nearestCities: [],
    },
    weather: {
        weather: {
            status: 0,
            message: 'No location API available to get initial state',
            weatherTypes: [{ main }],
            location,
        },
        forecast: [{
            status: 0,
            message: 'No location API available to get initial state',
        }],
        forecastFilter: '12H',
        cache: {},
    },
    main: {
        city,
        countryCode,
        metric: metric || DEFAULT_METRIC,
        autocomplete: [],
    },
    favorites: {
        favoriteCities: favoriteCities || [],
        filters: {},
    },
    form: {},
    dragAndDrop: {},
    tooltip: {},
};

const finalReducer = combineReducers({
    form: formReducer,
    location: locationReducer,
    weather: weatherReducer,
    main: mainReducer,
    routing: routerReducer,
    favorites: favoritesReducer,
    dragAndDrop: dragAndDropReducer,
    tooltip: tooltipReducer,
});

function rootReducer(state = initialState, action) {
    return finalReducer(state, action);
}

export default rootReducer;
