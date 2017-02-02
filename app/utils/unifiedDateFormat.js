import dateFormat from 'dateformat';

export function formatDate(date) {
    return `${dateFormat(date, 'mmmm dS')} at ${dateFormat(date, 'h:MM')}`;
}

export function getMonth(date) {
    return dateFormat(date, 'mmm');
}

export function getDay(date) {
    return dateFormat(date, 'dd');
}

export function getMinutes(date) {
    return dateFormat(date, 'MM');
}

export function getHours(date) {
    return dateFormat(date, 'HH ');
}
