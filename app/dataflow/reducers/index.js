import { routerReducer } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';
import weatherReducer from './weather';
import mainReducer from './main';
import locationReducer from './location';
import { load } from '../../utils/localStorage';
import { DEFAULT_METRIC } from '../../utils/constants';

const stored = load('store') || {};
const { city, countryCode, metric, main } = stored;

const initialState = {
    geolocation: {
        code: -1,
        message: 'You location is not defined',
    },
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
    nearestCities: [],
    metric: metric || DEFAULT_METRIC,
    countryCode,
    city,
    cache: {},
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
