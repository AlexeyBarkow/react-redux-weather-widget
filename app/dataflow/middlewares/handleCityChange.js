import { getWeather, getForecast, redirectToCity, getWeatherByLocation, getForecastByLocation } from '../actions';
import { DEFAULT_PATH_REGEXP } from '../../utils/constants';

export const handleCityChange = (prevState, newState, action, dispatch) => {
    const { main: { city, countryCode }, weather: { weather: { status, location } } } = newState;
    const { main: { city: oldCity, countryCode: oldCountryCode } } = prevState;

    const isCitySet = city && countryCode;
    const isNotSameAsPrev = (city !== oldCity || countryCode !== oldCountryCode
        || status === 0);

    if (status === 0 || (isCitySet && isNotSameAsPrev)) {
        if (location && !countryCode) {
            dispatch(getWeatherByLocation(location, city));
            dispatch(getForecastByLocation(location, city));
        } else {
            dispatch(getWeather(city, countryCode));
            dispatch(getForecast(city, countryCode));
        }
    }
};

export const handleNearesetCitiesSet = (prevState, newState, action, dispatch) => {
    const { main: { city, countryCode } } = newState;
    const nearestCities = action.nearestCities[0];

    if (DEFAULT_PATH_REGEXP.test(newState.routing.locationBeforeTransitions.pathname)
        && nearestCities && (!city || !countryCode)) {
        dispatch(redirectToCity(nearestCities.name, nearestCities.countryCode));
    }
};
