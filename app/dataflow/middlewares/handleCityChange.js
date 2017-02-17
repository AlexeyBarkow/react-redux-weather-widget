import { getWeather, getForecast, redirectToCity } from '../actions/index';
import { DEFAULT_PATH_REGEXP } from '../../utils/constants';

export const handleCityChange = (prevState, newState, action, dispatch) => {
    const { city, countryCode, metric, weather } = newState;
    const oldCity = prevState.city;
    const oldCountryCode = prevState.countryCode;
    const oldMetric = prevState.metric;

    const isCitySet = city && countryCode;
    const isNotSameAsPrev = (city !== oldCity || countryCode !== oldCountryCode ||
        metric !== oldMetric || weather.status === 0);

    if (isCitySet && isNotSameAsPrev) {
        dispatch(getWeather(city, countryCode, metric));
        dispatch(getForecast(city, countryCode, metric));
    }
};

export const handleNearesetCitiesSet = (prevState, newState, action, dispatch) => {
    const { city, countryCode } = newState;
    const nearestCities = action.nearestCities[0];
    if (DEFAULT_PATH_REGEXP.test(newState.locationBeforeTransitions.pathname)
        && nearestCities && (!city || !countryCode)) {
        dispatch(redirectToCity(nearestCities.name, nearestCities.countryCode));
    }
};
