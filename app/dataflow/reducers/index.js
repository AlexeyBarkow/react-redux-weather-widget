import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import fetchedLocation from '../../utils/testLocation';

const initialState = {
    geolocation: fetchedLocation,
    city: 'Minsk',
    weather: {
        status: 0,
        message: 'not fetched',
    },
    forecast: [{
        status: 0,
        message: 'not fetched',
    }],
};


function weatherApp(state = initialState, action) {
    switch (action.type) {
        case types.SET_CITY:
            return {
                ...state,
                city: action.city,
            };
        case types.UPDATE_WEATHER_INFO:
            return {
                ...state,
                weather: action.weather,
            };
        case types.UPDATE_FORECAST:
            return {
                ...state,
                forecast: action.forecast,
            };
        case types.SET_AUTOCOMPLETE_ARRAY:
            return {
                ...state,
                autocomplete: action.autocomplete,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    weatherApp,
    routing,
});

export default rootReducer;
