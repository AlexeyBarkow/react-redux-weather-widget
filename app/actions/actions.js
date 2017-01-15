import * as types from './types.js';

export function changeCity(city) {
    return {
        type: types.SET_CITY,
        city
    };
}

export function changeWeatherInfo(weather) {
    return {
        type: types.UPDATE_WEATHER_INFO,
        weather
    }
}
