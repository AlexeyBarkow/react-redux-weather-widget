import { validateAddress } from '../../app/utils/validateFunctions';

describe('validateFunctions.js', () => {
    describe('#validateAddress', () => {
        it('should return true when takes an empty string', () => {
            expect(validateAddress('')).toBeTruthy();
        });
        it('should return true when takes a valid address string', () => {
            expect(validateAddress('Homel, By')).toBeTruthy();
        });
        it('should return false when takes an invalid address string', () => {
            expect(validateAddress('qwewqeqwe')).toBeFalsy();
        });
    });
});
