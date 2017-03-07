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
        case types.SET_TOTAL_FILTER: {
            const { filter, key } = action;
            const { filters } = state;

            return {
                ...state,
                filters: {
                    ...filters,
                    [key]: filter,
                },
            };
        }
        case types.MOVE_FAVORITE: {
            const { favoriteCities } = state;
            const { length } = favoriteCities;
            const { index } = action;
            let { newIndex } = action;
            const city = favoriteCities[index];

            if (newIndex > length) {
                newIndex = Math.min(newIndex, length);
            }

            if (newIndex < 0) {
                newIndex = Math.max(newIndex, 0);
            }

            if (newIndex === index) {
                return state;
            }

            return {
                ...state,
                favoriteCities: favoriteCities.reduce((res, curr, i) => {
                    if (i === newIndex) {
                        res.push(city);
                    }
                    if (i !== index) {
                        res.push(curr);
                    }
                    if (newIndex === length && i === length - 1) {
                        res.push(city);
                    }
                    return res;
                }, []),
            };
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
