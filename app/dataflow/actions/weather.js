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

function setCacheKeyStatus(status, key) {
    return {
        type: types.SET_CACHE_STATUS,
        key,
        status,
    };
}

function changeNearestCities(nearestCities) {
    return {
        type: types.SET_NEAREST_CITIES,
        nearestCities,
    };
}

export function getWeatherCacheWrapper(
    cacheKeyTemplate,
    fetchPromiseCreator,
    doInAdvanceCallback = () => undefined,
    successCallback = () => undefined,
    failCallback = () => undefined,
    cacheActionCreator = cacheFetchedData,
    cacheStatusActionCreator = setCacheKeyStatus,
) {
    return (...args) =>
        (dispatch, getState) => {
            const { weather: { cache } } = getState();
            const cacheKey = cacheKeyTemplate(...args);
            const cached = cache[cacheKey];

            if (cached && cached.status === 200) {
                return Promise.resolve(successCallback(dispatch, cached, ...args));
            }

            if (cacheStatusActionCreator) {
                dispatch(cacheStatusActionCreator(1, cacheKey));
            }
            doInAdvanceCallback(dispatch, ...args);

            return fetchPromiseCreator(...args)
                .then((data) => {
                    if (data.cod === -1) {
                        return Promise.resolve();
                    }

                    if (!data.response) {
                        if (cacheActionCreator) {
                            dispatch(cacheActionCreator(data, cacheKey));
                        }
                        return Promise.resolve(successCallback(dispatch, data, ...args));
                    }
                    if (cacheStatusActionCreator) {
                        dispatch(cacheStatusActionCreator(data.cod, cacheKey));
                    }
                    return Promise.resolve(failCallback(dispatch, data, ...args));
                });
        };
}

export const getWeather = getWeatherCacheWrapper(
    (city, code) => `weather/${city}/${code}`,
    getWeatherAjax.fetchCurrentWeather,
    (dispatch) => {
        dispatch(setWeatherStatus({
            cod: 1,
            message: 'loading...',
        }));
    },
    (dispatch, data) => {
        dispatch(changeWeatherInfo(data));
        return data;
    },
    (dispatch, data) => {
        const { response: { data: { cod, message } } } = data;
        const status = { cod: parseInt(cod, 10), message };
        dispatch(setWeatherStatus(status));
        return status;
    },
);

export const getWeatherByLocation = getWeatherCacheWrapper(
    (_, cityname) => `weather/${cityname}/any`,
    getWeatherAjax.getWeatherInfoByLocation,
    (dispatch) => {
        dispatch(setWeatherStatus({
            cod: 1,
            message: 'loading...',
        }));
    },
    (dispatch, data) => {
        dispatch(changeWeatherInfo(data));
        return data;
    },
    (dispatch, data) => {
        const { response: { data: { cod, message } } } = data;
        const errorMessage = { cod: parseInt(cod, 10), message };
        dispatch(setWeatherStatus(errorMessage));
        return errorMessage;
    },
);

export const getForecast = getWeatherCacheWrapper(
    (city, code) => `forecast/${city}/${code}`,
    getWeatherAjax.fetchWeatherForecast,
    (dispatch) => {
        dispatch(setForecastStatus({
            cod: 1,
            message: 'loading...',
        }));
    },
    (dispatch, data) => {
        dispatch(changeForecastInfo(data));
        return data;
    },
    (dispatch, data) => {
        const { response: { data: { cod, message } } } = data;
        const status = { cod: parseInt(cod, 10), message };
        dispatch(setForecastStatus(status));
        return status;
    },
);

export const getForecastByLocation = getWeatherCacheWrapper(
    (_, cityname) => `forecast/${cityname}/any`,
    getWeatherAjax.getForecastInfoByLocation,
    (dispatch) => {
        dispatch(setForecastStatus({
            cod: 1,
            message: 'loading...',
        }));
    },
    (dispatch, data) => {
        dispatch(changeForecastInfo(data));
        return data;
    },
    (dispatch, data) => {
        const { response: { data: { cod, message } } } = data;
        const status = { cod: parseInt(cod, 10), message };
        dispatch(setForecastStatus(status));
        return status;
    },
);

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
            const error = {
                code: -1,
                message: 'Could not get geolocation',
            };
            dispatch(setNearestCitiesError(error));
            return Promise.resolve(error);
        }
        dispatch(setNearestCitiesError({
            code: 0,
            message: 'loading...',
        }));
        return getWeatherAjax.getClosestCitiesToLocation(geolocation).then((res) => {
            if (res.response) {
                const error = {
                    code: res.response.status,
                    message: res.response.statusText,
                };
                dispatch(setNearestCitiesError(error));
                return error;
            }
            const nearestCities = res.map((curr) => {
                const { city, country } = curr;
                dispatch(cacheFetchedData(curr, `weather/${city}/${country}`));
                return {
                    name: city,
                    countryCode: country,
                };
            });
            dispatch(changeNearestCities(nearestCities));
            return nearestCities;
        }).catch((error) => {
            dispatch(setNearestCitiesError(error));
            return error;
        });
    };
}
