import * as types from '../actions/types';

function mainReducer(state, action) {
    switch (action.type) {
        case types.SET_CITY:
            return {
                ...state,
                city: action.city,
                countryCode: action.country,
            };
        case types.SET_METRIC:
            return {
                ...state,
                metric: action.metric,
            };
        case types.SET_AUTOCOMPLETE_ARRAY:
        case types.SET_AUTOCOMPLETE_ERROR:
            return {
                ...state,
                autocomplete: action.autocomplete,
            };
        default:
            return state;
    }
}

export default mainReducer;
