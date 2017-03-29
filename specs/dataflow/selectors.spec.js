import times from 'lodash/times';
import { selectForecastFilter, selectCachedCitiesToFilterWeather, selectFavoriteCache, applyAllFilters, weatherOverallSelector } from '../../app/selectors';
import { applyTemperatureFilters, applyWeatherTypesFilter, applyPressureFilter, applyHumidityFilter, applyWindSpeedFilter, applySort, applyDateFilter, convertCacheToArray } from '../../app/selectors/filters';
import { createInfoAbout, createInfoArray } from '../testUtils/weatherCreator';

describe('filters.js', () => {
    describe('#selectForecastFilter', () => {
        const forecast = times(6, index => ({ index }));
        let store;
        beforeEach(() => {
            store = {
                weather: {
                    forecastFilter: '6H',
                    forecast: [...forecast],
                },
            };
        });
        it('should return forecast if \'3H\' filter is applied', () => {
            store.weather.forecastFilter = '3H';
            expect(selectForecastFilter(store)).toHaveLength(6);
        });
        it('should return filtered forecast if any filter but the default is applied', () => {
            expect(selectForecastFilter(store)).toEqual([{ index: 0 }, { index: 4 }]);
        });
        it('should return the same object if none of the filter params is changed', () => {
            const filter1 = selectForecastFilter(store);
            const filter2 = selectForecastFilter({ weather: { ...store.weather } });
            expect(filter1).toBe(filter2);
        });
    });
    describe('filters utils', () => {
        let store;
        beforeEach(() => {
            store = {
                weather: {
                    cache: {
                        'weather/city1/c1': createInfoAbout('city1', 1),
                        'forecast/city1/c1': createInfoArray('city1', 2, 2),
                        'weather/city2/c2': createInfoAbout('city2', 1),
                        'forecast/city2/c2': createInfoArray('city2', 2, 2),
                        'weather/city3/c3': createInfoAbout('city3', 1),
                        'forecast/city3/c3': createInfoArray('city3', 2, 2),
                    },
                },
                favorites: {
                    favoriteCities: [
                        { cityname: 'city1', countryCode: 'c1' },
                        { cityname: 'city2', countryCode: 'c2' },
                    ],
                    citiesToFilterArray: [
                        { cityname: 'city2', countryCode: 'c2' },
                        { cityname: 'city3', countryCode: 'c3' },
                    ],
                },
            };
        });
        describe('#selectCachedCitiesToFilterWeather', () => {
            it('should select cached favorite cities when no cities is provided to filter', () => {
                store.favorites.citiesToFilterArray = undefined;
                expect(selectCachedCitiesToFilterWeather(store)).toEqual({
                    'weather/city1/c1': createInfoAbout('city1', 1),
                    'forecast/city1/c1': createInfoArray('city1', 2, 2),
                    'weather/city2/c2': createInfoAbout('city2', 1),
                    'forecast/city2/c2': createInfoArray('city2', 2, 2),
                });
            });

            it('should select cities from citiesToFilterArray when they are provided', () => {
                expect(selectCachedCitiesToFilterWeather(store)).toEqual({
                    'weather/city2/c2': createInfoAbout('city2', 1),
                    'forecast/city2/c2': createInfoArray('city2', 2, 2),
                    'weather/city3/c3': createInfoAbout('city3', 1),
                    'forecast/city3/c3': createInfoArray('city3', 2, 2),
                });
            });
        });
        describe('#selectFavoriteCache', () => {
            it('should return cache for favorite cities', () => {
                expect(selectFavoriteCache(store)).toEqual({
                    'weather/city1/c1': createInfoAbout('city1', 1),
                    'forecast/city1/c1': createInfoArray('city1', 2, 2),
                    'weather/city2/c2': createInfoAbout('city2', 1),
                    'forecast/city2/c2': createInfoArray('city2', 2, 2),
                });
            });
        });
        describe('#convertCacheToArray', () => {
            it('should reduce weather and forecast array into a single array', () => {
                expect(convertCacheToArray(store)).toEqual([
                    ...createInfoArray('city2', 3, 1),
                    ...createInfoArray('city3', 3, 1),
                ]);
            });
        });
    });
    describe('filters flow', () => {
        let cacheArray;
        beforeEach(() => {
            cacheArray = createInfoArray('city', 6, 1);
        });
        describe('#applyTemperatureFilters', () => {
            it('should select the whole array if no max and min temperature is provided', () => {
                expect(applyTemperatureFilters({}, cacheArray)).toEqual(cacheArray);
            });
            it('should select only the elements, that match the temperature filter', () => {
                expect(applyTemperatureFilters({
                    minTemperature: 2,
                    maxTemperature: 4,
                }, cacheArray)).toEqual(createInfoArray('city', 1, 3));
            });
        });
        describe('#applyWeatherTypesFilter', () => {
            it('should select weather accordingly to weather types passed to filter', () => {
                cacheArray = createInfoArray('city', 15, 1);
                expect(applyWeatherTypesFilter({
                    weatherIcons: { 'i03': true },
                }, cacheArray)).toEqual([
                    createInfoAbout('city', 2),
                    createInfoAbout('city', 11),
                ]);
            });
        });
        describe('#applyPressureFilter', () => {
            it('should select weather accordingly to pressure filter passed', () => {
                expect(applyPressureFilter({
                    minPressure: 2,
                    maxPressure: 4,
                }, cacheArray)).toEqual(createInfoArray('city', 3, 2));
            });
        });
        describe('#applyHumidityFilter', () => {
            it('should select weather accordingly to humidity filter passed', () => {
                expect(applyHumidityFilter({
                    minHumidity: 2,
                    maxHumidity: 4,
                }, cacheArray)).toEqual(createInfoArray('city', 3, 2));
            });
        });
        describe('#applyWindSpeedFilter', () => {
            it('should select weather accordingly to speed filter passed', () => {
                expect(applyWindSpeedFilter({
                    minWindSpeed: 2,
                    maxWindSpeed: 4,
                }, cacheArray)).toEqual(createInfoArray('city', 3, 2));
            });
        });
        describe('#applySort', () => {
            it('should sort unassorted array properly', () => {
                const unassortedArray = createInfoArray('city', 6, 1, i => (i % 2 === 1 ? i + 1 : i - 1));
                expect(applySort(unassortedArray)).toEqual(cacheArray);
            });
        });
        describe('#applyDateFilter', () => {
            it('should select weather accordingly to date filter array passed', () => {
                expect(applyDateFilter({
                    filterDatepickerArray: ['02.03.2017', '03.03.2017'],
                }, cacheArray)).toEqual([
                    createInfoAbout('city', 1),
                    createInfoAbout('city', 2),
                ]);
            });
            it('should return an array with only one element for each different city if no filter array passed', () => {
                const cacheArrayWithMultipleCities = [
                    ...createInfoArray('city1', 3, 1),
                    ...createInfoArray('city2', 3, 1),
                ];
                expect(applyDateFilter({}, cacheArrayWithMultipleCities)).toEqual([
                    createInfoAbout('city1', 1),
                    createInfoAbout('city2', 1),
                ]);
            });
        });
        describe('#applyAllFilters', () => {
            it('should apply all filters to cache', () => {
                const store = {
                    favorites: {
                        filters: {
                            minTemperature: 1,
                            filterDatepickerArray: ['02.03.2017', '03.03.2017'],
                            maxPressure: 6,
                            minHumidity: 2,
                            maxWindSpeed: 5,
                            weatherIcons: { 'i01': true, 'i03': true },
                        },
                        favoriteCities: [
                            { cityname: 'city1', countryCode: 'c1' },
                            { cityname: 'city2', countryCode: 'c2' },
                        ],
                    },
                    weather: {
                        cache: {
                            'weather/city1/c1': createInfoAbout('city1', 1),
                            'forecast/city1/c1': createInfoArray('city1', 6, 2),
                            'weather/city2/c2': createInfoAbout('city2', 1),
                            'forecast/city2/c2': createInfoArray('city2', 6, 2),
                        },
                    },
                };
                expect(applyAllFilters(store)).toEqual([
                    createInfoAbout('city1', 2),
                    createInfoAbout('city2', 2),
                ]);
            });
        });
    });
});

describe('selectors.js', () => {
    describe('#weatherOverallSelector', () => {
        it('should return the same object for the same params', () => {
            const store = {
                main: {
                    city: 'city',
                },
                weather: {
                    weather: {
                        location: {},
                        weatherTypes: [{ main: '' }],
                    },
                },
            };
            expect(weatherOverallSelector(store)).toBe(weatherOverallSelector({
                main: { ...store.main },
                weather: { ...store.weather },
            }));
        });
    });
});
