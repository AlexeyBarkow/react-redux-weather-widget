import types from './types';

export function pushToFavorites(location, cityname, countrycode) {
    return {
        type: types.PUSH_FAVORITE,
        city: {
            location,
            cityname,
            countrycode,
        },
    };
}

export function removeFromFavorites(index) {
    return {
        type: types.REMOVE_FAVORITE,
        index,
    };
}
