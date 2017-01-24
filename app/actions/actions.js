import * as types from './types.js';
import getCityAjax from '../API/getCity.js';


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

export function getWeather(city) {
    return (dispatch) => {
        getWeatherAjax.then(data => {
            dispatch(changeWeatherInfo(data));
        })
    }
}
