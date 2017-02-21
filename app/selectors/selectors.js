import { createSelector } from 'reselect';

const getMainInfo = ({
    weather: {
        weather: { weatherTypes, location },
    },
    main: {
        city,
    },
}) => ({ city, weatherTypes, location });

export const weatherOverallSelector = createSelector(
    getMainInfo,
    ({ city, location, weatherTypes }) => ({
        city,
        location,
        main: weatherTypes ? weatherTypes[0].main : 'default',
    }),
);

const getForecastFilter = ({ weather: { forecastFilter } }) => forecastFilter;
const getForecast = ({ weather: { forecast } }) => forecast;

export const selectForecastFilter = createSelector(
    [getForecastFilter, getForecast],
    (filter, forecast) => {
        if (filter === '3H') {
            return forecast;
        }
        return forecast.filter((weather, index) => index % 4 === 0);
    },
);
