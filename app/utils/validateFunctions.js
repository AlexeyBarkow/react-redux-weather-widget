import { VALIDATE_ADDRESS_REGEXP, VALIDATE_TEMPERATURE_REGEXP } from './constants';

export function validateAddress(value) {
    return VALIDATE_ADDRESS_REGEXP.test(value);
}

export function validateTemperatureInput(value) {
    return VALIDATE_TEMPERATURE_REGEXP.test(value);
}
