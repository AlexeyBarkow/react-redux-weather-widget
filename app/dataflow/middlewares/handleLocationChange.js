import { changeCity, setMetric, redirectToCity, getNearestTo } from '../actions/index';
import { CITY_PATH_REGEXP, DEFAULT_PATH_REGEXP } from '../../utils/constants';

export const handleLocationChange = (prevState, newState, action, dispatch) => {
    const { main: { city, countryCode } } = prevState;
    const pathString = decodeURI(action.payload.pathname);
    const path = pathString
        .match(CITY_PATH_REGEXP) || [];
    const pathCountryName = path && path[1];
    const pathCityName = path && path[2];
    const metricTitle = action.payload.query && action.payload.query.metric;

    if (pathString === '/home' && newState.location.nearestCities[0]) {
        const closestCity = newState.location.nearestCities[0].name;
        const closestCountryCode = newState.location.nearestCities[0].countryCode;
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
    const { location: { geolocation } } = newState;
    if (geolocation && prevState.location.geolocation !== geolocation) {
        dispatch(getNearestTo(geolocation));
    }
};
