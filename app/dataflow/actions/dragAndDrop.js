import types from './types';

export function setDragData(data) {
    return {
        type: types.START_DRAG,
        data,
    };
}

export function dropData() {
    return {
        type: types.DROP_DRAG,
    };
}
