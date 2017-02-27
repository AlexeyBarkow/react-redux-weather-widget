import { getWeather, getForecast, redirectToCity, getWeatherByLocation, getForecastByLocation } from '../actions/index';
import { DEFAULT_PATH_REGEXP } from '../../utils/constants';

export const handleCityChange = (prevState, newState, action, dispatch) => {
    const { main: { city, countryCode }, weather: { weather: { status, location } } } = newState;
    const oldCity = prevState.main.city;
    const oldCountryCode = prevState.main.countryCode;

    const isCitySet = city && countryCode;
    const isNotSameAsPrev = (city !== oldCity || countryCode !== oldCountryCode
        || status === 0);

    if (isCitySet && isNotSameAsPrev) {
        if (status === 0 && location) {
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
