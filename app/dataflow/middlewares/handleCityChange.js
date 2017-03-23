import { getWeather, getForecast, redirectToCity, getWeatherByLocation, getForecastByLocation, setForecastStatus } from '../actions';
import { DEFAULT_PATH_REGEXP, DEFAULT_COUNTRY_CODE } from '../../utils/constants';

export const handleCityChange = (prevState, newState, action, dispatch) => {
    const { main: { city, countryCode }, weather: { weather: { status, location } } } = newState;
    const { main: { city: oldCity, countryCode: oldCountryCode } } = prevState;

    const isCitySet = city && countryCode;
    const isNotSameAsPrev = (city !== oldCity || countryCode !== oldCountryCode
        || status === 0);
    if (status === 0 || (isCitySet && isNotSameAsPrev)) {
        if (location && (!countryCode || countryCode === DEFAULT_COUNTRY_CODE)) {
            return dispatch(getWeatherByLocation(location, city))
            .then((response) => {
                if (response && response.latitude && response.longitude) {
                    dispatch(getForecastByLocation(response, city));
                } else {
                    dispatch(setForecastStatus(response));
                }
            });
        }
        return Promise.all([
            dispatch(getWeather(city, countryCode)),
            dispatch(getForecast(city, countryCode)),
        ]);
    }
    return Promise.resolve();
};

export const handleNearesetCitiesSet = (prevState, newState, action, dispatch) => {
    const { main: { city, countryCode } } = newState;
    const nearestCities = action.nearestCities[0];

    if (DEFAULT_PATH_REGEXP.test(newState.routing.locationBeforeTransitions.pathname)
        && nearestCities && (!city || !countryCode)) {
        dispatch(redirectToCity(nearestCities.name, nearestCities.countryCode));
    }
};
