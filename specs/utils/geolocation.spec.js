import { loadLocation } from '../../app/utils/geolocationAPI';

describe('#loadLocation', () => {
    afterEach(() => {
        delete global.navigator.geolocation;
    });
    it('should return an error message when geolocation is unavailable', () => {
        global.navigator.geolocation = {
            getCurrentPosition: (callback) => {
                callback();
            },
        };

        return loadLocation().catch((data) => {
            expect(data).toEqual({
                message: 'could not get geoposition',
            });
        });
    });
    it('should return coords when geolocation works properly', () => {
        const coords = {
            latitude: 50,
            longitude: 50,
        };
        global.navigator.geolocation = {
            getCurrentPosition: (callback) => {
                callback({ coords });
            },
        };
        return loadLocation().then((data) => {
            expect(data).toEqual(coords);
        });
    });
});
