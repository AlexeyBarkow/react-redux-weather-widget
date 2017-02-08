import geolocationAPI from '../../utils/geolocationAPI';
import * as types from './types';

function changeLocation(geolocation) {
    return {
        type: types.UPDATE_LOCATION,
        geolocation,
    };
}

export function getLocation() {
    return (dispatch) => {
        geolocationAPI.loadLocation().then((location) => {
            dispatch(changeLocation(location));
        }).catch(() => {
            dispatch(changeLocation(null));
        });
    };
}
