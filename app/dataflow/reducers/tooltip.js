import types from '../actions/types';

function tooltipReducer(state = {}, action) {
    switch (action.type) {
        case types.CREATE_TOOLTIP: {
            const { position: { top, left, bottom, right }, tooltipText, tooltipType } = action;
            return {
                ...state,
                [tooltipType]: {
                    tooltipText,
                    top,
                    left,
                    bottom,
                    right,
                },
            };
        }
        case types.DESTROY_TOOLTIP: {
            const { tooltipType } = action;
            return {
                ...state,
                [tooltipType]: undefined,
            };
        }
        default:
            return state;
    }
}

export default tooltipReducer;
