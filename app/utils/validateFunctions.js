import {
    VALIDATE_ADDRESS_REGEXP,
    VALIDATE_TEMPERATURE_REGEXP,
    VALIDATE_PRESSURE_REGEXP,
    VALIDATE_HUMIDITY_REGEXP,
    VALIDATE_SPEED_REGEXP,
} from './constants';

export function validateAddress(value) {
    return !value || VALIDATE_ADDRESS_REGEXP.test(value);
}

export function validateTemperatureInput(value) {
    return VALIDATE_TEMPERATURE_REGEXP.test(value);
}

export function validatePressureInput(value) {
    return VALIDATE_PRESSURE_REGEXP.test(value);
}

export function validateHumidityInput(value) {
    return VALIDATE_HUMIDITY_REGEXP.test(value);
}

export function validateSpeedInput(value) {
    return VALIDATE_SPEED_REGEXP.test(value);
}
