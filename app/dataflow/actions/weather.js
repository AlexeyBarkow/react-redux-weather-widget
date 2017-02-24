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

function setNearestCitiesError(error) {
    const nearestCities = [];
    nearestCities.error = error;
    return {
        type: types.SET_NEAREST_CITIES_ERROR,
        nearestCities,
    };
}

function cacheFetchedData(data, key) {
    return {
        type: types.CACHE_PUSH,
        cache: data,
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
        const { weather: { cache } } = getState();
        const cached = cache[`weather/${city}/${code}`];

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
                  dispatch(cacheFetchedData(data, `weather/${city}/${code}`));
              } else {
                  const { response: { data: { cod, message } } } = data;
                  dispatch(setWeatherStatus({ cod: parseInt(cod, 10), message }));
              }
          });
    };
}

export function getForecast(city, code) {
    return (dispatch, getState) => {
        const { weather: { cache } } = getState();
        const cached = cache[`forecast/${city}/${code}`];

        if (cached) {
            dispatch(changeForecastInfo(cached));
            return;
        }

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
                  dispatch(cacheFetchedData(data, `forecast/${city}/${code}`));
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
    return (dispatch, getState) => {
        const geolocation = location || getState().location.geolocation;
        if (!geolocation.latitude || !geolocation.longitude) {
            dispatch(setNearestCitiesError({
                code: -1,
                message: 'Could not get geolocation',
            }));
            return;
        }
        dispatch(setNearestCitiesError({
            code: 0,
            message: 'loading...',
        }));
        getWeatherAjax.getClosestCitiesToLocation(geolocation).then((res) => {
            const nearestCities = res.map((curr) => {
                const { city, country } = curr;
                dispatch(cacheFetchedData(curr, `weather/${city}/${country}`));
                return {
                    name: city,
                    countryCode: country,
                };
            });
            dispatch(changeNearestCities(nearestCities));
        }).catch((error) => {
            dispatch(setNearestCitiesError(error));
        });
    };
}
