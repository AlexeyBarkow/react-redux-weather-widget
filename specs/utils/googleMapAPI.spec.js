import { createMarker, setMapOnAll, initMap, clearMarkers } from '../../app/utils/googleMapAPI';

describe('googleMapAPI', () => {
    const testPosition = {
        latitude: 25.6,
        longitude: 15.2,
    };
    const resPosition = {
        lat: 25.6,
        lng: 15.2,
    };

    const map = {};
    let stored;
    const LatLngmock = jest.fn(() => resPosition);

    beforeEach(() => {
        stored = global.google = {
            maps: {
                LatLng: LatLngmock,
            },
        };
    });

    afterEach(() => {
        global.google = stored;
    });

    describe('#createMarker', () => {
        it('should return null when map isn\'t specified', () => {
            expect(createMarker(undefined, testPosition, 'test')).toBe(null);
        });
        it('should return new google.maps.Marker', () => {
            const Marker = jest.fn();
            global.google.maps.Marker = Marker;

            createMarker({}, testPosition, 'test');
            expect(Marker.mock.calls[0][0]).toEqual({
                position: resPosition,
                title: 'test',
                map,
            });
        });
    });

    describe('#setMapOnAll', () => {
        it('should call setMap method for each marker', () => {
            const marker1 = {
                setMap: jest.fn(),
            };
            const marker2 = {
                setMap: jest.fn(),
            };

            setMapOnAll(map, [marker1, marker2]);

            expect(marker1.setMap.mock.calls[0][0]).toBe(map);
            expect(marker2.setMap.mock.calls[0][0]).toBe(map);
        });
    });

    describe('#initMap', () => {
        const container = {};
        it('should return null when no google global variable provided', () => {
            global.google = undefined;
            expect(initMap(container, testPosition, map)).toBe(null);
        });
        it('should not return new map if previous map is passed', () => {
            expect(initMap(container, testPosition, map)).toBe(map);
        });
        it('should create new map within passed container with provided center coordinates when no default map is specified', () => {
            const Map = jest.fn();
            global.google.maps.Map = Map;
            initMap(container, testPosition);

            expect(Map.mock.calls[0][0]).toBe(container);
            expect(Map.mock.calls[0][1].center).toEqual(resPosition);
        });
    });
    describe('#clearMarkers', () => {
        it('should set map for all the markers to null', () => {
            const marker1 = {
                setMap: jest.fn(),
            };
            const marker2 = {
                setMap: jest.fn(),
            };
            clearMarkers([marker1, marker2]);
            expect(marker1.setMap.mock.calls[0][0]).toBe(null);
            expect(marker2.setMap.mock.calls[0][0]).toBe(null);
        });
    });
});
