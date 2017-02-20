import { changeCity, setMetric, redirectToCity, getNearestTo } from '../actions/index';
import { CITY_PATH_REGEXP, DEFAULT_PATH_REGEXP } from '../../utils/constants';

export const handleLocationChange = (prevState, newState, action, dispatch) => {
    const { city, countryCode } = prevState;
    const pathString = decodeURI(action.payload.pathname);
    const path = pathString
        .match(CITY_PATH_REGEXP) || [];
    const pathCountryName = path && path[1];
    const pathCityName = path && path[2];
    const metricTitle = action.payload.query && action.payload.query.metric;

    if (pathString === '/home' && newState.nearestCities[0]) {
        const closestCity = newState.nearestCities[0].name;
        const closestCountryCode = newState.nearestCities[0].countryCode;
        dispatch(redirectToCity(closestCity, closestCountryCode));
        return;
    }

    if (pathCityName || pathCountryName) {
        dispatch(changeCity(pathCityName, pathCountryName));
    } else if ((city || countryCode) &&
        (path.length !== 0 || DEFAULT_PATH_REGEXP.test(pathString))) {
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
