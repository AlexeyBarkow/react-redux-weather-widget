import types from './types';
import getWeatherAjax from '../../utils/weatherAPI';
import { getWeatherCacheWrapper } from './weather';

function pushToFavorites(cityname, countryCode) {
    return {
        type: types.PUSH_FAVORITE,
        city: {
            cityname,
            countryCode,
        },
    };
}

export function removeFromFavorites(index) {
    return {
        type: types.REMOVE_FAVORITE,
        index,
    };
}

const getWeatherAndCache = getWeatherCacheWrapper(
    (city, code) => `weather/${city}/${code}`,
    getWeatherAjax.fetchCurrentWeather,
);

const getForecastAndCache = getWeatherCacheWrapper(
    (city, code) => `forecast/${city}/${code}`,
    getWeatherAjax.fetchWeatherForecast,
);

export function addToFavoritesAndFetchWeather(city, code) {
    return (dispatch) => {
        dispatch(pushToFavorites(city, code));
        dispatch(getWeatherAndCache(city, code));
        dispatch(getForecastAndCache(city, code));
    };
}

export function getAllFavoritesWeather() {
    return (dispatch, getState) => {
        const { favorites: { favoriteCities } } = getState();
        favoriteCities.forEach(({ cityname, countryCode }) => {
            dispatch(getWeatherAndCache(cityname, countryCode));
            dispatch(getForecastAndCache(cityname, countryCode));
        });
    };
}
