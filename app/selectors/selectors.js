import { createSelector } from 'reselect';

export const weatherOverallSelector = createSelector(
    [
        ({ main: { city } }) => city,
        ({ weather: { weather: { location } } }) => location,
        ({ weather: { weather: { weatherTypes } } }) => weatherTypes,
    ],
    (city, location, weatherTypes) => ({
        city,
        location,
        main: weatherTypes ? weatherTypes[0].main : 'default',
    }),
);
