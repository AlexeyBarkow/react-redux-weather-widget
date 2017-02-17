import { LOCATION_CHANGE } from 'react-router-redux';
import types from '../actions/types';
import { handleCityChange, handleNearesetCitiesSet } from './handleCityChange';
import { handleLocationChange, handleLocationUpdate } from './handleLocationChange';


const storeChangeHandler = (...args) => {
    const action = args[2];

    switch (action.type) {
        case LOCATION_CHANGE: {
            handleLocationChange(...args);
            break;
        }
        case types.UPDATE_LOCATION: {
            handleLocationUpdate(...args);
            break;
        }
        case types.SET_NEAREST_CITIES: {
            handleNearesetCitiesSet(...args);
            break;
        }
        case types.SET_CITY:
        case types.SET_METRIC:
            handleCityChange(...args);
            break;
        default:
            break;
    }
};

export default storeChangeHandler;
