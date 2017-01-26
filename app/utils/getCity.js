import axios from 'axios';
const USERNAME = 'aliaksei_barkou';
const GEONAMES_API_URL = 'http://ws.geonames.org';

function getOuterAPIRefString(cityStart, username = USERNAME) {
    return `${GEONAMES_API_URL}/searchJSON?name_startsWith=${cityStart}&username=${username}`
}

function getCityAjax(cityStart) {
    return axios.get(getOuterAPIRefString(cityStart));
}

export default getCityAjax;
