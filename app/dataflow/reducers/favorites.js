import types from '../actions/types';

function favoritesReducer(state = {}, action) {
    switch (action.type) {
        case types.PUSH_FAVORITE: {
            const { favoriteCities } = state;
            const { city } = action;

            return {
                ...state,
                favoriteCities: [...favoriteCities, ...[city]],
            };
        }
        case types.MOVE_FAVORITE: {
            const { favoriteCities } = state;
            const { index, newIndex } = action;
            const city = favoriteCities[index];
            return {
                ...state,
                favoriteCities: favoriteCities.reduce((res, curr, i) => {
                    if (i !== index) {
                        res.push(curr);
                    }
                    if (i === newIndex) {
                        res.push(city);
                    }
                    return res;
                }, []),
            }
        }
        case types.REMOVE_FAVORITE: {
            const { favoriteCities } = state;
            const { index } = action;

            return {
                ...state,
                favoriteCities: [
                    ...favoriteCities.slice(0, index),
                    ...favoriteCities.slice(index + 1),
                ],
            };
        }
        default:
            return state;
    }
}

export default favoritesReducer;
