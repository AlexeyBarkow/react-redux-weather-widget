import types from '../../app/dataflow/actions/types';
import { getLocation, autocompleteCity, getWeather, getForecast, getWeatherByLocation, getForecastByLocation, getNearestTo } from '../../app/dataflow/actions';
import { loadLocation } from '../../app/utils/geolocationAPI';
import getCityAPI from '../../app/utils/getCityAPI';
import getWeatherAjax from '../../app/utils/weatherAPI';
import { createInfoAbout, createInfoArray } from '../testUtils/weatherCreator';

jest.mock('../../app/utils/geolocationAPI', () => ({
    loadLocation: jest.fn(),
}));
jest.mock('../../app/utils/getCityAPI', () => ({
    getCityAjax: jest.fn(),
}));
jest.mock('../../app/utils/weatherAPI', () => ({
    fetchCurrentWeather: jest.fn(),
    getWeatherInfoByLocation: jest.fn(),
    fetchWeatherForecast: jest.fn(),
    getForecastInfoByLocation: jest.fn(),
    getClosestCitiesToLocation: jest.fn(),
}));

describe('actions', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('location.js', () => {
        describe('#getLocation', () => {
            it('should dispatch changeLocation event when geolocation service is working', () => {
                const geolocation = {
                    latitude: 10,
                    longitude: 10,
                };
                const expectedAction = {
                    type: types.UPDATE_LOCATION,
                    geolocation,
                };
                loadLocation.mockImplementation(() => Promise.resolve(geolocation));
                return getLocation()(dispatchMock).then(() => {
                    expect(dispatchMock).toHaveBeenCalledWith(expectedAction);
                });
            });
            it('should dispatch error when geolocation service returned an error', () => {
                const geolocation = {
                    status: 404,
                    message: 'err',
                };
                const expectedAction = {
                    type: types.SET_LOCATION_STATUS,
                    geolocation,
                };
                loadLocation.mockImplementation(() => Promise.reject(geolocation));
                return getLocation()(dispatchMock).then(() => {
                    expect(dispatchMock).toHaveBeenCalledWith(expectedAction);
                });
            });
        });
    });
    describe('nearestCities.js', () => {
        describe('#autocompleteCity', () => {
            it('should dispatch autocomplete array set event', () => {
                const input = 'input';
                const autocomplete = ['1', '2'];
                autocomplete.input = input;
                const expectedAction = {
                    type: types.SET_AUTOCOMPLETE_ARRAY,
                    autocomplete,
                };
                getCityAPI.getCityAjax.mockImplementation(() => Promise.resolve(autocomplete));
                return autocompleteCity('', input)(dispatchMock).then(() => {
                    expect(dispatchMock).toHaveBeenCalledWith(expectedAction);
                });
            });
            it('should dispatch autocomplete array set event', () => {
                const autocomplete = [];
                const error = {
                    message: 'err',
                    status: 404,
                };
                autocomplete.error = error;
                const expectedAction = {
                    type: types.SET_AUTOCOMPLETE_ERROR,
                    autocomplete,
                };
                getCityAPI.getCityAjax.mockImplementation(() => Promise.reject(error));
                return autocompleteCity('')(dispatchMock).then(() => {
                    expect(dispatchMock).toHaveBeenCalledWith(expectedAction);
                });
            });
        });
    });
    // this is gonna be painful
    describe('weather.js', () => {
        let getStore;
        beforeEach(() => {
            getStore = () => ({
                weather: { cache: {} },
                location: { geolocation: {} },
            });
        });
        describe('#getWeather', () => {
            beforeEach(() => {
                getWeatherAjax.fetchCurrentWeather.mockImplementation(() => Promise.reject({ error: 'no mock data implemented' }));
            });
            it('should return cached value if it is presented in cache', () => {
                const cached = createInfoAbout('test', 1, { country: 'by', status: 200 });
                getStore = () => ({
                    weather: {
                        cache: {
                            'weather/test/by': cached,
                        },
                    },
                });
                return getWeather('test', 'by')(dispatchMock, getStore).then((res) => {
                    expect(getWeatherAjax.fetchCurrentWeather).not.toHaveBeenCalled();
                    expect(dispatchMock).toHaveBeenCalledTimes(1);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.UPDATE_WEATHER_INFO,
                        weather: cached,
                    });
                    expect(res).toEqual(cached);
                });
            });
            it('should set loading status before fetching weather', () => {
                const expectedAction = {
                    type: types.SET_WEATHER_STATUS,
                    weather: {
                        status: 1,
                        message: 'loading...',
                    },
                };
                return getWeather('test', 'by')(dispatchMock, getStore).catch(e => e).then(() => {
                    expect(dispatchMock).toBeCalledWith(expectedAction);
                });
            });
            it('should stop if previous ajax is already sent', () => {
                const message = {
                    cod: -1,
                };
                getWeatherAjax.fetchCurrentWeather
                    .mockImplementation(() => Promise.resolve(message));
                return getWeather('test', 'by')(dispatchMock, getStore).then((res) => {
                    expect(res).not.toEqual(expect.anything());
                });
            });
            it('should cache result if it\'s presented and return the fetched value', () => {
                const response = createInfoAbout('test', 1, { country: 'by' });
                getWeatherAjax.fetchCurrentWeather
                    .mockImplementation(() => Promise.resolve(response));
                return getWeather('test', 'by')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.CACHE_PUSH,
                        cache: response,
                        key: 'weather/test/by',
                    });
                });
            });
            it('should dispatch weather error action when server responded with error', () => {
                const response = {
                    response: {
                        data: {
                            cod: 404,
                            message: 'something went wrong',
                        },
                    },
                };
                getWeatherAjax.fetchCurrentWeather
                    .mockImplementation(() => Promise.resolve(response));
                return getWeather('test', 'by')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response.response.data);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.SET_WEATHER_STATUS,
                        weather: {
                            status: 404,
                            message: 'something went wrong',
                        },
                    });
                });
            });
        });
        describe('#getWeatherByLocation', () => {
            beforeEach(() => {
                getWeatherAjax.getWeatherInfoByLocation
                .mockImplementation(() => Promise.reject({ error: 'no mock data implemented' }));
            });
            it('should return cached value if it is presented in cache', () => {
                const cached = createInfoAbout('test', 1, { country: 'any', status: 200 });
                getStore = () => ({
                    weather: {
                        cache: {
                            'weather/test/any': cached,
                        },
                    },
                });
                return getWeatherByLocation({}, 'test')(dispatchMock, getStore).then((res) => {
                    expect(getWeatherAjax.getWeatherInfoByLocation).not.toHaveBeenCalled();
                    expect(dispatchMock).toHaveBeenCalledTimes(1);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.UPDATE_WEATHER_INFO,
                        weather: cached,
                    });
                    expect(res).toEqual(cached);
                });
            });
            it('should cache result if it\'s presented and return the fetched value', () => {
                const response = createInfoAbout('test', 1, { country: 'any' });
                const location = {
                    latitude: 10,
                    longitude: 15,
                };
                getWeatherAjax.getWeatherInfoByLocation
                    .mockImplementation(() => Promise.resolve(response));
                return getWeatherByLocation(location, 'test')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.CACHE_PUSH,
                        cache: response,
                        key: 'weather/test/any',
                    });
                });
            });
            it('should dispatch weather error action when server responded with error', () => {
                const response = {
                    response: {
                        data: {
                            cod: 404,
                            message: 'something went wrong',
                        },
                    },
                };
                const location = {
                    latitude: 10,
                    longitude: 15,
                };
                getWeatherAjax.getWeatherInfoByLocation
                    .mockImplementation(() => Promise.resolve(response));
                return getWeatherByLocation(location, 'test')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response.response.data);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.SET_WEATHER_STATUS,
                        weather: {
                            status: 404,
                            message: 'something went wrong',
                        },
                    });
                });
            });
        });
        describe('#getForecast', () => {
            beforeEach(() => {
                getWeatherAjax.fetchWeatherForecast
                .mockImplementation(() => Promise.reject({ error: 'no mock data implemented' }));
            });
            it('should return cached value if it is presented in cache', () => {
                const cached = createInfoArray('test', 1, 2, undefined, () => ({ country: 'any' }));
                cached.status = 200;
                getStore = () => ({
                    weather: {
                        cache: {
                            'forecast/test/any': cached,
                        },
                    },
                });
                return getForecast('test', 'any')(dispatchMock, getStore).then((res) => {
                    expect(getWeatherAjax.fetchWeatherForecast).not.toHaveBeenCalled();
                    expect(dispatchMock).toHaveBeenCalledTimes(1);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.UPDATE_FORECAST,
                        forecast: cached,
                    });
                    expect(res).toEqual(cached);
                });
            });
            it('should cache result if it\'s presented and return the fetched value', () => {
                const response = createInfoArray('test', 1, 2, undefined, () => ({ country: 'any' }));
                getWeatherAjax.fetchWeatherForecast
                    .mockImplementation(() => Promise.resolve(response));
                return getForecast('test', 'any')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.CACHE_PUSH,
                        cache: response,
                        key: 'forecast/test/any',
                    });
                });
            });
            it('should dispatch forecast error action when server responded with error', () => {
                const response = {
                    response: {
                        data: {
                            cod: 404,
                            message: 'something went wrong',
                        },
                    },
                };
                getWeatherAjax.fetchWeatherForecast
                    .mockImplementation(() => Promise.resolve(response));
                return getForecast('test', 'any')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response.response.data);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.SET_FORECAST_STATUS,
                        forecast: [{
                            status: 404,
                            message: 'something went wrong',
                        }],
                    });
                });
            });
        });
        describe('#getForecastByLocation', () => {
            beforeEach(() => {
                getWeatherAjax.getForecastInfoByLocation
                .mockImplementation(() => Promise.reject({ error: 'no mock data implemented' }));
            });
            it('should return cached value if it is presented in cache', () => {
                const cached = createInfoArray('test', 1, 2, undefined, () => ({ country: 'any' }));
                cached.status = 200;
                getStore = () => ({
                    weather: {
                        cache: {
                            'forecast/test/any': cached,
                        },
                    },
                });
                return getForecastByLocation({}, 'test')(dispatchMock, getStore).then((res) => {
                    expect(getWeatherAjax.getForecastInfoByLocation).not.toHaveBeenCalled();
                    expect(dispatchMock).toHaveBeenCalledTimes(1);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.UPDATE_FORECAST,
                        forecast: cached,
                    });
                    expect(res).toEqual(cached);
                });
            });
            it('should cache result if it\'s presented and return the fetched value', () => {
                const response = createInfoArray('test', 1, 2, undefined, () => ({ country: 'any' }));
                getWeatherAjax.getForecastInfoByLocation
                    .mockImplementation(() => Promise.resolve(response));
                return getForecastByLocation({}, 'test')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.CACHE_PUSH,
                        cache: response,
                        key: 'forecast/test/any',
                    });
                });
            });
            it('should dispatch forecast error action when server responded with error', () => {
                const response = {
                    response: {
                        data: {
                            cod: 404,
                            message: 'something went wrong',
                        },
                    },
                };
                getWeatherAjax.getForecastInfoByLocation
                    .mockImplementation(() => Promise.resolve(response));
                return getForecastByLocation({}, 'test')(dispatchMock, getStore).then((res) => {
                    expect(res).toEqual(response.response.data);
                    expect(dispatchMock).toHaveBeenCalledWith({
                        type: types.SET_FORECAST_STATUS,
                        forecast: [{
                            status: 404,
                            message: 'something went wrong',
                        }],
                    });
                });
            });
            describe('#getNearestTo', () => {
                let location;
                beforeEach(() => {
                    location = {
                        latitude: 10,
                        longitude: 10,
                    };
                    getWeatherAjax.getClosestCitiesToLocation
                    .mockImplementation(() => Promise.reject({ error: 'no mock data implemented' }));
                });
                it('should set error status when no geolocation is presented in store', () => {
                    const expectedResult = {
                        code: -1,
                        message: 'Could not get geolocation',
                    };
                    const nearestCities = [];
                    nearestCities.error = expectedResult;
                    const expectedAction = {
                        type: types.SET_NEAREST_CITIES_ERROR,
                        nearestCities,
                    };
                    return getNearestTo()(dispatchMock, getStore).then((res) => {
                        expect(res).toHaveProperty('code', -1);
                        expect(dispatchMock).toHaveBeenCalledWith(expectedAction);
                        expect(getWeatherAjax.getClosestCitiesToLocation).not.toHaveBeenCalled();
                    });
                });
                it('should dispatch nearestCities error if server responded with error', () => {
                    const expectedResult = {
                        code: 404,
                        message: 'something went wrong',
                    };
                    const nearestCities = [];
                    nearestCities.error = expectedResult;
                    const expectedAction = {
                        type: types.SET_NEAREST_CITIES_ERROR,
                        nearestCities,
                    };
                    getWeatherAjax.getClosestCitiesToLocation
                        .mockImplementation(() => Promise.resolve({
                            response: {
                                status: 404,
                                statusText: 'something went wrong',
                            },
                        }));
                    return getNearestTo(location)(dispatchMock, getStore).then((res) => {
                        expect(res).toEqual(expectedResult);
                        expect(dispatchMock).toHaveBeenCalledWith(expectedAction);
                    });
                });
                it('should dispatch cache actions for each city fetched', () => {
                    const respond = createInfoArray('test', 5, 1, undefined, i => ({ country: `t${i}` }));
                    getWeatherAjax.getClosestCitiesToLocation
                        .mockImplementation(() => Promise.resolve(respond));
                    return getNearestTo(location)(dispatchMock, getStore).then(() => {
                        respond.forEach((curr) => {
                            expect(dispatchMock).toHaveBeenCalledWith({
                                type: types.CACHE_PUSH,
                                cache: curr,
                                key: `weather/${curr.city}/${curr.country}`,
                            });
                        });
                    });
                });
                it('should dispatch and return nearestCities fetched', () => {
                    const response = createInfoArray(i => `test${i}`, 2, 1, undefined, i => ({ country: `t${i}` }));
                    const nearestCities = [
                        { countryCode: 't1', name: 'test1' },
                        { countryCode: 't2', name: 'test2' },
                    ];
                    const expectedAction = {
                        type: types.SET_NEAREST_CITIES,
                        nearestCities,
                    };
                    getWeatherAjax.getClosestCitiesToLocation
                        .mockImplementation(() => Promise.resolve(response));
                    return getNearestTo(location)(dispatchMock, getStore).then((res) => {
                        expect(res).toEqual(nearestCities);
                        expect(dispatchMock).toHaveBeenCalledWith(expectedAction);
                    });
                });
            });
        });
    });
});
