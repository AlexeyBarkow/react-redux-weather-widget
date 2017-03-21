import { formatDate, getMonth, getDay, getMinutes, getHours, getFirstDayOfMonth, getMonthLength, addDays, addMonths, compareDatesDay, convertToDateString, compareDatesDayDiff } from '../../app/utils/unifiedDateFormat';

describe('unifiedDateFormat.js', () => {
    let date;
    beforeEach(() => {
        date = new Date(2017, 2, 2, 14, 5);
    });
    describe('#formatDate', () => {
        it('should return properly formatted date', () => {
            expect(formatDate(date)).toBe('March 2nd at 2:05');
        });
        it('should return \'Invalid date\' when date is falsy', () => {
            expect(formatDate(undefined)).toBe('Invalid date');
        });
        it('should return \'Invalid date\' when date is falsy', () => {
            expect(formatDate(undefined)).toBe('Invalid date');
        });
        it('should return \'Invalid date\' when date is falsy', () => {
            expect(formatDate(new Date(undefined))).toBe('Invalid date');
        });
    });

    describe('#getMonth', () => {
        it('should return short month name', () => {
            expect(getMonth(date)).toBe('Mar');
        });
    });

    describe('#getDay', () => {
        it('should return day of the month', () => {
            expect(getDay(date)).toBe('02');
        });
    });

    describe('#getMinutes', () => {
        it('should return minutes', () => {
            expect(getMinutes(date)).toBe('05');
        });
    });

    describe('#getHours', () => {
        it('should return full hours', () => {
            expect(getHours(date)).toBe('14');
        });
    });

    describe('#getFirstDayOfMonth', () => {
        it('should return first day of the month', () => {
            const expectedDate = new Date(2017, 2, 0);
            expect(getFirstDayOfMonth(date)).toEqual(expectedDate);
        });
    });

    describe('#getMonthLength', () => {
        it('should return March length', () => {
            expect(getMonthLength(date)).toEqual(31);
        });
    });

    describe('#addDays', () => {
        it('should not mutate the previous date object', () => {
            expect(addDays(date, 0)).not.toBe(date);
        });
        it('should return 12 March', () => {
            const newDate = new Date(2017, 2, 12, 14, 5);
            expect(addDays(date, 10)).toEqual(newDate);
        });
        it('should return old date when no second argument specified', () => {
            const copy = new Date(date.getTime());
            expect(addDays(date)).toEqual(copy);
        });
    });

    describe('#addMonths', () => {
        it('should not mutate the previous date object', () => {
            expect(addMonths(date, 0)).not.toBe(date);
        });
        it('should return 21 April', () => {
            const newDate = new Date(2017, 3, 2, 14, 5);
            expect(addMonths(date, 1)).toEqual(newDate);
        });
        it('should return old date when no second argument specified', () => {
            const copy = new Date(date.getTime());
            expect(addMonths(date)).toEqual(copy);
        });
    });

    describe('#compareDatesDay', () => {
        it('should return true if the dates take place in the same day', () => {
            const anotherDate = new Date(2017, 2, 2, 2);
            expect(compareDatesDay(date, anotherDate));
        });
        it('should return false if the dates take place in different days', () => {
            const anotherDate = new Date(2017, 3, 21, 2);
            expect(compareDatesDay(date, anotherDate));
        });
    });

    describe('#convertToDateString', () => {
        it('should properly convert dates', () => {
            expect(convertToDateString(date.getDate(), date.getMonth(), date.getFullYear())).toEqual('02.03.2017');
        });
    });
    describe('#compareDatesDayDiff', () => {
        it('should count the difference in days properly', () => {
            const anotherDate = new Date(2017, 3, 21, 2);
            expect(compareDatesDayDiff(anotherDate, date)).toBe(50);
        });
        it('should return the negative value if 2nd argument precedes the 1st', () => {
            const anotherDate = new Date(2017, 1, 21, 2);
            expect(compareDatesDayDiff(anotherDate, date)).toBe(-9);
        });
    });
});
