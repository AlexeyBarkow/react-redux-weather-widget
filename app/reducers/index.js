import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

// temporary data filler
const fetchedWeather = {
    'city': 'Minsk',
    'metric': 'C',
    'status': 200,
    'humidity': 92,
    'temperature': {
        'curr': -1,
        'min': -2,
        'max': 0,
    },
    'pressure': 1027,
    'weatherType': [{
        'main': 'cloudy',
        'desc': 'Mist',
    }],
    'clouds': 90,
    'wind': {
        'speed': 4,
        'direction': 180,
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1485766800000,
};

const initialState = {
    geolocation: null,
    city: null,
    weather: fetchedWeather,
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
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    weatherApp,
    routing,
});

export default rootReducer;
