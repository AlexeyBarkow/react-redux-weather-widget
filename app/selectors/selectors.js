import { createSelector } from 'reselect';
import flow from 'lodash/flow';

const getMainInfo = ({
    weather: {
        weather: { weatherTypes, location },
    },
    main: {
        city,
    },
}) => ({ city, weatherTypes, location });

export const weatherOverallSelector = createSelector(
    getMainInfo,
    ({ city, location, weatherTypes }) => ({
        city,
        location,
        main: weatherTypes ? weatherTypes[0].main : 'default',
    }),
);

const getForecastFilter = ({ weather: { forecastFilter } }) => forecastFilter;
const getForecast = ({ weather: { forecast } }) => forecast;

export const selectForecastFilter = createSelector(
    [getForecastFilter, getForecast],
    (filter, forecast) => {
        if (filter === '3H') {
            return forecast;
        }
        return forecast.filter((weather, index) => index % 4 === 0);
    },
);

const getCache = ({ weather: { cache } }) => cache;
const getFavoritesWeather = ({ favorites: { favoriteCities } }) =>
    favoriteCities;

export const selectFavoriteCache = createSelector(
    [getCache, getFavoritesWeather],
    (cache, weather) => (weather.reduce((res, city) => {
        const cityWeatherKey = `weather/${city.cityname}/${city.countryCode}`;
        const cityForecastKey = `forecast/${city.cityname}/${city.countryCode}`;
        return {
            ...res,
            [cityWeatherKey]: cache[cityWeatherKey],
            [cityForecastKey]: cache[cityForecastKey],
        };
    }, {})),
);

const getAppliedFilterInfo = ({ favorites: { filters } }) =>
    filters || {};

const convertCacheToArray = createSelector(
    selectFavoriteCache,
    cache => Object.values(cache)
        .reduce((res, curr) =>
            (Array.isArray(curr) ? [...res, ...curr] : [...res, curr]),
            [],
        ),
);

const minMaxFilter = (arr, min, max, filterMin, filterMax) => {
    let res = arr;
    if (min) {
        res = res.filter(filterMin);
    }
    if (max) {
        res = res.filter(filterMax);
    }
    return res;
};

const applyTemperatureFilters = ({ minTemperature, maxTemperature }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minTemperature,
        maxTemperature,
        curr => curr.temperature.min >= minTemperature,
        curr => curr.temperature.max <= maxTemperature,
    ));

const applyWeatherTypesFilter = ({ weatherIcons }, cacheArray) =>
    (weatherIcons
        ? cacheArray.filter(curr =>
            weatherIcons[`i${curr.weatherTypes[0].icon.slice(0, -1)}`])
        : cacheArray);

const applyPressureFilter = ({ minPressure, maxPressure }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minPressure,
        maxPressure,
        curr => curr.pressure >= minPressure,
        curr => curr.pressure <= maxPressure,
    ));

const applyHumidityFilter = ({ minHumidity, maxHumidity }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minHumidity,
        maxHumidity,
        curr => curr.humidity >= minHumidity,
        curr => curr.humidity <= maxHumidity,
    ));

const applyWindSpeedFilter = ({ minWindSpeed, maxWindSpeed }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minWindSpeed,
        maxWindSpeed,
        curr => curr.wind.speed >= minWindSpeed,
        curr => curr.wind.speed <= maxWindSpeed,
    ));

export const applyAllFilters = createSelector(
    [convertCacheToArray, getAppliedFilterInfo],
    (cache, info) => (
        Object.keys(info).length > 0
        ? flow(
            applyTemperatureFilters.bind(null, info),
            applyWeatherTypesFilter.bind(null, info),
            applyPressureFilter.bind(null, info),
            applyHumidityFilter.bind(null, info),
            applyWindSpeedFilter.bind(null, info),
        )(cache)
        : []
    ),
);
