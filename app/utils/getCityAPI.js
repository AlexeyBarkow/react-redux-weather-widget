import axios from 'axios';
import { API_URL, MAX_ROWS } from './constants';

function getCitiesByNameUrl(
    cityStart,
    resultRows = MAX_ROWS,
) {
    return `${API_URL}/searchJSON?name_startsWith=${cityStart}&maxRows=${resultRows}&style=SHORT`;
}

function getClosestToLocationUrl(
    { latitude, longitude },
    radius = .5,
    resultRows = MAX_ROWS,
) {
    return `${API_URL}/citiesJSON?north=${
        latitude - radius
    }&south=${
        latitude + radius
    }&west=${
        longitude - radius
    }&east=${
        longitude + radius
    }&&maxRows=${resultRows}&style=SHORT&radius=${radius}`;
}

function convertToAcceptable({ countryCode, countrycode, name }) {
    return {
        countryCode: countryCode || countrycode,
        name,
    };
}

function getCityAjax(cityStart) {
    if (cityStart.length < 3) {
        return new Promise(resolve => resolve([]));
    }
    return axios.get(getCitiesByNameUrl(cityStart))
      .then(respond => respond.data.geonames.map(convertToAcceptable));
}

function getClosestCitiesToLocation(location) {
    return axios.get(getClosestToLocationUrl(location))
      .then(respond => respond.data.geonames.map(convertToAcceptable));
}

const getCityAPI = {
    getCityAjax,
    getClosestCitiesToLocation,
};

export default getCityAPI;
