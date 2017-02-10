import { createSelector } from 'reselect';

const getMainInfo = ({ weather: { city, location, weatherTypes } }) =>
    ({ city, location, weatherTypes });
export const weatherOverallSelector = createSelector(
    getMainInfo,
    ({ city, location, weatherTypes }) => ({
        city,
        location,
        main: weatherTypes ? weatherTypes[0].main : 'default',
    }),
);


const getForecastFilter = ({ forecastFilter }) => forecastFilter;
const getForecast = ({ forecast }) => forecast;

export const selectForecastFilter = createSelector(
    [getForecastFilter, getForecast],
    (filter, forecast) => {
        switch (filter) {
            case '3H':
                return forecast;
            default:
                return forecast.filter((weather, index) => index % 4 === 0);
        }
    },
);
