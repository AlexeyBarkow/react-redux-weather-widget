import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from '../actions/types';
import { getWeather, getForecast, changeCity, setMetric, redirectToCity, getNearestTo } from '../actions/actions';

const storeChangeHandler = (prevState, newState, action, dispatch) => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const { city, countryCode } = prevState;
            const path = action.payload.pathname
            .match(/^\/cities\/([a-zA-Z']{1,3})\/([a-zA-Z\s-']*)$/) || [];
            const countryName = path && path[1];
            const cityName = path && path[2];
            const metricTitle = action.payload.query && action.payload.query.metric;

            if (cityName || countryName) {
                dispatch(changeCity(cityName, countryName));
            } else if (city || countryCode) {
                dispatch(redirectToCity(city, countryCode, metricTitle));
            }
            if (metricTitle) {
                dispatch(setMetric(metricTitle));
            }
            break;
        }
        case types.UPDATE_LOCATION: {
            const { geolocation } = newState;
            if (geolocation && prevState.geolocation !== geolocation) {
                dispatch(getNearestTo(geolocation));
            }
            break;
        }
        case types.SET_NEAREST_CITIES: {
            const { city, countryCode } = newState;
            const nearestCities = action.nearestCities[0];
            if (newState.locationBeforeTransitions.pathname === '/' && nearestCities && (!city || !countryCode)) {
                dispatch(redirectToCity(nearestCities.name, nearestCities.countryCode));
            }
            break;
        }
        case types.SET_CITY:
        case types.SET_METRIC: {
            const { city, countryCode, metric, weather } = newState;
            const oldCity = prevState.city;
            const oldCountryCode = prevState.countryCode;
            const oldMetric = prevState.metric;

            if (city && countryCode &&
                (city !== oldCity || countryCode !== oldCountryCode
                || metric !== oldMetric || weather.status === 0)) {
                dispatch(getWeather(city, countryCode, metric));
                dispatch(getForecast(city, countryCode, metric));
            }
            break;
        }
        default:
            //do nothing
    }
};

export default storeChangeHandler;
