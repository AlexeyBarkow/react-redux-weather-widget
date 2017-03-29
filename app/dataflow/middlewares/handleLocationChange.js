import { changeCity, setMetric, redirectToCity, getNearestTo } from '../actions';
import { CITY_PATH_REGEXP, DEFAULT_PATH_REGEXP } from '../../utils/constants';

export const handleLocationChange = (prevState, newState, action, dispatch) => {
    const { main: { city, countryCode } } = prevState;
    const { location: { nearestCities: [nearest] } } = newState;
    const pathString = decodeURI(action.payload.pathname);
    const path = pathString.match(CITY_PATH_REGEXP) || [];
    const [pathCountryName, pathCityName] = path.slice(1);
    const metricTitle = action.payload.query && action.payload.query.metric;

    if (pathString === '/home' && nearest) {
        const closestCity = nearest.name;
        const closestCountryCode = nearest.countryCode;
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
    const { location: { geolocation: prevGeolocation } } = prevState;

    if (geolocation && prevGeolocation !== geolocation) {
        dispatch(getNearestTo(geolocation));
    }
};
