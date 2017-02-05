// ToDo: separate actions into different files
import { push } from 'react-router-redux';
import * as types from './types';
import getWeatherAjax from '../../utils/weatherAPI';
import geolocationAPI from '../../utils/geolocationAPI';
import getCityAPI from '../../utils/getCityAPI';
import { DEFAULT_METRIC } from '../../utils/constants';

export function changeCity(city) {
    return {
        type: types.SET_CITY,
        city,
    };
}

function changeNearestCities(nearestCities) {
    return {
        type: types.SET_NEAREST_CITIES,
        nearestCities,
    };
}

function changeWeatherInfo(weather) {
    return {
        type: types.UPDATE_WEATHER_INFO,
        weather,
    };
}

function changeForecastInfo(forecast) {
    return {
        type: types.UPDATE_FORECAST,
        forecast,
    };
}

function changeLocation(geolocation) {
    return {
        type: types.UPDATE_LOCATION,
        geolocation,
    };
}

function setCityAutocompleteArray(autocomplete) {
    return {
        type: types.SET_AUTOCOMPLETE_ARRAY,
        autocomplete,
    };
}

export function autocompleteCity(beginning) {
    return (dispatch) => {
        getCityAPI.getCityAjax(beginning)
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

export function redirectToCity(city, countryCode, metric = DEFAULT_METRIC) {
    return (dispatch) => {
        dispatch(getWeather(city, countryCode, metric));
        dispatch(getForecast(city, countryCode, metric));
        dispatch(push({
            pathname: `/cities/${countryCode}/${city}`,
            query: { metric },
        }));
    };
}

export function getLocation() {
    return (dispatch) => {
        geolocationAPI.loadLocation().then((location) => {
            dispatch(changeLocation(location));
        });
    };
}

export function getNearestTo(location) {
    return (dispatch) => {
        getCityAPI.getClosestCitiesToLocation(location)
          .then((cities) => {
              dispatch(changeNearestCities(cities));
          });
    };
}

// const dispatchers = {
//     changeCity,
//     changeWeatherInfo,
//     getWeather,
// };

// export default dispatchers;
