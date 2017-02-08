import { LOCATION_CHANGE } from 'react-router-redux';

function routingChangeReducer(state, action) {
    if (action.type === LOCATION_CHANGE) {
        const path = action.payload.pathname
            .match(/^\/cities\/([a-zA-Z']{1,3})\/([a-zA-Z\s-']*)$/) || [];
        const city = path && path[2];
        const countryCode = path && path[1];
        const metric = action.payload.query && action.payload.query.metric;

        if (city || countryCode || metric) {
            const newState = { ...state };
            newState.city = city || newState.city;
            newState.countryCode = countryCode || newState.countryCode;
            newState.metric = metric || newState.metric;
            return newState;
        }
    }
    return state;
}

export default routingChangeReducer;
