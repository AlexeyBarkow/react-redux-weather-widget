import types from './types';

export function setTotalsFilter(key, filter) {
    return {
        type: types.SET_TOTAL_FILTER,
        key,
        filter,
    };
}

export function setForecastFilter(forecastFilter) {
    return {
        type: types.SET_FORECAST_FILTER,
        forecastFilter,
    };
}
