import dateFormat from 'dateformat';

function checkValidity(date, successCallback) {
    return !date || isNaN(date.getTime()) ? 'Invalid date' : successCallback();
}

export function formatDate(date) {
    return checkValidity(date, () => `${dateFormat(date, 'mmmm dS')} at ${dateFormat(date, 'h:MM')}`);
}

export function getMonth(date) {
    return checkValidity(date, () => dateFormat(date, 'mmm'));
}

export function getDay(date) {
    return checkValidity(date, () => dateFormat(date, 'dd'));
}

export function getMinutes(date) {
    return checkValidity(date, () => dateFormat(date, 'MM'));
}

export function getHours(date) {
    return checkValidity(date, () => dateFormat(date, 'HH '));
}
