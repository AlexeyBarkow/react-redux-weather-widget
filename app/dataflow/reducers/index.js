import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import weatherReducer from './weather';
import mainReducer from './main';
import locationReducer from './location';
import { load } from '../../utils/localStorage';
import { DEFAULT_METRIC } from '../../utils/constants';

const stored = load('store') || {};
const { city, countryCode, metric, main } = stored;

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
    form: {},
};

const finalReducer = combineReducers({
    form: formReducer,
    location: locationReducer,
    weather: weatherReducer,
    main: mainReducer,
    routing: routerReducer,
});

function rootReducer(state = initialState, action) {
    return finalReducer(state, action);
}

export default rootReducer;
