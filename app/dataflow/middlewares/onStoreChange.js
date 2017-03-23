import { LOCATION_CHANGE } from 'react-router-redux';
import types from '../actions/types';
import { handleCityChange, handleNearesetCitiesSet } from './handleCityChange';
import { handleLocationChange, handleLocationUpdate } from './handleLocationChange';


const storeChangeHandler = (...args) => {
    const action = args[2];

    switch (action.type) {
        case LOCATION_CHANGE:
            return handleLocationChange(...args);
        case types.UPDATE_LOCATION:
            return handleLocationUpdate(...args);
        case types.SET_NEAREST_CITIES:
            return handleNearesetCitiesSet(...args);
        case types.SET_CITY:
            return handleCityChange(...args);
        default:
            return Promise.resolve();
    }
};

export default storeChangeHandler;
