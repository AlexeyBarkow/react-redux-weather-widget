import { push } from 'react-router-redux';
import * as types from './types';
import getWeatherAjax from '../../utils/weatherAPI';
import { DEFAULT_METRIC } from '../../utils/constants';

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

function setWeatherStatus(error) {
    return {
        type: types.SET_WEATHER_STATUS,
        weather: {
            status: error.cod,
            message: error.message,
        },
    };
}

function setForecastStatus(error) {
    return {
        type: types.SET_FORECAST_STATUS,
        forecast: [{
            status: error.cod,
            message: error.message,
        }],
    };
}

export function getWeather(city, code, metric) {
    return (dispatch) => {
        dispatch(setWeatherStatus({
            cod: 1,
            message: 'loading...',
        }));
        getWeatherAjax.fetchCurrentWeather(city, code, metric)
          .then((data) => {
              dispatch(changeWeatherInfo(data));
          }).catch((error) => {
              dispatch(setWeatherStatus(error));
          });
    };
}

export function getForecast(city, code, metric) {
    return (dispatch) => {
        dispatch(setForecastStatus([{
            status: 1,
            message: 'loading...',
        }]));
        getWeatherAjax.fetchWeatherForecast(city, code, metric)
          .then((data) => {
              dispatch(changeForecastInfo(data));
          }).catch((error) => {
              dispatch(setForecastStatus(error));
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
