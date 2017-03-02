import types from '../actions/types';

function dragAndDropReducer(state = {}, action) {
    switch (action.type) {
        case types.START_DRAG:
            return {
                ...state,
                dragData: action.data,
            };
        case types.DROP_DRAG:
            return {
                ...state,
                dragData: null,
            };
        default:
            return state;
    }
}

export default dragAndDropReducer;
