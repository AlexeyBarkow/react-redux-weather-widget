import types from './types';
import getCityAPI from '../../utils/getCityAPI';

function setCityAutocompleteArray(autocomplete) {
    return {
        type: types.SET_AUTOCOMPLETE_ARRAY,
        autocomplete,
    };
}

// function setNearestCitiesError(error) {
//     const nearestCities = [];
//     nearestCities.error = error;
//     return {
//         type: types.SET_NEAREST_CITIES_ERROR,
//         nearestCities,
//     };
// }

function setAutocompleteError(error) {
    const autocomplete = [];
    autocomplete.error = error;
    return {
        type: types.SET_AUTOCOMPLETE_ERROR,
        autocomplete,
    };
}

export function autocompleteCity(beginning) {
    return (dispatch) => {
        dispatch(setAutocompleteError({
            code: 0,
            message: 'loading...',
        }));
        getCityAPI.getCityAjax(beginning)
          .then((data) => {
              dispatch(setCityAutocompleteArray(data));
          }).catch((error) => {
              dispatch(setAutocompleteError(error));
          });
    };
}

// export function getNearestTo(location) {
//     return (dispatch) => {
//         dispatch(setNearestCitiesError({
//             code: 0,
//             message: 'loading...',
//         }));
//         getCityAPI.getClosestCitiesToLocation(location)
//           .then((cities) => {
//               dispatch(changeNearestCities(cities));
//           }).catch((error) => {
//               dispatch(setNearestCitiesError(error));
//           });
//     };
// }
