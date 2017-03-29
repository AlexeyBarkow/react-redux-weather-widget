import storeChangeHandler from '../../app/dataflow/middlewares/onStoreChange';
import types from '../../app/dataflow/actions/types';
import { createInfoAbout } from '../testUtils/weatherCreator';
import { getWeatherByLocation, getForecastByLocation, setForecastStatus, getWeather,
getForecast, redirectToCity, changeCity, setMetric, getNearestTo } from '../../app/dataflow/actions';
import { DEFAULT_COUNTRY_CODE } from '../../app/utils/constants';

// mock actions
jest.mock('../../app/dataflow/actions', () => ({
    getWeatherByLocation: jest.fn(),
    getForecastByLocation: jest.fn(),
    setForecastStatus: jest.fn(),
    getWeather: jest.fn(),
    getForecast: jest.fn(),
    redirectToCity: jest.fn(),
    changeCity: jest.fn(),
    setMetric: jest.fn(),
    getNearestTo: jest.fn(),
}));

describe('middlewares', () => {
    const dispatchMock = jest.fn();
    afterEach(() => {
        jest.resetAllMocks();
    });
    beforeEach(() => {
        dispatchMock.mockImplementation(callback => Promise.resolve(callback));
        getWeatherByLocation.mockImplementation(() => 'getWeatherByLocation');
        getForecastByLocation.mockImplementation(() => 'getForecastByLocation');
        setForecastStatus.mockImplementation(() => 'setForecastStatus');
        getWeather.mockImplementation(() => 'getWeather');
        getForecast.mockImplementation(() => 'getForecast');
        redirectToCity.mockImplementation(() => 'redirectToCity');
        changeCity.mockImplementation(() => 'changeCity');
        setMetric.mockImplementation(() => 'setMetric');
        getNearestTo.mockImplementation(() => 'getNearestTo');
    });
    describe('#handleCityChange', () => {
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
            expect(getWeatherByLocation).toHaveBeenCalledWith({}, 'test2');
        });
        it('should dispatch setForecastStatus when no countryCode is set and location is presented in weather but no location is returned from server', () => {
            const newStore = { ...store, main: { ...main, city: 'test2', countryCode: 'any' } };
            const message = { location: {} };
            store.main = main;
            dispatchMock.mockImplementation(() => Promise.resolve(message));
            return storeChangeHandler(store, newStore, action, dispatchMock).then(() => {
                expect(dispatchMock).toHaveBeenCalledWith(setForecastStatus());
                expect(setForecastStatus).toHaveBeenCalledWith(message.location);
            });
        });
        it('should dispatch getForecastByLocation when no countryCode is set and location is presented in weather and weather fetched location successfully', () => {
            const newStore = { ...store, main: { ...main, city: 'test2', countryCode: DEFAULT_COUNTRY_CODE } };
            const location = {
                latitude: 10,
                longitude: 10,
            };
            store.main = main;
            getWeatherByLocation.mockImplementation(() => ({ location }));
            return storeChangeHandler(store, newStore, action, dispatchMock).then(() => {
                expect(dispatchMock).toHaveBeenCalledWith(getForecastByLocation());
                expect(getForecastByLocation).toHaveBeenCalledWith(location, 'test2');
            });
        });
        it('should dispatch getWeather and getForecast when the weather should be update and country code and cityname are defined', () => {
            const newStore = { ...store, main: { ...main, city: 'test2' } };
            store.main = main;
            return storeChangeHandler(store, newStore, action, dispatchMock).then(() => {
                expect(dispatchMock).toHaveBeenCalledWith(getWeather());
                expect(dispatchMock).toHaveBeenCalledWith(getForecast());
                expect(getWeather).toBeCalledWith('test2', 'cd');
                expect(getForecast).toBeCalledWith('test2', 'cd');
            });
        });
    });
    describe('#handleNearesetCitiesSet', () => {
        let store;
        let action;
        beforeEach(() => {
            action = {
                type: types.SET_NEAREST_CITIES,
                nearestCities: [{ name: 'test', countryCode: 'tt' }],
            };
            store = {
                main: {},
            };
        });
        it('should dispatch redirectToCity event when nearestCities are set', () => {
            const newStore = { ...store, routing: { locationBeforeTransitions: { pathname: '/home' } } };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledWith(redirectToCity());
            expect(redirectToCity).toHaveBeenCalledWith('test', 'tt');
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
    describe('#handleLocationChange', () => {
        let store;
        let action;
        beforeEach(() => {
            store = {
                main: {
                    city: 'test',
                    countryCode: 'cd',
                },
                location: { nearestCities: [] },
            };
            action = {
                type: types.LOCATION_CHANGE,
                payload: {},
            };
        });
        it('should redirecty to the first nearest city when /home path is entered', () => {
            const nearest = { name: 'city', countryCode: 'dd' };
            const newStore = {
                ...store,
                location: { nearestCities: [nearest] },
            };
            action.payload.pathname = '/home';
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith(redirectToCity());
            expect(redirectToCity).toHaveBeenCalledWith(nearest.name, nearest.countryCode);
        });
        it('should dispatch change city event when city name or country code are changed in path string', () => {
            const newStore = { ...store };
            action.payload.pathname = '/cities/dd/test';
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledWith(changeCity());
            expect(changeCity).toHaveBeenCalledWith('test', 'dd');
        });
        it('should redirect to previous city when empty path is provided', () => {
            const newStore = { ...store };
            action.payload.pathname = '/';
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledWith(redirectToCity());
            expect(redirectToCity).toHaveBeenCalledWith('test', 'cd', undefined);
        });
        it('should change app\'s metric if metric is provided to query', () => {
            const newStore = { ...store };
            action.payload.query = {
                metric: 'K',
            };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledWith(setMetric());
            expect(setMetric).toHaveBeenCalledWith('K');
        });
    });
    describe('#handleLocationUpdate', () => {
        let store;
        let action;
        beforeEach(() => {
            store = {
                location: { geolocation: {
                    latitude: 5,
                    longitude: 5,
                } },
            };
            action = {
                type: types.UPDATE_LOCATION,
            };
        });
        it('should dispatch getNearestTo action when location is changed', () => {
            const newLocation = {
                latitude: 10,
                longitude: 10,
            };
            const newStore = { ...store, location: { geolocation: newLocation } };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).toHaveBeenCalledWith(getNearestTo());
            expect(getNearestTo).toHaveBeenCalledWith(newLocation);
        });

        it('should not dispatch any events if location is not changed', () => {
            const newStore = { ...store };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).not.toHaveBeenCalled();
        });
        it('should not dispatch any events new location is undefined', () => {
            const newStore = { ...store, location: { geolocation: undefined } };
            storeChangeHandler(store, newStore, action, dispatchMock);
            expect(dispatchMock).not.toHaveBeenCalled();
        });
    });
});
