// ToDo: separate actions into different files
import * as types from './types';
import getWeatherAjax from '../../utils/weatherAPI';
import loadLocation from '../../utils/geolocationAPI';
import getCityAjax from '../../utils/getCityAPI';

export function changeCity(city) {
    return {
        type: types.SET_CITY,
        city,
    };
}

export function changeWeatherInfo(weather) {
    return {
        type: types.UPDATE_WEATHER_INFO,
        weather,
    };
}

export function changeForecastInfo(forecast) {
    return {
        type: types.UPDATE_FORECAST,
        forecast,
    };
}

export function changeLocation(location) {
    return {
        type: types.UPDATE_LOCATION,
        location,
    };
}

export function setCityAutocompleteArray(autocomplete) {
    return {
        type: types.SET_AUTOCOMPLETE_ARRAY,
        autocomplete,
    };
}

export function autocompleteCity(beginning) {
    return (dispatch) => {
        getCityAjax(beginning)
          .then((data) => {
              dispatch(setCityAutocompleteArray(data));
          });
    };
}

export function getWeather(city, code, metric) {
    return (dispatch) => {
        getWeatherAjax.fetchCurrentWeather(city, code, metric)
          .then((data) => {
              dispatch(changeWeatherInfo(data));
          });
    };
}

export function getForecast(city, code, metric) {
    return (dispatch) => {
        getWeatherAjax.fetchWeatherForecast(city, code, metric)
          .then((data) => {
              dispatch(changeForecastInfo(data));
          });
    };
}

export function getLocation() {
    return (dispatch) => {
        loadLocation.then((location) => {
            dispatch(changeLocation(location));
        });
    };
}

// const dispatchers = {
//     changeCity,
//     changeWeatherInfo,
//     getWeather,
// };

// export default dispatchers;
