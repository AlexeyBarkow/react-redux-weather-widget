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
    return checkValidity(date, () => dateFormat(date, 'HH'));
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

export function addDays(date, days = 0) {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

export function addMonths(date, months = 0) {
    const newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
}

export function compareDatesDay(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear();
}

export function convertToDateString(day, month, year) {
    return dateFormat(new Date(year, month, day), 'dd.mm.yyyy');
}

export function compareDatesDayDiff(date1, date2) {
    const date1Start = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2Start = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = date1Start.getTime() - date2Start.getTime();
    const oneDay = 1000 * 3600 * 24;

    return Math.round(Math.abs(diff) / oneDay) * (diff > 0 ? 1 : -1);
}
