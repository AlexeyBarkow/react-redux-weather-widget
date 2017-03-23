import types from '../../app/dataflow/actions/types';
import rootReducer from '../../app/dataflow/reducers';
import dragAndDropReducer from '../../app/dataflow/reducers/dragAndDrog';
import favoritesReducer from '../../app/dataflow/reducers/favorites';
import locationReducer from '../../app/dataflow/reducers/location';
import mainReducer from '../../app/dataflow/reducers/main';
import tooltipReducer from '../../app/dataflow/reducers/tooltip';
import weatherReducer from '../../app/dataflow/reducers/weather';

describe('reducers', () => {
    const JEST_TEST_ACTION = '[JEST_TEST] TEST';
    describe('dragAndDropReducer', () => {
        let store;
        beforeEach(() => {
            store = {};
        });
        it('should mutate previous store object if any supported action is provided', () => {
            expect(dragAndDropReducer(store, { type: types.START_DRAG })).not.toBe(store);
            expect(dragAndDropReducer(store, { type: types.DROP_DRAG })).not.toBe(store);
        });
    });
    describe('favoritesReducer', () => {
        let store;
        beforeEach(() => {
            store = {
                favoriteCities: [{ i: 0 }, { i: 1 }, { i: 2 }, { i: 3 }],
            };
        });
        it('action MOVE_FAVORITE should return previous state if indexes are equal', () => {
            const action = {
                typs: types.MOVE_FAVORITE,
                index: 0,
                newIndex: 0,
            };
            expect(favoritesReducer(store, action)).toBe(store);
        });

        it('action MOVE_FAVORITE should move element to the proper place when indexes are different', () => {
            const action = {
                type: types.MOVE_FAVORITE,
                newIndex: 1,
                index: 2,
            };
            const el1 = store.favoriteCities[1];
            const el2 = store.favoriteCities[2];
            const reducedStoreFavorites = favoritesReducer(store, action).favoriteCities;
            expect(reducedStoreFavorites[1]).toBe(el2);
            expect(reducedStoreFavorites[2]).toBe(el1);
        });

        it('should mutate previous store object if any supported action is provided', () => {
            expect(favoritesReducer(store, { type: types.PUSH_FAVORITE })).not.toBe(store);
            expect(favoritesReducer(store, { type: types.SET_TOTAL_FILTER })).not.toBe(store);
            expect(favoritesReducer(store, { type: types.REMOVE_FAVORITE })).not.toBe(store);
            expect(favoritesReducer(store, { type: types.SET_CITIES_TO_FILTER })).not.toBe(store);
        });
    });
    describe('locationReducer', () => {
        let store;
        beforeEach(() => {
            store = {};
        });
        it('should mutate previous store object if any supported action is provided', () => {
            expect(locationReducer(store, { type: types.SET_NEAREST_CITIES })).not.toBe(store);
            expect(locationReducer(store, {
                type: types.SET_NEAREST_CITIES_ERROR,
            })).not.toBe(store);
            expect(locationReducer(store, { type: types.UPDATE_LOCATION })).not.toBe(store);
            expect(locationReducer(store, { type: types.SET_LOCATION_STATUS })).not.toBe(store);
        });
    });
    describe('mainReducer', () => {
        let store = {};
        beforeEach(() => {
            store = {};
        });
        it('should mutate previous store object if any supported action is provied', () => {
            expect(mainReducer(store, { type: types.SET_CITY })).not.toBe(store);
            expect(mainReducer(store, { type: types.SET_METRIC })).not.toBe(store);
            expect(mainReducer(store, { type: types.SET_AUTOCOMPLETE_ARRAY })).not.toBe(store);
            expect(mainReducer(store, { type: types.SET_AUTOCOMPLETE_ERROR })).not.toBe(store);
            expect(mainReducer(store, { type: types.CLEAR_AUTOCOMPLETE })).not.toBe(store);
        });
    });

    describe('tooltipReducer', () => {
        it('should mutate previous store object if any supported action is provied', () => {
            const store = {};
            expect(tooltipReducer(store, {
                type: types.CREATE_TOOLTIP,
                position: {},
            })).not.toBe(store);
            expect(tooltipReducer(store, { type: types.DESTROY_TOOLTIP })).not.toBe(store);
        });
    });

    describe('weatherReducer', () => {
        it('should mutate previous store object if any supported action is provied', () => {
            const store = {};
            expect(weatherReducer(store, { type: types.UPDATE_WEATHER_INFO })).not.toBe(store);
            expect(weatherReducer(store, { type: types.SET_WEATHER_STATUS })).not.toBe(store);
            expect(weatherReducer(store, { type: types.UPDATE_FORECAST })).not.toBe(store);
            expect(weatherReducer(store, { type: types.SET_FORECAST_STATUS })).not.toBe(store);
            expect(weatherReducer(store, { type: types.SET_FORECAST_FILTER })).not.toBe(store);
            expect(weatherReducer(store, { type: types.CACHE_PUSH })).not.toBe(store);
            expect(weatherReducer(store, { type: types.SET_CACHE_STATUS })).not.toBe(store);
        });
    });

    describe('rootReducer', () => {
        it('should not touch the store when not supported action is provided', () => {
            const store = {
                dragAndDrop: {},
                favorites: {},
                form: {},
                location: {},
                main: {},
                routing: {
                    locationBeforeTransitions: null,
                },
                tooltip: {},
                weather: {},
            };
            expect(rootReducer(store, { type: JEST_TEST_ACTION })).toBe(store);
        });
    });
});
