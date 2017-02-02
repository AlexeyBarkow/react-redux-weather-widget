import axios from 'axios';
import { USERNAME, GEONAMES_API_URL } from './constants';

function getOuterAPIRefString(cityStart, username = USERNAME) {
    return `${GEONAMES_API_URL}/searchJSON?name_startsWith=${cityStart}&username=${username}`
}

function getCityAjax(cityStart) {
    return axios.get(getOuterAPIRefString(cityStart));
}

export default getCityAjax;
