import { routerReducer } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';
import routingChangeReducer from './router';
import weatherReducer from './weather';
import mainReducer from './main';
import locationReducer from './location';
import { load } from '../../utils/localStorage';

const stored = load('store') || {};
const { city, countryCode, metric } = stored;

const initialState = {
    geolocation: null,
    weather: {
        status: 0,
        message: 'not fetched',
    },
    forecast: [{
        status: 0,
        message: 'not fetched',
    }],
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
    routingChangeReducer,
);

function rootReducer(state = initialState, action) {
    return reduce(state, action);
}

export default rootReducer;
