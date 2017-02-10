import geolocationAPI from '../../utils/geolocationAPI';
import * as types from './types';

function changeLocation(geolocation) {
    return {
        type: types.UPDATE_LOCATION,
        geolocation,
    };
}

function setLocationStatus(status) {
    return {
        type: types.SET_LOCATION_STATUS,
        geolocation: status,
    };
}

export function getLocation() {
    return (dispatch) => {
        geolocationAPI.loadLocation().then((location) => {
            dispatch(changeLocation(location));
        }).catch((err) => {
            dispatch(setLocationStatus(err));
        });
    };
}
