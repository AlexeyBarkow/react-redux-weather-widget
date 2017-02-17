import { changeCity, setMetric, redirectToCity, getNearestTo } from '../actions/index';
import { CITY_PATH_REGEXP } from '../../utils/constants';

export const handleLocationChange = (prevState, newState, action, dispatch) => {
    const { city, countryCode } = prevState;
    const path = action.payload.pathname
        .match(CITY_PATH_REGEXP) || [];
    const countryName = path && path[1];
    const cityName = path && path[2];
    const metricTitle = action.payload.query && action.payload.query.metric;

    if (cityName || countryName) {
        dispatch(changeCity(cityName, countryName));
    } else if ((city || countryCode) && action.payload.pathname !== '/about') {
        dispatch(redirectToCity(city, countryCode, metricTitle));
    }
    if (metricTitle) {
        dispatch(setMetric(metricTitle));
    }
};

export const handleLocationUpdate = (prevState, newState, action, dispatch) => {
    const { geolocation } = newState;
    if (geolocation && prevState.geolocation !== geolocation) {
        dispatch(getNearestTo(geolocation));
    }
};
