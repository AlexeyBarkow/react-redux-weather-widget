import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

// temporary data filler
const fetchedWeather = {
    'coord': {
        'lon': 145.77,
        'lat': -16.92,
    },
    'weather': [
        {
            'id': 803,
            'main': 'Clouds',
            'description': 'broken clouds',
            'icon': '04n',
        },
    ],
    'base': 'cmc stations',
    'main': {
        'temp': 293.25,
        'pressure': 1019,
        'humidity': 83,
        'temp_min': 289.82,
        'temp_max': 295.37,
    },
    'wind': {
        'speed': 5.1,
        'deg': 150,
    },
    'clouds': { 'all': 75 },
    'rain': { '3h': 3 },
    'dt': 1435658272,
    'sys': {
        'type': 1,
        'id': 8166,
        'message': 0.0166,
        'country': 'AU',
        'sunrise': 1435610796,
        'sunset': 1435650870,
    },
    'id': 2172797,
    'name': 'Cairns',
    'cod': 200,
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
