import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import fetchedForecast from '../utils/testForecast';
import fetchedWeather from '../utils/testWeather';
import fetchedLocation from '../utils/testLocation';

const initialState = {
    geolocation: fetchedLocation,
    city: 'Minsk',
    weather: fetchedWeather,
    forecast: fetchedForecast,
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
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    weatherApp,
    routing,
});

export default rootReducer;
