import axios from 'axios';
import { USERNAME, GEONAMES_API_URL, MAX_ROWS } from './constants';

function getCitiesByNameUrl(
    cityStart,
    resultRows = MAX_ROWS,
    username = USERNAME,
) {
    return `${GEONAMES_API_URL}/searchJSON?name_startsWith=${cityStart}&username=${username}&maxRows=${resultRows}&style=SHORT`;
}

function getClosestToLocationUrl(
    { latitude, longitude },
    radius = 50,
    resultRows = MAX_ROWS,
    username = USERNAME,
) {
    return `${GEONAMES_API_URL}/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${username}&maxRows=${resultRows}&style=SHORT&radius=${radius}`;
}

function convertToAcceptable(city) {
    return {
        countryCode: city.countryCode,
        name: city.name,
    };
}

function getCityAjax(cityStart) {
    if (cityStart.length < 3) {
        return new Promise(resolve => resolve([]));
    }
    return axios.get(getCitiesByNameUrl(cityStart))
      .then(respond => respond.data.geonames.map(convertToAcceptable));
}

function getClosestCitiesToLocation(
    location,
    radius = 50,
) {
    return axios.get(getClosestToLocationUrl(location, radius))
      .then(respond => respond.data.geonames.map(convertToAcceptable));
}

const getCityAPI = {
    getCityAjax,
    getClosestCitiesToLocation,
};

export default getCityAPI;
