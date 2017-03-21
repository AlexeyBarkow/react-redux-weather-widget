import { load, save } from '../../app/utils/localStorage';

describe('localStorage', () => {
    let localStorage;
    beforeAll(() => {
        localStorage = global.localStorage;
        global.localStorage = {
            setItem: jest.fn(),
            getItem: jest.fn(),
        };
    });

    afterAll(() => {
        global.localStorage = localStorage;
    });

    const key = 'key';
    const parsedObject = { key: 'value' };
    const stringifiedObject = '{"key":"value"}';

    describe('#load', () => {
        afterEach(() => {
            global.localStorage.getItem.mockReset();
        });
        it('should return undefined when localStorage throws an error', () => {
            global.localStorage.getItem.mockImplementation(() => {
                const err = {};
                throw (err);
            });
            expect(load(key)).toBe(undefined);
        });
        it('should return undefined when no data is stored', () => {
            global.localStorage.getItem.mockImplementation(() => null);
            expect(load(key)).toBe(undefined);
        });
        it('should return parsed data when it exists', () => {
            global.localStorage.getItem.mockImplementation(() => stringifiedObject);
            expect(load(key)).toEqual(parsedObject);
        });
    });

    describe('#save', () => {
        afterEach(() => {
            global.localStorage.setItem.mockReset();
        });
        it('should save the serialized data to the given key', () => {
            save(key, parsedObject);
            expect(global.localStorage.setItem.mock.calls[0][0]).toBe(key);
            expect(global.localStorage.setItem.mock.calls[0][1]).toEqual(stringifiedObject);
        });
    });
});
