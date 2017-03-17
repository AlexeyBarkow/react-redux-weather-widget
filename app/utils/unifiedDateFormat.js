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

export function getFirstDayOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    return new Date(year, month, 0);
}

export function getMonthLength(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return new Date(year, month, 0).getDate();
}

export function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

export function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
}

export function compareDatesDay(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear();
}

export function convertToDateString(day, month, year) {
    return `${day < 10 ? `0${day}` : day}.${day < 10 ? `0${month + 1}` : month + 1}.${year}`;
}
