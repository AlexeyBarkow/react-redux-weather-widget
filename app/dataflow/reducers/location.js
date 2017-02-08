import * as types from '../actions/types';

function locationReducer(state, action) {
    switch (action.type) {
        case types.SET_NEAREST_CITIES:
        case types.SET_NEAREST_CITIES_ERROR:
            return {
                ...state,
                nearestCities: action.nearestCities,
            };
        case types.UPDATE_LOCATION:
            return {
                ...state,
                geolocation: action.geolocation,
            };
        default:
            return state;
    }
}

export default locationReducer;