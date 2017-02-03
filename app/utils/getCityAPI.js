import axios from 'axios';
import { USERNAME, GEONAMES_API_URL, MAX_ROWS } from './constants';

function getOuterAPIRefString(cityStart, username = USERNAME, resultRows = MAX_ROWS) {
    return `${GEONAMES_API_URL}/searchJSON?name_startsWith=${cityStart}&username=${username}&maxRows=${resultRows}&style=SHORT`;
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
    return axios.get(getOuterAPIRefString(cityStart))
      .then(respond => respond.data.geonames.map(convertToAcceptable));
}

export default getCityAjax;
