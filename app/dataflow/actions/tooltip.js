import types from './types';
import { DEFAULT_TOOLTIP_TYPE } from '../../utils/constants';

export function createTooltip(tooltipText, position, tooltipType = DEFAULT_TOOLTIP_TYPE) {
    return {
        type: types.CREATE_TOOLTIP,
        tooltipType,
        position,
        tooltipText,
    };
}

export function destroyTooltip(tooltipType) {
    return {
        type: types.DESTROY_TOOLTIP,
        tooltipType,
    };
}
