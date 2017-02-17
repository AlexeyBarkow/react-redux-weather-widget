import { VALIDATE_ADDRESS_REGEXP } from './constants';

export function validateAddress(value) {
    return VALIDATE_ADDRESS_REGEXP.test(value);
}
