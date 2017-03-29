import axios, { CancelToken, isCancel } from 'axios';
import weatherAPI, { fromMetheoDirection, convertValueToMetric } from '../../app/utils/weatherAPI';
import { GET_WEATHER_RESPONSE, GET_WEATHER_RESULT, GET_WEATHER_NOT_FOUND_RESPONSE, GET_CLOSEST_RESPONSE, GET_CLOSEST_RESULT } from '../testUtils/testWeather';
import { FORECAST_RESPOND, FORECAST_RESULT } from '../testUtils/testForecast';

jest.mock('axios');

describe('weatherAPI.js', () => {
    describe('#fromMetheoDirection', () => {
        it('should return N when degree is 0', () => {
            expect(fromMetheoDirection(0)).toBe('N');
        });
        it('should return N when degree is 365', () => {
            expect(fromMetheoDirection(365)).toBe('N');
        });
    });

    describe('#convertValueToMetric', () => {
        it('should return previous value if metrics are equal', () => {
            expect(convertValueToMetric(0, 'C', 'C')).toBe(0);
        });
        it('should correctly convert 0C to 273K', () => {
            expect(convertValueToMetric(0, 'K', 'C')).toBe(273);
        });
        it('should correctly convert 32F to 0C', () => {
            expect(convertValueToMetric(32, 'C', 'F')).toBe(0);
        });
        it('should correctly convert 0C to 32F', () => {
            expect(convertValueToMetric(0, 'F', 'C')).toBe(32);
        });
    });

    describe('#weatherAPI', () => {
        let cancel;
        const token = {};
        const cancelErr = {};
        beforeAll(() => {
            const getWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Minsk,BY&APPID=1c11f4e7692bb5e0526e72c0e6baaa3b&units=metric';
            const getForecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Minsk,BY&APPID=1c11f4e7692bb5e0526e72c0e6baaa3b&units=metric';
            const getWrongWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=qweqweqwewqeqwe&APPID=1c11f4e7692bb5e0526e72c0e6baaa3b&units=metric';
            const getWrongForecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=qweqweqwewqeqwe&APPID=1c11f4e7692bb5e0526e72c0e6baaa3b&units=metric';
            const getClosestCitiesUrl = 'http://api.openweathermap.org/data/2.5/find?lat=10&lon=10&cnt=10&APPID=1c11f4e7692bb5e0526e72c0e6baaa3b&units=metric';

            axios.get.mockImplementation(
                (url, { cancelToken }) => new Promise((res, rej) => {
                    if (cancelToken === token) {
                        rej(cancelErr);
                    } else if (url === getWeatherUrl) {
                        res({ data: GET_WEATHER_RESPONSE });
                    } else if (url === getWrongWeatherUrl || url === getWrongForecastUrl) {
                        res({ data: GET_WEATHER_NOT_FOUND_RESPONSE });
                    } else if (url === getForecastUrl) {
                        res({ data: FORECAST_RESPOND });
                    } else if (url === getClosestCitiesUrl) {
                        res({ data: GET_CLOSEST_RESPONSE });
                    } else {
                        rej({ message: `unexpected url: ${url}` });
                    }
                    cancel = token;
                }),
            );
            CancelToken.mockImplementation(() => cancel);
            isCancel.mockImplementation(err => err === cancelErr);
        });

        afterEach(() => {
            axios.get.mockClear();
            CancelToken.mockClear();
            isCancel.mockClear();
            cancel = undefined;
        });

        afterAll(() => {
            axios.get.mockReset();
            isCancel.mockReset();
            CancelToken.mockReset();
        });
        describe('#weatherAPI.fetchCurrentWeather', () => {
            it('should return properly formatted weather', () =>
                weatherAPI.fetchCurrentWeather('Minsk', 'BY').then(((res) => {
                    expect(res).toEqual(GET_WEATHER_RESULT);
                })),
            );
            it('should cancel multiple requests', () => {
                weatherAPI.fetchCurrentWeather('Minsk', 'BY');
                return weatherAPI.fetchCurrentWeather('Minsk', 'BY').then((res) => {
                    expect(res).toEqual({
                        cod: -1,
                        message: 'another ajax sent',
                    });
                });
            });
            it('should return proper error string when status doesn\'t equal 200', () =>
                weatherAPI.fetchCurrentWeather('qweqweqwewqeqwe').then((res) => {
                    expect(res).toEqual({
                        status: '404',
                        city: 'qweqweqwewqeqwe',
                        message: 'city not found',
                    });
                }),
            );
        });
        describe('#weatherAPI.fetchWeatherForecast', () => {
            it('should return properly formatted forecast', () =>
                weatherAPI.fetchWeatherForecast('Minsk', 'BY').then((res) => {
                    expect(res).toEqual(FORECAST_RESULT);
                }));
            it('should return proper error string when status doesn\'t equal 200', () =>
                weatherAPI.fetchWeatherForecast('qweqweqwewqeqwe').then((res) => {
                    expect(res).toEqual([{
                        status: '404',
                        city: 'qweqweqwewqeqwe',
                        message: 'city not found',
                    }]);
                }),
            );
        });
        describe('#weatherAPI.getClosestCitiesToLocation', () => {
            it('should return properly formatted weather', () =>
            weatherAPI.getClosestCitiesToLocation({ longitude: 10, latitude: 10 }).then((res) => {
                expect(res).toEqual(GET_CLOSEST_RESULT);
            }));
        });
    });
});
