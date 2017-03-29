import types from './types';
import getCityAPI from '../../utils/getCityAPI';

function setCityAutocompleteArray(autocompleteRaw, input) {
    const autocomplete = autocompleteRaw;
    autocomplete.input = input;
    return {
        type: types.SET_AUTOCOMPLETE_ARRAY,
        autocomplete,
    };
}

export function clearAutocomplete() {
    return {
        type: types.CLEAR_AUTOCOMPLETE,
    };
}

function setAutocompleteError(error) {
    const autocomplete = [];
    autocomplete.error = error;
    return {
        type: types.SET_AUTOCOMPLETE_ERROR,
        autocomplete,
    };
}

export function autocompleteCity(beginning, input = 'all') {
    return (dispatch) => {
        dispatch(setAutocompleteError({
            code: 0,
            message: 'loading...',
        }));
        return getCityAPI.getCityAjax(beginning)
          .then((data) => {
              dispatch(setCityAutocompleteArray(data, input));
          }).catch((error) => {
              dispatch(setAutocompleteError(error));
          });
    };
}
