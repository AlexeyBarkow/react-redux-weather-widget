import storeChangeHandler from '../../app/dataflow/middlewares/onStoreChange';
import types from '../../app/dataflow/actions/types';
import { createInfoAbout } from '../testUtils/weatherCreator';
import { getWeatherByLocation, getForecastByLocation, setForecastStatus, getWeather,
getForecast, redirectToCity } from '../../app/dataflow/actions';

// mock actions
jest.mock('../../app/dataflow/actions', () => {
    const gwbl = jest.fn();
    const gfbl = jest.fn();
    const sfs = jest.fn();
    const gw = jest.fn();
    const gf = jest.fn();
    const rts = jest.fn();
    return {
        getWeatherByLocation: () => gwbl,
        getForecastByLocation: () => gfbl,
        setForecastStatus: () => sfs,
        getWeather: () => gw,
        getForecast: () => gf,
        redirectToCity: () => rts,
    };
});

describe('middlewares', () => {
    const dispatchMock = jest.fn();
    afterEach(() => {
        jest.resetAllMocks();
    });
    beforeEach(() => {
        dispatchMock.mockImplementation(callback => Promise.resolve(callback()));
    });
    describe('handleCityChange', () => {
        let action;
        let store;
        let main;
        beforeAll(() => {
            main = {
                city: 'test',
                countryCode: 'cd',
            };
            action = {
                type: types.SET_CITY,
            };
            store = {
                main: {},
                weather: {
                    weather: {
                        ...createInfoAbout('test', 1),
                        status: 200,
                        location: {},
                    },
                },
            };
        });
        it('should do nothing if no city daya set', () => {
            storeChangeHandler(store, { ...store }, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledTimes(0);
        });
        it('should do nothing if new city and country are the same as prev', () => {
            store.main = main;
            storeChangeHandler(store, { ...store }, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledTimes(0);
        });
        it('should dispatch some events if no weather fetched', () => {
            store.main = main;
            store.weather.weather.status = 0;
            storeChangeHandler(store, { ...store }, action, dispatchMock);
            expect(dispatchMock.mock.calls.length).toBeGreaterThan(0);
        });
        it('should dispatch getWeatherByLocation when no countryCode is set and location is presented in weather', () => {
            const newStore = { ...store, main: { ...main, city: 'test2', countryCode: 'any' } };
            store.main = main;
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledWith(getWeatherByLocation());
        });
        it('should dispatch setForecastStatus when no countryCode is set and location is presented in weather but no location is provided', () => {
            const newStore = { ...store, main: { ...main, city: 'test2', countryCode: 'any' } };
            store.main = main;
            return storeChangeHandler(store, newStore, action, dispatchMock).then(() => {
                expect(dispatchMock).toHaveBeenCalledWith(setForecastStatus());
            });
        });
        it('should dispatch getForecastByLocation when no countryCode is set and location is presented in weather and weather fetched location successfully', () => {
            const newStore = { ...store, main: { ...main, city: 'test2', countryCode: 'any' } };
            store.main = main;
            getWeatherByLocation().mockImplementation(() => ({
                latitude: 10,
                longitude: 10,
            }));
            return storeChangeHandler(store, newStore, action, dispatchMock).then(() => {
                expect(dispatchMock).toHaveBeenCalledWith(getForecastByLocation());
            });
        });
        it('should dispatch getWeather and getForecast when the weather should be update and country code and cityname are defined', () => {
            const newStore = { ...store, main: { ...main, city: 'test2' } };
            store.main = main;
            return storeChangeHandler(store, newStore, action, dispatchMock).then(() => {
                expect(dispatchMock).toHaveBeenCalledWith(getWeather());
                expect(dispatchMock).toHaveBeenCalledWith(getForecast());
            });
        });
    });
    describe('handleNearesetCitiesSet', () => {
        let store;
        let action;
        beforeEach(() => {
            action = {
                type: types.SET_NEAREST_CITIES,
                nearestCities: [{ city: 'test', countryCode: 'tt' }],
            };
            store = {
                main: {},
            };
        });
        it('should dispatch redirectToCity event when nearestCities are set', () => {
            const newStore = { ...store, routing: { locationBeforeTransitions: { pathname: '/home' } } };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledWith(redirectToCity());
        });
        it('should not dispatch any events if a city is set', () => {
            const newStore = { ...store, main: { city: 'test2', countryCode: 'q' }, routing: { locationBeforeTransitions: { pathname: '/home' } } };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).not.toHaveBeenCalled();
        });
        it('should not dispatch any events if a location is not home-like', () => {
            const newStore = { ...store, routing: { locationBeforeTransitions: { pathname: '/cities/BY/Homel' } } };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).not.toHaveBeenCalled();
        });
    });
});
