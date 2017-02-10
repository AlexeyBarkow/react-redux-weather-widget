import { routerReducer } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';
import weatherReducer from './weather';
import mainReducer from './main';
import locationReducer from './location';
import { load } from '../../utils/localStorage';

const stored = load('store') || {};
const { city, countryCode, metric } = stored;

const initialState = {
    geolocation: {
        code: -1,
        message: 'You location is not defined',
    },
    weather: {
        status: 0,
        message: 'No location API available to get initial state',
    },
    forecast: [{
        status: 0,
        message: 'No location API available to get initial state',
    }],
    forecastFilter: '12H',
    nearestCities: [],
    countryCode,
    city,
    metric: metric || 'C',
};

const reduce = reduceReducers(
    mainReducer,
    weatherReducer,
    locationReducer,
    routerReducer,
);

function rootReducer(state = initialState, action) {
    return reduce(state, action);
}

export default rootReducer;
