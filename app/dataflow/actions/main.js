import * as types from './types';

export function changeCity(city, country) {
    return {
        type: types.SET_CITY,
        city,
        country,
    };
}

export function setMetric(metric) {
    return {
        type: types.SET_METRIC,
        metric,
    };
}
