import { createSelector } from 'reselect';
import flow from 'lodash/flow';
import map from 'lodash/map';
import { compareDatesDay } from '../utils/unifiedDateFormat';
import { MATCH_DATES_REGEXP } from '../utils/constants';

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
const getCitiesToFilterArray = ({ favorites: { favoriteCities, citiesToFilterArray } }) =>
    citiesToFilterArray || favoriteCities;
const applyArrayFilterToCache = (cache, weather) => weather.reduce((res, city) => {
    const cityWeatherKey = `weather/${city.cityname}/${city.countryCode}`;
    const cityForecastKey = `forecast/${city.cityname}/${city.countryCode}`;
    return {
        ...res,
        [cityWeatherKey]: cache[cityWeatherKey],
        [cityForecastKey]: cache[cityForecastKey],
    };
}, {});

export const selectCachedCitiesToFilterWeather = createSelector(
    [getCache, getCitiesToFilterArray],
    applyArrayFilterToCache,
);

export const selectFavoriteCache = createSelector(
    [getCache, ({ favorites: { favoriteCities } }) => favoriteCities],
    applyArrayFilterToCache,
);

const getAppliedFilterInfo = ({ favorites: { filters } }) =>
    filters || {};

export const convertCacheToArray = createSelector(
    selectCachedCitiesToFilterWeather,
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

export const applyTemperatureFilters = ({ minTemperature, maxTemperature }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minTemperature,
        maxTemperature,
        curr => curr.temperature.min >= minTemperature,
        curr => curr.temperature.max <= maxTemperature,
    ));

export const applyWeatherTypesFilter = ({ weatherIcons }, cacheArray) =>
    (weatherIcons
        ? cacheArray.filter(curr =>
            weatherIcons[`i${curr.weatherTypes ? curr.weatherTypes[0].icon.slice(0, -1) : 'empty'}`])
        : cacheArray);

export const applyPressureFilter = ({ minPressure, maxPressure }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minPressure,
        maxPressure,
        curr => curr.pressure >= minPressure,
        curr => curr.pressure <= maxPressure,
    ));

export const applyHumidityFilter = ({ minHumidity, maxHumidity }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minHumidity,
        maxHumidity,
        curr => curr.humidity >= minHumidity,
        curr => curr.humidity <= maxHumidity,
    ));

export const applyWindSpeedFilter = ({ minWindSpeed, maxWindSpeed }, cacheArray) =>
    (minMaxFilter(
        cacheArray,
        minWindSpeed,
        maxWindSpeed,
        curr => curr.wind.speed >= minWindSpeed,
        curr => curr.wind.speed <= maxWindSpeed,
    ));

export const applySort = cacheArray =>
    cacheArray.sort(({
        calculationTime: time1,
        city: city1 = '',
        country: country1 = '',
    }, {
        calculationTime: time2,
        city: city2 = '',
        country: country2 = '',
    }) => {
        if (city1 !== city2) {
            return city1.localeCompare(city2);
        } else if (country1 !== country2) {
            return country1.localeCompare(country2);
        }
        return time1 - time2;
    });

export const applyDateFilter = ({ filterDatepickerArray }, cacheArray) => {
    if (filterDatepickerArray === undefined) {
        const resSet = new Set();
        return cacheArray.filter((item) => {
            const key = `${item.city}/${item.country}`;
            if (resSet.has(key)) {
                return false;
            }
            resSet.add(key);
            return true;
        });
    }

    const parsedDatepickerArray = map(filterDatepickerArray, (val) => {
        const [day, month, year] = val.match(MATCH_DATES_REGEXP).slice(1);
        return { day, month, year };
    });
    return cacheArray.filter(({ calculationTime }) =>
        parsedDatepickerArray.some(({ day, month, year }) =>
            compareDatesDay(
                new Date(calculationTime),
                new Date(year, month - 1, day),
            ),
        ),
    );
};

export const applyAllFilters = createSelector(
    [convertCacheToArray, getAppliedFilterInfo],
    (cache, info) => (
        Object.keys(info).length > 0
        ? flow(
            applySort,
            applyDateFilter.bind(null, info),
            applyTemperatureFilters.bind(null, info),
            applyWeatherTypesFilter.bind(null, info),
            applyPressureFilter.bind(null, info),
            applyHumidityFilter.bind(null, info),
            applyWindSpeedFilter.bind(null, info),
        )(cache)
        : []
    ),
);
