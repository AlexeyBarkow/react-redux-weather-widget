import types from '../actions/types';

function favoritesReducer(state = {}, action) {
    switch (action.type) {
        case types.PUSH_FAVORITE: {
            const { favorites: { favoriteCities } } = state;
            const { city } = action;
            city.index = favoriteCities.length;
            return {
                ...state,
                favoriteCities: [...favoriteCities, ...[city]],
            };
        }
        case types.REMOVE_FAVORITE: {
            const { favorites: { favoriteCities } } = state;
            const index = action;
            return {
                ...state,
                favoriteCities: [...favoriteCities.slice(0, index), ...favoriteCities.slice(index)],
            };
        }
        default:
            return state;
    }
}

export default favoritesReducer;
