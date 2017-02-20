import { push } from 'react-router-redux';
import types from './types';
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

export function setForecastFilter(forecastFilter) {
    return {
        type: types.SET_FORECAST_FILTER,
        forecastFilter,
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

function cacheFetchedData(weather, key) {
    return {
        type: types.CACHE_PUSH,
        cache: weather,
        key,
    };
}

function changeNearestCities(nearestCities) {
    return {
        type: types.SET_NEAREST_CITIES,
        nearestCities,
    };
}

export function getWeather(city, code) {
    return (dispatch, getState) => {
        const { cache } = getState();
        const cached = cache[`${city}/${code}`];
        if (cached) {
            dispatch(changeWeatherInfo(cached));
            return;
        }

        dispatch(setWeatherStatus({
            cod: 1,
            message: 'loading...',
        }));
        getWeatherAjax.fetchCurrentWeather(city, code)
          .then((data) => {
              if (data.cod === -1) {
                  return;
              }
              if (!data.response) {
                  dispatch(changeWeatherInfo(data));
                  dispatch(cacheFetchedData(data, `${city}/${code}`));
              } else {
                  const { response: { data: { cod, message } } } = data;
                  dispatch(setWeatherStatus({ cod: parseInt(cod, 10), message }));
              }
          });
    };
}

export function getForecast(city, code) {
    return (dispatch) => {
        dispatch(setForecastStatus({
            cod: 1,
            message: 'loading...',
        }));
        getWeatherAjax.fetchWeatherForecast(city, code)
          .then((data) => {
              if (data.cod === -1) {
                  return;
              }
              if (!data.response) {
                  dispatch(changeForecastInfo(data));
              } else {
                  const { response: { data: { cod, message } } } = data;
                  dispatch(setForecastStatus({ cod: parseInt(cod, 10), message }));
              }
          });
    };
}

export function redirectToCity(city, countryCode, metric = DEFAULT_METRIC) {
    return (dispatch) => {
        dispatch(push({
            pathname: `/cities/${countryCode}/${city}`,
            query: { metric },
        }));
    };
}

export function getNearestTo(location) {
    return (dispatch) => {
        getWeatherAjax.getClosestCitiesToLocation(location).then((res) => {
            const nearestCities = res.map((curr) => {
                dispatch(cacheFetchedData(curr));
                return {
                    name: curr.city,
                    countryCode: curr.country,
                };
            });
            dispatch(changeNearestCities(nearestCities));
        });
    };
}
