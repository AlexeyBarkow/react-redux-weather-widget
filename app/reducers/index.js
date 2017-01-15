import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types.js';

const initialState = {
    geolocation: null,
    city: null,
    weather: null
}

function weatherApp(state = initialState, action) {
    switch (action.type) {
        case types.SET_CITY:
            return Object.assign({}, state, {
                city: action.city
            });
        case types.UPDATE_WEATHER_INFO:
            return Object.assign({}, state, {
                weather: action.weather
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    weatherApp,
    routing
});

export default rootReducer;
